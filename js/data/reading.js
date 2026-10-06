/* Reading passages, written for this app in IELTS Academic style.
   Question types: heading (choose from list), tfng, mcq, gap (typed), para (which paragraph). */
window.READING = [
  {
    id: "rp1", title: "The Golden Fibre", art: "jute", minutes: 20,
    sub: "The rise, fall and possible return of jute in Bangladesh",
    paras: [
      ["A", "For centuries, the fertile delta of Bengal has produced a plant that once clothed, wrapped and carried much of the world's trade. Jute, a long, soft, shiny vegetable fibre, earned the name 'the golden fibre' both for its colour and for the wealth it generated. At the height of the industry in the mid-twentieth century, the region that is now Bangladesh grew more than 80 per cent of the world's raw jute."],
      ["B", "Jute grows best in the warm, humid conditions of the monsoon. Seeds are sown between March and May, and the plants, which can reach three metres in height, are harvested about four months later. The stems are then tied in bundles and submerged in slow-moving water for two to three weeks, a process known as retting. During retting, bacteria break down the soft tissue that binds the fibres to the stem, allowing farmers to strip them away by hand. Although this stage is unpleasant and labour-intensive, no machine has yet replaced it entirely."],
      ["C", "The industrial history of jute is closely tied to the Scottish city of Dundee. In the 1830s, manufacturers there discovered that treating the coarse fibre with whale oil made it soft enough to spin by machine. Dundee's mills soon dominated global production of sacks and sacking, while the raw material continued to come almost entirely from Bengal. It was not until the late nineteenth century that large mills were built near Calcutta, and only after 1947 that processing on a significant scale began in what was then East Pakistan."],
      ["D", "From the 1970s onwards, however, the industry entered a long decline. Cheap synthetic materials such as polypropylene replaced jute in sacks, carpet backing and packaging. Many mills closed, and farmers switched to rice and other crops that offered more reliable incomes. By the early 2000s, some economists were describing jute as a 'sunset industry' with little future."],
      ["E", "Recent concerns about plastic pollution have changed that outlook. Jute is fully biodegradable, and growing it requires relatively little fertiliser or pesticide. A hectare of jute plants can also absorb a considerable amount of carbon dioxide during the growing season. In 2010, Bangladesh passed a law requiring that certain products, including rice, sugar and fertiliser, be packed in jute bags, which created a large domestic market almost overnight."],
      ["F", "Researchers are now exploring more advanced uses. Bangladeshi scientists have developed a biodegradable plastic-like sheet made from jute cellulose, and car manufacturers in Europe have experimented with jute-based panels for door interiors because they are lighter than conventional materials. Whether these innovations can be produced cheaply enough to compete on a large scale remains to be seen, but the golden fibre may yet shine again."]
    ],
    headings: ["i. A material rescued by environmental worries", "ii. How the fibre is grown and separated", "iii. Foreign factories and a surprising ingredient", "iv. Competition from man-made alternatives", "v. The cost of modern machinery", "vi. New products still being tested", "vii. Why farmers prefer jute to rice"],
    groups: [
      { title: "Questions 1–5 · Matching headings", help: "Choose the correct heading for each paragraph from the list.", type: "heading",
        items: [
          { q: "Paragraph B", a: 1, why: "Sowing, harvesting and retting = how it is grown and separated." },
          { q: "Paragraph C", a: 2, why: "Dundee (foreign factories) + whale oil (surprising ingredient)." },
          { q: "Paragraph D", a: 3, why: "Synthetic materials such as polypropylene = man-made alternatives." },
          { q: "Paragraph E", a: 0, why: "Plastic pollution concerns changed the outlook for jute." },
          { q: "Paragraph F", a: 5, why: "'Remains to be seen' = still being tested." }
        ] },
      { title: "Questions 6–10 · TRUE / FALSE / NOT GIVEN", help: "Do the statements agree with the information in the passage?", type: "tfng",
        items: [
          { q: "The area that is now Bangladesh once grew most of the world's raw jute.", a: "TRUE", why: "Paragraph A: 'more than 80 per cent of the world's raw jute'." },
          { q: "Retting is now usually done by machine.", a: "FALSE", why: "Paragraph B: 'no machine has yet replaced it entirely' — fibres are stripped by hand." },
          { q: "Dundee manufacturers used whale oil because it was cheap.", a: "NOT GIVEN", why: "Paragraph C says whale oil made the fibre soft. Its price is never mentioned." },
          { q: "In the 1970s, farmers earned more money from rice than from jute.", a: "NOT GIVEN", why: "Paragraph D says rice offered 'more reliable' incomes. Reliable is not the same as higher." },
          { q: "The 2010 law increased demand for jute within Bangladesh.", a: "TRUE", why: "Paragraph E: the law 'created a large domestic market almost overnight'." }
        ] },
      { title: "Questions 11–13 · Sentence completion", help: "Write NO MORE THAN TWO WORDS from the passage.", type: "gap",
        items: [
          { q: "During retting, ______ break down the tissue around the fibres.", a: ["bacteria"], why: "Paragraph B." },
          { q: "In the early 2000s, some economists called jute a ______.", a: ["sunset industry"], why: "Paragraph D." },
          { q: "European car makers like jute panels because they are ______ than usual materials.", a: ["lighter"], why: "Paragraph F." }
        ] }
    ]
  },
  {
    id: "rp2", title: "Sleep and the Memory Machine", art: "sleep", minutes: 20,
    sub: "What the sleeping brain does with the things we learn",
    paras: [
      ["A", "Why do we sleep? For most of history, the answer seemed obvious: to rest. Yet during sleep the brain is far from idle. Brain scans show that some regions are as active during certain stages of sleep as they are when we are awake. Over the past three decades, researchers have built a strong case that one of sleep's most important functions is to strengthen memory."],
      ["B", "Sleep is not a single state. Over the course of a night, the brain cycles roughly every ninety minutes through lighter sleep, deep or 'slow-wave' sleep, and rapid eye movement (REM) sleep, the stage most closely associated with vivid dreams. Early in the night, cycles contain more deep sleep; towards morning, REM periods become longer."],
      ["C", "Deep sleep appears to be especially important for memories of facts and events. In a typical experiment, volunteers learn pairs of words in the evening and are tested the following morning. Those who sleep normally remember significantly more than those kept awake, and the improvement is linked to the amount of deep sleep they get. One theory suggests that during deep sleep the hippocampus, a small structure that stores new memories temporarily, 'replays' the day's experiences and transfers them to the cortex for long-term storage."],
      ["D", "REM sleep, by contrast, seems to help with skills and with emotional memories. Pianists who practise a new piece and then sleep often play it more accurately the next day without any further practice. Some researchers also believe REM sleep helps us find hidden connections between ideas: in one well-known study, participants who slept were more than twice as likely to discover a shortcut in a mathematical task as those who stayed awake."],
      ["E", "These findings have practical implications for students. Staying up all night before an exam may feel productive, but it deprives the brain of the very process that secures information. A 2019 survey of university students found that those who slept fewer than six hours a night achieved lower grades on average, although the authors noted that other factors, such as part-time work, may also have played a role."],
      ["F", "Even short naps can help. A nap of about twenty minutes improves alertness without causing grogginess, while a longer nap of ninety minutes may include a full cycle of sleep stages, including REM. Experts caution, however, that naps cannot fully replace a good night's sleep."]
    ],
    groups: [
      { title: "Questions 1–3 · Multiple choice", help: "Choose the correct letter.", type: "mcq",
        items: [
          { q: "According to paragraph A, brain scans show that during sleep the brain", opts: ["is completely at rest.", "can be as active as when awake.", "produces new memories from nothing."], a: 1, why: "'some regions are as active … as they are when we are awake'." },
          { q: "The writer mentions pianists to show that REM sleep", opts: ["improves the learning of skills.", "causes vivid dreams.", "makes people more emotional."], a: 0, why: "REM 'seems to help with skills' — the pianists play more accurately." },
          { q: "What did the authors of the 2019 survey say?", opts: ["Lack of sleep was the only cause of lower grades.", "Part-time work may also have affected grades.", "Students who napped got the highest grades."], a: 1, why: "'other factors, such as part-time work, may also have played a role'." }
        ] },
      { title: "Questions 4–7 · TRUE / FALSE / NOT GIVEN", help: "Do the statements agree with the information in the passage?", type: "tfng",
        items: [
          { q: "One sleep cycle lasts approximately an hour and a half.", a: "TRUE", why: "'roughly every ninety minutes'." },
          { q: "REM periods are longest at the start of the night.", a: "FALSE", why: "'towards morning, REM periods become longer'." },
          { q: "All the volunteers in the word-pair experiment were university students.", a: "NOT GIVEN", why: "The passage never says who the volunteers were." },
          { q: "People who slept were more likely to find a shortcut in a maths task.", a: "TRUE", why: "'more than twice as likely to discover a shortcut'." }
        ] },
      { title: "Questions 8–11 · Summary completion", help: "Choose ONE word from the box for each gap.", type: "box",
        box: ["hippocampus", "cortex", "alertness", "cycle", "grogginess", "dream", "muscle", "evening"],
        items: [
          { q: "During deep sleep, a brain structure called the ______ may replay recent experiences…", a: ["hippocampus"], why: "Paragraph C." },
          { q: "…and move them to the ______ for permanent storage.", a: ["cortex"], why: "Paragraph C: 'transfers them to the cortex for long-term storage'." },
          { q: "A short twenty-minute nap can increase ______…", a: ["alertness"], why: "Paragraph F: 'improves alertness'." },
          { q: "…while a longer nap may contain a complete ______ of sleep stages.", a: ["cycle"], why: "Paragraph F: 'a full cycle of sleep stages'." }
        ] }
    ]
  },
  {
    id: "rp3", title: "Farming Upwards", art: "farm", minutes: 20,
    sub: "The promise and problems of vertical farms",
    paras: [
      ["A", "By 2050, around two-thirds of the world's population is expected to live in cities, and feeding them will require more food from less land. One proposed solution is to grow crops indoors, in stacked layers, inside warehouses or purpose-built towers. These 'vertical farms' use LED lights instead of the sun and grow plants without soil, in nutrient-rich water (hydroponics) or mist (aeroponics)."],
      ["B", "Supporters point to impressive numbers. Because conditions are controlled, crops can be harvested all year round, and some farms claim yields per square metre more than a hundred times higher than open fields. Water use can fall by up to 95 per cent, since water is recycled in a closed system. With no insects to fight, pesticides are unnecessary, and because farms can be built inside cities, food travels a few kilometres rather than hundreds."],
      ["C", "The greatest problem is energy. Sunlight is free; electric light is not. Lighting, together with air-conditioning to remove the heat produced by the lamps, can make up more than half of a vertical farm's operating costs. When that electricity comes from fossil fuels, a lettuce grown indoors may have a larger carbon footprint than one grown in a field and transported by lorry."],
      ["D", "This explains why most vertical farms grow leafy greens, herbs and strawberries. These crops grow quickly, are mostly edible, and sell for high prices. Staple crops like wheat and rice, which need lots of space and light and earn little per kilogram, are currently impossible to grow profitably indoors. One researcher calculated that a loaf of bread made from vertically farmed wheat would cost around 20 US dollars."],
      ["E", "The industry has had a turbulent few years. Several well-funded companies in the United States and Europe went bankrupt between 2022 and 2024 as energy prices rose. Others have survived by locating farms where electricity is cheap and renewable, such as Iceland and parts of Scandinavia, or by combining farms with buildings that produce spare heat."],
      ["F", "For countries with limited farmland and expensive imports, such as Singapore and the United Arab Emirates, vertical farming may still make strategic sense. Singapore aims to produce 30 per cent of its nutritional needs locally — a goal it cannot achieve with traditional farming alone. For most of the world, however, vertical farms are likely to complement, rather than replace, conventional agriculture."]
    ],
    groups: [
      { title: "Questions 1–4 · Matching information", help: "Which paragraph, A–F, contains the following information?", type: "para",
        items: [
          { q: "the reason vertical farms focus on certain crops", a: "D", why: "'This explains why most vertical farms grow leafy greens…'" },
          { q: "examples of businesses that failed financially", a: "E", why: "'went bankrupt between 2022 and 2024'." },
          { q: "a comparison of carbon emissions with field-grown food", a: "C", why: "'a larger carbon footprint than one grown in a field'." },
          { q: "a national target for producing food locally", a: "F", why: "'Singapore aims to produce 30 per cent…'" }
        ] },
      { title: "Questions 5–6 · Multiple choice", help: "Choose the correct letter.", type: "mcq",
        items: [
          { q: "Vertical farms do not need pesticides because", opts: ["the plants are genetically modified.", "there are no insects to fight.", "LED lights kill pests."], a: 1, why: "Paragraph B: 'With no insects to fight, pesticides are unnecessary'." },
          { q: "What is the writer's overall conclusion?", opts: ["Vertical farms will replace traditional farms.", "Most vertical farms will fail.", "Vertical farms will work alongside traditional farming."], a: 2, why: "'complement, rather than replace' = work alongside." }
        ] },
      { title: "Questions 7–9 · Short answers", help: "Write NO MORE THAN TWO WORDS AND/OR A NUMBER.", type: "gap",
        items: [
          { q: "By what percentage can vertical farms reduce water use?", a: ["95", "95%", "95 per cent", "95 percent"], why: "Paragraph B: 'up to 95 per cent'." },
          { q: "Apart from lighting, what is a major energy cost?", a: ["air-conditioning", "air conditioning"], why: "Paragraph C." },
          { q: "Name one country mentioned for cheap, renewable electricity.", a: ["iceland"], why: "Paragraph E: 'such as Iceland and parts of Scandinavia'. (Scandinavia is a region, not a country.)" }
        ] }
    ]
  }
];

