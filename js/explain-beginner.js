// Beginner grammar: why each quiz answer is right and why each wrong option is wrong.
Object.assign(EXPLAIN, {
  'to-be': [
    { ok: 'הנושא הוא She (גוף שלישי יחיד), ועם he / she / it הפועל to be בהווה הוא is.',
      no: {
        'am': 'am הולך רק עם I (I am). כאן הנושא הוא She.',
        'are': 'are הולך עם you / we / they או עם נושא ברבים. She הוא יחיד.',
        'be': 'be הוא צורת המקור, ואי אפשר להשתמש בו לבד אחרי נושא בהווה.'
      } },
    { ok: 'הנושא הוא We (רבים), ועם we / you / they הפועל to be בהווה הוא are.',
      no: {
        'is': 'is הולך עם he / she / it או נושא יחיד. We הוא רבים, לכן are.',
        'am': 'am הולך רק עם I. כאן הנושא הוא We.',
        'be': 'be הוא צורת המקור ולא מתאים אחרי נושא בהווה. צריך We are.'
      } },
    { ok: 'הנושא הוא I, ועם I הפועל to be בהווה הוא תמיד am. בשלילה: I am not.',
      no: {
        'is': 'is הולך עם he / she / it. עם I אומרים רק am.',
        'are': 'are הולך עם you / we / they. עם I אומרים I am, לא I are.',
        'be': 'be הוא צורת המקור. אחרי I בהווה חייבים את הצורה am.'
      } }
  ],
  'articles': [
    { ok: 'engineer מתחיל בצליל תנועה (אֶ), ולכן לפניו an ולא a. זה מקצוע כללי, לכן a/an ולא the.',
      no: {
        'a': 'a בא לפני מילה שמתחילה בצליל עיצור. engineer מתחיל בצליל תנועה, לכן an.',
        'the': 'the מדבר על משהו מסוים וידוע. כשאומרים מה המקצוע של מישהו משתמשים ב a/an.',
        'some': 'some בא עם רבים או עם שמות שאי אפשר לספור. engineer הוא שם עצם יחיד שנספר.'
      } },
    { ok: 'Any pen is fine אומר שזה עט כלשהו, לא מסוים. pen מתחיל בצליל עיצור, לכן a.',
      no: {
        'an': 'an בא רק לפני צליל תנועה. pen מתחיל בעיצור p, לכן a pen.',
        'the': 'the אומר עט מסוים שכולם יודעים עליו. כאן כל עט מתאים, לכן a.',
        'any': 'any בא בעיקר בשאלות ובשלילה. במשפט חיובי עם שם יחיד שנספר אומרים a pen.'
      } },
    { ok: 'יש רק שמש אחת, והיא מוכרת לכולם. עם דברים יחידים במינם כמו sun, moon משתמשים ב the.',
      no: {
        'A': 'A אומר אחד מתוך הרבה. יש רק שמש אחת, לכן The sun.',
        'An': 'An בא לפני צליל תנועה ומשמעותו אחד מתוך הרבה. sun מתחיל בעיצור ויש רק אחת.',
        'Some': 'Some בא עם רבים או עם שמות שלא נספרים. השמש היא אחת ומסוימת, לכן The.'
      } }
  ],
  'present-simple': [
    { ok: 'every Sunday מראה הרגל, לכן Present Simple. הנושא He הוא גוף שלישי יחיד, לכן מוסיפים s: plays.',
      no: {
        'play': 'play בלי s מתאים ל I / you / we / they. עם he / she / it מוסיפים s: plays.',
        'playing': 'playing היא צורת ing, והיא לא יכולה לעמוד לבד בלי is. וגם every Sunday דורש Present Simple.',
        'is play': 'אין צירוף כזה. בהווה פשוט לא משתמשים ב is לפני פועל: He plays.'
      } },
    { ok: 'הנושא They (רבים) והפועל like רגיל, לכן השלילה בהווה פשוט היא don\'t + פועל.',
      no: {
        'doesn\'t': 'doesn\'t הולך רק עם he / she / it. עם They אומרים don\'t.',
        'isn\'t': 'isn\'t היא שלילה של to be עם he / she / it. כאן יש פועל רגיל like והנושא ברבים.',
        'aren\'t': 'aren\'t היא שלילה של to be, ולא באה לפני פועל רגיל כמו like. צריך don\'t like.'
      } },
    { ok: 'שאלה בהווה פשוט עם פועל רגיל (live) פותחים ב Do/Does. הנושא she הוא גוף שלישי יחיד, לכן Does.',
      no: {
        'Do': 'Do הולך עם I / you / we / they. עם she שואלים Does she live.',
        'Is': 'Is היא שאלה עם to be. עם פועל רגיל כמו live צריך Does, לא Is.',
        'Are': 'Are הולך עם to be וגם עם you / we / they. כאן יש פועל רגיל והנושא she.'
      } }
  ],
  'present-continuous': [
    { ok: 'Look! מראה שזה קורה עכשיו, לכן Present Continuous: am/is/are + ing. עם It משתמשים ב is.',
      no: {
        'are': 'are הולך עם you / we / they. הנושא It הוא יחיד, לכן is raining.',
        'does': 'does משמש בשאלות ושלילות של הווה פשוט. בהווה מתמשך צריך is + raining.',
        'do': 'do שייך להווה פשוט ולא בא לפני פועל עם ing. צריך It is raining.'
      } },
    { ok: 'אחרי They are בהווה מתמשך בא פועל עם ing. המילה now מאשרת שזה קורה עכשיו: eating.',
      no: {
        'eat': 'eat היא צורת הבסיס. אחרי are בהווה מתמשך חייבים ing: are eating.',
        'eats': 'eats היא צורת הווה פשוט עם he / she / it. אחרי are צריך eating.',
        'ate': 'ate היא צורת העבר של eat. כאן זה עכשיו (now) ואחרי are צריך eating.'
      } },
    { ok: 'שלילה בהווה מתמשך: am/is/are + not + ing. עם I אומרים I am not working.',
      no: {
        'don\'t': 'don\'t שייך להווה פשוט ובא עם פועל בסיס (I don\'t work). עם working צריך am not.',
        'doesn\'t': 'doesn\'t הולך עם he / she / it בהווה פשוט. כאן הנושא I והפועל עם ing.',
        'not': 'חסר הפועל am. אי אפשר לומר I not working, צריך I am not working.'
      } }
  ],
  'plurals': [
    { ok: 'man הוא שם עצם עם רבים לא סדיר: man הופך ל men, בלי s.',
      no: {
        'mans': 'man לא מקבל s ברבים. הרבים הלא סדיר שלו הוא men.',
        'man': 'man הוא יחיד, אבל Two מראה שיש יותר מאחד, ולכן צריך רבים: men.',
        'mens': 'men הוא כבר רבים, ולא מוסיפים לו s. הצורה mens לא קיימת.'
      } },
    { ok: 'city נגמרת בעיצור + y, ולכן ברבים ה y הופכת ל ies: cities.',
      no: {
        'citys': 'כשמילה נגמרת בעיצור + y לא מוסיפים רק s. ה y הופכת ל ies: cities.',
        'city': 'three מראה שיש יותר מאחת, לכן צריך רבים: cities.',
        'cityes': 'לא משאירים את ה y ומוסיפים es. מחליפים y ב i ומוסיפים es: cities.'
      } },
    { ok: 'child הוא שם עצם עם רבים לא סדיר: child הופך ל children.',
      no: {
        'childs': 'child לא מקבל s ברבים. הרבים הלא סדיר שלו הוא children.',
        'child': 'child הוא יחיד, אבל two מראה רבים, לכן children.',
        'childrens': 'children הוא כבר רבים, ולא מוסיפים לו s. הצורה childrens לא קיימת.'
      } }
  ],
  'pronouns': [
    { ok: 'אחרי מילת יחס כמו to משתמשים בכינוי מושא (object pronoun): him.',
      no: {
        'he': 'he הוא כינוי נושא, והוא בא לפני הפועל. אחרי to צריך כינוי מושא: him.',
        'his': 'his אומר של שלו (his book). כאן צריך את האדם עצמו אחרי to: him.',
        'he\'s': 'he\'s הוא קיצור של he is או he has, ולא מתאים אחרי to.'
      } },
    { ok: 'לפני שם עצם (car) צריך שייכות: Their car אומר המכונית שלהם.',
      no: {
        'They': 'They הוא כינוי נושא ולא מראה שייכות. לפני car צריך Their.',
        'Them': 'Them הוא כינוי מושא שבא אחרי פועל או מילת יחס, לא לפני שם עצם.',
        'Theirs': 'Theirs עומד לבד בלי שם עצם אחריו (It is theirs). לפני car צריך Their.'
      } },
    { ok: 'בסוף המשפט אין שם עצם אחרי המילה, לכן משתמשים בכינוי שייכות שעומד לבד: mine.',
      no: {
        'my': 'my חייב לבוא לפני שם עצם (my bag). כאן אין שם עצם אחריו, לכן mine.',
        'me': 'me הוא כינוי מושא ולא מראה שייכות. The bag is me לא נכון.',
        'I': 'I הוא כינוי נושא שבא לפני פועל. לשייכות בסוף המשפט אומרים mine.'
      } }
  ],
  'there-is': [
    { ok: 'כדי לומר שמשהו קיים (יש) משתמשים ב There is / There are. a supermarket הוא יחיד, לכן There is.',
      no: {
        'There are': 'There are הולך עם רבים. a supermarket הוא יחיד, לכן There is.',
        'It has': 'זה תרגום מילולי של יש. כשאומרים שמשהו נמצא במקום, באנגלית אומרים There is.',
        'They are': 'They are מתאר אנשים או דברים שכבר הוזכרו, ולא אומר שמשהו קיים במקום.'
      } },
    { ok: 'three chairs הוא רבים, לכן There are.',
      no: {
        'is': 'There is הולך עם יחיד. three chairs הם רבים, לכן There are.',
        'has': 'לא אומרים There has כדי לומר יש. משתמשים ב There is / There are.',
        'have': 'לא אומרים There have כדי לומר יש. עם רבים אומרים There are.'
      } },
    { ok: 'בשאלה הופכים את הסדר: Is there. milk הוא שם שלא נספר, ולכן הולך עם is.',
      no: {
        'Are': 'Are there הולך עם רבים. milk לא נספר ונחשב יחיד, לכן Is there.',
        'Has': 'לא שואלים Has there כדי לשאול אם יש. אומרים Is there any milk.',
        'Does': 'Does לא בא עם there כדי לשאול על קיום. השאלה היא Is there.'
      } }
  ],
  'prepositions': [
    { ok: 'עם ימים בשבוע משתמשים ב on: on Monday.',
      no: {
        'in': 'in בא עם חודשים, שנים וחלקי יום (in May, in the morning), לא עם ימים.',
        'at': 'at בא עם שעה מדויקת (at 6 o\'clock). עם יום בשבוע אומרים on.',
        'to': 'to מראה כיוון או תנועה למקום. לזמן ביום בשבוע משתמשים ב on.'
      } },
    { ok: 'עם שעה מדויקת משתמשים ב at: at 6 o\'clock.',
      no: {
        'in': 'in בא עם חודשים, שנים וחלקי יום. עם שעה מדויקת אומרים at.',
        'on': 'on בא עם ימים ותאריכים. עם שעה מדויקת אומרים at.',
        'by the': 'by פירושו לא יאוחר מ, ולא אומרים the לפני שעה. כאן צריך at 6 o\'clock.'
      } },
    { ok: 'עם ערים ומדינות משתמשים ב in: in London.',
      no: {
        'on': 'on בא עם רחובות ומשטחים (on Herzl Street). עם עיר אומרים in.',
        'at': 'at בא עם נקודה או כתובת מדויקת (at home, at 5 Herzl Street). עם עיר אומרים in.',
        'to': 'to מראה תנועה למקום (go to London). אחרי lives מתארים מיקום: in.'
      } }
  ],
  'can': [
    { ok: 'אחרי can בא תמיד פועל בצורת הבסיס, בלי to ובלי s: can speak.',
      no: {
        'speaks': 'אחרי can לא מוסיפים s לפועל, גם עם She. אומרים She can speak.',
        'to speak': 'אחרי can לא בא to. אומרים can speak, לא can to speak.',
        'speaking': 'אחרי can לא בא פועל עם ing. צריך צורת בסיס: speak.'
      } },
    { ok: 'בשאלה עם can מקדימים את can לפני הנושא: Can you help me? (בקשה מנומסת).',
      no: {
        'Are': 'Are you בא לפני ing או תואר, לא לפני פועל בסיס כמו help. צריך Can you help.',
        'Does': 'Does לא הולך עם you (צריך Do), וכאן הבקשה מנוסחת עם Can.',
        'Is': 'Is הולך עם he / she / it ולא עם you, ולא בא לפני פועל בסיס.'
      } },
    { ok: 'השלילה של can היא can\'t (cannot), ואחריה פועל בסיס: I can\'t find.',
      no: {
        'don\'t can': 'can לא מקבל עזר do. השלילה היא פשוט can\'t.',
        'not can': 'הסדר הפוך. not בא אחרי can: cannot או can\'t.',
        'am not': 'am not בא לפני ing או תואר, לא לפני פועל בסיס כמו find. צריך can\'t find.'
      } }
  ],
  'questions': [
    { ok: 'השאלה היא על מקום מגורים (live), ומילת השאלה למקום היא Where.',
      no: {
        'Who': 'Who שואל על אדם (מי). כאן שואלים איפה אתה גר.',
        'What': 'What שואל מה. על מקום מגורים שואלים Where do you live.',
        'How much': 'How much שואל כמה (מחיר או כמות שלא נספרת), לא על מקום.'
      } },
    { ok: 'שאלה עם פועל רגיל (want) בהווה פשוט צריכה עזר. הנושא she הוא גוף שלישי יחיד, לכן does.',
      no: {
        'do': 'do הולך עם I / you / we / they. עם she צריך does.',
        'is': 'is בא עם to be או לפני ing. עם פועל בסיס want צריך does.',
        'are': 'are לא הולך עם she, ולא בא לפני פועל בסיס כמו want.'
      } },
    { ok: 'יום הולדת הוא זמן (תאריך), ומילת השאלה לזמן היא When.',
      no: {
        'Who': 'Who שואל על אדם. על תאריך שואלים When.',
        'How much': 'How much שואל על מחיר או כמות, לא על תאריך.',
        'Why': 'Why שואל למה (סיבה). כאן שואלים מתי, לכן When.'
      } }
  ],
  'b-this-that': [
    { ok: 'apples הוא רבים, והמילה here מראה שהם קרובים. לרבים וקרובים משתמשים ב these.',
      no: {
        'this': 'this הולך עם יחיד. apples הם רבים, לכן these.',
        'that': 'that הולך עם יחיד ורחוק. כאן התפוחים ברבים וקרובים (here).',
        'it': 'it הוא כינוי גוף ולא בא לפני שם עצם. וגם apples ברבים.'
      } },
    { ok: 'birds הוא רבים, והם רחוקים (in the sky). לרבים ורחוקים משתמשים ב those.',
      no: {
        'that': 'that הולך עם יחיד. birds הן רבים, לכן those.',
        'this': 'this הולך עם יחיד וקרוב. הציפורים רבות ורחוקות בשמיים.',
        'it': 'it לא בא לפני שם עצם. לרבים ורחוקים אומרים those birds.'
      } },
    { ok: 'כשמציגים אדם אחד שנמצא לידנו אומרים This is: This is my brother.',
      no: {
        'These': 'These הולך עם רבים. my brother הוא אדם אחד, לכן This.',
        'Those': 'Those הולך עם רבים ורחוקים. כאן מציגים אח אחד.',
        'They': 'They הוא רבים וצריך are אחריו. כשמציגים מישהו אומרים This is.'
      } }
  ],
  'b-have': [
    { ok: 'My sister הוא גוף שלישי יחיד (she), ולכן הפועל have בהווה הוא has.',
      no: {
        'have': 'have הולך עם I / you / we / they. עם she (My sister) צריך has.',
        'is': 'is הוא to be (להיות). כאן מדברים על שייכות (יש לה), לכן has.',
        'having': 'having לא יכול לעמוד לבד, ועל שייכות לא משתמשים בהווה מתמשך. צריך has.'
      } },
    { ok: 'have הוא כאן פועל רגיל, ולכן השאלה בהווה פשוט נפתחת ב Do. עם you אומרים Do.',
      no: {
        'Does': 'Does הולך רק עם he / she / it. עם you שואלים Do you have.',
        'Are': 'Are הוא to be ולא משמש לשאלה על פועל רגיל כמו have.',
        'Have': 'אחרי Have you אי אפשר לבוא שוב עם have. אומרים Do you have או Have you got.'
      } },
    { ok: 'אחרי doesn\'t בא תמיד פועל בצורת הבסיס, גם עם He: doesn\'t have.',
      no: {
        'has': 'ה s כבר נמצאת ב doesn\'t, ולכן הפועל אחריו בצורת בסיס: have, לא has.',
        'got': 'got בא עם have got (He hasn\'t got a car), לא אחרי doesn\'t.',
        'having': 'אחרי doesn\'t לא בא פועל עם ing. צריך צורת בסיס: have.'
      } }
  ],
  'b-imperatives': [
    { ok: 'זו בקשה או הוראה (ציווי), וציווי באנגלית הוא פועל בצורת הבסיס בלי נושא: Close.',
      no: {
        'Closes': 'Closes היא צורה של הווה פשוט עם he / she / it. בציווי משתמשים בבסיס: Close.',
        'Closing': 'Closing היא צורת ing, והיא לא משמשת לציווי. אומרים Close the window.',
        'To close': 'ציווי לא מתחיל ב To. משתמשים בפועל בסיס בלבד: Close.'
      } },
    { ok: 'ציווי שלילי (אל תעשה) בנוי מ Don\'t + פועל בסיס: Don\'t be late.',
      no: {
        'No': 'No לא בא לפני פועל בציווי. השלילה היא Don\'t be late.',
        'Not': 'ציווי לא מתחיל ב Not. צריך Don\'t לפני הפועל.',
        'Doesn\'t': 'Doesn\'t הולך עם he / she / it בהווה פשוט. בציווי שלילי תמיד Don\'t.'
      } },
    { ok: 'אחרי Let\'s בא פועל בצורת הבסיס, בלי to: Let\'s go.',
      no: {
        'going': 'אחרי Let\'s לא בא פועל עם ing. אומרים Let\'s go.',
        'goes': 'goes היא צורה עם he / she / it. אחרי Let\'s צריך צורת בסיס: go.',
        'to go': 'אחרי Let\'s לא שמים to. אומרים Let\'s go, לא Let\'s to go.'
      } }
  ],
  'b-frequency': [
    { ok: 'תואר תדירות כמו always בא לפני פועל רגיל. הנושא I, לכן הפועל drink בלי s.',
      no: {
        'drink always': 'הסדר לא נכון. always בא לפני פועל רגיל: always drink.',
        'always drinks': 'drinks עם s מתאים ל he / she / it. עם I אומרים always drink.',
        'am always drink': 'לא שמים am לפני פועל רגיל בהווה פשוט. צריך I always drink.'
      } },
    { ok: 'late הוא תואר ולא פועל, לכן צריך to be (is). עם to be תואר התדירות בא אחרי הפועל: is never.',
      no: {
        'never doesn\'t': 'never כבר שלילי, ולא מוסיפים עוד שלילה. וגם late צריך is.',
        'doesn\'t never': 'שתי שלילות יחד אסורות באנגלית. וגם late הוא תואר וצריך is, לא doesn\'t.',
        'never be': 'be היא צורת המקור. עם She בהווה צריך is: She is never late.'
      } },
    { ok: 'כדי לשאול כמה פעמים עושים משהו אומרים How often.',
      no: {
        'always': 'always הוא תשובה (תמיד), ולא בא אחרי How בשאלה. אומרים How often.',
        'usually': 'usually הוא תשובה (בדרך כלל). השאלה על תדירות היא How often.',
        'never': 'never הוא תשובה (אף פעם). לא שואלים How never, אלא How often.'
      } }
  ],
  'b-possessive-s': [
    { ok: 'כדי לומר של מישהו מוסיפים לשם \'s: David\'s phone (הטלפון של דוד).',
      no: {
        'David': 'בלי \'s אין שייכות. צריך David\'s phone.',
        'Davids\'': 'גרש אחרי s בא רק בשם עצם ברבים שנגמר ב s. David הוא אדם אחד, לכן David\'s.',
        'of David': 'עם אנשים לא אומרים of David לפני שם עצם. משתמשים ב David\'s phone.'
      } },
    { ok: 'children הוא רבים לא סדיר שלא נגמר ב s, ולכן מוסיפים \'s: children\'s.',
      no: {
        'childrens\'': 'childrens לא קיים. children הוא כבר רבים, ומוסיפים לו \'s: children\'s.',
        'childrens': 'אין צורה childrens, וחסר הגרש. נכון: children\'s.',
        'children': 'בלי \'s אין שייכות. הצעצועים שייכים לילדים, לכן children\'s toys.'
      } },
    { ok: 'השאלה של מי? היא Whose. התשובה It is Maya\'s מראה שמדובר על שייכות.',
      no: {
        'Who': 'Who שואל מי, לא של מי. כדי לשאול על שייכות אומרים Whose bag.',
        'Who\'s': 'Who\'s הוא קיצור של Who is. נשמע כמו Whose אבל המשמעות שונה.',
        'Which is': 'אי אפשר לומר Which is bag is this. השאלה על שייכות היא Whose bag.'
      } }
  ],
  'b-was-were': [
    { ok: 'last summer מראה עבר. הנושא We ברבים, ולכן העבר של to be הוא were.',
      no: {
        'was': 'was הולך עם I / he / she / it. עם We אומרים were.',
        'did': 'did הוא עזר לפעלים רגילים בעבר. כאן אין פועל אחר, צריך to be: were.',
        'be': 'be היא צורת המקור. בעבר עם We צריך were.'
      } },
    { ok: 'yesterday מראה עבר. בשאלה עם to be מקדימים את הפועל, ועם you אומרים Were.',
      no: {
        'Was': 'Was הולך עם I / he / she / it. עם you תמיד Were.',
        'Did': 'Did בא לפני פועל רגיל (Did you go). כאן אין פועל, צריך Were you.',
        'Are': 'Are הוא הווה. yesterday מראה עבר, לכן Were.'
      } },
    { ok: 'I did not like it מראה עבר ושלילה. The film הוא יחיד, לכן wasn\'t.',
      no: {
        'weren\'t': 'weren\'t הולך עם you / we / they או רבים. The film הוא יחיד.',
        'didn\'t': 'didn\'t בא לפני פועל רגיל. לפני תואר (good) צריך to be: wasn\'t.',
        'not was': 'הסדר לא נכון. not בא אחרי was: was not או wasn\'t.'
      } }
  ],
  'b-would-like': [
    { ok: 'אחרי would like (\'d like) בא to + פועל בסיס: I\'d like to book.',
      no: {
        'book': 'אחרי would like חייבים to לפני הפועל: to book.',
        'booking': 'אחרי would like לא בא ing. אומרים would like to book.',
        'books': 'books עם s לא מתאים אחרי would like. צריך to book.'
      } },
    { ok: 'הצעה מנומסת בשאלה: Would you like? מקדימים את Would לפני הנושא.',
      no: {
        'Are': 'Are you like לא קיים. כשמציעים משהו שואלים Would you like.',
        'Does': 'Does לא הולך עם you, וזה גם לא הצעה מנומסת. צריך Would you like.',
        'Is': 'Is לא הולך עם you ולא בא לפני like. אומרים Would you like.'
      } },
    { ok: 'כאן מדובר על אהבה קבועה (She has three), לכן הווה פשוט. עם She מוסיפים s: likes.',
      no: {
        'like': 'like בלי s מתאים ל I / you / we / they. עם She צריך likes.',
        'liking': 'liking לא יכול לעמוד לבד אחרי הנושא. בהווה פשוט אומרים She likes.',
        'is like': 'לא שמים is לפני פועל רגיל בהווה פשוט. צריך She likes.'
      } }
  ],
  'b-connectors': [
    { ok: 'החלק השני (I did not eat breakfast) הוא הסיבה לרעב, ולסיבה משתמשים ב because.',
      no: {
        'so': 'so מציג תוצאה. כאן החלק השני הוא הסיבה, לא התוצאה.',
        'but': 'but מציג ניגוד. אין ניגוד בין רעב לבין לא לאכול ארוחת בוקר.',
        'or': 'or מציג אפשרות בחירה (או). כאן מסבירים למה, לכן because.'
      } },
    { ok: 'נשארנו בבית בגלל הגשם, כלומר החלק השני הוא התוצאה. לתוצאה משתמשים ב so.',
      no: {
        'because': 'because מציג סיבה. כאן החלק השני הוא התוצאה של הגשם.',
        'but': 'but מציג ניגוד. להישאר בבית כשיורד גשם זה לא ניגוד.',
        'or': 'or מציג בחירה בין אפשרויות. כאן יש סיבה ותוצאה, לכן so.'
      } },
    { ok: 'עשיר ולא מאושר זה ניגוד (דבר לא צפוי), ולניגוד משתמשים ב but.',
      no: {
        'because': 'because מציג סיבה. להיות עשיר לא הסיבה שהוא לא מאושר.',
        'so': 'so מציג תוצאה. לא מאושר הוא לא תוצאה של להיות עשיר.',
        'or': 'or מציג בחירה. כאן שני דברים נכונים יחד בניגוד, לכן but.'
      } }
  ],
  'b-adjective-position': [
    { ok: 'באנגלית שם התואר בא לפני שם העצם: a red car (הפוך מעברית).',
      no: {
        'car red': 'זה סדר עברי. באנגלית התואר בא לפני שם העצם: red car.',
        'cars red': 'אחרי a צריך יחיד, והסדר הפוך. נכון: a red car.',
        'reds car': 'לשם תואר באנגלית אין רבים, ולא מוסיפים לו s. וגם אחרי a בא יחיד.'
      } },
    { ok: 'התואר small בא לפני שם העצם, ושם תואר לא מקבל s גם ברבים: small children.',
      no: {
        'smalls children': 'שמות תואר לא מקבלים s ברבים. אומרים small children.',
        'children small': 'זה סדר עברי. באנגלית התואר בא לפני שם העצם.',
        'childrens small': 'childrens לא קיים, והסדר הפוך. נכון: small children.'
      } },
    { ok: 'אחרי are שם התואר יכול לעמוד לבד בסוף המשפט, בלי a ובלי s: are new.',
      no: {
        'news': 'news הוא שם עצם (חדשות), לא שם תואר. שם תואר לא מקבל s: new.',
        'a new': 'אחרי a חייב לבוא שם עצם, ו a לא מתאים לרבים (shoes). אומרים are new.',
        'the new': 'the new בלי שם עצם אחריו לא מתאר כאן את הנעליים. אומרים These shoes are new.'
      } }
  ],
  'b-lets': [
    { ok: 'אחרי Let\'s בא פועל בצורת הבסיס: Let\'s watch.',
      no: {
        'to watch': 'אחרי Let\'s לא בא to. אומרים Let\'s watch.',
        'watching': 'אחרי Let\'s לא בא ing. צריך צורת בסיס: watch.',
        'watches': 'watches עם s מתאים ל he / she / it. אחרי Let\'s צריך watch.'
      } },
    { ok: 'השלילה של Let\'s היא Let\'s not + פועל בסיס: Let\'s not go out.',
      no: {
        'don\'t': 'אחרי Let\'s לא שמים don\'t. השלילה הרגילה היא Let\'s not.',
        'no': 'no לא בא לפני פועל. אומרים Let\'s not go out.',
        'doesn\'t': 'doesn\'t הולך עם he / she / it ולא אחרי Let\'s. צריך Let\'s not.'
      } },
    { ok: 'כדי להציע בשאלה משתמשים ב Shall we + פועל בסיס: Shall we start?',
      no: {
        'Let': 'Let we start לא נכון. Let לא בא עם we בשאלה, צריך Shall we.',
        'Let\'s': 'Let\'s כבר כולל את we (let us). Let\'s we לא נכון. צריך Shall we.',
        'Are': 'Are we בא לפני ing (Are we starting), לא לפני פועל בסיס start.'
      } }
  ],
  'b-want-need': [
    { ok: 'אחרי want בא to + פועל בסיס: want to buy.',
      no: {
        'buy': 'אחרי want חייבים to לפני הפועל: want to buy.',
        'buying': 'אחרי want לא בא ing. אומרים want to buy.',
        'that I buy': 'זה תרגום של רוצה שאקנה. באנגלית אחרי want לא בא that, אלא to buy.'
      } },
    { ok: 'כשרוצים שמישהו אחר יעשה משהו: want + כינוי מושא + to: She wants me to help her.',
      no: {
        'that I': 'זה מבנה עברי (רוצה שאני). באנגלית אחרי want לא בא that, אלא me to.',
        'I': 'I הוא כינוי נושא. אחרי want צריך כינוי מושא: me.',
        'my': 'my הוא שייכות וחייב לבוא לפני שם עצם. כאן צריך me.'
      } },
    { ok: 'אחרי don\'t בא פועל בצורת הבסיס: don\'t need to.',
      no: {
        'needs': 'אחרי don\'t לא מוסיפים s לפועל. צריך need.',
        'needing': 'אחרי don\'t לא בא ing. צריך צורת בסיס: need.',
        'to need': 'אחרי don\'t לא בא to לפני הפועל. אומרים don\'t need to bring.'
      } }
  ],
  'b-dates': [
    { ok: 'בתאריכים משתמשים במספר סודר (the second of April). הסודר של two הוא second, צורה לא סדירה.',
      no: {
        'two': 'two הוא מספר רגיל. אחרי the בתאריך צריך מספר סודר: second.',
        'twoth': 'twoth לא קיים. הסודר של two הוא לא סדיר: second.',
        'secondth': 'second הוא כבר סודר, ולא מוסיפים לו th.'
      } },
    { ok: 'my ___ time דורש מספר סודר (הפעם החמישית). five הופך ל fifth: ה ve מתחלפת ב f.',
      no: {
        'fiveth': 'fiveth לא קיים. ב five ה ve מתחלפת ב f: fifth.',
        'five': 'five הוא מספר רגיל. כאן צריך סודר (הפעם החמישית): fifth.',
        'fifeth': 'fifeth לא קיים. הכתיב הנכון הוא fifth, בלי e.'
      } },
    { ok: 'בתאריך צריך מספר סודר. במספר מורכב רק החלק האחרון הופך לסודר: twenty-fifth.',
      no: {
        'twenty-five': 'twenty-five הוא מספר רגיל. בתאריך אחרי the צריך סודר: twenty-fifth.',
        'twenty-fiveth': 'fiveth לא קיים. five הופך ל fifth, לכן twenty-fifth.',
        'twentieth-five': 'הופכים לסודר רק את החלק האחרון. twenty נשאר כמו שהוא: twenty-fifth.'
      } }
  ],
  'b-spell-s': [
    { ok: 'wash נגמר ב sh, ופעלים שנגמרים ב sh, ch, s, x, o מקבלים es: washes.',
      no: {
        'washs': 'אחרי sh לא מוסיפים רק s. מוסיפים es: washes.',
        'washies': 'ies מתאים רק לפעלים שנגמרים בעיצור + y. wash נגמר ב sh, לכן washes.',
        'wash': 'הנושא She הוא גוף שלישי יחיד, ולכן בהווה פשוט חייבים להוסיף es.'
      } },
    { ok: 'study נגמר בעיצור + y (dy), ולכן ה y הופכת ל ies: studies.',
      no: {
        'studys': 'בעיצור + y לא מוסיפים רק s. מחליפים y ב i ומוסיפים es: studies.',
        'studyes': 'לא משאירים את ה y. y הופכת ל i ואז es: studies.',
        'study': 'הנושא He הוא גוף שלישי יחיד, ולכן בהווה פשוט צריך studies.'
      } },
    { ok: 'play נגמר בתנועה + y (ay), ולכן רק מוסיפים s: plays.',
      no: {
        'plaies': 'y הופכת ל ies רק אחרי עיצור. אחרי תנועה (a) מוסיפים רק s.',
        'playes': 'es מוסיפים אחרי sh, ch, s, x, o. play נגמר בתנועה + y, לכן רק s.',
        'play': 'הנושא My dad הוא גוף שלישי יחיד (he), ולכן צריך s: plays.'
      } }
  ],
  'b-spell-ing': [
    { ok: 'אחרי is בא פועל עם ing. write נגמר ב e שקטה, ומורידים אותה לפני ing: writing.',
      no: {
        'writeing': 'ה e השקטה בסוף write יורדת לפני ing: writing.',
        'writting': 'לא מכפילים את t. מכפילים רק בעיצור + תנועה + עיצור, ו write נגמר ב e.',
        'write': 'אחרי is בהווה מתמשך חייבים ing: writing.'
      } },
    { ok: 'run נגמר בעיצור + תנועה + עיצור (r u n), ולכן מכפילים את ה n לפני ing: running.',
      no: {
        'runing': 'בעיצור + תנועה + עיצור בהברה מוטעמת מכפילים את העיצור האחרון: running.',
        'runnning': 'מכפילים את n פעם אחת בלבד (nn), לא שלוש: running.',
        'run': 'אחרי are בהווה מתמשך חייבים ing: running.'
      } },
    { ok: 'lie נגמר ב ie, ולפני ing ה ie הופכת ל y: lying.',
      no: {
        'lieing': 'בפעלים שנגמרים ב ie לא משאירים ie לפני ing. ie הופכת ל y: lying.',
        'liing': 'לא מורידים רק את ה e. ie הופכת ל y: lying.',
        'lie': 'אחרי are בהווה מתמשך חייבים ing: lying.'
      } }
  ]
});
