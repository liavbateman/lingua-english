// Kids world: picture words for young learners (about 4–9), grouped into themed islands.
// Every word is a picture (emoji) + the English word + its Hebrew meaning, so a child who
// can't read yet still learns by looking and listening.
// pic: the picture; en: the English word (spoken aloud); he: Hebrew meaning.
// color: the island's colour; sticker: the sticker earned when the island is finished.
const KIDS_THEMES = [
  {
    id: 'animals', title: 'Animals', he: 'חיות', pic: '🐶', color: '#ff9f43', sticker: '🦄',
    words: [
      { en: 'cat', he: 'חתול', pic: '🐱' },
      { en: 'dog', he: 'כלב', pic: '🐶' },
      { en: 'bird', he: 'ציפור', pic: '🐦' },
      { en: 'fish', he: 'דג', pic: '🐟' },
      { en: 'cow', he: 'פרה', pic: '🐮' },
      { en: 'lion', he: 'אריה', pic: '🦁' },
      { en: 'monkey', he: 'קוף', pic: '🐵' },
      { en: 'elephant', he: 'פיל', pic: '🐘' }
    ]
  },
  {
    id: 'colors', title: 'Colors', he: 'צבעים', pic: '🎨', color: '#ff5d8f', sticker: '🌈',
    words: [
      { en: 'red', he: 'אדום', pic: '🔴' },
      { en: 'blue', he: 'כחול', pic: '🔵' },
      { en: 'green', he: 'ירוק', pic: '🟢' },
      { en: 'yellow', he: 'צהוב', pic: '🟡' },
      { en: 'orange', he: 'כתום', pic: '🟠' },
      { en: 'purple', he: 'סגול', pic: '🟣' },
      { en: 'black', he: 'שחור', pic: '⚫' },
      { en: 'white', he: 'לבן', pic: '⚪' }
    ]
  },
  {
    id: 'numbers', title: 'Numbers', he: 'מספרים', pic: '🔢', color: '#3fa7ff', sticker: '🚀',
    words: [
      { en: 'one', he: 'אחת', pic: '1️⃣' },
      { en: 'two', he: 'שתיים', pic: '2️⃣' },
      { en: 'three', he: 'שלוש', pic: '3️⃣' },
      { en: 'four', he: 'ארבע', pic: '4️⃣' },
      { en: 'five', he: 'חמש', pic: '5️⃣' },
      { en: 'six', he: 'שש', pic: '6️⃣' },
      { en: 'seven', he: 'שבע', pic: '7️⃣' },
      { en: 'eight', he: 'שמונה', pic: '8️⃣' },
      { en: 'nine', he: 'תשע', pic: '9️⃣' },
      { en: 'ten', he: 'עשר', pic: '🔟' }
    ]
  },
  {
    id: 'food', title: 'Yummy food', he: 'אוכל טעים', pic: '🍎', color: '#2fd093', sticker: '🍦',
    words: [
      { en: 'apple', he: 'תפוח', pic: '🍎' },
      { en: 'banana', he: 'בננה', pic: '🍌' },
      { en: 'grapes', he: 'ענבים', pic: '🍇' },
      { en: 'strawberry', he: 'תות', pic: '🍓' },
      { en: 'bread', he: 'לחם', pic: '🍞' },
      { en: 'milk', he: 'חלב', pic: '🥛' },
      { en: 'egg', he: 'ביצה', pic: '🥚' },
      { en: 'pizza', he: 'פיצה', pic: '🍕' }
    ]
  },
  {
    id: 'family', title: 'My family', he: 'המשפחה שלי', pic: '👨‍👩‍👧', color: '#b98cff', sticker: '💖',
    words: [
      { en: 'mom', he: 'אמא', pic: '👩' },
      { en: 'dad', he: 'אבא', pic: '👨' },
      { en: 'baby', he: 'תינוק', pic: '👶' },
      { en: 'sister', he: 'אחות', pic: '👧' },
      { en: 'brother', he: 'אח', pic: '👦' },
      { en: 'grandma', he: 'סבתא', pic: '👵' },
      { en: 'grandpa', he: 'סבא', pic: '👴' }
    ]
  },
  {
    // Whole little phrases, learned as chunks (the way children pick up a language)
    id: 'phrases', title: 'Little phrases', he: 'משפטים קטנים', pic: '💬', color: '#d946ef', sticker: '🗨️',
    words: [
      { en: 'thank you', he: 'תודה', pic: '🙏' },
      { en: 'please', he: 'בבקשה', pic: '🥺' },
      { en: "I'm sorry", he: 'סליחה', pic: '😔' },
      { en: 'I want water', he: 'אני רוצה מים', pic: '💧' },
      { en: "I'm hungry", he: 'אני רעב', pic: '😋' },
      { en: "let's play", he: 'בוא נשחק', pic: '🤾' },
      { en: 'I love you', he: 'אני אוהב אותך', pic: '💖' },
      { en: 'good night', he: 'לילה טוב', pic: '🌙' }
    ]
  },
  {
    id: 'body', title: 'My body', he: 'הגוף שלי', pic: '✋', color: '#ffc93c', sticker: '⭐',
    words: [
      { en: 'eye', he: 'עין', pic: '👁️' },
      { en: 'ear', he: 'אוזן', pic: '👂' },
      { en: 'nose', he: 'אף', pic: '👃' },
      { en: 'mouth', he: 'פה', pic: '👄' },
      { en: 'hand', he: 'יד', pic: '✋' },
      { en: 'foot', he: 'כף רגל', pic: '🦶' },
      { en: 'tooth', he: 'שן', pic: '🦷' }
    ]
  },
  {
    id: 'toys', title: 'Toys & play', he: 'צעצועים', pic: '🧸', color: '#ff7a59', sticker: '🎁',
    words: [
      { en: 'ball', he: 'כדור', pic: '⚽' },
      { en: 'teddy bear', he: 'דובי', pic: '🧸' },
      { en: 'balloon', he: 'בלון', pic: '🎈' },
      { en: 'kite', he: 'עפיפון', pic: '🪁' },
      { en: 'robot', he: 'רובוט', pic: '🤖' },
      { en: 'drum', he: 'תוף', pic: '🥁' },
      { en: 'book', he: 'ספר', pic: '📕' }
    ]
  },
  {
    id: 'go', title: 'Things that go', he: 'כלי תחבורה', pic: '🚗', color: '#4dd4e0', sticker: '🏆',
    words: [
      { en: 'car', he: 'מכונית', pic: '🚗' },
      { en: 'bus', he: 'אוטובוס', pic: '🚌' },
      { en: 'train', he: 'רכבת', pic: '🚂' },
      { en: 'plane', he: 'מטוס', pic: '✈️' },
      { en: 'boat', he: 'סירה', pic: '⛵' },
      { en: 'bike', he: 'אופניים', pic: '🚲' },
      { en: 'truck', he: 'משאית', pic: '🚚' }
    ]
  },
  {
    id: 'clothes', title: 'Clothes', he: 'בגדים', pic: '👕', color: '#7c8cff', sticker: '👑',
    words: [
      { en: 'shirt', he: 'חולצה', pic: '👕' },
      { en: 'pants', he: 'מכנסיים', pic: '👖' },
      { en: 'dress', he: 'שמלה', pic: '👗' },
      { en: 'shoes', he: 'נעליים', pic: '👟' },
      { en: 'hat', he: 'כובע', pic: '🧢' },
      { en: 'socks', he: 'גרביים', pic: '🧦' },
      { en: 'coat', he: 'מעיל', pic: '🧥' }
    ]
  },
  {
    id: 'sky', title: 'Sky & nature', he: 'שמיים וטבע', pic: '☀️', color: '#5cc96b', sticker: '🌻',
    words: [
      { en: 'sun', he: 'שמש', pic: '☀️' },
      { en: 'moon', he: 'ירח', pic: '🌙' },
      { en: 'star', he: 'כוכב', pic: '⭐' },
      { en: 'cloud', he: 'ענן', pic: '☁️' },
      { en: 'rain', he: 'גשם', pic: '🌧️' },
      { en: 'tree', he: 'עץ', pic: '🌳' },
      { en: 'flower', he: 'פרח', pic: '🌸' }
    ]
  },
  {
    id: 'feelings', title: 'Feelings', he: 'רגשות', pic: '😀', color: '#ff8fab', sticker: '🤗',
    words: [
      { en: 'happy', he: 'שמח', pic: '😀' },
      { en: 'sad', he: 'עצוב', pic: '😢' },
      { en: 'angry', he: 'כועס', pic: '😠' },
      { en: 'scared', he: 'מפחד', pic: '😨' },
      { en: 'tired', he: 'עייף', pic: '🥱' },
      { en: 'surprised', he: 'מופתע', pic: '😮' }
    ]
  },
  {
    id: 'home', title: 'My home', he: 'הבית שלי', pic: '🏠', color: '#ffb347', sticker: '🏰',
    words: [
      { en: 'house', he: 'בית', pic: '🏠' },
      { en: 'bed', he: 'מיטה', pic: '🛏️' },
      { en: 'chair', he: 'כיסא', pic: '🪑' },
      { en: 'door', he: 'דלת', pic: '🚪' },
      { en: 'window', he: 'חלון', pic: '🪟' },
      { en: 'bath', he: 'אמבטיה', pic: '🛁' },
      { en: 'lamp', he: 'מנורה', pic: '💡' },
      { en: 'clock', he: 'שעון', pic: '⏰' }
    ]
  },
  {
    id: 'actions', title: "Let's move!", he: 'פעולות', pic: '🏃', color: '#00c2a8', sticker: '🥇',
    words: [
      { en: 'run', he: 'לרוץ', pic: '🏃' },
      { en: 'swim', he: 'לשחות', pic: '🏊' },
      { en: 'sing', he: 'לשיר', pic: '🎤' },
      { en: 'dance', he: 'לרקוד', pic: '💃' },
      { en: 'read', he: 'לקרוא', pic: '📖' },
      { en: 'write', he: 'לכתוב', pic: '✍️' },
      { en: 'sleep', he: 'לישון', pic: '🛌' },
      { en: 'climb', he: 'לטפס', pic: '🧗' }
    ]
  },
  {
    id: 'shapes', title: 'Shapes', he: 'צורות', pic: '🔺', color: '#ff6b6b', sticker: '💎',
    words: [
      { en: 'circle', he: 'עיגול', pic: '⭕' },
      { en: 'square', he: 'ריבוע', pic: '🟦' },
      { en: 'triangle', he: 'משולש', pic: '🔺' },
      { en: 'heart', he: 'לב', pic: '❤️' },
      { en: 'diamond', he: 'מעוין', pic: '🔷' },
      { en: 'star', he: 'כוכב', pic: '🌟' }
    ]
  },
  {
    // Opposites come in pairs: words 0-1, 2-3, 4-5… are each other's opposite
    id: 'opposites', title: 'Opposites', he: 'הפכים', pic: '🔄', color: '#f97316', sticker: '🎭', pairs: true,
    words: [
      { en: 'big', he: 'גדול', pic: '🐘' }, { en: 'small', he: 'קטן', pic: '🐭' },
      { en: 'hot', he: 'חם', pic: '🔥' }, { en: 'cold', he: 'קר', pic: '🧊' },
      { en: 'up', he: 'למעלה', pic: '⬆️' }, { en: 'down', he: 'למטה', pic: '⬇️' },
      { en: 'fast', he: 'מהיר', pic: '🐆' }, { en: 'slow', he: 'איטי', pic: '🐢' },
      { en: 'day', he: 'יום', pic: '🌞' }, { en: 'night', he: 'לילה', pic: '🌃' },
      { en: 'wet', he: 'רטוב', pic: '💦' }, { en: 'dry', he: 'יבש', pic: '🏜️' }
    ]
  },
  {
    id: 'school', title: 'At school', he: 'בבית הספר', pic: '🎒', color: '#5b8def', sticker: '🎓',
    words: [
      { en: 'school', he: 'בית ספר', pic: '🏫' },
      { en: 'teacher', he: 'מורה', pic: '🧑‍🏫' },
      { en: 'backpack', he: 'תיק', pic: '🎒' },
      { en: 'pencil', he: 'עיפרון', pic: '✏️' },
      { en: 'crayon', he: 'צבע', pic: '🖍️' },
      { en: 'scissors', he: 'מספריים', pic: '✂️' },
      { en: 'ruler', he: 'סרגל', pic: '📏' }
    ]
  }
];

