const grid = document.getElementById("grid");
const reel = document.getElementById("reel");
const spinner = document.getElementById("spinner");
const sectionTitle = document.getElementById("sectionTitle");

const CARD_W = 120;
const GAP = 10;
const STEP = CARD_W + GAP;
const REEL_PADDING = 30; // matches CSS .reel padding: 0 30px

// Put YOUR items here (keep your image paths)
const ITEMS = [
  // T1
  { tier:"t1",  name:"Glock17EXT.",   img:"assets/items/Glock17Ext.png" },
  { tier:"t1",  name:"Glock17MOS",   img:"assets/items/Glock17MOS.png" },
  { tier:"t1",  name:"Glock19xBlack",   img:"assets/items/Glock19xBlack.png" },
  { tier:"t1",  name:"Glock17S", img:"assets/items/Glock17S.png" },
  { tier:"t1",  name:"Glock17C",   img:"assets/items/Glock17C.png" },
  { tier:"t1",  name:"Hellcat",   img:"assets/items/Hellcat.png" },
  { tier:"t1",  name:"Glock19",   img:"assets/items/Glock19.png" },
  { tier:"t1",  name:"M&P9",   img:"assets/items/M&P9.png" },
  { tier:"t1",  name:"Glock40",   img:"assets/items/Glock40.png" },
  { tier:"t1",  name:"HiPoint",   img:"assets/items/HiPoint9mm.png" },
 
  // T1.5
  { tier:"t15", name:"PLR-16",  img:"assets/items/PLR-16.png" },
  { tier:"t15", name:"MPA",  img:"assets/items/MPA.png" },
  { tier:"t15", name:"Glock19x Switch",  img:"assets/items/Glock19xSwitch.png" },
  { tier:"t15", name:"GlockP80 Switch",  img:"assets/items/Glock P80 Switch.png" },
  { tier:"t15",  name:"Glock17 Switch",  img:"assets/items/Glock17Switch.png" },
  { tier:"t15", name:"Glock P80",  img:"assets/items/Glock P80.png" },
  { tier:"t15", name:"ARP Clear Foam",  img:"assets/items/ARP Clear Foam.png" },
  { tier:"t15", name:"AR-15",  img:"assets/items/AR-15.png" },
  { tier:"t15",  name:"DesertEagle",  img:"assets/items/DesertEagle.png" },
  { tier:"t15", name:"Glock30EXT",  img:"assets/items/Glock30EXT.png" },
  { tier:"t15", name:"Glock26EXT",  img:"assets/items/Glock26EXT.png" },
  { tier:"t15", name:"Glock26 Binary",  img:"assets/items/Glock26Binary.png" },
  { tier:"t15", name:"Mac-10",  img:"assets/items/Mac-10.png" },
  { tier:"t15", name:"Glock17R",  img:"assets/items/Glock17R.png" },
  { tier:"t15", name:"Glock19x",    img:"assets/items/Glock19x.png" },
  { tier:"t15", name:"USP45",  img:"assets/items/USP45.png" },
  { tier:"t15", name:"XD9",  img:"assets/items/XD9.png" },
  { tier:"t15", name:"Glock17S",  img:"assets/items/Glock17S.png" },
  { tier:"t15", name:"Glock19",  img:"assets/items/Glock19.png" },
  { tier:"t15", name:"M&P9",  img:"assets/items/M&P9.png" },
  { tier:"t15", name:"BerettaM9",  img:"assets/items/BarretaM9.png" },
  { tier:"t15", name:"Glock40",  img:"assets/items/Glock40.png" },

  // T2
  { tier:"t2",  name:"ARP Drum",   img:"assets/items/DrumARP.png" },
  { tier:"t2",  name:"300BLK",   img:"assets/items/300BLK.png" },
  { tier:"t2",  name:"556Fully",   img:"assets/items/556Fully.png" },
  { tier:"t2",  name:"762Fully",   img:"assets/items/762Fully.png" },
  { tier:"t2",  name:"FullyAR-15",   img:"assets/items/FullyAR-15.png" },
  { tier:"t2",  name:"FullyDraco",   img:"assets/items/FullyDraco.png" },
  { tier:"t2",  name:"Glock30Switch",   img:"assets/items/Glock30Switch.png" },
  { tier:"t2",  name:"Glock40Switch",   img:"assets/items/Glock40Switch.png" },
  { tier:"t2",  name:"Draco",   img:"assets/items/Draco.png" },
  { tier:"t2",  name:"MP5K",  img:"assets/items/MP5K.png" },
  { tier:"t2",  name:"12 Gauge",  img:"assets/items/12Gauge.png" },

];

