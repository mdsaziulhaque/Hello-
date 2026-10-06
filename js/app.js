/* Band Up — IELTS practice app. Plain JavaScript, no build step. */
(() => {
"use strict";

/* ================= helpers ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const todayStr = (d = new Date()) => d.toISOString().slice(0, 10);
const norm = s => String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/[£$]/g, "").replace(/\s+/g, " ").trim().replace(/[.!?]+$/, "");
const match = (val, ans) => { const a = norm(val), b = norm(ans); return a === b || a.replace(/[\s-]/g, "") === b.replace(/[\s-]/g, ""); };
const fmt = s => `${Math.floor(s / 60)}:${String(Math.max(0, Math.floor(s % 60))).padStart(2, "0")}`;
const wordsOf = t => (t.trim().match(/[A-Za-z0-9'’-]+/g) || []);
const reduceMotion = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================= icons ================= */
const svg = (p, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${p}</svg>`;
const I = {
  home: svg('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>'),
  listen: svg('<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="2" y="14" width="5" height="7" rx="2"/><rect x="17" y="14" width="5" height="7" rx="2"/>'),
  read: svg('<path d="M2 5c3-1.5 7-1.5 10 1 3-2.5 7-2.5 10-1v14c-3-1.5-7-1.5-10 1-3-2.5-7-2.5-10-1z"/><path d="M12 6v14"/>'),
  write: svg('<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>'),
  speak: svg('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v4"/>'),
  vocab: svg('<rect x="3" y="6" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/><path d="M6.5 17l3-7 3 7M7.6 14.5h3.8"/>'),
  tips: svg('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>'),
  flame: svg('<path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-3 2-4 2-7 1.5 1 3 .5 3-4z" fill="currentColor" stroke="none"/>'),
  star: svg('<path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z" fill="currentColor" stroke="none"/>'),
  play: svg('<path d="M7 4l13 8-13 8z" fill="currentColor"/>'),
  stop: svg('<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>'),
  vol: svg('<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>'),
  mute: svg('<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/>'),
  moon: svg('<path d="M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z"/>'),
  mic: svg('<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/>'),
  refresh: svg('<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>'),
  left: svg('<path d="M15 18l-6-6 6-6"/>'),
  right: svg('<path d="M9 18l6-6-6-6"/>'),
  check: svg('<path d="M4 12l5 5L20 6"/>'),
  sparkle: svg('<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>')
};
const speakBtn = (text, extra = "", slot = 0) => `<button class="iconbtn" data-say="${esc(text)}" data-slot="${slot}" aria-label="Listen: ${esc(text)}" ${extra}>${I.vol}</button>`;

/* ================= state ================= */
const KEY = "bandup-ielts-v1";
const DEFAULTS = { xp: 0, streak: 0, last: null, day: { d: null, xp: 0 }, goal: 60, target: 7, exam: "", sound: true, bn: true,
  known: {}, done: {}, badges: {}, view: {}, draft: "", draftPrompt: "", stats: { essays: 0, cards: 0, quiz: 0, pron: 0 }, best: {} };
let S;
try { S = Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(KEY) || "{}")); } catch (e) { S = Object.assign({}, DEFAULTS); }
S.stats = Object.assign({}, DEFAULTS.stats, S.stats || {});
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked: progress lasts this visit */ } };

const LEVELS = [[0, "4", "Starter"], [80, "5", "Explorer"], [200, "5.5", "Climber"], [400, "6", "Competent user"], [700, "6.5", "Confident user"],
  [1100, "7", "Good user"], [1600, "7.5", "Strong user"], [2300, "8", "Very good user"], [3200, "8.5", "Near expert"], [4500, "9", "Expert user"]];
const levelOf = xp => { let i = 0; LEVELS.forEach((l, k) => { if (xp >= l[0]) i = k; }); return i; };

const BADGES = [
  ["first", "👣", "First steps", "Earn your first XP"],
  ["ear", "🎧", "Sharp ears", "Finish a listening part"],
  ["reader", "📖", "Speed reader", "Finish a reading passage"],
  ["writer", "✍️", "Essayist", "Write 250+ words"],
  ["speaker", "🎤", "Speaker", "Finish a 2-minute talk"],
  ["words", "🧠", "Word collector", "Know 50 words"],
  ["streak", "🔥", "On fire", "3-day streak"],
  ["perfect", "💯", "Perfect score", "Get 100% on a test"],
  ["pron", "🗣️", "Clear sounds", "8/10 in the sound game"]
];

/* ================= sound effects (Web Audio) ================= */
const Sound = {
  ctx: null,
  ensure() { if (!this.ctx) { const C = window.AudioContext || window.webkitAudioContext; if (C) this.ctx = new C(); } if (this.ctx && this.ctx.state === "suspended") this.ctx.resume(); return this.ctx; },
  tone(f, dur, type = "sine", when = 0, vol = .14) {
    const c = this.ensure(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + when;
    o.type = type; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + .02);
  },
  play(name) {
    if (!S.sound) return;
    try {
      if (name === "ok") { this.tone(660, .12); this.tone(990, .22, "sine", .09); }
      else if (name === "no") { this.tone(196, .28, "triangle", 0, .16); this.tone(147, .3, "triangle", .1, .12); }
      else if (name === "flip") { this.tone(520, .06, "triangle", 0, .07); this.tone(780, .06, "triangle", .04, .05); }
      else if (name === "tick") { this.tone(1300, .03, "square", 0, .03); }
      else if (name === "level") { [523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(f, .3, "triangle", i * .09, .13)); }
      else if (name === "done") { [784, 988, 1175].forEach((f, i) => this.tone(f, .25, "sine", i * .1, .12)); }
      else if (name === "start") { this.tone(440, .1, "sine"); this.tone(880, .16, "sine", .12); }
      else if (name === "end") { this.tone(880, .15); this.tone(660, .15, "sine", .15); this.tone(440, .35, "sine", .3); }
    } catch (e) { /* audio unavailable */ }
  }
};

/* ================= text-to-speech ================= */
const Voice = {
  ok: "speechSynthesis" in window,
  list: [], token: 0,
  init() {
    if (!this.ok) return;
    const load = () => { this.list = speechSynthesis.getVoices().filter(v => /^en[-_]/i.test(v.lang) || /^en$/i.test(v.lang)); };
    load(); speechSynthesis.onvoiceschanged = load;
  },
  pick(slot) {
    const gb = this.list.filter(v => /GB/i.test(v.lang));
    const pool = gb.length ? gb : this.list;
    if (!pool.length) return null;
    const female = /female|libby|sonia|hazel|kate|serena|susan|emma|amy|mia|maisie|samantha|zira|karen|moira|tessa/i, male = /\bmale\b|ryan|george|daniel|arthur|thomas|oliver|guy|david|alex|fred/i;
    const found = slot === 1 ? pool.find(v => female.test(v.name)) : pool.find(v => male.test(v.name) && !female.test(v.name));
    return found || pool[slot % pool.length] || pool[0];
  },
  speak(text, { slot = 0, rate = 1 } = {}) {
    return new Promise(res => {
      if (!this.ok) return res(false);
      const u = new SpeechSynthesisUtterance(text);
      const v = this.pick(slot);
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = "en-GB";
      u.rate = rate;
      if (!v || this.list.filter(x => /GB/i.test(x.lang)).length < 2) u.pitch = slot === 1 ? 1.25 : .9;
      let done = false; const fin = () => { if (!done) { done = true; clearTimeout(t); res(true); } };
      const t = setTimeout(fin, 2500 + text.length * 95 / rate);
      u.onend = fin; u.onerror = fin;
      speechSynthesis.speak(u);
    });
  },
  say(text, opts) { this.stop(); return this.speak(text, opts); },
  stop() { this.token++; if (this.ok) speechSynthesis.cancel(); }
};
Voice.init();

/* ================= microphone (record + optional live transcript) ================= */
const Mic = { can: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder), SR: window.SpeechRecognition || window.webkitSpeechRecognition };

/* ================= Claude feedback (only inside a claude.ai artifact) ================= */
let askClaude = null;
if (window.claude && typeof window.claude.use === "function") {
  window.claude.use("sample").then(s => { if (s) { askClaude = s; document.body.classList.add("has-ai"); } }).catch(() => {});
}

/* ================= UI feedback ================= */
let toastT;
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2200); }

const Confetti = {
  burst(n = 120) {
    if (reduceMotion()) return;
    const cv = $("#confetti"), cx = cv.getContext("2d");
    cv.width = innerWidth; cv.height = innerHeight;
    const cs = getComputedStyle(document.documentElement);
    const cols = ["--listen", "--read", "--write", "--speak", "--vocab", "--tips", "--gold"].map(v => cs.getPropertyValue(v).trim());
    const ps = Array.from({ length: n }, () => ({ x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight / 3, vx: (Math.random() - .5) * 14, vy: Math.random() * -12 - 4, s: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - .5) * .3, c: pick(cols) }));
    let f = 0;
    const step = () => {
      cx.clearRect(0, 0, cv.width, cv.height);
      ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .35; p.vx *= .99; p.r += p.vr; cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c; cx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .66); cx.restore(); });
      if (++f < 110) requestAnimationFrame(step); else cx.clearRect(0, 0, cv.width, cv.height);
    };
    step();
  }
};

function floatXP(n, ev) {
  const d = document.createElement("div"); d.className = "xpfloat"; d.textContent = `+${n} XP`;
  const x = ev && ev.clientX ? ev.clientX : innerWidth / 2, y = ev && ev.clientY ? ev.clientY : 120;
  d.style.left = (x - 30) + "px"; d.style.top = (y - 30) + "px"; document.body.appendChild(d); setTimeout(() => d.remove(), 1200);
}

function modal(html) {
  const bg = document.createElement("div"); bg.className = "modal-bg";
  bg.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${html}<div class="row" style="justify-content:center;margin-top:16px"><button class="btn" data-close>Keep going</button></div></div>`;
  document.body.appendChild(bg);
  const close = () => bg.remove();
  bg.addEventListener("click", e => { if (e.target === bg || e.target.closest("[data-close]")) close(); });
  $("[data-close]", bg).focus();
}

function addXP(n, ev) {
  if (!n) return;
  const before = levelOf(S.xp), t = todayStr();
  if (S.last !== t) {
    const y = todayStr(new Date(Date.now() - 864e5));
    S.streak = S.last === y ? S.streak + 1 : 1; S.last = t;
  }
  if (S.day.d !== t) S.day = { d: t, xp: 0 };
  S.xp += n; S.day.xp += n;
  floatXP(n, ev);
  award("first");
  if (S.streak >= 3) award("streak");
  const after = levelOf(S.xp);
  if (after > before) {
    Sound.play("level"); Confetti.burst(160);
    const L = LEVELS[after];
    modal(`<div class="big">🎉</div><h2 style="margin-top:8px">Level up: Band ${L[1]}</h2><p class="muted" style="margin-top:6px">You are now a <b>${L[2]}</b> on the Band Up ladder. Keep climbing!</p>`);
  }
  if (S.day.xp - n < S.goal && S.day.xp >= S.goal) { toast("Daily goal reached! 🎯"); Sound.play("done"); }
  save(); renderTop();
}
function award(id) {
  if (S.badges[id]) return;
  S.badges[id] = todayStr(); save();
  const b = BADGES.find(x => x[0] === id);
  if (b && id !== "first") { toast(`Badge unlocked: ${b[1]} ${b[2]}`); Sound.play("done"); }
}

/* cleanup registry: stop timers / speech when leaving a view */
let cleanups = [];
const onLeave = fn => cleanups.push(fn);
const runCleanups = () => { cleanups.forEach(f => { try { f(); } catch (e) {} }); cleanups = []; Voice.stop(); };

function countdown(sec, tick, end) {
  let left = sec; tick(left);
  const id = setInterval(() => { left--; tick(left); if (left <= 0) { clearInterval(id); end && end(); } }, 1000);
  const stop = () => clearInterval(id); onLeave(stop); return stop;
}

/* ================= illustrations ================= */
const W = 'stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"';
const ART = {
  home: (lvl) => dial(lvl),
  listen: `<svg class="hero-art" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="46" fill="rgba(255,255,255,.14)"/><g ${W}><path d="M32 70V58a28 28 0 0 1 56 0v12"/><rect x="26" y="66" width="14" height="22" rx="5" fill="rgba(255,255,255,.3)"/><rect x="80" y="66" width="14" height="22" rx="5" fill="rgba(255,255,255,.3)"/><path d="M104 50q6 10 0 20M12 50q-6 10 0 20" opacity=".7"/></g><g fill="#fff"><circle cx="60" cy="98" r="3"/><circle cx="50" cy="96" r="2"/><circle cx="70" cy="96" r="2"/></g></svg>`,
  read: `<svg class="hero-art" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="46" fill="rgba(255,255,255,.14)"/><g ${W}><path d="M18 38c14-6 28-6 42 4 14-10 28-10 42-4v50c-14-6-28-6-42 4-14-10-28-10-42-4z" fill="rgba(255,255,255,.22)"/><path d="M60 42v50"/><path d="M28 52h20M28 62h20M28 72h14M72 52h20M72 62h20M72 72h14" opacity=".8"/></g><circle cx="92" cy="28" r="9" fill="#FFE66D"/></svg>`,
  write: `<svg class="hero-art" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="46" fill="rgba(255,255,255,.14)"/><g ${W}><rect x="26" y="20" width="56" height="76" rx="6" fill="rgba(255,255,255,.22)"/><path d="M36 36h36M36 48h36M36 60h24M36 72h30" opacity=".8"/><path d="M70 96l6-2 26-26-6-6-26 26z" fill="#fff"/></g></svg>`,
  speak: `<svg class="hero-art" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="46" fill="rgba(255,255,255,.14)"/><g ${W}><path d="M16 30h52a8 8 0 0 1 8 8v22a8 8 0 0 1-8 8H38l-12 10V68h-10a8 8 0 0 1-8-8V38a8 8 0 0 1 8-8z" fill="rgba(255,255,255,.25)"/><path d="M84 52h18a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6h-4v8l-10-8H84" opacity=".85"/></g><g fill="#fff"><circle cx="30" cy="49" r="4"/><circle cx="42" cy="49" r="4"/><circle cx="54" cy="49" r="4"/></g></svg>`,
  vocab: `<svg class="hero-art" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="46" fill="rgba(255,255,255,.14)"/><g ${W}><rect x="20" y="34" width="44" height="58" rx="8" fill="rgba(255,255,255,.2)" transform="rotate(-10 42 63)"/><rect x="50" y="26" width="44" height="58" rx="8" fill="rgba(255,255,255,.32)" transform="rotate(8 72 55)"/></g><text x="72" y="66" text-anchor="middle" font-family="Baloo 2, sans-serif" font-weight="800" font-size="30" fill="#fff" transform="rotate(8 72 55)">Aa</text><g fill="#fff"><rect x="18" y="98" width="14" height="6" rx="3" opacity=".5"/><rect x="36" y="94" width="14" height="10" rx="3" opacity=".65"/><rect x="54" y="88" width="14" height="16" rx="3" opacity=".8"/><rect x="72" y="80" width="14" height="24" rx="3"/></g></svg>`,
  tips: `<svg class="hero-art" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="46" fill="rgba(255,255,255,.14)"/><g ${W}><path d="M60 26a24 24 0 0 0-15 43c3 3 4 6 4 10h22c0-4 1-7 4-10a24 24 0 0 0-15-43z" fill="rgba(255,255,255,.3)"/><path d="M50 88h20M53 96h14"/><path d="M60 8v8M98 20l-6 6M22 20l6 6M110 50h-8M10 50h8" opacity=".8"/></g><path d="M54 56l6 8 6-8" ${W}/></svg>`
};
function dial(lvl) {
  const L = LEVELS[lvl]; const band = parseFloat(L[1]); const frac = (band - 4) / 5;
  const ang = Math.PI * (1 - frac), cx = 95, cy = 100, r = 72;
  const nx = cx + Math.cos(ang) * (r - 14), ny = cy - Math.sin(ang) * (r - 14);
  const seg = (a0, a1, col) => { const p = a => [cx + Math.cos(Math.PI * (1 - a)) * r, cy - Math.sin(Math.PI * (1 - a)) * r]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `<path d="M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}" stroke="${col}" stroke-width="14" fill="none" stroke-linecap="round"/>`; };
  return `<svg class="dial" viewBox="0 0 190 120" role="img" aria-label="Current level: Band ${L[1]}">
    ${seg(0.02, .38, "rgba(255,255,255,.35)")}${seg(.42, .58, "#7DBBFF")}${seg(.62, .78, "#4FD394")}${seg(.82, .98, "#FFB547")}
    <line x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="9" fill="#fff"/>
    <text x="16" y="116" fill="#fff" font-size="11" font-weight="800" font-family="Nunito, sans-serif">4</text><text x="168" y="116" fill="#fff" font-size="11" font-weight="800" font-family="Nunito, sans-serif">9</text>
  </svg>`;
}
const PASSAGE_ART = {
  jute: `<svg viewBox="0 0 600 120" role="img" aria-label="Jute plants growing by water"><rect width="600" height="120" style="fill:var(--read-soft)"/><rect y="88" width="600" height="32" style="fill:var(--listen);opacity:.35"/>${Array.from({ length: 22 }, (_, i) => { const x = 20 + i * 27, h = 50 + (i * 37) % 30; return `<path d="M${x} 92 V${92 - h}" style="stroke:var(--tips)" stroke-width="3"/><ellipse cx="${x + 7}" cy="${98 - h}" rx="8" ry="3.5" style="fill:var(--tips)" transform="rotate(-30 ${x + 7} ${98 - h})"/><ellipse cx="${x - 7}" cy="${108 - h}" rx="8" ry="3.5" style="fill:var(--tips)" transform="rotate(30 ${x - 7} ${108 - h})"/>`; }).join("")}<circle cx="540" cy="30" r="16" style="fill:var(--gold)"/></svg>`,
  sleep: `<svg viewBox="0 0 600 120" role="img" aria-label="A moon and stars over a sleeping mind"><rect width="600" height="120" style="fill:var(--brand)"/>${Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 97) % 600}" cy="${(i * 53) % 110 + 5}" r="${i % 3 + 1}" fill="#fff" opacity=".7"/>`).join("")}<circle cx="480" cy="58" r="30" style="fill:var(--gold)"/><circle cx="494" cy="48" r="28" style="fill:var(--brand)"/><text x="60" y="76" font-family="Baloo 2, sans-serif" font-size="42" font-weight="800" fill="#fff" opacity=".9">z Z z</text></svg>`,
  farm: `<svg viewBox="0 0 600 120" role="img" aria-label="Shelves of plants under LED lights"><rect width="600" height="120" style="fill:var(--surface-2)"/>${[0, 1, 2].map(r => `<rect x="40" y="${16 + r * 34}" width="520" height="4" rx="2" style="fill:var(--vocab)" opacity=".8"/><rect x="40" y="${42 + r * 34}" width="520" height="5" rx="2" style="fill:var(--ink-faint)"/>${Array.from({ length: 20 }, (_, i) => `<circle cx="${56 + i * 26}" cy="${36 + r * 34}" r="7" style="fill:var(--tips)"/>`).join("")}`).join("")}</svg>`
};

/* ================= shell ================= */
const SECTIONS = [
  { id: "home", name: "Home", sub: "Your dashboard", k: "home" },
  { id: "listening", name: "Listening", sub: "4 parts · drills", k: "listen" },
  { id: "reading", name: "Reading", sub: "3 passages", k: "read" },
  { id: "writing", name: "Writing", sub: "Task 1 & Task 2", k: "write" },
  { id: "speaking", name: "Speaking", sub: "Parts 1–3", k: "speak" },
  { id: "vocab", name: "Vocabulary", sub: "Band 6 → 9", k: "vocab" },
  { id: "tips", name: "Tips & Tricks", sub: "Exam secrets", k: "tips" }
];
const iconFor = k => I[k === "home" ? "home" : k];

function buildShell() {
  $("#nav").innerHTML = SECTIONS.map(s => `<a href="#${s.id}" data-sec="${s.id}" class="k-${s.k}"><span class="ic">${iconFor(s.k)}</span><span>${s.name}<small>${s.sub}</small></span></a>`).join("");
  $("#tabbar").innerHTML = SECTIONS.map(s => `<a href="#${s.id}" data-sec="${s.id}" style="--c:var(--${s.k === "home" ? "brand" : s.k})">${iconFor(s.k)}<span>${s.id === "tips" ? "Tips" : s.id === "vocab" ? "Words" : s.name}</span></a>`).join("");
  $("#soundBtn").addEventListener("click", () => { S.sound = !S.sound; save(); renderTop(); if (S.sound) Sound.play("ok"); });
  $("#bnBtn").addEventListener("click", () => { S.bn = !S.bn; save(); renderTop(); });
  $("#themeBtn").addEventListener("click", () => {
    const r = document.documentElement, cur = r.getAttribute("data-theme");
    const dark = cur ? cur === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    r.setAttribute("data-theme", dark ? "light" : "dark");
  });
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-say]");
    if (b) { e.preventDefault(); e.stopPropagation(); Voice.say(b.dataset.say, { slot: +b.dataset.slot || 0, rate: .95 }); if (!Voice.ok) toast("Your browser can't speak text aloud."); }
  }, true);
}
function renderTop() {
  const lvl = levelOf(S.xp), L = LEVELS[lvl];
  $("#topstats").innerHTML = `
    <span class="pill flame" title="Day streak">${I.flame}<span class="num">${S.streak}</span></span>
    <span class="pill xp" title="Total XP">${I.star}<span class="num">${S.xp}</span> XP</span>
    <span class="pill lvl" title="Your level">Band ${L[1]}</span>`;
  const sb = $("#soundBtn"); sb.innerHTML = S.sound ? I.vol : I.mute; sb.setAttribute("aria-pressed", S.sound); sb.setAttribute("aria-label", S.sound ? "Sound effects on" : "Sound effects off");
  const bb = $("#bnBtn"); bb.setAttribute("aria-pressed", S.bn); bb.title = S.bn ? "Hide Bangla help" : "Show Bangla help";
  document.body.classList.toggle("no-bn", !S.bn);
  $("#railLevel").innerHTML = `<b>Band ${L[1]} · ${L[2]}</b><div class="meter" style="margin-top:8px"><i style="width:${nextPct()}%"></i></div><div class="meter-lbl"><span>${S.xp} XP</span><span>${LEVELS[lvl + 1] ? LEVELS[lvl + 1][0] + " XP" : "Max"}</span></div>`;
}
const nextPct = () => { const l = levelOf(S.xp); if (!LEVELS[l + 1]) return 100; return Math.round((S.xp - LEVELS[l][0]) / (LEVELS[l + 1][0] - LEVELS[l][0]) * 100); };

/* ================= router ================= */
let curSec = null;
function route() {
  const h = (location.hash || "#home").slice(1);
  const [sec, sub] = h.split("-");
  const S0 = SECTIONS.find(s => s.id === sec) || SECTIONS[0];
  runCleanups();
  if (sub) { S.view[S0.id] = sub; save(); }
  $$("#nav a, #tabbar a").forEach(a => a.classList.toggle("on", a.dataset.sec === S0.id));
  const main = $("#main");
  const same = curSec === S0.id && $("#sub");
  curSec = S0.id;
  if (same && sub) { renderSub(S0.id); return; }
  main.className = `k-${S0.k}`;
  RENDER[S0.id](main);
  if (!same) window.scrollTo({ top: 0 });
  main.focus({ preventScroll: true });
}

function hero(sec, title, text, bn, art) {
  return `<section class="hero k-${sec.k}"><div><span class="eyebrow">${esc(sec.name)}</span><h1>${title}</h1><p>${text}</p>${bn ? `<p class="bn bn-tip">${bn}</p>` : ""}</div>${art}</section>`;
}
const SUBS = {};
function sectionPage(main, id, title, text, bn, tabs) {
  const sec = SECTIONS.find(s => s.id === id);
  const cur = S.view[id] && tabs.some(t => t[0] === S.view[id]) ? S.view[id] : tabs[0][0];
  S.view[id] = cur;
  SUBS[id] = tabs;
  main.innerHTML = `<div class="wrap">${hero(sec, title, text, bn, ART[sec.k])}
    <div class="subtabs" role="tablist" aria-label="${esc(sec.name)} sections">${tabs.map(t => `<button role="tab" data-sub="${t[0]}" aria-selected="${t[0] === cur}">${t[1]}</button>`).join("")}</div>
    <div id="sub" class="stack"></div></div>`;
  $$(".subtabs [data-sub]", main).forEach(b => b.addEventListener("click", () => { const h = `${id}-${b.dataset.sub}`; if (location.hash.slice(1) === h) { runCleanups(); renderSub(id); } else location.hash = h; }));
  renderSub(id);
}
function renderSub(id) {
  const tabs = SUBS[id]; const cur = S.view[id] && tabs.some(t => t[0] === S.view[id]) ? S.view[id] : tabs[0][0];
  $$(".subtabs [data-sub]").forEach(b => b.setAttribute("aria-selected", b.dataset.sub === cur));
  const el = $("#sub"); el.innerHTML = "";
  tabs.find(t => t[0] === cur)[2](el);
}

/* ================= shared question engine ================= */
const LETTERS = "ABCDEFG";
function qHTML(q, n, uid, ctx = {}) {
  const id = `${uid}-${n}`, num = `<span class="qn">${n}</span>`;
  const t = q.t || ctx.type;
  if (t === "gap") {
    const input = `<input type="text" id="${id}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Answer ${n}">`;
    let txt = esc(q.q); txt = /_{3,}/.test(txt) ? txt.replace(/_{3,}/, input) : `${txt} ${input}`;
    return `<div class="q" data-n="${n}"><div>${num}${q.label ? `<b>${esc(q.label)}:</b> ` : ""}${txt}</div><div class="fbx"></div></div>`;
  }
  if (t === "mcq" || t === "tfng") {
    const opts = t === "tfng" ? ["TRUE", "FALSE", "NOT GIVEN"] : q.opts;
    return `<div class="q" data-n="${n}"><div>${num}${esc(q.q)}</div><div class="opts ${t === "tfng" ? "inline" : ""}">${opts.map((o, j) => `<label class="opt"><input type="radio" name="${id}" value="${t === "tfng" ? o : j}"><span>${t === "mcq" ? `<b>${LETTERS[j]}</b> ` : ""}${esc(o)}</span></label>`).join("")}</div><div class="fbx"></div></div>`;
  }
  let choices = [];
  if (t === "map") choices = LETTERS.split("").map(l => [l, l]);
  if (t === "para") choices = "ABCDEF".split("").map(l => [l, l]);
  if (t === "heading") choices = ctx.headings.map((h, j) => [j, h.split(".")[0]]);
  if (t === "box") choices = ctx.box.map(w => [w, w]);
  return `<div class="q" data-n="${n}"><div class="row">${num}<span>${esc(q.q)}</span><select id="${id}" aria-label="Answer ${n}"><option value="">Choose…</option>${choices.map(c => `<option value="${esc(c[0])}">${esc(c[1])}</option>`).join("")}</select></div><div class="fbx"></div></div>`;
}
function qCheck(root, q, n, uid, ctx = {}, why = "") {
  const el = $(`.q[data-n="${n}"]`, root), t = q.t || ctx.type, id = `${uid}-${n}`;
  let ok = false, correct = "";
  if (t === "gap") { const inp = $("input", el); ok = q.a.some(a => match(inp.value, a)); correct = q.a[0]; inp.classList.add(ok ? "is-right" : "is-wrong"); inp.disabled = true; }
  else if (t === "mcq" || t === "tfng") {
    const ch = $(`input[name="${id}"]:checked`, el);
    const right = t === "tfng" ? q.a : String(q.a);
    ok = !!ch && ch.value === right;
    $$(`input[name="${id}"]`, el).forEach(r => { r.disabled = true; if (r.value === right) r.closest(".opt").classList.add("is-right"); else if (r.checked) r.closest(".opt").classList.add("is-wrong"); });
    correct = t === "tfng" ? q.a : `${LETTERS[q.a]} · ${q.opts[q.a]}`;
  } else {
    const sel = $("select", el);
    const want = t === "box" ? q.a[0] : String(q.a);
    ok = sel.value === want; sel.classList.add(ok ? "is-right" : "is-wrong"); sel.disabled = true;
    correct = t === "heading" ? ctx.headings[q.a] : want;
  }
  const w = q.why || why;
  $(".fbx", el).innerHTML = ok ? `<div class="fb ok"><b>Correct!</b> ${esc(w)}</div>` : `<div class="fb no"><b>Answer: ${esc(correct)}.</b> ${esc(w)}</div>`;
  return ok;
}
function bindOpts(root) {
  root.addEventListener("change", e => {
    if (e.target.type === "radio") { $$(`input[name="${e.target.name}"]`, root).forEach(r => r.closest(".opt").classList.toggle("sel", r.checked)); Sound.play("tick"); }
  });
}
const rawBand = (raw40, col = 2) => { const r = RAW_BANDS.find(b => raw40 >= b[col]); return r ? r[0] : (raw40 >= 8 ? 3.5 : 3); };
function scoreBanner(score, n, extra = "") {
  const pct = Math.round(score / n * 100);
  const msg = pct === 100 ? "Perfect! Brilliant work." : pct >= 75 ? "Great job — you're on track." : pct >= 50 ? "Good effort. Read the explanations below." : "Keep practising — check every explanation.";
  return `<div class="score-banner"><span class="big num">${score}/${n}</span><div><b>${msg}</b><p class="muted">${extra}</p></div></div>`;
}

/* ================= HOME ================= */
function renderHome(main) {
  const lvl = levelOf(S.xp), L = LEVELS[lvl];
  const hr = new Date().getHours();
  const greet = hr < 12 ? "Good morning!" : hr < 18 ? "Good afternoon!" : "Good evening!";
  const known = Object.keys(S.known).length;
  const doneL = LISTENING.filter(p => S.done[p.id] != null).length, doneR = READING.filter(p => S.done[p.id] != null).length;
  const wotd = WORDS[Math.floor(Date.now() / 864e5) % WORDS.length];
  const days = S.exam ? Math.ceil((new Date(S.exam) - new Date(todayStr())) / 864e5) : null;
  const goalPct = Math.min(100, Math.round((S.day.d === todayStr() ? S.day.xp : 0) / S.goal * 100));
  const tiles = [
    ["listening", "listen", "Listening", "Four parts spoken aloud, plus number and spelling drills.", doneL / LISTENING.length, `${doneL}/${LISTENING.length} parts`],
    ["reading", "read", "Reading", "Timed passages with TRUE/FALSE/NOT GIVEN, headings and more.", doneR / READING.length, `${doneR}/${READING.length} passages`],
    ["writing", "write", "Writing", "Charts, model essays and a smart editor that checks your words.", Math.min(1, S.stats.essays / 10), `${S.stats.essays} essays written`],
    ["speaking", "speak", "Speaking", "Examiner questions, cue-card timers and pronunciation games.", Math.min(1, S.stats.cards / 10), `${S.stats.cards} talks done`],
    ["vocab", "vocab", "Vocabulary", "Climb from Band 6 to Band 9 words with flashcards and games.", known / WORDS.length, `${known}/${WORDS.length} words known`],
    ["tips", "tips", "Tips & Tricks", "Exam-day checklist, score calculator and common Bangla-English traps.", null, "Study plans · score tools"]
  ];
  main.className = "k-home";
  main.innerHTML = `<div class="wrap">
    <section class="hero k-home">
      <div><span class="eyebrow">${greet}</span><h1>Climb to Band ${S.target}</h1>
      <p>You're at <b>Band ${L[1]} · ${L[2]}</b> on the practice ladder. Every quiz, talk and essay earns XP. A little every day beats a lot once a week.</p>
      <p class="bn bn-tip">প্রতিদিন একটু করে অনুশীলন করুন — প্রতিটি কাজে XP পাবেন আর ব্যান্ডের সিঁড়িতে উঠবেন।</p></div>
      ${ART.home(lvl)}
    </section>
    <div class="grid g3">
      <div class="card row" style="gap:16px;flex-wrap:nowrap">
        ${ring(goalPct, "var(--tips)", 96, `${goalPct}%`)}
        <div><span class="label" style="--c:var(--tips)">Today's goal</span><h3>${S.day.d === todayStr() ? S.day.xp : 0} / ${S.goal} XP</h3><p class="muted">${goalPct >= 100 ? "Goal smashed. Fantastic!" : "Finish a quiz or a drill to fill the ring."}</p></div>
      </div>
      <div class="card stack" style="gap:8px">
        <span class="label" style="--c:#E8590C">Streak</span>
        <h3 style="display:flex;align-items:center;gap:8px"><span style="color:#E8590C;width:30px">${I.flame}</span> ${S.streak} day${S.streak === 1 ? "" : "s"}</h3>
        <p class="muted">${S.last === todayStr() ? "You've practised today. See you tomorrow!" : "Practise today to keep your streak alive."}</p>
      </div>
      <div class="card stack" style="gap:8px">
        <span class="label">Exam countdown</span>
        <h3>${days == null ? "Set your exam date" : days > 0 ? `${days} days to go` : days === 0 ? "Exam day — good luck!" : "Exam finished"}</h3>
        <label class="field">Exam date<input type="date" id="examDate" value="${esc(S.exam)}"></label>
      </div>
    </div>
    <div class="grid g3">${tiles.map(t => `<a class="tile k-${t[1]}" href="#${t[0]}"><span class="ic">${I[t[1]]}</span><h3>${t[2]}</h3><p>${t[3]}</p>${t[4] == null ? `<div class="meter-lbl"><span>${t[5]}</span></div>` : `<div><div class="meter"><i style="width:${Math.round(t[4] * 100)}%"></i></div><div class="meter-lbl"><span>${t[5]}</span><span>${Math.round(t[4] * 100)}%</span></div></div>`}</a>`).join("")}</div>
    <div class="grid g2">
      <div class="card k-vocab stack">
        <span class="label">Word of the day</span>
        <div class="wotd"><span class="emo" aria-hidden="true">${wotd[4]}</span><div style="min-width:0"><h2>${esc(wotd[0])} <span class="bandchip b${wotd[2]}">Band ${wotd[2]}</span></h2><p class="faint">${esc(wotd[1])} · ${esc(wotd[5])}</p><p class="bn" style="color:var(--vocab);font-weight:600">${esc(wotd[6])}</p></div>${speakBtn(wotd[0])}</div>
        <p style="font-style:italic" class="muted">“${esc(wotd[7])}”</p>
      </div>
      <div class="card stack">
        <span class="label">Badges · ${Object.keys(S.badges).length}/${BADGES.length}</span>
        <div class="badges">${BADGES.map(b => `<div class="badge ${S.badges[b[0]] ? "on" : ""}" title="${esc(b[3])}"><span class="b" aria-hidden="true">${b[1]}</span>${b[2]}</div>`).join("")}</div>
      </div>
    </div>
    <div class="grid g2">
      <div class="card stack">
        <span class="label">Your settings</span>
        <div class="row">
          <label class="field">Target band<select id="setTarget">${["5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"].map(b => `<option ${String(S.target) === b ? "selected" : ""}>${b}</option>`).join("")}</select></label>
          <label class="field">Daily XP goal<select id="setGoal">${[30, 60, 100, 150].map(g => `<option value="${g}" ${S.goal === g ? "selected" : ""}>${g} XP</option>`).join("")}</select></label>
        </div>
        <div class="row"><button class="btn ghost small" id="resetBtn">${I.refresh} Reset progress</button><span class="faint" style="font-size:13px">Progress is saved in this browser.</span></div>
      </div>
      <div class="card stack">
        <span class="label">Your IELTS library</span>
        <p class="muted" style="font-size:14px">The study books and audio you made with Claude. They open in a new tab.</p>
        <ul class="clean">${MY_LIBRARY.slice(0, 4).map(l => `<li><a href="${l[2]}" target="_blank" rel="noopener"><b>${esc(l[0])}</b></a> <span class="faint" style="font-size:13px">· ${esc(l[1])}</span></li>`).join("")}</ul>
        <a href="#tips-library" class="btn soft small" style="align-self:flex-start">See all ${MY_LIBRARY.length} files</a>
      </div>
    </div>
  </div>`;
  $("#examDate").addEventListener("change", e => { S.exam = e.target.value; save(); renderHome(main); });
  $("#setTarget").addEventListener("change", e => { S.target = e.target.value; save(); renderHome(main); });
  $("#setGoal").addEventListener("change", e => { S.goal = +e.target.value; save(); renderHome(main); });
  let armed = false;
  $("#resetBtn").addEventListener("click", e => {
    if (!armed) { armed = true; e.currentTarget.textContent = "Tap again to erase everything"; setTimeout(() => { armed = false; const b = $("#resetBtn"); if (b) b.innerHTML = `${I.refresh} Reset progress`; }, 4000); return; }
    S = Object.assign({}, DEFAULTS, { known: {}, done: {}, badges: {}, view: {}, stats: Object.assign({}, DEFAULTS.stats), best: {} }); save(); renderTop(); renderHome(main); toast("Progress reset.");
  });
}
function ring(pct, col, size, label, sub = "") {
  const r = 40, c = 2 * Math.PI * r;
  return `<div class="ring" style="width:${size}px;height:${size}px"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="${r}" style="stroke:var(--surface-2)" stroke-width="11" fill="none"/><circle class="arc" cx="50" cy="50" r="${r}" style="stroke:${col};transition:stroke-dashoffset .5s" stroke-width="11" fill="none" stroke-linecap="round" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${(c * (1 - pct / 100)).toFixed(1)}"/></svg><div class="t" style="font-size:${size > 120 ? 30 : 20}px"><span>${label}${sub ? `<small>${sub}</small>` : ""}</span></div></div>`;
}
function setRing(el, pct, label, sub) {
  const c = 2 * Math.PI * 40; const a = $(".arc", el); if (a) a.style.strokeDashoffset = (c * (1 - pct / 100)).toFixed(1);
  const t = $(".t", el); if (t) t.innerHTML = `<span>${label}${sub ? `<small>${sub}</small>` : ""}</span>`;
}

