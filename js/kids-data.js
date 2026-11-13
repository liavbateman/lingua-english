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

// Picture stories: 4–5 short pages built from island words, read aloud word by word,
// then one picture question. A story opens once its island is finished (the first is always open).
// page: [scene pictures, English sentence, Hebrew]; ask: [question, Hebrew, [right picture, other, other]]
const KIDS_STORIES = [
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