let currentTier = "t1";

/* ---------- GRID ---------- */
function renderGrid(list) {
  grid.innerHTML = "";
  list.forEach(i => {
    const c = document.createElement("div");
    c.className = "card";
    c.innerHTML = `
      <img src="${i.img}" alt="${i.name}">
      <div class="label">${i.name}</div>
      <div class="badge">${tierText(i.tier)}</div>
    `;
    grid.appendChild(c);
  });
}

function tierText(t) {
  if (t === "t15") return "T1.5";
  return t.toUpperCase();
}

function titleText(t) {
  if (t === "t1") return "Tier 1";
  if (t === "t15") return "Tier 1.5";
  if (t === "t2") return "Tier 2";
  return "Tier";
}

function setTier(t) {
  currentTier = t;
  sectionTitle.textContent = titleText(t);
  renderGrid(ITEMS.filter(i => i.tier === t));
}

document.querySelectorAll(".navbtn[data-filter]").forEach(b => {
  b.onclick = () => setTier(b.dataset.filter);
});

/* ---------- RANDOMIZE ---------- */
document.getElementById("randomBtn").onclick = () => {
  const list = ITEMS.filter(i => i.tier === currentTier);
  list.sort(() => Math.random() - 0.5);
  renderGrid(list);
};

/* ---------- SPINNER (tier-specific) ---------- */
document.getElementById("spinBtn").onclick = () => {
  const pool = ITEMS.filter(i => i.tier === currentTier);

  if (pool.length < 2) {
    alert("Add at least 2 items to this tier first.");
    return;
  }

  // Winner chosen FIRST (correct case logic)
  const winnerIndex = Math.floor(Math.random() * pool.length);
  const winner = pool[winnerIndex];

  // Build a long reel that repeats the tier pool
  reel.innerHTML = "";
  reel.style.transition = "none";
  reel.style.transform = "translateX(0px)";

  // Make the reel long enough to look real
  const repeats = 18; // more = longer spin
  const reelItems = [];
  for (let r = 0; r < repeats; r++) {
    for (const it of pool) reelItems.push(it);
  }

  // Put the winner at a target index far into the reel
  // We pick a base index that is not near the start
  const baseOffset = pool.length * 8;
  const extraCycles = pool.length * (6 + Math.floor(Math.random() * 3));
  const finalIndex = baseOffset + extraCycles + winnerIndex; // lands on winner in that tier

  // Render all reel images
  for (const it of reelItems) {
    const el = document.createElement("img");
    el.src = it.img;
    el.alt = it.name;
    el.style.width = CARD_W + "px";
    reel.appendChild(el);
  }

  // Show spinner overlay
  spinner.style.display = "grid";

  // Compute target translate so finalIndex centers under marker
  // Spinner-box is 700px wide (from CSS), marker is at 50% => 350px center.
  const spinnerBoxWidth = 700;
  const centerX = spinnerBoxWidth / 2;

  // The center of the card at finalIndex in reel coordinates:
  const cardCenter = REEL_PADDING + (finalIndex * STEP) + (CARD_W / 2);

  // We want: cardCenter + translateX == centerX  => translateX = centerX - cardCenter
  const targetX = centerX - cardCenter;

  // Animate fast -> slow
  requestAnimationFrame(() => {
    reel.style.transition = "transform 3.6s cubic-bezier(.08,.6,0,1)";
    reel.style.transform = `translateX(${targetX}px)`;
  });

  // Finish
  setTimeout(() => {
    alert("You got: " + winner.name + " (" + tierText(winner.tier) + ")");
    spinner.style.display = "none";
  }, 3800);
};

/* ---------- INIT ---------- */
setTier("t1");

