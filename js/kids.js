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
      rmTitle: 'תזכורת עדינה', rmText: 'פעם ביום, בשעה שתבחרו: "זמן ל-10 דקות אנגלית עם הינשוף?" (רק אם עוד לא שיחקו היום)',
      rmTime: 'בשעה', rmCal: 'הוספה ליומן', rmCalText: 'הכי בטוח בטלפון: תזכורת קבועה ביומן, גם כשהאפליקציה סגורה',
      rmOff: 'ההתראות חסומות בדפדפן. אפשר להשתמש ביומן', rmBody: 'זמן ל-10 דקות אנגלית עם הינשוף?', rmTest: 'ניסיון',
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
      hide: 'מחבואים', hideSub: 'איפה הינשוף? מתחת, על, בתוך, מאחורי', hideTip: 'הקשיבו איפה הינשוף התחבא ולחצו שם',
      cardBtn: 'כרטיס התקדמות לשיתוף', cardTitle: 'כרטיס התקדמות', cardShare: 'שיתוף', cardSave: 'שמירת תמונה', cardClose: 'סגירה',
      simon: 'הינשוף אומר', simonSub: 'עושים מה שהינשוף אומר: לגעת באף, לקפוץ, למחוא כפיים', simonDid: 'עשיתי!', simonTip: 'עשו את התנועה ואז לחצו "עשיתי!"',
      fam: 'משפחות של מילים', famSub: 'מוצאים את כל החיות, כל האוכל, כל הצעצועים', famTip: 'לחצו על כל התמונות מהמשפחה. כל מילה נכנסת לסל',
      famLeft: 'עוד {n}',
      twin: 'כמעט כמו בעברית!', twinSay: 'כמעט כמו בעברית!', twinsTitle: 'מילים תאומות', twinsSub: 'מילים באנגלית שנשמעות כמו בעברית · פגשתם {n} מתוך {all}',
      mon: 'מאכילים את המפלצת', monSub: 'המפלצת רעבה! מה היא רוצה לאכול?', monTip: 'הקשיבו מה המפלצת רוצה, וגררו את האוכל לפה שלה (או לחצו עליו)',
      rhyme: 'מילים מתחרזות', rhymeSub: 'cat - hat! מוצאים מילים שנגמרות באותו צליל', rhymeTip: 'הקשיבו לסוף של המילה. איזו תמונה נשמעת אותו דבר בסוף?',
      wear: 'מלבישים לפי מזג האוויר', wearSub: 'קר? שמש? גשם? מלבישים את הינשוף', wearTip: 'הקשיבו למזג האוויר ולחצו על מה שהינשוף צריך',
      call: 'הינשוף מתקשר', callSub: 'שיחת טלפון באנגלית: איך קוראים לך? בן כמה אתה?', callIn: 'הינשוף מתקשר אליכם!', callAnswer: 'לענות',
      callTip: 'בחרו תשובה, והינשוף ישמע אתכם', callEnd: 'שיחה ראשונה באנגלית!', callHint: 'אפשר גם להגיד בקול', callName: 'אמרו בקול: <bdi dir="ltr" lang="en">My name is…</bdi> ואת השם שלכם', callMic: 'לחצו על המיקרופון וענו באנגלית, או בחרו תמונה', callSorry: 'לא שמעתי טוב. נסו שוב או בחרו תמונה',
      zoo: 'סופרים ביחד', zooSub: 'כמה תפוחים? תן לי שלושה! סופרים באנגלית', zooCount: 'סופרים איתי', zooDone: 'מוכן!',
      zooTipHow: 'לחצו על כל אחד כדי לספור, ואז בחרו את המספר', zooTipGive: 'לחצו על הדברים כדי לשים אותם בסל. לחיצה בסל מחזירה',
      lull: 'שיר ערש של היום', lullSub: 'לילה טוב לכל המילים שלמדנו היום', lullPlay: 'לשיר שוב', lullEnd: 'לילה טוב! חלומות פז',
      teddy: 'גוגעים בדובי', teddySub: 'איפה האף של הדובי? האוזניים? הרגליים?', teddyTip: 'הקשיבו וגעו בחלק הנכון בדובי',
      talk: 'מציירים ומדברים', talkSub: 'שמים חתול על המיטה, והינשוף אומר את המשפט', talkTip: 'בחרו חבר למטה ואז לחצו על מקום בחדר',
      talkRead: 'הינשוף מספר על התמונה', talkClear: 'חדר חדש',
      band: 'להקת החיות', bandSub: 'מוסיפים חיות ללהקה וכל אחת שרה בקצב: moo! woof!', bandTip: 'לחצו על חיה כדי להוסיף אותה ללהקה. לחיצה על הבמה מוציאה',
      bandPlay: 'לנגן', bandStop: 'עצור',
      prBtn: 'דף עבודה להדפסה', prTitle: 'דף ציור ועקיבה', prSub: 'המילים של השבוע: מציירים את התמונה בריבוע ועוברים בעיפרון על המילה',
      prPrint: 'הדפסה', prNew: 'מילים אחרות', prName: 'Name', prDraw: 'Draw it!',
      tmap: 'מפת האוצר של השבוע', tmapSub: '5 תחנות עם המילים של השבוע, ובסוף תיבת אוצר', tmapTip: 'לחצו על התחנה הבאה במפה',
      tmapDone: 'מצאתם את האוצר! מפה חדשה מחכה ביום ראשון', tmapStop: 'תחנה {n}', tmapIs: 'זה',
      qotd: 'השאלה של הינשוף', qotdDone: 'עניתם היום! שאלה חדשה מחר', qotdCount: '{n} שאלות נענו',
      safari: 'ספארי של קולות', safariSub: 'מי אומר moo? מוצאים את החיה שמתחבאת מאחורי העלים', safariTip: 'הקשיבו לקול ולחצו על העלה שהחיה מציצה ממנו',
      mybook: 'הספר הראשון שלי באנגלית', mybookSub: 'כל אי שמסיימים מוסיף עמוד עם המילים שלכם', mybookEmpty: 'סיימו אי ראשון וקבלו את העמוד הראשון בספר!',
      mybookRead: 'הקראה', mybookPage: 'עמוד {a} מתוך {b}',
      shunt: 'ציד צורות', shuntSub: 'איפה יש עיגול? שעון, כדור, עוגייה! מוצאים צורות בכל מקום', shuntTip: 'מצאו את כל הדברים בצורה הזאת', shuntLeft: 'עוד {n}',
      brush: 'מצחצחים שיניים עם הינשוף', brushSub: '2 דקות של צחצוח עם הוראות באנגלית: top, bottom, left, right', brushGo: 'מתחילים לצחצח!',
      brushStop: 'עצירה', brushTip: 'מצחצחים יחד עם הינשוף. החלק שמאיר הוא החלק לצחצח', brushDone: 'שיניים נקיות ונוצצות!',
      whoPlays: 'מי משחק?', whoPick: 'בחרו 2 או 3 ילדים', whoGo: 'מתחילים!', passTo: 'עכשיו התור של {name}!', passReady: 'אני מוכן/ה!',
      copy: 'מחקים את הינשוף', copySub: 'הינשוף מדבר בקול מצחיק: כמו עכבר, כמו דוב, בלחישה. מחקים אותו!',
      copyRec: 'עכשיו אני', copyOwl: 'הינשוף', copyMe: 'אני', copyNext: 'הבא', copyTip: 'הקשיבו לינשוף, לחצו על המיקרופון ואמרו את המילה באותו קול',
      copyNoRec: 'אמרו את המילה בקול באותו קול מצחיק, ואז לחצו "הבא"',
      seesaw: 'נדנדת ההפכים', seesawSub: 'גדול וקטן, חם וקר: שמים את ההפך בצד השני והנדנדה עפה!', seesawTip: 'מי ההפך? לחצו על התמונה כדי לשים אותה בצד השני של הנדנדה',
      morning: 'הבוקר שלי', morningSub: 'מתעוררים, מצחצחים, מתלבשים: מה בא אחר כך?', morningTip: 'מה עושים עכשיו? לחצו על התמונה הבאה',
      certBtn: 'תעודת כוכב השבוע', certNew: 'חדש לסוף השבוע!', certTitle: 'תעודת כוכב השבוע', certSub: 'תעודה להדפסה עם המילים החדשות של השבוע. אפשר לתלות על המקרר!',
      certName: 'שם הילד באנגלית (לא חובה)',
      peekaboo: 'קוקו!', peekabooSub: 'לקטנטנים: לוחצים בכל מקום ומגלים מי מתחבא', peekabooTip: 'לחצו בכל מקום על המסך',
      rsBtn: 'להקליט סיפור בקול שלכם', rsTitle: 'סיפור בקול של אמא ואבא', rsSub: 'מקליטים את עצמכם קוראים כל עמוד באנגלית. הילד ישמע את הקול שלכם בסיפור',
      rsRec: 'הקלטה', rsStop: 'עצירה', rsPlay: 'השמעה', rsDel: 'מחיקה', rsCount: '{n} מתוך {m} עמודים', rsNoMic: 'אין גישה למיקרופון בדפדפן הזה',
      rsVoice: 'הקול של אמא ואבא', rsRobot: 'קול הינשוף',
      cbw: 'צובעים לפי מילה', cbwSub: 'קוראים את שם הצבע על כל חלק בתמונה וצובעים', cbwTip: 'קראו את המילה על החלק, בחרו את הצבע ולחצו על החלק',
      feelst: 'איך הוא מרגיש?', feelstSub: 'סיפורים קטנים על רגשות: עצוב, שמח, מפחד, כועס', feelstTip: 'הקשיבו לסיפור. איך החבר מרגיש?', feelstFace: 'הסתכלו על הפנים',
      pizza: 'מכינים פיצה', pizzaSub: 'הינשוף מזמין: גבינה ועגבנייה! שמים את התוספות ואופים', pizzaTip: 'הקשיבו מה הינשוף רוצה על הפיצה ולחצו על התוספות',
      wxr: 'חזאי מזג האוויר', wxrSub: 'מגישים את התחזית בטלוויזיה: Today it is sunny and hot!', wxrSky: 'איך מזג האוויר היום?', wxrTemp: 'חם או קר?',
      wxrSay: 'עכשיו אתם! אמרו את התחזית', wxrMine: 'השמעה', wxrDone: 'סיימתי', wxrTip: 'לחצו על המיקרופון ותגידו את התחזית כמו בטלוויזיה',
      lotw: 'האות של השבוע', lotwSub: 'כל שבוע אות אחת: הצליל שלה, מילים שמתחילות בה ושיר קטן', lotwChant: 'שיר האות', lotwTrace: 'לכתוב את האות',
      lotwTip: 'לחצו על מילה כדי לשמוע אותה. האות הראשונה מסומנת',
      netOff: 'אין אינטרנט כרגע. הכול עובד גם בלי!', netNoVoice: 'אין קול באנגלית במכשיר הזה. אפשר לשחק עם התמונות והמילים, ומבוגר יכול להקריא',
      bath: 'זמן אמבטיה', bathSub: 'שמים את הברווז במים, מוציאים את הסירה, ומפוצצים בועות!', bathTip: 'הקשיבו ולחצו על הצעצוע הנכון. בסוף מפוצצים בועות',
      odd: 'מי לא שייך?', oddSub: 'שלושה דברים מאותה משפחה ואחד אחר. מי לא שייך?', oddTip: 'מצאו את התמונה שלא שייכת לשאר',
      slist: 'רשימת קניות', slistSub: 'הינשוף מקריא רשימה: חלב, ביצים, לחם! זוכרים וממלאים את הסל', slistTip: 'הקשיבו לרשימה, ואז מצאו את הדברים על המדפים. אפשר לשמוע שוב',
      slistAgain: 'לשמוע שוב את הרשימה',
      calm: 'פינת הרוגע', calmSub: 'נושמים עם הינשוף והבלון: שואפים... נושפים...', calmGo: 'מתחילים לנשום', calmStop: 'עצירה',
      calmTip: 'כשהבלון גדל שואפים אוויר, כשהוא קטן נושפים', calmEnd: 'כל הכבוד. הגוף רגוע יותר עכשיו', calmHint: 'מרגישים כועסים או עצובים? אפשר לנשום עם הינשוף',
      ftree: 'המשפחה שלי', ftreeSub: 'בוחרים פרצוף לאמא, לאבא, לסבתא... ושומעים: This is my mom!', ftreeTip: 'לחצו על עיגול ובחרו פרצוף. אפשר להשאיר ריק',
      ftreeRead: 'הינשוף מספר על המשפחה', ftreeNone: 'בלי', ftreeMe: 'אני',
      tipTitle: 'הטיפ של השבוע', tipTry: 'לנסות להגיד', tipWords: 'המילים החדשות של השבוע', tipMore: 'עוד טיפ',
      riddleHint: 'רמז בעברית',
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
      rmTitle: 'Gentle reminder', rmText: 'Once a day at the time you choose: "Time for 10 minutes of English with the owl?" (only if they have not played yet)',
      rmTime: 'At', rmCal: 'Add to calendar', rmCalText: 'Most reliable on a phone: a daily calendar alert, even when the app is closed',
      rmOff: 'Notifications are blocked in the browser. You can use the calendar', rmBody: 'Time for 10 minutes of English with the owl?', rmTest: 'Try it',
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
      hide: 'Hide and seek', hideSub: 'Where is the owl? under, on, in, behind', hideTip: 'Listen where the owl is hiding and tap there',
      cardBtn: 'Share a progress card', cardTitle: 'Progress card', cardShare: 'Share', cardSave: 'Save image', cardClose: 'Close',
      simon: 'Owl says', simonSub: 'Do what the owl says: touch your nose, jump, clap', simonDid: 'I did it!', simonTip: 'Do the move, then tap "I did it!"',
      fam: 'Word families', famSub: 'Find all the animals, all the food, all the toys', famTip: 'Tap every picture in the family. Each word jumps into the basket',
      famLeft: '{n} more',
      twin: 'Almost like in Hebrew!', twinSay: 'Almost like in Hebrew!', twinsTitle: 'Twin words', twinsSub: 'English words that sound like Hebrew · you met {n} of {all}',
      mon: 'Feed the monster', monSub: 'The monster is hungry! What does it want?', monTip: 'Listen to what the monster wants, then drag the food to its mouth (or tap it)',
      rhyme: 'Rhyme time', rhymeSub: 'cat - hat! Find words that end with the same sound', rhymeTip: 'Listen to the end of the word. Which picture sounds the same at the end?',
      wear: 'Dress for the weather', wearSub: 'Cold? Sunny? Rainy? Dress the owl', wearTip: 'Listen to the weather and tap what the owl needs',
      call: 'The owl calls', callSub: 'A phone call in English: what is your name? how old are you?', callIn: 'The owl is calling you!', callAnswer: 'Answer',
      callTip: 'Pick an answer and the owl will hear you', callEnd: 'Your first call in English!', callHint: 'You can say it out loud too', callName: 'Say it out loud: My name is... and your name', callMic: 'Tap the mic and answer in English, or pick a picture', callSorry: 'I did not hear that well. Try again or pick a picture',
      zoo: 'Count with me', zooSub: 'How many apples? Give me three! Counting in English', zooCount: 'Count with me', zooDone: 'Done!',
      zooTipHow: 'Tap each one to count, then pick the number', zooTipGive: 'Tap things to put them in the basket. Tap in the basket to take one out',
      lull: "Today's lullaby", lullSub: 'Good night to every word we learned today', lullPlay: 'Sing again', lullEnd: 'Good night! Sweet dreams',
      teddy: "Touch the teddy", teddySub: "Where is the teddy's nose? ears? feet?", teddyTip: 'Listen and touch the right part of the teddy',
      talk: 'Picture talk', talkSub: 'Put a cat on the bed and the owl says the sentence', talkTip: 'Pick a friend below, then tap a place in the room',
      talkRead: 'The owl tells the picture', talkClear: 'New room',
      band: 'Animal band', bandSub: 'Add animals to the band; each one sings on the beat: moo! woof!', bandTip: 'Tap an animal to add it to the band. Tap it on the stage to take it out',
      bandPlay: 'Play', bandStop: 'Stop',
      prBtn: 'Practice page to print', prTitle: 'Draw and trace page', prSub: "This week's words: draw the picture in the box and trace the word with a pencil",
      prPrint: 'Print', prNew: 'Other words', prName: 'Name', prDraw: 'Draw it!',
      tmap: "This week's treasure map", tmapSub: "5 stops with this week's words and a treasure chest at the end", tmapTip: 'Tap the next stop on the map',
      tmapDone: 'You found the treasure! A new map is waiting on Sunday', tmapStop: 'Stop {n}', tmapIs: 'Is it',
      qotd: "The owl's question", qotdDone: 'You answered today! A new question tomorrow', qotdCount: '{n} questions answered',
      safari: 'Sound safari', safariSub: 'Who says moo? Find the animal hiding behind the leaves', safariTip: 'Listen to the sound and tap the leaf the animal is peeking from',
      mybook: 'My first English book', mybookSub: 'Every island you finish adds a page with your words', mybookEmpty: 'Finish your first island to get the first page of your book!',
      mybookRead: 'Read to me', mybookPage: 'Page {a} of {b}',
      shunt: 'Shape hunt', shuntSub: 'Where is a circle? A clock, a ball, a cookie! Shapes are everywhere', shuntTip: 'Find all the things with this shape', shuntLeft: '{n} more',
      brush: 'Brush your teeth with the owl', brushSub: '2 minutes of brushing with English steps: top, bottom, left, right', brushGo: "Let's brush!",
      brushStop: 'Stop', brushTip: 'Brush along with the owl. Brush the part that lights up', brushDone: 'Clean, shiny teeth!',
      whoPlays: "Who's playing?", whoPick: 'Pick 2 or 3 children', whoGo: "Let's play!", passTo: 'Pass it to {name}!', passReady: "I'm ready!",
      copy: "Copy the owl's voice", copySub: 'The owl talks in a funny voice: like a mouse, like a bear, in a whisper. Copy it!',
      copyRec: 'My turn', copyOwl: 'Owl', copyMe: 'Me', copyNext: 'Next', copyTip: 'Listen to the owl, tap the mic and say the word in the same voice',
      copyNoRec: 'Say the word out loud in the same funny voice, then tap "Next"',
      seesaw: 'Opposite see-saw', seesawSub: 'Big and small, hot and cold: put the opposite on the other side and the see-saw flies!', seesawTip: 'Which one is the opposite? Tap a picture to put it on the other seat',
      morning: 'My morning', morningSub: 'Wake up, brush, get dressed: what comes next?', morningTip: 'What do we do now? Tap the next picture',
      certBtn: 'Star of the week certificate', certNew: 'New for the weekend!', certTitle: 'Star of the week certificate', certSub: "A certificate to print with this week's new words. Put it on the fridge!",
      certName: "Child's name in English (optional)",
      peekaboo: 'Peekaboo!', peekabooSub: 'For the littlest: tap anywhere and see who is hiding', peekabooTip: 'Tap anywhere on the screen',
      rsBtn: 'Record a story in your voice', rsTitle: "Mum's and dad's story voice", rsSub: 'Record yourself reading each page in English. Your child will hear your voice in the story',
      rsRec: 'Record', rsStop: 'Stop', rsPlay: 'Play', rsDel: 'Delete', rsCount: '{n} of {m} pages', rsNoMic: 'No microphone access in this browser',
      rsVoice: "Mum and dad's voice", rsRobot: "Owl's voice",
      cbw: 'Colour by word', cbwSub: 'Read the colour word on each part of the picture and paint it', cbwTip: 'Read the word on the part, pick that colour and tap the part',
      feelst: 'How do they feel?', feelstSub: 'Little stories about feelings: sad, happy, scared, angry', feelstTip: 'Listen to the story. How does the friend feel?', feelstFace: 'Look at the face',
      pizza: 'Pizza maker', pizzaSub: 'The owl orders: cheese and tomato! Add the toppings and bake', pizzaTip: 'Listen to what the owl wants on the pizza and tap the toppings',
      wxr: 'Weather reporter', wxrSub: 'Present the weather on TV: Today it is sunny and hot!', wxrSky: 'What is the weather today?', wxrTemp: 'Hot or cold?',
      wxrSay: 'Your turn! Say the report', wxrMine: 'Play', wxrDone: "I'm done", wxrTip: 'Tap the mic and say the report like on TV',
      lotw: 'Letter of the week', lotwSub: 'One letter each week: its sound, words that start with it and a little chant', lotwChant: 'Letter chant', lotwTrace: 'Write the letter',
      lotwTip: 'Tap a word to hear it. The first letter is marked',
      netOff: 'No internet right now. Everything still works!', netNoVoice: 'There is no English voice on this device. You can play with the pictures and words, and a grown-up can read aloud',
      bath: 'Bath time', bathSub: 'Put the duck in the water, take the boat out, and pop the bubbles!', bathTip: 'Listen and tap the right toy. At the end, pop the bubbles',
      odd: 'Odd one out', oddSub: 'Three things from one family and one that is different. Which one?', oddTip: 'Find the picture that does not belong',
      slist: 'Shopping list', slistSub: 'The owl reads a list: milk, eggs, bread! Remember it and fill the basket', slistTip: 'Listen to the list, then find the things on the shelves. You can listen again',
      slistAgain: 'Hear the list again',
      calm: 'Calm corner', calmSub: 'Breathe with the owl and the balloon: in... and out...', calmGo: "Let's breathe", calmStop: 'Stop',
      calmTip: 'When the balloon grows, breathe in. When it shrinks, breathe out', calmEnd: 'Well done. Your body feels calmer now', calmHint: 'Feeling angry or sad? You can breathe with the owl',
      ftree: 'My family', ftreeSub: 'Pick a face for mom, dad, grandma... and hear: This is my mom!', ftreeTip: 'Tap a circle and pick a face. You can leave it empty',
      ftreeRead: 'The owl tells about my family', ftreeNone: 'None', ftreeMe: 'Me',
      tipTitle: 'Tip of the week', tipTry: 'Try saying', tipWords: "This week's new words", tipMore: 'Another tip',
      riddleHint: 'Hint in Hebrew',
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
    enOnline = en.find(v => /en[-_]US/i.test(v.lang) && /Samantha/i.test(v.name)) || en.find(v => /en[-_]US/i.test(v.lang)) || en[0] || null;
    // network voices (e.g. Chrome's "Google US English") go silent offline: keep an on-device voice ready
    enLocal = en.find(v => v.localService && /en[-_]US/i.test(v.lang)) || en.find(v => v.localService) || null;
    pickVoice();
    voicesKnown = true;
  }
  let enOnline = null, enLocal = null, voicesKnown = false;
  function pickVoice() { enVoice = (navigator.onLine === false && enLocal) ? enLocal : (enOnline || enLocal); }
  window.addEventListener('online', () => { pickVoice(); netNote(); });
  window.addEventListener('offline', () => { pickVoice(); netNote(); });
  // a calm line on the map: no internet (everything still works), or no English voice on this device
  function netNote() {
    const el = document.getElementById('k-net');
    if (!el) return;
    const noSpeech = !('speechSynthesis' in window) || (voicesKnown && !enOnline && !enLocal);
    const off = navigator.onLine === false;
    el.hidden = !(noSpeech || off);
    el.innerHTML = noSpeech ? `🔇 ${kt('netNoVoice')}` : off ? `📴 ${kt('netOff')}` : '';
  }
  if ('speechSynthesis' in window) { voices(); speechSynthesis.addEventListener('voiceschanged', voices); }
  // parts: [['he', 'איפה'], ['en', 'cat']]; Hebrew parts are skipped when there is no Hebrew voice
  function say(parts, rate = 0.8) {
    seqToken++;
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
  // Say several English lines strictly one after another (queued, never cutting each other off) and call
  // onEach(i) the moment line i starts - so a word lights up exactly when it is heard. A new sequence (or
  // any say()) replaces the old one. Without speech it still walks the steps on a gentle timer.
  let seqToken = 0;
  function speakSeq(lines, rate = 0.85, onEach, onDone, opts = {}) {
    const my = ++seqToken;
    const step = i => { if (my === seqToken && onEach) onEach(i); };
    const done = () => { if (my === seqToken) { seqToken++; if (onDone) onDone(); } };
    if (!('speechSynthesis' in window) || !lines.length) {
      lines.forEach((_, i) => setTimeout(() => step(i), i * 900));
      setTimeout(done, lines.length * 900);
      return;
    }
    if (!enVoice) voices();
    speechSynthesis.cancel();
    lines.forEach((text, i) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      if (enVoice) u.voice = enVoice;
      u.rate = rate * (isNight() ? .85 : 1);
      u.pitch = opts.pitch || 1.1;
      if (opts.volume != null) u.volume = opts.volume;
      u.onstart = () => step(i);
      if (i === lines.length - 1) { u.onend = done; u.onerror = done; }
      speechSynthesis.speak(u);
    });
    // safety net: some devices never fire onend
    setTimeout(done, lines.length * 2500 + 2000);
  }

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
    ? `<bdi class="k-q" dir="ltr" lang="en">${part}</bdi>`
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
          <p class="k-net" id="k-net" role="status" hidden></p>
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
          </a>
          <a class="k-today k-night-card k-lull-card" href="#/kids/lullaby">
            <span class="k-today-go" aria-hidden="true">🎶</span>
            <span class="grow"><b>${kt('lull')}</b><small>${kt('lullSub')}</small></span>
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
        ${qotdCard()}
        ${lotwCard()}
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
          <span class="grow"><b>${kt('speed')}</b><small>${Store.kidsSpeedBest ? kt('speedBest', { n: Math.round(Store.kidsSpeedBest * 10) }) : kt('speedSub')}</small></span>
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
        <a class="k-abc-card k-hide-card" href="#/kids/hide">
          <span class="k-story-books" aria-hidden="true">🙈</span>
          <span class="grow"><b>${kt('hide')}</b><small>${kt('hideSub')}</small></span>
          ${Store.kidsHasSticker('hide') ? starsHtml(Store.kidsStars('hide'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-simon-card" href="#/kids/simon">
          <span class="k-story-books" aria-hidden="true">🤸</span>
          <span class="grow"><b>${kt('simon')}</b><small>${kt('simonSub')}</small></span>
        </a>
        <a class="k-abc-card k-fam-card" href="#/kids/fam">
          <span class="k-story-books" aria-hidden="true">🧺</span>
          <span class="grow"><b>${kt('fam')}</b><small>${kt('famSub')}</small></span>
          ${Store.kidsHasSticker('fam') ? starsHtml(Store.kidsStars('fam'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-mon-card" href="#/kids/monster">
          <span class="k-story-books" aria-hidden="true">😋</span>
          <span class="grow"><b>${kt('mon')}</b><small>${kt('monSub')}</small></span>
          ${Store.kidsHasSticker('monster') ? starsHtml(Store.kidsStars('monster'), 'sm') : ''}
        </a>
        ${little() ? '' : `<a class="k-abc-card k-rhyme-card" href="#/kids/rhyme">
          <span class="k-story-books" aria-hidden="true">🎶</span>
          <span class="grow"><b>${kt('rhyme')}</b><small>${bidiEn(kt('rhymeSub'))}</small></span>
          ${Store.kidsHasSticker('rhyme') ? starsHtml(Store.kidsStars('rhyme'), 'sm') : ''}
        </a>`}
        <a class="k-abc-card k-wear-card" href="#/kids/wear">
          <span class="k-story-books" aria-hidden="true">🧣</span>
          <span class="grow"><b>${kt('wear')}</b><small>${kt('wearSub')}</small></span>
          ${Store.kidsHasSticker('wear') ? starsHtml(Store.kidsStars('wear'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-call-card" href="#/kids/call">
          <span class="k-story-books" aria-hidden="true">📞</span>
          <span class="grow"><b>${kt('call')}</b><small>${kt('callSub')}</small></span>
          ${Store.kidsHasSticker('call') ? starsHtml(Store.kidsStars('call'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-zoo-card" href="#/kids/zoo">
          <span class="k-story-books" aria-hidden="true">🔢</span>
          <span class="grow"><b>${kt('zoo')}</b><small>${kt('zooSub')}</small></span>
          ${Store.kidsHasSticker('zoo') ? starsHtml(Store.kidsStars('zoo'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-teddy-card" href="#/kids/teddy">
          <span class="k-story-books" aria-hidden="true">🧸</span>
          <span class="grow"><b>${kt('teddy')}</b><small>${kt('teddySub')}</small></span>
          ${Store.kidsHasSticker('teddy') ? starsHtml(Store.kidsStars('teddy'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-talk-card" href="#/kids/talk">
          <span class="k-story-books" aria-hidden="true">🖼️</span>
          <span class="grow"><b>${kt('talk')}</b><small>${kt('talkSub')}</small></span>
          ${Store.kidsHasSticker('talk') ? starsHtml(Store.kidsStars('talk'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-band-card" href="#/kids/band">
          <span class="k-story-books" aria-hidden="true">🥁</span>
          <span class="grow"><b>${kt('band')}</b><small>${bidiEn(kt('bandSub'))}</small></span>
          ${Store.kidsHasSticker('band') ? starsHtml(Store.kidsStars('band'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-tmap-card" href="#/kids/tmap">
          <span class="k-story-books" aria-hidden="true">🗺️</span>
          <span class="grow"><b>${kt('tmap')}</b><small>${kt('tmapSub')}</small></span>
          <span class="k-story-count">${Store.kidsTmap().done}/5</span>
        </a>
        <a class="k-abc-card k-safari-card" href="#/kids/safari">
          <span class="k-story-books" aria-hidden="true">🌿</span>
          <span class="grow"><b>${kt('safari')}</b><small>${bidiEn(kt('safariSub'))}</small></span>
          ${Store.kidsHasSticker('safari') ? starsHtml(Store.kidsStars('safari'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-shunt-card" href="#/kids/shunt">
          <span class="k-story-books" aria-hidden="true">🔍</span>
          <span class="grow"><b>${kt('shunt')}</b><small>${kt('shuntSub')}</small></span>
          ${Store.kidsHasSticker('shunt') ? starsHtml(Store.kidsStars('shunt'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-brush-card" href="#/kids/brush">
          <span class="k-story-books" aria-hidden="true">🦷</span>
          <span class="grow"><b>${kt('brush')}</b><small>${kt('brushSub')}</small></span>
        </a>
        <a class="k-abc-card k-copy-card" href="#/kids/copy">
          <span class="k-story-books" aria-hidden="true">🎭</span>
          <span class="grow"><b>${kt('copy')}</b><small>${kt('copySub')}</small></span>
          ${Store.kidsHasSticker('copy') ? starsHtml(Store.kidsStars('copy'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-seesaw-card" href="#/kids/seesaw">
          <span class="k-story-books" aria-hidden="true">⚖️</span>
          <span class="grow"><b>${kt('seesaw')}</b><small>${kt('seesawSub')}</small></span>
          ${Store.kidsHasSticker('seesaw') ? starsHtml(Store.kidsStars('seesaw'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-morning-card" href="#/kids/morning">
          <span class="k-story-books" aria-hidden="true">🌅</span>
          <span class="grow"><b>${kt('morning')}</b><small>${kt('morningSub')}</small></span>
          ${Store.kidsHasSticker('morning') ? starsHtml(Store.kidsStars('morning'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-peekaboo-card ${little() ? 'k-first' : ''}" href="#/kids/peekaboo">
          <span class="k-story-books" aria-hidden="true">🙈</span>
          <span class="grow"><b>${kt('peekaboo')}</b><small>${kt('peekabooSub')}</small></span>
        </a>
        ${little() ? '' : `<a class="k-abc-card k-cbw-card" href="#/kids/cbw">
          <span class="k-story-books" aria-hidden="true">🐠</span>
          <span class="grow"><b>${kt('cbw')}</b><small>${kt('cbwSub')}</small></span>
          ${Store.kidsHasSticker('cbw') ? starsHtml(Store.kidsStars('cbw'), 'sm') : ''}
        </a>`}
        <a class="k-abc-card k-feelst-card" href="#/kids/feelst">
          <span class="k-story-books" aria-hidden="true">🤗</span>
          <span class="grow"><b>${kt('feelst')}</b><small>${kt('feelstSub')}</small></span>
          ${Store.kidsHasSticker('feelst') ? starsHtml(Store.kidsStars('feelst'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-pizza-card" href="#/kids/pizza">
          <span class="k-story-books" aria-hidden="true">🍕</span>
          <span class="grow"><b>${kt('pizza')}</b><small>${kt('pizzaSub')}</small></span>
          ${Store.kidsHasSticker('pizza') ? starsHtml(Store.kidsStars('pizza'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-wxr-card" href="#/kids/wxr">
          <span class="k-story-books" aria-hidden="true">📺</span>
          <span class="grow"><b>${kt('wxr')}</b><small>${bidiEn(kt('wxrSub'))}</small></span>
          ${Store.kidsHasSticker('wxr') ? starsHtml(Store.kidsStars('wxr'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-bath-card" href="#/kids/bath">
          <span class="k-story-books" aria-hidden="true">🛁</span>
          <span class="grow"><b>${kt('bath')}</b><small>${kt('bathSub')}</small></span>
          ${Store.kidsHasSticker('bath') ? starsHtml(Store.kidsStars('bath'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-odd-card" href="#/kids/odd">
          <span class="k-story-books" aria-hidden="true">🔎</span>
          <span class="grow"><b>${kt('odd')}</b><small>${kt('oddSub')}</small></span>
          ${Store.kidsHasSticker('odd') ? starsHtml(Store.kidsStars('odd'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-slist-card" href="#/kids/slist">
          <span class="k-story-books" aria-hidden="true">📝</span>
          <span class="grow"><b>${kt('slist')}</b><small>${kt('slistSub')}</small></span>
          ${Store.kidsHasSticker('slist') ? starsHtml(Store.kidsStars('slist'), 'sm') : ''}
        </a>
        <a class="k-abc-card k-calm-card ${['feelings/sad', 'feelings/angry', 'feelings/scared', 'feelings/tired'].includes(Store.kidsMoodToday) ? 'k-first k-calm-now' : ''}" href="#/kids/calm">
          <span class="k-story-books" aria-hidden="true">🎈</span>
          <span class="grow"><b>${kt('calm')}</b><small>${['feelings/sad', 'feelings/angry', 'feelings/scared'].includes(Store.kidsMoodToday) ? kt('calmHint') : kt('calmSub')}</small></span>
        </a>
        <a class="k-abc-card k-ftree-card" href="#/kids/ftree">
          <span class="k-story-books" aria-hidden="true">🌳</span>
          <span class="grow"><b>${kt('ftree')}</b><small>${bidiEn(kt('ftreeSub'))}</small></span>
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
    qotdWire();
    netNote();
    setTimeout(netNote, 1500);
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
            <p class="k-he he k-riddle-he" lang="he" hidden>${r.he}</p>
            <button class="k-chip k-riddle-hint" id="k-hint">💡 ${kt('riddleHint')}</button>
            <button class="k-speaker sm" id="k-say" aria-label="${kt('listen')}"><span aria-hidden="true">🔊</span></button>
          </div>
          <div class="k-opts">${opts.map((o, i) => `<button class="k-opt" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span></button>`).join('')}</div>
          ${owl(kt('riddleTip'), 'small')}
        </div>`;
      const words = [...K.view.querySelectorAll('.k-w')];
      words.forEach(w => { w.onclick = () => sayEn(w.textContent.replace(/[^A-Za-z']/g, '')); });
      const read = () => readAlong(r.en + ' Who am I?', words);
      // the Hebrew stays hidden at first so the child listens to the English; a tap (or a wrong answer) shows it
      const hint = () => { const he = $('.k-riddle-he'); if (!he || !he.hidden) return; he.hidden = false; $('#k-hint').hidden = true; };
      $('#k-hint').onclick = () => { hint(); say([['he', r.he]]); };
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
            if (!missed) Store.kidsWordMiss(r.w.id);
            missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            hint();
            $('.k-bubble').textContent = kt('tryAgain'); owlMood('think');
            sayEn(opts[+b.dataset.i].en);
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
  const PAINT = { red: '#ef4444', blue: '#3b82f6', green: '#22c55e', yellow: '#facc15', orange: '#fb923c', purple: '#a855f7', black: '#1f2937', white: '#ffffff', pink: '#f472b6' };
  const PAINT_HE = { red: 'אדום', blue: 'כחול', green: 'ירוק', yellow: 'צהוב', orange: 'כתום', purple: 'סגול', black: 'שחור', white: 'לבן', pink: 'ורוד' };
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
        <p class="k-step"><span aria-hidden="true">🖍️</span> ${kt('colour')} <span id="k-col-n"></span></p>
        <div class="k-card k-paint-card">
          <svg class="k-paint" viewBox="0 0 300 300" role="img" aria-label="${kt('colour')}">
            ${PARTS.map(([id, he, shape]) => `<g class="k-part" data-part="${id}" tabindex="0" role="button" aria-label="${id}">${shape.replace('/>', ' fill="#ffffff"/>')}</g>`).join('')}
            <rect x="229" y="210" width="18" height="48" fill="#8b5a2b" pointer-events="none"/>
            <circle cx="160" cy="232" r="3" fill="#1f2937" pointer-events="none"/>
          </svg>
        </div>
        <div class="k-paints">
          ${Object.entries(PAINT).filter(([name]) => name !== 'pink').map(([name, hex]) => `<button class="k-paint-pot" data-c="${name}" style="--p:${hex}" aria-label="${name}"><i></i><span class="en">${name}</span></button>`).join('')}
        </div>
        ${owl('', 'small')}
      </div>`;
    const bub = () => $('.k-bubble');
    // point at a paint pot (or all of them) with a short bounce
    const nudgePots = c => K.view.querySelectorAll('.k-paint-pot').forEach(x => {
      if (c && x.dataset.c !== c) return;
      x.classList.remove('nudge'); void x.offsetWidth; x.classList.add('nudge');
    });
    function ask(first) {
      if (at >= asks.length) return finish();
      K.lessonBar(at / asks.length);
      $('#k-col-n').textContent = `· ${at + 1}/${asks.length}`;
      const [part, col] = asks[at];
      const he = PARTS.find(p => p[0] === part)[1];
      bub().innerHTML = `${kt('colourAsk', { thing: isHe() ? he : part, colour: isHe() ? PAINT_HE[col] : col })} <b class="en" style="color:${PAINT[col] === '#ffffff' ? '#1d2a5b' : PAINT[col]}">● ${col}</b>`;
      // the first time, the short Hebrew intro and the first instruction are one queue (nothing cut off)
      say([...(first ? [['he', kt('colourSub')]] : []), ['en', `Colour the ${part} ${col}!`]]);
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
      if (!brush) { K.Feel.wrong(g); sayEn('Pick a colour first!', 0.9); nudgePots(at < asks.length ? asks[at][1] : null); return; }
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
        nudgePots(col);
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
    setTimeout(() => ask(true), 200);
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
            // name the picture that was tapped (under it and aloud), then the word again
            const o = opts[+b.dataset.i];
            b.insertAdjacentHTML('beforeend', `<small class="k-opt-name en" lang="en">${esc(o.en)}</small>`);
            $('.k-bubble').textContent = kt('tryAgain'); owlMood('think');
            setTimeout(() => say([['en', `${o.en}.`], ['en', `${w.en}!`]]), 350);
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
            // both words, one after the other, and each card glows while its word is said
            $('.k-bubble').textContent = `${other.pic} ${other.en} · ${w.pic} ${w.en}`;
            const cards = [b, K.view.querySelector(`.k-opt[data-i="${p.indexOf(w)}"]`)];
            speakSeq([other.en + '.', w.en + '!'], 0.7, i => {
              cards.forEach(c => c.classList.remove('say'));
              if (cards[i].isConnected) cards[i].classList.add('say');
            }, () => cards.forEach(c => c.classList.remove('say')));
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
      const words = [...K.view.querySelectorAll('.k-peek-word')];
      // the owl reads the three words, each one glowing as it is said (for children who can't read yet)
      const readWords = () => speakSeq(opts.map(o => o.en + (o === opts[opts.length - 1] ? '?' : ',')), 0.85, i => {
        words.forEach(b => b.classList.remove('say'));
        if (words[i].isConnected && !done) words[i].classList.add('say');
      }, () => words.forEach(b => b.classList.remove('say')));
      const blow = () => {
        if (!clouds[0].isConnected) return clearInterval(peekTimer);
        if (shown >= 9) { clearInterval(peekTimer); if (!done) readWords(); return; }
        clouds[order[shown++]].classList.add('gone');
      };
      if (at === 0) sayEn("What's hiding?", 0.9);
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
            $('.k-bubble').textContent = kt('tryAgain');
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
  // points are shown as whole numbers (10 for a right answer + up to 10 for speed); the store keeps tenths
  const speedPts = n => Math.round(n * 10);
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
          <p class="k-step"><span aria-hidden="true">⚡</span> ${kt('speed')} · ${at + 1}/10 · <b>${kt('speedScore', { n: speedPts(score) })}</b></p>
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
            const gain = 1 + Math.round(left * 10) / 10;
            score += gain;
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            $('.k-bubble').textContent = `⚡ +${speedPts(gain)} · ${w.en.replace(/[!?.]$/, '')}!`;
            Sfx.star(Math.min(3, Math.floor(left * 4)));
            Store.kidsWordRight(w.id);
            owlMood('cheer');
            setTimeout(next, 500);
          } else {
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            $('.k-bubble').textContent = kt('tryAgain');
            sayEn(opts[+b.dataset.i].en, 1);   // name what was tapped
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
            <h1>⚡ ${kt('speedScore', { n: speedPts(pts) })}</h1>
            ${starsHtml(stars, 'big pop')}
            ${best ? `<b class="k-best">🏆 ${kt('speedNew')}</b>` : `<p class="k-unlock">${kt('speedBest', { n: speedPts(Store.kidsSpeedBest) })}</p>`}
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
      const light = i => { tiles[i].classList.remove('lit'); void tiles[i].offsetWidth; tiles[i].classList.add('lit'); };
      const sayTile = i => { sayEn(soundOf(w.en[i]), 0.7); light(i); };
      tiles.forEach((t, i) => { t.onclick = () => sayTile(i); });
      // sound by sound, then the sounds again closer together while the tiles slide in - and the child
      // says the word. The owl only says the whole word as help after a miss (withWord) or as praise.
      const sounds = tiles.map((t, i) => soundOf(w.en[i]));
      const blend = withWord => {
        $('.k-blend').classList.remove('joined');
        const lines = [...sounds, sounds.join(' '), withWord ? w.en + '!' : 'What is it?'];
        speakSeq(lines, 0.7, i => {
          if (!tiles[0].isConnected) return;
          if (i < tiles.length) light(i);
          else if (i === tiles.length) $('.k-blend').classList.add('joined');
          else if (withWord) blended = true;
        });
      };
      $('#k-blend-go').onclick = () => blend(blended);
      setTimeout(() => blend(false), 400);
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          if (opts[+b.dataset.i] === w) {
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            K.Feel.right();
            if (!missed) firstTry++;
            $('.k-blend').classList.add('joined');
            owlMood('cheer');
            $('.k-bubble').innerHTML = `<bdi class="k-q" dir="ltr" lang="en">${w.en.split('').join(' – ')} → ${w.en}!</bdi>`;
            sayEn(w.en, 0.8);
            setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 1600);
          } else {
            missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            owlMood('think');
            $('.k-bubble').textContent = kt('tryAgain');
            if (blended) setTimeout(() => sayEn(w.en, 0.7), 300); else blend(true);
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
  function togetherGame(chosen) {
    document.body.classList.add('in-lesson');
    const profs = Store.kidsProfiles.map((p, i) => ({ face: p.face, name: p.name || kt('player') + ' ' + (i + 1) }));
    // more than two children in the family: ask who is playing (2 or 3 of them)
    if (!chosen && profs.length > 2) return pickPlayers(profs);
    const players = (chosen || (profs.length >= 2 ? profs.slice(0, 2)
      : [{ face: '🦊', name: kt('player') + ' 1' }, { face: '🐼', name: kt('player') + ' 2' }])).map(p => ({ ...p, stars: 0 }));
    const N = players.length;
    const pool = KIDS_WORDS.filter(w => isOpen(KIDS_THEMES.findIndex(th => th.id === w.theme)));
    const rounds = K.shuffle(pool).slice(0, N * 4);
    let at = 0, team = 0;
    // between turns: a big "pass it to ..." card that waits until the next child taps "I'm ready" -
    // so the word is not said before the phone has really changed hands
    function pass(then) {
      const p = players[at % N];
      K.lessonBar(at / rounds.length);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-pass">
          <div class="k-pass-face" aria-hidden="true">${p.face}</div>
          <p class="k-pass-text">${kt('passTo', { name: esc(p.name) })}</p>
          <button class="k-btn k-pass-go" id="k-pass-go">${p.face} ${kt('passReady')} ▶️</button>
        </div>`;
      Sfx.whoosh && Sfx.whoosh();
      say([['he', kt('passTo', { name: p.name })]]);
      $('#k-pass-go').onclick = () => { Sfx.tap(); then(); };
    }
    function round() {
      K.lessonBar(at / rounds.length);
      const p = players[at % N], w = rounds[at];
      const opts = K.shuffle([w, ...K.shuffle(pool.filter(x => x !== w && x.pic !== w.pic)).slice(0, 2)]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <div class="k-turn" aria-live="polite">
            ${players.map((q, i) => `<span class="k-turn-p ${i === at % N ? 'on' : ''}"><i aria-hidden="true">${q.face}</i>${esc(q.name)} <b class="k-turn-stars">⭐${q.stars}</b></span>`).join('')}
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
            if (!missed) { team++; p.stars++; const st = K.view.querySelector('.k-turn-p.on .k-turn-stars'); if (st) { st.textContent = `⭐${p.stars}`; st.classList.add('k-pop-in'); } }
            const jar = K.view.querySelectorAll('.k-jar i');
            if (!missed && jar[team - 1]) jar[team - 1].classList.add('on', 'k-pop-in');
            owlMood('cheer');
            $('.k-bubble').textContent = `${p.face} ${pickOne(kt('great'))}`;
            sayEn(w.en);
            setTimeout(() => { at++; at < rounds.length ? pass(round) : end(); }, 1400);
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
            <div class="k-team-scores">${players.map(q => `<span><i aria-hidden="true">${q.face}</i>${esc(q.name)}<b>⭐ ${q.stars}</b></span>`).join('')}</div>
            <p class="k-unlock"><b>${kt('teamScore', { n: team, m: rounds.length })}</b></p>
            <div class="k-jar big">${rounds.map((_, i) => `<i class="${i < team ? 'on' : ''}"></i>`).join('')}</div>
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('Great teamwork!', 0.9);
      $('#k-again').onclick = () => togetherGame(chosen);
    }
    pass(round);
  }
  // Who's playing? Tap 2 or 3 of the family's children, then start
  function pickPlayers(profs) {
    const sel = new Set();
    K.view.innerHTML = `
      <div class="k-wrap k-play">
        <h1 class="k-title">👫 ${kt('whoPlays')}</h1>
        <p class="k-sub">${kt('whoPick')}</p>
        <div class="k-who">${profs.map((p, i) => `<button class="k-who-p" data-i="${i}" aria-pressed="false"><span aria-hidden="true">${p.face}</span><b>${esc(p.name)}</b></button>`).join('')}</div>
        <button class="k-btn" id="k-who-go" disabled>▶️ ${kt('whoGo')}</button>
      </div>`;
    const go = $('#k-who-go');
    K.view.querySelectorAll('.k-who-p').forEach(b => {
      b.onclick = () => {
        const i = +b.dataset.i;
        if (sel.has(i)) sel.delete(i); else if (sel.size < 3) sel.add(i);
        K.view.querySelectorAll('.k-who-p').forEach(x => { const on = sel.has(+x.dataset.i); x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
        go.disabled = sel.size < 2;
        Sfx.tap();
      };
    });
    go.onclick = () => togetherGame([...sel].sort().map(i => profs[i]));
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
          <p class="k-step"><span aria-hidden="true">🏪</span> ${kt('shop')} · ${at + 1}/${customers.length} · 💰 ${coins}</p>
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
      let busy = false;   // one tap on "Here you are!" is one handover (a double tap must not skip a customer)
      $('#k-give').onclick = () => {
        if (busy) return;
        if (!basket.length) {   // nothing to hand over yet: point at the shelf
          K.Feel.wrong($('.k-basket'));
          sayEn('Put it in the basket first!', 0.9);
          return;
        }
        busy = true;
        sayEn('Here you are!', 1);
        const ok = basket.length === o.n && basket.every(w => w === o.w);
        setTimeout(() => {
          if (!ok) busy = false;
          if (ok) {
            if (!missed) firstTry++;
            coins += o.n;
            Store.kidsWordRight(o.w.id);
            K.Feel.right();
            owlMood('cheer');
            $('.k-customer-says').textContent = 'Thank you! 💰';
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
            // after a miss the wanted thing on the shelf glows, so the child links the word to it
            const want = K.view.querySelector(`.k-shelf-item[data-i="${shelf.indexOf(o.w)}"]`);
            if (want) want.classList.add('want');
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
            <p class="k-unlock">💰 ${kt('shopCoins', { n: coins })}</p>
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
        // after two tries, the tile for the next missing letter keeps glowing (also after every redraw)
        if (tries >= 2) {
          const i = slots.indexOf(null), want = i >= 0 && tiles.find(t => !t.used && t.c === letters[i]);
          const hint = want && K.view.querySelector(`.k-spell-tile[data-t="${want.i}"]`);
          if (hint) hint.classList.add('hint');
        }
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
          $('.k-bubble').innerHTML = `<bdi class="k-q" dir="ltr" lang="en">${w.en.toUpperCase().split('').join('-')}: ${w.en}! ${w.pic}</bdi>`;
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
        $('.k-bubble').textContent = kt('tryAgain');
        setTimeout(sayIt, 900);   // after the last letter's name, not on top of it
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

  // ---------- hide and seek: little place words (under, on, in, behind) ----------
  // A room with a bed, a chair, a box and a door. The owl hides and says where ("The owl is under the bed!");
  // the child taps that spot and the owl peeks out. A wrong spot just puffs and the sentence is said again.
  // The room keeps one shape (8:7) and the furniture is sized from its width, so the tap areas (in % of
  // the room) always sit on the furniture: "on" = the top of a thing, "under" = the space below it.
  const ROOM_OBJ = [
    { pic: '🛏️', x: 2, y: 30, size: 42 },
    { pic: '🪑', x: 52, y: 54, size: 22 },
    { pic: '🚪', x: 72, y: 2, size: 26 },
    { pic: '📦', x: 78, y: 62, size: 19 }
  ];
  const SPOTS = [
    { id: 'on the bed', he: 'על המיטה', x: 2, y: 38, w: 42, h: 22 },
    { id: 'under the bed', he: 'מתחת למיטה', x: 2, y: 62, w: 42, h: 26 },
    { id: 'on the chair', he: 'על הכיסא', x: 50, y: 50, w: 24, h: 22 },
    { id: 'under the chair', he: 'מתחת לכיסא', x: 50, y: 74, w: 24, h: 18 },
    { id: 'in the box', he: 'בתוך הקופסה', x: 76, y: 60, w: 23, h: 27 },
    { id: 'behind the door', he: 'מאחורי הדלת', x: 72, y: 3, w: 26, h: 34 }
  ];
  function hideGame() {
    document.body.classList.add('in-lesson');
    const rounds = K.shuffle(SPOTS).slice(0, 5);
    let at = 0, firstTry = 0;
    function round() {
      K.lessonBar(at / rounds.length);
      const s = rounds[at], line = `The owl is ${s.id}!`;
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🙈</span> ${kt('hide')} · ${at + 1}/${rounds.length}</p>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}: ${line}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">${line}</span>
          </div>
          <div class="k-room k-hide-room" aria-label="room">
            ${ROOM_OBJ.map(o => `<span class="k-room-obj" style="left:${o.x}%;top:${o.y}%;font-size:${o.size}cqw" aria-hidden="true">${o.pic}</span>`).join('')}
            ${SPOTS.map((p, i) => `<button class="k-spot" data-i="${i}" style="left:${p.x}%;top:${p.y}%;width:${p.w}%;height:${p.h}%" aria-label="${p.id}"></button>`).join('')}
          </div>
          ${owl(kt('hideTip'), 'small')}
        </div>`;
      const spots = SPOTS;
      const ask = () => sayEn(line, 0.8);
      $('#k-say').onclick = ask;
      setTimeout(ask, 300);
      K.view.querySelectorAll('.k-spot').forEach(b => {
        b.onclick = () => {
          const p = spots[+b.dataset.i];
          if (p === s) {
            K.view.querySelectorAll('.k-spot').forEach(x => { x.disabled = true; });
            b.classList.add('found');
            b.innerHTML = '<span class="k-peek-owl" aria-hidden="true">🦉</span>';
            K.Feel.right();
            if (!missed) firstTry++;
            owlMood('cheer');
            $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">${s.id}!</bdi> · ${s.he}`;
            say([['en', `Yes! ${line}`]]);
            setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 2000);
          } else {
            missed = true;
            b.classList.remove('puff'); void b.offsetWidth; b.classList.add('puff');
            K.Feel.wrong(b);
            owlMood('think');
            $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">${p.id}?</bdi> ${kt('tryAgain')}`;
            // say where the child looked, then where the owl really is - the two places side by side
            setTimeout(() => say([['en', `Not ${p.id}.`], ['en', line]], 0.8), 400);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= 5 ? 3 : firstTry >= 3 ? 2 : 1;
      Store.kidsFinish('hide', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🙈 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn(firstTry === rounds.length ? 'You found me every time!' : 'You found me!', 0.9);
      $('#k-again').onclick = hideGame;
    }
    round();
  }

  // ---------- Owl says: act it out (learning by moving) ----------
  // The owl gives a body command with a picture ("Touch your nose!"); a 3-second ring fills while the
  // child does it, then "I did it!". Nothing to get wrong: moving while hearing the words is the point.
  function simonGame() {
    document.body.classList.add('in-lesson');
    const cmds = K.shuffle(KIDS_SIMON).slice(0, 8);
    let at = 0, timer = null;
    function round() {
      clearTimeout(timer);
      K.lessonBar(at / cmds.length);
      const c = cmds[at];
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🤸</span> ${kt('simon')} · ${at + 1}/${cmds.length}</p>
          <button class="k-card k-meet k-simon" id="k-say" aria-label="${c.en}">
            <span class="k-pic" aria-hidden="true">${c.pic}</span>
            <span class="k-word en long">${c.en}</span>
            <span class="k-he he">${c.he}</span>
          </button>
          <div class="k-simon-ring" aria-hidden="true"><i></i></div>
          <button class="k-btn" id="k-did" disabled>✅ ${kt('simonDid')}</button>
          ${owl(kt('simonTip'), 'small')}
        </div>`;
      const say1 = () => say([['en', 'The owl says:'], ['en', c.en]], 0.85);
      $('#k-say').onclick = say1;
      setTimeout(say1, 250);
      owlMood('giggle');
      // the button wakes up (and bounces) once there was time to do the move
      timer = setTimeout(() => { const d = $('#k-did'); if (d) { d.disabled = false; d.classList.add('k-pulse-once'); } }, 2600);
      let done = false;   // one tap = one move (a double tap must not skip the next command)
      $('#k-did').onclick = () => {
        if (done) return;
        done = true;
        $('#k-did').disabled = true;
        K.Feel.right();
        owlMood('cheer');
        sayEn(pickOne(['Great!', 'Super!', 'Well done!', 'Yes!']), 1);
        at++;
        setTimeout(() => (at < cmds.length ? round() : end()), 700);
      };
    }
    function end() {
      K.endLesson(1);
      Store.kidsFinish('simon', 3, 15);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🤸 ${kt('done')}</h1>
            ${starsHtml(3, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('What a great mover!', 0.9);
      $('#k-again').onclick = simonGame;
    }
    round();
  }

  // ---------- word families: sort a mixed picture box into groups ----------
  // "Find all the animals!" A box of 8 pictures, 3 of them from one family. Each right tap says the word
  // and drops it in the basket; a picture from another family just says its own name (still learning).
  const FAMILIES = [
    { id: 'animals', en: 'animals', he: 'החיות', pic: '🐾' }, { id: 'food', en: 'food', he: 'האוכל', pic: '🍽️' },
    { id: 'toys', en: 'toys', he: 'הצעצועים', pic: '🧸' }, { id: 'go', en: 'things that go', he: 'כלי התחבורה', pic: '🚦' },
    { id: 'clothes', en: 'clothes', he: 'הבגדים', pic: '👚' }, { id: 'body', en: 'body parts', he: 'חלקי הגוף', pic: '🧍' }
  ];
  function famGame() {
    document.body.classList.add('in-lesson');
    const themeOf = id => (KIDS_THEMES.find(t => t.id === id) || { words: [] }).words.filter(w => w.pic && !/\s/.test(w.en));
    const fams = K.shuffle(FAMILIES.filter(f => themeOf(f.id).length >= 3)).slice(0, 4);
    let at = 0, misses = 0;
    function round() {
      K.lessonBar(at / fams.length);
      const f = fams[at];
      const pics = new Set();
      const take = (list, n) => K.shuffle(list).filter(w => !pics.has(w.pic) && pics.add(w.pic)).slice(0, n);
      const right = take(themeOf(f.id), 3);
      const others = take(FAMILIES.filter(o => o !== f).flatMap(o => themeOf(o.id)), 5);
      const box = K.shuffle([...right.map(w => ({ w, ok: true })), ...others.map(w => ({ w, ok: false }))]);
      const line = `Find all the ${f.en}!`;
      let found = 0;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🧺</span> ${kt('fam')} · ${at + 1}/${fams.length}</p>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}: ${line}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">${line}</span>
          </div>
          <p class="k-sub he">${f.pic} ${f.he} · <b id="k-fam-left">${kt('famLeft', { n: 3 })}</b></p>
          <div class="k-fam-box">${box.map((x, i) => `<button class="k-fam-pic" data-i="${i}" aria-label="${x.w.en}"><span aria-hidden="true">${x.w.pic}</span></button>`).join('')}</div>
          <div class="k-fam-basket" aria-live="polite"><span class="k-fam-bk" aria-hidden="true">🧺</span><span id="k-fam-in"></span></div>
          ${owl(kt('famTip'), 'small')}
        </div>`;
      const ask = () => say([['en', line]], 0.85);
      $('#k-say').onclick = ask;
      setTimeout(ask, 300);
      K.view.querySelectorAll('.k-fam-pic').forEach(b => {
        b.onclick = () => {
          const x = box[+b.dataset.i];
          if (x.ok) {
            b.disabled = true;
            b.classList.add('in');
            found++;
            K.Feel.right();
            sayEn(x.w.en, 0.85);
            $('#k-fam-in').insertAdjacentHTML('beforeend', `<i aria-label="${x.w.en}">${x.w.pic}</i>`);
            $('#k-fam-left').textContent = kt('famLeft', { n: 3 - found });
            if (found === 3) {
              K.view.querySelectorAll('.k-fam-pic').forEach(y => { y.disabled = true; });
              owlMood('cheer');
              $('.k-bubble').innerHTML = `<bdi class="k-q" dir="ltr" lang="en">${right.map(w => w.en).join(', ')}: ${f.en}!</bdi>`;
              setTimeout(() => say([['en', `Yes! ${right.map(w => w.en).join(', ')}. All ${f.en}!`]], 0.85), 900);
              setTimeout(() => { at++; at < fams.length ? round() : end(); }, 3600);
            }
          } else {
            if (!x.missed) { x.missed = true; misses++; }   // the same picture twice is one mistake
            b.classList.remove('puff'); void b.offsetWidth; b.classList.add('puff');
            K.Feel.wrong(b);
            owlMood('think');
            $('.k-bubble').innerHTML = `<bdi class="k-q" dir="ltr" lang="en">${x.w.en}?</bdi> ${kt('tryAgain')}`;
            sayEn(x.w.en, 0.85);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = misses <= 1 ? 3 : misses <= 4 ? 2 : 1;
      Store.kidsFinish('fam', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🧺 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('You sorted them all!', 0.9);
      $('#k-again').onclick = famGame;
    }
    round();
  }

  // ---------- feed the hungry monster: listen for the food, drag it to the mouth ----------
  // A friendly monster says "I want a banana!". Dragging (or tapping) the right food: chomp, "Yum!".
  // The wrong food: the monster shakes its head, says what it is, and asks again. Never a fail.
  function monsterGame() {
    document.body.classList.add('in-lesson');
    const food = (KIDS_THEMES.find(t => t.id === 'food') || { words: [] }).words;
    const rounds = K.shuffle(food).slice(0, 6);
    const nOpts = little() ? 3 : 4;
    let at = 0, firstTry = 0;
    function round() {
      K.lessonBar(at / rounds.length);
      const w = rounds[at], line = `I want ${/^[aeiou]/.test(w.en) ? 'an' : 'a'} ${w.en}!`;
      const say1 = ['milk', 'bread', 'grapes', 'pizza'].includes(w.en) ? `I want ${w.en === 'grapes' ? 'grapes' : 'some ' + w.en}!` : line;
      const opts = K.shuffle([w, ...K.shuffle(food.filter(x => x !== w)).slice(0, nOpts - 1)]);
      let missed = false, done = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">😋</span> ${kt('mon')} · ${at + 1}/${rounds.length}</p>
          <button class="k-monster" id="k-mon" aria-label="${kt('listen')}: ${say1}">
            <span class="k-mon-eyes" aria-hidden="true"><i></i><i></i></span>
            <span class="k-mon-mouth" aria-hidden="true"></span>
            <span class="k-mon-say en" lang="en">${say1}</span>
          </button>
          <div class="k-mon-food">${opts.map((o, i) => `<button class="k-mon-dish" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span></button>`).join('')}</div>
          ${owl(kt('monTip'), 'small')}
        </div>`;
      const mon = $('#k-mon');
      const ask = () => sayEn(say1, 0.85);
      mon.onclick = ask;
      setTimeout(ask, 300);
      const feed = (b, o) => {
        if (done) return;
        if (o === w) {
          done = true;
          const m = mon.getBoundingClientRect(), r = b.getBoundingClientRect();
          b.style.transition = 'transform .45s ease-in, opacity .45s';
          b.style.transform = `translate(${m.left + m.width / 2 - (r.left + r.width / 2)}px, ${m.top + m.height * .62 - (r.top + r.height / 2)}px) scale(.3)`;
          b.style.opacity = '0';
          K.view.querySelectorAll('.k-mon-dish').forEach(x => { x.disabled = true; });
          setTimeout(() => { mon.classList.add('chomp'); popSound(); setTimeout(popSound, 250); }, 380);
          K.Feel.right();
          if (!missed) { firstTry++; Store.kidsWordRight(w.id); }
          owlMood('cheer');
          $('.k-mon-say').textContent = `Yum! ${w.en}!`;
          $('.k-bubble').textContent = `${w.en} · ${w.he} 😋`;
          setTimeout(() => say([['en', `Yum yum! ${w.en}! Thank you!`]], 0.9), 450);
          setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 2300);
        } else {
          if (!missed) Store.kidsWordMiss(w.id);
          missed = true;
          b.style.transform = '';
          mon.classList.remove('nope'); void mon.offsetWidth; mon.classList.add('nope');
          K.Feel.wrong(b);
          owlMood('think');
          $('.k-bubble').innerHTML = `<bdi class="k-q" dir="ltr" lang="en">${o.en}?</bdi> ${kt('tryAgain')}`;
          say([['en', o.en === 'grapes' ? 'No, those are grapes.' : ['milk', 'bread'].includes(o.en) ? `No, that is ${o.en}.` : `No, that is ${/^[aeiou]/.test(o.en) ? 'an' : 'a'} ${o.en}.`], ['en', say1]], 0.85);
        }
      };
      K.view.querySelectorAll('.k-mon-dish').forEach(b => {
        const o = opts[+b.dataset.i];
        b.onclick = () => { if (b.dataset.dragged) { delete b.dataset.dragged; return; } feed(b, o); };
        b.onpointerdown = e => {
          if (b.disabled) return;
          const sx = e.clientX, sy = e.clientY;
          let moving = false;
          const move = ev => {
            const dx = ev.clientX - sx, dy = ev.clientY - sy;
            if (!moving && Math.hypot(dx, dy) < 8) return;
            if (!moving) { moving = true; b.classList.add('dragging'); sayEn(o.en); }
            b.style.transform = `translate(${dx}px, ${dy}px) scale(1.1)`;
          };
          const up = ev => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', up);
            window.removeEventListener('pointercancel', up);
            b.classList.remove('dragging');
            if (!moving) return;
            b.dataset.dragged = '1';
            const m = mon.getBoundingClientRect();
            const over = ev.clientX > m.left && ev.clientX < m.right && ev.clientY > m.top && ev.clientY < m.bottom;
            if (over) feed(b, o); else b.style.transform = '';
          };
          window.addEventListener('pointermove', move);
          window.addEventListener('pointerup', up);
          window.addEventListener('pointercancel', up);
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= 6 ? 3 : firstTry >= 4 ? 2 : 1;
      Store.kidsFinish('monster', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>😋 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('I am so full! Thank you!', 0.9);
      $('#k-again').onclick = monsterGame;
    }
    round();
  }

  // ---------- rhyme time: which picture ends with the same sound? ----------
  // The owl says "cat"; three pictures, one rhymes. The right one lights up with its partner and the shared
  // ending glows ("c-at, h-at!"). A wrong pick just hears both words, so the difference can be heard.
  function rhymeGame() {
    document.body.classList.add('in-lesson');
    const rounds = K.shuffle(KIDS_RHYMES).slice(0, 6).map(p => K.shuffle(p));
    let at = 0, firstTry = 0;
    // the rhyming part: from the last vowel group to the end ("cat" -> "at", "spoon" -> "oon", "snail" -> "ail")
    const tail = en => (en.match(/[aeiou]+[^aeiou]*e?$/) || [en])[0];
    const split = en => { const t = tail(en); return `${en.slice(0, en.length - t.length)}<b class="k-rh-end">${t}</b>`; };
    function round() {
      K.lessonBar(at / rounds.length);
      const [a, b] = rounds[at];
      const others = K.shuffle(KIDS_RHYMES.filter(p => !p.includes(a)).flat()).slice(0, 2);
      const opts = K.shuffle([b, ...others]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🎶</span> ${kt('rhyme')} · ${at + 1}/${rounds.length}</p>
          <button class="k-card k-meet k-rh-main" id="k-say" aria-label="${a.en}">
            <span class="k-pic" aria-hidden="true">${a.pic}</span>
            <span class="k-word en" lang="en" dir="ltr">${a.en}</span>
            <span class="k-he he">${a.he}</span>
          </button>
          <p class="k-tip en" lang="en">What rhymes with <b>${a.en}</b>?</p>
          <div class="k-opts">${opts.map((o, i) => `<button class="k-opt k-rh-opt" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span><small class="en" dir="ltr">${o.en}</small></button>`).join('')}</div>
          ${owl(kt('rhymeTip'), 'small')}
        </div>`;
      const ask = () => say([['en', a.en], ['en', `What rhymes with ${a.en}?`]], 0.8);
      $('#k-say').onclick = ask;
      setTimeout(ask, 300);
      K.view.querySelectorAll('.k-rh-opt').forEach(btn => {
        btn.onclick = () => {
          const o = opts[+btn.dataset.i];
          if (o === b) {
            K.view.querySelectorAll('.k-rh-opt').forEach(x => { x.disabled = true; });
            btn.classList.add('right');
            K.Feel.right();
            if (!missed) firstTry++;
            owlMood('cheer');
            $('.k-rh-main .k-word').innerHTML = split(a.en);
            btn.querySelector('small').innerHTML = split(b.en);
            $('.k-rh-main').classList.add('rhymed');
            $('.k-bubble').innerHTML = `<bdi dir="ltr">${a.en} - ${b.en}!</bdi> 🎶`;
            say([['en', `${a.en}, ${b.en}! They rhyme!`]], 0.8);
            setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 2600);
          } else {
            missed = true;
            btn.disabled = true;
            btn.classList.add('nope');   // greyed, like the other games: one less picture to think about
            K.Feel.wrong(btn);
            owlMood('think');
            $('.k-bubble').innerHTML = `<bdi dir="ltr">${a.en} - ${o.en}?</bdi> ${kt('tryAgain')}`;
            say([['en', `${a.en}, ${o.en}. No rhyme. Listen: ${a.en}.`]], 0.8);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= 6 ? 3 : firstTry >= 4 ? 2 : 1;
      Store.kidsFinish('rhyme', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🎶 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('Rhyme time is fun time!', 0.9);
      $('#k-again').onclick = rhymeGame;
    }
    round();
  }

  // ---------- dress for the weather: clothes words in context ----------
  // Three weathers, two things each. "It is cold! Put on your scarf!" - tap the scarf and it lands on the owl.
  // Sunglasses in the rain just make the owl giggle: a wrong pick is funny, never a fail.
  function wearGame() {
    document.body.classList.add('in-lesson');
    const all = KIDS_WEAR.flatMap(wx => wx.items);
    const steps = K.shuffle(KIDS_WEAR).flatMap(wx => wx.items.map(it => ({ wx, it })));
    let at = 0, firstTry = 0, wearing = [];
    function round() {
      K.lessonBar(at / steps.length);
      const { wx, it } = steps[at];
      if (at > 0 && steps[at - 1].wx !== wx) wearing = [];   // a new weather: start dressed fresh
      const line = `${wx.en} ${it.verb} ${it.en}!`;
      const opts = K.shuffle([it, ...K.shuffle(all.filter(x => !wx.items.includes(x))).slice(0, little() ? 1 : 2)]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🧣</span> ${kt('wear')} · ${at + 1}/${steps.length}</p>
          <div class="k-wear-scene wx-${wx.id}" aria-hidden="true">
            <span class="k-wear-sky">${wx.sky}</span>
            <div class="k-wear-owl"><span class="k-wear-me">🦉</span>${wearing.map(x => `<span class="k-wear-on s-${x.slot}">${x.pic}</span>`).join('')}</div>
          </div>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}: ${line}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">${line}</span>
          </div>
          <div class="k-opts">${opts.map((o, i) => `<button class="k-opt k-rh-opt" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span><small class="en" dir="ltr">${o.en}</small></button>`).join('')}</div>
          ${owl(`${wx.sky} ${wx.he}`, 'small')}
        </div>`;
      const ask = () => say([['en', wx.en], ['en', `${it.verb} ${it.en}!`]], 0.85);
      $('#k-say').onclick = ask;
      setTimeout(ask, 300);
      K.view.querySelectorAll('.k-opt').forEach(btn => {
        btn.onclick = () => {
          const o = opts[+btn.dataset.i];
          if (o === it) {
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            btn.classList.add('right');
            K.Feel.right();
            if (!missed) firstTry++;
            wearing.push(it);
            $('.k-wear-owl').insertAdjacentHTML('beforeend', `<span class="k-wear-on s-${it.slot} new">${it.pic}</span>`);
            owlMood('cheer');
            $('.k-bubble').textContent = `${it.en} · ${it.he} ✓`;
            say([['en', `Yes! ${it.en}! Thank you!`]], 0.9);
            setTimeout(() => { at++; at < steps.length ? round() : end(); }, 2000);
          } else {
            missed = true;
            btn.disabled = true;
            btn.classList.add('nope');
            K.Feel.wrong(btn);
            owlMood('giggle');
            $('.k-bubble').innerHTML = `${o.pic} <bdi class="k-q" dir="ltr" lang="en">${o.en}?</bdi> 🤭 ${wx.sky}`;
            say([['en', `${o.en}? Silly! ${wx.en}`]], 0.9);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= 6 ? 3 : firstTry >= 4 ? 2 : 1;
      Store.kidsFinish('wear', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🧣 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('Ready for any weather!', 0.9);
      $('#k-again').onclick = wearGame;
    }
    round();
  }

  // ---------- the owl calls: a first little dialogue ----------
  // A pretend phone call. The owl asks simple questions; the child answers by tapping a picture, hears the
  // whole answer sentence ("I am five."), and the owl reacts. Every answer is right: it is a conversation.
  let callTimer = null;
  function callGame() {
    document.body.classList.add('in-lesson');
    clearInterval(callTimer);
    const me = Store.kidsProfiles.find(p => p.active) || {};
    const name = /^[A-Za-z][A-Za-z '-]*$/.test(me.name || '') ? me.name : '';
    const NUM = ['three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const turns = [
      { q: 'Hello! This is the owl. What is your name?',
        opts: [{ pic: me.face || '🙂', label: name || 'My name is…', say: name ? `My name is ${name}.` : 'My name is…' }],
        react: a => name ? `Hello, ${name}! Nice to meet you!` : 'What a lovely name! Nice to meet you!' },
      { q: 'How old are you?', opts: NUM.map((n, i) => ({ pic: String(i + 3), label: n, say: `I am ${n}.` })), react: a => `${a.label[0].toUpperCase() + a.label.slice(1)}! Wow, so big!` },
      { q: 'What colour do you like?', opts: [['red', '🔴'], ['blue', '🔵'], ['green', '🟢'], ['yellow', '🟡'], ['pink', '💗']].map(([c, p]) => ({ pic: p, label: c, say: `I like ${c}.` })),
        react: a => `${a.label[0].toUpperCase() + a.label.slice(1)}! I like ${a.label} too!` },
      { q: 'What animal do you like?', opts: [['cats', '🐱'], ['dogs', '🐶'], ['fish', '🐟'], ['lions', '🦁']].map(([c, p]) => ({ pic: p, label: c, say: `I like ${c}.` })),
        react: a => `${a.label[0].toUpperCase() + a.label.slice(1)}? Me too!` },
      { q: 'I have to go now. Bye bye!', opts: [{ pic: '👋', label: 'Bye!', say: 'Bye bye, owl!' }], react: () => 'See you soon!' }
    ];
    let at = 0, secs = 0;
    // 1. the phone rings
    K.view.innerHTML = `
      <div class="k-wrap k-play k-call">
        <div class="k-call-ring" aria-hidden="true">🦉</div>
        <p class="k-call-who">${kt('callIn')}</p>
        <button class="k-call-btn" id="k-call-go" aria-label="${kt('callAnswer')}"><span aria-hidden="true">📞</span></button>
        <small class="k-call-label">${kt('callAnswer')}</small>
      </div>`;
    let rings = 0;
    const ring = () => { if (!$('.k-call-ring')) return clearInterval(ringT); note(988, .12); setTimeout(() => note(784, .12), 150); if (++rings > 8) clearInterval(ringT); };
    const ringT = setInterval(ring, 1400);
    ring();
    say([['he', kt('callIn')]]);
    $('#k-call-go').onclick = () => {
      clearInterval(ringT);
      K.Feel.right();
      callTimer = setInterval(() => { secs++; const t = $('#k-call-time'); if (t) t.textContent = `0:${String(secs).padStart(2, '0')}`; else clearInterval(callTimer); }, 1000);
      turn();
    };
    // 2. the conversation
    function turn() {
      K.lessonBar(at / turns.length);
      const t = turns[at];
      K.view.innerHTML = `
        <div class="k-wrap k-play k-call">
          <div class="k-call-top"><span class="k-call-av" aria-hidden="true">🦉</span><b>Owl</b><span id="k-call-time" class="k-call-time">0:${String(secs).padStart(2, '0')}</span></div>
          <div class="k-chat" aria-live="polite">
            <p class="k-msg owl en" lang="en">${t.q}</p>
          </div>
          ${Rec() ? `<div class="k-mic-row"><button class="k-mic" id="k-call-mic" aria-label="${kt('callMic')}"><span aria-hidden="true">🎤</span></button></div>` : ''}
          <div class="k-call-opts ${t.opts.length > 4 ? 'many' : ''}">${t.opts.map((o, i) => `<button class="k-call-opt" data-i="${i}" aria-label="${o.say}"><span aria-hidden="true">${o.pic}</span><small class="en">${o.label}</small></button>`).join('')}</div>
          ${owl(Rec() ? kt('callMic') : at === 0 && !name ? kt('callName') : kt('callTip'), 'small')}
        </div>`;
      setTimeout(() => sayEn(t.q, 0.85), 250);
      let answered = false;
      // what the child said -> one of the answers (or, for the name, the name itself)
      const fromVoice = alts => {
        const said = alts.map(a => a.toLowerCase().trim());
        if (at === 0) {
          const m = said.map(a => a.match(/(?:my name is|i am|i'm|name's)\s+([a-z][a-z '-]*)/i)).find(Boolean);
          const raw = m ? m[1] : alts[0].trim().split(/\s+/).slice(-1)[0];
          if (!raw || !/^[a-z][a-z'-]*$/i.test(raw.trim())) return null;
          const nm = raw.trim().split(/\s+/)[0].replace(/^./, c => c.toUpperCase());
          return { pic: '🎤', label: nm, say: `My name is ${nm}.`, voiceName: nm };
        }
        const words = said.join(' ').replace(/[.!?,]/g, ' ').split(/\s+/);
        return t.opts.find(o => {
          const k = o.label.toLowerCase().replace(/[!.]/g, '');
          return words.includes(k) || words.includes(k.replace(/s$/, '')) || words.includes(String(o.pic))
            || (k === 'bye' && words.some(w => /^(bye|goodbye)$/.test(w)));
        }) || null;
      };
      const mic = $('#k-call-mic');
      if (mic) mic.onclick = () => {
        if (answered) return;
        if (rec) { stopRec(); return; }
        K.Feel.prime();
        speechSynthesis.cancel();
        const r = new (Rec())();
        r.lang = 'en-US';
        r.interimResults = false;
        r.maxAlternatives = 5;
        rec = r;
        mic.classList.add('on');
        $('.k-bubble').textContent = kt('listening');
        r.onresult = e => {
          const o = fromVoice(Array.from(e.results[0]).map(a => a.transcript));
          if (o) { K.Feel.right(); $('.k-bubble').innerHTML = `👂 <bdi dir="ltr" lang="en">${esc(o.say)}</bdi> ✓`; answer(o, null); }
          else { owlMood('think'); $('.k-bubble').textContent = kt('callSorry'); }
        };
        r.onerror = () => {};
        r.onend = () => { mic.classList.remove('on'); if (rec === r) rec = null; };
        try { r.start(); } catch (err) { rec = null; mic.classList.remove('on'); }
      };
      K.view.querySelectorAll('.k-call-opt').forEach(b => {
        b.onclick = () => { stopRec(); answer(t.opts[+b.dataset.i], b); };
      });
      function answer(o, b) {
          if (answered) return;
          answered = true;
          K.view.querySelectorAll('.k-call-opt, #k-call-mic').forEach(x => { x.disabled = true; });
          if (b) { b.classList.add('right'); Sfx.tap(); }
          const chat = $('.k-chat');
          chat.insertAdjacentHTML('beforeend', `<p class="k-msg me en" lang="en">${o.say}</p>`);
          const react = o.voiceName ? `Hello, ${o.voiceName}! Nice to meet you!` : t.react(o);
          if (b) say([['en', o.say]], 0.85);   // a spoken answer was already said by the child
          setTimeout(() => {
            chat.insertAdjacentHTML('beforeend', `<p class="k-msg owl en" lang="en">${react}</p>`);
            owlMood('cheer');
            sayEn(react, 0.9);
          }, 1600);
          setTimeout(() => { at++; at < turns.length ? turn() : end(); }, b ? 3800 : 2600);
      }
    }
    function end() {
      clearInterval(callTimer);
      K.endLesson(1);
      Store.kidsFinish('call', 3, 15);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>📞 ${kt('callEnd')}</h1>
            ${starsHtml(3, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      $('#k-again').onclick = callGame;
    }
  }

  // ---------- count with me: "How many apples?" and "Give me three apples!" ----------
  // Two kinds of rounds take turns: counting a group (tap each thing, it lights up with its number word,
  // then pick the number) and making a group (tap things into a basket until there are N). The owl can
  // always count along. A wrong answer is counted out loud together, then asked again.
  function zooGame() {
    document.body.classList.add('in-lesson');
    const NUMS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    const THINGS = [['apple', 'apples', '🍎'], ['fish', 'fish', '🐟'], ['star', 'stars', '⭐'], ['balloon', 'balloons', '🎈'],
      ['duck', 'ducks', '🦆'], ['car', 'cars', '🚗'], ['flower', 'flowers', '🌸'], ['ball', 'balls', '⚽']];
    const max = little() ? 5 : 10;
    // 2 and up: one thing is nothing to count (and n repeats less often)
    const rounds = K.shuffle(THINGS).slice(0, 6).map((t, i) => ({ t, give: i % 2 === 1, n: 2 + Math.floor(Math.random() * (max - 1)) }));
    let at = 0, firstTry = 0;
    const word = (n, t) => `${NUMS[n - 1]} ${n === 1 ? t[0] : t[1]}`;
    function countAlong(els, then) {
      if (!els.length) { if (then) then(); return; }
      speakSeq(NUMS.slice(0, els.length), 1, i => {
        els.forEach(e => e.classList.remove('lit'));
        if (els[i] && els[i].isConnected) els[i].classList.add('lit');
      }, () => { els.forEach(e => e.classList.remove('lit')); if (then && els[0].isConnected) then(); });
    }
    function round() {
      K.lessonBar(at / rounds.length);
      const r = rounds[at];
      r.give ? giveRound(r) : howRound(r);
    }
    function next(ok) {
      if (ok) firstTry++;
      setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 1900);
    }
    // How many apples?
    function howRound({ t, n }) {
      const q = `How many ${t[1]}?`;
      const pool = [...new Set([n, n + 1, n - 1, n + 2].filter(x => x >= 1 && x <= max))].slice(0, 3);
      const opts = K.shuffle(pool.length >= 2 ? pool : [n, n + 1]);
      let counted = 0, missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🔢</span> ${kt('zoo')} · ${at + 1}/${rounds.length}</p>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}: ${q}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">${q}</span>
          </div>
          <div class="k-card k-count-box">${Array.from({ length: n }, (_, i) => `<button class="k-count-thing" aria-label="${i + 1}"><span aria-hidden="true">${t[2]}</span><b></b></button>`).join('')}</div>
          <div class="k-opts">${opts.map(o => `<button class="k-opt k-opt-num" data-n="${o}" aria-label="${NUMS[o - 1]}"><span aria-hidden="true">${o}</span><small class="en">${NUMS[o - 1]}</small></button>`).join('')}</div>
          <button class="k-btn ghost" id="k-along">🦉 ${kt('zooCount')}</button>
          ${owl(kt('zooTipHow'), 'small')}
        </div>`;
      const things = [...K.view.querySelectorAll('.k-count-thing')];
      const ask = () => sayEn(q, 0.85);
      $('#k-say').onclick = ask;
      setTimeout(ask, 300);
      $('#k-along').onclick = () => countAlong(things);
      things.forEach(el => {
        el.onclick = () => {
          if (el.classList.contains('done')) return;
          counted++;
          el.classList.add('done');
          el.querySelector('b').textContent = counted;
          sayEn(NUMS[counted - 1], 1);
        };
      });
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          const o = +b.dataset.n;
          if (o === n) {
            K.view.querySelectorAll('.k-opt, .k-count-thing, #k-along').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            K.Feel.right();
            owlMood('cheer');
            $('.k-bubble').textContent = `${word(n, t)}! ${t[2]}`;
            say([['en', `Yes! ${word(n, t)}!`]], 0.9);
            next(!missed);
          } else {
            missed = true;
            b.disabled = true;
            b.classList.add('nope');
            K.Feel.wrong(b);
            owlMood('think');
            $('.k-bubble').textContent = kt('tryAgain');
            countAlong(things, () => sayEn(q, 0.85));
          }
        };
      });
    }
    // Give me three apples!
    function giveRound({ t, n }) {
      const q = `Give me ${word(n, t)}!`;
      const total = Math.min(max + 2, Math.max(n + 3, 6));
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🧺</span> ${kt('zoo')} · ${at + 1}/${rounds.length}</p>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}: ${q}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">${q}</span>
          </div>
          <div class="k-card k-count-box" id="k-pile">${Array.from({ length: total }, () => `<button class="k-count-thing" aria-label="${t[0]}"><span aria-hidden="true">${t[2]}</span><b></b></button>`).join('')}</div>
          <div class="k-zoo-basket" id="k-basket" aria-live="polite"><span class="k-fam-bk" aria-hidden="true">🧺</span><span id="k-in"></span><b id="k-n" class="k-zoo-n">0</b></div>
          <button class="k-btn" id="k-done">✅ ${kt('zooDone')}</button>
          ${owl(kt('zooTipGive'), 'small')}
        </div>`;
      const ask = () => sayEn(q, 0.85);
      $('#k-say').onclick = ask;
      setTimeout(ask, 300);
      const inBasket = () => [...$('#k-in').children];
      const refresh = () => { $('#k-n').textContent = inBasket().length; };
      K.view.querySelectorAll('#k-pile .k-count-thing').forEach(el => {
        el.onclick = () => {
          if (el.classList.contains('gone')) return;
          el.classList.add('gone');
          const it = document.createElement('button');
          it.className = 'k-zoo-in';
          it.textContent = t[2];
          it.setAttribute('aria-label', t[0]);
          it.onclick = () => { it.remove(); el.classList.remove('gone'); refresh(); Sfx.tap(); };
          $('#k-in').appendChild(it);
          refresh();
          sayEn(NUMS[inBasket().length - 1] || String(inBasket().length), 1);
        };
      });
      $('#k-done').onclick = () => {
        const got = inBasket().length;
        if (got === n) {
          K.view.querySelectorAll('button').forEach(x => { x.disabled = true; });
          $('#k-basket').classList.add('right');
          K.Feel.right();
          owlMood('cheer');
          $('.k-bubble').textContent = `${word(n, t)}! ${t[2]}`;
          say([['en', `Thank you! ${word(n, t)}!`]], 0.9);
          next(!missed);
        } else {
          missed = true;
          K.Feel.wrong($('#k-basket'));
          owlMood('think');
          $('.k-bubble').textContent = got ? `${kt('tryAgain')} · 🧺 ${got}` : kt('tryAgain');
          countAlong(inBasket(), () => say([['en', got ? `That is ${NUMS[got - 1]}. I want ${NUMS[n - 1]}!` : `I want ${NUMS[n - 1]}!`]], 0.85));
        }
      };
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= 6 ? 3 : firstTry >= 4 ? 2 : 1;
      Store.kidsFinish('zoo', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🔢 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('You can count in English!', 0.9);
      $('#k-again').onclick = zooGame;
    }
    round();
  }

  // ---------- bedtime lullaby: good night to today's new words ----------
  // A slow music-box tune; each of today's new words drifts in with its picture and is sung softly
  // ("Good night, cat."). Hearing the day's words once more just before sleep helps them stick.
  // No words today yet? It uses this week's, then a few known ones.
  let lullTimers = [];
  function lullaby() {
    K.endLesson();
    lullTimers.forEach(clearTimeout);
    lullTimers = [];
    const today = Store.kidsWordsOn(Store.kidsDayKey(new Date()));
    const week = Store.kidsWeek().words;
    const known = KIDS_WORDS.filter(w => Store.kidsWordCount(w.id) > 0);
    // only things you can say good night to (animals, toys, family...), not colours, feelings or actions
    const THINGS = ['animals', 'food', 'family', 'body', 'toys', 'go', 'clothes', 'sky', 'home', 'shapes', 'school'];
    const thing = w => THINGS.includes(String(w.id).split('/')[0]) && !/\s/.test(w.en);
    const pick = list => list.filter(thing);
    const pool = [pick(today), pick(week), pick(known), pick(KIDS_WORDS).slice(0, 6)].find(l => l.length >= 3) || pick(KIDS_WORDS).slice(0, 6);
    const words = pool.slice(-8);
    const me = Store.kidsProfiles.find(p => p.active) || {};
    const name = /^[A-Za-z][A-Za-z '-]*$/.test(me.name || '') ? me.name : 'my friend';
    K.view.innerHTML = `
      <div class="k-wrap k-lull">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <div class="k-lull-sky" aria-hidden="true"><span class="k-lull-moon">🌙</span>${'<i></i>'.repeat(14)}</div>
        <h1 class="k-title">🎶 ${kt('lull')}</h1>
        <div class="k-lull-words">${words.map((w, i) => `<span class="k-lull-w" data-i="${i}"><span aria-hidden="true">${w.pic}</span><b class="en" lang="en">${w.en}</b></span>`).join('')}</div>
        <p class="k-lull-line en" lang="en" aria-live="polite"></p>
        <button class="k-btn ghost" id="k-lull-again">🔁 ${kt('lullPlay')}</button>
      </div>`;
    // a gentle original music-box phrase (pentatonic, slow)
    const TUNE = [523, 659, 784, 659, 587, 523, 440, 523];
    const later = (fn, ms) => lullTimers.push(setTimeout(() => { if ($('.k-lull')) fn(); }, ms));
    function sing() {
      lullTimers.forEach(clearTimeout);
      lullTimers = [];
      K.view.querySelectorAll('.k-lull-w').forEach(x => x.classList.remove('on', 'sleep'));
      $('.k-lull').classList.remove('done');
      const step = 2600;
      words.forEach((w, i) => {
        later(() => {
          note(TUNE[i % TUNE.length], 1.2);
          later(() => note(TUNE[(i + 2) % TUNE.length] / 2, 1.4), 600);
          const el = K.view.querySelector(`.k-lull-w[data-i="${i}"]`);
          el.classList.add('on');
          $('.k-lull-line').textContent = `Good night, ${w.en}.`;
          sayEn(`Good night, ${w.en}.`, 0.7);
          later(() => el.classList.add('sleep'), step - 300);
        }, 800 + i * step);
      });
      later(() => {
        note(392, 1.6); later(() => note(262, 2), 500);
        $('.k-lull-line').textContent = `Good night, ${name}. Sleep tight. 😴`;
        $('.k-lull').classList.add('done');
        say([['en', `Good night, ${name}. Sleep tight.`], ['he', kt('lullEnd')]], 0.7);
      }, 800 + words.length * step);
    }
    $('#k-lull-again').onclick = sing;
    sing();
  }

  // ---------- touch the teddy: body words on a real body ----------
  // A big drawn teddy bear; every part is a tap target. "Touch the teddy's nose!" - the right part glows
  // and the teddy giggles; another part just says its own name ("That is the ears!"), so a miss still teaches.
  const TEDDY = [
    { id: 'nose', he: 'אף' }, { id: 'eyes', he: 'עיניים' }, { id: 'ears', he: 'אוזניים' }, { id: 'mouth', he: 'פה' },
    { id: 'hands', he: 'ידיים' }, { id: 'feet', he: 'רגליים' }, { id: 'tummy', he: 'בטן' }, { id: 'head', he: 'ראש' }
  ];
  function teddySvg() {
    const P = (id, el) => `<g class="k-td-part" data-part="${id}" role="button" tabindex="0" aria-label="${id}">${el}</g>`;
    return `<svg class="k-teddy" viewBox="0 0 200 270" aria-label="teddy bear">
      ${P('feet', '<ellipse cx="68" cy="248" rx="26" ry="16"/><ellipse cx="132" cy="248" rx="26" ry="16"/>')}
      ${P('hands', '<ellipse cx="40" cy="178" rx="18" ry="32" transform="rotate(20 40 178)"/><ellipse cx="160" cy="178" rx="18" ry="32" transform="rotate(-20 160 178)"/>')}
      ${P('tummy', '<ellipse cx="100" cy="190" rx="52" ry="58"/><ellipse class="k-td-light" cx="100" cy="198" rx="30" ry="34"/>')}
      ${P('ears', '<circle cx="54" cy="40" r="24"/><circle cx="146" cy="40" r="24"/><circle class="k-td-light" cx="54" cy="40" r="12"/><circle class="k-td-light" cx="146" cy="40" r="12"/>')}
      ${P('head', '<circle cx="100" cy="84" r="58"/>')}
      ${P('eyes', '<circle class="k-td-dark" cx="78" cy="72" r="9"/><circle class="k-td-dark" cx="122" cy="72" r="9"/><circle class="k-td-shine" cx="81" cy="69" r="3"/><circle class="k-td-shine" cx="125" cy="69" r="3"/>')}
      <ellipse class="k-td-light k-td-muzzle" cx="100" cy="104" rx="28" ry="21"/>
      ${P('mouth', '<rect class="k-td-hitbox" x="80" y="110" width="40" height="18"/><path class="k-td-line" d="M86 114 Q100 128 114 114"/>')}
      ${P('nose', '<ellipse class="k-td-dark" cx="100" cy="98" rx="11" ry="8"/>')}
    </svg>`;
  }
  function teddyGame() {
    document.body.classList.add('in-lesson');
    const rounds = K.shuffle(TEDDY).slice(0, little() ? 5 : 7);
    let at = 0, firstTry = 0;
    function round() {
      K.lessonBar(at / rounds.length);
      const part = rounds[at], line = `Touch the teddy's ${part.id}!`;
      let missed = false, done = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🧸</span> ${kt('teddy')} · ${at + 1}/${rounds.length}</p>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}: ${line}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">${line}</span>
          </div>
          <div class="k-teddy-box">${teddySvg()}</div>
          ${owl(kt('teddyTip'), 'small')}
        </div>`;
      const ask = () => sayEn(line, 0.85);
      $('#k-say').onclick = ask;
      setTimeout(ask, 300);
      const tap = g => {
        if (done) return;
        const id = g.dataset.part, p = TEDDY.find(x => x.id === id);
        g.classList.remove('hit', 'nope'); void g.getBoundingClientRect();
        if (id === part.id) {
          done = true;
          g.classList.add('hit');
          $('.k-teddy').classList.add('giggle');
          K.Feel.right();
          if (!missed) firstTry++;
          owlMood('cheer');
          $('.k-bubble').textContent = `${part.id} · ${part.he} ✓`;
          say([['en', `Hee hee! My ${part.id}!`]], 0.95);
          setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 1900);
        } else {
          missed = true;
          g.classList.add('nope');
          owlMood('think');
          $('.k-bubble').textContent = `${id} · ${p.he}. ${kt('tryAgain')}`;
          say([['en', `That is the ${id}.`], ['en', line]], 0.9);
        }
      };
      K.view.querySelectorAll('.k-td-part').forEach(g => {
        g.addEventListener('click', e => { e.stopPropagation(); tap(g); });
        g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(g); } });
      });
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= rounds.length ? 3 : firstTry >= rounds.length - 2 ? 2 : 1;
      Store.kidsFinish('teddy', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🧸 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('Teddy says thank you! Big hug!', 0.9);
      $('#k-again').onclick = teddyGame;
    }
    round();
  }

  // ---------- picture talk: make a picture, hear a sentence ----------
  // A room with places (on the bed, under the table, in the box...) and a tray of friends. Put a friend
  // somewhere and the owl says the whole sentence: "The cat is on the bed!". Nothing is wrong; it is play
  // that turns words into sentences. Four friends placed = stars.
  const TALK_SPOTS = [
    { id: 'on the bed', he: 'על המיטה', x: 4, y: 36, w: 40, h: 16 }, { id: 'under the bed', he: 'מתחת למיטה', x: 4, y: 74, w: 40, h: 18 },
    { id: 'on the table', he: 'על השולחן', x: 54, y: 34, w: 30, h: 16 }, { id: 'under the table', he: 'מתחת לשולחן', x: 54, y: 72, w: 30, h: 20 },
    { id: 'in the box', he: 'בתוך הקופסה', x: 84, y: 62, w: 15, h: 22 }, { id: 'next to the door', he: 'ליד הדלת', x: 68, y: 4, w: 16, h: 28 }
  ];
  const TALK_FRIENDS = [['cat', '🐱', 'החתול'], ['dog', '🐶', 'הכלב'], ['duck', '🦆', 'הברווז'], ['ball', '⚽', 'הכדור'],
    ['teddy', '🧸', 'הדובי'], ['frog', '🐸', 'הצפרדע'], ['apple', '🍎', 'התפוח'], ['robot', '🤖', 'הרובוט']].map(([en, pic, he]) => ({ en, pic, he }));
  function talkGame() {
    K.endLesson();
    const placed = {};   // spot id -> friend
    let picked = null, count = 0, rewarded = false;
    K.view.innerHTML = `
      <div class="k-wrap">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <h1 class="k-title">🖼️ ${kt('talk')}</h1>
        <p class="k-talk-line en" lang="en" dir="ltr" aria-live="polite">&nbsp;</p>
        <div class="k-room k-talk-room">
          <span class="k-room-obj" style="left:5%;top:38%;font-size:6.6rem" aria-hidden="true">🛏️</span>
          <span class="k-room-obj k-talk-table" style="left:55%;top:48%" aria-hidden="true"></span>
          <span class="k-room-obj" style="left:85%;top:66%;font-size:2.8rem" aria-hidden="true">📦</span>
          <span class="k-room-obj" style="left:85%;top:6%;font-size:5.2rem" aria-hidden="true">🚪</span>
          ${TALK_SPOTS.map((p, i) => `<button class="k-spot k-talk-spot" data-i="${i}" data-spot="${p.id}" style="left:${p.x}%;top:${p.y}%;width:${p.w}%;height:${p.h}%" aria-label="${p.id}"></button>`).join('')}
        </div>
        <div class="k-talk-tray">${TALK_FRIENDS.map((f, i) => `<button class="k-talk-friend" data-i="${i}" aria-label="${f.en}"><span aria-hidden="true">${f.pic}</span><small class="en">${f.en}</small></button>`).join('')}</div>
        <button class="k-btn" id="k-talk-read">🦉 ${kt('talkRead')}</button>
        <button class="k-btn ghost" id="k-talk-clear">🧹 ${kt('talkClear')}</button>
        ${owl(kt('talkTip'), 'small')}
      </div>`;
    const sentence = (f, spot) => `The ${f.en} is ${spot.id}!`;
    const friends = [...K.view.querySelectorAll('.k-talk-friend')];
    friends.forEach(b => {
      b.onclick = () => {
        friends.forEach(x => x.classList.remove('picked'));
        picked = TALK_FRIENDS[+b.dataset.i];
        b.classList.add('picked');
        sayEn(picked.en, 0.9);
      };
    });
    K.view.querySelectorAll('.k-talk-spot').forEach(s => {
      s.onclick = () => {
        const spot = TALK_SPOTS[+s.dataset.i];
        if (!picked) {
          // nothing picked: tapping a full place says its sentence again, an empty one nudges to the tray
          if (placed[spot.id]) { const f = placed[spot.id]; $('.k-talk-line').textContent = sentence(f, spot); sayEn(sentence(f, spot), 0.85); }
          else { $('.k-bubble').textContent = kt('talkTip'); friends[0].classList.add('nudge'); setTimeout(() => friends[0].classList.remove('nudge'), 700); }
          return;
        }
        // a friend lives in one place at a time
        Object.keys(placed).forEach(k => { if (placed[k] === picked) { delete placed[k]; const o = K.view.querySelector(`.k-talk-spot[data-spot="${k}"]`); o.innerHTML = ''; o.setAttribute('aria-label', k); } });
        placed[spot.id] = picked;
        s.innerHTML = `<span class="k-talk-on" aria-hidden="true">${picked.pic}</span>`;
        s.setAttribute('aria-label', `${spot.id}: ${picked.en}`);
        const line = sentence(picked, spot);
        $('.k-talk-line').textContent = line;
        $('.k-bubble').textContent = `${picked.he} ${spot.he}!`;
        popSound();
        owlMood('giggle');
        sayEn(line, 0.85);
        friends.forEach(x => x.classList.remove('picked'));
        picked = null;
        if (++count >= 4 && !rewarded) {
          rewarded = true;
          Store.kidsFinish('talk', 3, 15);
          setTimeout(celebrate, 1600);
        }
      };
    });
    // read the whole picture, place by place
    $('#k-talk-read').onclick = () => {
      const lines = TALK_SPOTS.filter(p => placed[p.id]).map(p => sentence(placed[p.id], p));
      if (!lines.length) { $('.k-bubble').textContent = kt('talkTip'); return; }
      say(lines.map(l => ['en', l]), 0.85);
      $('.k-talk-line').textContent = lines.join(' ');
    };
    $('#k-talk-clear').onclick = talkGame;
    setTimeout(() => say([['he', kt('talkTip')]]), 300);
  }

  // ---------- animal band: a music toy that repeats animal words in rhythm ----------
  // Up to four animals on stage; a soft drum keeps the beat and each animal in turn bounces and sings its
  // sound. Adding one introduces it: "The cow says moo!". A toy to play with, nothing to get right.
  let bandTimer = null;
  function bandGame() {
    K.endLesson();
    clearInterval(bandTimer);
    const extra = [['duck', '🦆', 'quack'], ['sheep', '🐑', 'baa'], ['frog', '🐸', 'ribbit'], ['pig', '🐷', 'oink']];
    const animals = [...KIDS_WORDS.filter(w => w.says && w.en !== 'fish').map(w => ({ en: w.en, pic: w.pic, says: w.says })),
      ...extra.map(([en, pic, says]) => ({ en, pic, says }))];
    const stage = [];
    let beat = 0, added = 0, rewarded = false;
    K.view.innerHTML = `
      <div class="k-wrap">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <h1 class="k-title">🥁 ${kt('band')}</h1>
        <div class="k-band-stage" id="k-stage" aria-live="polite"></div>
        <p class="k-band-line en" lang="en" dir="ltr">&nbsp;</p>
        <button class="k-btn" id="k-band-go">▶️ ${kt('bandPlay')}</button>
        <div class="k-band-pick">${animals.map((a, i) => `<button class="k-band-animal" data-i="${i}" aria-label="${a.en}"><span aria-hidden="true">${a.pic}</span><small class="en">${a.en}</small></button>`).join('')}</div>
        ${owl(kt('bandTip'), 'small')}
      </div>`;
    const drawStage = () => {
      $('#k-stage').innerHTML = [0, 1, 2, 3].map(i => stage[i]
        ? `<button class="k-band-seat on" data-s="${i}" aria-label="${stage[i].en}"><span aria-hidden="true">${stage[i].pic}</span></button>`
        : `<span class="k-band-seat" aria-hidden="true">🎤</span>`).join('');
      K.view.querySelectorAll('.k-band-seat.on').forEach(b => {
        b.onclick = () => { stage.splice(+b.dataset.s, 1); Sfx.tap(); drawStage(); if (!stage.length) stop(); };
      });
    };
    const tick = () => {
      if (!$('#k-stage')) return stop();
      note(beat % 2 ? 196 : 131, .18);
      if (!stage.length) return;
      const i = beat % stage.length, a = stage[i];
      const seat = K.view.querySelector(`.k-band-seat[data-s="${i}"]`);
      if (seat) { seat.classList.remove('sing'); void seat.offsetWidth; seat.classList.add('sing'); }
      $('.k-band-line').textContent = `${a.says}!`;
      speechSynthesis.cancel();
      sayEn(`${a.says}!`, 1.1);
      beat++;
    };
    const play = () => { clearInterval(bandTimer); bandTimer = setInterval(tick, 1300); tick(); $('#k-band-go').innerHTML = `⏸️ ${kt('bandStop')}`; };
    function stop() { clearInterval(bandTimer); bandTimer = null; const g = $('#k-band-go'); if (g) g.innerHTML = `▶️ ${kt('bandPlay')}`; }
    $('#k-band-go').onclick = () => (bandTimer ? stop() : play());
    K.view.querySelectorAll('.k-band-animal').forEach(b => {
      b.onclick = () => {
        const a = animals[+b.dataset.i];
        if (stage.includes(a)) return;
        if (stage.length >= 4) stage.shift();
        stage.push(a);
        drawStage();
        stop();
        $('.k-band-line').textContent = `The ${a.en} says ${a.says}!`;
        owlMood('giggle');
        speechSynthesis.cancel();
        sayEn(`The ${a.en} says ${a.says}!`, 0.9);
        // start the music once the animal has been introduced
        setTimeout(() => { if ($('#k-stage') && !bandTimer) play(); }, 2200);
        if (++added >= 4 && !rewarded) { rewarded = true; Store.kidsFinish('band', 3, 15); }
      };
    });
    drawStage();
  }

  // ---------- a practice page to print: draw it and trace the word (off-screen practice) ----------
  // Six of this week's words (else known words), each with a small picture, an empty box to draw it in
  // and the English word in outline letters to trace. Reached from the parents corner only.
  function printPage(shuffle) {
    K.endLesson();
    if (Date.now() >= gateUntil) { location.hash = '#/kids'; return; }
    // things a child can draw (animals, food, toys...), one short word each
    const DRAW = ['animals', 'food', 'family', 'body', 'toys', 'go', 'clothes', 'sky', 'home', 'shapes', 'school'];
    const one = w => DRAW.includes(String(w.id).split('/')[0]) && !/\s/.test(w.en) && w.en.length <= 9;
    const week = Store.kidsWeek().words.filter(one);
    const known = KIDS_WORDS.filter(w => Store.kidsWordCount(w.id) > 0).filter(one);
    let pool = week.length >= 6 ? week : [...week, ...known.filter(w => !week.includes(w))];
    if (pool.length < 6) pool = [...pool, ...KIDS_WORDS.filter(one).filter(w => !pool.includes(w))];
    const words = (shuffle ? K.shuffle(pool) : pool.slice(-6)).slice(0, 6);
    const me = Store.kidsProfiles.find(p => p.active) || {};
    K.view.innerHTML = `
      <div class="k-wrap k-print">
        <a class="k-back k-noprint" href="#/kids/parents"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('pcTitle')}</a>
        <h1 class="k-title k-noprint">🖍️ ${kt('prTitle')}</h1>
        <p class="k-sub k-noprint">${kt('prSub')}</p>
        <div class="k-noprint k-print-btns">
          <button class="k-btn" id="k-pr-go">🖨️ ${kt('prPrint')}</button>
          <button class="k-btn ghost" id="k-pr-new">🔀 ${kt('prNew')}</button>
        </div>
        <section class="k-print-sheet" dir="ltr" lang="en">
          <header><b>🦉 My English words</b><span>${kt('prName')}: ${me.name && /^[A-Za-z]/.test(me.name) ? esc(me.name) : '________________'}</span></header>
          <div class="k-print-grid">${words.map(w => `
            <div class="k-print-cell">
              <span class="k-print-pic" aria-hidden="true">${w.pic}</span>
              <div class="k-print-draw"><small>${kt('prDraw')}</small></div>
              <p class="k-print-word">${w.en}</p>
              <p class="k-print-he" lang="he" dir="rtl">${w.he}</p>
            </div>`).join('')}</div>
          <footer>Lingua Kids · ${new Date().toLocaleDateString('en-GB')}</footer>
        </section>
      </div>`;
    $('#k-pr-go').onclick = () => window.print();
    $('#k-pr-new').onclick = () => printPage(true);
  }

  // ---------- the weekly treasure map ----------
  // Five stops along a path; each stop is three quick questions with this week's words, mixing
  // "hear it, tap the picture", "which word is this?" and "is this a cat? yes/no". The fifth stop opens
  // a treasure chest. Progress stays all week; a new map starts on Sunday.
  const TMAP_STOPS = ['🌴', '🌉', '⛰️', '🌋', '🏝️'];
  function tmapWords() {
    const DRAW = ['animals', 'food', 'family', 'body', 'toys', 'go', 'clothes', 'sky', 'home', 'shapes', 'school'];
    const ok = w => DRAW.includes(String(w.id).split('/')[0]) && !/\s/.test(w.en);
    const week = Store.kidsWeek().words.filter(ok);
    const known = KIDS_WORDS.filter(w => Store.kidsWordCount(w.id) > 0).filter(ok);
    let pool = [...week, ...known.filter(w => !week.includes(w))];
    if (pool.length < 6) pool = [...pool, ...KIDS_WORDS.filter(ok).filter(w => !pool.includes(w))].slice(0, 8);
    return pool.slice(0, 12);
  }
  function tmapScreen() {
    K.endLesson();
    const t = Store.kidsTmap();
    K.view.innerHTML = `
      <div class="k-wrap">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <h1 class="k-title">🗺️ ${kt('tmap')}</h1>
        <div class="k-tmap">
          <svg class="k-tmap-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M50 92 C 36 86, 24 80, 28 72 S 66 61, 62 55 S 25 44, 30 37 S 70 26, 66 20 S 52 11, 50 7"/></svg>
          ${TMAP_STOPS.map((pic, i) => {
            const state = i < t.done ? 'done' : i === t.done ? 'next' : 'lock';
            return `<button class="k-tmap-stop ${state} s${i}" data-i="${i}" ${state === 'next' ? '' : 'disabled'} aria-label="${kt('tmapStop', { n: i + 1 })}">
              <span aria-hidden="true">${state === 'done' ? '✅' : pic}</span><small>${i + 1}</small></button>`;
          }).join('')}
          <div class="k-tmap-chest ${t.done >= 5 ? 'open' : ''}" aria-hidden="true">${t.done >= 5 ? '💰' : '🧰'}</div>
        </div>
        ${owl(t.done >= 5 ? kt('tmapDone') : kt('tmapTip'), 'small')}
      </div>`;
    const next = K.view.querySelector('.k-tmap-stop.next');
    if (next) next.onclick = () => tmapStop(t.done);
  }
  function tmapStop(n) {
    document.body.classList.add('in-lesson');
    const words = tmapWords();
    const kinds = little() ? ['hear', 'yesno', 'hear'] : K.shuffle(['hear', 'read', 'yesno']);
    const qs = K.shuffle(words).slice(0, 3).map((w, i) => ({ w, kind: kinds[i] }));
    let at = 0;
    function q() {
      K.lessonBar(at / qs.length);
      const { w, kind } = qs[at];
      const others = K.shuffle(words.filter(x => x !== w && x.pic !== w.pic)).slice(0, 2);
      const head = `<p class="k-step"><span aria-hidden="true">${TMAP_STOPS[n]}</span> ${kt('tmapStop', { n: n + 1 })} · ${at + 1}/3</p>`;
      const good = () => {
        K.Feel.right();
        Store.kidsWordRight(w.id);
        owlMood('cheer');
        sayEn(`Yes! ${w.en}!`, 0.9);
        setTimeout(() => { at++; at < qs.length ? q() : done(); }, 1300);
      };
      const bad = b => { K.Feel.wrong(b); owlMood('think'); $('.k-bubble').textContent = kt('tryAgain'); };
      if (kind === 'hear') {
        const opts = K.shuffle([w, ...others]);
        K.view.innerHTML = `<div class="k-wrap k-play">${head}
          <div class="k-prompt"><button class="k-speaker" id="k-say" aria-label="${kt('listen')}"><span aria-hidden="true">🔊</span></button></div>
          <div class="k-opts">${opts.map((o, i) => `<button class="k-opt" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span></button>`).join('')}</div>
          ${owl(kt('listen'), 'small')}</div>`;
        const ask = () => sayEn(w.en, 0.85);
        $('#k-say').onclick = ask; setTimeout(ask, 300);
        K.view.querySelectorAll('.k-opt').forEach(b => { b.onclick = () => { if (opts[+b.dataset.i] === w) { K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; }); b.classList.add('right'); good(); } else bad(b); }; });
      } else if (kind === 'read') {
        const opts = K.shuffle([w, ...others]);
        K.view.innerHTML = `<div class="k-wrap k-play">${head}
          <div class="k-card k-meet"><span class="k-pic" aria-hidden="true">${w.pic}</span></div>
          <div class="k-tmap-words">${opts.map((o, i) => `<button class="k-btn ghost en" data-i="${i}" lang="en">${o.en}</button>`).join('')}</div>
          ${owl(kt('tmapIs') + '…?', 'small')}</div>`;
        K.view.querySelectorAll('.k-tmap-words button').forEach(b => { b.onclick = () => { const o = opts[+b.dataset.i]; sayEn(o.en, 0.9); if (o === w) { K.view.querySelectorAll('.k-tmap-words button').forEach(x => { x.disabled = true; }); b.classList.add('right'); good(); } else bad(b); }; });
      } else {
        const truth = Math.random() < .5, shown = truth ? w : others[0];
        const line = `Is it ${/^[aeiou]/.test(w.en) ? 'an' : 'a'} ${w.en}?`;
        K.view.innerHTML = `<div class="k-wrap k-play">${head}
          <div class="k-card k-meet"><span class="k-pic" aria-hidden="true">${shown.pic}</span><span class="k-word en" lang="en">${line}</span></div>
          <div class="k-tmap-yn"><button class="k-btn" data-a="yes">👍 Yes</button><button class="k-btn ghost" data-a="no">👎 No</button></div>
          ${owl(kt('tmapIs') + '…?', 'small')}</div>`;
        setTimeout(() => sayEn(line, 0.85), 300);
        K.view.querySelectorAll('.k-tmap-yn button').forEach(b => {
          b.onclick = () => {
            if ((b.dataset.a === 'yes') === truth) {
              K.view.querySelectorAll('.k-tmap-yn button').forEach(x => { x.disabled = true; });
              b.classList.add('right');
              if (!truth) { $('.k-bubble').textContent = `${shown.en}! · ${shown.he}`; sayEn(`No! It is ${/^[aeiou]/.test(shown.en) ? 'an' : 'a'} ${shown.en}!`, 0.9); setTimeout(() => { at++; at < qs.length ? q() : done(); }, 1700); K.Feel.right(); owlMood('cheer'); }
              else good();
            } else bad(b);
          };
        });
      }
    }
    function done() {
      K.endLesson(1);
      const d = Store.kidsTmapStep();
      if (d >= 5) {
        Store.kidsFinish('tmap', 3, 30);
        K.view.innerHTML = `<div class="k-wrap k-play k-end"><div class="k-end-card">
            <div class="k-tmap-open" aria-hidden="true">💰</div><h1>🏆 ${kt('tmapDone')}</h1>${starsHtml(3, 'big pop')}</div>
          <button class="k-btn" id="k-tmap-back">🗺️ ${kt('tmap')}</button><a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a></div>`;
        $('#k-tmap-back').onclick = tmapScreen;
        celebrate();
        sayEn('You found the treasure! Hooray!', 0.9);
      } else {
        Sfx.star(d);
        tmapScreen();   // the stop runs on the map's own address, so redraw the map directly
        setTimeout(() => sayEn(`Stop ${d}! Well done!`, 0.9), 300);
      }
    }
    q();
  }

  // ---------- sound safari: who says moo? ----------
  // A jungle with big leaves; an animal peeks over each leaf. The owl plays a sound ("moo! moo!") and the
  // child taps the leaf of the animal that makes it. The leaf swings away: "The cow says moo!".
  function safariGame() {
    document.body.classList.add('in-lesson');
    const extra = [['duck', '🦆', 'quack'], ['sheep', '🐑', 'baa'], ['frog', '🐸', 'ribbit'], ['pig', '🐷', 'oink']];
    const animals = [...KIDS_WORDS.filter(w => w.says && w.en !== 'fish').map(w => ({ en: w.en, pic: w.pic, says: w.says, id: w.id })),
      ...extra.map(([en, pic, says]) => ({ en, pic, says }))];
    const rounds = K.shuffle(animals).slice(0, 5);
    const n = little() ? 3 : 4;
    let at = 0, firstTry = 0;
    function round() {
      K.lessonBar(at / rounds.length);
      const a = rounds[at];
      const opts = K.shuffle([a, ...K.shuffle(animals.filter(x => x !== a)).slice(0, n - 1)]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🌿</span> ${kt('safari')} · ${at + 1}/${rounds.length}</p>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">${a.says}! ${a.says}!</span>
          </div>
          <div class="k-jungle ${n === 3 ? 'three' : ''}">${opts.map((o, i) => `
            <button class="k-leaf-spot" data-i="${i}" aria-label="${o.en}">
              <span class="k-peek-animal" aria-hidden="true">${o.pic}</span>
              <span class="k-leaf" aria-hidden="true">🌿</span>
            </button>`).join('')}</div>
          ${owl(bidiEn(kt('safariTip')), 'small')}
        </div>`;
      const ask = () => say([['en', `${a.says}! ${a.says}!`], ['en', `Who says ${a.says}?`]], 0.85);
      $('#k-say').onclick = ask;
      setTimeout(ask, 300);
      K.view.querySelectorAll('.k-leaf-spot').forEach(b => {
        b.onclick = () => {
          const o = opts[+b.dataset.i];
          if (o === a) {
            K.view.querySelectorAll('.k-leaf-spot').forEach(x => { x.disabled = true; });
            b.classList.add('found');
            K.Feel.right();
            if (!missed) { firstTry++; if (a.id) Store.kidsWordRight(a.id); }
            owlMood('cheer');
            $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">The ${a.en} says ${a.says}!</bdi>`;
            say([['en', `Yes! The ${a.en} says ${a.says}!`]], 0.9);
            setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 2200);
          } else {
            missed = true;
            b.classList.remove('rustle'); void b.offsetWidth; b.classList.add('rustle');
            K.Feel.wrong(b);
            owlMood('think');
            $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">The ${o.en} says ${o.says}.</bdi> ${kt('tryAgain')}`;
            say([['en', `The ${o.en} says ${o.says}.`], ['en', `Who says ${a.says}?`]], 0.9);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= 5 ? 3 : firstTry >= 3 ? 2 : 1;
      Store.kidsFinish('safari', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🌿 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('What a great safari!', 0.9);
      $('#k-again').onclick = safariGame;
    }
    round();
  }

  // ---------- my first English book: a page for every finished island ----------
  // A cover with the child's name, then one page per finished island with the words they know there.
  // "Read to me" reads the page ("I know cat, dog and bird!") and lights each word as it is said.
  function myBook(page = 0) {
    K.endLesson();
    const me = Store.kidsProfiles.find(p => p.active) || {};
    const pages = KIDS_THEMES.filter(th => Store.kidsHasSticker(th.id)).map(th => ({
      th, words: th.words.filter(w => Store.kidsWordCount(w.id) > 0 && !/\s/.test(w.en)).slice(0, 8)
    })).filter(p => p.words.length);
    const total = pages.length + 1;
    page = Math.max(0, Math.min(page, total - 1));
    const list = ws => ws.length === 1 ? ws[0] : `${ws.slice(0, -1).join(', ')} and ${ws[ws.length - 1]}`;
    let body;
    if (page === 0) {
      body = `
        <div class="k-mb-page k-mb-cover">
          <span class="k-mb-face" aria-hidden="true">${me.face || '🦉'}</span>
          <h2 class="en" lang="en">My first English book</h2>
          <p class="k-mb-by en" lang="en">by ${me.name && /^[A-Za-z]/.test(me.name) ? esc(me.name) : '<span aria-hidden="true">⭐</span> me <span aria-hidden="true">⭐</span>'}</p>
          ${pages.length ? `<p class="k-mb-n">📄 ${pages.length}</p>` : `<p class="k-mb-empty">${kt('mybookEmpty')}</p>`}
        </div>`;
    } else {
      const p = pages[page - 1];
      body = `
        <div class="k-mb-page" style="--c:${p.th.color}">
          <p class="k-mb-title"><span aria-hidden="true">${p.th.pic}</span> <b class="en" lang="en">${p.th.title}</b></p>
          <div class="k-mb-words">${p.words.map((w, i) => `<button class="k-mb-w" data-i="${i}" aria-label="${w.en}"><span aria-hidden="true">${w.pic}</span><b class="en" lang="en">${w.en}</b></button>`).join('')}</div>
          <p class="k-mb-line en" lang="en">I know ${list(p.words.map(w => w.en))}!</p>
        </div>`;
    }
    K.view.innerHTML = `
      <div class="k-wrap k-mybook">
        <a class="k-back" href="#/kids/stickers"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('album')}</a>
        <h1 class="k-title">📘 ${kt('mybook')}</h1>
        ${body}
        <div class="k-mb-nav" dir="ltr">
          <button class="k-btn ghost" id="k-mb-prev" ${page === 0 ? 'disabled' : ''} aria-label="previous">◀</button>
          <span>${kt('mybookPage', { a: page + 1, b: total })}</span>
          <button class="k-btn ghost" id="k-mb-next" ${page >= total - 1 ? 'disabled' : ''} aria-label="next">▶</button>
        </div>
        ${page > 0 ? `<button class="k-btn" id="k-mb-read">🔊 ${kt('mybookRead')}</button>` : ''}
        ${owl(page === 0 ? kt('mybookSub') : kt('meetTip'), 'small')}
      </div>`;
    const go = n => { Sfx.flip ? Sfx.flip() : Sfx.tap(); myBook(n); };
    $('#k-mb-prev').onclick = () => go(page - 1);
    $('#k-mb-next').onclick = () => go(page + 1);
    if (page === 0) { setTimeout(() => sayEn(`My first English book, by ${me.name && /^[A-Za-z]/.test(me.name) ? me.name : 'me'}!`, 0.9), 250); return; }
    const p = pages[page - 1], btns = [...K.view.querySelectorAll('.k-mb-w')];
    btns.forEach((b, i) => { b.onclick = () => { sayEn(p.words[i].en, 0.9); b.classList.remove('lit'); void b.offsetWidth; b.classList.add('lit'); }; });
    $('#k-mb-read').onclick = () => {
      speakSeq(['I know', ...p.words.map(w => w.en)], 0.9, i => {
        btns.forEach(b => b.classList.remove('lit'));
        if (i > 0 && btns[i - 1] && btns[i - 1].isConnected) btns[i - 1].classList.add('lit');
      }, () => btns.forEach(b => b.classList.remove('lit')));
    };
  }

  // ---------- shape hunt: shapes in everyday things ----------
  // "Find all the circles!" in a box of 6 things; each right tap draws the shape around the thing and says
  // "A clock is a circle!". A thing of another shape names its own shape ("A pizza is a triangle.").
  function shuntGame() {
    document.body.classList.add('in-lesson');
    const S = KIDS_SHAPE_HUNT;
    const order = K.shuffle(['circle', 'square', 'triangle']);
    let at = 0, misses = 0;
    const article = en => (/^[aeiou]/.test(en) ? 'an' : 'a');
    function round() {
      K.lessonBar(at / order.length);
      const shape = order[at], need = little() ? 2 : 3;
      const right = K.shuffle(S[shape].things).slice(0, need).map(([en, pic]) => ({ en, pic, shape }));
      const others = K.shuffle(Object.keys(S).filter(k => k !== shape).flatMap(k => S[k].things.map(([en, pic]) => ({ en, pic, shape: k })))).slice(0, 6 - need);
      const box = K.shuffle([...right, ...others]);
      let found = 0;
      const line = `Find all the ${shape}s!`;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🔍</span> ${kt('shunt')} · ${at + 1}/${order.length}</p>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}: ${line}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">${S[shape].mark} ${line}</span>
          </div>
          <p class="k-sub he">${S[shape].he} · <b id="k-sh-left">${kt('shuntLeft', { n: need })}</b></p>
          <div class="k-fam-box k-shunt-box">${box.map((x, i) => `<button class="k-fam-pic k-sh-thing sh-${x.shape}" data-i="${i}" aria-label="${x.en}"><span aria-hidden="true">${x.pic}</span></button>`).join('')}</div>
          ${owl(kt('shuntTip'), 'small')}
        </div>`;
      const ask = () => sayEn(line, 0.85);
      $('#k-say').onclick = ask;
      setTimeout(ask, 300);
      K.view.querySelectorAll('.k-sh-thing').forEach(b => {
        b.onclick = () => {
          const x = box[+b.dataset.i];
          if (x.shape === shape) {
            b.disabled = true;
            b.classList.add('got');
            found++;
            K.Feel.right();
            $('#k-sh-left').textContent = kt('shuntLeft', { n: need - found });
            $('.k-bubble').innerHTML = `${S[shape].mark} <bdi dir="ltr" lang="en">${x.en}: ${shape}!</bdi> · ${S[shape].he}`;
            sayEn(`${article(x.en)[0].toUpperCase() + article(x.en).slice(1)} ${x.en} is ${article(shape)} ${shape}!`, 0.9);
            if (found === need) {
              K.view.querySelectorAll('.k-sh-thing').forEach(y => { y.disabled = true; });
              owlMood('cheer');
              setTimeout(() => { at++; at < order.length ? round() : end(); }, 2200);
            }
          } else {
            misses++;
            b.classList.remove('puff'); void b.offsetWidth; b.classList.add('puff');
            K.Feel.wrong(b);
            owlMood('think');
            $('.k-bubble').innerHTML = `${S[x.shape].mark} <bdi dir="ltr" lang="en">${x.en}: ${x.shape}</bdi> · ${S[x.shape].he}`;
            sayEn(`${article(x.en)[0].toUpperCase() + article(x.en).slice(1)} ${x.en} is ${article(x.shape)} ${x.shape}.`, 0.9);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = misses <= 1 ? 3 : misses <= 3 ? 2 : 1;
      Store.kidsFinish('shunt', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🔍 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('You are a shape detective!', 0.9);
      $('#k-again').onclick = shuntGame;
    }
    round();
  }

  // ---------- brush your teeth with the owl: a 2-minute routine in English ----------
  // Eight 15-second steps ("Brush the top teeth!", "Now the left side!") with a mouth picture that lights
  // the part to brush, a soft beat and the owl counting "one, two, three...". A real daily routine in English.
  let brushTimer = null;
  const BRUSH = [
    { say: 'Brush the top teeth!', he: 'השיניים העליונות', zone: 'top' },
    { say: 'Brush the bottom teeth!', he: 'השיניים התחתונות', zone: 'bottom' },
    { say: 'Brush the front teeth!', he: 'השיניים הקדמיות', zone: 'front' },
    { say: 'Now the left side!', he: 'הצד השמאלי', zone: 'left' },
    { say: 'Now the right side!', he: 'הצד הימני', zone: 'right' },
    { say: 'Brush the back teeth!', he: 'השיניים האחוריות', zone: 'back' },
    { say: 'Brush your tongue!', he: 'הלשון', zone: 'tongue' },
    { say: 'Spit and rinse! All done!', he: 'יורקים ושוטפים', zone: 'all' }
  ];
  function mouthSvg() {
    const tooth = (row, i) => `<rect class="k-tooth" data-row="${row}" data-x="${i}" x="${24 + i * 19.5}" y="${row === 'top' ? 34 : 74}" width="17" height="${row === 'top' ? 20 : 18}" rx="5"/>`;
    return `<svg class="k-mouth" viewBox="0 0 200 130" aria-hidden="true">
      <ellipse cx="100" cy="64" rx="96" ry="60" class="k-lips"/>
      <ellipse cx="100" cy="64" rx="84" ry="48" class="k-mouth-in"/>
      ${Array.from({ length: 8 }, (_, i) => tooth('top', i)).join('')}
      ${Array.from({ length: 8 }, (_, i) => tooth('bottom', i)).join('')}
      <ellipse cx="100" cy="68" rx="34" ry="10" class="k-tongue"/>
    </svg>`;
  }
  function brushGame(fast) {
    K.endLesson();
    clearInterval(brushTimer);
    const STEP = fast ? 1200 : 15000;
    const NUMS = ['one', 'two', 'three', 'four', 'five'];
    K.view.innerHTML = `
      <div class="k-wrap k-brush">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <h1 class="k-title">🦷 ${kt('brush')}</h1>
        <div class="k-brush-stage">${mouthSvg()}<span class="k-brush-tool" aria-hidden="true"></span></div>
        <p class="k-brush-line en" lang="en" aria-live="polite">&nbsp;</p>
        <p class="k-brush-he he">&nbsp;</p>
        <div class="k-brush-bar" aria-hidden="true"><i></i></div>
        <button class="k-btn" id="k-brush-go">🦷 ${kt('brushGo')}</button>
        ${owl(kt('brushTip'), 'small')}
      </div>`;
    const light = zone => {
      K.view.querySelectorAll('.k-tooth').forEach(t => {
        const x = +t.dataset.x, row = t.dataset.row;
        const on = zone === 'all' || zone === row || (zone === 'front' && x >= 2 && x <= 5) || (zone === 'back' && (x <= 1 || x >= 6))
          || (zone === 'left' && x <= 3) || (zone === 'right' && x >= 4);
        t.classList.toggle('on', on);
      });
      $('.k-tongue').classList.toggle('on', zone === 'tongue');
      $('.k-brush-stage').dataset.zone = zone;
    };
    let at = -1, t0 = 0, counted = -1, beat = -1;
    function stop(done) {
      clearInterval(brushTimer); brushTimer = null;
      const go = $('#k-brush-go');
      if (!go) return;
      go.innerHTML = `🦷 ${kt('brushGo')}`;
      $('.k-brush-stage').classList.remove('brushing');
      if (done) {
        light('all');
        $('.k-brush-line').textContent = 'Clean, shiny teeth! ✨';
        $('.k-brush-he').textContent = kt('brushDone');
        Store.kidsFinish('brush', 3, 15);
        celebrate();
      }
    }
    function tick() {
      if (!$('.k-brush')) return stop();
      const el = Date.now() - t0, step = Math.floor(el / STEP), into = el - step * STEP;
      $('.k-brush-bar i').style.width = `${Math.min(100, el / (STEP * BRUSH.length) * 100)}%`;
      if (step >= BRUSH.length) return stop(true);
      if (step !== at) {
        at = step; counted = -1;
        const b = BRUSH[at];
        light(b.zone);
        $('.k-brush-line').textContent = b.say;
        $('.k-brush-he').textContent = b.he;
        speechSynthesis.cancel();
        sayEn(b.say, 0.85);
        note(523 + at * 40, .3);
      } else if (!fast) {
        // count along: one..five, a number every two seconds after the step is said
        const n = Math.floor((into - 3000) / 2000);
        if (into > 3000 && n < 5 && n > counted) { counted = n; sayEn(NUMS[n], 1); }
        const sec = Math.floor(el / 1000);
        if (sec !== beat) { beat = sec; note(at % 2 ? 262 : 330, .08); }
      }
    }
    $('#k-brush-go').onclick = () => {
      if (brushTimer) return stop();
      at = -1; t0 = Date.now();
      $('.k-brush-stage').classList.add('brushing');
      $('#k-brush-go').innerHTML = `⏹️ ${kt('brushStop')}`;
      brushTimer = setInterval(tick, 250);
      tick();
    };
  }

  // ---------- copy the owl's voice: pronunciation as a game ----------
  // The owl says a word as a squeaky mouse, a big bear, a sleepy sloth, a busy bee or in a whisper.
  // The child records the same word in the same voice and plays the two side by side. Copying a voice
  // makes children listen closely to the sounds, and being silly makes speaking English feel safe.
  const VOICES = [
    { id: 'mouse', pic: '🐭', he: 'קול של עכבר', pitch: 2, rate: 1, vol: 1 },
    { id: 'bear', pic: '🐻', he: 'קול של דוב', pitch: 0.1, rate: 0.75, vol: 1 },
    { id: 'sloth', pic: '🦥', he: 'לאט לאט', pitch: 0.9, rate: 0.45, vol: 1 },
    { id: 'bee', pic: '🐝', he: 'מהר מהר', pitch: 1.4, rate: 1.7, vol: 1 },
    { id: 'whisper', pic: '🤫', he: 'בלחישה', pitch: 1.2, rate: 0.7, vol: 0.35 }
  ];
  function sayVoice(text, v) {
    if (!('speechSynthesis' in window)) return;
    if (!enVoice) voices();
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    if (enVoice) u.voice = enVoice;
    u.pitch = v.pitch; u.rate = v.rate; u.volume = v.vol;
    speechSynthesis.speak(u);
  }
  // record a short clip and hand back its address (kept so it can be played again)
  async function recordClip(btn, done) {
    if (btn.classList.contains('on')) return;
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    K.Feel.prime();
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch (e) { $('.k-bubble').textContent = kt('recNo'); done(null); return; }   // no mic: the game goes on without recording
    recStream = stream;
    const chunks = [], mr = new MediaRecorder(stream);
    mr.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
    mr.onstop = () => {
      stopRecording();
      btn.classList.remove('on');
      done(URL.createObjectURL(new Blob(chunks, { type: mr.mimeType || 'audio/mp4' })));
    };
    btn.classList.add('on');
    $('.k-bubble').textContent = kt('recGo');
    mr.start();
    setTimeout(() => { if (mr.state === 'recording') mr.stop(); }, 2500);
  }
  function copyGame() {
    document.body.classList.add('in-lesson');
    const known = KIDS_WORDS.filter(w => Store.kidsWordCount(w.id) > 0 && !/\s/.test(w.en) && w.en.length <= 8);
    const words = K.shuffle(known.length >= 5 ? known : KIDS_WORDS.filter(w => !/\s/.test(w.en) && w.en.length <= 8)).slice(0, 5);
    const voicesOrder = K.shuffle(VOICES);
    let at = 0, mine = null;
    function round() {
      if (mine) { URL.revokeObjectURL(mine); mine = null; }
      K.lessonBar(at / words.length);
      const w = words[at], v = voicesOrder[at % voicesOrder.length];
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🎭</span> ${kt('copy')} · ${at + 1}/${words.length}</p>
          <div class="k-card k-meet k-copy-card-in">
            <span class="k-copy-voice" aria-hidden="true">${v.pic}</span>
            <span class="k-pic" aria-hidden="true">${w.pic}</span>
            <span class="k-word en" lang="en">${w.en}</span>
            <span class="k-he he">${v.he}</span>
          </div>
          <div class="k-copy-row">
            <button class="k-copy-btn" id="k-copy-owl"><span aria-hidden="true">🦉</span><small>${kt('copyOwl')}</small></button>
            ${canRecord() ? `<button class="k-mic" id="k-copy-rec" aria-label="${kt('copyRec')}"><span aria-hidden="true">🎤</span></button>` : ''}
            <button class="k-copy-btn" id="k-copy-me" disabled><span aria-hidden="true">🙂</span><small>${kt('copyMe')}</small></button>
          </div>
          <button class="k-btn" id="k-copy-next" ${canRecord() ? 'disabled' : ''}>${kt('copyNext')} <span aria-hidden="true">${isHe() ? '←' : '→'}</span></button>
          ${owl(canRecord() ? kt('copyTip') : bidiEn(kt('copyNoRec')), 'small')}
        </div>`;
      const owlSays = () => { sayVoice(w.en, v); const c = $('.k-copy-voice'); if (c) { c.classList.remove('talk'); void c.offsetWidth; c.classList.add('talk'); } };
      $('#k-copy-owl').onclick = owlSays;
      setTimeout(owlSays, 350);
      const me = $('#k-copy-me'), next = $('#k-copy-next'), rec = $('#k-copy-rec');
      if (rec) rec.onclick = () => recordClip(rec, url => {
        if (!url) { next.disabled = false; $('.k-bubble').innerHTML = bidiEn(kt('copyNoRec')); return; }
        if (mine) URL.revokeObjectURL(mine);
        mine = url;
        me.disabled = false;
        next.disabled = false;
        owlMood('giggle');
        $('.k-bubble').textContent = kt('recYou');
        // play the child, then the owl again, so the two can be heard one after the other
        const a = new Audio(mine);
        a.onended = () => setTimeout(owlSays, 300);
        a.play().catch(() => setTimeout(owlSays, 300));
      });
      me.onclick = () => { if (mine) new Audio(mine).play().catch(() => {}); };
      next.onclick = () => { K.Feel.right(); at++; at < words.length ? round() : end(); };
    }
    function end() {
      if (mine) { URL.revokeObjectURL(mine); mine = null; }
      K.endLesson(1);
      Store.kidsFinish('copy', 3, 15);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🎭 ${kt('done')}</h1>
            ${starsHtml(3, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayVoice('You are a great copycat!', VOICES[0]);
      $('#k-again').onclick = copyGame;
    }
    round();
  }

  // ---------- the opposite see-saw ----------
  // One word sits on the see-saw; three pictures wait below. The opposite makes the see-saw swing up and
  // down happily ("Big and small! Opposites!"); any other word makes it tip and slide back off.
  function seesawGame() {
    document.body.classList.add('in-lesson');
    const th = KIDS_THEMES.find(t => t.id === 'opposites');
    const pairs = [];
    for (let i = 0; i + 1 < th.words.length; i += 2) pairs.push([th.words[i], th.words[i + 1]]);
    const rounds = K.shuffle(pairs).slice(0, little() ? 4 : 6).map(p => (Math.random() < .5 ? p : [p[1], p[0]]));
    let at = 0, firstTry = 0;
    function round() {
      K.lessonBar(at / rounds.length);
      const [a, b] = rounds[at];
      const others = K.shuffle(th.words.filter(w => w !== a && w !== b)).slice(0, 2);
      const opts = K.shuffle([b, ...others]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">⚖️</span> ${kt('seesaw')} · ${at + 1}/${rounds.length}</p>
          <div class="k-seesaw">
            <div class="k-ss-plank" id="k-plank">
              <span class="k-ss-seat left"><span aria-hidden="true">${a.pic}</span><b class="en" lang="en">${a.en}</b></span>
              <span class="k-ss-seat right" id="k-seat"><span aria-hidden="true">❔</span></span>
            </div>
            <span class="k-ss-base" aria-hidden="true"></span>
          </div>
          <p class="k-tip en" lang="en">What is the opposite of <b>${a.en}</b>?</p>
          <div class="k-opts">${opts.map((o, i) => `<button class="k-opt k-rh-opt" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span><small class="en">${o.en}</small></button>`).join('')}</div>
          ${owl(kt('seesawTip'), 'small')}
        </div>`;
      const ask = () => say([['en', a.en], ['en', `What is the opposite of ${a.en}?`]], 0.85);
      setTimeout(ask, 300);
      const plank = $('#k-plank'), seat = $('#k-seat');
      K.view.querySelectorAll('.k-opt').forEach(btn => {
        btn.onclick = () => {
          const o = opts[+btn.dataset.i];
          seat.innerHTML = `<span aria-hidden="true">${o.pic}</span><b class="en" lang="en">${o.en}</b>`;
          plank.classList.remove('tip', 'swing'); void plank.offsetWidth;
          if (o === b) {
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            btn.classList.add('right');
            plank.classList.add('swing');
            K.Feel.right();
            if (!missed) { firstTry++; Store.kidsWordRight(a.id); Store.kidsWordRight(b.id); }
            owlMood('cheer');
            $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">${a.en} - ${b.en}</bdi> · ${a.he} - ${b.he}`;
            say([['en', `${a.en[0].toUpperCase() + a.en.slice(1)} and ${b.en}! Opposites!`]], 0.85);
            setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 2600);
          } else {
            missed = true;
            plank.classList.add('tip');
            K.Feel.wrong(btn);
            owlMood('think');
            $('.k-bubble').textContent = `${o.en}? ${kt('tryAgain')}`;
            sayEn(`${o.en}? Hmm, no.`, 0.9);
            setTimeout(() => { if (!plank.classList.contains('swing')) { seat.innerHTML = '<span aria-hidden="true">❔</span>'; plank.classList.remove('tip'); } }, 1100);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= rounds.length ? 3 : firstTry >= rounds.length - 2 ? 2 : 1;
      Store.kidsFinish('seesaw', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>⚖️ ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('Up and down, big and small. You know your opposites!', 0.9);
      $('#k-again').onclick = seesawGame;
    }
    round();
  }

  // ---------- my morning: daily-life actions in order ----------
  // "Good morning!" A timeline of the morning fills up step by step: the child picks what comes next
  // and the owl tells it with order words (First... Then... Next... After that... Finally...).
  function morningGame() {
    document.body.classList.add('in-lesson');
    const steps = KIDS_MORNING, done = [steps[0]];
    const ORDER = ['First', 'Then', 'Next', 'After that', 'Then', 'Next', 'Finally'];
    let missesAll = 0;
    function line(i) { return `${ORDER[i === steps.length - 1 ? 6 : i]}, ${steps[i].en}!`; }
    function round() {
      K.lessonBar((done.length - 1) / (steps.length - 1));
      const want = steps[done.length];
      // wrong choices are only clearly wrong: things already done, or 3+ steps ahead (families order the middle differently)
      const later = steps.slice(done.length + 3), before = steps.slice(0, done.length);
      const others = K.shuffle([...later, ...before]).slice(0, little() ? 1 : 2);
      const opts = K.shuffle([want, ...others]);
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🌅</span> Good morning!</p>
          <div class="k-morning-line" dir="ltr">${steps.map((s, i) => i < done.length
            ? `<span class="k-mo-slot done"><span aria-hidden="true">${s.pic}</span><small>${i + 1}</small></span>`
            : `<span class="k-mo-slot ${i === done.length ? 'now' : ''}"><span aria-hidden="true">${i === done.length ? '❔' : ''}</span><small>${i + 1}</small></span>`).join('')}</div>
          <p class="k-mo-last en" lang="en">${done.length === 1 ? 'First, wake up! ⏰' : line(done.length - 1)}</p>
          <p class="k-tip en" lang="en">What comes next?</p>
          <div class="k-opts">${opts.map((o, i) => `<button class="k-opt k-rh-opt" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span><small class="en">${o.en}</small></button>`).join('')}</div>
          ${owl(kt('morningTip'), 'small')}
        </div>`;
      setTimeout(() => say([['en', done.length === 1 ? 'Good morning! First, wake up!' : line(done.length - 1)], ['en', 'What comes next?']], 0.85), 300);
      K.view.querySelectorAll('.k-opt').forEach(btn => {
        btn.onclick = () => {
          const o = opts[+btn.dataset.i];
          if (o === want) {
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            btn.classList.add('right');
            K.Feel.right();
            done.push(want);
            const slot = K.view.querySelectorAll('.k-mo-slot')[done.length - 1];
            slot.className = 'k-mo-slot done pop';
            slot.innerHTML = `<span aria-hidden="true">${want.pic}</span><small>${done.length}</small>`;
            owlMood('cheer');
            $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">${want.en}</bdi> · ${want.he}`;
            sayEn(line(done.length - 1), 0.85);
            setTimeout(() => (done.length < steps.length ? round() : end()), 2200);
          } else {
            missesAll++;
            K.Feel.wrong(btn);
            owlMood('think');
            const i = steps.indexOf(o);
            $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">${o.en}</bdi>? ${i < done.length ? '✓' : '⏳'} ${kt('tryAgain')}`;
            sayEn(i < done.length ? `We did that already!` : `${o.en}? Not yet!`, 0.9);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = missesAll === 0 ? 3 : missesAll <= 2 ? 2 : 1;
      Store.kidsFinish('morning', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <div class="k-morning-line done" dir="ltr">${steps.map(s => `<span class="k-mo-slot done"><span aria-hidden="true">${s.pic}</span></span>`).join('')}</div>
            <h1>🌅 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      say(steps.map((s, i) => ['en', line(i)]), 0.95);
      $('#k-again').onclick = morningGame;
    }
    round();
  }

  // ---------- star of the week: a certificate to print (from the parents corner) ----------
  // The week in one proud page: the child's name, this week's new words as pictures, play days and stars.
  // Fridays and Saturdays the parents corner marks it as new, to close the week with a celebration.
  function certPage() {
    K.endLesson();
    if (Date.now() >= gateUntil) { location.hash = '#/kids'; return; }
    const me = Store.kidsProfiles.find(p => p.active) || {};
    const wk = Store.kidsWeek();
    const words = wk.words.filter(w => !/\s/.test(w.en)).slice(0, 10);
    const days = wk.days.filter(d => d.sec > 0).length;
    const start = wk.days[0].date, endD = wk.days[6].date;
    const fmt = d => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    let name = me.name && /^[A-Za-z][A-Za-z '-]*$/.test(me.name) ? me.name : '';
    const draw = () => {
      $('#k-cert-name').textContent = name || '________________';
    };
    K.view.innerHTML = `
      <div class="k-wrap k-print">
        <a class="k-back k-noprint" href="#/kids/parents"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('pcTitle')}</a>
        <h1 class="k-title k-noprint">🏅 ${kt('certTitle')}</h1>
        <p class="k-sub k-noprint">${kt('certSub')}</p>
        <label class="k-noprint k-cert-label">${kt('certName')}
          <input id="k-cert-input" dir="ltr" lang="en" maxlength="20" value="${esc(name)}" autocomplete="off">
        </label>
        <div class="k-noprint k-print-btns"><button class="k-btn" id="k-pr-go">🖨️ ${kt('prPrint')}</button></div>
        <section class="k-print-sheet k-cert" dir="ltr" lang="en">
          <div class="k-cert-ribbon" aria-hidden="true">🏅</div>
          <p class="k-cert-k">Certificate</p>
          <h2>English Star of the Week</h2>
          <p class="k-cert-for">This certificate goes to</p>
          <p class="k-cert-name" id="k-cert-name"></p>
          <p class="k-cert-text">for learning ${wk.words.length ? `<b>${wk.words.length}</b> new English word${wk.words.length === 1 ? '' : 's'}` : 'English'} and playing on <b>${days}</b> day${days === 1 ? '' : 's'} this week!</p>
          ${words.length ? `<div class="k-cert-words">${words.map(w => `<span><i aria-hidden="true">${w.pic}</i>${w.en}</span>`).join('')}</div>` : ''}
          <p class="k-cert-stars" aria-hidden="true">⭐ ⭐ ⭐</p>
          <footer><span>${fmt(start)} - ${fmt(endD)} ${endD.getFullYear()}</span><span>🦉 Lingua Kids</span></footer>
        </section>
      </div>`;
    draw();
    $('#k-cert-input').oninput = e => { name = e.target.value.replace(/[^A-Za-z '-]/g, '').slice(0, 20); e.target.value = name; draw(); };
    $('#k-pr-go').onclick = () => window.print();
  }

  // ---------- peekaboo for the littlest (2-3) ----------
  // One huge picture behind two hands. A tap anywhere opens the hands: "Peekaboo! A cat!" Another tap
  // hides the next one. Nothing to choose, nothing to get wrong: just cause, effect and a word.
  function peekabooGame() {
    document.body.classList.add('in-lesson');
    const ids = ['animals', 'toys', 'food', 'family'];
    const pool = KIDS_WORDS.filter(w => ids.includes(String(w.id).split('/')[0]) && !/\s/.test(w.en));
    const words = K.shuffle(pool).slice(0, 8);
    let at = 0, open = false, busy = false;
    K.view.innerHTML = `
      <div class="k-wrap k-play k-pkb" id="k-pkb" role="button" tabindex="0" aria-label="${kt('peekabooTip')}">
        <div class="k-pkb-stage">
          <span class="k-pkb-pic" id="k-pkb-pic" aria-hidden="true"></span>
          <span class="k-pkb-hand l" aria-hidden="true">🤚</span><span class="k-pkb-hand r" aria-hidden="true">🤚</span>
        </div>
        <p class="k-pkb-word en" id="k-pkb-word" lang="en" aria-live="polite">&nbsp;</p>
        ${owl(kt('peekabooTip'), 'small')}
      </div>`;
    const box = $('#k-pkb'), stage = $('.k-pkb-stage');
    const hide = () => {
      const w = words[at];
      K.lessonBar(at / words.length);
      stage.classList.remove('open');
      $('#k-pkb-word').innerHTML = '&nbsp;';
      setTimeout(() => { $('#k-pkb-pic').textContent = w.pic; }, 350);   // swap the picture while the hands are closed
      open = false;
      sayEn('Where is it?', 0.85);
    };
    const reveal = () => {
      const w = words[at];
      stage.classList.add('open');
      open = true;
      const art = w.id && w.id.startsWith('family/') ? '' : (/^[aeiou]/.test(w.en) ? 'an ' : 'a ');
      $('#k-pkb-word').textContent = `Peekaboo! ${w.en[0].toUpperCase() + w.en.slice(1)}!`;
      popSound();
      owlMood('giggle');
      say([['en', `Peekaboo! ${art}${w.en}!`]], 0.8);
      Store.kidsWordRight && w.id && Store.kidsWordRight(w.id);
    };
    const tap = () => {
      if (busy) return;
      busy = true; setTimeout(() => { busy = false; }, 900);
      if (!open) return reveal();
      at++;
      if (at >= words.length) return end();
      hide();
    };
    box.addEventListener('click', tap);
    box.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(); } });
    $('#k-pkb-pic').textContent = words[0].pic;
    setTimeout(() => sayEn('Where is it?', 0.85), 300);
    function end() {
      K.endLesson(1);
      Store.kidsFinish('peekaboo', 3, 10);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🙈 ${kt('done')}</h1>
            ${starsHtml(3, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('Bye bye! Peekaboo!', 0.85);
      $('#k-again').onclick = peekabooGame;
    }
  }

  // ---------- parent story recordings ----------
  // Parents record themselves reading each story page; the recordings stay on this device (IndexedDB)
  // and play in the story instead of the synthetic voice. A familiar voice reading English is powerful.
  const ParentVoice = (() => {
    let dbp = null;
    const db = () => dbp || (dbp = new Promise((res, rej) => {
      if (!('indexedDB' in window)) return rej(new Error('no idb'));
      const r = indexedDB.open('lingua-kids-voices', 1);
      r.onupgradeneeded = () => r.result.createObjectStore('rec');
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    }));
    const tx = (mode, fn) => db().then(d => new Promise((res, rej) => {
      const t = d.transaction('rec', mode), st = t.objectStore('rec'), out = fn(st);
      t.oncomplete = () => res(out && out.result);
      t.onerror = () => rej(t.error);
    }));
    return {
      get: key => tx('readonly', st => st.get(key)).catch(() => null),
      put: (key, blob) => tx('readwrite', st => st.put(blob, key)),
      del: key => tx('readwrite', st => st.delete(key)),
      keys: () => tx('readonly', st => st.getAllKeys()).catch(() => [])
    };
  })();
  let parentAudio = null;
  function stopParent() { if (parentAudio) { parentAudio.pause(); URL.revokeObjectURL(parentAudio.src); parentAudio = null; } }
  function playParent(blob) {
    stopParent();
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    parentAudio = new Audio(URL.createObjectURL(blob));
    parentAudio.play().catch(() => {});
  }
  let rsRecorder = null;
  function recStoryScreen(storyId) {
    K.endLesson();
    stopParent();
    if (Date.now() >= gateUntil) { location.hash = '#/kids'; return; }
    ParentVoice.keys().then(keys => {
      keys = keys || [];
      if (!storyId) {
        K.view.innerHTML = `
          <div class="k-wrap">
            <a class="k-back" href="#/kids/parents"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('pcTitle')}</a>
            <h1 class="k-title">🎙️ ${kt('rsTitle')}</h1>
            <p class="k-sub">${kt('rsSub')}</p>
            <div class="k-rs-list">${KIDS_STORIES.map(st => {
              const n = st.pages.filter((_, i) => keys.includes(`${st.id}:${i}`)).length;
              return `<button class="k-abc-card k-rs-story" data-id="${st.id}"><span class="k-story-books" aria-hidden="true">${st.pic}</span>
                <span class="grow"><b class="en">${st.title}</b><small>${kt('rsCount', { n, m: st.pages.length })}</small></span>${n === st.pages.length ? '✅' : ''}</button>`;
            }).join('')}</div>
          </div>`;
        K.view.querySelectorAll('.k-rs-story').forEach(b => { b.onclick = () => recStoryScreen(b.dataset.id); });
        return;
      }
      const st = KIDS_STORIES.find(x => x.id === storyId);
      K.view.innerHTML = `
        <div class="k-wrap">
          <button class="k-back" id="k-rs-back"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('rsTitle')}</button>
          <h1 class="k-title en">${st.pic} ${st.title}</h1>
          ${canRecord() ? '' : `<p class="k-pc-tip">⚠️ ${kt('rsNoMic')}</p>`}
          <div class="k-rs-pages">${st.pages.map(([scene, en], i) => {
            const has = keys.includes(`${st.id}:${i}`);
            return `<div class="k-rs-page ${has ? 'has' : ''}" data-i="${i}">
              <span class="k-rs-scene" aria-hidden="true">${scene}</span>
              <p class="en" lang="en">${en}</p>
              <div class="k-rs-btns">
                ${canRecord() ? `<button class="k-chip k-rs-rec">🔴 ${kt('rsRec')}</button>` : ''}
                <button class="k-chip k-rs-play" ${has ? '' : 'disabled'}>▶️ ${kt('rsPlay')}</button>
                <button class="k-chip k-rs-del" ${has ? '' : 'disabled'}>🗑️ ${kt('rsDel')}</button>
              </div>
            </div>`;
          }).join('')}</div>
        </div>`;
      $('#k-rs-back').onclick = () => recStoryScreen();
      K.view.querySelectorAll('.k-rs-page').forEach(row => {
        const key = `${st.id}:${row.dataset.i}`;
        const rec = row.querySelector('.k-rs-rec'), play = row.querySelector('.k-rs-play'), del = row.querySelector('.k-rs-del');
        play.onclick = () => ParentVoice.get(key).then(b => b && playParent(b));
        del.onclick = () => ParentVoice.del(key).then(() => recStoryScreen(st.id));
        if (rec) rec.onclick = async () => {
          if (rsRecorder) { if (rsRecorder.state === 'recording') rsRecorder.stop(); return; }   // second tap stops
          stopParent();
          let stream;
          try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
          catch (e) { row.querySelector('p').insertAdjacentHTML('afterend', `<small class="k-pc-tip">⚠️ ${kt('rsNoMic')}</small>`); return; }
          const chunks = [], mr = new MediaRecorder(stream);
          rsRecorder = mr;
          mr.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
          mr.onstop = () => {
            stream.getTracks().forEach(t => t.stop());
            rsRecorder = null;
            const blob = new Blob(chunks, { type: mr.mimeType || 'audio/mp4' });
            ParentVoice.put(key, blob).then(() => recStoryScreen(st.id));
          };
          rec.innerHTML = `⏹️ ${kt('rsStop')}`;
          rec.classList.add('on');
          mr.start();
          setTimeout(() => { if (mr.state === 'recording') mr.stop(); }, 15000);   // a page is short: 15 s at most
        };
      });
    });
  }

  // ---------- colour by word: reading colour words (the listening colouring game's reading twin) ----------
  // An underwater picture; every part has its colour written on it ("blue", "orange"). The paint pots
  // show only colours, so the child has to read the word. A pot says its name when tapped (help, not the answer).
  const CBW = [
    { id: 'water', col: 'blue', shape: '<rect x="0" y="0" width="300" height="230"/>', tx: 150, ty: 30 },
    { id: 'sand', col: 'yellow', shape: '<path d="M0 230 Q75 210 150 228 T300 222 V300 H0 Z"/>', tx: 70, ty: 272 },
    { id: 'fish', col: 'orange', shape: '<ellipse cx="140" cy="120" rx="62" ry="38"/>', tx: 136, ty: 128 },
    { id: 'tail', col: 'red', shape: '<path d="M198 120 L250 88 L250 152 Z"/>', tx: 232, ty: 125 },
    { id: 'plant', col: 'green', shape: '<path d="M250 230 C230 190 270 175 250 140 C280 170 262 200 276 230 Z"/>', tx: 262, ty: 205 },
    { id: 'star', col: 'pink', shape: '<path d="M200 248 L207 262 L222 263 L211 273 L215 288 L200 280 L185 288 L189 273 L178 263 L193 262 Z"/>', tx: 200, ty: 300 }
  ];
  function cbwGame() {
    document.body.classList.add('in-lesson');
    const pots = K.shuffle([...new Set(CBW.map(p => p.col)), 'purple', 'black']);
    let brush = null, done = 0, misses = 0;
    K.lessonBar(0);
    K.view.innerHTML = `
      <div class="k-wrap k-play">
        <p class="k-step"><span aria-hidden="true">🐠</span> ${kt('cbw')}</p>
        <div class="k-card k-paint-card">
          <svg class="k-paint k-cbw" viewBox="0 0 300 310" role="img" aria-label="${kt('cbw')}">
            ${CBW.map(p => `<g class="k-part" data-part="${p.id}" tabindex="0" role="button" aria-label="${p.col}">${p.shape.replace('/>', ' fill="#ffffff"/>')}</g>`).join('')}
            <circle cx="105" cy="110" r="6" fill="#1f2937" pointer-events="none"/>
            ${CBW.map(p => `<text class="k-cbw-word" data-for="${p.id}" x="${p.tx}" y="${p.ty}" text-anchor="middle" pointer-events="none">${p.col}</text>`).join('')}
          </svg>
        </div>
        <div class="k-paints">${pots.map(c => `<button class="k-paint-pot k-cbw-pot" data-c="${c}" style="--p:${PAINT[c]}" aria-label="${c}"><i></i></button>`).join('')}</div>
        ${owl(kt('cbwTip'), 'small')}
      </div>`;
    setTimeout(() => sayEn('Read the colour words and paint the picture!', 0.85), 300);
    K.view.querySelectorAll('.k-cbw-pot').forEach(b => {
      b.onclick = () => {
        brush = b.dataset.c;
        K.view.querySelectorAll('.k-cbw-pot').forEach(x => x.classList.toggle('picked', x === b));
        sayEn(brush, 0.9);
      };
    });
    const paint = g => {
      const p = CBW.find(x => x.id === g.dataset.part);
      if (g.classList.contains('done')) return;
      if (!brush) { $('.k-bubble').textContent = kt('cbwTip'); return; }
      if (brush === p.col) {
        g.classList.add('done');
        g.querySelector('path, rect, ellipse').setAttribute('fill', PAINT[p.col]);
        K.view.querySelector(`.k-cbw-word[data-for="${p.id}"]`).classList.add('done');
        K.Feel.right();
        done++;
        K.lessonBar(done / CBW.length);
        $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">${p.col}!</bdi> ✓`;
        sayEn(`${p.col}!`, 0.9);
        if (done === CBW.length) setTimeout(end, 1200);
      } else {
        misses++;
        K.Feel.wrong(g);
        owlMood('think');
        $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">${brush}? ${kt('tryAgain')}</bdi>`;
        sayEn(`This one says ${p.col}.`, 0.85);
      }
    };
    K.view.querySelectorAll('.k-cbw .k-part').forEach(g => {
      g.addEventListener('click', () => paint(g));
      g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); paint(g); } });
    });
    function end() {
      K.endLesson(1);
      const stars = misses <= 1 ? 3 : misses <= 3 ? 2 : 1;
      Store.kidsFinish('cbw', stars, 10 + stars * 5);
      const pic = K.view.querySelector('.k-paint-card').outerHTML;
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}${pic}
            <h1>🐠 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('What a beautiful fish! You can read colours!', 0.9);
      $('#k-again').onclick = cbwGame;
    }
  }

  // ---------- how do they feel? feelings in little stories ----------
  // A tiny situation ("The bear's ice cream fell down."), then "How does the bear feel?" with feeling
  // faces. After the answer the owl says it in a sentence and shows something kind to do: empathy + words.
  function feelStoryGame() {
    document.body.classList.add('in-lesson');
    const feels = (KIDS_THEMES.find(t => t.id === 'feelings') || { words: [] }).words;
    const faceOf = en => (feels.find(w => w.en === en) || {}).pic;
    const rounds = K.shuffle(KIDS_FEEL_STORIES).slice(0, 5);
    let at = 0, firstTry = 0;
    function round() {
      K.lessonBar(at / rounds.length);
      const r = rounds[at];
      const who = r.en.match(/The (\w+)/) ? r.en.match(/The (\w+)/)[1] : 'friend';
      const opts = K.shuffle([r.feel, ...K.shuffle(KIDS_FEEL_STORIES.map(x => x.feel).filter(f => f !== r.feel)).slice(0, little() ? 1 : 2)]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🤗</span> ${kt('feelst')} · ${at + 1}/${rounds.length}</p>
          <div class="k-card k-page">
            <div class="k-scene" aria-hidden="true">${r.scene}</div>
            <p class="k-sentence en" lang="en">${r.en}</p>
            <p class="k-he he" lang="he">${r.he}</p>
          </div>
          <p class="k-tip en" lang="en">How does the ${who} feel?</p>
          <div class="k-opts">${opts.map(f => `<button class="k-opt k-rh-opt" data-f="${f}" aria-label="${f}"><span aria-hidden="true">${faceOf(f) || ''}</span><small class="en">${f}</small></button>`).join('')}</div>
          ${owl(kt('feelstTip'), 'small')}
        </div>`;
      setTimeout(() => say([['en', r.en], ['en', `How does the ${who} feel?`]], 0.85), 300);
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          if (b.dataset.f === r.feel) {
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; });
            b.classList.add('right');
            K.Feel.right();
            if (!missed) firstTry++;
            const w = feels.find(x => x.en === r.feel);
            if (w && !missed) Store.kidsWordRight(w.id);
            owlMood(r.feel === 'happy' || r.feel === 'surprised' ? 'cheer' : 'love');
            $('.k-scene').textContent = r.scene.replace(/^(\S+)/u, m => m) + ' ' + r.face;
            $('.k-tip').innerHTML = `<b>The ${who} is ${r.feel}.</b> <span aria-hidden="true">${r.kpic}</span> ${r.kind}`;
            $('.k-bubble').textContent = `${r.kindHe} ${r.kpic}`;
            say([['en', `Yes. The ${who} is ${r.feel}.`], ['en', r.kind]], 0.85);
            setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 4200);
          } else {
            missed = true;
            K.Feel.wrong(b);
            owlMood('think');
            // the face appears as a hint: feelings are read in faces
            $('.k-scene').textContent = `${r.scene} ${r.face}`;
            $('.k-bubble').textContent = `${kt('feelstFace')} ${r.face}`;
            sayEn(`Hmm. Look at the face.`, 0.85);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= 5 ? 3 : firstTry >= 3 ? 2 : 1;
      Store.kidsFinish('feelst', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🤗 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('You are a kind friend!', 0.9);
      $('#k-again').onclick = feelStoryGame;
    }
    round();
  }

  // ---------- pizza maker: listen to an order with "and" ----------
  // The owl orders "I want cheese and tomato!" (three toppings for big kids). Tapping a topping spreads it
  // on the pizza; something not ordered gets a giggle ("Corn? I didn't ask for corn!"). When the order
  // is complete the pizza goes into the oven.
  const TOPPINGS = [['cheese', '🧀', 'גבינה'], ['tomato', '🍅', 'עגבנייה'], ['mushrooms', '🍄', 'פטריות'], ['corn', '🌽', 'תירס'],
    ['pineapple', '🍍', 'אננס'], ['broccoli', '🥦', 'ברוקולי']].map(([en, pic, he]) => ({ en, pic, he }));
  function pizzaGame() {
    document.body.classList.add('in-lesson');
    const n = little() ? 2 : 3, orders = Array.from({ length: 4 }, () => K.shuffle(TOPPINGS).slice(0, n));
    let at = 0, misses = 0;
    const list = ts => ts.length === 2 ? `${ts[0].en} and ${ts[1].en}` : `${ts.slice(0, -1).map(t => t.en).join(', ')} and ${ts[ts.length - 1].en}`;
    function round() {
      K.lessonBar(at / orders.length);
      const order = orders[at], on = new Set();
      const line = `I want ${list(order)}!`;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🍕</span> ${kt('pizza')} · ${at + 1}/${orders.length}</p>
          <div class="k-prompt">
            <button class="k-speaker" id="k-say" aria-label="${kt('listen')}: ${line}"><span aria-hidden="true">🔊</span></button>
            <span class="k-target en" lang="en">🦉 ${line}</span>
          </div>
          <div class="k-pizza-wrap"><div class="k-pizza" id="k-pizza"></div><span class="k-oven" aria-hidden="true">🔥</span></div>
          <div class="k-pizza-tops">${TOPPINGS.map((t, i) => `<button class="k-pizza-top" data-i="${i}" aria-label="${t.en}"><span aria-hidden="true">${t.pic}</span><small class="en">${t.en}</small></button>`).join('')}</div>
          ${owl(kt('pizzaTip'), 'small')}
        </div>`;
      const ask = () => sayEn(line, 0.85);
      $('#k-say').onclick = ask;
      setTimeout(ask, 300);
      const pizza = $('#k-pizza');
      K.view.querySelectorAll('.k-pizza-top').forEach(b => {
        b.onclick = () => {
          const t = TOPPINGS[+b.dataset.i];
          if (on.has(t)) return;
          if (!order.includes(t)) {
            misses++;
            K.Feel.wrong(b);
            owlMood('giggle');
            $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">${t.en}? 😄</bdi> ${t.he}`;
            sayEn(`${t.en[0].toUpperCase() + t.en.slice(1)}? I didn't ask for ${t.en}!`, 0.9);
            return;
          }
          on.add(t);
          b.classList.add('used');
          b.disabled = true;
          // spread a few pieces around the pizza
          for (let k = 0; k < 4; k++) {
            const a = (k / 4) * 6.28 + on.size, r = 18 + (k % 2) * 16;
            pizza.insertAdjacentHTML('beforeend', `<span class="k-pz-piece" style="left:${50 + Math.cos(a) * r}%;top:${50 + Math.sin(a) * r}%">${t.pic}</span>`);
          }
          popSound();
          sayEn(t.en, 0.9);
          $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">${t.en}</bdi> · ${t.he} ✓`;
          if (on.size === order.length) {
            K.view.querySelectorAll('.k-pizza-top').forEach(x => { x.disabled = true; });
            setTimeout(() => {
              $('.k-pizza-wrap').classList.add('bake');
              K.Feel.right();
              owlMood('cheer');
              say([['en', `Into the oven! Yum! A ${list(order)} pizza!`]], 0.9);
              setTimeout(() => { at++; at < orders.length ? round() : end(); }, 3000);
            }, 700);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = misses <= 1 ? 3 : misses <= 3 ? 2 : 1;
      Store.kidsFinish('pizza', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🍕 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('You are a great pizza chef!', 0.9);
      $('#k-again').onclick = pizzaGame;
    }
    round();
  }

  // ---------- weather reporter: say a whole sentence, like on TV ----------
  // Pick today's sky and hot/cold; the owl builds the report on a little TV ("Good morning! Today it is
  // sunny and hot!") and says it, then it's the child's turn: record it and watch yourself on "TV".
  function wxrGame() {
    document.body.classList.add('in-lesson');
    const SKY = [{ id: 'sunny', pic: '☀️' }, { id: 'cloudy', pic: '☁️' }, { id: 'rainy', pic: '🌧️' }, { id: 'windy', pic: '🌬️' }, { id: 'snowy', pic: '❄️' }];
    const TEMP = [{ id: 'hot', pic: '🥵' }, { id: 'warm', pic: '🙂' }, { id: 'cold', pic: '🥶' }];
    let sky = SKY.find(x => x.id === Store.kidsWeather) || null, temp = null, mine = null;
    function pick() {
      K.lessonBar(sky ? .4 : 0);
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">📺</span> ${kt('wxr')}</p>
          <p class="k-tip">${kt('wxrSky')}</p>
          <div class="k-wxr-row">${SKY.map(x => `<button class="k-wxr-opt ${sky === x ? 'on' : ''}" data-s="${x.id}" aria-label="${x.id}"><span aria-hidden="true">${x.pic}</span><small class="en">${x.id}</small></button>`).join('')}</div>
          <p class="k-tip">${kt('wxrTemp')}</p>
          <div class="k-wxr-row three">${TEMP.map(x => `<button class="k-wxr-opt" data-t="${x.id}" aria-label="${x.id}"><span aria-hidden="true">${x.pic}</span><small class="en">${x.id}</small></button>`).join('')}</div>
          ${owl(kt('wxrSky'), 'small')}
        </div>`;
      K.view.querySelectorAll('[data-s]').forEach(b => {
        b.onclick = () => { sky = SKY.find(x => x.id === b.dataset.s); K.view.querySelectorAll('[data-s]').forEach(x => x.classList.toggle('on', x === b)); sayEn(sky.id, 0.9); if (temp) report(); };
      });
      K.view.querySelectorAll('[data-t]').forEach(b => {
        b.onclick = () => { temp = TEMP.find(x => x.id === b.dataset.t); K.view.querySelectorAll('[data-t]').forEach(x => x.classList.toggle('on', x === b)); sayEn(temp.id, 0.9); if (sky) setTimeout(report, 500); };
      });
      setTimeout(() => sayEn('What is the weather today?', 0.85), 300);
    }
    function report() {
      K.lessonBar(.7);
      const hello = new Date().getHours() < 12 ? 'Good morning!' : new Date().getHours() < 18 ? 'Good afternoon!' : 'Good evening!';
      const line = `Today it is ${sky.id} and ${temp.id}!`;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">📺</span> ${kt('wxr')}</p>
          <div class="k-tv">
            <div class="k-tv-screen">
              <span class="k-tv-live">● LIVE</span>
              <span class="k-tv-sky" aria-hidden="true">${sky.pic}${temp.pic}</span>
              <span class="k-tv-owl" aria-hidden="true">🦉</span>
              <p class="k-tv-text en" lang="en">${hello}<br><b>${line}</b></p>
            </div>
            <span class="k-tv-stand" aria-hidden="true"></span>
          </div>
          <p class="k-tip">${kt('wxrSay')}</p>
          <div class="k-copy-row">
            <button class="k-copy-btn" id="k-wxr-owl"><span aria-hidden="true">🦉</span><small>Owl</small></button>
            ${canRecord() ? `<button class="k-mic" id="k-wxr-rec" aria-label="${kt('wxrSay')}"><span aria-hidden="true">🎤</span></button>` : ''}
            <button class="k-copy-btn" id="k-wxr-me" disabled><span aria-hidden="true">🙂</span><small>${kt('wxrMine')}</small></button>
          </div>
          <button class="k-btn" id="k-wxr-done">✅ ${kt('wxrDone')}</button>
          ${owl(canRecord() ? kt('wxrTip') : kt('wxrSay'), 'small')}
        </div>`;
      const owlSays = () => say([['en', hello], ['en', line]], 0.85);
      $('#k-wxr-owl').onclick = owlSays;
      setTimeout(owlSays, 300);
      const rec = $('#k-wxr-rec'), me = $('#k-wxr-me');
      if (rec) rec.onclick = () => recordClip(rec, url => {
        if (!url) return;
        if (mine) URL.revokeObjectURL(mine);
        mine = url;
        me.disabled = false;
        $('.k-tv').classList.add('me');
        $('.k-tv-owl').textContent = (Store.kidsProfiles.find(p => p.active) || {}).face || '🙂';
        new Audio(mine).play().catch(() => {});
      });
      me.onclick = () => { if (mine) new Audio(mine).play().catch(() => {}); };
      $('#k-wxr-done').onclick = end;
    }
    function end() {
      if (mine) { URL.revokeObjectURL(mine); mine = null; }
      K.endLesson(1);
      Store.kidsFinish('wxr', 3, 15);
      Store.kidsWeather = sky.id;   // the map's sky follows the report
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>📺 ${kt('done')}</h1>
            ${starsHtml(3, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn("That's the weather! Back to you in the studio!", 0.9);
      $('#k-again').onclick = wxrGame;
    }
    pick();
  }

  // ---------- letter of the week ----------
  // A new letter every week (A, B, C... in order, Sunday to Saturday): its sound, a few picture words that
  // start with it, a chant ("B, B, buh, buh! Ball, bird, bus!") and the tracing page. Small, steady phonics.
  function lotwLetter() {
    const d = new Date(); d.setDate(d.getDate() - d.getDay());
    const week = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / (7 * 864e5));
    return KIDS_ABC[week % KIDS_ABC.length];
  }
  function lotwWords(x) {
    const l = x.L.toLowerCase();
    const list = KIDS_WORDS.filter(w => w.en.startsWith(l) && !/\s/.test(w.en) && w.pic);
    const uniq = [];
    if (x.word.startsWith(l) && !/\s/.test(x.word)) uniq.push({ en: x.word, pic: x.pic, he: x.he });
    list.forEach(w => { if (!uniq.some(u => u.en === w.en)) uniq.push(w); });
    if (!uniq.length) uniq.push({ en: x.word, pic: x.pic, he: x.he });   // X: fox - the letter is inside the word
    return uniq.slice(0, 4);
  }
  function lotwCard() {
    const x = lotwLetter(), words = lotwWords(x);
    return `
      <a class="k-lotw-card" href="#/kids/lotw">
        <span class="k-lotw-L en" aria-hidden="true">${x.L}${x.L.toLowerCase()}</span>
        <span class="grow"><b>🔤 ${kt('lotw')}</b><small class="en" lang="en">${words.map(w => `${w.pic} ${w.en}`).join(' · ')}</small></span>
        <span class="k-today-arrow" aria-hidden="true">${isHe() ? '‹' : '›'}</span>
      </a>`;
  }
  function lotwScreen() {
    K.endLesson();
    const x = lotwLetter(), words = lotwWords(x), l = x.L.toLowerCase();
    const mark = en => { const i = Math.max(0, en.indexOf(l)); return `${en.slice(0, i)}<mark>${en[i]}</mark>${en.slice(i + 1)}`; };
    K.view.innerHTML = `
      <div class="k-wrap k-play">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <h1 class="k-title">🔤 ${kt('lotw')}</h1>
        <button class="k-card k-letter-big" id="k-lotw-big" aria-label="${x.L}">
          <span class="k-letter-glyph en" aria-hidden="true">${x.L}<small>${l}</small></span>
          <span class="k-he en" lang="en">/${x.sound}/</span>
        </button>
        <div class="k-lotw-words">${words.map((w, i) => `<button class="k-lotw-w" data-i="${i}" aria-label="${w.en}"><span aria-hidden="true">${w.pic}</span><b class="en" lang="en">${mark(w.en)}</b></button>`).join('')}</div>
        <div class="k-letter-tools">
          <button class="k-btn" id="k-lotw-chant">🎵 ${kt('lotwChant')}</button>
          <a class="k-btn ghost" href="#/kids/trace/${x.L}">✍️ ${kt('lotwTrace')}</a>
        </div>
        ${owl(kt('lotwTip'), 'small')}
      </div>`;
    const btns = [...K.view.querySelectorAll('.k-lotw-w')];
    $('#k-lotw-big').onclick = () => say([['en', `${x.name}. ${x.sound}, ${x.sound}.`]], 0.8);
    btns.forEach((b, i) => { b.onclick = () => { sayEn(words[i].en, 0.85); b.classList.remove('lit'); void b.offsetWidth; b.classList.add('lit'); }; });
    // the chant: letter name twice, its sound twice, then the words, each lighting up in turn
    $('#k-lotw-chant').onclick = () => {
      // one queue: the letter twice, its sound twice, then each word - every word lights up as it is said
      speakSeq([`${x.name}! ${x.name}!`, `${x.sound}, ${x.sound}!`, ...words.map(w => w.en)], 0.85, i => {
        btns.forEach(b => b.classList.remove('lit'));
        if (i >= 2 && btns[i - 2] && btns[i - 2].isConnected) btns[i - 2].classList.add('lit');
      }, () => {
        btns.forEach(b => b.classList.remove('lit'));
        if ($('#k-lotw-chant')) { Store.kidsFinish('lotw', 3, 10); owlMood('cheer'); }
      });
    };
    setTimeout(() => say([['en', `The letter of the week is ${x.name}!`]], 0.85), 300);
  }

  // ---------- bath time: in and out, a playful routine ----------
  // Toys wait on the bath mat. "Put the duck in the water!" moves it into the tub; "Take the boat out!"
  // moves it back. Commands always fit what is where. At the end bubbles rise: pop them to hear bath words.
  function bathGame() {
    document.body.classList.add('in-lesson');
    const toys = [['duck', '🦆'], ['boat', '⛵'], ['fish', '🐟'], ['ball', '⚽'], ['frog', '🐸'], ['teddy', '🧸']].map(([en, pic]) => ({ en, pic, inside: false }));
    const N = little() ? 5 : 7;
    let done = 0, firstTry = 0;
    K.lessonBar(0);
    K.view.innerHTML = `
      <div class="k-wrap k-play">
        <p class="k-step"><span aria-hidden="true">🛁</span> ${kt('bath')}</p>
        <div class="k-prompt">
          <button class="k-speaker" id="k-say" aria-label="${kt('listen')}"><span aria-hidden="true">🔊</span></button>
          <span class="k-target en" lang="en" id="k-bath-line"></span>
        </div>
        <div class="k-bath">
          <div class="k-tub" id="k-tub"><div class="k-water"></div><div class="k-tub-toys" id="k-tub-toys"></div></div>
          <div class="k-mat" id="k-mat"></div>
        </div>
        ${owl(kt('bathTip'), 'small')}
      </div>`;
    const btn = t => `<button class="k-bath-toy" data-en="${t.en}" aria-label="${t.en}"><span aria-hidden="true">${t.pic}</span></button>`;
    const draw = () => {
      $('#k-tub-toys').innerHTML = toys.filter(t => t.inside).map(btn).join('');
      $('#k-mat').innerHTML = toys.filter(t => !t.inside).map(btn).join('');
      K.view.querySelectorAll('.k-bath-toy').forEach(b => { b.onclick = () => tap(toys.find(t => t.en === b.dataset.en), b); });
    };
    let cmd = null, missed = false;
    function next() {
      K.lessonBar(done / N);
      if (done >= N) return bubbles();
      const ins = toys.filter(t => t.inside), outs = toys.filter(t => !t.inside);
      const goIn = !ins.length || (outs.length && Math.random() < .6);
      const t = pickOne(goIn ? outs : ins);
      cmd = { t, goIn };
      missed = false;
      const line = goIn ? `Put the ${t.en} in the water!` : `Take the ${t.en} out!`;
      $('#k-bath-line').textContent = line;
      $('#k-say').onclick = () => sayEn(line, 0.85);
      setTimeout(() => sayEn(line, 0.85), 250);
    }
    function tap(t, b) {
      if (!cmd) return;
      if (t === cmd.t) {
        t.inside = cmd.goIn;
        K.Feel.right();
        if (!missed) firstTry++;
        cmd.goIn ? popSound() : Sfx.whoosh();
        $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">${cmd.goIn ? 'in' : 'out'}</bdi> · ${cmd.goIn ? 'בפנים' : 'בחוץ'} ✓`;
        sayEn(cmd.goIn ? `Splash! The ${t.en} is in the water.` : `The ${t.en} is out!`, 0.9);
        cmd = null;
        draw();
        done++;
        setTimeout(next, 1500);
      } else {
        missed = true;
        K.Feel.wrong(b);
        owlMood('think');
        sayEn(`That's the ${t.en}.`, 0.9);
      }
    }
    // the end: bubbles rise from the tub, each pop says a bath word
    function bubbles() {
      const words = ['water', 'bubbles', 'soap', 'splash', 'towel', 'wash'];
      $('#k-bath-line').textContent = 'Pop the bubbles!';
      sayEn('Pop the bubbles!', 0.9);
      const tub = $('#k-tub');
      let left = words.length;
      words.forEach((w, i) => {
        const b = document.createElement('button');
        b.className = 'k-bath-bub';
        b.style.left = `${8 + i * 15}%`;
        b.style.animationDelay = `${i * .25}s`;
        b.setAttribute('aria-label', w);
        b.onclick = () => {
          b.classList.add('pop'); b.disabled = true; popSound(); sayEn(w, 0.9);
          b.textContent = w;
          if (--left === 0) setTimeout(end, 1200);
        };
        tub.appendChild(b);
      });
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= N ? 3 : firstTry >= N - 2 ? 2 : 1;
      Store.kidsFinish('bath', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🛁 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('All clean! Time for the towel!', 0.9);
      $('#k-again').onclick = bathGame;
    }
    draw();
    next();
  }

  // ---------- odd one out: thinking in categories ----------
  // Four pictures: three from one family (food) and one from another (a car). Tapping the odd one makes
  // the owl say why: "A car is not food! Apple, banana and egg are food." Reasoning in English words.
  function oddGame() {
    document.body.classList.add('in-lesson');
    const themeOf = id => (KIDS_THEMES.find(t => t.id === id) || { words: [] }).words.filter(w => w.pic && !/\s/.test(w.en));
    const fams = FAMILIES.filter(f => themeOf(f.id).length >= 3);
    const rounds = Array.from({ length: 6 }, () => { const [a, b] = K.shuffle(fams); return { fam: a, other: b }; });
    const art = en => (/^[aeiou]/.test(en) ? 'an' : 'a');
    const list = ws => `${ws.slice(0, -1).join(', ')} and ${ws[ws.length - 1]}`;
    let at = 0, firstTry = 0;
    function round() {
      K.lessonBar(at / rounds.length);
      const { fam, other } = rounds[at];
      const three = K.shuffle(themeOf(fam.id)).slice(0, 3);
      const odd = pickOne(themeOf(other.id).filter(w => !three.some(t => t.pic === w.pic)));
      const opts = K.shuffle([...three, odd]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🔎</span> ${kt('odd')} · ${at + 1}/${rounds.length}</p>
          <p class="k-tip en" lang="en">Which one does not belong?</p>
          <div class="k-opts four k-odd-grid">${opts.map((o, i) => `<button class="k-opt k-rh-opt" data-i="${i}" aria-label="${o.en}"><span aria-hidden="true">${o.pic}</span><small class="en">${o.en}</small></button>`).join('')}</div>
          <p class="k-odd-why en" lang="en" aria-live="polite"></p>
          ${owl(kt('oddTip'), 'small')}
        </div>`;
      setTimeout(() => sayEn('Which one does not belong?', 0.85), 300);
      K.view.querySelectorAll('.k-opt').forEach(b => {
        b.onclick = () => {
          const o = opts[+b.dataset.i];
          if (o === odd) {
            K.view.querySelectorAll('.k-opt').forEach(x => { x.disabled = true; x.classList.toggle('same', x !== b); });
            b.classList.add('right');
            K.Feel.right();
            if (!missed) firstTry++;
            owlMood('cheer');
            const ONE = { animals: 'an animal', food: 'food', toys: 'a toy', 'things that go': 'a thing that goes', clothes: 'something you wear', 'body parts': 'a body part' };
            const why = `${art(odd.en)[0].toUpperCase() + art(odd.en).slice(1)} ${odd.en} is not ${ONE[fam.en] || fam.en}! ${(l => l[0].toUpperCase() + l.slice(1))(list(three.map(w => w.en)))} are ${fam.en}.`;
            $('.k-odd-why').textContent = why;
            $('.k-bubble').textContent = `${fam.pic} ${fam.he}`;
            say([['en', why]], 0.85);
            setTimeout(() => { at++; at < rounds.length ? round() : end(); }, 4200);
          } else {
            missed = true;
            K.Feel.wrong(b);
            owlMood('think');
            $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">${o.en}</bdi> ${fam.pic}? ${kt('tryAgain')}`;
            sayEn(`${o.en[0].toUpperCase() + o.en.slice(1)} is in the ${fam.en} family. Look again!`, 0.9);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = firstTry >= 6 ? 3 : firstTry >= 4 ? 2 : 1;
      Store.kidsFinish('odd', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>🔎 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('You are a super thinker!', 0.9);
      $('#k-again').onclick = oddGame;
    }
    round();
  }

  // ---------- shopping list: listening memory ----------
  // The owl reads a short list ("Milk, egg and bread!") and then hides it; the child finds the things on the
  // shop shelves. Lists grow from 2 to 4 items. "Hear the list again" is always there: memory, not pressure.
  function slistGame() {
    document.body.classList.add('in-lesson');
    const shelf = (KIDS_THEMES.find(t => t.id === 'food') || { words: [] }).words;
    const sizes = little() ? [2, 2, 3] : [2, 3, 4];
    let at = 0, misses = 0, replays = 0;
    const list = ws => ws.length === 1 ? ws[0] : `${ws.slice(0, -1).join(', ')} and ${ws[ws.length - 1]}`;
    function round() {
      K.lessonBar(at / sizes.length);
      const want = K.shuffle(shelf).slice(0, sizes[at]), got = new Set();
      const read = () => say([['en', 'My shopping list:'], ['en', `${list(want.map(w => w.en))}!`]], 0.8);
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">📝</span> ${kt('slist')} · ${at + 1}/${sizes.length}</p>
          <div class="k-slist-paper" id="k-paper"><b>🦉 My list</b>${want.map(() => '<span>❔</span>').join('')}</div>
          <button class="k-btn ghost" id="k-slist-again">🔊 ${kt('slistAgain')}</button>
          <div class="k-shelves">${K.shuffle(shelf).map(w => `<button class="k-shelf-item" data-en="${w.en}" aria-label="${w.en}"><span aria-hidden="true">${w.pic}</span></button>`).join('')}</div>
          <div class="k-fam-basket"><span class="k-fam-bk" aria-hidden="true">🧺</span><span id="k-sl-in"></span></div>
          ${owl(kt('slistTip'), 'small')}
        </div>`;
      setTimeout(read, 300);
      $('#k-slist-again').onclick = () => { replays++; read(); };
      K.view.querySelectorAll('.k-shelf-item').forEach(b => {
        b.onclick = () => {
          const w = shelf.find(x => x.en === b.dataset.en);
          if (want.includes(w) && !got.has(w)) {
            got.add(w);
            b.disabled = true;
            b.classList.add('taken');
            K.Feel.right();
            Store.kidsWordRight(w.id);
            sayEn(w.en, 0.9);
            $('#k-sl-in').insertAdjacentHTML('beforeend', `<i>${w.pic}</i>`);
            // tick the list as it fills
            const slots = K.view.querySelectorAll('#k-paper span');
            slots[got.size - 1].innerHTML = `${w.pic} <small class="en">${w.en}</small>`;
            if (got.size === want.length) {
              K.view.querySelectorAll('.k-shelf-item').forEach(x => { x.disabled = true; });
              owlMood('cheer');
              say([['en', `Yes! ${list(want.map(x => x.en))}. Thank you!`]], 0.85);
              setTimeout(() => { at++; at < sizes.length ? round() : end(); }, 2600);
            }
          } else if (!want.includes(w)) {
            misses++;
            K.Feel.wrong(b);
            owlMood('think');
            $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">${w.en}?</bdi> 🤔 ${kt('slistAgain')}`;
            sayEn(`${w.en[0].toUpperCase() + w.en.slice(1)}? Hmm, that's not on the list.`, 0.9);
          }
        };
      });
    }
    function end() {
      K.endLesson(1);
      const stars = misses === 0 ? 3 : misses <= 2 ? 2 : 1;
      Store.kidsFinish('slist', stars, 10 + stars * 5);
      K.view.innerHTML = `
        <div class="k-wrap k-play k-end">
          <div class="k-end-card">${endOwl()}
            <h1>📝 ${kt('done')}</h1>
            ${starsHtml(stars, 'big pop')}
          </div>
          <button class="k-btn" id="k-again">${kt('again')} <span aria-hidden="true">🔁</span></button>
          <a class="k-btn ghost" href="#/kids">${kt('backToMap')}</a>
        </div>`;
      celebrate();
      sayEn('What a great memory! The shopping is done!', 0.9);
      $('#k-again').onclick = slistGame;
    }
    round();
  }

  // ---------- calm corner: a breathing buddy for big feelings ----------
  // A balloon slowly grows (breathe in, 4 counts) and shrinks (breathe out, 4 counts) while the owl
  // counts softly in English. Five breaths, no score, no hurry. Shown first on days the child felt sad or angry.
  let calmTimer = null;
  function calmScreen() {
    K.endLesson();
    clearTimeout(calmTimer);
    const BREATHS = 5, IN = 4000, OUT = 4000;
    let n = 0, running = false;
    K.view.innerHTML = `
      <div class="k-wrap k-calm">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <h1 class="k-title">🎈 ${kt('calm')}</h1>
        <div class="k-calm-stage"><div class="k-calm-balloon" id="k-balloon"><span aria-hidden="true">🦉</span></div></div>
        <p class="k-calm-word en" id="k-calm-word" lang="en" aria-live="polite">&nbsp;</p>
        <div class="k-calm-dots" aria-hidden="true">${'<i></i>'.repeat(BREATHS)}</div>
        <button class="k-btn" id="k-calm-go">🎈 ${kt('calmGo')}</button>
        ${owl(kt('calmTip'), 'small')}
      </div>`;
    const balloon = $('#k-balloon'), word = $('#k-calm-word'), go = $('#k-calm-go');
    const soft = (t, rate = 0.7) => { if ('speechSynthesis' in window) speechSynthesis.cancel(); sayEn(t, rate); };
    function stop(finished) {
      clearTimeout(calmTimer); calmTimer = null; running = false;
      balloon.className = 'k-calm-balloon';
      go.innerHTML = `🎈 ${kt('calmGo')}`;
      if (finished) {
        word.textContent = 'Well done. You feel calm.';
        $('.k-bubble').textContent = kt('calmEnd');
        soft('Well done. You feel calm.', 0.75);
        Store.kidsFinish('calm', 3, 5);
        owlMood('love');
      }
    }
    function breathe() {
      if (!$('.k-calm')) return stop();
      if (n >= BREATHS) return stop(true);
      // in: the balloon grows
      balloon.className = 'k-calm-balloon in';
      word.textContent = 'Breathe in...';
      soft('Breathe in... two... three... four.', 0.6);
      calmTimer = setTimeout(() => {
        // out: the balloon shrinks
        balloon.className = 'k-calm-balloon out';
        word.textContent = 'Breathe out...';
        soft('And breathe out... two... three... four.', 0.6);
        calmTimer = setTimeout(() => {
          const dots = K.view.querySelectorAll('.k-calm-dots i');
          if (dots[n]) dots[n].classList.add('on');
          n++;
          breathe();
        }, OUT);
      }, IN);
    }
    go.onclick = () => {
      if (running) return stop();
      running = true; n = 0;
      K.view.querySelectorAll('.k-calm-dots i').forEach(d => d.classList.remove('on'));
      go.innerHTML = `⏹️ ${kt('calmStop')}`;
      breathe();
    };
    setTimeout(() => soft("Let's breathe together.", 0.75), 300);
  }

  // ---------- my family tree ----------
  // The child builds their own family: a face for each person (any skin tone, any family shape - every
  // circle can stay empty). Each pick says "This is my mum!"; the owl can then tell the whole family.
  const FAMILY = [
    { role: 'grandma', he: 'סבתא', row: 0, faces: ['👵', '👵🏻', '👵🏽', '👵🏿'] },
    { role: 'grandpa', he: 'סבא', row: 0, faces: ['👴', '👴🏻', '👴🏽', '👴🏿'] },
    { role: 'mom', he: 'אמא', row: 1, faces: ['👩', '👩🏻', '👩🏽', '👩🏿', '👩‍🦰', '👱‍♀️', '🧕', '👩‍🦱'] },
    { role: 'dad', he: 'אבא', row: 1, faces: ['👨', '👨🏻', '👨🏽', '👨🏿', '👨‍🦰', '👱‍♂️', '🧔', '👨‍🦱'] },
    { role: 'sister', he: 'אחות', row: 2, faces: ['👧', '👧🏻', '👧🏽', '👧🏿'] },
    { role: 'brother', he: 'אח', row: 2, faces: ['👦', '👦🏻', '👦🏽', '👦🏿'] },
    { role: 'baby', he: 'תינוק', row: 2, faces: ['👶', '👶🏻', '👶🏽', '👶🏿'] },
    { role: 'pet', he: 'חיית מחמד', row: 2, faces: ['🐶', '🐱', '🐰', '🐟', '🐢', '🦜'] }
  ];
  const PET = { '🐶': 'dog', '🐱': 'cat', '🐰': 'bunny', '🐟': 'fish', '🐢': 'turtle', '🦜': 'parrot' };
  function familyTree() {
    K.endLesson();
    const fam = Store.kidsFamily, me = Store.kidsProfiles.find(p => p.active) || {};
    const slot = m => `<button class="k-ft-slot ${fam[m.role] ? 'on' : ''}" data-role="${m.role}" aria-label="${m.role}">
        <span class="k-ft-face" aria-hidden="true">${fam[m.role] || '➕'}</span><small class="en">${m.role}</small></button>`;
    K.view.innerHTML = `
      <div class="k-wrap">
        <a class="k-back" href="#/kids"><span aria-hidden="true">${isHe() ? '→' : '←'}</span> ${kt('map')}</a>
        <h1 class="k-title">🌳 ${kt('ftree')}</h1>
        <div class="k-ftree">
          ${[0, 1, 2].map(r => `<div class="k-ft-row">${FAMILY.filter(m => m.row === r).map(slot).join('')}${r === 2 ? `<span class="k-ft-slot me on"><span class="k-ft-face" aria-hidden="true">${me.face || '🙂'}</span><small>${kt('ftreeMe')}</small></span>` : ''}</div>`).join('')}
        </div>
        <button class="k-btn" id="k-ft-read">🦉 ${kt('ftreeRead')}</button>
        ${owl(kt('ftreeTip'), 'small')}
      </div>`;
    const says = (m, face) => m.role === 'pet' ? `This is my ${PET[face] || 'pet'}!` : `This is my ${m.role}!`;
    K.view.querySelectorAll('.k-ft-slot[data-role]').forEach(b => {
      b.onclick = () => {
        const m = FAMILY.find(x => x.role === b.dataset.role);
        const back = document.createElement('div');
        back.className = 'k-reveal';
        back.setAttribute('role', 'dialog');
        back.innerHTML = `<div class="k-reveal-card"><b class="en" lang="en">${m.role} · ${m.he}</b>
          <div class="k-ft-pick">${m.faces.map(f => `<button class="k-ft-face-btn" data-f="${f}" aria-label="${m.role}">${f}</button>`).join('')}
            <button class="k-ft-face-btn none" data-f="" aria-label="${kt('ftreeNone')}">${kt('ftreeNone')}</button></div></div>`;
        document.body.appendChild(back);
        sayEn(m.role, 0.9);
        back.onclick = e => { if (e.target === back) back.remove(); };
        back.querySelectorAll('.k-ft-face-btn').forEach(fb => {
          fb.onclick = () => {
            const face = fb.dataset.f;
            Store.kidsSetFamily(m.role, face);
            back.remove();
            if (face) { popSound(); say([['en', says(m, face)]], 0.85); }
            if (Object.keys(Store.kidsFamily).length >= 3) Store.kidsFinish('ftree', 3, 10);
            familyTree();
          };
        });
      };
    });
    $('#k-ft-read').onclick = () => {
      const f = Store.kidsFamily;
      const lines = FAMILY.filter(m => f[m.role]).map(m => says(m, f[m.role]));
      if (!lines.length) { $('.k-bubble').textContent = kt('ftreeTip'); return; }
      say([['en', 'This is my family!'], ...lines.map(l => ['en', l]), ['en', 'I love my family!']], 0.85);
      K.view.querySelectorAll('.k-ft-slot.on').forEach((s, i) => setTimeout(() => { s.classList.add('lit'); setTimeout(() => s.classList.remove('lit'), 900); }, 1200 + i * 1300));
    };
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
          <a class="k-book" href="#/kids/lullaby" style="--c:#6d5bd0">
            <span class="k-book-pic" aria-hidden="true">🌙</span>
            <span class="k-book-title en">${kt('lull')}</span>
            <span class="k-book-he">${kt('lullSub')}</span>
          </a>
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
  // A tiny backing band for the songs: a C - F - G - C chord on each bar, a soft bass and a gentle
  // tick on the beat. Quiet, so the words stay clear; it follows the "sounds" switch for children.
  const songBand = (() => {
    let timer = null, beat = 0, master = null;
    const CHORDS = [[261.63, 329.63, 392], [349.23, 440, 523.25], [392, 493.88, 587.33], [261.63, 329.63, 392]];
    const BASS = [130.81, 174.61, 196, 130.81];
    function ctx() {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === 'suspended') actx.resume();
      return actx;
    }
    function tone(freq, when, len, vol, type) {
      const c = ctx(), o = c.createOscillator(), g = c.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(0, when);
      g.gain.linearRampToValueAtTime(vol, when + .03);
      g.gain.exponentialRampToValueAtTime(.0001, when + len);
      o.connect(g).connect(master);
      o.start(when); o.stop(when + len + .05);
    }
    function tick(when, vol) {
      const c = ctx(), len = .05, buf = c.createBuffer(1, c.sampleRate * len, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
      const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      src.buffer = buf; f.type = 'highpass'; f.frequency.value = 5000; g.gain.value = vol;
      src.connect(f).connect(g).connect(master);
      src.start(when);
    }
    return {
      start(bpm = 104) {
        this.stop();
        if (!Store.kidsSfx) return;
        try {
          const c = ctx();
          master = c.createGain(); master.gain.value = 1; master.connect(c.destination);
          const spb = 60 / bpm;
          beat = 0;
          const play = () => {
            const when = c.currentTime + .05, bar = Math.floor(beat / 4) % 4, inBar = beat % 4;
            if (inBar === 0) { CHORDS[bar].forEach(f => tone(f, when, spb * 3.6, .025, 'triangle')); tone(BASS[bar], when, spb * 1.6, .07, 'sine'); }
            if (inBar === 2) tone(BASS[bar] * 1.5, when, spb * 1.2, .05, 'sine');
            tick(when, inBar % 2 ? .05 : .02);
            beat++;
          };
          play();
          timer = setInterval(play, spb * 1000);
        } catch (e) { /* no audio: the song still sings */ }
      },
      stop(fade) {
        clearInterval(timer); timer = null;
        if (master) {
          const m = master; master = null;
          try { m.gain.setTargetAtTime(0, actx.currentTime, fade ? .4 : .05); setTimeout(() => m.disconnect(), 1500); } catch (e) {}
        }
      }
    };
  })();
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
    // Play: each line is sung as ONE phrase (natural rhythm instead of word-by-word beeps), a soft backing
    // band plays chords and a beat underneath, and each word lights up as the voice reaches it (word
    // boundary events, with a timed fallback for voices that don't send them).
    const lineOf = notes.map(n => +n.dataset.r);
    const lines = sg.lines.map((line, r) => {
      const ws = line.map(([w, , spoken]) => (spoken || w));
      const punct = ws.some(w => /[,!?.]/.test(w));
      const parts = ws.map(w => w.replace(/[.]$/, ''));
      const text = (punct ? parts.join(' ') : parts.join(', ')).replace(/[,]?$/, '') + (/[!?]$/.test(parts[parts.length - 1]) ? '' : '!');
      // where each word starts inside the text, to match boundary events to notes
      let at = 0;
      const starts = parts.map(w => { const i = text.indexOf(w, at); at = i + w.length; return i; });
      const first = lineOf.indexOf(r);
      return { text, starts, first, count: line.length };
    });
    const play = quiet => {
      const run = ++songRun;
      speechSynthesis.cancel();
      $('.k-bubble').textContent = quiet ? kt('singTip') : '🎶';
      songBand.start(sg.id === 'abc' ? 96 : 104);
      const light = k => {
        if (run !== songRun || !document.body.contains(notes[0])) return;
        notes.forEach(n => n.classList.remove('lit'));
        if (notes[k]) { notes[k].classList.add('lit'); note(tune[k], .25); }
      };
      const finish = () => {
        if (run !== songRun) return;
        notes.forEach(n => n.classList.remove('lit'));
        songBand.stop(true);
        if (document.body.contains(notes[0])) { owlMood('cheer'); K.Feel.right(); }
      };
      let r = 0;
      const sing = () => {
        if (run !== songRun || !document.body.contains(notes[0])) return songBand.stop();
        if (r >= lines.length) return finish();
        const L = lines[r];
        let lit = -1, gotBoundary = false, timer = null, ended = false;
        const show = i => { if (i > lit && i < L.count) { lit = i; light(L.first + i); } };
        const u = new SpeechSynthesisUtterance(L.text);
        u.lang = 'en-US';
        if (enVoice) u.voice = enVoice;
        u.rate = sg.id === 'abc' ? 0.85 : 0.8;
        u.pitch = 1.25;
        u.volume = quiet ? 0.25 : 1;
        u.onboundary = e => {
          if (e.name && e.name !== 'word') return;
          gotBoundary = true;
          let i = 0;
          while (i + 1 < L.starts.length && L.starts[i + 1] <= e.charIndex) i++;
          show(i);
        };
        u.onstart = () => {
          show(0);
          // no word events from this voice? light the words on a steady beat instead
          const step = (sg.id === 'abc' ? 520 : 620) / u.rate * 0.8;
          let i = 1;
          timer = setInterval(() => { if (gotBoundary || ended) return clearInterval(timer); show(i++); if (i >= L.count) clearInterval(timer); }, step);
        };
        const next = () => { if (ended) return; ended = true; clearInterval(timer); show(L.count - 1); r++; setTimeout(sing, 380); };
        u.onend = next;
        u.onerror = next;
        // safety net if a voice never answers
        setTimeout(() => { if (!ended && run === songRun && !speechSynthesis.speaking) next(); }, 6000 + L.count * 900);
        if ('speechSynthesis' in window) speechSynthesis.speak(u); else setTimeout(next, L.count * 600);
      };
      setTimeout(sing, 450);   // one bar of music first, then the voice comes in
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
      $('#k-next').onclick = () => { stopParent(); at++; at < st.pages.length ? page() : question(); };
      const here = at;
      ParentVoice.get(`${id}:${here}`).then(blob => {
        if (here !== at || !$('.k-story-nav')) return;
        if (!blob) { readAlong(en, words); return; }
        // a parent recorded this page: their voice reads it, the owl's voice is one tap away
        $('.k-story-nav').insertAdjacentHTML('beforebegin', `<div class="k-rs-voices"><button class="k-btn" id="k-rs-parent">👩‍👦 ${kt('rsVoice')}</button><button class="k-btn ghost" id="k-rs-owl">🦉 ${kt('rsRobot')}</button></div>`);
        const play = () => playParent(blob);
        $('#k-rs-parent').onclick = play;
        $('#k-rs-owl').onclick = () => { stopParent(); readAlong(en, words); };
        play();
      });
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
            // say why it is right: the story line whose picture has the answer ("The owl says good night.")
            const page = st.pages.find(pg => pg[0].includes(opts[0]));
            say([['en', 'Yes!'], ...(page ? [['en', page[1]]] : [])], 0.85);
            setTimeout(() => end(missed ? 2 : 3), page ? 2600 : 1400);
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
          <p class="k-tip">🏁 ${kt('pathEnd')} · ${kt('pathFound', { n: Math.max(found.length, found.includes(id) ? found.length : found.length + 1) })}</p>
          <div class="k-path-ends" aria-hidden="true">${Object.entries(KIDS_PATH.pages).filter(([, p]) => p.end).map(([k, p]) =>
            `<span class="${k === id ? 'now' : found.includes(k) ? 'got' : ''}">${k === id || found.includes(k) ? [...p.scene][0] + [...p.scene][1] : '❔'}</span>`).join('')}</div>
          <button class="k-btn" id="k-path-again">🔀 ${kt('pathAgain')}</button>
          <a class="k-btn ghost" href="#/kids/stories">📚 ${kt('stories')}</a>`
        : `
          <p class="k-tip">${kt('pathChoose')}</p>
          <div class="k-path-choices">${pg.choices.map((c, i) => `<button class="k-path-choice" data-i="${i}"><span aria-hidden="true">${c.pic}</span><b class="en">${c.en}</b></button>`).join('')}</div>`}
      </div>`;
    const words = [...K.view.querySelectorAll('.k-w')];
    words.forEach(w => { w.onclick = () => sayEn(w.textContent.replace(/[^A-Za-z']/g, '')); });
    // after the page, the owl reads the choices aloud ("the red door, or the bridge?") and each one glows as it
    // is said - so a child who can't read yet knows what they are choosing
    const readChoices = () => {
      const btns = [...K.view.querySelectorAll('.k-path-choice')];
      if (!btns.length || !btns[0].isConnected) return;
      speakSeq(pg.choices.map((c, i) => (i ? `or ${c.en}?` : `${c.en},`)), 0.85, i => {
        btns.forEach((b, k) => b.classList.toggle('say', k === i));
      }, () => btns.forEach(b => b.classList.remove('say')));
    };
    setTimeout(() => readAlong(pg.en, words, pg.end ? null : readChoices), 250);
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
        ${tipBox()}
        ${remindBox()}
        ${weekBox()}
        <a class="k-btn ghost k-cert-btn" href="#/kids/cert">🏅 ${kt('certBtn')}${[5, 6].includes(new Date().getDay()) ? ` <span class="k-badge">${kt('certNew')}</span>` : ''}</a>
        <a class="k-btn ghost" href="#/kids/recstory">🎙️ ${kt('rsBtn')}</a>
        <a class="k-btn ghost" href="#/kids/print">🖍️ ${kt('prBtn')}</a>
        <button class="k-btn ghost" id="k-card">🖼️ ${kt('cardBtn')}</button>
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
    $('#k-card').onclick = progressCard;
    remindWire();
    tipWire();
    $('#k-bed').onchange = e => { Store.kidsBedtime = e.target.checked; document.body.classList.toggle('night', isNight()); };
  }

  // ---------- parent tip of the week ----------
  // One small idea a week for bringing English into home life, with a phrase to try and this week's
  // new words, so parents can use exactly what the child is learning. "Another tip" browses the rest.
  let tipShift = 0;
  function tipIndex() {
    const d = new Date(); d.setDate(d.getDate() - d.getDay());
    const week = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / (7 * 864e5));
    return (week + tipShift) % KIDS_PARENT_TIPS.length;
  }
  function tipBox() {
    const [title, text, phrase] = KIDS_PARENT_TIPS[tipIndex()];
    const words = Store.kidsWeek().words.filter(w => !/\s/.test(w.en)).slice(0, 8);
    return `
      <section class="k-pc-box k-tip-box" id="k-tip-box">
        <h2>💡 ${kt('tipTitle')}: ${title}</h2>
        <p>${text}</p>
        <button class="k-chip k-tip-say" id="k-tip-say">🔊 ${kt('tipTry')}: <b class="en" lang="en" dir="ltr">${phrase}</b></button>
        ${words.length ? `<p class="k-tip-words"><small>${kt('tipWords')}:</small> <span class="en" lang="en" dir="ltr">${words.map(w => `${w.pic} ${w.en}`).join(' · ')}</span></p>` : ''}
        <button class="k-skip" id="k-tip-more">🔀 ${kt('tipMore')}</button>
      </section>`;
  }
  function tipWire() {
    const say1 = $('#k-tip-say'), more = $('#k-tip-more');
    if (!say1) return;
    say1.onclick = () => sayEn(KIDS_PARENT_TIPS[tipIndex()][2], 0.85);
    more.onclick = () => { tipShift++; $('#k-tip-box').outerHTML = tipBox(); tipWire(); };
  }

  // ---------- a gentle daily reminder for parents ----------
  // Two ways, honestly labelled: a notification while the app is open or in the background (the web can't
  // wake a closed app without a server), and a daily calendar event with an alert, which always works.
  function remindBox() {
    const r = Store.kidsRemind;
    const blocked = 'Notification' in window && Notification.permission === 'denied';
    return `
      <section class="k-pc-box k-remind">
        <label class="k-pc-switch">
          <span class="grow"><b>⏰ ${kt('rmTitle')}</b><small>${kt('rmText')}</small></span>
          <input type="checkbox" id="k-rm" ${r.on ? 'checked' : ''}>
        </label>
        <div class="k-rm-row ${r.on ? '' : 'off'}">
          <label>${kt('rmTime')} <input type="time" id="k-rm-time" value="${r.time}" step="900"></label>
          <button class="k-chip" id="k-rm-test">🔔 ${kt('rmTest')}</button>
        </div>
        ${blocked ? `<p class="k-pc-tip">⚠️ ${kt('rmOff')}</p>` : ''}
        <button class="k-btn ghost" id="k-rm-cal">📅 ${kt('rmCal')}</button>
        <small class="k-rm-note">${kt('rmCalText')}</small>
      </section>`;
  }
  function remindWire() {
    const box = $('#k-rm');
    if (!box) return;
    box.onchange = async e => {
      Store.kidsRemind = { on: e.target.checked };
      if (e.target.checked && 'Notification' in window && Notification.permission === 'default') {
        try { await Notification.requestPermission(); } catch (err) { /* old Safari: callback form only */ }
      }
      parents();
    };
    $('#k-rm-time').onchange = e => { if (e.target.value) Store.kidsRemind = { time: e.target.value }; };
    $('#k-rm-test').onclick = () => remindNow(true);
    $('#k-rm-cal').onclick = remindCalendar;
  }
  async function remindNow(test) {
    const title = 'Lingua Kids', body = kt('rmBody');
    try {
      if (!('Notification' in window) || Notification.permission !== 'granted') throw new Error('no permission');
      const reg = navigator.serviceWorker && await navigator.serviceWorker.getRegistration();
      const opts = { body, icon: 'icons/owl-192.png', badge: 'icons/owl-192.png', tag: 'kids-remind', data: { url: './#/kids' } };
      if (reg) await reg.showNotification(title, opts); else new Notification(title, opts);
    } catch (err) {
      if (test) owlToast(body);
    }
  }
  // the owl's little message on screen when notifications are not allowed (or the app is open anyway)
  function owlToast(text) {
    const t = document.createElement('div');
    t.className = 'k-rm-toast';
    t.setAttribute('role', 'status');
    t.innerHTML = `<span aria-hidden="true">🦉</span> ${esc(text)}`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 4500);
  }
  function remindTick() {
    const r = Store.kidsRemind;
    if (!r.on) return;
    const now = new Date(), today = Store.kidsDayKey(now);
    const [h, m] = r.time.split(':').map(Number);
    if (r.last === today || now.getHours() * 60 + now.getMinutes() < h * 60 + m) return;
    Store.kidsRemind = { last: today };
    if (Store.kidsPlayedOn(today)) return;   // already played today: no nagging
    if (document.visibilityState === 'visible') owlToast(kt('rmBody')); else remindNow(false);
  }
  function remindCalendar() {
    const [h, m] = Store.kidsRemind.time.split(':');
    const d = new Date(), pad = n => String(n).padStart(2, '0');
    const end = Math.min(+h * 60 + +m + 10, 23 * 60 + 59);   // a 10-minute event, never past midnight
    const day = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Lingua Kids//EN', 'BEGIN:VEVENT',
      `UID:lingua-kids-remind-${day}@lingua`, `DTSTAMP:${day}T000000Z`,
      `DTSTART:${day}T${pad(h)}${pad(m)}00`, `DTEND:${day}T${pad(Math.floor(end / 60))}${pad(end % 60)}00`,
      'RRULE:FREQ=DAILY', `SUMMARY:${kt('rmBody')}`,
      'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${kt('rmBody')}`, 'TRIGGER:PT0M', 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    a.download = 'lingua-kids-reminder.ics';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
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

  // A progress card to share with family: one square picture of what the child has done
  function drawCard() {
    const me = Store.kidsProfiles.find(p => p.active);
    const learned = KIDS_WORDS.filter(w => Store.kidsWordCount(w.id) > 0);
    const trophies = trophyList().filter(t => t.got).length;
    const S = 1080, c = document.createElement('canvas');
    c.width = c.height = S;
    const g = c.getContext('2d');
    const sky = g.createLinearGradient(0, 0, 0, S);
    sky.addColorStop(0, '#57c1ff'); sky.addColorStop(1, '#d9f3ff');
    g.fillStyle = sky; g.fillRect(0, 0, S, S);
    const font = (px, w = 700) => `${w} ${px}px "Varela Round", "Heebo", sans-serif`;
    const round = (x, y, w, h, r, fill) => { g.beginPath(); if (g.roundRect) g.roundRect(x, y, w, h, r); else g.rect(x, y, w, h); g.fillStyle = fill; g.fill(); };   // older Safari has no roundRect
    g.textAlign = 'center'; g.textBaseline = 'middle';
    // header
    g.font = font(150, 400); g.fillText(me ? me.face : '🦉', S / 2, 150);
    g.fillStyle = '#1d2a5b'; g.font = font(62);
    g.fillText(me && me.name ? me.name : 'Lingua Kids', S / 2, 270);
    g.font = font(36, 400); g.fillStyle = '#2b3c7a';
    g.fillText(new Date().toLocaleDateString(isHe() ? 'he-IL' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), S / 2, 330);
    // four big numbers
    const stats = [['⭐', Store.kidsTotalStars, 'stars'], ['💬', learned.length, 'words'], ['🏝️', Store.kidsStickerCount, 'islands'], ['🏆', trophies, 'trophies']];
    stats.forEach(([pic, n, label], i) => {
      const x = 90 + (i % 2) * 460, y = 390 + Math.floor(i / 2) * 230;
      round(x, y, 440, 200, 40, '#ffffff');
      g.font = font(80, 400); g.fillText(pic, x + 90, y + 100);
      g.fillStyle = '#1d2a5b'; g.textAlign = 'left';
      g.font = font(78); g.fillText(String(n), x + 170, y + 82);
      g.font = font(34, 400); g.fillStyle = '#4b5a8c'; g.fillText(label, x + 172, y + 148);
      g.textAlign = 'center';
    });
    // a row of learned word pictures
    round(90, 870, 900, 120, 40, 'rgba(255,255,255,.85)');
    g.font = font(64, 400);
    learned.slice(-11).forEach((w, i) => g.fillText(w.pic, 150 + i * 79, 930));
    g.font = font(30, 400); g.fillStyle = '#1d2a5b';
    g.fillText('🦉 Lingua Kids · English for children', S / 2, 1040);
    return c;
  }
  function progressCard() {
    const c = drawCard(), url = c.toDataURL('image/png');
    const back = document.createElement('div');
    back.className = 'k-reveal';
    back.setAttribute('role', 'dialog');
    back.setAttribute('aria-modal', 'true');
    back.innerHTML = `
      <div class="k-reveal-card k-card-preview">
        <b>${kt('cardTitle')}</b>
        <img src="${url}" alt="${kt('cardTitle')}">
        <button class="k-btn" id="k-card-share">📤 ${kt('cardShare')}</button>
        <a class="k-btn ghost" id="k-card-save" href="${url}" download="lingua-kids.png">💾 ${kt('cardSave')}</a>
        <button class="k-skip" id="k-card-close">${kt('cardClose')}</button>
      </div>`;
    document.body.appendChild(back);
    const close = () => back.remove();
    back.querySelector('#k-card-close').onclick = close;
    back.onclick = e => { if (e.target === back) close(); };
    const share = back.querySelector('#k-card-share');
    share.onclick = () => c.toBlob(async blob => {
      const file = new File([blob], 'lingua-kids.png', { type: 'image/png' });
      try {
        if (navigator.canShare && navigator.canShare({ files: [file] })) await navigator.share({ files: [file], title: 'Lingua Kids' });
        else back.querySelector('#k-card-save').click();
      } catch (e) { /* closed the share sheet */ }
    });
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

  // ---------- the owl's question of the day ----------
  // One tiny question a day on the map, three picture answers. A wrong pick just wiggles; the right one
  // gives a little star and the card shows the answer until tomorrow.
  function qotdToday() {
    const d = new Date(), n = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5);
    return KIDS_QOTD[n % KIDS_QOTD.length];
  }
  function qotdCard() {
    const q = qotdToday(), done = Store.kidsQotdDone;
    const order = done ? q.answers : K.shuffle(q.answers);
    return `
      <div class="k-qotd ${done ? 'done' : ''}" id="k-qotd">
        <p class="k-qotd-k">🦉 ${kt('qotd')}</p>
        <button class="k-qotd-q en" id="k-qotd-say" lang="en" aria-label="${kt('listen')}: ${esc(q.en)}">🔊 ${esc(q.en)}</button>
        <small class="he">${q.he}</small>
        ${done
          ? `<p class="k-qotd-a"><span aria-hidden="true">${q.answers[0].pic}</span> <b class="en">${q.answers[0].en}</b> ✓ · ${kt('qotdDone')}</p>`
          : `<div class="k-qotd-opts">${order.map(a => `<button class="k-qotd-opt" data-en="${a.en}" aria-label="${a.en}"><span aria-hidden="true">${a.pic}</span><small class="en">${a.en}</small></button>`).join('')}</div>`}
      </div>`;
  }
  function qotdWire() {
    const box = $('#k-qotd');
    if (!box) return;
    const q = qotdToday();
    $('#k-qotd-say').onclick = () => sayEn(q.en, 0.85);
    box.querySelectorAll('.k-qotd-opt').forEach(b => {
      b.onclick = () => {
        if (b.dataset.en === q.answers[0].en) {
          box.querySelectorAll('.k-qotd-opt').forEach(x => { x.disabled = true; });
          b.classList.add('right');
          K.Feel.right();
          const n = Store.kidsQotdAnswer();
          Sfx.star(2);
          sayEn(`Yes! ${q.answers[0].en}!`, 0.9);
          setTimeout(() => {
            box.classList.add('done');
            box.querySelector('.k-qotd-opts').outerHTML = `<p class="k-qotd-a"><span aria-hidden="true">${q.answers[0].pic}</span> <b class="en">${q.answers[0].en}</b> ✓ · ${n > 1 ? kt('qotdCount', { n }) : kt('qotdDone')}</p>`;
          }, 1200);
        } else {
          K.Feel.wrong(b);
          sayEn(b.dataset.en, 0.9);
        }
      };
    });
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
          ${twinOf(w) ? `<p class="k-twin"><span aria-hidden="true">🤝</span> ${kt('twin')} <bdi dir="ltr" lang="en">${w.en}</bdi> = <bdi lang="he">${twinOf(w)}</bdi></p>` : `<p class="k-tip">${kt('meetTip')}</p>`}
          <button class="k-btn" id="k-next">${kt('next')} <span aria-hidden="true">${isHe() ? '←' : '→'}</span></button>
        </div>`;
      const pic = $('#k-pic');
      const hear = () => { w.says ? say([['en', w.en + '.'], ['en', `The ${w.en} says ${w.says}!`]]) : sayEn(w.en); pic.classList.remove('boing'); void pic.offsetWidth; pic.classList.add('boing'); };
      pic.onclick = hear;
      $('#k-next').onclick = nextStep;
      const twin = twinOf(w) && isHe() ? [['en', w.en], ['he', `${kt('twinSay')} ${twinOf(w)}`]] : null;
      if (n === 0) say([['he', kt('sayMeet')], ['en', w.en], ...(twin ? twin.slice(1) : [])]);
      else if (twin) setTimeout(() => say(twin), 150);
      else setTimeout(hear, 150);
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
            owlMood('cheer');
            $('.k-bubble').innerHTML = `<bdi dir="ltr" lang="en">${x.c.w.en}</bdi> · ${x.c.w.he} ✓`;
            K.lessonBar((steps.length - 1 + found / pairs.length) / steps.length);
            if (found === pairs.length) setTimeout(finish, 1100);
          } else {
            busy = true;
            owlMood('think');
            $('.k-bubble').textContent = kt('tryAgain');   // not a pair: a gentle nudge, the cards turn back
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
      // letter names that rhyme ("dee", "vee", "see") are hard to tell apart by ear: never offer them together
      const SOUNDALIKE = ['BCDEGPTVZ', 'AHJK', 'FLMNSX', 'IY', 'QUW'];
      const group = L => SOUNDALIKE.find(g => g.includes(L)) || L;
      const others = K.shuffle(KIDS_ABC.filter(y => y !== x && !group(x.L).includes(y.L)));
      const second = others[0], third = others.find(y => y !== second && !group(second.L).includes(y.L));
      const opts = K.shuffle([x, second, third]);
      let missed = false;
      K.view.innerHTML = `
        <div class="k-wrap k-play">
          <p class="k-step"><span aria-hidden="true">🔤</span> ${kt('abcFind')} · ${at + 1}/${rounds.length}</p>
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

  // ---------- twin words: English that sounds like Hebrew ----------
  function twinOf(w) { return w && KIDS_TWINS[w.en]; }
  function twinsHtml() {
    const all = Object.keys(KIDS_TWINS);
    const met = en => KIDS_WORDS.some(w => w.en === en && Store.kidsWordCount(w.id) > 0);
    const pic = en => (KIDS_WORDS.find(w => w.en === en) || {}).pic || '❔';
    const n = all.filter(met).length;
    return `
      <h2 class="k-title k-h2">🤝 ${kt('twinsTitle')}</h2>
      <p class="k-sub">${kt('twinsSub', { n, all: all.length })}</p>
      <div class="k-twins">${all.map(en => met(en)
        ? `<button class="k-twin-chip" data-en="${en}"><span aria-hidden="true">${pic(en)}</span><b class="en">${en}</b><small class="he">${KIDS_TWINS[en]}</small></button>`
        : `<span class="k-twin-chip locked" aria-hidden="true"><span>❔</span></span>`).join('')}</div>`;
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
        <a class="k-btn ghost" href="#/kids/mybook">📘 ${kt('mybook')}</a>
        ${calendarHtml()}
        ${twinsHtml()}
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
      // the gentle reminder: checked every minute while the app is open or in the background
      setInterval(remindTick, 60000);
      setTimeout(remindTick, 5000);
      // a twin word chip in the album says both twins: "banana - בננה"
      document.addEventListener('click', e => {
        const chip = e.target.closest('.k-twin-chip[data-en]');
        if (chip) say([['en', chip.dataset.en], ['he', KIDS_TWINS[chip.dataset.en]]]);
      });
    },
    // First meeting: the owl greets the child (Hebrew when there is a Hebrew voice, then English)
    hello() { say([['he', 'היי! אני הינשוף. בואו נלמד אנגלית ביחד!'], ['en', "Hello! Let's play!"]]); },
    show(a, b) {
      clearInterval(peekTimer);
      clearInterval(speedTimer);
      clearInterval(callTimer);
      clearInterval(bandTimer);
      clearInterval(brushTimer);
      clearTimeout(calmTimer);
      stopParent();
      if (rsRecorder && rsRecorder.state === 'recording') rsRecorder.stop();
      stopRec();
      stopRecording();
      clearHands();
      songRun++; songBand.stop();   // a song still playing stops, band too
      if (K.view.querySelector('.k-song')) speechSynthesis.cancel();   // leaving a song screen: stop its voice
      document.body.classList.add('kids');
      document.body.classList.toggle('night', isNight());
      document.body.classList.toggle('kids-big', Store.kidsBigPrint);
      document.body.classList.toggle('kids-little', little());
      if (a === 'parents') return parents();
      if (a === 'print') return printPage();
      if (a === 'cert') return certPage();
      if (a === 'recstory') return recStoryScreen();
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
      else if (a === 'ftree') familyTree();
      else if (a === 'calm') calmScreen();
      else if (a === 'slist') slistGame();
      else if (a === 'odd') oddGame();
      else if (a === 'bath') bathGame();
      else if (a === 'lotw') lotwScreen();
      else if (a === 'wxr') wxrGame();
      else if (a === 'pizza') pizzaGame();
      else if (a === 'feelst') feelStoryGame();
      else if (a === 'cbw') cbwGame();
      else if (a === 'peekaboo') peekabooGame();
      else if (a === 'morning') morningGame();
      else if (a === 'seesaw') seesawGame();
      else if (a === 'copy') copyGame();
      else if (a === 'brush') brushGame(b === 'fast');
      else if (a === 'shunt') shuntGame();
      else if (a === 'mybook') myBook();
      else if (a === 'safari') safariGame();
      else if (a === 'tmap') tmapScreen();
      else if (a === 'band') bandGame();
      else if (a === 'talk') talkGame();
      else if (a === 'teddy') teddyGame();
      else if (a === 'lullaby') lullaby();
      else if (a === 'zoo') zooGame();
      else if (a === 'call') callGame();
      else if (a === 'wear') wearGame();
      else if (a === 'rhyme') rhymeGame();
      else if (a === 'monster') monsterGame();
      else if (a === 'fam') famGame();
      else if (a === 'simon') simonGame();
      else if (a === 'hide') hideGame();
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
