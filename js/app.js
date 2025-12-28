/* Global State */
let POSTS = [];
const state = {
    cat: "",
    tag: "",
    q: "",
    mode: "all",
    sort: "new",
    openId: ""
};

/* Helpers */
const $ = (id) => document.getElementById(id);
const toDate = (s) => new Date(s + "T00:00:00");
const daysDiff = (a, b) => Math.floor((a - b) / (1000 * 60 * 60 * 24));
function uniq(arr) { return Array.from(new Set(arr)); }

function escapeHtml(s) {
    return String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* App Init */
async function init() {
    try {
        const res = await fetch('posts/metadata.json?t=' + Date.now());
        if (!res.ok) throw new Error("Metadata load failed");
        POSTS = await res.json();

        bindEvents();
        checkHash(); // URL 체크
        renderAll();

        window.addEventListener("hashchange", checkHash);
    } catch (e) {
        console.error(e);
        $('list').innerHTML = `<div class="post"><h3>데이터 로드 실패</h3><p>local server를 사용중인지 확인해주세요.</p></div>`;
    }
}

/* Hash Routing */
function checkHash() {
    const hash = window.location.hash;
    if (hash.startsWith("#post/")) {
        const id = hash.replace("#post/", "");
        if (id !== state.openId) {
            openPost(id);
        }
    } else if (hash === "") {
        // close reader if back to root
        $("reader").style.display = "none";
        state.openId = "";
        renderList();
    }
}

/* Core Logic copied/adapted from original */
function computeLastUpdated() {
    if (POSTS.length === 0) return "-";
    const latest = POSTS.map(p => p.date).sort().slice(-1)[0];
    return latest;
}

function matchPost(p) {
    if (state.mode === "pinned" && !p.pinned) return false;
    if (state.mode === "recent") {
        const d = toDate(p.date);
        const now = new Date();
        if (daysDiff(now, d) > 30) return false;
    }
    if (state.cat && p.category !== state.cat) return false;
    if (state.tag && !(p.tags || []).includes(state.tag)) return false;
    if (state.q) {
        const q = state.q.toLowerCase();
        // Note: Content search is limited to metadata excerpt unless we fetch all MDs (expensive)
        const blob = [
            p.title, p.excerpt, p.category,
            (p.tags || []).join(" ")
        ].join(" ").toLowerCase();
        if (!blob.includes(q)) return false;
    }
    return true;
}

function sortPosts(list) {
    const copy = [...list];
    if (state.sort === "new") {
        copy.sort((a, b) => (a.date < b.date ? 1 : -1));
    } else if (state.sort === "old") {
        copy.sort((a, b) => (a.date > b.date ? 1 : -1));
    } else if (state.sort === "title") {
        copy.sort((a, b) => a.title.localeCompare(b.title, "ko"));
    }
    return copy;
}

/* Renders */
function renderAll() {
    $("lastUpdated").textContent = computeLastUpdated();
    renderSidebar();
    renderList();
}

function renderSidebar() {
    const allCount = POSTS.length;
    const starCount = POSTS.filter(p => p.pinned).length;
    const recentCount = POSTS.filter(p => daysDiff(new Date(), toDate(p.date)) <= 30).length;

    $("allCount").textContent = allCount;
    $("starCount").textContent = starCount;
    $("recentCount").textContent = recentCount;

    const cats = uniq(POSTS.map(p => p.category)).sort((a, b) => a.localeCompare(b, "ko"));
    const catCounts = Object.fromEntries(cats.map(c => [c, POSTS.filter(p => p.category === c).length]));

    const wrap = $("catList");
    wrap.innerHTML = "";
    cats.forEach(c => {
        const div = document.createElement("div");
        div.className = "chip" + (state.cat === c ? " active" : "");
        div.innerHTML = `<span>${c}</span><span class="count">${catCounts[c]}</span>`;
        div.onclick = () => {
            state.cat = (state.cat === c) ? "" : c;
            state.mode = "all";
            history.pushState(null, null, " ");
            renderAll();
        };
        wrap.appendChild(div);
    });

    setActive($("allBtn"), state.mode === "all");
    setActive($("starBtn"), state.mode === "pinned");
    setActive($("recentBtn"), state.mode === "recent");
}

function setActive(el, on) {
    if (on) el.classList.add("active");
    else el.classList.remove("active");
}

function renderList() {
    // Filter
    const final = sortPosts(POSTS.filter(matchPost));
    $("totalAll").textContent = POSTS.length;
    $("totalShown").textContent = final.length;

    // View Title
    let title = "전체 포스트";
    if (state.mode === "pinned") title = "핀(중요) 포스트";
    else if (state.mode === "recent") title = "최근 30일 포스트";
    if (state.cat) title += ` · ${state.cat}`;
    $("viewTitle").textContent = title;

    const list = $("list");
    list.innerHTML = "";

    if (final.length === 0) {
        list.innerHTML = `<div class="post"><h3>검색 결과가 없습니다.</h3></div>`;
        return;
    }

    final.forEach(p => {
        const el = document.createElement("article");
        el.className = "post" + (state.openId === p.id ? " active-post" : ""); // style style.css에 추가 필요
        const tags = (p.tags || []).map(t => `<span class="tag">#${t}</span>`).join(" ");
        el.innerHTML = `
            <h3>${p.title}</h3>
            <p>${p.excerpt || ""}</p>
            <div class="row">
                <span class="cat">${p.category}</span>
                <span>${p.date}</span>
                ${p.pinned ? " · <span class='tag'>PIN</span>" : ""}
                <span style="flex:1"></span>
                <span>${tags}</span>
            </div>
        `;
        el.onclick = () => {
            window.location.hash = `post/${p.id}`; // triggers checkHash -> openPost
        };
        list.appendChild(el);
    });
}

async function openPost(id) {
    const p = POSTS.find(x => x.id === id);
    if (!p) return;
    state.openId = id;

    // Render Meta
    $("rTitle").textContent = p.title;
    const tagHtml = (p.tags || []).map(t => `<span class="tag">#${t}</span>`).join(" ");
    $("rMeta").innerHTML = `
        <span class="cat">${p.category}</span>
        <span>${p.date}</span>
        ${p.pinned ? `<span class="tag">PIN</span>` : ""}
        <span>${tagHtml}</span>
    `;

    // Fetch Markdown
    $("rContent").innerHTML = "<p>불러오는 중...</p>";
    $("reader").style.display = "block";

    // Smooth scroll
    $("reader").scrollIntoView({ behavior: "smooth", block: "start" });

    try {
        const res = await fetch(`posts/${p.file}?t=` + Date.now());
        if (!res.ok) throw new Error("Markdown file not found");
        const md = await res.text();

        // Render Markdown & Math
        const html = marked.parse(md);
        $("rContent").innerHTML = html;

        // MathJax/KaTeX render
        if (window.renderMathInElement) {
            renderMathInElement($("rContent"), {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ]
            });
        }
    } catch (e) {
        $("rContent").innerHTML = `<p style="color:salmon">내용을 불러오지 못했습니다. (${e.message})</p>`;
    }
}

/* Events */
function bindEvents() {
    $("q").oninput = (e) => {
        state.q = e.target.value.trim();
        renderAll();
    };
    $("clearBtn").onclick = () => {
        $("q").value = "";
        state.q = "";
        renderAll();
    };
    $("allBtn").onclick = () => { state.mode = "all"; state.cat = ""; history.pushState(null, null, " "); renderAll(); };
    $("starBtn").onclick = () => { state.mode = "pinned"; state.cat = ""; history.pushState(null, null, " "); renderAll(); };
    $("recentBtn").onclick = () => { state.mode = "recent"; state.cat = ""; history.pushState(null, null, " "); renderAll(); };
}

// Start
init();
