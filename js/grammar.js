// Grammar rules. To add a rule, add an object to GRAMMAR.
//   title = English name, he = Hebrew name
//   when  = Hebrew explanation of when the rule is used
//   forms = [label, pattern] rows ('+' affirmative, '–' negative, '?' question, or any short label)
//   ex    = [English sentence, Hebrew translation]
//   tip   = Hebrew note about the most common mistake
//   quiz  = [sentence with ___, correct answer, [three wrong answers]]
const GRAMMAR = [
  // ======================= Beginner =======================
  {
    id: 'to-be', level: 'beginner', title: 'The verb "to be"', he: 'הפועל to be: am / is / are',
    when: 'משתמשים ב-am / is / are כדי לומר מי או מה מישהו, איך הוא מרגיש ואיפה הוא נמצא. בעברית אין לזה מילה בהווה ("אני עייף"), אבל באנגלית חייבים פועל: I am tired.',
    forms: [
      ['+', 'I am · He / She / It is · You / We / They are'],
      ['–', "I am not · He is not (isn't) · They are not (aren't)"],
      ['?', 'Am I…? · Is she…? · Are they…?']
    ],
    ex: [['I am from Israel.', 'אני מישראל.'], ['She is a doctor.', 'היא רופאה.'], ['They are not at home.', 'הם לא בבית.'], ["Are they at work today?", "הם בעבודה היום?"]],
    tip: 'טעות נפוצה: להשמיט את הפועל. לא "He tired" אלא "He is tired".',
    quiz: [['She ___ a teacher.', 'is', ['am', 'are', 'be']], ['We ___ happy today.', 'are', ['is', 'am', 'be']], ['I ___ not hungry.', 'am', ['is', 'are', 'be']]]
  },
  {
    id: 'articles', level: 'beginner', title: 'Articles: a, an, the', he: 'תוויות: a / an / the',
    when: 'a / an פירושו "אחד כלשהו", לא מסוים, בדרך כלל בפעם הראשונה שמזכירים משהו. the הוא ה"א הידיעה: משהו מסוים שהשומע מכיר. an בא לפני צליל של תנועה.',
    forms: [
      ['a', 'a book · a car · a university'],
      ['an', 'an apple · an hour · an idea'],
      ['the', 'the sun · the book on the table'],
      ['none', 'I like music. · She speaks English.']
    ],
    ex: [['I saw a dog. The dog was big.', 'ראיתי כלב. הכלב היה גדול.'], ['She is an engineer.', 'היא מהנדסת.'], ['Please close the door.', 'בבקשה סגור את הדלת.']],
    tip: 'במקצועות חייבים a / an: אומרים "I am a driver", לא "I am driver".',
    quiz: [['He is ___ engineer.', 'an', ['a', 'the', 'some']], ['I need ___ pen. Any pen is fine.', 'a', ['an', 'the', 'any']], ['___ sun is hot today.', 'The', ['A', 'An', 'Some']]]
  },
  {
    id: 'present-simple', level: 'beginner', title: 'Present Simple', he: 'הווה פשוט',
    when: 'להרגלים, לעובדות ולדברים שקורים באופן קבוע: כל יום, תמיד, בדרך כלל, אף פעם.',
    forms: [
      ['+', 'I / You / We / They work · He / She / It works'],
      ['–', "I do not (don't) work · She does not (doesn't) work"],
      ['?', 'Do you work? · Does she work?']
    ],
    ex: [['I work in Tel Aviv.', 'אני עובד בתל אביב.'], ['She drinks coffee every morning.', 'היא שותה קפה כל בוקר.'], ["We don't eat meat.", 'אנחנו לא אוכלים בשר.'], ["Does she work on Fridays?", "היא עובדת בימי שישי?"]],
    tip: 'בגוף שלישי יחיד (he / she / it) מוסיפים s לפועל: "He works". אחרי does ו-doesn\'t הפועל חוזר לצורת הבסיס: "She doesn\'t work".',
    quiz: [['He ___ football every Sunday.', 'plays', ['play', 'playing', 'is play']], ['They ___ like fish.', "don't", ["doesn't", "isn't", "aren't"]], ['___ she live here?', 'Does', ['Do', 'Is', 'Are']]]
  },
  {
    id: 'present-continuous', level: 'beginner', title: 'Present Continuous', he: 'הווה ממושך',
    when: 'למה שקורה עכשיו, ברגע זה, או בתקופה הנוכחית.',
    forms: [
      ['+', 'am / is / are + verb-ing: I am working · She is working'],
      ['–', "I am not working · She isn't working"],
      ['?', 'Are you working? · Is she working?']
    ],
    ex: [['I am reading now.', 'אני קורא עכשיו.'], ['He is talking on the phone.', 'הוא מדבר בטלפון.'], ['We are not sleeping.', 'אנחנו לא ישנים.'], ["Is he cooking dinner now?", "הוא מבשל ארוחת ערב עכשיו?"]],
    tip: 'פעלים של רגש ושל ידיעה (know, like, want, need) לא באים עם ing: אומרים "I know", לא "I am knowing".',
    quiz: [['Look! It ___ raining.', 'is', ['are', 'does', 'do']], ['They are ___ dinner now.', 'eating', ['eat', 'eats', 'ate']], ['I ___ working today.', 'am not', ["don't", "doesn't", 'not']]]
  },
  {
    id: 'plurals', level: 'beginner', title: 'Plural nouns', he: 'שמות עצם ברבים',
    when: 'רוב שמות העצם מקבלים s ברבים. יש כמה כללי כתיב וכמה מילים חריגות שצריך לזכור.',
    forms: [
      ['+ s', 'book → books · car → cars'],
      ['+ es', 'box → boxes · watch → watches · bus → buses'],
      ['y → ies', 'city → cities · baby → babies'],
      ['irregular', 'man → men · woman → women · child → children · person → people · foot → feet · tooth → teeth']
    ],
    ex: [['I have two brothers.', 'יש לי שני אחים.'], ['The children are at school.', 'הילדים בבית הספר.'], ['There are three boxes.', 'יש שלוש קופסאות.']],
    tip: 'שם תואר לא מקבל s: אומרים "two big cars", לא "two bigs cars". המילה people היא כבר רבים: "people are".',
    quiz: [['Two ___ are waiting outside.', 'men', ['mans', 'man', 'mens']], ['I visited three ___.', 'cities', ['citys', 'city', 'cityes']], ['She has two ___.', 'children', ['childs', 'child', 'childrens']]]
  },
  {
    id: 'pronouns', level: 'beginner', title: 'Pronouns & possessives', he: 'כינויי גוף ושייכות',
    when: 'כינוי נושא בא לפני הפועל (I see). כינוי מושא בא אחרי הפועל או אחרי מילת יחס (see me, with him). כינוי שייכות בא לפני שם עצם (my car).',
    forms: [
      ['subject', 'I · you · he · she · it · we · they'],
      ['object', 'me · you · him · her · it · us · them'],
      ['possessive', 'my · your · his · her · its · our · their'],
      ['alone', 'mine · yours · his · hers · ours · theirs']
    ],
    ex: [['She called me yesterday.', 'היא התקשרה אליי אתמול.'], ['This is our house.', 'זה הבית שלנו.'], ['The book is mine.', 'הספר שלי.']],
    tip: 'its (של חפץ או של חיה) נכתב בלי גרש. it\'s עם גרש הוא קיצור של it is.',
    quiz: [['Give the book to ___.', 'him', ['he', 'his', "he's"]], ['___ car is new.', 'Their', ['They', 'Them', 'Theirs']], ['That bag is ___.', 'mine', ['my', 'me', 'I']]]
  },
  {
    id: 'there-is', level: 'beginner', title: 'There is / There are', he: 'יש: There is / There are',
    when: 'כדי לומר ש"יש" משהו במקום כלשהו. There is ליחיד, There are לרבים.',
    forms: [
      ['+', "There is (There's) a bank · There are two banks"],
      ['–', "There isn't a bank · There aren't any banks"],
      ['?', 'Is there a bank? · Are there any banks?']
    ],
    ex: [['There is a problem.', 'יש בעיה.'], ['There are many people here.', 'יש כאן הרבה אנשים.'], ['Is there a bank near here?', 'יש בנק קרוב לכאן?'], ["There isn't a pharmacy near here.", "אין בית מרקחת קרוב לכאן."]],
    tip: 'לא משתמשים ב-have בשביל "יש" כללי: אומרים "There is a car outside", לא "It has a car outside".',
    quiz: [['___ a supermarket on this street.', 'There is', ['There are', 'It has', 'They are']], ['There ___ three chairs.', 'are', ['is', 'has', 'have']], ['___ there any milk?', 'Is', ['Are', 'Has', 'Does']]]
  },
  {
    id: 'prepositions', level: 'beginner', title: 'Prepositions: in, on, at', he: 'מילות יחס: in / on / at',
    when: 'בזמן: at לשעה, on ליום ולתאריך, in לחודש, לשנה ולחלק של היום. במקום: at לנקודה, on למשטח, in לתוך מקום.',
    forms: [
      ['at', "at 7 o'clock · at night · at home · at work · at the station"],
      ['on', 'on Monday · on 5 May · on the table · on the wall · on the bus'],
      ['in', 'in June · in 2026 · in the morning · in the room · in Israel']
    ],
    ex: [['The meeting is at nine.', 'הפגישה בתשע.'], ['I was born in May.', 'נולדתי במאי.'], ['The keys are on the table.', 'המפתחות על השולחן.']],
    tip: 'אומרים in the morning ו-in the evening, אבל at night. ולימים תמיד on: "on Friday", לא "in Friday".',
    quiz: [['See you ___ Monday.', 'on', ['in', 'at', 'to']], ["I wake up ___ 6 o'clock.", 'at', ['in', 'on', 'by the']], ['She lives ___ London.', 'in', ['on', 'at', 'to']]]
  },
  {
    id: 'can', level: 'beginner', title: "Can / Can't", he: "יכולת ורשות: can / can't",
    when: 'ליכולת, לאפשרות ולבקשת רשות. הצורה זהה לכל הגופים.',
    forms: [
      ['+', 'I can swim · She can swim'],
      ['–', "I cannot (can't) swim"],
      ['?', 'Can you swim? · Can I come in?']
    ],
    ex: [['I can drive.', 'אני יודע לנהוג.'], ["She can't come today.", 'היא לא יכולה לבוא היום.'], ['Can I ask a question?', 'אפשר לשאול שאלה?']],
    tip: 'אחרי can בא פועל בצורת הבסיס, בלי to ובלי s: "He can swim", לא "He cans swim" ולא "He can to swim".',
    quiz: [['She can ___ three languages.', 'speak', ['speaks', 'to speak', 'speaking']], ['___ you help me, please?', 'Can', ['Are', 'Does', 'Is']], ['I ___ find my keys.', "can't", ["don't can", 'not can', 'am not']]]
  },
  {
    id: 'questions', level: 'beginner', title: 'Question words', he: 'מילות שאלה',
    when: 'סדר המילים בשאלה: מילת שאלה, אחריה פועל עזר (do / does / is / are), אחריו הנושא ואז הפועל.',
    forms: [
      ['what', 'What do you want? (מה)'],
      ['where', 'Where do you live? (איפה)'],
      ['when', 'When does it start? (מתי)'],
      ['who', 'Who is she? (מי)'],
      ['why', 'Why are you late? (למה)'],
      ['how', 'How are you? · How much is it? (איך, כמה)']
    ],
    ex: [['Where do you work?', 'איפה אתה עובד?'], ['What is your name?', 'מה שמך?'], ['How much does it cost?', 'כמה זה עולה?']],
    tip: 'לא שוכחים את פועל העזר: "Where do you live?", לא "Where you live?".',
    quiz: [['___ do you live?', 'Where', ['Who', 'What', 'How much']], ['What ___ she want?', 'does', ['do', 'is', 'are']], ['___ is your birthday?', 'When', ['Who', 'How much', 'Why']]]
  },

  // ======================= Intermediate =======================
  {
    id: 'past-simple', level: 'intermediate', title: 'Past Simple', he: 'עבר פשוט',
    when: 'לפעולה שהסתיימה בעבר, בזמן ידוע: אתמול, בשבוע שעבר, לפני שנה.',
    forms: [
      ['+', 'verb + ed: I worked · She worked'],
      ['irregular', 'go → went · see → saw · have → had · do → did · come → came · take → took'],
      ['–', "I did not (didn't) work"],
      ['?', 'Did you work?']
    ],
    ex: [['I visited London last year.', 'ביקרתי בלונדון בשנה שעברה.'], ['She went home early.', 'היא הלכה הביתה מוקדם.'], ["We didn't see the film.", 'לא ראינו את הסרט.'], ["Did you see the match last night?", "ראית את המשחק אתמול בלילה?"]],
    tip: 'אחרי did ו-didn\'t הפועל חוזר לצורת הבסיס: "I didn\'t go", לא "I didn\'t went".',
    quiz: [['Yesterday I ___ to the gym.', 'went', ['go', 'gone', 'going']], ["She didn't ___ me.", 'call', ['called', 'calls', 'calling']], ['___ you finish the report?', 'Did', ['Do', 'Were', 'Have']]]
  },
  {
    id: 'past-continuous', level: 'intermediate', title: 'Past Continuous', he: 'עבר ממושך',
    when: 'לפעולה שהייתה באמצע בנקודת זמן בעבר, בדרך כלל כשפעולה אחרת קטעה אותה.',
    forms: [
      ['+', 'was / were + verb-ing: I was working · They were working'],
      ['–', "I wasn't working · They weren't working"],
      ['?', 'Were you working? · Was she working?']
    ],
    ex: [['I was sleeping when you called.', 'ישנתי כשהתקשרת.'], ['They were watching TV at eight.', 'הם צפו בטלוויזיה בשמונה.'], ['What were you doing?', 'מה עשית באותו זמן?'], ["We weren't watching TV when you called.", "לא צפינו בטלוויזיה כשהתקשרת."]],
    tip: 'הפעולה הארוכה באה ב-past continuous, והפעולה הקצרה שקטעה אותה ב-past simple: "I was cooking when he arrived".',
    quiz: [['I ___ dinner when the phone rang.', 'was cooking', ['cooked', 'am cooking', 'cook']], ['They ___ sleeping at midnight.', 'were', ['was', 'did', 'are']], ['What ___ you doing yesterday at five?', 'were', ['did', 'was', 'do']]]
  },
  {
    id: 'future', level: 'intermediate', title: 'Future: will & going to', he: 'עתיד: will / going to',
    when: 'will להחלטה שמתקבלת ברגע הדיבור, להבטחה ולתחזית. going to לתוכנית שכבר הוחלט עליה ולמשהו שרואים שעומד לקרות.',
    forms: [
      ['will', "I will (I'll) call you · I will not (won't) call · Will you call?"],
      ['going to', "I am going to travel · She isn't going to come · Are you going to stay?"]
    ],
    ex: [["I'll help you with that.", 'אני אעזור לך עם זה.'], ['We are going to buy a new car.', 'אנחנו הולכים לקנות רכב חדש.'], ["It won't rain tomorrow.", 'לא ירד גשם מחר.'], ["Will you call me tomorrow?", "תתקשרו אליי מחר?"]],
    tip: 'אחרי will בא פועל בסיס בלי to: "I will go", לא "I will to go".',
    quiz: [['I think it ___ rain tomorrow.', 'will', ['is', 'going', 'does']], ['We are going ___ a house next year.', 'to buy', ['buy', 'buying', 'bought']], ["Don't worry, I ___ tell anyone.", "won't", ["don't", 'am not', "didn't"]]]
  },
  {
    id: 'present-perfect', level: 'intermediate', title: 'Present Perfect', he: 'הווה מושלם',
    when: 'לפעולה בעבר שיש לה קשר להווה: ניסיון חיים, משהו שקרה זה עתה, או משהו שהתחיל בעבר ונמשך עד עכשיו. לא מציינים מתי בדיוק זה קרה.',
    forms: [
      ['+', 'have / has + past participle: I have finished · She has finished'],
      ['–', "I haven't finished · She hasn't finished"],
      ['?', 'Have you finished? · Has she finished?'],
      ['for / since', 'for two years (משך זמן) · since 2020 (נקודת התחלה)']
    ],
    ex: [['I have been to Paris twice.', 'הייתי בפריז פעמיים.'], ['She has just arrived.', 'היא בדיוק הגיעה.'], ['We have lived here for ten years.', 'אנחנו גרים כאן עשר שנים.'], ["She hasn't finished her homework yet.", "היא עוד לא סיימה את שיעורי הבית."], ["Have you ever been to Paris?", "היית פעם בפריז?"]],
    tip: 'עם זמן מדויק בעבר (yesterday, last week, in 2020) משתמשים ב-past simple: "I saw him yesterday", לא "I have seen him yesterday".',
    quiz: [['I have ___ this film before.', 'seen', ['saw', 'see', 'seeing']], ['She ___ lived here since 2019.', 'has', ['have', 'is', 'did']], ['We have known him ___ five years.', 'for', ['since', 'from', 'ago']]]
  },
  {
    id: 'comparatives', level: 'intermediate', title: 'Comparatives & superlatives', he: 'השוואה: יותר והכי',
    when: 'משווים בין שני דברים בצורת er או more, ואחריה than. "הכי" הוא the עם est או the most.',
    forms: [
      ['short', 'tall → taller → the tallest · big → bigger → the biggest'],
      ['-y', 'happy → happier → the happiest'],
      ['long', 'expensive → more expensive → the most expensive'],
      ['irregular', 'good → better → the best · bad → worse → the worst · far → further → the furthest']
    ],
    ex: [['This car is cheaper than that one.', 'הרכב הזה זול יותר מההוא.'], ['She is the best student in the class.', 'היא התלמידה הכי טובה בכיתה.'], ['English is more useful than Latin.', 'אנגלית שימושית יותר מלטינית.']],
    tip: 'לא משלבים את שתי הצורות: "more better" ו-"more cheaper" הן טעויות. או er או more.',
    quiz: [['My brother is ___ than me.', 'taller', ['tall', 'tallest', 'more tall']], ['This is the ___ expensive hotel in town.', 'most', ['more', 'much', 'very']], ['Her English is ___ than mine.', 'better', ['gooder', 'more good', 'best']]]
  },
  {
    id: 'modals', level: 'intermediate', title: 'Modal verbs', he: 'פעלי עזר: should / must / have to / might',
    when: 'פעלי עזר שמוסיפים משמעות של עצה, חובה, אפשרות או בקשה. אחריהם תמיד בא פועל בצורת הבסיס.',
    forms: [
      ['should', 'You should rest. (עצה: כדאי)'],
      ['must', 'You must stop. (חובה) · You must not smoke here. (אסור)'],
      ['have to', "I have to work tomorrow. (חייב) · You don't have to come. (לא חייב)"],
      ['might', 'It might rain. (אולי)'],
      ['could', 'Could you help me? (בקשה מנומסת)']
    ],
    ex: [['You should see a doctor.', 'כדאי שתלך לרופא.'], ['I have to finish this today.', 'אני חייב לסיים את זה היום.'], ['She might be late.', 'היא אולי תאחר.'], ["You don't have to pay for the tickets.", "לא צריך לשלם על הכרטיסים."], ["Could you open the window, please?", "אפשר לפתוח את החלון, בבקשה?"]],
    tip: 'must not פירושו "אסור". don\'t have to פירושו "לא חייב". אלה שני דברים שונים לגמרי.',
    quiz: [['You ___ smoke here. It is forbidden.', 'must not', ["don't have to", 'might', 'should']], ['It is Saturday. You ___ get up early.', "don't have to", ['must not', 'should', 'must']], ['You look tired. You ___ go to bed.', 'should', ['might not', 'must not', "don't have to"]]]
  },
  {
    id: 'quantity', level: 'intermediate', title: 'Much, many, some, any', he: 'כמויות: much / many / some / any',
    when: 'שמות עצם שאפשר לספור (book, car) מקבלים many ו-a few. שמות עצם שאי אפשר לספור (water, money, time) מקבלים much ו-a little, ואין להם צורת רבים.',
    forms: [
      ['countable', 'a book · two books · many books · a few books'],
      ['uncountable', 'water · money · much water · a little water'],
      ['some', 'I have some money. (משפט חיובי)'],
      ['any', "I don't have any money. · Do you have any money? (שלילה ושאלה)"],
      ['a lot of', 'a lot of books · a lot of water (מתאים לשניהם)']
    ],
    ex: [['How many people came?', 'כמה אנשים באו?'], ['How much time do we have?', 'כמה זמן יש לנו?'], ['I need some information.', 'אני צריך קצת מידע.']],
    tip: 'information, advice, furniture, news ו-money הן בלתי ספירות: אומרים "some information", לא "informations".',
    quiz: [['How ___ money do you have?', 'much', ['many', 'few', 'a few']], ["There aren't ___ chairs.", 'any', ['some', 'much', 'a little']], ['She gave me some good ___.', 'advice', ['advices', 'an advice', 'advises']]]
  },
  {
    id: 'conditionals-1', level: 'intermediate', title: 'Zero & first conditional', he: 'משפטי תנאי: מצבים אמיתיים',
    when: 'למצבים אמיתיים: עובדות שתמיד נכונות (zero), ומה שיקרה בעתיד אם התנאי יתקיים (first).',
    forms: [
      ['zero', 'If + present, present: If you heat ice, it melts.'],
      ['first', 'If + present, will + verb: If it rains, I will stay home.']
    ],
    ex: [['If you call me, I will come.', 'אם תתקשר אליי, אני אבוא.'], ["If I have time, I'll help you.", 'אם יהיה לי זמן, אעזור לך.'], ['Water boils if you heat it to 100 degrees.', 'מים רותחים אם מחממים אותם ל-100 מעלות.']],
    tip: 'אחרי if לא בא will: "If it rains", לא "If it will rain". בעברית אומרים "אם ירד גשם", ובאנגלית ההווה מחליף את העתיד.',
    quiz: [['If she ___ hard, she will pass.', 'studies', ['will study', 'studied', 'study']], ['If it rains tomorrow, we ___ at home.', 'will stay', ['stayed', 'staying', 'would stayed']], ['I will call you if I ___ late.', 'am', ['will be', 'was', 'be']]]
  },
  {
    id: 'gerund-infinitive', level: 'intermediate', title: 'Verb + ing or to', he: 'פועל אחרי פועל: ing או to',
    when: 'כשפועל בא אחרי פועל אחר, הפועל הראשון קובע אם השני יבוא עם ing או עם to. את הקבוצות צריך לזכור.',
    forms: [
      ['+ ing', 'enjoy · finish · avoid · mind · keep · suggest: I enjoy cooking.'],
      ['+ to', 'want · need · decide · hope · plan · promise · learn: I want to go.'],
      ['both', 'like · love · start · begin: I like reading. / I like to read.'],
      ['preposition', 'I am good at cooking. · Thank you for coming.']
    ],
    ex: [['She enjoys reading.', 'היא נהנית לקרוא.'], ['We decided to leave.', 'החלטנו לעזוב.'], ['He is interested in learning English.', 'הוא מעוניין ללמוד אנגלית.']],
    tip: 'אחרי מילת יחס (in, at, for, of, about) בא תמיד ing: "interested in learning", לא "interested in to learn".',
    quiz: [['I enjoy ___ to music.', 'listening', ['to listen', 'listen', 'listened']], ['She wants ___ a doctor.', 'to be', ['being', 'be', 'been']], ['Thank you for ___ me.', 'helping', ['to help', 'help', 'helped']]]
  },

  // ======================= Advanced =======================
  {
    id: 'present-perfect-continuous', level: 'advanced', title: 'Present Perfect Continuous', he: 'הווה מושלם ממושך',
    when: 'לפעולה שהתחילה בעבר ונמשכת עד עכשיו, כשהדגש הוא על כמה זמן היא נמשכת.',
    forms: [
      ['+', 'have / has been + verb-ing: I have been working'],
      ['–', "I haven't been working"],
      ['?', 'Have you been working? · How long have you been working?']
    ],
    ex: [['I have been waiting for an hour.', 'אני מחכה כבר שעה.'], ['She has been learning English since January.', 'היא לומדת אנגלית מינואר.'], ['It has been raining all day.', 'יורד גשם כל היום.'], ["I haven't been sleeping well lately.", "לא ישנתי טוב בזמן האחרון."], ["How long have you been waiting?", "כמה זמן חיכית?"]],
    tip: 'בעברית זה הווה ("אני מחכה כבר שעה"), אבל באנגלית לא אומרים "I am waiting for an hour" אלא "I have been waiting for an hour".',
    quiz: [["I ___ here since nine o'clock.", 'have been waiting', ['am waiting', 'wait', 'was wait']], ['She has been ___ all morning.', 'working', ['work', 'worked', 'works']], ['How long ___ you been learning English?', 'have', ['are', 'do', 'did']]]
  },
  {
    id: 'past-perfect', level: 'advanced', title: 'Past Perfect', he: 'עבר מושלם',
    when: 'לפעולה שקרתה לפני פעולה אחרת בעבר. זה "העבר של העבר".',
    forms: [
      ['+', 'had + past participle: I had finished'],
      ['–', "I had not (hadn't) finished"],
      ['?', 'Had you finished?']
    ],
    ex: [['When I arrived, the train had left.', 'כשהגעתי, הרכבת כבר יצאה.'], ['She had never flown before that trip.', 'היא מעולם לא טסה לפני הטיול ההוא.'], ["I was tired because I hadn't slept.", 'הייתי עייף כי לא ישנתי.'], ["Had they already left when you arrived?", "הם כבר יצאו כשהגעת?"]],
    tip: 'כשמספרים את האירועים לפי הסדר, מספיק past simple. past perfect נחוץ רק כשחוזרים אחורה בזמן.',
    quiz: [['When we got there, the film ___ already started.', 'had', ['has', 'was', 'did']], ['He was hungry because he ___ eaten.', "hadn't", ["hasn't", "didn't", "wasn't"]], ['I had never ___ sushi before that day.', 'tried', ['try', 'trying', 'tries']]]
  },
  {
    id: 'passive', level: 'advanced', title: 'Passive voice', he: 'סביל',
    when: 'כשמה שנעשה חשוב יותר ממי שעשה אותו, או כשלא יודעים מי עשה.',
    forms: [
      ['present', 'am / is / are + past participle: The office is cleaned every day.'],
      ['past', 'was / were + past participle: The house was built in 1990.'],
      ['perfect', 'has / have been + past participle: The email has been sent.'],
      ['future', 'will be + past participle: It will be done. · It must be done.'],
      ['by', 'The book was written by Orwell.']
    ],
    ex: [['English is spoken all over the world.', 'אנגלית מדוברת בכל העולם.'], ['The window was broken last night.', 'החלון נשבר אתמול בלילה.'], ['The report will be finished tomorrow.', 'הדוח יושלם מחר.']],
    tip: 'תמיד צריך את הפועל be בזמן הנכון, ואחריו הצורה השלישית של הפועל: "was built", לא "was build" ולא "builded".',
    quiz: [['This bridge ___ built in 1950.', 'was', ['has', 'did', 'were']], ['The letters ___ sent every Monday.', 'are', ['is', 'be', 'been']], ['The work must ___ finished today.', 'be', ['been', 'to be', 'being']]]
  },
  {
    id: 'conditionals-2', level: 'advanced', title: 'Second & third conditional', he: 'משפטי תנאי: מצבים דמיוניים',
    when: 'למצבים לא אמיתיים: מה היה קורה אילו (second), ומה היה קורה אילו העבר היה שונה (third).',
    forms: [
      ['second', 'If + past simple, would + verb: If I had more time, I would travel.'],
      ['third', 'If + past perfect, would have + past participle: If I had studied, I would have passed.']
    ],
    ex: [['If I won the lottery, I would buy a house.', 'אילו זכיתי בלוטו, הייתי קונה בית.'], ['If I were you, I would call her.', 'במקומך הייתי מתקשר אליה.'], ['If we had left earlier, we would not have missed the flight.', 'אילו יצאנו מוקדם יותר, לא היינו מפספסים את הטיסה.']],
    tip: 'אחרי if לא בא would: "If I had", לא "If I would have". בתנאי השני אומרים "If I were you" גם בגוף ראשון.',
    quiz: [['If I ___ rich, I would travel the world.', 'were', ['am', 'would be', 'will be']], ['If she had called, I ___ have come.', 'would', ['will', 'had', 'did']], ['If I were you, I ___ accept the offer.', 'would', ['will', 'did', 'am']]]
  },
  {
    id: 'reported-speech', level: 'advanced', title: 'Reported speech', he: 'דיבור עקיף',
    when: 'כשמדווחים מה מישהו אמר, הזמן זז צעד אחד אחורה והכינויים משתנים בהתאם.',
    forms: [
      ['present', '"I am tired" → He said (that) he was tired.'],
      ['past', '"I saw it" → She said she had seen it.'],
      ['will', '"I will call" → He said he would call.'],
      ['can', '"I can help" → She said she could help.'],
      ['question', '"Where do you live?" → He asked where I lived.'],
      ['command', '"Sit down" → She told me to sit down.']
    ],
    ex: [['She said she was busy.', 'היא אמרה שהיא עסוקה.'], ['He told me he had finished the work.', 'הוא אמר לי שסיים את העבודה.'], ['They asked if I could come.', 'הם שאלו אם אני יכול לבוא.'], ["\"Is the shop open?\" She asked whether the shop was open.", "\"החנות פתוחה?\" היא שאלה אם החנות פתוחה."]],
    tip: 'say בא בלי מושא, tell בא עם מושא: "He said that…" אבל "He told me that…". לא אומרים "He said me".',
    quiz: [['"I am tired." He said he ___ tired.', 'was', ['is', 'were', 'be']], ['She ___ me that she was late.', 'told', ['said', 'says', 'tell']], ['"I will help." He said he ___ help.', 'would', ['will', 'can', 'did']]]
  },
  {
    id: 'relative-clauses', level: 'advanced', title: 'Relative clauses', he: 'משפטי זיקה: who / which / that',
    when: 'משפט זיקה מוסיף מידע על שם עצם, כמו "ש" או "אשר" בעברית.',
    forms: [
      ['who', 'The man who called is my boss. (לאנשים)'],
      ['which', 'The car which I bought is red. (לחפצים)'],
      ['that', 'The book that I read was great. (לאנשים ולחפצים)'],
      ['whose', 'The woman whose car was stolen called the police. (שייכות)'],
      ['where', 'The city where I was born is small. (למקומות)'],
      ['commas', 'My brother, who lives in Haifa, is a doctor. (מידע נוסף)']
    ],
    ex: [['The woman who lives next door is a teacher.', 'האישה שגרה בדלת ליד היא מורה.'], ['This is the phone that I bought.', 'זה הטלפון שקניתי.'], ['That is the hotel where we stayed.', 'זה המלון שבו התארחנו.']],
    tip: 'לא חוזרים על הכינוי: "the man who I met", לא "the man who I met him". בעברית אומרים "שפגשתי אותו", ובאנגלית לא.',
    quiz: [['The man ___ called you is my boss.', 'who', ['which', 'where', 'whose']], ['This is the house ___ I grew up.', 'where', ['who', 'whose', 'what']], ['The girl ___ bag was stolen is crying.', 'whose', ['who', 'which', 'that']]]
  },
  {
    id: 'used-to', level: 'advanced', title: 'Used to', he: 'הרגלי עבר: used to',
    when: 'להרגל או למצב שהיה נכון בעבר ואינו נכון עוד.',
    forms: [
      ['+', 'used to + verb: I used to smoke.'],
      ['–', "I didn't use to smoke."],
      ['?', 'Did you use to smoke?'],
      ['be used to', 'be used to + verb-ing: I am used to working late. (רגיל ל)']
    ],
    ex: [['I used to live in Haifa.', 'פעם גרתי בחיפה.'], ["She didn't use to like coffee.", 'פעם היא לא אהבה קפה.'], ['We used to play football every Friday.', 'פעם שיחקנו כדורגל כל יום שישי.'], ["Did you use to play the piano?", "ניגנת פעם בפסנתר?"]],
    tip: '"I used to work" פירושו "פעם עבדתי". "I am used to working" פירושו "אני רגיל לעבוד". המשמעות שונה לגמרי.',
    quiz: [['I ___ to smoke, but I stopped.', 'used', ['use', 'was used', 'am used']], ['Did you ___ to live here?', 'use', ['used', 'using', 'uses']], ['She is used to ___ early.', 'waking up', ['wake up', 'woke up', 'wakes up']]]
  }
];
