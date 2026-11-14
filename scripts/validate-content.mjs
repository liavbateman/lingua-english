// Checks all learning content for mistakes.  Run:  node scripts/validate-content.mjs
// Exit code 0 = everything is valid.
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = ['js/data.js', 'js/grammar.js', 'js/content-beginner.js', 'js/content-intermediate.js', 'js/content-advanced.js'];
const ctx = vm.createContext({});
const errors = [];
const loaded = [];

for (const f of files) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) continue;
  try { vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f }); loaded.push(f); }
  catch (e) { errors.push(`${f}: does not run: ${e.message}`); }
}

const { UNITS, GRAMMAR, LEVELS } = vm.runInContext('({ UNITS, GRAMMAR, LEVELS })', ctx);
const levels = LEVELS.map(l => l.id);
const hasHe = s => typeof s === 'string' && /[֐-׿]/.test(s);
const hasEn = s => typeof s === 'string' && /[A-Za-z]/.test(s);
const str = s => typeof s === 'string' && s.trim().length > 0;

// ---------- vocabulary & phrase units ----------
const unitIds = new Set();
for (const u of UNITS) {
  const at = `unit "${u.id}"`;
  if (!str(u.id) || !/^[a-z0-9-]+$/.test(u.id)) errors.push(`${at}: id must be lowercase letters, digits and dashes`);
  if (unitIds.has(u.id)) errors.push(`${at}: duplicate unit id`);
  unitIds.add(u.id);
  if (!levels.includes(u.level)) errors.push(`${at}: unknown level "${u.level}"`);
  if (!str(u.title)) errors.push(`${at}: missing title`);
  if (!str(u.emoji)) errors.push(`${at}: missing emoji`);
  if (u.kind && u.kind !== 'phrases') errors.push(`${at}: kind can only be "phrases"`);
  if (!Array.isArray(u.words) || u.words.length < 6) { errors.push(`${at}: needs at least 6 items`); continue; }
  const seenEn = new Set(), seenHe = new Set();
  for (const w of u.words) {
    const wat = `${at} › "${w.en}"`;
    if (!str(w.en) || !hasEn(w.en) || hasHe(w.en)) errors.push(`${wat}: "en" must be English`);
    if (!hasHe(w.he)) errors.push(`${wat}: "he" must be Hebrew`);
    if (seenEn.has(w.en)) errors.push(`${wat}: repeated in the same unit`);
    if (seenHe.has(w.he)) errors.push(`${wat}: same Hebrew translation as another item in the unit ("${w.he}")`);
    seenEn.add(w.en); seenHe.add(w.he);
    if (u.kind === 'phrases') {
      if (w.ex !== undefined) errors.push(`${wat}: phrase items have no "ex"`);
    } else {
      if (!str(w.ex) || hasHe(w.ex)) errors.push(`${wat}: missing English example sentence`);
      else if (!w.ex.toLowerCase().includes(w.en.toLowerCase())) errors.push(`${wat}: example must contain the word exactly as written ("${w.ex}")`);
    }
  }
}

// two lessons may not share a name (English or Hebrew), or the learner can't tell them apart
for (const key of ['title', 'he']) {
  const names = new Map();
  for (const u of UNITS) {
    if (!str(u[key])) continue;
    const k = u[key].trim().toLowerCase();
    if (names.has(k)) errors.push(`units "${names.get(k)}" and "${u.id}" have the same ${key === 'he' ? 'Hebrew' : 'English'} name "${u[key]}"`);
    else names.set(k, u.id);
  }
}

// the same English word must not appear twice inside one level (it confuses the quizzes)
for (const lv of levels) {
  const seen = new Map();
  for (const u of UNITS.filter(x => x.level === lv)) for (const w of u.words) {
    const k = String(w.en).toLowerCase();
    if (seen.has(k)) errors.push(`level ${lv}: "${w.en}" appears in both "${seen.get(k)}" and "${u.id}"`);
    else seen.set(k, u.id);
  }
}