// Each word gets a stable id: theme/word
KIDS_THEMES.forEach(th => th.words.forEach(w => { w.id = th.id + '/' + w.en; w.theme = th.id; }));
const KIDS_WORDS = KIDS_THEMES.flatMap(th => th.words);

// The owl's wardrobe: items open as the child collects stars (nothing is spent, so nothing is lost)
const KIDS_OWL_COLORS = [
  { id: 'blue', c: '#3f7bff', stars: 0 }, { id: 'pink', c: '#ff5d8f', stars: 2 }, { id: 'green', c: '#2fbf7f', stars: 4 },
  { id: 'orange', c: '#ff9f43', stars: 6 }, { id: 'purple', c: '#9b6bff', stars: 9 }, { id: 'gold', c: '#f4b400', stars: 12 }
];
const KIDS_OWL_ACC = [
  { id: '', pic: '🚫', stars: 0 }, { id: 'bow', pic: '🎀', stars: 1 }, { id: 'flower', pic: '🌸', stars: 2 },
  { id: 'balloon', pic: '🎈', stars: 3 }, { id: 'shades', pic: '🕶️', stars: 5 }, { id: 'tophat', pic: '🎩', stars: 7 },
  { id: 'crown', pic: '👑', stars: 10 }, { id: 'star', pic: '🌟', stars: 13 }, { id: 'rainbow', pic: '🌈', stars: 16 }, { id: 'rocket', pic: '🚀', stars: 20 }
];

