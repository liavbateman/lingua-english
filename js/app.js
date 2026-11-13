// Hash router + screens. Each screen is a function that renders into #view.
// Interface texts come from i18n.js through t('key'); Hebrew is the default and reads right to left.
(() => {
  const view = document.getElementById('view');
  const $ = (sel, root = view) => root.querySelector(sel);

  const shuffle = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const svg = (body, filled) => filled
    ? `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${body}</svg>`
    : `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

  const ICON = {
    book: svg('<path d="M12 6.5C10 5 7 4.5 3.5 5v13.5c3.500-.5 6.500 0 8.500 1.500 2-1.500 5-2 8.500-1.500V5C17 4.500 14 5 12 6.500zM12 6.500V20"/>'),
    mic: svg('<rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M5.500 11.500a6.500 6.500 0 0 0 13 0M12 18v3M8.500 21h7"/>'),
    headphones: svg('<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="13" width="5" height="7" rx="2" fill="currentColor"/><rect x="16" y="13" width="5" height="7" rx="2" fill="currentColor"/>'),
    pencil: svg('<path d="M4 20l1-4.500L16.500 4a2 2 0 0 1 3 0l.5.500a2 2 0 0 1 0 3L8.500 19z" fill="currentColor"/>'),
    repeat: svg('<path d="M4 12a8 8 0 0 1 14-5.300L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.300L4 15M4 20v-5h5"/>'),
    check: svg('<path d="M5 12.500l4.500 4.500L19 7.500" stroke-width="3"/>'),
    speaker: svg('<path d="M4 9.500v5h3.500L12 19V5L7.500 9.500z" fill="currentColor"/><path d="M15.500 9a4.500 4.500 0 0 1 0 6M18 6.500a8 8 0 0 1 0 11"/>'),
    levels: svg('<rect x="3.500" y="13" width="4.500" height="8" rx="1.200"/><rect x="9.800" y="8" width="4.500" height="13" rx="1.200"/><rect x="16" y="3" width="4.500" height="18" rx="1.200"/>', true),
    keyboard: svg('<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M6.5 10h.01M10 10h.01M14 10h.01M17.5 10h.01M8 14.5h8"/>'),
    target: svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>'),
    calendar: svg('<rect x="3.500" y="5" width="17" height="15.500" rx="3"/><path d="M3.500 10h17M8 3v4M16 3v4"/>')
  };

  // Stylised clock tower for the hero card
  const TOWER = `
    <svg class="tower" viewBox="0 0 120 300" aria-hidden="true">
      <defs><linearGradient id="tw" x1="0" x2="1"><stop offset="0" stop-color="#d9a468"/><stop offset="1" stop-color="#5a3826"/></linearGradient></defs>
      <g fill="url(#tw)">
        <path d="M60 0l5 34H55z"/><path d="M40 72l20-44 20 44z"/>
        <rect x="37" y="70" width="46" height="14"/><rect x="33" y="84" width="54" height="62"/>
        <rect x="38" y="146" width="44" height="154"/>
      </g>
      <circle cx="60" cy="115" r="20" fill="#f4ecd8" stroke="#3b2618" stroke-width="3"/>
      <path d="M60 115V101M60 115l9 6" stroke="#3b2618" stroke-width="2.500" stroke-linecap="round"/>
      <path d="M46 156v144M54 156v144M66 156v144M74 156v144" stroke="#3b2618" stroke-opacity=".45" stroke-width="2"/>
    </svg>`;

  // ---------- speech ----------
  // On iPhone the voice list loads late, and without an explicit English voice
  // Safari may read English words with the device's Hebrew voice.
  let enVoice = null;
  function pickVoice() {
    const voices = speechSynthesis.getVoices().filter(v => /^en[-_]/i.test(v.lang));
    enVoice = voices.find(v => /en[-_]US/i.test(v.lang) && /Samantha/i.test(v.name))
      || voices.find(v => /en[-_]US/i.test(v.lang))
      || voices[0] || null;
  }
  if ('speechSynthesis' in window) {
    pickVoice();
    speechSynthesis.addEventListener('voiceschanged', pickVoice);
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    if (!enVoice) pickVoice();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    if (enVoice) u.voice = enVoice;
    u.rate = 0.85;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }

  // ---------- answer feedback: a small buzz on tap, a "ting" when right, a shake when wrong ----------
  const Feel = (() => {
    // iPhone has no navigator.vibrate. Since iOS 18, toggling a switch-style checkbox
    // gives a light haptic tick, so a hidden one is toggled inside the tap.
    let sw = null;
    function iosTick() {
      if (!sw) {
        const label = document.createElement('label');
        label.setAttribute('aria-hidden', 'true');
        label.style.cssText = 'position:fixed;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.setAttribute('switch', '');
        input.tabIndex = -1;
        label.appendChild(input);
        document.body.appendChild(label);
        sw = label;
      }
      sw.click();
    }
    function buzz(pattern) {
      if (navigator.vibrate) navigator.vibrate(pattern);
      else iosTick();
    }

    let ctx = null;
    function ting() {
      try {
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        // Two bell-like tones, quiet and short
        [[1318.5, 0, .14], [1975.5, .07, .1]].forEach(([freq, delay, vol]) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0, now + delay);
          gain.gain.linearRampToValueAtTime(vol, now + delay + .005);
          gain.gain.exponentialRampToValueAtTime(.0001, now + delay + .35);
          osc.connect(gain).connect(ctx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + .4);
        });
      } catch (e) { /* no sound is fine */ }
    }

    function shake(el) {
      if (!el) return;
      el.classList.remove('shake');
      void el.offsetWidth;   // restart the animation
      el.classList.add('shake');
      el.addEventListener('animationend', () => el.classList.remove('shake'), { once: true });
    }

    // iPhone only lets sound start inside a tap. Call this in the tap when the result comes later
    // (speech recognition answers a few seconds after the microphone button is pressed).
    function prime() {
      try {
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
      } catch (e) { /* no sound is fine */ }
    }

    return {
      prime,
      right() { buzz(12); ting(); },
      wrong(el) { buzz([18, 50, 28]); shake(el); }
    };
  })();

  // ---------- helpers ----------
  const levelUnits = () => UNITS.filter(u => u.level === Store.level);
  const wordsOf = level => ALL_WORDS.filter(w => w.level === level);
  const levelLabel = () => t('lv.' + Store.level);
  const nextUnit = () => levelUnits().find(u => Store.unitProgress(u).seen < u.words.length) || levelUnits()[0];
  const levelGrammar = () => GRAMMAR.filter(g => g.level === Store.level);
  const nextGrammar = () => levelGrammar().find(g => !Store.isGrammarDone(g.id)) || levelGrammar()[0];
  const bar = pct => `<div class="bar"><i style="width:${Math.min(100, pct)}%"></i></div>`;
  // Hide the word inside its example sentence. Whole words only, so "hat" is not blanked inside "that".
  const blankOut = w => {
    const word = w.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const whole = w.ex.replace(new RegExp(`(?<![A-Za-z])${word}(?![A-Za-z])`, 'i'), '_____');
    return whole !== w.ex ? whole : w.ex.replace(new RegExp(word, 'i'), '_____');
  };

  // English phrases inside a Hebrew sentence: keep each one as a single left-to-right unit,
  // so commas, quotes and brackets around it stay where the Hebrew sentence puts them.
  // A colon inside the phrase stays with it ("to be: am / is / are"); one at its end stays with the Hebrew.
  const heMix = text => text.replace(/[A-Za-z](?:[A-Za-z0-9 ,'’\/\-…?!:]*[A-Za-z0-9?!…])?/g,
    m => `<bdi dir="ltr"${m.length <= 30 ? ' class="nw"' : ''}>${m}</bdi>`);

  // Names shown in the current interface language
  const unitTitle = u => (isHe() ? (u.he || UNIT_HE[u.id] || u.title) : u.title);
  const ruleTitle = g => (isHe() ? heMix(g.he) : g.title);                                   // main heading
  const ruleOther = g => (isHe() ? `<span class="en">${g.title}</span>` : `<span class="he">${heMix(g.he)}</span>`);  // sub-line
  const formTag = tag => (isHe() && FORM_HE[tag]) || tag;
  const fwd = () => (isHe() ? '‹' : '›');   // "forward" chevron points the reading direction
  const bwd = () => (isHe() ? '›' : '‹');

  // Texts that live in index.html (header and bottom bar) + page direction
  function applyLang() {
    document.documentElement.lang = Store.lang;
    document.documentElement.dir = isHe() ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
    document.querySelectorAll('[data-t-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.tAria)));
    document.getElementById('lang').textContent = isHe() ? 'EN' : 'עב';
  }

  function refreshChrome(tab) {
    const s = Store.streak;
    document.getElementById('stat-streak').textContent = s;
    document.getElementById('stat-streak-label').textContent = t(s === 1 ? 'streak.one' : 'streak.many');
    document.querySelectorAll('.tabbar a').forEach(a => {
      a.classList.toggle('active', a.dataset.tab === tab);
      if (a.dataset.tab === tab) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  // Today's plan: the four daily activities
  function planTasks() {
    const u = nextUnit();
    const g = nextGrammar();
    // Review comes first: words due today are the ones about to be forgotten.
    // It stays on the list once done today, so the count doesn't jump back.
    const due = Store.dueWords().length;
    const review = due || Store.tasks.review
      ? [{ id: 'review', title: t('task.review'),
          sub: Store.tasks.review && !due ? t('task.review.done') : due === 1 ? t('task.review.one') : t('task.review.sub', { n: due }),
          href: '#/quiz/choice/review', icon: 'repeat', color: 'coral' }]
      : [];
    return [
      ...review,
      { id: 'vocab', title: t('task.vocab'), sub: t('task.vocab.sub', { n: u.words.length }), href: `#/unit/${u.id}`, icon: 'book', color: 'blue' },
      { id: 'speak', title: t('task.speak'), sub: t('task.speak.sub'), href: '#/speak', icon: 'mic', color: 'purple' },
      { id: 'listen', title: t('task.listen'), sub: t('task.listen.sub'), href: '#/quiz/listen/level', icon: 'headphones', color: 'green' },
      { id: 'grammar', title: t('task.grammar'), sub: t('task.grammar.sub', { title: ruleTitle(g) }), href: `#/grammar/${g.id}`, icon: 'pencil', color: 'gold' }
    ];
  }

  // ---------- Home ----------
  function home() {
    const lw = wordsOf(Store.level);
    const pct = Math.round((lw.filter(w => Store.isMastered(w.id)).length / lw.length) * 100);
    const learned = ALL_WORDS.filter(w => Store.isMastered(w.id)).length;
    const tasks = planTasks();
    const done = Store.tasks;
    const doneCount = tasks.filter(x => done[x.id]).length;
    const single = lw.filter(w => !w.phrase);
    // Count days on the local clock, so the word changes at midnight here and not at midnight UTC
    const localDay = Math.floor((Date.now() - new Date().getTimezoneOffset() * 6e4) / 864e5);
    const wotd = single[localDay % single.length];
    const tricky = Store.trickyWords();

    view.innerHTML = `
      <section class="hero">
        ${TOWER}
        <span class="pill">⭐ ${t('home.journey')}</span>
        <h2>${t('home.title')}</h2>
        <p>${t('home.sub')}</p>
        <div class="hero-stats">
          <div><b>${pct}<small>%</small></b><span>${t('home.overall')}</span></div>
          <div><b>${Store.best}</b><span>${t('home.record')}</span></div>
          <div><b>${learned}</b><span>${t('home.learned')}</span></div>
        </div>
        ${bar(pct)}
      </section>

      <div class="section">${ICON.levels} ${t('home.level')} <span class="end">${levelLabel()}</span></div>
      <div class="seg" role="group" aria-label="${t('home.level')}">
        ${LEVELS.map(l => `<button data-level="${l.id}" class="${l.id === Store.level ? 'on' : ''}" aria-pressed="${l.id === Store.level}">${t('lv.' + l.id)}</button>`).join('')}
      </div>

      <div class="section">${ICON.calendar} ${t('home.plan')} <span class="end"><b class="en">${doneCount} / ${tasks.length}</b> ${t('home.completed')}</span></div>
      ${tasks.map(x => `
        <a class="task" href="${x.href}">
          <span class="tile ${x.color}">${ICON[x.icon]}</span>
          <span class="grow"><b>${x.title}</b><span class="small">${x.sub}</span></span>
          <span class="check ${done[x.id] ? 'done' : ''}">${done[x.id] ? ICON.check : ''}</span>
        </a>`).join('')}

      ${tricky.length ? `
      <a class="task tricky-card" href="#/quiz/choice/tricky">
        <span class="tile rose">${ICON.target}</span>
        <span class="grow"><b>${t('tricky.title')}</b><span class="small">${t(tricky.length === 1 ? 'tricky.one' : 'tricky.some', { n: tricky.length })}</span></span>
        <span class="go-chev" aria-hidden="true">${fwd()}</span>
      </a>` : ''}

      <section class="wotd">
        <div class="wotd-head"><span>📖 ${t('home.wotd')}</span><span class="tag">${t('home.vocabTag')}</span></div>
        <div class="wotd-main">
          <div class="grow">
            <div class="word en">${wotd.en}</div>
            <div class="meaning he">${wotd.he}</div>
          </div>
          <button class="speak" id="wotd-speak" aria-label="${t('aria.listen')}">${ICON.speaker}</button>
        </div>
        <div class="quote en">“${wotd.ex}”</div>
      </section>

      <a class="cta" href="#/quiz/choice/level">
        <span class="trophy">🏆</span>
        <span class="grow"><b>${t('home.challenge')}</b><span class="small">${t('home.challenge.sub')}</span></span>
        <span class="go">${t('home.start')} ${fwd()}</span>
      </a>`;

    $('#wotd-speak').onclick = () => speak(wotd.en);
    view.querySelectorAll('.seg button').forEach(b => {
      b.onclick = () => {
        Store.level = b.dataset.level;
        home();
        view.querySelector(`.seg [data-level="${b.dataset.level}"]`).focus();   // keep the keyboard where it was
      };
    });
  }

  // ---------- Learn ----------
  function unitCard(u) {
    const p = Store.unitProgress(u);
    return `
      <a class="card" href="#/unit/${u.id}">
        <div class="row">
          <span class="tile dim">${u.emoji}</span>
          <div class="grow">
            <b>${unitTitle(u)}</b>
            <div class="small">${t(u.kind === 'phrases' ? 'learn.sentences' : 'learn.words', { a: p.mastered, b: p.total })}</div>
            ${bar(p.pct)}
          </div>
        </div>
      </a>`;
  }

  const learnTabs = on => `
    <div class="seg" style="margin-bottom:14px">
      ${[['vocab', '#/learn'], ['phrases', '#/phrases'], ['grammar', '#/grammar'], ['practice', '#/practice']].map(([id, href]) =>
        `<a href="${href}" class="${on === id ? 'on' : ''}"${on === id ? ' aria-current="page"' : ''}>${t('learn.' + id)}</a>`).join('')}
    </div>`;

  function learn() {
    view.innerHTML = `
      <h1>${t('learn.title')}</h1>
      <p class="sub">${t('learn.sub', { level: levelLabel() })}</p>
      ${learnTabs('vocab')}
      ${levelUnits().filter(u => u.kind !== 'phrases').map(unitCard).join('')}`;
  }

  // Useful full sentences, grouped by situation
  function phrases() {
    view.innerHTML = `
      <h1>${t('learn.title')}</h1>
      <p class="sub">${t('learn.phrases.sub', { level: levelLabel() })}</p>
      ${learnTabs('phrases')}
      ${levelUnits().filter(u => u.kind === 'phrases').map(unitCard).join('')}`;
  }

  // ---------- Grammar ----------
  function grammarList() {
    const list = levelGrammar();
    const doneCount = list.filter(g => Store.isGrammarDone(g.id)).length;
    view.innerHTML = `
      <h1>${t('learn.title')}</h1>
      <p class="sub">${t('grammar.sub', { level: levelLabel(), a: doneCount, b: list.length })}</p>
      ${learnTabs('grammar')}
      ${list.map((g, n) => `
        <a class="task" href="#/grammar/${g.id}">
          <span class="tile dim num">${n + 1}</span>
          <span class="grow"><b>${ruleTitle(g)}</b><span class="small">${ruleOther(g)}</span></span>
          <span class="check ${Store.isGrammarDone(g.id) ? 'done' : ''}">${Store.isGrammarDone(g.id) ? ICON.check : ''}</span>
        </a>`).join('')}`;
  }

  function grammarTopic(id) {
    const g = GRAMMAR.find(x => x.id === id);
    if (!g) return notFound();
    view.innerHTML = `
      <a class="back" href="#/grammar">${bwd()} ${t('grammar.back')}</a>
      <h1>${ruleTitle(g)}</h1>
      <p class="sub">${ruleOther(g)}</p>

      <div class="card">
        <div class="label">${t('grammar.when')}</div>
        <p class="he para">${heMix(g.when)}</p>
      </div>

      <div class="card">
        <div class="label">${t('grammar.structure')}</div>
        ${g.forms.map(([tag, text]) => `<div class="form en"><span class="ftag">${formTag(tag)}</span><span class="grow">${text}</span></div>`).join('')}
      </div>

      <div class="card">
        <div class="label">${t('grammar.examples')}</div>
        ${g.ex.map(([en, he], n) => `
          <div class="example-row">
            <button class="speak sm" data-say="${n}" aria-label="${t('aria.listen')}">${ICON.speaker}</button>
            <div class="grow"><b class="en">${en}</b><div class="he">${he}</div></div>
          </div>`).join('')}
      </div>

      <div class="card tip">
        <div class="label">⚠️ ${t('grammar.mistake')}</div>
        <p class="he para">${heMix(g.tip)}</p>
      </div>

      <a class="btn" href="#/grammar/${g.id}/quiz">${t('grammar.practice')}</a>`;
    view.querySelectorAll('[data-say]').forEach(b => { b.onclick = () => speak(g.ex[b.dataset.say][0]); });
  }

  function grammarQuiz(id) {
    const g = GRAMMAR.find(x => x.id === id);
    if (!g) return notFound();
    let i = 0, correct = 0;

    function question() {
      const [q, answer, wrong] = g.quiz[i];
      view.innerHTML = `
        <p class="sub">${ruleTitle(g)} · ${t('quiz.count', { a: i + 1, b: g.quiz.length })}</p>
        ${bar((i / g.quiz.length) * 100)}
        <div class="card question">
          <div class="small">${t('grammar.choose')}</div>
          <div class="prompt sentence en" id="sentence">${q.replace('___', '_____')}</div>
        </div>
        <div class="options">
          ${shuffle([answer, ...wrong]).map(o => `<button class="opt en">${o}</button>`).join('')}
        </div>
        <button class="btn" id="next" hidden>${t(i === g.quiz.length - 1 ? 'btn.finish' : 'btn.next')}</button>`;

      view.querySelectorAll('.opt').forEach(btn => {
        btn.onclick = () => {
          const ok = btn.textContent === answer;
          view.querySelectorAll('.opt').forEach(b => {
            b.disabled = true;
            if (b.textContent === answer) b.classList.add('right');
          });
          if (!ok) btn.classList.add('wrong');
          ok ? Feel.right() : Feel.wrong(btn);
          if (ok) correct++;
          const full = q.replace('___', answer);
          $('#sentence').textContent = full;
          speak(full.replace(/"/g, ''));
          $('#next').hidden = false;
        };
      });
      $('#next').onclick = () => { i++; i < g.quiz.length ? question() : summary(); };
    }

    function summary() {
      const passed = correct >= g.quiz.length - 1;
      // The daily task counts only when the rule was actually passed
      if (passed) { Store.markGrammar(g.id); Store.completeTask('grammar'); }
      refreshChrome('learn');
      const next = levelGrammar().find(x => !Store.isGrammarDone(x.id));
      view.innerHTML = `
        <div class="card center" style="margin-top:14px">
          <div class="big">${passed ? '🏆' : '💪'}</div>
          <h1>${t('quiz.score', { a: correct, b: g.quiz.length })}</h1>
          <p class="sub">${t(passed ? 'grammar.done' : 'grammar.retry')}</p>
          ${passed
            ? (next ? `<a class="btn" href="#/grammar/${next.id}">${t('grammar.next', { title: ruleTitle(next) })}</a>` : `<a class="btn" href="#/">${t('btn.home')}</a>`)
            : `<a class="btn" href="#/grammar/${g.id}">${t('grammar.again')}</a>`}
          <a class="btn ghost" href="#/grammar">${t('grammar.all')}</a>
        </div>`;
    }

    question();
  }

  // ---------- Flashcards ----------
  function lesson(unitId) {
    const unit = UNITS.find(u => u.id === unitId);
    if (!unit) return notFound();
    let i = 0, flipped = false;

    function draw(focusId) {
      const w = unit.words[i];
      Store.markSeen(w.id);
      const last = i === unit.words.length - 1;
      view.innerHTML = `
        <h1>${unit.emoji} ${unitTitle(unit)}</h1>
        <p class="sub">${t('card.count', { a: i + 1, b: unit.words.length })}</p>
        ${bar(((i + 1) / unit.words.length) * 100)}
        <div class="card flash" id="flash">
          <div class="word en ${w.phrase ? 'long' : ''}">${w.en}</div>
          <button class="speak" id="speak" aria-label="${t('aria.listen')}">${ICON.speaker}</button>
          <div aria-live="polite">${flipped
            ? `<div class="he ${w.phrase ? 'long' : ''}">${w.he}</div>${w.ex ? `<div class="example en">${w.ex}</div>` : ''}`
            : ''}</div>
          <button class="hint" id="flip" aria-expanded="${flipped}">${t(flipped ? 'card.hide' : 'card.hint')}</button>
        </div>
        <div class="pager">
          <button class="btn ghost" id="prev" ${i === 0 ? 'disabled' : ''}>${t('btn.back')}</button>
          ${last
            ? `<a class="btn" href="#/quiz/choice/${unit.id}">${t('card.practice')}</a>`
            : `<button class="btn" id="next">${t('btn.next')}</button>`}
        </div>`;
      $('#flash').onclick = () => { flipped = !flipped; draw('flip'); };
      $('#speak').onclick = e => { e.stopPropagation(); speak(w.en); };
      $('#prev').onclick = () => { i--; flipped = false; draw(i === 0 ? 'next' : 'prev'); };
      if (!last) $('#next').onclick = () => { i++; flipped = false; draw(i === unit.words.length - 1 ? 'prev' : 'next'); };
      if (focusId && $('#' + focusId)) $('#' + focusId).focus();
    }
    draw();
  }

  // ---------- Practice (third section of the Learn screen) ----------
  function practice() {
    const due = Store.dueWords().length;
    const modes = [
      ...(Store.trickyWords().length ? [{ title: t('tricky.title'), sub: t('tricky.some', { n: Store.trickyWords().length }), href: '#/quiz/choice/tricky', icon: 'target', color: 'rose' }] : []),
      { title: t('practice.review'), sub: due === 1 ? t('practice.review.one') : due ? t('practice.review.some', { n: due }) : t('practice.review.none'), href: '#/quiz/choice/review', icon: 'repeat', color: 'blue' },
      { title: t('task.speak'), sub: t('practice.speak.sub'), href: '#/speak', icon: 'mic', color: 'purple' },
      { title: t('task.listen'), sub: t('practice.listen.sub'), href: '#/quiz/listen/level', icon: 'headphones', color: 'green' },
      { title: t('practice.cloze'), sub: t('practice.cloze.sub'), href: '#/quiz/cloze/level', icon: 'pencil', color: 'gold' },
      { title: t('practice.type'), sub: t('practice.type.sub'), href: '#/quiz/type/level', icon: 'keyboard', color: 'coral' }
    ];
    view.innerHTML = `
      <h1>${t('learn.title')}</h1>
      <p class="sub">${t('practice.sub', { level: levelLabel() })}</p>
      ${learnTabs('practice')}
      ${modes.map(m => `
        <a class="task" href="${m.href}">
          <span class="tile ${m.color}">${ICON[m.icon]}</span>
          <span class="grow"><b>${m.title}</b><span class="small">${m.sub}</span></span>
        </a>`).join('')}`;
  }

  // Words for an exercise: a unit, the due words, or the current level
  function poolFor(source) {
    if (source === 'review') return { pool: Store.dueWords(), title: t('quiz.review') };
    if (source === 'missed') return { pool: lastMissed, title: t('quiz.missedTitle') };
    if (source === 'tricky') return { pool: Store.trickyWords(), title: t('tricky.title') };
    const unit = UNITS.find(u => u.id === source);
    if (unit) return { pool: unit.words, title: `${unit.emoji} ${unitTitle(unit)}` };
    if (source === 'level') {
      const all = wordsOf(Store.level);
      const seen = all.filter(w => Store.isSeen(w.id));
      // Prefer words that were already studied; fall back to the whole level
      return { pool: seen.length >= 6 ? seen : all, title: levelLabel() };
    }
    return null;
  }

  // Words answered wrong (first try) in the last quiz round, for "Practice these again"
  let lastMissed = [];

  function done(emoji, title, text, extra = '') {
    view.innerHTML = `
      <div class="card center" style="margin-top:14px">
        <div class="big">${emoji}</div>
        <h1>${title}</h1>
        <p class="sub">${text}</p>
        ${extra}
        <a class="btn" href="#/">${t('btn.home')}</a>
        <a class="btn ghost" href="#/practice">${t('btn.more')}</a>
      </div>`;
    refreshChrome('learn');
  }

  // ---------- Typing ----------
  // Forgiving comparison: case, extra spaces, end punctuation and curly apostrophes don't matter
  const normalize = s => s.toLowerCase().replace(/[’‘`]/g, "'").replace(/[.,!?;:"]/g, '').replace(/\s+/g, ' ').trim();
  function editDistance(a, b) {
    const row = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      let prev = row[0];
      row[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const cur = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = cur;
      }
    }
    return row[b.length];
  }
  // 'right', 'close' (one small typo in a word of 4+ letters, still counted) or 'wrong'.
  // Any word of the level with the same Hebrew meaning is accepted too.
  function gradeTyped(typed, w) {
    const got = normalize(typed);
    if (!got) return 'wrong';
    const targets = [w, ...wordsOf(w.level).filter(x => !x.phrase && x.he === w.he && x.id !== w.id)].map(x => normalize(x.en));
    if (targets.includes(got)) return 'right';
    return targets.some(x => x.length >= 4 && editDistance(got, x) <= 1) ? 'close' : 'wrong';
  }

  // ---------- Quiz ----------
  // mode: 'choice' (translate), 'listen' (hear and pick), 'cloze' (complete the sentence), 'type' (write the English)
  function quiz(mode, source) {
    const src = poolFor(source);
    if (!src || !['choice', 'listen', 'cloze', 'type'].includes(mode)) return notFound();
    if (!src.pool.length) {
      view.innerHTML = `
        <div class="card center" style="margin-top:14px">
          <div class="big">✅</div>
          <h1>${t('quiz.empty')}</h1>
          <p class="sub">${t('quiz.empty.sub')}</p>
          <a class="btn" href="#/learn">${t('btn.lessons')}</a>
        </div>`;
      return;
    }

    // "Complete the sentence" and typing use single words (sentences are too long to type on a phone)
    const usable = mode === 'cloze' || mode === 'type' ? src.pool.filter(w => !w.phrase) : src.pool;
    const queue = shuffle(usable.length ? usable : src.pool).slice(0, 8);
    const total = queue.length;           // the score counts first tries only
    const tried = new Set();              // words already answered once this round
    const retries = new Map();            // how many times each word was sent back
    const missed = [];                    // words answered wrong on the first try
    let i = 0, correct = 0;

    function question() {
      const w = queue[i];
      const retry = tried.has(w.id);
      let kind = mode;
      if (kind === 'cloze' && (w.phrase || blankOut(w) === w.ex)) kind = 'choice';
      if (kind === 'type' && w.phrase) kind = 'choice';
      // Translation questions go both ways: English → Hebrew and Hebrew → English
      const toHebrew = kind === 'choice' && Math.random() < 0.5;
      const key = toHebrew ? 'he' : 'en';
      const long = w.phrase ? 'long' : '';
      // Wrong answers are of the same kind: words for a word, sentences for a sentence
      // and no two buttons may show the same text (two words can share a translation)
      const others = [];
      const shown = new Set([w[key]]);
      for (const x of shuffle(wordsOf(w.level))) {
        if (others.length === 3) break;
        if (x.phrase !== w.phrase || shown.has(x[key])) continue;
        shown.add(x[key]);
        others.push(x);
      }
      const options = shuffle([w, ...others]);

      let prompt;
      if (kind === 'listen') {
        prompt = `<div class="small">${t('quiz.listen')}</div>
                  <button class="speak xl" id="speak" aria-label="${t('aria.listen')}">${ICON.speaker}</button>`;
      } else if (kind === 'cloze') {
        prompt = `<div class="small">${t('quiz.cloze')}</div>
                  <div class="prompt sentence en" id="sentence">${blankOut(w)}</div>
                  <div class="small he">${w.he}</div>`;
      } else if (kind === 'type') {
        prompt = `<div class="small">${t('quiz.type')}</div>
                  <div class="prompt he">${w.he}</div>`;
      } else if (toHebrew) {
        prompt = `<div class="small">${t('quiz.mean')}</div>
                  <div class="prompt en ${long}">${w.en}</div>
                  <button class="speak" id="speak" style="margin:6px auto 0" aria-label="${t('aria.listen')}">${ICON.speaker}</button>`;
      } else {
        prompt = `<div class="small">${t('quiz.say')}</div>
                  <div class="prompt he ${long}">${w.he}</div>`;
      }

      view.innerHTML = `
        <p class="sub">${src.title} · ${t('quiz.count', { a: i + 1, b: queue.length })}</p>
        ${bar((i / queue.length) * 100)}
        <div class="card question">${retry ? `<div class="again">${ICON.repeat}${t('quiz.again')}</div>` : ''}${prompt}</div>
        ${kind === 'type' ? `
        <form class="typed" id="typed" autocomplete="off">
          <input id="answer" class="en" dir="ltr" lang="en" type="text" enterkeyhint="go"
            autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="${t('quiz.type')}" placeholder="${t('quiz.type.ph')}">
          <button class="btn" id="check" type="submit">${t('quiz.check')}</button>
          <div class="typed-result" id="result" aria-live="polite"></div>
        </form>` : `
        <div class="options">
          ${options.map(o => `<button class="opt ${toHebrew ? 'he' : 'en'} ${long}" data-id="${o.id}">${o[key]}</button>`).join('')}
        </div>`}
        <button class="btn" id="next" hidden>${t(i === queue.length - 1 ? 'btn.finish' : 'btn.next')}</button>`;

      const sp = $('#speak');
      if (sp) sp.onclick = () => speak(w.en);
      if (kind === 'listen') speak(w.en);

      // After any answer: score it, maybe send the word back, reveal "Next"
      function settle(ok) {
          announce(ok ? t('sr.right') : t('sr.wrong', { answer: w[kind === 'choice' && toHebrew ? 'he' : 'en'] }));
          // Only the first try is scored and moves the word between review boxes
          if (!retry) {
            if (ok) correct++; else missed.push(w);
            Store.answer(w.id, ok);
            tried.add(w.id);
            refreshChrome('learn');
          }
          // A missed word comes back a few questions later (at most twice), while the answer is still fresh
          if (!ok && (retries.get(w.id) || 0) < 2) {
            retries.set(w.id, (retries.get(w.id) || 0) + 1);
            queue.splice(Math.min(i + 3, queue.length), 0, w);
          }
          $('#next').textContent = t(i === queue.length - 1 ? 'btn.finish' : 'btn.next');
          if (kind === 'cloze') $('#sentence').textContent = w.ex;
          if (kind !== 'listen' && !toHebrew) speak(kind === 'cloze' ? w.ex : w.en);
          $('#next').hidden = false;
          if (kind !== 'type') $('#next').focus();
      }

      view.querySelectorAll('.opt').forEach(btn => {
        btn.onclick = () => {
          const ok = btn.dataset.id === w.id;
          view.querySelectorAll('.opt').forEach(b => {
            b.disabled = true;
            if (b.dataset.id === w.id) b.classList.add('right');
          });
          if (!ok) btn.classList.add('wrong');
          ok ? Feel.right() : Feel.wrong(btn);
          settle(ok);
        };
      });

      if (kind === 'type') {
        const input = $('#answer');
        input.focus();   // runs inside the tap on "Next", so iPhone opens the keyboard
        $('#typed').onsubmit = e => {
          e.preventDefault();
          if (input.readOnly) return;
          if (!input.value.trim()) return input.focus();
          const grade = gradeTyped(input.value, w);
          input.readOnly = true;
          input.classList.add(grade === 'wrong' ? 'wrong' : 'right');
          grade === 'wrong' ? Feel.wrong(input) : Feel.right();
          $('#check').hidden = true;
          $('#result').innerHTML = grade === 'right'
            ? `<b class="ok">${t('quiz.type.right')}</b>`
            : `<b class="${grade === 'close' ? 'ok' : 'bad'}">${t(grade === 'close' ? 'quiz.type.close' : 'quiz.type.wrong')}</b>
               <span class="en" dir="ltr">${w.en}</span>`;
          settle(grade !== 'wrong');
          $('#next').focus();   // Enter again goes on to the next word
        };
      }
      $('#next').onclick = () => { i++; i < queue.length ? question() : summary(); };
    }

    function summary() {
      const pct = Math.round((correct / total) * 100);
      // Daily tasks count only with at least half the answers right
      if (pct >= 50) {
        if (mode === 'listen') Store.completeTask('listen');
        if (source === 'review') Store.completeTask('review');
        // Finishing a unit's practice (after its flashcards) completes the vocabulary task
        if (UNITS.some(u => u.id === source)) Store.completeTask('vocab');
      }
      // The words to fix, each with its sound and meaning, and one tap to practise just them
      lastMissed = missed.slice();
      const fix = missed.length ? `
        <div class="missed">
          <div class="label">${t('quiz.missed')}</div>
          ${missed.map((w, n) => `
            <div class="example-row">
              <button class="speak sm" data-say="${n}" aria-label="${t('aria.listen')}">${ICON.speaker}</button>
              <div class="grow"><b class="en">${w.en}</b><div class="he">${w.he}</div></div>
            </div>`).join('')}
        </div>
        <a class="btn" href="#/quiz/${mode}/missed">${ICON.repeat} ${t('quiz.again.missed')}</a>` : '';
      done(pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪',
        t('quiz.score', { a: correct, b: total }),
        t(pct >= 80 ? 'quiz.great' : 'quiz.keep'), fix);
      view.querySelectorAll('.missed [data-say]').forEach(b => { b.onclick = () => speak(missed[b.dataset.say].en); });
      // with mistakes, "Practice these again" is the main button, so Home becomes the quiet one
      if (missed.length) view.querySelector('a.btn[href="#/"]').classList.add('ghost');
    }

    question();
  }

  // ---------- Speaking ----------
  // Listen, repeat out loud, then rate yourself.
  // How much of the target the recogniser heard: share of its words found, 0..1.
  // Digits count as words ("10" = "ten"), so the recogniser's number style doesn't matter.
  const NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  const spokenWords = s => normalize(s).replace(/-/g, ' ').split(' ').filter(Boolean)
    .map(x => (/^\d+$/.test(x) && NUMBERS[+x]) || (x === '100' ? 'hundred' : x));
  function heardScore(target, heard) {
    const want = spokenWords(target);
    const got = spokenWords(heard);
    const found = want.filter(x => got.some(y => y === x || (x.length >= 5 && editDistance(x, y) <= 1)));
    return found.length / want.length;
  }

  let recognition = null;   // the one that is listening now, stopped when the screen changes
  const Recognition = () => window.SpeechRecognition || window.webkitSpeechRecognition;

  // ---------- Speaking ----------
  // Listen, say it into the microphone and get feedback. Where the browser can't listen,
  // the learner rates themselves ("I said it" / "Still hard").
  function speaking() {
    const queue = shuffle(poolFor('level').pool).slice(0, 6);
    let i = 0, good = 0;

    function draw() {
      const w = queue[i];
      let heardOk = false;
      view.innerHTML = `
        <p class="sub">${t('speak.count', { a: i + 1, b: queue.length })}</p>
        ${bar((i / queue.length) * 100)}
        <div class="card flash" style="cursor:default">
          <div class="small">${t(Recognition() ? 'speak.do.mic' : 'speak.do')}</div>
          <div class="word en ${w.phrase ? 'long' : ''}" style="margin-top:8px">${w.en}</div>
          <div class="speak-row">
            <button class="speak xl" id="speak" aria-label="${t('aria.listen')}">${ICON.speaker}</button>
            ${Recognition() ? `<button class="speak xl mic" id="mic" aria-label="${t('speak.mic')}" aria-pressed="false">${ICON.mic}</button>` : ''}
          </div>
          <div class="heard" id="heard" aria-live="polite"></div>
          <div class="he ${w.phrase ? 'long' : ''}">${w.he}</div>
          ${w.ex ? `<div class="example en">${w.ex}</div>` : ''}
        </div>
        <div class="pager">
          <button class="btn ghost" id="hard">${t('speak.hard')}</button>
          <button class="btn" id="said">${t('speak.said')}</button>
        </div>`;
      $('#speak').onclick = () => speak(w.en);
      const step = ok => () => {
        if (recognition) recognition.abort();
        if (ok) good++;
        Store.answer(w.id, ok);
        i++;
        if (i < queue.length) return draw();
        Store.completeTask('speak');
        done('🎤', t('speak.score', { a: good, b: queue.length }), t('speak.sub'));
      };
      $('#said').onclick = step(true);
      $('#hard').onclick = step(false);

      const mic = $('#mic');
      if (!mic) return;
      const show = (html, cls) => { const h = $('#heard'); if (h) { h.className = 'heard ' + (cls || ''); h.innerHTML = html; } };
      const listening = on => { mic.classList.toggle('on', on); mic.setAttribute('aria-pressed', String(on)); };
      mic.onclick = () => {
        if (recognition) { recognition.abort(); return; }   // second tap stops listening
        if ('speechSynthesis' in window) speechSynthesis.cancel();
        Feel.prime();
        const Rec = Recognition();
        const rec = new Rec();
        rec.lang = 'en-US';
        rec.interimResults = false;
        rec.maxAlternatives = 5;
        recognition = rec;
        let answered = false;
        listening(true);
        show(t('speak.listening'), 'wait');
        rec.onresult = e => {
          answered = true;
          const alts = Array.from(e.results[0]).map(a => a.transcript);
          const best = alts.reduce((b, a) => (heardScore(w.en, a) > heardScore(w.en, b) ? a : b), alts[0] || '');
          if (heardScore(w.en, best) >= 0.8) {
            heardOk = true;
            show(`<b>${t('speak.great')}</b>`, 'ok');
            Feel.right();
            $('#said').textContent = t('btn.next');
            $('#said').focus();
          } else {
            show(`${t('speak.heard')} <b class="en" dir="ltr">“${best.replace(/[<>&"]/g, '')}”</b><br>${t('speak.again')}`, 'bad');
            Feel.wrong($('#heard'));
          }
        };
        rec.onerror = e => {
          answered = true;
          if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
            show(t('speak.blocked'), 'bad');
            mic.remove();                       // no microphone: self-rating only
          } else if (e.error !== 'aborted') {
            show(t('speak.nothing'), 'bad');
          }
        };
        rec.onend = () => {
          if (recognition === rec) recognition = null;
          listening(false);
          if (!answered && !heardOk) show(t('speak.nothing'), 'bad');
        };
        try { rec.start(); } catch (err) { recognition = null; listening(false); show(t('speak.nothing'), 'bad'); }
      };
    }
    draw();
  }

  // ---------- Progress ----------
  // Numbers only. The lessons themselves live on the Learn screen and nowhere else.
  function progress() {
    const mastered = ALL_WORDS.filter(w => Store.isMastered(w.id)).length;
    const levelCard = l => {
      const words = wordsOf(l.id).filter(x => !x.phrase);
      const sentences = wordsOf(l.id).filter(x => x.phrase);
      const rules = GRAMMAR.filter(g => g.level === l.id);
      const w = words.filter(x => Store.isMastered(x.id)).length;
      const s = sentences.filter(x => Store.isMastered(x.id)).length;
      const r = rules.filter(g => Store.isGrammarDone(g.id)).length;
      return `
        <div class="card">
          <b>${t('lv.' + l.id)}</b>
          <div class="meter"><span class="small">${t('progress.words', { a: w, b: words.length })}</span>${bar((w / words.length) * 100)}</div>
          ${sentences.length ? `<div class="meter"><span class="small">${t('progress.phrases', { a: s, b: sentences.length })}</span>${bar((s / sentences.length) * 100)}</div>` : ''}
          <div class="meter"><span class="small">${t('progress.rules', { a: r, b: rules.length })}</span>${bar((r / rules.length) * 100)}</div>
        </div>`;
    };
    view.innerHTML = `
      <h1>${t('progress.title')}</h1>
      <p class="sub">${t('progress.sub', { x: Store.xp })}</p>
      <div class="stats">
        <div class="card stat"><b>${mastered}</b><span class="small">${t('home.learned')}</span></div>
        <div class="card stat"><b>${Store.streak}</b><span class="small">${t('progress.streak')}</span></div>
        <div class="card stat"><b>${Store.best}</b><span class="small">${t('progress.best')}</span></div>
      </div>
      ${weekCard()}
      ${LEVELS.map(levelCard).join('')}
      <div class="card backup">
        <b>💾 ${t('backup.title')}</b>
        <p class="small">${t('backup.sub')}</p>
        <div class="pager">
          <button class="btn ghost" id="restore">${t('backup.restore')}</button>
          <button class="btn" id="save">${t('backup.save')}</button>
        </div>
        <input type="file" id="backup-file" accept=".json,application/json,text/plain" hidden>
        <p class="small backup-msg" id="backup-msg" role="status"></p>
      </div>
      <button class="btn plain" id="reset">${t('progress.reset')}</button>`;
    const msg = (text, ok) => { const m = $('#backup-msg'); m.textContent = text; m.className = 'small backup-msg ' + (ok ? 'ok' : 'bad'); };

    // On iPhone the share sheet offers "Save to Files", Notes, Mail…; elsewhere the file is downloaded
    $('#save').onclick = async () => {
      const name = `lingua-backup-${new Date().toISOString().slice(0, 10)}.json`;
      const file = new File([Store.exportData()], name, { type: 'application/json' });
      try {
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: 'Lingua' });
        } else {
          const a = document.createElement('a');
          a.href = URL.createObjectURL(file);
          a.download = name;
          a.click();
          setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        }
        msg(t('backup.saved'), true);
      } catch (e) {
        if (e.name !== 'AbortError') msg(t('backup.saveFailed'), false);   // closing the share sheet is not an error
      }
    };

    $('#restore').onclick = () => $('#backup-file').click();
    $('#backup-file').onchange = async e => {
      const f = e.target.files[0];
      e.target.value = '';
      if (!f) return;
      let text;
      try { text = await f.text(); JSON.parse(text); } catch (err) { return msg(t('backup.bad'), false); }
      if (!confirm(t('backup.confirm'))) return;
      try {
        const r = Store.importData(text);
        progress();
        refreshChrome('progress');
        msg(t('backup.restored', { n: r.words }), true);
      } catch (err) { msg(t('backup.bad'), false); }
    };

    $('#reset').onclick = () => {
      if (confirm(t('progress.confirm'))) { Store.reset(); route(); }
    };
  }

  // Answers per day for the last week: one hue, thin bars on a baseline, today labelled
  function weekCard() {
    const days = Store.week();
    const max = Math.max(...days.map(d => d.count));
    const total = days.reduce((n, d) => n + d.count, 0);
    const active = days.filter(d => d.count > 0).length;
    const dayName = new Intl.DateTimeFormat(Store.lang, { weekday: 'narrow' });
    const longName = new Intl.DateTimeFormat(Store.lang, { weekday: 'long' });
    const said = d => t('week.answers', { n: d.count });
    return `
      <div class="card week">
        <div class="week-head">
          <b>${t('week.title')}</b>
          <span class="small">${t('week.sub', { a: active, n: total })}</span>
        </div>
        <div class="week-bars" role="list">
          ${days.map(d => `
            <div class="wb${d.today ? ' today' : ''}" role="listitem" title="${longName.format(d.date)}: ${said(d)}"
              aria-label="${d.today ? t('week.today') : longName.format(d.date)}: ${said(d)}">
              <span class="wv" aria-hidden="true">${d.count && (d.today || d.count === max) ? d.count : ''}</span>
              <span class="wcol"><i style="height:${d.count ? Math.max(4, Math.round((d.count / max) * 100)) : 0}%"></i></span>
              <span class="wd" aria-hidden="true">${d.today ? t('week.todayShort') : dayName.format(d.date)}</span>
            </div>`).join('')}
        </div>
      </div>`;
  }

  function notFound() {
    view.innerHTML = `<div class="card center"><h1>${t('notfound')}</h1><a class="btn" href="#/">${t('btn.home')}</a></div>`;
  }

  // ---------- Screen reader helpers ----------
  const live = document.getElementById('sr-live');
  function announce(text) {
    live.textContent = '';
    setTimeout(() => { live.textContent = text; }, 50);   // clearing first makes the same text be read again
  }
  // English and Hebrew are marked with their language, so VoiceOver reads each with the right voice
  function markLanguages(root) {
    root.querySelectorAll('.en:not([lang]), bdi[dir="ltr"]:not([lang])').forEach(el => { el.lang = 'en'; });
    root.querySelectorAll('.he:not([lang])').forEach(el => { el.lang = 'he'; });
  }
  new MutationObserver(() => markLanguages(view)).observe(view, { childList: true, subtree: true });

  // ---------- Router ----------
  let firstRoute = true;
  function route() {
    const [name, a, b] = location.hash.replace(/^#\/?/, '').split('/');
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    if (recognition) recognition.abort();
    view.scrollTop = 0;
    switch (name || 'home') {
      case 'home': refreshChrome('home'); home(); break;
      case 'learn': refreshChrome('learn'); learn(); break;
      case 'phrases': refreshChrome('learn'); phrases(); break;
      case 'unit': refreshChrome('learn'); lesson(a); break;
      case 'grammar':
        refreshChrome('learn');
        if (!a) grammarList(); else if (b === 'quiz') grammarQuiz(a); else grammarTopic(a);
        break;
      case 'practice': refreshChrome('learn'); practice(); break;
      case 'quiz': refreshChrome('learn'); quiz(a, b); break;
      case 'speak': refreshChrome('learn'); speaking(); break;
      case 'progress': refreshChrome('progress'); progress(); break;
      default: refreshChrome(''); notFound();
    }
    // After a screen change, put keyboard and screen-reader focus on its heading (not on the first load)
    if (!firstRoute) {
      const head = view.querySelector('h1') || view.querySelector('.sub') || view;
      head.setAttribute('tabindex', '-1');
      head.focus({ preventScroll: true });
    }
    firstRoute = false;
  }

  // Language switch in the header
  document.getElementById('lang').onclick = () => {
    Store.lang = isHe() ? 'en' : 'he';
    applyLang();
    route();
  };

  // A new version was installed in the background: offer it, never reload in the middle of a lesson
  window.addEventListener('app-updated', () => {
    if (document.getElementById('update')) return;
    const bar = document.createElement('div');
    bar.id = 'update';
    bar.className = 'update';
    bar.setAttribute('role', 'status');
    bar.innerHTML = `<span>✨ ${t('update.ready')}</span><button>${t('update.reload')}</button>`;
    bar.querySelector('button').onclick = () => location.reload();
    document.body.appendChild(bar);
  });

  window.addEventListener('hashchange', route);
  applyLang();
  route();
})();
