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
  if (!Array.isArray(g.ex) || g.ex.length !== 3 || g.ex.some(r => !Array.isArray(r) || !hasEn(r[0]) || hasHe(r[0]) || !hasHe(r[1])))
    errors.push(`${at}: "ex" must be exactly 3 rows of [English, Hebrew]`);
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
