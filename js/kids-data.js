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

// Moving pictures: words that show an action move the way the word means (css/kids.css .mv-*)
const KIDS_MOVES = {
  'actions/run': 'run', 'actions/swim': 'swim', 'actions/dance': 'dance', 'actions/climb': 'climb', 'actions/sleep': 'sleep',
  'actions/sing': 'sway', 'actions/write': 'wiggle', 'actions/read': 'nod',
  'animals/bird': 'fly', 'animals/fish': 'swim', 'animals/monkey': 'bounce', 'animals/dog': 'wag', 'animals/lion': 'roar',
  'go/plane': 'fly', 'go/car': 'drive', 'go/bus': 'drive', 'go/train': 'drive', 'go/truck': 'drive', 'go/bike': 'drive', 'go/boat': 'float',
  'toys/ball': 'bounce', 'toys/balloon': 'float', 'toys/kite': 'float', 'toys/drum': 'nod',
  'sky/rain': 'fall', 'sky/sun': 'spin', 'sky/star': 'twinkle', 'sky/cloud': 'float', 'sky/flower': 'sway', 'sky/tree': 'sway',
  'opposites/up': 'up', 'opposites/down': 'down', 'opposites/fast': 'drive', 'opposites/slow': 'creep', 'opposites/hot': 'twinkle', 'opposites/cold': 'shiver',
  'feelings/happy': 'bounce', 'feelings/scared': 'shiver', 'feelings/angry': 'shake', 'feelings/tired': 'sleep', 'feelings/surprised': 'roar',
  'home/clock': 'wiggle', 'home/lamp': 'twinkle', 'phrases/good night': 'sleep', "phrases/let's play": 'bounce'
};
KIDS_WORDS.forEach(w => { if (KIDS_MOVES[w.id]) w.move = KIDS_MOVES[w.id]; });

// What the animals say, in English (a cow says "moo", a dog says "woof")
const KIDS_SAYS = {
  'animals/cat': 'meow', 'animals/dog': 'woof', 'animals/bird': 'tweet', 'animals/fish': 'blub',
  'animals/cow': 'moo', 'animals/lion': 'roar', 'animals/monkey': 'ooh ooh', 'animals/elephant': 'toot'
};
KIDS_WORDS.forEach(w => { if (KIDS_SAYS[w.id]) w.says = KIDS_SAYS[w.id]; });

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

