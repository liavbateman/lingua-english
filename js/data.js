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
      { en: 'nice to meet you', he: 'נעים להכיר', ex: 'Hi, nice to meet you.' },
      { en: 'good morning', he: 'בוקר טוב', ex: 'Good morning, how did you sleep?' },
      { en: 'good night', he: 'לילה טוב', ex: 'Good night, see you tomorrow.' },
      { en: 'good evening', he: 'ערב טוב', ex: 'Good evening, it is nice to see you.' },
      { en: 'welcome', he: 'ברוכים הבאים', ex: 'Welcome to our new home in Haifa.' },
      { en: 'how are you', he: 'מה שלומך', ex: 'Hi Dan, how are you this morning?' },
      { en: 'you\'re welcome', he: 'על לא דבר', ex: 'You\'re welcome, it was no problem at all.' },
      { en: 'see you later', he: 'נתראה מאוחר יותר', ex: 'I have to go now, see you later.' }
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
      { en: 'phone', he: 'טלפון', ex: 'Where is my phone?' },
      { en: 'wake up', he: 'להתעורר', ex: 'I wake up at seven every morning.' },
      { en: 'shower', he: 'מקלחת', ex: 'I take a shower before breakfast.' },
      { en: 'clock', he: 'שעון', ex: 'The clock in the kitchen is slow.' },
      { en: 'television', he: 'טלוויזיה', ex: 'We watch television after dinner.' },
      { en: 'computer', he: 'מחשב', ex: 'My computer is on the desk.' },
      { en: 'newspaper', he: 'עיתון', ex: 'My father reads the newspaper every morning.' },
      { en: 'every day', he: 'כל יום', ex: 'I drink coffee every day at work.' }
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
      { en: 'schedule', he: 'לוח זמנים', ex: 'Let me check my schedule.' },
      { en: 'office', he: 'משרד', ex: 'Our office is on the third floor.' },
      { en: 'job', he: 'משרה', ex: 'She has a new job in a bank.' },
      { en: 'salary', he: 'משכורת', ex: 'My salary is paid every month.' },
      { en: 'colleague', he: 'עמית לעבודה', ex: 'My colleague helps me with my work.' },
      { en: 'desk', he: 'שולחן כתיבה', ex: 'There is a lamp on my desk.' },
      { en: 'report', he: 'דוח', ex: 'I need to finish this report today.' },
      { en: 'day off', he: 'יום חופש', ex: 'Tomorrow is my day off from work.' }
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
      { en: 'table', he: 'שולחן', ex: 'A table for two, please.' },
      { en: 'breakfast', he: 'ארוחת בוקר', ex: 'We eat breakfast together at eight.' },
      { en: 'lunch', he: 'ארוחת צהריים', ex: 'I have lunch at one o\'clock.' },
      { en: 'dinner', he: 'ארוחת ערב', ex: 'What do you want for dinner tonight?' },
      { en: 'egg', he: 'ביצה', ex: 'I eat an egg every morning.' },
      { en: 'rice', he: 'אורז', ex: 'The chicken comes with rice and salad.' },
      { en: 'cheese', he: 'גבינה', ex: 'Can I have a sandwich with cheese?' },
      { en: 'coffee', he: 'קפה', ex: 'I drink a cup of coffee every morning.' }
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
      { en: 'luggage', he: 'מזוודות', ex: 'Where is my luggage?' },
      { en: 'map', he: 'מפה', ex: 'Can you show me the hotel on the map?' },
      { en: 'flight', he: 'טיסה', ex: 'Our flight to London leaves at nine.' },
      { en: 'vacation', he: 'חופשה', ex: 'We go on vacation every summer.' },
      { en: 'tourist', he: 'תייר', ex: 'Every tourist wants to see the old city.' },
      { en: 'beach', he: 'חוף ים', ex: 'Our hotel is close to the beach.' },
      { en: 'straight', he: 'ישר', ex: 'Go straight and then turn right.' },
      { en: 'reservation', he: 'הזמנה', ex: 'I have a reservation for two nights.' }
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
      { en: 'nevertheless', he: 'למרות זאת', ex: 'It was raining. Nevertheless, we went outside.' },
      { en: 'disagree', he: 'לא להסכים', ex: 'I disagree with you about the new plan.' },
      { en: 'point of view', he: 'נקודת מבט', ex: 'From my point of view, the idea is too expensive.' },
      { en: 'argument', he: 'טיעון', ex: 'She made a strong argument for working from home.' },
      { en: 'convince', he: 'לשכנע', ex: 'He tried to convince me to join the team.' },
      { en: 'in my opinion', he: 'לדעתי', ex: 'In my opinion, we should leave earlier tomorrow.' },
      { en: 'definitely', he: 'בהחלט', ex: 'I will definitely come to your party on Friday.' },
      { en: 'claim', he: 'לטעון', ex: 'Some people claim that the movie is better than the book.' }
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
      { en: 'appointment', he: 'תור', ex: 'I have an appointment at noon.' },
      { en: 'schedule', he: 'לוח זמנים', ex: 'Our schedule for next week is very busy.' },
      { en: 'task', he: 'משימה', ex: 'My first task today is to answer all the emails.' },
      { en: 'manager', he: 'מנהל', ex: 'The manager wants to see the sales numbers today.' },
      { en: 'report', he: 'דוח', ex: 'I need to finish this report before lunch.' },
      { en: 'printer', he: 'מדפסת', ex: 'The printer on our floor is broken again.' },
      { en: 'overtime', he: 'שעות נוספות', ex: 'She worked overtime to finish the project on time.' },
      { en: 'department', he: 'מחלקה', ex: 'He works in the marketing department of a large company.' }
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
      { en: 'stakeholder', he: 'בעל עניין', ex: 'Every stakeholder approved the plan.' },
      { en: 'merger', he: 'מיזוג', ex: 'The merger of the two banks created the largest lender in the region.' },
      { en: 'acquisition', he: 'רכישה של חברה', ex: 'The acquisition gave the company access to new markets in Asia.' },
      { en: 'market share', he: 'נתח שוק', ex: 'Our main goal this year is to increase our market share.' },
      { en: 'competitor', he: 'מתחרה', ex: 'Our biggest competitor has just lowered its prices again.' },
      { en: 'profitable', he: 'רווחי', ex: 'The new product line became profitable within its first year.' },
      { en: 'forecast', he: 'תחזית', ex: 'The sales forecast for next quarter looks quite optimistic.' },
      { en: 'launch', he: 'להשיק', ex: 'We plan to launch the new service early next spring.' }
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
      { en: 'assumption', he: 'הנחה', ex: 'That is a wrong assumption.' },
      { en: 'implicit', he: 'משתמע', ex: 'There was an implicit threat in the way he phrased the request.' },
      { en: 'arguably', he: 'ניתן לטעון ש', ex: 'This is arguably the most important decision we will make this year.' },
      { en: 'marginal', he: 'שולי', ex: 'The new policy had only a marginal effect on prices.' },
      { en: 'ironic', he: 'אירוני', ex: 'It is ironic that the safety inspector was injured at work.' },
      { en: 'deliberate', he: 'מכוון', ex: 'It was a deliberate attempt to mislead the committee.' },
      { en: 'inherent', he: 'טבוע, מובנה', ex: 'There are risks inherent in any new business venture.' },
      { en: 'presumably', he: 'יש להניח ש', ex: 'Presumably the meeting was cancelled because the manager is ill.' }
    ]
  }
];
