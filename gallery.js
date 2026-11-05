// Shared photo components for the Jongno guides.
// - Street gallery: swipeable carousel of freely licensed (Flickr CC) photos with credits.
// - Store photo strip: swipeable cards (exterior / interior / menu / food) that open
//   Naver image search for that store, so viewers see current real photos.
// - Fullscreen viewer: tap a street photo to view it large and keep swiping.

const FLICKR = "https://live.staticflickr.com/";

// [image path, flickr page path, author, license, caption]
const STREET_PHOTOS = {
  seosulla: {
    note: "서순라길은 종묘 서쪽 담장 바깥을 따라 걷는 길이에요. 담장 안쪽 종묘의 모습.",
    items: [
      ["4556/27155630669_ee3650e906_b.jpg", "17505943@N00/27155630669/", "faoch", "CC BY-NC-SA 2.0", "종묘 정전 앞 박석 마당"],
      ["65535/53645593183_7c9a4faf06_b.jpg", "32368927@N02/53645593183/", "virtualwayfarer", "CC BY-NC 2.0", "종묘의 전각과 신로(神路)"],
      ["65535/53645835065_d024a6bc17_b.jpg", "32368927@N02/53645835065/", "virtualwayfarer", "CC BY-NC 2.0", "붉은 벽과 초록 문살, 그리고 고양이 한 마리"],
      ["65535/53645835090_b8226dbdb2_b.jpg", "32368927@N02/53645835090/", "virtualwayfarer", "CC BY-NC 2.0", "종묘 문살 디테일"]
    ]
  },
  jongsam: {
    note: "종로3가 갈매기살·포차 골목의 야장 풍경.",
    items: [
      ["1818/41191901260_2f3d575d09_b.jpg", "155038815@N03/41191901260/", "skaa007", "CC BY-ND 2.0", "광주집 앞 갈매기살 골목 야장"],
      ["5340/29728132813_ca241dc10a_b.jpg", "28021450@N05/29728132813/", "TFurban", "CC BY-NC-ND 2.0", "종로3가 골목길"],
      ["339/19438662859_476f56d608_b.jpg", "28021450@N05/19438662859/", "TFurban", "CC BY-NC-SA 2.0", "종로3가 순대곱창 노포"],
      ["7428/16284764998_c11fe532d7_b.jpg", "28021450@N05/16284764998/", "TFurban", "CC BY-NC-SA 2.0", "낙원상가 순대국 골목, 김 오르는 솥"],
      ["2593/3908106124_a50524afd8_b.jpg", "7765825@N03/3908106124/", "bigbirdz", "CC BY 2.0", "서울 포장마차 야장 (분위기 참고)"]
    ]
  },
  ikseon: {
    note: "한옥 지붕 아래 좁은 골목, 화분과 파라솔이 가득한 익선동.",
    items: [
      ["7898/46833884581_c52abcd8b1_b.jpg", "43547009@N00/46833884581/", "aljuarez", "CC0", "익선동 한옥골목"],
      ["4885/46833892481_264e87ddd4_b.jpg", "43547009@N00/46833892481/", "aljuarez", "CC0", "가게 앞 화분과 파라솔"],
      ["887/27599146328_0b9b36a733_b.jpg", "73479994@N00/27599146328/", "lazy fri13th", "CC BY 2.0", "불 켜진 밤 골목"],
      ["65535/47663053161_58c124a27d_b.jpg", "73479994@N00/47663053161/", "lazy fri13th", "CC BY 2.0", "한옥 카페의 서까래"],
      ["65535/51977275809_7928dcb026_b.jpg", "102760208@N06/51977275809/", "joel.", "CC BY-NC-ND 2.0", "빨간 파라솔 아래"],
      ["1962/43489142550_2d16b71303_b.jpg", "43547009@N00/43489142550/", "aljuarez", "CC BY 2.0", "한옥을 고친 가게들"]
    ]
  },
  euljiro: {
    note: "셔터 내린 공구상가 사이로 불이 켜지는 을지로의 밤.",
    items: [
      ["65535/54559214903_df42beb8fa_b.jpg", "67056263@N04/54559214903/", "Stephen Kelly Photography", "CC BY 2.0", "을지로 뒷골목"],
      ["65535/54279208681_6063191ff1_b.jpg", "28021450@N05/54279208681/", "TFurban", "CC BY-NC-ND 2.0", "을지로 골목 카페 불빛"],
      ["593/23518754225_bb428ffb66_b.jpg", "28021450@N05/23518754225/", "TFurban", "CC BY-NC-SA 2.0", "을지로 밤거리"],
      ["5674/23518751505_fa40480e0a_b.jpg", "28021450@N05/23518751505/", "TFurban", "CC BY-NC-SA 2.0", "노포 중식당 오구반점"],
      ["7898/47122943561_c5461b40d5_b.jpg", "28021450@N05/47122943561/", "TFurban", "CC BY-NC-ND 2.0", "감자국 노포 동원집"],
      ["65535/50988020122_7f1cafa09b_b.jpg", "192370039@N08/50988020122/", "Hee-eun Hahm", "CC BY-NC 2.0", "을지로 커피한약방 골목"]
    ]
  }
};

