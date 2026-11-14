// Kids world: a playful track for young children (about 4–9).
// How young children learn a language: by hearing a word many times, linking it to a picture,
// and playing with it. So every activity here is picture-first and sound-first, needs no reading,
// and never punishes a mistake: a wrong tap just wiggles and the child tries again.
// Screens: #/kids (island map), #/kids/play/<island> (a short session), #/kids/stickers (album).
const Kids = (() => {
  let K = null;            // helpers shared by app.js (speak, Feel, confetti, view…), set in init()
  const $ = sel => K.view.querySelector(sel);

  // ---------- texts ----------
  const STR = {
    he: {
      title: 'עולם הילדים', hi: 'היי! בוא נשחק באנגלית 🎈', pick: 'בחרו אי ונתחיל לשחק!',
      stars: 'כוכבים', stickers: 'מדבקות', album: 'אלבום המדבקות', albumSub: 'כל אי שמסיימים נותן מדבקה חדשה',
      locked: 'סיימו את האי הקודם כדי לפתוח', start: 'יאללה!', again: 'עוד פעם', map: 'למפה',
      meet: 'הכירו את המילים', meetTip: 'לחצו על התמונה כדי לשמוע שוב', tap: 'מצאו את התמונה', tapTip: 'הקשיבו ולחצו על התמונה הנכונה',
      match: 'משחק הזיכרון', matchTip: 'מצאו זוגות: תמונה ומילה', next: 'הבא', listen: 'הקשיבו',
      done: 'כל הכבוד!', newSticker: 'מדבקה חדשה!', best: 'שיא חדש!', backToMap: 'חזרה למפה',
      tryAgain: 'כמעט! נסו שוב', great: ['מעולה!', 'יופי!', 'אלוף!', 'נהדר!', 'וואו!'],
      words: '{n} מילים', island: 'אי {n}', nextIsland: 'האי הבא נפתח!',
      pop: 'פוצצו את הבלון', popTip: 'הקשיבו ופוצצו את הבלון הנכון', sayPop: 'פוצצו את הבלון של',
      abc: 'ABC: האותיות', abcSub: '26 אותיות, לכל אחת מילה ותמונה', abcGame: 'משחק האותיות', abcFind: 'מצאו את האות',
      abcTip: 'לחצו על אות כדי לשמוע אותה', letterTip: 'הקשיבו ולחצו על האות הנכונה', isFor: '{L} כמו {word}', sayAbcFind: 'איפה האות',
      say: 'עכשיו תגידו!', sayTip: 'לחצו על המיקרופון ואמרו את המילה באנגלית', listening: 'מקשיב…',
      sayGood: ['שמעתי! מעולה!', 'איזה יופי של אנגלית!', 'בדיוק ככה!'], sayRetry: 'בואו ננסה עוד פעם 🙂', sayTry: 'ניסיון יפה! ממשיכים',
      skip: 'דלג', sayHe: 'עכשיו אתם! תגידו',
      chest: 'האוצר של היום', chestLocked: 'שחקו באי אחד כדי לפתוח את האוצר', chestReady: 'האוצר מוכן! לחצו לפתוח',
      chestOpened: 'נפתח היום! חזרו מחר לאוצר חדש', chestGot: 'מצאתם מדבקה!', chestDays: '☀️ {n} ימי אוצר', treasure: 'מדבקות אוצר',
      parents: 'להורים', gateTitle: 'רק להורים', gateText: 'כדי להמשיך, בחרו את התשובה הנכונה:', gateWrong: 'לא נכון, נסו שוב',
      cancel: 'ביטול', pcTitle: 'פינת ההורים', pcWords: 'מילים שהילד זיהה', pcIslands: 'איים שהושלמו', pcStars: 'כוכבים',
      pcTreasure: 'ימי אוצר', pcToday: 'זמן משחק היום', pcMin: '{n} דק׳', pcLimit: 'הגבלת זמן יומית', pcOff: 'בלי',
      pcMode: 'מצב ילדים', pcModeText: 'שאר האפליקציה (דקדוק, לימוד, התקדמות) ומעבר השפה נעולים מאחורי שאלה להורים',
      pcPer: 'התקדמות לפי אי', pcBack: 'חזרה לעולם הילדים', pcTip: 'טיפ: 10–15 דקות ביום, כמה פעמים בשבוע, עובדות הכי טוב לילדים צעירים. שבו לידם ושחקו יחד!',
      restTitle: 'הגיע זמן לנוח!', restText: 'שיחקתם יפה היום. הינשוף הולך לישון, נתראה מחר!', restMore: 'עוד 10 דקות (להורים)',
      wardrobe: 'המלתחה של הינשוף', wardSub: 'אספו כוכבים כדי לפתוח עוד בגדים וצבעים', colors: 'צבע', things: 'אביזרים',
      needStars: 'צריך {n} ★', owlLooks: 'איזה ינשוף יפה!',
      stories: 'סיפורים', storiesSub: 'סיפורים קצרים עם תמונות, לקרוא ולשמוע', storyLocked: 'סיימו את האי {name} כדי לפתוח',
      readAgain: 'עוד פעם', storyTap: 'לחצו על מילה כדי לשמוע אותה', storyQ: 'שאלה קטנה', theEnd: 'הסוף!',
      garden: 'הגינה שלי', gardenSub: 'כל מילה שלמדתם היא צמח. השקו אותו כדי שיגדל!', thirsty: '💧 {n} צמאים',
      gardenEmpty: 'הגינה עוד ריקה. שחקו באי, וכל מילה שתלמדו תהפוך לצמח!', water: 'להשקות את הגינה', allWet: 'כל הצמחים שתו! חזרו מחר',
      watered: 'הגינה שתתה!', grew: '{n} צמחים גדלו',
      drag: 'גררו את המילה לתמונה', dragTip: 'גררו כל מילה לתמונה שלה (או לחצו על מילה ואז על התמונה)',
      sayDrag: 'גררו כל מילה לתמונה שלה',
      songs: 'שירים', songsSub: 'שרים ומדקלמים יחד עם הינשוף', listenSong: 'הקשיבו', singAlong: 'שירו איתי', singTip: 'עכשיו אתם! הינשוף שר בשקט',
      stop: 'עצור',
      sfx: 'צלילי משחק',
      trace: 'ציירו את האות', traceTip: 'עברו עם האצבע על האות', traceSmall: 'עכשיו האות הקטנה!', clear: 'מחק',
      sound: 'הצליל', traceBtn: 'לצייר',
      today: 'משחקים היום!', todaySub: '{n} תחנות: {list}', advNext: 'לתחנה הבאה', advStep: 'תחנה {a} מתוך {b}',
      advDone: 'סיימתם את ההרפתקה של היום!', advDoneSub: 'איזה כיף! הינשוף גאה בכם.', advTreasure: 'יש אוצר שמחכה לכם במפה 🎁',
      stWater: 'גינה', stIsland: 'אי', stStory: 'סיפור', stAbc: 'אותיות',
      who: 'מי משחק עכשיו?', addKid: 'ילד נוסף', kidName: 'שם (לא חובה)', pickFace: 'בחרו פרצוף', save: 'שמירה',
      addGate: 'הוספת ילד היא להורים', player: 'שחקן',
      owlHi: 'הינשוף',
      wotd: 'התמונה של היום', wotdTap: 'לחצו לשמוע', wotdPlanted: 'נשתלה בגינה שלכם 🌱',
      riddles: 'מי אני?', riddlesSub: 'חידות קטנות: הקשיבו ונחשו', riddleQ: 'מי אני?', riddleTip: 'הקשיבו לרמזים ובחרו תמונה',
      sayFind: 'איפה', sayMeet: 'בואו נכיר מילים חדשות', sayMatch: 'מצאו את הזוגות'
    },
    en: {
      title: 'Kids world', hi: "Hi! Let's play in English 🎈", pick: 'Pick an island to play!',
      stars: 'stars', stickers: 'stickers', album: 'Sticker album', albumSub: 'Every island you finish gives a new sticker',
      locked: 'Finish the island before to open it', start: "Let's go!", again: 'Play again', map: 'Map',
      meet: 'Meet the words', meetTip: 'Tap the picture to hear it again', tap: 'Find the picture', tapTip: 'Listen and tap the right picture',
      match: 'Memory game', matchTip: 'Find pairs: a picture and its word', next: 'Next', listen: 'Listen',
      done: 'Great job!', newSticker: 'New sticker!', best: 'New best!', backToMap: 'Back to the map',
      tryAgain: 'Almost! Try again', great: ['Great!', 'Super!', 'Yes!', 'Awesome!', 'Wow!'],
      words: '{n} words', island: 'Island {n}', nextIsland: 'The next island is open!',
      pop: 'Pop the balloon', popTip: 'Listen and pop the right balloon', sayPop: 'Pop the',
      abc: 'ABC: the letters', abcSub: '26 letters, each with a word and a picture', abcGame: 'Letter game', abcFind: 'Find the letter',
      abcTip: 'Tap a letter to hear it', letterTip: 'Listen and tap the right letter', isFor: '{L} is for {word}', sayAbcFind: 'Find the letter',
      say: 'Now you say it!', sayTip: 'Tap the microphone and say the word', listening: 'Listening…',
      sayGood: ['I heard you! Great!', 'Lovely English!', 'Just like that!'], sayRetry: "Let's try once more 🙂", sayTry: 'Nice try! Let’s go on',
      skip: 'Skip', sayHe: 'Now you! Say',
      chest: "Today's treasure", chestLocked: 'Play one island to open the treasure', chestReady: 'The treasure is ready! Tap to open',
      chestOpened: 'Opened today! Come back tomorrow for a new one', chestGot: 'You found a sticker!', chestDays: '☀️ {n} treasure days', treasure: 'Treasure stickers',
      parents: 'For parents', gateTitle: 'Grown-ups only', gateText: 'To go on, pick the right answer:', gateWrong: 'Not quite, try again',
      cancel: 'Cancel', pcTitle: 'Parent corner', pcWords: 'Words recognised', pcIslands: 'Islands finished', pcStars: 'Stars',
      pcTreasure: 'Treasure days', pcToday: 'Play time today', pcMin: '{n} min', pcLimit: 'Daily time limit', pcOff: 'Off',
      pcMode: 'Kids mode', pcModeText: 'The rest of the app (grammar, learn, progress) and the language switch need a grown-up answer',
      pcPer: 'Progress by island', pcBack: 'Back to the kids world', pcTip: 'Tip: 10–15 minutes a day, a few times a week, works best for young children. Sit with them and play together!',
      restTitle: 'Time to rest!', restText: 'You played so well today. The owl is going to sleep, see you tomorrow!', restMore: '10 more minutes (grown-ups)',
      wardrobe: "The owl's wardrobe", wardSub: 'Collect stars to open more clothes and colours', colors: 'Colour', things: 'Things to wear',
      needStars: 'Needs {n} ★', owlLooks: 'What a lovely owl!',
      stories: 'Stories', storiesSub: 'Short picture stories to read and hear', storyLocked: 'Finish the {name} island to open',
      readAgain: 'Again', storyTap: 'Tap a word to hear it', storyQ: 'A little question', theEnd: 'The end!',
      garden: 'My garden', gardenSub: 'Every word you learned is a plant. Water it so it grows!', thirsty: '💧 {n} thirsty',
      gardenEmpty: 'The garden is empty for now. Play an island and every word you learn becomes a plant!', water: 'Water the garden', allWet: 'Every plant had a drink! Come back tomorrow',
      watered: 'The garden had a drink!', grew: '{n} plants grew',
      drag: 'Drag the word to its picture', dragTip: 'Drag each word onto its picture (or tap a word, then the picture)',
      sayDrag: 'Drag each word to its picture',
      songs: 'Songs', songsSub: 'Sing and chant with the owl', listenSong: 'Listen', singAlong: 'Sing along', singTip: 'Your turn! The owl sings quietly',
      stop: 'Stop',
      sfx: 'Game sounds',
      trace: 'Trace the letter', traceTip: 'Trace over the letter with your finger', traceSmall: 'Now the small letter!', clear: 'Clear',
      sound: 'Sound', traceBtn: 'Trace',
      today: 'Play today!', todaySub: '{n} stops: {list}', advNext: 'Next stop', advStep: 'Stop {a} of {b}',
      advDone: "You finished today's adventure!", advDoneSub: 'So much fun! The owl is proud of you.', advTreasure: 'A treasure is waiting on the map 🎁',
      stWater: 'garden', stIsland: 'island', stStory: 'story', stAbc: 'letters',
      who: "Who's playing?", addKid: 'Add a child', kidName: 'Name (optional)', pickFace: 'Pick a face', save: 'Save',
      addGate: 'Adding a child is for grown-ups', player: 'Player',
      owlHi: 'The owl',
      wotd: 'Picture of the day', wotdTap: 'Tap to hear it', wotdPlanted: 'Planted in your garden 🌱',
      riddles: 'Who am I?', riddlesSub: 'Little riddles: listen and guess', riddleQ: 'Who am I?', riddleTip: 'Listen to the clues and pick a picture',
      sayFind: 'Find the', sayMeet: "Let's meet new words", sayMatch: 'Find the pairs'
    }
  };
  const kt = (key, vars = {}) => {
    const v = STR[isHe() ? 'he' : 'en'][key];
    return typeof v === 'string' ? v.replace(/\{(\w+)\}/g, (_, n) => vars[n]) : v;
  };
  const pickOne = arr => arr[Math.floor(Math.random() * arr.length)];
  const themeName = th => (isHe() ? th.he : th.title);
  const theme = id => KIDS_THEMES.find(th => th.id === id);

  // ---------- speech: English words, Hebrew instructions (when the device has a Hebrew voice) ----------
  let heVoice = null, enVoice = null;
  function voices() {
    if (!('speechSynthesis' in window)) return;
    const all = speechSynthesis.getVoices();
    heVoice = all.find(v => /^(he|iw)[-_]/i.test(v.lang)) || null;
    const en = all.filter(v => /^en[-_]/i.test(v.lang));
    enVoice = en.find(v => /en[-_]US/i.test(v.lang) && /Samantha/i.test(v.name)) || en.find(v => /en[-_]US/i.test(v.lang)) || en[0] || null;
  }
  if ('speechSynthesis' in window) { voices(); speechSynthesis.addEventListener('voiceschanged', voices); }
  // parts: [['he', 'איפה'], ['en', 'cat']]; Hebrew parts are skipped when there is no Hebrew voice
  function say(parts, rate = 0.8) {
    if (!('speechSynthesis' in window)) return;
    if (!enVoice) voices();
    speechSynthesis.cancel();
    parts.forEach(([lang, text]) => {
      if (lang === 'he' && !heVoice) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'he' ? 'he-IL' : 'en-US';
      const v = lang === 'he' ? heVoice : enVoice;
      if (v) u.voice = v;
      u.rate = lang === 'he' ? 1 : rate;
      u.pitch = 1.1;   // a little brighter, friendlier for children
      speechSynthesis.speak(u);
    });
  }
  const sayEn = (text, rate) => say([['en', text]], rate);

  // A soft "pop" for a balloon: a short falling tone and a puff of noise (quiet; silence is fine too)
  let actx = null;
  function popSound() {
    if (!Store.kidsSfx) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      const now = actx.currentTime;
      const osc = actx.createOscillator(), g = actx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + .12);
      g.gain.setValueAtTime(.18, now);
      g.gain.exponentialRampToValueAtTime(.0001, now + .15);
      osc.connect(g).connect(actx.destination);
      osc.start(now); osc.stop(now + .16);
      const len = Math.floor(actx.sampleRate * .08), buf = actx.createBuffer(1, len, actx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
      const n = actx.createBufferSource(), ng = actx.createGain();
      n.buffer = buf; ng.gain.value = .12;
      n.connect(ng).connect(actx.destination);
      n.start(now);
    } catch (e) { /* no sound is fine */ }
  }
  // ---------- listening (speech recognition), where the browser has it ----------
  const Rec = () => window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null;
  function stopRec() { if (rec) { try { rec.abort(); } catch (e) {} rec = null; } }
  // Children's speech is often recognised as a similar word, so be generous:
  // the word itself, or a word at most 1 letter off (2 for long words), or the same start
  const clean = x => x.toLowerCase().replace(/[^a-z ]/g, '').trim();
  function dist(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  function closeEnough(target, heard) {
    const t = clean(target).replace(/\s+/g, ' '), h = clean(heard);
    if (!h) return false;
    if (h.includes(t)) return true;
    if (t.includes(' ')) {   // a phrase: most of its words, each a little off at most
      const want = t.split(' '), got = h.split(' ');
      const found = want.filter(x => got.some(y => y === x || (x.length >= 4 && dist(x, y) <= 1))).length;
      return found >= Math.ceil(want.length * 0.6);
    }
    const words = h.split(' ');
    const allow = t.length >= 6 ? 2 : 1;
    return words.some(x => dist(t, x) <= allow || (t.length >= 4 && x.length >= 3 && t.slice(0, 3) === x.slice(0, 3))) || dist(t, h) <= allow;
  }

  // ---------- game sounds: soft, short and quiet (a tap, a flip, a sparkle, a happy jingle) ----------
  const Sfx = (() => {
    function tone(freq, at, len, vol = .08, type = 'sine', slide = 0) {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      const t = actx.currentTime + at, o = actx.createOscillator(), g = actx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t);
      if (slide) o.frequency.exponentialRampToValueAtTime(freq * slide, t + len);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + .008);
      g.gain.exponentialRampToValueAtTime(.0001, t + len);
      o.connect(g).connect(actx.destination);
      o.start(t); o.stop(t + len + .02);
    }
    const play = fn => { if (!Store.kidsSfx) return; try { fn(); } catch (e) { /* no sound is fine */ } };
    return {
      tap: () => play(() => tone(660, 0, .07, .05, 'triangle', 1.4)),
      flip: () => play(() => tone(420, 0, .12, .06, 'triangle', 1.8)),
      whoosh: () => play(() => tone(300, 0, .22, .04, 'sine', 3)),
      // a little "ta-da": four rising notes and a bright chord
      jingle: () => play(() => {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * .11, .25, .07, 'triangle'));
        [1046.5, 1318.5, 1568].forEach(f => tone(f, .46, .6, .045, 'sine'));
      }),
      star: n => play(() => tone(880 * Math.pow(1.26, n), 0, .3, .06, 'sine'))
    };
  })();

  // after any celebration, the owl on the end card claps and sends hearts
  const celebrate = () => { K.confetti('kids'); Sfx.jingle(); owlMood('clap'); setTimeout(() => owlMood('love'), 900); };
  const BALLOONS = ['#ff5d8f', '#3fa7ff', '#ffc93c', '#2fd093', '#b98cff'];

  // ---------- the owl buddy ----------
  // The owl as the child dressed it: its colour behind it and the chosen accessory on top
  function owlAv(look = Store.kidsOwl, cls = '') {
    const col = (KIDS_OWL_COLORS.find(x => x.id === look.color) || KIDS_OWL_COLORS[0]).c;
    const acc = KIDS_OWL_ACC.find(x => x.id === look.acc && x.id);
    return `<span class="k-av ${cls}" style="--oc:${col}"><img src="icons/owl-192.png" alt="" width="64" height="64">${acc ? `<i class="k-acc k-acc-${acc.id}" aria-hidden="true">${acc.pic}</i>` : ''}</span>`;
  }
  const owl = (text, mood = '') => `
    <div class="k-owl ${mood}">
      ${owlAv()}
      <div class="k-bubble" role="status">${text}</div>
    </div>`;
  // Owl moods: the buddy reacts with a little move and a floating emoji.
  // cheer = hop + 🎉, think = head tilt + 💭 (never sad: a miss is just thinking), clap = 👏, love = 💖, giggle = wiggle + 😄
  const MOOD_PIC = { cheer: ['🎉', '⭐', '✨'], think: ['💭', '🤔'], clap: ['👏'], love: ['💖', '💕'], giggle: ['😄', '🎵'] };
  function owlMood(mood, root = K.view) {
    const o = root.querySelector('.k-owl, .k-end-owl');
    if (!o) return;
    o.classList.remove('mood-cheer', 'mood-think', 'mood-clap', 'mood-love', 'mood-giggle', 'happy');
    void o.offsetWidth;
    o.classList.add('mood-' + mood);
    const av = o.querySelector('.k-av');
    if (!av) return;
    const pics = MOOD_PIC[mood] || MOOD_PIC.cheer;
    pics.forEach((pic, i) => {
      const f = document.createElement('i');
      f.className = 'k-mood-pop';
      f.setAttribute('aria-hidden', 'true');
      f.textContent = pic;
      f.style.setProperty('--dx', ((i - (pics.length - 1) / 2) * 26) + 'px');
      f.style.animationDelay = (i * .12) + 's';
      av.appendChild(f);
      setTimeout(() => f.remove(), 1600);
    });
  }
  // Tap-along tutorial: the first time a game type appears, a pointing hand shows what to do
  // (tap here, or move from here to there), so a child who can't read doesn't need a grown-up.
  // It goes away at the first touch, or after a few seconds, and never comes back for that game.
  const clearHands = () => document.querySelectorAll('.k-hand').forEach(h => h.remove());
  function coach(kind, from, to) {
    if (Store.kidsTipSeen(kind)) return;
    clearHands();
    const a = typeof from === 'string' ? $(from) : from, b = typeof to === 'string' ? $(to) : to;
    if (!a) return;
    Store.kidsTipDone(kind);
    const c = r => [r.left + r.width / 2, r.top + r.height / 2];
    const [x1, y1] = c(a.getBoundingClientRect()), [x2, y2] = b ? c(b.getBoundingClientRect()) : [x1, y1];
    const hand = document.createElement('div');
    hand.className = 'k-hand ' + (b ? 'move' : 'tap');
    hand.setAttribute('aria-hidden', 'true');
    hand.textContent = '👆';
    hand.style.left = x1 + 'px';
    hand.style.top = y1 + 'px';
    hand.style.setProperty('--dx', (x2 - x1) + 'px');
    hand.style.setProperty('--dy', (y2 - y1) + 'px');
    document.body.appendChild(hand);
    const bye = () => { hand.remove(); document.removeEventListener('pointerdown', bye, true); window.removeEventListener('hashchange', bye); };
    document.addEventListener('pointerdown', bye, true);
    window.addEventListener('hashchange', bye);
    setTimeout(bye, 4200);
  }
  const endOwl = () => `<div class="k-end-owl">${owlAv()}</div>`;
  const starsHtml = (n, cls = '') => `<span class="k-stars ${cls}" aria-label="${n} / 3">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}">★</i>`).join('')}</span>`;

  // Two islands are open at the start; every finished island opens one more
  const isOpen = i => i <= Store.kidsStickerCount + 1;

  // ---------- island map ----------
  function map() {
    K.endLesson();
    const me = Store.kidsProfiles.find(p => p.active);
    const next = KIDS_THEMES.findIndex((th, i) => isOpen(i) && !Store.kidsHasSticker(th.id));
    K.view.innerHTML = `
      <div class="k-wrap">
        <div class="k-head">
          <div class="k-owl">
            <span class="k-owl-link"><button class="k-owl-tap" id="k-owl-tap" aria-label="${kt('owlHi')}">${owlAv()}</button>
              <a class="k-owl-edit" href="#/kids/owl" aria-label="${kt('wardrobe')}">👕</a></span>
            <div class="k-bubble" role="status">${Store.kidsStickerCount ? kt('pick') : kt('hi')}</div>
          </div>
          <div class="k-chips">
            <button class="k-chip k-face" id="k-face" aria-label="${kt('who')}">${me.face}${me.name ? ` <b>${esc(me.name)}</b>` : ''}</button>
            <button class="k-chip k-sfx" id="k-sfx" aria-pressed="${Store.kidsSfx}" aria-label="${kt('sfx')}">${Store.kidsSfx ? '🔊' : '🔇'}</button>
            <span class="k-chip star"><b>★ ${Store.kidsTotalStars}</b> ${kt('stars')}</span>
            <a class="k-chip sticker" href="#/kids/stickers"><b>🎁 ${Store.kidsStickerCount}/${KIDS_THEMES.length}</b> ${kt('stickers')}</a>
          </div>
        </div>
        <h1 class="sr-only">${kt('title')}</h1>
        ${(() => {
          const plan = todayPlan();
          return `<a class="k-today" href="#/kids/today/start">
            <span class="k-today-go" aria-hidden="true">🚀</span>
            <span class="grow"><b>${kt('today')}</b><small>${kt('todaySub', { n: plan.length, list: plan.map(p => p.icon).join(' ') })}</small></span>
            <span class="k-today-arrow" aria-hidden="true">${isHe() ? '‹' : '›'}</span>
          </a>`;
        })()}
        ${chestCard()}
        ${wotdCard()}
        <div class="k-tiles">
        ${(() => {
          const g = Store.kidsGarden(), dry = g.filter(p => p.thirsty).length;
          return `<a class="k-abc-card k-garden-card ${dry ? 'dry' : ''}" href="#/kids/garden">
            <span class="k-story-books" aria-hidden="true">🌻</span>
            <span class="grow"><b>${kt('garden')}</b><small>${g.length ? kt('gardenSub') : kt('gardenEmpty')}</small></span>
            ${dry ? `<span class="k-story-count k-drops">${kt('thirsty', { n: dry })}</span>` : ''}
          </a>`;
        })()}
        <a class="k-abc-card k-story-card" href="#/kids/stories">
          <span class="k-story-books" aria-hidden="true">📚</span>
          <span class="grow"><b>${kt('stories')}</b><small>${kt('storiesSub')}</small></span>
          <span class="k-story-count">${KIDS_STORIES.filter(st => Store.kidsHasSticker('st-' + st.id)).length}/${KIDS_STORIES.length}</span>
        </a>
        <a class="k-abc-card" href="#/kids/abc">
          <span class="k-abc-letters" aria-hidden="true"><b>A</b><b>B</b><b>C</b></span>
          <span class="grow"><b>${kt('abc')}</b><small>${kt('abcSub')}</small></span>
          ${Store.kidsHasSticker('abc') ? starsHtml(Store.kidsStars('abc'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-riddle-card" href="#/kids/riddles">
          <span class="k-story-books" aria-hidden="true">🕵️</span>
          <span class="grow"><b>${kt('riddles')}</b><small>${kt('riddlesSub')}</small></span>
          ${Store.kidsHasSticker('riddles') ? starsHtml(Store.kidsStars('riddles'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-songs-card" href="#/kids/songs">
          <span class="k-story-books" aria-hidden="true">🎵</span>
          <span class="grow"><b>${kt('songs')}</b><small>${kt('songsSub')}</small></span>
        </a>
        </div>
        <ol class="k-map">
          ${KIDS_THEMES.map((th, i) => {
            const open = isOpen(i), done = Store.kidsHasSticker(th.id), cur = i === next;
            return `
            <li class="k-isle ${i % 2 ? 'r' : 'l'} ${open ? '' : 'locked'} ${done ? 'done' : ''} ${cur ? 'cur' : ''}" style="--c:${th.color}">
              <a ${open ? `href="#/kids/play/${th.id}"` : 'role="link" aria-disabled="true"'} class="k-isle-btn" data-i="${i}"
                 aria-label="${themeName(th)}${open ? '' : ', ' + kt('locked')}">
                <span class="k-isle-pic" aria-hidden="true">${open ? th.pic : '🔒'}</span>
                ${cur ? `<span class="k-go" aria-hidden="true">${kt('start')}</span>` : ''}
              </a>
              <span class="k-isle-name">${themeName(th)}</span>
              ${done ? starsHtml(Store.kidsStars(th.id), 'sm') : `<span class="k-isle-sub">${kt('words', { n: th.words.length })}</span>`}
            </li>`;
          }).join('')}
        </ol>
        <button class="k-parents" id="k-parents"><span aria-hidden="true">👪</span> ${kt('parents')}</button>
      </div>`;
    $('#k-parents').onclick = () => gate(() => { location.hash = '#/kids/parents'; });
    $('#k-face').onclick = whoSheet;
    $('#k-owl-tap').onclick = () => { owlMood(pickOne(['giggle', 'love', 'cheer'])); sayEn(pickOne(['Hoo hoo!', 'Hello friend!', "Let's play!"])); };
    $('#k-sfx').onclick = () => {
      Store.kidsSfx = !Store.kidsSfx;
      $('#k-sfx').textContent = Store.kidsSfx ? '🔊' : '🔇';
      $('#k-sfx').setAttribute('aria-pressed', String(Store.kidsSfx));
      Sfx.tap();
    };
    const wotdBtn = $('#k-wotd');
    if (wotdBtn) wotdBtn.onclick = () => {
      const w = KIDS_WORDS.find(x => x.id === wotdBtn.dataset.id);
      sayEn(w.en);
      wotdBtn.classList.remove('boing'); void wotdBtn.offsetWidth; wotdBtn.classList.add('boing');
      if (!Store.kidsWordCount(w.id)) {
        Store.kidsWordRight(w.id);   // heard and seen: it becomes a plant in the garden
        wotdBtn.querySelector('small').textContent = kt('wotdPlanted');
        wotdBtn.classList.add('planted');
        owlMood('love');
        Sfx.star(2);
      }
    };
    const chest = $('#k-chest');
    if (chest) chest.onclick = () => openChest(chest);
    K.view.querySelectorAll('.k-isle.locked .k-isle-btn').forEach(a => {
      a.onclick = e => {
        e.preventDefault();
        K.Feel.wrong(a);
        const bub = $('.k-bubble');
        if (bub) bub.textContent = '🔒 ' + kt('locked');
      };
    });
    const cur = $('.k-isle.cur');
    if (cur) setTimeout(() => cur.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }), 60);
  }

  // ---------- review garden ----------
  const PLANT = ['', '🌱', '🌿', '🌷', '🌻'];
  function garden(grown = []) {
    K.endLesson();
    const g = Store.kidsGarden(), dry = g.filter(p => p.thirsty);
    K.view.innerHTML = `
      <div class="k-wrap">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <h1 class="k-title">🌻 ${kt('garden')}</h1>
        <p class="k-sub">${g.length ? kt('gardenSub') : kt('gardenEmpty')}</p>
        ${g.length ? (dry.length
          ? `<a class="k-btn" href="#/kids/water">💧 ${kt('water')} (${Math.min(dry.length, 6)})</a>`
          : `<p class="k-allwet">✨ ${kt('allWet')}</p>`) : ''}
        <div class="k-garden">
          ${g.map(p => `
            <button class="k-plant ${p.thirsty ? 'thirsty' : ''} ${grown.includes(p.w.id) ? 'grew' : ''}" data-en="${p.w.en}" aria-label="${p.w.en}${p.thirsty ? ', 💧' : ''}">
              <span class="k-plant-grow" aria-hidden="true">${PLANT[p.lvl]}</span>
              <span class="k-pot" aria-hidden="true">${p.w.pic}</span>
              ${p.thirsty ? '<i class="k-drop" aria-hidden="true">💧</i>' : ''}
            </button>`).join('')}
        </div>
      </div>`;
    K.view.querySelectorAll('.k-plant').forEach(b => { b.onclick = () => sayEn(b.dataset.en); });
  }

  // Watering: up to 6 thirsty words as "find the picture"; a right first tap makes the plant grow
  function water() {
    const all = Store.kidsGarden();
    const due = K.shuffle(all.filter(p => p.thirsty)).slice(0, 6);
    if (!due.length) { location.hash = '#/kids/garden'; return; }
    document.body.classList.add('in-lesson');
    const pool = all.length >= 3 ? all.map(p => p.w) : KIDS_WORDS;
    const grown = [];
    let at = 0;
    function round() {
      K.lessonBar(at / due.length);
      const w = due[at].w;
      const opts = K.shuffle([w, ...K.shuffle(pool.filter(x => x !== w && x.pic !== w.pic)).slice(0, 2)]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">💧</span> ${kt('water')} · ${at + 1}/${due.length}</p>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}: ${w.en}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">${w.en}</span>
          </div>
          <div class="k-opts">${opts.map((o, i) => `<button class="k-opt" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span></button>`).join('')}</div>
          ${owl(kt('tapTip'), 'small')}
        </div>`;
      $('#k-say').onclick = () => sayEn(w.en);
      setTimeout(() => sayEn(w.en), 200);
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          if (opts[+b.dataset.i] === w) {
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            K.Feel.right();
            const before = due[at].lvl, after = Store.kidsWater(w.id, !missed);
            if (after > before) grown.push(w.id);
            $('.k-bubble').textContent = after > before ? `${PLANT[after]} ${pickOne(kt('great'))}` : pickOne(kt('great'));
            owlMood('cheer');
            sayEn(w.en);
            setTimeout(() => { at++; at < due.length ? round() : end(); }, 1200);
          } else {
            missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            $('.k-bubble').textContent = kt('tryAgain'); owlMood('think');
            setTimeout(() => sayEn(w.en), 350);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const fromAdv = adv && adv.steps[adv.at].hash === '#/kids/water';
      location.replace('#/kids/garden');   // back to the garden without a history step, plants that grew bounce
      setTimeout(() => {
        garden(grown);
        if (fromAdv) {
          const b = document.createElement('div');
          b.innerHTML = `<a class="k-btn k-adv-next" href="#/kids/today/next">${adv.steps[adv.at + 1] ? adv.steps[adv.at + 1].icon : '🏆'} ${kt('advNext')}<small>${kt('advStep', { a: adv.at + 1, b: adv.steps.length })}</small></a>`;
          $('.k-sub').after(b.firstChild);
          const old = $('.k-allwet, a.k-btn[href="#/kids/water"]');
          if (old) old.remove();
        }
        const head = $('.k-sub');
        if (head) head.textContent = `💧 ${kt('watered')}${grown.length ? ' ' + kt('grew', { n: grown.length }) + ' 🌱' : ''}`;
        celebrate();
        sayEn('Your garden is happy!', 0.9);
      }, 30);
    }
    round();
  }

  // ---------- "Who am I?" riddles ----------
  // 5 riddles: the clues are read aloud with the words lit up, then the child picks 1 of 3 pictures.
  function riddles() {
    document.body.classList.add('in-lesson');
    const set = K.shuffle(KIDS_RIDDLES.filter(r => r.w)).slice(0, 5);
    let at = 0, firstTry = 0;
    function round() {
      K.lessonBar(at / set.length);
      const r = set[at];
      const opts = K.shuffle([r.w, ...K.shuffle(KIDS_WORDS.filter(x => x !== r.w && x.pic !== r.w.pic)).slice(0, 2)]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🕵️</span> ${kt('riddleQ')} · ${at + 1}/${set.length}</p>
          <div class="k-card k-page k-riddle">
            <span class="k-riddle-q" aria-hidden="true">❓</span>
            <p class="k-sentence en" lang="en">${r.en.split(' ').map(w => `<button class="k-w">${w}</button>`).join(' ')}</p>
            <p class="k-he he" lang="he">${r.he}</p>
            <button class="k-speaker sm" id="k-say" aria-label="${kt('listen')}"><span aria-hidden="true">🔊</span></button>
          </div>
          <div class="k-opts">${opts.map((o, i) => `<button class="k-opt" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span></button>`).join('')}</div>
          ${owl(kt('riddleTip'), 'small')}
        </div>`;
      const words = [...K.view.querySelectorAll('.k-w')];
      words.forEach(w => { w.onclick = () => sayEn(w.textContent.replace(/[^A-Za-z']/g, '')); });
      const read = () => readAlong(r.en + ' Who am I?', words);
      $('#k-say').onclick = read;
      setTimeout(read, 300);
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          if (opts[+b.dataset.i] === r.w) {
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            K.Feel.right();
            if (!missed) firstTry++;
            Store.kidsWordRight(r.w.id);
            $('.k-bubble').textContent = `${r.w.pic} ${r.w.en}!`;
            owlMood('cheer');
            sayEn(`Yes! ${r.w.en}!`);   // not "I am a…": that breaks for apple, shoes, rain
            $('.k-riddle-q').textContent = r.w.pic;
            setTimeout(() => { at++; at < set.length ? round() : end(); }, 2200);
          } else {
            missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            $('.k-bubble').textContent = kt('tryAgain'); owlMood('think');
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= 5 ? 3 : firstTry >= 3 ? 2 : 1;
      const res = Store.kidsFinish('riddles', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
            ${res.better && !res.firstSticker ? `<b class="k-best">${kt('best')}</b>` : ''}
          </div>
          <a class="k-btn" href="#/kids">${kt('backToMap')}</a>
          <button class="k-btn ghost" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
        </div>`;
      celebrate();
      sayEn('You are a great detective!', 0.9);
      $('#k-again').onclick = riddles;
    }
    round();
  }

  // ---------- songs & chants ----------
  // Each word gets a marimba note (a simple tune going up and down the scale) and is sung by the
  // voice at the same moment, with its picture lit up and bouncing. "Sing along" plays the same
  // song with the voice quiet, so the child sings it.
  const SCALE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];   // C major pentatonic
  function note(freq, len = .35) {
    if (!Store.kidsSfx) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      const now = actx.currentTime, o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine';
      o.frequency.value = freq;
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(.16, now + .01);
      g.gain.exponentialRampToValueAtTime(.0001, now + len);
      o.connect(g).connect(actx.destination);
      o.start(now); o.stop(now + len + .02);
    } catch (e) { /* no sound is fine */ }
  }
  function songs() {
    K.endLesson();
    K.view.innerHTML = `
      <div class="k-wrap">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <h1 class="k-title">🎵 ${kt('songs')}</h1>
        <p class="k-sub">${kt('songsSub')}</p>
        <div class="k-books">
          ${KIDS_SONGS.map(sg => `
            <a class="k-book" href="#/kids/song/${sg.id}" style="--c:${sg.color}">
              <span class="k-book-pic" aria-hidden="true">${sg.pic}</span>
              <span class="k-book-title en">${sg.title}</span>
              <span class="k-book-he">${sg.he}</span>
            </a>`).join('')}
        </div>
      </div>`;
  }
  let songRun = 0;   // a newer play (or leaving the screen) stops the one before
  function song(id) {
    const sg = KIDS_SONGS.find(x => x.id === id);
    if (!sg) { location.hash = '#/kids/songs'; return; }
    K.endLesson();
    document.body.style.setProperty('--kc', sg.color);
    K.view.innerHTML = `
      <div class="k-wrap k-play">
        <a class="k-back" href="#/kids/songs"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('songs')}</a>
        <h1 class="k-title en">${sg.pic} ${sg.title}</h1>
        <div class="k-card k-song">
          ${sg.lines.map((line, r) => `<div class="k-song-line">${line.map(([w, pic], i) => `
            <button class="k-note" data-r="${r}" data-i="${i}"><span class="k-note-pic" aria-hidden="true">${pic}</span><span class="en">${w}</span></button>`).join('')}</div>`).join('')}
        </div>
        <div class="k-story-nav">
          <button class="k-btn ghost" id="k-sing">🎤 ${kt('singAlong')}</button>
          <button class="k-btn" id="k-play">🎵 ${kt('listenSong')}</button>
        </div>
        ${owl(kt('songsSub'), 'small')}
      </div>`;
    const notes = [...K.view.querySelectorAll('.k-note')];
    const flat = sg.lines.flatMap(l => l);
    const tune = flat.map((_, k) => SCALE[[0, 1, 2, 3, 4, 3, 2, 1][k % 8] + (k % 16 >= 8 ? 1 : 0)]);
    notes.forEach((b, k) => { b.onclick = () => { note(tune[k]); sayEn(flat[k][2] || flat[k][0]); b.classList.remove('hit'); void b.offsetWidth; b.classList.add('hit'); }; });
    const play = quiet => {
      const run = ++songRun;
      speechSynthesis.cancel();
      $('.k-bubble').textContent = quiet ? kt('singTip') : '🎶';
      let k = 0;
      const next = () => {
        if (run !== songRun || !document.body.contains(notes[0])) return;
        notes.forEach(n => n.classList.remove('lit'));
        if (k >= flat.length) { owlMood('cheer'); K.Feel.right(); return; }
        const b = notes[k], [w, , spoken] = flat[k];
        b.classList.add('lit');
        note(tune[k]);
        const u = new SpeechSynthesisUtterance((spoken || w).replace(/[!?,]/g, ''));
        u.lang = 'en-US';
        if (enVoice) u.voice = enVoice;
        u.rate = 0.9;
        u.pitch = 1.3;
        u.volume = quiet ? 0.25 : 1;
        const lineEnd = k + 1 < flat.length && notes[k + 1].dataset.r !== b.dataset.r;
        let moved = false;
        const go = () => { if (moved) return; moved = true; k++; setTimeout(next, lineEnd ? 450 : 120); };
        u.onend = go;
        setTimeout(go, 1600);   // never wait forever for a voice that doesn't answer
        if ('speechSynthesis' in window) speechSynthesis.speak(u); else setTimeout(go, 500);
      };
      next();
    };
    $('#k-play').onclick = () => play(false);
    $('#k-sing').onclick = () => play(true);
  }

  // ---------- picture stories ----------
  const storyOpen = st => !st.island || Store.kidsHasSticker(st.island);
  function stories() {
    K.endLesson();
    K.view.innerHTML = `
      <div class="k-wrap">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <h1 class="k-title">📚 ${kt('stories')}</h1>
        <p class="k-sub">${kt('storiesSub')}</p>
        <div class="k-books">
          ${KIDS_STORIES.map(st => {
            const open = storyOpen(st), read = Store.kidsHasSticker('st-' + st.id);
            const isle = st.island && theme(st.island);
            return `
            <a class="k-book ${open ? '' : 'locked'}" ${open ? `href="#/kids/story/${st.id}"` : 'role="link" aria-disabled="true"'}
               style="--c:${isle ? isle.color : '#ff9f43'}">
              <span class="k-book-pic" aria-hidden="true">${open ? st.pic : '🔒'}</span>
              <span class="k-book-title en">${st.title}</span>
              <span class="k-book-he">${open ? st.he : kt('storyLocked', { name: themeName(isle) })}</span>
              ${read ? starsHtml(Store.kidsStars('st-' + st.id), 'sm') : ''}
            </a>`;
          }).join('')}
        </div>
      </div>`;
    K.view.querySelectorAll('.k-book.locked').forEach(b => { b.onclick = e => { e.preventDefault(); K.Feel.wrong(b); }; });
  }

  // Read aloud with the word being said lit up (where the browser reports word boundaries)
  function readAlong(text, words, onEnd) {
    if (!('speechSynthesis' in window)) { if (onEnd) onEnd(); return; }
    if (!enVoice) voices();
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    if (enVoice) u.voice = enVoice;
    u.rate = 0.75;
    u.pitch = 1.1;
    const starts = [];
    text.replace(/[A-Za-z']+/g, (m, i) => { starts.push(i); return m; });
    const light = n => words.forEach((w, k) => w.classList.toggle('lit', k === n));
    u.onboundary = e => {
      if (e.name && e.name !== 'word') return;
      let n = starts.findIndex((s, k) => e.charIndex >= s && (k === starts.length - 1 || e.charIndex < starts[k + 1]));
      light(n);
    };
    u.onend = () => { light(-1); if (onEnd) onEnd(); };
    speechSynthesis.speak(u);
  }

  function story(id) {
    const st = KIDS_STORIES.find(x => x.id === id);
    if (!st || !storyOpen(st)) { location.hash = '#/kids/stories'; return; }
    document.body.classList.add('in-lesson');
    const total = st.pages.length + 1;
    let at = 0;
    function page() {
      K.lessonBar(at / total);
      const [scene, en, he] = st.pages[at];
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step en">${st.title} · ${at + 1}/${st.pages.length}</p>
          <div class="k-card k-page">
            <div class="k-scene" aria-hidden="true">${scene}</div>
            <p class="k-sentence en" lang="en">${en.split(' ').map(w => `<button class="k-w">${w}</button>`).join(' ')}</p>
            <p class="k-he he" lang="he">${he}</p>
          </div>
          <p class="k-tip">${kt('storyTap')}</p>
          <div class="k-story-nav">
            <button class="k-btn ghost" id="k-again">🔁 ${kt('readAgain')}</button>
            <button class="k-btn" id="k-next">${kt('next')} <span aria-hidden="true">${isHe() ? '←' : '→'}</span></button>
          </div>
        </div>`;
      const words = [...K.view.querySelectorAll('.k-w')];
      words.forEach(w => { w.onclick = () => { const t = w.textContent.replace(/[^A-Za-z']/g, ''); sayEn(t); w.classList.add('lit'); setTimeout(() => w.classList.remove('lit'), 600); }; });
      $('#k-again').onclick = () => readAlong(en, words);
      $('#k-next').onclick = () => { at++; at < st.pages.length ? page() : question(); };
      setTimeout(() => readAlong(en, words), 250);
    }
    function question() {
      K.lessonBar(st.pages.length / total);
      const [q, qhe, opts] = st.ask;
      const shown = K.shuffle(opts);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">❓</span> ${kt('storyQ')}</p>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}: ${q}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">${q}</span>
            <span class="k-qhe" lang="he">${qhe}</span>
          </div>
          <div class="k-opts">${shown.map((o, i) => `<button class="k-opt" data-i="${i}"><span aria-hidden="true">${o}</span></button>`).join('')}</div>
          ${owl(kt('tapTip'), 'small')}
        </div>`;
      $('#k-say').onclick = () => sayEn(q);
      setTimeout(() => sayEn(q), 250);
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          if (shown[+b.dataset.i] === opts[0]) {
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            K.Feel.right();
            $('.k-bubble').textContent = pickOne(kt('great'));
            owlMood('cheer');
            setTimeout(() => end(missed ? 2 : 3), 1200);
          } else {
            missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            $('.k-bubble').textContent = kt('tryAgain'); owlMood('think');
            setTimeout(() => sayEn(q), 350);
          }
        };
      });
    }
    function end(stars) {
      K.endLesson(1);
      const res = Store.kidsFinish('st-' + st.id, stars, 15);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <span class="k-sticker" aria-hidden="true">📖</span>
            <h1>${kt('theEnd')}</h1>
            ${starsHtml(stars, 'big pop')}
            ${res.better && !res.firstSticker ? `<b class="k-best">${kt('best')}</b>` : ''}
          </div>
          ${advButton()}
          <a class="k-btn ${adv ? 'ghost' : ''}" href="#/kids/stories">📚 ${kt('stories')}</a>
          <button class="k-btn ghost" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
        </div>`;
      celebrate();
      sayEn('The end! Great reading!', 0.9);
      $('#k-again').onclick = () => story(id);
    }
    page();
  }

  // ---------- the owl's wardrobe ----------
  function wardrobe() {
    K.endLesson();
    const have = Store.kidsTotalStars, look = Store.kidsOwl;
    const item = (part, x, inner) => {
      const open = have >= x.stars, on = look[part] === x.id;
      return `<button class="k-ward-item ${on ? 'on' : ''} ${open ? '' : 'locked'}" data-part="${part}" data-id="${x.id}" data-stars="${x.stars}"
        aria-pressed="${on}" aria-label="${open ? x.id || '—' : kt('needStars', { n: x.stars })}">${inner}${open ? '' : `<small>🔒 ${x.stars}★</small>`}</button>`;
    };
    K.view.innerHTML = `
      <div class="k-wrap">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <h1 class="k-title">👕 ${kt('wardrobe')}</h1>
        <p class="k-sub">${kt('wardSub')} · <b>★ ${have}</b></p>
        <div class="k-ward-stage">${owlAv(look, 'big')}</div>
        <h2 class="k-title k-h2">${kt('colors')}</h2>
        <div class="k-ward-row">${KIDS_OWL_COLORS.map(x => item('color', x, `<span class="k-swatch" style="background:${x.c}"></span>`)).join('')}</div>
        <h2 class="k-title k-h2">${kt('things')}</h2>
        <div class="k-ward-row">${KIDS_OWL_ACC.map(x => item('acc', x, `<span class="k-ward-pic">${x.pic}</span>`)).join('')}</div>
      </div>`;
    K.view.querySelectorAll('.k-ward-item').forEach(b => {
      b.onclick = () => {
        if (b.classList.contains('locked')) {
          K.Feel.wrong(b);
          say([['he', kt('needStars', { n: b.dataset.stars }).replace('★', 'כוכבים')]]);
          return;
        }
        Store.setKidsOwl(b.dataset.part, b.dataset.id);
        K.Feel.right();
        sayEn(pickOne(['Wow!', 'So cool!', 'Looking good!']), 0.9);
        wardrobe();
        const av = $('.k-ward-stage .k-av');
        if (av) av.classList.add('boing');
      };
    });
  }

  // ---------- several children ----------
  const FACES = ['🦊', '🐼', '🐯', '🐸', '🐨', '🦁', '🐰', '🐵'];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  function whoSheet() {
    const list = Store.kidsProfiles;
    const back = document.createElement('div');
    back.className = 'k-reveal';
    back.setAttribute('role', 'dialog');
    back.setAttribute('aria-modal', 'true');
    back.setAttribute('aria-labelledby', 'k-who-title');
    back.innerHTML = `
      <div class="k-reveal-card k-who">
        <b id="k-who-title">${kt('who')}</b>
        <div class="k-who-list">
          ${list.map(p => `<button class="k-who-kid ${p.active ? 'on' : ''}" data-id="${p.id}" aria-pressed="${p.active}">
            <span class="k-who-face" aria-hidden="true">${p.face}</span><span>${p.name ? esc(p.name) : kt('player') + ' ' + p.id.slice(1)}</span></button>`).join('')}
          ${list.length < 4 ? `<button class="k-who-kid add" id="k-who-add"><span class="k-who-face" aria-hidden="true">➕</span><span>${kt('addKid')}</span></button>` : ''}
        </div>
        <button class="k-skip" id="k-who-close">${kt('cancel')}</button>
      </div>`;
    const close = () => back.remove();
    back.onclick = e => { if (e.target === back) close(); };
    back.querySelector('#k-who-close').onclick = close;
    back.querySelectorAll('.k-who-kid[data-id]').forEach(b => {
      b.onclick = () => { Store.kidsSwitch(b.dataset.id); close(); K.Feel.right(); map(); sayEn('Hello!'); };
    });
    const add = back.querySelector('#k-who-add');
    if (add) add.onclick = () => { close(); gate(addSheet); };
    document.body.appendChild(back);
    back.querySelector('.k-who-kid').focus({ preventScroll: true });
  }
  function addSheet() {
    const taken = Store.kidsProfiles.map(p => p.face);
    let face = FACES.find(f => !taken.includes(f)) || FACES[0];
    const back = document.createElement('div');
    back.className = 'k-reveal';
    back.setAttribute('role', 'dialog');
    back.setAttribute('aria-modal', 'true');
    back.innerHTML = `
      <div class="k-reveal-card k-who">
        <b>${kt('addKid')}</b>
        <p class="k-who-sub">${kt('pickFace')}</p>
        <div class="k-faces">${FACES.map(f => `<button class="k-face-opt ${f === face ? 'on' : ''}" data-f="${f}" aria-pressed="${f === face}">${f}</button>`).join('')}</div>
        <input class="k-name" id="k-name" maxlength="14" placeholder="${kt('kidName')}" autocomplete="off">
        <button class="k-btn" id="k-add-ok">${kt('save')}</button>
        <button class="k-skip" id="k-add-no">${kt('cancel')}</button>
      </div>`;
    back.querySelectorAll('.k-face-opt').forEach(b => {
      b.onclick = () => {
        face = b.dataset.f;
        back.querySelectorAll('.k-face-opt').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      };
    });
    back.querySelector('#k-add-no').onclick = () => back.remove();
    back.querySelector('#k-add-ok').onclick = () => {
      Store.kidsAddProfile(face, back.querySelector('#k-name').value);
      back.remove();
      celebrate();
      map();
      Kids.hello();
    };
    document.body.appendChild(back);
  }

  // ---------- grown-up check ----------
  // A multiplication young children can't do yet, with 4 answers to pick from (the usual
  // parental gate in kids' apps). Passing it opens the gate for 10 minutes.
  let gateUntil = 0;
  function gate(onPass) {
    if (Date.now() < gateUntil) return onPass();
    const a = 6 + Math.floor(Math.random() * 4), b = 6 + Math.floor(Math.random() * 4), right = a * b;
    const opts = K.shuffle([right, right + a, right - b, right + 10]);
    const back = document.createElement('div');
    back.className = 'k-reveal k-gate';
    back.setAttribute('role', 'dialog');
    back.setAttribute('aria-modal', 'true');
    back.setAttribute('aria-labelledby', 'k-gate-title');
    back.innerHTML = `
      <div class="k-reveal-card">
        <span class="k-gate-lock" aria-hidden="true">🔒</span>
        <b id="k-gate-title">${kt('gateTitle')}</b>
        <p>${kt('gateText')}</p>
        <p class="k-gate-q" dir="ltr">${a} × ${b} = ?</p>
        <div class="k-gate-opts" dir="ltr">${opts.map(n => `<button class="k-gate-opt" data-n="${n}">${n}</button>`).join('')}</div>
        <p class="k-gate-msg" role="status"></p>
        <button class="k-skip" id="k-gate-no">${kt('cancel')}</button>
      </div>`;
    const close = () => back.remove();
    back.querySelectorAll('.k-gate-opt').forEach(btn => {
      btn.onclick = () => {
        if (+btn.dataset.n === right) { gateUntil = Date.now() + 10 * 60 * 1000; close(); onPass(); }
        else { close(); }   // a wrong answer just closes: no hint for a child trying all four
      };
    });
    back.querySelector('#k-gate-no').onclick = close;
    back.onclick = e => { if (e.target === back) close(); };
    document.body.appendChild(back);
    back.querySelector('.k-gate-opt').focus({ preventScroll: true });
  }

  // ---------- parent corner ----------
  function parents() {
    K.endLesson();
    if (Date.now() >= gateUntil) { location.hash = '#/kids'; return; }   // reached without the check
    const learned = KIDS_WORDS.filter(w => Store.kidsWordCount(w.id) > 0).length;
    const tr = Store.kidsTreasure;
    const mins = Math.round(Store.kidsTimeToday / 60);
    const limits = [0, 10, 15, 20, 30, 45];
    K.view.innerHTML = `
      <div class="k-wrap k-pc">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('pcBack')}</a>
        <h1 class="k-title">👪 ${kt('pcTitle')}</h1>
        <div class="k-pc-stats">
          <div><b>${learned}/${KIDS_WORDS.length}</b><span>${kt('pcWords')}</span></div>
          <div><b>${Store.kidsStickerCount}/${KIDS_THEMES.length}</b><span>${kt('pcIslands')}</span></div>
          <div><b>★ ${Store.kidsTotalStars}</b><span>${kt('pcStars')}</span></div>
          <div><b>☀️ ${tr.days}</b><span>${kt('pcTreasure')}</span></div>
          <div><b>${kt('pcMin', { n: mins })}</b><span>${kt('pcToday')}</span></div>
        </div>
        <section class="k-pc-box">
          <h2>${kt('pcLimit')}</h2>
          <div class="k-pc-seg" role="radiogroup" aria-label="${kt('pcLimit')}">
            ${limits.map(n => `<button role="radio" aria-checked="${Store.kidsLimit === n}" class="${Store.kidsLimit === n ? 'on' : ''}" data-n="${n}">${n ? kt('pcMin', { n }) : kt('pcOff')}</button>`).join('')}
          </div>
        </section>
        <section class="k-pc-box">
          <label class="k-pc-switch">
            <span class="grow"><b>${kt('pcMode')}</b><small>${kt('pcModeText')}</small></span>
            <input type="checkbox" id="k-mode" ${Store.kidsMode ? 'checked' : ''}>
          </label>
        </section>
        <section class="k-pc-box">
          <h2>${kt('pcPer')}</h2>
          ${KIDS_THEMES.map(th => {
            const n = th.words.filter(w => Store.kidsWordCount(w.id) > 0).length;
            return `<div class="k-pc-row"><span aria-hidden="true">${th.pic}</span><span class="grow">${themeName(th)}</span>
              <span class="k-pc-bar"><i style="width:${Math.round(n / th.words.length * 100)}%;background:${th.color}"></i></span>
              <span class="k-pc-n">${n}/${th.words.length}</span></div>`;
          }).join('')}
        </section>
        <p class="k-pc-tip">💡 ${kt('pcTip')}</p>
      </div>`;
    K.view.querySelectorAll('.k-pc-seg button').forEach(b => {
      b.onclick = () => { Store.kidsLimit = +b.dataset.n; parents(); };
    });
    $('#k-mode').onchange = e => { Store.kidsMode = e.target.checked; };
  }

  // ---------- daily time limit ----------
  // Play time counts while a kids screen is on and the app is in front
  setInterval(() => {
    if (document.body.classList.contains('kids') && document.visibilityState === 'visible') Store.kidsAddTime(15);
  }, 15000);
  const overLimit = () => Store.kidsLimit > 0 && Store.kidsTimeToday >= (Store.kidsLimit + Store.kidsExtraToday) * 60;
  function rest() {
    K.endLesson();
    K.view.innerHTML = `
      <div class="k-wrap k-play k-end">
        <div class="k-end-card k-rest">
          <span class="k-rest-owl" aria-hidden="true">🦉<i>💤</i></span>
          <h1>${kt('restTitle')}</h1>
          <p>${kt('restText')}</p>
        </div>
        <button class="k-btn ghost" id="k-more">${kt('restMore')}</button>
      </div>`;
    say([['he', kt('restTitle')], ['en', 'Good night!']]);
    $('#k-more').onclick = () => gate(() => { Store.kidsAddExtra(10); map(); });
  }

  // ---------- picture of the day ----------
  // One word a day from the open islands, a new one (not yet known) while there are any;
  // the same word all day long, so a parent can ask about it at dinner.
  function wotdWord() {
    const kept = Store.kidsWotd && KIDS_WORDS.find(w => w.id === Store.kidsWotd);
    if (kept) return kept;
    const open = KIDS_THEMES.filter((th, i) => isOpen(i)).flatMap(th => th.words);
    const fresh = open.filter(w => !Store.kidsWordCount(w.id));
    const pool = fresh.length ? fresh : open;
    const day = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
    const w = pool[(day * 7) % pool.length];
    Store.kidsWotd = w.id;
    return w;
  }
  function wotdCard() {
    const w = wotdWord();
    const known = Store.kidsWordCount(w.id) > 0;
    return `
      <button class="k-wotd ${known ? 'planted' : ''}" id="k-wotd" data-id="${w.id}" aria-label="${kt('wotd')}: ${w.en}">
        <span class="k-wotd-pic" aria-hidden="true">${w.pic}</span>
        <span class="grow"><span class="k-wotd-k">☀️ ${kt('wotd')}</span><b class="en">${w.en}</b><small>${known ? kt('wotdPlanted') : kt('wotdTap')}</small></span>
        <span class="k-wotd-he he">${w.he}</span>
      </button>`;
  }

  // ---------- today's adventure ----------
  // One button strings a short mixed session: thirsty garden words first (review), then the next
  // island, then a story (or the letter game). Each step's end screen leads on to the next stop.
  let adv = null;   // { steps: [{ hash, icon }], at }
  function todayPlan() {
    const plan = [];
    if (Store.kidsGarden().some(p => p.thirsty)) plan.push({ hash: '#/kids/water', icon: '🌻', name: 'stWater' });
    const isle = KIDS_THEMES.find((th, i) => isOpen(i) && !Store.kidsHasSticker(th.id))
      || KIDS_THEMES.filter((th, i) => isOpen(i)).sort((a, b) => Store.kidsStars(a.id) - Store.kidsStars(b.id))[0];
    plan.push({ hash: '#/kids/play/' + isle.id, icon: isle.pic, name: 'stIsland' });
    const st = KIDS_STORIES.find(x => storyOpen(x) && !Store.kidsHasSticker('st-' + x.id));
    plan.push(st ? { hash: '#/kids/story/' + st.id, icon: '📚', name: 'stStory' } : { hash: '#/kids/abcgame', icon: '🔤', name: 'stAbc' });
    return plan;
  }
  // The end screen of a step shows this instead of "back to the map"
  function advButton() {
    if (!adv || adv.steps[adv.at].hash !== location.hash) return '';
    const last = adv.at === adv.steps.length - 1;
    return `<a class="k-btn k-adv-next" href="#/kids/today/next">${last ? '🏆' : adv.steps[adv.at + 1].icon} ${last ? kt('done') : kt('advNext')}
      <small>${kt('advStep', { a: adv.at + 1, b: adv.steps.length })}</small></a>`;
  }
  function today(step) {
    if (step === 'start' || !adv) adv = { steps: todayPlan(), at: 0 };
    else adv.at++;
    if (adv.at < adv.steps.length) { location.replace(adv.steps[adv.at].hash); return; }
    adv = null;
    K.endLesson();
    const tr = Store.kidsTreasure;
    K.view.innerHTML = `
      <div class="k-wrap k-play k-end">
        <div class="k-end-card">${endOwl()}
          <span class="k-sticker pop" aria-hidden="true">🏆</span>
          <h1>${kt('advDone')}</h1>
          <p class="k-unlock">${kt('advDoneSub')}</p>
          ${tr.ready ? `<p class="k-unlock"><b>${kt('advTreasure')}</b></p>` : ''}
        </div>
        <a class="k-btn" href="#/kids">${kt('backToMap')}</a>
      </div>`;
    celebrate();
    sayEn('Hooray! You did it!', 0.9);
  }

  // ---------- daily treasure ----------
  function chestCard() {
    const tr = Store.kidsTreasure;
    const state = tr.ready ? 'ready' : tr.opened ? 'opened' : 'locked';
    const text = kt(tr.ready ? 'chestReady' : tr.opened ? 'chestOpened' : 'chestLocked');
    return `
      <button class="k-chest-card ${state}" id="k-chest" ${tr.ready ? '' : 'aria-disabled="true"'}>
        <span class="k-chest" aria-hidden="true">${tr.opened ? '🎉' : '🎁'}</span>
        <span class="grow"><b>${kt('chest')}</b><small>${text}</small></span>
        ${tr.days ? `<span class="k-chest-days">${kt('chestDays', { n: tr.days })}</span>` : ''}
      </button>`;
  }
  function openChest(btn) {
    const tr = Store.kidsTreasure;
    if (!tr.ready) {
      K.Feel.wrong(btn);
      say([['he', kt(tr.opened ? 'chestOpened' : 'chestLocked')]]);
      return;
    }
    // a sticker the child doesn't have yet, while there are any
    const fresh = KIDS_TREASURE.filter(x => !tr.items.includes(x));
    const item = pickOne(fresh.length ? fresh : KIDS_TREASURE);
    if (!Store.kidsOpenTreasure(item)) return;
    K.Feel.right();
    celebrate();
    const back = document.createElement('div');
    back.className = 'k-reveal';
    back.setAttribute('role', 'dialog');
    back.setAttribute('aria-modal', 'true');
    back.innerHTML = `
      <div class="k-reveal-card">
        <span class="k-reveal-chest" aria-hidden="true">🎁</span>
        <span class="k-sticker pop" aria-hidden="true">${item}</span>
        <b>${kt('chestGot')}</b>
        <button class="k-btn" id="k-reveal-ok">${kt('next')} <span aria-hidden="true">⭐</span></button>
      </div>`;
    document.body.appendChild(back);
    sayEn('Wow! A new sticker!', 0.9);
    const close = () => { back.remove(); map(); };
    back.querySelector('#k-reveal-ok').onclick = close;
    back.querySelector('#k-reveal-ok').focus({ preventScroll: true });
  }

  // ---------- a play session: meet → find the picture → memory game → reward ----------
  function play(id) {
    const th = theme(id);
    if (!th) return map();
    const idx = KIDS_THEMES.indexOf(th);
    if (!isOpen(idx)) { location.hash = '#/kids'; return; }
    document.body.style.setProperty('--kc', th.color);
    document.body.classList.add('in-lesson');   // also when "Play again" restarts without a route change
    const words = th.words;
    // Meet every word, then hear-and-find each one: half as picture cards, half as balloons to pop,
    // then the memory game. Two different games for the same skill keep it fresh.
    const order = K.shuffle(words), half = Math.ceil(order.length / 2);
    const steps = [
      ...words.map(w => ({ kind: 'meet', w })),
      ...order.slice(0, half).map(w => ({ kind: 'tap', w })),
      ...order.slice(half).map(w => ({ kind: 'pop', w })),
      { kind: 'drag' },
      ...(Rec() ? K.shuffle(words).slice(0, 2).map(w => ({ kind: 'say', w })) : []),
      { kind: 'match' }
    ];
    let at = 0, firstTry = 0, tapped = 0;

    const progress = () => K.lessonBar(at / steps.length);
    function nextStep() { clearHands(); at++; at < steps.length ? show() : finish(); }

    function show() {
      progress();
      const s = steps[at];
      if (s.kind === 'meet') meet(s.w, words.indexOf(s.w));
      else if (s.kind === 'tap') tap(s.w);
      else if (s.kind === 'pop') pop(s.w);
      else if (s.kind === 'say') sayIt(s.w);
      else if (s.kind === 'drag') drag();
      else match();
    }

    // Meet: one big picture at a time, heard as soon as it shows
    function meet(w, n) {
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">👀</span> ${kt('meet')} · ${n + 1}/${words.length}</p>
          <button class="k-card k-meet" id="k-pic" aria-label="${w.en}">
            <span class="k-pic" aria-hidden="true">${w.pic}</span>
            <span class="k-word en ${w.en.length > 8 ? 'long' : ''}" lang="en">${w.en}</span>
            <span class="k-he he" lang="he">${w.he}</span>
            <span class="k-ear" aria-hidden="true">🔊</span>
          </button>
          <p class="k-tip">${kt('meetTip')}</p>
          <button class="k-btn" id="k-next">${kt('next')} <span aria-hidden="true">${isHe() ? '←' : '→'}</span></button>
        </div>`;
      const pic = $('#k-pic');
      const hear = () => { sayEn(w.en); pic.classList.remove('boing'); void pic.offsetWidth; pic.classList.add('boing'); };
      pic.onclick = hear;
      $('#k-next').onclick = nextStep;
      if (n === 0) say([['he', kt('sayMeet')], ['en', w.en]]); else setTimeout(hear, 150);
      if (n === 0) setTimeout(() => coach('meet', '#k-pic'), 400);
      if (n === 1) setTimeout(() => coach('next', '#k-next'), 400);
    }

    // Find the picture: hear a word, tap its picture among 3 (4 once the child is warmed up)
    let tapsShown = 0;
    function tap(w) {
      const many = tapsShown >= 3 && words.length >= 6;
      tapsShown++;
      const others = K.shuffle(words.filter(x => x !== w)).slice(0, many ? 3 : 2);
      const opts = K.shuffle([w, ...others]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">👂</span> ${kt('tap')}</p>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}: ${w.en}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">${w.en}</span>
          </div>
          <div class="k-opts ${opts.length === 4 ? 'four' : ''}">
            ${opts.map((o, i) => `<button class="k-opt" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span></button>`).join('')}
          </div>
          ${owl(kt('tapTip'), 'small')}
        </div>`;
      const ask = () => say(tapsShown === 1 ? [['he', kt('sayFind')], ['en', w.en]] : [['en', w.en]]);
      $('#k-say').onclick = () => sayEn(w.en);
      setTimeout(ask, 200);
      setTimeout(() => coach('tap', '#k-say', '.k-opts'), 500);
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          const o = opts[+b.dataset.i];
          if (o === w) {
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            K.Feel.right();
            if (!missed) { firstTry++; Store.kidsWordRight(w.id); }
            tapped++;
            const cheer = pickOne(kt('great'));
            $('.k-bubble').textContent = cheer;
            owlMood('cheer');
            K.announce(cheer);
            sayEn(w.en);
            setTimeout(nextStep, 1200);
          } else {
            missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            $('.k-bubble').textContent = kt('tryAgain'); owlMood('think');
            setTimeout(() => sayEn(w.en), 350);   // hear the word again, then try again
          }
        };
      });
    }

    // Pop the balloon: balloons with pictures bob in the sky; pop the one you hear.
    // On the colours island the balloons are all white, so a balloon's colour never competes with the answer.
    let popsShown = 0;
    function pop(w) {
      popsShown++;
      const others = K.shuffle(words.filter(x => x !== w)).slice(0, words.length >= 6 ? 3 : 2);
      const opts = K.shuffle([w, ...others]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🎈</span> ${kt('pop')}</p>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}: ${w.en}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">${w.en}</span>
          </div>
          <div class="k-sky">
            ${opts.map((o, i) => `
              <button class="k-balloon" data-i="${i}" aria-label="${o.en}" style="--b:${th.id === 'colors' ? '#f4f7ff' : BALLOONS[i % BALLOONS.length]};--d:${(i * 0.45).toFixed(2)}s">
                <span class="k-balloon-pic" aria-hidden="true">${o.pic}</span>
              </button>`).join('')}
          </div>
          ${owl(kt('popTip'), 'small')}
        </div>`;
      $('#k-say').onclick = () => sayEn(w.en);
      setTimeout(() => say(popsShown === 1 ? [['he', kt('sayPop')], ['en', w.en]] : [['en', w.en]]), 200);
      setTimeout(() => coach('pop', '.k-balloon'), 500);
      K.view.querySelectorAll('.k-balloon').forEach(b => {
        b.onclick = () => {
          const o = opts[+b.dataset.i];
          if (o === w) {
            K.view.querySelectorAll('.k-balloon').forEach(x => { x.disabled = true; });
            b.classList.add('popped');
            popSound();
            K.Feel.right();
            if (!missed) { firstTry++; Store.kidsWordRight(w.id); }
            tapped++;
            const cheer = pickOne(kt('great'));
            $('.k-bubble').textContent = cheer;
            owlMood('cheer');
            K.announce(cheer);
            setTimeout(() => sayEn(w.en), 250);
            setTimeout(nextStep, 1300);
          } else {
            missed = true;
            b.classList.remove('nope'); void b.offsetWidth; b.classList.add('nope');
            K.Feel.wrong(b);
            $('.k-bubble').textContent = kt('tryAgain'); owlMood('think');
            setTimeout(() => sayEn(w.en), 350);
          }
        };
      });
    }

    // Say it: hear the word, tap the big microphone and say it. Very lenient: anything close counts,
    // and after two tries the owl praises the try and moves on, so a child is never stuck.
    let saysShown = 0;
    function sayIt(w) {
      saysShown++;
      let tries = 0;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🗣️</span> ${kt('say')}</p>
          <button class="k-card k-meet k-say-card" id="k-pic" aria-label="${kt('listen')}: ${w.en}">
            <span class="k-pic" aria-hidden="true">${w.pic}</span>
            <span class="k-word en" lang="en">${w.en}</span>
            <span class="k-ear" aria-hidden="true">🔊</span>
          </button>
          <div class="k-mic-row">
            <button class="k-mic" id="k-mic" aria-label="${kt('sayTip')}"><span aria-hidden="true">🎤</span></button>
          </div>
          <button class="k-skip" id="k-skip">${kt('skip')} <span aria-hidden="true">${isHe() ? '←' : '→'}</span></button>
          ${owl(kt('sayTip'), 'small')}
        </div>`;
      const pic = $('#k-pic'), mic = $('#k-mic'), bub = () => $('.k-bubble');
      const hear = () => { sayEn(w.en); pic.classList.remove('boing'); void pic.offsetWidth; pic.classList.add('boing'); };
      pic.onclick = hear;
      $('#k-skip').onclick = () => { stopRec(); nextStep(); };
      setTimeout(() => say(saysShown === 1 ? [['he', kt('sayHe')], ['en', w.en]] : [['en', w.en]]), 200);
      setTimeout(() => coach('say', '#k-mic'), 500);
      const done = text => {
        mic.disabled = true;
        bub().textContent = text;
        owlMood('cheer');
        K.announce(text);
        setTimeout(nextStep, 1600);
      };
      mic.onclick = () => {
        if (rec) { stopRec(); return; }   // a second tap stops listening
        K.Feel.prime();
        speechSynthesis.cancel();
        const r = new (Rec())();
        r.lang = 'en-US';
        r.interimResults = false;
        r.maxAlternatives = 5;
        rec = r;
        let heard = false;
        mic.classList.add('on');
        bub().textContent = kt('listening');
        r.onresult = e => {
          heard = true;
          const alts = Array.from(e.results[0]).map(a => a.transcript);
          if (alts.some(a => closeEnough(w.en, a))) {
            K.Feel.right();
            Store.kidsWordRight(w.id);
            done(pickOne(kt('sayGood')));
          } else if (++tries >= 2) {
            done(kt('sayTry'));
          } else {
            bub().textContent = kt('sayRetry');
            setTimeout(() => sayEn(w.en), 300);
          }
        };
        r.onerror = () => {};
        r.onend = () => {
          mic.classList.remove('on');
          if (rec === r) rec = null;
          if (!heard && !mic.disabled) bub().textContent = kt('sayTip');
        };
        try { r.start(); } catch (err) { rec = null; mic.classList.remove('on'); }
      };
    }

    // Drag the word: 3 pictures as targets, 3 word chips to drag onto them. A wrong drop floats back.
    // Tapping a word and then a picture does the same, for small fingers and for screen readers.
    function drag() {
      const set = K.shuffle(words).slice(0, 3), chips = K.shuffle(set);
      let picked = null, placed = 0;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">✋</span> ${kt('drag')}</p>
          <div class="k-targets">
            ${set.map((w, i) => `<button class="k-target-pic" data-i="${i}" aria-label="${w.he}"><span aria-hidden="true">${w.pic}</span><b class="en"></b></button>`).join('')}
          </div>
          <div class="k-chips-row">
            ${chips.map((w, i) => `<button class="k-chip-word en" data-w="${set.indexOf(w)}">${w.en}</button>`).join('')}
          </div>
          ${owl(kt('dragTip'), 'small')}
        </div>`;
      say([['he', kt('sayDrag')]]);
      setTimeout(() => { const ch = $('.k-chip-word'); if (ch) coach('drag', ch, targets[+ch.dataset.w]); }, 500);
      const targets = [...K.view.querySelectorAll('.k-target-pic')];
      const drop = (chip, target) => {
        const w = set[+chip.dataset.w];
        if (target && +target.dataset.i === +chip.dataset.w) {
          chip.classList.add('gone');
          chip.disabled = true;
          target.classList.add('right', 'filled');
          target.querySelector('b').textContent = w.en;
          target.disabled = true;
          K.Feel.right();
          sayEn(w.en);
          if (!chip.dataset.missed) { firstTry++; Store.kidsWordRight(w.id); }
          tapped++;
          if (++placed === set.length) {
            $('.k-bubble').textContent = pickOne(kt('great'));
            owlMood('cheer');
            setTimeout(nextStep, 1300);
          }
        } else if (target) {
          chip.dataset.missed = '1';
          K.Feel.wrong(target);
          $('.k-bubble').textContent = kt('tryAgain'); owlMood('think');
        }
        chip.classList.remove('picked');
        picked = null;
      };
      K.view.querySelectorAll('.k-chip-word').forEach(chip => {
        // tap: pick the word (and hear it), then tap a picture
        chip.onclick = () => {
          if (chip.dataset.dragged) { delete chip.dataset.dragged; return; }
          K.view.querySelectorAll('.k-chip-word').forEach(c => c.classList.remove('picked'));
          picked = chip;
          chip.classList.add('picked');
          sayEn(set[+chip.dataset.w].en);
        };
        // drag with a finger or the mouse
        chip.onpointerdown = e => {
          if (chip.disabled) return;
          const sx = e.clientX, sy = e.clientY;
          let moving = false;
          const move = ev => {
            const dx = ev.clientX - sx, dy = ev.clientY - sy;
            if (!moving && Math.hypot(dx, dy) < 8) return;
            if (!moving) { moving = true; chip.classList.add('dragging'); sayEn(set[+chip.dataset.w].en); }
            chip.style.transform = `translate(${dx}px, ${dy}px) scale(1.08)`;
            targets.forEach(t => t.classList.toggle('over', !t.disabled && hit(t, ev)));
          };
          const up = ev => {
            document.removeEventListener('pointermove', move);
            document.removeEventListener('pointerup', up);
            document.removeEventListener('pointercancel', up);
            targets.forEach(t => t.classList.remove('over'));
            chip.classList.remove('dragging');
            chip.style.transform = '';
            if (!moving) return;
            chip.dataset.dragged = '1';   // the click that follows a drag is not a tap
            drop(chip, targets.find(t => !t.disabled && hit(t, ev)));
          };
          document.addEventListener('pointermove', move);
          document.addEventListener('pointerup', up);
          document.addEventListener('pointercancel', up);
        };
      });
      const hit = (el, ev) => { const r = el.getBoundingClientRect(); return ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom; };
      targets.forEach(t => { t.onclick = () => { if (picked) drop(picked, t); else sayEn(set[+t.dataset.i].en); }; });
    }

    // Memory game: 4 pairs, each a picture card and a word card, face down
    function match() {
      const pairs = K.shuffle(words).slice(0, 4);
      const cards = K.shuffle(pairs.flatMap(w => [{ w, side: 'pic' }, { w, side: 'word' }]));
      let open = [], found = 0, busy = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🧠</span> ${kt('match')}</p>
          <div class="k-memory">
            ${cards.map((c, i) => `
              <button class="k-mem" data-i="${i}" aria-label="?">
                <span class="k-mem-in">
                  <span class="k-mem-back" aria-hidden="true">?</span>
                  <span class="k-mem-face ${c.side} ${c.w.en.length > 8 ? 'long' : ''}" aria-hidden="true">${c.side === 'pic' ? c.w.pic : c.w.en}</span>
                </span>
              </button>`).join('')}
          </div>
          ${owl(kt('matchTip'), 'small')}
        </div>`;
      say([['he', kt('sayMatch')]]);
      setTimeout(() => coach('match', '.k-mem'), 500);
      K.view.querySelectorAll('.k-mem').forEach(b => {
        b.onclick = () => {
          const i = +b.dataset.i, c = cards[i];
          if (busy || b.classList.contains('up')) return;
          b.classList.add('up');
          Sfx.flip();
          b.setAttribute('aria-label', c.side === 'pic' ? c.w.en + ' 🖼️' : c.w.en);
          sayEn(c.w.en);
          open.push({ b, c });
          if (open.length < 2) return;
          const [x, y] = open;
          open = [];
          if (x.c.w === y.c.w) {
            found++;
            setTimeout(() => { x.b.classList.add('got'); y.b.classList.add('got'); x.b.disabled = y.b.disabled = true; K.Feel.right(); }, 250);
            K.lessonBar((steps.length - 1 + found / pairs.length) / steps.length);
            if (found === pairs.length) setTimeout(finish, 1100);
          } else {
            busy = true;
            setTimeout(() => {
              [x, y].forEach(o => { o.b.classList.remove('up'); o.b.setAttribute('aria-label', '?'); });
              busy = false;
            }, 1000);
          }
        };
      });
    }

    function finish() {
      K.endLesson(1);
      const acc = tapped ? firstTry / tapped : 1;
      const stars = acc >= 0.9 ? 3 : acc >= 0.6 ? 2 : 1;   // every finished island earns at least one star
      const wasOpen = KIDS_THEMES.map((_, i) => isOpen(i));
      const res = Store.kidsFinish(th.id, stars, 10 + stars * 10);
      const opened = KIDS_THEMES.findIndex((_, i) => !wasOpen[i] && isOpen(i));
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
            ${res.firstSticker ? `
              <div class="k-sticker-new">
                <span class="k-sticker pop" aria-hidden="true">${th.sticker}</span>
                <b>${kt('newSticker')}</b>
              </div>` : res.better ? `<b class="k-best">${kt('best')}</b>` : ''}
            ${opened >= 0 ? `<p class="k-unlock">🔓 ${kt('nextIsland')} <span aria-hidden="true">${KIDS_THEMES[opened].pic}</span></p>` : ''}
          </div>
          ${advButton()}
          <button class="k-btn ${adv ? 'ghost' : ''}" id="k-map">${kt('backToMap')}</button>
          <button class="k-btn ghost" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
        </div>`;
      celebrate();
      K.Feel.right();
      for (let n = 0; n < stars; n++) setTimeout(() => Sfx.star(n), 450 + n * 250);
      sayEn(stars === 3 ? 'Amazing! Great job!' : 'Great job!', 0.9);
      $('#k-map').onclick = () => { location.hash = '#/kids'; };
      $('#k-again').onclick = () => play(id);
    }

    show();
  }

  // ---------- ABC: the letters ----------
  // "A is for apple" is always said in English, with the letter's spoken name
  const enFor = x => STR.en.isFor.replace('{L}', x.name).replace('{word}', x.word);
  const sayLetter = x => say([['en', x.name + '.'], ['en', enFor(x)]]);
  const sayName = x => say([['en', x.name + '.']]);

  function abc() {
    K.endLesson();
    K.view.innerHTML = `
      <div class="k-wrap">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <h1 class="k-title">🔤 ${kt('abc')}</h1>
        <p class="k-sub">${kt('abcTip')}</p>
        <a class="k-btn" href="#/kids/abcgame"><span aria-hidden="true">🎮</span> ${kt('abcGame')}</a>
        <div class="k-letters">
          ${KIDS_ABC.map((x, i) => `<a class="k-letter" href="#/kids/abc/${x.L}" style="--c:${BALLOONS[i % BALLOONS.length]}" aria-label="${x.L}"><b>${x.L}</b><small>${x.L.toLowerCase()}</small>${Store.kidsHasTraced(x.L) ? '<i class="k-traced" aria-hidden="true">✍️</i>' : ''}</a>`).join('')}
        </div>
      </div>`;
  }

  // One letter: the big letter and its picture word, heard as soon as it shows; arrows to the letters around it
  // (the arrows run left to right like the alphabet, in both interface languages)
  function letter(L) {
    K.endLesson();
    const i = Math.max(0, KIDS_ABC.findIndex(x => x.L === L));
    const x = KIDS_ABC[i], prev = KIDS_ABC[i - 1], next = KIDS_ABC[i + 1];
    const at = x.word.toLowerCase().indexOf(x.L.toLowerCase());
    const wordHtml = at < 0 ? x.word : `${x.word.slice(0, at)}<mark>${x.word[at]}</mark>${x.word.slice(at + 1)}`;
    K.view.innerHTML = `
      <div class="k-wrap k-play">
        <a class="k-back" href="#/kids/abc"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ABC</a>
        <button class="k-card k-letter-big" id="k-letter" style="--c:${BALLOONS[i % BALLOONS.length]}" aria-label="${x.L}, ${enFor(x)}">
          <span class="k-letter-glyph en" aria-hidden="true">${x.L}<small>${x.L.toLowerCase()}</small></span>
          <span class="k-letter-pic" aria-hidden="true">${x.pic}</span>
          <span class="k-word en" aria-hidden="true">${wordHtml}</span>
          <span class="k-he he">${x.he}</span>
        </button>
        <div class="k-letter-tools">
          <button class="k-btn ghost" id="k-sound">🔉 ${kt('sound')}: <span class="en">${x.sound}</span></button>
          <a class="k-btn ghost" href="#/kids/trace/${x.L}">✍️ ${kt('traceBtn')}</a>
        </div>
        <div class="k-letter-nav">
          ${prev ? `<a class="k-btn ghost" href="#/kids/abc/${prev.L}" aria-label="${prev.L}">← ${prev.L}</a>` : '<span></span>'}
          ${next ? `<a class="k-btn" href="#/kids/abc/${next.L}" aria-label="${next.L}">${next.L} →</a>` : `<a class="k-btn" href="#/kids/abcgame" aria-label="${kt('abcGame')}">🎮</a>`}
        </div>
      </div>`;
    const card = $('#k-letter');
    const hear = () => { sayLetter(x); card.classList.remove('boing'); void card.offsetWidth; card.classList.add('boing'); };
    card.onclick = hear;
    $('#k-sound').onclick = () => say([['en', `${x.sound}. ${x.sound}. ${x.word}.`]], 0.7);
    setTimeout(hear, 150);
  }

  // Trace: the big letter as a faint guide; the child paints over it with a finger. When most of the
  // letter is covered it sparkles, then the small letter. Painting outside the lines never counts against.
  function trace(L) {
    const i = Math.max(0, KIDS_ABC.findIndex(x => x.L === L)), x = KIDS_ABC[i];
    const col = BALLOONS[i % BALLOONS.length];
    let stage = 0;   // 0 = capital, 1 = small letter
    function draw() {
      K.endLesson();
      const glyph = stage ? x.L.toLowerCase() : x.L;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <a class="k-back" href="#/kids/abc/${x.L}"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${x.L}${x.L.toLowerCase()}</a>
          <p class="k-step">✍️ ${kt('trace')} <span class="en">${glyph}</span></p>
          <div class="k-trace-box"><canvas class="k-trace" id="k-trace" aria-label="${kt('traceTip')}: ${glyph}"></canvas>
            <div class="k-trace-dots" aria-hidden="true">${[0, 1].map(n => `<i class="${n < stage ? 'on' : n === stage ? 'cur' : ''}"></i>`).join('')}</div>
          </div>
          <div class="k-story-nav">
            <button class="k-btn ghost" id="k-clear">🧽 ${kt('clear')}</button>
            <button class="k-btn ghost" id="k-hear">🔊 ${x.L}</button>
          </div>
          ${owl(stage ? kt('traceSmall') : kt('traceTip'), 'small')}
        </div>`;
      const cv = $('#k-trace'), box = cv.parentElement;
      const size = Math.min(box.clientWidth, 340), dpr = window.devicePixelRatio || 1;
      cv.style.width = cv.style.height = size + 'px';
      cv.width = cv.height = Math.round(size * dpr);
      const ctx = cv.getContext('2d');
      ctx.scale(dpr, dpr);
      const font = `700 ${Math.round(size * (stage ? .78 : .82))}px "Varela Round", "Heebo", sans-serif`;
      // the letter's shape, on a hidden canvas, to know which spots belong to it
      const mask = document.createElement('canvas');
      mask.width = mask.height = size;
      const m = mask.getContext('2d');
      const place = c => { c.font = font; c.textAlign = 'center'; c.textBaseline = 'middle'; };
      place(m);
      m.fillText(glyph, size / 2, size * (stage ? .46 : .54));
      const md = m.getImageData(0, 0, size, size).data;
      const GRID = 8, cells = [];
      for (let y = GRID / 2; y < size; y += GRID) for (let xx = GRID / 2; xx < size; xx += GRID)
        if (md[(Math.floor(y) * size + Math.floor(xx)) * 4 + 3] > 128) cells.push([xx, y]);
      const painted = new Set();
      function guide() {
        ctx.clearRect(0, 0, size, size);
        place(ctx);
        ctx.fillStyle = '#e8eefc';
        ctx.fillText(glyph, size / 2, size * (stage ? .46 : .54));
        ctx.setLineDash([8, 10]);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#9fb0d2';
        ctx.strokeText(glyph, size / 2, size * (stage ? .46 : .54));
        ctx.setLineDash([]);
      }
      guide();
      const brush = Math.max(22, size * .085);
      let last = null, done = false;
      const pos = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * size / r.width, (e.clientY - r.top) * size / r.height]; };
      function paintAt(p) {
        ctx.lineCap = ctx.lineJoin = 'round';
        ctx.strokeStyle = col;
        ctx.lineWidth = brush;
        ctx.beginPath();
        ctx.moveTo(...(last || p));
        ctx.lineTo(...p);
        ctx.stroke();
        // count every spot along the stroke, not just where the finger was sampled (fast strokes skip far)
        const from = last || p, steps = Math.max(1, Math.ceil(Math.hypot(p[0] - from[0], p[1] - from[1]) / (brush / 3)));
        for (let t = 0; t <= steps; t++) {
          const qx = from[0] + (p[0] - from[0]) * t / steps, qy = from[1] + (p[1] - from[1]) * t / steps;
          cells.forEach(([cx, cy], k) => { if (Math.hypot(cx - qx, cy - qy) < brush * .65) painted.add(k); });
        }
        last = p;
        if (!done && painted.size / cells.length >= .62) success();
      }
      cv.onpointerdown = e => { if (done) return; cv.setPointerCapture(e.pointerId); last = null; paintAt(pos(e)); };
      cv.onpointermove = e => { if (done || !cv.hasPointerCapture(e.pointerId)) return; paintAt(pos(e)); };
      cv.onpointerup = cv.onpointercancel = () => { last = null; };
      $('#k-clear').onclick = () => { painted.clear(); done = false; guide(); };
      $('#k-hear').onclick = () => say([['en', x.name + '.']]);
      function success() {
        done = true;
        K.Feel.right();
        Sfx.star(stage + 1);
        $('.k-bubble').textContent = pickOne(kt('great'));
        owlMood('cheer');
        cv.classList.add('k-trace-done');
        say([['en', x.name + '.'], ['en', enFor(x)]]);
        setTimeout(() => {
          if (stage === 0) { stage = 1; draw(); return; }
          celebrate();
          Store.kidsTraced(x.L);
          location.hash = '#/kids/abc/' + x.L;
        }, 1800);
      }
      say(stage ? [['he', kt('traceSmall')]] : [['en', x.name + '.']]);
      if (!stage) setTimeout(() => {
        const r = cv.getBoundingClientRect(), top = document.createElement('i'), bottom = document.createElement('i');
        [[top, .25], [bottom, .75]].forEach(([el, y]) => { el.style.cssText = `position:fixed;left:${r.left + r.width / 2}px;top:${r.top + r.height * y}px;width:1px;height:1px`; document.body.appendChild(el); });
        coach('trace', top, bottom);
        top.remove(); bottom.remove();
      }, 500);
    }
    draw();
  }

  // Letter game: hear a letter's name, tap it among 3; the right one turns into its picture
  function abcGame() {
    document.body.classList.add('in-lesson');
    const rounds = K.shuffle(KIDS_ABC).slice(0, 8);
    let at = 0, firstTry = 0;
    function round() {
      K.lessonBar(at / rounds.length);
      const x = rounds[at];
      const opts = K.shuffle([x, ...K.shuffle(KIDS_ABC.filter(y => y !== x)).slice(0, 2)]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🔤</span> ${kt('abcFind')}</p>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}"><span aria-hidden="true">🔊</span></button>
          </div>
          <div class="k-opts">
            ${opts.map((o, i) => `<button class="k-opt k-opt-letter en" data-i="${i}" aria-label="${o.L}">${o.L}<small>${o.L.toLowerCase()}</small></button>`).join('')}
          </div>
          ${owl(kt('letterTip'), 'small')}
        </div>`;
      $('#k-say').onclick = () => sayName(x);
      setTimeout(() => (at === 0 ? say([['he', kt('sayAbcFind')], ['en', x.name + '.']]) : sayName(x)), 200);
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          const o = opts[+b.dataset.i];
          if (o === x) {
            K.view.querySelectorAll('.k-opt').forEach(y => { y.disabled = true; });
            b.classList.add('right');
            b.innerHTML = `<span aria-hidden="true">${x.pic}</span>`;
            K.Feel.right();
            if (!missed) firstTry++;
            $('.k-bubble').textContent = kt('isFor', { L: x.L, word: x.word });
            owlMood('cheer');
            sayLetter(x);
            setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 2200);
          } else {
            missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            $('.k-bubble').textContent = kt('tryAgain'); owlMood('think');
            setTimeout(() => sayName(x), 350);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const acc = firstTry / rounds.length;
      const stars = acc >= 0.9 ? 3 : acc >= 0.6 ? 2 : 1;
      const res = Store.kidsFinish('abc', stars, 10 + stars * 10);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
            ${res.firstSticker ? `<div class="k-sticker-new"><span class="k-sticker pop" aria-hidden="true">🔤</span><b>${kt('newSticker')}</b></div>`
              : res.better ? `<b class="k-best">${kt('best')}</b>` : ''}
          </div>
          ${advButton()}
          <a class="k-btn ${adv ? 'ghost' : ''}" href="#/kids/abc">ABC</a>
          <button class="k-btn ghost" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
        </div>`;
      celebrate();
      sayEn(stars === 3 ? 'Amazing! Great job!' : 'Great job!', 0.9);
      $('#k-again').onclick = abcGame;
    }
    round();
  }

  // ---------- sticker album ----------
  function stickers() {
    K.endLesson();
    K.view.innerHTML = `
      <div class="k-wrap">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <h1 class="k-title">🎁 ${kt('album')}</h1>
        <p class="k-sub">${kt('albumSub')} · ${Store.kidsStickerCount}/${KIDS_THEMES.length}</p>
        <div class="k-album">
          ${KIDS_THEMES.map(th => {
            const got = Store.kidsHasSticker(th.id);
            return `
            <div class="k-slot ${got ? 'got' : ''}" style="--c:${th.color}">
              <span class="k-sticker" aria-hidden="true">${got ? th.sticker : '❔'}</span>
              <span class="k-slot-name">${themeName(th)}</span>
              ${got ? starsHtml(Store.kidsStars(th.id), 'sm') : ''}
            </div>`;
          }).join('')}
          <div class="k-slot ${Store.kidsHasSticker('abc') ? 'got' : ''}" style="--c:#ff5d8f">
            <span class="k-sticker" aria-hidden="true">${Store.kidsHasSticker('abc') ? '🔤' : '❔'}</span>
            <span class="k-slot-name">ABC</span>
            ${Store.kidsHasSticker('abc') ? starsHtml(Store.kidsStars('abc'), 'sm') : ''}
          </div>
        </div>
        <h2 class="k-title k-h2">🎁 ${kt('treasure')} · ${new Set(Store.kidsTreasure.items).size}/${KIDS_TREASURE.length}</h2>
        <div class="k-album k-album-small">
          ${KIDS_TREASURE.map(x => {
            const got = Store.kidsTreasure.items.includes(x);
            return `<div class="k-slot ${got ? 'got' : ''}" style="--c:#ffc93c"><span class="k-sticker" aria-hidden="true">${got ? x : '❔'}</span></div>`;
          }).join('')}
        </div>
      </div>`;
  }

  return {
    init(helpers) {
      K = helpers;
      // a soft tap on the kids world's buttons and cards (answers have their own sounds)
      document.addEventListener('click', e => {
        if (!document.body.classList.contains('kids')) return;
        const el = e.target.closest('.k-btn, .k-isle-btn, .k-abc-card, .k-chip:not(.k-sfx), .k-back, .k-letter, .k-book, .k-ward-item, .k-note, .k-plant, .k-parents, .k-skip, .k-chest-card, #k-pic, #k-letter, .k-chip-word, .k-target-pic');
        if (el) Sfx.tap();
      }, true);
    },
    // First meeting: the owl greets the child (Hebrew when there is a Hebrew voice, then English)
    hello() { say([['he', 'היי! אני הינשוף. בואו נלמד אנגלית ביחד!'], ['en', "Hello! Let's play!"]]); },
    show(a, b) {
      stopRec();
      clearHands();
      songRun++;   // a song still playing stops
      document.body.classList.add('kids');
      if (a === 'parents') return parents();
      if (overLimit()) return rest();   // checked between screens, never in the middle of a game
      if (a === 'play') play(b);
      else if (a === 'stickers') stickers();
      else if (a === 'abc') b ? letter(b) : abc();
      else if (a === 'abcgame') abcGame();
      else if (a === 'trace') trace(b);
      else if (a === 'owl') wardrobe();
      else if (a === 'stories') stories();
      else if (a === 'riddles') riddles();
      else if (a === 'today') today(b);
      else if (a === 'songs') songs();
      else if (a === 'song') song(b);
      else if (a === 'garden') garden();
      else if (a === 'water') water();
      else if (a === 'story') story(b);
      else map();
    },
    gate,
    leave() { stopRec(); document.body.classList.remove('kids'); document.body.style.removeProperty('--kc'); }
  };
})();