/* Quick-fire TRUE / FALSE / NOT GIVEN trainer. */
window.TFNG = [
  { text: "The museum opens at 9 a.m. on weekdays and 10 a.m. at weekends.", s: "The museum opens later on Saturdays than on Tuesdays.", a: "TRUE", why: "Saturday = weekend (10 a.m.); Tuesday = weekday (9 a.m.)." },
  { text: "Most of the volunteers were women aged between 20 and 35.", s: "All of the volunteers were under 40.", a: "NOT GIVEN", why: "'Most' were 20–35. We know nothing about the others." },
  { text: "The bridge was completed in 2022, two years later than planned.", s: "The bridge was finished on schedule.", a: "FALSE", why: "'two years later than planned' contradicts 'on schedule'." },
  { text: "Tea was first grown commercially in Sylhet in the 1850s.", s: "Sylhet is the largest tea-growing area in Bangladesh.", a: "NOT GIVEN", why: "The text gives a date, not a size comparison." },
  { text: "The drug reduced symptoms in 60% of patients, but caused headaches in some.", s: "The drug had no side effects.", a: "FALSE", why: "Headaches are a side effect." },
  { text: "Researchers believe the decline in bee numbers may be linked to pesticides.", s: "Scientists have proved that pesticides cause the decline in bees.", a: "FALSE", why: "'Believe … may be linked' is not proof. Watch hedging words." },
  { text: "The city's population doubled between 1990 and 2010.", s: "The city had twice as many people in 2010 as in 1990.", a: "TRUE", why: "'Doubled' = twice as many. A classic paraphrase." },
  { text: "The author interviewed farmers in three districts of northern Bangladesh.", s: "The author found the farmers very helpful.", a: "NOT GIVEN", why: "The text says nothing about the farmers' attitude." },
  { text: "Unlike earlier models, the new phone has no headphone socket.", s: "Earlier models had a headphone socket.", a: "TRUE", why: "'Unlike earlier models … has no socket' implies earlier ones did." },
  { text: "Rice production rose slightly, while wheat production remained stable.", s: "Wheat production increased.", a: "FALSE", why: "'Remained stable' = did not change." },
  { text: "The festival attracts visitors from across South Asia.", s: "The festival is the most popular in South Asia.", a: "NOT GIVEN", why: "Attracting visitors does not tell us it is the most popular." },
  { text: "Children who read for pleasure scored higher in vocabulary tests.", s: "Reading for pleasure was associated with better vocabulary scores.", a: "TRUE", why: "'Scored higher' = 'associated with better scores'." }
];

