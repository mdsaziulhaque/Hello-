/* Listening practice. Audio is spoken by the browser's text-to-speech voices.
   Each line: [speakerKey, text]. Speakers pick a voice slot (0 = voice A, 1 = voice B).
   Question types: gap (answers = accepted strings), mcq (opts + a = index), map (a = letter). */
window.LISTENING = [
  {
    id: "lp1", part: 1, title: "Joining a sports centre",
    context: "A woman phones a sports centre to become a member.",
    instructions: "Complete the form. Write ONE WORD AND/OR A NUMBER for each answer.",
    speakers: { R: { name: "Receptionist", slot: 0 }, C: { name: "Rahima", slot: 1 } },
    lines: [
      ["R", "Good morning, Greenfield Sports Centre. How can I help you?"],
      ["C", "Hi. I'd like to join the centre, please. Can I do that over the phone?"],
      ["R", "Of course. I just need to take a few details. Can I have your full name?"],
      ["C", "Yes, it's Rahima Khatun."],
      ["R", "Could you spell your surname for me?"],
      ["C", "Sure. K, H, A, T, U, N."],
      ["R", "Thank you. And what's your address?"],
      ["C", "Flat 3, 42 Mill Road, Bristol."],
      ["R", "And the postcode?"],
      ["C", "B, S, 7, 4, Q, J."],
      ["R", "Lovely. And a contact phone number?"],
      ["C", "My mobile is oh seven eight five four, three nine one, double six two."],
      ["R", "Thanks. Now, which type of membership are you interested in? We have Gold, which lets you come in at any time, and Off-peak, which is weekdays before four p.m. and all day at weekends."],
      ["C", "Hmm. I was thinking of Gold, but actually I work in the evenings, so off-peak would suit me better."],
      ["R", "Great. Off-peak is twenty-four pounds fifty a month. Gold is thirty-two pounds."],
      ["C", "Twenty-four fifty. That's fine."],
      ["R", "And when would you like to start?"],
      ["C", "Is next Monday possible? That's the tenth. Oh no, wait, I'm away that week. Let's say Monday the seventeenth of March."],
      ["R", "The seventeenth of March, no problem. Are there any activities you're particularly interested in?"],
      ["C", "Well, I used to do yoga, but these days I'd really like to try badminton."],
      ["R", "Badminton courts can be booked online up to a week in advance. One last question. How did you hear about us?"],
      ["C", "A friend recommended you. Well, actually, no. I first saw a leaflet in the library."],
      ["R", "Lovely. That's everything. Welcome to Greenfield!"]
    ],
    form: "Greenfield Sports Centre — Membership Form",
    questions: [
      { t: "gap", label: "Surname", q: "Rahima ______", a: ["khatun"] },
      { t: "gap", label: "Postcode", q: "______", a: ["bs7 4qj", "bs74qj"] },
      { t: "gap", label: "Mobile", q: "______", a: ["07854391662", "07854 391662", "07854 391 662"] },
      { t: "gap", label: "Membership type", q: "______", a: ["off-peak", "off peak", "offpeak"] },
      { t: "gap", label: "Monthly cost", q: "£ ______", a: ["24.50", "24.5", "£24.50"] },
      { t: "gap", label: "Start date", q: "______ March", a: ["17", "17th", "seventeenth", "the 17th"] },
      { t: "gap", label: "Activity wanted", q: "______", a: ["badminton"] },
      { t: "gap", label: "Heard about us from", q: "a ______", a: ["leaflet"] }
    ],
    why: [
      "The surname is spelt letter by letter. Write exactly what you hear.",
      "Postcodes mix letters and numbers. Capitals do not matter.",
      "'Double six' means 66. 'Oh' means zero.",
      "Trap: she mentions Gold first, then changes her mind.",
      "Trap: £32 is the price of Gold, not Off-peak.",
      "Trap: the 10th is mentioned, then corrected to the 17th.",
      "Trap: yoga is what she 'used to do'.",
      "Trap: a friend is mentioned, then she corrects herself."
    ]
  },
  {
    id: "lp2", part: 2, title: "Riverside Science Museum",
    context: "A guide welcomes visitors to a museum.",
    instructions: "Questions 1–3: choose the correct letter. Questions 4–8: label the plan. Write the correct letter, A–G.",
    speakers: { G: { name: "Guide", slot: 1 } },
    lines: [
      ["G", "Good morning, everyone, and welcome to the Riverside Science Museum. My name's Sarah, and I'll give you a quick introduction before you explore on your own."],
      ["G", "First, a little history. The building was originally a railway station, built in eighteen ninety. It opened as a museum in nineteen sixty-two, although many visitors think it's much newer because of the glass roof, which was only added in two thousand and eight."],
      ["G", "Entry to the main galleries is free, but there's a charge for the planetarium show. Tickets are six pounds, and children under five go in free. Please note that shows start every forty-five minutes, and not every hour, as it says in our old leaflet."],
      ["G", "Photography is allowed in most of the museum. You're welcome to take pictures in the Space gallery and even inside the planetarium before the show begins. The only exception is the Ancient Egypt room, where flash and camera light can damage some of the objects."],
      ["G", "Now, let me show you where everything is. Look at the plan. We're standing at the main entrance, at the bottom of the plan."],
      ["G", "If you're hungry, the café is on your left as you come in, in the corner, with lovely windows looking over the river."],
      ["G", "The gift shop is on the other side of the entrance, in the bottom right-hand corner, so you'll pass it on your way out."],
      ["G", "If you need to leave a bag, the lockers are just past the gift shop, along the right-hand wall, before you reach the stairs."],
      ["G", "Our most popular gallery, Space, is at the far end of the main hall, in the top left-hand corner. In the opposite corner, at the top on the right, you'll find the Ancient Egypt room. Between those two, in the middle of the back wall, is the children's discovery zone."],
      ["G", "And finally, the planetarium is the round room halfway along the left-hand wall. You can't miss it. Enjoy your visit!"]
    ],
    map: true,
    questions: [
      { t: "mcq", q: "When did the building open as a museum?", opts: ["1890", "1962", "2008"], a: 1 },
      { t: "mcq", q: "How often do planetarium shows start?", opts: ["every 30 minutes", "every 45 minutes", "every hour"], a: 1 },
      { t: "mcq", q: "Where is photography NOT allowed?", opts: ["the planetarium", "the Ancient Egypt room", "the Space gallery"], a: 1 },
      { t: "map", q: "Café", a: "A" },
      { t: "map", q: "Gift shop", a: "B" },
      { t: "map", q: "Lockers", a: "C" },
      { t: "map", q: "Space gallery", a: "D" },
      { t: "map", q: "Planetarium", a: "G" }
    ],
    why: [
      "1890 = built as a station; 2008 = the glass roof. The museum opened in 1962.",
      "'Not every hour, as it says in our old leaflet' — the old information is a trap.",
      "Photos are allowed in the planetarium and Space gallery. The exception is Ancient Egypt.",
      "Left of the entrance, in the corner, by the river windows.",
      "The other side of the entrance, bottom right.",
      "Past the gift shop, along the right wall, before the stairs.",
      "Far end, top left-hand corner.",
      "The round room halfway along the left wall."
    ]
  },
  {
    id: "lp3", part: 3, title: "Planning a research project",
    context: "Two students, Emma and Tanvir, plan a sustainability project.",
    instructions: "Choose the correct letter, A, B or C.",
    speakers: { E: { name: "Emma", slot: 1 }, T: { name: "Tanvir", slot: 0 } },
    lines: [
      ["E", "So, Tanvir, have you decided what we should focus on for the sustainability project?"],
      ["T", "I was thinking about plastic bottles on campus at first, but the student union already did a big survey on that last year. So I think food waste in the canteen would be more original."],
      ["E", "Good idea. I'm sure Dr Wilson would like that too. How should we collect the data? I thought a questionnaire would be quickest."],
      ["T", "Maybe, but people don't always tell the truth about how much food they throw away. I'd rather we actually weigh the waste. The canteen manager said we could borrow their scales."],
      ["E", "That's more reliable, though it'll take longer. Okay, let's do that for one week."],
      ["T", "Two weeks would be better, actually. The first week of term is unusual, because lots of students eat out with friends."],
      ["E", "Fair point. Two weeks, then. Did you read the article Dr Wilson recommended?"],
      ["T", "I did. Honestly, the statistics were a bit out of date. It was published in two thousand and nine. But the way they presented the results with simple diagrams was really clear. We should do something similar."],
      ["E", "Agreed. Their conclusions were a bit weak, though. Now, the presentation. I'm quite nervous about speaking in front of the whole class."],
      ["T", "How about I do the introduction and explain the data, and you present the recommendations? You're better at the creative side."],
      ["E", "Okay, I can do that. But let's rehearse together on Thursday."]
    ],
    questions: [
      { t: "mcq", q: "Why did they decide not to study plastic bottles?", opts: ["It would be too difficult to measure.", "It had already been studied.", "Their tutor was not interested."], a: 1 },
      { t: "mcq", q: "How will they collect their data?", opts: ["by giving out a questionnaire", "by interviewing the canteen manager", "by weighing the waste"], a: 2 },
      { t: "mcq", q: "How long will they collect data for?", opts: ["one week", "two weeks", "the whole term"], a: 1 },
      { t: "mcq", q: "What did Tanvir like about the article?", opts: ["its recent statistics", "its clear diagrams", "its strong conclusions"], a: 1 },
      { t: "mcq", q: "Which part of the presentation will Emma give?", opts: ["the introduction", "the data", "the recommendations"], a: 2 }
    ],
    why: [
      "'The student union already did a big survey on that' = it had already been studied.",
      "Emma suggests a questionnaire; Tanvir prefers to weigh the waste, and Emma agrees.",
      "Emma says one week, then accepts Tanvir's 'two weeks'.",
      "Statistics were out of date and conclusions weak; the diagrams were clear.",
      "Tanvir does the introduction and data; Emma presents the recommendations."
    ]
  },
  {
    id: "lp4", part: 4, title: "Lecture: the Sundarbans mangroves",
    context: "A lecturer talks about the mangrove forest of Bangladesh and India.",
    instructions: "Complete the notes. Write ONE WORD ONLY for each answer.",
    speakers: { L: { name: "Lecturer", slot: 0 } },
    lines: [
      ["L", "Today I want to look at one of the world's most remarkable ecosystems: the Sundarbans, the largest single block of tidal mangrove forest on Earth, shared between Bangladesh and India. It covers around ten thousand square kilometres."],
      ["L", "Mangroves are trees that survive in salt water, and their most important adaptation is in their roots. Many species send up special roots called pneumatophores, which stick out of the mud like pencils. These allow the tree to take in oxygen, because the mud itself contains very little."],
      ["L", "Another adaptation concerns salt. Some species filter it out at the roots, while others get rid of it through their leaves. In fact, if you touch your tongue to a mangrove leaf, it tastes salty."],
      ["L", "So why do mangroves matter? First, they protect the coast. When Cyclone Sidr struck in two thousand and seven, areas behind thick mangroves suffered far less damage, because the trees reduce the height and power of storm waves."],
      ["L", "Second, they act as nurseries. Young fish and shrimp shelter among the roots before moving out to sea, so local fishing communities depend on healthy forests."],
      ["L", "Third, and this is often overlooked, mangroves store huge amounts of carbon, up to four times more per hectare than tropical rainforests, and most of it is held in the soil rather than in the trees."],
      ["L", "And of course, the forest is home to the Bengal tiger, which has adapted to life here by learning to swim between the islands."],
      ["L", "However, the Sundarbans face serious threats. Rising sea levels are pushing more salt into the water, which kills species that prefer fresher conditions, such as the sundari tree that gives the forest its name. At the same time, dams upstream have reduced the flow of fresh water from the rivers."],
      ["L", "So what can be done? Replanting projects have had mixed results. The most successful ones involve local communities from the very start, rather than outside experts working alone."]
    ],
    notes: "The Sundarbans",
    questions: [
      { t: "gap", label: "Roots", q: "Pneumatophores allow trees to take in ______.", a: ["oxygen"] },
      { t: "gap", label: "Salt", q: "Some species remove salt through their ______.", a: ["leaves"] },
      { t: "gap", label: "Coast", q: "Trees reduce the height and power of storm ______.", a: ["waves"] },
      { t: "gap", label: "Nurseries", q: "Young fish and ______ shelter among the roots.", a: ["shrimp", "shrimps"] },
      { t: "gap", label: "Carbon", q: "Most carbon is stored in the ______.", a: ["soil"] },
      { t: "gap", label: "Tiger", q: "Bengal tigers have learned to ______ between islands.", a: ["swim"] },
      { t: "gap", label: "Threat 1", q: "Rising seas bring more ______ into the water.", a: ["salt"] },
      { t: "gap", label: "Threat 2", q: "Dams reduce the flow of fresh ______.", a: ["water"] },
      { t: "gap", label: "Solutions", q: "The best projects involve local ______.", a: ["communities", "community"] }
    ],
    why: [
      "'take in oxygen, because the mud itself contains very little'",
      "'get rid of it through their leaves' — 'remove' paraphrases 'get rid of'.",
      "'reduce the height and power of storm waves'",
      "'Young fish and shrimp shelter among the roots'",
      "'most of it is held in the soil rather than in the trees' — trap: trees.",
      "'learning to swim between the islands'",
      "'pushing more salt into the water'",
      "'reduced the flow of fresh water from the rivers'",
      "'involve local communities from the very start'"
    ]
  }
];