const LICENSE_URL = {
  "CC0": "https://creativecommons.org/publicdomain/zero/1.0/",
  "CC BY 2.0": "https://creativecommons.org/licenses/by/2.0/",
  "CC BY-SA 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
  "CC BY-ND 2.0": "https://creativecommons.org/licenses/by-nd/2.0/",
  "CC BY-NC 2.0": "https://creativecommons.org/licenses/by-nc/2.0/",
  "CC BY-NC-SA 2.0": "https://creativecommons.org/licenses/by-nc-sa/2.0/",
  "CC BY-NC-ND 2.0": "https://creativecommons.org/licenses/by-nc-nd/2.0/"
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// ---------- Street gallery ----------
function streetGalleryHTML(id) {
  const g = STREET_PHOTOS[id];
  if (!g) return "";
  const slides = g.items.map(([img, page, author, lic, cap], i) => `
    <figure class="g-slide" data-i="${i}">
      <img src="${FLICKR + img}" alt="${esc(cap)}" loading="${i ? "lazy" : "eager"}" decoding="async">
      <figcaption>
        <span class="g-cap">${esc(cap)}</span>
        <a class="g-credit" href="https://www.flickr.com/photos/${page}" target="_blank" rel="noopener">© ${esc(author)} · ${esc(lic)}</a>
      </figcaption>
    </figure>`).join("");
  const dots = g.items.map((_, i) => `<i class="${i ? "" : "on"}"></i>`).join("");
  return `<div class="gallery" data-gallery="${id}">
    <div class="g-track" tabindex="0" aria-label="거리 사진, 옆으로 넘겨 보기">${slides}</div>
    <div class="g-count"><span>1</span>/${g.items.length}</div>
    <button class="g-nav prev" aria-label="이전 사진">‹</button>
    <button class="g-nav next" aria-label="다음 사진">›</button>
    <div class="g-dots" aria-hidden="true">${dots}</div>
  </div>
  <div class="g-note">📷 ${esc(g.note)} 사진을 누르면 크게 볼 수 있어요.</div>`;
}

// ---------- Store photo strip ----------
const SHOT_ICONS = {
  ext: '<svg viewBox="0 0 48 48"><path d="M6 20 24 8l18 12"/><path d="M10 18v22h28V18"/><path d="M20 40V28h8v12"/></svg>',
  int: '<svg viewBox="0 0 48 48"><path d="M8 40V22a16 16 0 0 1 32 0v18"/><path d="M14 40v-8h20v8"/><path d="M24 6v6"/><circle cx="24" cy="16" r="3"/></svg>',
  menu: '<svg viewBox="0 0 48 48"><rect x="11" y="6" width="26" height="36" rx="3"/><path d="M17 15h14M17 22h14M17 29h9"/></svg>',
  food: '<svg viewBox="0 0 48 48"><path d="M6 26h36a18 18 0 0 1-36 0z"/><path d="M18 18c0-3 3-3 3-6M26 18c0-3 3-3 3-6"/></svg>'
};

function naverImg(q) {
  return `https://m.search.naver.com/search.naver?where=m_image&query=${encodeURIComponent(q)}`;
}

// name: store name, area: neighborhood hint, food: signature dish for the food card
function storeStripHTML(name, area, food) {
  const base = `${name} ${area}`.trim();
  const shots = [
    ["ext", "전경", "가게 외관·간판", `${base} 외관`],
    ["int", "내부", "자리·분위기", `${base} 내부`],
    ["menu", "메뉴판", "가격 확인", `${base} 메뉴판`],
    ["food", "음식", food || "대표 메뉴", `${base} ${food || "음식"}`]
  ];
  return `<div class="shots">
    <div class="shots-head"><span>📸 사진 보기</span><small>옆으로 넘겨서 골라 보세요</small></div>
    <div class="shots-track">${shots.map(([k, label, sub, q], i) => `
      <a class="shot shot-${k}" href="${naverImg(q)}" target="_blank" rel="noopener">
        <span class="shot-i">${i + 1}/4</span>
        <span class="shot-icon" aria-hidden="true">${SHOT_ICONS[k]}</span>
        <b>${label}</b><small>${esc(sub)}</small>
        <em>네이버 실사진 ›</em>
      </a>`).join("")}
    </div>
  </div>`;
}

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
    // Stop horizontal swipes inside the gallery from switching districts
    ["touchstart", "touchend"].forEach(t => track.addEventListener(t, e => e.stopPropagation(), { passive: true }));
    track.querySelectorAll(".g-slide img").forEach((img, i) =>
      img.addEventListener("click", () => openViewer(gal.dataset.gallery, i)));
  });
  root.querySelectorAll(".shots-track").forEach(t =>
    ["touchstart", "touchend"].forEach(ev => t.addEventListener(ev, e => e.stopPropagation(), { passive: true })));
}

// ---------- Fullscreen viewer ----------
function openViewer(id, start) {
  const g = STREET_PHOTOS[id];
  const v = document.createElement("div");
  v.className = "viewer";
  v.setAttribute("role", "dialog");
  v.setAttribute("aria-label", "사진 크게 보기");
  v.innerHTML = `
    <button class="v-close" aria-label="닫기">✕</button>
    <div class="v-count"><span>${start + 1}</span>/${g.items.length}</div>
    <div class="v-track">${g.items.map(([img, page, author, lic, cap]) => `
      <figure><img src="${FLICKR + img}" alt="${esc(cap)}"><figcaption>${esc(cap)}<br><a href="https://www.flickr.com/photos/${page}" target="_blank" rel="noopener">© ${esc(author)} · ${esc(lic)}</a></figcaption></figure>`).join("")}
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
