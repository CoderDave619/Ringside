/* WrestlerLook: pixel-art wrestler portraits from a small appearance object.
   Vanilla JS, no dependencies. Drop this file into the game page.

   Usage:
     w.look = WrestlerLook.random();                       // new look
     w.look = WrestlerLook.normalize(saved.look);          // clean up loaded data
     const ringGear = WrestlerLook.wear(w.look, 1);        // same wrestler in outfit B
     const url = WrestlerLook.toDataURL(w.look, {scale: 4}); // PNG data URL
     WrestlerLook.draw(canvas, w.look, {scale: 8});        // draw into a canvas
     html += WrestlerLook.img(w.look, {size: 64, crop: 'head'});

   The sprite is 32 x 76 pixels, full body. Options: scale (default 4),
   bg (default true; draws a backdrop and ring mat), wide (backdrop 48 px wide,
   for cards), crop ('head', 'bust', 'legs' or [x, y, w, h]). */
(function (root) {
  'use strict';
  const W = 32, H = 76, BW = 48;

  const PAL = {
    skin: ['#ffdbc4', '#f1c09a', '#dca67a', '#c08456', '#9a6440', '#74472b', '#4f2f1d', '#3a2216'],
    hair: ['#1a1412', '#3e2718', '#6b4425', '#a46a33', '#dcb468', '#f0ebe1', '#9a9a9a', '#c9332b', '#2d6be0', '#8e3fc2', '#2fae5c', '#ff6fae'],
    eye: ['#4a2d1b', '#7a5230', '#2f6e3b', '#3a72c4', '#6e7b85', '#c08a1e'],
    gear: ['#d7263d', '#1b1b1f', '#f5f5f5', '#f4c20d', '#1f6feb', '#14a37f', '#7b2ff7', '#ff5fa2', '#ff7a00', '#00b8d9', '#8a96a3', '#6b3f26'],
    ink: ['#1f2b3d', '#262626', '#7c1f24', '#1f5a6b'],
    bg: ['#d7263d', '#1d2a52', '#127a68', '#f4c20d', '#6a2bd9', '#222226', '#ff6b00', '#1e88e5', '#e8e3da', '#ff5fa2']
  };

  const TATS = ['none', 'band', 'sleeve', 'star', 'chest', 'tribal', 'script', 'sleeves', 'neck', 'flames', 'legs', 'stomach', 'dragon', 'back', 'wrist', 'heart', 'skull', 'barbwire', 'rightsleeve'];
  const ART = ['none', 'side', 'stripes', 'pinstripe', 'flames', 'stars', 'bolt', 'checker', 'split', 'trim', 'logo', 'laces'];
  // key: [label, list of values | palette name, default]
  const OPTIONS = {
    frame: ['Frame', ['masculine', 'feminine'], 'masculine'],
    build: ['Build', ['lean', 'athletic', 'muscular', 'heavy'], 'athletic'],
    skin: ['Skin tone', 'skin', PAL.skin[2]],
    head: ['Head shape', ['oval', 'square', 'round', 'long'], 'oval'],
    eyes: ['Eyes', ['normal', 'wide', 'narrow', 'glare', 'lined', 'tired', 'scarred'], 'normal'],
    eyeColor: ['Eye colour', 'eye', PAL.eye[0]],
    brows: ['Brows', ['thick', 'thin', 'angry', 'arched', 'unibrow', 'split', 'worried', 'none'], 'thick'],
    nose: ['Nose', ['straight', 'broad', 'crooked', 'button', 'hooked', 'flat', 'bandaged'], 'straight'],
    mouth: ['Mouth', ['neutral', 'smirk', 'grin', 'snarl', 'shout', 'smile', 'frown', 'tongue', 'gap', 'lipstick'], 'neutral'],
    hair: ['Hair', ['bald', 'buzz', 'crew', 'spiky', 'mohawk', 'slick', 'long', 'mullet', 'afro', 'dreads', 'bun', 'ponytail', 'pigtails', 'pompadour', 'undercut', 'curly', 'cornrows', 'shaggy', 'bowl', 'liberty'], 'crew'],
    hairColor: ['Hair colour', 'hair', PAL.hair[1]],
    facial: ['Facial hair', ['none', 'stubble', 'mustache', 'goatee', 'horseshoe', 'full', 'chops', 'soulpatch', 'handlebar', 'braided', 'wizard', 'chinstrap'], 'none'],
    facialColor: ['Facial hair colour', 'hair', PAL.hair[1]],
    top: ['Top', ['none', 'singlet', 'crop', 'tank', 'tee', 'vest', 'jacket', 'robe', 'hoodie', 'suit', 'leather', 'flannel', 'jersey', 'leotard', 'harness', 'sash', 'trenchcoat', 'oneshoulder', 'fringe', 'rashguard', 'suspenders'], 'singlet'],
    bottoms: ['Bottoms', ['trunks', 'shorts', 'tights', 'pants', 'kilt', 'briefs', 'boardshorts', 'camo', 'flared', 'ripped', 'sweats', 'starred', 'striped', 'cargo', 'highcut', 'chaps'], 'trunks'],
    boots: ['Footwear', ['barefoot', 'boots', 'tall', 'sneakers', 'kickpads', 'laced', 'fur', 'cowboy', 'socks', 'lowcut', 'wrapped', 'platform', 'mid', 'kneehigh'], 'boots'],
    pads: ['Pads', ['none', 'knee', 'elbow', 'both', 'single', 'shin', 'full', 'brace'], 'knee'],
    wrists: ['Wrists', ['none', 'tape', 'bands', 'gloves', 'mma', 'armbands', 'sleeves', 'cuffs', 'spiked', 'handwraps'], 'none'],
    gear1: ['Top colour', 'gear', PAL.gear[0]],
    gear2: ['Trim colour', 'gear', PAL.gear[2]],
    gear3: ['Bottoms colour', 'gear', PAL.gear[0]],
    gear4: ['Boots and pads colour', 'gear', PAL.gear[1]],
    headwear: ['Headwear', ['none', 'headband', 'bandana', 'hat', 'cap', 'beanie', 'crown', 'tophat', 'horns', 'tiara', 'durag', 'headset'], 'none'],
    eyewear: ['Eyewear', ['none', 'shades', 'visor', 'eyepatch', 'glasses', 'aviators', 'goggles', 'monocle', 'starshades'], 'none'],
    extra: ['Extra', ['none', 'belt', 'chain', 'towel', 'cape', 'scarf', 'boa', 'spikes', 'bowtie', 'mic', 'medal', 'waistbelt', 'flag'], 'none'],
    mask: ['Mask', ['none', 'full', 'half', 'domino', 'open', 'hood', 'bandit', 'hockey'], 'none'],
    maskPattern: ['Mask pattern', ['plain', 'stripe', 'flames', 'star', 'wings', 'teeth', 'bolt', 'spots', 'cross', 'diamond', 'halves', 'tears', 'web'], 'plain'],
    mask1: ['Mask colour', 'gear', PAL.gear[4]],
    mask2: ['Mask trim', 'gear', PAL.gear[2]],
    paint: ['Face paint', ['none', 'eyeblack', 'band', 'stripes', 'half', 'vertical', 'raccoon', 'skull', 'tears', 'bolt', 'star', 'tribal', 'cheeks', 'jester', 'dots'], 'none'],
    paintColor: ['Paint colour', 'gear', PAL.gear[1]],
    tattoo: ['Tattoo', TATS, 'none'],
    ink: ['Ink', 'ink', PAL.ink[0]],
    tattoo2: ['Tattoo 2', TATS, 'none'],
    ink2: ['Ink 2', 'ink', PAL.ink[0]],
    tattoo3: ['Tattoo 3', TATS, 'none'],
    ink3: ['Ink 3', 'ink', PAL.ink[0]],
    bodyPaint: ['Body paint', ['none', 'tiger', 'half', 'splatter', 'bands', 'emblem', 'arms', 'legs', 'full', 'bolt', 'warrior', 'spots', 'chest'], 'none'],
    bodyColor: ['Body paint colour', 'gear', PAL.gear[4]],
    topArt: ['Top design', ART, 'none'],
    topArtColor: ['Top design colour', 'gear', PAL.gear[3]],
    botArt: ['Bottoms design', ART, 'none'],
    botArtColor: ['Bottoms design colour', 'gear', PAL.gear[3]],
    bootArt: ['Boot design', ART, 'none'],
    bootArtColor: ['Boot design colour', 'gear', PAL.gear[3]],
    padArt: ['Pad design', ART, 'none'],
    padArtColor: ['Pad design colour', 'gear', PAL.gear[3]],
    headColor: ['Headwear colour', 'gear', PAL.gear[0]],
    extraColor: ['Extra colour', 'gear', PAL.gear[2]],
    padColor: ['Pads colour', 'gear', PAL.gear[1]],
    wristColor: ['Wrist colour', 'gear', PAL.gear[2]],
    bg: ['Backdrop', ['spotlight', 'stripes', 'ropes', 'dots', 'crowd', 'checker', 'sunburst', 'cage', 'plain'], 'spotlight'],
    bgColor: ['Backdrop colour', 'bg', PAL.bg[1]]
  };

  // Ringside Owner additions (26 Nov). random() uses RO/RP, the original lists, so seeded looks don't change.
  const RO = JSON.parse(JSON.stringify(OPTIONS)), RP = JSON.parse(JSON.stringify(PAL));
  PAL.hair.push('#e05a1b', '#f6efc9', '#17b3b3', '#5a1a6b');
  PAL.eye.push('#9b30e0', '#d7263d', '#e8e8f0');
  PAL.gear.push('#c9a227', '#c8ccd4', '#7c1f24', '#1d2a52', '#8bd450', '#e8e3da', '#3c4752', '#ff3b3b');
  PAL.ink.push('#8a1c1c', '#1d5e2e', '#4b2a7a', '#5a3a1a');
  PAL.bg.push('#2a2a30', '#8bd450', '#c9a227');
  const ADD = { hair: ['sidepart', 'flattop', 'fauxhawk', 'fringe', 'topknot', 'braids', 'wavy', 'shavedside'],
    facial: ['vandyke', 'mutton', 'pencil'], eyes: ['closed', 'crazy'], mouth: ['fangs', 'guard', 'pout'],
    mask: ['gas', 'muzzle', 'jaw'], maskPattern: ['chevron', 'lace', 'sun'], headwear: ['halo', 'helmet', 'flowers'],
    eyewear: ['heartshades', 'sport'], extra: ['lei', 'dogtags'], paint: ['demon', 'mime', 'glitter'] };
  for (const k in ADD) OPTIONS[k][1].push(...ADD[k]);
  // Real-gear additions (27 Nov): pieces that famous ring gear needs.
  const ADD2 = { hair: ['balding'], bottoms: ['mawashi', 'singlet'], paint: ['crow', 'kabuki', 'facePaint'], maskPattern: ['horned', 'grin', 'eyes'],
    headwear: ['skullCap', 'cowl'], extra: ['shoulderPads', 'feathers'], top: ['longVest'] };
  for (const k in ADD2) OPTIONS[k][1].push(...ADD2[k]);
  ART.push('hearts', 'diamonds', 'tiger', 'leaf');
  const LATE_MASK = ['gas', 'muzzle', 'jaw'];

  const HEX = /^#[0-9a-f]{6}$/i;
  // Fields that belong to an outfit. A look carries three outfits (slots A, B, C);
  // the flat fields always show the active one, outfits[] keeps all three.
  const OUTFIT_KEYS = ['top', 'gear1', 'gear2', 'bottoms', 'gear3', 'boots', 'gear4', 'pads', 'wrists', 'headwear', 'eyewear', 'extra', 'mask', 'maskPattern', 'mask1', 'mask2', 'paint', 'paintColor', 'topArt', 'topArtColor', 'botArt', 'botArtColor', 'bootArt', 'bootArtColor', 'padArt', 'padArtColor', 'headColor', 'extraColor', 'padColor', 'wristColor'];
  const pickOutfit = o => { const r = {}; OUTFIT_KEYS.forEach(k => { r[k] = o[k]; }); return r; };
  const cleanField = (k, v, def) => { const vals = OPTIONS[k][1]; return Array.isArray(vals) ? (vals.includes(v) ? v : def) : (typeof v === 'string' && HEX.test(v) ? v.toLowerCase() : def); };

  function defaults() {
    const o = { v: 1, outfit: 0 };
    for (const k in OPTIONS) o[k] = OPTIONS[k][2];
    o.headColor = o.gear1; o.padColor = o.gear4; o.wristColor = o.gear2; o.extraColor = o.gear2;
    o.marks = [];
    o.outfits = [0, 1, 2].map(() => pickOutfit(o));
    return o;
  }

  function normalize(look) {
    const src = look && typeof look === 'object' ? look : {};
    const o = { v: 1, outfit: [0, 1, 2].includes(src.outfit) ? src.outfit : 0 };
    for (const k in OPTIONS) o[k] = cleanField(k, src[k], OPTIONS[k][2]);
    const follow = { headColor: 'gear1', padColor: 'gear4', wristColor: 'gear2', extraColor: 'gear2' };
    for (const k in follow) if (!(typeof src[k] === 'string' && HEX.test(src[k]))) o[k] = o[follow[k]];
    // hand-drawn skin marks: [[x, y, '#rrggbb'], ...]
    const seen = new Map();
    if (Array.isArray(src.marks)) src.marks.forEach(m => { if (Array.isArray(m) && Number.isInteger(m[0]) && Number.isInteger(m[1]) && m[0] >= 0 && m[0] < W && m[1] >= 0 && m[1] < H && typeof m[2] === 'string' && HEX.test(m[2])) seen.set(m[0] + ',' + m[1], [m[0], m[1], m[2].toLowerCase()]); });
    o.marks = [...seen.values()].slice(-1500);
    const list = Array.isArray(src.outfits) ? src.outfits : [];
    o.outfits = [0, 1, 2].map(i => {
      if (i === o.outfit) return pickOutfit(o);
      const f = list[i] && typeof list[i] === 'object' ? list[i] : {};
      const r = {}; OUTFIT_KEYS.forEach(k => { r[k] = cleanField(k, f[k], o[k]); }); return r;
    });
    return o;
  }

  // Returns the look wearing outfit slot i (0 = A, 1 = B, 2 = C).
  function wear(look, i) {
    const L = normalize(look);
    if (![0, 1, 2].includes(i) || i === L.outfit) return L;
    return normalize(Object.assign({}, L, L.outfits[i], { outfit: i }));
  }

  function rng(seed) {
    if (seed == null) return Math.random;
    let s = (typeof seed === 'number' ? seed : [...String(seed)].reduce((a, c) => a * 31 + c.charCodeAt(0) | 0, 7)) >>> 0 || 1;
    return () => { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; };
  }

  function random(seed) {
    const r = rng(seed);
    const pick = a => a[Math.floor(r() * a.length)];
    const odds = (p, vals) => r() < p ? 'none' : pick(vals.filter(v => v !== 'none'));
    const o = defaults();
    o.frame = r() < 0.35 ? 'feminine' : 'masculine';
    o.build = pick(RO.build[1]);
    o.skin = pick(RP.skin);
    o.head = pick(RO.head[1]);
    o.eyes = pick(RO.eyes[1]);
    o.eyeColor = pick(RP.eye);
    o.brows = pick(RO.brows[1]);
    o.nose = pick(RO.nose[1]);
    o.mouth = pick(RO.mouth[1]);
    o.hair = pick(RO.hair[1]);
    o.hairColor = r() < 0.75 ? pick(RP.hair.slice(0, 7)) : pick(RP.hair.slice(7));
    o.facial = o.frame === 'feminine' ? 'none' : odds(0.5, RO.facial[1]);
    if (o.frame !== 'feminine' && o.mouth === 'lipstick') o.mouth = 'neutral';
    o.facialColor = r() < 0.8 ? o.hairColor : pick(RP.hair.slice(0, 7));
    o.top = o.frame === 'feminine' ? pick(['singlet', 'crop', 'crop', 'tank', 'tee', 'vest', 'jacket', 'robe', 'leotard', 'leotard', 'oneshoulder', 'hoodie', 'leather', 'jersey', 'trenchcoat']) : pick(RO.top[1].filter(v => !['crop', 'leotard', 'oneshoulder'].includes(v)));
    o.bottoms = pick(RO.bottoms[1]);
    o.boots = pick(['barefoot', 'boots', 'boots', 'tall', 'tall', 'sneakers']);
    o.pads = pick(RO.pads[1]);
    o.wrists = odds(0.5, RO.wrists[1]);
    o.gear1 = pick(RP.gear);
    do { o.gear2 = pick(RP.gear); } while (o.gear2 === o.gear1);
    o.gear3 = r() < 0.6 ? o.gear1 : pick(RP.gear);
    o.gear4 = r() < 0.5 ? o.gear2 : pick(RP.gear);
    o.headwear = odds(0.72, RO.headwear[1]);
    if (o.headwear === 'tiara' && o.frame !== 'feminine') o.headwear = 'crown';
    o.eyewear = odds(0.82, RO.eyewear[1]);
    o.extra = odds(0.7, RO.extra[1]);
    const m = r();
    o.mask = m < 0.72 ? 'none' : m < 0.86 ? 'full' : m < 0.93 ? 'half' : 'domino';
    o.maskPattern = pick(RO.maskPattern[1]);
    o.mask1 = r() < 0.6 ? o.gear1 : pick(RP.gear);
    do { o.mask2 = pick(RP.gear); } while (o.mask2 === o.mask1);
    o.paint = o.mask === 'full' ? 'none' : odds(0.68, RO.paint[1]);
    o.paintColor = pick(RP.gear);
    o.tattoo = odds(0.55, RO.tattoo[1]);
    o.ink = pick(RP.ink);
    o.tattoo2 = o.tattoo === 'none' ? 'none' : odds(0.6, TATS); o.ink2 = r() < 0.7 ? o.ink : pick(RP.ink);
    o.tattoo3 = o.tattoo2 === 'none' ? 'none' : odds(0.7, TATS); o.ink3 = o.ink2;
    o.bodyPaint = odds(0.85, RO.bodyPaint[1]); o.bodyColor = pick(RP.gear);
    random.arts(r, o);
    o.bg = pick(RO.bg[1]);
    o.bgColor = pick(RP.bg);
    o.outfits = [pickOutfit(o)];
    for (let i = 1; i < 3; i++) {
      const alt = random.attire(r, o);
      o.outfits.push(alt);
    }
    return normalize(o);
  }

  random.arts = function (r, o) {
    const pick = a => a[Math.floor(r() * a.length)];
    ['top', 'bot', 'boot', 'pad'].forEach(p => { o[p + 'Art'] = r() < 0.6 ? 'none' : pick(ART); o[p + 'ArtColor'] = r() < 0.5 ? o.gear2 : pick(RP.gear); });
    o.headColor = r() < 0.6 ? o.gear1 : pick(RP.gear); o.padColor = r() < 0.6 ? o.gear4 : pick(RP.gear);
    o.wristColor = r() < 0.6 ? o.gear2 : pick(RP.gear); o.extraColor = r() < 0.5 ? o.gear2 : pick(RP.gear);
  };
  // A random outfit that keeps the wrestler's colours most of the time.
  random.attire = function (r, base) {
    const pick = a => a[Math.floor(r() * a.length)];
    const o = pickOutfit(base);
    o.top = pick(RO.top[1]); o.bottoms = pick(RO.bottoms[1]); o.boots = pick(RO.boots[1]);
    o.pads = pick(RO.pads[1]); o.wrists = pick(RO.wrists[1]);
    o.headwear = r() < 0.7 ? 'none' : pick(RO.headwear[1]); o.eyewear = r() < 0.8 ? 'none' : pick(RO.eyewear[1]);
    o.extra = r() < 0.6 ? 'none' : pick(RO.extra[1]);
    if (r() < 0.5) { o.gear1 = pick(RP.gear); o.gear3 = r() < 0.6 ? o.gear1 : pick(RP.gear); }
    random.arts(r, o);
    return o;
  };

  function rgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16, n >> 8 & 255, n & 255]; }
  function hex(r, g, b) { return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1); }
  function mix(a, b, t) { const x = rgb(a), y = rgb(b); return hex(...x.map((v, i) => Math.round(v + (y[i] - v) * t))); }
  function sh(h, a) { return mix(h, a < 0 ? '#000000' : '#ffffff', Math.abs(a)); }

  const BUILD = { lean: [12, 4], athletic: [13, 4], muscular: [14, 5], heavy: [14, 5] };
  const HEAD = {
    oval: [7, [12, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 12, 13, 14]],
    square: [7, [11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 12, 13]],
    round: [7, [12, 10, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 11, 12, 13, 14]],
    long: [6, [12, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 12, 12, 13, 14]]
  };
  const OUTLINE = '#17111c';

  // Returns an array of W*H colour strings (null = transparent).
  function pixels(look, opt) {
    const L = normalize(look);
    const withBg = !opt || opt.bg !== false;
    const C = new Array(W * H).fill(null);
    const head = new Uint8Array(W * H), body = new Uint8Array(W * H);
    const ok = (x, y) => x >= 0 && x < W && y >= 0 && y < H;
    const set = (x, y, c) => { if (ok(x, y)) C[y * W + x] = c; };
    const get = (x, y) => ok(x, y) ? C[y * W + x] : null;
    const rect = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) set(i, j, c); };
    const mset = (x, y, c) => { set(x, y, c); set(W - 1 - x, y, c); };
    const mrect = (x, y, w, h, c) => { rect(x, y, w, h, c); rect(W - w - x, y, w, h, c); };
    const span = (y, lx, c) => rect(lx, y, W - 2 * lx, 1, c);
    const hrect = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (ok(i, j) && head[j * W + i]) set(i, j, c); };
    const mhrect = (x, y, w, h, c) => { hrect(x, y, w, h, c); hrect(W - w - x, y, w, h, c); };
    const brect = (x, y, w, h, c) => { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (ok(i, j) && body[j * W + i]) set(i, j, c); };
    // Paints a design over the pixels a drawing step just changed (compared with snap).
    const design = (snap, pat, col, keep, whole) => {
      if (pat === 'none') return;
      const reg = [];
      for (let i = 0; i < W * H; i++) if (C[i] && C[i] !== snap[i] && !(keep || []).includes(C[i])) reg.push(i);
      if (!reg.length) return;
      const inR = new Uint8Array(W * H); reg.forEach(i => { inR[i] = 1; });
      const cMin = {}, cMax = {}, rL = {}, rR = {}, hb = [[99, -1, 99, -1], [99, -1, 99, -1]];
      let minY = 99;
      reg.forEach(i => {
        const x = i % W, y = (i / W) | 0, h = x < 16 ? 0 : 1, b = hb[h];
        cMin[x] = Math.min(cMin[x] ?? 99, y); cMax[x] = Math.max(cMax[x] ?? -1, y);
        if (h === 0) rL[y] = Math.min(rL[y] ?? 99, x); else rR[y] = Math.max(rR[y] ?? -1, x);
        b[0] = Math.min(b[0], x); b[1] = Math.max(b[1], x); b[2] = Math.min(b[2], y); b[3] = Math.max(b[3], y); minY = Math.min(minY, y);
      });
      const colD = sh(col, -0.25), paint = (x, y) => { if (ok(x, y) && inR[y * W + x]) C[y * W + x] = x === rR[y] ? colD : col; };
      if (pat === 'stars') { reg.forEach(i => { const x = i % W, y = (i / W) | 0; if ((x * 5 + y * 7) % 13 === 0) [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]].forEach(d => paint(x + d[0], y + d[1])); }); return; }
      reg.forEach(i => {
        const x = i % W, y = (i / W) | 0, b = whole ? [Math.min(hb[0][0], hb[1][0]), Math.max(hb[0][1], hb[1][1]), Math.min(hb[0][2], hb[1][2]), Math.max(hb[0][3], hb[1][3])] : hb[x < 16 ? 0 : 1], cx = Math.floor((b[0] + b[1]) / 2), cy = Math.round((b[2] + b[3]) / 2);
        const zig = Math.floor((y - minY) / 3) % 2;
        let on = false;
        if (pat === 'side') on = x === (rL[y] ?? -9) + 1 || x === (rR[y] ?? -9) - 1;
        if (pat === 'stripes') on = (y - minY) % 4 === 1;
        if (pat === 'pinstripe') on = x % 3 === 0;
        if (pat === 'flames') { const ht = cMax[x] - cMin[x] + 1; on = y > cMax[x] - Math.max(2, Math.round(ht * (0.25 + ((x * 7) % 5) / 10))); }
        if (pat === 'bolt') on = x === cx - 1 + zig || x === cx + zig;
        if (pat === 'checker') on = ((x >> 1) + (y >> 1)) % 2 === 0;
        if (pat === 'split') on = x >= 16;
        if (pat === 'trim') on = y === cMin[x] || y === cMax[x];
        if (pat === 'logo') on = Math.abs(x - (b[0] + b[1]) / 2) + Math.abs(y - cy) <= 2.6 && !(Math.abs(x - (b[0] + b[1]) / 2) < 1 && y === cy);
        if (pat === 'laces') on = x === cx - (y % 2);
        if (pat === 'hearts') { const hx = (x + 60) % 6, hy = (y - minY + 1) % 5; on = (hy === 0 && (hx === 1 || hx === 3)) || (hy === 1 && hx < 5) || (hy === 2 && hx >= 1 && hx <= 3) || (hy === 3 && hx === 2); }
        if (pat === 'diamonds') on = Math.abs((x + 60) % 4 - 1.5) + Math.abs((y - minY) % 4 - 1.5) <= 1;
        if (pat === 'tiger') on = (x * 2 + y + 60) % 6 < 2 && (x * 3 + y) % 7 !== 0;
        if (pat === 'leaf') on = Math.abs(x - cx - 0.5) + Math.abs(y - cy) * 0.7 <= 2.4 || (x === cx && y > cy && y <= cy + 3);
        if (on) paint(x, y);
      });
    };

    const sk = L.skin, skD = sh(sk, -0.18), skDD = sh(sk, -0.4), skL = sh(sk, 0.2);
    const hc = L.hairColor, hD = sh(hc, -0.32), hL = sh(hc, 0.28);
    const g1 = L.gear1, g2 = L.gear2, g1D = sh(g1, -0.25), g1L = sh(g1, 0.35);
    const fem = L.frame === 'feminine', heavy = L.build === 'heavy';
    let [s, n] = BUILD[L.build];
    if (fem) { s -= 1; n = Math.max(3, n - 1); }
    const [top, rows] = HEAD[L.head];
    const chin = top + rows.length - 1;
    const lxAt = y => rows[Math.max(0, Math.min(rows.length - 1, y - top))];
    const lx0 = Math.min(...rows);
    const armL = 16 - s + 4, ax = 16 - s - (heavy ? 1 : 0);
    const TB = 45;                                   // torso bottom row
    const hipL = Math.min(armL + 1, fem ? 9 : 11);   // hip edge
    const legL = hipL + 1;                           // outer edge of the left leg
    const mask = L.mask, fullMask = ['full', 'open', 'hood'].includes(mask), halfMask = mask === 'half' || mask === 'hockey', bandit = mask === 'bandit';
    const g3 = L.gear3, g4 = L.gear4, g3D = sh(g3, -0.25), g4D = sh(g4, -0.25), g4L = sh(g4, 0.3);

    // ---- cape or flag (behind everything)
    if (L.extra === 'cape' || L.extra === 'flag') for (let y = 23; y <= 70; y++) {
      const hw = s + 2 + Math.floor((y - 23) / 7);
      const ec = L.extraColor, c = L.extra === 'flag' ? (Math.floor((y - 23) / 4) % 2 ? g2 : ec) : (y > 66 ? sh(ec, -0.25) : ec);
      rect(16 - hw, y, 2 * hw, 1, c); mset(16 - hw, y, sh(c, -0.2));
    }

    // ---- body
    rect(16 - n, 20, 2 * n, 5, sk);
    span(25, 16 - s + (L.build === 'muscular' ? 2 : 3), sk);
    span(26, 16 - s + 1, sk);
    for (let y = 27; y <= TB; y++) span(y, 16 - s - (heavy && y > 33 ? 1 : 0), sk);
    for (let y = 33; y <= TB; y++) mset(armL, y, null);                 // gap between arm and torso
    if (fem) for (let y = 35; y <= 41; y++) mset(armL + 1, y, null);    // waist
    for (let y = 44; y <= 51; y++) span(y, hipL + (y > 49 ? 1 : 0), sk); // hips
    for (let y = 52; y <= 71; y++) mrect(legL, y, 15 - legL, 1, sk);   // legs
    mrect(legL - 1, 72, 16 - legL, 3, sk);                              // feet
    for (let y = TB + 1; y <= TB + 3; y++) mrect(ax + (y === TB + 3 ? 1 : 0), y, armL - ax - (y === TB + 3 ? 1 : 0), 1, sk); // hands
    for (let i = 0; i < W * H; i++) if (C[i]) body[i] = 1;
    rect(16 - n, chin + 1, 2 * n, 1, skD);
    for (let y = 26; y < H; y++) { let x = W - 1; while (x > 0 && !get(x, y)) x--; if (x > 15) set(x, y, skD); }
    for (let y = 30; y < 33; y++) mset(armL, y, skD);
    for (let y = 33; y <= TB; y++) set(W - 1 - armL - 1, y, skD);
    if (fem) { const pa = armL + 2; mrect(pa, 31, 15 - pa, 1, skD); mrect(pa + 1, 32, 14 - pa, 1, skD); }
    else { const pa = 16 - s + 5; mrect(pa, 31, 15 - pa, 1, skD); }
    mset(16 - n - 2, 26, skD); mset(16 - n - 3, 26, skD);
    if (heavy) rect(12, 39, 8, 1, skD);
    if (L.build === 'muscular' && !fem) for (let y = 34; y <= 40; y += 2) rect(14, y, 4, 1, skD);
    rect(15, 38, 2, 1, skD);                                            // navel
    mrect(legL, 61, 15 - legL, 1, skD);                                 // knees

    // ---- body paint (on skin, under clothes)
    const bpc = L.bodyColor, bpr = rng(bpc + 'bp');
    const bpOn = (x, y) => {
      const armX = x < armL || x > W - 1 - armL, dx = Math.abs(x - 15.5);
      switch (L.bodyPaint) {
        case 'tiger': return (dx * 1.5 + y) % 6 < 1.5 && y > 25;
        case 'half': return x < 16;
        case 'splatter': return bpr() < 0.16;
        case 'bands': return (armX && y > 27 && y <= TB + 3 || y >= 52) && y % 6 < 2;
        case 'emblem': return Math.abs(dx) + Math.abs(y - 32) <= 4.5 && !(dx + Math.abs(y - 32) <= 1.5);
        case 'arms': return armX && y >= 34;
        case 'legs': return y >= 52;
        case 'full': return true;
        case 'bolt': { const c = 18 - Math.floor((y - 26) / 3) * 1.4 + (y % 3); return y >= 26 && y <= 44 && Math.abs(x - c) < 1.2; }
        case 'warrior': return (y === 28 || y === 30) && !armX || (y === 40 || y === 42) && armX;
        case 'spots': return (x * 7 + y * 11) % 9 === 0 || (x * 7 + y * 11) % 9 === 7;
        case 'chest': return !armX && y >= 26 && y <= 33;
        default: return false;
      }
    };
    if (L.bodyPaint !== 'none') for (let y = 20; y < H; y++) for (let x = 0; x < W; x++) if (body[y * W + x] && bpOn(x, y)) set(x, y, get(x, y) === skD ? sh(bpc, -0.18) : bpc);

    // ---- tattoos (up to three, each with its own ink)
    const drawTat = (tat, ink) => {
      const onSkin = (x, y) => { if (ok(x, y) && body[y * W + x]) set(x, y, ink); };
      if (tat === 'band') for (let x = ax; x < armL; x++) { onSkin(x, 32); if ((x + 1) % 2) onSkin(x, 33); onSkin(x, 34); }
      if (tat === 'sleeve') for (let y = 27; y <= TB - 2; y++) for (let x = ax; x < armL; x++) if ((x + y) % 3) onSkin(x, y);
      if (tat === 'star') [[21, 28], [20, 29], [21, 29], [22, 29], [21, 30], [20, 31], [22, 31]].forEach(p => onSkin(p[0], p[1]));
      if (tat === 'chest') [[10, 28], [11, 28], [12, 28], [13, 29], [11, 27], [14, 29], [15, 28], [15, 29], [15, 30]].forEach(p => { onSkin(p[0], p[1]); onSkin(W - 1 - p[0], p[1]); });
      const both = (x, y) => { onSkin(x, y); onSkin(W - 1 - x, y); };
      if (tat === 'tribal') [[0, 27], [1, 27], [1, 28], [2, 28], [0, 29], [2, 29], [1, 30], [0, 31], [2, 31], [3, 28], [4, 27], [4, 29]].forEach(p => onSkin(ax + p[0], p[1]));
      if (tat === 'script') for (let x = 11; x <= 20; x++) { if (x % 3 !== 2) onSkin(x, 40); if (x % 2) onSkin(x, 41); }
      if (tat === 'sleeves') for (let y = 27; y <= TB - 2; y++) for (let x = ax; x < armL; x++) if ((x + y) % 3) both(x, y);
      if (tat === 'neck') for (let y = 21; y <= 24; y++) { both(16 - n, y); if (y % 2) both(17 - n, y); }
      if (tat === 'flames') for (let y = TB - 8; y <= TB - 2; y++) for (let x = ax; x < armL; x++) if (y > TB - 5 || (x + y) % 2 === 0) both(x, y);
      if (tat === 'legs') for (let y = 53; y <= 60; y++) for (let x = legL; x <= 14; x++) if ((x + y) % 3 === 0) both(x, y);
      if (tat === 'stomach') [[14, 35], [15, 35], [16, 35], [17, 35], [13, 36], [18, 36], [13, 37], [18, 37], [14, 38], [15, 38], [16, 38], [17, 38], [15, 36], [16, 37]].forEach(p => onSkin(p[0], p[1]));
      if (tat === 'dragon') for (let t = 0; t <= 13; t++) { const x = 9 + t, y = 28 + t + Math.round(Math.sin(t * 0.9) * 1.5); onSkin(x, y); onSkin(x, y + 1); if (t === 13) { onSkin(x + 1, y); onSkin(x + 1, y - 1); } }
      if (tat === 'back') { mrect(armL + 2, 27, 2, 1, ink); mrect(armL + 3, 28, 1, 2, ink); }
      if (tat === 'wrist') { onSkin(ax + 1, TB - 2); onSkin(ax + 2, TB - 2); onSkin(ax + 1, TB - 3); }
      if (tat === 'heart') [[19, 28], [21, 28], [18, 29], [19, 29], [20, 29], [21, 29], [22, 29], [19, 30], [20, 30], [21, 30], [20, 31]].forEach(p => onSkin(p[0], p[1]));
      if (tat === 'skull') [[ax, 30], [ax + 1, 30], [ax + 2, 30], [ax, 31], [ax + 2, 31], [ax, 32], [ax + 1, 32], [ax + 2, 32], [ax + 1, 33]].forEach(p => onSkin(p[0], p[1]));
      if (tat === 'barbwire') for (let x = ax; x < armL; x++) { both(x, 31); if (x % 2) { both(x, 30); both(x, 32); } }
      if (tat === 'rightsleeve') for (let y = 27; y <= TB - 2; y++) for (let x = ax; x < armL; x++) if ((x + y) % 3) onSkin(W - 1 - x, y);
    };
    drawTat(L.tattoo, L.ink); drawTat(L.tattoo2, L.ink2); drawTat(L.tattoo3, L.ink3);
    L.marks.forEach(([x, y, c]) => { if (body[y * W + x]) set(x, y, c); });

    // ---- bottoms
    const hipAt = y => hipL + (y > 49 ? 1 : 0);
    const hipRows = (a, b, c) => { for (let y = a; y <= b; y++) rect(hipAt(y), y, W - 2 * hipAt(y), 1, c); };
    const legRows = (a, b, c, out) => { for (let y = a; y <= b; y++) mrect(legL - (out || 0), y, 15 - legL + (out || 0), 1, c); };
    const lower = (a, b, fn) => { for (let y = a; y <= b; y++) for (let x = 0; x < W; x++) { const inside = y <= 51 ? x >= hipAt(y) && x < W - hipAt(y) : (x >= legL && x <= 14) || (x >= 17 && x <= W - 1 - legL); if (inside) set(x, y, fn(x, y)); } };
    const band = () => rect(hipL, 44, W - 2 * hipL, 1, g2);
    const BOT = {
      trunks: () => { hipRows(44, 51, g3); rect(hipL, 44, W - 2 * hipL, 1, g2); },
      shorts: () => { hipRows(44, 51, g3); legRows(52, 56, g3); legRows(56, 56, g2); rect(hipL, 44, W - 2 * hipL, 1, g2); },
      tights: () => { hipRows(44, 51, g3); legRows(52, 71, g3); for (let y = 45; y <= 71; y++) mset(y < 52 ? hipL : legL, y, g2); rect(hipL, 44, W - 2 * hipL, 1, g2); },
      pants: () => { hipRows(44, 51, g3); legRows(52, 60, g3); legRows(61, 71, g3, 1); for (let y = 52; y <= 71; y++) mset(13, y, g3D); rect(hipL, 44, W - 2 * hipL, 2, g2); },
      kilt: () => { for (let y = 44; y <= 57; y++) { const w = hipL - Math.floor((y - 44) / 5); rect(w, y, W - 2 * w, 1, (y + Math.floor((W - w) / 2)) % 4 && (y - 44) % 4 ? g3 : g3D); } rect(hipL, 44, W - 2 * hipL, 1, g2); for (let x = hipL; x < W - hipL; x += 2) set(x, 50, g2); },
      briefs: () => { hipRows(44, 49, g3); band(); },
      boardshorts: () => { hipRows(44, 51, g3); legRows(52, 54, g3); legRows(55, 58, g3, 1); for (let y = 45; y <= 58; y++) mset(y < 52 ? hipL : legL - (y > 54 ? 1 : 0), y, g2); legRows(58, 58, g3D, 1); rect(hipL, 44, W - 2 * hipL, 1, g3D); set(15, 45, g2); set(16, 45, g2); },
      camo: () => { lower(44, 71, (x, y) => (x * 7 + y * 13) % 5 < 2 ? g3D : (x * 3 + y * 5) % 7 === 0 ? sh(g3, 0.3) : g3); band(); },
      flared: () => { hipRows(44, 51, g3); legRows(52, 63, g3); legRows(64, 67, g3, 1); legRows(68, 71, g3, 2); legRows(71, 71, g2, 2); band(); },
      ripped: () => { BOT.pants(); mrect(legL + 1, 60, 2, 2, sk); mset(legL + 2, 66, sk); mset(legL, 55, sk); },
      sweats: () => { hipRows(44, 51, g3); legRows(52, 68, g3, 1); legRows(69, 71, g3D); for (let y = 52; y <= 68; y++) mset(legL - 1, y, g2); rect(hipL, 44, W - 2 * hipL, 2, g3D); set(15, 46, g2); set(16, 46, g2); },
      starred: () => { lower(44, 71, (x, y) => (x * 5 + y * 3) % 9 === 0 ? g2 : g3); band(); },
      striped: () => { lower(44, 71, (x, y) => Math.floor(y / 3) % 2 ? g2 : g3); band(); },
      cargo: () => { BOT.pants(); mrect(legL, 54, 3, 4, g3D); mrect(legL, 54, 3, 1, sh(g3, 0.2)); },
      highcut: () => { hipRows(44, 47, g3); rect(12, 48, 8, 2, g3); rect(13, 50, 6, 2, g3); band(); },
      mawashi: () => { hipRows(44, 47, g3); rect(hipL, 46, W - 2 * hipL, 1, g3D); rect(13, 48, 6, 4, g3); rect(14, 50, 4, 2, g3D); for (let x = hipL + 1; x < W - hipL; x += 2) if (x < 13 || x > 18) rect(x, 48, 1, 4 + (x % 3), g2); },
      singlet: () => { hipRows(44, 51, g3); legRows(52, 57, g3); legRows(57, 57, g2); mset(hipL, 47, g2); },
      chaps: () => { hipRows(44, 51, g2); legRows(52, 71, g3, 1); for (let y = 52; y <= 71; y++) { mrect(13, y, 2, 1, sk); if (y % 2) mset(legL - 2, y, g3D); } rect(hipL, 44, W - 2 * hipL, 1, g3D); }
    };
    const snapB = C.slice();
    BOT[L.bottoms]();
    design(snapB, L.botArt, L.botArtColor, [g2, sk]);
    for (let y = 44; y <= 71; y++) { let x = W - 1; while (x > 15 && !body[y * W + x]) x--; const c = get(x, y); if (c === g3) set(x, y, g3D); }

    // ---- footwear
    const foot = c => { mrect(legL - 1, 72, 16 - legL, 3, c); mrect(legL - 1, 75, 16 - legL, 1, '#17111c'); };
    const FW = {
      barefoot: () => 0,
      boots: () => { legRows(64, 71, g4); foot(g4); legRows(64, 64, g4L); for (let y = 66; y <= 70; y += 2) mset(13, y, g2); },
      tall: () => { legRows(55, 71, g4); foot(g4); legRows(55, 55, g4L); for (let y = 57; y <= 70; y += 2) mset(13, y, g2); },
      sneakers: () => { legRows(70, 71, g4); foot(g4); mrect(legL - 1, 74, 16 - legL, 1, '#f5f5f5'); mset(13, 72, '#f5f5f5'); },
      kickpads: () => { FW.tall(); for (let y = 52; y <= 66; y++) mrect(legL + 1, y, Math.max(2, 13 - legL), 1, y === 52 ? sh(g2, 0.3) : g2); },
      laced: () => { FW.tall(); for (let y = 56; y <= 70; y++) mset(y % 2 ? 12 : 13, y, g2); },
      fur: () => { FW.boots(); legRows(61, 63, '#efe5cf', 1); for (let y = 61; y <= 63; y++) mset(legL - 1 + (y % 2), y, '#c9bc9a'); },
      cowboy: () => { legRows(62, 71, g4); foot(g4); mrect(legL - 2, 73, 1, 2, g4); legRows(62, 62, g4L); for (let y = 64; y <= 70; y += 3) mset(12, y, g2); mrect(14, 74, 1, 1, '#3b2a1f'); },
      socks: () => { legRows(64, 71, '#f5f5f5'); legRows(65, 65, g4); legRows(67, 67, g4); mrect(legL - 1, 72, 16 - legL, 3, '#f5f5f5'); },
      lowcut: () => { legRows(71, 71, g4); foot(g4); mrect(legL - 1, 72, 16 - legL, 1, g4L); },
      wrapped: () => { legRows(66, 71, '#f2f2ee'); for (let y = 67; y <= 71; y += 2) legRows(y, y, '#d6d6d0'); mrect(legL - 1, 72, 16 - legL, 2, '#f2f2ee'); },
      platform: () => { legRows(58, 71, g4); foot(g4); legRows(58, 58, g4L); mrect(legL - 1, 74, 16 - legL, 2, g2); },
      mid: () => { legRows(60, 71, g4); foot(g4); legRows(60, 60, g4L); for (let y = 62; y <= 70; y += 2) mset(13, y, g2); },
      kneehigh: () => { legRows(52, 71, g4); foot(g4); legRows(52, 52, g4L); legRows(59, 62, g4D); legRows(60, 61, g4); for (let y = 64; y <= 70; y += 2) mset(13, y, g2); }
    };
    const snapF = C.slice();
    FW[L.boots]();
    design(snapF, L.bootArt, L.bootArtColor, [g2, '#17111c', '#f5f5f5']);

    // ---- pads & wrists
    const pd = L.pads, aw = armL - ax;
    {
    const g4 = L.padColor, g4L = sh(L.padColor, 0.3), g4D = sh(L.padColor, -0.25);
    const snapP = C.slice();
    if (['knee', 'both', 'full'].includes(pd)) { legRows(59, 62, g4); legRows(59, 59, g4L); legRows(62, 62, g4D); }
    if (['elbow', 'both', 'full'].includes(pd)) { mrect(ax, 36, aw, 2, g4); mrect(ax, 36, aw, 1, g4L); }
    if (['shin', 'full'].includes(pd)) { legRows(63, 69, g4); for (let y = 64; y <= 68; y += 2) legRows(y, y, g4D); }
    if (pd === 'single') { rect(legL, 59, 15 - legL, 4, g4); rect(legL, 59, 15 - legL, 1, g4L); }
    if (pd === 'brace') { rect(legL, 57, 15 - legL, 8, '#2a2a2e'); rect(legL, 60, 15 - legL, 2, '#8a96a3'); }
    design(snapP, L.padArt, L.padArtColor);
    }
    {
    const g2 = L.wristColor, g4 = L.wristColor, g4D = sh(L.wristColor, -0.25);
    ({
      none: () => 0,
      tape: () => { mrect(ax, TB - 1, aw, 2, '#f2f2ee'); mset(ax + 1, TB, '#d6d6d0'); },
      bands: () => mrect(ax, TB - 1, aw, 2, g2),
      gloves: () => { mrect(ax, TB + 1, aw, 2, g2); mrect(ax, TB, aw, 1, sh(g2, -0.3)); },
      mma: () => { mrect(ax, TB, aw, 4, g4); mrect(ax, TB, aw, 1, '#f5f5f5'); mrect(ax, TB + 2, aw, 1, g4D); },
      armbands: () => mrect(ax, 30, aw, 2, g2),
      sleeves: () => { for (let y = 36; y <= TB; y++) mrect(ax, y, aw, 1, y % 3 ? g2 : sh(g2, -0.15)); },
      cuffs: () => { mrect(ax, TB - 2, aw, 3, '#f2c230'); mrect(ax, TB - 2, aw, 1, '#fff1a8'); mrect(ax, TB, aw, 1, '#b8860b'); },
      spiked: () => { mrect(ax, TB - 2, aw, 3, '#1b1b1f'); mset(ax - 1, TB - 1, '#d0d0d6'); mset(ax - 1, TB - 2, '#d0d0d6'); },
      handwraps: () => { for (let y = TB - 1; y <= TB + 2; y++) mrect(ax, y, aw, 1, y % 2 ? '#f2f2ee' : '#dcdcd4'); }
    })[L.wrists]();
    }

    // ---- top
    const top_ = L.top;
    const snapT = C.slice();
    const scoop = (y, x) => (y === 25 && x >= 16 - n - 1 && x <= 15 + n + 1) || (y === 26 && x >= 16 - n && x <= 15 + n) || (y === 27 && x >= 16 - n + 1 && x <= 14 + n);
    const tl = armL + 1, tw = W - 2 * tl;
    if (top_ === 'singlet' || top_ === 'crop') {
      mrect(16 - n - 2, 25, 2, fem ? 5 : 9, g1);
      const from = fem ? 29 : 33, to = top_ === 'crop' ? 34 : 51;
      for (let y = from; y <= to; y++) { if (y > TB) rect(hipAt(y), y, W - 2 * hipAt(y), 1, g1); else brect(tl, y, tw, 1, g1); }
      brect(tl, from, tw, 1, g2);
      if (top_ === 'crop') brect(tl, 34, tw, 1, g2);
      for (let y = from + 1; y <= Math.min(to, TB); y++) set(W - 2 - armL, y, g1D);
    } else if (top_ === 'tank' || top_ === 'tee') {
      for (let y = 25; y <= TB; y++) for (let x = 0; x < W; x++) {
        if (!body[y * W + x] || scoop(y, x)) continue;
        const torso = x > armL && x < W - 1 - armL;
        if (torso || (top_ === 'tee' && y <= 31)) set(x, y, torso || y < 31 ? g1 : g2);
      }
      for (let y = 25; y < 29; y++) for (let x = 0; x < W; x++) if (body[y * W + x] && !scoop(y, x) && (scoop(y - 1, x) || scoop(y, x - 1) || scoop(y, x + 1))) set(x, y, g2);
      for (let y = 26; y <= TB; y++) set(W - 2 - armL, y, g1D);
      if (top_ === 'tee') { rect(14, 30, 4, 3, g2); rect(15, 31, 2, 1, g1); }
    } else if (top_ === 'vest' || top_ === 'jacket' || top_ === 'robe') {
      const o = top_ === 'robe' ? 3 : 2, bottom = top_ === 'robe' ? 62 : top_ === 'jacket' ? TB + 1 : TB;
      for (let y = 25; y <= bottom; y++) for (let x = 0; x < W; x++) {
        const isBody = body[y * W + x] || (top_ === 'robe' && y > TB && Math.abs(x - 15.5) < 15.5 - hipL + 2 + (y - TB) / 6);
        if (!isBody) continue;
        const open = Math.abs(x - 15.5) < o + (y > 30 ? 1 : 0) || scoop(y, x);
        const arm = y <= TB + 3 && (x <= armL || x >= W - 1 - armL);
        if (open || (top_ === 'vest' && arm) || (y > TB && arm && top_ !== 'robe')) continue;
        if (y > TB && y <= TB + 3 && arm && x < armL && x >= ax && top_ === 'robe') continue; // hands stay visible
        set(x, y, g1);
      }
      for (let y = 25; y <= bottom; y++) { const e = Math.ceil(15.5 - (o + (y > 30 ? 1 : 0))); mset(e - 1, y, g2); if (top_ === 'robe') mset(e - 2, y, g2); }
      if (top_ !== 'vest') { mrect(16 - n - 2, 23, 2, 3, g2); for (let y = 30; y < 33; y++) mset(armL, y, g1D); }
      if (top_ === 'jacket') mrect(ax, TB - 1, armL - ax, 1, g2);
      if (top_ === 'robe') { mrect(16 - n - 3, 21, 1, 4, g2); mrect(ax, TB - 1, armL - ax, 2, g2); [[8, 33], [23, 29], [10, 40], [21, 38], [9, 55], [22, 52], [12, 59]].forEach(p => set(p[0], p[1], g1L)); }
      for (let y = 26; y <= bottom; y++) { let x = W - 1; while (x > 0 && get(x, y) !== g1 && get(x, y) !== g2) x--; if (x > 15 && get(x, y) === g1) set(x, y, g1D); }
    } else if (top_ !== 'none') {
      const cover = o => {
        const to = o.to || TB;
        for (let y = o.from || 25; y <= to; y++) for (let x = 0; x < W; x++) {
          let inB = body[y * W + x];
          if (o.long && y > TB) inB = inB && !(y <= TB + 3 && (x < armL || x > W - 1 - armL)) || Math.abs(x - 15.5) < 15.5 - hipL + 2 + (y - TB) / 6;
          if (!inB) continue;
          if (!o.high && scoop(y, x)) continue;
          const arm = x <= armL || x >= W - 1 - armL;
          if (arm && y <= TB + 3 && (!o.arms || (o.arms === 'short' && y > 32) || y > TB)) continue;
          if (o.skip && o.skip(x, y)) continue;
          if (o.open && Math.abs(x - 15.5) < o.open + (y > 30 ? 1 : 0)) { if (o.inner) set(x, y, o.inner(x, y)); continue; }
          set(x, y, o.pat ? o.pat(x, y) : g1);
        }
        for (let y = 26; y <= to; y++) { let x = W - 1; while (x > 15 && get(x, y) !== g1) x--; if (x > 15) set(x, y, g1D); }
      };
      const trimScoop = () => { for (let y = 25; y < 29; y++) for (let x = 0; x < W; x++) if (body[y * W + x] && !scoop(y, x) && (scoop(y - 1, x) || scoop(y, x - 1) || scoop(y, x + 1))) set(x, y, g2); };
      const edge = o => y => Math.ceil(15.5 - (o + (y > 30 ? 1 : 0))) - 1;
      ({
        hoodie: () => { cover({arms: true, high: true}); rect(16 - n - 3, 19, 2 * n + 6, 6, g1); mrect(16 - n - 3, 19, 1, 6, g1D); for (let y = 26; y <= 29; y++) mset(14, y, g2); rect(12, 40, 8, 1, g1D); mset(12, 41, g1D); mset(12, 42, g1D); mrect(ax, TB, aw, 1, g2); },
        suit: () => { cover({arms: true, high: true, open: 1, inner: (x, y) => (x === 15 || x === 16) && y >= 26 && y <= 37 ? (y === 26 ? sh(g2, -0.25) : g2) : '#f5f5f5'}); for (let y = 25; y <= 33; y++) mset(edge(1)(y), y, g1D); set(13, 38, '#17111c'); set(13, 41, '#17111c'); mrect(ax, TB, aw, 1, '#f5f5f5'); },
        leather: () => { cover({arms: true, open: 2}); for (let y = 25; y <= TB; y++) mset(edge(2)(y), y, '#c9c9d0'); mrect(16 - n - 2, 23, 2, 3, g1D); [[ax + 1, 27], [ax, 29], [ax + 2, 29]].forEach(p => mset(p[0], p[1], '#d9d9de')); mrect(ax, TB, aw, 1, g1D); },
        flannel: () => { cover({arms: true, open: 3, pat: (x, y) => x % 4 === 0 && y % 4 === 0 ? sh(g1, -0.35) : x % 4 === 0 || y % 4 === 0 ? g2 : g1}); mrect(16 - n - 2, 24, 2, 2, g1D); },
        jersey: () => { cover({arms: 'short', pat: (x, y) => y === 37 || y === 38 ? g2 : g1}); trimScoop(); mrect(ax, 31, aw + 1, 1, g2); rect(13, 29, 1, 5, g2); set(12, 30, g2); rect(17, 29, 3, 5, g2); rect(18, 30, 1, 3, g1); },
        leotard: () => { cover({to: 51, pat: (x, y) => Math.abs(x - (y - 20)) < 1 ? g2 : g1}); trimScoop(); },
        harness: () => { for (let y = 26; y <= 42; y++) { const xl = Math.round(armL + 1 + (y - 26) * (W - 4 - 2 * armL) / 16); brect(xl, y, 2, 1, g1); brect(W - 2 - xl, y, 2, 1, g1); } rect(14, 33, 4, 2, g2); brect(0, 42, W, 1, g1); },
        sash: () => { for (let y = 25; y <= 44; y++) { const x = Math.round(armL + (y - 25) * (W - 3 - 2 * armL) / 19); brect(x, y, 3, 1, g1); brect(x, y, 1, 1, g2); } },
        trenchcoat: () => { cover({arms: true, open: 2, long: true, to: 66}); for (let y = 25; y <= 66; y++) mset(edge(2)(y), y, g1D); brect(0, 40, W, 1, g1D); rect(14, 40, 4, 1, g2); mrect(16 - n - 3, 22, 2, 4, g1); mrect(ax, TB, aw, 1, g1D); },
        oneshoulder: () => { rect(16 - n - 2, 25, 2, 5, g1); cover({from: 27, to: 51, skip: (x, y) => y < 27 + (x - tl) * 0.35}); for (let x = tl; x < W - tl; x++) { const y = Math.ceil(27 + (x - tl) * 0.35); if (body[y * W + x]) set(x, y, g2); } },
        fringe: () => { cover({arms: true, open: 2}); for (let y = 25; y <= TB; y++) mset(edge(2)(y), y, g2); brect(0, 30, W, 1, g2); for (let y = 31; y <= TB + 2; y++) if (y % 2) { mset(ax - 1, y, g2); } for (let x = tl; x < 16 - 3; x += 2) mset(x, 31, g2); mrect(ax, TB, aw, 1, g2); },
        rashguard: () => { cover({arms: true, high: true, pat: (x, y) => (x === armL + 1 || x === W - 2 - armL) ? g2 : g1}); mrect(ax, TB, aw, 1, g2); },
        longVest: () => { cover({open: 3, long: true, to: 64}); for (let y = 25; y <= 64; y++) mset(edge(3)(y), y, g2); mrect(16 - n - 3, 22, 2, 4, g1); },
        suspenders: () => { for (let y = 25; y <= TB; y++) mrect(armL + 2, y, 2, 1, g1); mrect(armL + 2, 28, 2, 1, g2); brect(0, TB - 1, W, 2, g1); }
      })[top_]();
    }
    design(snapT, L.topArt, L.topArtColor, [g2, '#f5f5f5', '#c9c9d0'], ['logo', 'leaf'].includes(L.topArt));

    // ---- extras
    {
    const g1 = L.extraColor, g2 = L.extraColor;
    if (L.extra === 'belt') {
      for (let t = 0; t < 16; t++) brect(7 + t, 25 + t, 3, 1, '#3b2a1f');
      rect(12, 30, 7, 5, '#f2c230'); rect(12, 30, 7, 1, '#fff1a8'); rect(12, 34, 7, 1, '#b8860b');
      rect(15, 31, 2, 2, '#d7263d'); set(13, 32, '#b8860b'); set(17, 32, '#b8860b');
    } else if (L.extra === 'chain') {
      [[12, 25], [12, 26], [13, 27], [14, 28]].forEach((p, i) => mset(p[0], p[1], i % 2 ? '#b8860b' : '#f2c230'));
      rect(15, 28, 2, 1, '#f2c230'); rect(15, 29, 2, 2, '#f2c230'); set(16, 30, '#b8860b');
    } else if (L.extra === 'towel') {
      mrect(16 - n - 3, 23, 3, 11, '#f5f5f5'); mrect(16 - n - 3, 30, 3, 1, g1); mrect(16 - n - 1, 23, 1, 11, '#d4d4d4');
    } else if (L.extra === 'cape' || L.extra === 'flag') {
      mrect(16 - n - 2, 22, 2, 3, L.extra === 'cape' ? g1 : g2); mset(16 - n - 2, 25, '#f2c230');
    } else if (L.extra === 'scarf') {
      rect(16 - n - 1, 22, 2 * n + 2, 3, g2); rect(17, 25, 3, 9, g2); rect(17, 27, 3, 1, L.gear2); rect(17, 30, 3, 1, L.gear2); rect(17, 33, 3, 1, sh(g2, -0.25));
    } else if (L.extra === 'boa') {
      for (let y = 24; y <= 26; y++) for (let x = 16 - n - 3; x <= 15 + n + 3; x++) set(x, y, (x + y) % 2 ? g2 : sh(g2, 0.35));
      for (let y = 27; y <= 37; y++) { mset(16 - n - 3, y, (y % 2) ? g2 : sh(g2, 0.35)); mset(16 - n - 2, y, (y % 2) ? sh(g2, 0.35) : g2); }
    } else if (L.extra === 'spikes') {
      mrect(ax, 25, aw + 2, 3, '#26262b'); mrect(ax, 25, aw + 2, 1, '#3d3d44'); [[ax, 24], [ax + 2, 24], [ax + 1, 23], [ax - 1, 26]].forEach(p => mset(p[0], p[1], '#d0d0d6'));
    } else if (L.extra === 'bowtie') {
      mrect(13, 23, 2, 3, g2); rect(15, 24, 2, 1, sh(g2, -0.25));
    } else if (L.extra === 'mic') {
      rect(W - armL, 41, 2, 6, '#2a2a2e'); rect(W - armL, 38, 3, 3, '#9aa0a8'); set(W - armL + 1, 39, '#6e747c');
    } else if (L.extra === 'medal') {
      [[13, 25], [13, 26], [14, 27], [14, 28]].forEach(p => mset(p[0], p[1], g2)); rect(15, 29, 2, 2, '#f2c230'); set(16, 30, '#b8860b');
    } else if (L.extra === 'lei') {
      const fl = ['#ff5fa2', '#f4c20d', '#ffffff'];
      for (let x = 16 - n - 2; x <= 15 + n + 2; x++) set(x, 24, fl[(x + 30) % 3]);
      [[12, 25], [13, 26], [14, 27], [15, 28]].forEach((p, i) => mset(p[0], p[1], fl[i % 3]));
    } else if (L.extra === 'dogtags') {
      [[12, 23], [13, 24], [13, 25], [14, 26], [14, 27]].forEach(p => mset(p[0], p[1], '#9aa0a8')); rect(15, 28, 2, 3, '#c8ccd4'); set(16, 29, '#9aa0a8');
    } else if (L.extra === 'shoulderPads') {
      mrect(ax - 1, 24, aw + 3, 4, g1); mrect(ax - 1, 24, aw + 3, 1, sh(g1, 0.3)); [[ax, 23], [ax + 2, 22], [ax + 1, 23]].forEach(p => mset(p[0], p[1], '#d0d0d6'));
    } else if (L.extra === 'feathers') {
      for (let y = 15; y <= 27; y++) for (let x = 0; x < W; x++) { const d = Math.abs(x - 15.5); if (y < 25 && body[y * W + x]) continue; if (d <= n + 5 - Math.max(0, 22 - y) * 0.6 && (y >= 24 || d > n)) set(x, y, (x * 3 + y) % 4 ? g1 : sh(g1, 0.4)); }
    } else if (L.extra === 'waistbelt') {
      brect(armL + 1, 42, W - 2 * (armL + 1), 3, '#3b2a1f'); rect(12, 41, 8, 5, '#f2c230'); rect(12, 41, 8, 1, '#fff1a8'); rect(12, 45, 8, 1, '#b8860b'); rect(15, 42, 2, 2, '#1f6feb');
    }

    }

    // ---- back hair
    const hair = L.hair, showBack = !(fullMask && mask !== 'open' && (hair === 'afro' || hair === 'liberty'));
    if (showBack) {
      if (hair === 'long') { rect(lx0 - 1, top, W - 2 * (lx0 - 1), 28 - top, hc); for (let y = top + 4; y < 28; y++) mset(lx0 - 1, y, hD); }
      if (hair === 'balding') { rect(lx0 - 1, 12, W - 2 * (lx0 - 1), 15, hc); mrect(lx0 - 1, 12, 1, 15, hD); for (let y = 23; y <= 26; y += 3) mset(lx0, y, hD); }
      if (hair === 'mullet') { rect(lx0 - 1, 13, W - 2 * (lx0 - 1), 13, hc); mrect(lx0 - 1, 13, 1, 13, hD); }
      if (hair === 'afro') for (let y = 0; y < 23; y++) for (let x = 0; x < W; x++) { const d = (x - 15.5) ** 2 + (y - 10.5) ** 2; if (d <= 112) set(x, y, d > 90 && (x + y) % 3 === 0 ? hD : hc); }
      if (hair === 'dreads') for (let x = lx0 - 2; x <= W - 1 - (lx0 - 2); x++) rect(x, top - 1, 1, 29 - top + (x * 7) % 3, x % 2 ? hD : hc);
      if (hair === 'ponytail') { rect(W - lx0, 12, 2, 13, hc); rect(W - lx0, 12, 2, 1, hD); set(W - lx0 + 1, 24, hD); }
      if (hair === 'pigtails') { mrect(lx0 - 3, 12, 3, 9, hc); mrect(lx0 - 3, 12, 3, 1, hD); mset(lx0 - 3, 20, hD); }
      if (hair === 'shaggy') { rect(lx0 - 1, top, W - 2 * (lx0 - 1), 21 - top, hc); mrect(lx0 - 1, 15, 1, 6, hD); }
      if (hair === 'braids') for (let y = 13; y <= 30; y++) { mset(lx0 - 2, y, y % 3 ? hc : hD); mset(lx0 - 1, y, y % 3 === 1 ? hD : hc); }
      if (hair === 'wavy') { rect(lx0 - 1, top, W - 2 * (lx0 - 1), 23 - top, hc); for (let y = top + 3; y < 23; y++) mset(lx0 - 1, y, y % 3 ? hc : hD); }
      if (hair === 'topknot') { rect(14, top - 5, 4, 4, hc); rect(15, top - 6, 2, 1, hc); rect(14, top - 1, 4, 1, hD); }
      if (hair === 'cornrows') for (let y = 14; y <= 26; y++) mset(lx0 - 1, y, y % 2 ? hc : hD);
      if (hair === 'liberty') [[6, 7], [8, 2], [12, 0], [19, 0], [23, 2], [25, 7]].forEach(([tx, ty]) => { for (let t = 0; t <= 5; t++) { const x = Math.round(tx + (15.5 - tx) * t / 7), y = Math.round(ty + (11 - ty) * t / 7); set(x, y, hc); if (t > 1) { set(x + 1, y, hc); set(x, y + 1, hc); } } });
    }

    // ---- head
    rows.forEach((lx, i) => { const y = top + i; span(y, lx, sk); for (let x = lx; x < W - lx; x++) head[y * W + x] = 1; set(W - 1 - lx, y, skD); });
    rect(lx0 - 1, 13, 1, 3, sk); set(lx0 - 1, 14, skD); rect(W - lx0, 13, 1, 3, skD);
    if (hair === 'bald' || hair === 'balding') { set(12, top + 1, skL); set(13, top + 1, skL); set(12, top + 2, skL); }

    // ---- face paint
    const pc = L.paintColor;
    ({
      eyeblack: () => mhrect(12, 15, 2, 1, pc),
      band: () => hrect(0, 13, W, 3, pc),
      stripes: () => { mhrect(8, 16, 5, 1, pc); mhrect(8, 18, 4, 1, pc); },
      half: () => hrect(0, 0, 16, H, pc),
      vertical: () => mhrect(12, 10, 2, 9, pc),
      raccoon: () => mhrect(11, 13, 4, 3, pc),
      skull: () => { hrect(0, 0, W, H, pc); mhrect(11, 13, 4, 3, '#151518'); hrect(15, 16, 2, 2, '#151518'); for (let x = 13; x <= 18; x++) hrect(x, 20, 1, 1, x % 2 ? '#151518' : pc); },
      tears: () => { mhrect(12, 15, 1, 4, pc); mhrect(12, 20, 1, 1, pc); },
      bolt: () => [[13, 9], [12, 10], [12, 11], [11, 12], [12, 12], [13, 12], [12, 13], [11, 15], [11, 16], [10, 17]].forEach(p => hrect(p[0], p[1], 1, 1, pc)),
      star: () => [[19, 11], [18, 12], [19, 12], [20, 12], [17, 13], [18, 13], [19, 13], [20, 13], [21, 13], [18, 15], [19, 15], [20, 15], [17, 16], [21, 16]].forEach(p => hrect(p[0], p[1], 1, 1, pc)),
      tribal: () => { hrect(14, chin - 2, 1, 3, pc); hrect(17, chin - 2, 1, 3, pc); [[13, 10], [14, 9], [15, 8], [16, 8], [17, 9], [18, 10]].forEach(p => hrect(p[0], p[1], 1, 1, pc)); },
      cheeks: () => mhrect(11, 16, 2, 2, pc),
      jester: () => { hrect(0, 0, 16, 16, pc); hrect(16, 16, 16, H, pc); },
      demon: () => { hrect(0, 0, W, H, pc); mhrect(11, 13, 4, 3, '#151518'); mhrect(12, top, 1, 2, '#151518'); },
      mime: () => { hrect(0, 0, W, H, '#f4f1ea'); mhrect(12, 12, 2, 1, '#151518'); hrect(12, 16, 1, 2, '#151518'); },
      glitter: () => { for (let y = 10; y <= 18; y++) for (let x = 0; x < W; x++) if ((x * 3 + y * 5) % 7 === 0) hrect(x, y, 1, 1, (x + y) % 2 ? pc : sh(pc, 0.45)); },
      crow: () => { hrect(0, 0, W, H, '#f4f1ea'); mhrect(11, 12, 4, 1, pc); mhrect(12, 13, 1, 6, pc); mhrect(13, 19, 1, chin - 18, pc); hrect(15, top, 2, 3, pc); },
      kabuki: () => { hrect(0, 0, W, H, '#f4f1ea'); mhrect(10, 12, 5, 1, pc); mhrect(11, 13, 1, 3, pc); hrect(15, top, 2, 4, '#2fae5c'); mhrect(12, 17, 2, 1, pc); hrect(14, 19, 4, 1, '#c8102e'); },
      facePaint: () => { mhrect(lxAt(10), 10, 4, 1, pc); mhrect(11, 12, 4, 4, pc); hrect(15, 9, 2, 3, pc); mhrect(12, 17, 1, 3, pc); },
      dots: () => { [[11, 16], [10, 17], [12, 17], [11, 18]].forEach(p => mhrect(p[0], p[1], 1, 1, pc)); hrect(15, 10, 2, 1, pc); },
      none: () => 0
    })[L.paint]();
    L.marks.forEach(([x, y, c]) => { if (head[y * W + x]) set(x, y, c); });

    // ---- facial hair
    const fc = L.facialColor;
    if (!fullMask) {
      const stache = () => { rect(13, 18, 6, 1, fc); set(13, 19, fc); set(18, 19, fc); };
      const FH = {
        stubble: () => { for (let y = 17; y <= chin; y++) for (let x = 0; x < W; x++) if (head[y * W + x] && (y > 17 || (x + y) % 2)) set(x, y, mix(sk, fc, 0.42)); },
        mustache: stache,
        goatee: () => { stache(); rect(14, 20, 4, chin - 19, fc); rect(15, chin + 1, 2, 1, fc); },
        horseshoe: () => { stache(); rect(13, 19, 1, chin - 18, fc); rect(18, 19, 1, chin - 18, fc); },
        full: () => { hrect(0, 16, W, chin - 15, fc); rect(12, chin + 1, 8, 1, fc); rect(13, chin + 2, 6, 1, sh(fc, -0.25)); rect(14, 18, 4, 1, sk); },
        none: () => 0,
        chops: () => { for (let y = 13; y <= 19; y++) { mset(lxAt(y), y, fc); if (y > 14) mset(lxAt(y) + 1, y, fc); } },
        soulpatch: () => rect(15, 20, 2, 2, fc),
        handlebar: () => { stache(); mset(12, 18, fc); mset(11, 17, fc); },
        braided: () => { FH.full(); rect(15, chin + 3, 2, 6, fc); rect(15, chin + 5, 2, 1, g2); rect(15, chin + 8, 2, 1, g2); },
        wizard: () => { FH.full(); rect(12, chin + 1, 8, 2, fc); rect(13, chin + 3, 6, 2, fc); rect(14, chin + 5, 4, 2, fc); rect(15, chin + 7, 2, 1, sh(fc, -0.25)); },
        vandyke: () => { stache(); rect(15, 20, 2, chin - 19, fc); rect(15, chin + 1, 2, 2, fc); set(15, chin + 3, fc); },
        mutton: () => { FH.chops(); stache(); for (let y = 17; y <= 19; y++) mset(12, y, fc); },
        pencil: () => rect(14, 18, 4, 1, fc),
        chinstrap: () => { for (let y = 15; y <= chin; y++) mset(lxAt(y), y, fc); rect(lxAt(chin), chin, W - 2 * lxAt(chin), 1, fc); }
      };
      FH[L.facial]();
    }

    // ---- mask
    if (bandit) {
      const m1 = L.mask1, m2 = L.mask2;
      hrect(0, 16, W, chin - 15, m1); rect(12, chin + 1, 8, 1, m1); rect(13, chin + 2, 6, 1, m1); rect(14, chin + 3, 4, 1, m1);
      for (let y = 16; y <= chin + 3; y++) for (let x = 0; x < W; x++) if (get(x, y) === m1 && (x + y * 2) % 5 === 0) set(x, y, m2);
      set(lx0 - 2, 17, m1); set(lx0 - 3, 18, m1); set(lx0 - 2, 19, sh(m1, -0.2));
    } else if (mask === 'hockey') {
      const m1 = L.mask1, m2 = L.mask2;
      for (let y = top + 2; y <= chin; y++) for (let x = lxAt(y) + 1; x <= W - 2 - lxAt(y); x++) set(x, y, m1);
      mrect(11, 13, 4, 3, '#17111c'); mrect(12, 14, 2, 1, sk);
      [[14, 17], [17, 17], [13, 20], [15, 20], [16, 20], [18, 20], [15, 9], [16, 9]].forEach(p => set(p[0], p[1], '#17111c'));
      mset(lxAt(12), 12, m2); mset(lxAt(16), 16, m2);
    } else if (mask !== 'none' && !LATE_MASK.includes(mask)) {
      const m1 = L.mask1, m2 = L.mask2;
      const lim = fullMask ? H : halfMask ? 18 : 16;
      const from = mask === 'domino' ? 13 : mask === 'open' ? top + 3 : 0;
      hrect(0, from, W, lim - from, m1);
      if (fullMask) { rect(lx0 - 1, 13, 1, 3, m1); rect(W - lx0, 13, 1, 3, sh(m1, -0.2)); }
      if (mask !== 'domino') {
        const pat = L.maskPattern;
        if (pat === 'stripe') hrect(15, 0, 2, 13, m2);
        if (pat === 'flames') { hrect(10, top + 4, 12, 1, m2); [[11, 3], [12, 3], [14, 3], [15, 3], [12, 2], [15, 2], [15, 1]].forEach(p => mhrect(p[0], top + p[1], 1, 1, m2)); }
        if (pat === 'star') { hrect(15, 8, 2, 1, m2); hrect(13, 9, 6, 1, m2); hrect(14, 10, 4, 1, m2); mhrect(14, 11, 1, 1, m2); }
        if (pat === 'wings') [[12, 12], [11, 12], [11, 11], [10, 11], [10, 10], [11, 10], [10, 9]].forEach(p => mhrect(p[0], p[1], 1, 1, m2));
        const each = fn => { for (let y = Math.max(from, top); y < Math.min(lim, chin + 1); y++) for (let x = 0; x < W; x++) if (head[y * W + x] && fn(x, y)) set(x, y, m2); };
        if (pat === 'teeth') { hrect(13, 17, 6, 1, '#f4f1ea'); hrect(13, 21, 6, 1, '#f4f1ea'); [13, 15, 17].forEach(x => { hrect(x, 17, 1, 1, '#17111c'); hrect(x + 1, 21, 1, 1, '#17111c'); }); }
        if (pat === 'bolt') [[12, 7], [12, 8], [11, 9], [12, 9], [13, 9], [12, 10], [11, 11], [11, 12]].forEach(p => hrect(p[0], p[1], 1, 1, m2));
        if (pat === 'spots') each((x, y) => (x * 5 + y * 3) % 7 === 0);
        if (pat === 'cross') { hrect(15, top, 2, 13 - top, m2); hrect(0, 9, W, 2, m2); }
        if (pat === 'diamond') { each((x, y) => Math.abs(x - 15.5) + Math.abs(y - 9.5) <= 3.5); hrect(15, 9, 2, 1, m1); }
        if (pat === 'halves') each(x => x >= 16);
        if (pat === 'tears') { mhrect(12, 16, 1, 4, m2); mhrect(13, 17, 1, 2, m2); }
        if (pat === 'chevron') [[11, 0], [12, 1], [13, 2], [14, 3], [15, 4]].forEach(p => mhrect(p[0], top + 2 + p[1], 1, 1, m2));
        if (pat === 'lace') for (let y = top + 1; y <= 12; y++) hrect(15 + (y % 2), y, 1, 1, m2);
        if (pat === 'sun') each((x, y) => Math.hypot(x - 15.5, y - (top + 4)) < 2.3);
        if (pat === 'horned') [[11, -1], [10, -2], [10, -3], [11, -4]].forEach(p => mset(p[0], top + p[1], p[1] === -4 ? sh(m2, -0.25) : m2));
        if (pat === 'eyes') { mhrect(10, 11, 6, 1, m2); mhrect(10, 16, 6, 1, m2); mhrect(10, 12, 1, 4, m2); }
        if (pat === 'grin') { hrect(lx0, 17, W - 2 * lx0, 4, '#17111c'); for (let x = lx0 + 1; x < W - lx0 - 1; x++) { hrect(x, 17, 1, 1, x % 2 ? '#f4f1ea' : '#d9cfa8'); hrect(x, 20, 1, 1, x % 2 ? '#d9cfa8' : '#f4f1ea'); } mhrect(lx0, 15, 1, 2, '#17111c'); }
        if (pat === 'web') each((x, y) => { const dx = Math.abs(x - 15.5), dy = Math.abs(y - 9); const r = Math.round(Math.hypot(dx, dy)); return x === 15 || x === 16 || y === 9 || Math.abs(dx - dy) < 0.6 || r === 3 || r === 6; });
        for (let y = top; y < lim; y++) { const x = W - 1 - lxAt(y); if (head[y * W + x] && y <= chin) set(x, y, sh(m1, -0.2)); }
      }
      mrect(11, 13, 4, 3, m2); mrect(12, 14, 2, 1, sk);
      if ((mask === 'full' || mask === 'open') && L.maskPattern !== 'grin') { rect(13, 18, 6, 3, m2); rect(14, 19, 4, 1, sk); }
    }

    // ---- eyes, brows, nose, mouth
    const ec = L.eyeColor, wh = '#f4f1ea', dk = '#2a1a14';
    if (L.eyes === 'narrow') mrect(12, 14, 2, 1, dk);
    else if (L.eyes === 'closed') { mrect(11, 14, 3, 1, skDD); }
    else if (L.eyes === 'crazy') { set(12, 14, wh); set(13, 14, dk); set(18, 14, dk); set(19, 14, wh); mrect(12, 13, 2, 1, wh); mset(11, 13, dk); }
    else if (L.eyes === 'glare') { mrect(12, 14, 2, 1, ec); set(13, 14, dk); set(18, 14, dk); }
    else { set(12, 14, wh); set(13, 14, ec); set(18, 14, ec); set(19, 14, wh); if (L.eyes === 'wide') mrect(12, 13, 2, 1, wh); }
    if (L.eyes === 'lined' && !fullMask) { mrect(11, 13, 3, 1, dk); mset(11, 14, dk); }
    if (L.eyes === 'tired' && !fullMask && !halfMask) { mrect(12, 13, 2, 1, skD); mrect(12, 15, 2, 1, skD); }
    if (L.eyes === 'scarred' && !fullMask) [11, 12, 13, 15, 16].forEach(y => set(12, y, '#b35a5a'));
    const bc = sh(hair === 'bald' || hair === 'balding' ? fc : hc, -0.15);
    if (!fullMask && !halfMask) ({
      thick: () => { mrect(11, 12, 3, 1, bc); mrect(12, 11, 2, 1, bc); },
      thin: () => mrect(12, 12, 2, 1, bc),
      angry: () => { mset(11, 12, bc); mset(12, 12, bc); mset(13, 13, bc); },
      arched: () => { mset(11, 12, bc); mset(12, 11, bc); mset(13, 11, bc); mset(14, 12, bc); },
      unibrow: () => { rect(11, 12, 10, 1, bc); mrect(12, 11, 2, 1, bc); },
      split: () => { mrect(11, 12, 3, 1, bc); mrect(12, 11, 2, 1, bc); mset(12, 11, sk); mset(12, 12, sk); },
      worried: () => { mset(11, 12, bc); mset(12, 12, bc); mset(13, 11, bc); },
      none: () => 0
    })[L.brows]();
    if (!fullMask && !halfMask && !bandit) ({
      straight: () => { set(16, 15, skD); set(16, 16, skD); set(15, 17, skDD); set(16, 17, skDD); },
      broad: () => { set(16, 15, skD); set(16, 16, skD); rect(14, 17, 4, 1, skD); set(14, 17, skDD); set(17, 17, skDD); },
      crooked: () => { set(15, 15, skD); set(16, 16, skD); set(17, 17, skDD); set(16, 17, skD); },
      button: () => { set(15, 17, skD); set(16, 17, skD); set(15, 16, skL); },
      hooked: () => { set(16, 15, skD); set(17, 16, skD); set(16, 17, skDD); set(15, 17, skD); },
      flat: () => { rect(14, 17, 4, 1, skD); set(15, 16, skD); set(16, 16, skD); },
      bandaged: () => { set(16, 15, skD); set(15, 17, skDD); set(16, 17, skDD); rect(14, 16, 4, 1, '#f2f2ee'); }
    })[L.nose]();
    const lip = sh(sk, -0.45);
    if (!['hood', 'bandit', 'hockey'].includes(mask) && !(fullMask && L.maskPattern === 'grin')) ({
      neutral: () => rect(14, 19, 4, 1, lip),
      smirk: () => { rect(14, 19, 3, 1, lip); set(17, 18, lip); },
      grin: () => { rect(14, 19, 4, 1, wh); set(13, 18, lip); set(18, 18, lip); rect(14, 20, 4, 1, lip); },
      snarl: () => { rect(14, 18, 4, 1, lip); rect(14, 19, 4, 1, wh); set(13, 20, lip); set(18, 20, lip); },
      shout: () => { rect(14, 19, 4, 3, '#3a1212'); rect(14, 19, 4, 1, wh); },
      smile: () => { rect(14, 20, 4, 1, lip); set(13, 19, lip); set(18, 19, lip); },
      frown: () => { rect(14, 19, 4, 1, lip); set(13, 20, lip); set(18, 20, lip); },
      tongue: () => { rect(14, 19, 4, 2, '#3a1212'); rect(15, 20, 2, 2, '#e0607a'); },
      gap: () => { rect(14, 19, 4, 1, wh); set(15, 19, '#3a1212'); rect(14, 20, 4, 1, lip); set(13, 18, lip); set(18, 18, lip); },
      fangs: () => { rect(14, 19, 4, 1, lip); set(14, 20, wh); set(17, 20, wh); },
      guard: () => { rect(14, 19, 4, 2, L.gear2); rect(14, 19, 4, 1, sh(L.gear2, 0.35)); },
      pout: () => { rect(15, 19, 2, 1, '#b0485a'); set(14, 19, lip); set(17, 19, lip); },
      lipstick: () => { rect(14, 19, 4, 1, '#c8102e'); rect(15, 18, 2, 1, '#c8102e'); }
    })[L.mouth]();

    // ---- front hair
    const cap = (n_, c) => { for (let y = top; y < top + n_; y++) span(y, lxAt(y), c); };
    const brow = () => span(top - 1, lxAt(top) + 1, hc);
    const sides = (to, c) => { for (let y = top; y <= to; y++) mset(lxAt(y), y, c || hc); };
    const fin = () => { rect(14, top - 5, 4, 9, hc); rect(15, top - 6, 2, 1, hc); rect(14, top - 5, 1, 8, hL); };
    if ((!fullMask || mask === 'open') && !halfMask) ({
      bald: () => 0,
      buzz: () => { cap(3, mix(sk, hc, 0.55)); sides(13, mix(sk, hc, 0.55)); },
      crew: () => { brow(); cap(4, hc); sides(13); rect(12, top - 1, 3, 1, hL); },
      spiky: () => { brow(); cap(4, hc); sides(13); mrect(10, top - 2, 2, 1, hc); mset(10, top - 3, hc); mrect(13, top - 2, 2, 1, hc); mset(14, top - 3, hc); rect(15, top - 4, 2, 3, hc); set(15, top - 3, hL); },
      mohawk: () => { cap(2, mix(sk, hc, 0.3)); fin(); },
      slick: () => { brow(); cap(4, hc); sides(13); set(12, top, hL); set(13, top + 1, hL); set(17, top, hL); set(18, top + 1, hL); },
      long: () => { brow(); cap(4, hc); for (let y = top + 4; y < 18; y++) { mset(lxAt(y), y, hc); } set(13, top, hD); set(13, top + 1, hD); rect(14, top - 1, 3, 1, hL); },
      mullet: () => { brow(); cap(3, hc); sides(14); rect(12, top - 1, 2, 1, hL); },
      afro: () => { cap(3, hc); },
      dreads: () => { brow(); cap(3, hc); for (let y = top + 3; y < 18; y++) mset(lxAt(y), y, y % 2 ? hc : hD); },
      bun: () => { cap(3, hc); rect(13, top - 4, 6, 4, hc); set(13, top - 4, null); set(18, top - 4, null); rect(13, top - 1, 6, 1, hD); set(14, top - 3, hL); },
      ponytail: () => { brow(); cap(4, hc); sides(13); set(12, top, hL); set(13, top, hL); },
      pigtails: () => { brow(); cap(3, hc); sides(13); set(15, top, hD); set(16, top - 1, hD); },
      pompadour: () => { brow(); cap(4, hc); sides(13); rect(11, top - 3, 9, 2, hc); rect(12, top - 4, 6, 1, hc); rect(12, top - 3, 4, 1, hL); },
      undercut: () => { cap(3, mix(sk, hc, 0.5)); sides(13, mix(sk, hc, 0.5)); rect(11, top - 2, 10, 2, hc); span(top, lxAt(top) + 1, hc); rect(15, top + 1, 6, 1, hc); rect(17, top + 2, 4, 1, hc); rect(12, top - 2, 4, 1, hL); },
      curly: () => { brow(); cap(4, hc); sides(14); for (let x = lxAt(top) + 1; x < W - lxAt(top) - 1; x += 2) set(x, top - 2, hc); for (let y = top - 1; y < top + 4; y++) for (let x = 0; x < W; x++) if (get(x, y) === hc && (x * 3 + y) % 5 === 0) set(x, y, hD); },
      cornrows: () => { brow(); cap(4, hc); for (let y = top - 1; y < top + 4; y++) for (let x = 0; x < W; x++) if (get(x, y) === hc && x % 2) set(x, y, hD); },
      shaggy: () => { brow(); cap(4, hc); rect(11, top + 4, 10, 1, hc); [11, 14, 17, 20].forEach(x => set(x, top + 5, hc)); for (let y = top + 4; y <= 18; y++) { mset(lxAt(y), y, hc); if (y < 16) mset(lxAt(y) + 1, y, hc); } },
      bowl: () => { brow(); cap(5, hc); for (let y = top + 5; y <= 14; y++) { mset(lxAt(y), y, hc); mset(lxAt(y) + 1, y, hc); } rect(12, top - 1, 3, 1, hL); },
      liberty: () => { brow(); cap(3, hc); },
      sidepart: () => { brow(); cap(4, hc); sides(13); set(19, top, hD); set(19, top + 1, hD); rect(11, top - 1, 6, 1, hL); },
      flattop: () => { cap(3, hc); sides(13); const l = lxAt(top) + 1; rect(l, top - 4, W - 2 * l, 4, hc); rect(l, top - 4, W - 2 * l, 1, hL); },
      fauxhawk: () => { cap(3, mix(sk, hc, 0.45)); sides(13, mix(sk, hc, 0.45)); rect(13, top - 3, 6, 5, hc); rect(14, top - 4, 4, 1, hc); rect(14, top - 3, 1, 4, hL); },
      fringe: () => { brow(); cap(5, hc); sides(14); rect(lxAt(top) + 1, top + 5, 7, 2, hc); rect(lxAt(top) + 1, top + 7, 4, 1, hD); },
      topknot: () => { brow(); cap(3, hc); sides(13); set(13, top, hL); },
      braids: () => { brow(); cap(4, hc); sides(13); rect(15, top - 1, 2, 4, hD); },
      wavy: () => { brow(); cap(4, hc); sides(15); for (let x = lxAt(top) + 1; x < W - lxAt(top) - 1; x += 3) set(x, top + 4, hc); rect(12, top - 1, 3, 1, hL); },
      balding: () => { for (let y = 11; y <= 18; y++) { mset(lxAt(y), y, hc); if (y > 12) mset(lxAt(y) - 1, y, hc); } },
      shavedside: () => { brow(); cap(4, hc); sides(13); for (let y = top + 1; y <= top + 4; y++) rect(lxAt(y), y, 5, 1, mix(sk, hc, 0.5)); rect(16, top - 2, 7, 1, hc); rect(17, top - 3, 4, 1, hc); }
    })[hair]();
    if (halfMask && hair === 'mohawk') fin();

    // ---- headwear & eyewear
    {
    const g1 = L.headColor, g1D = sh(L.headColor, -0.25), g1L = sh(L.headColor, 0.3);
    if (L.headwear === 'headband') { span(top + 2, lxAt(top + 2) - 1, g1); span(top + 3, lxAt(top + 3) - 1, g1); set(lx0 - 2, top + 4, g1); set(lx0 - 3, top + 5, g1); set(lx0 - 2, top + 6, g1); }
    if (L.headwear === 'bandana') { span(top - 1, lxAt(top) + 1, g1); for (let y = top; y < top + 4; y++) for (let x = lxAt(y) - (y > top ? 1 : 0); x < W - lxAt(y) + (y > top ? 1 : 0); x++) set(x, y, (x + y) % 4 ? g1 : g2); set(lx0 - 2, top + 4, g1); set(lx0 - 3, top + 5, g1); set(lx0 - 2, top + 6, g1D); }
    if (L.headwear === 'hat') { rect(11, top - 4, 10, 5, g1); rect(11, top - 1, 10, 1, g2); rect(7, top + 1, 18, 1, g1); rect(7, top + 2, 18, 1, g1D); rect(12, top - 4, 2, 1, g1L); }
    const hw = L.headwear;
    if (hw === 'cap') { span(top - 1, lxAt(top) + 1, g1); for (let y = top; y <= top + 2; y++) span(y, lxAt(y), g1); rect(9, top + 3, 14, 1, g1D); rect(15, top, 2, 2, g2); }
    if (hw === 'beanie') { for (let y = top - 2; y <= top + 2; y++) { const l = lxAt(top) + Math.max(0, top - y); rect(l, y, W - 2 * l, 1, y % 2 ? g1 : sh(g1, -0.12)); } span(top + 3, lxAt(top + 3) - 1, g2); rect(15, top - 5, 2, 2, g2); rect(14, top - 4, 4, 1, g2); }
    if (hw === 'crown') { rect(11, top - 2, 10, 2, '#f2c230'); rect(11, top - 1, 10, 1, '#b8860b'); mset(11, top - 3, '#f2c230'); mset(11, top - 4, '#f2c230'); mset(13, top - 3, '#f2c230'); rect(15, top - 4, 2, 2, '#f2c230'); mset(13, top - 2, '#d7263d'); rect(15, top - 2, 2, 1, '#1f6feb'); }
    if (hw === 'tophat') { rect(11, top - 8, 10, 8, '#1b1b1f'); rect(11, top - 3, 10, 1, g1); rect(8, top, 16, 1, '#1b1b1f'); rect(12, top - 8, 1, 5, '#3a3a40'); }
    if (hw === 'horns') { const hm = '#8a96a3'; span(top - 1, lxAt(top) + 1, hm); for (let y = top; y <= top + 2; y++) span(y, lxAt(y), hm); span(top + 3, lxAt(top + 3) - 1, '#5d6670'); mset(12, top + 1, '#c9d0d8'); [[lx0 - 1, top], [lx0 - 2, top - 1], [lx0 - 2, top - 2], [lx0 - 2, top - 3], [lx0 - 1, top - 4]].forEach((p, i) => mset(p[0], p[1], i === 4 ? '#cbbf9f' : '#f0e6cf')); }
    if (hw === 'tiara') { rect(12, top, 8, 1, '#d9dde3'); rect(15, top - 1, 2, 1, '#d9dde3'); mset(13, top - 1, '#d9dde3'); rect(15, top - 2, 2, 1, '#ff5fa2'); }
    if (hw === 'durag') { span(top - 1, lxAt(top) + 1, g1); for (let y = top; y <= top + 3; y++) span(y, lxAt(y) - (y > top ? 1 : 0), g1); rect(15, top - 1, 2, 5, sh(g1, -0.18)); rect(lx0 - 2, top + 4, 1, 8, g1); rect(lx0 - 3, top + 6, 1, 6, g1D); }
    if (hw === 'halo') { rect(12, top - 5, 8, 1, '#f2c230'); mset(11, top - 4, '#f2c230'); rect(12, top - 3, 8, 1, '#f7dc6f'); }
    if (hw === 'helmet') { span(top - 1, lxAt(top) + 1, g1); for (let y = top; y <= top + 4; y++) span(y, lxAt(y) - 1, g1); rect(15, top - 1, 2, 6, L.gear2); mrect(lx0 - 1, top + 5, 1, 3, g1D); }
    if (hw === 'flowers') [11, 13, 15, 17, 19].forEach((x, i) => { set(x, top, ['#ff5fa2', '#f4c20d', '#ffffff', '#ff5fa2', '#f4c20d'][i]); set(x + 1, top, '#2fae5c'); set(x, top - 1, sh(['#ff5fa2', '#f4c20d', '#ffffff', '#ff5fa2', '#f4c20d'][i], -0.2)); });
    if (hw === 'skullCap') { span(top - 1, lxAt(top) + 1, g1); for (let y = top; y <= top + 2; y++) span(y, lxAt(y), g1); span(top + 3, lxAt(top + 3) - 1, g1D); set(12, top, g1L); set(13, top, g1L); }
    if (hw === 'cowl') { span(top - 2, lxAt(top) + 2, g1); span(top - 1, lxAt(top), g1); for (let y = top; y <= top + 1; y++) span(y, lxAt(y) - 1, g1); hrect(0, top + 2, W, 1, g1D); for (let y = top + 2; y <= chin + 3; y++) { const e = y <= chin ? lxAt(y) : lx0 - 1; for (let x = lx0 - 3; x <= e; x++) mset(x, y, x === e ? g1D : g1); } }
    if (hw === 'headset') { span(top - 1, lxAt(top) + 1, '#2a2a2e'); mrect(lx0 - 2, 12, 2, 4, '#2a2a2e'); [[lx0 - 1, 16], [11, 17], [12, 18]].forEach(p => set(p[0], p[1], '#2a2a2e')); set(13, 18, '#9aa0a8'); }
    }
    const ew = L.eyewear;
    if (ew === 'glasses') { const f = '#2a2a2e'; mrect(11, 13, 4, 1, f); mrect(11, 15, 4, 1, f); mset(11, 14, f); mset(14, 14, f); rect(15, 13, 2, 1, f); }
    if (ew === 'aviators') { mrect(11, 13, 4, 2, '#3d3a33'); mrect(12, 15, 2, 1, '#3d3a33'); rect(15, 13, 2, 1, '#c9a54a'); mrect(11, 12, 1, 1, '#c9a54a'); mset(12, 13, '#8a7f63'); }
    if (ew === 'goggles') { rect(lx0 - 1, 13, W - 2 * (lx0 - 1), 2, '#1b1b1f'); mrect(11, 13, 4, 2, '#2bb3e8'); mset(11, 13, '#ffffff'); }
    if (ew === 'monocle') [[17, 13], [18, 12], [19, 12], [20, 13], [20, 14], [20, 15], [19, 16], [18, 16], [17, 15], [17, 14], [21, 17], [21, 18], [22, 19], [22, 20]].forEach(p => set(p[0], p[1], '#f2c230'));
    if (ew === 'starshades') { [[12, 12], [13, 12], [10, 13], [11, 13], [12, 13], [13, 13], [14, 13], [11, 14], [12, 14], [13, 14], [14, 14], [11, 15], [14, 15]].forEach(p => mset(p[0], p[1], g2)); rect(15, 13, 2, 1, sh(g2, -0.3)); mset(12, 13, '#ffffff'); }
    if (ew === 'heartshades') { const hcol = '#d7263d'; mset(11, 12, hcol); mset(13, 12, hcol); mrect(11, 13, 4, 1, hcol); mrect(12, 14, 2, 1, hcol); rect(15, 13, 2, 1, hcol); mset(11, 13, '#ff8a9a'); }
    if (ew === 'sport') { rect(lx0, 13, W - 2 * lx0, 2, '#1b1b1f'); mrect(11, 13, 4, 2, '#ff7a00'); mset(11, 13, '#ffd29a'); }
    // lower-face masks sit over the mouth, so they are drawn last
    if (mask === 'gas') { for (let y = 16; y <= chin; y++) for (let x = lxAt(y) + 1; x <= W - 2 - lxAt(y); x++) set(x, y, '#3a3d42'); mrect(11, 13, 4, 3, '#3a3d42'); mrect(12, 14, 2, 1, '#7fd3e6'); rect(14, chin - 1, 4, 3, '#5a5f66'); rect(15, chin, 2, 1, '#22252a'); mset(lxAt(15), 15, '#2a2a2e'); }
    if (mask === 'muzzle') { for (let y = 17; y <= chin; y++) for (let x = 13; x <= 18; x++) if ((x + y) % 2 === 0) set(x, y, '#9aa0a8'); rect(13, 17, 6, 1, '#6e747c'); mset(lxAt(17), 17, '#2a2a2e'); mset(lxAt(17) + 1, 17, '#2a2a2e'); }
    if (mask === 'jaw') { const m1 = L.mask1, m2 = L.mask2; for (let y = 17; y <= chin; y++) for (let x = lxAt(y) + 1; x <= W - 2 - lxAt(y); x++) set(x, y, m1); for (let x = 13; x <= 18; x++) set(x, 19, x % 2 ? m2 : '#f4f1ea'); mset(lxAt(17), 17, sh(m1, -0.25)); }
    if (L.eyewear === 'shades') { mrect(11, 13, 4, 2, '#151518'); rect(15, 13, 2, 1, '#151518'); mset(12, 13, '#6e7a8a'); }
    if (L.eyewear === 'visor') { rect(lx0, 13, W - 2 * lx0, 2, g2 === '#f5f5f5' ? '#2bb3e8' : g2); rect(lx0 + 1, 13, 3, 1, '#ffffff'); }
    if (L.eyewear === 'eyepatch') { rect(11, 13, 4, 3, '#151518'); [[10, 12], [9, 11], [15, 12], [16, 11], [17, 10], [18, 9], [19, 8]].forEach(p => set(p[0], p[1], '#151518')); }

    // ---- outline
    const out = C.slice();
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (C[y * W + x]) continue;
      if (get(x - 1, y) || get(x + 1, y) || get(x, y - 1) || get(x, y + 1)) out[y * W + x] = OUTLINE;
    }
    if (!withBg) return { w: W, h: H, ox: 0, px: out };

    // ---- backdrop (wide: 48 columns with the sprite centred)
    const OW = opt && opt.wide ? BW : W, ox = (OW - W) / 2, cxm = OW / 2 - 0.5;
    const res = new Array(OW * H).fill(null);
    const b = L.bgColor, bD = sh(b, -0.22), bL = sh(b, 0.22), bLL = sh(b, 0.45);
    const mat = '#e7e3ec', matD = '#c3bdcc', apron = sh(b, -0.35);
    const r = rng(b + L.bg);
    for (let y = 0; y < H; y++) for (let x = 0; x < OW; x++) {
      let c = b;
      if (L.bg === 'spotlight') { const d = Math.hypot(x - cxm, (y - 30) * 0.6); c = d < 14 ? bL : d < 19 && (x + y) % 2 ? bL : b; }
      if (L.bg === 'stripes') c = ((x + y) >> 2) % 2 ? bD : b;
      if (L.bg === 'ropes') { c = y < 34 ? bD : b; if (y === 38 || y === 46 || y === 54) c = bLL; if (y === 39 || y === 47 || y === 55) c = bL; if ((x < 2 || x > OW - 3) && y > 34) c = '#cfcfd4'; }
      if (L.bg === 'dots') c = (x % 4 === 1 && y % 4 === 1) || (x % 4 === 3 && y % 4 === 3) ? bD : b;
      if (L.bg === 'crowd') { c = y < 46 ? bD : b; if (y < 44 && r() < 0.03) c = bLL; }
      if (L.bg === 'checker') c = ((x >> 1) + (y >> 1)) % 2 ? bD : b;
      if (L.bg === 'sunburst') c = Math.floor((Math.atan2(y - 30, x - cxm) + Math.PI) / (Math.PI / 9)) % 2 ? bL : b;
      if (L.bg === 'cage') c = (x + y) % 4 === 0 || (x - y + 400) % 4 === 0 ? sh(b, 0.35) : bD;
      if (y >= 66) c = y === 66 ? matD : mat;
      if (y >= 66 && Math.abs(x - cxm) < 11 && y >= 73) c = matD;
      res[y * OW + x] = c;
    }
    if (L.bg === 'crowd') for (let k = 0; k < Math.ceil(OW / 4); k++) {
      const hx = 1 + k * 4, hy = 50 + (k % 2) * 3;
      for (let y = hy - 2; y < 66; y++) for (let x = hx - 2; x <= hx + 2; x++) {
        const d = y < hy + 2 ? (x - hx) ** 2 + (y - hy) ** 2 <= 4.5 : Math.abs(x - hx) <= 2;
        if (d && x >= 0 && x < OW) res[y * OW + x] = apron;
      }
    }
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (out[y * W + x]) res[y * OW + x + ox] = out[y * W + x];
    return { w: OW, h: H, ox, px: res };
  }

  const CROPS = { head: [4, 1, 24, 26], bust: [0, 0, 32, 40], legs: [0, 40, 32, 36] };
  function cropBox(crop, P) {
    if (CROPS[crop]) { const c = CROPS[crop]; return [c[0] + P.ox, c[1], c[2], c[3]]; }
    if (Array.isArray(crop) && crop.length === 4) return crop.map(v => v | 0);
    return [0, 0, P.w, P.h];
  }

  function draw(canvas, look, opt) {
    opt = opt || {};
    const sc = Math.max(1, opt.scale | 0 || 4);
    const P = pixels(look, opt);
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

  const cache = new Map();
  function toDataURL(look, opt) {
    const key = JSON.stringify([normalize(look), opt || {}]);
    if (cache.has(key)) return cache.get(key);
    const url = draw(document.createElement('canvas'), look, opt).toDataURL('image/png');
    if (cache.size > 400) cache.delete(cache.keys().next().value);
    cache.set(key, url);
    return url;
  }

  // Returns an <img> tag string. The data URL is generated, so it is safe in HTML.
  function img(look, opt) {
    opt = opt || {};
    const c = CROPS[opt.crop] || (Array.isArray(opt.crop) ? opt.crop : [0, 0, opt.wide ? BW : W, H]);
    const cw = c[2], ch = c[3];
    const size = opt.size | 0 || 64;
    const h = Math.round(size * ch / cw);
    return '<img class="wl-img" src="' + toDataURL(look, Object.assign({ scale: 1 }, opt, { size: undefined })) +
      '" width="' + size + '" height="' + h + '" alt="" style="image-rendering:pixelated">';
  }

  root.WrestlerLook = { W, H, BW, CROPS, OUTFIT_KEYS, wear, PAL, OPTIONS, defaults, normalize, random, pixels, draw, toDataURL, img, mix, shade: sh };
})(typeof window !== 'undefined' ? window : globalThis);
