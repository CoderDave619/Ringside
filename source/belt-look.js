/* BeltLook: pixel-art championship belts from a small appearance object.
   Vanilla JS, no dependencies. Matches WrestlerLook (same outline colour,
   same API shape) and can put a belt on a WrestlerLook wrestler.

   Usage:
     title.belt = BeltLook.random();                        // new belt
     title.belt = BeltLook.normalize(saved.belt);           // clean up loaded data
     BeltLook.draw(canvas, title.belt, {scale: 4});         // laid-out belt
     html += BeltLook.img(title.belt, {size: 120, crop: 'plate'});
     // a wrestler wearing it (needs wrestler-look.js loaded first)
     html += BeltLook.wornImg(w.look, title.belt, {size: 96, mode: 'waist', wide: true});

   The belt sprite is 176 x 64 pixels. Options: scale (default 4), bg (default
   true; draws the display backdrop), crop ('plate', 'strap' or [x, y, w, h]).
   Worn modes: 'waist', 'shoulder', 'carry'. Worn images use the wrestler
   sprite size (32 x 76, or 48 wide with wide: true). */
(function (root) {
  'use strict';
  const W = 176, H = 64, CX = 88, CY = 33;
  const OUTLINE = '#17111c';

  const PAL = {
    metal: ['#e8b923', '#f6d67a', '#c8ccd4', '#eceef3', '#c27a3a', '#d0703c', '#e8a594', '#4a4a55', '#7d8a99', '#a8e0ec'],
    strap: ['#1b1b1f', '#4a2c1c', '#8a5a2b', '#d7263d', '#1f3f9a', '#f5f5f5', '#1e7a4c', '#5b2a86', '#d4a017', '#ff5fa2', '#e86a10', '#3c4752'],
    gem: ['#e0182d', '#1f6feb', '#18b35a', '#f5f7ff', '#9b30e0', '#ffb000', '#ff4fa0', '#00c2d1', '#1b1b1f'],
    enamel: ['#d7263d', '#1d2a52', '#1b1b1f', '#f5f5f5', '#127a68', '#6a2bd9', '#1f6feb', '#f4c20d', '#ff7a00', '#ff5fa2', '#7c1f24', '#2a2a30'],
    text: ['#ffffff', '#1b1b1f', '#e8b923', '#c8ccd4', '#d7263d', '#1f6feb', '#f4c20d', '#18b35a'],
    bg: ['#1d2a52', '#7c1f24', '#222226', '#127a68', '#6a2bd9', '#e8e3da', '#d7263d', '#1e88e5', '#3a2a1e', '#ff5fa2']
  };

  const SHAPE_LIST = ['oval', 'round', 'shield', 'rectangle', 'cushion', 'octagon', 'hexagon', 'diamond', 'star', 'crest', 'arch', 'winged', 'sunburst', 'quatrefoil', 'tablet', 'butterfly', 'maltese', 'pentagon', 'flared', 'pill', 'compass', 'stepped'];
  const EMBLEM_LIST = ['none', 'globe', 'star', 'crown', 'eagle', 'skull', 'bolt', 'flame', 'ring', 'laurel', 'mask', 'sun', 'heart', 'gem', 'trophy', 'swords', 'fist', 'butterfly', 'maltese', 'sunrise', 'calendar', 'twostars', 'monogram'];

  // key: [label, list of values | palette name, default]
  const OPTIONS = {
    shape: ['Plate shape', SHAPE_LIST, 'oval'],
    size: ['Plate size', ['small', 'medium', 'large', 'huge'], 'large'],
    metal: ['Metal', 'metal', PAL.metal[0]],
    metal2: ['Trim metal', 'metal', PAL.metal[0]],
    rim: ['Rim', ['plain', 'beaded', 'rope', 'studs', 'double', 'notched', 'filigree', 'jeweled', 'none'], 'beaded'],
    rimWidth: ['Rim width', ['thin', 'normal', 'thick'], 'normal'],
    field: ['Plate face', ['metal', 'enamel', 'inset'], 'metal'],
    fieldColor: ['Enamel colour', 'enamel', PAL.enamel[0]],
    engrave: ['Engraving', ['plain', 'rays', 'lines', 'dots', 'scales', 'checker', 'rings', 'chevron', 'hammered', 'stars', 'crosshatch', 'scroll'], 'rays'],
    emblem: ['Emblem', EMBLEM_LIST, 'globe'],
    emblemFinish: ['Emblem finish', ['metal', 'trim', 'colour'], 'metal'],
    emblemColor: ['Emblem colour', 'enamel', PAL.enamel[1]],
    gems: ['Gem layout', ['none', 'ring', 'top', 'bottom', 'corners', 'cross', 'sides', 'scatter', 'center'], 'ring'],
    gemSize: ['Gem size', ['small', 'medium', 'large'], 'medium'],
    gemColor: ['Gem colour', 'gem', PAL.gem[0]],
    gemColor2: ['Second gem colour', 'gem', PAL.gem[0]],
    topBanner: ['Top banner', ['none', 'ribbon', 'bar', 'arch'], 'none'],
    bottomBanner: ['Bottom banner', ['none', 'ribbon', 'bar', 'arch'], 'ribbon'],
    bannerColor: ['Banner colour', 'enamel', PAL.enamel[0]],
    textColor: ['Letter colour', 'text', PAL.text[0]],
    topper: ['Topper', ['none', 'crown', 'eagle', 'wings', 'star', 'horns', 'spikes', 'flame', 'orb', 'gem', 'fan', 'wreath', 'butterfly', 'halo', 'rays'], 'none'],
    sideCount: ['Side plates', [0, 1, 2, 3], 2],
    sideShape: ['Side plate shape', ['round', 'rectangle', 'shield', 'oval', 'diamond', 'hexagon', 'octagon', 'star', 'arch', 'crest', 'butterfly', 'maltese', 'pentagon', 'pill', 'compass'], 'round'],
    sideSize: ['Side plate size', ['small', 'medium', 'large'], 'medium'],
    sideEmblem: ['Side emblem', ['none', 'match', 'star', 'gem', 'letter', 'number', 'stripes', 'globe', 'crown', 'skull', 'bolt', 'flame', 'heart', 'eagle', 'sun', 'fist', 'dot', 'mask', 'butterfly', 'maltese', 'calendar', 'laurel'], 'star'],
    sideField: ['Side plate face', ['metal', 'enamel'], 'metal'],
    sideRim: ['Side plate rim', ['plain', 'beaded', 'double', 'none'], 'plain'],
    sideSpacing: ['Side plate spacing', ['tight', 'normal', 'wide'], 'normal'],
    sideColor: ['Side enamel colour', 'enamel', PAL.enamel[0]],
    strapColor: ['Strap colour', 'strap', PAL.strap[0]],
    strapTexture: ['Strap texture', ['smooth', 'croc', 'snake', 'tooled', 'studded', 'suede', 'carbon', 'striped', 'quilted', 'patent', 'leopard', 'flames', 'barbed', 'woven', 'diamondplate'], 'croc'],
    strapWidth: ['Strap width', ['thin', 'standard', 'wide'], 'standard'],
    strapEdge: ['Strap edge', ['none', 'stitch', 'piping', 'metal', 'studs', 'lace'], 'stitch'],
    strap2: ['Stitch and trim colour', 'strap', PAL.strap[8]],
    wear: ['Condition', ['new', 'worn', 'battered'], 'new'],
    shine: ['Shine', ['matte', 'polished', 'dazzling'], 'polished'],
    bg: ['Display', ['none', 'velvet', 'spotlight', 'case', 'plain', 'ring', 'stripes'], 'velvet'],
    bgColor: ['Display colour', 'bg', PAL.bg[0]]
  };
  const TEXT_FIELDS = { topText: 14, bottomText: 14, monogram: 3 };
  const TEXT_DEFAULTS = { topText: 'WORLD', bottomText: 'CHAMPION', monogram: 'W' };

  const HEX = /^#[0-9a-f]{6}$/i;
  const FONT = {
    A: '.x.x.xxxxx.xx.x', B: 'xx.x.xxx.x.xxx.', C: '.xxx..x..x...xx', D: 'xx.x.xx.xx.xxx.', E: 'xxxx..xx.x..xxx',
    F: 'xxxx..xx.x..x..', G: '.xxx..x.xx.x.xx', H: 'x.xx.xxxxx.xx.x', I: 'xxx.x..x..x.xxx', J: '..x..x..xx.x.x.',
    K: 'x.xx.xxx.x.xx.x', L: 'x..x..x..x..xxx', M: 'x.xxxxx.xx.xx.x', N: 'xx.x.xx.xx.xx.x', O: '.x.x.xx.xx.x.x.',
    P: 'xx.x.xxx.x..x..', Q: '.x.x.xx.xxx..xx', R: 'xx.x.xxx.x.xx.x', S: '.xxx...x...xxx.', T: 'xxx.x..x..x..x.',
    U: 'x.xx.xx.xx.xxxx', V: 'x.xx.xx.xx.x.x.', W: 'x.xx.xx.xxxxx.x', X: 'x.xx.x.x.x.xx.x', Y: 'x.xx.x.x..x..x.',
    Z: 'xxx..x.x.x..xxx', 0: 'xxxx.xx.xx.xxxx', 1: '.x.xx..x..x.xxx', 2: 'xx...x.x.x..xxx', 3: 'xx...x.x...xxx.',
    4: 'x.xx.xxxx..x..x', 5: 'xxxx..xx...xxx.', 6: '.xxx..xxxx.xxxx', 7: 'xxx..x.x..x..x.', 8: 'xxxx.xxxxx.xxxx',
    9: 'xxxx.xxxx..xxx.', ' ': '...............', '-': '......xxx......', '.': '.............x.', '!': '.x..x..x.....x.',
    "'": '.x..x..........', '&': '.x.x.x.x.x.x.xx', '?': 'xx...x.x.....x.', '/': '..x..x.x.x..x..', '#': 'x.xxxxx.xxxxx.x',
    '*': '...x.x.x.x.x...', ':': '....x.....x....', '+': '....x.xxx.x....'
  };
  const cleanText = (s, n) => [...String(s == null ? '' : s).toUpperCase()].filter(c => FONT[c]).join('').replace(/\s+/g, ' ').slice(0, n);
  const cleanField = (k, v, def) => { const vals = OPTIONS[k][1]; return Array.isArray(vals) ? (vals.includes(v) ? v : def) : (typeof v === 'string' && HEX.test(v) ? v.toLowerCase() : def); };

  function defaults() {
    const o = { v: 1 };
    for (const k in OPTIONS) o[k] = OPTIONS[k][2];
    Object.assign(o, TEXT_DEFAULTS);
    return o;
  }
  function normalize(look) {
    const src = look && typeof look === 'object' ? look : {};
    const o = { v: 1 };
    for (const k in OPTIONS) o[k] = cleanField(k, k === 'sideCount' && typeof src[k] === 'string' ? +src[k] : src[k], OPTIONS[k][2]);
    for (const k in TEXT_FIELDS) o[k] = typeof src[k] === 'string' ? cleanText(src[k], TEXT_FIELDS[k]) : TEXT_DEFAULTS[k];
    return o;
  }

  function rng(seed) {
    if (seed == null) return Math.random;
    let s = (typeof seed === 'number' ? seed : [...String(seed)].reduce((a, c) => a * 31 + c.charCodeAt(0) | 0, 7)) >>> 0 || 1;
    return () => { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; };
  }
  function random(seed) {
    const r = rng(seed), pick = a => a[Math.floor(r() * a.length)];
    const o = defaults();
    o.shape = pick(SHAPE_LIST);
    o.size = pick(['medium', 'large', 'large', 'huge']);
    o.metal = r() < 0.55 ? PAL.metal[0] : pick(PAL.metal);
    o.metal2 = r() < 0.7 ? o.metal : pick(PAL.metal);
    o.rim = pick(OPTIONS.rim[1]);
    o.rimWidth = pick(OPTIONS.rimWidth[1]);
    o.field = pick(['metal', 'metal', 'enamel', 'inset']);
    o.fieldColor = pick(PAL.enamel);
    o.engrave = pick(OPTIONS.engrave[1]);
    o.emblem = pick(EMBLEM_LIST.filter(e => e !== 'none' && e !== 'monogram'));
    o.emblemFinish = o.field === 'metal' ? pick(['metal', 'trim', 'colour']) : pick(['metal', 'metal', 'trim']);
    o.emblemColor = pick(PAL.enamel);
    o.gems = pick(OPTIONS.gems[1]);
    o.gemSize = pick(OPTIONS.gemSize[1]);
    o.gemColor = pick(PAL.gem);
    o.gemColor2 = r() < 0.6 ? o.gemColor : pick(PAL.gem);
    o.topBanner = r() < 0.6 ? 'none' : pick(['ribbon', 'bar', 'arch']);
    o.bottomBanner = r() < 0.3 ? 'none' : pick(['ribbon', 'bar', 'arch']);
    o.topText = pick(['WORLD', 'NATIONAL', 'TAG TEAM', 'WOMEN\'S', 'HARDCORE', 'UNIVERSAL', 'PREMIER', 'CROWN', 'IRON']);
    o.bottomText = pick(['CHAMPION', 'CHAMPIONS', 'TITLE', 'HEAVYWEIGHT', 'CHAMPIONSHIP']);
    o.bannerColor = pick(PAL.enamel);
    o.textColor = o.bannerColor === '#f5f5f5' || o.bannerColor === '#f4c20d' ? '#1b1b1f' : pick(['#ffffff', '#ffffff', o.metal]);
    o.topper = r() < 0.55 ? 'none' : pick(OPTIONS.topper[1].slice(1));
    o.sideCount = pick([1, 2, 2, 3, 3]);
    o.sideShape = pick(OPTIONS.sideShape[1]);
    o.sideSize = pick(OPTIONS.sideSize[1]);
    o.sideEmblem = pick(OPTIONS.sideEmblem[1]);
    o.sideField = pick(['metal', 'enamel']);
    o.sideColor = r() < 0.6 ? o.fieldColor : pick(PAL.enamel);
    o.strapColor = r() < 0.45 ? PAL.strap[0] : pick(PAL.strap);
    o.strapTexture = pick(OPTIONS.strapTexture[1]);
    o.strapWidth = pick(['standard', 'standard', 'thin', 'wide']);
    o.strapEdge = pick(OPTIONS.strapEdge[1]);
    o.strap2 = pick(PAL.strap);
    o.monogram = pick(['A', 'W', 'X', 'IC', 'TV', 'NX', 'K']);
    o.wear = r() < 0.75 ? 'new' : pick(['worn', 'battered']);
    o.shine = pick(['polished', 'polished', 'dazzling', 'matte']);
    o.bg = pick(OPTIONS.bg[1].slice(1));
    o.bgColor = pick(PAL.bg);
    return normalize(o);
  }

  // ---- colour helpers (same maths as WrestlerLook)
  function rgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16, n >> 8 & 255, n & 255]; }
  function hex(r, g, b) { return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1); }
  function mix(a, b, t) { const x = rgb(a), y = rgb(b); return hex(...x.map((v, i) => Math.round(v + (y[i] - v) * t))); }
  function sh(h, a) { return mix(h, a < 0 ? '#000000' : '#ffffff', Math.abs(a)); }
  const lum = h => { const [r, g, b] = rgb(h); return (r * 0.3 + g * 0.59 + b * 0.11) / 255; };
  const hash = (x, y, s) => { let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(s | 0, 2246822519); h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };

  // ---- geometry in normalized coordinates (u, v in -1..1, v down)
  function inPoly(p, u, v) {
    let c = false;
    for (let i = 0, j = p.length - 2; i < p.length; j = i, i += 2) {
      const xi = p[i], yi = p[i + 1], xj = p[j], yj = p[j + 1];
      if ((yi > v) !== (yj > v) && u < (xj - xi) * (v - yi) / (yj - yi) + xi) c = !c;
    }
    return c;
  }
  function starPts(n, ro, ri, cx, cy, sx, sy) {
    const p = [];
    for (let i = 0; i < n * 2; i++) { const a = -Math.PI / 2 + i * Math.PI / n, r = i % 2 ? ri : ro; p.push((cx || 0) + Math.cos(a) * r * (sx || 1), (cy || 0) + Math.sin(a) * r * (sy || 1)); }
    return p;
  }
  const mirror = p => { const q = p.slice(); for (let i = 0; i < q.length; i += 2) q[i] = -q[i]; return q; };
  const circ = (u, v, x, y, r) => (u - x) ** 2 + (v - y) ** 2 <= r * r;
  const ell = (u, v, x, y, rx, ry) => ((u - x) / rx) ** 2 + ((v - y) / ry) ** 2 <= 1;
  const STAR5 = starPts(5, 1, 0.42, 0, 0.08);

  const SHAPES = {
    oval: (u, v) => u * u + v * v <= 1,
    round: (u, v) => u * u + v * v <= 1,
    shield: (u, v) => v >= -1 + 0.16 * (1 - u * u) && (v < -0.15 ? Math.abs(u) <= 1 : Math.abs(u) <= Math.sqrt(Math.max(0, 1 - ((v + 0.15) / 1.15) ** 2))),
    rectangle: (u, v) => u ** 8 + v ** 8 <= 1,
    cushion: (u, v) => u ** 4 + v ** 4 <= 1,
    octagon: (u, v) => Math.abs(u) <= 1 && Math.abs(v) <= 1 && Math.abs(u) + Math.abs(v) <= 1.45,
    hexagon: (u, v) => Math.abs(v) <= 1 && Math.abs(u) <= 1 - 0.45 * Math.abs(v),
    diamond: (u, v) => Math.abs(u) + Math.abs(v) <= 1,
    star: (u, v) => inPoly(STAR_SHAPE, u, v),
    crest: (u, v) => { const r = Math.hypot(u, v), a = Math.atan2(v, u); return r <= 0.86 + 0.14 * Math.abs(Math.cos(a * 5)); },
    arch: (u, v) => v < -0.2 ? u * u + ((v + 0.2) / 0.8) ** 2 <= 1 : Math.abs(u) <= 1 && v <= 1 - 0.25 * u * u * 0,
    winged: (u, v) => {
      if (ell(u, v, 0, 0, 0.5, 1)) return true;
      const au = Math.abs(u);
      if (au > 1 || au < 0.3) return false;
      const t = (au - 0.3) / 0.7, top = -0.55 - 0.4 * t, bot = 0.6 - 0.75 * t + (Math.floor(t * 4) % 2 ? 0 : 0.12);
      return v >= top && v <= bot;
    },
    sunburst: (u, v) => { const r = Math.hypot(u, v), a = Math.atan2(v, u); return r <= (Math.cos(a * 16) > 0 ? 1 : 0.84); },
    quatrefoil: (u, v) => circ(u, v, -0.45, 0, 0.56) || circ(u, v, 0.45, 0, 0.56) || circ(u, v, 0, -0.45, 0.56) || circ(u, v, 0, 0.45, 0.56) || (Math.abs(u) < 0.5 && Math.abs(v) < 0.5),
    tablet: (u, v) => Math.abs(u) <= 1 && Math.abs(v) <= 1 && !(Math.abs(u) > 0.78 && Math.abs(v) > 0.7 && (Math.abs(u) - 0.78) ** 2 / 0.22 ** 2 + (Math.abs(v) - 0.7) ** 2 / 0.3 ** 2 < 1 === false && (Math.abs(u) - 1) ** 2 + (Math.abs(v) - 1) ** 2 < 0.09)
  };
  const PENT = starPts(5, 1.06, 1.06 * Math.cos(Math.PI / 5), 0, 0.12);
  const FLARED = [-1, 0, -0.62, -0.72, -0.34, -1, 0.34, -1, 0.62, -0.72, 1, 0, 0.62, 0.72, 0.34, 1, -0.34, 1, -0.62, 0.72];
  const COMPASS = starPts(8, 1.04, 0.74);
  function butterfly(u, v) {
    const au = Math.abs(u);
    if (ell(u, v, 0, 0, 0.16, 0.92)) return 'b';
    const up = ((au - 0.52) * 0.8 + (v + 0.3) * 0.6) / 0.5, uq = (-(au - 0.52) * 0.6 + (v + 0.3) * 0.8) / 0.62;
    if (up * up + uq * uq <= 1) return 'w';
    if (ell(au, v, 0.36, 0.5, 0.34, 0.44)) return 'l';
    return null;
  }
  function maltese(u, v) {
    const a = Math.max(Math.abs(u), Math.abs(v)), b = Math.min(Math.abs(u), Math.abs(v)), hw = 0.14 + 0.56 * a;
    return b <= hw && a <= 0.74 + 0.28 * (b / hw) && a <= 1;
  }
  Object.assign(SHAPES, {
    butterfly: (u, v) => !!butterfly(u, v),
    maltese,
    pentagon: (u, v) => inPoly(PENT, u, v),
    flared: (u, v) => inPoly(FLARED, u, v),
    pill: (u, v) => (Math.max(0, Math.abs(u) - 0.45) / 0.55) ** 2 + v * v <= 1,
    compass: (u, v) => inPoly(COMPASS, u, v) || u * u + v * v <= 0.6,
    stepped: (u, v) => { const av = Math.abs(v); return av <= 1 && Math.abs(u) <= [1, 0.84, 0.68, 0.52][Math.min(3, Math.floor(av / 0.25))]; }
  });
  const STAR_SHAPE = starPts(5, 1.08, 0.55, 0, 0.1);
  // plate box multipliers: [width factor, height factor]
  const SHAPE_BOX = { round: 'sq', star: 'sq', crest: 'sq', sunburst: 'sq', quatrefoil: 'sq', shield: [0.82, 1.05], arch: [0.82, 1], diamond: [1.15, 1.1], winged: [1.35, 0.92], hexagon: [1.08, 1], maltese: 'sq', compass: 'sq', pentagon: 'sq', butterfly: [1.3, 1], flared: [1.3, 1], pill: [1.3, 0.78], stepped: [1.1, 1] };
  const PLATE = { small: [36, 28], medium: [44, 34], large: [52, 40], huge: [60, 46] };
  const SIDE = { small: [8, 8], medium: [10, 10], large: [12, 12] };
  function boxFor(shape, w, h) {
    const b = SHAPE_BOX[shape];
    if (b === 'sq') { const s = Math.round((w * 0.78 + h) / 2 / 2) * 2; return [s, s]; }
    if (b) return [Math.round(w * b[0] / 2) * 2, Math.round(Math.min(h * b[1], 48) / 2) * 2];
    return [w, h];
  }

  // ---- emblems: f(u, v) -> role or null. Roles: m main, d dark, l light, g gem, G gem light, D gem dark, w white
  const EAGLE_WING = [-0.12, -0.25, -0.55, -0.55, -1, -0.95, -0.92, -0.62, -1, -0.58, -0.86, -0.32, -0.94, -0.24, -0.72, -0.02, -0.78, 0.06, -0.5, 0.15, -0.12, 0.25];
  const CROWN = [-0.85, 0.32, -0.85, -0.55, -0.45, -0.02, 0, -0.8, 0.45, -0.02, 0.85, -0.55, 0.85, 0.32];
  const BOLT = [0.28, -1, -0.6, 0.12, -0.05, 0.12, -0.32, 1, 0.62, -0.22, 0.08, -0.22, 0.42, -1];
  const FLAME = [-0.62, 0.45, -0.66, -0.1, -0.38, 0.1, -0.32, -0.55, -0.1, -0.22, 0, -1, 0.16, -0.38, 0.36, -0.64, 0.42, -0.06, 0.64, -0.3, 0.62, 0.45];
  const FLAME_IN = [-0.28, 0.6, -0.3, 0.2, -0.08, 0.3, 0.02, -0.2, 0.14, 0.25, 0.3, 0.15, 0.28, 0.6];
  const CUP = [-0.72, -0.92, 0.72, -0.92, 0.58, -0.25, 0.2, 0.12, -0.2, 0.12, -0.58, -0.25];
  const GEMCUT = [-0.95, -0.35, -0.5, -0.85, 0.5, -0.85, 0.95, -0.35, 0, 0.95];
  const EYE = [-0.62, -0.28, -0.12, -0.1, -0.16, 0.12, -0.5, 0.06];
  const FIST = [-0.7, -0.5, 0.6, -0.5, 0.75, -0.3, 0.75, 0.3, 0.45, 0.62, 0.45, 1, -0.45, 1, -0.45, 0.62, -0.7, 0.3];
  const EMB = {
    globe: (u, v) => { const r = Math.hypot(u, v); if (r > 1) return null; if (Math.abs(v) < 0.08 || Math.abs(Math.abs(v) - 0.5) < 0.07 || Math.abs(u) < 0.07 || Math.abs(Math.abs(u) - 0.55 * Math.sqrt(Math.max(0, 1 - v * v))) < 0.08) return 'd'; return r > 0.9 ? 'd' : 'm'; },
    star: (u, v) => inPoly(STAR5, u, v) ? (inPoly(starPts(5, 0.45, 0.2, 0, 0.08), u, v) ? 'l' : 'm') : null,
    crown: (u, v) => { if (v >= 0.32 && v <= 0.88 && Math.abs(u) <= 0.88) { if ([-0.48, 0, 0.48].some(x => circ(u, v, x, 0.6, 0.15))) return 'g'; return v < 0.42 ? 'l' : 'm'; } if (inPoly(CROWN, u, v)) return 'm'; if (circ(u, v, -0.85, -0.66, 0.14) || circ(u, v, 0.85, -0.66, 0.14) || circ(u, v, 0, -0.88, 0.14)) return 'l'; return null; },
    eagle: (u, v) => { if (circ(u, v, 0, -0.62, 0.2)) return 'm'; if (u > -0.05 && u < 0.32 && v > -0.68 && v < -0.5 && u - 0.1 < (v + 0.5) * -1.2 + 0.2) return 'g'; if (ell(u, v, 0, 0.08, 0.22, 0.55)) return 'm'; if (inPoly(EAGLE_WING, u, v) || inPoly(mirror(EAGLE_WING), u, v)) return (Math.floor(Math.abs(u) * 7) % 2 && v > -0.3) ? 'd' : 'm'; if (inPoly([-0.24, 0.55, 0.24, 0.55, 0.38, 1, 0, 0.84, -0.38, 1], u, v)) return 'd'; return null; },
    skull: (u, v) => { const head = circ(u, v, 0, -0.18, 0.78) || (Math.abs(u) < 0.46 && v > 0.2 && v < 0.88); if (!head) return null; if (circ(u, v, -0.32, -0.12, 0.2) || circ(u, v, 0.32, -0.12, 0.2) || inPoly([0, 0.12, -0.12, 0.36, 0.12, 0.36], u, v)) return null; if (v > 0.56 && Math.floor((u + 1) * 5) % 2) return 'd'; return 'm'; },
    bolt: (u, v) => inPoly(BOLT, u, v) ? (inPoly(BOLT, u + 0.12, v + 0.05) ? 'm' : 'l') : null,
    flame: (u, v) => { if (inPoly(FLAME_IN, u, v) || circ(u, v, 0, 0.55, 0.26)) return 'g'; if (inPoly(FLAME, u, v) || circ(u, v, 0, 0.42, 0.58)) return 'm'; return null; },
    ring: (u, v) => { const au = Math.abs(u), av = Math.abs(v), m = Math.max(au, av); if (circ(au, av, 0.82, 0.82, 0.18)) return 'l'; if (m <= 0.86 && m >= 0.76) return 'm'; if (m <= 0.66 && m >= 0.58) return 'd'; if (m < 0.48) return 'm'; return null; },
    laurel: (u, v) => { const au = Math.abs(u), a = Math.atan2(v, au), r = Math.hypot(au, v); if (a < -1.3) return null; if (Math.abs(r - 0.74) < 0.05 && a > -1.15) return 'd'; for (let i = 0; i < 7; i++) { const t = -1.12 + i * 0.37, s = i % 2 ? 1 : -1; const cx = Math.cos(t) * 0.74, cy = Math.sin(t) * 0.74; const tx = -Math.sin(t), ty = Math.cos(t); const ang = s * 0.7; const lx = tx * Math.cos(ang) - ty * Math.sin(ang) * s, ly = ty * Math.cos(ang) + tx * Math.sin(ang) * s; const ox = cx + (cos => cos)(Math.cos(t)) * s * 0.13, oy = cy + Math.sin(t) * s * 0.13; const du = au - ox, dv = v - oy; const al = du * lx + dv * ly, ac = -du * ly + dv * lx; if ((al / 0.24) ** 2 + (ac / 0.11) ** 2 <= 1) return ac < 0 ? 'l' : 'm'; } return null; },
    mask: (u, v) => { if (!ell(u, v, 0, 0.05, 0.78, 0.95)) return null; if (inPoly(EYE, u, v) || inPoly(mirror(EYE), u, v) || ell(u, v, 0, 0.58, 0.24, 0.1)) return null; if (Math.abs(u) < 0.1 && v < -0.18) return 'g'; if (inPoly([-0.75, -0.42, -0.1, -0.22, -0.12, 0.2, -0.6, 0.18], u, v) || inPoly([0.75, -0.42, 0.1, -0.22, 0.12, 0.2, 0.6, 0.18], u, v)) return 'd'; return 'm'; },
    sun: (u, v) => { const r = Math.hypot(u, v), a = Math.atan2(v, u); if (r < 0.32) return 'l'; if (r < 0.52) return 'm'; if (r <= 1 && Math.cos(a * 8) > 0.55) return 'm'; return null; },
    heart: (u, v) => { if (circ(u, v, -0.28, -0.3, 0.18)) return 'l'; return circ(u, v, -0.42, -0.3, 0.5) || circ(u, v, 0.42, -0.3, 0.5) || inPoly([-0.9, -0.12, 0.9, -0.12, 0, 0.95], u, v) ? 'm' : null; },
    gem: (u, v) => { if (!inPoly(GEMCUT, u, v)) return null; if (v < -0.35) return Math.abs(u) < 0.25 ? 'w' : 'G'; return u < -0.1 ? 'g' : u > 0.1 ? 'D' : 'G'; },
    trophy: (u, v) => { if (inPoly(CUP, u, v)) return v < -0.75 ? 'l' : 'm'; if ((circ(u, v, -0.7, -0.5, 0.3) && !circ(u, v, -0.7, -0.5, 0.15) && u < -0.6) || (circ(u, v, 0.7, -0.5, 0.3) && !circ(u, v, 0.7, -0.5, 0.15) && u > 0.6)) return 'm'; if (Math.abs(u) < 0.12 && v >= 0.1 && v < 0.62) return 'd'; if (Math.abs(u) < 0.52 && v >= 0.62 && v <= 0.95) return v < 0.72 ? 'l' : 'm'; return null; },
    swords: (u, v) => { for (const s of [1, -1]) { const a = (u * s + v) / 1.414, b = (u * s - v) / 1.414; if (Math.abs(b) < 0.1 && a > -0.95 && a < 0.5) return 'l'; if (Math.abs(a - 0.52) < 0.07 && Math.abs(b) < 0.3) return 'm'; if (Math.abs(b) < 0.08 && a >= 0.52 && a < 0.95) return 'd'; } return null; },
    fist: (u, v) => { if (!inPoly(FIST, u, v) && !(circ(u, v, -0.72, -0.05, 0.25))) return null; if (v < 0.1 && v > -0.5 && Math.abs(((u + 0.7) / 1.4 * 4) % 1 - 0) < 0.1 && u > -0.4) return 'd'; if (v > -0.12 && v < -0.02 && u > -0.55) return 'd'; if (v < -0.38) return 'l'; return 'm'; },
    butterfly: (u, v) => { const r = butterfly(u, v); if (!r) return null; if (r === 'b') return 'd'; if (r === 'w') return circ(Math.abs(u), v, 0.55, -0.38, 0.16) ? 'g' : 'm'; return circ(Math.abs(u), v, 0.38, 0.52, 0.1) ? 'l' : 'm'; },
    maltese: (u, v) => { if (!maltese(u, v)) return null; if (circ(u, v, 0, 0, 0.24)) return 'g'; return maltese(u / 0.7, v / 0.7) && Math.min(Math.abs(u), Math.abs(v)) > 0.04 ? 'm' : 'l'; },
    sunrise: (u, v) => { if (v > 0.55) return Math.abs(v - 0.72) < 0.08 && Math.abs(u) < 1 ? 'd' : null; const r = Math.hypot(u, v - 0.55), a = Math.atan2(v - 0.55, u); if (r < 0.5) return r < 0.34 ? 'g' : 'G'; if (r <= 1.12 && Math.cos(a * 9) > 0.4 && v < 0.5) return 'm'; return null; },
    calendar: (u, v) => { const r = Math.hypot(u, v), a = Math.atan2(v, u); if (r > 1) return null; if (r > 0.82) return Math.cos(a * 16) > 0 ? 'm' : 'd'; if (r > 0.74) return 'd'; if (r > 0.5) return Math.cos(a * 8) > 0.3 ? 'l' : 'm'; if (r > 0.42) return 'd'; if (r < 0.2) return 'g'; return inPoly(starPts(4, 0.42, 0.14), u, v) ? 'l' : 'm'; },
    twostars: (u, v) => { for (const s of [-1, 1]) { const x = (u - s * 0.48) / 0.56, y = (v + s * 0.12) / 0.62; if (inPoly(STAR5, x, y)) return inPoly(starPts(5, 0.45, 0.2, 0, 0.08), x, y) ? 'l' : 'm'; } return null; },
    // side-plate extras
    dot: (u, v) => circ(u, v, 0, 0, 0.55) ? 'm' : null,
    stripes: (u, v) => Math.floor((v + 1) * 2.5) % 2 ? 'g' : 'm',
    sgem: (u, v) => circ(u, v, 0, 0, 0.8) ? (u + v < -0.5 ? 'G' : u + v > 0.5 ? 'D' : 'g') : null
  };

  // ---- topper shapes, drawn in a box around the plate
  const TOP = {
    wings: (u, v) => { const au = Math.abs(u); if (au < 0.25) return null; for (let j = 5; j >= 0; j--) { const t = (-0.12 - j * 0.2), L = 0.42 + j * 0.09, rx = 0.3, ry = 0.3; const ex = rx + Math.cos(t) * L, ey = ry + Math.sin(t) * L * 1.6; const dx = ex - rx, dy = ey - ry, l2 = dx * dx + dy * dy; let k = ((au - rx) * dx + (v - ry) * dy) / l2; k = Math.max(0, Math.min(1, k)); const px = rx + dx * k, py = ry + dy * k; const wdt = 0.07 * (1 - k * 0.5) + 0.02; if (Math.hypot(au - px, (v - py) / 1.6) < wdt) return k > 0.85 ? 'l' : j % 2 ? 'd' : 'm'; } return null; },
    horns: (u, v) => { const au = Math.abs(u); for (let i = 0; i <= 20; i++) { const t = i / 20, x = 0.4 + 0.5 * Math.sin(t * 1.6), y = 0.6 - 1.6 * t, r = 0.16 * (1 - t) + 0.03; if (circ(au, v, x, y, r)) return t > 0.7 ? 'l' : 'm'; } return null; },
    spikes: (u, v) => { for (let i = -3; i <= 3; i++) { const x = i * 0.27, h = 1 - Math.abs(i) * 0.2, top = 1 - 2 * h; if (v > 1 || v < top) continue; const hw = 0.12 * (v - top) / (2 * h); if (Math.abs(u - x) <= hw) return u - x < -hw * 0.3 ? 'l' : u - x > hw * 0.4 ? 'd' : 'm'; } return null; },
    flame: (u, v) => { const au = Math.abs(u); const xs = [0.12, 0.34, 0.56, 0.78], hs = [1, 0.75, 0.9, 0.55]; for (let i = 0; i < 4; i++) { const top = 1 - 2 * hs[i]; if (v < top || v > 1) continue; const k = (v - top) / (2 * hs[i]); const hw = 0.13 * Math.sqrt(k); if (Math.abs(au - xs[i] - 0.04 * Math.sin(k * 6)) <= hw) return k < 0.3 ? 'G' : k > 0.7 ? 'D' : 'g'; } return null; },
    orb: (u, v) => { if (circ(u, v, 0, -0.3, 0.62)) return circ(u, v, -0.2, -0.5, 0.18) ? 'l' : Math.abs(v + 0.3) < 0.08 ? 'd' : 'm'; if (Math.abs(u) < 0.25 && v > 0.3 && v < 1) return 'd'; return null; },
    fan: (u, v) => { const r = Math.hypot(u, v), a = Math.atan2(v, u); if (r > 1) return null; return Math.cos(a * 14) > 0 ? 'm' : 'd'; },
    butterfly: (u, v) => { const au = Math.abs(u); if (au < 0.28) return null; const r = butterfly(u, v); if (!r || r === 'b') return null; if (r === 'w') return circ(au, v, 0.6, -0.4, 0.13) ? 'g' : (Math.floor(au * 9) % 3 === 0 ? 'd' : 'm'); return 'l'; },
    halo: (u, v) => { const r = Math.hypot(u, v); if (r > 1 || r < 0.84) return null; const a = Math.atan2(v, u); return Math.cos(a * 12) > 0.6 ? 'l' : r > 0.93 ? 'm' : 'd'; },
    rays: (u, v) => { const r = Math.hypot(u, v), a = Math.atan2(v, u); if (r > 1 || v > 0.3) return null; return Math.cos(a * 14) > 0.35 ? (r > 0.9 ? 'd' : 'm') : null; },
    wreath: (u, v) => { const r = Math.hypot(u, v), a = Math.atan2(v, Math.abs(u)); if (a < -1.25 || r > 1) return null; for (let i = 0; i < 12; i++) { const t = -1.15 + i * 0.24, side = i % 2 ? 0.94 : 0.8; if (circ(Math.abs(u), v, Math.cos(t) * side, Math.sin(t) * side, 0.09)) return i % 3 ? 'm' : 'l'; } return Math.abs(r - 0.87) < 0.025 ? 'd' : null; }
  };

  // ---- canvas state helpers
  function mkLayer() { return { c: new Array(W * H).fill(null), k: new Uint8Array(W * H) }; }
  // kinds: 1 strap, 2 metal, 3 enamel, 4 gem, 5 banner, 6 text
  const ROLE_KIND = { m: 2, d: 2, l: 2, g: 4, G: 4, D: 4, w: 4, e: 3 };

  function pixels(look, opt) {
    const L = normalize(look);
    const withBg = !opt || opt.bg !== false;
    const F = mkLayer(), C = F.c, K = F.k;
    const ok = (x, y) => x >= 0 && x < W && y >= 0 && y < H;
    const set = (x, y, c, k) => { if (ok(x, y)) { C[y * W + x] = c; K[y * W + x] = k || 0; } };
    const get = (x, y) => ok(x, y) ? C[y * W + x] : null;
    const matte = L.shine === 'matte';
    const hl = matte ? 0.18 : 0.38, dk = -0.3;
    const M = L.metal, T = L.metal2;
    const mt = c => ({ m: c, l: sh(c, hl), d: sh(c, dk), dd: sh(c, -0.5), ll: sh(c, matte ? 0.3 : 0.62) });
    const MM = mt(M), TT = mt(T);
    const gemPal = c => ({ g: c, G: sh(c, 0.4), D: sh(c, -0.35), w: '#ffffff' });

    // generic: paint fn over a box; returns a mask of painted pixels. clip(x,y) optional.
    function paintFn(fn, cx, cy, bw, bh, pal, clip, kindOverride) {
      const mask = new Uint8Array(W * H), roles = {};
      const x0 = Math.floor(cx - bw / 2) - 1, x1 = Math.ceil(cx + bw / 2) + 1, y0 = Math.floor(cy - bh / 2) - 1, y1 = Math.ceil(cy + bh / 2) + 1;
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        if (!ok(x, y) || (clip && !clip(x, y))) continue;
        const u = (x + 0.5 - cx) / (bw / 2), v = (y + 0.5 - cy) / (bh / 2);
        const role = fn(u, v);
        if (!role || !pal[role]) continue;
        mask[y * W + x] = 1; roles[y * W + x] = role;
        set(x, y, pal[role], kindOverride || ROLE_KIND[role] || 2);
      }
      // bevel on main-role pixels
      for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
        if (!ok(x, y) || !mask[y * W + x] || roles[y * W + x] !== 'm') continue;
        const out = (a, b) => !ok(a, b) || !mask[b * W + a];
        if (out(x - 1, y) || out(x, y - 1)) set(x, y, pal.l, K[y * W + x]);
        else if (out(x + 1, y) || out(x, y + 1)) set(x, y, pal.d, K[y * W + x]);
      }
      return mask;
    }
    function shapeMask(shape, cx, cy, w, h) {
      const mask = new Uint8Array(W * H), f = SHAPES[shape];
      for (let y = Math.floor(cy - h / 2) - 1; y <= cy + h / 2 + 1; y++) for (let x = Math.floor(cx - w / 2) - 1; x <= cx + w / 2 + 1; x++) {
        if (!ok(x, y)) continue;
        if (f((x + 0.5 - cx) / (w / 2), (y + 0.5 - cy) / (h / 2))) mask[y * W + x] = 1;
      }
      return mask;
    }
    // distance (4-neighbour steps) from outside, inside mask
    function depth(mask) {
      const d = new Int16Array(W * H).fill(0); let q = [];
      for (let i = 0; i < W * H; i++) if (mask[i]) {
        const x = i % W, y = (i / W) | 0;
        if (!ok(x - 1, y) || !mask[i - 1] || !ok(x + 1, y) || !mask[i + 1] || !ok(x, y - 1) || !mask[i - W] || !ok(x, y + 1) || !mask[i + W]) { d[i] = 1; q.push(i); }
      }
      while (q.length) {
        const nq = [];
        for (const i of q) { const x = i % W; for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, i - W, i + W]) if (j >= 0 && j < W * H && mask[j] && !d[j]) { d[j] = d[i] + 1; nq.push(j); } }
        q = nq;
      }
      return d;
    }
    function text(str, x0, y0, col, perChar) {
      [...str].forEach((ch, i) => {
        const g = FONT[ch]; if (!g) return;
        const dy = perChar ? perChar(i) : 0;
        for (let j = 0; j < 15; j++) if (g[j] === 'x') set(x0 + i * 4 + (j % 3), y0 + dy + ((j / 3) | 0), col, 6);
      });
    }
    function gem(cx, cy, r, col, setting) {
      const p = gemPal(col);
      for (let y = Math.floor(cy - r - 2); y <= cy + r + 2; y++) for (let x = Math.floor(cx - r - 2); x <= cx + r + 2; x++) {
        const dx = x + 0.5 - cx, dy = y + 0.5 - cy, d = Math.hypot(dx, dy);
        if (d <= r) {
          let c = p.g;
          if (dx + dy < -r * 0.35) c = p.G;
          if (dx + dy > r * 0.6) c = p.D;
          set(x, y, c, 4);
        } else if (setting && d <= r + 1) set(x, y, setting, 2);
      }
      const hx = Math.floor(cx - r * 0.45), hy = Math.floor(cy - r * 0.45);
      if (r > 1.2) set(hx, hy, '#ffffff', 4); else set(Math.floor(cx - 0.5), Math.floor(cy - 0.5), p.G, 4);
    }

    // ---- the strap
    const sw = { thin: 8, standard: 11, wide: 14 }[L.strapWidth];
    const droop = 6;
    const sc = x => CY + 1 + droop * ((x + 0.5 - CX) / (W / 2)) ** 2;
    const S = L.strapColor, SD = sh(S, -0.28), SL = sh(S, lum(S) > 0.8 ? -0.08 : 0.16), S2 = L.strap2;
    const strapTop = [];
    for (let x = 1; x < W - 2; x++) {
      let half = sw / 2;
      if (x < 13) half = Math.max(1, half * Math.sqrt(Math.max(0, 1 - ((13 - x) / 12.5) ** 2)));
      const c = sc(x), t = Math.round(c - half), b = Math.round(c + half) - 1;
      strapTop[x] = Math.round(c - sw / 2);
      for (let y = t; y <= b; y++) {
        const r = y - strapTop[x];
        let col = S;
        const tex = L.strapTexture;
        if (tex === 'croc') { const row = Math.floor(r / 3); if (r % 3 === 0 || (x + (row % 2) * 2) % 5 === 0) col = SD; else if ((x + r) % 5 === 1 && hash(x, r, 3) < 0.4) col = SL; }
        else if (tex === 'snake') { if ((x + r) % 4 === 0 || (x - r + 400) % 4 === 0) col = SD; else if ((x + r) % 4 === 2 && (x - r + 400) % 4 === 2) col = SL; }
        else if (tex === 'tooled') { const m = (x % 8), n = r - Math.floor(sw / 2); if ((m === 0 || m === 4) && Math.abs(n) < 3) col = SD; if (Math.abs(n) === Math.abs(m - 4) % 4 + 0 && m % 2) col = SD; if (m === 2 && n === 0 || m === 6 && n === 0) col = SL; }
        else if (tex === 'studded') { const n = r - Math.floor((sw - 1) / 2); if (x % 4 === 0 && (n === 0 || n === -1)) col = n ? MM.l : MM.m; if (x % 4 === 1 && (n === 0 || n === -1)) col = n ? MM.m : MM.d; }
        else if (tex === 'suede') { const h = hash(x, r, 9); if (h < 0.22) col = sh(S, -0.1); else if (h > 0.9) col = sh(S, 0.08); }
        else if (tex === 'carbon') { col = ((x >> 1) + (r >> 1)) % 2 ? sh(S, -0.15) : sh(S, 0.06); }
        else if (tex === 'striped') { if (r >= Math.floor(sw / 3) && r < sw - Math.floor(sw / 3)) col = S2; }
        else if (tex === 'patent') { if (r === 2 || (r === 3 && x % 9 < 6)) col = sh(S, lum(S) > 0.8 ? -0.06 : 0.32); else if (r >= sw - 3) col = sh(S, -0.12); }
        else if (tex === 'leopard') { const cx4 = x >> 2, ry = r + (cx4 % 2) * 2, cy4 = ry >> 2, lx = x & 3, ly = ry & 3, h = hash(cx4, cy4, 21); if (h < 0.55 && lx > 0 && ly > 0) col = (lx === 2 && ly === 2) || h < 0.2 && !(lx === 3 || ly === 3) ? S2 : sh(S, -0.55); }
        else if (tex === 'flames') { const t = (sw - 1 - r) / sw, f = 0.42 + 0.22 * Math.sin(x * 0.55) + 0.14 * Math.sin(x * 1.37 + 1); if (t < f) col = t < f * 0.45 ? sh(S2, 0.3) : t > f - 0.12 ? sh(S2, -0.25) : S2; }
        else if (tex === 'barbed') { const mid = (sw - 1) / 2, a = Math.round(mid + Math.sin(x * 0.5) * (mid - 1.5)), b2 = Math.round(mid - Math.sin(x * 0.5) * (mid - 1.5)); if (r === a || r === b2) col = r === a ? '#c9ced6' : '#8a919c'; else if (x % 8 === 0 && Math.abs(r - mid) < 2) col = '#e2e6ec'; else if (x % 8 === 0 && Math.abs(r - mid) < 3) col = '#6d7480'; }
        else if (tex === 'woven') { const on = ((x >> 2) + (r >> 2)) % 2; if (on ? x % 4 === 0 : r % 4 === 0) col = SD; else if (on ? x % 4 === 1 : r % 4 === 1) col = SL; }
        else if (tex === 'diamondplate') { const q = (x + (Math.floor(r / 3) % 2) * 3) % 6; if (r % 3 === 1 && (q === 0 || q === 1)) col = q ? SD : sh(S, 0.3); }
        else if (tex === 'quilted') { if ((x + r) % 6 === 0 || (x - r + 600) % 6 === 0) col = (x % 2 ? S2 : SD); }
        if (y === t) col = r === 0 ? SL : col;
        if (y === b) col = SD;
        if (L.strapEdge === 'stitch' && (r === 1 || r === sw - 2) && x % 2 && x > 12) col = S2;
        if (L.strapEdge === 'piping' && (r === 0 || r === sw - 1)) col = r ? sh(S2, -0.2) : S2;
        if (L.strapEdge === 'metal' && (r === 0 || r === sw - 1)) col = r ? TT.d : TT.l;
        if (L.strapEdge === 'studs' && (r === 1 || r === sw - 2) && x > 12 && x % 3 < 2) col = x % 3 ? TT.d : TT.ll;
        if (L.strapEdge === 'lace' && x > 12 && ((r === 0 || r === sw - 1) && (x >> 1) % 2 || (r === 1 || r === sw - 2) && ((x >> 1) + 1) % 2)) col = S2;
        set(x, y, col, 1);
      }
    }
    // tip holes
    for (let i = 0; i < 4; i++) { const x = 17 + i * 5, y = Math.round(sc(x)) - 1; set(x, y, sh(S, -0.65), 1); set(x, y + 1, sh(S, -0.65), 1); }
    // keeper loop and snaps on the right end
    for (let x = W - 26; x < W - 22; x++) for (let y = strapTop[x] - 1; y <= strapTop[x] + sw; y++) set(x, y, x === W - 26 ? sh(S2, 0.2) : x === W - 23 ? sh(S2, -0.25) : S2, 1);
    [W - 15, W - 9].forEach(x => { const y = sc(x); for (let j = -1; j <= 0; j++) for (let i = -1; i <= 0; i++) set(x + i, Math.round(y) + j, j < 0 && i < 0 ? TT.l : TT.m, 2); });

    // ---- plate geometry
    const [pw, ph] = boxFor(L.shape, ...PLATE[L.size]);
    const shape = L.shape;
    const plateTop = CY - ph / 2, plateBot = CY + ph / 2;
    const rimW = L.rim === 'none' ? 0 : { thin: 2, normal: 3, thick: 4 }[L.rimWidth];
    const fieldBase = L.field === 'enamel' ? L.fieldColor : M;
    const EMC = L.emblemFinish === 'metal' ? M : L.emblemFinish === 'trim' ? T : L.emblemColor;
    const EMM = L.field === 'metal' && EMC === M ? sh(M, 0.14) : EMC;
    const emPal = Object.assign({ m: EMM, l: sh(EMM, hl), d: sh(EMM, -0.32) }, gemPal(L.gemColor));
    const sideEdge = (sx, sy, mask) => { for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; if (mask[i]) continue; if ((ok(x - 1, y) && mask[i - 1]) || (ok(x + 1, y) && mask[i + 1]) || (ok(x, y - 1) && mask[i - W]) || (ok(x, y + 1) && mask[i + W])) if (C[i]) set(x, y, OUTLINE, 0); } };

    // generic plate: used for the centre plate and side plates
    function plate(cx, cy, w, h, cfg) {
      const mask = shapeMask(cfg.shape, cx, cy, w, h);
      const d = depth(mask);
      const rw = cfg.rimW;
      const fb = cfg.field === 'enamel' ? cfg.fieldColor : cfg.metal;
      const fieldKind = cfg.field === 'enamel' ? 3 : 2;
      const inset = cfg.field === 'inset';
      const insetR = inset ? Math.max(rw + 3, Math.round(Math.min(w, h) * 0.18)) : 0;
      const TM = mt(cfg.metal2), FM = mt(fb);
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const i = y * W + x; if (!mask[i]) continue;
        const di = d[i];
        const mx = x < cx ? Math.floor(cx) - 1 - x : x - Math.floor(cx);
        const dx = x + 0.5 - cx, dy = y + 0.5 - cy;
        if (di <= rw) {
          // rim
          let c = TM.m;
          const ang = Math.atan2(dy, Math.abs(dx)), N = Math.max(8, Math.round((w + h) * 0.9));
          const k = Math.floor((ang + Math.PI / 2) / Math.PI * N / 2 + 1000);
          const mid = Math.ceil(rw / 2) + (rw > 2 ? 0 : 0);
          if (cfg.rim === 'beaded' && di === mid) c = k % 2 ? TM.ll : TM.d;
          if (cfg.rim === 'rope') c = [TM.l, TM.m, TM.d][(k + di) % 3];
          if (cfg.rim === 'studs' && di === mid) c = k % 3 === 0 ? '#ffffff' : k % 3 === 1 ? TM.l : TM.m;
          if (cfg.rim === 'double') c = di === 1 || di === rw ? TM.m : TM.dd;
          if (cfg.rim === 'filigree') c = (k + di * 2) % 4 === 0 ? TM.ll : (k + di) % 4 === 2 ? TM.d : TM.m;
          if (cfg.rim === 'jeweled' && di === mid) c = k % 2 ? (Math.floor(k / 2) % 2 ? cfg.gem2 : cfg.gem1) : TM.d;
          if (cfg.rim === 'notched' && di === 1 && k % 2) { C[i] = null; K[i] = 0; mask[i] = 0; continue; }
          const out = (a, b) => !ok(a, b) || !mask[b * W + a];
          if (di === 1 && c === TM.m) { if (out(x - 1, y) || out(x, y - 1)) c = TM.l; else if (out(x + 1, y) || out(x, y + 1)) c = TM.d; }
          if (di === rw && rw > 1 && c === TM.m) { if (d[i + W] > rw || d[i + 1] > rw) c = TM.d; else if (d[i - W] > rw || d[i - 1] > rw) c = TM.l; }
          set(x, y, c, cfg.rim === 'jeweled' && di === mid && k % 2 ? 4 : 2);
          continue;
        }
        // field
        let c = fb, kind = fieldKind;
        if (inset) {
          if (di <= insetR) { c = cfg.metal; kind = 2; if (di === insetR) c = FM.d; }
          else { c = cfg.fieldColor; kind = 3; }
        }
        const base = c;
        const e = cfg.engrave;
        let p = 0;
        if (e === 'rays') p = Math.floor((Math.atan2(dy, dx) + Math.PI) / (Math.PI / 12)) % 2 ? 2 : 0;
        if (e === 'lines') p = y % 3 === 0 ? 1 : 0;
        if (e === 'dots') p = mx % 3 === 1 && y % 3 === 1 ? 1 : 0;
        if (e === 'scales') p = (y % 3 === 0 || (mx + (Math.floor(y / 3) % 2) * 2) % 4 === 0) ? 1 : 0;
        if (e === 'checker') p = ((mx >> 1) + (y >> 1)) % 2 ? 1 : 0;
        if (e === 'rings') p = Math.round(Math.hypot(dx / w, dy / h) * 40) % 3 === 0 ? 1 : 0;
        if (e === 'chevron') p = (mx + y) % 4 === 0 ? 1 : 0;
        if (e === 'hammered') { const hh = hash(mx, y, 5); p = hh < 0.16 ? 1 : hh > 0.9 ? 2 : 0; }
        if (e === 'stars') p = hash(mx, y, 11) < 0.05 ? 2 : 0;
        if (e === 'crosshatch') p = (mx + y) % 4 === 0 || (mx - y + 400) % 4 === 0 ? 1 : 0;
        if (e === 'scroll') { const q = (y + Math.round(Math.sin(mx * 0.55) * 2) + 40) % 5; p = q === 0 ? 1 : q === 1 ? 2 : 0; }
        if (p === 1) c = sh(base, -0.16);
        if (p === 2) c = sh(base, lum(base) > 0.85 ? -0.08 : 0.14);
        set(x, y, c, kind);
      }
      // emblem
      if (cfg.emblem) {
        const clip = (x, y) => mask[y * W + x] && d[y * W + x] > rw;
        let em;
        if (cfg.emblem.text) {
          const t = cfg.emblem.text, n = t.length; if (n) {
            const s = Math.max(1, Math.min(Math.floor(cfg.emblem.w / (n * 4 - 1)), Math.floor(cfg.emblem.h / 5)));
            const tw = (n * 4 - 1) * s, x0 = Math.round(cfg.emblem.cx - tw / 2), y0 = Math.round(cfg.emblem.cy - 5 * s / 2);
            em = new Uint8Array(W * H);
            [...t].forEach((ch, ci) => { const g = FONT[ch]; for (let j = 0; j < 15; j++) if (g[j] === 'x') for (let a = 0; a < s; a++) for (let b = 0; b < s; b++) { const X = x0 + (ci * 4 + j % 3) * s + a, Y = y0 + ((j / 3) | 0) * s + b; if (ok(X, Y) && clip(X, Y)) { em[Y * W + X] = 1; set(X, Y, cfg.emblem.pal.m, 2); } } });
            for (let i = 0; i < W * H; i++) if (em[i]) { const x = i % W; if (!em[i - W] || !em[i - 1]) set(x, (i / W) | 0, cfg.emblem.pal.l, 2); else if (!em[i + W] || !em[i + 1]) set(x, (i / W) | 0, cfg.emblem.pal.d, 2); }
          }
        } else em = paintFn(cfg.emblem.fn, cfg.emblem.cx, cfg.emblem.cy, cfg.emblem.w, cfg.emblem.h, cfg.emblem.pal, clip);
        // drop shadow into the field
        if (em) for (let y = 1; y < H; y++) for (let x = 1; x < W; x++) { const i = y * W + x; if (!em[i] && em[i - W - 1] && clip(x, y)) set(x, y, sh(C[i] || fb, -0.35), K[i]); }
      }
      return { mask, d };
    }

    // ---- side plates
    const [ssw, ssh] = SIDE[L.sideSize];
    const sidesBox = boxFor(L.sideShape === 'oval' ? 'shield' : L.sideShape, ssw, ssh);
    if (L.sideShape === 'oval') { sidesBox[0] = Math.max(6, ssw - 2); sidesBox[1] = ssh + 2; }
    const sideSpots = [];
    for (let i = 0; i < L.sideCount; i++) {
      const gap = { tight: 1, normal: 3, wide: 6 }[L.sideSpacing]; const off = pw / 2 + 1 + gap + sidesBox[0] / 2 + i * (sidesBox[0] + gap);
      sideSpots.push(CX + off, CX - off);
    }
    sideSpots.forEach((sx, n) => {
      const sy = sc(sx - 0.5) + 0.5 - 0.5;
      const idx = Math.floor(n / 2);
      let se = L.sideEmblem, fn = null, txt = null;
      if (se === 'match') { if (L.emblem === 'monogram') txt = L.monogram; else if (L.emblem !== 'none') fn = EMB[L.emblem]; }
      else if (se === 'star') fn = EMB.star;
      else if (se === 'gem') fn = EMB.sgem;
      else if (se === 'letter') txt = (L.monogram || 'A')[0];
      else if (se === 'number') txt = String(idx + 1);
      else if (se !== 'none') fn = EMB[se];
      const sPal = Object.assign({ m: L.sideField === 'enamel' ? T : EMC === M && L.sideField === 'metal' ? M : EMC, l: '', d: '' }, gemPal(L.gemColor));
      sPal.l = sh(sPal.m, hl); sPal.d = sh(sPal.m, -0.32);
      if (se === 'stripes') { sPal.g = L.sideColor; sPal.m = T; }
      const inner = Math.max(4, sidesBox[0] - 4);
      const P = plate(sx, sy, sidesBox[0], sidesBox[1], {
        shape: L.sideShape === 'oval' ? 'oval' : L.sideShape, rimW: L.sideRim === 'none' ? 0 : L.sideRim === 'plain' ? 1 : 2, rim: L.sideRim === 'none' ? 'plain' : L.sideRim, metal: M, metal2: T, field: L.sideField, fieldColor: L.sideColor, engrave: 'plain',
        emblem: fn || txt ? { fn, text: txt, cx: sx, cy: sy, w: se === 'stripes' ? sidesBox[0] : inner, h: se === 'stripes' ? sidesBox[1] : Math.max(4, sidesBox[1] - 4), pal: sPal } : null
      });
      sideEdge(sx, sy, P.mask);
    });

    // ---- topper (mostly behind the plate)
    const tp = L.topper;
    const topPal = Object.assign({}, MM, gemPal(L.gemColor));
    const topAt = (() => { for (let y = 0; y < H; y++) if (SHAPES[shape](0.02, (y + 0.5 - CY) / (ph / 2))) return y; return Math.round(plateTop); })();
    let topMask = null;
    if (tp === 'crown') topMask = paintFn(EMB.crown, CX, topAt - 3, 20, 12, topPal);
    if (tp === 'eagle') topMask = paintFn(EMB.eagle, CX, topAt - 3, 30, 15, topPal);
    if (tp === 'star') topMask = paintFn(EMB.star, CX, topAt - 4, 18, 16, topPal);
    if (tp === 'orb') { topMask = paintFn(TOP.orb, CX, topAt - 4, 10, 12, topPal); gem(CX, topAt - 6, 1.6, L.gemColor); }
    if (tp === 'gem') { gem(CX, topAt - 3, 3.6, L.gemColor, TT.d); }
    if (tp === 'wings') topMask = paintFn(TOP.wings, CX, CY - ph * 0.12, pw * 1.75, ph * 0.95, topPal);
    if (tp === 'horns') topMask = paintFn(TOP.horns, CX, CY - ph * 0.42, pw * 1.35, ph * 0.9, topPal);
    if (tp === 'spikes') topMask = paintFn(TOP.spikes, CX, topAt - 3, pw * 0.95, 22, topPal);
    if (tp === 'flame') topMask = paintFn(TOP.flame, CX, CY - ph * 0.35, pw * 1.25, ph * 0.75, Object.assign({}, topPal, { g: sh(L.gemColor, 0.1) }));
    if (tp === 'fan') topMask = paintFn(TOP.fan, CX, CY, pw * 1.28, ph * 1.24, TT);
    if (tp === 'butterfly') topMask = paintFn(TOP.butterfly, CX, CY - 1, pw * 1.9, ph * 1.12, Object.assign({}, topPal, { l: TT.l }));
    if (tp === 'halo') topMask = paintFn(TOP.halo, CX, CY, Math.max(pw, ph) * 1.22, ph * 1.22, TT);
    if (tp === 'rays') topMask = paintFn(TOP.rays, CX, CY, pw * 1.6, ph * 1.4, TT);
    if (tp === 'wreath') topMask = paintFn(TOP.wreath, CX, CY + 1, pw * 1.32, ph * 1.24, Object.assign({}, MM, { m: sh(T, -0.05) }));

    // ---- banners geometry (needed for emblem space)
    const BH = 9;
    const bannerBox = (pos, style, str) => {
      if (style === 'none') return null;
      const tw = str.length ? str.length * 4 - 1 : 0;
      const bw = Math.max(Math.round((tw + 8) / 2) * 2, 20);
      const y0 = pos === 'top' ? Math.round(plateTop) + Math.max(1, rimW - 1) : Math.round(plateBot) - Math.max(1, rimW - 1) - BH;
      return { pos, style, str, tw, bw, y0 };
    };
    const tb = bannerBox('top', L.topBanner, L.topText), bb = bannerBox('bottom', L.bottomBanner, L.bottomText);

    // ---- centre plate with emblem
    let eTop = plateTop + rimW + 2, eBot = plateBot - rimW - 2;
    if (tb) eTop = tb.y0 + BH + 1 + (tb.style === 'arch' ? 2 : 0);
    if (bb) eBot = bb.y0 - 1 - (bb.style === 'arch' ? 2 : 0);
    const ehMax = Math.max(6, eBot - eTop);
    const eh = Math.round(Math.min(ehMax, ph * 0.62) / 2) * 2, ew = Math.round(Math.min(pw * 0.6, eh * 1.25) / 2) * 2;
    const ecy = (eTop + eBot) / 2;
    const emblem = L.emblem === 'none' ? null : L.emblem === 'monogram' ? { text: L.monogram, cx: CX, cy: ecy, w: ew, h: eh, pal: emPal } : { fn: EMB[L.emblem], cx: CX, cy: Math.round(ecy), w: ew, h: eh, pal: emPal };
    const P = plate(CX, CY, pw, ph, { shape, rimW, rim: L.rim, metal: M, metal2: T, field: L.field, fieldColor: L.fieldColor, engrave: L.engrave, emblem, gem1: L.gemColor, gem2: L.gemColor2 });
    sideEdge(CX, CY, P.mask);
    if (topMask && ['crown', 'eagle', 'star', 'orb'].includes(tp)) { /* outline between topper and plate already applied */ }

    // ---- gems
    const gr = { small: 1, medium: 1.6, large: 2.6 }[L.gemSize];
    const boundary = th => {
      const cu = Math.cos(th), cv = Math.sin(th); let last = 0;
      for (let t = 0; t <= 1.6; t += 0.01) { if (SHAPES[shape](cu * t, cv * t)) last = t; }
      const bx = CX + cu * last * pw / 2, by = CY + cv * last * ph / 2;
      const len = Math.hypot(bx - CX, by - CY) || 1, pull = rimW ? rimW / 2 + 0.2 : gr + 1.5;
      return [bx - (bx - CX) / len * pull, by - (by - CY) / len * pull];
    };
    const gemAt = (deg, i) => {
      const [x, y] = boundary(deg * Math.PI / 180);
      const col = i % 2 ? L.gemColor2 : L.gemColor;
      const gx = Math.round(x), gy = Math.round(y);
      gem(gx, gy, gr, col, TT.dd); if (Math.abs(gx - CX) > 0.1) gem(2 * CX - gx, gy, gr, col, TT.dd);
    };
    const g = L.gems;
    if (g === 'ring') { const per = (pw + ph) * 1.55, N = Math.max(8, Math.round(per / (gr * 2 + 5) / 2) * 2); for (let k = 0; k <= N / 2; k++) gemAt(-90 + k * 360 / N, k); }
    if (g === 'top') [-90, -62, -34].forEach(gemAt);
    if (g === 'bottom') [90, 62, 34].forEach(gemAt);
    if (g === 'corners') [-45, 45].forEach(gemAt);
    if (g === 'cross') [-90, 0, 90].forEach(gemAt);
    if (g === 'sides') [-14, 14].forEach(gemAt);
    if (g === 'scatter') { const rr = rng('s' + L.shape + L.size); let n = 0; for (let t = 0; t < 60 && n < 5; t++) { const u = 0.15 + rr() * 0.7, v = -0.75 + rr() * 1.5; const x = Math.round(CX + u * pw / 2), y = Math.round(CY + v * ph / 2); if (P.mask[y * W + x] && P.d[y * W + x] > rimW + gr + 1) { gem(x, y, gr, n % 2 ? L.gemColor2 : L.gemColor, TT.dd); gem(2 * CX - x, y, gr, n % 2 ? L.gemColor2 : L.gemColor, TT.dd); n++; } } }
    if (g === 'center') gem(CX, Math.round(emblem ? ecy : CY), Math.max(gr + 1, 2.6), L.gemColor, TT.dd);

    // ---- banners
    const BN = L.bannerColor, BNL = sh(BN, 0.22), BND = sh(BN, -0.3), BNDD = sh(BN, -0.5);
    function drawBanner(b) {
      if (!b) return;
      const x0 = CX - b.bw / 2, x1 = CX + b.bw / 2 - 1;
      const k = b.style === 'arch' ? 3 : 0, sgn = b.pos === 'top' ? 1 : -1;
      const off = x => Math.round(k * ((x + 0.5 - CX) / (b.bw / 2)) ** 2) * sgn;
      if (b.style === 'ribbon' || b.style === 'arch') {
        // tails behind
        for (const side of [-1, 1]) for (let i = 0; i < 6; i++) {
          const x = side < 0 ? x0 - 1 - i : x1 + 1 + i, yo = b.y0 + 2 + off(side < 0 ? x0 : x1) + (k ? sgn : 0);
          for (let j = 0; j < BH - 1; j++) { if (i >= 4 && Math.abs(j - (BH - 2) / 2) < (i - 3)) continue; set(x, yo + j, j === 0 ? BND : BNDD, 5); }
        }
      }
      for (let x = x0; x <= x1; x++) for (let j = 0; j < BH; j++) {
        let c = j === 0 ? BNL : j === BH - 1 ? BND : BN;
        if (b.style === 'bar' && (j === 0 || j === BH - 1 || x === x0 || x === x1)) c = j === 0 ? TT.l : j === BH - 1 ? TT.d : TT.m;
        set(x, b.y0 + j + off(x), c, b.style === 'bar' && (j === 0 || j === BH - 1 || x === x0 || x === x1) ? 2 : 5);
      }
      if (b.tw) {
        const tx = CX - Math.ceil(b.tw / 2);
        text(b.str, tx, b.y0 + 2, L.textColor, i => off(tx + i * 4 + 1));
      }
    }
    drawBanner(tb); drawBanner(bb);

    // ---- glint on metal
    if (!matte) for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x; if (K[i] !== 2 || !P.mask[i]) continue;
      const s = (x + 0.5 - CX) / (pw / 2) + (y + 0.5 - CY) / (ph / 2);
      if ((s > -1.05 && s < -0.88) || (s > -0.72 && s < -0.66)) C[i] = sh(C[i], 0.3);
    }

    // ---- wear
    if (L.wear !== 'new') {
      const p = L.wear === 'worn' ? 0.06 : 0.16;
      for (let i = 0; i < W * H; i++) {
        if (!C[i] || C[i] === OUTLINE) continue;
        const x = i % W, y = (i / W) | 0, h = hash(x, y, 77);
        if (K[i] === 2 || K[i] === 5) { if (h < p) C[i] = sh(C[i], -0.22); else if (h < p * 1.25) C[i] = mix(C[i], '#6b5a3a', 0.35); }
        if (K[i] === 3 && h < p * 0.6) C[i] = sh(C[i], 0.18);
        if (K[i] === 1 && h < p * 0.7) C[i] = sh(C[i], lum(C[i]) > 0.7 ? -0.12 : 0.14);
        if (L.wear === 'battered' && K[i] === 1 && (x * 7 + y * 3) % 23 === 0 && hash(x, 0, 3) < 0.3) C[i] = sh(C[i], -0.35);
      }
    }

    // ---- outline
    const out = C.slice();
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (C[y * W + x]) continue;
      if (get(x - 1, y) || get(x + 1, y) || get(x, y - 1) || get(x, y + 1)) out[y * W + x] = OUTLINE;
    }
    // ---- sparkles (after outline so they float)
    if (L.shine === 'dazzling') {
      const sp = (x, y, s) => { x = Math.round(x); y = Math.round(y); if (!ok(x, y)) return; out[y * W + x] = '#ffffff'; for (let t = 1; t <= s; t++) [[t, 0], [-t, 0], [0, t], [0, -t]].forEach(([a, b]) => { if (ok(x + a, y + b)) out[(y + b) * W + x + a] = t === s ? sh(M, 0.6) : '#fffbe8'; }); };
      sp(CX + pw * 0.3, CY - ph * 0.32, 2); sp(CX - pw * 0.36, CY - ph * 0.08, 1);
      if (sideSpots.length) sp(sideSpots[0] + 2, sc(sideSpots[0]) - 3, 1);
    }

    if (!withBg) return { w: W, h: H, ox: 0, px: out };

    // ---- display backdrop
    const res = new Array(W * H).fill(null);
    const b = L.bgColor, bD = sh(b, -0.22), bL = sh(b, 0.14), bLL = sh(b, 0.35);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let c = b;
      if (L.bg === 'velvet') { const f = Math.sin(x * 0.45) + Math.sin(x * 0.17 + 1); c = f > 1.1 ? bL : f < -1.1 ? bD : b; if (y > H - 7) c = y === H - 7 ? bLL : bD; }
      if (L.bg === 'spotlight') { const d = Math.hypot((x - CX) * 0.42, y - CY); c = d < 24 ? bL : d < 30 && (x + y) % 2 ? bL : bD; }
      if (L.bg === 'case') { const wood = '#5a3a22'; if (x < 4 || x > W - 5 || y < 4 || y > H - 5) c = (x + y) % 7 === 0 ? '#4a2e1a' : wood; else if (x === 4 || y === 4) c = '#2e1d10'; else { c = b; const s = (x + y * 2) % 80; if (s > 8 && s < 12 || s === 15) c = bLL; } }
      if (L.bg === 'ring') { c = y < 18 ? bD : '#e7e3ec'; if (y === 5 || y === 10 || y === 15) c = bLL; if (y === 6 || y === 11 || y === 16) c = bL; if (y >= 18 && (x + y * 3) % 31 === 0) c = '#c3bdcc'; if (y === 18) c = '#c3bdcc'; }
      if (L.bg === 'stripes') c = ((x + y) >> 3) % 2 ? bD : b;
      res[y * W + x] = c;
    }
    for (let i = 0; i < W * H; i++) if (out[i]) res[i] = out[i];
    return { w: W, h: H, ox: 0, px: res };
  }

  const CROPS = { plate: [CX - 40, 0, 80, H], strap: [0, 16, 64, 36], full: [0, 0, W, H] };
  function cropBox(crop, P) {
    if (CROPS[crop]) return CROPS[crop].slice();
    if (Array.isArray(crop) && crop.length === 4) return crop.map(v => v | 0);
    return [0, 0, P.w, P.h];
  }
  function paint(canvas, P, opt) {
    const sc = Math.max(1, opt.scale | 0 || 4);
    const [cx, cy, cw, ch] = cropBox(opt.crop, P);
    canvas.width = cw * sc; canvas.height = ch * sc;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
      const X = x + cx, Y = y + cy;
      const c = X >= 0 && X < P.w && Y >= 0 && Y < P.h ? P.px[Y * P.w + X] : null;
      if (c) { ctx.fillStyle = c; ctx.fillRect(x * sc, y * sc, sc, sc); }
    }
    return canvas;
  }
  function draw(canvas, look, opt) { opt = opt || {}; return paint(canvas, pixels(look, opt), opt); }

  const cache = new Map();
  const remember = (key, make) => {
    if (cache.has(key)) return cache.get(key);
    const url = make();
    if (cache.size > 400) cache.delete(cache.keys().next().value);
    cache.set(key, url); return url;
  };
  function toDataURL(look, opt) {
    opt = opt || {};
    return remember(JSON.stringify(['b', normalize(look), opt]), () => draw(document.createElement('canvas'), look, opt).toDataURL('image/png'));
  }
  function img(look, opt) {
    opt = opt || {};
    const c = CROPS[opt.crop] || (Array.isArray(opt.crop) ? opt.crop : [0, 0, W, H]);
    const size = opt.size | 0 || 176, h = Math.round(size * c[3] / c[2]);
    return '<img class="bl-img" src="' + toDataURL(look, Object.assign({ scale: 1 }, opt, { size: undefined })) + '" width="' + size + '" height="' + h + '" alt="" style="image-rendering:pixelated">';
  }

  // ---- a WrestlerLook wrestler wearing or carrying the belt
  const MINI = { small: [8, 6], medium: [10, 7], large: [10, 8], huge: [12, 9] };
  function wornPixels(wLook, bLook, opt) {
    opt = opt || {};
    const WLk = root.WrestlerLook;
    if (!WLk) throw new Error('BeltLook.worn needs wrestler-look.js loaded first');
    const B = normalize(bLook);
    const wl = WLk.normalize(wLook);
    const base = Object.assign({}, wl, { extra: ['belt', 'waistbelt', 'medal'].includes(wl.extra) ? 'none' : wl.extra });
    const raw = WLk.pixels(base, { bg: false });
    const P = opt.bg === false ? raw : WLk.pixels(base, { bg: true, wide: !!opt.wide });
    const SW = raw.w, SH = raw.h, ox = P.ox || 0, OW = P.w;
    const px = P.px.slice();
    const isBody = (x, y) => x >= 0 && x < SW && y >= 0 && y < SH && raw.px[y * SW + x] && raw.px[y * SW + x] !== OUTLINE;
    const okO = (x, y) => x + ox >= 0 && x + ox < OW && y >= 0 && y < SH;
    const put = (x, y, c) => { if (okO(x, y)) px[y * OW + x + ox] = c; };
    const hl = B.shine === 'matte' ? 0.18 : 0.4;
    const S = B.strapColor, M = B.metal, T = B.metal2;
    const strapCol = r => B.strapEdge === 'metal' && r !== 1 ? (r ? sh(T, -0.25) : sh(T, hl)) : r === 0 ? sh(S, lum(S) > 0.8 ? -0.06 : 0.14) : r === 2 ? sh(S, -0.25) : (B.strapTexture === 'striped' ? B.strap2 : S);
    const [mw, mh] = MINI[B.size];
    function miniPlate(cx, cy) {
      const f = SHAPES[B.shape], mask = new Set();
      const x0 = Math.floor(cx - mw / 2) - 1, y0 = Math.floor(cy - mh / 2) - 1;
      for (let y = y0; y <= cy + mh / 2 + 1; y++) for (let x = x0; x <= cx + mw / 2 + 1; x++) if (f((x + 0.5 - cx) / (mw / 2), (y + 0.5 - cy) / (mh / 2))) mask.add(x + ',' + y);
      const has = (x, y) => mask.has(x + ',' + y);
      const fieldC = B.field === 'metal' ? M : B.fieldColor;
      const EMC = B.emblemFinish === 'metal' ? M : B.emblemFinish === 'trim' ? T : B.emblemColor;
      // topper hint
      if (['crown', 'eagle', 'star', 'orb', 'gem', 'spikes'].includes(B.topper)) { let ty = 99; mask.forEach(k => { const [x, y] = k.split(',').map(Number); if (Math.abs(x + 0.5 - cx) < 1 && y < ty) ty = y; }); const tc = B.topper === 'gem' ? B.gemColor : M; put(Math.floor(cx) - 1, ty - 1, tc); put(Math.floor(cx), ty - 1, tc); if (B.topper === 'crown' || B.topper === 'eagle') { put(Math.floor(cx) - 2, ty - 1, tc); put(Math.floor(cx) + 1, ty - 1, tc); put(Math.floor(cx) - 2, ty - 2, tc); put(Math.floor(cx) + 1, ty - 2, tc); } }
      if (B.topper === 'wings') for (let i = 1; i <= 3; i++) { put(Math.floor(cx - mw / 2) - i, Math.floor(cy) - i, M); put(Math.ceil(cx + mw / 2) - 1 + i, Math.floor(cy) - i, M); put(Math.floor(cx - mw / 2) - i, Math.floor(cy) - i + 1, sh(M, -0.3)); put(Math.ceil(cx + mw / 2) - 1 + i, Math.floor(cy) - i + 1, sh(M, -0.3)); }
      mask.forEach(k => {
        const [x, y] = k.split(',').map(Number);
        const edge = !has(x - 1, y) || !has(x + 1, y) || !has(x, y - 1) || !has(x, y + 1);
        let c = edge && B.rim !== 'none' ? T : fieldC;
        if (edge && (!has(x - 1, y) || !has(x, y - 1))) c = sh(c, hl);
        else if (edge && (!has(x + 1, y) || !has(x, y + 1))) c = sh(c, -0.3);
        put(x, y, c);
      });
      const ex = Math.floor(cx), ey = Math.floor(cy);
      if (B.emblem !== 'none') { put(ex - 1, ey - 1, sh(EMC, hl)); put(ex, ey - 1, EMC); put(ex - 1, ey, EMC); put(ex, ey, sh(EMC, -0.3)); }
      if (B.gems === 'center') { put(ex - 1, ey - 1, sh(B.gemColor, 0.4)); put(ex, ey - 1, B.gemColor); put(ex - 1, ey, B.gemColor); put(ex, ey, sh(B.gemColor, -0.3)); }
      else if (B.gems !== 'none' && mw >= 8) { put(Math.floor(cx - mw / 2) + 1, ey, B.gemColor); put(Math.ceil(cx + mw / 2) - 2, ey, B.gemColor2); }
      if (B.bottomBanner !== 'none' && mh >= 8) for (let x = Math.floor(cx - mw / 2) + 2; x < cx + mw / 2 - 2; x++) put(x, ey + 2, B.bannerColor);
      // outline ring
      const ring = new Set();
      mask.forEach(k => { const [x, y] = k.split(',').map(Number); [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([a, b]) => { if (!has(x + a, y + b)) ring.add((x + a) + ',' + (y + b)); }); });
      ring.forEach(k => { const [x, y] = k.split(',').map(Number); put(x, y, OUTLINE); });
    }
    const sideDot = (x, y) => { put(x, y, sh(M, hl)); put(x + 1, y, M); put(x, y + 1, M); put(x + 1, y + 1, sh(M, -0.3)); };
    const mode = opt.mode || 'waist';
    if (mode === 'waist') {
      const WY = 42;
      let l = 15, r = 16;
      while (l > 4 && isBody(l - 1, WY + 1)) l--;
      while (r < SW - 5 && isBody(r + 1, WY + 1)) r++;
      for (let y = WY; y < WY + 3; y++) for (let x = l; x <= r; x++) put(x, y, strapCol(y - WY));
      for (let i = 0; i < Math.min(B.sideCount, 2); i++) { const o = mw / 2 + 1 + i * 3; const xr = Math.round(16 + o), xl = Math.round(16 - o) - 2; if (xr + 1 <= r) sideDot(xr, WY); if (xl >= l) sideDot(xl, WY); }
      miniPlate(16, WY + 1.5);
    } else if (mode === 'shoulder') {
      for (let t = 0; t < 19; t++) for (let k = 0; k < 3; k++) { const x = 7 + t + k, y = 24 + t; if (isBody(x, y)) put(x, y, strapCol(k)); }
      if (B.sideCount) { sideDot(10, 26); sideDot(21, 38); }
      miniPlate(16, 32.5);
    } else {
      const HY = 47;
      let xr = SW - 1; while (xr > 16 && !isBody(xr, HY)) xr--;
      const hx = xr - 1;
      const pcx = opt.wide ? hx + 1 : Math.min(hx + 1, SW - mw / 2 - 1);
      for (let y = HY - 2; y < Math.min(SH - 6, 66); y++) for (let k = -1; k <= 1; k++) { const x = Math.round(pcx) + k; if (y >= HY - 1 && y <= HY + 1 && isBody(x, y)) continue; put(x, y, strapCol(k + 1)); }
      if (B.sideCount) sideDot(Math.round(pcx) - 1, 62);
      miniPlate(pcx, 55.5);
    }
    return { w: OW, h: SH, ox, px };
  }
  function drawWorn(canvas, wLook, bLook, opt) { opt = opt || {}; const P = wornPixels(wLook, bLook, opt); const WLk = root.WrestlerLook; const c = WLk && WLk.CROPS && WLk.CROPS[opt.crop]; return paint(canvas, P, Object.assign({}, opt, { crop: c ? [c[0] + P.ox, c[1], c[2], c[3]] : opt.crop })); }
  function wornDataURL(wLook, bLook, opt) {
    opt = opt || {};
    const WLk = root.WrestlerLook;
    return remember(JSON.stringify(['w', WLk ? WLk.normalize(wLook) : wLook, normalize(bLook), opt]), () => drawWorn(document.createElement('canvas'), wLook, bLook, opt).toDataURL('image/png'));
  }
  function wornImg(wLook, bLook, opt) {
    opt = opt || {};
    const WLk = root.WrestlerLook;
    const cr = (WLk && WLk.CROPS && WLk.CROPS[opt.crop]) || (Array.isArray(opt.crop) ? opt.crop : [0, 0, opt.wide ? (WLk ? WLk.BW : 48) : (WLk ? WLk.W : 32), WLk ? WLk.H : 76]);
    const size = opt.size | 0 || 64, h = Math.round(size * cr[3] / cr[2]);
    return '<img class="bl-img" src="' + wornDataURL(wLook, bLook, Object.assign({ scale: 1 }, opt, { size: undefined })) + '" width="' + size + '" height="' + h + '" alt="" style="image-rendering:pixelated">';
  }


  // ---- templates: original designs, one per broad family of championship belt.
  // Each is a full look minus the text fields, so applying one keeps the title's lettering.
  // PARTS lists the keys of each part, so a UI can take only the plate, sides or strap of a template.
  const PARTS = {
    plate: ['shape', 'size', 'metal', 'metal2', 'rim', 'rimWidth', 'field', 'fieldColor', 'engrave', 'emblem', 'emblemFinish', 'emblemColor', 'gems', 'gemSize', 'gemColor', 'gemColor2', 'topBanner', 'bottomBanner', 'bannerColor', 'textColor', 'topper', 'shine'],
    sides: ['sideCount', 'sideShape', 'sideSize', 'sideEmblem', 'sideField', 'sideColor', 'sideRim', 'sideSpacing'],
    strap: ['strapColor', 'strapTexture', 'strapWidth', 'strapEdge', 'strap2', 'wear'],
    display: ['bg', 'bgColor']
  };
  const G = '#e8b923', GL = '#f6d67a', SV = '#c8ccd4', SVL = '#eceef3', BR = '#c27a3a', CU = '#d0703c', RG = '#e6a594', GM = '#4a4a55', ST = '#7d8a99';
  const TPL = {
    'Grand plate': { shape: 'flared', size: 'huge', metal: G, metal2: GL, rim: 'filigree', rimWidth: 'thick', engrave: 'scroll', emblem: 'globe', gems: 'ring', gemColor: '#e0182d', gemColor2: '#1f6feb', topBanner: 'bar', bottomBanner: 'bar', bannerColor: '#1b1b1f', textColor: G, sideCount: 2, sideShape: 'rectangle', sideSize: 'large', sideEmblem: 'globe', sideRim: 'beaded', strapTexture: 'croc', strapWidth: 'wide', strapEdge: 'stitch', strap2: '#d4a017', bg: 'velvet', bgColor: '#7c1f24' },
    'Spread wings': { shape: 'winged', size: 'huge', metal: G, metal2: SV, rim: 'beaded', field: 'metal', engrave: 'lines', emblem: 'eagle', emblemFinish: 'trim', gems: 'top', gemColor: '#1f6feb', topBanner: 'none', bottomBanner: 'ribbon', bannerColor: '#1d2a52', topper: 'none', sideCount: 2, sideShape: 'oval', sideEmblem: 'eagle', strapColor: '#1b1b1f', strapTexture: 'tooled', bg: 'spotlight', bgColor: '#1d2a52' },
    'Monarch butterfly': { shape: 'butterfly', size: 'huge', metal: SV, metal2: '#ff5fa2', rim: 'jeweled', rimWidth: 'normal', field: 'enamel', fieldColor: '#ff5fa2', engrave: 'dots', emblem: 'heart', emblemFinish: 'metal', gems: 'none', gemColor: '#ff4fa0', gemColor2: '#f5f7ff', topBanner: 'none', bottomBanner: 'ribbon', bannerColor: '#6a2bd9', sideCount: 2, sideShape: 'butterfly', sideField: 'enamel', sideColor: '#ff5fa2', sideEmblem: 'none', strapColor: '#f5f5f5', strapTexture: 'patent', strapEdge: 'piping', strap2: '#ff5fa2', shine: 'dazzling', bg: 'spotlight', bgColor: '#ff5fa2' },
    'Silk wings': { shape: 'oval', size: 'medium', metal: SVL, metal2: SV, rim: 'jeweled', field: 'inset', fieldColor: '#6a2bd9', engrave: 'stars', emblem: 'butterfly', emblemFinish: 'metal', gems: 'none', gemColor: '#9b30e0', gemColor2: '#f5f7ff', topper: 'butterfly', topBanner: 'none', bottomBanner: 'arch', bannerColor: '#6a2bd9', sideCount: 2, sideShape: 'oval', sideEmblem: 'gem', strapColor: '#5b2a86', strapTexture: 'suede', strapEdge: 'stitch', strap2: '#f5f5f5', shine: 'dazzling', bg: 'velvet', bgColor: '#6a2bd9' },
    'Twin stars': { shape: 'pill', size: 'large', metal: G, metal2: G, rim: 'double', field: 'enamel', fieldColor: '#1f6feb', engrave: 'plain', emblem: 'twostars', emblemFinish: 'metal', gems: 'sides', gemColor: '#f5f7ff', topBanner: 'bar', bottomBanner: 'none', bannerColor: '#d7263d', sideCount: 3, sideShape: 'round', sideSize: 'medium', sideEmblem: 'star', sideField: 'enamel', sideColor: '#d7263d', strapColor: '#1f3f9a', strapTexture: 'smooth', strapEdge: 'metal', bg: 'stripes', bgColor: '#1d2a52' },
    'Linked partners': { shape: 'hexagon', size: 'large', metal: SV, metal2: G, rim: 'studs', field: 'inset', fieldColor: '#1b1b1f', engrave: 'checker', emblem: 'ring', emblemFinish: 'trim', gems: 'corners', gemColor: '#18b35a', topBanner: 'ribbon', bottomBanner: 'ribbon', bannerColor: '#127a68', sideCount: 3, sideShape: 'hexagon', sideSize: 'small', sideEmblem: 'number', sideSpacing: 'tight', strapColor: '#1e7a4c', strapTexture: 'carbon', strapEdge: 'stitch', bg: 'ring', bgColor: '#127a68' },
    'Barbed wire': { shape: 'shield', size: 'large', metal: GM, metal2: ST, rim: 'notched', rimWidth: 'thick', field: 'metal', engrave: 'hammered', emblem: 'fist', emblemFinish: 'trim', gems: 'none', topBanner: 'none', bottomBanner: 'bar', bannerColor: '#7c1f24', topper: 'spikes', sideCount: 2, sideShape: 'octagon', sideEmblem: 'skull', strapColor: '#1b1b1f', strapTexture: 'barbed', strapEdge: 'none', wear: 'battered', shine: 'matte', bg: 'plain', bgColor: '#222226' },
    'Street brawl': { shape: 'cushion', size: 'large', metal: BR, metal2: CU, rim: 'studs', field: 'metal', engrave: 'hammered', emblem: 'fist', gems: 'none', topBanner: 'bar', bottomBanner: 'none', bannerColor: '#1b1b1f', textColor: BR, sideCount: 2, sideShape: 'rectangle', sideEmblem: 'stripes', sideColor: '#d7263d', strapColor: '#3c4752', strapTexture: 'studded', strapEdge: 'metal', wear: 'worn', bg: 'stripes', bgColor: '#222226' },
    'Cruiser bolt': { shape: 'pill', size: 'medium', metal: SV, metal2: SVL, rim: 'plain', rimWidth: 'thin', field: 'enamel', fieldColor: '#127a68', engrave: 'chevron', emblem: 'bolt', emblemFinish: 'metal', gems: 'none', topBanner: 'none', bottomBanner: 'bar', bannerColor: '#1b1b1f', topper: 'wings', sideCount: 2, sideShape: 'diamond', sideEmblem: 'bolt', sideField: 'enamel', sideColor: '#127a68', strapColor: '#1b1b1f', strapTexture: 'carbon', strapEdge: 'piping', strap2: '#00c2d1', shine: 'dazzling', bg: 'spotlight', bgColor: '#127a68' },
    'Prime time TV': { shape: 'tablet', size: 'large', metal: SV, metal2: SVL, rim: 'double', field: 'enamel', fieldColor: '#1b1b1f', engrave: 'lines', emblem: 'monogram', emblemFinish: 'trim', gems: 'corners', gemColor: '#1f6feb', topBanner: 'bar', bottomBanner: 'bar', bannerColor: '#d7263d', sideCount: 2, sideShape: 'rectangle', sideField: 'enamel', sideColor: '#1b1b1f', sideEmblem: 'letter', strapColor: '#1b1b1f', strapTexture: 'smooth', strapEdge: 'metal', bg: 'plain', bgColor: '#1e88e5' },
    'Rising sun': { shape: 'round', size: 'large', metal: G, metal2: G, rim: 'rope', field: 'enamel', fieldColor: '#f5f5f5', engrave: 'plain', emblem: 'sunrise', emblemFinish: 'metal', gems: 'none', gemColor: '#e0182d', topBanner: 'none', bottomBanner: 'ribbon', bannerColor: '#d7263d', topper: 'rays', sideCount: 2, sideShape: 'round', sideEmblem: 'sun', strapColor: '#1b1b1f', strapTexture: 'woven', strapEdge: 'stitch', strap2: '#d7263d', bg: 'plain', bgColor: '#e8e3da' },
    'Dragon gate': { shape: 'octagon', size: 'large', metal: G, metal2: '#d0703c', rim: 'double', field: 'inset', fieldColor: '#7c1f24', engrave: 'scales', emblem: 'flame', emblemFinish: 'metal', gems: 'cross', gemColor: '#ffb000', topBanner: 'arch', bottomBanner: 'none', bannerColor: '#1b1b1f', textColor: G, sideCount: 3, sideShape: 'octagon', sideSize: 'small', sideEmblem: 'sun', sideSpacing: 'tight', strapColor: '#d7263d', strapTexture: 'snake', strapEdge: 'metal', bg: 'velvet', bgColor: '#7c1f24' },
    'Sol azteca': { shape: 'stepped', size: 'huge', metal: G, metal2: '#127a68', rim: 'notched', field: 'metal', engrave: 'checker', emblem: 'calendar', emblemFinish: 'metal', gems: 'sides', gemColor: '#18b35a', topBanner: 'none', bottomBanner: 'bar', bannerColor: '#127a68', sideCount: 2, sideShape: 'compass', sideEmblem: 'calendar', strapColor: '#1e7a4c', strapTexture: 'woven', strapEdge: 'lace', strap2: '#e8b923', bg: 'velvet', bgColor: '#127a68' },
    'Máscara': { shape: 'compass', size: 'large', metal: SV, metal2: G, rim: 'beaded', field: 'enamel', fieldColor: '#1f6feb', engrave: 'rays', emblem: 'mask', emblemFinish: 'trim', emblemColor: '#f5f5f5', gems: 'ring', gemSize: 'small', gemColor: '#ffb000', topBanner: 'none', bottomBanner: 'ribbon', bannerColor: '#d7263d', topper: 'flame', sideCount: 2, sideShape: 'round', sideField: 'enamel', sideColor: '#d7263d', sideEmblem: 'mask', strapColor: '#1f3f9a', strapTexture: 'flames', strap2: '#e86a10', strapEdge: 'none', shine: 'dazzling', bg: 'stripes', bgColor: '#1e88e5' },
    'Crown jewel': { shape: 'maltese', size: 'huge', metal: G, metal2: GL, rim: 'jeweled', rimWidth: 'thick', field: 'enamel', fieldColor: '#6a2bd9', engrave: 'plain', emblem: 'crown', emblemFinish: 'metal', gems: 'none', gemColor: '#e0182d', gemColor2: '#f5f7ff', topBanner: 'none', bottomBanner: 'ribbon', bannerColor: '#6a2bd9', topper: 'halo', sideCount: 2, sideShape: 'maltese', sideEmblem: 'gem', strapColor: '#5b2a86', strapTexture: 'quilted', strap2: '#d4a017', strapEdge: 'metal', shine: 'dazzling', bg: 'case', bgColor: '#6a2bd9' },
    'Order of valor': { shape: 'shield', size: 'large', metal: SV, metal2: G, rim: 'beaded', field: 'enamel', fieldColor: '#1d2a52', engrave: 'plain', emblem: 'maltese', emblemFinish: 'trim', gems: 'none', gemColor: '#e0182d', topBanner: 'ribbon', bottomBanner: 'none', bannerColor: '#7c1f24', topper: 'wreath', sideCount: 2, sideShape: 'shield', sideField: 'enamel', sideColor: '#1d2a52', sideEmblem: 'maltese', strapColor: '#1b1b1f', strapTexture: 'tooled', strapEdge: 'stitch', strap2: '#c8ccd4', bg: 'velvet', bgColor: '#1d2a52' },
    'Old territory': { shape: 'cushion', size: 'medium', metal: SV, metal2: SV, rim: 'rope', rimWidth: 'thin', field: 'metal', engrave: 'lines', emblem: 'star', gems: 'center', gemColor: '#e0182d', topBanner: 'bar', bottomBanner: 'none', bannerColor: '#3a2a1e', textColor: SV, sideCount: 1, sideShape: 'round', sideSize: 'small', sideEmblem: 'star', strapColor: '#4a2c1c', strapTexture: 'tooled', strapWidth: 'thin', strapEdge: 'stitch', strap2: '#d4a017', wear: 'worn', shine: 'matte', bg: 'case', bgColor: '#3a2a1e' },
    'Neon nights': { shape: 'octagon', size: 'large', metal: SV, metal2: '#a8e0ec', rim: 'plain', field: 'enamel', fieldColor: '#ff5fa2', engrave: 'chevron', emblem: 'bolt', emblemFinish: 'colour', emblemColor: '#f4c20d', gems: 'ring', gemSize: 'small', gemColor: '#00c2d1', gemColor2: '#ff4fa0', topBanner: 'bar', bottomBanner: 'bar', bannerColor: '#1b1b1f', textColor: '#f4c20d', sideCount: 2, sideShape: 'diamond', sideField: 'enamel', sideColor: '#127a68', sideEmblem: 'bolt', strapColor: '#1b1b1f', strapTexture: 'leopard', strap2: '#ff5fa2', strapEdge: 'piping', shine: 'dazzling', bg: 'stripes', bgColor: '#6a2bd9' },
    'Steel works': { shape: 'rectangle', size: 'large', metal: ST, metal2: SV, rim: 'studs', field: 'inset', fieldColor: '#2a2a30', engrave: 'crosshatch', emblem: 'bolt', emblemFinish: 'trim', gems: 'corners', gemColor: '#ffb000', topBanner: 'bar', bottomBanner: 'none', bannerColor: '#2a2a30', textColor: '#f4c20d', sideCount: 2, sideShape: 'hexagon', sideEmblem: 'stripes', sideColor: '#f4c20d', sideRim: 'double', strapColor: '#3c4752', strapTexture: 'diamondplate', strapEdge: 'studs', strapWidth: 'wide', shine: 'matte', bg: 'plain', bgColor: '#222226' },
    'Olympian': { shape: 'round', size: 'medium', metal: G, metal2: G, rim: 'plain', field: 'metal', engrave: 'rings', emblem: 'laurel', gems: 'none', topBanner: 'none', bottomBanner: 'ribbon', bannerColor: '#1f6feb', topper: 'wreath', sideCount: 1, sideShape: 'round', sideEmblem: 'laurel', strapColor: '#f5f5f5', strapTexture: 'smooth', strapEdge: 'piping', strap2: '#1f3f9a', bg: 'spotlight', bgColor: '#1e88e5' },
    'Inferno': { shape: 'crest', size: 'large', metal: GM, metal2: '#e86a10', rim: 'notched', field: 'enamel', fieldColor: '#1b1b1f', engrave: 'plain', emblem: 'flame', emblemFinish: 'colour', emblemColor: '#ff7a00', gems: 'none', gemColor: '#ffb000', topper: 'flame', topBanner: 'none', bottomBanner: 'bar', bannerColor: '#d7263d', sideCount: 2, sideShape: 'shield', sideEmblem: 'flame', strapColor: '#1b1b1f', strapTexture: 'flames', strap2: '#e86a10', strapEdge: 'none', bg: 'spotlight', bgColor: '#7c1f24' },
    'World tour': { shape: 'compass', size: 'huge', metal: G, metal2: SV, rim: 'double', field: 'inset', fieldColor: '#1f6feb', engrave: 'rays', emblem: 'globe', emblemFinish: 'metal', gems: 'cross', gemColor: '#f5f7ff', topBanner: 'arch', bottomBanner: 'arch', bannerColor: '#1d2a52', sideCount: 3, sideShape: 'compass', sideSize: 'small', sideEmblem: 'globe', strapColor: '#1f3f9a', strapTexture: 'croc', strapEdge: 'stitch', strap2: '#d4a017', bg: 'velvet', bgColor: '#1d2a52' },
    'Prospect': { shape: 'round', size: 'small', metal: SV, metal2: SV, rim: 'plain', rimWidth: 'thin', field: 'enamel', fieldColor: '#d7263d', engrave: 'dots', emblem: 'star', emblemFinish: 'metal', gems: 'none', topBanner: 'none', bottomBanner: 'bar', bannerColor: '#1b1b1f', sideCount: 1, sideShape: 'round', sideSize: 'small', sideEmblem: 'dot', strapColor: '#1b1b1f', strapTexture: 'smooth', strapWidth: 'thin', strapEdge: 'none', shine: 'matte', bg: 'plain', bgColor: '#222226' },
    'Hall of legends': { shape: 'arch', size: 'large', metal: G, metal2: GL, rim: 'filigree', field: 'enamel', fieldColor: '#7c1f24', engrave: 'plain', emblem: 'trophy', emblemFinish: 'metal', gems: 'top', gemColor: '#f5f7ff', topBanner: 'none', bottomBanner: 'bar', bannerColor: '#1b1b1f', textColor: G, topper: 'star', sideCount: 2, sideShape: 'arch', sideField: 'enamel', sideColor: '#7c1f24', sideEmblem: 'star', sideRim: 'beaded', strapColor: '#4a2c1c', strapTexture: 'croc', strapEdge: 'stitch', strap2: '#d4a017', bg: 'case', bgColor: '#7c1f24' },
    'Monster heavyweight': { shape: 'pentagon', size: 'huge', metal: GM, metal2: '#d7263d', rim: 'double', rimWidth: 'thick', field: 'enamel', fieldColor: '#1b1b1f', engrave: 'scales', emblem: 'skull', emblemFinish: 'trim', gems: 'top', gemColor: '#e0182d', topper: 'horns', topBanner: 'none', bottomBanner: 'bar', bannerColor: '#7c1f24', sideCount: 2, sideShape: 'pentagon', sideEmblem: 'skull', sideField: 'enamel', sideColor: '#1b1b1f', strapColor: '#1b1b1f', strapTexture: 'snake', strapEdge: 'studs', strapWidth: 'wide', bg: 'spotlight', bgColor: '#222226' },
    'Diamond cut': { shape: 'diamond', size: 'large', metal: SVL, metal2: SV, rim: 'jeweled', field: 'inset', fieldColor: '#1d2a52', engrave: 'crosshatch', emblem: 'gem', emblemFinish: 'metal', gems: 'none', gemColor: '#00c2d1', gemColor2: '#f5f7ff', topBanner: 'none', bottomBanner: 'ribbon', bannerColor: '#1d2a52', topper: 'gem', sideCount: 3, sideShape: 'diamond', sideSize: 'small', sideEmblem: 'gem', sideSpacing: 'wide', strapColor: '#1b1b1f', strapTexture: 'patent', strapEdge: 'metal', shine: 'dazzling', bg: 'spotlight', bgColor: '#1d2a52' },
    'Rose gold': { shape: 'quatrefoil', size: 'large', metal: '#d98c7a', metal2: SVL, rim: 'beaded', field: 'metal', engrave: 'scroll', emblem: 'butterfly', emblemFinish: 'trim', gems: 'ring', gemSize: 'small', gemColor: '#f5f7ff', gemColor2: '#ff4fa0', topBanner: 'none', bottomBanner: 'arch', bannerColor: '#f5f5f5', textColor: '#1b1b1f', sideCount: 2, sideShape: 'round', sideEmblem: 'heart', strapColor: '#ff5fa2', strapTexture: 'suede', strapEdge: 'stitch', strap2: '#f5f5f5', bg: 'plain', bgColor: '#e8e3da' }
  };
  const TEMPLATES = {};
  for (const k in TPL) { const o = normalize(Object.assign(defaults(), TPL[k])); for (const t in TEXT_FIELDS) delete o[t]; TEMPLATES[k] = o; }
  // apply a template, or one part of it ('plate', 'sides', 'strap', 'display'), keeping the rest of look
  function applyTemplate(look, name, part) {
    const t = TEMPLATES[name], L = normalize(look); if (!t) return L;
    const keys = part && PARTS[part] ? PARTS[part] : Object.keys(t);
    keys.forEach(k => { if (k in t) L[k] = t[k]; });
    return normalize(L);
  }

  root.BeltLook = { W, H, CROPS, PAL, OPTIONS, TEXT_FIELDS, FONT, defaults, normalize, random, pixels, draw, toDataURL, img, wornPixels, drawWorn, wornDataURL, wornImg, mix, shade: sh, cleanText, TEMPLATES, PARTS, applyTemplate };
})(typeof window !== 'undefined' ? window : globalThis);
