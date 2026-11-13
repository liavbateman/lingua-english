# Lingua UX/UI roadmap

From round 23 the improvement loop works on UX/UI only. Each round takes the next open item,
borrowing proven patterns from leading language apps, and adapts them to a Hebrew (right-to-left) iPhone app.

| # | Round | Pattern | Inspired by | Status |
|---|---|---|---|---|
| 1 | Lesson focus mode | Header and tab bar hide during an exercise; close button and one thick progress bar at the top; a bottom sheet asks before leaving mid-round | Duolingo, Babbel | Done (round 23) |
| 2 | Answer feedback sheet | After answering, a green or red sheet slides up from the bottom with the correct answer, a speaker and a large Continue button in the thumb zone, so the button never jumps around | Duolingo | Done (round 24) |
| 3 | Tactile buttons | Thick 3D buttons and answer tiles that visibly press down; select an answer, then Check, to avoid mis-taps | Duolingo | Done (round 25) |
| 4 | Combo and lesson-end stats | "3 in a row!" while answering; the end screen shows accuracy, points and time as tiles that count up | Duolingo, Busuu | Done (round 26) |
| 5 | Flashcards that flip and swipe | 3D flip animation; swipe right for "I know it" and left for "Again" | Drops, Memrise, Anki | Done (round 27) |
| 6 | One "Continue" on Home | The Home screen leads with one big card for the next best step; secondary items move down | Babbel, Duolingo | Done (round 28); moving the rest down waits on the 4-tab decision |
| 6b | Lesson path | Words, sentences and grammar each shown as a winding road of round lessons: done (gold, check), current (coral, "Start" bubble, progress ring), started, locked (with a "open anyway" option); jump-back button; level chips above | Duolingo, user's reference app | Done (round 29) |
| P1 | Path: lesson card | Tapping a lesson opens a small card under it (name, progress, one clear button) instead of jumping in; locked lessons explain why | Duolingo | Done (round 30) |
| P2 | Path: section banners | Every few lessons a colored banner names the stage ("Part 2 · Around town") with its own progress | Duolingo units | Done (round 32): "Stage N" banner every 5 lessons, lesson icons, progress pill, one road per stage |
| P3 | Path: milestone chests | A treasure node after each section that opens with a small celebration once the section is done | Duolingo chests | Done (round 34): locked / ready (wiggles) / opened, +20 points once |
| P4 | Path: progress you can see happen | Coming back from a finished lesson, the node turns gold and the road fills up to the next one | Duolingo | Done (round 36): node turns gold, road grows, bubble drops onto the next lesson, once per change |
| P5 | Path: mascot header | A header with the owl, streak and the next step above the path, like the reference app | User's reference app | Done (round 38): owl, speech bubble that counts lessons to the next chest, streak and level chips, one button into the current lesson |
| P6 | Path: review stops | A "review" node that appears on the road when words from earlier lessons are due | Duolingo practice nodes | Done (round 40): beside the current lesson, dotted side path, count badge, 3+ due words learned once |
| P7 | Path: stage mini-map | A slim sticky bar of all stages: fill per stage, current stage ringed, the stage on screen framed, tap to jump | Duolingo course overview | Done (round 42) |
| P8 | Path: level sheet | The level heading above the path opens a sheet with the three levels, what each covers (CEFR), and how far this part is done; replaces the level chips | Reference app, Duolingo course picker | Done (round 44) |
| P9 | Path: lesson preview | The lesson card shows what's inside: first words (all of them, with a check on mastered ones, for a done lesson), first sentences, or a rule's example | Memrise course preview | Done (round 46) |
| 7 | Owl reactions | The owl mascot reacts in feedback, empty states and celebrations | Duolingo | |
| 8 | First-run setup | Three short screens: level, daily goal, reminder time | Babbel, Busuu | |
| 9 | Streak calendar | A month view of practiced days on the Progress screen | Duolingo | |

## Grammar tab (round 51)

At the user's request, the first tab is now **Grammar**: one road through every grammar rule of all three
levels (59 rules), built on the lesson path. Each level starts its own stages, banners and the mini-map
name the level ("Intermediate · Stage 5"), and the current rule is the first one not done at the chosen
level or above (rules left in easier levels stay open). The grammar sub-tab under Learn is gone.
Home's screen (H1, H2 below) is no longer shown; its code stays, in case the daily plan moves elsewhere.

