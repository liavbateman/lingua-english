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
    const t = clean(target), h = clean(heard);
    if (!h) return false;
    if (h.includes(t)) return true;
    const words = h.split(' ');
    const allow = t.length >= 6 ? 2 : 1;
    return words.some(x => dist(t, x) <= allow || (t.length >= 4 && x.length >= 3 && t.slice(0, 3) === x.slice(0, 3))) || dist(t, h) <= allow;
  }

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
  const starsHtml = (n, cls = '') => `<span class="k-stars ${cls}" aria-label="${n} / 3">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}">★</i>`).join('')}</span>`;

  // Two islands are open at the start; every finished island opens one more
  const isOpen = i => i <= Store.kidsStickerCount + 1;

  // ---------- island map ----------
  function map() {
    K.endLesson();
    const next = KIDS_THEMES.findIndex((th, i) => isOpen(i) && !Store.kidsHasSticker(th.id));
    K.view.innerHTML = `
      <div class="k-wrap">
        <div class="k-head">
          <div class="k-owl">
            <a class="k-owl-link" href="#/kids/owl" aria-label="${kt('wardrobe')}">${owlAv()}<span class="k-owl-edit" aria-hidden="true">👕</span></a>
            <div class="k-bubble" role="status">${Store.kidsStickerCount ? kt('pick') : kt('hi')}</div>
          </div>
          <div class="k-chips">
            <span class="k-chip star"><b>★ ${Store.kidsTotalStars}</b> ${kt('stars')}</span>
            <a class="k-chip sticker" href="#/kids/stickers"><b>🎁 ${Store.kidsStickerCount}/${KIDS_THEMES.length}</b> ${kt('stickers')}</a>
          </div>
        </div>
        <h1 class="sr-only">${kt('title')}</h1>
        ${chestCard()}
        <a class="k-abc-card" href="#/kids/abc">
          <span class="k-abc-letters" aria-hidden="true"><b>A</b><b>B</b><b>C</b></span>
          <span class="grow"><b>${kt('abc')}</b><small>${kt('abcSub')}</small></span>
          ${Store.kidsHasSticker('abc') ? starsHtml(Store.kidsStars('abc'), 'sm') : ''}
        </a>
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
    if (cur) setTimeout(() => cur.scrollIntoView({ block: 'center', behavior: 'smooth' }), 60);
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
    K.confetti('kids');
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
      ...(Rec() ? K.shuffle(words).slice(0, 3).map(w => ({ kind: 'say', w })) : []),
      { kind: 'match' }
    ];
    let at = 0, firstTry = 0, tapped = 0;

    const progress = () => K.lessonBar(at / steps.length);
    function nextStep() { at++; at < steps.length ? show() : finish(); }

    function show() {
      progress();
      const s = steps[at];
      if (s.kind === 'meet') meet(s.w, words.indexOf(s.w));
      else if (s.kind === 'tap') tap(s.w);
      else if (s.kind === 'pop') pop(s.w);
      else if (s.kind === 'say') sayIt(s.w);
      else match();
    }

    // Meet: one big picture at a time, heard as soon as it shows
    function meet(w, n) {
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">👀</span> ${kt('meet')} · ${n + 1}/${words.length}</p>
          <button class="k-card k-meet" id="k-pic" aria-label="${w.en}">
            <span class="k-pic" aria-hidden="true">${w.pic}</span>
            <span class="k-word en" lang="en">${w.en}</span>
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
            $('.k-owl').classList.add('happy');
            K.announce(cheer);
            sayEn(w.en);
            setTimeout(nextStep, 1200);
          } else {
            missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            $('.k-bubble').textContent = kt('tryAgain');
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
            $('.k-owl').classList.add('happy');
            K.announce(cheer);
            setTimeout(() => sayEn(w.en), 250);
            setTimeout(nextStep, 1300);
          } else {
            missed = true;
            b.classList.remove('nope'); void b.offsetWidth; b.classList.add('nope');
            K.Feel.wrong(b);
            $('.k-bubble').textContent = kt('tryAgain');
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
      const done = text => {
        mic.disabled = true;
        bub().textContent = text;
        $('.k-owl').classList.add('happy');
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
                  <span class="k-mem-face ${c.side}" aria-hidden="true">${c.side === 'pic' ? c.w.pic : c.w.en}</span>
                </span>
              </button>`).join('')}
          </div>
          ${owl(kt('matchTip'), 'small')}
        </div>`;
      say([['he', kt('sayMatch')]]);
      K.view.querySelectorAll('.k-mem').forEach(b => {
        b.onclick = () => {
          const i = +b.dataset.i, c = cards[i];
          if (busy || b.classList.contains('up')) return;
          b.classList.add('up');
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
          <div class="k-end-card">
            <h1>${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
            ${res.firstSticker ? `
              <div class="k-sticker-new">
                <span class="k-sticker pop" aria-hidden="true">${th.sticker}</span>
                <b>${kt('newSticker')}</b>
              </div>` : res.better ? `<b class="k-best">${kt('best')}</b>` : ''}
            ${opened >= 0 ? `<p class="k-unlock">🔓 ${kt('nextIsland')} <span aria-hidden="true">${KIDS_THEMES[opened].pic}</span></p>` : ''}
          </div>
          <button class="k-btn" id="k-map">${kt('backToMap')}</button>
          <button class="k-btn ghost" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
        </div>`;
      K.confetti('kids');
      K.Feel.right();
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
          ${KIDS_ABC.map((x, i) => `<a class="k-letter" href="#/kids/abc/${x.L}" style="--c:${BALLOONS[i % BALLOONS.length]}" aria-label="${x.L}"><b>${x.L}</b><small>${x.L.toLowerCase()}</small></a>`).join('')}
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
        <p class="k-tip">${kt('meetTip')}</p>
        <div class="k-letter-nav">
          ${prev ? `<a class="k-btn ghost" href="#/kids/abc/${prev.L}" aria-label="${prev.L}">← ${prev.L}</a>` : '<span></span>'}
          ${next ? `<a class="k-btn" href="#/kids/abc/${next.L}" aria-label="${next.L}">${next.L} →</a>` : `<a class="k-btn" href="#/kids/abcgame" aria-label="${kt('abcGame')}">🎮</a>`}
        </div>
      </div>`;
    const card = $('#k-letter');
    const hear = () => { sayLetter(x); card.classList.remove('boing'); void card.offsetWidth; card.classList.add('boing'); };
    card.onclick = hear;
    setTimeout(hear, 150);
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
            $('.k-owl').classList.add('happy');
            sayLetter(x);
            setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 2200);
          } else {
            missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            $('.k-bubble').textContent = kt('tryAgain');
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
          <div class="k-end-card">
            <h1>${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
            ${res.firstSticker ? `<div class="k-sticker-new"><span class="k-sticker pop" aria-hidden="true">🔤</span><b>${kt('newSticker')}</b></div>`
              : res.better ? `<b class="k-best">${kt('best')}</b>` : ''}
          </div>
          <a class="k-btn" href="#/kids/abc">ABC</a>
          <button class="k-btn ghost" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
        </div>`;
      K.confetti('kids');
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
    init(helpers) { K = helpers; },
    // First meeting: the owl greets the child (Hebrew when there is a Hebrew voice, then English)
    hello() { say([['he', 'היי! אני הינשוף. בואו נלמד אנגלית ביחד!'], ['en', "Hello! Let's play!"]]); },
    show(a, b) {
      stopRec();
      document.body.classList.add('kids');
      if (a === 'parents') return parents();
      if (overLimit()) return rest();   // checked between screens, never in the middle of a game
      if (a === 'play') play(b);
      else if (a === 'stickers') stickers();
      else if (a === 'abc') b ? letter(b) : abc();
      else if (a === 'abcgame') abcGame();
      else if (a === 'owl') wardrobe();
      else map();
    },
    gate,
    leave() { stopRec(); document.body.classList.remove('kids'); document.body.style.removeProperty('--kc'); }
  };
})();
