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
    search: svg('<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 20 20"/>'),
    cross: svg('<path d="M6.5 6.5l11 11M17.5 6.5l-11 11" stroke-width="3"/>'),
    lock: svg('<rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="currentColor" stroke="none"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke-width="2.4"/>'),
    arrowUp: svg('<path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" stroke-width="2.6"/>'),
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

  let shownStreak = null;   // the streak pill bumps when the number grows while the app is open
  function refreshChrome(tab) {
    const s = Store.streak;
    const pill = document.querySelector('.streak');
    if (shownStreak !== null && s > shownStreak) {
      pill.classList.remove('bump'); void pill.offsetWidth; pill.classList.add('bump');
      setTimeout(() => pill.classList.remove('bump'), 900);
    }
    shownStreak = s;
    document.getElementById('stat-streak').textContent = s;
    document.getElementById('stat-streak-label').textContent = t(s === 1 ? 'streak.one' : 'streak.many');
    document.querySelector('.streak').classList.toggle('lit', s > 0);   // a live streak glows, 0 stays quiet
    // A small dot on a tab when something waits there: rules to review (Grammar), words due (Learn)
    const waiting = { grammar: Store.weakRules().length ? t('tab.grev') : '', learn: Store.dueWords().length ? t('tab.review') : '' };
    document.querySelectorAll('.tabbar a').forEach(a => {
      a.classList.toggle('active', a.dataset.tab === tab);
      if (a.dataset.tab === tab) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
      let sr = a.querySelector('.tb-sr');
      if (!sr) { sr = document.createElement('span'); sr.className = 'sr-only tb-sr'; a.appendChild(sr); }
      const w = waiting[a.dataset.tab] || '';
      a.classList.toggle('has-dot', !!w);
      sr.textContent = w ? ', ' + w : '';
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
      { id: 'vocab', title: t('task.vocab'), sub: t('task.vocab.sub', { n: (u.words.length - Store.unitProgress(u).seen) || u.words.length }), href: `#/unit/${u.id}`, icon: 'book', color: 'blue' },
      { id: 'speak', title: t('task.speak'), sub: t('task.speak.sub'), href: '#/speak', icon: 'mic', color: 'purple' },
      { id: 'listen', title: t('task.listen'), sub: t('task.listen.sub'), href: '#/quiz/listen/level', icon: 'headphones', color: 'green' },
      { id: 'grammar', title: t('task.grammar'), sub: t('task.grammar.sub', { title: ruleTitle(g) }), href: `#/grammar/${g.id}`, icon: 'pencil', color: 'gold' }
    ];
  }

  // Every item of today's plan is checked off
  const planDone = () => planTasks().every(x => Store.tasks[x.id]);

  // Shown once, on the screen where the last task of the day gets finished
  function celebration() {
    if (Store.celebrated || !planDone()) return '';
    Store.markCelebrated();
    setTimeout(() => Feel.right(), 250);
    return `
      <div class="celebrate" role="status">
        <div class="burst" aria-hidden="true">🎉</div>
        <b>${t('goal.done')}</b>
        <span>🔥 ${t(Store.streak === 1 ? 'goal.streak.one' : 'goal.streak', { n: Store.streak })}</span>
      </div>`;
  }

  // ---------- Home ----------
  // The single best next step, shown as one big card at the top of Home (as Babbel's "Continue"
  // and Duolingo's "Start"): words about to be forgotten first, then new words, then grammar,
  // then the rest of today's plan, then free practice.
  function nextStep() {
    const done = Store.tasks;
    const due = Store.dueWords().length;
    if (due && !done.review) return { href: '#/quiz/choice/review', icon: 'repeat', color: 'coral',
      title: t('cont.review', { n: due }), sub: t('cont.review.sub') };
    const wordUnits = levelUnits().filter(x => x.kind !== 'phrases');
    const u = wordUnits.find(x => Store.unitProgress(x).seen < x.words.length);
    if (u && !done.vocab) {
      const fresh = u.words.length - Store.unitProgress(u).seen;
      const unitDone = x => { const p = Store.unitProgress(x); return p.total > 0 && p.mastered / p.total >= 0.6; };
      return { href: `#/unit/${u.id}`, icon: 'book', color: 'blue', emoji: u.emoji,
        title: t('cont.lesson', { title: unitTitle(u) }), sub: t('cont.lesson.sub', { n: fresh }),
        spot: pathSpot(wordUnits.map(unitDone), wordUnits.indexOf(u), Store.unitProgress(u).pct, '#/learn') };
    }
    const rules = levelGrammar();
    const g = rules.find(x => !Store.isGrammarDone(x.id));
    if (g && !done.grammar) return { href: `#/grammar/${g.id}`, icon: 'pencil', color: 'gold',
      title: t('cont.grammar', { title: ruleTitle(g) }), sub: t('cont.grammar.sub'),
      spot: pathSpot(rules.map(x => Store.isGrammarDone(x.id)), rules.indexOf(g), 0, '#/grammar') };
    const left = planTasks().find(x => !done[x.id]);
    if (left) return { href: left.href, icon: left.icon, color: left.color, title: left.title, sub: left.sub };
    return { href: '#/practice', icon: 'levels', color: 'purple', title: t('cont.free'), sub: t('cont.free.sub') };
  }

  // Where a lesson sits on the path: its stage, its place in the stage, which lessons of the
  // stage are done, and how far the lesson itself is (the same ring the path node shows)
  function pathSpot(doneList, i, pct, path) {
    const s = Math.floor(i / PATH_SECTION);
    const stage = doneList.slice(s * PATH_SECTION, (s + 1) * PATH_SECTION);
    return { stage: s + 1, n: i - s * PATH_SECTION + 1, of: stage.length, done: stage, pct, path };
  }

  function home() {
    const lw = wordsOf(Store.level);
    const tasks = planTasks();
    const done = Store.tasks;
    const doneCount = tasks.filter(x => done[x.id]).length;
    const single = lw.filter(w => !w.phrase);
    // Count days on the local clock, so the word changes at midnight here and not at midnight UTC
    const localDay = Math.floor((Date.now() - new Date().getTimezoneOffset() * 6e4) / 864e5);
    const wotd = single[localDay % single.length];
    const tricky = Store.trickyWords();

    const step = nextStep();
    view.innerHTML = `
      ${todayCard(tasks, doneCount)}
      <a class="continue" href="${step.href}">
        <span class="cont-top">
          <span class="cont-kicker">${t('cont.kicker')}</span>
          ${step.spot ? `<span class="cont-where">${t('cont.where', { s: step.spot.stage, n: step.spot.n, m: step.spot.of })}</span>` : ''}
        </span>
        <span class="cont-row">
          <span class="cont-tile${step.spot ? ' ringed' : ''}" style="--pct:${step.spot ? step.spot.pct : 0}"><span class="tile ${step.color}">${step.emoji ? `<span class="cont-emoji">${step.emoji}</span>` : ICON[step.icon]}</span></span>
          <span class="grow"><b>${step.title}</b><span class="small">${step.sub}</span></span>
        </span>
        ${step.spot ? `<span class="cont-dots" aria-hidden="true">${step.spot.done.map((d, k) =>
          `<i class="${d ? 'on' : ''}${k === step.spot.n - 1 ? ' now' : ''}"></i>`).join('')}</span>` : ''}
        <span class="cont-go">${t('cont.go')} ${fwd()}</span>
      </a>
      ${step.spot ? `<a class="cont-path" href="${step.spot.path}">🗺️ ${t('cont.path')} ${fwd()}</a>` : ''}


      <div class="section">${ICON.calendar} ${t('home.plan')} <span class="end"><b class="en">${doneCount} / ${tasks.length}</b> ${t('home.completed')}</span></div>
      ${doneCount === tasks.length ? `<div class="plan-done">${ICON.check}<span><b>${t('goal.home')}</b> ${t('goal.home.sub')}</span></div>` : ''}
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
    bindLevelSeg(home);
  }

  // The top of Home is about today (as Duolingo's daily goal and Babbel's "Today"):
  // a greeting, the level (opens the level sheet), the streak, a ring for today's plan
  // and the last seven days, so one look says "have I done enough today?"
  function todayCard(tasks, doneCount) {
    const h = new Date().getHours();
    const hi = t(h >= 5 && h < 12 ? 'today.morning' : h >= 12 && h < 17 ? 'today.noon' : h >= 17 && h < 22 ? 'today.evening' : 'today.night');
    const week = Store.week();
    const activeToday = week[6].count > 0 || Object.keys(Store.tasks).length > 0;
    const left = tasks.length - doneCount;
    const streak = Store.streak;
    const msg = !left ? t('today.done')
      : !activeToday && streak ? t('today.risk', { n: streak })
      : !activeToday ? t('today.start')
      : left === 1 ? t('today.left1') : t('today.left', { n: left });
    const C = 2 * Math.PI * 26;
    const frac = tasks.length ? doneCount / tasks.length : 0;
    const DAYS = isHe() ? ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'] : ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return `
      <section class="today${!left ? ' all' : ''}">
        <div class="td-top">
          <h1 class="td-hi">${hi}</h1>
          <button class="td-level" id="levelbtn" data-part="vocab" aria-haspopup="dialog" aria-label="${t('lvl.change', { level: levelLabel() })}">${levelLabel()} ▾</button>
        </div>
        <div class="td-main">
          <div class="td-ring" role="img" aria-label="${t('today.ring', { a: doneCount, b: tasks.length })}">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <circle cx="32" cy="32" r="26" class="td-track"/>
              ${frac ? `<circle cx="32" cy="32" r="26" class="td-fill" stroke-dasharray="${(C * frac).toFixed(1)} ${C.toFixed(1)}"/>` : ''}
            </svg>
            <b class="en">${!left ? ICON.check : `${doneCount}/${tasks.length}`}</b>
          </div>
          <div class="grow">
            <small class="td-label">${t('today.goal')}</small>
            <p class="td-msg">${msg}</p>
            <div class="td-week" aria-label="${t('today.week')}">
              ${week.map(d => `<span class="td-day${d.count ? ' on' : ''}${d.today ? ' now' : ''}" title="${d.count}">
                <i aria-hidden="true">${d.count ? '✓' : ''}</i><small>${DAYS[d.date.getDay()]}</small></span>`).join('')}
            </div>
          </div>
        </div>
      </section>`;
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
    <nav class="seg learn-tabs" aria-label="${t('learn.title')}">
      ${[['vocab', '#/learn', '📖'], ['phrases', '#/phrases', '💬'], ['practice', '#/practice', '🏋️']].map(([id, href, icon]) =>
        `<a href="${href}" class="${on === id ? 'on' : ''}"${on === id ? ' aria-current="page"' : ''}><span class="lt-ico" aria-hidden="true">${icon}</span>${t('learn.' + id)}</a>`).join('')}
    </nav>`;

  // ---------- Search: every word and sentence of every level, in English or Hebrew ----------
  const searchKey = s => s.toLowerCase()
    .replace(/[\u0591-\u05C7]/g, '')            // Hebrew vowel marks
    .replace(/[׳״'"’`.,!?()\-]/g, ' ').replace(/\s+/g, ' ').trim();
  const SEARCH = () => ALL_WORDS.map(w => ({ w, en: searchKey(w.en), he: searchKey(w.he) }));
  let searchIndex = null;

  function searchWords(query) {
    const q = searchKey(query);
    if (!q) return [];
    searchIndex = searchIndex || SEARCH();
    const score = x => {
      for (const f of [x.en, x.he]) {
        if (f === q) return 0;                             // exact
        if (f.startsWith(q)) return 1;                     // starts with it
        if (f.split(' ').some(part => part.startsWith(q))) return 2;   // a word in it starts with it
      }
      return x.en.includes(q) || x.he.includes(q) ? 3 : -1;
    };
    return searchIndex.map(x => ({ w: x.w, s: score(x) })).filter(x => x.s >= 0)
      .sort((a, b) => a.s - b.s || (a.w.phrase - b.w.phrase) || a.w.en.length - b.w.en.length)
      .slice(0, 30).map(x => x.w);
  }

  // An empty result: the owl, one friendly line and one way forward (instead of a lone grey sentence)
  const emptyState = (text, action = '') =>
    `<div class="empty-state" role="status"><img src="icons/owl-192.png" alt="" width="92" height="92"><p>${text}</p>${action}</div>`;

  function searchResults(query) {
    const found = searchWords(query);
    if (!found.length) return emptyState(t('search.none', { q: query.replace(/[<>&"]/g, '') }), `<button class="btn ghost empty-act">${t('empty.clear')}</button>`);
    return `<p class="small search-count" role="status">${t(found.length === 1 ? 'search.one' : 'search.count', { n: found.length })}</p>` +
      found.map((w, n) => {
        const unit = UNITS.find(u => u.id === w.unit);
        return `
        <div class="search-row">
          <button class="speak sm" data-say="${n}" aria-label="${t('aria.listen')}">${ICON.speaker}</button>
          <a class="grow" href="#/unit/${unit.id}">
            <b class="en">${w.en}</b>
            <span class="he">${w.he}</span>
            <span class="small">${unit.emoji} ${unitTitle(unit)} · ${t('lv.' + unit.level)}</span>
          </a>
        </div>`;
      }).join('');
  }


  // ---------- Lesson path (as in Duolingo): each part of the course is a winding road of lessons ----------
  // done = gold with a check, current = big coral node with a "Start" bubble, started = purple,
  // locked = grey with a lock. A locked lesson can still be opened after a short warning.
  const PATH_ROW = 132;
  const PATH_SWAY = [0, .55, .82, .55, 0, -.55, -.82, -.55];
  let pathItems = [];

  function pathFor(part) {
    let items;
    if (part === 'grammar') {
      items = levelGrammar().map((g, n) => {
        const done = Store.isGrammarDone(g.id);
        return { href: `#/grammar/${g.id}`, review: `#/grammar/${g.id}/quiz`, face: `<b class="pnum">${n + 1}</b>`, label: ruleTitle(g),
          plain: (isHe() ? g.he : g.title), done, started: done, pct: done ? 100 : 0, example: g.ex[0],
          progress: t(done ? 'path.g.done' : 'path.g.sub') };
      });
    } else if (part === 'gall') {
      // Every grammar rule of every level on one road, beginner first
      items = LEVELS.flatMap(l => GRAMMAR.filter(g => g.level === l.id)).map((g, n) => {
        const done = Store.isGrammarDone(g.id);
        return { href: `#/grammar/${g.id}`, review: `#/grammar/${g.id}/quiz`, face: `<b class="pnum">${n + 1}</b>`, label: ruleTitle(g),
          plain: (isHe() ? g.he : g.title), done, started: done, pct: done ? 100 : 0, example: g.ex[0], lvl: g.level, rule: g,
          progress: `${t('lv.' + g.level)} · ${t(done ? 'path.g.done' : 'path.g.sub')}` };
      });
    } else {
      items = levelUnits().filter(u => (u.kind === 'phrases') === (part === 'phrases')).map(u => {
        const p = Store.unitProgress(u);
        return { href: `#/unit/${u.id}`, review: `#/quiz/choice/${u.id}`, face: u.emoji, label: unitTitle(u), plain: unitTitle(u), words: u.words,
          done: p.total > 0 && p.mastered / p.total >= 0.6, started: p.seen > 0, pct: p.pct,
          progress: t(u.kind === 'phrases' ? 'learn.sentences' : 'learn.words', { a: p.mastered, b: p.total }) };
      });
    }
    let cur = items.findIndex(x => !x.done);
    if (part === 'gall') {
      // the current rule is the first one not done at the learner's level or above;
      // rules left behind in easier levels stay open, not locked
      const from = LEVELS.findIndex(l => l.id === Store.level);
      const up = items.findIndex(x => !x.done && LEVELS.findIndex(l => l.id === x.lvl) >= from);
      if (up >= 0) cur = up;
    }
    items.forEach((x, i) => {
      x.state = x.done ? 'done' : i === cur ? 'current' : (x.started || i < cur) ? 'open' : 'locked';
    });
    items.cur = cur;
    items.part = part;
    // Review stop: words from this path's earlier lessons that were learned once and are due again
    if (part === 'gall' && cur >= 0) {
      const weak = new Set(Store.weakRules());
      const rules = items.filter((x, i) => i !== cur && weak.has(x.href.split('/').pop()));
      if (rules.length) {
        items.review = rules;
        items.reviewHref = '#/grammar/review/quiz';
        items.reviewAria = t('grev.aria', { n: rules.length });
      }
    }
    if (part !== 'grammar' && part !== 'gall' && cur >= 0) {
      const curUnit = items[cur].href.split('/').pop();
      const units = new Set(levelUnits().filter(u => (u.kind === 'phrases') === (part === 'phrases') && u.id !== curUnit).map(u => u.id));
      const due = Store.dueWords().filter(w => units.has(w.unit) && Store.box(w.id) >= 2);
      if (due.length >= 3) items.review = due;
    }
    return items;
  }

  // The path is split into stages of 5 lessons, each opened by a coloured banner (as Duolingo's units)
  const PATH_SECTION = 5;
  const PATH_CHEST = 104;
  const CHEST_XP = 20;
  const chestKey = (items, s) => items.part === 'gall' ? `all:gall:${s}` : `${Store.level}:${items.part}:${s}`;
  // Stages are runs of up to 5 lessons; on the all-levels grammar road every level starts a new stage
  function stagesOf(items) {
    if (items.stages) return items.stages;
    const out = [];
    let start = 0;
    for (let i = 1; i <= items.length; i++) {
      if (i === items.length || i - start === PATH_SECTION || items[i].lvl !== items[start].lvl) { out.push([start, i]); start = i; }
    }
    return (items.stages = out);
  }
  const stageItems = (items, s) => items.slice(...stagesOf(items)[s]);
  const stageAt = (items, i) => stagesOf(items).findIndex(([a, b]) => i >= a && i < b);
  // locked until every lesson of the stage is done, then ready to open, then opened (once)
  function chestState(items, s) {
    if (Store.chestOpened(chestKey(items, s))) return 'opened';
    return stageItems(items, s).every(x => x.done) ? 'ready' : 'locked';
  }
  const PATH_BANNER = 112;
  const PATH_GATE = 128;

  // On the all-levels grammar road, a gate opens every level after the first: the level and its CEFR band,
  // how much of the level before it is done, and either "your level" or a way to jump there
  function levelGates(items) {
    if (items.part !== 'gall') return '';
    const at = LEVELS.findIndex(l => l.id === Store.level);
    // one gate before each level after the first, and a finish line after the last;
    // once the level before is complete the gate becomes a certificate with a level review
    return LEVELS.map((prev, n) => {
      const next = LEVELS[n + 1];
      const list = items.filter(x => x.lvl === prev.id);
      const done = list.filter(x => x.done).length;
      const complete = list.length > 0 && done === list.length;
      const reached = next ? at >= n + 1 : complete;
      const icon = complete ? '🎓' : next ? (reached ? '🚪' : '🔒') : '🏁';
      if (complete) {
        // A finished level: its gate becomes a framed certificate in the level's colour, with the date it was completed
        Store.markLevelDone(prev.id);
        const date = new Intl.DateTimeFormat(Store.lang, { day: 'numeric', month: 'long', year: 'numeric' }).format(Store.levelDoneAt(prev.id));
        return `
        <div class="pgate cert lv-${prev.id}${reached ? ' open' : ''} complete" data-lvl="${next ? next.id : 'end'}" role="heading" aria-level="2">
          <div class="cert-frame">
            <div class="cert-top">
              <div class="lv-ring cert-ring" style="--p:100" aria-hidden="true"><b>🎓</b></div>
              <div class="grow">
                <span class="cert-kicker">${t('cert.kicker')} · <span class="en">${t('lvl.cefr.' + prev.id)}</span></span>
                <b>${t('gate.done', { level: t('lv.' + prev.id) })}</b>
                <span class="cert-meta">${t('cert.meta', { n: list.length, date })}</span>
              </div>
            </div>
            <div class="cert-acts">
              <a class="pgate-final" href="#/grammar/final-${prev.id}/quiz">🔁 ${t('gate.final')}</a>
              ${navigator.share ? `<button class="cert-share" data-lvl="${prev.id}" data-n="${list.length}">${t('cert.share')}</button>` : ''}
            </div>
            ${next ? `<div class="cert-next">${t('gate.title', { level: t('lv.' + next.id) })} <small class="en">${t('lvl.cefr.' + next.id)}</small>
              ${at === n + 1 ? `<span class="pgate-tag">${t('gate.mine')}</span>` : !reached ? `<button class="pgate-go" data-lvl="${next.id}">${t('gate.jump')}</button>` : ''}</div>` : ''}
          </div>
        </div>`;
      }
      return `
        <div class="pgate${reached ? ' open' : ''}${complete ? ' complete' : ''}" data-lvl="${next ? next.id : 'end'}" role="heading" aria-level="2">
          <span class="pgate-icon" aria-hidden="true">${icon}</span>
          <div class="grow">
            <b>${next ? `${t('gate.title', { level: t('lv.' + next.id) })} <small class="en">${t('lvl.cefr.' + next.id)}</small>` : t('gate.end')}</b>
            <span class="pgate-prev">${complete ? t('gate.done', { level: t('lv.' + prev.id) }) : t('gate.prev', { level: t('lv.' + prev.id), a: done, b: list.length })}</span>
            <span class="pgate-bar" aria-hidden="true"><i style="width:${list.length ? Math.round(done / list.length * 100) : 0}%"></i></span>
            ${complete ? `<a class="pgate-final" href="#/grammar/final-${prev.id}/quiz">🔁 ${t('gate.final')}</a>` : ''}
          </div>
          ${!next ? '' : at === n + 1 ? `<span class="pgate-tag">${t('gate.mine')}</span>`
            : !reached ? `<button class="pgate-go" data-lvl="${next.id}">${t('gate.jump')}</button>` : ''}
        </div>`;
    }).join('');
  }
  const SECTION_COLORS = ['coral', 'blue', 'green', 'gold', 'purple'];

  function sectionBanner(items, s) {
    const part = stageItems(items, s);
    const done = part.filter(x => x.done).length;
    const reached = part.some(x => x.state !== 'locked');
    const lvl = part[0].lvl;
    const status = done === part.length ? `<span class="psec-pill ok">${ICON.check} ${t('path.sec.done')}</span>`
      : `<span class="psec-pill">${done}/${part.length}</span>`;
    return `
      <div class="psec ${SECTION_COLORS[s % SECTION_COLORS.length]}${reached ? '' : ' locked'}" data-s="${s}" role="heading" aria-level="2">
        <div class="grow">
          <span class="psec-kicker">${lvl ? `${t('lv.' + lvl)} · ` : ''}${t('path.sec', { n: s + 1 })}</span>
          <span class="psec-faces" aria-hidden="true">${part.map(x => `<i class="${x.done ? 'd' : ''}">${x.face}</i>`).join('')}</span>
        </div>
        ${status}
      </div>`;
  }

  // What is inside a lesson, shown in its card: the first words (a check on the ones already
  // mastered), the first sentences of a sentence lesson, or a rule's first example
  // Rules that are easy to mix up: each card links to its partners, so the difference is one tap away
  const RULE_PAIRS = [
    ['present-simple', 'present-continuous'], ['past-simple', 'past-continuous'], ['past-simple', 'present-perfect'],
    ['present-perfect', 'present-perfect-continuous'], ['present-perfect', 'i-for-since-ago'], ['past-simple', 'used-to'],
    ['past-simple', 'past-perfect'], ['future', 'i-present-continuous-future'], ['i-too-enough', 'i-so-such'],
    ['conditionals-1', 'conditionals-2'], ['conditionals-2', 'a-mixed-conditionals'], ['conditionals-1', 'a-conditions'],
    ['a-wish', 'a-should-have'], ['to-be', 'b-was-were'], ['b-have', 'there-is'], ['articles', 'a-articles-general'],
    ['b-would-like', 'b-want-need'], ['b-would-like', 'a-would-rather'], ['can', 'modals'], ['modals', 'a-deduction'],
    ['b-adjective-position', 'i-adjectives-adverbs'], ['gerund-infinitive', 'b-want-need'], ['b-connectors', 'a-concession'],
    ['passive', 'a-causative'], ['reported-speech', 'past-perfect'], ['i-so-neither', 'i-question-tags'], ['plurals', 'quantity'],
    ['b-spell-s', 'present-simple'], ['b-spell-s', 'plurals'], ['b-spell-ing', 'present-continuous'], ['i-spell-ed', 'past-simple'],
    ['past-perfect', 'a-past-perfect-continuous'], ['present-perfect-continuous', 'a-past-perfect-continuous'], ['a-future-perfect-continuous', 'a-future-perfect-progressive']
  ];
  const rulePartners = id => RULE_PAIRS.filter(p => p.includes(id)).map(p => p[0] === id ? p[1] : p[0]);
  function relatedRules(x) {
    if (!x.rule || !pathItems.length) return '';
    const links = rulePartners(x.rule.id)
      .map(id => pathItems.findIndex(p => p.rule && p.rule.id === id)).filter(i => i >= 0).slice(0, 2);
    if (!links.length) return '';
    return `<div class="pc-rel"><span>↔ ${t('rel.title')}</span>
      ${links.map(i => `<button class="pc-rel-go" data-i="${i}">${pathItems[i].label} ${fwd()}</button>`).join('')}</div>`;
  }
  const saveBtn = id => Store.isRuleSaved(id)
    ? `<button class="pc-save on" data-id="${id}" aria-pressed="true">★ ${t('saved.on')}</button>`
    : `<button class="pc-save" data-id="${id}" aria-pressed="false">☆ ${t('saved.add')}</button>`;
  // The rule's example that goes with one structure row: same kind of sentence (statement, negative,
  // question) and the most shared words. No good match → null, and that row simply doesn't open.
  const sentenceKind = s => (s.includes('?') ? 'q' : /\b(not|never)\b|n't/i.test(s) ? 'neg' : 'pos');
  const FILLER = new Set(['that', 'the', 'and', 'you', 'are', 'for', 'with', 'this', 'not', 'she', 'his', 'her', 'they']);
  function rowExample(g, k) {
    const [tag, text] = g.forms[k];
    if (tag === 'answer') return null;
    const kind = ['?', 'question'].includes(tag) ? 'q' : ['–', '-', 'negative'].includes(tag) ? 'neg' : sentenceKind(text);
    const words = s => new Set((s.toLowerCase().match(/[a-z']+/g) || []).filter(w => w.length > 2 && !FILLER.has(w)));
    const fw = words(text);
    let best = null, score = -1;
    g.ex.forEach(e => {
      if (sentenceKind(e[0]) !== kind) return;
      const ew = words(e[0]);
      let n = 0;
      fw.forEach(w => { if (ew.has(w) || (w.length > 3 && [...ew].some(v => v.startsWith(w) || w.startsWith(v) && v.length > 3))) n++; });
      if (n > score) { score = n; best = e; }
    });
    return best && (kind !== 'pos' || score > 0) ? best : null;
  }
  const sayBtn = text => `<button class="speak sm pc-say" data-say="${text.replace(/"/g, '&quot;')}" aria-label="${t('aria.listen')}">${ICON.speaker}</button>`;
  const exampleRow = ex => `<div class="pc-ex">${sayBtn(ex[0])}<div class="grow"><b class="en" dir="ltr">${ex[0]}</b><span>${ex[1]}</span></div></div>`;
  function lessonPreview(x) {
    if (x.rule && x.state === 'done') {
      const g = x.rule;
      return `<div class="pc-cheat">
          <span class="pc-cheat-h">👑 ${t('cheat.title')} <small>${t('cheat.tap')}</small></span>
          ${g.forms.map(([tag, text], k) => rowExample(g, k)
            ? `<button class="pc-form" data-k="${k}" aria-expanded="false"><span class="pc-tag">${formTag(tag)}</span><span class="en" dir="ltr">${text}</span><span class="pc-more" aria-hidden="true">▾</span></button>`
            : `<div class="pc-form"><span class="pc-tag">${formTag(tag)}</span><span class="en" dir="ltr">${text}</span></div>`).join('')}
          ${exampleRow(g.ex[0])}
          <button class="pc-quick-go">⚡ ${t('quick.go')}</button>
          <div class="pc-quick" hidden></div>
          <p class="pc-tip">⚠️ ${heMix(g.tip)}</p>
          ${relatedRules(x)}
        </div>`;
    }
    if (x.example) return exampleRow(x.example) + relatedRules(x);
    if (!x.words) return '';
    if (x.words[0].phrase) {
      return `<div class="pc-lines">${x.words.slice(0, 2).map(w => `<span class="en" dir="ltr">${w.en}</span>`).join('')}
        ${x.words.length > 2 ? `<small>${t('pc.more', { n: x.words.length - 2 })}</small>` : ''}</div>`;
    }
    // The unit's words: a ring for how many are mastered, then each word with a dot (mastered / seen / new)
    const show = x.state === 'done' ? x.words : x.words.slice(0, 4);
    const got = x.words.filter(w => Store.isMastered(w.id)).length;
    const stateOf = w => Store.isMastered(w.id) ? 'got' : Store.isSeen(w.id) ? 'seen' : 'new';
    return `<div class="pc-unit">
        <span class="pc-uring" style="--p:${Math.round(got / x.words.length * 100)}" role="img" aria-label="${t('pc.got', { a: got, b: x.words.length })}"><b class="en">${got}</b></span>
        <span class="pc-key"><span class="got">✓ ${t('pc.k.got')}</span><span class="seen">${t('pc.k.seen')}</span><span class="new">${t('pc.k.new')}</span></span>
      </div>
      <div class="pc-words">${show.map(w => `<span class="en ${stateOf(w)}" dir="ltr">${stateOf(w) === 'got' ? '✓ ' : ''}${w.en}</span>`).join('')}
      ${x.words.length > show.length ? `<span class="more">${t('pc.more', { n: x.words.length - show.length })}</span>` : ''}</div>`;
  }

  // A slim map of all stages that stays at the top while the path scrolls: how full each stage is,
  // which one is current, which one is on screen; a tap jumps to that stage
  function miniMap(items, sections) {
    const curS = items.cur >= 0 ? stageAt(items, items.cur) : -1;
    const seg = s => {
      const part = stageItems(items, s);
      const done = part.filter(x => x.done).length;
      return `<button class="mm-seg ${SECTION_COLORS[s % SECTION_COLORS.length]}${s === curS ? ' cur' : ''}${done === part.length ? ' full' : ''}"
          data-s="${s}" aria-label="${t('mm.seg', { n: s + 1, a: done, b: part.length })}">
        <b class="mm-bar"><i style="width:${Math.round((done / part.length) * 100)}%"></i><span>${s + 1}</span></b>
      </button>`;
    };
    if (items.part !== 'gall') {
      return `<nav class="minimap" id="minimap" aria-label="${t('mm.aria')}">${Array.from({ length: sections }, (_, s) => seg(s)).join('')}</nav>`;
    }
    // The grammar road: stages grouped by level, each group with its name and how much of it is done;
    // the name jumps to that level's gate
    const stages = stagesOf(items);
    const curLvl = items.cur >= 0 ? items[items.cur].lvl : null;
    return `
      <nav class="minimap grouped" id="minimap" aria-label="${t('mm.aria')}">
        ${LEVELS.map(l => {
          const ss = stages.map((r, s) => s).filter(s => items[stages[s][0]].lvl === l.id);
          if (!ss.length) return '';
          const list = items.filter(x => x.lvl === l.id);
          return `<div class="mm-group${l.id === curLvl ? ' cur' : ''}" style="flex:${ss.length}">
            <button class="mm-lvl" data-lvl="${l.id}" data-s="${ss[0]}">${t('lv.' + l.id)} <small class="en">${list.filter(x => x.done).length}/${list.length}</small></button>
            <div class="mm-segs">${ss.map(seg).join('')}</div>
          </div>`;
        }).join('')}
      </nav>`;
  }

  function pathHtml(items) {
    const doneCount = items.filter(x => x.done).length;
    const sections = stagesOf(items).length;
    return `
      ${sections > 1 ? miniMap(items, sections) : ''}
      ${items.part === 'gall' ? `<div class="path-head"><span>${t('gr.head', { a: doneCount, b: items.length })}</span></div>` : `
      <button class="path-head" id="levelbtn" aria-haspopup="dialog" aria-label="${t('lvl.change', { level: levelLabel() })}">
        <span>${levelLabel()} <i class="lvl-caret" aria-hidden="true">▾</i></span>
      </button>`}
      <div class="path" id="path">
        <svg class="path-line" id="pathline" aria-hidden="true"></svg>
        ${levelGates(items)}
        ${Array.from({ length: sections }, (_, s) => sectionBanner(items, s)).join('')}
        ${items.review ? `
          <div class="prev-wrap" id="prevwrap">
            <a class="prev-node" href="${items.reviewHref || '#/quiz/choice/pathreview'}" aria-label="${items.reviewAria || t('rstop.aria', { n: items.review.length })}">
              <span aria-hidden="true">🏋️</span><b class="prev-count" aria-hidden="true">${items.review.length}</b>
            </a>
            <span class="plabel">${t('rstop.label')}</span>
          </div>` : ''}
        ${Array.from({ length: sections }, (_, s) => {
          const st = chestState(items, s);
          return `<div class="pchest-wrap" data-s="${s}">
            <button class="pchest ${st}" data-s="${s}" aria-label="${t('chest.aria', { n: s + 1 })} · ${t('chest.state.' + st)}">
              <span aria-hidden="true">${st === 'opened' ? '✨' : '🎁'}</span>
            </button>
          </div>`;
        }).join('')}
        ${items.map((x, i) => `
          <div class="pnode-wrap${x.lvl ? ' lv-' + x.lvl : ''}" data-i="${i}">
            ${x.state === 'current' ? `<span class="pbubble">${t(x.started ? 'path.continue' : 'path.start')}</span>` : ''}
            <button class="pnode ${x.state}" data-i="${i}" style="--pct:${x.pct}"
              aria-label="${x.plain.replace(/"/g, '')} · ${t('path.state.' + x.state)}">
              <span class="pnode-face">${x.face}</span>
              ${x.state === 'locked' ? `<span class="pbadge lock">${ICON.lock}</span>`
                : x.state === 'done' ? (x.rule ? `<span class="pbadge crown" aria-hidden="true">👑</span>` : `<span class="pbadge ok">${ICON.check}</span>`) : ''}
            </button>
            <span class="plabel">${x.label}</span>
            ${x.rule && Store.isRuleSaved(x.rule.id) ? '<span class="pstar" aria-hidden="true">⭐</span>' : ''}
          </div>`).join('')}
      </div>
      <button class="path-jump" id="pathjump" hidden aria-label="${t('path.jump')}">${ICON.arrowUp}</button>`;
  }

  // Positions depend on the screen width, so they are set after drawing (and again on rotate/resize)
  function layoutPath() {
    const path = document.getElementById('path');
    if (!path) return;
    const W = path.clientWidth, half = Math.max(0, W / 2 - 64);
    const pts = [];
    const banners = path.querySelectorAll('.psec');
    const count = path.querySelectorAll('.pnode-wrap').length;
    const chestPts = [];
    let y = 8;
    const stages = stagesOf(pathItems);
    path.querySelectorAll('.pnode-wrap').forEach((el, i) => {
      const s = stageAt(pathItems, i), k = i - stages[s][0];   // stage, and place inside it
      if (k === 0) {                                      // a stage banner before every stage
        const lvl = pathItems[i].lvl;
        const gate = i > 0 && lvl && lvl !== pathItems[i - 1].lvl && path.querySelector(`.pgate[data-lvl="${lvl}"]`);
        if (gate) {                                       // and a level gate before a new level
          y += 12;
          gate.style.top = y + 'px';
          y += Math.max(PATH_GATE, gate.offsetHeight + 24);
        }
        banners[s].style.top = y + 'px';
        y += PATH_BANNER;
      }
      if (i === pathItems.cur) y += 30;                   // room for the "Start" bubble
      const x = W / 2 + PATH_SWAY[k % PATH_SWAY.length] * half;
      el.style.left = (x - 66) + 'px';
      el.style.top = y + 'px';
      pts.push([x, y + 38]);
      y += PATH_ROW;
      if (i === stages[s][1] - 1 || i === count - 1) {   // the stage's chest
        const cx = W / 2 + PATH_SWAY[(k + 1) % PATH_SWAY.length] * half;
        const chest = path.querySelector(`.pchest-wrap[data-s="${s}"]`);
        chest.style.left = (cx - 40) + 'px';
        chest.style.top = y + 'px';
        chestPts[s] = [cx, y + 34];
        y += PATH_CHEST;
      }
    });
    const finish = path.querySelector('.pgate[data-lvl="end"]');   // the finish line after the last chest
    if (finish) {
      finish.style.top = (y + 12) + 'px';
      y += finish.offsetHeight + 36;
    }
    path.style.height = y + 'px';
    const curve = list => list.map(([x, y], i) => {
      if (!i) return `M${x} ${y}`;
      const [px, py] = list[i - 1], my = (py + y) / 2;
      return `C${px} ${my} ${x} ${my} ${x} ${y}`;
    }).join(' ');
    // one road per stage, so it doesn't run under the banners; gold up to `reach`
    const roads = reach => {
      let d = '', done = '';
      stages.forEach(([a, b], s) => {
        const lessons = pts.slice(a, b);
        const seg = lessons.concat([chestPts[s]]);        // the road ends at the chest
        d += curve(seg) + ' ';
        const upto = Math.min(lessons.length, reach - a) + (reach - a > lessons.length ? 1 : 0);
        if (upto > 1) done += curve(seg.slice(0, upto)) + ' ';
      });
      return { d, done };
    };
    const reach = pathItems.cur < 0 ? pts.length : pathItems.cur + 1;
    const { d, done } = roads(reach);
    const svg = document.getElementById('pathline');
    svg.setAttribute('viewBox', `0 0 ${W} ${y}`);
    svg.innerHTML = `<path class="pl-base" d="${d}"/>` + (done ? `<path class="pl-done" d="${done}"/>` : '');
    const rw = document.getElementById('prevwrap');
    if (rw && pathItems.cur >= 0) {
      const [cx, cy] = pts[pathItems.cur];
      const side = cx >= W / 2 ? -1 : 1;
      const rx = Math.max(46, Math.min(W - 46, cx + side * 116));
      rw.style.left = (rx - 50) + 'px';
      rw.style.top = (cy - 30) + 'px';
      svg.insertAdjacentHTML('afterbegin', `<path class="pl-side" d="M${cx} ${cy} L${rx} ${cy}"/>`);
    }

    // Back from a finished lesson: the gold road grows from where it was to where it is now
    const from = pathItems.growFrom;
    pathItems.growFrom = undefined;                       // only once, not on every resize
    const gold = svg.querySelector('.pl-done');
    if (from !== undefined && from < reach && gold && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const full = gold.getTotalLength();
      const tmp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tmp.setAttribute('d', roads(from).done || 'M0 0');
      svg.appendChild(tmp);
      const start = roads(from).done ? tmp.getTotalLength() : 0;
      tmp.remove();
      gold.style.strokeDasharray = `${full} ${full}`;
      gold.style.strokeDashoffset = String(full - start);
      gold.getBoundingClientRect();                       // commit the start before animating
      gold.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(.4, 0, .2, 1) .45s';
      gold.style.strokeDashoffset = '0';
    }
  }

  // What the path looked like last time, per level and part, to show what changed since
  const pathMemKey = items => `lingua-path:${items.part === 'gall' ? 'all' : Store.level}:${items.part}`;
  function pathMemory(items) {
    let before = null;
    try { before = JSON.parse(localStorage.getItem(pathMemKey(items)) || 'null'); } catch (e) { /* private mode */ }
    try { localStorage.setItem(pathMemKey(items), JSON.stringify(items.map(x => x.done ? 1 : 0))); } catch (e) { /* fine */ }
    return before;
  }

  function bindPath(items) {
    pathItems = items;
    // Lessons finished since the last visit turn gold in front of the learner, and the road follows
    const before = pathMemory(items);
    const fresh = before ? items.map((x, i) => x.done && !before[i] ? i : -1).filter(i => i >= 0) : [];
    if (fresh.length) {
      const oldCur = before.findIndex(v => !v);
      items.growFrom = oldCur < 0 ? items.length : oldCur + 1;
    }
    layoutPath();
    const path = document.getElementById('path');
    fresh.forEach(i => path.querySelector(`.pnode[data-i="${i}"]`).classList.add('just-done'));
    if (fresh.length) {
      const bub = path.querySelector('.pbubble');
      if (bub) bub.classList.add('arrive');
      setTimeout(() => Feel.right(), 700);
    }
    // Tapping a lesson opens a small card under it (as in Duolingo): its name, how far it is,
    // and one clear button. A second tap, a tap elsewhere or Escape closes it.
    let open = -1;
    const closeCard = () => {
      const c = path.querySelector('.pcard');
      if (c) c.remove();
      open = -1;
      path.querySelectorAll('.pnode[aria-expanded]').forEach(n => n.setAttribute('aria-expanded', 'false'));
      open = -1;
    };
    // Places a card under a node or chest, its arrow pointing at it, and brings it into view
    const placeCard = (wrap, below, cls, label, html, key) => {
      closeCard();
      const W = path.clientWidth, cw = Math.min(300, W - 24);
      const nodeX = wrap.offsetLeft + wrap.offsetWidth / 2;
      const left = Math.max(12, Math.min(W - cw - 12, nodeX - cw / 2));
      const card = document.createElement('div');
      card.className = 'pcard ' + cls;
      card.id = 'pcard';
      card.style.cssText = `top:${wrap.offsetTop + below}px; left:${left}px; width:${cw}px; --arrow:${nodeX - left}px`;
      card.setAttribute('role', 'dialog');
      card.setAttribute('aria-label', label);
      card.innerHTML = html;
      path.appendChild(card);
      open = key;
      // a tall card near the end of the road (a rule's cheat sheet) still has room to scroll into view
      const need = card.offsetTop + card.offsetHeight + 24;
      if (need > path.offsetHeight) path.style.height = need + 'px';
      // Focus first, then scroll so the whole card is above the tab bar (focus would cancel a smooth scroll)
      setTimeout(() => {
        const f = card.querySelector('.btn, .pcard-link');
        if (f) f.focus({ preventScroll: true });
        const over = card.getBoundingClientRect().bottom + 16 - view.getBoundingClientRect().bottom;
        if (over > 0) view.scrollBy({ top: over, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }, 30);
      return card;
    };
    const openCard = i => {
      const x = items[i], cur = items[items.cur];
      const wrap = path.querySelector(`.pnode-wrap[data-i="${i}"]`);
      const card = placeCard(wrap, 96, x.state, x.plain, x.state === 'locked' ? `
          <b>${x.label}</b>
          <p>${t('path.locked.text', { title: cur ? cur.plain : '' })}</p>
          ${cur ? `<a class="btn" href="${cur.href}">${t('path.locked.go')}</a>` : ''}
          <a class="pcard-link" href="${x.href}">${t('path.locked.anyway')}</a>`
        : `
          <b>${x.label}</b>
          <p>${x.progress}</p>
          ${lessonPreview(x)}
          <a class="btn" href="${x.state === 'done' ? x.review : x.href}">${t(x.state === 'done' ? 'path.review' : x.started ? 'path.continue' : 'path.start')}</a>
          ${x.state === 'done' ? `<a class="pcard-link" href="${x.href}">${t('path.again')}</a>` : ''}
          ${x.rule ? saveBtn(x.rule.id) : ''}`, i);
      const bindSay = root => root.querySelectorAll('.pc-say').forEach(b => { b.onclick = e => { e.stopPropagation(); speak(b.dataset.say.replace(/"/g, "")); }; });
      bindSay(card);
      // one quick question from the rule, answered right inside the card; a miss goes to the review stop
      const quickGo = card.querySelector('.pc-quick-go'), quick = card.querySelector('.pc-quick');
      if (quickGo && quick) {
        const ask = () => {
          const qi = Math.floor(Math.random() * x.rule.quiz.length);
          const [q, ans, wrong] = x.rule.quiz[qi];
          const ex = (EXPLAIN[x.rule.id] || [])[qi];
          quick.hidden = false;
          quick.innerHTML = `
            <p class="pc-q en" dir="ltr">${q.replace('___', '_____')}</p>
            <div class="pc-opts">${shuffle([ans, ...wrong]).map(o => `<button class="pc-opt en" dir="ltr">${o}</button>`).join('')}</div>
            <p class="pc-q-msg" role="status"></p>`;
          quick.querySelectorAll('.pc-opt').forEach(b => {
            b.onclick = e => {
              e.stopPropagation();
              const ok = b.textContent === ans;
              quick.querySelectorAll('.pc-opt').forEach(o => { o.disabled = true; if (o.textContent === ans) o.classList.add('right'); });
              if (ok) Feel.right(); else { b.classList.add('wrong'); Store.ruleMiss(x.rule.id); Feel.wrong(b); }
              quick.querySelector('.pc-q').textContent = q.replace('___', ans);
              quick.querySelector('.pc-q-msg').innerHTML = `<span>${ok ? '✓ ' + t('quick.right') : '✗ ' + t('quick.wrong', { a: ans })}</span>
                <button class="pc-quick-more">${t('quick.more')}</button>`;
              if (ex) quick.querySelector('.pc-q-msg').insertAdjacentHTML('afterend', `<div class="pc-why">
                ${ok ? '' : `<p><b>✗ <span class="en" dir="ltr">${esc(b.textContent)}</span>:</b> ${heMix(ex.no[b.textContent] || '')}</p>`}
                <p><b>✓ <span class="en" dir="ltr">${esc(ans)}</span>:</b> ${heMix(ex.ok)}</p></div>`);
              quick.querySelector('.pc-quick-more').onclick = ev => { ev.stopPropagation(); ask(); };
            };
          });
        };
        quickGo.onclick = e => { e.stopPropagation(); quickGo.hidden = true; ask(); };
      }
      // a structure row opens the example that goes with it (one at a time)
      card.querySelectorAll('button.pc-form').forEach(b => {
        b.onclick = e => {
          e.stopPropagation();
          const open = b.getAttribute('aria-expanded') === 'true';
          card.querySelectorAll('.pc-form-ex').forEach(n => n.remove());
          card.querySelectorAll('button.pc-form').forEach(f => f.setAttribute('aria-expanded', 'false'));
          if (open) return;
          b.setAttribute('aria-expanded', 'true');
          b.insertAdjacentHTML('afterend', `<div class="pc-form-ex">${exampleRow(rowExample(x.rule, +b.dataset.k))}</div>`);
          bindSay(b.nextElementSibling);
        };
      });
      // saving a rule: the button, the star on the road and the saved count all follow
      card.querySelectorAll('.pc-save').forEach(b => {
        b.onclick = e => {
          e.stopPropagation();
          const on = Store.toggleRuleSaved(b.dataset.id);
          b.outerHTML = saveBtn(b.dataset.id);
          card.querySelector('.pc-save').onclick = b.onclick;
          const wrap = path.querySelector(`.pnode-wrap[data-i="${i}"]`);
          const star = wrap.querySelector('.pstar');
          if (on && !star) wrap.insertAdjacentHTML('beforeend', '<span class="pstar" aria-hidden="true">⭐</span>');
          if (!on && star) star.remove();
          const n = document.getElementById('gsaved-n');
          if (n) n.textContent = Store.savedRules().length;
          Feel.tap && Feel.tap();
        };
      });
      // a confused-with link goes to that rule on the road and opens its card
      card.querySelectorAll('.pc-rel-go').forEach(b => {
        b.onclick = e => {
          e.stopPropagation();
          closeCard();
          const node = path.querySelector(`.pnode[data-i="${b.dataset.i}"]`);
          node.scrollIntoView({ block: 'center' });
          setTimeout(() => node.click(), 0);
        };
      });
      path.querySelector(`.pnode[data-i="${i}"]`).setAttribute('aria-expanded', 'true');
    };
    // Chests: locked explains what is left, ready opens with a celebration and points, opened says so
    path.querySelectorAll('.pchest').forEach(b => {
      b.onclick = e => {
        e.stopPropagation();
        const s = +b.dataset.s, key = 'c' + s;
        if (open === key) return closeCard();
        const wrap = b.parentElement;
        const st = chestState(items, s);
        if (st === 'locked') {
          const left = stageItems(items, s).filter(x => !x.done).length;
          placeCard(wrap, 84, 'locked', t('chest.aria', { n: s + 1 }), `
            <b>🎁 ${t('chest.locked.title', { n: s + 1 })}</b>
            <p>${t(left === 1 ? 'chest.left.one' : 'chest.left', { n: left })}</p>`, key);
          return;
        }
        if (st === 'ready' && Store.openChest(chestKey(items, s), CHEST_XP)) {
          b.classList.remove('ready');
          b.classList.add('opening', 'opened');
          b.firstElementChild.textContent = '✨';
          // a burst of coloured sparks from the chest (pure decoration; gone after the animation)
          const SPARK = ['#ffd27a', '#ff8a6b', '#6fb4ff', '#4fd8a8', '#b9a8ff'];
          wrap.insertAdjacentHTML('beforeend', `<span class="sparks" aria-hidden="true">${Array.from({ length: 14 }, (_, k) =>
            `<i style="--a:${Math.round(k * 360 / 14)}deg;--d:${50 + (k % 3) * 18}px;background:${SPARK[k % SPARK.length]}"></i>`).join('')}</span>`);
          setTimeout(() => wrap.querySelector('.sparks')?.remove(), 1200);
          Feel.right();
          refreshChrome(items.part === 'gall' ? 'grammar' : 'learn');
          placeCard(wrap, 84, 'chest', t('chest.aria', { n: s + 1 }), `
            <b>🎉 ${t('chest.won.title', { n: s + 1 })}</b>
            <p class="chest-xp"><span class="chest-coin" aria-hidden="true">⭐</span><span>+${CHEST_XP} ${t('chest.xp')}</span></p>
            <button class="btn" id="chest-ok">${t('chest.ok')}</button>`, key);
          $('#chest-ok').onclick = ev => { ev.stopPropagation(); closeCard(); };
          announce(t('chest.won.title', { n: s + 1 }));
          return;
        }
        placeCard(wrap, 84, 'done', t('chest.aria', { n: s + 1 }), `
          <b>✨ ${t('chest.opened.title', { n: s + 1 })}</b>
          <p>${t('chest.opened.text')}</p>`, key);
      };
    });
    path.querySelectorAll('.pnode').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.onclick = e => {
        e.stopPropagation();
        const i = +b.dataset.i;
        open === i ? closeCard() : openCard(i);
      };
    });
    path.onclick = e => { if (!e.target.closest('.pcard')) closeCard(); };
    view.onkeydown = e => {
      if (e.key !== 'Escape' || open === -1) return;
      const k = open;
      closeCard();
      const back = typeof k === 'string' ? path.querySelector(`.pchest[data-s="${k.slice(1)}"]`) : path.querySelector(`.pnode[data-i="${k}"]`);
      if (back) back.focus();
    };
    // Mini-map: a tap scrolls to that stage's banner, just below the map; the stage on screen is marked
    const mm = document.getElementById('minimap');
    if (mm) {
      const banners = [...path.querySelectorAll('.psec')];
      mm.querySelectorAll('.mm-seg, .mm-lvl').forEach(b => {
        b.onclick = () => {
          const target = (b.dataset.lvl && path.querySelector(`.pgate[data-lvl="${b.dataset.lvl}"]`)) || banners[+b.dataset.s];
          const top = target.getBoundingClientRect().top - view.getBoundingClientRect().top + view.scrollTop - mm.offsetHeight - 12;
          view.scrollTo({ top, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        };
      });
      const markSeen = () => {
        const line = view.getBoundingClientRect().top + mm.offsetHeight + 40;
        let s = 0;
        banners.forEach((b, i) => { if (b.getBoundingClientRect().top <= line) s = i; });
        mm.querySelectorAll('.mm-seg').forEach((b, i) => b.classList.toggle('here', i === s));
      };
      view.onscroll = markSeen;
      markSeen();
    }

    // Open where the learner is: the current lesson in the middle of the screen
    const curEl = items.cur >= 0 && path.querySelector(`.pnode-wrap[data-i="${items.cur}"]`);
    const jump = document.getElementById('pathjump');
    if (!curEl) return;
    const toCurrent = smooth => curEl.scrollIntoView({ block: 'center', behavior: smooth ? 'smooth' : 'auto' });
    if (items.cur > 1) toCurrent(false);
    jump.onclick = () => toCurrent(true);
    // The "back to my lesson" button shows only while the current lesson is off screen, pointing to it
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => {
        jump.hidden = e.isIntersecting;
        jump.classList.toggle('down', !e.isIntersecting && e.boundingClientRect.top > 0);
      }, { root: view }).observe(curEl.querySelector('.pnode'));
    }
  }
  window.addEventListener('resize', () => layoutPath());

  // A header above the path (as in the reference app): the owl says what is next, with the streak,
  // the level and one button straight into the current lesson
  function pathHero(items) {
    const cur = items.cur >= 0 ? items[items.cur] : null;
    let say, go;
    if (!cur) {
      say = t('ph.alldone');
      go = `<a class="ph-go" href="#/practice">${t('ph.practice')}</a>`;
    } else {
      const s = stageAt(items, items.cur);
      const left = stageItems(items, s).filter(x => !x.done).length;
      say = !items.some(x => x.started) ? t('ph.hello')
        : left === 1 ? t('ph.one', { n: s + 1 }) : t('ph.left', { n: left, s: s + 1 });
      go = `<a class="ph-go" href="${cur.href}">▶ ${t(cur.started ? 'ph.continue' : 'ph.start', { title: cur.plain })}</a>`;
    }
    // On the Learn paths the card wears the learner's level colour: a ring for how much of this part
    // of the level is done, the level's name, and today's plan (tasks done of the day's plan)
    const lv = items.part === 'gall' ? '' : Store.level;
    const pct = lv ? Math.round(partDone(lv, items.part === 'phrases' ? 'phrases' : 'vocab') * 100) : 0;
    const plan = lv ? planTasks() : [];
    const planDone = plan.filter(x => Store.tasks[x.id]).length;
    return `
      <section class="path-hero${lv ? ' ph-lv lv-' + lv : ''}">
        <img class="ph-owl" src="icons/owl-512.png" alt="" width="112" height="112">
        <div class="ph-side">
          <div class="ph-chips">
            <span class="ph-chip">🔥 ${Store.streak}</span>
            ${lv ? `<span class="ph-chip ph-lvchip"><span class="ph-ring" style="--p:${pct}" aria-hidden="true"></span>${levelLabel()} · <span class="en">${pct}%</span></span>
              ${plan.length ? `<span class="ph-chip${planDone === plan.length ? ' ph-goal-done' : ''}"><span aria-hidden="true">🎯</span> <span class="sr-only">${t('today.goal')}:</span> <span class="en">${planDone}/${plan.length}</span></span>` : ''}`
              : `<span class="ph-chip">${cur ? t('lv.' + cur.lvl) : '✓'}</span>`}
          </div>
          <p class="ph-say">${say}</p>
          ${go}
        </div>
      </section>`;
  }

  // The level is changed from the heading above the path ("— Beginner ▾ —"): a bottom sheet lists
  // the three levels with what each covers and how far this part of the course is done
  function levelSeg() { return ''; }
  function partDone(level, part) {
    if (part === 'grammar') {
      const list = GRAMMAR.filter(g => g.level === level);
      return list.length ? list.filter(g => Store.isGrammarDone(g.id)).length / list.length : 0;
    }
    const list = UNITS.filter(u => u.level === level && (u.kind === 'phrases') === (part === 'phrases'));
    const done = list.filter(u => { const p = Store.unitProgress(u); return p.total && p.mastered / p.total >= 0.6; }).length;
    return list.length ? done / list.length : 0;
  }
  function bindLevelSeg(redraw) {
    const btn = document.getElementById('levelbtn');
    if (!btn) return;
    btn.onclick = () => {
      const part = btn.dataset.part || pathItems.part;
      const back = document.createElement('div');
      back.className = 'sheet-back';
      back.innerHTML = `
        <div class="sheet level-sheet" role="dialog" aria-modal="true" aria-labelledby="lvl-title">
          <span class="sheet-grip" aria-hidden="true"></span>
          <b id="lvl-title">${t('lvl.title')}</b>
          ${LEVELS.map((l, n) => {
            const pct = Math.round(partDone(l.id, part) * 100);
            const on = l.id === Store.level;
            return `<button class="lvl-opt lv-${l.id}${on ? ' on' : ''}" style="--i:${n}" data-level="${l.id}" aria-pressed="${on}" aria-label="${t('lv.' + l.id)} · ${t('lvl.pct', { n: pct })}">
              <span class="lv-ring" style="--p:${pct}" aria-hidden="true"><b class="en">${pct}%</b></span>
              <span class="grow">
                <span class="lvl-top"><b>${t('lv.' + l.id)}</b><small>${t('lvl.cefr.' + l.id)}</small>${on ? `<span class="lvl-check">${ICON.check}</span>` : ''}</span>
                <span class="lvl-desc">${t('lvl.desc.' + l.id)}</span>
              </span>
            </button>`;
          }).join('')}
        </div>`;
      const close = () => { back.classList.add('out'); setTimeout(() => back.remove(), 200); document.removeEventListener('keydown', key); btn.focus(); };
      const key = e => { if (e.key === 'Escape') close(); };
      back.onclick = e => { if (e.target === back) close(); };
      back.querySelectorAll('.lvl-opt').forEach(o => {
        o.onclick = () => {
          document.removeEventListener('keydown', key);
          // the chosen level pops, the others dim, then the sheet slides away and the path redraws
          const apply = () => { back.remove(); if (o.dataset.level !== Store.level) { Store.level = o.dataset.level; redraw(); } };
          if (matchMedia('(prefers-reduced-motion: reduce)').matches) return apply();
          back.classList.add('picked');
          o.classList.add('chosen');
          setTimeout(() => { back.classList.add('out'); setTimeout(apply, 190); }, 260);
        };
      });
      document.addEventListener('keydown', key);
      document.body.appendChild(back);
      back.querySelector('.lvl-opt.on').focus();
    };
  }

  function learn() {
    const items = pathFor('vocab');
    view.innerHTML = `
      <h1 class="sr-only">${t('learn.title')}</h1>
      ${pathHero(items)}
      ${learnTabs('vocab')}
      ${levelSeg()}
      <div class="search">
        ${ICON.search}
        <input id="search" type="search" enterkeyhint="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
          placeholder="${t('search.ph')}" aria-label="${t('search.ph')}">
      </div>
      <div id="units">${pathHtml(items)}</div>
      <div id="results" hidden></div>`;
    bindPath(items);
    bindLevelSeg(learn);
    const input = $('#search'), units = $('#units'), results = $('#results');
    // Only the results area is redrawn while typing, so the keyboard stays open
    input.oninput = () => {
      const q = input.value.trim();
      units.hidden = !!q;
      results.hidden = !q;
      if (!q) { results.innerHTML = ''; return; }
      results.innerHTML = searchResults(q);
      const found = searchWords(q);
      results.querySelectorAll('[data-say]').forEach(b => { b.onclick = () => speak(found[b.dataset.say].en); });
      const clear = results.querySelector('.empty-act');
      if (clear) clear.onclick = () => { input.value = ''; input.oninput(); input.focus(); };
    };
    input.onkeydown = e => { if (e.key === 'Enter') input.blur(); };   // "Search" on the keyboard closes it
  }

  // Useful full sentences, grouped by situation
  function phrases() {
    const items = pathFor('phrases');
    view.innerHTML = `
      <h1 class="sr-only">${t('learn.title')}</h1>
      ${pathHero(items)}
      ${learnTabs('phrases')}
      ${levelSeg()}
      ${pathHtml(items)}`;
    bindPath(items);
    bindLevelSeg(phrases);
  }

  // ---------- Grammar ----------
  // ---------- Tenses map: when (past / present / future) × how (simple, progressive, perfect, perfect progressive) ----------
  const TENSES = [
    ['past', [['simple', 'past-simple', 'I worked'], ['prog', 'past-continuous', 'I was working'],
      ['perf', 'past-perfect', 'I had worked'], ['pp', 'a-past-perfect-continuous', 'I had been working']]],
    ['present', [['simple', 'present-simple', 'I work'], ['prog', 'present-continuous', 'I am working'],
      ['perf', 'present-perfect', 'I have worked'], ['pp', 'present-perfect-continuous', 'I have been working']]],
    ['future', [['simple', 'future', 'I will work'], ['prog', 'a-future-perfect-continuous', 'I will be working'],
      ['perf', 'a-future-perfect-continuous', 'I will have worked'], ['pp', 'a-future-perfect-progressive', 'I will have been working']]]
  ];
  const TENSE_EN = { past: 'Past', present: 'Present', future: 'Future', simple: 'Simple', prog: 'Progressive', perf: 'Perfect', pp: 'Perfect Progressive' };
  const isTenseRule = id => TENSES.some(([, cells]) => cells.some(c => c[1] === id));

  function tenses() {
    view.innerHTML = `
      <a class="back" href="#/grammar">${bwd()} ${t('grammar.back')}</a>
      <h1>⏱️ ${t('tn.title')}</h1>
      <p class="sub">${t('tn.sub')}</p>
      <div class="tn-key" aria-hidden="true">${['simple', 'prog', 'perf', 'pp'].map(a => `<span class="asp-${a}">${t('tn.' + a)}</span>`).join('')}</div>
      ${TENSES.map(([time, cells]) => `
        <section class="tn-time">
          <h2 class="tn-h">${t('tn.' + time)} <small class="en">${TENSE_EN[time]}</small></h2>
          <div class="tn-grid">
            ${cells.map(([asp, id, ex]) => {
              const g = GRAMMAR.find(x => x.id === id);
              return `<a class="tn-cell asp-${asp}" href="#/grammar/${id}">
                <b>${t('tn.' + time)} ${t('tn.' + asp)}</b>
                <small class="en">${TENSE_EN[time]} ${TENSE_EN[asp]}</small>
                <span class="tn-ex en" dir="ltr">${ex}</span>
                <span class="tn-meta">${t('lv.' + g.level)}${Store.isGrammarDone(id) ? ' · 👑' : ''}</span>
              </a>`;
            }).join('')}
          </div>
        </section>`).join('')}`;
  }

  // In a rule's example, the words the rule is about stand out: any of its quiz answers found in the sentence
  // (longest first, whole words only, so "had been working" wins over "had")
  function markKey(en, g) {
    const keys = [...new Set(g.quiz.map(q => q[1]).filter(k => /[a-z]/i.test(k)))].sort((a, b) => b.length - a.length);
    for (const k of keys) {
      const safe = k.replace(/[.*+?^$(){}|[\]\\]/g, '\\$&');
      const re = new RegExp("(^|[^A-Za-z'])(" + safe + ")(?![A-Za-z'])", 'i');
      if (re.test(en)) return en.replace(re, (m, pre, word) => `${pre}<mark class="ex-key">${word}</mark>`);
    }
    return en;
  }

  // The Grammar tab: one road through every rule of every level (as the Learn paths)
  // Rules found by a search in Hebrew or English: names first, then the structures and examples
  function ruleSearch(items, query) {
    const k = searchKey(query);
    if (!k) return [];
    return items.map((x, i) => {
      const g = x.rule;
      const name = searchKey(`${g.title} ${g.he}`);
      const body = searchKey(`${g.forms.map(f => f[1]).join(' ')} ${g.ex.map(e => e[0]).join(' ')}`);
      const s = name.split(' ').some(w => w.startsWith(k)) ? 0 : name.includes(k) ? 1 : body.includes(k) ? 2 : -1;
      return { x, i, s };
    }).filter(o => o.s >= 0).sort((a, b) => a.s - b.s || a.i - b.i).slice(0, 12);
  }

  function grammarRoad() {
    const items = pathFor('gall');
    view.innerHTML = `
      <h1 class="sr-only">${t('gr.title')}</h1>
      ${pathHero(items)}
      <a class="tn-entry" href="#/tenses"><span class="tn-entry-ico" aria-hidden="true">⏱️</span>
        <span class="grow"><b>${t('tn.title')}</b><small>${t('tn.card')}</small></span><span class="go-chev" aria-hidden="true">${fwd()}</span></a>
      <div class="gsearch-row">
        <div class="search">
          ${ICON.search}
          <input id="gsearch" type="search" enterkeyhint="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
            placeholder="${t('gsearch.ph')}" aria-label="${t('gsearch.ph')}">
        </div>
        <button class="gsaved" id="gsaved" aria-pressed="false" aria-label="${t('saved.chip')}">⭐ <b id="gsaved-n" class="en">${Store.savedRules().length}</b></button>
      </div>
      <div id="gresults" hidden></div>
      <div id="groad">${pathHtml(items)}</div>`;
    bindPath(items);
    // Search: the road steps aside for the results; a result goes back to the road, on that rule, with its card open
    const input = $('#gsearch'), results = $('#gresults'), road = $('#groad'), savedBtn = $('#gsaved');
    let onlySaved = false;
    savedBtn.onclick = () => { onlySaved = !onlySaved; input.oninput(); };
    input.oninput = () => {
      const q = input.value.trim();
      const on = !!q || onlySaved;
      savedBtn.classList.toggle('on', onlySaved);
      savedBtn.setAttribute('aria-pressed', String(onlySaved));
      road.hidden = on;
      results.hidden = !on;
      if (!on) { layoutPath(); results.innerHTML = ''; return; }
      let found = q ? ruleSearch(items, q) : items.map((x, i) => ({ x, i }));
      if (onlySaved) found = found.filter(o => Store.isRuleSaved(o.x.rule.id));
      // Saved rules: a header with how many are saved in each level (in the level's colour), then the practice button
      const savedIds = Store.savedRules();
      const perLevel = LEVELS.map(l => [l.id, GRAMMAR.filter(g => g.level === l.id && savedIds.includes(g.id)).length]).filter(p => p[1]);
      const practice = onlySaved && savedIds.length
        ? `<div class="gsv-head"><span class="gsv-ico" aria-hidden="true">🔖</span>
            <div class="grow"><b>${t('saved.chip')}</b>
              <div class="gsv-lv">${perLevel.map(([lv, n]) => `<span class="lv-${lv}">${t('lv.' + lv)} · <span class="en">${n}</span></span>`).join('')}</div></div></div>
          <a class="btn gpractice" href="#/grammar/saved/quiz">🏋️ ${t('saved.practice', { n: savedIds.length })}</a>` : '';
      results.innerHTML = practice + (found.length
        ? `<p class="small search-count" role="status">${t(found.length === 1 ? 'gsearch.one' : 'gsearch.count', { n: found.length })}</p>` +
          found.map(o => `
            <button class="gres lv-${o.x.lvl}${savedIds.includes(o.x.rule.id) ? ' is-saved' : ''}" data-i="${o.i}">
              ${savedIds.includes(o.x.rule.id) ? '<span class="gres-rib" aria-hidden="true"></span>' : ''}
              <b class="gres-num ${o.x.state}">${o.x.done ? '👑' : o.i + 1}</b>
              <span class="grow"><b>${o.x.label}</b><small>${savedIds.includes(o.x.rule.id) ? `<span class="gres-saved">${t('saved.tag')}</span> · ` : ''}<span class="gres-lv">${t('lv.' + o.x.lvl)}</span> · ${t('path.state.' + o.x.state)}</small></span>
              <span class="go-chev" aria-hidden="true">${fwd()}</span>
            </button>`).join('')
        : emptyState(onlySaved && !q ? t('saved.none') : t('gsearch.none', { q: q.replace(/[<>&"]/g, '') }),
            `<button class="btn ghost empty-act">${t(onlySaved && !q ? 'empty.road' : 'empty.clear')}</button>`));
      const act = results.querySelector('.empty-act');
      if (act) act.onclick = () => { if (q) input.value = ''; else onlySaved = false; input.oninput(); };
      results.querySelectorAll('.gres').forEach(b => {
        b.onclick = () => {
          input.value = '';
          onlySaved = false;
          savedBtn.classList.remove('on');
          savedBtn.setAttribute('aria-pressed', 'false');
          results.hidden = true;
          results.innerHTML = '';
          road.hidden = false;
          layoutPath();
          $('#path').click();                     // close a card left open, so the tap below opens this one
          const node = $(`#path .pnode[data-i="${b.dataset.i}"]`);
          node.scrollIntoView({ block: 'center' });
          setTimeout(() => node.click(), 0);
        };
      });
    };
    input.onkeydown = e => { if (e.key === 'Enter') input.blur(); };
    // A certificate goes to the share sheet as a short message
    view.querySelectorAll('.cert-share').forEach(b => {
      b.onclick = e => {
        e.stopPropagation();
        navigator.share({ title: 'Lingua', text: t('cert.text', { level: t('lv.' + b.dataset.lvl), cefr: t('lvl.cefr.' + b.dataset.lvl), n: b.dataset.n }) }).catch(() => {});
      };
    });
    // Jumping ahead to a level: rules left behind stay open, and the road reopens at the new level
    view.querySelectorAll('.pgate-go').forEach(b => {
      b.onclick = e => {
        e.stopPropagation();
        const level = t('lv.' + b.dataset.lvl);
        sheet({
          title: t('gate.ask.title', { level }), text: t('gate.ask.text'),
          primary: t('gate.ask.yes'), secondary: t('gate.ask.no'),
          onPrimary: () => { location.hash = `#/grammar/test-${b.dataset.lvl}/quiz`; },
          onSecondary: () => { Store.level = b.dataset.lvl; grammarRoad(); }
        });
      };
    });
  }

  function grammarTopic(id) {
    const g = GRAMMAR.find(x => x.id === id);
    if (!g) return notFound();
    // The rule page wears its level's colour, like the road: a header card, then one card per part
    const road = LEVELS.flatMap(l => GRAMMAR.filter(x => x.level === l.id));
    const done = Store.isGrammarDone(g.id);
    view.innerHTML = `
      <div class="rule-page lv-${g.level}">
      <a class="back" href="#/grammar">${bwd()} ${t('grammar.back')}</a>
      <header class="rule-hero">
        <div class="rule-meta">
          <span class="rule-lvl">${t('lv.' + g.level)} · <span class="en">${t('lvl.cefr.' + g.level)}</span></span>
          <span class="rule-num">${t('rule.num', { n: road.indexOf(g) + 1, m: road.length })}</span>
        </div>
        <h1>${ruleTitle(g)}${done ? ' <span class="rule-crown" aria-label="' + t('path.state.done') + '">👑</span>' : ''}</h1>
        ${isTenseRule(g.id) ? `<a class="rule-tn" href="#/tenses">⏱️ ${t('tn.title')}</a>` : ''}
        <p class="sub">${ruleOther(g)}</p>
      </header>

      <section class="rcard">
        <h2 class="rcard-h"><span aria-hidden="true">💡</span> ${t('grammar.when')}</h2>
        <p class="he para">${heMix(g.when)}</p>
      </section>

      <section class="rcard">
        <h2 class="rcard-h"><span aria-hidden="true">🧩</span> ${t('grammar.structure')}</h2>
        <div class="rforms">
          ${g.forms.map(([tag, text]) => `<div class="rform"><span class="rtag">${formTag(tag)}</span><span class="grow en" dir="ltr">${text}</span></div>`).join('')}
        </div>
      </section>

      <section class="rcard">
        <h2 class="rcard-h"><span aria-hidden="true">🔊</span> ${t('grammar.examples')}</h2>
        ${g.ex.map(([en, he], n) => `
          <div class="ex-bubble">
            <div class="ex-say">
              <button class="speak sm" data-say="${n}" aria-label="${t('aria.listen')}">${ICON.speaker}</button>
              <b class="en" dir="ltr">${markKey(en, g)}</b>
            </div>
            <div class="he">${he}</div>
          </div>`).join('')}
      </section>

      <section class="rcard rtip">
        <h2 class="rcard-h"><span aria-hidden="true">⚠️</span> ${t('grammar.mistake')}</h2>
        <p class="he para">${heMix(g.tip)}</p>
      </section>

      <a class="btn rule-go" href="#/grammar/${g.id}/quiz">${t('grammar.practice')}</a>
      </div>`;
    view.querySelectorAll('[data-say]').forEach(b => { b.onclick = () => speak(g.ex[b.dataset.say][0]); });
  }

  function grammarQuiz(id) {
    // "review": questions from every rule that had mistakes, mixed, so each one asks "which rule fits here?"
    // "test-<level>": a level check at a gate, one question from each of 6 rules of the level before
    const review = id === 'review';
    const saved = id === 'saved';                   // practice of the learner's saved rules
    const final = id.startsWith('final-') ? id.slice(6) : null;   // review of a whole finished level
    if (final && !LEVELS.some(l => l.id === final)) return notFound();
    const test = id.startsWith('test-') ? id.slice(5) : null;
    const ti = test ? LEVELS.findIndex(l => l.id === test) : -1;
    if (test && ti < 1) return notFound();
    const g = review || saved || test || final ? null : GRAMMAR.find(x => x.id === id);
    if (!review && !saved && !test && !final && !g) return notFound();
    const weak = review ? GRAMMAR.filter(x => Store.weakRules().includes(x.id))
      : saved ? GRAMMAR.filter(x => Store.isRuleSaved(x.id)) : [];
    if ((review || saved) && !weak.length) { location.hash = '#/grammar'; return; }
    const qs = review || saved
      ? shuffle(weak.flatMap(r => r.quiz.map(q => ({ q, r })))).slice(0, 8)
      : final
        ? shuffle(GRAMMAR.filter(x => x.level === final)).slice(0, 10).map(r => ({ q: r.quiz[Math.floor(Math.random() * r.quiz.length)], r }))
      : test
        ? shuffle(GRAMMAR.filter(x => x.level === LEVELS[ti - 1].id)).slice(0, 6).map(r => ({ q: r.quiz[Math.floor(Math.random() * r.quiz.length)], r }))
        : g.quiz.map(q => ({ q, r: g }));
    let i = 0, correct = 0, streak = 0;
    const started = Date.now();

    function question() {
      const [q, answer, wrong] = qs[i].q;
      const rule = qs[i].r;
      // The quiz wears the level's colour, like the road and the rule page (the progress track too)
      const lvl = test || final || rule.level;
      document.body.dataset.lv = lvl;
      view.innerHTML = `
        <div class="gq lv-${lvl}">
        <div class="gq-head">
          <span class="gq-title">${review ? `🏋️ ${t('grev.title')}` : saved ? `⭐ ${t('saved.chip')}` : final ? `🎓 ${t('final.title', { level: t('lv.' + final) })}` : test ? `🚪 ${t('gtest.title', { level: t('lv.' + test) })}` : ruleTitle(g)}</span>
          <span class="gq-count">${t('quiz.count', { a: i + 1, b: qs.length })}</span>
        </div>
        ${lessonBar(i / qs.length)}
        ${review || saved ? `<p class="small grev-rule">${ruleTitle(rule)}</p>` : ''}
        <div class="card question gq-card">
          <span class="gq-lvl">${t('lv.' + rule.level)} · <span class="en">${t('lvl.cefr.' + rule.level)}</span></span>
          <div class="small">${t('grammar.choose')}</div>
          <div class="prompt sentence en" id="sentence" dir="ltr">${q.replace('___', '<span class="gq-blank">_____</span>')}</div>
        </div>
        <div class="options gq-opts">
          ${shuffle([answer, ...wrong]).map(o => `<button class="opt en" dir="ltr">${o}</button>`).join('')}
        </div>
        <button class="btn" id="next" hidden>${t(i === qs.length - 1 ? 'btn.finish' : 'btn.next')}</button>
        </div>`;

      speak(q.replace('___', '…').replace(/"/g, ''));   // every new question starts with its sentence, the blank as a pause
      selectThenCheck(btn => {
          const ok = btn.textContent === answer;
          view.querySelectorAll('.opt').forEach(b => {
            b.disabled = true;
            if (b.textContent === answer) b.classList.add('right');
          });
          if (!ok) btn.classList.add('wrong');
          ok ? Feel.right() : Feel.wrong(btn);
          if (ok) correct++;
          if (!ok) Store.ruleMiss(rule.id); else if (review) Store.ruleHit(rule.id);
          streak = ok ? streak + 1 : 0;
          const full = q.replace('___', answer);
          $('#sentence').innerHTML = q.replace('___', `<mark class="gq-ans">${answer}</mark>`);
          speak(full.replace(/"/g, ''));
          const ex = (EXPLAIN[rule.id] || [])[rule.quiz.indexOf(qs[i].q)];
          const why = ex ? whyHtml({ picked: btn.textContent, pickedWhy: ok ? '' : heMix(ex.no[btn.textContent] || ''), answer, answerWhy: heMix(ex.ok), rule }) : '';
          showFeedback({ ok, answer: ok ? '' : full, mark: answer, say: full.replace(/"/g, ''), combo: streak, why });
      });
      $('#next').onclick = () => { i++; i < qs.length ? question() : (review ? reviewSummary() : saved ? savedSummary() : final ? finalSummary() : test ? testSummary() : summary()); };
    }

    function finalSummary() {
      const good = correct >= Math.ceil(qs.length * 0.8);
      refreshChrome('grammar');
      endLesson(1);
      view.innerHTML = `
        <div class="card center result">
          <div class="big">${good ? '🎓' : '💪'}</div>
          <h1>${t('quiz.score', { a: correct, b: qs.length })}</h1>
          <p class="sub">${t(good ? 'final.pass' : 'final.fail')}</p>
          ${roundStats({ correct, total: qs.length, ms: Date.now() - started })}
          <a class="btn" href="#/grammar">${t('gtest.go')}</a>
          ${!good && Store.weakRules().length ? `<a class="btn ghost" href="#/grammar/review/quiz">${t('gtest.review')}</a>` : ''}
        </div>`;
      countUp();
    }

    function savedSummary() {
      refreshChrome('grammar');
      endLesson(1);
      view.innerHTML = `
        <div class="card center result">
          <div class="big">${correct === qs.length ? '🏆' : '⭐'}</div>
          <h1>${t('quiz.score', { a: correct, b: qs.length })}</h1>
          <p class="sub">${t(correct === qs.length ? 'saved.perfect' : 'saved.keep')}</p>
          ${roundStats({ correct, total: qs.length, ms: Date.now() - started })}
          <a class="btn" href="#/grammar/saved/quiz">${t('saved.again')}</a>
          <a class="btn ghost" href="#/grammar">${t('grammar.all')}</a>
        </div>`;
      countUp();
    }

    // Level check: 5 of 6 moves the learner up; the rules missed wait at the review stop
    function testSummary() {
      const passed = correct >= qs.length - 1;
      if (passed) Store.level = test;
      refreshChrome('grammar');
      endLesson(1);
      view.innerHTML = `
        <div class="card center result">
          <div class="big">${passed ? '🚪' : '💪'}</div>
          <h1>${t('quiz.score', { a: correct, b: qs.length })}</h1>
          <p class="sub">${passed ? t('gtest.pass', { level: t('lv.' + test) }) : t('gtest.fail', { n: qs.length - 1 })}</p>
          ${roundStats({ correct, total: qs.length, ms: Date.now() - started })}
          <a class="btn" href="#/grammar">${t('gtest.go')}</a>
          ${!passed && Store.weakRules().length ? `<a class="btn ghost" href="#/grammar/review/quiz">${t('gtest.review')}</a>` : ''}
        </div>`;
      countUp();
    }

    function reviewSummary() {
      refreshChrome('grammar');
      endLesson(1);
      const left = Store.weakRules().length;
      view.innerHTML = `
        <div class="card center result">
          <div class="big">${left ? '💪' : '🏆'}</div>
          <h1>${t('quiz.score', { a: correct, b: qs.length })}</h1>
          <p class="sub">${left ? t(left === 1 ? 'grev.left.one' : 'grev.left', { n: left }) : t('grev.clear')}</p>
          ${roundStats({ correct, total: qs.length, ms: Date.now() - started })}
          ${left ? `<a class="btn" href="#/grammar/review/quiz">${t('grev.again')}</a>` : ''}
          <a class="btn${left ? ' ghost' : ''}" href="#/grammar">${t('grammar.all')}</a>
        </div>`;
      countUp();
    }

    function summary() {
      const passed = correct >= qs.length - 1;
      // The daily task counts only when the rule was actually passed
      if (passed) { Store.markGrammar(g.id); Store.completeTask('grammar'); }
      refreshChrome('grammar');
      endLesson(1);
      const next = levelGrammar().find(x => !Store.isGrammarDone(x.id));
      view.innerHTML = `
        ${celebration()}
        <div class="card center result">
          <div class="big">${passed ? '🏆' : '💪'}</div>
          <h1>${t('quiz.score', { a: correct, b: qs.length })}</h1>
          <p class="sub">${t(passed ? 'grammar.done' : 'grammar.retry')}</p>
          ${roundStats({ correct, total: qs.length, ms: Date.now() - started })}
          ${passed
            ? (next ? `<a class="btn" href="#/grammar/${next.id}">${t('grammar.next', { title: ruleTitle(next) })}</a>` : `<a class="btn" href="#/">${t('btn.home')}</a>`)
            : `<a class="btn" href="#/grammar/${g.id}">${t('grammar.again')}</a>`}
          <a class="btn ghost" href="#/grammar">${t('grammar.all')}</a>
        </div>`;
      countUp();
    }

    question();
  }

  // ---------- Flashcards ----------
  // Flashcards: a tap turns the card over in 3D; then swipe right for "knew it", left for "again"
  // (as in Drops, Memrise and Anki). Buttons do the same for anyone who prefers tapping.
  function lesson(unitId) {
    const unit = UNITS.find(u => u.id === unitId);
    if (!unit) return notFound();
    const words = unit.words;
    let i = 0, known = 0;

    function finish() {
      endLesson(1);
      view.innerHTML = `
        <div class="card center result">
          <div class="big">🃏</div>
          <h1>${t('cards.done.title')}</h1>
          <p class="sub">${t('cards.done', { a: known, b: words.length })}</p>
          <a class="btn" href="#/quiz/choice/${unit.id}">${t('card.practice')}</a>
          <button class="btn ghost" id="restart">${t('cards.restart')}</button>
        </div>`;
      $('#restart').onclick = () => { i = 0; known = 0; document.body.classList.add('in-lesson'); draw(); };
    }

    function draw() {
      const w = words[i];
      Store.markSeen(w.id);
      const long = w.phrase ? 'long' : '';
      let flipped = false, busy = false;
      document.body.dataset.lv = unit.level;   // the progress track in the unit's level colour
      view.innerHTML = `
        <div class="gq-head lv-${unit.level}">
          <span class="gq-title">${unit.emoji} ${unitTitle(unit)}</span>
          <span class="gq-count">${t('card.count', { a: i + 1, b: words.length })}</span>
        </div>
        ${lessonBar(i / words.length)}
        <div class="fc-deck lv-${unit.level}${i < words.length - 1 ? ' has-more' : ''}">
        <div class="fc-wrap lv-${unit.level}" id="fcwrap">
          <span class="fc-tag know" aria-hidden="true">${t('cards.know')} ✓</span>
          <span class="fc-tag again" aria-hidden="true">↺ ${t('cards.again')}</span>
          <div class="fc" id="fc">
            <div class="fc-face front card flash">
              <span class="fc-emoji" aria-hidden="true">${unit.emoji}</span><span class="fc-mark" aria-hidden="true">${unit.emoji}</span>
              <div class="word en ${long}">${w.en}</div>
              <button class="speak" data-speak aria-label="${t('aria.listen')}">${ICON.speaker}</button>
              <button class="hint" id="flip" aria-expanded="false">${t('card.hint')}</button>
            </div>
            <div class="fc-face back card flash" aria-hidden="true">
              <span class="fc-emoji" aria-hidden="true">${unit.emoji}</span>
              <div class="fc-en en">${w.en}</div>
              <div class="he ${long}">${w.he}</div>
              ${w.ex ? `<div class="example en">${w.ex}</div>` : ''}
              <button class="speak sm" data-speak aria-label="${t('aria.listen')}" tabindex="-1">${ICON.speaker}</button>
            </div>
          </div>
        </div>
        </div>
        <p class="fc-help small" id="fchelp" aria-live="polite"></p>
        <div class="pager fc-btns lv-${unit.level}" id="fcbtns"></div>
        ${i > 0 ? `<button class="btn plain" id="prev">${bwd()} ${t('cards.prev')}</button>` : ''}`;

      const wrap = $('#fcwrap'), fc = $('#fc'), btns = $('#fcbtns');
      const front = fc.querySelector('.front'), back = fc.querySelector('.back');
      speak(w.en);   // every new card starts with the sound of the word

      function buttons() {
        btns.innerHTML = flipped
          // "Knew it" sits on the right in both languages, the side a "knew it" swipe goes to
          ? (isHe()
            ? `<button class="btn fc-know" id="know">${t('cards.know')} ✓</button><button class="btn fc-again" id="again">↺ ${t('cards.again')}</button>`
            : `<button class="btn fc-again" id="again">↺ ${t('cards.again')}</button><button class="btn fc-know" id="know">${t('cards.know')} ✓</button>`)
          : `<button class="btn fc-show" id="show">${t('cards.show')}</button>`;
        if (flipped) {
          $('#again').onclick = () => fly(false);
          $('#know').onclick = () => fly(true);
        } else $('#show').onclick = () => flip();
      }
      function flip() {
        if (busy) return;
        flipped = !flipped;
        fc.classList.toggle('is-flipped', flipped);
        front.setAttribute('aria-hidden', String(flipped));
        back.setAttribute('aria-hidden', String(!flipped));
        back.querySelector('[data-speak]').tabIndex = flipped ? 0 : -1;
        $('#flip').setAttribute('aria-expanded', String(flipped));
        $('#fchelp').textContent = flipped ? t('cards.swipe') : '';
        buttons();
        if (flipped) setTimeout(() => $('#know') && $('#know').focus({ preventScroll: true }), 50);
      }
      // The card flies off to the side it was sent, then the next one comes in
      function fly(knowIt) {
        if (busy) return;
        busy = true;
        if (knowIt) { known++; Store.answer(w.id, true); Feel.right(); } else Store.again(w.id);
        wrap.style.transition = 'transform .3s ease-in, opacity .3s ease-in';
        wrap.style.transform = `translateX(${knowIt ? 130 : -130}vw) rotate(${knowIt ? 22 : -22}deg)`;
        wrap.style.opacity = '0';
        setTimeout(() => { i++; i < words.length ? draw() : finish(); },
          matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 260);
      }

      // Drag: follows the finger, tilts, and shows "knew it" / "again" as it goes
      let x0 = null, dx = 0, moved = false, suppress = false;
      wrap.onpointerdown = e => { if (busy) return; x0 = e.clientX; dx = 0; moved = false; wrap.style.transition = 'none'; };
      wrap.onpointermove = e => {
        if (x0 === null) return;
        dx = e.clientX - x0;
        if (Math.abs(dx) > 8) moved = true;
        if (!moved || !flipped) return;
        if (!wrap.hasPointerCapture(e.pointerId)) wrap.setPointerCapture(e.pointerId);
        wrap.style.transform = `translateX(${dx}px) rotate(${dx / 18}deg)`;
        wrap.style.setProperty('--know', Math.max(0, Math.min(1, dx / 100)));
        wrap.style.setProperty('--again', Math.max(0, Math.min(1, -dx / 100)));
      };
      const release = () => {
        if (x0 === null) return;
        x0 = null;
        if (!moved) return;
        suppress = true;
        if (!flipped) return;
        if (Math.abs(dx) > 90) return fly(dx > 0);
        wrap.style.transition = 'transform .25s cubic-bezier(.3, 1.4, .5, 1)';
        wrap.style.transform = '';
        wrap.style.setProperty('--know', 0);
        wrap.style.setProperty('--again', 0);
      };
      wrap.onpointerup = release;
      wrap.onpointercancel = release;
      // A tap (not a drag) turns the card; the speaker buttons only speak
      wrap.onclick = e => {
        if (suppress) { suppress = false; return; }
        if (e.target.closest('[data-speak]')) return speak(w.en);
        flip();
      };
      // Keyboard: Space/Enter turn the card (the hint button), arrows decide once it's turned
      view.onkeydown = e => {
        if (!flipped || busy) return;
        if (e.key === 'ArrowRight') fly(true);
        if (e.key === 'ArrowLeft') fly(false);
      };
      const prev = $('#prev');
      if (prev) prev.onclick = () => { i--; draw(); };
      buttons();
    }
    draw();
  }

  // ---------- Practice (third section of the Learn screen) ----------
  function practice() {
    const due = Store.dueWords().length;
    const modes = [
      ...(Store.trickyWords().length ? [{ title: t('tricky.title'), sub: t('tricky.some', { n: Store.trickyWords().length }), href: '#/quiz/choice/tricky', icon: 'target', color: 'rose', skill: 'memory' }] : []),
      { title: t('practice.review'), sub: due === 1 ? t('practice.review.one') : due ? t('practice.review.some', { n: due }) : t('practice.review.none'), href: '#/quiz/choice/review', icon: 'repeat', color: 'blue', skill: 'memory', badge: due },
      { title: t('task.speak'), sub: t('practice.speak.sub'), href: '#/speak', icon: 'mic', color: 'purple', skill: 'speak' },
      { title: t('task.listen'), sub: t('practice.listen.sub'), href: '#/quiz/listen/level', icon: 'headphones', color: 'green', skill: 'listen' },
      { title: t('practice.cloze'), sub: t('practice.cloze.sub'), href: '#/quiz/cloze/level', icon: 'pencil', color: 'gold', skill: 'context' },
      { title: t('practice.type'), sub: t('practice.type.sub'), href: '#/quiz/type/level', icon: 'keyboard', color: 'coral', skill: 'spell' }
    ];
    view.innerHTML = `
      <h1>${t('learn.title')}</h1>
      <p class="sub">${t('practice.sub', { level: levelLabel() })}</p>
      ${learnTabs('practice')}
      <div class="pgrid">
        ${modes.map((m, i) => `
          <a class="ptile c-${m.color}${i === 0 ? ' wide' : ''}" href="${m.href}">
            <span class="tile ${m.color}">${ICON[m.icon]}${m.badge ? `<span class="pt-badge en" aria-hidden="true">${m.badge > 99 ? '99+' : m.badge}</span>` : ''}</span>
            <span class="grow"><span class="pt-skill">${t('skill.' + m.skill)}</span><b>${m.title}</b><span class="small">${m.sub}</span></span>
          </a>`).join('')}
      </div>`;
  }

  // Words for an exercise: a unit, the due words, or the current level
  function poolFor(source) {
    if (source === 'review') return { pool: Store.dueWords(), title: t('quiz.review') };
    if (source === 'missed') return { pool: lastMissed, title: t('quiz.missedTitle') };
    if (source === 'tricky') return { pool: Store.trickyWords(), title: t('tricky.title') };
    if (source === 'pathreview') return { pool: (pathItems && pathItems.review) || [], title: t('rstop.label') };
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
    endLesson(1);
    view.innerHTML = `
      ${celebration()}
      <div class="card center result">
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
      endLesson();
      // nothing to practise here (e.g. no words due): the same owl as every other empty screen
      view.innerHTML = emptyState(`<b class="empty-title">${t('quiz.empty')}</b>${t('quiz.empty.sub')}`,
        `<a class="btn" href="#/learn">${t('btn.lessons')}</a>`);
      return;
    }

    // "Complete the sentence" and typing use single words (sentences are too long to type on a phone)
    const usable = mode === 'cloze' || mode === 'type' ? src.pool.filter(w => !w.phrase) : src.pool;
    // A lesson's own practice covers all of its words; mixed rounds (level, review…) stay at 8
    const isUnit = UNITS.some(u => u.id === source);
    const queue = shuffle(usable.length ? usable : src.pool).slice(0, isUnit ? 15 : 8);
    const total = queue.length;           // the score counts first tries only
    const tried = new Set();              // words already answered once this round
    const retries = new Map();            // how many times each word was sent back
    const missed = [];                    // words answered wrong on the first try
    let i = 0, correct = 0, streak = 0;
    const started = Date.now();

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
                  <div class="small he">${w.he}</div>
                  <button class="speak" id="speak" style="margin:6px auto 0" aria-label="${t('aria.listen')}">${ICON.speaker}</button>`;
      } else if (kind === 'type') {
        prompt = `<div class="small">${t('quiz.type')}</div>
                  <div class="prompt he">${w.he}</div>
                  <button class="speak" id="speak" style="margin:6px auto 0" aria-label="${t('aria.listen')}">${ICON.speaker}</button>`;
      } else if (toHebrew) {
        prompt = `<div class="small">${t('quiz.mean')}</div>
                  <div class="prompt en ${long}">${w.en}</div>
                  <button class="speak" id="speak" style="margin:6px auto 0" aria-label="${t('aria.listen')}">${ICON.speaker}</button>`;
      } else {
        prompt = `<div class="small">${t('quiz.say')}</div>
                  <div class="prompt he ${long}">${w.he}</div>
                  <button class="speak" id="speak" style="margin:6px auto 0" aria-label="${t('aria.listen')}">${ICON.speaker}</button>`;
      }

      view.innerHTML = `
        <p class="sub">${src.title} · ${t('quiz.count', { a: i + 1, b: queue.length })}</p>
        ${lessonBar(i / queue.length)}
        <div class="card question">${retry ? `<div class="again">${ICON.repeat}${t('quiz.again')}</div>` : ''}${prompt}</div>
        ${kind === 'type' ? `
        <form class="typed lv-${w.level}" id="typed" autocomplete="off">
          <div class="ty-slots" id="slots" dir="ltr" aria-hidden="true">${[...w.en].map(c => c === ' ' ? '<i class="gap"></i>' : '<i></i>').join('')}</div>
          <input id="answer" class="en" dir="ltr" lang="en" type="text" enterkeyhint="go"
            autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="${t('quiz.type')}" placeholder="${t('quiz.type.ph')}">
          <div class="ty-row">
            <button class="ty-hint" id="hint" type="button">💡 ${t('type.hint')}</button>
            <button class="btn" id="check" type="submit">${t('quiz.check')}</button>
          </div>
        </form>` : `
        <div class="options">
          ${options.map(o => `<button class="opt ${toHebrew ? 'he' : 'en'} ${long}" data-id="${o.id}">${o[key]}</button>`).join('')}
        </div>`}
        <button class="btn" id="next" hidden>${t(i === queue.length - 1 ? 'btn.finish' : 'btn.next')}</button>`;

      const sp = $('#speak');
      if (sp) sp.onclick = () => speak(w.en);
      speak(w.en);   // every new question starts with the sound of the word

      // Why, from the word data: what the picked word really means, and what the answer means (with its example)
      function wordWhy(ok, picked, typed) {
        // a word: "X means Y"; a whole sentence: the English and its Hebrew on two lines
        const means = x => x.phrase
          ? `<span class="why-line en" dir="ltr">${x.en}</span><span class="why-line" dir="rtl">"${x.he}"</span>`
          : t('v.means', { en: `<b class="en" dir="ltr">${x.en}</b>`, he: x.he });
        const answerWhy = means(w) + (w.ex && kind !== 'cloze' ? ` ${t('v.ex', { ex: `<span class="en" dir="ltr">${w.ex}</span>` })}` : '');
        if (ok && typed === undefined) return whyHtml({ answer: kind === 'choice' && toHebrew ? w.he : w.en, answerWhy });
        let pickedWhy = '';
        if (typed !== undefined) {
          const other = ALL_WORDS.find(x => !x.phrase && normalize(x.en) === normalize(typed) && x.id !== w.id);
          if (other) pickedWhy = t('v.typedOther', { v: `<b class="en" dir="ltr">${esc(typed)}</b>`, he: other.he });
          else if (editDistance(normalize(typed), normalize(w.en)) > Math.max(2, w.en.length / 2)) {
            pickedWhy = t('v.typedWrong', { v: `<b class="en" dir="ltr">${esc(typed)}</b>`, en: `<b class="en" dir="ltr">${w.en}</b>`, he: w.he });
          } else {
            const a = normalize(typed), b = w.en.toLowerCase();
            let k = 0;
            while (k < a.length && k < b.length && a[k] === b[k]) k++;
            const marked = esc(w.en.slice(0, k)) + `<mark class="fb-mark">${esc(w.en.slice(k, k + 1) || ' ')}</mark>` + esc(w.en.slice(k + 1));
            pickedWhy = t(ok ? 'v.typedClose' : 'v.typed', { v: `<b class="en" dir="ltr">${esc(typed)}</b>`, en: `<b class="en" dir="ltr">${marked}</b>` });
          }
          return whyHtml({ picked: typed, pickedWhy, answer: w.en, answerWhy, typed: true });
        }
        if (picked.phrase) {
          pickedWhy = t('v.otherPhrase') + means(picked);
        } else if (kind === 'choice' && toHebrew) {
          pickedWhy = t('v.notThis', { he: picked.he, en: `<b class="en" dir="ltr">${picked.en}</b>`, w: `<b class="en" dir="ltr">${w.en}</b>` });
        } else if (kind === 'listen') {
          pickedWhy = means(picked) + ' ' + t('v.heard', { en: `<b class="en" dir="ltr">${w.en}</b>`, he: w.he });
        } else if (kind === 'cloze') {
          pickedWhy = means(picked) + ' ' + t('v.gap', { he: w.he, en: `<b class="en" dir="ltr">${w.en}</b>` });
        } else {
          pickedWhy = means(picked) + ' ' + t('v.wordIs', { he: w.he, en: `<b class="en" dir="ltr">${w.en}</b>` });
        }
        return whyHtml({ picked: picked[key], pickedWhy, answer: kind === 'choice' && toHebrew ? w.he : w.en, answerWhy });
      }

      // After any answer: score it, maybe send the word back, reveal "Next"
      function settle(ok, close = false, why = '') {
          streak = ok ? streak + 1 : 0;
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
          // The answer in the language that was asked for, its pair underneath
          const heAnswer = kind === 'choice' && toHebrew;
          showFeedback({
            ok, close,
            answer: kind === 'cloze' ? w.ex : heAnswer ? w.he : w.en,
            lang: heAnswer ? 'he' : 'en',
            sub: heAnswer ? w.en : w.he,
            say: kind === 'cloze' ? w.ex : w.en,
            combo: streak,
            why
          });
      }

      if (kind !== 'type') selectThenCheck(btn => {
          const ok = btn.dataset.id === w.id;
          view.querySelectorAll('.opt').forEach(b => {
            b.disabled = true;
            if (b.dataset.id === w.id) b.classList.add('right');
          });
          if (!ok) btn.classList.add('wrong');
          ok ? Feel.right() : Feel.wrong(btn);
          settle(ok, false, wordWhy(ok, options.find(o => o.id === btn.dataset.id)));
      });

      if (kind === 'type') {
        const input = $('#answer');
        input.focus();   // runs inside the tap on "Next", so iPhone opens the keyboard
        // One slot per letter (the word's length is the first hint); typed letters fill the slots in order
        const slots = [...$('#slots').children].filter(s => !s.classList.contains('gap'));
        const fill = () => {
          const typedL = input.value.replace(/ /g, '');
          slots.forEach((s, k) => { s.textContent = typedL[k] || ''; s.classList.toggle('on', !!typedL[k]); });
        };
        input.addEventListener('input', fill);
        // A hint writes the next correct letter (after the part typed correctly so far)
        $('#hint').onclick = () => {
          if (input.readOnly) return;
          const v = input.value.toLowerCase(), target = w.en.toLowerCase();
          let k = 0;
          while (k < v.length && v[k] === target[k]) k++;
          if (k >= target.length - 1) return input.focus();
          let next = k + 1;
          if (target[next - 1] === ' ') next++;
          input.value = w.en.slice(0, next);
          fill();
          input.focus();
          if (next >= w.en.length - 1) $('#hint').disabled = true;   // the last letter is never given away
        };
        $('#typed').onsubmit = e => {
          e.preventDefault();
          if (input.readOnly) return;
          if (!input.value.trim()) return input.focus();
          const grade = gradeTyped(input.value, w);
          input.readOnly = true;
          input.classList.add(grade === 'wrong' ? 'wrong' : 'right');
          grade === 'wrong' ? Feel.wrong(input) : Feel.right();
          $('#check').hidden = true;
          $('#hint').hidden = true;
          settle(grade !== 'wrong', grade === 'close',
            grade === 'right' ? wordWhy(true) : wordWhy(grade !== 'wrong', null, input.value.trim()));   // Enter again goes on to the next word
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
      // The words to fix, each with its sound and meaning, and one tap to practice just them
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
        t(pct >= 80 ? 'quiz.great' : 'quiz.keep'),
        roundStats({ correct, total, xp: correct * 10, ms: Date.now() - started }) + fix);
      countUp();
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
      // The speaking round wears the colour of the learner's level, like the paths
      const lvl = Store.level;
      document.body.dataset.lv = lvl;
      view.innerHTML = `
        <div class="gq-head lv-${lvl}">
          <span class="gq-title">🎤 ${t('speak.title')}</span>
          <span class="gq-count">${t('card.count', { a: i + 1, b: queue.length })}</span>
        </div>
        ${lessonBar(i / queue.length)}
        <div class="card flash speak-card lv-${lvl}">
          <span class="gq-lvl">${t('lv.' + lvl)} · <span class="en">${t('lvl.cefr.' + lvl)}</span></span>
          <div class="small">${t(Recognition() ? 'speak.do.mic' : 'speak.do')}</div>
          <div class="word en ${w.phrase ? 'long' : ''}" style="margin-top:8px">${w.en}</div>
          <div class="speak-row">
            <span class="sp-btn"><button class="speak xl" id="speak" aria-label="${t('aria.listen')}">${ICON.speaker}</button><small aria-hidden="true">${t('aria.listen')}</small></span>
            ${Recognition() ? `<span class="sp-btn sp-mic"><button class="speak xl mic" id="mic" aria-label="${t('speak.mic')}" aria-pressed="false">${ICON.mic}</button><small aria-hidden="true">${t('speak.mic')}</small></span>` : ''}
          </div>
          <div class="heard" id="heard" aria-live="polite"></div>
          <div class="he ${w.phrase ? 'long' : ''}">${w.he}</div>
          ${w.ex ? `<div class="example en">${w.ex}</div>` : ''}
        </div>
        <div class="pager fc-btns lv-${lvl}">
          <button class="btn fc-again" id="hard">${t('speak.hard')}</button>
          <button class="btn fc-know" id="said">${t('speak.said')}</button>
        </div>`;
      $('#speak').onclick = () => speak(w.en);
      speak(w.en);   // hear it first, then say it
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
      const parts = [[w, words.length], [s, sentences.length], [r, rules.length]].filter(p => p[1]);
      const pct = Math.round(parts.reduce((n, [a, b]) => n + a / b, 0) / parts.length * 100);
      const row = (icon, label, a, b) => `
        <div class="lv-row"><span class="lv-ico" aria-hidden="true">${icon}</span>
          <span class="grow"><span class="lv-label">${label}</span><span class="lv-bar"><i style="width:${b ? Math.round(a / b * 100) : 0}%"></i></span></span>
        </div>`;
      return `
        <section class="lvcard lv-${l.id}">
          <div class="lv-head">
            <div class="lv-ring" style="--p:${pct}" role="img" aria-label="${pct}%"><b class="en">${pct}%</b></div>
            <div class="grow"><b>${t('lv.' + l.id)}</b><small class="en">${t('lvl.cefr.' + l.id)}</small></div>
          </div>
          ${row('📖', t('progress.words', { a: w, b: words.length }), w, words.length)}
          ${sentences.length ? row('💬', t('progress.phrases', { a: s, b: sentences.length }), s, sentences.length) : ''}
          ${row('✏️', t('progress.rules', { a: r, b: rules.length }), r, rules.length)}
        </section>`;
    };
    view.innerHTML = `
      <h1>${t('progress.title')}</h1>
      <p class="sub">${t('progress.sub', { x: Store.xp })}</p>
      <div class="stats">
        <div class="card stat st-words"><span class="st-ico" aria-hidden="true">📚</span><b>${mastered}</b><span class="small">${t('home.learned')}</span></div>
        <div class="card stat st-streak"><span class="st-ico" aria-hidden="true">🔥</span><b>${Store.streak}</b><span class="small">${t('progress.streak')}</span></div>
        <div class="card stat st-best"><span class="st-ico" aria-hidden="true">🏆</span><b>${Store.best}</b><span class="small">${t('progress.best')}</span></div>
      </div>
      ${weekCard()}
      ${monthCard()}
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

  // The last 5 weeks as a calendar: a day is tinted by how much was practised, today is ringed,
  // and the header counts active days and the longest run (as streak calendars do)
  function monthCard() {
    const days = Store.days(35);
    const pad = days[0].date.getDay();                      // first column is Sunday
    const level = c => (c === 0 ? 0 : c < 10 ? 1 : c < 25 ? 2 : 3);
    let run = 0, best = 0;
    days.forEach(d => { run = d.count ? run + 1 : 0; best = Math.max(best, run); });
    const active = days.filter(d => d.count).length;
    const narrow = new Intl.DateTimeFormat(Store.lang, { weekday: 'narrow' });
    const long = new Intl.DateTimeFormat(Store.lang, { day: 'numeric', month: 'long' });
    const sun = new Date(2024, 0, 7);                       // a Sunday, for the weekday letters
    const said = d => t(d.count === 1 ? 'week.answer.one' : 'week.answers', { n: d.count });
    return `
      <div class="card month">
        <div class="week-head">
          <b>${t('month.title')}</b>
          <span class="small">${t('month.sub', { a: active, b: best })}</span>
        </div>
        <div class="cal" role="list">
          ${Array.from({ length: 7 }, (_, k) => `<span class="cal-wd" aria-hidden="true">${narrow.format(new Date(sun.getTime() + k * 864e5))}</span>`).join('')}
          ${Array.from({ length: pad }, () => '<span class="cal-pad" aria-hidden="true"></span>').join('')}
          ${days.map(d => `<span class="cal-d l${level(d.count)}${d.today ? ' now' : ''}" role="listitem"
              aria-label="${long.format(d.date)}: ${said(d)}" title="${long.format(d.date)}: ${said(d)}">${d.date.getDate()}</span>`).join('')}
        </div>
        <div class="cal-key small" aria-hidden="true">${t('month.less')} <i class="cal-d l0"></i><i class="cal-d l1"></i><i class="cal-d l2"></i><i class="cal-d l3"></i> ${t('month.more')}</div>
      </div>`;
  }

  // Answers per day for the last week: one hue, thin bars on a baseline, today labelled
  function weekCard() {
    const days = Store.week();
    const max = Math.max(...days.map(d => d.count));
    const total = days.reduce((n, d) => n + d.count, 0);
    const active = days.filter(d => d.count > 0).length;
    const dayName = new Intl.DateTimeFormat(Store.lang, { weekday: 'narrow' });
    const longName = new Intl.DateTimeFormat(Store.lang, { weekday: 'long' });
    const said = d => t(d.count === 1 ? 'week.answer.one' : 'week.answers', { n: d.count });
    // a dashed line at the week's daily average: days above it stand out
    const avg = Math.round(total / days.length);
    return `
      <div class="card week">
        <div class="week-head">
          <b>${t('week.title')}</b>
          <span class="small">${t('week.sub', { a: active, n: total })}</span>
        </div>
        <div class="week-bars" role="list">
          ${avg && max ? `<span class="week-avg" style="--a:${avg / max}" aria-hidden="true"><small>${t('week.avg', { n: avg })}</small></span>` : ''}
          ${days.map(d => `
            <div class="wb${d.today ? ' is-today' : ''}${avg && d.count >= avg ? ' above' : ''}" role="listitem" title="${longName.format(d.date)}: ${said(d)}"
              aria-label="${d.today ? t('week.today') : longName.format(d.date)}: ${said(d)}">
              <span class="wv" aria-hidden="true">${d.count && (d.today || d.count === max) ? d.count : ''}</span>
              <span class="wcol"><i style="height:${d.count ? Math.max(4, Math.round((d.count / max) * 100)) : 0}%"></i></span>
              <span class="wd" aria-hidden="true">${d.today ? t('week.todayShort') : dayName.format(d.date)}</span>
            </div>`).join('')}
        </div>
      </div>`;
  }

  // ---------- Lesson focus mode ----------
  // While an exercise runs, the header and tab bar give way to a close button and one thick
  // progress bar (as in Duolingo and Babbel), so nothing competes with the question.
  let lessonDone = 0;          // share of the current round already done, 0..1
  let lessonExit = '#/learn';  // where the close button goes back to
  const lbFill = document.getElementById('lb-fill');
  const lbTrack = document.getElementById('lb-track');

  // After an answer: a green or red sheet rises from the bottom with the right answer, its sound,
  // and the Continue button, always in the same place under the thumb (as in Duolingo)
  // The "Why?" block under an answer: why the option picked is wrong (if it was), then why the answer is right
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  // a short option is repeated in the row's label; a whole sentence is not (the row itself shows it)
  const short = x => x && String(x).length <= 28 ? ` <span dir="auto">${esc(x)}</span>` : '';
  function whyHtml({ picked, pickedWhy, answer, answerWhy, typed, rule }) {
    if (!pickedWhy && !answerWhy) return '';
    // a grammar answer can open a short reminder of its rule right here, without leaving the round
    const ruleBox = rule ? `<details class="why-rule lv-${rule.level}">
        <summary>📖 ${t('why.rule')}: ${ruleTitle(rule)}</summary>
        <p>${heMix(rule.when)}</p>
        <div class="why-forms">${rule.forms.slice(0, 3).map(([tag, text]) => `<div><span class="rtag">${formTag(tag)}</span><span class="en" dir="ltr">${text}</span></div>`).join('')}</div>
      </details>` : '';
    return `<div class="fb-why">
      <b class="fb-why-h"><img src="icons/owl-192.png" alt="" width="22" height="22"> ${t('why.title')}</b>
      ${pickedWhy ? `<div class="why-row no"><span class="why-tag">✗ ${t(typed ? 'why.typed' : 'why.picked')}${short(picked)}</span><p>${pickedWhy}</p></div>` : ''}
      ${answerWhy ? `<div class="why-row ok"><span class="why-tag">✓ ${t('why.answer')}${short(answer)}</span><p>${answerWhy}</p></div>` : ''}
      ${ruleBox}
    </div>`;
  }

  function showFeedback({ ok, close, answer, lang = 'en', sub, say, combo = 0, mark, why = '' }) {
    // mark: the part of the answer that was the gap; it gets a highlight so the eye lands on it
    const answerHtml = answer && mark && answer.includes(mark) ? answer.replace(mark, `<mark class="fb-mark">${mark}</mark>`) : answer;
    const next = $('#next');
    const fb = document.createElement('div');
    fb.className = 'fb ' + (ok ? 'ok' : 'bad');
    fb.setAttribute('role', 'status');
    const title = ok ? (close ? t('quiz.type.close') : t('fb.right.' + Math.floor(Math.random() * 4))) : t('fb.answer');
    fb.innerHTML = `
      <div class="fb-head">
        <span class="fb-icon" aria-hidden="true">${ok ? ICON.check : ICON.cross}</span>
        <b>${title}</b>
        ${combo >= 3 ? `<span class="combo">🔥 ${t('combo', { n: combo })}</span>` : ''}
        ${say ? `<button class="speak sm fb-say" aria-label="${t('aria.listen')}">${ICON.speaker}</button>` : ''}
      </div>
      ${answer ? `<div class="fb-answer ${lang}" dir="${lang === 'he' ? 'rtl' : 'ltr'}">${answerHtml}</div>` : ''}
      ${sub ? `<div class="fb-sub" dir="auto">${sub}</div>` : ''}
      ${why}`;
    next.hidden = false;
    fb.appendChild(next);
    view.appendChild(fb);
    view.classList.add('has-fb');
    view.style.setProperty('--fb-h', fb.offsetHeight + 'px');   // the page scrolls far enough to show everything above the sheet
    const s = fb.querySelector('.fb-say');
    if (s) s.onclick = () => speak(say);
    next.focus({ preventScroll: true });
  }

  // End of a round: accuracy, points and time as three tiles that count up (as in Duolingo and Busuu)
  function roundStats({ correct, total, xp, ms }) {
    const acc = total ? Math.round((correct / total) * 100) : 0;
    const sec = Math.max(1, Math.round(ms / 1000));
    const time = Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0');
    return `
      <div class="stats-row">
        <div class="st acc"><span><i aria-hidden="true">🎯</i> ${t('st.acc')}</span><b data-count="${acc}" data-suffix="%">${acc}%</b></div>
        ${xp !== undefined ? `<div class="st xp"><span><i aria-hidden="true">⚡</i> ${t('st.xp')}</span><b data-count="${xp}" data-prefix="+">+${xp}</b></div>` : ''}
        <div class="st time"><span><i aria-hidden="true">⏱️</i> ${t('st.time')}</span><b>${time}</b></div>
      </div>`;
  }
  function countUp() {
    // The result's emoji sits inside a ring that fills to the round's accuracy: green, gold or coral
    const big = view.querySelector('.result .big'), accEl = view.querySelector('.st.acc b');
    if (big && accEl && !big.closest('.res-ring')) {
      const p = +accEl.dataset.count;
      const ring = document.createElement('div');
      ring.className = 'res-ring ' + (p >= 80 ? 'hi' : p >= 50 ? 'mid' : 'lo');
      ring.style.setProperty('--p', p);
      ring.setAttribute('role', 'img');
      ring.setAttribute('aria-label', `${t('st.acc')}: ${p}%`);
      big.replaceWith(ring);
      ring.appendChild(big);
    }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    view.querySelectorAll('[data-count]').forEach(el => {
      const to = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
      const t0 = performance.now();
      const step = now => {
        const p = Math.min(1, (now - t0) / 700);
        el.textContent = pre + Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  // Multiple choice: tap to select, then Check (a second tap on the same answer also checks).
  // A stray tap can be changed before it counts, as in Duolingo.
  function selectThenCheck(onAnswer) {
    const opts = [...view.querySelectorAll('.opt')];
    const bar = document.createElement('div');
    bar.className = 'checkbar';
    bar.innerHTML = `<button class="btn" id="checkopt" disabled>${t('quiz.check')}</button>`;
    view.appendChild(bar);
    view.classList.add('has-check');
    const checkBtn = bar.firstElementChild;
    let chosen = null;
    const check = () => {
      if (!chosen) return;
      bar.remove();
      view.classList.remove('has-check');
      opts.forEach(o => { o.classList.remove('sel'); o.removeAttribute('aria-pressed'); });
      onAnswer(chosen);
    };
    opts.forEach(b => {
      b.setAttribute('aria-pressed', 'false');
      b.onclick = () => {
        if (chosen === b) return check();
        chosen = b;
        opts.forEach(o => { o.classList.toggle('sel', o === b); o.setAttribute('aria-pressed', String(o === b)); });
        checkBtn.disabled = false;
      };
    });
    checkBtn.onclick = check;
  }

  function lessonBar(fraction) {
    view.classList.remove('has-fb', 'has-check');
    lessonDone = Math.max(0, Math.min(1, fraction));
    lbFill.style.width = (lessonDone * 100) + '%';
    lbTrack.setAttribute('aria-valuenow', String(Math.round(lessonDone * 100)));
    return '';
  }
  function endLesson(fraction) {
    if (fraction !== undefined) lessonBar(fraction);
    view.classList.remove('has-fb', 'has-check');
    document.body.classList.remove('in-lesson');
  }

  // A bottom sheet: the question, one main answer under the thumb, and a quiet second one
  function sheet({ title, text, primary, secondary, onSecondary, onPrimary }) {
    const back = document.createElement('div');
    back.className = 'sheet-back';
    back.innerHTML = `
      <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <b id="sheet-title">${title}</b>
        ${text ? `<p>${text}</p>` : ''}
        <button class="btn" id="sheet-primary">${primary}</button>
        <button class="btn plain" id="sheet-secondary">${secondary}</button>
      </div>`;
    const close = () => { back.classList.add('out'); setTimeout(() => back.remove(), 200); document.removeEventListener('keydown', key); };
    const key = e => { if (e.key === 'Escape') close(); };
    back.onclick = e => { if (e.target === back) close(); };
    back.querySelector('#sheet-primary').onclick = () => { close(); if (onPrimary) onPrimary(); };
    back.querySelector('#sheet-secondary').onclick = () => { close(); onSecondary(); };
    document.addEventListener('keydown', key);
    document.body.appendChild(back);
    back.querySelector('#sheet-primary').focus();
  }

  document.getElementById('lb-close').onclick = () => {
    const leave = () => { location.hash = lessonExit; };
    // Nothing answered yet: just leave. Mid-round: ask first.
    if (lessonDone <= 0) return leave();
    sheet({
      title: t('lesson.quit.title'), text: t('lesson.quit.text'),
      primary: t('lesson.quit.stay'), secondary: t('lesson.quit.leave'), onSecondary: leave
    });
  };

  function notFound() {
    endLesson();
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
    delete document.body.dataset.lv;   // a grammar quiz sets its level colour again
    document.querySelectorAll('.sheet-back').forEach(s => s.remove());
    view.onkeydown = null;
    view.onscroll = null;
    const inLesson = ['unit', 'quiz', 'speak'].includes(name) || (name === 'grammar' && b === 'quiz');
    document.body.classList.toggle('in-lesson', inLesson);
    if (inLesson) lessonBar(0);
    else if (name !== 'x') lessonExit = location.hash || '#/';
    switch (name || 'home') {
      case 'home': refreshChrome('grammar'); grammarRoad(); break;
      case 'learn': refreshChrome('learn'); learn(); break;
      case 'phrases': refreshChrome('learn'); phrases(); break;
      case 'unit': refreshChrome('learn'); lesson(a); break;
      case 'grammar':
        refreshChrome('grammar');
        if (!a) grammarRoad(); else if (b === 'quiz') grammarQuiz(a); else grammarTopic(a);
        break;
      case 'practice': refreshChrome('learn'); practice(); break;
      case 'quiz': refreshChrome('learn'); quiz(a, b); break;
      case 'speak': refreshChrome('learn'); speaking(); break;
      case 'progress': refreshChrome('progress'); progress(); break;
      case 'tenses': refreshChrome('grammar'); tenses(); break;
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

  // Surprise: tapping the logo opens a pink screen with a photo and a song; any tap closes it
  const song = new Audio('media/surprise.mp3');
  song.preload = 'auto';
  function closeSurprise() {
    const el = document.getElementById('surprise');
    if (el) el.remove();
    song.pause();
  }
  document.querySelector('.brand .logo').addEventListener('click', e => {
    e.preventDefault();          // the logo opens the surprise; the LINGUA text still goes home
    e.stopPropagation();
    closeSurprise();
    const el = document.createElement('div');
    el.id = 'surprise';
    el.className = 'surprise';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Surprise');
    el.innerHTML = '<img src="media/surprise.jpg" alt="">';
    el.onclick = closeSurprise;
    document.body.appendChild(el);
    song.currentTime = 0;
    song.play().catch(() => {});
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSurprise(); });
  song.addEventListener('ended', () => {
    const el = document.getElementById('surprise');
    if (el) el.classList.add('fading');
    setTimeout(closeSurprise, 400);
  });

  // No connection: a calm banner under the header. Everything still works from the copy on the phone.
  const offline = document.createElement('div');
  offline.className = 'offline';
  offline.setAttribute('role', 'status');
  document.querySelector('.topbar').after(offline);   // in the flow under the header, so it never covers the content
  const net = () => {
    offline.hidden = navigator.onLine;
    offline.innerHTML = navigator.onLine ? '' : `<span aria-hidden="true">📴</span> ${t('offline')}`;
  };
  window.addEventListener('online', net);
  window.addEventListener('offline', net);
  net();

  window.addEventListener('hashchange', route);
  applyLang();
  route();
})();