| # | Round | Pattern | Inspired by | Status |
|---|---|---|---|---|
| G1 | All-levels grammar road | One road, stages split by level, level names on banners, rule cards with an example | User's request, Duolingo | Done (round 51) |
| G2 | Level gates | A gate before every new level: CEFR band, how much of the level before is done, "your level" tag or "Jump here" with a confirm sheet (rules left behind stay open) | Duolingo jump-ahead | Done (round 53); the placement check was added in round 61 (G6) |
| G3 | Rule review nodes | A review stop on the road for rules whose quiz had mistakes | Duolingo practice nodes | Done (round 55): beside the current rule, badge = rules with mistakes; up to 8 mixed questions with the rule name shown; right answers clear a rule |
| G4 | Rule cheat sheet | A crown on finished rules; tapping it opens the rule's one-line summary for quick recall | Babbel grammar tips | Done (round 57): crown badge, the card shows every structure row with its Hebrew tag and the common mistake; the road grows to fit a tall card |
| G5 | Rule search | A search box above the road (Hebrew or English: names, structures, examples); a result goes back to the road on that rule with its card open | Babbel, Busuu grammar reference | Done (round 59) |
| G6 | Level check at the gate | "Jump here" offers a 6-question check (one question from each of 6 rules of the level before); 5 right moves the learner up, misses go to the review stop; moving without it stays possible | Duolingo jump-ahead test | Done (round 61) |
| G7 | Mini-map by level | The grammar road's sticky map groups its stages by level, with each level's name and done count above its group; the name jumps to that level's gate; the current level is highlighted | Duolingo course overview | Done (round 63) |
| G8 | Hear the example | A speaker next to the rule's example in its card (and in a finished rule's cheat sheet), without opening the lesson | Duolingo, Busuu audio examples | Done (round 65) |
| G9 | Easy to mix up | 27 pairs of rules that are often confused (present simple/continuous, past simple/present perfect, will/going to…); a rule's card links to up to 2 partners, and a tap opens that rule's card on the road | Babbel grammar tips, Busuu | Done (round 67) |
| G10 | Saved rules | "Save for review" in a rule's card; a star on saved rules on the road; a star button next to the search filters to the saved list (and combines with the search) | Memrise difficult words, Babbel review | Done (round 69) |
| G11 | Practise saved rules | The saved filter starts with "Practise my saved rules (n)": up to 8 mixed questions from the saved rules, rule name shown; mistakes go to the review stop | Memrise difficult words | Done (round 71) |
| G12 | Level complete | A finished level turns its gate into a certificate (🎓, gold frame) with a 10-question level review; a 🏁 finish line closes the road after advanced; gates grow to fit | Duolingo unit review, Busuu certificates | Done (round 73) |
| G13 | Structure rows open an example | In a finished rule's cheat sheet, a structure row opens the rule example that matches it (same kind of sentence: statement / negative / question, most shared words), with a speaker; rows with no true match stay plain (182 of 282 rows open) | Babbel grammar tips | Done (round 75) |
| G14 | One quick question | A finished rule's card offers "One quick question": a choice question answered inside the card, feedback in text and color, "Another one"; a miss goes to the review stop | Duolingo practice, Anki | Done (round 77) |

## Design rounds (from round 78)

At the user's request the loop now works on visual design only: one screen or element per round,
in the visual language of the paths (level colours, chunky 3D cards with a bottom edge, rings, emoji icons).

| # | Round | What | Status |
|---|---|---|---|
| D1 | Progress screen | Stat tiles with icons and tinted backgrounds; level cards in their own colour with a ring for the whole level and one row per part (icon, label, bar); thicker week bars, today in coral; fixed a class clash that boxed the "today" column | Done (round 78) |
| D2 | Grammar rule page | The rule screen in its level's colour: header card, structure as a clean table, examples as speaker rows, mistake card with a clear warning style | |
| D3 | Quiz and lesson screens | Answer tiles, progress bar and feedback sheet polished to match the path cards | |
| D4 | Tab bar and header | Active tab as a pill, softer bar with blur, consistent icon weights | |
| D5 | Flashcards | Card faces with the unit's colour and emoji, nicer back side | |
| D6 | Type and spacing audit | One scale for headings, labels and small text; consistent card gaps | |

## Home: what it was for (until round 51)

Since the lesson path (round 29), the course map lives in the Learn tab. Home now has one job: **today**.
In one look it answers "have I done enough today, and what is the single next thing?" It doesn't
repeat the map, the stats (those belong to Progress) or the level buttons (the level sheet does that).
Order on screen: today's goal → the next step → today's plan → one place for extra practice.

| # | Round | Pattern | Inspired by | Status |
|---|---|---|---|---|
| H1 | Today header | Greeting by time of day, level chip (opens the level sheet), a ring for today's plan, a message (tasks left / keep the streak / done) and the last 7 days. Replaces the welcome card with duplicate stats and the level buttons | Duolingo daily goal, Babbel "Today" | Done (round 48) |
| H2 | Continue = the path | The next-step card shows where it sits on the path (stage, lesson N of M, progress ring like the path node) and links to the path | Duolingo, Babbel | Done (round 50): "Stage 1 · lesson 3 of 5", stage bar in path colors, ringed icon, "See it on the path" |
| H3 | Plan as daily quests | Each task shows its own progress bar (e.g. "6 / 15 words"); finishing all of them opens a small daily chest | Duolingo daily quests | |
| H4 | Word of the day you practise | The Hebrew is hidden until tapped (active recall), with "add to my review" | Drops, Memrise | |
| H5 | Evening streak nudge | After 18:00 with nothing done, the owl asks for one short lesson, with a 3-minute review button | Duolingo | |
| H6 | One "extra practice" row | Tricky words, the challenge and free practice merge into one row, so Home stays short | Busuu, Babbel | |

Rules for every round: Hebrew first and right to left, neutral (non-gendered) Hebrew, works on a 320px-wide iPhone,
nothing important hidden by the home indicator, motion respects "Reduce Motion", and feedback never relies on color alone.
