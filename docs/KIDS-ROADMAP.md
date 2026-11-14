# Lingua Kids roadmap

Goal (user, 2026-11-14): make Lingua the number one English-learning app for kids on the App Store,
with elements and learning flows built for how children learn. Work happens on the branch
`claude/english-learning-kids-app-078a51`, in an endless improvement loop until the user says stop.
Each round takes the next open item, builds it, checks it in the preview at phone size, and commits.

## How young children learn (the rules every round follows)

1. **Sound and picture first.** Most 4–7 year olds can't read English (or much Hebrew). Every word is
   heard and seen as a picture; text is a helper, never required.
2. **Short and bouncy.** A session is 2–4 minutes. Lots of variety, every step one tap.
3. **No failure.** A wrong tap wiggles and greys out; the child tries again. Stars are always 1–3, never 0.
4. **Many repetitions, different games.** The same word comes back in meet, find, match, and later games.
5. **Collecting and a buddy.** Stickers, stars and the owl buddy who talks and cheers.
6. **Hebrew instructions out loud** (when the device has a Hebrew voice), English words spoken slowly.
7. **Big targets.** Pictures at least 88px; nothing important in tiny text.
8. **Parents in control.** Anything that leaves the kids world sits behind a parent gate.

## Rounds

| # | Round | What | Status |
|---|---|---|---|
| K1 | Kids world | A new first tab and home: a sky-blue island map (10 picture-word themes, 75 words); each island a session of meet the words → find the picture you hear (3 then 4 pictures, errorless) → memory game (4 pairs); 1–3 stars, a sticker per island, a sticker album; the owl buddy; Hebrew spoken instructions; rounded font | Done (round 1) |
| K2 | Welcome for kids | First launch asks "Who is learning?" (a child / a grown-up); a child goes straight to the kids world with the owl saying hello | Done (round 2): a big sky-to-pink "A child (4–9)" button above the levels; the owl greets out loud; grown-ups who pick a level land on the grammar road |
| K3 | Pop the balloons | A game: balloons with pictures float up, pop the one you hear | Done (round 3): half of each session's find-the-picture steps are balloons that bob in place (3–4, never flying away); a wrong tap wiggles, the right one bursts with a soft pop sound; white balloons on the colours island |
| K4 | ABC & phonics island | Letters A–Z with a sound, a word and a picture each (A is for apple); trace or tap the letter | Done (round 4): an ABC card above the islands opens a grid of 26 letters; each letter's page shows Aa, its picture word with the letter highlighted, says "bee. B is for ball", with arrows to the next letter; a letter game (hear a letter, tap it among 3, it turns into its picture) with stars and a bonus ABC sticker in the album. Tracing and phonics sounds are still open (K16) |
| K16 | Letter tracing & sounds | Trace a letter with a finger along dotted guides; letter sounds (phonics) beside the letter names | |
| K5 | Say it! | Speak the word into the mic; the owl cheers any close try (speech recognition, lenient) | Done (round 5): 3 "Now you say it!" steps before the memory game (only where the browser can listen): picture card, a big mic that glows green with rings while listening; anything close counts (plurals, 1–2 letters off, same start); after 2 misses the owl praises the try and moves on; a Skip button; the real mic still needs a check on an iPhone |
| K6 | Daily treasure | One small gift a day for playing (a streak for kids: suns in a row, no loss shown) | Done (round 6): a chest card on the map: grey until something is finished today, then it wiggles; opening it reveals a treasure sticker (20, new ones first) with confetti and +15 points, then "come back tomorrow"; ☀️ treasure days only ever grow (no streak to lose); a treasure section in the album |
| K7 | Parent gate & parent corner | A grown-up check (hold two dots / a sum) before leaving the kids world; a parent page with words learned, time played, and a daily time limit | Done (round 7): kids mode (on when "a child" is picked at first launch, a switch in the parent corner) puts the other tabs and the language switch behind a grown-up check (a 6–9 × 6–9 multiplication, 4 answers; a wrong answer just closes; a pass lasts 10 minutes); a "For parents" button under the map opens the parent corner: words recognised, islands, stars, treasure days, play time today, progress per island, a daily time limit (off / 10–45 min) and a tip; over the limit, a sleepy-owl rest screen between games with "10 more minutes" for grown-ups |
| K8 | Owl dress-up | Stars buy hats and colours for the owl buddy | Done (round 8): tapping the owl on the map (👕 badge) opens its wardrobe: 6 frame colours and 9 accessories (bow → rocket) that open at 1–20 total stars; nothing is spent, so nothing is lost; locked items wiggle and say how many stars they need; the chosen look shows on the owl everywhere in the kids world |
| K9 | Picture stories | Short 4-page stories with tap-to-hear sentences built from learned words | Done (round 9): a Stories card on the map opens a shelf of 5 picture books (cat and dog, red balloon, counting, lunch, family), each opening when its island is finished; every page is read aloud slowly with the spoken word lit up in yellow, any word can be tapped, Hebrew under it; one picture question at the end (errorless), 2–3 stars |
| K10 | Review garden | Words learned earlier grow as plants that need "watering" (spaced review as a game) | Done (round 10): every word heard right becomes a plant in a pot with its picture (🌱 → 🌿 → 🌷 → 🌻); a plant droops with a 💧 when its word is due (1, 2, 4, 8 days); "Water the garden" plays up to 6 due words as find-the-picture, a right first tap grows the plant; a garden card on the map counts thirsty plants |
| K11 | Drag & drop game | Drag the word onto its picture | Done (round 11): one round per island session (after the balloons): 3 pictures with dashed drop zones and 3 word chips; picking up a word says it, a wrong drop floats back with "try again", a right one fills the picture in green with the word; tap a word then a picture works too (small fingers, VoiceOver); "Say it" steps cut from 3 to 2 to keep sessions short |
| K12 | Songs & chants | A sung chant for numbers and colours with words lighting up | Done (round 12): 4 songs (numbers 1–10, rainbow colours, ABC, hello / how are you); each word is a picture tile that lights up and jumps while a marimba note plays and the owl sings it; "Listen" and "Sing along" (same tune, quiet voice, for the child to sing); any tile can be tapped. The map's garden / stories / ABC / songs are now a 2 × 2 grid of tiles |
| K13 | More islands | Feelings, home, weather, actions (verbs with animated emoji), shapes, school | |
| K14 | Sound design | Pops, whooshes and a happy jingle for kids (Web Audio, quiet, can be muted) | |
| K15 | Kids accessibility pass | Contrast, VoiceOver labels, Reduce Motion, landscape on iPad | |
