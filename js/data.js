// Learning content. To add a lesson, add an object to UNITS.
// level: 'beginner' | 'intermediate' | 'advanced'
// Each word: en = English, he = Hebrew, ex = example sentence.
// The example must contain the word exactly as written in `en`
// (the "complete the sentence" exercise blanks it out).
const LEVELS = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' }
];

const UNITS = [
  // ---------- Beginner ----------
  {
    id: 'greetings', level: 'beginner', title: 'Greetings', emoji: '👋',
    words: [
      { en: 'hello', he: 'שלום', ex: 'Hello, how are you?' },
      { en: 'thank you', he: 'תודה', ex: 'Thank you for your help.' },
      { en: 'please', he: 'בבקשה', ex: 'Can I have water, please?' },
      { en: 'sorry', he: 'סליחה', ex: 'Sorry, I am late.' },
      { en: 'name', he: 'שם', ex: 'My name is David.' },
      { en: 'friend', he: 'חבר', ex: 'He is my best friend.' },
      { en: 'goodbye', he: 'להתראות', ex: 'Goodbye, see you tomorrow.' },
      { en: 'nice to meet you', he: 'נעים להכיר', ex: 'Hi, nice to meet you.' }
    ]
  },
  {
    id: 'daily', level: 'beginner', title: 'Everyday life', emoji: '🏡',
    words: [
      { en: 'home', he: 'בית', ex: 'I am going home.' },
      { en: 'family', he: 'משפחה', ex: 'My family is big.' },
      { en: 'morning', he: 'בוקר', ex: 'I drink coffee in the morning.' },
      { en: 'today', he: 'היום', ex: 'Today is a good day.' },
      { en: 'tomorrow', he: 'מחר', ex: 'I will call you tomorrow.' },
      { en: 'time', he: 'זמן', ex: 'I have no time.' },
      { en: 'money', he: 'כסף', ex: 'How much money do you need?' },
      { en: 'phone', he: 'טלפון', ex: 'Where is my phone?' }
    ]
  },
  {
    id: 'work', level: 'beginner', title: 'Work', emoji: '💼',
    words: [
      { en: 'work', he: 'עבודה', ex: 'I start work at eight.' },
      { en: 'meeting', he: 'פגישה', ex: 'We have a meeting at ten.' },
      { en: 'boss', he: 'מנהל', ex: 'My boss is very nice.' },
      { en: 'email', he: 'מייל', ex: 'Please send me an email.' },
      { en: 'customer', he: 'לקוח', ex: 'The customer is waiting.' },
      { en: 'price', he: 'מחיר', ex: 'What is the price?' },
      { en: 'busy', he: 'עסוק', ex: 'I am busy right now.' },
      { en: 'schedule', he: 'לוח זמנים', ex: 'Let me check my schedule.' }
    ]
  },
  {
    id: 'food', level: 'beginner', title: 'Food & restaurants', emoji: '🍽️',
    words: [
      { en: 'water', he: 'מים', ex: 'A glass of water, please.' },
      { en: 'bread', he: 'לחם', ex: 'I buy bread every day.' },
      { en: 'chicken', he: 'עוף', ex: 'I will have the chicken.' },
      { en: 'menu', he: 'תפריט', ex: 'Can I see the menu?' },
      { en: 'bill', he: 'חשבון', ex: 'Can we get the bill?' },
      { en: 'hungry', he: 'רעב', ex: 'I am very hungry.' },
      { en: 'delicious', he: 'טעים', ex: 'This food is delicious.' },
      { en: 'table', he: 'שולחן', ex: 'A table for two, please.' }
    ]
  },
  {
    id: 'travel', level: 'beginner', title: 'Travel', emoji: '✈️',
    words: [
      { en: 'airport', he: 'שדה תעופה', ex: 'We are going to the airport.' },
      { en: 'ticket', he: 'כרטיס', ex: 'I need one ticket.' },
      { en: 'passport', he: 'דרכון', ex: 'Here is my passport.' },
      { en: 'hotel', he: 'מלון', ex: 'The hotel is near the beach.' },
      { en: 'left', he: 'שמאל', ex: 'Turn left at the corner.' },
      { en: 'right', he: 'ימין', ex: 'The shop is on the right.' },
      { en: 'street', he: 'רחוב', ex: 'What street is this?' },
      { en: 'luggage', he: 'מזוודות', ex: 'Where is my luggage?' }
    ]
  },

  // ---------- Intermediate ----------
  {
    id: 'opinions', level: 'intermediate', title: 'Opinions & discussion', emoji: '💬',
    words: [
      { en: 'although', he: 'למרות ש', ex: 'I went out, although it was raining.' },
      { en: 'however', he: 'עם זאת', ex: 'The plan is good; however, it is expensive.' },
      { en: 'agree', he: 'להסכים', ex: 'I agree with your idea.' },
      { en: 'suggest', he: 'להציע', ex: 'I suggest we start early.' },
      { en: 'probably', he: 'כנראה', ex: 'She will probably be late.' },
      { en: 'actually', he: 'למעשה', ex: 'It is actually very simple.' },
      { en: 'instead', he: 'במקום זאת', ex: 'Let us walk instead.' },
      { en: 'nevertheless', he: 'למרות זאת', ex: 'It was raining. Nevertheless, we went outside.' }
    ]
  },
  {
    id: 'office', level: 'intermediate', title: 'At the office', emoji: '🏢',
    words: [
      { en: 'deadline', he: 'מועד אחרון', ex: 'The deadline is on Friday.' },
      { en: 'improve', he: 'לשפר', ex: 'I want to improve my English.' },
      { en: 'experience', he: 'ניסיון', ex: 'She has a lot of experience.' },
      { en: 'decision', he: 'החלטה', ex: 'It was a difficult decision.' },
      { en: 'responsible', he: 'אחראי', ex: 'Who is responsible for this project?' },
      { en: 'available', he: 'זמין', ex: 'Are you available tomorrow?' },
      { en: 'requirement', he: 'דרישה', ex: 'A license is a requirement for the job.' },
      { en: 'appointment', he: 'תור', ex: 'I have an appointment at noon.' }
    ]
  },

  // ---------- Advanced ----------
  {
    id: 'business', level: 'advanced', title: 'Business', emoji: '📊',
    words: [
      { en: 'negotiate', he: 'לנהל משא ומתן', ex: 'We need to negotiate a better price.' },
      { en: 'revenue', he: 'הכנסות', ex: 'Our revenue grew this year.' },
      { en: 'commitment', he: 'מחויבות', ex: 'This job requires real commitment.' },
      { en: 'reliable', he: 'אמין', ex: 'He is a reliable partner.' },
      { en: 'thorough', he: 'יסודי', ex: 'She did a thorough review.' },
      { en: 'outcome', he: 'תוצאה', ex: 'We are happy with the outcome.' },
      { en: 'leverage', he: 'למנף', ex: 'We can leverage our experience.' },
      { en: 'stakeholder', he: 'בעל עניין', ex: 'Every stakeholder approved the plan.' }
    ]
  },
  {
    id: 'nuance', level: 'advanced', title: 'Shades of meaning', emoji: '🎭',
    words: [
      { en: 'subtle', he: 'עדין, מרומז', ex: 'There is a subtle difference.' },
      { en: 'reluctant', he: 'מהסס, לא שש', ex: 'He was reluctant to answer.' },
      { en: 'inevitable', he: 'בלתי נמנע', ex: 'Change is inevitable.' },
      { en: 'overwhelming', he: 'מציף', ex: 'The amount of work was overwhelming.' },
      { en: 'straightforward', he: 'פשוט וישיר', ex: 'The process is straightforward.' },
      { en: 'meanwhile', he: 'בינתיים', ex: 'Dinner is cooking; meanwhile, set the table.' },
      { en: 'consequently', he: 'כתוצאה מכך', ex: 'He missed the bus and consequently was late.' },
      { en: 'assumption', he: 'הנחה', ex: 'That is a wrong assumption.' }
    ]
  }
];