/* ================= LISTENING ================= */
function renderListening(main) {
  sectionPage(main, "listening", "Train your ears", "Each recording is read aloud by your device's English voices. Read the questions, press play, and answer as you listen — just like the real test.",
    "প্রশ্ন আগে পড়ুন, তারপর play চাপুন। আসল পরীক্ষার মতো শুনতে শুনতে উত্তর লিখুন।", [
    ["tests", "Practice tests", listenTests],
    ["numbers", "Number drill", el => dictation(el, "numbers")],
    ["spelling", "Spelling drill", el => dictation(el, "spelling")],
    ["tips", "Golden rules", el => tipList(el, LISTEN_TIPS, "listen")],
    ["audio", "Audio library", listenLibrary]
  ]);
}
function voiceNote() {
  return Voice.ok ? "" : `<div class="fb no"><b>No speech voice found.</b> Your browser can't read the recordings aloud. Try Chrome, Edge or Safari, or read the transcript instead.</div>`;
}
function listenTests(el) {
  el.innerHTML = `${voiceNote()}<div class="grid g2">${LISTENING.map(p => {
    const best = S.done[p.id];
    return `<div class="card stack k-listen"><div class="row"><span class="label">Part ${p.part}</span>${best != null ? `<span class="bandchip b7" style="margin-left:auto">Best ${best}/${p.questions.length}</span>` : ""}</div><h3>${esc(p.title)}</h3><p class="muted">${esc(p.context)}</p><p class="faint" style="font-size:13.5px">${p.questions.length} questions · ${["", "Form completion", "Multiple choice + map", "Multiple choice", "Note completion"][p.part]}</p><button class="btn" data-open="${p.id}">${I.play} Start Part ${p.part}</button></div>`;
  }).join("")}</div>`;
  $$("[data-open]", el).forEach(b => b.addEventListener("click", () => listenPart(el, LISTENING.find(p => p.id === b.dataset.open))));
}
function museumMap() {
  const box = (x, y, w, h, l, label) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" style="fill:var(--surface-2);stroke:var(--ink-faint)" stroke-width="1.5"/><text x="${x + w / 2}" y="${y + h / 2 + 7}" text-anchor="middle" font-size="20" font-weight="800" style="fill:var(--listen)">${l}</text>${label ? `<text x="${x + w / 2}" y="${y + h - 6}" text-anchor="middle" font-size="9" style="fill:var(--ink-faint)">${label}</text>` : ""}`;
  return `<div class="chartbox mapbox"><svg viewBox="-16 0 436 330" role="img" aria-label="Museum floor plan with rooms lettered A to G">
    <rect x="10" y="10" width="400" height="290" rx="10" style="fill:var(--surface);stroke:var(--ink)" stroke-width="2.5"/>
    <text x="210" y="160" text-anchor="middle" font-size="13" font-weight="800" style="fill:var(--ink-faint)" letter-spacing="2">MAIN HALL</text>
    ${box(20, 20, 110, 70, "D")}${box(155, 20, 110, 60, "E")}${box(290, 20, 110, 70, "F")}
    <circle cx="70" cy="160" r="38" style="fill:var(--surface-2);stroke:var(--ink-faint)" stroke-width="1.5"/><text x="70" y="167" text-anchor="middle" font-size="20" font-weight="800" style="fill:var(--listen)">G</text>
    <rect x="340" y="110" width="60" height="50" rx="4" style="fill:none;stroke:var(--ink-faint)" stroke-width="1.5" stroke-dasharray="4 3"/>${[0, 1, 2, 3, 4].map(i => `<line x1="340" y1="${116 + i * 9}" x2="400" y2="${116 + i * 9}" style="stroke:var(--ink-faint)"/>`).join("")}<text x="370" y="176" text-anchor="middle" font-size="10" font-weight="700" style="fill:var(--ink-soft)">Stairs</text>
    ${box(340, 182, 60, 40, "C")}
    ${box(20, 220, 110, 70, "A")}${box(290, 226, 110, 64, "B")}
    <rect x="0" y="228" width="10" height="58" style="fill:var(--listen)" opacity=".5"/><text x="-4" y="258" font-size="10" font-weight="800" text-anchor="middle" transform="rotate(-90 -4 258)" style="fill:var(--listen)">RIVER</text>
    <rect x="175" y="294" width="70" height="12" style="fill:var(--surface)"/>
    <path d="M210 326 V302 M200 312 L210 302 L220 312" style="stroke:var(--listen)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <text x="250" y="322" font-size="11" font-weight="800" style="fill:var(--ink)">ENTRANCE · You are here</text>
  </svg></div>`;
}
function listenPart(el, item) {
  const uid = item.id;
  let mode = "practice", playing = false, played = false, rate = 1, checked = false;
  const qs = item.questions;
  let qhtml;
  if (item.part === 1) qhtml = `<div class="formsheet"><h4>${esc(item.form)}</h4>${qs.map((q, i) => `<div class="frow q" data-n="${i + 1}"><span><span class="qn">${i + 1}</span>${esc(q.label)}</span><span>${esc(q.q).replace(/_{3,}/, `<input type="text" id="${uid}-${i + 1}" autocomplete="off" spellcheck="false" aria-label="Answer ${i + 1}">`)}</span><div class="fbx" style="flex-basis:100%"></div></div>`).join("")}</div>`;
  else if (item.part === 4) qhtml = `<div class="formsheet"><h4>${esc(item.notes)}</h4>${qs.map((q, i) => qHTML(q, i + 1, uid)).join("")}</div>`;
  else qhtml = qs.map((q, i) => (q.t === "map" && (i === 0 || qs[i - 1].t !== "map") ? museumMap() : "") + qHTML(q, i + 1, uid)).join("");
  el.innerHTML = `
    <div class="card stack">
      <div class="row"><button class="btn ghost small" data-back>${I.left} All parts</button><span class="label">Part ${item.part} · ${qs.length} questions</span></div>
      <h2>${esc(item.title)}</h2><p class="muted">${esc(item.context)}</p>
      <div class="subtabs" role="tablist" aria-label="Mode"><button data-mode="practice" aria-selected="true">Practice mode</button><button data-mode="exam" aria-selected="false">Exam mode · play once</button></div>
      <div class="player">
        <button class="playbtn" id="lpPlay" aria-label="Play recording">${I.play}</button>
        <div class="wave" id="lpWave">${Array.from({ length: 32 }, (_, i) => `<i style="animation-delay:-${(i * .13 % 1).toFixed(2)}s"></i>`).join("")}</div>
        <label class="field">Speed<select id="lpRate"><option value=".85">Slow</option><option value="1" selected>Normal</option><option value="1.12">Fast</option></select></label>
      </div>
      <p class="faint" id="lpStatus">Read questions 1–${qs.length} first. Then press play.</p>
      ${voiceNote()}
    </div>
    <div class="card stack"><p><b>${esc(item.instructions)}</b></p>${qhtml}
      <div class="row"><button class="btn" id="lpCheck">${I.check} Check answers</button><button class="btn ghost" id="lpRetry" hidden>${I.refresh} Try again</button></div>
      <div id="lpResult"></div></div>
    <details class="more" id="lpTr"><summary>Transcript</summary><div><div class="transcript">${item.lines.map((l, i) => `<p data-l="${i}"><span class="spk">${esc(item.speakers[l[0]].name)}:</span> ${esc(l[1])}</p>`).join("")}</div></div></details>`;
  bindOpts(el);
  $("[data-back]", el).addEventListener("click", () => { Voice.stop(); listenTests(el); });
  const tr = $("#lpTr"), st = $("#lpStatus"), btn = $("#lpPlay"), wave = $("#lpWave");
  $$("[data-mode]", el).forEach(b => b.addEventListener("click", () => {
    mode = b.dataset.mode; $$("[data-mode]", el).forEach(x => x.setAttribute("aria-selected", x === b));
    tr.classList.toggle("hidden", mode === "exam" && !checked);
    st.textContent = mode === "exam" ? "Exam mode: you can play the recording once. The transcript is hidden." : "Practice mode: replay as often as you like.";
  }));
  $("#lpRate").addEventListener("change", e => rate = +e.target.value);
  const setPlaying = v => { playing = v; btn.innerHTML = v ? I.stop : I.play; btn.setAttribute("aria-label", v ? "Stop recording" : "Play recording"); wave.classList.toggle("on", v); };
  btn.addEventListener("click", async () => {
    if (playing) { Voice.stop(); setPlaying(false); st.textContent = "Stopped."; return; }
    if (mode === "exam" && played && !checked) { toast("Exam mode: one play only. Check your answers first."); Sound.play("no"); return; }
    if (!Voice.ok) { toast("Speech isn't available in this browser."); return; }
    Voice.stop(); const tok = Voice.token; setPlaying(true); played = true; Sound.play("start");
    for (let i = 0; i < item.lines.length; i++) {
      if (tok !== Voice.token) return;
      const l = item.lines[i];
      $$("#lpTr p").forEach(p => p.classList.toggle("now", +p.dataset.l === i));
      st.textContent = `Playing… ${item.speakers[l[0]].name} speaking (${i + 1}/${item.lines.length})`;
      await Voice.speak(l[1], { slot: item.speakers[l[0]].slot, rate });
      await sleep((item.lines[i + 1] || l)[0] !== l[0] ? 300 : 150);
    }
    if (tok !== Voice.token) return;
    setPlaying(false); $$("#lpTr p").forEach(p => p.classList.remove("now"));
    st.textContent = "Recording finished. Check your answers when you're ready."; Sound.play("end");
  });
  $("#lpCheck").addEventListener("click", ev => {
    if (checked) return; checked = true; Voice.stop(); setPlaying(false);
    let score = 0;
    qs.forEach((q, i) => { if (qCheck(el, q, i + 1, uid, {}, item.why[i])) score++; });
    score === qs.length ? (Sound.play("done"), Confetti.burst()) : Sound.play(score >= qs.length / 2 ? "ok" : "no");
    $("#lpResult").innerHTML = scoreBanner(score, qs.length, "The transcript is now open — find where each answer was said.");
    tr.classList.remove("hidden"); tr.open = true;
    S.done[item.id] = Math.max(S.done[item.id] || 0, score);
    award("ear"); if (score === qs.length) award("perfect");
    addXP(score * 5 + 10, ev);
    $("#lpCheck").hidden = true; $("#lpRetry").hidden = false;
  });
  $("#lpRetry").addEventListener("click", () => listenPart(el, item));
}