// Treasure stickers: one comes out of the daily chest (new ones first, then repeats)
const KIDS_TREASURE = ['🦖', '🐙', '🦋', '🍩', '🚁', '🐼', '🌵', '🎸', '🦊', '🍉', '🐢', '🪐', '🧁', '🐳', '🎠', '🦒', '🍭', '🐝', '🛸', '🦜'];

// The ABC: every letter with its spoken name, a word that starts with it (X: a word that has it) and a picture
const KIDS_ABC = [
  ['A', 'ay', 'apple', 'תפוח', '🍎'], ['B', 'bee', 'ball', 'כדור', '⚽'], ['C', 'see', 'cat', 'חתול', '🐱'],
  ['D', 'dee', 'dog', 'כלב', '🐶'], ['E', 'ee', 'egg', 'ביצה', '🥚'], ['F', 'eff', 'fish', 'דג', '🐟'],
  ['G', 'jee', 'grapes', 'ענבים', '🍇'], ['H', 'aitch', 'hat', 'כובע', '🧢'], ['I', 'eye', 'ice cream', 'גלידה', '🍦'],
  ['J', 'jay', 'juice', 'מיץ', '🧃'], ['K', 'kay', 'kite', 'עפיפון', '🪁'], ['L', 'el', 'lion', 'אריה', '🦁'],
  ['M', 'em', 'moon', 'ירח', '🌙'], ['N', 'en', 'nose', 'אף', '👃'], ['O', 'oh', 'orange', 'תפוז', '🍊'],
  ['P', 'pee', 'pizza', 'פיצה', '🍕'], ['Q', 'cue', 'queen', 'מלכה', '👸'], ['R', 'are', 'robot', 'רובוט', '🤖'],
  ['S', 'ess', 'sun', 'שמש', '☀️'], ['T', 'tee', 'tree', 'עץ', '🌳'], ['U', 'you', 'umbrella', 'מטרייה', '☂️'],
  ['V', 'vee', 'violin', 'כינור', '🎻'], ['W', 'double you', 'whale', 'לווייתן', '🐳'], ['X', 'ex', 'fox', 'שועל', '🦊'],
  ['Y', 'why', 'yo-yo', 'יו-יו', '🪀'], ['Z', 'zee', 'zebra', 'זברה', '🦓']
].map(([L, name, word, he, pic]) => ({ L, name, word, he, pic }));

