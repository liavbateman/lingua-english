// Beginner content (CEFR A1–A2)
// Loaded after data.js and grammar.js: adds units to UNITS and rules to GRAMMAR.
UNITS.push(
  // ---------- Vocabulary ----------
  {
    id: 'b-family', level: 'beginner', title: 'Family', he: 'משפחה', emoji: '👪',
    words: [
      { en: 'mother', he: 'אמא', ex: 'My mother is 60 years old.' },
      { en: 'father', he: 'אבא', ex: 'My father and my mother live in Haifa.' },
      { en: 'brother', he: 'אח', ex: 'I have one brother and two sisters.' },
      { en: 'sister', he: 'אחות', ex: 'My sister and her husband live in London.' },
      { en: 'son', he: 'בן', ex: 'We have a son and a daughter.' },
      { en: 'daughter', he: 'בת', ex: 'Their daughter is a student. She is 20.' },
      { en: 'husband', he: 'בעל', ex: 'Her husband works in a bank.' },
      { en: 'wife', he: 'אישה', ex: 'My wife and I have three children.' },
      { en: 'parents', he: 'הורים', ex: 'My parents live near us.' },
      { en: 'child', he: 'ילד', ex: 'They have one child, a boy.' },
      { en: 'grandmother', he: 'סבתא', ex: 'My grandmother lives in a small village.' },
      { en: 'grandfather', he: 'סבא', ex: 'My grandfather is eighty years old.' },
      { en: 'baby', he: 'תינוק', ex: 'The baby is sleeping in her bed.' },
      { en: 'uncle', he: 'דוד', ex: 'My uncle has a big farm.' },
      { en: 'aunt', he: 'דודה', ex: 'My aunt makes the best cake.' }
    ]
  },
  {
    id: 'b-numbers', level: 'beginner', title: 'Numbers & counting', he: 'מספרים וספירה', emoji: '🔢',
    words: [
      { en: 'one', he: 'אחת', ex: 'There is only one sun in the sky.' },
      { en: 'two', he: 'שתיים', ex: 'A bicycle has two wheels.' },
      { en: 'three', he: 'שלוש', ex: 'Two plus one is three.' },
      { en: 'seven', he: 'שבע', ex: 'The number after six is seven.' },
      { en: 'ten', he: 'עשר', ex: 'I have ten fingers.' },
      { en: 'twelve', he: 'שתים עשרה', ex: 'There are twelve months in a year.' },
      { en: 'twenty', he: 'עשרים', ex: 'Ten plus ten is twenty.' },
      { en: 'hundred', he: 'מאה', ex: 'There are a hundred cents in a dollar.' },
      { en: 'thousand', he: 'אלף', ex: 'A thousand meters is one kilometer.' },
      { en: 'half', he: 'חצי', ex: 'Thirty minutes is half an hour.' },
      { en: 'four', he: 'ארבע', ex: 'There are four chairs in the kitchen.' },
      { en: 'five', he: 'חמש', ex: 'I work five days a week.' },
      { en: 'six', he: 'שש', ex: 'The shop opens at six in the morning.' },
      { en: 'eight', he: 'שמונה', ex: 'My son is eight years old.' },
      { en: 'nine', he: 'תשע', ex: 'The film starts at nine tonight.' }
    ]
  },
  {
    id: 'b-time', level: 'beginner', title: 'Days & time', he: 'ימים וזמן', emoji: '📅',
    words: [
      { en: 'day', he: 'יום', ex: 'There are 24 hours in a day.' },
      { en: 'week', he: 'שבוע', ex: 'There are seven days in a week.' },
      { en: 'month', he: 'חודש', ex: 'January is the first month of the year.' },
      { en: 'year', he: 'שנה', ex: 'We go to Greece every year.' },
      { en: 'hour', he: 'שעה', ex: 'The meeting is one hour long.' },
      { en: 'minute', he: 'דקה', ex: 'Wait a minute, please.' },
      { en: 'night', he: 'לילה', ex: 'I sleep eight hours every night.' },
      { en: 'evening', he: 'ערב', ex: 'I watch TV in the evening after dinner.' },
      { en: 'yesterday', he: 'אתמול', ex: 'Today is Monday, so yesterday was Sunday.' },
      { en: 'weekend', he: 'סוף שבוע', ex: 'I do not work on the weekend.' },
      { en: 'now', he: 'עכשיו', ex: 'I am busy now, call me later.' },
      { en: 'early', he: 'מוקדם', ex: 'I get up early on Monday.' },
      { en: 'late', he: 'מאוחר', ex: 'Sorry, I am late for the meeting.' },
      { en: 'noon', he: 'צהריים', ex: 'We eat lunch at noon.' },
      { en: 'calendar', he: 'לוח שנה', ex: 'Write the date in your calendar.' }
    ]
  },
  {
    id: 'b-colors', level: 'beginner', title: 'Colors', he: 'צבעים', emoji: '🎨',
    words: [
      { en: 'color', he: 'צבע', ex: 'What color is your car?' },
      { en: 'red', he: 'אדום', ex: 'A tomato is red.' },
      { en: 'blue', he: 'כחול', ex: 'The sky is blue today.' },
      { en: 'green', he: 'ירוק', ex: 'The grass in the park is green.' },
      { en: 'yellow', he: 'צהוב', ex: 'A banana is yellow.' },
      { en: 'black', he: 'שחור', ex: 'I drink black coffee without milk.' },
      { en: 'white', he: 'לבן', ex: 'Snow is white.' },
      { en: 'brown', he: 'חום', ex: 'Chocolate is usually brown.' },
      { en: 'orange', he: 'כתום', ex: 'A carrot is orange.' },
      { en: 'pink', he: 'ורוד', ex: 'The little girl has a pink dress.' },
      { en: 'purple', he: 'סגול', ex: 'She has a purple bag.' },
      { en: 'gray', he: 'אפור', ex: 'The sky is gray today.' },
      { en: 'gold', he: 'זהב', ex: 'He wears a gold watch.' },
      { en: 'dark', he: 'כהה', ex: 'I like dark blue shirts.' },
      { en: 'light', he: 'בהיר', ex: 'Her new dress is light green.' }
    ]
  },
  {
    id: 'b-body', level: 'beginner', title: 'Body & health', he: 'גוף ובריאות', emoji: '🩺',
    words: [
      { en: 'head', he: 'ראש', ex: 'I wear a hat on my head.' },
      { en: 'hand', he: 'יד', ex: 'I write with my right hand.' },
      { en: 'eye', he: 'עין', ex: 'Close one eye and look.' },
      { en: 'leg', he: 'רגל', ex: 'He cannot walk because his leg hurts.' },
      { en: 'back', he: 'גב', ex: 'I carry my bag on my back.' },
      { en: 'stomach', he: 'בטן', ex: 'I ate too much and now my stomach hurts.' },
      { en: 'tooth', he: 'שן', ex: 'The dentist looked at my tooth.' },
      { en: 'doctor', he: 'רופא', ex: 'I feel bad. I need to see a doctor.' },
      { en: 'sick', he: 'חולה', ex: 'He is sick, so he is in bed today.' },
      { en: 'medicine', he: 'תרופה', ex: 'Take this medicine twice a day.' },
      { en: 'arm', he: 'זרוע', ex: 'He broke his arm last week.' },
      { en: 'foot', he: 'כף רגל', ex: 'My left foot hurts after the walk.' },
      { en: 'nose', he: 'אף', ex: 'The baby has a small nose.' },
      { en: 'mouth', he: 'פה', ex: 'Please open your mouth and say ah.' },
      { en: 'ear', he: 'אוזן', ex: 'I have a pain in my ear.' }
    ]
  },
  {
    id: 'b-house', level: 'beginner', title: 'House & furniture', he: 'בית ורהיטים', emoji: '🛋️',
    words: [
      { en: 'room', he: 'חדר', ex: 'My son is in his room.' },
      { en: 'kitchen', he: 'מטבח', ex: 'She is cooking dinner in the kitchen.' },
      { en: 'bathroom', he: 'חדר אמבטיה', ex: 'The shower is in the bathroom.' },
      { en: 'bed', he: 'מיטה', ex: 'I go to bed at eleven.' },
      { en: 'chair', he: 'כיסא', ex: 'Please sit on this chair.' },
      { en: 'door', he: 'דלת', ex: 'Please knock on the door before you come in.' },
      { en: 'window', he: 'חלון', ex: 'I can see the street from my window.' },
      { en: 'key', he: 'מפתח', ex: 'I cannot open the door without my key.' },
      { en: 'floor', he: 'רצפה', ex: 'The baby is playing on the floor.' },
      { en: 'fridge', he: 'מקרר', ex: 'Put the milk in the fridge.' },
      { en: 'sofa', he: 'ספה', ex: 'The cat is sleeping on the sofa.' },
      { en: 'lamp', he: 'מנורה', ex: 'Please turn on the lamp.' },
      { en: 'wall', he: 'קיר', ex: 'There is a clock on the wall.' },
      { en: 'garden', he: 'גינה', ex: 'We have a small garden behind the house.' },
      { en: 'living room', he: 'סלון', ex: 'We watch TV in the living room.' }
    ]
  },
  {
    id: 'b-clothes', level: 'beginner', title: 'Clothes', he: 'בגדים', emoji: '👕',
    words: [
      { en: 'shirt', he: 'חולצה', ex: 'He has a white shirt and a tie for work.' },
      { en: 'pants', he: 'מכנסיים', ex: 'These pants are too long for me.' },
      { en: 'shoes', he: 'נעליים', ex: 'Take off your shoes at the door.' },
      { en: 'dress', he: 'שמלה', ex: 'She bought a long dress for the wedding.' },
      { en: 'jacket', he: "ז'קט", ex: 'It is cool outside, so take a jacket.' },
      { en: 'hat', he: 'כובע', ex: 'Put a hat on your head in the sun.' },
      { en: 'socks', he: 'גרביים', ex: 'I put on my socks and then my shoes.' },
      { en: 'coat', he: 'מעיל', ex: 'In winter I need a long, warm coat.' },
      { en: 'bag', he: 'תיק', ex: 'My laptop is in my bag.' },
      { en: 'wear', he: 'ללבוש', ex: 'What do you wear to work?' },
      { en: 'skirt', he: 'חצאית', ex: 'She is wearing a long black skirt.' },
      { en: 'sweater', he: 'סוודר', ex: 'Take a warm sweater, it is cold.' },
      { en: 'belt', he: 'חגורה', ex: 'These pants need a belt.' },
      { en: 'scarf', he: 'צעיף', ex: 'I wear a scarf in the winter.' },
      { en: 'gloves', he: 'כפפות', ex: 'I need warm gloves for the snow.' }
    ]
  },
  {
    id: 'b-verbs-1', level: 'beginner', title: 'Common verbs 1', he: 'פעלים נפוצים 1', emoji: '🏃',
    words: [
      { en: 'go', he: 'ללכת', ex: 'I go to work by bus.' },
      { en: 'come', he: 'לבוא', ex: 'Can you come to my house tonight?' },
      { en: 'eat', he: 'לאכול', ex: 'We eat dinner at seven.' },
      { en: 'drink', he: 'לשתות', ex: 'I drink a lot of water.' },
      { en: 'sleep', he: 'לישון', ex: 'I sleep eight hours a night.' },
      { en: 'want', he: 'לרצות', ex: 'I want a cup of coffee.' },
      { en: 'need', he: 'להצטרך', ex: 'I need a pen. Do you have one?' },
      { en: 'see', he: 'לראות', ex: 'I cannot see without my glasses.' },
      { en: 'know', he: 'לדעת', ex: 'I do not know the answer.' },
      { en: 'give', he: 'לתת', ex: 'Can you give me your phone number?' },
      { en: 'take', he: 'לקחת', ex: 'Please take an umbrella with you.' },
      { en: 'put', he: 'לשים', ex: 'Put the milk in the fridge, please.' },
      { en: 'sit', he: 'לשבת', ex: 'Can I sit next to you?' },
      { en: 'find', he: 'למצוא', ex: 'I cannot find my keys.' },
      { en: 'like', he: 'לאהוב', ex: 'I like pizza and ice cream.' }
    ]
  },
  {
    id: 'b-verbs-2', level: 'beginner', title: 'Common verbs 2', he: 'פעלים נפוצים 2', emoji: '✍️',
    words: [
      { en: 'read', he: 'לקרוא', ex: 'I read a book before I sleep.' },
      { en: 'write', he: 'לכתוב', ex: 'Please write your name here.' },
      { en: 'speak', he: 'לדבר', ex: 'Do you speak English?' },
      { en: 'listen', he: 'להקשיב', ex: 'I listen to music in the car.' },
      { en: 'buy', he: 'לקנות', ex: 'I buy milk at the supermarket.' },
      { en: 'open', he: 'לפתוח', ex: 'Can you open the door for me?' },
      { en: 'close', he: 'לסגור', ex: 'Please close the window. It is cold.' },
      { en: 'help', he: 'לעזור', ex: 'This bag is heavy. Can you help me?' },
      { en: 'wait', he: 'לחכות', ex: 'Please wait here for five minutes.' },
      { en: 'learn', he: 'ללמוד', ex: 'I want to learn English.' },
      { en: 'cook', he: 'לבשל', ex: 'My father likes to cook on Fridays.' },
      { en: 'call', he: 'להתקשר', ex: 'I will call you after work.' },
      { en: 'ask', he: 'לשאול', ex: 'Can I ask you a question?' },
      { en: 'answer', he: 'לענות', ex: 'Please answer the phone, it is ringing.' },
      { en: 'pay', he: 'לשלם', ex: 'Can I pay with cash here?' }
    ]
  },
  {
    id: 'b-adjectives', level: 'beginner', title: 'Common adjectives', he: 'שמות תואר נפוצים', emoji: '📏',
    words: [
      { en: 'big', he: 'גדול', ex: 'An elephant is a very big animal.' },
      { en: 'small', he: 'קטן', ex: 'A mouse is a very small animal.' },
      { en: 'good', he: 'טוב', ex: 'This is a very good book. Read it!' },
      { en: 'bad', he: 'רע', ex: 'The weather is bad today, so we are staying home.' },
      { en: 'new', he: 'חדש', ex: 'My phone is old. I want a new one.' },
      { en: 'old', he: 'ישן', ex: 'This house is 100 years old.' },
      { en: 'hot', he: 'חם', ex: 'Be careful, the tea is very hot.' },
      { en: 'cold', he: 'קר', ex: 'Put on a coat. It is cold outside.' },
      { en: 'easy', he: 'קל', ex: 'The test was easy. I finished in ten minutes.' },
      { en: 'expensive', he: 'יקר', ex: 'This car is too expensive for me.' },
      { en: 'cheap', he: 'זול', ex: 'This shirt is cheap and nice.' },
      { en: 'long', he: 'ארוך', ex: 'It was a long day at work.' },
      { en: 'short', he: 'קצר', ex: 'My sister has short hair.' },
      { en: 'beautiful', he: 'יפה', ex: 'What a beautiful view from the window!' },
      { en: 'young', he: 'צעיר', ex: 'My teacher is young and friendly.' }
    ]
  },
  {
    id: 'b-feelings', level: 'beginner', title: 'Feelings', he: 'רגשות', emoji: '😊',
    words: [
      { en: 'happy', he: 'שמח', ex: 'I am happy to see you.' },
      { en: 'sad', he: 'עצוב', ex: 'She is sad because her friend moved away.' },
      { en: 'tired', he: 'עייף', ex: 'I am tired. I want to sleep.' },
      { en: 'angry', he: 'כועס', ex: 'He is angry because I am late again.' },
      { en: 'afraid', he: 'מפחד', ex: 'My son is afraid of dogs.' },
      { en: 'excited', he: 'נרגש', ex: 'The children are excited about the trip.' },
      { en: 'worried', he: 'מודאג', ex: 'I am worried about my exam tomorrow.' },
      { en: 'bored', he: 'משועמם', ex: 'I am bored. There is nothing to do.' },
      { en: 'surprised', he: 'מופתע', ex: 'I was surprised to see him there.' },
      { en: 'calm', he: 'רגוע', ex: 'Stay calm. Everything is fine.' },
      { en: 'lonely', he: 'בודד', ex: 'He feels lonely in the new city.' },
      { en: 'proud', he: 'גאה', ex: 'I am very proud of my son.' },
      { en: 'nervous', he: 'לחוץ', ex: 'I am nervous before every test.' },
      { en: 'shy', he: 'ביישן', ex: 'My little brother is very shy.' },
      { en: 'confused', he: 'מבולבל', ex: 'I am confused, can you explain again?' }
    ]
  },
  {
    id: 'b-city', level: 'beginner', title: 'City & places', he: 'עיר ומקומות', emoji: '🏙️',
    words: [
      { en: 'city', he: 'עיר', ex: 'Tel Aviv is a big city.' },
      { en: 'shop', he: 'חנות', ex: 'The shop closes at eight.' },
      { en: 'school', he: 'בית ספר', ex: 'The children go to school every morning.' },
      { en: 'hospital', he: 'בית חולים', ex: 'He is very sick and he is in the hospital.' },
      { en: 'bank', he: 'בנק', ex: 'I need to get money from the bank.' },
      { en: 'park', he: 'פארק', ex: 'We walk the dog in the park.' },
      { en: 'restaurant', he: 'מסעדה', ex: 'We ate dinner at an Italian restaurant.' },
      { en: 'supermarket', he: 'סופרמרקט', ex: 'I buy food at the supermarket.' },
      { en: 'station', he: 'תחנה', ex: 'The train leaves the station at six.' },
      { en: 'library', he: 'ספרייה', ex: 'You can read books at the library.' },
      { en: 'post office', he: 'דואר', ex: 'The post office closes at five.' },
      { en: 'pharmacy', he: 'בית מרקחת', ex: 'Is there a pharmacy near here?' },
      { en: 'museum', he: 'מוזיאון', ex: 'We visited the art museum on Sunday.' },
      { en: 'cinema', he: 'קולנוע', ex: 'Let\'s go to the cinema tonight.' },
      { en: 'bakery', he: 'מאפייה', ex: 'I buy fresh bread at the bakery.' }
    ]
  },
  {
    id: 'b-weather', level: 'beginner', title: 'Weather & seasons', he: 'מזג אוויר ועונות', emoji: '🌦️',
    words: [
      { en: 'weather', he: 'מזג אוויר', ex: 'What is the weather like today?' },
      { en: 'sun', he: 'שמש', ex: 'The sun is hot in August.' },
      { en: 'rain', he: 'גשם', ex: 'The rain stopped, so we went out.' },
      { en: 'wind', he: 'רוח', ex: 'A strong wind is blowing from the sea.' },
      { en: 'snow', he: 'שלג', ex: 'The children are playing in the white snow.' },
      { en: 'cloud', he: 'ענן', ex: 'There is not one cloud in the sky.' },
      { en: 'warm', he: 'חמים', ex: 'It is warm today. You do not need a coat.' },
      { en: 'summer', he: 'קיץ', ex: 'In summer we go to the beach.' },
      { en: 'winter', he: 'חורף', ex: 'It is cold and rainy in winter.' },
      { en: 'umbrella', he: 'מטרייה', ex: 'It is raining. Take an umbrella.' },
      { en: 'spring', he: 'אביב', ex: 'The flowers open in the spring.' },
      { en: 'autumn', he: 'סתיו', ex: 'The leaves fall in autumn.' },
      { en: 'sunny', he: 'שמשי', ex: 'It is a sunny day today.' },
      { en: 'rainy', he: 'גשום', ex: 'On rainy days I stay at home.' },
      { en: 'storm', he: 'סערה', ex: 'There was a big storm last night.' }
    ]
  },
  {
    id: 'b-transport', level: 'beginner', title: 'Transport', he: 'תחבורה', emoji: '🚌',
    words: [
      { en: 'car', he: 'מכונית', ex: 'I park my car next to the house.' },
      { en: 'bus', he: 'אוטובוס', ex: 'The number 5 bus goes to the city center.' },
      { en: 'train', he: 'רכבת', ex: 'The train to Haifa leaves from platform two.' },
      { en: 'taxi', he: 'מונית', ex: 'We took a taxi from the airport to the hotel.' },
      { en: 'bicycle', he: 'אופניים', ex: 'He rides his bicycle to school.' },
      { en: 'plane', he: 'מטוס', ex: 'The plane lands in London at noon.' },
      { en: 'drive', he: 'לנהוג', ex: 'I cannot drive. I do not have a license.' },
      { en: 'road', he: 'כביש', ex: 'There are many cars on the road.' },
      { en: 'traffic', he: 'תנועה', ex: 'There is a lot of traffic in the morning.' },
      { en: 'walk', he: 'ללכת ברגל', ex: 'I walk to work. It takes ten minutes.' },
      { en: 'boat', he: 'סירה', ex: 'We took a boat to the island.' },
      { en: 'motorcycle', he: 'אופנוע', ex: 'My brother rides a motorcycle to work.' },
      { en: 'driver', he: 'נהג', ex: 'The bus driver is very kind.' },
      { en: 'bus stop', he: 'תחנת אוטובוס', ex: 'I wait at the bus stop every morning.' },
      { en: 'subway', he: 'רכבת תחתית', ex: 'The subway is the fastest way downtown.' }
    ]
  },

  // ---------- Phrases ----------
  {
    id: 'b-phr-intro', level: 'beginner', kind: 'phrases', title: 'Introducing yourself', he: 'להציג את עצמך', emoji: '🙋',
    words: [
      { en: 'My name is Yossi.', he: 'קוראים לי יוסי.' },
      { en: 'I am from Israel.', he: 'אני מישראל.' },
      { en: 'I live in Tel Aviv.', he: 'אני גר בתל אביב.' },
      { en: 'I am thirty-five years old.', he: 'אני בן שלושים וחמש.' },
      { en: 'I am married and I have two children.', he: 'אני נשוי ויש לי שני ילדים.' },
      { en: 'I work in an office.', he: 'אני עובד במשרד.' },
      { en: 'Where are you from?', he: 'מאיפה אתה?' },
      { en: 'What do you do?', he: 'במה אתה עוסק?' },
      { en: 'I am learning English.', he: 'אני לומד אנגלית.' },
      { en: 'I speak a little English.', he: 'אני מדבר קצת אנגלית.' }
    ]
  },
  {
    id: 'b-phr-shop', level: 'beginner', kind: 'phrases', title: 'At the shop', he: 'בחנות', emoji: '🛒',
    words: [
      { en: 'How much does this cost?', he: 'כמה זה עולה?' },
      { en: 'I am just looking, thank you.', he: 'אני רק מסתכל, תודה.' },
      { en: 'Do you have this in a bigger size?', he: 'יש לכם את זה במידה גדולה יותר?' },
      { en: 'Can I try this on?', he: 'אפשר למדוד את זה?' },
      { en: 'It is too expensive for me.', he: 'זה יקר מדי בשבילי.' },
      { en: 'I will take it.', he: 'אני אקח את זה.' },
      { en: 'Can I pay by card?', he: 'אפשר לשלם בכרטיס?' },
      { en: 'Where can I find milk?', he: 'איפה אפשר למצוא חלב?' },
      { en: 'Can I have a bag, please?', he: 'אפשר לקבל שקית, בבקשה?' },
      { en: 'Can I have the receipt, please?', he: 'אפשר לקבל את הקבלה, בבקשה?' }
    ]
  },
  {
    id: 'b-phr-restaurant', level: 'beginner', kind: 'phrases', title: 'At the restaurant', he: 'במסעדה', emoji: '🍝',
    words: [
      { en: 'Do you have a table for four?', he: 'יש לכם שולחן לארבעה?' },
      { en: 'We are ready to order.', he: 'אנחנו מוכנים להזמין.' },
      { en: 'What do you recommend?', he: 'על מה אתה ממליץ?' },
      { en: 'I would like the soup, please.', he: 'אני רוצה את המרק, בבקשה.' },
      { en: 'I do not eat meat.', he: 'אני לא אוכל בשר.' },
      { en: 'Is this dish spicy?', he: 'המנה הזאת חריפה?' },
      { en: 'Can I have some more water?', he: 'אפשר לקבל עוד מים?' },
      { en: 'A coffee with milk, please.', he: 'קפה עם חלב, בבקשה.' },
      { en: 'The food was very good.', he: 'האוכל היה טוב מאוד.' },
      { en: 'Can we pay, please?', he: 'אפשר לשלם, בבקשה?' }
    ]
  },
  {
    id: 'b-phr-directions', level: 'beginner', kind: 'phrases', title: 'Directions & help', he: 'הכוונה ועזרה', emoji: '🧭',
    words: [
      { en: 'Excuse me, where is the train station?', he: 'סליחה, איפה תחנת הרכבת?' },
      { en: 'How do I get to the city center?', he: 'איך אני מגיע למרכז העיר?' },
      { en: 'Is it far from here?', he: 'זה רחוק מכאן?' },
      { en: 'Go straight and then turn left.', he: 'לך ישר ואז פנה שמאלה.' },
      { en: 'It is next to the bank.', he: 'זה ליד הבנק.' },
      { en: 'Which bus goes to the airport?', he: 'איזה אוטובוס נוסע לשדה התעופה?' },
      { en: 'I am lost. Can you help me?', he: 'הלכתי לאיבוד. אתה יכול לעזור לי?' },
      { en: 'Can you show me on the map?', he: 'אתה יכול להראות לי במפה?' },
      { en: 'I do not understand.', he: 'אני לא מבין.' },
      { en: 'Can you speak more slowly, please?', he: 'אתה יכול לדבר לאט יותר, בבקשה?' }
    ]
  },

  // ---------- Added in round 31 ----------
  {
    id: 'b-animals', level: 'beginner', title: 'Animals', he: 'בעלי חיים', emoji: '🐾',
    words: [
      { en: 'dog', he: 'כלב', ex: 'The dog is sleeping on the sofa.' },
      { en: 'cat', he: 'חתול', ex: 'My cat likes to sit by the window.' },
      { en: 'bird', he: 'ציפור', ex: 'A small bird is singing in the tree.' },
      { en: 'fish', he: 'דג', ex: 'There is a red fish in the water.' },
      { en: 'horse', he: 'סוס', ex: 'She can ride a horse.' },
      { en: 'cow', he: 'פרה', ex: 'The cow is eating grass.' },
      { en: 'lion', he: 'אריה', ex: 'The lion is sleeping in the sun.' },
      { en: 'monkey', he: 'קוף', ex: 'The monkey is eating a banana.' },
      { en: 'sheep', he: 'כבשה', ex: 'The farmer has fifty sheep.' },
      { en: 'goat', he: 'עז', ex: 'The goat eats grass all day.' },
      { en: 'mouse', he: 'עכבר', ex: 'A little mouse lives under the floor.' },
      { en: 'elephant', he: 'פיל', ex: 'The elephant has very big ears.' },
      { en: 'rabbit', he: 'ארנב', ex: 'My daughter has a white rabbit.' },
      { en: 'duck', he: 'ברווז', ex: 'There is a duck in the lake.' },
      { en: 'bear', he: 'דוב', ex: 'We saw a brown bear at the zoo.' }
    ]
  },
  {
    id: 'b-phr-hotel', level: 'beginner', kind: 'phrases', title: 'At the hotel', he: 'במלון', emoji: '🏨',
    words: [
      { en: 'I have a reservation under the name Cohen.', he: 'יש לי הזמנה על השם כהן.' },
      { en: 'What time is check-out?', he: 'באיזו שעה צריך לפנות את החדר?' },
      { en: 'Is breakfast included?', he: 'ארוחת הבוקר כלולה?' },
      { en: 'Could I have another towel, please?', he: 'אפשר לקבל עוד מגבת, בבקשה?' },
      { en: "The air conditioner in my room doesn't work.", he: 'המזגן בחדר שלי לא עובד.' },
      { en: 'What is the password for the internet?', he: 'מה הסיסמה לאינטרנט?' },
      { en: 'Can I leave my bags here until the evening?', he: 'אפשר להשאיר כאן את התיקים עד הערב?' },
      { en: 'Could you call a taxi for me, please?', he: 'אפשר להזמין לי מונית, בבקשה?' },
      { en: 'I would like a room with a sea view.', he: 'אני רוצה חדר עם נוף לים.' },
      { en: 'Thank you, we really enjoyed our stay.', he: 'תודה, נהנינו מאוד מהשהות.' }
    ]
  },
  {
    id: 'b-phr-smalltalk', level: 'beginner', kind: 'phrases', title: 'Small talk', he: 'שיחת חולין', emoji: '💬',
    words: [
      { en: "Nice weather today, isn't it?", he: 'מזג אוויר נעים היום, נכון?' },
      { en: 'Where did you come from?', he: 'מאיפה באת?' },
      { en: 'I come from Israel.', he: 'אני מישראל.' },
      { en: 'What do you do for work?', he: 'במה העבודה שלך?' },
      { en: 'How long have you lived here?', he: 'כמה זמן גרת כאן?' },
      { en: 'Do you have any plans for the weekend?', he: 'יש לך תוכניות לסוף השבוע?' },
      { en: 'This city is beautiful.', he: 'העיר הזאת יפהפייה.' },
      { en: 'It was nice talking to you.', he: 'היה נעים לדבר איתך.' },
      { en: 'See you around!', he: 'נתראה!' },
      { en: 'Have a great weekend!', he: 'סוף שבוע נעים!' }
    ]
  },

  // ---------- Added in round 41 ----------
  {
    id: 'b-phr-sick', level: 'beginner', kind: 'phrases', title: 'Feeling sick', he: 'כשלא מרגישים טוב', emoji: '🤒',
    words: [
      { en: "I don't feel well.", he: 'לא טוב לי.' },
      { en: 'I have a headache.', he: 'יש לי כאב ראש.' },
      { en: 'My stomach hurts.', he: 'כואבת לי הבטן.' },
      { en: 'I have a fever.', he: 'יש לי חום.' },
      { en: 'I need to see a doctor.', he: 'צריך ללכת לרופא.' },
      { en: 'Where is the nearest pharmacy?', he: 'איפה בית המרקחת הקרוב?' },
      { en: 'Do you have something for a cold?', he: 'יש לכם משהו נגד הצטננות?' },
      { en: "I'm allergic to nuts.", he: 'יש לי אלרגיה לאגוזים.' },
      { en: 'Can I have some water, please?', he: 'אפשר לקבל קצת מים, בבקשה?' },
      { en: 'I feel better today, thank you.', he: 'היום יותר טוב לי, תודה.' }
    ]
  },
  {
    id: 'b-phr-phone', level: 'beginner', kind: 'phrases', title: 'Texting & calling', he: 'הודעות ושיחות', emoji: '📱',
    words: [
      { en: 'Can I call you later?', he: 'אפשר להתקשר אליך אחר כך?' },
      { en: 'Sorry, I missed your call.', he: 'סליחה, פספסתי את השיחה שלך.' },
      { en: 'Can you text me when you get home?', he: 'אפשר לשלוח לי הודעה כשמגיעים הביתה?' },
      { en: "What's your phone number?", he: 'מה מספר הטלפון שלך?' },
      { en: 'My battery is almost dead.', he: 'הסוללה שלי כמעט נגמרה.' },
      { en: "I can't hear you very well.", he: 'לא שומעים אותך טוב.' },
      { en: "I'll call you back in five minutes.", he: 'אחזור אליך בעוד חמש דקות.' },
      { en: 'Who is speaking, please?', he: 'מי מדבר, בבקשה?' },
      { en: 'Did you get my message?', he: 'קיבלת את ההודעה שלי?' },
      { en: 'Talk to you soon, bye!', he: 'נדבר בקרוב, ביי!' }
    ]
  },
  {
    id: 'b-phr-home', level: 'beginner', kind: 'phrases', title: 'At home', he: 'בבית', emoji: '🛋️',
    words: [
      { en: 'Dinner is ready!', he: 'ארוחת הערב מוכנה!' },
      { en: 'Can you open the window, please?', he: 'אפשר לפתוח את החלון, בבקשה?' },
      { en: 'Where are my keys?', he: 'איפה המפתחות שלי?' },
      { en: "It's cold in here.", he: 'קר פה.' },
      { en: 'Can you turn off the light, please?', he: 'אפשר לכבות את האור, בבקשה?' },
      { en: "We're going to bed.", he: 'אנחנו הולכים לישון.' },
      { en: 'Good night, sleep well!', he: 'לילה טוב, שינה נעימה!' },
      { en: 'Is there anything to eat?', he: 'יש משהו לאכול?' },
      { en: 'Who wants coffee?', he: 'מי רוצה קפה?' },
      { en: "Let's watch a movie tonight.", he: 'בואו נראה סרט הערב.' }
    ]
  },

  // ---------- Added in round 52 ----------
  {
    id: 'b-phr-class', level: 'beginner', kind: 'phrases', title: 'In class: asking for help', he: 'בשיעור: לבקש עזרה', emoji: '🎒',
    words: [
      { en: 'How do you say this in English?', he: 'איך אומרים את זה באנגלית?' },
      { en: 'What does this word mean?', he: 'מה המילה הזאת אומרת?' },
      { en: 'How do you spell it?', he: 'איך מאייתים את זה?' },
      { en: 'Could you repeat that, please?', he: 'אפשר לחזור על זה, בבקשה?' },
      { en: "Sorry, I don't understand.", he: 'סליחה, לא הבנתי.' },
      { en: 'Can I ask a question?', he: 'אפשר לשאול שאלה?' },
      { en: 'Is this correct?', he: 'זה נכון?' },
      { en: 'What page are we on?', he: 'באיזה עמוד אנחנו?' },
      { en: 'Can you write it on the board?', he: 'אפשר לכתוב את זה על הלוח?' },
      { en: 'I have finished the exercise.', he: 'סיימתי את התרגיל.' },
      { en: 'What is the homework for tomorrow?', he: 'מה שיעורי הבית למחר?' },
      { en: 'See you next lesson!', he: 'נתראה בשיעור הבא!' }
    ]
  },
  {
    id: 'b-phr-bus', level: 'beginner', kind: 'phrases', title: 'Bus, train & taxi', he: 'אוטובוס, רכבת ומונית', emoji: '🚌',
    words: [
      { en: 'Where is the bus stop?', he: 'איפה תחנת האוטובוס?' },
      { en: 'Does this bus go to the city centre?', he: 'האוטובוס הזה נוסע למרכז העיר?' },
      { en: 'One ticket to London, please.', he: 'כרטיס אחד ללונדון, בבקשה.' },
      { en: 'A return ticket, please.', he: 'כרטיס הלוך ושוב, בבקשה.' },
      { en: 'What time is the next train?', he: 'מתי הרכבת הבאה?' },
      { en: 'Which platform is it?', he: 'מאיזה רציף?' },
      { en: 'How many stops is it?', he: 'כמה תחנות זה?' },
      { en: 'Please tell me when to get off.', he: 'תגידו לי בבקשה מתי לרדת.' },
      { en: 'Is this seat free?', he: 'המקום הזה פנוי?' },
      { en: 'To this address, please.', he: 'לכתובת הזאת, בבקשה.' },
      { en: 'How much is it to the airport?', he: 'כמה עולה עד שדה התעופה?' },
      { en: 'You can stop here, thank you.', he: 'אפשר לעצור כאן, תודה.' }
    ]
  }
);

