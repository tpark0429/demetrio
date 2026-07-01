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
        initVisitorCounter();

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
        renderSidebar();
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

    // Build Hierarchy: parent -> child -> list of posts
    const tree = {};
    POSTS.forEach(p => {
        if (!p.category) return;
        const parts = p.category.split("/");
        const parent = parts[0];
        const child = parts[1] || "기타";

        if (!tree[parent]) tree[parent] = {};
        if (!tree[parent][child]) tree[parent][child] = [];
        tree[parent][child].push(p);
    });

    const wrap = $("catList");
    wrap.innerHTML = "";

    // Sort Parents
    const PREFERRED_ORDER = ["수학", "전자기학", "AI", "검도"];

    const parents = Object.keys(tree).sort((a, b) => {
        const idxA = PREFERRED_ORDER.indexOf(a);
        const idxB = PREFERRED_ORDER.indexOf(b);

        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.localeCompare(b, "ko");
    });

    parents.forEach(p => {
        const parentDiv = document.createElement("div");
        parentDiv.className = "cat-group";

        // Logic: Expand if state.cat starts with this Parent/ or if the currently open post belongs to this parent
        const belongsToParent = POSTS.some(x => x.id === state.openId && x.category && x.category.startsWith(p + "/"));
        const isExpanded = state.cat.startsWith(p + "/") || belongsToParent;

        const details = document.createElement("details");
        if (isExpanded) details.open = true;

        const summary = document.createElement("summary");
        summary.className = "cat-parent";
        summary.innerHTML = `<span>${p}</span>`;
        details.appendChild(summary);

        const childListDiv = document.createElement("div");
        childListDiv.className = "cat-children";

        const children = Object.keys(tree[p]).sort((a, b) => a.localeCompare(b, "ko"));

        children.forEach(c => {
            const fullCat = `${p}/${c}`;
            const subcatGroup = document.createElement("div");
            subcatGroup.className = "subcategory-group";

            const subcatTitle = document.createElement("div");
            const isActiveSub = state.cat === fullCat;
            subcatTitle.className = "subcategory-title" + (isActiveSub ? " active" : "");

            const count = tree[p][c].length;
            subcatTitle.innerHTML = `<span>${c}</span><span class="count" style="font-size:10px; padding: 2px 6px; margin-left:6px">${count}</span>`;

            subcatTitle.onclick = (e) => {
                e.stopPropagation();
                state.cat = (state.cat === fullCat) ? "" : fullCat;
                state.mode = "all";
                history.pushState(null, null, " ");
                renderAll();
            };
            subcatGroup.appendChild(subcatTitle);

            const postListContainer = document.createElement("div");
            postListContainer.className = "sidebar-post-list";

            const postsInSub = sortPosts(tree[p][c]);
            postsInSub.forEach(post => {
                const postRow = document.createElement("a");
                const isActivePost = state.openId === post.id;
                postRow.className = "sidebar-post" + (isActivePost ? " active" : "");
                postRow.href = `#post/${post.id}`;
                postRow.textContent = post.title;
                postRow.title = post.title; // Tooltip for overflow text
                postRow.onclick = (e) => {
                    e.stopPropagation();
                };
                postListContainer.appendChild(postRow);
            });

            subcatGroup.appendChild(postListContainer);
            childListDiv.appendChild(subcatGroup);
        });

        details.appendChild(childListDiv);
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
            if (state.openId === p.id) {
                // Already open, just scroll to it
                $("reader").scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                window.location.hash = `post/${p.id}`;
            }
        };
        list.appendChild(el);
    });

    // Auto-open logic: If current openId is gone, or nothing open, open the first one
    if (final.length > 0) {
        if (!state.openId || !final.find(p => p.id === state.openId)) {
            // Update hash to trigger openPost
            // We use history.replaceState to avoid polluting history stack with auto-jumps
            const firstId = final[0].id;
            window.history.replaceState(null, null, `#post/${firstId}`);
            openPost(firstId);
        }
    } else {
        // No posts shown -> Close reader
        $("reader").style.display = "none";
        state.openId = "";
    }
}