// Letter sounds (phonics), spelled so a speech voice says something close: "B says buh, buh, ball"
const KIDS_SOUNDS = { A: 'ah', B: 'buh', C: 'kuh', D: 'duh', E: 'eh', F: 'fuh', G: 'guh', H: 'huh', I: 'ih', J: 'juh', K: 'kuh', L: 'luh', M: 'muh',
  N: 'nuh', O: 'aw', P: 'puh', Q: 'kwuh', R: 'ruh', S: 'suh', T: 'tuh', U: 'uh', V: 'vuh', W: 'wuh', X: 'ks', Y: 'yuh', Z: 'zuh' };
KIDS_ABC.forEach(x => { x.sound = KIDS_SOUNDS[x.L]; });

// Picture stories: 4–5 short pages built from island words, read aloud word by word,
// then one picture question. A story opens once its island is finished (the first is always open).
// page: [scene pictures, English sentence, Hebrew]; ask: [question, Hebrew, [right picture, other, other]]
const KIDS_STORIES = [
  {
    // The bedtime story: on the shelf all day, and offered on the map in the evening
    id: 'goodnight', island: null, title: 'Good night, owl', he: 'לילה טוב, ינשוף', pic: '🌙',
    pages: [
      ['🌅', 'The sun goes down.', 'השמש שוקעת.'],
      ['🌙', 'The moon comes up.', 'הירח עולה.'],
      ['✨⭐✨', 'The stars say hello.', 'הכוכבים אומרים שלום.'],
      ['🦉💤', 'The owl says good night.', 'הינשוף אומר לילה טוב.'],
      ['🛏️😴', 'Good night, little one!', 'לילה טוב, קטנטנים!']
    ],
    ask: ['Who says good night?', 'מי אומר לילה טוב?', ['🦉', '🐶', '🚗']]
  },
  {
    id: 'catdog', island: null, title: 'The cat and the dog', he: 'החתול והכלב', pic: '🐱',
    pages: [
      ['🐱🏡', 'This is a cat.', 'זה חתול.'],
      ['🐶', 'This is a dog.', 'זה כלב.'],
      ['🐱⚽🐶', 'The cat and the dog play with a ball.', 'החתול והכלב משחקים בכדור.'],
      ['🐱😴🐶', 'Now they sleep. Good night!', 'עכשיו הם ישנים. לילה טוב!']
    ],
    ask: ['What do they play with?', 'במה הם משחקים?', ['⚽', '🍎', '🚗']]
  },
  {
    id: 'balloon', island: 'colors', title: 'My red balloon', he: 'הבלון האדום שלי', pic: '🎈',
    pages: [
      ['🧒🎈', 'I have a red balloon.', 'יש לי בלון אדום.'],
      ['🎈⬆️', 'Oh no! The balloon flies up.', 'אוי לא! הבלון עף למעלה.'],
      ['☁️🎈☀️', 'It is in the blue sky.', 'הוא בשמיים הכחולים.'],
      ['👋🎈', 'Bye bye, red balloon!', 'ביי ביי, בלון אדום!']
    ],
    ask: ['What color is the balloon?', 'באיזה צבע הבלון?', ['🔴', '🔵', '🟢']]
  },
  {
    id: 'count', island: 'numbers', title: 'Count with me', he: 'סופרים איתי', pic: '🔢',
    pages: [
      ['☀️', 'One sun.', 'שמש אחת.'],
      ['🐦🐦', 'Two birds.', 'שתי ציפורים.'],
      ['🌸🌸🌸', 'Three flowers.', 'שלושה פרחים.'],
      ['🐟🐟🐟🐟', 'Four fish.', 'ארבעה דגים.'],
      ['⭐⭐⭐⭐⭐', 'Five stars!', 'חמישה כוכבים!']
    ],
    ask: ['How many birds?', 'כמה ציפורים?', ['2️⃣', '3️⃣', '5️⃣']]
  },
  {
    id: 'lunch', island: 'food', title: 'Lunch time', he: 'ארוחת צהריים', pic: '🍕',
    pages: [
      ['😋', 'I am hungry.', 'אני רעב.'],
      ['🍎', 'I eat an apple.', 'אני אוכל תפוח.'],
      ['🥛', 'I drink milk.', 'אני שותה חלב.'],
      ['🍕😋', 'And pizza! Yummy!', 'וגם פיצה! טעים!']
    ],
    ask: ['What do I drink?', 'מה אני שותה?', ['🥛', '🍌', '🍕']]
  },
  {
    id: 'family', island: 'family', title: 'I love my family', he: 'אני אוהב את המשפחה שלי', pic: '💖',
    pages: [
      ['👩', 'This is my mom.', 'זאת אמא שלי.'],
      ['👨', 'This is my dad.', 'זה אבא שלי.'],
      ['👶', 'This is my baby sister.', 'זאת אחותי התינוקת.'],
      ['👨‍👩‍👧💖', 'I love my family!', 'אני אוהב את המשפחה שלי!']
    ],
    ask: ['Who is the baby?', 'מי התינוקת?', ['👶', '👵', '👨']]
  }
];