// Holiday islands: they appear on the map only around their holiday (Hebrew calendar, or summer months)
// when: [hebrew month, from day, to month, to day] or { months: [gregorian months] }
const KIDS_HOLIDAYS = [
  {
    id: 'hanukkah', title: 'Hanukkah', he: 'חנוכה', pic: '🕎', color: '#3b82f6', sticker: '🕯️', when: ['Kislev', 20, 'Tevet', 5],
    words: [
      { en: 'candle', he: 'נר', pic: '🕯️' }, { en: 'menorah', he: 'חנוכייה', pic: '🕎' }, { en: 'donut', he: 'סופגנייה', pic: '🍩' },
      { en: 'gift', he: 'מתנה', pic: '🎁' }, { en: 'light', he: 'אור', pic: '💡' }, { en: 'oil', he: 'שמן', pic: '🫒' }
    ]
  },
  {
    id: 'purim', title: 'Purim', he: 'פורים', pic: '🎭', color: '#a855f7', sticker: '🤡', when: ['Adar', 1, 'Adar', 20],
    words: [
      { en: 'mask', he: 'מסכה', pic: '🎭' }, { en: 'costume', he: 'תחפושת', pic: '🦸' }, { en: 'crown', he: 'כתר', pic: '👑' },
      { en: 'clown', he: 'ליצן', pic: '🤡' }, { en: 'party', he: 'מסיבה', pic: '🎉' }, { en: 'cookie', he: 'עוגייה', pic: '🍪' }
    ]
  },
  {
    id: 'passover', title: 'Passover', he: 'פסח', pic: '🌷', color: '#10b981', sticker: '🐸', when: ['Nisan', 1, 'Nisan', 25],
    words: [
      { en: 'spring', he: 'אביב', pic: '🌷' }, { en: 'frog', he: 'צפרדע', pic: '🐸' }, { en: 'sea', he: 'ים', pic: '🌊' },
      { en: 'plate', he: 'צלחת', pic: '🍽️' }, { en: 'question', he: 'שאלה', pic: '❓' }, { en: 'flatbread', he: 'מצה', pic: '🫓' }
    ]
  },
  {
    id: 'newyear', title: 'New Year & Sukkot', he: 'ראש השנה וסוכות', pic: '🍯', color: '#eab308', sticker: '🍎', when: ['Tishri', 1, 'Tishri', 25],
    words: [
      { en: 'honey', he: 'דבש', pic: '🍯' }, { en: 'apple', he: 'תפוח', pic: '🍎' }, { en: 'horn', he: 'שופר', pic: '📯' },
      { en: 'hut', he: 'סוכה', pic: '🛖' }, { en: 'lemon', he: 'לימון', pic: '🍋' }, { en: 'leaf', he: 'עלה', pic: '🍂' }
    ]
  },
  {
    id: 'summer', title: 'Summer fun', he: 'כיף של קיץ', pic: '🏖️', color: '#06b6d4', sticker: '🐚', when: { months: [7, 8] },
    words: [
      { en: 'beach', he: 'חוף', pic: '🏖️' }, { en: 'ice cream', he: 'גלידה', pic: '🍦' }, { en: 'sunglasses', he: 'משקפי שמש', pic: '🕶️' },
      { en: 'shell', he: 'צדף', pic: '🐚' }, { en: 'wave', he: 'גל', pic: '🌊' }, { en: 'sandcastle', he: 'ארמון חול', pic: '🏰' }
    ]
  }
];
KIDS_HOLIDAYS.forEach(th => th.words.forEach(w => { w.id = th.id + '/' + w.en; w.theme = th.id; }));

// Sound-alike pairs: words Hebrew speakers easily mix up when listening (ee/i, th/t, a/u, r/l…)
const KIDS_PAIRS = [
  [['ship', '🚢', 'ספינה'], ['sheep', '🐑', 'כבשה']],
  [['three', '3️⃣', 'שלוש'], ['tree', '🌳', 'עץ']],
  [['cat', '🐱', 'חתול'], ['cut', '✂️', 'לגזור']],
  [['hat', '🧢', 'כובע'], ['hot', '🔥', 'חם']],
  [['pen', '🖊️', 'עט'], ['pan', '🍳', 'מחבת']],
  [['bag', '👜', 'תיק'], ['bug', '🐛', 'חרק']],
  [['rock', '🪨', 'סלע'], ['lock', '🔒', 'מנעול']],
  [['mouse', '🐭', 'עכבר'], ['mouth', '👄', 'פה']],
  [['sink', '🚰', 'כיור'], ['think', '🤔', 'לחשוב']],
  [['van', '🚐', 'טנדר'], ['fan', '🌀', 'מאוורר']]
].map(p => p.map(([en, pic, he]) => ({ en, pic, he })));

