// Progress saved on the device (localStorage) + simple spaced repetition (Leitner boxes).
const Store = (() => {
  const KEY = 'english-app-v1';
  const DAY = 24 * 60 * 60 * 1000;
  // Days until the next review, by box (0 = not learned yet)
  const INTERVALS = [0, 0, 1, 3, 7, 14];
  const MASTERED_BOX = 3;

  const fresh = () => ({
    words: {}, grammar: {}, xp: 0, streak: 0, best: 0, lastDay: null,
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

    // Grammar rules whose practice was passed
    isGrammarDone: id => !!(state.grammar && state.grammar[id]),
    markGrammar(id) { state.grammar = state.grammar || {}; state.grammar[id] = true; save(); },

    box,
    isSeen: id => box(id) >= 1,
    isMastered: id => box(id) >= MASTERED_BOX,

    markSeen(id) {
      if (!state.words[id]) { state.words[id] = { box: 1, due: Date.now() }; save(); }
    },

    answer(id, correct) {
      const cur = box(id);
      const next = correct ? Math.min(Math.max(cur, 1) + 1, INTERVALS.length - 1) : 1;
      state.words[id] = { box: next, due: Date.now() + INTERVALS[next] * DAY };
      if (correct) state.xp += 10;
      touchDay();
      state.daily.count++;
      save();
    },

    // Learned words whose review time has come
    dueWords: () => ALL_WORDS.filter(w => state.words[w.id] && state.words[w.id].due <= Date.now()),

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
