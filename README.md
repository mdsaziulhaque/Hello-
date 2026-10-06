# Band Up — IELTS practice app

A colourful, game-style web app for IELTS preparation, with Bangla help for Bangladeshi learners. It needs no installation: open `index.html` in Chrome, Edge or Safari.

## What's inside

| Section | What you can do |
| --- | --- |
| **Listening** | 4 test parts (form, map, multiple choice, lecture notes) read aloud by your browser's British voices. Practice or exam mode, speed control, transcript, explanations. Plus number and spelling dictation drills. |
| **Reading** | Lessons: the 16/19/22-minute plan, skim–scan–close reading, a guide to all 11 question types, FALSE vs NOT GIVEN (with the Rosetta Stone exercise), daily reading habits and sites. 5 timed passages (jute, sleep, vertical farming, honeybees, and "Reading the Ocean" from Band 9 Bangladesh) with a highlighter. Plus a Scan race game and a TRUE / FALSE / NOT GIVEN trainer. |
| **Writing** | Task 1 charts (line, bar, pie, process, map) with Band 8 models, Task 2 model essays, a Band 6 vs Band 8 comparison, linking words, and a timed editor that counts words and flags weak words. |
| **Speaking** | Part 1 examiner questions, Part 2 cue cards with a 1-minute prep and 2-minute talk timer, Part 3 discussion, recording with live transcript (Chrome), a sound game for /v/–/b/, /θ/–/t/ and other Bangla-speaker pairs, and band descriptors. |
| **Vocabulary** | 120 words in four decks (Band 6, 7, 8, 9) with pictures, Bangla meanings, examples and pronunciation. Band ladders show one idea at Band 6 → 9. Flashcards, quiz, match game, word lists and collocations. |
| **Tips & Tricks** | Top tips per skill, exam-day checklist, overall band calculator, raw-score converter, Bangla → English traps, 30/60/90-day study plans, and links to your existing IELTS books on claude.ai. |

You earn **XP** for every activity, climb a **Band 4 → Band 9 level ladder**, keep a **daily streak**, fill a **daily goal ring** and unlock **badges**. Progress is saved in your browser.

## Sources

Much of the teaching content comes from IELTS material you created earlier with Claude:
*Band 9 Bangladesh* (scoring tables, weak-word upgrades, Bangla vocabulary, pronunciation, common errors), *Speak to Band 7+* (speaking band descriptors) and *Listen for the Answer* (linked audio library). Chart figures in Writing Task 1 are illustrative, for practice only.

## Files

```
index.html          app shell
css/style.css       design tokens (light + dark), layout, components
js/app.js           app logic: navigation, XP, quizzes, timers, speech, charts
js/data/*.js        content: vocab, listening, reading, writing, speaking, tips
```

## Notes

- Listening audio uses the browser's text-to-speech. Voices vary by device; Chrome and Edge on desktop have the best British voices.
- Recording needs microphone permission. Live transcripts work in Chrome and Edge.
- To publish on GitHub Pages: Settings → Pages → deploy from the `main` branch root.
