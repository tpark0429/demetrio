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

    // Build Hierarchy: map<Parent, Set<Child>>
    const tree = {};
    POSTS.forEach(p => {
        if (!p.category) return;
        const parts = p.category.split("/");
        const parent = parts[0];
        const child = parts[1] || ""; // Handle "Parent" only case if any

        if (!tree[parent]) tree[parent] = new Set();
        if (child) tree[parent].add(child);
    });

    const wrap = $("catList");
    wrap.innerHTML = "";

    // Sort Parents
    // Custom Order: Defined by user
    const PREFERRED_ORDER = ["수학", "전자기학", "AI", "검도"];

    const parents = Object.keys(tree).sort((a, b) => {
        const idxA = PREFERRED_ORDER.indexOf(a);
        const idxB = PREFERRED_ORDER.indexOf(b);

        // If both are in the preferred list, sort by index
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;

        // If only one is in the list, that one comes first
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;

        // Otherwise alphabetical
        return a.localeCompare(b, "ko");
    });

    parents.forEach(p => {
        const children = Array.from(tree[p]).sort((a, b) => a.localeCompare(b, "ko"));
        const parentDiv = document.createElement("div");
        parentDiv.className = "cat-group";

        // Logic: Is this group fully expanded? 
        // We expand if state.cat starts with this Parent/
        const isExpanded = state.cat.startsWith(p + "/");

        const details = document.createElement("details");
        if (isExpanded) details.open = true;

        const summary = document.createElement("summary");
        summary.className = "cat-parent";
        summary.innerHTML = `<span>${p}</span>`;
        // Prevent toggling when clicking? No, toggle is good.

        details.appendChild(summary);

        const childList = document.createElement("div");
        childList.className = "cat-children";

        children.forEach(c => {
            const fullCat = `${p}/${c}`;
            const row = document.createElement("div");
            row.className = "cat-child" + (state.cat === fullCat ? " active" : "");

            // Count posts for this child
            const count = POSTS.filter(x => x.category === fullCat).length;

            row.innerHTML = `<span>${c}</span><span class="count">${count}</span>`;
            row.onclick = (e) => {
                e.stopPropagation(); // Prevent detail toggle if inside summary (not here though)
                state.cat = (state.cat === fullCat) ? "" : fullCat;
                state.mode = "all";
                history.pushState(null, null, " ");
                renderAll();
            };
            childList.appendChild(row);
        });

        details.appendChild(childList);
        parentDiv.appendChild(details);
        wrap.appendChild(parentDiv);
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
        el.className = "post" + (state.openId === p.id ? " active-post" : "");
        const tags = (p.tags || []).map(t => `<span class="tag">#${t}</span>`).join(" ");
        // Show short category name
        const shortCat = p.category ? p.category.split("/").pop() : "";

        el.innerHTML = `
            <h3>${p.title}</h3>
            <p>${p.excerpt || ""}</p>
            <div class="row">
                <span class="cat">${shortCat}</span>
                <span>${p.date}</span>
                ${p.pinned ? " · <span class='tag'>PIN</span>" : ""}
                <span style="flex:1"></span>
                <span>${tags}</span>
            </div>
        `;
        el.onclick = () => {
            window.location.hash = `post/${p.id}`;
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