/* number & spelling dictation */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const ord = n => n + (n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th");
const DIG = ["oh", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
function sayDigits(s) {
  const out = []; for (let i = 0; i < s.length; i++) { if (s[i + 1] === s[i] && s[i + 2] !== s[i]) { out.push("double " + DIG[+s[i]]); i++; } else out.push(DIG[+s[i]]); }
  return out.join(" ");
}
function makeNumberItem() {
  const k = pick(["teen", "price", "phone", "year", "date", "time", "teen"]);
  if (k === "teen") { const n = Math.random() < .5 ? 13 + Math.floor(Math.random() * 7) : (3 + Math.floor(Math.random() * 7)) * 10; return { kind: "Number (13 or 30?)", say: `The answer is ${n}.`, ans: [String(n)] }; }
  if (k === "price") { const p = 3 + Math.floor(Math.random() * 60), c = pick([0, 25, 50, 75, 99, 40]); const say = c ? `It costs ${p} pounds ${c}.` : `It costs ${p} pounds.`; const v = c ? `${p}.${String(c).padStart(2, "0")}` : String(p); return { kind: "Price in £", say, ans: [v, c ? `${p}.${c}` : `${p}.00`] }; }
  if (k === "phone") { let s = "07"; for (let i = 0; i < 9; i++) s += Math.floor(Math.random() * 10); if (Math.random() < .6) { const j = 4 + Math.floor(Math.random() * 5); s = s.slice(0, j) + s[j - 1] + s.slice(j + 1); } return { kind: "Phone number", say: `My number is ${sayDigits(s.slice(0, 5))}, ${sayDigits(s.slice(5, 8))}, ${sayDigits(s.slice(8))}.`, ans: [s] }; }
  if (k === "year") { const y = 1950 + Math.floor(Math.random() * 76); return { kind: "Year", say: `It was built in ${y}.`, ans: [String(y)] }; }
  if (k === "date") { const d = 1 + Math.floor(Math.random() * 28), m = Math.floor(Math.random() * 12); return { kind: "Date (day + month)", say: `The course starts on the ${ord(d)} of ${MONTHS[m]}.`, check: v => { const x = norm(v); return new RegExp(`(^|\\D)${d}(st|nd|rd|th)?(\\D|$)`).test(x) && x.includes(MONTHS[m].slice(0, 3).toLowerCase()); }, ans: [`${d} ${MONTHS[m]}`] }; }
  const h = 1 + Math.floor(Math.random() * 11), mm = pick([0, 15, 30, 45, 10, 20]);
  const say = mm === 0 ? `${h} o'clock` : mm === 15 ? `a quarter past ${h}` : mm === 30 ? `half past ${h}` : mm === 45 ? `a quarter to ${h + 1}` : `${mm} past ${h}`;
  const m2 = String(mm).padStart(2, "0"), ans = `${h}:${m2}`;
  return { kind: "Time", say: `The bus leaves at ${say}.`, check: v => { const x = norm(v).replace(/\s*(am|pm|a\.m|p\.m|o'clock)/, "").replace(".", ":").trim(); return x === ans || x === "0" + ans || (mm === 0 && x === String(h)); }, ans: [ans] };
}
function dictation(el, type) {
  let n = 0, score = 0, item = null; const total = 10;
  const next = () => {
    n++; if (n > total) return finish();
    if (type === "numbers") item = makeNumberItem();
    else { const w = pick(SPELL_WORDS); item = { kind: "Spelling", word: w, say: spellOut(w), ans: [w] }; }
    el.innerHTML = `<div class="card stack" style="max-width:640px;margin:0 auto;width:100%">
      <div class="row"><span class="label">${type === "numbers" ? "Number dictation" : "Spelling dictation"} · ${n}/${total}</span><span class="bandchip b7" style="margin-left:auto">Score ${score}</span></div>
      <div class="meter"><i style="width:${(n - 1) / total * 100}%"></i></div>
      <h3>${type === "numbers" ? `Listen and write the <span style="color:var(--listen)">${esc(item.kind.toLowerCase())}</span>.` : "Listen to the letters and write the word."}</h3>
      <div class="player"><button class="playbtn" id="dPlay" aria-label="Play">${I.play}</button><p class="muted">${type === "numbers" ? "Tip: 'oh' = 0 · 'double six' = 66 · listen for -teen vs -ty." : "Tip: 'double S' means SS. Capital letters don't matter."}</p></div>
      <div class="row"><input type="text" id="dIn" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer" style="flex:1;min-width:0;font-size:20px"><button class="btn" id="dGo">Check</button></div>
      <div id="dFb"></div>${voiceNote()}</div>`;
    const play = () => Voice.say(item.say, { slot: n % 2, rate: type === "spelling" ? .8 : .95 });
    $("#dPlay").addEventListener("click", play);
    setTimeout(play, 350);
    const go = ev => {
      const v = $("#dIn").value; if (!v.trim()) return;
      const ok = item.check ? item.check(v) : item.ans.some(a => match(v, a));
      if (ok) { score++; Sound.play("ok"); addXP(2, ev); } else Sound.play("no");
      $("#dFb").innerHTML = `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? "Correct!" : `Answer: ${esc(item.ans[0])}`}</b> ${type === "numbers" ? `You heard: “${esc(item.say)}”` : ""}</div><div class="row" style="margin-top:10px"><button class="btn" id="dNext">${n === total ? "See score" : "Next"} ${I.right}</button></div>`;
      $("#dIn").disabled = true; $("#dGo").disabled = true; $("#dNext").focus();
      $("#dNext").addEventListener("click", next);
    };
    $("#dGo").addEventListener("click", go);
    $("#dIn").addEventListener("keydown", e => { if (e.key === "Enter") go(e); });
    $("#dIn").focus();
  };
  const finish = () => {
    if (score === total) { Confetti.burst(); Sound.play("done"); }
    el.innerHTML = `<div class="card stack" style="max-width:640px;margin:0 auto;width:100%">${scoreBanner(score, total, "Numbers and spelling are the easiest marks to win — and the easiest to lose.")}<button class="btn" id="dAgain">${I.refresh} Play again</button></div>`;
    $("#dAgain").addEventListener("click", () => dictation(el, type));
  };
  el.innerHTML = `<div class="card stack" style="max-width:640px;margin:0 auto;width:100%"><span class="label">${type === "numbers" ? "Number dictation" : "Spelling dictation"}</span><h3>${type === "numbers" ? "Phone numbers, prices, dates, times and the 13/30 trap" : "Names and words spelt letter by letter, like Part 1"}</h3><p class="muted">10 rounds. Each correct answer earns 2 XP. Press the play button to hear it again.</p><p class="bn bn-tip">${type === "numbers" ? "সংখ্যা, দাম, তারিখ আর ১৩/৩০-এর ফাঁদ — শুনে লিখুন।" : "অক্ষর শুনে শব্দটি সঠিক বানানে লিখুন।"}</p>${voiceNote()}<button class="btn" id="dStart">${I.play} Start</button></div>`;
  $("#dStart").addEventListener("click", next);
}
function spellOut(w) {
  const L = w.toUpperCase().split(""); const out = [];
  for (let i = 0; i < L.length; i++) { if (L[i] === " ") continue; if (L[i + 1] === L[i]) { out.push(`double ${L[i]}`); i++; } else out.push(L[i]); }
  return out.join(", ") + ".";
}
function listenLibrary(el) {
  const lib = MY_LIBRARY[1];
  el.innerHTML = `<div class="card stack k-listen"><span class="label">Your audio book</span><h3>${esc(lib[0])}</h3><p class="muted">You already have 97 recorded tracks from the <i>Listen for the Answer</i> course: the diagnostic test, chapter drills and eight full practice tests (Test 1–8, Parts 1–4). Use them with the book for full-length timed practice.</p><a class="btn" href="${lib[2]}" target="_blank" rel="noopener">${I.listen} Open the audio library</a></div>
  <div class="card stack"><span class="label">Shadowing routine</span><h3>Use any track to improve pronunciation too</h3><ol class="dots"><li>Choose a 30–60 second clip with a clear voice.</li><li>Listen once with the transcript.</li><li>Speak along with the speaker, one or two words behind, like a shadow.</li><li>Record yourself and compare. Repeat the same clip for three days.</li></ol><p class="bn bn-tip">একই অডিও তিন দিন shadowing করুন — রোজ নতুন অডিওর চেয়ে এটা বেশি কাজে দেয়।</p></div>`;
}
function tipList(el, list, k) {
  el.innerHTML = `<div class="card k-${k}">${list.map((t, i) => `<div class="tip"><span class="n">${i + 1}</span><div><h4>${esc(t[0])}</h4><p class="muted">${esc(t[1])}</p>${t[2] ? `<p class="bn bn-tip">${esc(t[2])}</p>` : ""}</div></div>`).join("")}</div>`;
}

/* ================= READING ================= */
function renderReading(main) {
  sectionPage(main, "reading", "Read smarter, not slower", "Three Academic-style passages with a 20-minute timer each. Select any text in a passage to highlight it.",
    "প্রতিটি passage-এ ২০ মিনিট। passage-এর যেকোনো অংশ সিলেক্ট করলে হাইলাইট হবে।", [
    ["passages", "Passages", readList],
    ["tfng", "TRUE/FALSE/NOT GIVEN trainer", tfngTrainer],
    ["tips", "Strategies", el => tipList(el, READ_TIPS, "read")]
  ]);
}
function readList(el) {
  el.innerHTML = `<div class="grid g3">${READING.map(p => {
    const n = p.groups.reduce((a, g) => a + g.items.length, 0), best = S.done[p.id];
    return `<div class="card stack k-read" style="padding:0;overflow:hidden"><div style="height:90px;overflow:hidden">${PASSAGE_ART[p.art]}</div><div class="stack" style="padding:0 18px 18px"><div class="row"><span class="label">${n} questions · ${p.minutes} min</span>${best != null ? `<span class="bandchip b7" style="margin-left:auto">Best ${best}/${n}</span>` : ""}</div><h3>${esc(p.title)}</h3><p class="muted">${esc(p.sub)}</p><p class="faint" style="font-size:13px">${p.groups.map(g => g.title.split("·")[1].trim()).join(" · ")}</p><button class="btn" data-open="${p.id}">${I.read} Start reading</button></div></div>`;
  }).join("")}</div>`;
  $$("[data-open]", el).forEach(b => b.addEventListener("click", () => readPassage(el, READING.find(p => p.id === b.dataset.open))));
}
function readPassage(el, p) {
  const uid = p.id; let n = 0, checked = false;
  const all = [];
  const groupsHTML = p.groups.map(g => {
    const ctx = { type: g.type, headings: p.headings, box: g.box };
    const items = g.items.map(it => { n++; all.push([it, n, ctx]); return qHTML(it, n, uid, ctx); }).join("");
    return `<div class="stack"><h4>${esc(g.title)}</h4><p class="muted" style="font-size:14px">${esc(g.help)}</p>
      ${g.type === "heading" ? `<div class="card tint flat" style="padding:12px 14px;font-size:14.5px"><b>List of headings</b><ul class="clean" style="margin-top:6px">${p.headings.map(h => `<li>${esc(h)}</li>`).join("")}</ul></div>` : ""}
      ${g.type === "box" ? `<div class="row">${g.box.map(w => `<span class="pill">${esc(w)}</span>`).join("")}</div>` : ""}
      ${items}</div>`;
  }).join("");
  el.innerHTML = `<div class="row"><button class="btn ghost small" data-back>${I.left} All passages</button><span class="timer" id="rTimer" aria-live="off">${fmt(p.minutes * 60)}</span><button class="btn soft small" id="rStart">Start timer</button><button class="btn ghost small" id="rClear">Clear highlights</button></div>
  <div class="split">
    <article class="card passage" id="rText"><div style="border-radius:12px;overflow:hidden;margin-bottom:14px">${PASSAGE_ART[p.art]}</div><h3>${esc(p.title)}</h3><p class="faint" style="margin-bottom:14px"><i>${esc(p.sub)}</i></p>${p.paras.map(pp => `<div class="para"><b>${pp[0]}</b><p>${esc(pp[1])}</p></div>`).join("")}</article>
    <div class="card stack sticky qpanel" id="rQs">${groupsHTML}
      <div class="row"><button class="btn" id="rCheck">${I.check} Check answers</button><button class="btn ghost" id="rRetry" hidden>${I.refresh} Try again</button></div><div id="rResult"></div></div>
  </div>`;
  bindOpts(el);
  $("[data-back]", el).addEventListener("click", () => readList(el));
  let stopT = null;
  $("#rStart").addEventListener("click", e => {
    if (stopT) return; e.currentTarget.disabled = true; Sound.play("start");
    stopT = countdown(p.minutes * 60, s => { const t = $("#rTimer"); if (t) { t.textContent = fmt(s); t.classList.toggle("low", s <= 120); } }, () => { Sound.play("end"); toast("Time's up! Check your answers."); });
  });
  const txt = $("#rText");
  txt.addEventListener("mouseup", highlight); txt.addEventListener("touchend", () => setTimeout(highlight, 50));
  function highlight() {
    const s = window.getSelection(); if (!s || s.isCollapsed || !txt.contains(s.anchorNode)) return;
    const r = s.getRangeAt(0); if (!txt.contains(r.commonAncestorContainer)) return;
    try { const m = document.createElement("mark"); m.className = "hl"; r.surroundContents(m); s.removeAllRanges(); } catch (e) { toast("Highlight within one paragraph at a time."); }
  }
  $("#rClear").addEventListener("click", () => $$("mark.hl", txt).forEach(m => m.replaceWith(...m.childNodes)));
  $("#rCheck").addEventListener("click", ev => {
    if (checked) return; checked = true; stopT && stopT();
    let score = 0; all.forEach(([it, k, ctx]) => { if (qCheck(el, it, k, uid, ctx)) score++; });
    const band = rawBand(Math.round(score / all.length * 40), 2);
    score === all.length ? (Sound.play("done"), Confetti.burst()) : Sound.play(score >= all.length / 2 ? "ok" : "no");
    $("#rResult").innerHTML = scoreBanner(score, all.length, `Scoring like this across a full test ≈ <b>Band ${band.toFixed(1)}</b> in Academic Reading.`);
    S.done[p.id] = Math.max(S.done[p.id] || 0, score); award("reader"); if (score === all.length) award("perfect");
    addXP(score * 4 + 10, ev);
    $("#rCheck").hidden = true; $("#rRetry").hidden = false;
  });
  $("#rRetry").addEventListener("click", () => readPassage(el, p));
}
function tfngTrainer(el) {
  const items = shuffle(TFNG); let i = 0, score = 0;
  const show = () => {
    if (i >= items.length) { if (score >= 10) Confetti.burst(); el.innerHTML = `<div class="card stack" style="max-width:700px;margin:0 auto;width:100%">${scoreBanner(score, items.length, "FALSE = the text says the opposite. NOT GIVEN = the text doesn't say.")}<button class="btn" id="tAgain">${I.refresh} Play again</button></div>`; $("#tAgain").addEventListener("click", () => tfngTrainer(el)); return; }
    const it = items[i];
    el.innerHTML = `<div class="card stack" style="max-width:700px;margin:0 auto;width:100%">
      <div class="row"><span class="label">Statement ${i + 1}/${items.length}</span><span class="bandchip b7" style="margin-left:auto">Score ${score}</span></div>
      <div class="meter"><i style="width:${i / items.length * 100}%"></i></div>
      <div class="card tint flat"><span class="label">The text says</span><p style="font-size:18px;margin-top:4px">${esc(it.text)}</p></div>
      <div><span class="label" style="--c:var(--ink-faint)">Statement</span><p style="font-size:18px;font-weight:700;margin-top:4px">${esc(it.s)}</p></div>
      <div class="grid g3">${["TRUE", "FALSE", "NOT GIVEN"].map(a => `<button class="btn ${a === "TRUE" ? "good" : a === "FALSE" ? "bad" : ""}" data-a="${a}" style="${a === "NOT GIVEN" ? "background:var(--ink-soft)" : ""}">${a}</button>`).join("")}</div>
      <div id="tFb"></div></div>`;
    $$("[data-a]", el).forEach(b => b.addEventListener("click", ev => {
      const ok = b.dataset.a === it.a; if (ok) { score++; Sound.play("ok"); addXP(2, ev); } else Sound.play("no");
      $$("[data-a]", el).forEach(x => { x.disabled = true; if (x.dataset.a === it.a) x.style.outline = "4px solid var(--gold)"; });
      $("#tFb").innerHTML = `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? "Correct!" : `It's ${it.a}.`}</b> ${esc(it.why)}</div><div class="row" style="margin-top:10px"><button class="btn" id="tNext">Next ${I.right}</button></div>`;
      $("#tNext").addEventListener("click", () => { i++; show(); }); $("#tNext").focus();
    }));
  };
  show();
}

/* ================= WRITING ================= */
function renderWriting(main) {
  sectionPage(main, "writing", "Write to Band 7+", "Study real chart types and model essays, see how the same idea looks at Band 6 and Band 8, then write your own with a timer and live feedback.",
    "চার্ট ও মডেল প্রবন্ধ দেখুন, Band 6 আর Band 8-এর পার্থক্য বুঝুন, তারপর টাইমার চালিয়ে নিজে লিখুন।", [
    ["task1", "Task 1 · Charts", task1View],
    ["task2", "Task 2 · Essays", task2View],
    ["compare", "Band 6 vs Band 8", compareView],
    ["editor", "Practice editor", el => editorView(el)],
    ["linkers", "Linking words", linkersView],
    ["tips", "Tips", el => tipList(el, WRITE_TIPS, "write")]
  ]);
}
const SERIES_COL = ["var(--read)", "var(--write)", "var(--listen)", "var(--speak)"];
function chartSVG(t) {
  const c = t.chart;
  if (t.kind === "line" || t.kind === "bar") {
    const Wd = 560, H = 320, L = 50, R = 20, T = 20, B = 60, w = Wd - L - R, h = H - T - B;
    const y = v => T + h - v / c.max * h;
    const step = c.max / 5; let g = "";
    for (let v = 0; v <= c.max; v += step) g += `<line class="grid-l" x1="${L}" x2="${Wd - R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L - 8}" y="${y(v) + 4}" text-anchor="end" font-size="11">${v}${c.unit === "%" ? "%" : ""}</text>`;
    let body = "";
    if (t.kind === "line") {
      const x = i => L + 20 + i * (w - 40) / (c.x.length - 1);
      c.x.forEach((lab, i) => body += `<text x="${x(i)}" y="${T + h + 18}" text-anchor="middle" font-size="12">${lab}</text>`);
      c.series.forEach((s, k) => { body += `<polyline points="${s.v.map((v, i) => `${x(i)},${y(v)}`).join(" ")}" style="stroke:${SERIES_COL[k]}" stroke-width="3.5" fill="none" stroke-linejoin="round"/>` + s.v.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="5" style="fill:${SERIES_COL[k]};stroke:var(--surface)" stroke-width="2"><title>${s.name} ${c.x[i]}: ${v}${c.unit}</title></circle>`).join(""); });
    } else {
      const gw = w / c.x.length, bw = Math.min(34, (gw - 24) / c.series.length);
      c.x.forEach((lab, i) => {
        const gx = L + i * gw + (gw - bw * c.series.length) / 2;
        c.series.forEach((s, k) => body += `<rect x="${gx + k * bw}" y="${y(s.v[i])}" width="${bw - 3}" height="${T + h - y(s.v[i])}" rx="3" style="fill:${SERIES_COL[k]}"><title>${lab} ${s.name}: ${s.v[i]} ${c.unit}</title></rect><text x="${gx + k * bw + (bw - 3) / 2}" y="${y(s.v[i]) - 5}" text-anchor="middle" font-size="10.5" font-weight="700">${s.v[i]}</text>`);
        body += `<text x="${L + i * gw + gw / 2}" y="${T + h + 18}" text-anchor="middle" font-size="12">${lab}</text>`;
      });
    }
    const legend = c.series.map((s, k) => `<rect x="${L + k * 130}" y="${H - 22}" width="14" height="14" rx="3" style="fill:${SERIES_COL[k]}"/><text x="${L + k * 130 + 20}" y="${H - 10}" font-size="12.5" font-weight="700">${s.name}</text>`).join("");
    return `<svg viewBox="0 0 ${Wd} ${H}" role="img" aria-label="${esc(t.title)}">${g}<line class="axis" x1="${L}" x2="${Wd - R}" y1="${T + h}" y2="${T + h}" stroke-width="1.5"/>${body}${legend}${t.kind === "bar" ? `<text x="12" y="${T + h / 2}" font-size="11" transform="rotate(-90 12 ${T + h / 2})" text-anchor="middle">hours per week</text>` : ""}</svg>`;
  }
  if (t.kind === "pie") {
    const cols = ["var(--ink-soft)", "var(--read)", "var(--speak)", "var(--tips)"];
    const pie = (vals, cx, cy, r) => { let a = -Math.PI / 2, out = ""; vals.forEach((v, i) => { const a2 = a + v / 100 * 2 * Math.PI, large = v > 50 ? 1 : 0; const p = (an, rr = r) => [cx + Math.cos(an) * rr, cy + Math.sin(an) * rr]; const [x0, y0] = p(a), [x1, y1] = p(a2), [lx, ly] = p((a + a2) / 2, r * .64); out += `<path d="M${cx} ${cy} L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}Z" style="fill:${cols[i]};stroke:var(--surface)" stroke-width="2"/><text x="${lx.toFixed(1)}" y="${(ly + 5).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="800" style="fill:#fff">${v}%</text>`; a = a2; }); return out; };
    return `<svg viewBox="0 0 560 300" role="img" aria-label="${esc(t.title)}">${c.years.map((yr, k) => `<text x="${140 + k * 280}" y="22" text-anchor="middle" font-size="15" font-weight="800">${yr.name}</text>${pie(yr.v, 140 + k * 280, 140, 100)}`).join("")}${c.parts.map((p, i) => `<rect x="${60 + i * 120}" y="270" width="14" height="14" rx="3" style="fill:${cols[i]}"/><text x="${80 + i * 120}" y="282" font-size="12.5" font-weight="700">${p}</text>`).join("")}</svg>`;
  }
  if (t.kind === "process") {
    const pos = [[20, 30], [200, 30], [380, 30], [380, 170], [200, 170], [20, 170]];
    const arrows = [[180, 70, 198, 70], [360, 70, 378, 70], [460, 112, 460, 168], [378, 210, 362, 210], [198, 210, 182, 210], [100, 168, 100, 112]];
    return `<svg viewBox="0 0 560 270" role="img" aria-label="${esc(t.title)}"><defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" style="fill:var(--write)"/></marker></defs>
      ${c.steps.map((s, i) => `<rect x="${pos[i][0]}" y="${pos[i][1]}" width="160" height="80" rx="14" style="fill:var(--write-soft);stroke:var(--write)" stroke-width="2"/><circle cx="${pos[i][0] + 22}" cy="${pos[i][1] + 22}" r="13" style="fill:var(--write)"/><text x="${pos[i][0] + 22}" y="${pos[i][1] + 27}" text-anchor="middle" font-size="13" font-weight="800" style="fill:#fff">${i + 1}</text><text x="${pos[i][0] + 80}" y="${pos[i][1] + 48}" text-anchor="middle" font-size="16" font-weight="800">${s[0]}</text><text x="${pos[i][0] + 80}" y="${pos[i][1] + 66}" text-anchor="middle" font-size="12">${s[1]}</text>`).join("")}
      ${arrows.map(a => `<line x1="${a[0]}" y1="${a[1]}" x2="${a[2]}" y2="${a[3]}" style="stroke:var(--write)" stroke-width="3" marker-end="url(#ah)"/>`).join("")}
      <text x="280" y="262" text-anchor="middle" font-size="12" font-style="italic">The cycle repeats: empty bottles return to bottle banks.</text></svg>`;
  }
  // map
  const panel = (ox, yr, after) => `<g transform="translate(${ox} 0)">
    <text x="130" y="20" text-anchor="middle" font-size="15" font-weight="800">${yr}</text>
    <rect x="0" y="30" width="260" height="240" rx="10" style="fill:var(--tips-soft);stroke:var(--ink-faint)" stroke-width="1.5"/>
    <path d="M0 62 Q65 50 130 62 T260 62 V90 Q195 102 130 90 T0 90Z" style="fill:var(--listen)" opacity=".55"/><text x="12" y="80" font-size="10.5" font-weight="700">River</text>
    ${after ? `<rect x="40" y="44" width="70" height="40" rx="6" style="fill:var(--surface);stroke:var(--listen)" stroke-width="2"/><text x="75" y="68" text-anchor="middle" font-size="11" font-weight="800">Marina</text>${[0, 1, 2, 3].map(i => `<line x1="${50 + i * 15}" y1="48" x2="${50 + i * 15}" y2="58" style="stroke:var(--listen)" stroke-width="2"/>`).join("")}
      <rect x="170" y="50" width="22" height="50" style="fill:var(--ink-soft)"/><text x="181" y="47" text-anchor="middle" font-size="10" font-weight="700">Bridge</text>`
      : `<rect x="62" y="70" width="12" height="28" style="fill:var(--speak)"/><text x="68" y="64" text-anchor="middle" font-size="10" font-weight="700">Pier</text>`}
    <rect x="20" y="190" width="70" height="60" rx="6" style="fill:var(--surface);stroke:var(--read)" stroke-width="2"/><text x="55" y="224" text-anchor="middle" font-size="11" font-weight="800">School</text>
    ${after ? `<rect x="100" y="120" width="70" height="50" rx="6" style="fill:var(--surface-2);stroke:var(--ink-faint)" stroke-width="2"/><text x="135" y="151" text-anchor="middle" font-size="12" font-weight="800">P · Car park</text>`
      : `${[0, 1, 2, 3].map(i => `<rect x="${102 + i * 17}" y="125" width="14" height="22" style="fill:var(--write)" opacity=".8"/>`).join("")}<text x="135" y="164" text-anchor="middle" font-size="11" font-weight="800">Shops</text>`}
    ${after ? `${Array.from({ length: 12 }, (_, i) => { const x = 184 + (i % 4) * 17, y = 120 + Math.floor(i / 4) * 30; return `<rect x="${x}" y="${y + 6}" width="13" height="12" style="fill:var(--speak)"/><path d="M${x - 1} ${y + 7} L${x + 6.5} ${y} L${x + 14} ${y + 7}Z" style="fill:var(--write)"/>`; }).join("")}<text x="215" y="226" text-anchor="middle" font-size="11" font-weight="800">Housing</text>`
      : `<rect x="182" y="115" width="66" height="100" rx="6" style="fill:var(--tips)" opacity=".5"/>${[0, 1, 2, 3, 4].map(i => `<line x1="188" y1="${125 + i * 18}" x2="242" y2="${125 + i * 18}" style="stroke:var(--tips)" stroke-width="2"/>`).join("")}<text x="215" y="232" text-anchor="middle" font-size="11" font-weight="800">Farmland</text>`}
    <path d="M10 180 H250" style="stroke:var(--ink-faint)" stroke-width="5" opacity=".5"/>
  </g>`;
  return `<svg viewBox="0 0 560 280" role="img" aria-label="${esc(t.title)}">${panel(10, "2000", false)}${panel(290, "2020", true)}<text x="550" y="40" text-anchor="end" font-size="12" font-weight="800">N ↑</text></svg>`;
}
function task1View(el) {
  let cur = S.view.t1 || TASK1[0].id;
  const draw = () => {
    const t = TASK1.find(x => x.id === cur) || TASK1[0];
    el.innerHTML = `<div class="subtabs" style="--c:var(--write)">${TASK1.map(x => `<button data-t="${x.id}" aria-selected="${x.id === t.id}">${esc(x.title.split("·")[0].trim())}</button>`).join("")}</div>
    <div class="split">
      <div class="card stack"><span class="label">${esc(t.title)}</span><p><b>${esc(t.prompt)}</b></p><div class="chartbox">${chartSVG(t)}</div><p class="faint" style="font-size:12.5px">Illustrative figures for practice.</p></div>
      <div class="stack">
        <div class="card stack"><span class="label">Key features to mention</span><ul class="clean">${t.features.map(f => `<li class="check"><input type="checkbox" aria-label="${esc(f)}"><span>${esc(f)}</span></li>`).join("")}</ul>
        <p class="muted" style="font-size:14px">Structure: <b>Introduction</b> (paraphrase) → <b>Overview</b> (2 main trends) → <b>Detail 1</b> → <b>Detail 2</b>. About 170–190 words, 20 minutes.</p>
        <div class="row"><button class="btn" id="t1Write">${I.write} Write my answer</button></div></div>
        <details class="more k-write"><summary>Show Band 8+ model answer</summary><div class="model">${t.model.map(p => `<p>${p}</p>`).join("")}</div><p class="faint" style="font-size:13px;margin-top:8px"><span class="model"><span class="link">Blue</span></span> = linking · <span class="model"><span class="lex">Purple</span></span> = strong vocabulary</p></details>
      </div></div>`;
    $$("[data-t]", el).forEach(b => b.addEventListener("click", () => { cur = b.dataset.t; S.view.t1 = cur; save(); draw(); }));
    $("#t1Write").addEventListener("click", () => { S.draftPrompt = "T1|" + t.prompt; save(); location.hash = "writing-editor"; });
  };
  draw();
}
function task2View(el) {
  el.innerHTML = `<div class="grid g2">${TASK2.map(t => `<div class="card stack k-write">
    <span class="label">${esc(t.type)}</span><p style="font-size:17px"><b>${esc(t.prompt)}</b></p>
    <div><span class="label" style="--c:var(--ink-faint)">Plan</span><ol class="dots" style="margin-top:4px">${t.plan.map(s => `<li>${esc(s)}</li>`).join("")}</ol></div>
    ${t.model ? `<details class="more"><summary>Read the model essay (${wordsOf(t.model.join(" ").replace(/<[^>]+>/g, "")).length} words)</summary><div class="model">${t.model.map(p => `<p>${p}</p>`).join("")}</div></details>` : `<p class="faint" style="font-size:14px">No model for this one — use the plan and write it yourself.</p>`}
    <button class="btn" data-w="${t.id}" style="align-self:flex-start">${I.write} Write this essay</button></div>`).join("")}</div>`;
  $$("[data-w]", el).forEach(b => b.addEventListener("click", () => { const t = TASK2.find(x => x.id === b.dataset.w); S.draftPrompt = "T2|" + t.prompt; save(); location.hash = "writing-editor"; }));
}
function compareView(el) {
  const c = BAND_COMPARE;
  el.innerHTML = `<div class="card stack"><span class="label">Same idea, two bands · ${esc(c.topic)}</span>
    <div class="compare"><div class="lo"><span class="bandchip b6">Band 6</span><p style="margin-top:10px;line-height:1.75">${esc(c.low)}</p>${speakBtn(c.low)}</div><div class="hi"><span class="bandchip b8">Band 8</span><p style="margin-top:10px;line-height:1.75">${esc(c.high)}</p>${speakBtn(c.high, "", 1)}</div></div></div>
    <div class="card"><span class="label">What changed?</span>${c.notes.map((n, i) => `<div class="tip"><span class="n" style="--cs:var(--write-soft);--c:var(--write)">${i + 1}</span><div><h4>${esc(n[0])}</h4><p class="muted">${esc(n[1])}</p></div></div>`).join("")}</div>`;
}
function linkersView(el) {
  el.innerHTML = `<div class="grid g3">${LINKERS.map(g => `<div class="card stack"><span class="label">${esc(g.fn)}</span><div class="row">${g.w.map(w => `<span class="pill">${esc(w)}</span>`).join("")}</div></div>`).join("")}</div>
  <div class="card tint flat k-write"><p><b>Use linkers to show logic, not to decorate.</b> One well-chosen linker per paragraph start is enough. Many Band 8 sentences connect through reference words instead: <i>this problem, such measures, these findings</i>.</p><p class="bn bn-tip">প্রতিটি বাক্যে linker নয় — 'this problem', 'such measures' দিয়েও বাক্য জোড়া যায়।</p></div>`;
}
function editorView(el) {
  let [kind, prompt] = (S.draftPrompt || "T2|" + T2_PROMPTS[0]).split("|");
  const minW = kind === "T1" ? 150 : 250, mins = kind === "T1" ? 20 : 40;
  const checklist = [
    ["Task", kind === "T1" ? "I wrote an overview starting with 'Overall'." : "I answered every part of the question and my position is clear."],
    ["Task", kind === "T1" ? "I included key numbers and comparisons, not every number." : "Each body paragraph has one main idea with an explanation and example."],
    ["Coherence", "Each paragraph has a clear topic sentence."],
    ["Coherence", "I used linking words naturally, not in every sentence."],
    ["Vocabulary", "I avoided repeating the same words from the question."],
    ["Grammar", "I used some complex sentences (which, although, if…)."],
    ["Grammar", "I checked articles (a/an/the), plural -s and verb agreement."]
  ];
  el.innerHTML = `<div class="split">
    <div class="card stack">
      <div class="row"><span class="label">${kind === "T1" ? "Task 1" : "Task 2"} · at least ${minW} words · ${mins} minutes</span></div>
      <label class="field">Question<select id="ePick"><option value="">Change question…</option>${TASK1.map(t => `<option value="T1|${esc(t.prompt)}">Task 1 · ${esc(t.title)}</option>`).join("")}${T2_PROMPTS.map(p => `<option value="T2|${esc(p)}">Task 2 · ${esc(p.slice(0, 70))}…</option>`).join("")}</select></label>
      <p style="font-size:16.5px"><b>${esc(prompt)}</b></p>
      <div class="row"><span class="timer" id="eTimer">${fmt(mins * 60)}</span><button class="btn soft small" id="eStart">Start timer</button><button class="btn ghost small" id="eSave">Save draft</button></div>
      <textarea id="eText" placeholder="Start writing here…" aria-label="Your answer" spellcheck="false">${esc(S.draft || "")}</textarea>
      <div class="row"><button class="btn" id="eDone">${I.check} I've finished</button><button class="btn ai-only" id="eAI" style="background:var(--vocab)">${I.sparkle} Get Claude's band feedback</button></div>
      <div id="eAIout"></div>
    </div>
    <div class="stack sticky">
      <div class="card stack"><span class="label">Live check</span><div class="stats-row" id="eStats"></div><div id="eFlags"></div></div>
      <div class="card stack"><span class="label">Self-check before you finish</span>${checklist.map((c, i) => `<label class="check"><input type="checkbox" id="ec${i}"><span><b>${c[0]}:</b> ${esc(c[1])}</span></label>`).join("")}</div>
    </div></div>`;
  const ta = $("#eText");
  const stats = () => {
    const t = ta.value, w = wordsOf(t).length, sents = (t.match(/[.!?](\s|$)/g) || []).length, paras = t.split(/\n\s*\n/).filter(p => p.trim()).length;
    const low = " " + t.toLowerCase().replace(/[^a-z' ]/g, " ") + " ";
    const linkers = LINKERS.flatMap(g => g.w).map(x => x.toLowerCase().replace(/\s*\(.*\)/, "").split("…")[0].trim()).filter(x => low.includes(" " + x + " ")).length;
    $("#eStats").innerHTML = `<div class="stat ${w >= minW ? "ok" : "warn"}"><b>${w}</b><small>words / ${minW}</small></div><div class="stat"><b>${paras}</b><small>paragraphs</small></div><div class="stat"><b>${sents ? Math.round(w / sents) : 0}</b><small>words / sentence</small></div><div class="stat"><b>${linkers}</b><small>linkers</small></div>`;
    const flags = Object.entries(WEAK_WORDS).filter(([k]) => new RegExp(`(^|[^a-z'])${k.replace(/'/g, "'")}([^a-z']|$)`, "i").test(t)).map(([k, v]) => `<span class="flag" title="${esc(v)}">“${esc(k)}” — ${esc(v)}</span>`);
    $("#eFlags").innerHTML = w ? (flags.length ? `<p class="muted" style="font-size:13.5px;margin-bottom:4px">Words to upgrade:</p>${flags.join("")}` : `<span class="flag okf">No weak words found. Nice!</span>`) : `<p class="faint" style="font-size:14px">Start typing to see your word count, paragraphs and weak words.</p>`;
  };
  ta.addEventListener("input", () => { stats(); S.draft = ta.value; clearTimeout(ta._t); ta._t = setTimeout(save, 600); });
  stats();
  $("#ePick").addEventListener("change", e => { if (!e.target.value) return; S.draftPrompt = e.target.value; save(); editorView(el); });
  let stopT = null;
  $("#eStart").addEventListener("click", e => { if (stopT) return; e.currentTarget.disabled = true; Sound.play("start"); stopT = countdown(mins * 60, s => { const t = $("#eTimer"); if (t) { t.textContent = fmt(s); t.classList.toggle("low", s <= 180); } }, () => { Sound.play("end"); toast("Time's up! Finish your sentence and check."); }); });
  $("#eSave").addEventListener("click", () => { S.draft = ta.value; save(); toast("Draft saved."); });
  $("#eDone").addEventListener("click", ev => {
    const w = wordsOf(ta.value).length;
    if (w < 40) { toast("Write a bit more first."); return; }
    stopT && stopT();
    const ticks = $$("[id^=ec]:checked", el).length;
    S.stats.essays++; if (w >= 250) award("writer");
    addXP(w >= minW ? 30 + ticks * 2 : 12, ev); Sound.play("done"); if (w >= minW) Confetti.burst(90);
    toast(w >= minW ? "Great work! Essay complete." : `Saved — aim for ${minW}+ words next time.`);
    save();
  });
  $("#eAI").addEventListener("click", async () => {
    const w = wordsOf(ta.value).length; if (w < 60) { toast("Write at least 60 words first."); return; }
    if (!askClaude) return;
    const out = $("#eAIout"); out.innerHTML = `<div class="card tint flat k-vocab"><p class="muted">Claude is reading your ${kind === "T1" ? "report" : "essay"}…</p></div>`;
    const req = `You are an experienced IELTS Writing examiner. Assess this IELTS Academic Writing ${kind === "T1" ? "Task 1" : "Task 2"} response.\n\nQUESTION:\n${prompt}\n\nRESPONSE (${w} words):\n${ta.value}\n\nReply in plain text, under 260 words, in this shape:\nEstimated band: X (Task ${kind === "T1" ? "Achievement" : "Response"} X, Coherence & Cohesion X, Lexical Resource X, Grammar X)\nStrengths: 2 short bullet points\nTo reach the next band: 3 bullet points, each quoting one of the writer's sentences and showing an improved version.\nBe encouraging but honest. Band estimates are approximate.`;
    try {
      const r = await askClaude(req, { onText: ({ text }) => { out.innerHTML = `<div class="card tint flat k-vocab"><span class="label">Claude's feedback (approximate)</span><p style="white-space:pre-wrap;margin-top:6px">${esc(text)}</p></div>`; } });
      out.innerHTML = `<div class="card tint flat k-vocab"><span class="label">Claude's feedback (approximate)</span><p style="white-space:pre-wrap;margin-top:6px">${esc(r.text)}</p></div>`;
    } catch (e) { out.innerHTML = `<div class="fb no">${e && e.code === "not_granted" ? "Feedback needs your permission. Allow it when asked to try again." : e && e.code === "rate_limited" ? "Too many requests. Wait a minute and try again." : "Couldn't get feedback right now. Try again later."}</div>`; }
  });
}

/* ================= SPEAKING ================= */
function renderSpeaking(main) {
  sectionPage(main, "speaking", "Speak with confidence", "The examiner's voice asks you real-style questions. Answer out loud with the timer, record yourself, and train the sounds Bangla speakers often mix up.",
    "পরীক্ষকের কণ্ঠে প্রশ্ন শুনুন, টাইমার চালিয়ে জোরে উত্তর দিন, নিজের কথা রেকর্ড করে শুনুন।", [
    ["part1", "Part 1 · Interview", part1View],
    ["part2", "Part 2 · Cue card", part2View],
    ["part3", "Part 3 · Discussion", part3View],
    ["sounds", "Sound game", soundsView],
    ["words", "Tricky words", trickyView],
    ["phrases", "Natural phrases", phrasesView],
    ["bands", "Band descriptors", bandsView],
    ["tips", "Tips", el => tipList(el, SPEAK_TIPS, "speak")]
  ]);
}
function recorderHTML() {
  return `<div class="card flat stack rec" style="background:var(--surface-2);border:0">
    <div class="row"><button class="btn" data-rec style="background:var(--bad)">${I.mic} Record</button><span class="faint" data-st style="font-size:14px">Record your answer, then listen back.</span></div>
    <audio controls class="hidden" data-au style="width:100%"></audio>
    <div class="transcript hidden" data-tr></div>
    <div class="stats-row hidden" data-stats></div>
    <label class="faint hidden" data-up style="font-size:13.5px">Or play back a recording from your phone: <input type="file" accept="audio/*"></label>
  </div>`;
}
function bindRecorder(box, onStats) {
  const btn = $("[data-rec]", box), st = $("[data-st]", box), au = $("[data-au]", box), tr = $("[data-tr]", box), statsEl = $("[data-stats]", box), up = $("[data-up]", box);
  let mr = null, stream = null, chunks = [], rec = null, text = "", t0 = 0, on = false, tick = null;
  const fail = msg => { st.textContent = msg; up.classList.remove("hidden"); btn.disabled = true; };
  if (!Mic.can) { fail("Recording isn't available here. Use your phone's voice recorder, then play it back below."); }
  $("input", up).addEventListener("change", e => { const f = e.target.files[0]; if (f) { au.src = URL.createObjectURL(f); au.classList.remove("hidden"); } });
  const stop = () => {
    if (!on) return; on = false; clearInterval(tick);
    try { mr && mr.state !== "inactive" && mr.stop(); } catch (e) {}
    try { rec && rec.stop(); } catch (e) {}
    stream && stream.getTracks().forEach(t => t.stop());
    btn.innerHTML = `${I.mic} Record again`;
    const secs = (Date.now() - t0) / 1000;
    if (text.trim()) {
      const w = wordsOf(text).length, fillers = (text.toLowerCase().match(/\b(um+|uh+|er+|erm|ah+|you know|like)\b/g) || []).length;
      statsEl.innerHTML = `<div class="stat"><b>${Math.round(secs)}s</b><small>speaking</small></div><div class="stat"><b>${w}</b><small>words</small></div><div class="stat ${w / secs * 60 >= 100 ? "ok" : "warn"}"><b>${Math.round(w / secs * 60)}</b><small>words / min</small></div><div class="stat ${fillers > 3 ? "warn" : "ok"}"><b>${fillers}</b><small>fillers</small></div>`;
      statsEl.classList.remove("hidden");
    }
    st.textContent = `Recorded ${Math.round(secs)} seconds. Listen back: is every -s and -ed clear?`;
    onStats && onStats({ secs, text });
  };
  btn.addEventListener("click", async () => {
    if (on) return stop();
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch (e) { return fail("The microphone isn't available in this view. Open the app from GitHub to record, or use your phone's recorder and play it back below."); }
    chunks = []; text = ""; tr.textContent = ""; statsEl.classList.add("hidden");
    mr = new MediaRecorder(stream);
    mr.ondataavailable = e => chunks.push(e.data);
    mr.onstop = () => { au.src = URL.createObjectURL(new Blob(chunks, { type: mr.mimeType || "audio/webm" })); au.classList.remove("hidden"); };
    mr.start(); on = true; t0 = Date.now();
    btn.innerHTML = `${I.stop} Stop`;
    tick = setInterval(() => st.innerHTML = `<span class="recdot"></span> Recording… ${fmt((Date.now() - t0) / 1000)}`, 500);
    onLeave(stop);
    if (Mic.SR) {
      try {
        rec = new Mic.SR(); rec.lang = "en-GB"; rec.continuous = true; rec.interimResults = true;
        let fin = "";
        rec.onresult = e => { let interim = ""; for (let i = e.resultIndex; i < e.results.length; i++) { if (e.results[i].isFinal) fin += e.results[i][0].transcript + " "; else interim += e.results[i][0].transcript; } text = fin + interim; tr.classList.remove("hidden"); tr.innerHTML = `<span class="label" style="--c:var(--speak)">What the computer heard</span><p style="margin-top:4px">${esc(text)}</p>`; };
        rec.onend = () => { if (on) { try { rec.start(); } catch (e) {} } };
        rec.start();
      } catch (e) { rec = null; }
    }
  });
  return stop;
}
function examinerHTML() {
  return `<svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="28" style="fill:var(--speak-soft)"/><circle cx="28" cy="23" r="10" style="fill:var(--speak)"/><path d="M10 50a18 14 0 0 1 36 0" style="fill:var(--speak)"/><rect x="20" y="20" width="16" height="5" rx="2.5" style="fill:var(--ink)" opacity=".7"/></svg>`;
}
function part1View(el) {
  const topics = Object.keys(PART1); let topic = "Random", q = null, stopT = null;
  el.innerHTML = `<div class="subtabs" style="--c:var(--speak)">${["Random", ...topics].map(t => `<button data-tp="${esc(t)}" aria-selected="${t === topic}">${esc(t)}</button>`).join("")}</div>
  <div class="split"><div class="card stack">
    <div class="row" style="flex-wrap:nowrap">${examinerHTML()}<div style="min-width:0"><span class="label">Examiner</span><h3 id="p1Q">Press “Ask me” to hear a question.</h3></div></div>
    <div class="row"><button class="btn" id="p1Ask">${I.vol} Ask me</button><button class="btn ghost" id="p1Rep" disabled>${I.refresh} Repeat</button></div>
    <div class="row" style="gap:18px">${ring(100, "var(--speak)", 120, "30", "seconds")}<p class="muted" style="flex:1;min-width:180px">Answer in <b>2–3 sentences</b>: give your <b>Answer</b>, a <b>Reason</b>, and an <b>Example</b>. The timer starts after the question.</p></div>
    ${recorderHTML()}
  </div>
  <div class="card stack"><span class="label">Model pattern · A-R-E</span>
    <p><b>Q:</b> Do you prefer shopping online or in markets?</p>
    <p class="model" style="font-size:15.5px"><b>A:</b> To be honest, I'm more of an online shopper these days. <b>R:</b> It saves me so much time, because the traffic in Dhaka can be a nightmare. <b>E:</b> Last week, for instance, I ordered all my textbooks from my phone in about five minutes.</p>
    ${speakBtn("To be honest, I'm more of an online shopper these days. It saves me so much time, because the traffic in Dhaka can be a nightmare. Last week, for instance, I ordered all my textbooks from my phone in about five minutes.", "", 1)}
    <p class="bn bn-tip">উত্তর → কারণ → উদাহরণ। খুব ছোট (“Yes.”) বা খুব লম্বা উত্তর দুটোই এড়িয়ে চলুন।</p></div></div>`;
  const ringEl = $(".ring", el);
  bindRecorder($(".rec", el));
  $$("[data-tp]", el).forEach(b => b.addEventListener("click", () => { topic = b.dataset.tp; $$("[data-tp]", el).forEach(x => x.setAttribute("aria-selected", x === b)); }));
  const ask = async ev => {
    const t = topic === "Random" ? pick(topics) : topic;
    q = pick(PART1[t]); $("#p1Q").textContent = q; $("#p1Rep").disabled = false;
    stopT && stopT(); setRing(ringEl, 100, "30", "seconds");
    await Voice.say(q, { slot: 1, rate: .95 });
    if (!$("#p1Q")) return;
    Sound.play("tick");
    stopT = countdown(30, s => setRing(ringEl, s / 30 * 100, String(s), "seconds"), () => { Sound.play("end"); addXP(3, ev); });
  };
  $("#p1Ask").addEventListener("click", ask);
  $("#p1Rep").addEventListener("click", () => q && Voice.say(q, { slot: 1, rate: .9 }));
}
function part2View(el) {
  let cur = S.view.card || CUECARDS[0].id;
  const draw = () => {
    const c = CUECARDS.find(x => x.id === cur) || CUECARDS[0];
    el.innerHTML = `<div class="subtabs" style="--c:var(--speak)">${CUECARDS.map((x, i) => `<button data-c="${x.id}" aria-selected="${x.id === c.id}">Card ${i + 1}</button>`).join("")}</div>
    <div class="split">
      <div class="stack">
        <div class="cuecard"><span class="label" style="--c:var(--speak)">Candidate task card</span><h3 style="margin-top:6px">${esc(c.title)}</h3><p class="muted">You should say:</p><ul>${c.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul><p class="faint" style="font-size:13.5px">You will have to talk about the topic for one to two minutes. You have one minute to think about what you're going to say. You can make some notes.</p></div>
        <div class="card stack"><div class="row" style="gap:18px;flex-wrap:nowrap">${ring(100, "var(--speak)", 150, "1:00", "prepare")}<div class="stack" style="gap:8px;min-width:0"><span class="label" id="p2Phase">Ready?</span><button class="btn" id="p2Go">${I.play} Start 1-minute prep</button><button class="btn ghost small" id="p2Skip" disabled>Skip to speaking</button></div></div>
          <label class="field">Your notes (keywords only)<textarea id="p2Notes" style="min-height:90px" placeholder="where… when… what… why…"></textarea></label>
          ${recorderHTML()}</div>
      </div>
      <div class="stack">
        ${c.sample ? `<details class="more k-speak"><summary>Band 8 sample answer</summary><div class="stack"><div class="row">${speakBtn(c.sample.replace(/\n+/g, " "), "", 1)}<span class="faint" style="font-size:13.5px">Listen to the model</span></div>${c.sample.split(/\n+/).map(p => `<p>${esc(p)}</p>`).join("")}<div class="row">${c.phrases.map(p => `<span class="pill">${esc(p)}</span>`).join("")}</div></div></details>` : `<div class="card tint flat k-speak"><p><b>Build your answer:</b> spend about 25 seconds on each bullet point and finish with the “explain why” part — that's where Band 7+ language appears.</p></div>`}
        <div class="card stack"><span class="label">Part 3 follow-up questions</span>${c.p3.map(q => `<div class="row" style="flex-wrap:nowrap">${speakBtn(q, "", 1)}<span>${esc(q)}</span></div>`).join("")}</div>
      </div>
    </div>`;
    $$("[data-c]", el).forEach(b => b.addEventListener("click", () => { cur = b.dataset.c; S.view.card = cur; save(); runCleanups(); draw(); }));
    const ringEl = $(".ring", el), phase = $("#p2Phase"), go = $("#p2Go"), skip = $("#p2Skip");
    bindRecorder($(".rec", el));
    let stopT = null;
    const speakPhase = ev => {
      stopT && stopT(); skip.disabled = true; Sound.play("start");
      phase.textContent = "Speak now! Press Record ↓";
      stopT = countdown(120, s => setRing(ringEl, s / 120 * 100, fmt(s), "speaking"), () => {
        Sound.play("end"); phase.textContent = "Time's up — well done!"; S.stats.cards++; award("speaker"); addXP(25, ev); Confetti.burst(80);
        go.disabled = false; go.innerHTML = `${I.refresh} Try again`;
      });
    };
    go.addEventListener("click", async ev => {
      go.disabled = true; skip.disabled = false; phase.textContent = "Listen to the examiner…";
      await Voice.say(`Now, I'm going to give you a topic, and I'd like you to talk about it for one to two minutes. ${c.title}`, { slot: 1, rate: .95 });
      if (!$("#p2Phase")) return;
      phase.textContent = "Prepare: write keywords"; Sound.play("tick");
      stopT = countdown(60, s => setRing(ringEl, s / 60 * 100, fmt(s), "prepare"), () => speakPhase(ev));
    });
    skip.addEventListener("click", ev => { Voice.stop(); speakPhase(ev); });
  };
  draw();
}
function part3View(el) {
  const all = CUECARDS.flatMap(c => c.p3.map(q => [q, c.title]));
  let stopT = null;
  el.innerHTML = `<div class="split"><div class="card stack">
    <div class="row" style="flex-wrap:nowrap">${examinerHTML()}<div style="min-width:0"><span class="label">Examiner</span><h3 id="p3Q">Press “Ask me” for a discussion question.</h3></div></div>
    <div class="row"><button class="btn" id="p3Ask">${I.vol} Ask me</button></div>
    <div class="row" style="gap:18px">${ring(100, "var(--speak)", 120, "0:45", "answer")}<div style="flex:1;min-width:180px"><p class="muted">Aim for 4–5 sentences in about 45 seconds.</p></div></div>
    ${recorderHTML()}</div>
    <div class="card stack"><span class="label">The O-R-E-O formula</span>
      <div class="tip"><span class="n" style="--c:var(--speak);--cs:var(--speak-soft)">O</span><div><h4>Opinion</h4><p class="muted">“I'd say that…” / “On the whole, I think…”</p></div></div>
      <div class="tip"><span class="n" style="--c:var(--speak);--cs:var(--speak-soft)">R</span><div><h4>Reason</h4><p class="muted">“The main reason is that…”</p></div></div>
      <div class="tip"><span class="n" style="--c:var(--speak);--cs:var(--speak-soft)">E</span><div><h4>Example</h4><p class="muted">“In Bangladesh, for instance,…”</p></div></div>
      <div class="tip"><span class="n" style="--c:var(--speak);--cs:var(--speak-soft)">O</span><div><h4>Other side</h4><p class="muted">“That said, some people would argue…”</p></div></div>
      <p class="bn bn-tip">মত → কারণ → উদাহরণ → অন্য দিক। Part 3-এ এটাই Band 7+ এর কাঠামো।</p></div></div>`;
  const ringEl = $(".ring", el); bindRecorder($(".rec", el));
  $("#p3Ask").addEventListener("click", async ev => {
    const [q] = pick(all); $("#p3Q").textContent = q; stopT && stopT(); setRing(ringEl, 100, "0:45", "answer");
    await Voice.say(q, { slot: 1, rate: .95 }); if (!$("#p3Q")) return;
    stopT = countdown(45, s => setRing(ringEl, s / 45 * 100, fmt(s), "answer"), () => { Sound.play("end"); addXP(4, ev); });
  });
}
function soundsView(el) {
  let set = "all";
  const intro = () => {
    el.innerHTML = `<div class="card stack"><span class="label">Practise each pair · tap to hear</span><div class="grid g3">${MIN_PAIRS.map(g => `<div class="card flat stack" style="padding:14px"><h4>${esc(g.sound)}</h4><p class="muted" style="font-size:14px">${esc(g.tip)}</p><p class="bn bn-tip" style="font-size:14px">${esc(g.bn)}</p><div class="row">${g.pairs.map(p => `<span class="pill" style="gap:4px"><button class="btn soft small" data-say="${p[0]}">${p[0]}</button>/<button class="btn soft small" data-say="${p[1]}">${p[1]}</button></span>`).join("")}</div></div>`).join("")}</div></div>
    <div class="card stack k-speak"><span class="label">Listening game · 10 rounds</span><h3>Which word did you hear?</h3>
      <label class="field">Sounds<select id="sgSet"><option value="all">All sounds</option>${MIN_PAIRS.map((g, i) => `<option value="${i}">${esc(g.sound)}</option>`).join("")}</select></label>
      ${voiceNote()}<button class="btn" id="sgGo" style="align-self:flex-start">${I.play} Start game</button></div>`;
    $("#sgSet").addEventListener("change", e => set = e.target.value);
    $("#sgGo").addEventListener("click", game);
  };
  const game = () => {
    let r = 0, score = 0;
    const round = () => {
      if (r >= 10) {
        S.stats.pron = Math.max(S.stats.pron, score); if (score >= 8) { award("pron"); Confetti.burst(); }
        el.innerHTML = `<div class="card stack" style="max-width:600px;margin:0 auto;width:100%">${scoreBanner(score, 10, "Can't hear the difference? Practise saying the pairs in front of a mirror.")}<button class="btn" id="sgAgain">${I.refresh} Back to the sounds</button></div>`;
        $("#sgAgain").addEventListener("click", intro); return;
      }
      r++;
      const g = set === "all" ? pick(MIN_PAIRS) : MIN_PAIRS[+set], p = pick(g.pairs), w = pick(p);
      el.innerHTML = `<div class="card stack" style="max-width:600px;margin:0 auto;width:100%"><div class="row"><span class="label">Round ${r}/10 · ${esc(g.sound)}</span><span class="bandchip b7" style="margin-left:auto">Score ${score}</span></div>
        <div class="meter"><i style="width:${(r - 1) * 10}%"></i></div>
        <button class="btn soft" id="sgPlay" style="align-self:center">${I.vol} Play again</button>
        <div class="grid" style="grid-template-columns:1fr 1fr">${shuffle(p).map(x => `<button class="pairbtn" data-w="${x}">${x}</button>`).join("")}</div><div id="sgFb"></div></div>`;
      const play = () => Voice.say(w, { slot: r % 2, rate: .85 });
      $("#sgPlay").addEventListener("click", play); setTimeout(play, 300);
      $$("[data-w]", el).forEach(b => b.addEventListener("click", ev => {
        const ok = b.dataset.w === w; if (ok) { score++; Sound.play("ok"); addXP(2, ev); } else Sound.play("no");
        $$("[data-w]", el).forEach(x => { x.disabled = true; x.classList.add(x.dataset.w === w ? "is-right" : "is-wrong"); });
        $("#sgFb").innerHTML = `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? "Correct!" : `It was “${w}”.`}</b> ${esc(g.tip)}</div><div class="row" style="margin-top:10px"><button class="btn" id="sgNext">Next ${I.right}</button></div>`;
        $("#sgNext").addEventListener("click", round); $("#sgNext").focus();
      }));
    };
    round();
  };
  intro();
}
function trickyView(el) {
  el.innerHTML = `<div class="card stack"><span class="label">Words that trip people up · tap to hear</span><div class="wordlist">${TRICKY_WORDS.map(w => `<div class="wcard"><div class="top"><b>${esc(w[0])}</b>${speakBtn(w[0])}</div><span class="muted">${esc(w[1])}</span></div>`).join("")}</div>
  <p class="bn bn-tip">"ইস্কুল" সমস্যা: school, student, sport-এর আগে 'ই' বসাবেন না — আগে লম্বা sss ধরে রাখুন।</p></div>`;
}
function phrasesView(el) {
  el.innerHTML = `<div class="grid g2">${SPOKEN_PHRASES.map(g => `<div class="card stack"><span class="label">${esc(g.group)}</span><ul class="clean">${g.items.map(p => `<li class="row" style="flex-wrap:nowrap">${speakBtn(p.replace(/…/g, ""), "", 1)}<span>${esc(p)}</span></li>`).join("")}</ul></div>`).join("")}</div>
  <div class="card tint flat k-speak"><p><b>Natural, not bookish.</b> Proverbs like “a piece of cake” sound artificial in the exam. Everyday phrases like “I got the hang of it” show real fluency.</p><p class="bn bn-tip">প্রবাদ নয়, দৈনন্দিন স্বাভাবিক বাক্যাংশ ব্যবহার করুন।</p></div>`;
}
function bandsView(el) {
  el.innerHTML = `<div class="card stack"><span class="label">Speaking band descriptors in plain words</span><div class="tbl"><table><thead><tr><th>Band</th><th>Fluency & coherence</th><th>Vocabulary</th><th>Grammar</th><th>Pronunciation</th></tr></thead><tbody>${SPEAK_BANDS.map(r => `<tr><td><span class="bandchip b${Math.min(9, Math.max(6, r[0]))}">${r[0]}</span></td>${r.slice(1).map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><p class="faint" style="font-size:13px">Summarised from the public IELTS Speaking band descriptors (from your Speak to Band 7+ project). Your score is the average of the four criteria.</p></div>`;
}

/* ================= VOCABULARY ================= */
function renderVocab(main) {
  sectionPage(main, "vocab", "From Band 6 to Band 9", "See how one idea climbs the band ladder, then learn 120 levelled words with pictures, Bangla meanings, pronunciation, flashcards and games.",
    "একই ভাবনা Band 6 থেকে Band 9-এ কীভাবে বদলায় দেখুন। ছবি, বাংলা অর্থ আর উচ্চারণসহ ১২০টি শব্দ শিখুন।", [
    ["ladder", "Band ladder", ladderView],
    ["cards", "Flashcards", flashView],
    ["quiz", "Quiz", quizView],
    ["match", "Match game", matchView],
    ["list", "Word lists", listView],
    ["colloc", "Collocations", collocView]
  ]);
}
const article = w => /^[aeiou]/i.test(w) ? "an" : "a";
const fillFrame = (f, w, b, html = true) => {
  let s = f.replace("{a}", article(w));
  const cap = s.startsWith("___"); const word = cap ? w[0].toUpperCase() + w.slice(1) : w;
  return html ? esc(s).replace("___", `<em class="b${b}">${esc(word)}</em>`) : s.replace("___", word);
};
function ladderView(el) {
  let li = S.view.ladder || 0, lvl = 1;
  const draw = () => {
    const L = LADDERS[li];
    el.innerHTML = `<div class="card stack k-vocab">
      <div class="row"><button class="iconbtn" id="lPrev" aria-label="Previous word">${I.left}</button>
        <select id="lSel" aria-label="Choose a word">${LADDERS.map((x, i) => `<option value="${i}" ${i === li ? "selected" : ""}>${esc(x.base)}</option>`).join("")}</select>
        <button class="iconbtn" id="lNext" aria-label="Next word">${I.right}</button><span class="faint" style="margin-left:auto;font-size:13.5px">${li + 1} / ${LADDERS.length}</span></div>
      <div><span class="label">Everyday word</span><h2>“${esc(L.base)}” <span class="bn" style="font-size:20px;color:var(--vocab)">${esc(L.bn)}</span></h2></div>
      <div class="ladder">${L.w.map((w, i) => `<button class="rung b${6 + i} ${i === lvl ? "on" : ""}" data-l="${i}"><small>Band ${6 + i}</small><span>${esc(w)}</span></button>`).join("")}</div>
      <p class="frame" id="lFrame">${fillFrame(L.frame, L.w[lvl], 6 + lvl)}</p>
      <div class="row"><button class="btn" id="lSay">${I.vol} Hear it</button><button class="btn soft" id="lClimb">Climb the ladder ↑</button><button class="btn ghost" id="lSort">Sort game</button></div>
      <p class="muted" style="font-size:14.5px"><b>Note:</b> ${esc(L.note)}</p>
    </div>
    <div class="card tint flat k-vocab"><p><b>Band 9 is about precision, not rare words.</b> Choose the word whose exact meaning fits the context and collocates naturally. A Band 9 word in the wrong place scores lower than a Band 7 word used perfectly.</p><p class="bn bn-tip">কঠিন শব্দ নয় — প্রসঙ্গে একদম মানানসই শব্দই Band 9 এনে দেয়।</p></div>
    <div id="lGame"></div>`;
    const setL = i => { lvl = i; $$(".rung", el).forEach(r => r.classList.toggle("on", +r.dataset.l === i)); $("#lFrame").innerHTML = fillFrame(L.frame, L.w[i], 6 + i); Sound.play("tick"); };
    $$(".rung", el).forEach(r => r.addEventListener("click", () => { setL(+r.dataset.l); Voice.say(L.w[+r.dataset.l]); }));
    $("#lPrev").addEventListener("click", () => { li = (li + LADDERS.length - 1) % LADDERS.length; S.view.ladder = li; save(); draw(); });
    $("#lNext").addEventListener("click", ev => { li = (li + 1) % LADDERS.length; S.view.ladder = li; save(); addXP(1, ev); draw(); });
    $("#lSel").addEventListener("change", e => { li = +e.target.value; S.view.ladder = li; save(); draw(); });
    $("#lSay").addEventListener("click", () => Voice.say(fillFrame(L.frame, L.w[lvl], 6 + lvl, false)));
    $("#lClimb").addEventListener("click", async () => { Voice.stop(); const tok = Voice.token; for (let i = 0; i < 4; i++) { if (tok !== Voice.token || !$("#lFrame")) return; setL(i); await Voice.speak(fillFrame(L.frame, L.w[i], 6 + i, false), { rate: .95 }); await sleep(250); } });
    $("#lSort").addEventListener("click", () => sortGame($("#lGame")));
  };
  const sortGame = box => {
    const L = pick(LADDERS); const order = []; const sh = shuffle(L.w.map((w, i) => [w, i]));
    box.innerHTML = `<div class="card stack k-vocab"><span class="label">Sort game · “${esc(L.base)}”</span><h3>Tap the words from Band 6 up to Band 9.</h3><div class="grid g4">${sh.map(([w, i]) => `<button class="mbtn" data-i="${i}">${esc(w)}</button>`).join("")}</div><div id="sgOut"></div></div>`;
    box.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "center" });
    $$("[data-i]", box).forEach(b => b.addEventListener("click", ev => {
      const i = +b.dataset.i; order.push(i); b.classList.add("sel"); b.disabled = true; b.insertAdjacentHTML("beforeend", ` <span class="bandchip b${6 + order.length - 1}">${order.length}</span>`); Sound.play("tick");
      if (order.length === 4) {
        const ok = order.every((x, k) => x === k);
        if (ok) { Sound.play("done"); addXP(8, ev); Confetti.burst(60); } else Sound.play("no");
        $("#sgOut").innerHTML = `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? "Perfect order!" : "Not quite."}</b> ${L.w.map((w, k) => `<span class="bandchip b${6 + k}">${k + 6}</span> ${esc(w)}`).join(" → ")}</div><button class="btn soft small" id="sgMore" style="margin-top:10px">Another one</button>`;
        $("#sgMore").addEventListener("click", () => sortGame(box));
      }
    }));
  };
  draw();
}
function vocabFilters(id, f, onChange) {
  return `<div class="row"><div class="subtabs" style="--c:var(--vocab)">${["all", "6", "7", "8", "9"].map(b => `<button data-band="${b}" aria-selected="${f.band === b}">${b === "all" ? "All bands" : "Band " + b}</button>`).join("")}</div>
    <select id="${id}Topic" aria-label="Topic"><option value="all">All topics</option>${Object.entries(VOCAB_TOPICS).map(([k, v]) => `<option value="${k}" ${f.topic === k ? "selected" : ""}>${v}</option>`).join("")}</select></div>`;
}
function bindFilters(el, id, f, cb) {
  $$("[data-band]", el).forEach(b => b.addEventListener("click", () => { f.band = b.dataset.band; cb(); }));
  $(`#${id}Topic`, el).addEventListener("change", e => { f.topic = e.target.value; cb(); });
}
const filterWords = f => WORDS.filter(w => (f.band === "all" || String(w[2]) === f.band) && (f.topic === "all" || w[3] === f.topic));
const vf = S.view.vf || { band: "all", topic: "all" };
let flashKey = null;
function flashView(el) {
  onLeave(() => { if (flashKey) { document.removeEventListener("keydown", flashKey); flashKey = null; } });
  let deck = shuffle(filterWords(vf)), i = 0, flipped = false;
  const draw = () => {
    S.view.vf = vf; save();
    const known = deck.filter(w => S.known[w[0]]).length;
    if (!deck.length) { el.innerHTML = vocabFilters("fc", vf) + `<div class="card"><p>No words match. Try another band or topic.</p></div>`; bindFilters(el, "fc", vf, () => { deck = shuffle(filterWords(vf)); i = 0; draw(); }); return; }
    const w = deck[i % deck.length];
    el.innerHTML = `${vocabFilters("fc", vf)}
    <div class="stack" style="align-items:center">
      <p class="faint">${i % deck.length + 1} / ${deck.length} · <b style="color:var(--good)">${known} known</b> · tap the card to flip</p>
      <div class="flash-wrap"><div class="flash ${flipped ? "flipped" : ""}" id="fcCard" tabindex="0" role="button" aria-label="Flashcard: ${esc(w[0])}. Press to flip.">
        <div class="face front"><span class="corner bandchip b${w[2]}">Band ${w[2]}</span><span class="speak">${speakBtn(w[0])}</span><span class="emo" aria-hidden="true">${w[4]}</span><span class="word">${esc(w[0])}</span><span class="pos">${esc(w[1])} · ${esc(VOCAB_TOPICS[w[3]])}</span></div>
        <div class="face back"><span class="corner bandchip b${w[2]}">Band ${w[2]}</span><span class="speak">${speakBtn(w[7], "", 1)}</span><span class="def">${esc(w[5])}</span><span class="bnm">${esc(w[6])}</span><span class="ex">“${esc(w[7])}”</span></div>
      </div></div>
      <div class="row" style="justify-content:center"><button class="btn ghost" id="fcPrev" aria-label="Previous">${I.left}</button><button class="btn" id="fcLearn" style="background:var(--speak)">Still learning</button><button class="btn good" id="fcKnow">${I.check} I know it</button><button class="btn ghost" id="fcNext" aria-label="Next">${I.right}</button></div>
      <p class="faint" style="font-size:13px">Keyboard: Space = flip · ← → = move · K = know it</p>
    </div>`;
    bindFilters(el, "fc", vf, () => { deck = shuffle(filterWords(vf)); i = 0; flipped = false; draw(); });
    const card = $("#fcCard");
    const flip = () => { flipped = !flipped; card.classList.toggle("flipped", flipped); Sound.play("flip"); };
    card.addEventListener("click", flip);
    const go = d => { i = (i + d + deck.length) % deck.length; flipped = false; draw(); };
    $("#fcPrev").addEventListener("click", () => go(-1));
    $("#fcNext").addEventListener("click", () => go(1));
    $("#fcLearn").addEventListener("click", () => { delete S.known[w[0]]; save(); go(1); });
    $("#fcKnow").addEventListener("click", ev => {
      if (!S.known[w[0]]) { S.known[w[0]] = 1; addXP(2, ev); Sound.play("ok"); if (Object.keys(S.known).length >= 50) award("words"); }
      save(); go(1);
    });
    const key = e => {
      if (!$("#fcCard") || /input|select|textarea/i.test(document.activeElement.tagName)) return;
      if (e.key === " ") { e.preventDefault(); flip(); } else if (e.key === "ArrowRight") go(1); else if (e.key === "ArrowLeft") go(-1); else if (e.key.toLowerCase() === "k") $("#fcKnow").click();
    };
    if (flashKey) document.removeEventListener("keydown", flashKey);
    flashKey = key; document.addEventListener("keydown", key);
  };
  draw();
}
function quizView(el) {
  const start = () => {
    const pool = filterWords(vf);
    el.innerHTML = `${vocabFilters("qz", vf)}<div class="card stack k-vocab" style="max-width:700px;width:100%;margin:0 auto"><span class="label">10-question quiz</span><h3>Meanings, Bangla and gap-fill — mixed together</h3><p class="muted">${pool.length} words in this set. Each correct answer earns 3 XP.</p><button class="btn" id="qzGo" ${pool.length < 4 ? "disabled" : ""}>${I.play} Start quiz</button></div>`;
    bindFilters(el, "qz", vf, () => { S.view.vf = vf; save(); start(); });
    $("#qzGo").addEventListener("click", () => run(pool));
  };
  const run = pool => {
    const qs = shuffle(pool).slice(0, 10).map(w => {
      const type = pick(["def", "bn", "gap"]);
      const opts = shuffle([w, ...shuffle(pool.filter(x => x !== w)).slice(0, 3)]);
      return { w, type, opts };
    });
    let k = 0, score = 0;
    const show = () => {
      if (k >= qs.length) { S.stats.quiz++; if (score === qs.length) { award("perfect"); Confetti.burst(); Sound.play("done"); } el.innerHTML = `<div class="card stack" style="max-width:700px;width:100%;margin:0 auto">${scoreBanner(score, qs.length, "Words you missed will come back in flashcards.")}<button class="btn" id="qzAgain">${I.refresh} New quiz</button></div>`; $("#qzAgain").addEventListener("click", start); return; }
      const q = qs[k], w = q.w;
      const prompt = q.type === "def" ? `Which word means: <b>${esc(w[5])}</b>?` : q.type === "bn" ? `What does <b>${esc(w[0])}</b> mean in Bangla?` : `Complete the sentence: <i>${esc(w[7]).replace(new RegExp(esc(w[0].replace(/\s*\(.*\)/, "")).slice(0, -1) + "\\w*", "i"), "______")}</i>`;
      el.innerHTML = `<div class="card stack k-vocab" style="max-width:700px;width:100%;margin:0 auto"><div class="row"><span class="label">Question ${k + 1}/${qs.length}</span><span class="bandchip b7" style="margin-left:auto">Score ${score}</span></div><div class="meter"><i style="width:${k / qs.length * 100}%"></i></div>
        <p style="font-size:19px">${prompt}</p>
        <div class="grid g2">${q.opts.map((o, j) => `<button class="mbtn ${q.type === "bn" ? "bnx" : ""}" data-j="${j}">${esc(q.type === "bn" ? o[6] : o[0])}</button>`).join("")}</div><div id="qzFb"></div></div>`;
      $$("[data-j]", el).forEach(b => b.addEventListener("click", ev => {
        const o = q.opts[+b.dataset.j], ok = o === w;
        if (ok) { score++; Sound.play("ok"); addXP(3, ev); } else Sound.play("no");
        $$("[data-j]", el).forEach(x => { x.disabled = true; const oo = q.opts[+x.dataset.j]; if (oo === w) x.classList.add("is-right"); else if (x === b) x.classList.add("is-wrong"); });
        $("#qzFb").innerHTML = `<div class="fb ${ok ? "ok" : "no"}"><b>${esc(w[0])}</b> <span class="bandchip b${w[2]}">Band ${w[2]}</span> — ${esc(w[5])} · <span class="bn">${esc(w[6])}</span></div><div class="row" style="margin-top:10px"><button class="btn" id="qzNext">Next ${I.right}</button>${speakBtn(w[0])}</div>`;
        $("#qzNext").addEventListener("click", () => { k++; show(); }); $("#qzNext").focus();
      }));
    };
    show();
  };
  start();
}
function matchView(el) {
  const start = () => {
    const set = shuffle(filterWords(vf)).slice(0, 6);
    if (set.length < 3) { el.innerHTML = vocabFilters("mt", vf) + `<div class="card"><p>Choose a bigger word set to play.</p></div>`; bindFilters(el, "mt", vf, start); return; }
    const left = shuffle(set), right = shuffle(set); let sel = null, done = 0, t0 = Date.now();
    el.innerHTML = `${vocabFilters("mt", vf)}<div class="card stack k-vocab" style="max-width:760px;width:100%;margin:0 auto">
      <div class="row"><span class="label">Match English to Bangla</span><span class="timer" id="mtT" style="margin-left:auto;font-size:22px">0:00</span></div>
      <p class="faint" style="font-size:13.5px">Best time: ${S.best.match ? fmt(S.best.match) : "—"}</p>
      <div class="match-grid"><div class="stack" style="gap:10px">${left.map(w => `<button class="mbtn" data-side="L" data-w="${esc(w[0])}">${esc(w[0])}</button>`).join("")}</div><div class="stack" style="gap:10px">${right.map(w => `<button class="mbtn bnx" data-side="R" data-w="${esc(w[0])}">${esc(w[6])}</button>`).join("")}</div></div></div>`;
    bindFilters(el, "mt", vf, () => { S.view.vf = vf; save(); start(); });
    const stopTick = (() => { const id = setInterval(() => { const t = $("#mtT"); if (t) t.textContent = fmt((Date.now() - t0) / 1000); }, 500); onLeave(() => clearInterval(id)); return () => clearInterval(id); })();
    $$(".mbtn[data-side]", el).forEach(b => b.addEventListener("click", ev => {
      if (!sel || sel.dataset.side === b.dataset.side) { $$(".mbtn.sel", el).forEach(x => x.classList.remove("sel")); sel = b; b.classList.add("sel"); Sound.play("tick"); if (b.dataset.side === "L") Voice.say(b.dataset.w); return; }
      if (sel.dataset.w === b.dataset.w) {
        [sel, b].forEach(x => { x.classList.remove("sel"); x.classList.add("done"); }); Sound.play("ok"); done++; sel = null;
        if (done === set.length) {
          stopTick(); const secs = Math.round((Date.now() - t0) / 1000);
          const best = !S.best.match || secs < S.best.match; if (best) S.best.match = secs;
          addXP(15, ev); Confetti.burst(); Sound.play("done");
          $(".card.k-vocab", el).insertAdjacentHTML("beforeend", `<div class="fb ok"><b>All matched in ${fmt(secs)}!</b> ${best ? "New best time! 🏆" : ""}</div><button class="btn" id="mtAgain">${I.refresh} Play again</button>`);
          $("#mtAgain").addEventListener("click", start); save();
        }
      } else { [sel, b].forEach(x => { x.classList.remove("sel"); x.classList.add("shake"); setTimeout(() => x.classList.remove("shake"), 400); }); Sound.play("no"); sel = null; }
    }));
  };
  start();
}
function listView(el) {
  let q = "";
  const draw = () => {
    const words = filterWords(vf).filter(w => !q || (w[0] + w[5] + w[6]).toLowerCase().includes(q.toLowerCase()));
    $("#wlBox").innerHTML = words.length ? words.map(w => `<div class="wcard ${S.known[w[0]] ? "known" : ""}"><div class="top"><span aria-hidden="true" style="font-size:24px">${w[4]}</span><b>${esc(w[0])}</b><span class="bandchip b${w[2]}">${w[2]}</span>${speakBtn(w[0])}</div><span class="faint" style="font-size:12.5px">${esc(w[1])} · ${esc(VOCAB_TOPICS[w[3]])}</span><span>${esc(w[5])}</span><span class="bnm">${esc(w[6])}</span><span class="ex">“${esc(w[7])}”</span></div>`).join("") : `<p class="muted">No words found.</p>`;
    $("#wlCount").textContent = `${words.length} words`;
  };
  el.innerHTML = `${vocabFilters("wl", vf)}<div class="row"><input type="text" id="wlSearch" placeholder="Search English or বাংলা…" aria-label="Search words" style="flex:1;min-width:0"><span class="faint" id="wlCount"></span></div><div class="wordlist" id="wlBox"></div>`;
  bindFilters(el, "wl", vf, () => { S.view.vf = vf; save(); listView(el); });
  $("#wlSearch").addEventListener("input", e => { q = e.target.value; draw(); });
  draw();
}
function collocView(el) {
  const items = shuffle(COLLOCATIONS); let k = 0, score = 0;
  const show = () => {
    if (k >= items.length) { if (score >= 13) Confetti.burst(); el.innerHTML = `<div class="card stack" style="max-width:700px;width:100%;margin:0 auto">${scoreBanner(score, items.length, "Collocations have no logic — learn them in whole sentences.")}<button class="btn" id="coAgain">${I.refresh} Play again</button></div>`; $("#coAgain").addEventListener("click", () => collocView(el)); return; }
    const [s, opts, a] = items[k];
    el.innerHTML = `<div class="card stack k-vocab" style="max-width:700px;width:100%;margin:0 auto"><div class="row"><span class="label">Collocation ${k + 1}/${items.length}</span><span class="bandchip b7" style="margin-left:auto">Score ${score}</span></div><div class="meter"><i style="width:${k / items.length * 100}%"></i></div>
      <p style="font-size:19px">${esc(s).replace("___", "<b>______</b>")}</p><div class="grid g3">${opts.map((o, j) => `<button class="mbtn" data-j="${j}">${esc(o)}</button>`).join("")}</div><div id="coFb"></div>
      <p class="bn bn-tip" style="font-size:14px">Collocation = যে শব্দগুলো স্বাভাবিকভাবে একসঙ্গে বসে।</p></div>`;
    $$("[data-j]", el).forEach(b => b.addEventListener("click", ev => {
      const ok = +b.dataset.j === a; if (ok) { score++; Sound.play("ok"); addXP(3, ev); } else Sound.play("no");
      $$("[data-j]", el).forEach(x => { x.disabled = true; if (+x.dataset.j === a) x.classList.add("is-right"); else if (x === b) x.classList.add("is-wrong"); });
      const full = s.replace("___", opts[a]);
      $("#coFb").innerHTML = `<div class="fb ${ok ? "ok" : "no"}"><b>${ok ? "Correct!" : "Answer:"}</b> ${esc(full)}</div><div class="row" style="margin-top:10px"><button class="btn" id="coNext">Next ${I.right}</button>${speakBtn(full)}</div>`;
      $("#coNext").addEventListener("click", () => { k++; show(); }); $("#coNext").focus();
    }));
  };
  show();
}

/* ================= TIPS ================= */
function renderTips(main) {
  sectionPage(main, "tips", "Tips, tricks & tools", "Everything examiners wish you knew: the golden rules for each skill, exam-day checklist, score calculators and the Bangla-to-English mistakes that cost marks.",
    "প্রতিটি স্কিলের সোনালি নিয়ম, পরীক্ষার দিনের চেকলিস্ট, স্কোর ক্যালকুলেটর আর বাংলা থেকে আসা ভুল।", [
    ["top", "Top tips", topTips],
    ["scores", "Score calculator", scoresView],
    ["errors", "Bangla → English traps", errorsView],
    ["day", "Exam day", el => tipList(el, EXAM_DAY, "tips")],
    ["plans", "Study plans", plansView],
    ["myths", "Myths", el => tipList(el, MYTHS, "tips")],
    ["library", "My library", libraryView]
  ]);
}
function topTips(el) {
  const groups = [["Listening", "listen", LISTEN_TIPS], ["Reading", "read", READ_TIPS], ["Writing", "write", WRITE_TIPS], ["Speaking", "speak", SPEAK_TIPS]];
  el.innerHTML = `<div class="card stack"><span class="label">The test at a glance</span><div class="grid g4">${EXAM_FACTS.map((f, i) => `<div class="card flat k-${["listen", "read", "write", "speak"][i]}" style="border-top:5px solid var(--c)"><h3>${f[0]}</h3><p style="font-family:var(--display);font-size:24px;font-weight:800;color:var(--c)">${f[1]}</p><p class="muted" style="font-size:14px">${f[2]}</p></div>`).join("")}</div></div>
  <div class="grid g2">${groups.map(g => `<div class="card k-${g[1]}"><span class="label">${g[0]} · top 4</span>${g[2].slice(0, 4).map((t, i) => `<div class="tip"><span class="n">${i + 1}</span><div><h4>${esc(t[0])}</h4><p class="muted">${esc(t[1])}</p><p class="bn bn-tip">${esc(t[2])}</p></div></div>`).join("")}<a class="btn soft small" href="#${{ listen: "listening", read: "reading", write: "writing", speak: "speaking" }[g[1]]}-tips">All ${g[0].toLowerCase()} tips</a></div>`).join("")}</div>
  <div class="card tint flat k-tips"><p><b>The error log habit.</b> Write down every mistake: your answer, the right answer, and <i>why</i> you got it wrong. Read the log once a week. This single habit raises bands faster than anything else.</p><p class="bn bn-tip">ভুলের খাতা রাখুন — সপ্তাহে একদিন শুধু ওই খাতা পড়ুন।</p></div>`;
}
function roundBand(avg) { const f = Math.floor(avg), r = avg - f; return r < .25 ? f : r < .75 ? f + .5 : f + 1; }
function scoresView(el) {
  const bands = []; for (let b = 9; b >= 0; b -= .5) bands.push(b.toFixed(1));
  const sel = (id, v) => `<select id="${id}">${bands.map(b => `<option ${b === v ? "selected" : ""}>${b}</option>`).join("")}</select>`;
  el.innerHTML = `<div class="grid g2">
    <div class="card stack"><span class="label">Overall band calculator</span><div class="grid g4" style="gap:10px">
      <label class="field">Listening${sel("cL", "6.5")}</label><label class="field">Reading${sel("cR", "6.5")}</label><label class="field">Writing${sel("cW", "5.0")}</label><label class="field">Speaking${sel("cS", "7.0")}</label></div>
      <div class="score-banner k-tips"><span class="big num" id="cOut">6.5</span><p id="cNote" class="muted"></p></div>
      <p class="faint" style="font-size:13.5px">Average of the four skills, rounded to the nearest half band: .25 rounds up to .5, and .75 rounds up to the next whole band.</p></div>
    <div class="card stack"><span class="label">Raw score → band</span><div class="row"><label class="field">Section<select id="rSec"><option value="1">Listening</option><option value="2">Academic Reading</option><option value="3">General Training Reading</option></select></label><label class="field">Correct answers (0–40)<input type="number" id="rRaw" min="0" max="40" value="30"></label></div>
      <div class="score-banner k-tips"><span class="big num" id="rOut">7.0</span><p class="muted">Indicative band. Each test version differs slightly.</p></div>
      <div class="tbl"><table><thead><tr><th>Band</th><th>Listening</th><th>Acad. Reading</th><th>GT Reading</th></tr></thead><tbody>${RAW_BANDS.map(r => `<tr><td><b>${r[0].toFixed(1)}</b></td><td class="num">${r[1]}+</td><td class="num">${r[2]}+</td><td class="num">${r[3]}+</td></tr>`).join("")}</tbody></table></div></div></div>
  <div class="card tint flat k-tips"><p><b>Strategy:</b> raising your weakest skill by 0.5 helps your overall band exactly as much as raising your strongest — and it's usually much easier.</p><p class="bn bn-tip">সবচেয়ে দুর্বল স্কিলে ০.৫ বাড়ানোই সবচেয়ে সহজ লাভ।</p></div>`;
  const calc = () => { const v = ["cL", "cR", "cW", "cS"].map(i => +$("#" + i).value); const avg = v.reduce((a, b) => a + b) / 4; const o = roundBand(avg); $("#cOut").textContent = o.toFixed(1); $("#cNote").textContent = `Average ${avg.toFixed(3).replace(/0+$/, "").replace(/\.$/, "")} → overall ${o.toFixed(1)}`; };
  const raw = () => { const n = Math.max(0, Math.min(40, +$("#rRaw").value || 0)); $("#rOut").textContent = rawBand(n, +$("#rSec").value).toFixed(1); };
  ["cL", "cR", "cW", "cS"].forEach(i => $("#" + i).addEventListener("change", calc));
  $("#rSec").addEventListener("change", raw); $("#rRaw").addEventListener("input", raw);
  calc(); raw();
}
function errorsView(el) {
  el.innerHTML = `<div class="card stack"><span class="label">Mistakes that come from Bangla</span><p class="muted">These errors come straight from Bangla sentence patterns. Spot them in your own writing and speaking.</p>
  <div class="tbl"><table><thead><tr><th>#</th><th>We say</th><th>Should be</th><th>Why</th></tr></thead><tbody>${BANGLA_ERRORS.map((r, i) => `<tr><td class="num">${i + 1}</td><td class="bad-c">${esc(r[0])}</td><td class="good-c">${esc(r[1])} ${speakBtn(r[1])}</td><td class="bn">${esc(r[2])}</td></tr>`).join("")}</tbody></table></div></div>
  <div class="card stack"><span class="label">Articles: a, an, the</span><p>The biggest grammar enemy for Bangla speakers, because Bangla has no articles. Quick rules:</p><ul class="dots"><li><b>a/an</b> + singular countable noun mentioned for the first time: <i>a problem, an issue</i>.</li><li><b>the</b> when both reader and writer know which one: <i>the government, the graph</i>.</li><li><b>No article</b> for general plurals and uncountables: <i>Children need education.</i></li></ul></div>`;
}
function plansView(el) {
  let cur = S.view.plan || "60";
  const draw = () => {
    el.innerHTML = `<div class="subtabs" style="--c:var(--tips)">${["30", "60", "90"].map(p => `<button data-p="${p}" aria-selected="${p === cur}">${p}-day plan</button>`).join("")}</div>
    <div class="card k-tips">${STUDY_PLANS[cur].map((s, i) => `<div class="tip"><span class="n">${i + 1}</span><div><h4>${esc(s[0])}</h4><p class="muted">${esc(s[1])}</p></div></div>`).join("")}</div>
    <div class="card tint flat k-tips"><p><b>Every day:</b> 5 new words from the flashcards, 15 minutes of listening, and one recorded speaking answer. Small and daily beats big and rare.</p><p class="bn bn-tip">দিনে ৫টি নতুন শব্দ, ১৫ মিনিট শোনা, একটি রেকর্ড করা উত্তর।</p></div>`;
    $$("[data-p]", el).forEach(b => b.addEventListener("click", () => { cur = b.dataset.p; S.view.plan = cur; save(); draw(); }));
  };
  draw();
}
function libraryView(el) {
  el.innerHTML = `<div class="card stack"><span class="label">Your IELTS files from Claude</span><p class="muted">These are the study books and audio you created earlier. They open on claude.ai in a new tab.</p>
  <div class="grid g2">${MY_LIBRARY.map((l, i) => `<a class="tile k-${["tips", "listen", "speak", "write", "write", "write", "vocab", "write"][i]}" href="${l[2]}" target="_blank" rel="noopener"><span class="ic">${I[["tips", "listen", "speak", "write", "write", "write", "vocab", "write"][i]]}</span><h3 style="font-size:18px">${esc(l[0])}</h3><p>${esc(l[1])}</p></a>`).join("")}</div></div>`;
}

/* ================= boot ================= */
const RENDER = { home: renderHome, listening: renderListening, reading: renderReading, writing: renderWriting, speaking: renderSpeaking, vocab: renderVocab, tips: renderTips };
buildShell(); renderTop();
window.addEventListener("hashchange", route);
route();
})();