GRAMMAR.push(
  {
    id: 'b-this-that', level: 'beginner', title: 'This, that, these, those', he: 'מילות הצבעה: this / that / these / those',
    when: 'this ו-these מצביעים על מה שקרוב אליך, that ו-those על מה שרחוק ממך. this ו-that ליחיד, these ו-those לרבים. בעברית אומרים בדרך כלל "זה" גם לקרוב וגם לרחוק, ובאנגלית חייבים לבחור.',
    forms: [
      ['near, one', 'this: this book · This is my car.'],
      ['near, many', 'these: these books · These are my keys.'],
      ['far, one', 'that: that house · That is my office.'],
      ['far, many', 'those: those houses · Those are my children.']
    ],
    ex: [['This is my wife, Dana.', 'זאת אשתי, דנה.'], ['Those shoes are expensive.', 'הנעליים ההן יקרות.'], ['Who is that man?', 'מי האיש ההוא?']],
    tip: 'טעות נפוצה: להשתמש ב-this גם לרבים. לא "this shoes" אלא "these shoes". ואחרי these / those הפועל ברבים: "These are my keys", לא "These is my keys".',
    quiz: [['How much are ___ apples here?', 'these', ['this', 'that', 'it']], ['Look at ___ birds in the sky!', 'those', ['that', 'this', 'it']], ['___ is my brother, David.', 'This', ['These', 'Those', 'They']]]
  },
  {
    id: 'b-have', level: 'beginner', title: 'Have / have got', he: 'יש לי: have / have got',
    when: 'כדי לומר שיש למישהו משהו: חפץ, קרוב משפחה, זמן או בעיה. בעברית אומרים "יש לי", ובאנגלית האדם הוא הנושא של המשפט: I have. הצורה have got נפוצה באנגלית בריטית, והמשמעות זהה.',
    forms: [
      ['+', 'I / You / We / They have · He / She / It has'],
      ['–', "I don't have · She doesn't have"],
      ['?', 'Do you have…? · Does he have…?'],
      ['have got', "I have got (I've got) · She has got (She's got) · I haven't got · Have you got…?"]
    ],
    ex: [['I have two children.', 'יש לי שני ילדים.'], ['She has a new car.', 'יש לה מכונית חדשה.'], ["We don't have time.", 'אין לנו זמן.']],
    tip: 'טעות נפוצה: לתרגם "יש לי" מילה במילה. לא "There is to me a car" אלא "I have a car". ובגוף שלישי יחיד אומרים has: "He has a dog", לא "He have a dog".',
    quiz: [['My sister ___ three children.', 'has', ['have', 'is', 'having']], ['___ you have a pen?', 'Do', ['Does', 'Are', 'Have']], ["He doesn't ___ a car.", 'have', ['has', 'got', 'having']]]
  },
  {
    id: 'b-imperatives', level: 'beginner', title: 'Imperatives', he: 'ציווי: הוראות ובקשות',
    when: 'כדי לתת הוראה, לבקש משהו, להזהיר או להסביר דרך. משתמשים בצורת הבסיס של הפועל, בלי נושא. הצורה זהה ליחיד ולרבים, לזכר ולנקבה. עם please זה נשמע מנומס יותר.',
    forms: [
      ['+', 'verb: Open the door. · Sit down, please.'],
      ['–', "Don't + verb: Don't worry. · Don't touch that."],
      ['be', "Be careful. · Don't be late."],
      ["let's", "Let's + verb: Let's go. · Let's not wait."]
    ],
    ex: [['Turn right at the bank.', 'פנה ימינה בבנק.'], ["Don't forget your keys.", 'אל תשכח את המפתחות שלך.'], ["Let's eat something.", 'בוא נאכל משהו.']],
    tip: `טעות נפוצה: להוסיף to לפני הפועל, או לשלול עם no או not. לא "To open the door" ולא "Not touch" אלא "Open the door" ו-"Don't touch".`,
    quiz: [['___ the window, please. It is cold.', 'Close', ['Closes', 'Closing', 'To close']], ['___ be late for the meeting!', "Don't", ['No', 'Not', "Doesn't"]], ["Let's ___ to the beach.", 'go', ['going', 'goes', 'to go']]]
  },
  {
    id: 'b-frequency', level: 'beginner', title: 'Adverbs of frequency', he: 'תדירות: always / usually / never',
    when: 'כדי לומר כל כמה זמן משהו קורה: תמיד, בדרך כלל, לפעמים, אף פעם. משתמשים בהן בעיקר עם Present Simple, ויש להן מקום קבוע במשפט.',
    forms: [
      ['100% → 0%', 'always · usually · often · sometimes · rarely · never'],
      ['verb', 'before the verb: I always drink coffee. · She never eats meat.'],
      ['to be', 'after am / is / are: He is always late. · They are usually at home.'],
      ['?', 'Do you often cook? · How often do you travel?']
    ],
    ex: [['I usually get up at seven.', 'אני בדרך כלל קם בשבע.'], ['She is never late.', 'היא אף פעם לא מאחרת.'], ['We sometimes eat out on Friday.', 'אנחנו לפעמים אוכלים בחוץ ביום שישי.']],
    tip: `בעברית אומרים "אף פעם לא", אבל באנגלית never כבר שלילי ולא מוסיפים לו שלילה: "I never smoke", לא "I don't never smoke". ושים לב למקום במשפט: "I always drink coffee", לא "I drink always coffee".`,
    quiz: [['I ___ coffee in the morning.', 'always drink', ['drink always', 'always drinks', 'am always drink']], ['She ___ late. She comes on time every day.', 'is never', ["never doesn't", "doesn't never", 'never be']], ['How ___ do you go to the gym?', 'often', ['always', 'usually', 'never']]]
  },
  {
    id: 'b-possessive-s', level: 'beginner', title: "Possessive 's", he: "שייכות: 's במקום \"של\"",
    when: `כדי לומר שמשהו שייך למישהו, מוסיפים 's לשם של האדם. הסדר הפוך מעברית: קודם בעל הדבר ואחר כך הדבר. "המכונית של דני" היא Dani's car.`,
    forms: [
      ['one', "name / noun + 's: Dani's car · my mother's house"],
      ['plural + s', "only an apostrophe: my parents' house · the teachers' room"],
      ['irregular', "children's books · men's shoes"],
      ['things', 'usually "of": the end of the street · the name of the hotel'],
      ['?', "Whose phone is this? It is Maya's."]
    ],
    ex: [["This is my brother's car.", 'זאת המכונית של אח שלי.'], ["Dana's office is on the second floor.", 'המשרד של דנה בקומה השנייה.'], ["My parents' house is in Haifa.", 'הבית של ההורים שלי בחיפה.']],
    tip: `טעות נפוצה: לשמור על סדר המילים של העברית. לא "the car Dani" אלא "Dani's car" (גם "the car of Dani" נשמע לא טבעי). ואל תתבלבל עם הקיצור של is: במשפט "Dani's tired" ה-'s הוא is.`,
    quiz: [['This is ___ phone.', "David's", ['David', "Davids'", 'of David']], ['The ___ toys are on the floor.', "children's", ["childrens'", 'childrens', 'children']], ["___ bag is this? It is Maya's.", 'Whose', ['Who', "Who's", 'Which is']]]
  },
  {
    id: 'b-was-were', level: 'beginner', title: 'Was / were', he: 'העבר של to be: was / were',
    when: 'was ו-were הם צורות העבר של am / is / are. משתמשים בהם כדי לומר איפה מישהו היה, איך הרגיש או מה היה המצב בעבר. בעברית "היה" משתנה לפי גוף ומין, ובאנגלית יש רק שתי צורות.',
    forms: [
      ['+', 'I / He / She / It was · You / We / They were'],
      ['–', "I was not (wasn't) · They were not (weren't)"],
      ['?', 'Was he…? · Were you…? · Where were you?'],
      ['there', 'There was a problem. · There were many people.']
    ],
    ex: [['I was at home yesterday.', 'הייתי בבית אתמול.'], ['The children were tired.', 'הילדים היו עייפים.'], ["She wasn't at work last week.", 'היא לא הייתה בעבודה בשבוע שעבר.']],
    tip: `טעות נפוצה: להשתמש ב-was לכל הגופים, או להוסיף did. לא "We was" אלא "We were", ולא "Did you were…?" אלא "Were you…?". ועוד דבר: "נולדתי" הוא "I was born", לא "I born".`,
    quiz: [['We ___ in Eilat last summer.', 'were', ['was', 'did', 'be']], ['___ you at the party yesterday?', 'Were', ['Was', 'Did', 'Are']], ['The film ___ very good. I did not like it.', "wasn't", ["weren't", "didn't", 'not was']]]
  },
  {
    id: 'b-would-like', level: 'beginner', title: 'Like / would like', he: 'לאהוב ולרצות: like / would like',
    when: 'like מתאר מה אוהבים באופן כללי. would like היא דרך מנומסת לומר "אני רוצה" עכשיו, למשל במסעדה או בחנות, והיא עדינה יותר מ-I want.',
    forms: [
      ['like', 'like + noun / verb-ing: I like tea. · I like cooking.'],
      ['would like', "would like + noun / to + verb: I would like (I'd like) a tea. · I'd like to pay."],
      ['–', "I don't like fish. · I wouldn't like to live there."],
      ['?', 'Do you like coffee? · Would you like a coffee?']
    ],
    ex: [['I like Italian food.', 'אני אוהב אוכל איטלקי.'], ["I'd like a glass of water, please.", 'אני רוצה כוס מים, בבקשה.'], ['Would you like to sit here?', 'תרצה לשבת כאן?']],
    tip: `לא להתבלבל: "Do you like coffee?" שואל אם אוהבים קפה בכלל, ו-"Would you like a coffee?" מציע קפה עכשיו. ואחרי would like בא to: "I'd like to order", לא "I'd like order".`,
    quiz: [["I'd like ___ a table for two.", 'to book', ['book', 'booking', 'books']], ['___ you like a cup of tea now?', 'Would', ['Are', 'Does', 'Is']], ['She ___ dogs. She has three.', 'likes', ['like', 'liking', 'is like']]]
  },
  {
    id: 'b-connectors', level: 'beginner', title: 'And, but, because, so', he: 'מילות קישור: and / but / because / so',
    when: 'מילות קישור מחברות שני רעיונות למשפט אחד. and מוסיף מידע, but מציג ניגוד, or מציג בחירה, because נותן סיבה ו-so נותן תוצאה.',
    forms: [
      ['and', 'I have a brother and a sister.'],
      ['but', 'The flat is small but nice.'],
      ['or', 'Would you like tea or coffee?'],
      ['because', 'I am tired because I slept badly. (סיבה)'],
      ['so', 'I was tired, so I went to bed. (תוצאה)']
    ],
    ex: [['I like coffee, but I do not like tea.', 'אני אוהב קפה, אבל אני לא אוהב תה.'], ['She stayed at home because she was sick.', 'היא נשארה בבית כי היא הייתה חולה.'], ['It was late, so we took a taxi.', 'היה מאוחר, אז לקחנו מונית.']],
    tip: 'טעות נפוצה: להוסיף that אחרי because, כמו "בגלל ש" בעברית. לא "because that I was tired" אלא "because I was tired". וגם לא משתמשים ב-because וב-so יחד: לא "Because it rained, so we stayed home" אלא "It rained, so we stayed home".',
    quiz: [['I am hungry ___ I did not eat breakfast.', 'because', ['so', 'but', 'or']], ['It was raining, ___ we stayed at home.', 'so', ['because', 'but', 'or']], ['He is rich, ___ he is not happy.', 'but', ['because', 'so', 'or']]]
  },

  // ---------- Added in round 49 ----------
  {
    id: 'b-adjective-position', level: 'beginner', title: 'Adjectives: before the noun', he: 'שם תואר: לפני שם העצם',
    when: 'באנגלית שם התואר בא לפני שם העצם: a big house, "בית גדול". בעברית הסדר הפוך. חוץ מזה, שם התואר באנגלית לא משתנה: אותה מילה ליחיד ולרבים, לזכר ולנקבה.',
    forms: [
      ['adjective', 'a + adjective + noun: a big house · an old car'],
      ['plural', 'big houses · old cars (the adjective stays the same)'],
      ['description', 'be + adjective: The house is big. · The cars are old.'],
      ['order', 'opinion → size → color: a nice big red car']
    ],
    ex: [['She has a new phone.', 'יש לה טלפון חדש.'], ['They are good friends.', 'הם חברים טובים.'], ['We live in a small white house.', 'אנחנו גרים בבית לבן וקטן.']],
    tip: 'טעות נפוצה: לתרגם מילה במילה מעברית. לא "a house big" אלא "a big house". ולא מוסיפים s לשם התואר: "two big dogs", לא "two bigs dogs".',
    quiz: [['I bought a ___ yesterday.', 'red car', ['car red', 'cars red', 'reds car']], ['They have two ___.', 'small children', ['smalls children', 'children small', 'childrens small']], ['These shoes are ___.', 'new', ['news', 'a new', 'the new']]]
  },

  // ---------- Added in round 52 ----------
  {
    id: 'b-lets', level: 'beginner', title: "Let's: making suggestions", he: "הצעות: Let's",
    when: 'כשמציעים לעשות משהו ביחד: "בואו נלך", "בואו נאכל". Let\'s הוא קיצור של let us, ואחריו בא הפועל בצורת הבסיס, בלי to ובלי s. לשלילה אומרים Let\'s not.',
    forms: [
      ['suggestion', "Let's + verb: Let's go. · Let's eat."],
      ['negative', "Let's not + verb: Let's not wait."],
      ['question', 'Shall we + verb? Shall we start?'],
      ['answer', "Yes, let's! · Good idea. · Sorry, I can't."]
    ],
    ex: [["Let's go to the beach.", 'בואו נלך לים.'], ["Let's not be late.", 'בואו לא נאחר.'], ['Shall we order pizza?', 'נזמין פיצה?']],
    tip: 'טעות נפוצה: להוסיף to או ing אחרי Let\'s. לא "Let\'s to go" ולא "Let\'s going", אלא "Let\'s go". ושימו לב לגרש: Let\'s (בואו נ...) שונה מ-lets (מרשה).',
    quiz: [["Let's ___ a movie tonight.", 'watch', ['to watch', 'watching', 'watches']], ["It's cold. Let's ___ go out.", 'not', ["don't", 'no', "doesn't"]], ['___ we start the lesson?', 'Shall', ['Let', "Let's", 'Are']]]
  }
);