async function openPost(id) {
    const p = POSTS.find(x => x.id === id);
    if (!p) return;
    state.openId = id;

    renderSidebar();

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
        const encodedFile = p.file.split('/').map(encodeURIComponent).join('/');
        const res = await fetch(`posts/${encodedFile}?t=` + Date.now());
        if (!res.ok) throw new Error("Markdown file not found");
        let md = await res.text();

        // Strip YAML Front Matter
        md = md.replace(/^---\s*\n([\s\S]*?)\n---\s*\n/, "");

        // Convert absolute asset paths to relative paths to fix broken images on GitHub Pages
        md = md.replaceAll("](/assets/", "](assets/").replaceAll('src="/assets/', 'src="assets/');

        // Render Markdown & Math
        const mathBlocks = [];
        let placeholderCounter = 0;

        // Replace block math ($$)
        let processedMd = md.replace(/\$\$([\s\S]+?)\$\$/g, (match) => {
            const placeholder = `%%MATH_BLOCK_${placeholderCounter}%%`;
            mathBlocks.push({ placeholder, content: match });
            placeholderCounter++;
            return placeholder;
        });

        // Replace inline math ($)
        processedMd = processedMd.replace(/\$([^\$\n]+?)\$/g, (match) => {
            const placeholder = `%%MATH_INLINE_${placeholderCounter}%%`;
            mathBlocks.push({ placeholder, content: match });
            placeholderCounter++;
            return placeholder;
        });

        let html = marked.parse(processedMd);

        // Put math blocks back
        for (const block of mathBlocks) {
            html = html.replace(block.placeholder, () => block.content);
        }

        $("rContent").innerHTML = html;

        // MathJax/KaTeX render
        const renderMath = () => {
            if (window.renderMathInElement) {
                renderMathInElement($("rContent"), {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '$', right: '$', display: false }
                    ]
                });
            }
        };

        renderMath();
        // If KaTeX load is delayed (e.g. on slow connections or direct refresh), retry
        if (!window.renderMathInElement) {
            window.addEventListener("load", renderMath);
            setTimeout(renderMath, 200);
            setTimeout(renderMath, 1000);
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

/* Visitor Counter using CounterAPI v1 */
async function initVisitorCounter() {
    const namespace = "demetrio_blog";
    const dateObj = new Date();
    // Use KST YYYY-MM-DD
    const kstOffset = 9 * 60 * 60 * 1000; // KST is UTC+9
    const kstDate = new Date(dateObj.getTime() + (dateObj.getTimezoneOffset() * 60 * 1000) + kstOffset);
    const yyyy = kstDate.getFullYear();
    const mm = String(kstDate.getMonth() + 1).padStart(2, '0');
    const dd = String(kstDate.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const isNewSession = !sessionStorage.getItem("visited");
    sessionStorage.setItem("visited", "true");

    const totalUrl = `https://api.counterapi.dev/v1/${namespace}/total` + (isNewSession ? "/up" : "");
    const todayUrl = `https://api.counterapi.dev/v1/${namespace}/date_${todayStr}` + (isNewSession ? "/up" : "");

    // Fetch total and today's visits in parallel
    try {
        const [resTotal, resToday] = await Promise.all([
            fetch(totalUrl).then(r => r.json()),
            fetch(todayUrl).then(r => r.json())
        ]);
        
        $("totalVisits").textContent = (resTotal && resTotal.count !== undefined) ? resTotal.count.toLocaleString() : "-";
        $("todayVisits").textContent = (resToday && resToday.count !== undefined) ? resToday.count.toLocaleString() : "-";
    } catch (e) {
        console.error("Failed to load total/today visits", e);
        $("totalVisits").textContent = "-";
        $("todayVisits").textContent = "-";
    }

    // Load last 7 days history
    const historyList = $("visitorHistoryList");
    historyList.innerHTML = "";

    const daysToFetch = [];
    for (let i = 0; i < 7; i++) {
        const prevDate = new Date(kstDate.getTime() - i * 24 * 60 * 60 * 1000);
        const pY = prevDate.getFullYear();
        const pM = String(prevDate.getMonth() + 1).padStart(2, '0');
        const pD = String(prevDate.getDate()).padStart(2, '0');
        const pStr = `${pY}-${pM}-${pD}`;
        daysToFetch.push(pStr);
    }

    // Fetch history in parallel (GET only, no increment)
    try {
        const historyResults = await Promise.all(
            daysToFetch.map(d => 
                fetch(`https://api.counterapi.dev/v1/${namespace}/date_${d}`)
                    .then(r => r.ok ? r.json() : { count: 0 })
                    .catch(() => ({ count: 0 }))
            )
        );

        historyResults.forEach((data, index) => {
            const dateStr = daysToFetch[index];
            const displayDate = index === 0 ? "Today" : dateStr.substring(5); // Show e.g. "07-01"
            const row = document.createElement("div");
            row.className = "visitor-history-row";
            const val = (data && data.count !== undefined) ? data.count.toLocaleString() : "0";
            row.innerHTML = `<span>${displayDate}</span><span style="font-weight:600">${val}</span>`;
            historyList.appendChild(row);
        });
    } catch (e) {
        console.error("Failed to load visitor history", e);
        historyList.innerHTML = "<div style='color:salmon'>History load failed</div>";
    }
}
