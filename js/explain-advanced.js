// Advanced grammar: why each quiz answer is right and why each wrong option is wrong.
Object.assign(EXPLAIN, {
  'present-perfect-continuous': [
    { ok: 'המילה since מראה פעולה שהתחילה בעבר ונמשכת עד עכשיו. לכן Present Perfect Continuous: have been + ing, כלומר have been waiting.',
      no: {
        'am waiting': 'am waiting הוא Present Continuous, פעולה שקורית עכשיו. עם since שמתאר משך עד עכשיו צריך have been waiting.',
        'wait': 'wait הוא Present Simple להרגלים. הוא לא מבטא פעולה שנמשכת מנקודה בעבר עד עכשיו, כמו שדורש since.',
        'was wait': 'הצורה was wait לא קיימת באנגלית: אחרי was בא פועל עם ing (was waiting). כאן בכלל צריך have been waiting בגלל since.'
      } },
    { ok: 'אחרי has been תמיד בא פועל עם ing. המבנה has been working מתאר פעולה שנמשכת כל הבוקר עד עכשיו.',
      no: {
        'work': 'work היא צורת הבסיס. אחרי has been לא בא פועל בסיס, צריך את צורת ה ing: working.',
        'worked': 'worked הוא V3, ו has been worked היה סביל (מישהו "הועבד"). כאן היא עובדת בעצמה, לכן working.',
        'works': 'works הוא Present Simple לגוף שלישי. אחרי has been לא בא פועל בהווה פשוט, אלא צורת ing.'
      } },
    { ok: 'במשפט יש been learning, כלומר Present Perfect Continuous. בשאלה העזר have עובר לפני הנושא: How long have you been learning?',
      no: {
        'are': 'are שייך ל Present Continuous (Are you learning?). הוא לא מתחבר ל been, כי been בא רק אחרי have / has / had.',
        'do': 'do הוא עזר של Present Simple ואחריו בא פועל בסיס. הוא לא יכול לבוא עם been learning.',
        'did': 'did הוא עזר של Past Simple ואחריו בא פועל בסיס (did you learn). been learning דורש have.'
      } }
  ],
  'past-perfect': [
    { ok: 'הסרט התחיל לפני שהגענו (got there), כלומר פעולה מוקדמת יותר בעבר. לכן Past Perfect: had + V3, had already started.',
      no: {
        'has': 'has started הוא Present Perfect שקשור להווה. הסיפור כולו בעבר (got there), ולכן צריך had.',
        'was': 'was + started יוצר צורה סבילה, כאילו מישהו "התחיל" את הסרט. לפעולה שקדמה לפעולה אחרת בעבר צריך had started.',
        'did': 'אחרי did בא תמיד פועל בסיס (did start), לא V3. וכאן צריך Past Perfect: had started.'
      } },
    { ok: 'הוא לא אכל לפני הרגע שבו היה רעב (was hungry), כלומר עבר מוקדם יותר. בשלילה של Past Perfect: hadn\'t + V3, hadn\'t eaten.',
      no: {
        'hasn\'t': 'hasn\'t eaten הוא Present Perfect שקשור לעכשיו. המשפט בעבר (was hungry), ולכן צריך hadn\'t.',
        'didn\'t': 'אחרי didn\'t בא פועל בסיס (didn\'t eat), לא V3 כמו eaten. לכן didn\'t eaten לא נכון.',
        'wasn\'t': 'wasn\'t eaten הוא סביל ומשמעותו "הוא לא נאכל". המשמעות כאן היא שהוא לא אכל, לכן hadn\'t eaten.'
      } },
    { ok: 'אחרי had (גם עם never באמצע) בא V3. הצורה השלישית של try היא tried: had never tried.',
      no: {
        'try': 'try היא צורת הבסיס. ב Past Perfect אחרי had צריך V3: tried.',
        'trying': 'trying היא צורת ing. had trying לא קיים; ל Past Perfect Continuous צריך had been trying, וכאן מתאים had tried.',
        'tries': 'tries הוא Present Simple לגוף שלישי. אחרי had לא בא פועל בהווה, אלא V3: tried.'
      } }
  ],
  'passive': [
    { ok: 'הגשר לא בנה, אלא נבנה, לכן סביל: be + V3. השנה 1950 היא עבר, והנושא יחיד, לכן was built.',
      no: {
        'has': 'has built הוא פעיל (הגשר בנה משהו) ו Present Perfect, שלא הולך עם שנה מסוימת בעבר כמו 1950.',
        'did': 'אחרי did בא פועל בסיס, לא V3. בסביל משתמשים ב be, כאן was built.',
        'were': 'were הולך עם נושא ברבים. This bridge הוא יחיד, לכן was.'
      } },
    { ok: 'המכתבים נשלחים (סביל), וזה קורה כל שני (every Monday), כלומר הווה פשוט. הנושא letters ברבים, לכן are sent.',
      no: {
        'is': 'is הולך עם נושא ביחיד. The letters הוא רבים, לכן are.',
        'be': 'be בצורת הבסיס בא רק אחרי מודאל או to (must be, to be). כאן צריך פועל מוטה בהווה: are.',
        'been': 'been בא רק אחרי have / has / had (have been sent). לבדו הוא לא יכול לשמש כפועל.'
      } },
    { ok: 'אחרי מודאל כמו must בא פועל בסיס. בסביל עם מודאל המבנה הוא modal + be + V3: must be finished.',
      no: {
        'been': 'must been לא קיים. been בא אחרי have (must have been finished, וזו הסקה על העבר). כאן צריך must be.',
        'to be': 'אחרי מודאל כמו must לא בא to. אומרים must be ולא must to be.',
        'being': 'אחרי מודאל לא בא פועל עם ing. הצורה הנכונה היא must be finished.'
      } }
  ],
  'conditionals-2': [
    { ok: 'במשפט יש would travel, כלומר תנאי שני (מצב דמיוני בהווה). בחלק של if באים Past Simple, ועם to be נהוג were לכל הגופים: If I were rich.',
      no: {
        'am': 'am הוא הווה רגיל ומתאים לתנאי ראשון (If I am..., I will...). כאן יש would, לכן were.',
        'would be': 'בחלק של if לא שמים would. would מופיע רק בחלק של התוצאה.',
        'will be': 'will לא בא בחלק של if. וחוץ מזה זה תנאי דמיוני עם would, לכן were.'
      } },
    { ok: 'If she had called הוא Past Perfect, כלומר תנאי שלישי (עבר שלא קרה). בתוצאה: would have + V3, would have come.',
      no: {
        'will': 'will have come הוא Future Perfect ולא מתאים לתנאי שלישי. בתוצאה של תנאי שלישי צריך would have.',
        'had': 'had have come לא קיים. had שייך לחלק של if, ובתוצאה בא would have.',
        'did': 'did have come לא קיים באנגלית. בתוצאה של תנאי שלישי המבנה הוא would have + V3.'
      } },
    { ok: 'If I were you הוא תנאי שני, מצב דמיוני לנתינת עצה. בתוצאה בא would + פועל בסיס: I would accept.',
      no: {
        'will': 'will שייך לתנאי ראשון (מצב אפשרי). If I were you הוא דמיוני, ולכן בתוצאה בא would.',
        'did': 'did accept הוא עבר (או הדגשה של עבר). התוצאה בתנאי שני דורשת would accept.',
        'am': 'am accept לא קיים: אחרי am לא בא פועל בסיס. בתוצאה של תנאי שני צריך would.'
      } }
  ],
  'reported-speech': [
    { ok: 'בדיבור עקיף אחרי He said בדרך כלל מזיזים את הזמן צעד אחורה: am הופך ל was. ועם he משתמשים ב was.',
      no: {
        'is': 'is משאיר את ההווה של הציטוט. אחרי said בעבר מקובל להעביר את הזמן אחורה: was.',
        'were': 'were הולך עם you / we / they. עם he בעבר אומרים was.',
        'be': 'be בצורת בסיס לא יכול להיות הפועל העיקרי אחרי he. צריך צורה מוטה בעבר: was.'
      } },
    { ok: 'אחרי הפועל בא me, כלומר אדם שמקבל את המידע. tell בא ישירות עם אדם (told me), והמשפט בעבר (was late), לכן told.',
      no: {
        'said': 'said לא בא ישירות עם אדם אחריו. אומרים said that או said to me, אבל told me.',
        'says': 'says הוא הווה, והוא גם לא בא ישירות עם me. צריך told me.',
        'tell': 'tell הוא הווה בצורת בסיס, ועם she צריך tells. והמשפט בעבר, לכן told.'
      } },
    { ok: 'בדיבור עקיף אחרי said, will הופך ל would: I will help הופך ל He said he would help.',
      no: {
        'will': 'will נשאר מהציטוט הישיר. אחרי He said מזיזים את הזמן אחורה, ו will הופך ל would.',
        'can': 'can משנה את המשמעות (יכול ולא יעזור). וגם can היה הופך ל could בדיבור עקיף. מהציטוט will נקבל would.',
        'did': 'did help אומר שהוא עזר בפועל. הציטוט מדבר על עתיד (will), ולכן בדיבור עקיף would.'
      } }
  ],
  'relative-clauses': [
    { ok: 'The man הוא אדם, ומילת היחס שמתייחסת לאדם שהוא הנושא של הפסוקית (הוא התקשר) היא who.',
      no: {
        'which': 'which מתייחס לדברים ובעלי חיים, לא לבני אדם. עבור the man משתמשים ב who.',
        'where': 'where מתייחס למקומות. the man הוא אדם, לכן who.',
        'whose': 'whose מציין שייכות (של מי) ואחריו בא שם עצם (whose phone). כאן אחריו בא פועל, לכן who.'
      } },
    { ok: 'the house הוא מקום, ובפסוקית I grew up חסר "שבו". למקום משתמשים ב where: the house where I grew up.',
      no: {
        'who': 'who מתייחס לבני אדם בלבד. house הוא מקום, לכן where.',
        'whose': 'whose מציין שייכות ואחריו בא שם עצם. כאן אין שייכות, יש מקום, לכן where.',
        'what': 'what לא בא אחרי שם עצם כמו the house. אחרי שם עצם משתמשים ב who / which / that / where.'
      } },
    { ok: 'התיק שייך לילדה (התיק שלה נגנב). לשייכות משתמשים ב whose + שם עצם: the girl whose bag.',
      no: {
        'who': 'the girl who bag was stolen לא תקין: who לא מציין שייכות. ל"התיק שלה" צריך whose.',
        'which': 'which מתייחס לדברים ולא מציין שייכות. כאן צריך whose bag.',
        'that': 'that מחליף who או which אבל לא מציין שייכות. רק whose אומר "של".'
      } }
  ],
  'used-to': [
    { ok: 'הרגל בעבר שהפסיק (but I stopped) מביעים ב used to + פועל בסיס. במשפט חיובי כותבים used.',
      no: {
        'use': 'use to בא רק אחרי did או didn\'t (Did you use to...?). במשפט חיובי כותבים used to.',
        'was used': 'was used to פירושו "הייתי רגיל ל", ואחריו בא ing או שם עצם. כאן מדובר בהרגל שהפסיק: used to smoke.',
        'am used': 'am used to פירושו "אני רגיל ל" בהווה, ואחריו ing. זה לא מתאים להרגל שהפסקתי.'
      } },
    { ok: 'אחרי did (בשאלה או בשלילה) בא פועל בסיס, ולכן did + use to: Did you use to live here?',
      no: {
        'used': 'did כבר מסמן עבר, ולכן אחריו בא פועל בסיס: use to ולא used to.',
        'using': 'אחרי did לא בא פועל עם ing. הצורה הנכונה היא Did you use to.',
        'uses': 'uses הוא הווה לגוף שלישי. אחרי did בא תמיד פועל בסיס: use.'
      } },
    { ok: 'be used to פירושו "רגיל ל", וכאן to היא מילת יחס, לכן אחריה בא פועל עם ing: is used to waking up.',
      no: {
        'wake up': 'ב be used to המילה to היא מילת יחס, ולכן לא בא אחריה פועל בסיס אלא ing: waking up.',
        'woke up': 'woke up הוא עבר פשוט. אחרי be used to צריך ing: waking up.',
        'wakes up': 'wakes up הוא הווה לגוף שלישי. אחרי be used to צריך צורת ing: waking up.'
      } }
  ],
  'a-wish': [
    { ok: 'wish על מצב בהווה (these days) מביעים ב Past Simple: I wish I had. העבר כאן מבטא שזה לא המצב האמיתי.',
      no: {
        'have': 'אחרי wish על ההווה לא משתמשים בהווה. מזיזים את הזמן אחורה: had.',
        'will have': 'wish לא בא עם will. לרצון על מצב בהווה משתמשים ב Past Simple: had.',
        'am having': 'have במשמעות "יש לי" לא בא ב Continuous, וגם אחרי wish על ההווה צריך Past Simple: had.'
      } },
    { ok: 'If only על משהו שקרה בעבר (yesterday) ומתחרטים עליו מביעים ב Past Perfect: hadn\'t sent.',
      no: {
        'haven\'t sent': 'haven\'t sent הוא Present Perfect. לחרטה על העבר אחרי If only צריך Past Perfect: hadn\'t sent.',
        'wouldn\'t send': 'wish / If only + would משמש לתלונה על התנהגות של מישהו אחר, לא לחרטה על העבר. כאן צריך hadn\'t sent.',
        'don\'t send': 'don\'t send הוא הווה. המשפט מדבר על אתמול, ולכן צריך Past Perfect: hadn\'t sent.'
      } },
    { ok: 'wish + would + פועל בסיס משמש לתלונה על התנהגות מעצבנת של מישהו אחר (all the time): I wish you would stop.',
      no: {
        'will stop': 'אחרי wish לא בא will. לתלונה על התנהגות של אחר משתמשים ב would: would stop.',
        'are stopping': 'אחרי wish לא בא Present Continuous. לבקשה שמישהו ישנה התנהגות צריך would stop.',
        'stop': 'stop בהווה לא בא אחרי wish. המבנה לתלונה הוא wish + would + פועל: would stop.'
      } }
  ],
  'a-mixed-conditionals': [
    { ok: 'התנאי בעבר (had gone), אבל התוצאה עכשיו (now). בתנאי מעורב כזה התוצאה היא would + פועל בסיס: wouldn\'t be.',
      no: {
        'won\'t be': 'won\'t שייך לתנאי ראשון, מצב אפשרי בעתיד. כאן התנאי דמיוני (had gone), ולכן wouldn\'t be.',
        'am not': 'am not מתאר מציאות. אחרי תנאי דמיוני התוצאה צריכה would: wouldn\'t be.',
        'hadn\'t been': 'hadn\'t been הוא Past Perfect ושייך לחלק של if. והתוצאה מדברת על עכשיו (now), לכן wouldn\'t be.'
      } },
    { ok: 'הפחד מטיסות הוא תכונה כללית שנכונה גם עכשיו, והתוצאה בעבר (would have come). לכן בחלק של if בא Past Simple: weren\'t.',
      no: {
        'isn\'t': 'isn\'t הוא הווה רגיל ומתאר תנאי אמיתי. כאן התנאי דמיוני (היא כן מפחדת), לכן weren\'t.',
        'wouldn\'t be': 'בחלק של if לא שמים would. would מופיע רק בחלק של התוצאה.',
        'won\'t be': 'בחלק של if לא שמים will, והתנאי כאן דמיוני. לכן weren\'t.'
      } },
    { ok: 'ההזמנה הייתה צריכה לקרות בעבר (in advance), והתוצאה עכשיו (right now). לכן בחלק של if בא Past Perfect: had booked.',
      no: {
        'would book': 'בחלק של if לא שמים would. לתנאי דמיוני על העבר צריך Past Perfect: had booked.',
        'have booked': 'have booked הוא Present Perfect ולא משמש לתנאי דמיוני. על העבר שלא קרה צריך had booked.',
        'book': 'book בהווה מתאים לתנאי ראשון (If we book, we will...). כאן מדובר בעבר שלא קרה, לכן had booked.'
      } }
  ],
  'a-causative': [
    { ok: 'אני לא מטפל ברכב בעצמי, מישהו עושה זאת בשבילי: have + object + V3. וזה קורה כל שנה, לכן הווה פשוט: I have my car serviced.',
      no: {
        'am': 'am my car serviced לא קיים. במבנה הגורם משתמשים ב have / get: have my car serviced.',
        'do': 'do my car serviced לא קיים. do לא יוצר מבנה גורם; צריך have something done.',
        'make': 'make בא עם אדם ופועל בסיס (make someone do). עם חפץ ו V3 צריך have: have my car serviced.'
      } },
    { ok: 'המשרד הוא החפץ שעליו עושים את העבודה, ולכן אחריו בא V3: having the office painted.',
      no: {
        'paint': 'have + פועל בסיס בא כשאחרי have יש אדם שעושה את העבודה (have the painter paint). כאן אחרי have בא החפץ, לכן painted.',
        'painting': 'the office painting היה אומר שהמשרד עצמו צובע. המשרד נצבע, לכן painted.',
        'to paint': 'במבנה have something done לא בא to. אחרי החפץ בא V3: painted.'
      } },
    { ok: 'have something done משמש גם לדבר רע שקרה לנו (הארנק נגנב). yesterday מראה עבר, לכן had his wallet stolen.',
      no: {
        'was': 'He was his wallet stolen לא תקין. אפשר לומר His wallet was stolen, אבל עם he כנושא צריך had.',
        'has been': 'has been his wallet stolen לא תקין, ו Present Perfect גם לא הולך עם yesterday. צריך had.',
        'did': 'אחרי did בא פועל בסיס ולא מבנה עם V3. לדבר שקרה לו בעבר אומרים had his wallet stolen.'
      } }
  ],
  'a-deduction': [
    { ok: 'הקרקע רטובה, ולכן מסיקים בוודאות על העבר (during the night): must have + V3, must have rained.',
      no: {
        'must': 'must rained לא תקין: אחרי must בא פועל בסיס. להסקה על העבר צריך must have rained.',
        'must had': 'אחרי מודאל בא תמיד have ולא had. הצורה הנכונה היא must have.',
        'must be': 'must be rained לא קיים (זה סביל, כאילו מישהו "הומטר"). להסקה על העבר: must have rained.'
      } },
    { ok: 'המעיל עדיין כאן, ולכן מסיקים שזה בלתי אפשרי שהיא עזבה. להסקה שלילית על העבר: can\'t have + V3, can\'t have left.',
      no: {
        'doesn\'t': 'doesn\'t have left לא תקין: אחרי doesn\'t בא פועל בסיס. להסקה צריך מודאל: can\'t have left.',
        'isn\'t': 'isn\'t have left לא קיים באנגלית. להסקה שלילית על העבר אומרים can\'t have left.',
        'hasn\'t': 'hasn\'t have left לא תקין (שני have). hasn\'t left הוא עובדה, אבל כאן זו הסקה: can\'t have left.'
      } },
    { ok: 'אחרי might have בא תמיד V3. הצורה השלישית של take היא taken: might have taken.',
      no: {
        'took': 'took הוא Past Simple (V2). אחרי might have צריך V3: taken.',
        'take': 'take היא צורת הבסיס, שבאה אחרי might בלבד (might take). אחרי might have צריך taken.',
        'taking': 'might have taking לא קיים. אחרי have בא V3: taken.'
      } }
  ],
  'a-inversion': [
    { ok: 'אחרי Never בתחילת המשפט עושים היפוך: עזר לפני הנושא. heard הוא V3 והנושא I, לכן Present Perfect: Never have I heard.',
      no: {
        'did': 'did I heard לא תקין: אחרי did בא פועל בסיס (did I hear). heard הוא V3, ולכן צריך have.',
        'am': 'am I heard יוצר סביל ("אני נשמע") וזו לא המשמעות. כאן צריך have heard.',
        'has': 'has הולך עם he / she / it. עם I אומרים have.'
      } },
    { ok: 'אחרי Not only בתחילת משפט עושים היפוך כמו בשאלה. בעבר פשוט מוסיפים did לפני הנושא, ואחריו פועל בסיס: did he miss.',
      no: {
        'he missed': 'זה סדר רגיל של משפט, בלי היפוך. אחרי Not only בהתחלה חייבים היפוך: did he miss.',
        'he did miss': 'he did miss הוא הדגשה, אבל עדיין בלי היפוך. צריך שהעזר יבוא לפני הנושא: did he miss.',
        'missed he': 'באנגלית של היום לא הופכים פועל ראשי. ההיפוך נעשה עם פועל עזר: did he miss.'
      } },
    { ok: 'Under no circumstances הוא ביטוי שלילי בתחילת המשפט, ולכן בא אחריו היפוך: המודאל לפני הנושא, should you.',
      no: {
        'you should': 'זה סדר רגיל בלי היפוך. אחרי ביטוי שלילי כמו Under no circumstances צריך should you.',
        'you must': 'גם כאן אין היפוך: הנושא לפני המודאל. אחרי ביטוי שלילי בתחילת המשפט צריך מודאל לפני הנושא.',
        'do you should': 'אי אפשר לשים do יחד עם מודאל כמו should. המודאל עצמו עובר לפני הנושא: should you.'
      } }
  ],
  'a-future-perfect-continuous': [
    { ok: 'By next June מציין נקודה בעתיד שעד אליה הפעולה תסתיים. לכן Future Perfect: will have + V3, will have finished.',
      no: {
        'will finishing': 'אחרי will בא פועל בסיס, לא ing. הצורה הנכונה כאן היא will have finished.',
        'will have finish': 'אחרי will have צריך V3 ולא פועל בסיס: finished.',
        'has finished': 'has finished הוא Present Perfect שקשור לעכשיו. By next June מדבר על העתיד, לכן will have finished.'
      } },
    { ok: 'This time next week מציין פעולה שתהיה באמצע התרחשות בזמן מסוים בעתיד. לכן Future Continuous: will be + ing, will be lying.',
      no: {
        'will lying': 'חסר be: אחרי will בא be ורק אחריו ing. הצורה הנכונה היא will be lying.',
        'will be lie': 'אחרי will be בא פועל עם ing ולא פועל בסיס: lying.',
        'lying': 'lying לבד הוא לא פועל מלא, חסר פועל עזר. בעתיד צריך will be lying.'
      } },
    { ok: 'at eight ... then מציין זמן בעתיד שבו אהיה באמצע ארוחה. לכן Future Continuous: will be having.',
      no: {
        'will having': 'חסר be: אחרי will בא be ואחריו ing. הצורה הנכונה היא will be having.',
        'will be have': 'אחרי will be בא פועל עם ing, לא פועל בסיס: having.',
        'have been having': 'have been having הוא Present Perfect Continuous ומתאר משהו שנמשך עד עכשיו. כאן מדובר בשעה שמונה בעתיד.'
      } }
  ],
  'a-cleft': [
    { ok: 'במשפט מודגש It was ... ומתייחסים לאדם (the manager) שהוא הנושא של הפעולה, ולכן who.',
      no: {
        'what': 'what לא בא אחרי שם עצם כמו the manager. לאדם משתמשים ב who (או that).',
        'whose': 'whose מציין שייכות ואחריו בא שם עצם. כאן אחריו בא פועל (approved), לכן who.',
        'where': 'where מתייחס למקום. the manager הוא אדם, לכן who.'
      } },
    { ok: 'What בתחילת משפט פירושו "הדבר ש...". המבנה What I need is ... מדגיש את מה שבא אחרי is.',
      no: {
        'That': 'That I really need is לא תקין. בתחילת משפט מודגש מסוג זה צריך What, שפירושו "הדבר ש".',
        'It': 'It I really need is לא תקין. המבנה עם It הוא It is ... that, וכאן צריך What.',
        'Which': 'which צריך שם עצם לפניו שאליו הוא מתייחס. בתחילת משפט במשמעות "הדבר ש" משתמשים ב What.'
      } },
    { ok: 'במבנה It ... that הנושא הוא It (יחיד), והאירוע בעבר (in 2015), לכן It was.',
      no: {
        'were': 'were הולך עם נושא ברבים. It הוא יחיד, לכן was.',
        'did': 'It did in 2015 לא תקין. במשפט מודגש עם It משתמשים בפועל to be: It was.',
        'has': 'has לא יוצר את המבנה It is ... that, ו Present Perfect גם לא הולך עם שנה בעבר כמו 2015.'
      } }
  ],
  'a-would-rather': [
    { ok: 'אחרי would rather (\'d rather) על עצמי בא פועל בסיס בלי to: I\'d rather stay.',
      no: {
        'to stay': 'אחרי would rather לא בא to. אומרים I\'d rather stay.',
        'staying': 'אחרי would rather לא בא ing. צריך פועל בסיס: stay.',
        'stayed': 'עבר בא אחרי would rather רק כשמדובר באדם אחר (I\'d rather you stayed). על עצמי: stay.'
      } },
    { ok: 'had better (\'d better) בא עם פועל בסיס בלי to, והשלילה היא had better not + פועל בסיס: You\'d better not be late.',
      no: {
        'don\'t be': 'אחרי had better לא בא don\'t. השלילה נוצרת ב not בלבד: \'d better not be.',
        'not to be': 'אחרי had better לא בא to. אומרים had better not be.',
        'won\'t be': 'אחרי had better לא בא will. צריך פועל בסיס: \'d better not be.'
      } },
    { ok: 'כשרוצים שאדם אחר (you) יעשה או לא יעשה משהו, אחרי would rather בא Past Simple: I\'d rather you didn\'t use.',
      no: {
        'don\'t use': 'כשיש נושא אחר אחרי would rather, משתמשים ב Past Simple גם על הווה: didn\'t use.',
        'won\'t use': 'אחרי would rather + נושא אחר לא בא will. צריך Past Simple: didn\'t use.',
        'not use': 'not use מתאים כשהנושא הוא אני (I\'d rather not use). כאן יש נושא אחר (you), לכן didn\'t use.'
      } }
  ],
  'a-concession': [
    { ok: 'אחרי החסר בא משפט שלם עם נושא ופועל (it was cold). Although מחבר משפט שלם וניגוד: Although it was cold.',
      no: {
        'Despite': 'Despite בא עם שם עצם או ing (Despite the cold), לא עם משפט שלם כמו it was cold.',
        'In spite of': 'In spite of בא עם שם עצם או ing, כמו despite, לא עם משפט עם נושא ופועל.',
        'However': 'However בא בדרך כלל בתחילת משפט חדש עם פסיק אחריו. הוא לא מחבר שני חלקים במשפט אחד כמו כאן.'
      } },
    { ok: 'אחרי החסר בא שם עצם (the bad weather), ו despite בא עם שם עצם: despite the bad weather.',
      no: {
        'although': 'although בא עם משפט שלם (although the weather was bad), לא עם שם עצם בלבד.',
        'even though': 'even though בא עם משפט שלם עם נושא ופועל, לא עם שם עצם כמו the bad weather.',
        'despite of': 'despite of לא קיים. אומרים despite או in spite of, בלי לערבב.'
      } },
    { ok: 'אחרי החסר בא ing (having a degree), ו In spite of בא עם שם עצם או ing.',
      no: {
        'Although': 'Although בא עם משפט שלם (Although he had a degree), לא עם צורת ing.',
        'Even though': 'Even though בא עם נושא ופועל (Even though he had a degree), לא עם having.',
        'In spite': 'חסרה המילה of. הביטוי המלא הוא In spite of.'
      } }
  ],
  'a-articles-general': [
    { ok: 'כשמדברים על מושג כללי, ובעיקר שם עצם מופשט כמו family, לא שמים the ולא a: Family is...',
      no: {
        'The family': 'The family מתייחס למשפחה מסוימת. כאן מדברים על משפחה כמושג כללי, לכן בלי the.',
        'A family': 'A family פירושו "משפחה אחת כלשהי". המשפט מדבר על המושג משפחה בכלל, לכן Family.',
        'The families': 'The families זה רבים ומסוים, והפועל is ביחיד. צריך Family.'
      } },
    { ok: 'המוזיקה מוגדרת: המוזיקה שמשמיעים בחדר הכושר הזה (they play at this gym). לכן the music.',
      no: {
        'a': 'music הוא שם עצם שאינו ספיר, ולכן לא בא עם a. וכאן גם מדובר במוזיקה מסוימת, לכן the.',
        'an': 'an בא לפני צליל תנועה ועם שם עצם ספיר ביחיד. music לא ספיר ומתחיל בעיצור, לכן the.',
        'these': 'these הולך עם רבים. music לא ספיר והוא ביחיד, לכן the.'
      } },
    { ok: 'Most + שם עצם ברבים בלי the מדבר על אנשים בכלל: Most people.',
      no: {
        'the people': 'Most the people לא תקין. לקבוצה מסוימת אומרים most of the people, אבל על אנשים בכלל: most people.',
        'of people': 'most of בא רק לפני מילה מגדירה (most of the people / my friends). על אנשים בכלל: most people.',
        'peoples': 'peoples פירושו עמים. לבני אדם באופן כללי people כבר רבים.'
      } }
  ],
  'a-participle-clauses': [
    { ok: 'קודם היא קראה ורק אחר כך ענתה. לפעולה שהסתיימה לפני הפעולה העיקרית משתמשים ב Having + V3: Having read.',
      no: {
        'Have read': 'Have read בלי נושא הוא לא פסוקית בינונית. כדי להראות פעולה שקדמה צריך Having read.',
        'Had read': 'Had read הוא Past Perfect וצריך נושא (She had read). בפסוקית בלי נושא משתמשים ב Having read.',
        'Having reading': 'Having reading לא קיים. אחרי Having בא V3: Having read.'
      } },
    { ok: 'הסיבה (הייתי עייף) קורית באותו זמן, והנושא (I) מרגיש בעצמו. לכן צורת ing פעילה: Feeling tired.',
      no: {
        'Felt': 'Felt כ V3 הוא סביל ("שהורגש"), וכ Past Simple הוא צריך נושא. אני הרגשתי בעצמי, לכן Feeling.',
        'To feel': 'To feel בתחילת משפט מבטא מטרה ("כדי להרגיש"). כאן זו סיבה, לכן Feeling.',
        'Feel': 'Feel היא צורת בסיס ונשמעת כמו ציווי. לסיבה בפסוקית בינונית משתמשים ב Feeling.'
      } },
    { ok: 'הגשר נבנה (לא בנה בעצמו), כלומר משמעות סבילה. לכן V3 בתחילת הפסוקית: Built in 1920.',
      no: {
        'Building': 'Building היא צורה פעילה, כאילו הגשר בונה משהו. הגשר נבנה, לכן Built.',
        'Having built': 'Having built הוא פעיל ומשמעותו "אחרי שבנה". הגשר לא בנה, הוא נבנה: Built.',
        'Build': 'Build היא צורת בסיס, לא מתאימה לפסוקית. למשמעות סבילה צריך V3: Built.'
      } }
  ],
  'a-emphatic-do': [
    { ok: 'כדי להדגיש פעולה (אני כן נעלתי) מוסיפים do / does / did לפני פועל בסיס. last night מראה עבר, לכן did lock.',
      no: {
        'do': 'do מדגיש בהווה. last night מדבר על העבר, ולכן did.',
        'was': 'was lock לא קיים: אחרי was לא בא פועל בסיס. להדגשה בעבר משתמשים ב did.',
        'have': 'have lock לא תקין: אחרי have בא V3. להדגשה של פעולה בעבר צריך did lock.'
      } },
    { ok: 'הדגשה בהווה (היא באמת רוצה) עם she: does + פועל בסיס, does want.',
      no: {
        'do': 'do הולך עם I / you / we / they. עם she בהווה משתמשים ב does.',
        'is': 'is want לא תקין. להדגשה משתמשים ב does לפני הפועל: does want.',
        'doing': 'doing לבד הוא לא פועל מוטה ולא יוצר הדגשה. צריך does want.'
      } },
    { ok: 'אחרי did (גם בהדגשה) בא תמיד פועל בסיס: did tell.',
      no: {
        'told': 'did כבר מסמן עבר, ולכן אחריו בא פועל בסיס ולא told.',
        'tells': 'אחרי did לא מוסיפים s לפועל. אומרים did tell.',
        'telling': 'אחרי did לא בא ing. צריך פועל בסיס: tell.'
      } }
  ],
  'a-conditions': [
    { ok: 'unless פירושו "אם לא": תפספס את האוטובוס אם לא תצא עכשיו.',
      no: {
        'unless not': 'unless כבר כולל שלילה ("אם לא"). unless not היה שלילה כפולה והופך את המשמעות.',
        'except': 'except פירושו "חוץ מ" ובא בדרך כלל עם שם עצם. לתנאי "אם לא" משתמשים ב unless.',
        'without': 'without היא מילת יחס ובאה עם שם עצם או ing, לא עם משפט שלם כמו you leave.'
      } },
    { ok: 'אחרי as long as (כמו אחרי if) משתמשים בהווה גם כשמדברים על העתיד, ועם you: are careful.',
      no: {
        'will be': 'אחרי as long as לא שמים will, גם כשמדובר בעתיד. משתמשים בהווה: are.',
        'would be': 'would לא מתאים לתנאי אמיתי כמו זה. אחרי as long as צריך הווה: are.',
        'be': 'be הוא צורת בסיס ולא מתאים לנושא you בהווה. צריך פועל מוטה: you are.'
      } },
    { ok: 'provided that פירושו "בתנאי ש". נחתום על החוזה בתנאי שהמחיר נכון.',
      no: {
        'provide that': 'הביטוי הוא provided that (או providing). provide that לבד הוא פועל רגיל ולא מילת תנאי.',
        'despite': 'despite מבטא ניגוד ("למרות") ובא עם שם עצם, לא עם משפט. כאן צריך תנאי: provided that.',
        'in case of': 'in case of בא עם שם עצם ומשמעותו "במקרה של". כאן יש משפט שלם ומשמעות של תנאי.'
      } }
  ],
  'a-should-have': [
    { ok: 'ביקורת על משהו שלא נעשה בעבר (Now it is too late): should have + V3, should have told.',
      no: {
        'should': 'should told לא תקין: אחרי should בא פועל בסיס. לביקורת על העבר צריך should have told.',
        'should of': 'should of היא טעות כתיב נפוצה, כי should\'ve נשמע כך. הצורה הנכונה היא should have.',
        'must': 'must told לא תקין, ו must מבטא חובה ולא ביקורת על העבר. צריך should have.'
      } },
    { ok: 'אחרי could have בא תמיד V3. הצורה השלישית של catch היא caught.',
      no: {
        'catch': 'catch היא צורת הבסיס. אחרי could have צריך V3: caught.',
        'catching': 'could have catching לא קיים. אחרי have בא V3: caught.',
        'to catch': 'אחרי have במבנה הזה לא בא to. צריך V3: caught.'
      } },
    { ok: 'חרטה על משהו שאמרתי (I\'m sorry): shouldn\'t have + V3, shouldn\'t have said.',
      no: {
        'shouldn\'t': 'shouldn\'t said לא תקין: אחרי shouldn\'t בא פועל בסיס. על העבר צריך shouldn\'t have said.',
        'should have not': 'סדר המילים שגוי. not בא מיד אחרי should: shouldn\'t have (should not have).',
        'didn\'t should': 'should הוא מודאל ולא בא עם did. השלילה היא shouldn\'t have.'
      } }
  ],
  'a-subjunctive': [
    { ok: 'אחרי insisted that בא subjunctive: פועל בצורת הבסיס לכל הגופים, בלי s ובלי זמן עבר: everyone arrive.',
      no: {
        'arrives': 'במבנה subjunctive אחרי insist that לא מוסיפים s גם עם everyone. הצורה הפורמלית הנכונה היא arrive.',
        'arrived': 'arrived הוא עבר רגיל. אחרי insisted that הפועל נשאר בצורת הבסיס גם כשהמשפט בעבר: arrive.',
        'to arrive': 'אחרי that בא משפט עם פועל, לא to + פועל. צריך everyone arrive.'
      } },
    { ok: 'אחרי It is vital that בא subjunctive: be בצורת הבסיס לכל הגופים, she be informed.',
      no: {
        'is': 'is הוא הווה רגיל. אחרי It is vital that משתמשים ב be לכל הגופים.',
        'was': 'was הוא עבר. במבנה subjunctive אחרי vital that צריך be.',
        'being': 'being לא יכול להיות הפועל העיקרי של המשפט אחרי she. צריך be.'
      } },
    { ok: 'אחרי recommend that בא subjunctive: פועל בסיס בלי s גם עם he: he consult.',
      no: {
        'consults': 'אחרי recommend that משתמשים בצורת הבסיס ולא מוסיפים s גם עם he: consult.',
        'consulting': 'אחרי that צריך משפט עם פועל מוטה. he consulting לא תקין, צריך he consult.',
        'to consult': 'אחרי that בא משפט עם נושא ופועל, לא to + פועל. לכן he consult ולא he to consult.'
      } }
  ],
  'a-past-perfect-continuous': [
    { ok: 'היא הייתה עייפה (עבר) בגלל פעולה שנמשכה לפני כן כל היום. לכן Past Perfect Continuous: had been working.',
      no: {
        'has been working': 'has been working הוא Present Perfect Continuous שקשור לעכשיו. המשפט בעבר (was tired), לכן had been working.',
        'was work': 'was work לא קיים: אחרי was בא ing. וכאן צריך משך לפני נקודה בעבר: had been working.',
        'had working': 'חסר been. Past Perfect Continuous נבנה כך: had been + ing.'
      } },
    { ok: 'חיכינו שעתיים (for two hours) עד שהסרט התחיל, משך לפני נקודה בעבר. לכן had been waiting.',
      no: {
        'have been waiting': 'have been waiting מתאר משך עד עכשיו. כאן הנקודה היא בעבר (when the film started), לכן had.',
        'had waited been': 'had waited been לא קיים; סדר המילים שגוי. הצורה היא had been waiting.',
        'were wait': 'were wait לא קיים: אחרי were בא ing. ולמשך לפני נקודה בעבר צריך had been waiting.'
      } },
    { ok: 'יש been learning ומדובר בעבר (before you moved). לכן העזר הוא had: How long had you been learning?',
      no: {
        'have': 'have been learning מתאר משך עד עכשיו. כאן הנקודה בעבר (before you moved), לכן had.',
        'did': 'did בא עם פועל בסיס ולא עם been. been בא רק אחרי have / has / had.',
        'were': 'were you been לא תקין. been בא אחרי had, לכן had you been learning.'
      } }
  ],
  'a-future-perfect-progressive': [
    { ok: 'By 6 pm + for ten hours: משך שיימשך עד נקודה בעתיד. לכן Future Perfect Continuous: will have been + ing.',
      no: {
        'will be have working': 'סדר המילים שגוי. הסדר הנכון הוא will have been working.',
        'will have working': 'חסר been. המבנה המלא הוא will have been working.',
        'will been working': 'חסר have. אחרי will בא have ורק אחריו been: will have been working.'
      } },
    { ok: 'Next year + teaching for a decade: משך שיגיע לעשור בנקודה בעתיד. לכן will have been teaching.',
      no: {
        'will be been': 'will be been לא קיים. been בא אחרי have: will have been.',
        'will have being': 'אחרי will have בא V3, כלומר been, ולא being.',
        'has been': 'has been teaching הוא Present Perfect Continuous שמסתיים עכשיו. Next year מדבר על העתיד, לכן will have been.'
      } },
    { ok: 'השאלה ב Future Perfect Continuous (have been waiting ... by the time he arrives). בשאלה will עובר לפני הנושא: Will you have been waiting?',
      no: {
        'Do': 'אחרי Do בא פועל בסיס, אבל have been waiting מסמן Future Perfect Continuous, שהעזר שלו הוא will.',
        'Are': 'Are you have been waiting לא תקין. אחרי are לא בא have. צריך Will.',
        'Have': 'Have you have been waiting כולל have פעמיים ולא תקין. בעתיד צריך Will you have been waiting.'
      } }
  ]
});