// "Try at home": one small idea per island for grown-ups, to use the words in real life (he / en)
const KIDS_TIPS = {
  animals: ['כשרואים חיה בחוץ או בספר, שאלו "What is it?" ותנו לילד לענות באנגלית.', 'When you see an animal outside or in a book, ask "What is it?" and let your child answer in English.'],
  colors: ['משחק "I spy": אמרו "I spy something red" והילד מחפש משהו אדום בחדר.', 'Play "I spy": say "I spy something red" and your child looks for something red in the room.'],
  numbers: ['ספרו יחד באנגלית מדרגות, כפתורים או ענבים בצלחת.', 'Count stairs, buttons or grapes on the plate together in English.'],
  food: ['בארוחה שאלו "Do you want an apple?" ועודדו לענות "Yes, please!"', 'At mealtime ask "Do you want an apple?" and encourage "Yes, please!"'],
  family: ['הראו תמונות משפחתיות ושאלו "Who is it?" — "It\'s mom!"', 'Look at family photos and ask "Who is it?" — "It\'s mom!"'],
  phrases: ['השתמשו כל יום ב-"thank you" ו-"please" באנגלית, גם אתם. ילדים מחקים!', 'Use "thank you" and "please" in English every day, yourselves too. Children copy!'],
  body: ['שירו "Head, shoulders, knees and toes" ונגעו בכל חלק בגוף.', 'Sing "Head, shoulders, knees and toes" and touch each body part.'],
  toys: ['בזמן משחק, בקשו "Give me the ball, please" והילד מגיש.', 'While playing, ask "Give me the ball, please" and let your child hand it over.'],
  go: ['בנסיעה, שחקו "מי רואה ראשון": car, bus, truck, bike!', 'On the road, play "who sees it first": car, bus, truck, bike!'],
  clothes: ['בבוקר, בזמן ההתלבשות, אמרו כל בגד באנגלית: shirt, pants, socks.', 'While getting dressed in the morning, name each item in English: shirt, pants, socks.'],
  sky: ['הסתכלו מהחלון ושאלו "Is it sunny? Is it rainy?"', 'Look out of the window and ask "Is it sunny? Is it rainy?"'],
  feelings: ['לפני השינה שאלו "How do you feel today? Happy? Tired?"', 'At bedtime ask "How do you feel today? Happy? Tired?"'],
  home: ['הדביקו פתקים עם מילים באנגלית על דלת, חלון ומיטה בבית.', 'Stick notes with English words on the door, the window and the bed at home.'],
  actions: ['משחק "Simon says": "Simon says jump! Simon says run!"', 'Play "Simon says": "Simon says jump! Simon says run!"'],
  shapes: ['חפשו צורות בבית: "Find a circle!" (צלחת, שעון, כדור).', 'Hunt for shapes at home: "Find a circle!" (a plate, a clock, a ball).'],
  opposites: ['הדגימו בגוף: big/small עם הידיים, up/down עם קפיצה, fast/slow בהליכה.', 'Act them out: big/small with your arms, up/down with a jump, fast/slow while walking.'],
  school: ['כשמכינים את התיק, אמרו יחד: pencil, ruler, book, backpack.', 'When packing the school bag, say together: pencil, ruler, book, backpack.']
};

// Blend it! (first reading): short words of three letter sounds, each with a picture
const KIDS_CVC = [
  ['cat', '🐱'], ['dog', '🐶'], ['sun', '☀️'], ['bus', '🚌'], ['hat', '🧢'], ['pig', '🐷'],
  ['bed', '🛏️'], ['cup', '🥤'], ['fox', '🦊'], ['hen', '🐔'], ['pen', '🖊️'], ['bug', '🐛'], ['net', '🥅'], ['map', '🗺️']
].map(([en, pic]) => ({ en, pic }));

// A story you choose: each page offers two picture choices that lead to different pages and endings
const KIDS_PATH = {
  title: 'The magic forest', he: 'היער הקסום', pic: '🌲',
  pages: {
    start: { scene: '🌲🦉🌲', en: 'The owl is in the magic forest. Where do we go?', he: 'הינשוף ביער הקסום. לאן הולכים?',
      choices: [{ en: 'the red door', pic: '🚪', to: 'door' }, { en: 'the bridge', pic: '🌉', to: 'bridge' }] },
    door: { scene: '🚪🐱', en: 'We open the red door. There is a little cat!', he: 'פותחים את הדלת האדומה. יש שם חתולה קטנה!',
      choices: [{ en: 'give milk', pic: '🥛', to: 'milk' }, { en: 'play ball', pic: '⚽', to: 'ball' }] },
    bridge: { scene: '🌉🐟', en: 'We walk on the bridge. There is a big fish!', he: 'הולכים על הגשר. יש שם דג גדול!',
      choices: [{ en: 'say hello', pic: '👋', to: 'hello' }, { en: 'swim', pic: '🏊', to: 'swim' }] },
    milk: { scene: '🐱🥛💖', en: 'The cat drinks the milk. She is happy!', he: 'החתולה שותה את החלב. היא שמחה!', end: true },
    ball: { scene: '🐱⚽😄', en: 'The cat plays with the ball. What fun!', he: 'החתולה משחקת בכדור. איזה כיף!', end: true },
    hello: { scene: '👋🐟😊', en: 'Hello, fish! The fish says hello too!', he: 'שלום, דג! הדג אומר שלום גם!', end: true },
    swim: { scene: '🏊🐟💦', en: 'We swim with the fish. The water is cold!', he: 'שוחים עם הדג. המים קרים!', end: true }
  }
};