/* Golden rules for listening (adapted from Band 9 Bangladesh, chapter 2). */
window.LISTEN_TIPS = [
  ["Read ahead, always", "Use every pause to read the next questions and underline key words.", "প্রতিটি বিরতিতে পরের প্রশ্ন পড়ে রাখুন — শোনার আগে কী খুঁজছেন তা জানতে হবে।"],
  ["Predict the answer type", "Before you listen, decide: a number? a name? a noun? a plural?", "উত্তরটা সংখ্যা, নাম না বিশেষ্য — আগেই অনুমান করুন।"],
  ["Expect corrections", "Speakers often change their minds. The final answer usually comes after 'actually', 'no, wait', 'sorry'.", "'actually', 'no, wait' শুনলেই সতর্ক হোন — উত্তর বদলে যাচ্ছে।"],
  ["Listen for paraphrase", "The recording rarely uses the exact words in the question. 'Remove' may be 'get rid of'.", "প্রশ্নের শব্দ হুবহু শোনা যাবে না; সমার্থক শব্দ খুঁজুন।"],
  ["Respect the word limit", "ONE WORD ONLY means one word. 'the soil' is wrong if the limit is one word.", "শব্দসীমা ভাঙলে উত্তর সঠিক হলেও নম্বর কাটা যাবে।"],
  ["Spelling counts", "Misspelt answers are wrong. Learn the 100 most dangerous spellings (accommodation, environment, Wednesday…).", "বানান ভুল মানে উত্তর ভুল।"],
  ["Never leave a blank", "There is no negative marking. Guess if you have to.", "নেগেটিভ মার্কিং নেই — কোনো প্রশ্ন খালি রাখবেন না।"],
  ["If you miss one, move on", "Do not stay on a lost answer. You will lose the next three as well.", "একটি উত্তর ছুটে গেলে সেটা ছেড়ে সামনে এগিয়ে যান।"]
];

/* Words for the spelling dictation drill — places, names and IELTS danger words. */
window.SPELL_WORDS = ["Khatun","Rahman","Chowdhury","Thompson","Wednesday","accommodation","environment","government","necessary","library","February","restaurant","questionnaire","Greenwich","Hughes","Fairfax","Beaumont","Leicester","psychology","receipt","schedule","temperature","vegetable","volunteer","yoghurt","Queensway","Pemberton","Ashworth","Kensington"];
