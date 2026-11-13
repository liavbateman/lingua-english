// Runs after all content files (data.js, grammar.js, content-*.js) have filled UNITS and GRAMMAR.
// Gives every item a unique id and builds the flat list the exercises use.
UNITS.forEach(u => u.words.forEach(w => {
  w.id = u.id + ':' + w.en;
  w.unit = u.id;
  w.level = u.level;
  w.phrase = u.kind === 'phrases';   // a full sentence rather than a single word
}));
const ALL_WORDS = UNITS.flatMap(u => u.words);