// Simon says: little body commands the child acts out (TPR - learning by moving)
const KIDS_SIMON = [
  ['Touch your nose!', 'געו באף', '👃'], ['Clap your hands!', 'מחאו כפיים', '👏'], ['Jump!', 'קפצו', '🦘'],
  ['Wave your hand!', 'נופפו ביד', '👋'], ['Touch your ears!', 'געו באוזניים', '👂'], ['Stamp your feet!', 'רקעו ברגליים', '🦶'],
  ['Turn around!', 'הסתובבו', '🔄'], ['Sit down!', 'שבו', '🪑'], ['Stand up!', 'קומו', '🧍'], ['Open your mouth!', 'פתחו את הפה', '👄'],
  ['Touch your head!', 'געו בראש', '🙆'], ['Be a cat! Meow!', 'תהיו חתול! מיאו!', '🐱']
].map(([en, he, pic]) => ({ en, he, pic }));

// Twin words: English words that sound almost the same in Hebrew - a bridge that says "you already know this!"
const KIDS_TWINS = {
  banana: 'בננה', pizza: 'פיצה', balloon: 'בלון', robot: 'רובוט', bus: 'אוטובוס', mom: 'אמא'
};

// Rhyme time: picture pairs whose endings sound the same (early phonological awareness)
const KIDS_RHYMES = [
  [['cat', 'חתול', '🐱'], ['hat', 'כובע', '🎩']], [['dog', 'כלב', '🐶'], ['frog', 'צפרדע', '🐸']],
  [['bee', 'דבורה', '🐝'], ['tree', 'עץ', '🌳']], [['car', 'מכונית', '🚗'], ['star', 'כוכב', '⭐']],
  [['moon', 'ירח', '🌙'], ['spoon', 'כפית', '🥄']], [['cake', 'עוגה', '🎂'], ['snake', 'נחש', '🐍']],
  [['fish', 'דג', '🐟'], ['dish', 'צלחת', '🍽️']], [['bear', 'דוב', '🐻'], ['chair', 'כיסא', '🪑']],
  [['mouse', 'עכבר', '🐭'], ['house', 'בית', '🏠']], [['boat', 'סירה', '⛵'], ['goat', 'עז', '🐐']],
  [['sock', 'גרב', '🧦'], ['clock', 'שעון', '🕰️']], [['king', 'מלך', '🤴'], ['ring', 'טבעת', '💍']],
  [['bed', 'מיטה', '🛏️'], ['sled', 'מזחלת', '🛷']], [['snail', 'חילזון', '🐌'], ['whale', 'לווייתן', '🐋']]
].map(p => p.map(([en, he, pic]) => ({ en, he, pic })));

