// Interface texts in Hebrew and English. Hebrew is the default.
// To change a text, edit it here; {name} marks a value filled in by the app.
const STR = {
  en: {
    'nav.home': 'Home', 'nav.learn': 'Learn', 'nav.progress': 'Progress',
    'streak.one': 'day streak', 'streak.many': 'days streak',
    'aria.lang': 'Switch language', 'aria.listen': 'Listen',
    'lv.beginner': 'Beginner', 'lv.intermediate': 'Intermediate', 'lv.advanced': 'Advanced',

    'home.journey': 'YOUR LEARNING JOURNEY',
    'home.title': 'Master English.<br><em>One day</em> at a time.',
    'home.sub': 'Your next step towards confident English starts here.',
    'home.overall': 'Level progress', 'home.record': 'Day streak record', 'home.learned': 'Words learned',
    'home.level': 'Your learning level',
    'home.plan': "Today's learning plan", 'home.completed': 'completed',
    'task.review': 'Review', 'task.review.sub': '{n} words waiting for you · 3 min', 'task.review.one': 'One word waiting for you · 1 min', 'task.review.done': 'Reviewed for today',
    'task.vocab': 'Vocabulary Builder', 'task.vocab.sub': 'Learn {n} new words · 5 min',
    'task.speak': 'Speaking Practice', 'task.speak.sub': 'Listen and say it out loud · 5 min',
    'task.listen': 'Listening Skills', 'task.listen.sub': 'Hear it, pick the word · 4 min',
    'task.grammar': 'Grammar Training', 'task.grammar.sub': '{title} · 5 min',
    'home.wotd': 'Word of the day', 'home.vocabTag': 'Vocabulary',
    'home.challenge': 'Ready for a challenge?', 'home.challenge.sub': 'Test your English with a quick exercise.',
    'home.start': 'Start now',

    'learn.title': 'Learn', 'learn.sub': '{level} lessons. Change the level on the Home screen.',
    'learn.vocab': 'Words', 'learn.phrases': 'Phrases', 'learn.grammar': 'Grammar', 'learn.practice': 'Practice',
    'learn.words': '{a} of {b} words learned', 'learn.sentences': '{a} of {b} sentences learned',
    'learn.phrases.sub': 'Useful {level} sentences for real situations.',
    'grammar.sub': '{level} grammar · {a} of {b} rules completed',
    'grammar.back': 'Grammar rules', 'grammar.when': 'When to use it', 'grammar.structure': 'Structure',
    'grammar.examples': 'Examples', 'grammar.mistake': 'Common mistake', 'grammar.practice': 'Practice this rule',
    'grammar.choose': 'Choose the correct form',
    'grammar.done': 'Rule completed.', 'grammar.retry': 'Read the rule again and give it another try.',
    'grammar.next': 'Next rule: {title}', 'grammar.again': 'Read the rule again', 'grammar.all': 'All grammar rules',

    'card.count': '{a} of {b}', 'card.hint': 'Tap the card to see the translation', 'card.hide': 'Hide the translation',
    'sr.right': 'Correct', 'sr.wrong': 'Not quite. The answer is {answer}',
    'card.practice': 'Practice these words',
    'btn.next': 'Next', 'btn.back': 'Back', 'btn.finish': 'Finish',
    'btn.home': 'Back to Home', 'btn.more': 'More practice', 'btn.lessons': 'Go to lessons',

    'practice.sub': 'Pick an exercise · {level} level',
    'practice.review': 'Review due words', 'practice.review.some': '{n} words are ready for review', 'practice.review.one': 'One word is ready for review',
    'practice.review.none': 'Nothing to review right now',
    'practice.speak.sub': 'Listen and say it out loud',
    'practice.listen.sub': 'Hear a word, pick the right one',
    'practice.type': 'Write the word', 'practice.type.sub': 'See it in Hebrew, type it in English',
    'quiz.type': 'Write it in English', 'quiz.type.ph': 'Type here…', 'quiz.check': 'Check',
    'quiz.type.right': 'Correct!', 'quiz.type.close': 'Almost! Watch the spelling:', 'quiz.type.wrong': 'The answer is:',
    'practice.cloze': 'Complete the sentence', 'practice.cloze.sub': 'Fill in the missing word',

    'quiz.count': 'Question {a} of {b}', 'quiz.review': 'Review',
    'quiz.listen': 'Listen and choose the word you hear', 'quiz.cloze': 'Complete the sentence',
    'quiz.mean': 'What does it mean?', 'quiz.say': 'How do you say it in English?',
    'quiz.score': '{a} of {b} correct',
    'quiz.again': 'One more try', 'quiz.great': 'Excellent work!', 'quiz.keep': 'Every round helps. The words you missed will come back again.',
    'tricky.title': 'Tricky words', 'tricky.one': 'One word keeps slipping away. Practise it now',
    'tricky.some': '{n} words keep slipping away. Practise just them',
    'quiz.missed': 'Words to go over', 'quiz.again.missed': 'Practise these words again', 'quiz.missedTitle': 'Your mistakes',
    'quiz.empty': 'Nothing to review', 'quiz.empty.sub': 'Learn a new lesson and its words will come back here at the right time.',

    'speak.count': 'Speaking Practice · {a} of {b}', 'speak.do': 'Listen, then say it out loud',
    'speak.hard': 'Still hard', 'speak.said': 'I said it',
    'speak.do.mic': 'Listen, then tap the microphone and say it', 'speak.mic': 'Say it into the microphone',
    'speak.listening': 'Listening…', 'speak.great': 'Excellent! That was clear ✓',
    'speak.heard': 'What I heard:', 'speak.again': 'Listen again and try once more.',
    'speak.nothing': "I didn't catch that. Tap the microphone and try again.",
    'speak.blocked': 'The microphone is blocked. You can still practise and rate yourself.',
    'speak.score': '{a} of {b} said with confidence',
    'speak.sub': 'Saying words out loud is the fastest way to remember them.',

    'progress.title': 'My progress', 'progress.sub': '{x} points so far',
    'progress.streak': 'Day streak', 'progress.best': 'Best streak',
    'progress.words': '{a} of {b} words', 'progress.phrases': '{a} of {b} sentences', 'progress.rules': '{a} of {b} grammar rules',
    'update.ready': 'A new version is ready', 'update.reload': 'Update',
    'backup.title': 'Backup', 'backup.sub': 'Keep a copy of your progress, to restore it on a new phone or after clearing Safari.',
    'backup.save': 'Save backup', 'backup.restore': 'Restore',
    'backup.saved': 'Backup ready. Keep the file somewhere safe.', 'backup.saveFailed': 'Could not create the backup.',
    'backup.confirm': 'Replace your current progress with the backup?', 'backup.bad': 'This file is not a Lingua backup. Nothing was changed.',
    'backup.restored': 'Progress restored: {n} words.',
    'progress.reset': 'Reset all progress', 'progress.confirm': 'Delete all progress? This cannot be undone.',
    'notfound': 'Page not found'
  },

  he: {
    'nav.home': 'בית', 'nav.learn': 'לימוד', 'nav.progress': 'התקדמות',
    'streak.one': 'יום ברצף', 'streak.many': 'ימים ברצף',
    'aria.lang': 'החלפת שפה', 'aria.listen': 'השמעה',
    'lv.beginner': 'מתחיל', 'lv.intermediate': 'בינוני', 'lv.advanced': 'מתקדם',

    'home.journey': 'מסע הלמידה שלך',
    'home.title': 'שולטים באנגלית.<br><em>יום אחד</em> בכל פעם.',
    'home.sub': 'הצעד הבא שלך לאנגלית בטוחה מתחיל כאן.',
    'home.overall': 'התקדמות ברמה', 'home.record': 'שיא רצף ימים', 'home.learned': 'מילים נלמדו',
    'home.level': 'רמת הלימוד שלך',
    'home.plan': 'תוכנית הלימוד להיום', 'home.completed': 'הושלמו',
    'task.review': 'חזרה', 'task.review.sub': '{n} מילים מחכות לך · 3 דק׳', 'task.review.one': 'מילה אחת מחכה לך · דקה', 'task.review.done': 'חזרת על המילים להיום',
    'task.vocab': 'אוצר מילים', 'task.vocab.sub': 'לומדים {n} מילים חדשות · 5 דק׳',
    'task.speak': 'תרגול דיבור', 'task.speak.sub': 'מקשיבים ואומרים בקול · 5 דק׳',
    'task.listen': 'הבנת הנשמע', 'task.listen.sub': 'שומעים ובוחרים את המילה · 4 דק׳',
    'task.grammar': 'אימון דקדוק', 'task.grammar.sub': '{title} · 5 דק׳',
    'home.wotd': 'מילת היום', 'home.vocabTag': 'אוצר מילים',
    'home.challenge': 'מוכן לאתגר?', 'home.challenge.sub': 'בדוק את האנגלית שלך בתרגיל קצר.',
    'home.start': 'מתחילים',

    'learn.title': 'לימוד', 'learn.sub': 'שיעורים ברמת {level}. את הרמה מחליפים במסך הבית.',
    'learn.vocab': 'מילים', 'learn.phrases': 'משפטים', 'learn.grammar': 'דקדוק', 'learn.practice': 'תרגול',
    'learn.words': '{a} מתוך {b} מילים נלמדו', 'learn.sentences': '{a} מתוך {b} משפטים נלמדו',
    'learn.phrases.sub': 'משפטים שימושיים ברמת {level} למצבים אמיתיים.',
    'grammar.sub': 'דקדוק ברמת {level} · {a} מתוך {b} כללים הושלמו',
    'grammar.back': 'כללי הדקדוק', 'grammar.when': 'מתי משתמשים', 'grammar.structure': 'המבנה',
    'grammar.examples': 'דוגמאות', 'grammar.mistake': 'טעות נפוצה', 'grammar.practice': 'לתרגל את הכלל',
    'grammar.choose': 'בחר את הצורה הנכונה',
    'grammar.done': 'הכלל הושלם.', 'grammar.retry': 'קרא שוב את הכלל ונסה פעם נוספת.',
    'grammar.next': 'הכלל הבא: {title}', 'grammar.again': 'לקרוא שוב את הכלל', 'grammar.all': 'כל כללי הדקדוק',

    'card.count': '{a} מתוך {b}', 'card.hint': 'הקש על הכרטיס כדי לראות את התרגום', 'card.hide': 'הסתרת התרגום',
    'sr.right': 'נכון', 'sr.wrong': 'לא בדיוק. התשובה היא {answer}',
    'card.practice': 'לתרגל את המילים',
    'btn.next': 'הבא', 'btn.back': 'הקודם', 'btn.finish': 'סיום',
    'btn.home': 'חזרה לבית', 'btn.more': 'עוד תרגול', 'btn.lessons': 'לשיעורים',

    'practice.sub': 'בחר תרגיל · רמת {level}',
    'practice.review': 'חזרה על מילים', 'practice.review.some': '{n} מילים מחכות לחזרה', 'practice.review.one': 'מילה אחת מחכה לחזרה',
    'practice.review.none': 'אין כרגע מילים לחזרה',
    'practice.speak.sub': 'מקשיבים ואומרים בקול',
    'practice.listen.sub': 'שומעים מילה ובוחרים אותה',
    'practice.type': 'כתיבת המילה', 'practice.type.sub': 'רואים בעברית, כותבים באנגלית',
    'quiz.type': 'כתבו את זה באנגלית', 'quiz.type.ph': 'Type here…', 'quiz.check': 'בדיקה',
    'quiz.type.right': 'נכון!', 'quiz.type.close': 'כמעט! שימו לב לאיות:', 'quiz.type.wrong': 'התשובה היא:',
    'practice.cloze': 'השלמת משפט', 'practice.cloze.sub': 'משלימים את המילה החסרה',

    'quiz.count': 'שאלה {a} מתוך {b}', 'quiz.review': 'חזרה על מילים',
    'quiz.listen': 'הקשב ובחר את המילה ששמעת', 'quiz.cloze': 'השלם את המשפט',
    'quiz.mean': 'מה הפירוש?', 'quiz.say': 'איך אומרים את זה באנגלית?',
    'quiz.score': '{a} מתוך {b} נכונות',
    'quiz.again': 'עוד ניסיון', 'quiz.great': 'עבודה מצוינת!', 'quiz.keep': 'כל סבב מקדם אותך. המילים שטעית בהן יחזרו שוב.',
    'tricky.title': 'מילים קשות', 'tricky.one': 'מילה אחת ממשיכה לחמוק. בוא נתרגל אותה',
    'tricky.some': '{n} מילים ממשיכות לחמוק. תרגול רק שלהן',
    'quiz.missed': 'מילים לחזור עליהן', 'quiz.again.missed': 'לתרגל שוב את המילים האלה', 'quiz.missedTitle': 'הטעויות שלך',
    'quiz.empty': 'אין מילים לחזרה', 'quiz.empty.sub': 'למד שיעור חדש, והמילים שלו יחזרו לכאן בזמן הנכון.',

    'speak.count': 'תרגול דיבור · {a} מתוך {b}', 'speak.do': 'הקשב, ואז אמור בקול',
    'speak.hard': 'עדיין קשה', 'speak.said': 'אמרתי',
    'speak.do.mic': 'הקשב, ואז הקש על המיקרופון ואמור בקול', 'speak.mic': 'אמירה למיקרופון',
    'speak.listening': 'מקשיב…', 'speak.great': 'מצוין! זה נשמע ברור ✓',
    'speak.heard': 'מה ששמעתי:', 'speak.again': 'הקשב שוב ונסה עוד פעם.',
    'speak.nothing': 'לא שמעתי. הקש על המיקרופון ונסה שוב.',
    'speak.blocked': 'המיקרופון חסום. אפשר להמשיך לתרגל ולדרג את עצמך.',
    'speak.score': '{a} מתוך {b} נאמרו בביטחון',
    'speak.sub': 'לומר מילים בקול זו הדרך המהירה ביותר לזכור אותן.',

    'progress.title': 'ההתקדמות שלי', 'progress.sub': '{x} נקודות עד עכשיו',
    'progress.streak': 'ימים ברצף', 'progress.best': 'שיא רצף',
    'progress.words': '{a} מתוך {b} מילים', 'progress.phrases': '{a} מתוך {b} משפטים', 'progress.rules': '{a} מתוך {b} כללי דקדוק',
    'update.ready': 'גרסה חדשה מוכנה', 'update.reload': 'עדכון',
    'backup.title': 'גיבוי', 'backup.sub': 'שמרו עותק של ההתקדמות, כדי לשחזר אותה בטלפון חדש או אחרי ניקוי של Safari.',
    'backup.save': 'שמירת גיבוי', 'backup.restore': 'שחזור',
    'backup.saved': 'הגיבוי מוכן. שמרו את הקובץ במקום בטוח.', 'backup.saveFailed': 'לא הצלחנו ליצור את הגיבוי.',
    'backup.confirm': 'להחליף את ההתקדמות הנוכחית בגיבוי?', 'backup.bad': 'הקובץ הזה אינו גיבוי של Lingua. לא שונה דבר.',
    'backup.restored': 'ההתקדמות שוחזרה: {n} מילים.',
    'progress.reset': 'איפוס כל ההתקדמות', 'progress.confirm': 'למחוק את כל ההתקדמות? אי אפשר לבטל את הפעולה.',
    'notfound': 'הדף לא נמצא'
  }
};

// Hebrew names of the vocabulary lessons (the English names are in data.js)
const UNIT_HE = {
  greetings: 'ברכות ונימוסים', daily: 'חיי יום-יום', work: 'עבודה', food: 'אוכל ומסעדות', travel: 'נסיעות',
  opinions: 'דעות ודיון', office: 'במשרד', business: 'עסקים', nuance: 'גוני משמעות'
};

// Hebrew for the row labels in the grammar "Structure" tables.
// Labels that are English words being taught (a, the, will, who…) stay as they are.
const FORM_HE = {
  none: 'בלי', irregular: 'חריגים', short: 'קצר', long: 'ארוך',
  subject: 'נושא', object: 'מושא', possessive: 'שייכות', alone: 'עצמאי',
  countable: 'ספיר', uncountable: 'לא ספיר', both: 'שניהם', preposition: 'מילת יחס',
  present: 'הווה', past: 'עבר', perfect: 'מושלם', future: 'עתיד',
  question: 'שאלה', command: 'ציווי', commas: 'פסיקים'
};

const isHe = () => Store.lang === 'he';
const t = (key, vars = {}) =>
  (STR[Store.lang][key] ?? STR.en[key] ?? key).replace(/\{(\w+)\}/g, (_, name) => vars[name]);