window.READ_TIPS = [
  ["Questions first, then the passage", "Read the questions before the passage so you know what to look for.", "আগে প্রশ্ন, তারপর passage — কী খুঁজছেন জেনে পড়ুন।"],
  ["Three speeds of reading", "Skim for the main idea (1–2 min), scan for names and numbers, read closely only around the answer.", "Skim, scan, তারপর শুধু উত্তরের আশেপাশে খুঁটিয়ে পড়ুন।"],
  ["20 minutes per passage", "Passage 3 is the hardest. Do not let passage 1 steal its time.", "প্রতিটি passage-এ ২০ মিনিট — শেষটির জন্য সময় রাখুন।"],
  ["FALSE vs NOT GIVEN", "FALSE = the text says the opposite. NOT GIVEN = the text does not say. Do not use your own knowledge.", "FALSE মানে উল্টো বলা আছে; NOT GIVEN মানে কিছুই বলা নেই।"],
  ["Answers usually follow passage order", "For TFNG, completion and MCQ, answers appear in order. Headings and matching do not.", "বেশিরভাগ প্রশ্নের উত্তর passage-এর ক্রম মেনে আসে।"],
  ["Copy the exact words", "In completion tasks, copy words from the passage with correct spelling. Do not change word forms.", "Passage থেকে হুবহু শব্দ তুলুন, রূপ বদলাবেন না।"],
  ["Headings: read the first and last sentences", "The topic sentence usually tells you the paragraph's main idea. Ignore distracting details.", "Heading মেলাতে অনুচ্ছেদের প্রথম ও শেষ বাক্য দেখুন।"],
  ["Watch qualifying words", "some, most, all, may, always, only — one word can change TRUE to FALSE.", "some, most, all, may — এক শব্দেই উত্তর বদলে যায়।"]
];
