// Progress saved on the device (localStorage) + simple spaced repetition (Leitner boxes).
const Store = (() => {
  const KEY = 'english-app-v1';
  const DAY = 24 * 60 * 60 * 1000;
  // Days until the next review, by box (0 = not learned yet)
  const INTERVALS = [0, 0, 1, 3, 7, 14];
  const MASTERED_BOX = 3;

  const fresh = () => ({
    words: {}, grammar: {}, xp: 0, streak: 0, best: 0, lastDay: null,
    history: {},   // answers per day, { 'YYYY-MM-DD': count }, kept for 60 days
    level: 'beginner', lang: 'he',
    daily: { date: null, count: 0, tasks: {} }
  });

  let state = fresh();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = Object.assign(fresh(), JSON.parse(raw));
  } catch (e) { /* no storage available - carry on without saving */ }

  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

  const dayKey = (d = new Date()) =>
    d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

  // Any activity today: starts a fresh daily plan and keeps the streak going
  function touchDay() {
    const today = dayKey();
    if (state.daily.date !== today) state.daily = { date: today, count: 0, tasks: {} };
    if (!state.daily.tasks) state.daily.tasks = {};
    if (state.lastDay !== today) {
      const yesterday = dayKey(new Date(Date.now() - DAY));
      state.streak = state.lastDay === yesterday ? state.streak + 1 : 1;
      state.best = Math.max(state.best || 0, state.streak);
      state.lastDay = today;
    }
  }

  const box = id => (state.words[id] ? state.words[id].box : 0);

  return {
    get xp() { return state.xp; },
    // The streak drops to 0 once more than one day was skipped
    get streak() {
      const ok = state.lastDay === dayKey() || state.lastDay === dayKey(new Date(Date.now() - DAY));
      return ok ? state.streak : 0;
    },
    get best() { return state.best || 0; },

    get level() { return state.level; },
    set level(v) { state.level = v; save(); },

    // Interface language: 'he' or 'en'
    get lang() { return state.lang === 'en' ? 'en' : 'he'; },
    set lang(v) { state.lang = v; save(); },

    // Today's finished plan items, e.g. { vocab: true }
    get tasks() { return state.daily.date === dayKey() ? (state.daily.tasks || {}) : {}; },
    completeTask(id) { touchDay(); state.daily.tasks[id] = true; save(); },
    // The "goal done" celebration is shown once a day
    get celebrated() { return state.daily.date === dayKey() && !!state.daily.celebrated; },
    markCelebrated() { touchDay(); state.daily.celebrated = true; save(); },
    // First launch: a short welcome with a level choice, shown once. Anyone who already has
    // progress (words, rules or points from before this screen existed) counts as welcomed.
    get welcomed() {
      return !!state.welcomed || state.xp > 0 || Object.keys(state.words || {}).length > 0 || Object.keys(state.grammar || {}).length > 0;
    },
    markWelcomed() { state.welcomed = true; save(); },

    // Grammar rules whose practice was passed
    isGrammarDone: id => !!(state.grammar && state.grammar[id]),
    markGrammar(id) { state.grammar = state.grammar || {}; state.grammar[id] = true; save(); },
    // When each level's grammar was first seen complete (the date on its certificate)
    levelDoneAt: lvl => (state.lvdone && state.lvdone[lvl]) || 0,
    markLevelDone(lvl) { state.lvdone = state.lvdone || {}; if (!state.lvdone[lvl]) { state.lvdone[lvl] = Date.now(); save(); } },
    // Rules with mistakes: every wrong answer adds one, every right answer in a rule review takes one off
    ruleMiss(id) { state.gmiss = state.gmiss || {}; state.gmiss[id] = (state.gmiss[id] || 0) + 1; save(); },
    ruleHit(id) {
      if (!state.gmiss || !state.gmiss[id]) return;
      if (--state.gmiss[id] <= 0) delete state.gmiss[id];
      save();
    },
    weakRules: () => Object.keys(state.gmiss || {}).filter(id => state.gmiss[id] > 0),
    // Rules the learner saved for review (a personal list)
    isRuleSaved: id => !!(state.gsaved && state.gsaved[id]),
    toggleRuleSaved(id) {
      state.gsaved = state.gsaved || {};
      if (state.gsaved[id]) delete state.gsaved[id]; else state.gsaved[id] = true;
      save();
      return !!state.gsaved[id];
    },
    savedRules: () => Object.keys(state.gsaved || {}),

    // Stage chests on the lesson path: each one opens once and gives a points bonus
    chestOpened: key => !!(state.chests && state.chests[key]),
    openChest(key, xp) {
      state.chests = state.chests || {};
      if (state.chests[key]) return false;
      state.chests[key] = true;
      state.xp += xp;
      touchDay();
      save();
      return true;
    },

    // ---------- Kids world ----------
    // Stars per island (best of 3), stickers earned, and how often each picture word was heard right
    kidsStars: id => (state.kids && state.kids.stars[id]) || 0,
    kidsHasSticker: id => !!(state.kids && state.kids.stickers[id]),
    // island stickers only (the ABC sticker is a bonus and doesn't open islands)
    get kidsStickerCount() { return state.kids ? KIDS_THEMES.filter(th => state.kids.stickers[th.id]).length : 0; },
    get kidsTotalStars() { return state.kids ? Object.values(state.kids.stars).reduce((a, b) => a + b, 0) : 0; },
    // A finished island: keeps the best stars, gives its sticker once. Returns what is new.
    kidsFinish(id, stars, xp) {
      state.kids = state.kids || { stars: {}, stickers: {}, words: {} };
      const k = state.kids;
      const firstSticker = !k.stickers[id];
      const better = stars > (k.stars[id] || 0);
      k.stickers[id] = true;
      if (better) k.stars[id] = stars;
      k.played = dayKey();   // today's treasure can be opened
      state.xp += xp;
      touchDay();
      state.daily.count++;
      const today = dayKey();
      state.history = state.history || {};
      state.history[today] = (state.history[today] || 0) + 1;
      save();
      return { firstSticker, better };
    },
    kidsWordRight(id) {
      state.kids = state.kids || { stars: {}, stickers: {}, words: {} };
      state.kids.words[id] = (state.kids.words[id] || 0) + 1;
      save();
    },
    kidsWordCount: id => (state.kids && state.kids.words[id]) || 0,
    // Review garden: every word the child got right is a plant. It gets thirsty when the word is due
    // for review (1, 2, 4, then 8 days) and grows a stage each time it is watered with a right answer.
    kidsGarden() {
      const k = state.kids || { words: {} }, g = k.garden || {}, now = Date.now();
      return KIDS_WORDS.filter(w => (k.words || {})[w.id]).map(w => {
        const p = g[w.id] || { lvl: 1, due: 0 };
        return { w, lvl: p.lvl, thirsty: p.due <= now };
      });
    },
    kidsWater(id, right) {
      state.kids = state.kids || { stars: {}, stickers: {}, words: {} };
      const g = state.kids.garden = state.kids.garden || {};
      const p = g[id] || { lvl: 1, due: 0 };
      if (right) p.lvl = Math.min(4, p.lvl + 1);
      p.due = Date.now() + [1, 1, 2, 4, 8][p.lvl] * DAY;
      g[id] = p;
      touchDay();
      save();
      return p.lvl;
    },
    // Game sounds in the kids world (taps, pops, jingles); the spoken words are never muted
    get kidsSfx() { return !(state.kids && state.kids.sfx === false); },
    set kidsSfx(v) { state.kids = state.kids || { stars: {}, stickers: {}, words: {} }; state.kids.sfx = !!v; save(); },
    // Letters the child traced (capital and small)
    kidsHasTraced: L => !!(state.kids && state.kids.traced && state.kids.traced[L]),
    kidsTraced(L) {
      state.kids = state.kids || { stars: {}, stickers: {}, words: {} };
      state.kids.traced = state.kids.traced || {};
      state.kids.traced[L] = true;
      touchDay();
      save();
    },
    // Picture of the day: the word picked today stays the same all day
    get kidsWotd() { const w = state.kids && state.kids.wotd; return w && w.day === dayKey() ? w.id : null; },
    set kidsWotd(id) { state.kids = state.kids || { stars: {}, stickers: {}, words: {} }; state.kids.wotd = { day: dayKey(), id }; save(); },
    // The owl buddy's look: a colour and an accessory, chosen in the wardrobe
    get kidsOwl() { const o = state.kids && state.kids.owl; return { color: (o && o.color) || 'blue', acc: (o && o.acc) || '' }; },
    setKidsOwl(part, id) {
      state.kids = state.kids || { stars: {}, stickers: {}, words: {} };
      state.kids.owl = Object.assign({ color: 'blue', acc: '' }, state.kids.owl, { [part]: id });
      save();
    },
    // Several children: each has their own kids-world progress (stars, stickers, owl, garden…).
    // The playing child's data is state.kids; the others wait in state.kidsStore by profile id.
    get kidsProfiles() {
      const list = state.kidsProfiles || [{ id: 'p1', face: '🦊', name: '' }];
      const active = state.kidsActive || list[0].id;
      return list.map(p => Object.assign({ active: p.id === active }, p));
    },
    kidsSwitch(id) {
      const list = this.kidsProfiles, cur = list.find(p => p.active);
      if (!list.some(p => p.id === id) || cur.id === id) return;
      state.kidsProfiles = list.map(({ id, face, name }) => ({ id, face, name }));
      state.kidsStore = state.kidsStore || {};
      state.kidsStore[cur.id] = state.kids || { stars: {}, stickers: {}, words: {} };
      state.kids = state.kidsStore[id] || { stars: {}, stickers: {}, words: {} };
      delete state.kidsStore[id];
      state.kidsActive = id;
      save();
    },
    kidsAddProfile(face, name) {
      const list = this.kidsProfiles.map(({ id, face, name }) => ({ id, face, name }));
      if (list.length >= 4) return null;
      const id = 'p' + (Math.max(...list.map(p => +p.id.slice(1) || 0)) + 1);
      list.push({ id, face, name: (name || '').trim().slice(0, 14) });
      state.kidsProfiles = list;
      save();
      this.kidsSwitch(id);
      return id;
    },
    kidsEditProfile(id, face, name) {
      state.kidsProfiles = this.kidsProfiles.map(p => p.id === id ? { id, face, name: (name || '').trim().slice(0, 14) } : { id: p.id, face: p.face, name: p.name });
      save();
    },
    // Kids mode: the rest of the app (and the language switch) sits behind a grown-up check
    get kidsMode() { return !!state.kidsMode; },
    set kidsMode(v) { state.kidsMode = !!v; save(); },
    // Daily play-time limit in minutes (0 = no limit) and today's play time in seconds
    get kidsLimit() { return (state.kids && state.kids.limit) || 0; },
    set kidsLimit(v) { state.kids = state.kids || { stars: {}, stickers: {}, words: {} }; state.kids.limit = v; save(); },
    get kidsTimeToday() { const t = state.kids && state.kids.time; return t && t.day === dayKey() ? t.sec : 0; },
    // Extra minutes a grown-up allowed today on top of the limit
    get kidsExtraToday() { const t = state.kids && state.kids.time; return t && t.day === dayKey() ? (t.extra || 0) : 0; },
    kidsAddTime(sec) {
      state.kids = state.kids || { stars: {}, stickers: {}, words: {} };
      const t = state.kids.time && state.kids.time.day === dayKey() ? state.kids.time : { day: dayKey(), sec: 0, extra: 0 };
      t.sec += sec;
      state.kids.time = t;
      save();
    },
    kidsAddExtra(min) { this.kidsAddTime(0); state.kids.time.extra = (state.kids.time.extra || 0) + min; save(); },
    // Daily treasure: once a day, after finishing something, a chest gives a bonus sticker.
    // No streak to lose: the count of treasure days only ever grows.
    get kidsTreasure() {
      const k = state.kids || {}, tr = k.treasure || { day: null, items: [], days: 0 };
      const today = dayKey();
      return { ready: k.played === today && tr.day !== today, opened: tr.day === today, items: tr.items || [], days: tr.days || 0 };
    },
    kidsOpenTreasure(item) {
      const k = state.kids;
      if (!k || k.played !== dayKey()) return false;
      k.treasure = k.treasure || { day: null, items: [], days: 0 };
      if (k.treasure.day === dayKey()) return false;
      k.treasure.day = dayKey();
      k.treasure.days = (k.treasure.days || 0) + 1;
      k.treasure.items.push(item);
      state.xp += 15;
      save();
      return true;
    },

    box,
    isSeen: id => box(id) >= 1,
    isMastered: id => box(id) >= MASTERED_BOX,

    // Flashcard "again": back to the first box and due now, without counting as a mistake
    again(id) {
      const s = state.words[id] || {};
      state.words[id] = Object.assign(s, { box: 1, due: Date.now() });
      touchDay();
      save();
    },

    markSeen(id) {
      if (!state.words[id]) { state.words[id] = { box: 1, due: Date.now() }; save(); }
    },

    answer(id, correct) {
      const cur = box(id);
      const next = correct ? Math.min(Math.max(cur, 1) + 1, INTERVALS.length - 1) : 1;
      // misses counts every wrong answer, so words that keep slipping can be practised on their own
      const misses = ((state.words[id] && state.words[id].misses) || 0) + (correct ? 0 : 1);
      state.words[id] = { box: next, due: Date.now() + INTERVALS[next] * DAY };
      if (misses) state.words[id].misses = misses;
      if (correct) state.xp += 10;
      touchDay();
      state.daily.count++;
      const today = dayKey();
      state.history = state.history || {};
      state.history[today] = (state.history[today] || 0) + 1;
      const oldest = dayKey(new Date(Date.now() - 60 * DAY));
      Object.keys(state.history).forEach(k => { if (k < oldest) delete state.history[k]; });
      save();
    },

    // Learned words whose review time has come
    dueWords: () => ALL_WORDS.filter(w => state.words[w.id] && state.words[w.id].due <= Date.now()),

    // The last n days, oldest first: [{ date, count, today }] (history is kept for 60 days)
    days(len) {
      const h = state.history || {};
      return Array.from({ length: len }, (_, n) => {
        const date = new Date(Date.now() - (len - 1 - n) * DAY);
        let count = h[dayKey(date)] || 0;
        // answers given today before this chart existed are already in the daily counter
        if (n === len - 1 && state.daily.date === dayKey()) count = Math.max(count, state.daily.count || 0);
        return { date, count, today: n === len - 1 };
      });
    },
    week() { return this.days(7); },

    // Tricky words: missed at least twice and not yet learned. Once learned they leave the list.
    trickyWords: () => ALL_WORDS.filter(w => {
      const s = state.words[w.id];
      return s && (s.misses || 0) >= 2 && s.box < MASTERED_BOX;
    }),

    unitProgress(unit) {
      const seen = unit.words.filter(w => box(w.id) >= 1).length;
      const mastered = unit.words.filter(w => box(w.id) >= MASTERED_BOX).length;
      return { seen, mastered, total: unit.words.length, pct: Math.round((mastered / unit.words.length) * 100) };
    },

    reset() { const lang = state.lang; state = fresh(); state.lang = lang; save(); },

    // Backup: everything in one JSON text, tagged so a wrong file is recognised
    exportData() {
      return JSON.stringify({ app: 'lingua', version: 1, savedAt: new Date().toISOString(), state }, null, 1);
    },
    // Reads a backup made by exportData. Throws on anything else and leaves the progress untouched.
    // The interface language stays as it is now.
    importData(text) {
      const d = JSON.parse(text);
      const s = d && d.state;
      if (!d || d.app !== 'lingua' || !s || typeof s.words !== 'object' || Array.isArray(s.words)) throw new Error('not a Lingua backup');
      const lang = state.lang;
      state = Object.assign(fresh(), s);
      state.lang = lang;
      save();
      return { words: Object.keys(state.words).length, savedAt: d.savedAt };
    }
  };
})();
