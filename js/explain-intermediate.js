// Intermediate grammar: why each quiz answer is right and why each wrong option is wrong.
Object.assign(EXPLAIN, {
  'past-simple': [
    { ok: 'Yesterday מסמן זמן שהסתיים בעבר, לכן משתמשים ב-Past Simple. go הוא פועל לא סדיר, והעבר שלו הוא went.', no: {
      'go': 'go הוא צורת הבסיס (הווה). עם yesterday צריך עבר: went.',
      'gone': 'gone הוא הצורה השלישית (V3), והיא באה רק אחרי have / has. כאן אין have, ולכן went.',
      'going': 'going היא צורת ing, וצריך לפניה was / were או am / is / are. לבד היא לא יוצרת עבר.' } },
    { ok: 'אחרי didn\'t תמיד בא פועל בצורת הבסיס, בלי ed. סימן העבר כבר נמצא ב-did.', no: {
      'called': 'called כבר בעבר, ואחרי didn\'t לא מסמנים עבר פעמיים. אומרים didn\'t call.',
      'calls': 'calls עם s שייך להווה עם he / she / it. אחרי didn\'t באה רק צורת הבסיס call.',
      'calling': 'calling צריך לפניו be (was calling). אחרי didn\'t באה צורת הבסיס call.' } },
    { ok: 'שאלה בעבר פשוט נפתחת ב-Did, ואחריה הנושא ופועל בצורת בסיס: Did you finish...?', no: {
      'Do': 'Do פותח שאלה בהווה פשוט (הרגל). כאן שואלים על פעולה אחת שהייתה צריכה להסתיים, ולכן Did.',
      'Were': 'Were הוא עבר של to be ובא עם תואר או עם ing (Were you finishing). עם finish בצורת בסיס צריך Did.',
      'Have': 'Have בשאלה בא עם V3 (Have you finished). כאן finish בצורת בסיס, ולכן רק Did מתאים.' } },
  ],
  'past-continuous': [
    { ok: 'פעולה ארוכה שהייתה באמצע כשפעולה קצרה (the phone rang) קטעה אותה: Past Continuous, was + ing. עם I משתמשים ב-was.', no: {
      'cooked': 'cooked הוא עבר פשוט, פעולה שלמה. כאן הבישול היה באמצע כשהטלפון צלצל, ולכן was cooking.',
      'am cooking': 'am cooking הוא הווה מתמשך. המשפט מדבר על העבר (rang), ולכן was cooking.',
      'cook': 'cook הוא הווה פשוט. החלק השני בעבר (rang), והבישול נמשך באותו רגע: was cooking.' } },
    { ok: 'הנושא They ברבים, ובעבר מתמשך משתמשים איתו ב-were + ing: were sleeping.', no: {
      'was': 'was הולך עם I / he / she / it. They ברבים, ולכן were.',
      'did': 'did הוא פועל עזר של עבר פשוט ובא עם פועל בסיס (did sleep). לפני ing צריך was / were.',
      'are': 'are sleeping הוא הווה מתמשך, מה שקורה עכשיו. at midnight מתאר כאן רגע מסוים בעבר, ולכן were.' } },
    { ok: 'שאלה בעבר מתמשך: was / were + נושא + ing. הנושא you, ועם you תמיד were.', no: {
      'did': 'did בא עם פועל בסיס (What did you do). כאן יש doing בצורת ing, ולכן were.',
      'was': 'was לא הולך עם you. גם כשמדברים לאדם אחד אומרים you were.',
      'do': 'do הוא עזר של הווה פשוט ובא עם פועל בסיס. עם doing ועם yesterday צריך were.' } },
  ],
  'future': [
    { ok: 'אחרי I think מביעים דעה או תחזית על העתיד, ומשתמשים ב-will + פועל בסיס: will rain.', no: {
      'is': 'is לא בא לפני פועל בסיס, ולכן it is rain לא תקין. אפשר לומר it is going to rain.',
      'going': 'going לבד לא מספיק. צריך it is going to rain, עם is ועם to.',
      'does': 'does משמש לשאלה ושלילה בהווה פשוט ולא מבטא עתיד. לתחזית אחרי I think צריך will.' } },
    { ok: 'המבנה לתוכנית הוא be going to + פועל בסיס. כאן are going כבר כתוב, וחסר to buy.', no: {
      'buy': 'חסר to. אחרי going במשמעות תוכנית לעתיד חייב לבוא to: going to buy.',
      'buying': 'going buying לא קיים באנגלית. המבנה הוא going to + פועל בסיס.',
      'bought': 'bought הוא עבר. אחרי going to בא פועל בסיס, וגם חסר כאן to.' } },
    { ok: 'זו הבטחה לעתיד, ובהבטחות משתמשים ב-will. בשלילה will not = won\'t, ואחריו פועל בסיס.', no: {
      'don\'t': 'don\'t הוא שלילה בהווה פשוט ומתאר הרגל. כאן מבטיחים משהו לעתיד, ולכן won\'t.',
      'am not': 'אחרי am not לא בא פועל בסיס (am not tell לא תקין). להבטחה צריך won\'t tell.',
      'didn\'t': 'didn\'t מתאר עבר. Don\'t worry מדבר על מה שיקרה מעכשיו והלאה, ולכן won\'t.' } },
  ],
  'present-perfect': [
    { ok: 'Present Perfect בנוי מ-have / has + V3. הצורה השלישית של see היא seen.', no: {
      'saw': 'saw הוא עבר פשוט (V2) ולא בא אחרי have. אחרי have צריך V3: seen.',
      'see': 'see הוא צורת הבסיס. אחרי have בזמן Present Perfect צריך seen.',
      'seeing': 'seeing בא אחרי be (is seeing, have been seeing). אחרי have לבד צריך seen.' } },
    { ok: 'since 2019 מראה פעולה שהתחילה בעבר ונמשכת עד היום: Present Perfect. עם She משתמשים ב-has + V3.', no: {
      'have': 'have הולך עם I / you / we / they. She גוף שלישי יחיד, ולכן has.',
      'is': 'is lived לא תקין: is + V3 יוצר סביל, ו-live לא בא כך. צריך has lived.',
      'did': 'אחרי did בא פועל בסיס, ולכן did lived לא תקין. וגם since עד היום דורש Present Perfect.' } },
    { ok: 'five years הוא משך זמן, ועם משך זמן ב-Present Perfect משתמשים ב-for.', no: {
      'since': 'since בא עם נקודת התחלה (since 2019, since Monday). five years הוא משך, ולכן for.',
      'from': 'from בא בדרך כלל בזוג from ... to (מ... עד) ולא מתאר משך עם Present Perfect. צריך for.',
      'ago': 'ago בא אחרי משך הזמן ועם עבר פשוט (five years ago), ולא עם have known.' } },
  ],
  'comparatives': [
    { ok: 'than מסמן השוואה בין שניים. לתואר קצר כמו tall מוסיפים er: taller.', no: {
      'tall': 'tall הוא התואר הרגיל. עם than צריך צורת השוואה: taller.',
      'tallest': 'tallest היא צורת ההפלגה (הכי) ובאה עם the. עם than צריך taller.',
      'more tall': 'more בא עם תארים ארוכים (more expensive). tall קצר, ולכן taller.' } },
    { ok: 'the ... in town מראה הפלגה (הכי). expensive הוא תואר ארוך, ולכן the most expensive.', no: {
      'more': 'more משמש להשוואה בין שניים עם than. כאן יש the ו-in town, כלומר הכי: most.',
      'much': 'much בא לפני צורת השוואה (much more expensive), ולא לבד אחרי the. כאן צריך most.',
      'very': 'very רק מחזק (מאוד) ולא משווה. the ... in town מבקש הפלגה: the most expensive.' } },
    { ok: 'good הוא תואר לא סדיר: good, better, best. עם than משתמשים ב-better.', no: {
      'gooder': 'gooder לא קיים באנגלית. good לא סדיר, וצורת ההשוואה שלו היא better.',
      'more good': 'more good לא משמש כהשוואה. ל-good יש צורה מיוחדת: better.',
      'best': 'best היא הפלגה (הכי טוב) ובאה עם the. עם than צריך better.' } },
  ],
  'modals': [
    { ok: 'It is forbidden אומר שאסור. איסור מביעים ב-must not.', no: {
      'don\'t have to': 'don\'t have to אומר שאין צורך, אבל מותר. כאן אסור לעשן, ולכן must not.',
      'might': 'might מביע אפשרות (אולי). It is forbidden דורש איסור: must not.',
      'should': 'should הוא עצה (כדאי לעשות). המשפט מדבר על איסור, ולכן must not.' } },
    { ok: 'בשבת אין חובה לקום מוקדם. חוסר חובה מביעים ב-don\'t have to.', no: {
      'must not': 'must not הוא איסור. לא אסור לקום מוקדם בשבת, פשוט אין צורך.',
      'should': 'should הוא עצה לעשות משהו. ההקשר של שבת מראה שאין צורך לקום מוקדם.',
      'must': 'must הוא חובה. בשבת דווקא אין חובה, ולכן don\'t have to.' } },
    { ok: 'You look tired מוביל לעצה, ועצה מביעים ב-should.', no: {
      'might not': 'might not מביע אפשרות שלא (אולי לא). כאן נותנים עצה ללכת לישון: should.',
      'must not': 'must not הוא איסור. לא אוסרים על מישהו עייף ללכת לישון אלא ממליצים: should.',
      'don\'t have to': 'don\'t have to אומר שאין צורך. למי שנראה עייף נותנים עצה ללכת לישון: should.' } },
  ],
  'quantity': [
    { ok: 'money הוא שם עצם שאינו ניתן לספירה, ולכן שואלים How much.', no: {
      'many': 'many בא עם שמות נספרים ברבים (How many coins). money לא נספר, ולכן much.',
      'few': 'few בא עם שמות נספרים, ו-How few לא משמש לשאלה רגילה על כמות. עם money: How much.',
      'a few': 'a few בא עם שמות נספרים ברבים ולא אחרי How. עם money: How much.' } },
    { ok: 'במשפט שלילי (aren\'t) משתמשים ב-any.', no: {
      'some': 'some בא בדרך כלל במשפט חיובי. בשלילה כמו aren\'t אומרים any.',
      'much': 'much בא עם שמות שאינם נספרים. chairs נספר וברבים, ובשלילה כאן מתאים any.',
      'a little': 'a little בא עם שמות שאינם נספרים ובמשפט חיובי. chairs נספר, ובשלילה צריך any.' } },
    { ok: 'advice הוא שם עצם שאינו נספר: אין לו רבים והוא לא בא עם a / an. some good advice.', no: {
      'advices': 'advice לא נספר, ולכן אין לו צורת רבים עם s.',
      'an advice': 'אי אפשר לשים a / an לפני advice כי הוא לא נספר, וגם אחרי some לא בא a. אפשר a piece of advice.',
      'advises': 'advises הוא הפועל advise בגוף שלישי (הוא מייעץ). כאן צריך שם עצם: advice.' } },
  ],
  'conditionals-1': [
    { ok: 'תנאי ראשון: If + הווה פשוט, ובתוצאה will + פועל בסיס. עם she: studies (y אחרי עיצור הופך ל-ies).', no: {
      'will study': 'אחרי if בתנאי ראשון לא שמים will, גם כשמדברים על העתיד. אומרים If she studies.',
      'studied': 'studied שייך לתנאי השני (If she studied, she would pass). כאן יש will, ולכן הווה: studies.',
      'study': 'study בלי s לא מתאים ל-she. בגוף שלישי יחיד בהווה צריך studies.' } },
    { ok: 'בחלק התוצאה של תנאי ראשון משתמשים ב-will + פועל בסיס: will stay.', no: {
      'stayed': 'stayed הוא עבר. tomorrow והתנאי If it rains מדברים על העתיד, ולכן will stay.',
      'staying': 'staying לבד, בלי פועל עזר, לא יוצר זמן. צריך will stay.',
      'would stayed': 'אחרי would בא פועל בסיס (would stay), ו-would שייך לתנאי השני. כאן צריך will stay.' } },
    { ok: 'בחלק של if בתנאי ראשון בא הווה פשוט, גם כשמדובר בעתיד. עם I: am.', no: {
      'will be': 'אחרי if בתנאי ראשון לא שמים will. אומרים if I am late.',
      'was': 'was הוא עבר. I will call מראה עתיד, ולכן בחלק של if בא הווה: am.',
      'be': 'be הוא צורת הבסיס ולא בא לבד אחרי I. עם I בהווה: am.' } },
  ],
  'gerund-infinitive': [
    { ok: 'אחרי enjoy תמיד בא פועל עם ing: enjoy listening.', no: {
      'to listen': 'enjoy לא בא עם to + פועל. אחריו תמיד ing: enjoy listening.',
      'listen': 'אחרי enjoy לא בא פועל בצורת בסיס. צריך listening.',
      'listened': 'listened הוא עבר. אחרי enjoy בא פועל עם ing.' } },
    { ok: 'אחרי want בא to + פועל בסיס: wants to be.', no: {
      'being': 'want לא בא עם ing. אומרים want to be.',
      'be': 'חסר to. אחרי want חייב לבוא to: wants to be.',
      'been': 'been הוא V3 ובא אחרי have / has. אחרי want צריך to be.' } },
    { ok: 'אחרי מילת יחס כמו for בא פועל עם ing: for helping.', no: {
      'to help': 'אחרי מילת יחס (for) לא בא to + פועל. צריך ing: for helping.',
      'help': 'אחרי for לא בא פועל בצורת בסיס. פועל אחרי מילת יחס מקבל ing.',
      'helped': 'helped הוא עבר ולא בא אחרי מילת יחס. אומרים Thank you for helping me.' } },
  ],
  'i-perfect-vs-past': [
    { ok: 'yesterday הוא זמן מוגדר שהסתיים, ולכן Past Simple: lost.', no: {
      'have lost': 'Present Perfect לא בא עם זמן מוגדר בעבר כמו yesterday. צריך lost.',
      'lose': 'lose הוא הווה. yesterday דורש עבר: lost.',
      'has lost': 'has הולך עם he / she / it ולא עם I, וגם Present Perfect לא בא עם yesterday.' } },
    { ok: 'ever ו-been מראים Present Perfect (ניסיון בחיים). השאלה בנויה Have + you + V3.', no: {
      'Did': 'אחרי Did בא פועל בסיס (Did you go), לא been. been דורש Have.',
      'Were': 'Were you been לא תקין. been בא רק אחרי have / has.',
      'Are': 'Are you been לא קיים באנגלית. עם been ו-ever צריך Have.' } },
    { ok: 'in 2019 הוא זמן מוגדר בעבר, ולכן Past Simple: moved.', no: {
      'has moved': 'Present Perfect לא בא עם תאריך מוגדר בעבר כמו in 2019. צריך moved.',
      'have moved': 'have לא הולך עם She, וגם Present Perfect לא בא עם in 2019.',
      'moving': 'moving בלי be לא יוצר זמן. עם in 2019 צריך עבר פשוט: moved.' } },
  ],
  'i-present-continuous-future': [
    { ok: 'סידור שנקבע מראש (at four tomorrow) מביעים ב-Present Continuous: am + ing. עם I: am seeing.', no: {
      'am see': 'אחרי am לא בא פועל בסיס. צריך am seeing.',
      'seeing': 'חסר am. צורת ing לבד לא יוצרת זמן: I am seeing.',
      'sees': 'sees הוא הווה פשוט לגוף שלישי (he sees). הנושא I, ולסידור עתידי צריך am seeing.' } },
    { ok: 'flying בצורת ing דורש be לפניו. הנושא We ברבים: are flying, תוכנית קבועה ליום שישי.', no: {
      'will': 'will בא עם פועל בסיס (will fly), לא עם flying.',
      'do': 'do בא עם פועל בסיס, לא עם ing. צריך are flying.',
      'is': 'is הולך עם he / she / it. We ברבים, ולכן are.' } },
    { ok: 'שאלה על תוכניות: What are you doing tonight? עם you משתמשים ב-are + ing.', no: {
      'do': 'do בא עם פועל בסיס (What do you do). עם doing צריך are.',
      'will': 'will בא עם פועל בסיס (What will you do). עם doing צריך are.',
      'is': 'is לא הולך עם you. אומרים you are.' } },
  ],
  'i-too-enough': [
    { ok: 'too + תואר אומר יותר מדי, עד שאי אפשר: too hot to drink.', no: {
      'enough': 'enough בא אחרי התואר (hot enough) ואומר מספיק. כאן הקפה חם מדי, ולכן too.',
      'too much': 'too much בא לפני שם עצם שאינו נספר (too much sugar), לא לפני תואר כמו hot.',
      'too many': 'too many בא לפני שם עצם ברבים (too many cups), לא לפני תואר.' } },
    { ok: 'עם תואר, enough בא אחריו: old enough (מבוגר מספיק).', no: {
      'enough old': 'סדר שגוי. enough בא אחרי התואר: old enough.',
      'too old enough': 'אי אפשר לשלב too ו-enough יחד לפני ואחרי אותו תואר. כאן: not old enough.',
      'old too': 'too בא לפני התואר (too old), לא אחריו. והמשמעות כאן היא שהוא צעיר מדי: not old enough.' } },
    { ok: 'people הוא שם עצם נספר ברבים, ולכן too many.', no: {
      'too much': 'too much בא עם שמות שאינם נספרים (too much noise). people נספר, ולכן too many.',
      'too': 'too לבד בא לפני תואר (too small), לא לפני שם עצם.',
      'enough of': 'enough of בא לפני the / my / them (enough of the cake), לא לפני people לבד. וגם small room מראה יותר מדי: too many.' } },
  ],
  'i-so-such': [
    { ok: 'such בא לפני a + תואר + שם עצם: such a good film.', no: {
      'so': 'so בא לפני תואר לבד (so good), לא לפני a + שם עצם. כאן יש film, ולכן such.',
      'very': 'very a good film לא תקין. very בא אחרי a: a very good film.',
      'too': 'too a good film לא תקין, ו-too אומר יותר מדי. כאן: such a good film.' } },
    { ok: 'אחרי was בא תואר לבד (good) בלי שם עצם, ולכן so: so good that...', no: {
      'such': 'such בא לפני שם עצם (such good food). כאן אין שם עצם אחרי good.',
      'such a': 'such a בא לפני תואר + שם עצם ביחיד. כאן יש רק תואר: so good.',
      'so much': 'so much בא לפני שם עצם שאינו נספר או אחרי פועל, לא לפני תואר כמו good.' } },
    { ok: 'nice people הוא תואר + שם עצם ברבים, ולפני זה בא such בלי a.', no: {
      'so': 'so בא לפני תואר לבד. nice people כולל שם עצם, ולכן such.',
      'such a': 'a לא בא לפני שם ברבים. people ברבים, ולכן such בלי a.',
      'so much': 'so much לא בא לפני תואר + שם עצם. צריך such nice people.' } },
  ],
  'i-question-tags': [
    { ok: 'משפט חיובי עם are מקבל תגית שלילית עם אותו פועל: aren\'t you?', no: {
      'don\'t': 'don\'t מתאים למשפט עם פועל רגיל בהווה. כאן הפועל הוא are, ולכן aren\'t.',
      'isn\'t': 'isn\'t הולך עם he / she / it. הנושא you, ולכן aren\'t.',
      'weren\'t': 'weren\'t הוא עבר. המשפט בהווה (are), ולכן aren\'t.' } },
    { ok: 'משפט שלילי (does not) מקבל תגית חיובית עם אותו פועל עזר: does she?', no: {
      'doesn\'t': 'אחרי משפט שלילי התגית חיובית. doesn\'t מתאים רק אחרי משפט חיובי.',
      'is': 'פועל העזר במשפט הוא does, לא is. התגית חוזרת על אותו פועל עזר.',
      'do': 'do לא הולך עם she. בגוף שלישי יחיד: does.' } },
    { ok: 'went הוא עבר פשוט במשפט חיובי, ולכן התגית שלילית עם did: didn\'t they?', no: {
      'weren\'t': 'weren\'t מתאים למשפט עם were. כאן פועל רגיל בעבר (went), ולכן didn\'t.',
      'don\'t': 'don\'t הוא הווה. went בעבר, ולכן didn\'t.',
      'haven\'t': 'haven\'t מתאים ל-Present Perfect (have gone). went הוא עבר פשוט, ולכן didn\'t.' } },
  ],
  'i-adjectives-adverbs': [
    { ok: 'speaks הוא פועל, ופועל מתארים בתואר פועל. תואר הפועל של good הוא well.', no: {
      'good': 'good הוא שם תואר ומתאר שם עצם (a good speaker). כדי לתאר את speaks צריך well.',
      'goodly': 'goodly הוא לא תואר הפועל של good. הצורה הנכונה היא well.',
      'best': 'best היא צורת ההפלגה (הכי טוב), ואחרי very כאן צריך תואר פועל רגיל: very well.' } },
    { ok: 'drive הוא פועל, ולכן צריך תואר פועל: careful + ly = carefully.', no: {
      'careful': 'careful הוא שם תואר (a careful driver). לתיאור הפועל drive צריך carefully.',
      'care': 'care הוא שם עצם או פועל (אכפתיות, לדאוג). לתיאור drive צריך carefully.',
      'more careful': 'more careful הוא שם תואר בצורת השוואה. drive דורש תואר פועל: carefully.' } },
    { ok: 'לפני שם העצם runner צריך שם תואר. fast משמש גם כשם תואר וגם כתואר פועל.', no: {
      'fastly': 'fastly לא קיים באנגלית. גם תואר הפועל של fast הוא fast.',
      'quickly': 'quickly הוא תואר פועל ולא בא לפני שם עצם. אפשר a quick runner.',
      'well': 'well הוא תואר פועל ולא בא לפני runner. אפשר a good runner.' } },
  ],
  'i-indefinite-pronouns': [
    { ok: 'במשפט שלילי (did not) משתמשים ב-anyone.', no: {
      'no one': 'no one כבר שלילי, ויחד עם did not יוצאת שלילה כפולה, שאסורה באנגלית.',
      'nobody': 'nobody כבר שלילי, ועם did not זו שלילה כפולה. צריך anyone.',
      'anywhere': 'anywhere מתייחס למקום. see כאן מכוון לאנשים: anyone.' } },
    { ok: 'Everyone נחשב יחיד בדקדוק, ולכן is, למרות שהמשמעות היא כולם.', no: {
      'are': 'are הולך עם רבים. Everyone יחיד בדקדוק, ולכן is.',
      'be': 'be הוא צורת הבסיס ולא בא אחרי נושא בהווה. צריך is.',
      'were': 'were הוא עבר ומשמש עם רבים. Everyone יחיד, ואין כאן סימן לעבר: is.' } },
    { ok: 'המשפט חיובי (There is) והקופסה ריקה, ולכן nothing (שום דבר).', no: {
      'anything': 'anything בא במשפט שלילי או בשאלה. There is חיובי, ולכן nothing.',
      'nobody': 'nobody מתייחס לאנשים. בקופסה מדובר בחפצים: nothing.',
      'nowhere': 'nowhere מתייחס למקום, ו-There is nowhere in the box לא הגיוני. צריך nothing.' } },
  ],
  'i-time-clauses': [
    { ok: 'אחרי when שמדבר על העתיד בא הווה פשוט, לא will: when I get home.', no: {
      'will get': 'אחרי מילות זמן כמו when לא שמים will, גם כשמדובר בעתיד.',
      'got': 'got הוא עבר. I will call מראה עתיד, ולכן אחרי when בא הווה: get.',
      'getting': 'getting בלי am לא יוצר זמן. צריך when I get.' } },
    { ok: 'אחרי until בא הווה פשוט במשמעות עתיד. the rain הוא גוף שלישי יחיד: stops.', no: {
      'will stop': 'אחרי until לא שמים will, גם כשמדובר בעתיד.',
      'stop': 'the rain יחיד (it), ולכן בהווה מוסיפים s: stops.',
      'stopping': 'stopping בלי is לא יוצר זמן. צריך until the rain stops.' } },
    { ok: 'החלק עם as soon as בהווה (arrives), והחלק הראשי בעתיד: will start.', no: {
      'started': 'started הוא עבר. arrives בהווה כאן מבטא עתיד, ולכן בחלק הראשי will start.',
      'starting': 'starting בלי פועל עזר לא יוצר זמן. צריך will start.',
      'would started': 'אחרי would בא פועל בסיס, וגם would לא מתאים כאן. צריך will start.' } },
  ],
  'i-make-do': [
    { ok: 'עם mistake משתמשים ב-make, ובעבר (yesterday): made.', no: {
      'did': 'do לא בא עם mistake. אומרים make a mistake, ובעבר made.',
      'done': 'done הוא V3 של do ובא אחרי have. וגם mistake הולך עם make.',
      'make': 'make הוא הווה. yesterday דורש עבר: made.' } },
    { ok: 'מטלות בית כמו the dishes הולכות עם do. אחרי can בא פועל בסיס: do.', no: {
      'make': 'make לא בא עם the dishes. מטלות בית הן do: do the dishes.',
      'doing': 'אחרי can בא פועל בסיס, לא צורת ing.',
      'made': 'אחרי can בא פועל בסיס, וגם the dishes הולך עם do ולא עם make.' } },
    { ok: 'decision הולך עם make: make a decision. אחרי to בא פועל בסיס.', no: {
      'do': 'do לא בא עם decision. אומרים make a decision.',
      'doing': 'אחרי need to בא פועל בסיס, וגם decision הולך עם make.',
      'done': 'done הוא V3 ולא בא אחרי to. וגם decision הולך עם make.' } },
  ],
  'i-verb-prepositions': [
    { ok: 'depend הולך תמיד עם on: depends on.', no: {
      'in': 'depend לא בא עם in, למרות שבעברית אומרים "תלוי ב". הצירוף הקבוע הוא depend on.',
      'of': 'depend of לא נכון באנגלית. אומרים depend on.',
      'from': 'depend from לא נכון באנגלית. אומרים depend on.' } },
    { ok: 'listen הולך עם to לפני מה שמקשיבים לו: listening to music.', no: {
      'at': 'listen at לא נכון. at בא עם look (look at), ו-listen הולך עם to.',
      'on': 'listen on לא נכון באנגלית. אומרים listen to.',
      'for': 'listen for אומר להקשיב כדי לשמוע צליל מסוים שמחכים לו. להאזין למוזיקה: listen to.' } },
    { ok: 'discuss בא ישירות עם מושא, בלי מילת יחס: discuss the plan.', no: {
      'discuss about': 'discuss לא מקבל about (טעות נפוצה בגלל "לדון על"). אומרים discuss the plan.',
      'talk': 'talk צריך מילת יחס לפני הנושא: talk about the plan. בלי about זה לא נכון.',
      'speak': 'speak לא בא ישירות עם the plan. אומרים speak about the plan.' } },
  ],
  'i-for-since-ago': [
    { ok: 'ten years הוא משך זמן, ועם Present Perfect ומשך זמן משתמשים ב-for.', no: {
      'since': 'since בא עם נקודת התחלה (since 2015). ten years הוא משך, ולכן for.',
      'ago': 'ago בא אחרי משך הזמן ועם עבר פשוט (ten years ago), לא עם have known.',
      'during': 'during בא לפני שם של תקופה או אירוע (during the war), ולא מתאר כמה זמן משהו נמשך עד עכשיו.' } },
    { ok: 'eight o\'clock היא נקודת התחלה, ועם Present Perfect (We\'ve been) משתמשים ב-since.', no: {
      'for': 'for בא עם משך זמן (for two hours). eight o\'clock היא נקודה בזמן: since.',
      'ago': 'ago בא אחרי משך זמן ועם עבר פשוט. eight o\'clock ago לא קיים.',
      'from': 'from בא בדרך כלל עם to (from eight to ten). עם Present Perfect עד עכשיו משתמשים ב-since.' } },
    { ok: 'ago בא אחרי משך זמן ועם עבר פשוט (moved): three years ago, כלומר לפני שלוש שנים מעכשיו.', no: {
      'before': 'before מודד מנקודה אחרת בעבר. כשמודדים מעכשיו עם עבר פשוט אומרים ago.',
      'since': 'since בא לפני נקודת התחלה ועם Present Perfect, לא אחרי three years.',
      'for': 'for בא לפני משך (for three years) ומתאר כמה זמן, לא מתי. מתי עברו: three years ago.' } },
  ],
  'i-reflexive': [
    { ok: 'enjoy yourself הוא ביטוי קבוע (ליהנות). הנושא you, ולכן yourself.', no: {
      'you': 'כשהנושא והמושא הם אותו אדם צריך כינוי חוזר: enjoy yourself.',
      'yours': 'yours הוא כינוי שייכות (שלך). כאן צריך כינוי חוזר: yourself.',
      'yourselfs': 'yourselfs לא קיים. ברבים f הופך ל-ves: yourselves. כאן ליחיד: yourself.' } },
    { ok: 'The children ברבים, והכינוי החוזר לרבים הוא themselves (בעצמם).', no: {
      'theirselves': 'theirselves לא קיים באנגלית תקנית. הצורה הנכונה היא themselves.',
      'themself': 'themself משמש רק לאדם אחד שמינו לא ידוע. children ברבים: themselves.',
      'them': 'them הוא כינוי מושא רגיל. כדי לומר שעשו בעצמם צריך כינוי חוזר: themselves.' } },
    { ok: 'by himself פירושו לבד. הנושא He, ולכן himself.', no: {
      'hisself': 'hisself לא קיים באנגלית תקנית. הצורה הנכונה היא himself.',
      'him': 'him הוא כינוי מושא רגיל, ו-by him פירושו לידו. לבד: by himself.',
      'his': 'his הוא כינוי שייכות ודורש שם עצם אחריו. לבד: by himself.' } },
  ],
  'i-so-neither': [
    { ok: 'הסכמה למשפט חיובי עם פועל רגיל בהווה (like) נעשית עם do: So do I.', no: {
      'am': 'am מתאים אם במשפט היה am (I am happy. So am I). כאן הפועל like, ולכן do.',
      'like': 'אחרי So בא פועל עזר, לא הפועל הראשי. אומרים So do I.',
      'does': 'does הולך עם he / she / it. הנושא כאן I, ולכן do.' } },
    { ok: 'במשפט יש wasn\'t, ולכן חוזרים על was. אחרי Neither הפועל חיובי: Neither was I.', no: {
      'did': 'did מתאים לפועל רגיל בעבר. כאן הפועל הוא to be (wasn\'t), ולכן was.',
      'wasn\'t': 'Neither כבר שלילי, ולכן הפועל אחריו חיובי. Neither wasn\'t זו שלילה כפולה.',
      'am': 'am הוא הווה. המשפט בעבר (wasn\'t), ולכן was.' } },
    { ok: 'במשפט יש can, ולכן חוזרים עליו: So can her brother.', no: {
      'does': 'does מתאים למשפט עם פועל רגיל בהווה. כאן יש can, וחוזרים עליו.',
      'is': 'is מתאים למשפט עם to be. כאן יש פועל מודאלי, can.',
      'swims': 'אחרי So בא פועל עזר או מודאלי, לא הפועל הראשי. So can her brother.' } },
  ],
  'i-spell-ed': [
    { ok: 'live נגמר ב-e, ולכן מוסיפים רק d: lived.', no: {
      'liveed': 'כשהפועל נגמר ב-e לא מוסיפים ed מלא אלא רק d: lived.',
      'livd': 'ה-e של live נשמרת, ומוסיפים אחריה d: lived.',
      'lifed': 'lifed לא קיים. ה-v לא הופכת ל-f, והעבר של live הוא lived.' } },
    { ok: 'study נגמר בעיצור + y, ולכן y הופך ל-i ומוסיפים ed: studied.', no: {
      'studyed': 'אחרי עיצור (d) + y, ה-y הופך ל-i לפני ed: studied.',
      'studdied': 'אין כאן הכפלה של d. מכפילים רק עיצור אחרון שאחרי תנועה אחת מוטעמת. הנכון: studied.',
      'studyied': 'לא שומרים גם y וגם i. ה-y הופך ל-i: studied.' } },
    { ok: 'stop הוא הברה אחת שנגמרת בעיצור, תנועה, עיצור, ולכן מכפילים את p: stopped.', no: {
      'stoped': 'חסרה הכפלת ה-p. בהברה אחת שנגמרת בעיצור, תנועה, עיצור מכפילים: stopped.',
      'stopt': 'stopt לא תקין באנגלית של היום. stop הוא פועל סדיר: stopped.',
      'stoppd': 'חסרה ה-e. אחרי הכפלת העיצור מוסיפים ed: stopped.' } },
  ],
});
