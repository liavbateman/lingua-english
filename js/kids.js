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
  const BALLOONS = ['#ff5d8f', '#3fa7ff', '#ffc93c', '#2fd093', '#b98cff'];

  // ---------- the owl buddy ----------
  const owl = (text, mood = '') => `
    <div class="k-owl ${mood}">
      <img src="icons/owl-192.png" alt="" width="64" height="64">
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
          ${owl(Store.kidsStickerCount ? kt('pick') : kt('hi'))}
          <div class="k-chips">
            <span class="k-chip star"><b>★ ${Store.kidsTotalStars}</b> ${kt('stars')}</span>
            <a class="k-chip sticker" href="#/kids/stickers"><b>🎁 ${Store.kidsStickerCount}/${KIDS_THEMES.length}</b> ${kt('stickers')}</a>
          </div>
        </div>
        <h1 class="sr-only">${kt('title')}</h1>
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
      </div>`;
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
      </div>`;
  }

  return {
    init(helpers) { K = helpers; },
    // First meeting: the owl greets the child (Hebrew when there is a Hebrew voice, then English)
    hello() { say([['he', 'היי! אני הינשוף. בואו נלמד אנגלית ביחד!'], ['en', "Hello! Let's play!"]]); },
    show(a, b) {
      document.body.classList.add('kids');
      if (a === 'play') play(b);
      else if (a === 'stickers') stickers();
      else if (a === 'abc') b ? letter(b) : abc();
      else if (a === 'abcgame') abcGame();
      else map();
    },
    leave() { document.body.classList.remove('kids'); document.body.style.removeProperty('--kc'); }
  };
})();