// ---------- grammar ----------
const gIds = new Set();
for (const g of GRAMMAR) {
  const at = `grammar "${g.id}"`;
  if (!str(g.id) || !/^[a-z0-9-]+$/.test(g.id)) errors.push(`${at}: bad id`);
  if (gIds.has(g.id)) errors.push(`${at}: duplicate id`);
  gIds.add(g.id);
  if (!levels.includes(g.level)) errors.push(`${at}: unknown level`);
  if (!str(g.title) || hasHe(g.title)) errors.push(`${at}: "title" must be English`);
  for (const k of ['he', 'when', 'tip']) if (!hasHe(g[k])) errors.push(`${at}: "${k}" must be Hebrew`);
  if (!Array.isArray(g.forms) || g.forms.length < 2 || g.forms.some(r => !Array.isArray(r) || r.length !== 2 || !str(r[0]) || !str(r[1])))
    errors.push(`${at}: "forms" must be at least 2 rows of [label, text]`);
  else if (g.forms.some(r => r[0].length > 12)) errors.push(`${at}: form labels must be 12 characters or shorter`);
  if (!Array.isArray(g.ex) || g.ex.length < 3 || g.ex.length > 5 || g.ex.some(r => !Array.isArray(r) || !hasEn(r[0]) || hasHe(r[0]) || !hasHe(r[1])))
    errors.push(`${at}: "ex" must be 3 to 5 rows of [English, Hebrew]`);
  if (!Array.isArray(g.quiz) || g.quiz.length !== 3) { errors.push(`${at}: "quiz" must have exactly 3 questions`); continue; }
  for (const q of g.quiz) {
    const qat = `${at} › quiz "${q[0]}"`;
    if (!Array.isArray(q) || q.length !== 3) { errors.push(`${qat}: must be [sentence, answer, [3 wrong]]`); continue; }
    if (!str(q[0]) || (q[0].match(/___/g) || []).length !== 1) errors.push(`${qat}: sentence needs exactly one ___`);
    if (hasHe(q[0])) errors.push(`${qat}: sentence must be English`);
    if (!str(q[1])) errors.push(`${qat}: missing answer`);
    if (!Array.isArray(q[2]) || q[2].length !== 3) errors.push(`${qat}: needs exactly 3 wrong answers`);
    else if (new Set([q[1], ...q[2]]).size !== 4) errors.push(`${qat}: the 4 answers must all be different`);
  }
}

// ---------- explanations: every grammar question says why its answer is right and why each wrong option is wrong ----------
const explainFiles = ['js/explain.js', 'js/explain-beginner.js', 'js/explain-intermediate.js', 'js/explain-advanced.js'];
for (const f of explainFiles) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) { errors.push(`${f}: missing`); continue; }
  try { vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f }); loaded.push(f); }
  catch (e) { errors.push(`${f}: does not run: ${e.message}`); }
}
const EXPLAIN = vm.runInContext('typeof EXPLAIN === "undefined" ? {} : EXPLAIN', ctx);
for (const g of GRAMMAR) {
  const e = EXPLAIN[g.id];
  if (!Array.isArray(e) || e.length !== (g.quiz || []).length) { errors.push(`explain "${g.id}": needs one explanation per quiz question`); continue; }
  g.quiz.forEach((q, i) => {
    const x = e[i] || {};
    if (!hasHe(x.ok)) errors.push(`explain "${g.id}" #${i + 1}: missing a Hebrew "ok" (why the answer is right)`);
    const keys = Object.keys(x.no || {});
    for (const w of q[2]) if (!hasHe((x.no || {})[w])) errors.push(`explain "${g.id}" #${i + 1}: no explanation for the wrong option "${w}"`);
    for (const k of keys) if (!q[2].includes(k)) errors.push(`explain "${g.id}" #${i + 1}: "${k}" is not one of the wrong options`);
    for (const txt of [x.ok, ...Object.values(x.no || {})]) if (/[—–]/.test(txt || '')) errors.push(`explain "${g.id}" #${i + 1}: uses a dash (— or –)`);
  });
}
for (const id of Object.keys(EXPLAIN)) if (!GRAMMAR.some(g => g.id === id)) errors.push(`explain "${id}": no grammar rule with this id`);

