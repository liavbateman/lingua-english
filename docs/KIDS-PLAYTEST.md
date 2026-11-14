# Kids playtest loop

Each game gets a session of three plays, at phone size in the preview:

1. **Play 1 – observe only.** Play it like a child would (right answers, a wrong answer, tapping around) and write down what feels off: visuals, sound, flow.
2. **Play 2 – fix.** Play again and fix what play 1 found (visual, audio, UX).
3. **Play 3 – verify.** Play once more and decide: **Good** (done) or **Again** (it gets another session later).

A new session starts one minute after the previous one ends. The loop runs until the user says stop.

| # | Game | Route | Play 1 findings | Fixes | Verdict |
|---|---|---|---|---|---|
| 1 | Island lesson | `#/kids/play/animals` | All 23 steps + memory work, bar fills steadily, 3 stars. (a) the "Try at home" tip broke a quoted English phrase across two lines ("What is / it?"); (b) memory: a wrong pair got no reaction at all; (c) lesson is long for 3-5 (little mode already drops drag and animal sounds - left as is) | Quoted English inside Hebrew never wraps (bdi.k-q nowrap, app-wide); memory: wrong pair -> owl thinks + "try again", right pair -> "blue · כחול ✓" | **Good** (replayed on Colors: 19 steps + memory, both fixes seen) |
| 2 | ABC letter game | `#/kids/abcgame` | Plays fine (8 rounds, letter said as "D.", right answer adds "D is for dog"). (a) choices often had rhyming letter names that are near-impossible to tell apart by ear for a 3-5 year old (D/V/C, V/W/D, E/U/G); (b) no round counter, unlike the other games | Choices never mix letters from the same sound-alike group (ee: BCDEGPTVZ, ay: AHJK, eh: FLMNSX, I/Y, Q/U/W); "Find the letter · 3/8" counter | **Good** (15 more rounds: no sound-alike sets, counter shown, 3 stars) |
| 3 | Letter tracing | `#/kids/trace/A` | Traced A then a with real finger drags: forgiving coverage check, cheer + "A. A is for apple", the small letter follows, then back to the letter page with confetti; a coach hand shows the direction. Bug: the back link was a full-width white bar on every play screen (trace, letter page, songs, letter of the week) because play layouts stretch their children. Not changed: no per-stroke start dots (coverage-based tracing accepts any order, which suits 3-6 year olds) | Back link stays a small pill on play screens (.k-play > .k-back align-self) | **Good** (traced B; back link 71-92 px on 4 screens) |
| 4 | Picture story | `#/kids/story/goodnight` | Read-along works (words light in sync: The / sun / goes / down.), page counter, question, confetti ending. (a) the "read again" button wrapped onto two lines (82 px vs its neighbour); (b) the right answer jumped straight to "The end!" - the child never heard why it was right | Story/trace/song buttons stay on one line; a right answer says "Yes!" + the story line whose picture has the answer ("The cat and the dog play with a ball."), then the end | **Good** (replayed The cat and the dog: buttons 57/57 px, the confirming line is said) |
| 5 | Story you choose | `#/kids/path` | Pages read along, choices lead on, confetti ending, "another way". (a) the two choices were never read aloud and a tap committed at once - a child who cannot read could not know what they chose; (b) "you found N of 4 endings" was text only, and counted before the new ending was saved (one short) | After each page the owl reads the choices ("the red door, or the bridge?") and each one glows as it is said; the ending shows a row of the 4 endings (found ones as pictures, the new one highlighted, the rest ❔); the count includes the new ending | **Good** (bridge -> swim: choices read and glow, row shows 3 found, "3 of 4") |
| 6 | Who am I? (riddles) | `#/kids/riddles` | | | |
| 7 | Colouring (listening) | `#/kids/colour` | | | |
| 8 | Practice | `#/kids/practice` | | | |
| 9 | Pairs (memory) | `#/kids/pairs` | | | |
| 10 | Peek | `#/kids/peek` | | | |
| 11 | Speed | `#/kids/speed` | | | |
| 12 | Blending | `#/kids/blend` | | | |
| 13 | Play together | `#/kids/together` | | | |
| 14 | Shop | `#/kids/shop` | | | |
| 15 | Spell it | `#/kids/spell` | | | |
| 16 | Hide and seek | `#/kids/hide` | | | |
| 17 | Owl says | `#/kids/simon` | | | |
| 18 | Word families | `#/kids/fam` | | | |
| 19 | Feed the monster | `#/kids/monster` | | | |
| 20 | Rhyme time | `#/kids/rhyme` | | | |
| 21 | Dress for the weather | `#/kids/wear` | | | |
| 22 | The owl calls | `#/kids/call` | | | |
| 23 | Count with me | `#/kids/zoo` | | | |
| 24 | Touch the teddy | `#/kids/teddy` | | | |
| 25 | Picture talk | `#/kids/talk` | | | |
| 26 | Animal band | `#/kids/band` | | | |
| 27 | Treasure map | `#/kids/tmap` | | | |
| 28 | Sound safari | `#/kids/safari` | | | |
| 29 | Shape hunt | `#/kids/shunt` | | | |
| 30 | Brush your teeth | `#/kids/brush` | | | |
| 31 | Copy the owl's voice | `#/kids/copy` | | | |
| 32 | Opposite see-saw | `#/kids/seesaw` | | | |
| 33 | My morning | `#/kids/morning` | | | |
| 34 | Peekaboo | `#/kids/peekaboo` | | | |
| 35 | Colour by word | `#/kids/cbw` | | | |
| 36 | How do they feel? | `#/kids/feelst` | | | |
| 37 | Pizza maker | `#/kids/pizza` | | | |
| 38 | Weather reporter | `#/kids/wxr` | | | |
| 39 | Bath time | `#/kids/bath` | | | |
| 40 | Odd one out | `#/kids/odd` | | | |
| 41 | Shopping list | `#/kids/slist` | | | |
| 42 | Calm corner | `#/kids/calm` | | | |
| 43 | My family | `#/kids/ftree` | | | |
| 44 | Garden / watering | `#/kids/water` | | | |
| 45 | Songs | `#/kids/songs` | | | |
| 46 | Today's lullaby | `#/kids/lullaby` | | | |
| 47 | Letter of the week | `#/kids/lotw` | | | |
| 48 | My first English book | `#/kids/mybook` | | | |
| 49 | Today's adventure | `#/kids/today/start` | | | |