// Songs & chants: each line is a row of [word, picture]; the owl sings one word per note.
// sing: what is spoken for that word (a letter's name, for the ABC)
const KIDS_SONGS = [
  {
    id: 'numbers', title: 'Number song', he: 'שיר המספרים', pic: '🔢', color: '#3fa7ff',
    lines: [
      [['one', '1️⃣'], ['two', '2️⃣'], ['three', '3️⃣'], ['four', '4️⃣'], ['five', '5️⃣']],
      [['six', '6️⃣'], ['seven', '7️⃣'], ['eight', '8️⃣'], ['nine', '9️⃣'], ['ten', '🔟']],
      [['Yay!', '🎉']]
    ]
  },
  {
    id: 'colors', title: 'Rainbow song', he: 'שיר הקשת', pic: '🌈', color: '#ff5d8f',
    lines: [
      [['red', '🔴'], ['orange', '🟠'], ['yellow', '🟡']],
      [['green', '🟢'], ['blue', '🔵'], ['purple', '🟣']],
      [['a', '🌈'], ['rainbow!', '🌈']]
    ]
  },
  {
    id: 'abc', title: 'ABC chant', he: 'שיר ה-ABC', pic: '🔤', color: '#ffc93c',
    lines: [
      'ABCDEFG', 'HIJKLMNOP', 'QRSTUV', 'WXYZ'
    ].map(row => row.split('').map(L => [L, L, KIDS_ABC.find(x => x.L === L).name]))
  },
  {
    id: 'hello', title: 'Hello song', he: 'שיר השלום', pic: '👋', color: '#2fd093',
    lines: [
      [['Hello,', '👋'], ['hello,', '👋']],
      [['how', '🙂'], ['are', '❓'], ['you?', '🫵']],
      [["I'm", '😀'], ['fine,', '👍'], ['thank', '🙏'], ['you!', '💖']]
    ]
  }
];