// Dress for the weather: each weather and the two things the owl needs (slot = where it sits on the owl)
const KIDS_WEAR = [
  { id: 'sunny', en: 'It is sunny!', he: 'שמשי!', sky: '☀️', items: [
    { en: 'sunglasses', he: 'משקפי שמש', pic: '🕶️', slot: 'eyes', verb: 'Put on your' }, { en: 'sun hat', he: 'כובע שמש', pic: '👒', slot: 'head', verb: 'Put on your' }] },
  { id: 'rainy', en: 'It is rainy!', he: 'גשום!', sky: '🌧️', items: [
    { en: 'umbrella', he: 'מטרייה', pic: '☂️', slot: 'up', verb: 'Take your' }, { en: 'boots', he: 'מגפיים', pic: '👢', slot: 'feet', verb: 'Put on your' }] },
  { id: 'cold', en: 'It is cold!', he: 'קר!', sky: '❄️', items: [
    { en: 'scarf', he: 'צעיף', pic: '🧣', slot: 'neck', verb: 'Put on your' }, { en: 'gloves', he: 'כפפות', pic: '🧤', slot: 'hand', verb: 'Put on your' }] }
];

// The owl's question of the day: one tiny question, three picture answers (the first is right)
const KIDS_QOTD = [
  ['What colour is the sun?', 'באיזה צבע השמש?', [['☀️', 'yellow'], ['🌿', 'green'], ['🫐', 'blue']]],
  ['What says "moo"?', 'מי אומרת "מו"?', [['🐮', 'a cow'], ['🐱', 'a cat'], ['🐟', 'a fish']]],
  ['What do you wear on your feet?', 'מה שמים על הרגליים?', [['👟', 'shoes'], ['🎩', 'a hat'], ['🧤', 'gloves']]],
  ['What can fly?', 'מי יכול לעוף?', [['🐦', 'a bird'], ['🐶', 'a dog'], ['🐢', 'a turtle']]],
  ['What is cold?', 'מה קר?', [['🍦', 'ice cream'], ['☕', 'tea'], ['🔥', 'fire']]],
  ['How many legs does a dog have?', 'כמה רגליים יש לכלב?', [['4️⃣', 'four'], ['2️⃣', 'two'], ['6️⃣', 'six']]],
  ['What do you eat?', 'מה אוכלים?', [['🍌', 'a banana'], ['🚗', 'a car'], ['👟', 'a shoe']]],
  ['Where do fish live?', 'איפה גרים דגים?', [['🌊', 'in the sea'], ['🌳', 'in a tree'], ['🛏️', 'in a bed']]],
  ['What do you see at night?', 'מה רואים בלילה?', [['🌙', 'the moon'], ['🌈', 'a rainbow'], ['☀️', 'the sun']]],
  ['What is big?', 'מה גדול?', [['🐘', 'an elephant'], ['🐭', 'a mouse'], ['🐜', 'an ant']]],
  ['What do you read?', 'מה קוראים?', [['📖', 'a book'], ['🍎', 'an apple'], ['⚽', 'a ball']]],
  ['What colour is grass?', 'באיזה צבע הדשא?', [['🟢', 'green'], ['🔴', 'red'], ['🟣', 'purple']]],
  ['Who is a baby cat?', 'מי זה גור של חתול?', [['🐱', 'a kitten'], ['🐶', 'a puppy'], ['🐥', 'a chick']]],
  ['What goes on the road?', 'מה נוסע על הכביש?', [['🚌', 'a bus'], ['⛵', 'a boat'], ['✈️', 'a plane']]],
  ['What do you use to see?', 'במה רואים?', [['👀', 'eyes'], ['👂', 'ears'], ['👃', 'a nose']]],
  ['What is hot?', 'מה חם?', [['🔥', 'fire'], ['❄️', 'snow'], ['🧊', 'ice']]],
  ['What do you wear when it rains?', 'מה לובשים כשיורד גשם?', [['🧥', 'a raincoat'], ['🩱', 'a swimsuit'], ['🕶️', 'sunglasses']]],
  ['What says "woof"?', 'מי אומר "הב"?', [['🐶', 'a dog'], ['🐮', 'a cow'], ['🐸', 'a frog']]],
  ['What grows on a tree?', 'מה גדל על עץ?', [['🍎', 'an apple'], ['🥚', 'an egg'], ['🍞', 'bread']]],
  ['What has wheels?', 'למה יש גלגלים?', [['🚲', 'a bike'], ['🐟', 'a fish'], ['🪑', 'a chair']]],
  ['What do you brush?', 'את מה מצחצחים?', [['🦷', 'teeth'], ['👂', 'ears'], ['🦶', 'feet']]]
].map(([en, he, a]) => ({ en, he, answers: a.map(([pic, word]) => ({ pic, en: word })) }));

