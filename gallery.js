// Shared photo components for the Jongno guides.
// Photos come from WEB_PHOTOS (photos.js): images found on the web, hotlinked with their
// source page. Each item: [image url, fallback thumbnail url, source page url, label].
// - Street gallery: large swipeable carousel per district ("S_<id>").
// - Store gallery: compact swipeable carousel per store, labelled 전경/내부/메뉴판/음식.
// - Fullscreen viewer: tap any photo to view it large and keep swiping.

const STREET_NOTE = {
  seosulla: "종묘 돌담을 따라 걷는 서순라길의 낮과 밤.",
  jongsam: "갈매기살 골목·포차거리에 테이블이 깔리는 종로3가의 밤.",
  ikseon: "한옥 지붕 아래 좁은 골목, 파라솔과 조명이 가득한 익선동.",
  euljiro: "셔터 내린 골목에 야장이 펼쳐지는 을지로의 밤."
};

// Store name → photo key (used by pages whose places have no id)
const STORE_KEY = {
  "우리술집 다람쥐": "daramgee", "순라길 (홍어집)": "sunlagil", "헤리티지 클럽": "heritage",
  "퀸즈가드": "queensguard", "서울집시": "gypsy", "광주집": "gwangju", "서대포집": "seodaepo",
  "종삼육": "jongsamyuk", "미 갈매기살": "mi", "계림": "gyerim", "행아웃": "hangout",
  "아트몬스터 익선": "artmonster", "익선잡방": "japbang", "청수당": "cheongsu",
  "만선호프": "mansun", "뮌헨호프": "munchen", "을지로3가 골뱅이 골목": "golbaengi"
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const hostOf = u => { try { return new URL(u).hostname.replace(/^(www|m)\./, ""); } catch (e) { return "출처"; } };

// Image tag with no-referrer (avoids hotlink blocks) and a thumbnail fallback
function imgTag([src, fb], alt, lazy) {
  return `<img src="${esc(src)}" data-fb="${esc(fb)}" alt="${esc(alt)}" referrerpolicy="no-referrer" loading="${lazy ? "lazy" : "eager"}" decoding="async" onerror="if(this.dataset.fb&&this.src!==this.dataset.fb){this.src=this.dataset.fb}else{this.closest('figure').classList.add('broken')}">`;
}

function carouselHTML(key, items, cls, opts = {}) {
  const slides = items.map((it, i) => {
    const label = it[3] || opts.caption || "";
    return `<figure class="g-slide" data-i="${i}">
      ${imgTag(it, label || "사진", i > 0)}
      ${label ? `<span class="g-label">${esc(label)}</span>` : ""}
      <a class="g-credit" href="${esc(it[2])}" target="_blank" rel="noopener">출처 · ${esc(hostOf(it[2]))}</a>
    </figure>`;
  }).join("");
  const dots = items.map((_, i) => `<i class="${i ? "" : "on"}"></i>`).join("");
  return `<div class="gallery ${cls}" data-key="${key}">
    <div class="g-track" tabindex="0" aria-label="사진, 옆으로 넘겨 보기">${slides}</div>
    <div class="g-count"><span>1</span>/${items.length}</div>
    <button class="g-nav prev" aria-label="이전 사진">‹</button>
    <button class="g-nav next" aria-label="다음 사진">›</button>
    <div class="g-dots" aria-hidden="true">${dots}</div>
  </div>`;
}

function streetGalleryHTML(id) {
  const items = (typeof WEB_PHOTOS !== "undefined" && WEB_PHOTOS["S_" + id]) || [];
  if (!items.length) return "";
  return carouselHTML("S_" + id, items, "g-street") +
    `<div class="g-note">📷 ${esc(STREET_NOTE[id] || "")} 사진을 누르면 크게 볼 수 있어요.</div>`;
}

function storeGalleryHTML(key) {
  const items = (typeof WEB_PHOTOS !== "undefined" && WEB_PHOTOS[key]) || [];
  if (!items.length) return "";
  return carouselHTML(key, items, "g-store");
}
const storeKeyByName = name => STORE_KEY[name] || "";

// ---------- Behaviour ----------
function initGalleries(root = document) {
  root.querySelectorAll(".gallery").forEach(gal => {
    const track = gal.querySelector(".g-track");
    const dots = [...gal.querySelectorAll(".g-dots i")];
    const count = gal.querySelector(".g-count span");
    const n = dots.length;
    const idx = () => Math.round(track.scrollLeft / track.clientWidth);
    let raf = 0;
    track.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = Math.max(0, Math.min(n - 1, idx()));
        dots.forEach((d, k) => d.classList.toggle("on", k === i));
        count.textContent = i + 1;
      });
    }, { passive: true });
    const go = d => track.scrollTo({ left: (idx() + d) * track.clientWidth, behavior: "smooth" });
    gal.querySelector(".prev").addEventListener("click", () => go(-1));
    gal.querySelector(".next").addEventListener("click", () => go(1));
    // Keep horizontal swipes inside the photos from switching districts/plans
    ["touchstart", "touchend"].forEach(t => track.addEventListener(t, e => e.stopPropagation(), { passive: true }));
    track.querySelectorAll(".g-slide img").forEach((img, i) =>
      img.addEventListener("click", () => openViewer(gal.dataset.key, i)));
  });
}

// ---------- Fullscreen viewer ----------
function openViewer(key, start) {
  const items = WEB_PHOTOS[key] || [];
  const v = document.createElement("div");
  v.className = "viewer";
  v.setAttribute("role", "dialog");
  v.setAttribute("aria-label", "사진 크게 보기");
  v.innerHTML = `
    <button class="v-close" aria-label="닫기">✕</button>
    <div class="v-count"><span>${start + 1}</span>/${items.length}</div>
    <div class="v-track">${items.map(it => `
      <figure>${imgTag(it, it[3] || "사진", false)}<figcaption>${it[3] ? esc(it[3]) + "<br>" : ""}<a href="${esc(it[2])}" target="_blank" rel="noopener">출처 · ${esc(hostOf(it[2]))} ›</a></figcaption></figure>`).join("")}
    </div>`;
  document.body.appendChild(v);
  document.documentElement.style.overflow = "hidden";
  const track = v.querySelector(".v-track");
  const count = v.querySelector(".v-count span");
  requestAnimationFrame(() => { track.scrollLeft = start * track.clientWidth; });
  track.addEventListener("scroll", () => { count.textContent = Math.round(track.scrollLeft / track.clientWidth) + 1; }, { passive: true });
  ["touchstart", "touchend"].forEach(t => track.addEventListener(t, e => e.stopPropagation(), { passive: true }));
  const close = () => { v.remove(); document.documentElement.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  const onKey = e => {
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
    if (e.key === "ArrowLeft") track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
  };
  v.querySelector(".v-close").addEventListener("click", close);
  document.addEventListener("keydown", onKey);
}