// "Who am I?" riddles: short spoken clues about a picture word (id = island/word)
const KIDS_RIDDLES = [
  ['food/banana', 'I am yellow. I am long. Monkeys love me!', 'אני צהוב. אני ארוך. קופים אוהבים אותי!'],
  ['animals/cat', 'I say meow. I like milk.', 'אני אומר מיאו. אני אוהב חלב.'],
  ['sky/sun', 'I am hot. I am in the sky in the day.', 'אני חם. אני בשמיים ביום.'],
  ['animals/fish', 'I live in the water. I can swim.', 'אני גר במים. אני יודע לשחות.'],
  ['animals/elephant', 'I am big and grey. I have a very long nose.', 'אני גדול ואפור. יש לי אף ארוך מאוד.'],
  ['sky/moon', 'I come out at night. I am in the sky.', 'אני יוצא בלילה. אני בשמיים.'],
  ['food/apple', 'I am red. I grow on a tree. You can eat me.', 'אני אדום. אני גדל על עץ. אפשר לאכול אותי.'],
  ['toys/ball', 'I am round. You can kick me.', 'אני עגול. אפשר לבעוט בי.'],
  ['home/bed', 'You sleep on me at night.', 'ישנים עליי בלילה.'],
  ['animals/cow', 'I say moo. I give you milk.', 'אני אומרת מו. אני נותנת לכם חלב.'],
  ['sky/rain', 'I fall from the clouds. I am wet.', 'אני נופל מהעננים. אני רטוב.'],
  ['go/car', 'I have four wheels. I go beep beep!', 'יש לי ארבעה גלגלים. אני עושה ביפ ביפ!'],
  ['clothes/shoes', 'You wear me on your feet.', 'נועלים אותי על הרגליים.'],
  ['body/tooth', 'I am white. I am in your mouth.', 'אני לבן. אני בפה שלכם.'],
  ['animals/bird', 'I have wings. I can fly and sing.', 'יש לי כנפיים. אני יודעת לעוף ולשיר.'],
  ['animals/lion', 'I am the king of the animals. I say roar!', 'אני מלך החיות. אני אומר רוארר!'],
  ['go/plane', 'I fly in the sky. People sit in me.', 'אני עף בשמיים. אנשים יושבים בתוכי.'],
  ['home/clock', 'I say tick tock. I tell you the time.', 'אני עושה טיק טק. אני אומר מה השעה.']
].map(([id, en, he]) => ({ id, w: KIDS_WORDS.find(x => x.id === id), en, he }));
