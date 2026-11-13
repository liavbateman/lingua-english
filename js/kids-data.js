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