// Shape hunt: everyday things and the shape they are
const KIDS_SHAPE_HUNT = {
  circle: { he: 'עיגול', mark: '⚪', things: [['clock', '🕐'], ['ball', '⚽'], ['cookie', '🍪'], ['donut', '🍩'], ['orange', '🍊'], ['button', '🔘']] },
  square: { he: 'ריבוע', mark: '🟧', things: [['present', '🎁'], ['picture', '🖼️'], ['waffle', '🧇'], ['box', '📦'], ['window', '🪟']] },
  triangle: { he: 'משולש', mark: '🔺', things: [['pizza', '🍕'], ['tent', '⛺'], ['tree', '🎄'], ['cheese', '🧀'], ['ruler', '📐']] }
};

// Morning routine: daily-life actions in order
const KIDS_MORNING = [
  ['wake up', 'מתעוררים', '⏰'], ['wash your face', 'שוטפים פנים', '🧼'], ['brush your teeth', 'מצחצחים שיניים', '🦷'],
  ['get dressed', 'מתלבשים', '👕'], ['eat breakfast', 'אוכלים ארוחת בוקר', '🥣'], ['put on your shoes', 'נועלים נעליים', '👟'],
  ['go to school', 'הולכים לגן או לבית הספר', '🎒']
].map(([en, he, pic]) => ({ en, he, pic }));

// How does the bear feel? Little situations, the feeling word, and something kind to do about it
const KIDS_FEEL_STORIES = [
  { scene: '🐻🍦⬇️', en: "Oh no! The bear's ice cream fell down.", he: 'אוי! הגלידה של הדוב נפלה.', feel: 'sad', face: '😢', kind: "Let's give the bear a hug!", kindHe: 'בואו ניתן לדוב חיבוק', kpic: '🤗' },
  { scene: '🐰🎁🎂', en: 'The bunny gets a big present for her birthday.', he: 'הארנבת מקבלת מתנה גדולה ליום ההולדת.', feel: 'happy', face: '😀', kind: 'Happy birthday, bunny!', kindHe: 'יום הולדת שמח, ארנבת!', kpic: '🎉' },
  { scene: '🐶⚡🌩️', en: 'Boom! There is a big storm. The puppy hides.', he: 'בום! יש סערה גדולה. הכלבלב מתחבא.', feel: 'scared', face: '😨', kind: "It's OK, puppy. We are here.", kindHe: 'הכול בסדר, כלבלב. אנחנו פה.', kpic: '💛' },
  { scene: '🐱🧱🏰💥', en: 'The cat built a tower. The dog knocked it down!', he: 'החתולה בנתה מגדל. הכלב הפיל אותו!', feel: 'angry', face: '😠', kind: "Take a deep breath, cat. Let's build again.", kindHe: 'נושמים עמוק, חתולה. בונים שוב.', kpic: '🌬️' },
  { scene: '🐨🏃‍♂️🌙', en: 'The koala played all day. Now it is night.', he: 'הקואלה שיחקה כל היום. עכשיו לילה.', feel: 'tired', face: '😴', kind: 'Good night, koala. Sleep well.', kindHe: 'לילה טוב, קואלה. שינה טובה.', kpic: '🛏️' },
  { scene: '🐸🎈🐘', en: 'The frog opens the door and sees... an elephant!', he: 'הצפרדע פותחת את הדלת ורואה... פיל!', feel: 'surprised', face: '😮', kind: 'Wow! Hello, elephant!', kindHe: 'וואו! שלום, פיל!', kpic: '👋' }
];
