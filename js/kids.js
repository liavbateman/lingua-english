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
      opp: 'מה ההפך?', oppTip: 'מצאו את ההפך', isOpp: '{a} – {b}!',
      night: 'לילה טוב! 🌙', nightSub: 'סיפור קטן לפני השינה', nightHi: 'כבר ערב… בוא נקרא סיפור לפני השינה 🌙',
      pcBed: 'מראה לילה בערב', pcBedText: 'מ-19:00 השמיים נעשים לילה, הצבעים רגועים והקול איטי יותר',
      wkTitle: 'השבוע של {name}', wkTitleAnon: 'השבוע', wkWords: '{n} מילים חדשות', wkNone: 'עוד אין מילים חדשות השבוע. אולי משחק קצר היום?',
      wkDays: '{n} ימי משחק · {m} דק׳', wkDay1: 'יום משחק אחד · {m} דק׳', wkShare: 'לשתף', wkCopied: 'הועתק! אפשר להדביק בוואטסאפ',
      wkMsg: '🦉 {name}השבוע ב-Lingua: {n} מילים חדשות באנגלית ({list}) ו-{d}. כל הכבוד!',
      recMe: 'שמעו את עצמכם', recGo: 'מקליט… תגידו!', recYou: 'זה אתם! ועכשיו הינשוף:', recNo: 'אין גישה למיקרופון. אפשר לבקש מהורה לאשר',
      trophies: 'הגביעים שלי', tr_isle1: 'האי הראשון', tr_isle5: '5 איים', tr_isleAll: 'כל האיים', tr_stars: '30 כוכבים',
      tr_words: '50 מילים', tr_bloom: 'פרח פורח', tr_abc: 'משחק האותיות', tr_trace: '10 אותיות מצוירות', tr_traceAll: 'כל ה-ABC',
      tr_story: '3 סיפורים', tr_storyAll: 'כל הסיפורים', tr_riddle: 'בלש', tr_treasure: '7 ימי אוצר', tr_owl: 'ינשוף מגונדר',
      holidaySub: 'אי חג מיוחד, רק בימים אלה!', holidayStickers: 'מדבקות חג',
      vcTitle: 'קולות', vcEn: 'קול באנגלית', vcHe: 'קול בעברית (הוראות)', vcOk: 'מותקן', vcMissing: 'חסר', vcTest: 'נסו',
      vcNone: 'המכשיר לא מדבר בכלל. נסו דפדפן אחר (Safari באייפון, Chrome באנדרואיד).',
      vcHeTip: 'בלי קול עברי הילד ישמע רק את המילים באנגלית, בלי הוראות בעברית. להתקנה:',
      vcIos: 'אייפון / אייפד: הגדרות ← נגישות ← תוכן מדובר ← קולות ← עברית (כרמית)',
      vcAndroid: 'אנדרואיד: הגדרות ← נגישות ← המרת טקסט לדיבור ← התקנת נתוני קול ← עברית',
      vcEnTip: 'בלי קול אנגלי הילד לא ישמע את המילים. התקינו קול אנגלי באותו מקום בהגדרות.',
      vcSampleHe: 'שלום! ככה נשמעות ההוראות בעברית.',
      count: 'כמה יש?', countTip: 'לחצו על כל אחד כדי לספור, ואז בחרו מספר',
      colour: 'צובעים!', colourSub: 'בחרו צבע וצבעו את התמונה', colourAsk: 'צבעו את ה{thing} ב{colour}', colourDone: 'איזו תמונה יפה!',
      colourFree: 'עכשיו צבעו מה שבא לכם!',
      practice: 'נתרגל את המילים הקשות ({n})', practiceTitle: 'מתרגלים', practiceDone: 'המילים האלה כבר קלות יותר!',
      pairs: 'אוזן חדה', pairsSub: 'מילים שנשמעות כמעט אותו דבר', pairsTip: 'הקשיבו טוב! איזו מילה שמעתם?',
      isleSongs: 'שירי האיים', isleSongsSub: 'כל אי שסיימתם מקבל שיר משלו', singIsle: 'שירו את שיר האי',
      peek: 'מציצים!', peekSub: 'מה מסתתר מאחורי העננים?', peekTip: 'מה מסתתר שם? בחרו מילה. ככל שמוקדם יותר, יותר כוכבים!',
      tryHome: 'לנסות בבית', tryHomeAny: 'השתמשו במילים של היום בבית: הצביעו, שאלו "What is it?" ושבחו כל ניסיון.',
      surprise: 'הפתעה!', surpriseTip: 'לחצו על הקובייה (או נערו את הטלפון) למשחק הפתעה',
      speed: 'סיבוב מהיר', speedSub: '10 מילים, כמה שיותר מהר!', speedBest: 'השיא שלך: {n}', speedScore: '{n} נקודות', speedNew: 'שיא חדש!',
      speedTip: 'הקשיבו ולחצו מהר! לא נורא אם הזמן נגמר',
      pcBig: 'אותיות גדולות ומרווחות', pcBigText: 'גופן קריא במיוחד (Lexend), גדול יותר ועם רווחים בין האותיות. עוזר לילדים שקשה להם לקרוא, כולל דיסלקציה',
      mute: 'האפליקציה לא מצליחה לדבר כרגע', muteOffline: 'אין חיבור לאינטרנט, ובמכשיר אין קול אנגלי שמור. התחברו פעם אחת לאינטרנט או התקינו קול אנגלי.',
      muteNoVoice: 'במכשיר לא נמצא קול באנגלית. בקשו מהורה לבדוק בפינת ההורים ← קולות.', muteOk: 'הבנתי',
      blend: 'מחברים צלילים', blendSub: 'שומעים צליל, ועוד צליל, ועוד אחד… איזו מילה יצאה?', blendTip: 'לחצו על כל אות לשמוע אותה, ואז בחרו את התמונה',
      blendGo: 'לחבר!',
      says: 'מה החיה אומרת?', saysTip: 'בחרו את הקול של החיה',
      pcAge: 'גיל', pcAgeLittle: '3–5 · בלי קריאה', pcAgeBig: '6–9 · עם מילים כתובות',
      pcAgeText: 'בגיל 3–5 המשחקים בנויים רק על תמונות וצלילים: בלי מילים כתובות במשימות, בלי גרירת מילים ובלי משחקי קריאה',
      scene: 'העולם שלי', sceneTip: 'גררו תמונה לתוך הציור (או לחצו עליה ואז על הציור). כל תמונה אומרת את המילה שלה!',
      sceneClear: 'לנקות', sceneEmpty: 'עוד אין תמונות. שחקו באיים כדי לאסוף מילים!',
      checkin: 'הינשוף שואל: איך אתם מרגישים היום?', checkinDone: 'היום הרגשתם:',
      weatherQ: 'ומה מזג האוויר היום? הסתכלו מהחלון!', checkinToday: 'היום:',
      together: 'משחקים ביחד', togetherSub: 'שני ילדים, טלפון אחד, כל אחד בתורו', turnOf: 'התור של {name}!', teamScore: 'ביחד מצאתם {n} מתוך {m}!',
      teamTip: 'מעבירים את הטלפון! כל תשובה נכונה עוזרת לשניכם',
      shop: 'החנות', shopSub: 'משחקים בחנות: מה הלקוח רוצה?', shopTip: 'הקשיבו ללקוח, שימו בסל ולחצו "Here you are!"',
      shopGive: 'Here you are!', shopBasket: 'הסל', shopCoins: '{n} מטבעות',
      spell: 'מאייתים', spellTip: 'הקשיבו למילה ולחצו על האותיות לפי הסדר. לחיצה על אות בשורה מחזירה אותה',
      pathBook: 'בחרו את הדרך', pathChoose: 'מה בוחרים?', pathEnd: 'סוף אחד מתוך ארבעה! אפשר לקרוא שוב ולבחור דרך אחרת',
      pathAgain: 'דרך אחרת', pathFound: 'מצאתם {n} מתוך 4 סופים',
      calTitle: 'לוח המדבקות שלי', calSub: 'כל יום שמשחקים מקבל מדבקה', calCount: '{n} ימי משחק החודש',
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
      opp: "What's the opposite?", oppTip: 'Find the opposite', isOpp: '{a} – {b}!',
      night: 'Good night! 🌙', nightSub: 'A little story before bed', nightHi: "It's evening… let's read a bedtime story 🌙",
      pcBed: 'Bedtime look in the evening', pcBedText: 'From 7pm the sky turns to night, colours calm down and the voice slows',
      wkTitle: "{name}'s week", wkTitleAnon: 'This week', wkWords: '{n} new words', wkNone: 'No new words this week yet. Maybe a short game today?',
      wkDays: '{n} play days · {m} min', wkDay1: '1 play day · {m} min', wkShare: 'Share', wkCopied: 'Copied! Paste it into WhatsApp',
      wkMsg: '🦉 {name}This week in Lingua: {n} new English words ({list}) and {d}. Well done!',
      recMe: 'Hear yourself', recGo: 'Recording… say it!', recYou: "That's you! Now the owl:", recNo: 'No microphone access. Ask a grown-up to allow it',
      trophies: 'My trophies', tr_isle1: 'First island', tr_isle5: '5 islands', tr_isleAll: 'All islands', tr_stars: '30 stars',
      tr_words: '50 words', tr_bloom: 'In full bloom', tr_abc: 'Letter game', tr_trace: '10 letters traced', tr_traceAll: 'The whole ABC',
      tr_story: '3 stories', tr_storyAll: 'Every story', tr_riddle: 'Detective', tr_treasure: '7 treasure days', tr_owl: 'Dressed-up owl',
      holidaySub: 'A special holiday island, only these days!', holidayStickers: 'Holiday stickers',
      vcTitle: 'Voices', vcEn: 'English voice', vcHe: 'Hebrew voice (instructions)', vcOk: 'Installed', vcMissing: 'Missing', vcTest: 'Test',
      vcNone: "This device doesn't speak at all. Try another browser (Safari on iPhone, Chrome on Android).",
      vcHeTip: 'Without a Hebrew voice your child hears only the English words, without Hebrew instructions. To install:',
      vcIos: 'iPhone / iPad: Settings → Accessibility → Spoken Content → Voices → Hebrew (Carmit)',
      vcAndroid: 'Android: Settings → Accessibility → Text-to-speech → Install voice data → Hebrew',
      vcEnTip: "Without an English voice your child won't hear the words. Install an English voice in the same settings.",
      vcSampleHe: 'שלום! ככה נשמעות ההוראות בעברית.',
      count: 'How many?', countTip: 'Tap each one to count, then pick the number',
      colour: 'Colour it!', colourSub: 'Pick a colour and colour the picture', colourAsk: 'Colour the {thing} {colour}', colourDone: 'What a lovely picture!',
      colourFree: 'Now colour anything you like!',
      practice: 'Practise the tricky words ({n})', practiceTitle: 'Practice', practiceDone: 'Those words are easier now!',
      pairs: 'Sharp ears', pairsSub: 'Words that sound almost the same', pairsTip: 'Listen carefully! Which word did you hear?',
      isleSongs: 'Island songs', isleSongsSub: 'Every island you finish gets its own song', singIsle: 'Sing the island song',
      peek: 'Peek-a-boo!', peekSub: "What's hiding behind the clouds?", peekTip: "What's hiding there? Pick a word. The earlier, the more stars!",
      tryHome: 'Try at home', tryHomeAny: 'Use today\'s words at home: point, ask "What is it?" and praise every try.',
      surprise: 'Surprise!', surpriseTip: 'Tap the dice (or shake the phone) for a surprise game',
      speed: 'Speed round', speedSub: '10 words, as fast as you can!', speedBest: 'Your best: {n}', speedScore: '{n} points', speedNew: 'New best!',
      speedTip: "Listen and tap fast! It's fine if time runs out",
      pcBig: 'Big, spaced letters', pcBigText: 'An extra-readable font (Lexend), larger and with more space between letters. Helps children who find reading hard, including dyslexia',
      mute: "The app can't speak right now", muteOffline: "There's no internet and no English voice saved on this device. Connect once, or install an English voice.",
      muteNoVoice: 'No English voice was found on this device. Ask a grown-up to check Parent corner → Voices.', muteOk: 'Got it',
      blend: 'Blend it!', blendSub: 'A sound, another sound, one more… which word is it?', blendTip: 'Tap each letter to hear it, then pick the picture',
      blendGo: 'Blend!',
      says: 'What does it say?', saysTip: 'Pick the sound the animal makes',
      pcAge: 'Age', pcAgeLittle: '3–5 · no reading', pcAgeBig: '6–9 · with written words',
      pcAgeText: 'At 3–5 the games use only pictures and sounds: no written words in the tasks, no word dragging and no reading games',
      scene: 'My world', sceneTip: 'Drag a picture into the scene (or tap it, then the scene). Every picture says its word!',
      sceneClear: 'Clear', sceneEmpty: 'No pictures yet. Play the islands to collect words!',
      checkin: 'The owl asks: how do you feel today?', checkinDone: 'Today you feel:',
      weatherQ: "And what's the weather today? Look out of the window!", checkinToday: 'Today:',
      together: 'Play together', togetherSub: 'Two children, one phone, taking turns', turnOf: "{name}'s turn!", teamScore: 'Together you found {n} of {m}!',
      teamTip: 'Pass the phone! Every right answer helps you both',
      shop: 'The shop', shopSub: 'Play shop: what does the customer want?', shopTip: 'Listen to the customer, fill the basket and tap "Here you are!"',
      shopGive: 'Here you are!', shopBasket: 'Basket', shopCoins: '{n} coins',
      spell: 'Spell it!', spellTip: 'Listen to the word and tap the letters in order. Tap a letter in the row to take it back',
      pathBook: 'Choose your way', pathChoose: 'What do you choose?', pathEnd: 'One of four endings! Read again and choose another way',
      pathAgain: 'Another way', pathFound: 'You found {n} of 4 endings',
      calTitle: 'My sticker calendar', calSub: 'Every day you play gets a sticker', calCount: '{n} play days this month',
      sayFind: 'Find the', sayMeet: "Let's meet new words", sayMatch: 'Find the pairs'
    }
  };
  const kt = (key, vars = {}) => {
    const v = STR[isHe() ? 'he' : 'en'][key];
    return typeof v === 'string' ? v.replace(/\{(\w+)\}/g, (_, n) => vars[n]) : v;
  };
  const pickOne = arr => arr[Math.floor(Math.random() * arr.length)];
  const themeName = th => (isHe() ? th.he : th.title);
  const theme = id => KIDS_THEMES.find(th => th.id === id) || KIDS_HOLIDAYS.find(th => th.id === id && holidayOn(th));

  // Holiday islands: on the map only around their holiday. The Hebrew date comes from the
  // browser's Hebrew calendar (Intl), so the dates move with the calendar every year.
  const HMONTHS = ['Tishri', 'Heshvan', 'Kislev', 'Tevet', 'Shevat', 'Adar I', 'Adar', 'Adar II', 'Nisan', 'Iyar', 'Sivan', 'Tamuz', 'Av', 'Elul'];
  function hebrewDate(d) {
    try {
      const parts = new Intl.DateTimeFormat('en-u-ca-hebrew', { month: 'long', day: 'numeric' }).formatToParts(d);
      const m = parts.find(p => p.type === 'month').value, day = +parts.find(p => p.type === 'day').value;
      return { m: m === 'Adar II' ? 'Adar' : m, day };   // in a leap year Purim is in Adar II
    } catch (e) { return null; }
  }
  let forcedHoliday = null;   // for checking a holiday island out of season
  function holidayOn(th, d = new Date()) {
    if (forcedHoliday) return forcedHoliday === th.id;
    if (th.when.months) return th.when.months.includes(d.getMonth() + 1);
    const h = hebrewDate(d);
    if (!h) return false;
    const [m1, d1, m2, d2] = th.when, i = HMONTHS.indexOf(h.m), i1 = HMONTHS.indexOf(m1), i2 = HMONTHS.indexOf(m2);
    const pos = i * 100 + h.day, from = i1 * 100 + d1, to = i2 * 100 + d2;
    return from <= to ? pos >= from && pos <= to : pos >= from || pos <= to;
  }
  const holidayNow = () => KIDS_HOLIDAYS.filter(th => holidayOn(th));

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
      u.rate = (lang === 'he' ? 1 : rate) * (isNight() ? .85 : 1);
      u.pitch = 1.1;   // a little brighter, friendlier for children
      speechSynthesis.speak(u);
    });
  }
  // Bedtime: from 7 in the evening until 6 in the morning the sky turns to night
  const little = () => Store.kidsAge === 'little';
  const isNight = () => { const h = new Date().getHours(); return Store.kidsBedtime && (h >= 19 || h < 6); };
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
  // Hear yourself: record about 2.5 seconds, play it back, then the owl says the word, so the child can compare
  const canRecord = () => !!(window.MediaRecorder && navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  let recStream = null;
  function stopRecording() { if (recStream) { recStream.getTracks().forEach(t => t.stop()); recStream = null; } }
  async function recordMe(w, btn, bub, after) {
    if (btn.classList.contains('on')) return;
    stopRec();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    K.Feel.prime();
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch (e) { bub().textContent = kt('recNo'); return; }
    recStream = stream;
    const chunks = [], mr = new MediaRecorder(stream);
    mr.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
    mr.onstop = () => {
      stopRecording();
      btn.classList.remove('on');
      const url = URL.createObjectURL(new Blob(chunks, { type: mr.mimeType || 'audio/mp4' }));
      const audio = new Audio(url);
      bub().textContent = kt('recYou');
      const owlTurn = () => { URL.revokeObjectURL(url); setTimeout(() => { sayEn(w.en); owlMood('love'); if (after) setTimeout(after, 900); }, 250); };
      audio.onended = owlTurn;
      audio.play().catch(owlTurn);
    };
    btn.classList.add('on');
    bub().textContent = kt('recGo');
    mr.start();
    setTimeout(() => { if (mr.state === 'recording') mr.stop(); }, 2500);
  }
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
  // English inside a Hebrew sentence: each quoted English bit (and runs of English words) stays one left-to-right piece
  const bidiEn = text => !isHe() ? text : text.split(/("[^"]+")/).map(part => part.startsWith('"')
    ? `<bdi dir="ltr" lang="en">${part}</bdi>`
    : part.replace(/[A-Za-z][A-Za-z ',.!?/-]*[A-Za-z!?.]|[A-Za-z]/g, m => `<bdi dir="ltr" lang="en">${m}</bdi>`)).join('');
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
            <div class="k-bubble" role="status">${isNight() ? kt('nightHi') : Store.kidsStickerCount ? kt('pick') : kt('hi')}</div>
          </div>
          <div class="k-chips">
            <button class="k-chip k-face" id="k-face" aria-label="${kt('who')}">${me.face}${me.name ? ` <b>${esc(me.name)}</b>` : ''}</button>
            <button class="k-chip k-dice" id="k-dice" aria-label="${kt('surpriseTip')}">🎲</button>
            <button class="k-chip k-sfx" id="k-sfx" aria-pressed="${Store.kidsSfx}" aria-label="${kt('sfx')}">${Store.kidsSfx ? '🔊' : '🔇'}</button>
            <span class="k-chip star"><b>★ ${Store.kidsTotalStars}</b> ${kt('stars')}</span>
            <a class="k-chip sticker" href="#/kids/stickers"><b>🎁 ${Store.kidsStickerCount}/${KIDS_THEMES.length}</b> ${kt('stickers')}</a>
          </div>
        </div>
        <h1 class="sr-only">${kt('title')}</h1>
        ${holidayNow().map(th => `<a class="k-today k-holiday-card" href="#/kids/play/${th.id}" style="--c:${th.color}">
            <span class="k-today-go" aria-hidden="true">${th.pic}</span>
            <span class="grow"><b>${themeName(th)}</b><small>${kt('holidaySub')}</small></span>
            ${Store.kidsHasSticker(th.id) ? starsHtml(Store.kidsStars(th.id), 'sm') : `<span class="k-today-arrow" aria-hidden="true">${isHe() ? '‹' : '›'}</span>`}
          </a>`).join('')}
        ${isNight() ? `<a class="k-today k-night-card" href="#/kids/story/goodnight">
            <span class="k-today-go" aria-hidden="true">🌙</span>
            <span class="grow"><b>${kt('night')}</b><small>${kt('nightSub')}</small></span>
            <span class="k-today-arrow" aria-hidden="true">${isHe() ? '‹' : '›'}</span>
          </a>` : ''}
        ${(() => {
          const plan = todayPlan();
          return `<a class="k-today" href="#/kids/today/start">
            <span class="k-today-go" aria-hidden="true">🚀</span>
            <span class="grow"><b>${kt('today')}</b><small>${kt('todaySub', { n: plan.length, list: plan.map(p => p.icon).join(' ') })}</small></span>
            <span class="k-today-arrow" aria-hidden="true">${isHe() ? '‹' : '›'}</span>
          </a>`;
        })()}
        ${checkinCard()}
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
        <a class="k-abc-card k-colour-card" href="#/kids/colour">
          <span class="k-story-books" aria-hidden="true">🖍️</span>
          <span class="grow"><b>${kt('colour')}</b><small>${kt('colourSub')}</small></span>
          ${Store.kidsHasSticker('colour') ? starsHtml(Store.kidsStars('colour'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-pairs-card" href="#/kids/pairs">
          <span class="k-story-books" aria-hidden="true">👂</span>
          <span class="grow"><b>${kt('pairs')}</b><small>${kt('pairsSub')}</small></span>
          ${Store.kidsHasSticker('pairs') ? starsHtml(Store.kidsStars('pairs'), 'sm') : ''}
        </a>
        ${little() ? '' : `<a class="k-abc-card k-peek-card" href="#/kids/peek">
          <span class="k-story-books" aria-hidden="true">☁️</span>
          <span class="grow"><b>${kt('peek')}</b><small>${kt('peekSub')}</small></span>
          ${Store.kidsHasSticker('peek') ? starsHtml(Store.kidsStars('peek'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-speed-card" href="#/kids/speed">
          <span class="k-story-books" aria-hidden="true">⚡</span>
          <span class="grow"><b>${kt('speed')}</b><small>${Store.kidsSpeedBest ? kt('speedBest', { n: Store.kidsSpeedBest }) : kt('speedSub')}</small></span>
        </a>`}
        <a class="k-abc-card k-together-card" href="#/kids/together">
          <span class="k-story-books" aria-hidden="true">👫</span>
          <span class="grow"><b>${kt('together')}</b><small>${kt('togetherSub')}</small></span>
        </a>
        <a class="k-abc-card k-shop-card" href="#/kids/shop">
          <span class="k-story-books" aria-hidden="true">🏪</span>
          <span class="grow"><b>${kt('shop')}</b><small>${kt('shopSub')}</small></span>
          ${Store.kidsHasSticker('shop') ? starsHtml(Store.kidsStars('shop'), 'sm') : ''}
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
            <li class="k-isle ${i % 2 ? 'r' : 'l'} ${open ? '' : 'locked'} ${done ? 'done' : ''} ${cur ? 'cur' : ''} ${Store.kidsStars(th.id) >= 3 ? 'gold' : ''}" style="--c:${th.color}">
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
    $('#k-dice').onclick = () => { askMotion(); surprise(); };
    $('#k-owl-tap').onclick = () => { owlMood(pickOne(['giggle', 'love', 'cheer'])); sayEn(pickOne(['Hoo hoo!', 'Hello friend!', "Let's play!"])); };
    $('#k-sfx').onclick = () => {
      Store.kidsSfx = !Store.kidsSfx;
      $('#k-sfx').textContent = Store.kidsSfx ? '🔊' : '🔇';
      $('#k-sfx').setAttribute('aria-pressed', String(Store.kidsSfx));
      Sfx.tap();
    };
    checkVoice();
    bindCheckin();
    applyWeather();
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
            if (!missed) Store.kidsWordMiss(r.w.id); missed = true;
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
            if (!missed) Store.kidsWordMiss(w.id); missed = true;
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

  // ---------- colour it ----------
  // A picture of shapes to fill: tap a colour (hear its name), then a part of the picture.
  // The owl gives 5 colour instructions ("Colour the sun yellow"); after that, free colouring.
  const PAINT = { red: '#ef4444', blue: '#3b82f6', green: '#22c55e', yellow: '#facc15', orange: '#fb923c', purple: '#a855f7', black: '#1f2937', white: '#ffffff' };
  const PAINT_HE = { red: 'אדום', blue: 'כחול', green: 'ירוק', yellow: 'צהוב', orange: 'כתום', purple: 'סגול', black: 'שחור', white: 'לבן' };
  const PARTS = [
    ['sky', 'שמיים', '<rect x="0" y="0" width="300" height="258"/>'],
    ['sun', 'שמש', '<circle cx="248" cy="52" r="30"/>'],
    ['cloud', 'ענן', '<path d="M38 82a20 20 0 0 1 30-22a26 26 0 0 1 48 4a18 18 0 0 1 4 34H44a17 17 0 0 1-6-16z"/>'],
    ['house', 'בית', '<rect x="56" y="150" width="128" height="108"/>'],
    ['roof', 'גג', '<path d="M44 152 120 92l76 60z"/>'],
    ['door', 'דלת', '<rect x="104" y="200" width="32" height="58" rx="4"/>'],
    ['window', 'חלון', '<rect x="146" y="168" width="26" height="26" rx="3"/>'],
    ['tree', 'עץ', '<circle cx="238" cy="178" r="34"/>'],
    ['grass', 'דשא', '<rect x="0" y="258" width="300" height="42"/>']
  ];
  function colourIt() {
    document.body.classList.add('in-lesson');
    const asks = K.shuffle([['sun', 'yellow'], ['roof', 'red'], ['house', 'blue'], ['tree', 'green'], ['door', 'purple'], ['grass', 'green'], ['window', 'orange']]).slice(0, 5);
    let at = 0, missed = 0, brush = null;
    K.lessonBar(0);
    K.view.innerHTML = `
      <div class="k-wrap k-play">
        <p class="k-step"><span aria-hidden="true">🖍️</span> ${kt('colour')}</p>
        <div class="k-card k-paint-card">
          <svg class="k-paint" viewBox="0 0 300 300" role="img" aria-label="${kt('colour')}">
            ${PARTS.map(([id, he, shape]) => `<g class="k-part" data-part="${id}" tabindex="0" role="button" aria-label="${id}">${shape.replace('/>', ' fill="#ffffff"/>')}</g>`).join('')}
            <rect x="229" y="210" width="18" height="48" fill="#8b5a2b" pointer-events="none"/>
            <circle cx="160" cy="232" r="3" fill="#1f2937" pointer-events="none"/>
          </svg>
        </div>
        <div class="k-paints">
          ${Object.entries(PAINT).map(([name, hex]) => `<button class="k-paint-pot" data-c="${name}" style="--p:${hex}" aria-label="${name}"><i></i><span class="en">${name}</span></button>`).join('')}
        </div>
        ${owl('', 'small')}
      </div>`;
    const bub = () => $('.k-bubble');
    function ask() {
      if (at >= asks.length) return finish();
      K.lessonBar(at / asks.length);
      const [part, col] = asks[at];
      const he = PARTS.find(p => p[0] === part)[1];
      bub().innerHTML = `${kt('colourAsk', { thing: isHe() ? he : part, colour: isHe() ? PAINT_HE[col] : col })} <b class="en" style="color:${PAINT[col] === '#ffffff' ? '#1d2a5b' : PAINT[col]}">● ${col}</b>`;
      say([['en', `Colour the ${part} ${col}!`]]);
      K.view.querySelectorAll('.k-part').forEach(g => g.classList.toggle('hint', g.dataset.part === part));
    }
    K.view.querySelectorAll('.k-paint-pot').forEach(b => {
      b.onclick = () => {
        brush = b.dataset.c;
        K.view.querySelectorAll('.k-paint-pot').forEach(x => x.classList.toggle('on', x === b));
        sayEn(brush, 0.9);
      };
    });
    const paint = g => {
      if (!brush) { K.Feel.wrong(g); return; }
      g.firstElementChild.setAttribute('fill', PAINT[brush]);
      Sfx.tap();
      if (at >= asks.length) return;   // free colouring after the instructions
      const [part, col] = asks[at];
      if (g.dataset.part === part && brush === col) {
        K.Feel.right();
        owlMood('cheer');
        sayEn(`${col} ${part}!`);
        at++;
        setTimeout(ask, 1300);
      } else if (g.dataset.part === part) {
        missed++;
        owlMood('think');
        say([['en', `Hmm, ${col}!`]]);
      }
    };
    K.view.querySelectorAll('.k-part').forEach(g => {
      g.onclick = () => paint(g);
      g.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); paint(g); } };
    });
    function finish() {
      K.lessonBar(1);
      K.view.querySelectorAll('.k-part').forEach(g => g.classList.remove('hint'));
      const stars = missed === 0 ? 3 : missed <= 2 ? 2 : 1;
      Store.kidsFinish('colour', stars, 10 + stars * 5);
      bub().textContent = `${kt('colourDone')} ${'★'.repeat(stars)} · ${kt('colourFree')}`;
      celebrate();
      sayEn('What a beautiful picture!', 0.9);
    }
    setTimeout(() => { say([['he', kt('colourSub')]]); setTimeout(ask, 400); }, 200);
  }

  // ---------- practice the tricky words of an island ----------
  // Only the words the child missed: each one as find-the-picture; a right first tap makes it less tricky
  function practice(id) {
    const th = theme(id);
    if (!th) return map();
    const tricky = K.shuffle(th.words.filter(x => Store.kidsMissCount(x.id) > 0));
    if (!tricky.length) { location.hash = '#/kids'; return; }
    document.body.classList.add('in-lesson');
    document.body.style.setProperty('--kc', th.color);
    let at = 0;
    function round() {
      K.lessonBar(at / tricky.length);
      const w = tricky[at];
      const opts = K.shuffle([w, ...K.shuffle(th.words.filter(x => x !== w)).slice(0, 2)]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🎯</span> ${kt('practiceTitle')} · ${at + 1}/${tricky.length}</p>
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
            if (w.move) b.querySelector('span').classList.add('mv', 'mv-' + w.move);
            K.Feel.right();
            if (!missed) Store.kidsWordRight(w.id);
            owlMood('cheer');
            $('.k-bubble').textContent = pickOne(kt('great'));
            sayEn(w.en);
            setTimeout(() => { at++; at < tricky.length ? round() : end(); }, 1200);
          } else {
            if (!missed) Store.kidsWordMiss(w.id);
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
      const left = th.words.filter(x => Store.kidsMissCount(x.id) > 0).length;
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>${kt('done')}</h1>
            <p class="k-unlock">🎯 ${kt('practiceDone')}</p>
          </div>
          ${left ? `<a class="k-btn ghost" href="#/kids/practice/${th.id}">🎯 ${kt('practice', { n: left })}</a>` : ''}
          <a class="k-btn" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('Practice makes perfect!', 0.9);
    }
    round();
  }

  // ---------- sharp ears: sound-alike pairs ----------
  // 8 rounds: two pictures whose words sound almost the same (ship / sheep); hear one, tap it.
  // After a miss the owl says both words one after the other, so the child hears the difference.
  function pairsGame() {
    document.body.classList.add('in-lesson');
    const rounds = K.shuffle(KIDS_PAIRS).slice(0, 8).map(p => ({ p: K.shuffle(p), w: pickOne(p) }));
    let at = 0, firstTry = 0;
    function round() {
      K.lessonBar(at / rounds.length);
      const { p, w } = rounds[at];
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">👂</span> ${kt('pairs')} · ${at + 1}/${rounds.length}</p>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}"><span aria-hidden="true">🔊</span></button>
          </div>
          <div class="k-opts k-pair-opts">${p.map((o, i) => `<button class="k-opt k-pair-opt" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span><small class="en">${o.en}</small></button>`).join('')}</div>
          ${owl(kt('pairsTip'), 'small')}
        </div>`;
      const hear = () => sayEn(w.en, 0.7);
      $('#k-say').onclick = hear;
      setTimeout(hear, 250);
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          if (p[+b.dataset.i] === w) {
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            K.Feel.right();
            if (!missed) firstTry++;
            owlMood('cheer');
            $('.k-bubble').textContent = `${w.pic} ${w.en}!`;
            sayEn(w.en, 0.8);
            setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 1400);
          } else {
            missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            owlMood('think');
            const other = p[+b.dataset.i];
            $('.k-bubble').textContent = `${other.en} ≠ ${w.en}`;
            say([['en', other.en + '.'], ['en', w.en + '!']], 0.7);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= 7 ? 3 : firstTry >= 5 ? 2 : 1;
      Store.kidsFinish('pairs', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <a class="k-btn" href="#/kids">${kt('backToMap')}</a>
          <button class="k-btn ghost" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
        </div>`;
      celebrate();
      sayEn('What sharp ears!', 0.9);
      $('#k-again').onclick = pairsGame;
    }
    round();
  }

  // ---------- peek-a-boo ----------
  // A picture hides behind 9 clouds that blow away one by one; the child picks its word among 3
  // as soon as they can tell. Guessing early scores more; a wrong guess just greys out the word.
  let peekTimer = null;
  function peekGame() {
    document.body.classList.add('in-lesson');
    const known = KIDS_WORDS.filter(w => Store.kidsWordCount(w.id) > 0);
    const pool = known.length >= 8 ? known : KIDS_WORDS.filter(w => isOpen(KIDS_THEMES.findIndex(th => th.id === w.theme)));
    const rounds = K.shuffle(pool).slice(0, 6);
    let at = 0, points = 0;
    function round() {
      clearInterval(peekTimer);
      K.lessonBar(at / rounds.length);
      const w = rounds[at];
      const opts = K.shuffle([w, ...K.shuffle(pool.filter(x => x !== w && x.pic !== w.pic && x.en.length < 12)).slice(0, 2)]);
      const order = K.shuffle([...Array(9).keys()]);
      let shown = 0, done = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">☁️</span> ${kt('peek')} · ${at + 1}/${rounds.length}</p>
          <div class="k-card k-peek-box" aria-hidden="true">
            <span class="k-peek-pic">${w.pic}</span>
            <div class="k-peek-clouds">${order.map(() => '<i></i>').join('')}</div>
          </div>
          <div class="k-peek-words">${opts.map((o, i) => `<button class="k-chip-word k-peek-word en" data-i="${i}">${o.en}</button>`).join('')}</div>
          ${owl(kt('peekTip'), 'small')}
        </div>`;
      const clouds = [...K.view.querySelectorAll('.k-peek-clouds i')];
      const blow = () => {
        if (shown >= 9) return clearInterval(peekTimer);
        clouds[order[shown++]].classList.add('gone');
      };
      blow();
      peekTimer = setInterval(blow, 900);
      K.view.querySelectorAll('.k-peek-word').forEach(b => {
        b.onclick = () => {
          if (done) return;
          if (opts[+b.dataset.i] === w) {
            done = true;
            clearInterval(peekTimer);
            clouds.forEach(c => c.classList.add('gone'));
            b.classList.add('right');
            const got = shown <= 3 ? 3 : shown <= 6 ? 2 : 1;
            points += got;
            K.Feel.right();
            Store.kidsWordRight(w.id);
            owlMood('cheer');
            $('.k-bubble').textContent = `${'⭐'.repeat(got)} ${w.en}!`;
            if (w.move) $('.k-peek-pic').classList.add('mv', 'mv-' + w.move);
            sayEn(w.en);
            setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 1700);
          } else {
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            owlMood('think');
            sayEn(opts[+b.dataset.i].en);
          }
        };
      });
    }
    function end() {
      clearInterval(peekTimer);
      K.endLesson(1);
      const avg = points / rounds.length, stars = avg >= 2.5 ? 3 : avg >= 1.6 ? 2 : 1;
      Store.kidsFinish('peek', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <a class="k-btn" href="#/kids">${kt('backToMap')}</a>
          <button class="k-btn ghost" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
        </div>`;
      celebrate();
      sayEn('Peek-a-boo! Great guessing!', 0.9);
      $('#k-again').onclick = peekGame;
    }
    round();
  }

  // ---------- speed round (for older kids) ----------
  // 10 known words: hear one, tap its picture among 4 before a gentle 8-second bar runs out.
  // A right answer scores 1 point plus up to 1 for speed; when time runs out the answer is shown, no fuss.
  let speedTimer = null;
  function speedGame() {
    document.body.classList.add('in-lesson');
    const known = KIDS_WORDS.filter(w => Store.kidsWordCount(w.id) > 0);
    const pool = known.length >= 12 ? known : KIDS_WORDS.filter(w => isOpen(KIDS_THEMES.findIndex(th => th.id === w.theme)));
    const rounds = K.shuffle(pool).slice(0, 10);
    const LIMIT = 8000;
    let at = 0, score = 0;
    function round() {
      clearInterval(speedTimer);
      K.lessonBar(at / rounds.length);
      const w = rounds[at];
      const opts = K.shuffle([w, ...K.shuffle(pool.filter(x => x !== w && x.pic !== w.pic)).slice(0, 3)]);
      let done = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">⚡</span> ${kt('speed')} · ${at + 1}/10 · <b>${kt('speedScore', { n: score.toFixed(1).replace('.0', '') })}</b></p>
          <div class="k-speed-bar" aria-hidden="true"><i id="k-speed-fill"></i></div>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}: ${w.en}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">${w.en}</span>
          </div>
          <div class="k-opts four">${opts.map((o, i) => `<button class="k-opt" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span></button>`).join('')}</div>
          ${owl(kt('speedTip'), 'small')}
        </div>`;
      $('#k-say').onclick = () => sayEn(w.en, 1);
      sayEn(w.en, 1);
      const start = Date.now(), fill = $('#k-speed-fill');
      speedTimer = setInterval(() => {
        const left = Math.max(0, 1 - (Date.now() - start) / LIMIT);
        if (fill) fill.style.width = (left * 100) + '%';
        if (left <= 0) timeUp();
      }, 100);
      const next = () => { at++; at < rounds.length ? round() : end(); };
      function timeUp() {
        if (done) return;
        done = true;
        clearInterval(speedTimer);
        K.view.querySelectorAll('.k-opt').forEach(b => { b.disabled = true; if (opts[+b.dataset.i] === w) b.classList.add('right'); });
        $('.k-bubble').textContent = `${w.pic} ${w.en}`;
        sayEn(w.en, 1);
        setTimeout(next, 1100);
      }
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          if (done) return;
          if (opts[+b.dataset.i] === w) {
            done = true;
            clearInterval(speedTimer);
            const left = Math.max(0, 1 - (Date.now() - start) / LIMIT);
            score += 1 + Math.round(left * 10) / 10;
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            Sfx.star(Math.min(3, Math.floor(left * 4)));
            Store.kidsWordRight(w.id);
            owlMood('cheer');
            setTimeout(next, 500);
          } else {
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
          }
        };
      });
    }
    function end() {
      clearInterval(speedTimer);
      K.endLesson(1);
      const pts = Math.round(score * 10) / 10, best = Store.kidsSpeedScore(pts);
      const stars = pts >= 16 ? 3 : pts >= 11 ? 2 : 1;
      Store.kidsFinish('speed', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>⚡ ${kt('speedScore', { n: pts })}</h1>
            ${starsHtml(stars, 'big pop')}
            ${best ? `<b class="k-best">🏆 ${kt('speedNew')}</b>` : `<p class="k-unlock">${kt('speedBest', { n: Store.kidsSpeedBest })}</p>`}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn(best ? 'New record! Super fast!' : 'Great speed!', 1);
      $('#k-again').onclick = speedGame;
    }
    round();
  }

  // ---------- Blend it! first reading with letter sounds ----------
  // A word as three letter tiles: each says its sound ("kuh", "ah", "tuh"), then the tiles slide
  // together and the owl blends them into the word. The child picks its picture among 3.
  function blendGame() {
    document.body.classList.add('in-lesson');
    const rounds = K.shuffle(KIDS_CVC).slice(0, 6);
    let at = 0, firstTry = 0;
    const soundOf = ch => (KIDS_ABC.find(x => x.L === ch.toUpperCase()) || {}).sound || ch;
    function round() {
      K.lessonBar(at / rounds.length);
      const w = rounds[at];
      const opts = K.shuffle([w, ...K.shuffle(KIDS_CVC.filter(x => x !== w)).slice(0, 2)]);
      let missed = false, blended = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🧩</span> ${kt('blend')} · ${at + 1}/${rounds.length}</p>
          <div class="k-blend" dir="ltr">${w.en.split('').map((ch, i) => `<button class="k-blend-tile" data-i="${i}" aria-label="${ch}">${ch}</button>`).join('')}</div>
          <button class="k-btn ghost k-blend-go" id="k-blend-go">🔗 ${kt('blendGo')}</button>
          <div class="k-opts">${opts.map((o, i) => `<button class="k-opt" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span></button>`).join('')}</div>
          ${owl(kt('blendTip'), 'small')}
        </div>`;
      const tiles = [...K.view.querySelectorAll('.k-blend-tile')];
      const sayTile = i => { sayEn(soundOf(w.en[i]), 0.7); tiles[i].classList.remove('lit'); void tiles[i].offsetWidth; tiles[i].classList.add('lit'); };
      tiles.forEach((t, i) => { t.onclick = () => sayTile(i); });
      // sound by sound, then together
      const blend = () => {
        tiles.forEach((t, i) => setTimeout(() => sayTile(i), i * 900));
        setTimeout(() => { $('.k-blend').classList.add('joined'); sayEn(w.en, 0.7); blended = true; }, tiles.length * 900 + 200);
      };
      $('#k-blend-go').onclick = blend;
      setTimeout(blend, 400);
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          if (opts[+b.dataset.i] === w) {
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            K.Feel.right();
            if (!missed) firstTry++;
            $('.k-blend').classList.add('joined');
            owlMood('cheer');
            $('.k-bubble').textContent = `${w.en.split('').join(' – ')} → ${w.en}!`;
            sayEn(w.en, 0.8);
            setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 1600);
          } else {
            missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            owlMood('think');
            $('.k-bubble').textContent = kt('tryAgain');
            if (blended) setTimeout(() => sayEn(w.en, 0.7), 300); else blend();
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= 6 ? 3 : firstTry >= 4 ? 2 : 1;
      Store.kidsFinish('blend', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <a class="k-btn" href="#/kids/abc">ABC</a>
          <button class="k-btn ghost" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
        </div>`;
      celebrate();
      sayEn('You can read! Hooray!', 0.9);
      $('#k-again').onclick = blendGame;
    }
    round();
  }

  // ---------- play together: two children take turns on one phone ----------
  // A team game, not a race: each turn one child hears a word and finds its picture,
  // every right answer fills the shared jar, and the end screen celebrates them together.
  function togetherGame() {
    document.body.classList.add('in-lesson');
    const profs = Store.kidsProfiles;
    const players = profs.length >= 2 ? profs.slice(0, 2).map((p, i) => ({ face: p.face, name: p.name || kt('player') + ' ' + (i + 1) }))
      : [{ face: '🦊', name: kt('player') + ' 1' }, { face: '🐼', name: kt('player') + ' 2' }];
    const pool = KIDS_WORDS.filter(w => isOpen(KIDS_THEMES.findIndex(th => th.id === w.theme)));
    const rounds = K.shuffle(pool).slice(0, 10);
    let at = 0, team = 0;
    function round() {
      K.lessonBar(at / rounds.length);
      const p = players[at % 2], w = rounds[at];
      const opts = K.shuffle([w, ...K.shuffle(pool.filter(x => x !== w && x.pic !== w.pic)).slice(0, 2)]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <div class="k-turn" aria-live="polite">
            ${players.map((q, i) => `<span class="k-turn-p ${i === at % 2 ? 'on' : ''}"><i aria-hidden="true">${q.face}</i>${esc(q.name)}</span>`).join('')}
          </div>
          <p class="k-step"><span aria-hidden="true">${p.face}</span> ${kt('turnOf', { name: esc(p.name) })}</p>
          <div class="k-jar" aria-label="${team}/${rounds.length}">${rounds.map((_, i) => `<i class="${i < team ? 'on' : ''}"></i>`).join('')}</div>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}: ${w.en}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">${w.en}</span>
          </div>
          <div class="k-opts">${opts.map((o, i) => `<button class="k-opt" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span></button>`).join('')}</div>
          ${owl(kt('teamTip'), 'small')}
        </div>`;
      $('#k-say').onclick = () => sayEn(w.en);
      setTimeout(() => sayEn(w.en), 300);
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          if (opts[+b.dataset.i] === w) {
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            K.Feel.right();
            if (!missed) team++;
            const jar = K.view.querySelectorAll('.k-jar i');
            if (!missed && jar[team - 1]) jar[team - 1].classList.add('on', 'k-pop-in');
            owlMood('cheer');
            $('.k-bubble').textContent = `${p.face} ${pickOne(kt('great'))}`;
            sayEn(w.en);
            setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 1400);
          } else {
            missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            owlMood('think');
            $('.k-bubble').textContent = kt('tryAgain');
            setTimeout(() => sayEn(w.en), 350);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>${players.map(q => q.face).join(' 🤝 ')}</h1>
            <p class="k-unlock"><b>${kt('teamScore', { n: team, m: rounds.length })}</b></p>
            <div class="k-jar big">${rounds.map((_, i) => `<i class="${i < team ? 'on' : ''}"></i>`).join('')}</div>
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('Great teamwork!', 0.9);
      $('#k-again').onclick = togetherGame;
    }
    round();
  }

  // ---------- the shop: role-play with whole phrases ----------
  // Customers ask "Can I have two apples, please?"; the child puts the right things in the basket and says
  // "Here you are!" with a button. A wrong basket is just "Hmm, I want…" and the basket empties.
  function shopGame() {
    document.body.classList.add('in-lesson');
    const shelf = ['food/apple', 'food/banana', 'food/grapes', 'food/strawberry', 'food/bread', 'food/milk', 'food/egg', 'food/pizza']
      .map(id => KIDS_WORDS.find(w => w.id === id)).filter(Boolean);
    const plural = { apple: 'apples', banana: 'bananas', egg: 'eggs', pizza: 'pizzas', strawberry: 'strawberries' };
    const customers = K.shuffle(['🐻', '🐰', '🐸', '🐵', '🐼', '🦁']).slice(0, 5);
    let at = 0, coins = 0, firstTry = 0;
    function order() {
      const w = pickOne(shelf), two = plural[w.en] && Math.random() < .45;
      const one = ['milk', 'bread', 'grapes'].includes(w.en) ? 'some ' + w.en : (/^[aeiou]/.test(w.en) ? 'an ' : 'a ') + w.en;
      return { w, n: two ? 2 : 1, text: `Can I have ${two ? 'two ' + plural[w.en] : one}, please?` };
    }
    function round() {
      K.lessonBar(at / customers.length);
      const o = order(), who = customers[at];
      let basket = [], missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🏪</span> ${kt('shop')} · ${at + 1}/${customers.length} · 🪙 ${coins}</p>
          <div class="k-customer">
            <span class="k-customer-face" aria-hidden="true">${who}</span>
            <button class="k-customer-says en" id="k-say">${o.text}</button>
          </div>
          <div class="k-shelf">${shelf.map((w, i) => `<button class="k-shelf-item" data-i="${i}" aria-label="${w.en}"><span aria-hidden="true">${w.pic}</span><small class="en">${w.en}</small></button>`).join('')}</div>
          <div class="k-basket" aria-live="polite"><span aria-hidden="true">🧺</span><span class="k-basket-items" id="k-basket"></span></div>
          <button class="k-btn" id="k-give">🛍️ <bdi dir="ltr" lang="en">${kt('shopGive')}</bdi></button>
          ${owl(bidiEn(kt('shopTip')), 'small')}
        </div>`;
      const showBasket = () => {
        $('#k-basket').innerHTML = basket.map((w, i) => `<button class="k-basket-item" data-i="${i}" aria-label="${w.en}">${w.pic}</button>`).join('');
        K.view.querySelectorAll('.k-basket-item').forEach(b => { b.onclick = () => { basket.splice(+b.dataset.i, 1); showBasket(); }; });
      };
      const ask = () => sayEn(o.text);
      $('#k-say').onclick = ask;
      setTimeout(ask, 300);
      K.view.querySelectorAll('.k-shelf-item').forEach(b => {
        b.onclick = () => {
          if (basket.length >= 4) return;
          const w = shelf[+b.dataset.i];
          basket.push(w);
          sayEn(w.en, 1);
          Sfx.tap();
          showBasket();
        };
      });
      $('#k-give').onclick = () => {
        sayEn('Here you are!', 1);
        const ok = basket.length === o.n && basket.every(w => w === o.w);
        setTimeout(() => {
          if (ok) {
            if (!missed) firstTry++;
            coins += o.n;
            Store.kidsWordRight(o.w.id);
            K.Feel.right();
            owlMood('cheer');
            $('.k-customer-says').textContent = 'Thank you! 🪙';
            $('.k-customer').classList.add('happy');
            say([['en', 'Thank you! Bye bye!']]);
            setTimeout(() => { at++; at < customers.length ? round() : end(); }, 1700);
          } else {
            missed = true;
            K.Feel.wrong($('.k-basket'));
            owlMood('think');
            $('.k-customer-says').textContent = 'Hmm… ' + o.text;
            basket = [];
            showBasket();
            setTimeout(ask, 300);
          }
        }, 700);
      };
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= 5 ? 3 : firstTry >= 3 ? 2 : 1;
      Store.kidsFinish('shop', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🏪 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
            <p class="k-unlock">🪙 ${kt('shopCoins', { n: coins })}</p>
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('What a great shopkeeper!', 0.9);
      $('#k-again').onclick = shopGame;
    }
    round();
  }

  // ---------- spelling bee jr. (6–9) ----------
  // Hear a short word and see its picture; tap letter tiles into the slots in order (two extra tiles to
  // think about). A wrong spelling sends back only the letters in the wrong place; after two tries the
  // next right letter glows.
  function spellGame() {
    document.body.classList.add('in-lesson');
    const words = K.shuffle([...KIDS_CVC, { en: 'fish', pic: '🐟' }, { en: 'star', pic: '⭐' }, { en: 'frog', pic: '🐸' }, { en: 'duck', pic: '🦆' }, { en: 'cake', pic: '🎂' }, { en: 'moon', pic: '🌙' }]).slice(0, 5);
    let at = 0, firstTry = 0;
    function round() {
      K.lessonBar(at / words.length);
      const w = words[at], letters = w.en.split('');
      const extra = K.shuffle('abcdefghijklmnopqrstuvwxyz'.split('').filter(c => !letters.includes(c))).slice(0, 2);
      const tiles = K.shuffle([...letters, ...extra]).map((c, i) => ({ c, i, used: false }));
      const slots = letters.map(() => null);
      let tries = 0;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🐝</span> ${kt('spell')} · ${at + 1}/${words.length}</p>
          <button class="k-card k-meet k-spell-card" id="k-say" aria-label="${kt('listen')}">
            <span class="k-pic" aria-hidden="true">${w.pic}</span>
            <span class="k-ear" aria-hidden="true">🔊</span>
          </button>
          <div class="k-slots" dir="ltr" id="k-slots"></div>
          <div class="k-blend k-spell-tiles" dir="ltr" id="k-tiles"></div>
          ${owl(kt('spellTip'), 'small')}
        </div>`;
      const sayIt = () => sayEn(w.en, 0.75);
      $('#k-say').onclick = sayIt;
      setTimeout(sayIt, 300);
      function draw() {
        $('#k-slots').innerHTML = slots.map((t, i) => `<button class="k-slot-l ${t ? 'full' : ''}" data-s="${i}" aria-label="${t ? t.c : '_'}">${t ? t.c : ''}</button>`).join('');
        $('#k-tiles').innerHTML = tiles.map(t => `<button class="k-blend-tile k-spell-tile ${t.used ? 'used' : ''}" data-t="${t.i}" ${t.used ? 'disabled' : ''} aria-label="${t.c}">${t.c}</button>`).join('');
        K.view.querySelectorAll('.k-spell-tile').forEach(b => {
          b.onclick = () => {
            const free = slots.indexOf(null);
            if (free < 0) return;
            const t = tiles.find(x => x.i === +b.dataset.t);
            t.used = true;
            slots[free] = t;
            Sfx.tap();
            sayEn(KIDS_ABC.find(x => x.L === t.c.toUpperCase()).name, 1);
            draw();
            if (!slots.includes(null)) check();
          };
        });
        K.view.querySelectorAll('.k-slot-l.full').forEach(b => {
          b.onclick = () => { const i = +b.dataset.s; slots[i].used = false; slots[i] = null; draw(); };
        });
      }
      function check() {
        if (slots.map(t => t.c).join('') === w.en) {
          if (!tries) firstTry++;
          K.Feel.right();
          owlMood('cheer');
          $('#k-slots').classList.add('right');
          $('.k-bubble').textContent = `${w.en.toUpperCase().split('').join('-')}: ${w.en}! ${w.pic}`;
          say([['en', w.en.split('').map(c => KIDS_ABC.find(x => x.L === c.toUpperCase()).name).join(', ') + '.'], ['en', w.en + '!']], 0.9);
          setTimeout(() => { at++; at < words.length ? round() : end(); }, 2600);
          return;
        }
        tries++;
        K.Feel.wrong($('#k-slots'));
        owlMood('think');
        // letters in the right place stay; the others go back to the row
        slots.forEach((t, i) => { if (t.c !== letters[i]) { t.used = false; slots[i] = null; } });
        draw();
        if (tries >= 2) {
          const i = slots.indexOf(null), want = tiles.find(t => !t.used && t.c === letters[i]);
          const hint = want && K.view.querySelector(`.k-spell-tile[data-t="${want.i}"]`);
          if (hint) hint.classList.add('hint');
        }
        $('.k-bubble').textContent = kt('tryAgain');
        setTimeout(sayIt, 300);
      }
      draw();
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= 5 ? 3 : firstTry >= 3 ? 2 : 1;
      Store.kidsFinish('spell', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🐝 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <a class="k-btn" href="#/kids/abc">ABC</a>
          <button class="k-btn ghost" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
        </div>`;
      celebrate();
      sayEn('Super speller!', 0.9);
      $('#k-again').onclick = spellGame;
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
        <h2 class="k-title k-h2">🏝️ ${kt('isleSongs')}</h2>
        <p class="k-sub">${kt('isleSongsSub')}</p>
        <div class="k-books">
          ${KIDS_THEMES.map(th => {
            const open = Store.kidsHasSticker(th.id);
            return `<a class="k-book ${open ? '' : 'locked'}" ${open ? `href="#/kids/song/isle-${th.id}"` : 'role="link" aria-disabled="true"'} style="--c:${th.color}">
              <span class="k-book-pic" aria-hidden="true">${open ? th.pic : '🔒'}</span>
              <span class="k-book-title">${themeName(th)}</span>
            </a>`;
          }).join('')}
        </div>
      </div>`;
    K.view.querySelectorAll('.k-book.locked').forEach(b => { b.onclick = e => { e.preventDefault(); K.Feel.wrong(b); }; });
  }
  // An island's own song: its words four to a line, then a cheer
  function isleSong(th) {
    const items = th.words.map(w => [w.en, w.pic]);
    const lines = [];
    for (let i = 0; i < items.length; i += 4) lines.push(items.slice(i, i + 4));
    lines.push([['Hooray!', th.sticker]]);
    return { id: 'isle-' + th.id, title: th.title, he: th.he, pic: th.pic, color: th.color, lines };
  }
  let songRun = 0;   // a newer play (or leaving the screen) stops the one before
  function song(id) {
    const isle = id && id.startsWith('isle-') && theme(id.slice(5));
    const sg = isle ? isleSong(isle) : KIDS_SONGS.find(x => x.id === id);
    if (!sg) { location.hash = '#/kids/songs'; return; }
    K.endLesson();
    document.body.style.setProperty('--kc', sg.color);
    K.view.innerHTML = `
      <div class="k-wrap k-play">
        <a class="k-back" href="#/kids/songs"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('songs')}</a>
        <h1 class="k-title ${isle ? '' : 'en'}">${sg.pic} ${isle ? themeName(isle) : sg.title}</h1>
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
          <a class="k-book k-path-book" href="#/kids/path" style="--c:#16a34a">
            <span class="k-book-pic" aria-hidden="true">${KIDS_PATH.pic}</span>
            <span class="k-book-title en">${KIDS_PATH.title}</span>
            <span class="k-book-he">✨ ${kt('pathBook')}</span>
          </a>
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
    u.rate = isNight() ? 0.65 : 0.75;
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

  // ---------- a story you choose ----------
  function pathStory(id = 'start') {
    const pg = KIDS_PATH.pages[id];
    if (!pg) { location.hash = '#/kids/stories'; return; }
    document.body.classList.add('in-lesson');
    K.lessonBar(id === 'start' ? 0 : pg.end ? 1 : .5);
    const isNew = pg.end ? Store.kidsPathEnd(id) : false;   // count this ending before showing how many were found
    const found = Store.kidsPathEnds();
    K.view.innerHTML = `
      <div class="k-wrap k-play">
        <p class="k-step en">${KIDS_PATH.pic} ${KIDS_PATH.title}</p>
        <div class="k-card k-page">
          <div class="k-scene" aria-hidden="true">${pg.scene}</div>
          <p class="k-sentence en" lang="en">${pg.en.split(' ').map(w => `<button class="k-w">${w}</button>`).join(' ')}</p>
          <p class="k-he he" lang="he">${pg.he}</p>
        </div>
        ${pg.end ? `
          <p class="k-tip">🏁 ${kt('pathEnd')} · ${kt('pathFound', { n: found.length })}</p>
          <button class="k-btn" id="k-path-again">🔀 ${kt('pathAgain')}</button>
          <a class="k-btn ghost" href="#/kids/stories">📚 ${kt('stories')}</a>`
        : `
          <p class="k-tip">${kt('pathChoose')}</p>
          <div class="k-path-choices">${pg.choices.map((c, i) => `<button class="k-path-choice" data-i="${i}"><span aria-hidden="true">${c.pic}</span><b class="en">${c.en}</b></button>`).join('')}</div>`}
      </div>`;
    const words = [...K.view.querySelectorAll('.k-w')];
    words.forEach(w => { w.onclick = () => sayEn(w.textContent.replace(/[^A-Za-z']/g, '')); });
    setTimeout(() => readAlong(pg.en, words), 250);
    if (pg.end) {
      celebrate();
      if (isNew) Store.kidsFinish('path', Math.min(3, Store.kidsPathEnds().length), 10);
      $('#k-path-again').onclick = () => pathStory('start');
      return;
    }
    K.view.querySelectorAll('.k-path-choice').forEach(b => {
      b.onclick = () => {
        const c = pg.choices[+b.dataset.i];
        Sfx.tap();
        b.classList.add('picked');
        sayEn(c.en);
        setTimeout(() => pathStory(c.to), 900);
      };
    });
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
          <h2>🎂 ${kt('pcAge')}</h2>
          <div class="k-pc-seg" role="radiogroup" aria-label="${kt('pcAge')}">
            ${['little', 'big'].map(a => `<button role="radio" aria-checked="${Store.kidsAge === a}" class="k-age ${Store.kidsAge === a ? 'on' : ''}" data-age="${a}">${kt(a === 'little' ? 'pcAgeLittle' : 'pcAgeBig')}</button>`).join('')}
          </div>
          <p class="k-wk-line"><small>${kt('pcAgeText')}</small></p>
        </section>
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
          <label class="k-pc-switch k-pc-gap">
            <span class="grow"><b>🔠 ${kt('pcBig')}</b><small>${kt('pcBigText')}</small></span>
            <input type="checkbox" id="k-big" ${Store.kidsBigPrint ? 'checked' : ''}>
          </label>
          <label class="k-pc-switch k-pc-gap">
            <span class="grow"><b>🌙 ${kt('pcBed')}</b><small>${kt('pcBedText')}</small></span>
            <input type="checkbox" id="k-bed" ${Store.kidsBedtime ? 'checked' : ''}>
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
        ${weekBox()}
        ${voiceBox()}
        <p class="k-pc-tip">💡 ${kt('pcTip')}</p>
      </div>`;
    K.view.querySelectorAll('.k-pc-seg button[data-n]').forEach(b => {
      b.onclick = () => { Store.kidsLimit = +b.dataset.n; parents(); };
    });
    K.view.querySelectorAll('.k-age').forEach(b => {
      b.onclick = () => { Store.kidsAge = b.dataset.age; document.body.classList.toggle('kids-little', little()); parents(); };
    });
    $('#k-mode').onchange = e => { Store.kidsMode = e.target.checked; };
    const share = $('#k-wk-share');
    if (share) share.onclick = async () => {
      const text = share.dataset.text;
      try {
        if (navigator.share) { await navigator.share({ text }); return; }
      } catch (e) { if (e && e.name === 'AbortError') return; }
      try { await navigator.clipboard.writeText(text); } catch (e) { /* the text stays on screen to copy by hand */ }
      share.textContent = '✓ ' + kt('wkCopied');
    };
    const vEn = $('#k-vc-en'), vHe = $('#k-vc-he');
    if (vEn) vEn.onclick = () => sayEn('Hello! This is how the English words sound.', 0.9);
    if (vHe) vHe.onclick = () => say([['he', kt('vcSampleHe')]]);
    $('#k-big').onchange = e => { Store.kidsBigPrint = e.target.checked; document.body.classList.toggle('kids-big', Store.kidsBigPrint); };
    $('#k-bed').onchange = e => { Store.kidsBedtime = e.target.checked; document.body.classList.toggle('night', isNight()); };
  }

  // The week in a box: new words as pictures, play days as dots, and a message to share with family
  function weekBox() {
    const wk = Store.kidsWeek(), me = Store.kidsProfiles.find(p => p.active);
    const played = wk.days.filter(d => d.sec > 0).length;
    const mins = Math.round(wk.days.reduce((a, d) => a + d.sec, 0) / 60);
    const name = me && me.name ? esc(me.name) : '';
    const dayName = d => d.date.toLocaleDateString(isHe() ? 'he-IL' : 'en-US', { weekday: 'narrow' });
    const text = kt('wkMsg', { name: me && me.name ? me.name + ' · ' : '', n: wk.words.length,
      list: wk.words.slice(0, 10).map(w => w.en).join(', ') + (wk.words.length > 10 ? '…' : ''),
      d: isHe() ? (played === 1 ? 'יום משחק אחד' : played + ' ימי משחק') : (played === 1 ? '1 play day' : played + ' play days') });
    return `
      <section class="k-pc-box">
        <h2>📅 ${name ? kt('wkTitle', { name }) : kt('wkTitleAnon')}</h2>
        <div class="k-wk-days" aria-label="${kt('wkDays', { n: played, m: mins })}">
          ${wk.days.map(d => { const m = Store.kidsMoodOn(d.key), w = m && KIDS_WORDS.find(x => x.id === m);
            return `<span class="${d.sec ? 'on' : ''}"><i></i><small>${dayName(d)}</small>${w ? `<em title="${w.en}">${w.pic}</em>` : ''}</span>`; }).join('')}
        </div>
        <p class="k-wk-line">${kt(played === 1 ? 'wkDay1' : 'wkDays', { n: played, m: mins })}</p>
        ${wk.words.length ? `
          <p class="k-wk-line"><b>${kt('wkWords', { n: wk.words.length })}</b></p>
          <div class="k-wk-words">${wk.words.slice(0, 18).map(w => `<span class="en"><i aria-hidden="true">${w.pic}</i>${w.en}</span>`).join('')}</div>
          <button class="k-btn ghost k-wk-share" id="k-wk-share" data-text="${text.replace(/"/g, '&quot;')}">📤 ${kt('wkShare')}</button>`
        : `<p class="k-wk-line">${kt('wkNone')}</p>`}
      </section>`;
  }

  // Voices: the whole kids world speaks, so parents can check the device has the voices it needs
  function voiceBox() {
    if (!('speechSynthesis' in window)) return `<section class="k-pc-box"><h2>🔊 ${kt('vcTitle')}</h2><p class="k-wk-line">${kt('vcNone')}</p></section>`;
    voices();
    const row = (label, v, id) => `
      <div class="k-vc-row">
        <span class="grow"><b>${label}</b><small>${v ? `✅ ${kt('vcOk')} · ${esc(v.name)}` : `⚠️ ${kt('vcMissing')}`}</small></span>
        ${v ? `<button class="k-btn ghost k-vc-test" id="${id}">▶ ${kt('vcTest')}</button>` : ''}
      </div>`;
    const tips = [];
    if (!enVoice) tips.push(kt('vcEnTip'));
    if (!heVoice) tips.push(kt('vcHeTip'));
    return `
      <section class="k-pc-box">
        <h2>🔊 ${kt('vcTitle')}</h2>
        ${row(kt('vcEn'), enVoice, 'k-vc-en')}
        ${row(kt('vcHe'), heVoice, 'k-vc-he')}
        ${tips.length ? `<div class="k-vc-tip">${tips.map(x => `<p>${x}</p>`).join('')}<p>📱 ${kt('vcIos')}</p><p>🤖 ${kt('vcAndroid')}</p></div>` : ''}
      </section>`;
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

  // ---------- surprise game: the dice (or a shake of the phone) picks a random activity ----------
  function surpriseList() {
    const list = KIDS_THEMES.filter((th, i) => isOpen(i)).map(th => ['#/kids/play/' + th.id, th.pic]);
    list.push(['#/kids/abcgame', '🔤'], ['#/kids/riddles', '🕵️'], ['#/kids/peek', '☁️'], ['#/kids/pairs', '👂'], ['#/kids/colour', '🖍️'],
      ['#/kids/song/' + pickOne(KIDS_SONGS).id, '🎵']);
    KIDS_STORIES.filter(storyOpen).forEach(st => list.push(['#/kids/story/' + st.id, st.pic]));
    return list;
  }
  let rolling = false;
  function surprise() {
    if (rolling) return;
    rolling = true;
    const list = surpriseList(), pick = pickOne(list);
    const back = document.createElement('div');
    back.className = 'k-reveal k-roll';
    back.setAttribute('role', 'status');
    back.innerHTML = `<div class="k-roll-box"><span class="k-roll-pic" aria-hidden="true">🎲</span><b>${kt('surprise')}</b></div>`;
    document.body.appendChild(back);
    const pic = back.querySelector('.k-roll-pic');
    let n = 0;
    const spin = setInterval(() => { pic.textContent = pickOne(list)[1]; Sfx.tap(); if (++n >= 9) stop(); }, 110);
    function stop() {
      clearInterval(spin);
      pic.textContent = pick[1];
      pic.classList.add('k-roll-done');
      Sfx.jingle();
      sayEn('Surprise!', 1);
      setTimeout(() => { back.remove(); rolling = false; location.hash = pick[0]; }, 900);
    }
  }
  // Shaking the phone on the map rolls the dice too. iPhone asks once for motion access (on the dice tap).
  let motionOn = false, lastShake = 0, prev = null;
  function onMotion(e) {
    const a = e.accelerationIncludingGravity;
    if (!a || !document.querySelector('.k-map')) return;
    if (prev) {
      const jolt = Math.abs(a.x - prev.x) + Math.abs(a.y - prev.y) + Math.abs(a.z - prev.z);
      if (jolt > 28 && Date.now() - lastShake > 3000) { lastShake = Date.now(); surprise(); }
    }
    prev = { x: a.x || 0, y: a.y || 0, z: a.z || 0 };
  }
  function listenMotion() { if (!motionOn && 'DeviceMotionEvent' in window) { window.addEventListener('devicemotion', onMotion); motionOn = true; } }
  function askMotion() {
    if (motionOn || !('DeviceMotionEvent' in window)) return;
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission().then(r => { if (r === 'granted') listenMotion(); }).catch(() => {});
    } else listenMotion();
  }
  if ('DeviceMotionEvent' in window && typeof DeviceMotionEvent.requestPermission !== 'function') listenMotion();   // Android: no question needed

  // ---------- can the device speak? ----------
  // The kids world is built on hearing words. If no English voice shows up (no speech at all, or offline
  // on a device whose voices come from the internet), a calm note on the map says what to do. Once per session.
  let voiceNoteShown = false;
  function checkVoice() {
    if (voiceNoteShown) return;
    const show = offline => {
      if (voiceNoteShown || !document.querySelector('.k-map')) return;
      voiceNoteShown = true;
      const note = document.createElement('div');
      note.className = 'k-mute-note';
      note.setAttribute('role', 'status');
      note.innerHTML = `<span aria-hidden="true">🔇</span><span class="grow"><b>${kt('mute')}</b><small>${kt(offline ? 'muteOffline' : 'muteNoVoice')}</small></span><button class="k-skip">${kt('muteOk')}</button>`;
      note.querySelector('button').onclick = () => note.remove();
      const head = $('.k-head');
      if (head) head.after(note);
    };
    if (!('speechSynthesis' in window)) return show(false);
    // voices load late on some devices: look again after a moment before saying anything
    setTimeout(() => { voices(); if (!enVoice) show(!navigator.onLine); }, 1500);
  }

  // ---------- the owl's daily check-in ----------
  // One question a day, answered with a picture: practises the feelings words in a real moment
  const WEATHER = [{ id: 'sunny', pic: '☀️' }, { id: 'cloudy', pic: '☁️' }, { id: 'rainy', pic: '🌧️' }, { id: 'windy', pic: '🌬️' }, { id: 'snowy', pic: '❄️' }];
  // The map's sky follows the weather the child picked today
  const applyWeather = () => { WEATHER.forEach(x => document.body.classList.toggle('wx-' + x.id, Store.kidsWeather === x.id)); };
  function bindCheckin() {
    K.view.querySelectorAll('.k-mood').forEach(b => {
      b.onclick = () => {
        const w = KIDS_WORDS.find(x => x.id === b.dataset.id);
        Store.kidsSetMood(w.id);
        Store.kidsWordRight(w.id);   // the feeling word goes into the garden too
        const reply = { 'feelings/happy': 'Me too!', 'feelings/sad': 'Oh no. A big hug!', 'feelings/tired': "Let's play something calm.", 'feelings/angry': 'Take a big breath with me.', 'feelings/surprised': 'Wow!', 'feelings/scared': "Don't worry, I'm here." }[w.id] || 'Thank you!';
        say([['en', `You feel ${w.en}. ${reply}`]]);
        owlMood(w.id === 'feelings/happy' ? 'cheer' : 'love');
        $('.k-checkin').outerHTML = checkinCard();
        bindCheckin();
      };
    });
    K.view.querySelectorAll('.k-wx').forEach(b => {
      b.onclick = () => {
        Store.kidsWeather = b.dataset.wx;
        applyWeather();
        say([['en', `It's ${b.dataset.wx} today!`]]);
        owlMood('cheer');
        $('.k-checkin').outerHTML = checkinCard();
      };
    });
  }
  function checkinCard() {
    const feels = ['happy', 'tired', 'sad', 'angry', 'surprised'].map(f => KIDS_WORDS.find(w => w.id === 'feelings/' + f)).filter(Boolean);
    const today = Store.kidsMoodToday && KIDS_WORDS.find(w => w.id === Store.kidsMoodToday);
    const wx = Store.kidsWeather && WEATHER.find(x => x.id === Store.kidsWeather);
    if (today && wx) return `<div class="k-checkin done"><span>${kt('checkinToday')}</span><b class="en">${today.pic} ${today.en}</b><b class="en">${wx.pic} ${wx.id}</b></div>`;
    if (today) return `
      <div class="k-checkin" role="group" aria-label="${kt('weatherQ')}">
        <p>🦉 ${kt('weatherQ')}</p>
        <div class="k-moods">${WEATHER.map(x => `<button class="k-wx" data-wx="${x.id}" aria-label="${x.id}"><span aria-hidden="true">${x.pic}</span><small class="en">${x.id}</small></button>`).join('')}</div>
      </div>`;
    return `
      <div class="k-checkin" role="group" aria-label="${kt('checkin')}">
        <p>🦉 ${kt('checkin')}</p>
        <div class="k-moods">${feels.map(w => `<button class="k-mood" data-id="${w.id}" aria-label="${w.en}"><span aria-hidden="true">${w.pic}</span><small class="en">${w.en}</small></button>`).join('')}</div>
      </div>`;
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
    if (idx >= 0 && !isOpen(idx)) { location.hash = '#/kids'; return; }
    document.body.style.setProperty('--kc', th.color);
    document.body.classList.add('in-lesson');   // also when "Play again" restarts without a route change
    const words = th.words;
    // Meet every word, then hear-and-find each one: half as picture cards, half as balloons to pop,
    // then the memory game. Two different games for the same skill keep it fresh.
    const order = K.shuffle(words).slice(0, 8), half = Math.ceil(order.length / 2);
    const steps = [
      ...words.map(w => ({ kind: 'meet', w })),
      ...order.slice(0, half).map(w => ({ kind: 'tap', w })),
      ...order.slice(half).map(w => ({ kind: 'pop', w })),
      ...(little() ? [] : [{ kind: 'drag' }]),
      ...(th.pairs ? K.shuffle(words).slice(0, 3).map(w => ({ kind: 'opp', w })) : []),
      ...(th.id === 'numbers' ? K.shuffle(words.slice(1, 8)).slice(0, 3).map(w => ({ kind: 'count', w })) : []),
      ...(little() ? [] : K.shuffle(words.filter(w => w.says)).slice(0, 3).map(w => ({ kind: 'says', w }))),
      ...(Rec() || canRecord() ? K.shuffle(words).slice(0, 2).map(w => ({ kind: 'say', w })) : []),
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
      else if (s.kind === 'opp') opposite(s.w);
      else if (s.kind === 'count') count(s.w);
      else if (s.kind === 'says') animalSays(s.w);
      else match();
    }

    // Meet: one big picture at a time, heard as soon as it shows
    function meet(w, n) {
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">👀</span> ${kt('meet')} · ${n + 1}/${words.length}</p>
          <button class="k-card k-meet" id="k-pic" aria-label="${w.en}">
            <span class="k-pic ${w.move ? 'mv mv-' + w.move : ''}" aria-hidden="true">${w.pic}</span>
            <span class="k-word en ${w.en.length > 8 ? 'long' : ''}" lang="en">${w.en}</span>
            <span class="k-he he" lang="he">${w.he}</span>
            <span class="k-ear" aria-hidden="true">🔊</span>
            ${w.says ? `<span class="k-says en" aria-hidden="true">${w.says}!</span>` : ''}
          </button>
          <p class="k-tip">${kt('meetTip')}</p>
          <button class="k-btn" id="k-next">${kt('next')} <span aria-hidden="true">${isHe() ? '←' : '→'}</span></button>
        </div>`;
      const pic = $('#k-pic');
      const hear = () => { w.says ? say([['en', w.en + '.'], ['en', `The ${w.en} says ${w.says}!`]]) : sayEn(w.en); pic.classList.remove('boing'); void pic.offsetWidth; pic.classList.add('boing'); };
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
            if (w.move) b.querySelector('span').classList.add('mv', 'mv-' + w.move);
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
            if (!missed) Store.kidsWordMiss(w.id); missed = true;
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
            if (!missed) Store.kidsWordMiss(w.id); missed = true;
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
            ${Rec() ? `<button class="k-mic" id="k-mic" aria-label="${kt('sayTip')}"><span aria-hidden="true">🎤</span></button>` : ''}
            ${canRecord() ? `<button class="k-rec ${Rec() ? '' : 'big'}" id="k-rec" aria-label="${kt('recMe')}"><span aria-hidden="true">🎧</span><small>${kt('recMe')}</small></button>` : ''}
          </div>
          <button class="k-skip" id="k-skip">${kt('skip')} <span aria-hidden="true">${isHe() ? '←' : '→'}</span></button>
          ${owl(kt('sayTip'), 'small')}
        </div>`;
      const pic = $('#k-pic'), mic = $('#k-mic'), bub = () => $('.k-bubble');
      const hear = () => { sayEn(w.en); pic.classList.remove('boing'); void pic.offsetWidth; pic.classList.add('boing'); };
      pic.onclick = hear;
      $('#k-skip').onclick = () => { stopRec(); nextStep(); };
      setTimeout(() => say(saysShown === 1 ? [['he', kt('sayHe')], ['en', w.en]] : [['en', w.en]]), 200);
      setTimeout(() => coach('say', Rec() ? '#k-mic' : '#k-rec'), 500);
      const recBtn = $('#k-rec');
      if (recBtn) recBtn.onclick = () => recordMe(w, recBtn, bub, () => { if (!Rec()) { Store.kidsWordRight(w.id); done(pickOne(kt('sayGood'))); } });
      const done = text => {
        if (mic) mic.disabled = true;
        if (recBtn) recBtn.disabled = true;
        bub().textContent = text;
        owlMood('cheer');
        K.announce(text);
        setTimeout(nextStep, 1600);
      };
      if (mic) mic.onclick = () => {
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
          if (!chip.dataset.missed) Store.kidsWordMiss(set[+chip.dataset.w].id); chip.dataset.missed = '1';
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

    // Find the opposite (islands with pairs): see and hear a word, pick its opposite among 3
    function opposite(w) {
      const i = words.indexOf(w), pair = words[i ^ 1];
      const opts = K.shuffle([pair, ...K.shuffle(words.filter(x => x !== w && x !== pair)).slice(0, 2)]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🔄</span> ${kt('opp')}</p>
          <div class="k-opp-card">
            <button class="k-card k-opp-word" id="k-say" aria-label="${w.en}"><span class="k-opp-pic" aria-hidden="true">${w.pic}</span><b class="en">${w.en}</b></button>
            <span class="k-opp-arrow" aria-hidden="true">↔️</span>
            <span class="k-card k-opp-word k-opp-q" aria-hidden="true"><span class="k-opp-pic">❓</span><b>?</b></span>
          </div>
          <div class="k-opts">${opts.map((o, n) => `<button class="k-opt" data-i="${n}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span></button>`).join('')}</div>
          ${owl(kt('oppTip'), 'small')}
        </div>`;
      $('#k-say').onclick = () => sayEn(w.en);
      setTimeout(() => say([['en', w.en + '.'], ['en', "What's the opposite?"]]), 200);
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          if (opts[+b.dataset.i] === pair) {
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            K.Feel.right();
            if (!missed) { firstTry++; Store.kidsWordRight(pair.id); }
            tapped++;
            const q = $('.k-opp-q');
            q.innerHTML = `<span class="k-opp-pic">${pair.pic}</span><b class="en">${pair.en}</b>`;
            q.classList.add('got');
            $('.k-bubble').textContent = kt('isOpp', { a: w.en, b: pair.en });
            owlMood('cheer');
            say([['en', `${w.en}, ${pair.en}!`]]);
            setTimeout(nextStep, 1700);
          } else {
            if (!missed) Store.kidsWordMiss(pair.id); missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            $('.k-bubble').textContent = kt('tryAgain'); owlMood('think');
          }
        };
      });
    }

    // Count with me (numbers island): a few things to count; tapping each one counts it out loud
    // ("one, two, three…"), then the child picks the number among 3
    function count(w) {
      const n = words.indexOf(w) + 1;
      const thing = pickOne(['🍎', '🐟', '⭐', '🎈', '🐱', '🌸', '🚗', '🍌', '🦆', '⚽']);
      const near = words.filter(x => x !== w && Math.abs(words.indexOf(x) + 1 - n) <= 3);
      const opts = K.shuffle([w, ...K.shuffle(near).slice(0, 2)]);
      let counted = 0, missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🔢</span> ${kt('count')}</p>
          <div class="k-card k-count-box" role="group" aria-label="${kt('count')}">
            ${Array.from({ length: n }, (_, i) => `<button class="k-count-thing" data-i="${i}" aria-label="${i + 1}"><span aria-hidden="true">${thing}</span><b></b></button>`).join('')}
          </div>
          <div class="k-opts">${opts.map((o, i) => `<button class="k-opt k-opt-num" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${words.indexOf(o) + 1}</span><small class="en">${o.en}</small></button>`).join('')}</div>
          ${owl(kt('countTip'), 'small')}
        </div>`;
      setTimeout(() => say([['en', 'How many?']]), 200);
      K.view.querySelectorAll('.k-count-thing').forEach(t => {
        t.onclick = () => {
          if (t.classList.contains('done')) return;
          counted++;
          t.classList.add('done');
          t.querySelector('b').textContent = counted;
          Sfx.tap();
          sayEn(words[counted - 1].en, 1);
        };
      });
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          if (opts[+b.dataset.i] === w) {
            K.view.querySelectorAll('.k-opt, .k-count-thing').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            K.Feel.right();
            if (!missed) { firstTry++; Store.kidsWordRight(w.id); }
            tapped++;
            $('.k-bubble').textContent = `${n}! ${w.en}!`;
            owlMood('cheer');
            // count them all together, lighting each one up
            const things = [...K.view.querySelectorAll('.k-count-thing')];
            things.forEach((t, i) => setTimeout(() => { t.classList.add('done', 'lit'); t.querySelector('b').textContent = i + 1; }, i * 380));
            say([['en', words.slice(0, n).map(x => x.en).join(', ') + '!']]);
            setTimeout(nextStep, Math.max(1800, n * 420 + 900));
          } else {
            if (!missed) Store.kidsWordMiss(w.id); missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            $('.k-bubble').textContent = kt('countTip'); owlMood('think');
          }
        };
      });
    }

    // What does it say? An animal, and three sound words to choose from
    function animalSays(w) {
      const opts = K.shuffle([w, ...K.shuffle(words.filter(x => x.says && x !== w)).slice(0, 2)]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🗯️</span> ${kt('says')}</p>
          <button class="k-card k-meet k-says-card" id="k-say" aria-label="${w.en}">
            <span class="k-pic ${w.move ? 'mv mv-' + w.move : ''}" aria-hidden="true">${w.pic}</span>
            <span class="k-word en">${w.en}</span>
            <span class="k-says en" aria-hidden="true">?</span>
          </button>
          <div class="k-peek-words">${opts.map((o, i) => `<button class="k-chip-word k-says-opt en" data-i="${i}">${o.says}!</button>`).join('')}</div>
          ${owl(kt('saysTip'), 'small')}
        </div>`;
      const ask = () => sayEn(`What does the ${w.en} say?`);
      $('#k-say').onclick = ask;
      setTimeout(ask, 250);
      K.view.querySelectorAll('.k-says-opt').forEach(b => {
        b.onclick = () => {
          const o = opts[+b.dataset.i];
          if (o === w) {
            K.view.querySelectorAll('.k-says-opt').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            K.Feel.right();
            if (!missed) { firstTry++; Store.kidsWordRight(w.id); }
            tapped++;
            $('.k-says-card .k-says').textContent = w.says + '!';
            owlMood('cheer');
            $('.k-bubble').textContent = `${w.pic} ${w.says}!`;
            sayEn(`The ${w.en} says ${w.says}!`);
            setTimeout(nextStep, 1900);
          } else {
            if (!missed) Store.kidsWordMiss(w.id);
            missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            owlMood('think');
            sayEn(`${o.says} is the ${o.en}!`);
          }
        };
      });
    }

    // Memory game: 4 pairs, each a picture card and a word card, face down
    function match() {
      const pairs = K.shuffle(words).slice(0, 4);
      const cards = K.shuffle(pairs.flatMap(w => [{ w, side: 'pic' }, { w, side: little() ? 'pic' : 'word' }]));
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
          ${!adv ? `<a class="k-btn ghost" href="#/kids/song/isle-${th.id}">🎵 ${kt('singIsle')}</a>` : ''}
          <aside class="k-home-tip"><b>👪 ${kt('tryHome')}</b><span>${bidiEn((KIDS_TIPS[th.id] || [])[isHe() ? 0 : 1] || kt('tryHomeAny'))}</span></aside>
          ${(() => { const n = th.words.filter(x => Store.kidsMissCount(x.id) > 0).length;
            return n && !adv ? `<a class="k-btn k-practice-btn" href="#/kids/practice/${th.id}">🎯 ${kt('practice', { n })}</a>` : ''; })()}
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
        ${little() ? '' : `<a class="k-btn ghost" href="#/kids/blend"><span aria-hidden="true">🧩</span> ${kt('blend')}</a>
        <a class="k-btn ghost" href="#/kids/spell"><span aria-hidden="true">🐝</span> ${kt('spell')}</a>`}
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

  // ---------- sticker calendar: this month, a sticker on every day the child played (never a broken streak) ----------
  function calendarHtml() {
    const now = new Date(), y = now.getFullYear(), m = now.getMonth();
    const first = new Date(y, m, 1), days = new Date(y, m + 1, 0).getDate();
    const lead = first.getDay();   // Sunday first, as in Israel
    const STK = ['⭐', '🌈', '🦄', '🍩', '🐳', '🌻', '🚀', '🎈', '🐼', '🍓', '🦋', '🎨'];
    let played = 0;
    const cells = [];
    for (let i = 0; i < lead; i++) cells.push('<span class="k-cal-day empty"></span>');
    for (let d = 1; d <= days; d++) {
      const date = new Date(y, m, d), key = Store.kidsDayKey(date), on = Store.kidsPlayedOn(key), today = d === now.getDate();
      if (on) played++;
      cells.push(`<span class="k-cal-day ${on ? 'on' : ''} ${today ? 'today' : ''} ${date > now ? 'future' : ''}"><small>${d}</small>${on ? `<i aria-hidden="true">${STK[(d * 7 + m) % STK.length]}</i>` : ''}</span>`);
    }
    const names = Array.from({ length: 7 }, (_, i) => new Date(2023, 0, 1 + i).toLocaleDateString(isHe() ? 'he-IL' : 'en-US', { weekday: 'narrow' }));
    return `
      <h2 class="k-title k-h2">📅 ${kt('calTitle')}</h2>
      <p class="k-sub">${kt('calSub')} · <b>${kt('calCount', { n: played })}</b></p>
      <div class="k-cal">
        <p class="k-cal-month">${now.toLocaleDateString(isHe() ? 'he-IL' : 'en-US', { month: 'long', year: 'numeric' })}</p>
        <div class="k-cal-grid">${names.map(n => `<b>${n}</b>`).join('')}${cells.join('')}</div>
      </div>`;
  }

  // ---------- trophies: milestones for everything the child does, with progress toward the next ----------
  function trophyList() {
    const learned = KIDS_WORDS.filter(w => Store.kidsWordCount(w.id) > 0).length;
    const traced = KIDS_ABC.filter(x => Store.kidsHasTraced(x.L)).length;
    const read = KIDS_STORIES.filter(st => Store.kidsHasSticker('st-' + st.id)).length;
    const isles = Store.kidsStickerCount, look = Store.kidsOwl;
    const bloom = Store.kidsGarden().some(p => p.lvl >= 4) ? 1 : 0;
    return [
      ['🏝️', 'tr_isle1', isles, 1], ['🗺️', 'tr_isle5', isles, 5], ['👑', 'tr_isleAll', isles, KIDS_THEMES.length],
      ['⭐', 'tr_stars', Store.kidsTotalStars, 30], ['💬', 'tr_words', learned, 50], ['🌻', 'tr_bloom', bloom, 1],
      ['🔤', 'tr_abc', Store.kidsHasSticker('abc') ? 1 : 0, 1], ['✍️', 'tr_trace', traced, 10], ['🎓', 'tr_traceAll', traced, 26],
      ['📚', 'tr_story', read, 3], ['📖', 'tr_storyAll', read, KIDS_STORIES.length], ['🕵️', 'tr_riddle', Store.kidsHasSticker('riddles') ? 1 : 0, 1],
      ['☀️', 'tr_treasure', Store.kidsTreasure.days, 7], ['🎩', 'tr_owl', look.acc && look.color !== 'blue' ? 1 : 0, 1]
    ].map(([pic, key, have, need]) => ({ pic, name: kt(key), have: Math.min(have, need), need, got: have >= need }));
  }
  function trophiesHtml() {
    const list = trophyList(), got = list.filter(t => t.got).length;
    return `
      <h2 class="k-title k-h2">🏆 ${kt('trophies')} · ${got}/${list.length}</h2>
      <div class="k-trophies">
        ${list.map(t => `
          <div class="k-trophy ${t.got ? 'got' : ''}">
            <span class="k-trophy-pic" aria-hidden="true">${t.got ? t.pic : '🔒'}</span>
            <span class="k-trophy-name">${t.name}</span>
            ${t.got ? '' : `<span class="k-trophy-bar" aria-label="${t.have}/${t.need}"><i style="width:${Math.round(t.have / t.need * 100)}%"></i></span><small>${t.have}/${t.need}</small>`}
          </div>`).join('')}
      </div>`;
  }

  // ---------- my world: a playground scene to fill with the pictures of learned words ----------
  function sceneScreen() {
    K.endLesson();
    const known = KIDS_WORDS.filter(w => Store.kidsWordCount(w.id) > 0);
    const decor = KIDS_THEMES.filter(th => Store.kidsHasSticker(th.id)).map(th => ({ pic: th.sticker }));
    const tray = [...known.map(w => ({ pic: w.pic, w })), ...decor];
    let picked = null;
    K.view.innerHTML = `
      <div class="k-wrap">
        <a class="k-back" href="#/kids/stickers"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('album')}</a>
        <h1 class="k-title">🎨 ${kt('scene')}</h1>
        <p class="k-sub">${kt('sceneTip')}</p>
        <div class="k-scene-box" id="k-scene" role="application" aria-label="${kt('scene')}">
          <span class="k-scene-sun" aria-hidden="true">☀️</span>
          ${Store.kidsScene.map((it, i) => placed(it, i)).join('')}
        </div>
        <div class="k-scene-tray">
          ${tray.length ? tray.map((t, i) => `<button class="k-tray-item" data-i="${i}" aria-label="${t.w ? t.w.en : 'sticker'}">${t.pic}</button>`).join('') : `<p class="k-sub">${kt('sceneEmpty')}</p>`}
        </div>
        <button class="k-skip" id="k-scene-clear">🧽 ${kt('sceneClear')}</button>
      </div>`;
    const box = $('#k-scene');
    const sayItem = it => { const w = it.w && KIDS_WORDS.find(x => x.id === it.w); if (w) sayEn(w.en); };
    function placed(it, i) {
      return `<button class="k-placed" data-i="${i}" style="left:${it.x}%;top:${it.y}%" aria-label="${it.w ? (KIDS_WORDS.find(x => x.id === it.w) || {}).en : 'sticker'}">${it.p}</button>`;
    }
    function drop(t, cx, cy) {
      const r = box.getBoundingClientRect();
      if (cx < r.left || cx > r.right || cy < r.top || cy > r.bottom) return;
      const it = { p: t.pic, w: t.w ? t.w.id : '', x: Math.round((cx - r.left) / r.width * 1000) / 10, y: Math.round((cy - r.top) / r.height * 1000) / 10 };
      const list = Store.kidsScene.concat([it]);
      Store.kidsScene = list;
      box.insertAdjacentHTML('beforeend', placed(it, list.length - 1));
      const el = box.lastElementChild;
      el.classList.add('k-pop-in');
      el.onclick = () => sayItem(it);
      Sfx.tap();
      if (it.w) sayItem(it); else sayEn('Wow!');
    }
    box.querySelectorAll('.k-placed').forEach(el => { el.onclick = () => sayItem(Store.kidsScene[+el.dataset.i]); });
    box.addEventListener('click', e => {
      if (!picked || e.target.closest('.k-placed')) return;
      drop(picked, e.clientX, e.clientY);
      K.view.querySelectorAll('.k-tray-item').forEach(x => x.classList.remove('picked'));
      picked = null;
    });
    K.view.querySelectorAll('.k-tray-item').forEach(b => {
      const t = tray[+b.dataset.i];
      b.onclick = () => {
        if (b.dataset.dragged) { delete b.dataset.dragged; return; }
        K.view.querySelectorAll('.k-tray-item').forEach(x => x.classList.toggle('picked', x === b));
        picked = t;
        if (t.w) sayEn(t.w.en);
      };
      // drag a copy out of the tray
      b.onpointerdown = e => {
        const sx = e.clientX, sy = e.clientY;
        let ghost = null;
        const move = ev => {
          if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) < 8) return;
          if (!ghost) { ghost = document.createElement('div'); ghost.className = 'k-ghost'; ghost.textContent = t.pic; document.body.appendChild(ghost); }
          ghost.style.left = ev.clientX + 'px';
          ghost.style.top = ev.clientY + 'px';
        };
        const up = ev => {
          document.removeEventListener('pointermove', move);
          document.removeEventListener('pointerup', up);
          document.removeEventListener('pointercancel', up);
          if (!ghost) return;
          ghost.remove();
          b.dataset.dragged = '1';
          drop(t, ev.clientX, ev.clientY);
        };
        document.addEventListener('pointermove', move);
        document.addEventListener('pointerup', up);
        document.addEventListener('pointercancel', up);
      };
    });
    $('#k-scene-clear').onclick = () => { Store.kidsScene = []; sceneScreen(); };
  }

  // ---------- sticker album ----------
  function stickers() {
    K.endLesson();
    K.view.innerHTML = `
      <div class="k-wrap">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <h1 class="k-title">🎁 ${kt('album')}</h1>
        <a class="k-btn" href="#/kids/scene">🎨 ${kt('scene')}</a>
        ${calendarHtml()}
        ${trophiesHtml()}
        <h2 class="k-title k-h2">🎁 ${kt('stickers')}</h2>
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
        ${KIDS_HOLIDAYS.some(th => Store.kidsHasSticker(th.id)) ? `
        <h2 class="k-title k-h2">🎉 ${kt('holidayStickers')}</h2>
        <div class="k-album k-album-small">${KIDS_HOLIDAYS.filter(th => Store.kidsHasSticker(th.id)).map(th =>
          `<div class="k-slot got" style="--c:${th.color}"><span class="k-sticker" aria-hidden="true">${th.sticker}</span><span class="k-slot-name">${themeName(th)}</span></div>`).join('')}</div>` : ''}
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
    forceHoliday(id) { forcedHoliday = id || null; },
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
      clearInterval(peekTimer);
      clearInterval(speedTimer);
      stopRec();
      stopRecording();
      clearHands();
      songRun++;   // a song still playing stops
      document.body.classList.add('kids');
      document.body.classList.toggle('night', isNight());
      document.body.classList.toggle('kids-big', Store.kidsBigPrint);
      document.body.classList.toggle('kids-little', little());
      if (a === 'parents') return parents();
      if (overLimit()) return rest();   // checked between screens, never in the middle of a game
      if (a === 'play') play(b);
      else if (a === 'stickers') stickers();
      else if (a === 'scene') sceneScreen();
      else if (a === 'abc') b ? letter(b) : abc();
      else if (a === 'abcgame') abcGame();
      else if (a === 'trace') trace(b);
      else if (a === 'owl') wardrobe();
      else if (a === 'stories') stories();
      else if (a === 'path') pathStory();
      else if (a === 'riddles') riddles();
      else if (a === 'spell') spellGame();
      else if (a === 'shop') shopGame();
      else if (a === 'together') togetherGame();
      else if (a === 'blend') blendGame();
      else if (a === 'speed') speedGame();
      else if (a === 'peek') peekGame();
      else if (a === 'pairs') pairsGame();
      else if (a === 'practice') practice(b);
      else if (a === 'colour') colourIt();
      else if (a === 'today') today(b);
      else if (a === 'songs') songs();
      else if (a === 'song') song(b);
      else if (a === 'garden') garden();
      else if (a === 'water') water();
      else if (a === 'story') story(b);
      else map();
    },
    gate,
    leave() { stopRec(); document.body.classList.remove('kids', 'night', 'kids-big', 'kids-little', 'wx-sunny', 'wx-cloudy', 'wx-rainy', 'wx-windy', 'wx-snowy'); document.body.style.removeProperty('--kc'); }
  };
})();