// ---------- kids world ----------
{
  const kf = 'js/kids-data.js';
  const kctx = vm.createContext({});
  try {
    vm.runInContext(fs.readFileSync(path.join(root, kf), 'utf8') + ';this.K = { KIDS_THEMES, KIDS_WORDS, KIDS_ABC, KIDS_STORIES, KIDS_SONGS, KIDS_TREASURE, KIDS_RIDDLES, KIDS_MOVES, KIDS_WORDS, KIDS_HOLIDAYS, KIDS_PAIRS, KIDS_TIPS, KIDS_CVC, KIDS_SAYS, KIDS_PATH, KIDS_SIMON, KIDS_TWINS, KIDS_RHYMES, KIDS_WEAR, KIDS_QOTD, KIDS_SHAPE_HUNT };', kctx, { filename: kf });
    loaded.push(kf);
    const { KIDS_THEMES, KIDS_ABC, KIDS_STORIES, KIDS_SONGS, KIDS_TREASURE } = kctx.K;
    const ids = new Set(), stickers = new Set(KIDS_TREASURE);
    if (stickers.size !== KIDS_TREASURE.length) errors.push('kids: duplicate treasure sticker');
    for (const th of [...KIDS_THEMES, ...kctx.K.KIDS_HOLIDAYS]) {
      const at = `kids island "${th.id}"`;
      if (!str(th.title) || !hasHe(th.he) || !str(th.pic) || !/^#[0-9a-f]{6}$/i.test(th.color)) errors.push(`${at}: needs title, Hebrew name, picture and a #rrggbb colour`);
      if (!str(th.sticker) || stickers.has(th.sticker)) errors.push(`${at}: sticker missing or used twice`);
      stickers.add(th.sticker);
      if (!Array.isArray(th.words) || th.words.length < 6) { errors.push(`${at}: needs at least 6 words (the games use 4 pairs and 3–4 choices)`); continue; }
      if (th.pairs && th.words.length % 2) errors.push(`${at}: an island of opposites needs an even number of words (pairs)`);
      const pics = new Set();
      for (const w of th.words) {
        if (!hasEn(w.en) || hasHe(w.en)) errors.push(`${at} "${w.en}": "en" must be English`);
        if (!hasHe(w.he)) errors.push(`${at} "${w.en}": "he" must be Hebrew`);
        if (!str(w.pic) || pics.has(w.pic)) errors.push(`${at} "${w.en}": picture missing or used twice in the island`);
        pics.add(w.pic);
        if (ids.has(w.id)) errors.push(`${at} "${w.en}": word used twice`);
        ids.add(w.id);
      }
    }
    if (KIDS_ABC.length !== 26) errors.push('kids: the ABC needs 26 letters');
    for (const x of KIDS_ABC) if (!x.word.toLowerCase().includes(x.L.toLowerCase())) errors.push(`kids ABC "${x.L}": "${x.word}" has no ${x.L}`);
    for (const st of KIDS_STORIES) {
      if (st.island && !KIDS_THEMES.some(th => th.id === st.island)) errors.push(`kids story "${st.id}": unknown island "${st.island}"`);
      if (st.pages.length < 3 || st.pages.some(pg => !hasEn(pg[1]) || !hasHe(pg[2]))) errors.push(`kids story "${st.id}": every page needs English and Hebrew`);
      if (st.ask[2].length !== 3) errors.push(`kids story "${st.id}": the question needs 3 pictures`);
    }
    for (const r of kctx.K.KIDS_RIDDLES) if (!r.w || !hasEn(r.en) || !hasHe(r.he)) errors.push(`kids riddle "${r.id}": unknown word or missing English / Hebrew clue`);
    for (const id of Object.keys(kctx.K.KIDS_MOVES)) if (!kctx.K.KIDS_WORDS.some(w => w.id === id)) errors.push(`kids moving picture "${id}": no such word`);
    for (const pr of kctx.K.KIDS_PAIRS) if (pr.length !== 2 || pr.some(w => !hasEn(w.en) || !hasHe(w.he) || !str(w.pic)) || pr[0].pic === pr[1].pic) errors.push(`kids sound-alike pair "${pr.map(w => w.en).join('/')}": needs 2 words, each with English, Hebrew and its own picture`);
    for (const th of KIDS_THEMES) { const tip = kctx.K.KIDS_TIPS[th.id]; if (!tip || !hasHe(tip[0]) || !hasEn(tip[1])) errors.push(`kids island "${th.id}": needs a "try at home" tip in Hebrew and English`); }
    for (const w of kctx.K.KIDS_CVC) if (!/^[a-z]{3}$/.test(w.en) || !str(w.pic)) errors.push(`kids blend word "${w.en}": needs 3 lowercase letters and a picture`);
    for (const id of Object.keys(kctx.K.KIDS_SAYS)) if (!kctx.K.KIDS_WORDS.some(w => w.id === id)) errors.push(`kids animal sound "${id}": no such word`);
    for (const [id, pg] of Object.entries(kctx.K.KIDS_PATH.pages)) {
      if (!hasEn(pg.en) || !hasHe(pg.he)) errors.push(`kids path page "${id}": needs English and Hebrew`);
      for (const c of pg.choices || []) if (!kctx.K.KIDS_PATH.pages[c.to]) errors.push(`kids path page "${id}": choice leads to a missing page "${c.to}"`);
    }
    for (const c of kctx.K.KIDS_SIMON) if (!hasEn(c.en) || !hasHe(c.he) || !str(c.pic)) errors.push(`kids "owl says" command "${c.en}": needs English, Hebrew and a picture`);
    for (const [en, he] of Object.entries(kctx.K.KIDS_TWINS)) if (!kctx.K.KIDS_WORDS.some(w => w.en === en) || !hasHe(he)) errors.push(`kids twin word "${en}": must be an island word with a Hebrew twin`);
    for (const p of kctx.K.KIDS_RHYMES) {
      if (p.length !== 2 || p.some(w => !hasEn(w.en) || !hasHe(w.he) || !str(w.pic))) errors.push(`kids rhyme pair "${p.map(w => w.en).join('/')}": needs two words with English, Hebrew and a picture`);
      else if (p[0].en.slice(-2) !== p[1].en.slice(-2) && !['bear/chair', 'chair/bear', 'snail/whale', 'whale/snail'].includes(p.map(w => w.en).join('/'))) errors.push(`kids rhyme pair "${p[0].en}/${p[1].en}": endings do not match`);
    }
    for (const wx of kctx.K.KIDS_WEAR) for (const it of wx.items) if (!hasEn(it.en) || !hasHe(it.he) || !str(it.pic) || !str(it.slot)) errors.push(`kids weather item "${it.en}": needs English, Hebrew, a picture and a slot`);
    for (const q of kctx.K.KIDS_QOTD) if (!hasEn(q.en) || !hasHe(q.he) || q.answers.length !== 3 || q.answers.some(a => !str(a.pic) || !hasEn(a.en))) errors.push(`kids question of the day "${q.en}": needs English, Hebrew and 3 picture answers`);
    for (const [shape, s] of Object.entries(kctx.K.KIDS_SHAPE_HUNT)) if (!hasHe(s.he) || s.things.length < 3 || s.things.some(([en, pic]) => !hasEn(en) || !str(pic))) errors.push(`kids shape hunt "${shape}": needs Hebrew and at least 3 things with a picture`);
    for (const sg of KIDS_SONGS) if (!sg.lines.length || sg.lines.some(l => !l.length)) errors.push(`kids song "${sg.id}": empty line`);
    console.log(`kids          ${String(KIDS_THEMES.length).padStart(2)} islands · ${String(ids.size).padStart(3)} words ·  ${KIDS_STORIES.length} stories ·  ${KIDS_SONGS.length} songs`);
  } catch (e) { errors.push(`${kf}: does not run: ${e.message}`); }
}

// ---------- report ----------
console.log('Loaded:', loaded.join(', '));
for (const lv of levels) {
  const us = UNITS.filter(u => u.level === lv);
  const words = us.filter(u => u.kind !== 'phrases').reduce((n, u) => n + u.words.length, 0);
  const phrases = us.filter(u => u.kind === 'phrases').reduce((n, u) => n + u.words.length, 0);
  console.log(`${lv.padEnd(13)} ${String(us.length).padStart(3)} units · ${String(words).padStart(4)} words · ${String(phrases).padStart(4)} phrases · ${String(GRAMMAR.filter(g => g.level === lv).length).padStart(3)} grammar rules`);
}
if (errors.length) {
  console.log(`\n${errors.length} problem(s):`);
  for (const e of errors) console.log(' - ' + e);
  process.exit(1);
}
console.log('\nAll content is valid.');
