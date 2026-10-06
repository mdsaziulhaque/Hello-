/* Reading passages, written for this app in IELTS Academic style.
   Question types: heading (choose from list), tfng, mcq, gap (typed), para (which paragraph). */
window.READING = [
  {
    id: "rp1", title: "The Golden Fibre", art: "jute", minutes: 16,
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
    id: "rp2", title: "Sleep and the Memory Machine", art: "sleep", minutes: 19,
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
    id: "rp3", title: "Farming Upwards", art: "farm", minutes: 19,
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
  ["16 · 19 · 22 minutes", "Passage 3 is the hardest. Give the passages 16, 19 and 22 minutes and keep 3 minutes to check. There is no extra transfer time.", "১৬ / ১৯ / ২২ মিনিট — এই বাজেট ভাঙবেন না।"],
  ["FALSE vs NOT GIVEN", "FALSE = the text says the opposite. NOT GIVEN = the text does not say. Do not use your own knowledge.", "FALSE মানে উল্টো বলা আছে; NOT GIVEN মানে কিছুই বলা নেই।"],
  ["Answers usually follow passage order", "For TFNG, completion and MCQ, answers appear in order. Headings and matching do not.", "বেশিরভাগ প্রশ্নের উত্তর passage-এর ক্রম মেনে আসে।"],
  ["Copy the exact words", "In completion tasks, copy words from the passage with correct spelling. Do not change word forms.", "Passage থেকে হুবহু শব্দ তুলুন, রূপ বদলাবেন না।"],
  ["Headings: read the first and last sentences", "The topic sentence usually tells you the paragraph's main idea. Ignore distracting details.", "Heading মেলাতে অনুচ্ছেদের প্রথম ও শেষ বাক্য দেখুন।"],
  ["Watch qualifying words", "some, most, all, may, always, only — one word can change TRUE to FALSE.", "some, most, all, may — এক শব্দেই উত্তর বদলে যায়।"]
];

/* ---------- More passages ---------- */
window.READING.push(
  {
    id: "rp4", title: "Reading the Ocean", art: "ocean", minutes: 22, source: "From your Band 9 Bangladesh book (Chapter 3.4)",
    sub: "How Polynesia was found — a full Passage 3-level practice",
    paras: [
      ["A", "By the time European ships entered the Pacific in the sixteenth century, people were already living on almost every habitable island in a triangle of ocean larger than Asia — from Hawai'i in the north to Aotearoa New Zealand in the south-west and Rapa Nui in the east. Between these islands lie thousands of kilometres of empty water. The settlement of this region, achieved without charts, compasses or written records, is among the most remarkable achievements in human history, and for two centuries Europeans could not agree on how it had been done."],
      ["B", "The explanation that dominated the mid-twentieth century was, in effect, that it had not been done at all — not deliberately. In 1956 the New Zealand historian Andrew Sharp published an argument that Polynesian islands had been reached by accident: canoes blown off course by storms, drifting until they made landfall. Sharp did not doubt that Pacific peoples were capable sailors, but he insisted that navigation over such distances without instruments was simply impossible, and that the oral traditions describing planned voyages were later embellishments. The thesis was influential partly because it was tidy, and partly because, at the time, no living navigator was available to contradict it."],
      ["C", "Evidence against Sharp came from an unexpected direction. In 1973 a team led by Michael Levison used a computer to simulate drift voyages, feeding in historical wind and current data and releasing thousands of virtual canoes. The results were awkward for the accidental-settlement thesis. Drift could plausibly account for some island-hopping in western Polynesia, but the simulated canoes almost never reached Hawai'i or Rapa Nui, and virtually none travelled eastward against the prevailing trade winds. If the eastern islands had been settled, someone had sailed there on purpose."],
      ["D", "The decisive demonstration was not academic but practical. In 1976 a double-hulled canoe named Hōkūle'a, built by the Polynesian Voyaging Society in Hawai'i, sailed to Tahiti carrying no navigational instruments whatever. The society had been unable to find a Hawaiian navigator who still held the traditional knowledge; the skills had lapsed there generations earlier. Instead they turned to Mau Piailug, a navigator from the tiny island of Satawal in Micronesia, one of the last places where the tradition had survived unbroken. Piailug brought the canoe to landfall after a month at sea. The voyage did not prove that ancient Polynesians had navigated in exactly this way, but it destroyed the claim that such navigation was impossible."],
      ["E", "What Piailug used was not one technique but a system of cross-checking ones. The primary framework is a star compass: a mental division of the horizon into points marked by the rising and setting positions of some thirty stars, memorised in sequence so that as one star climbs too high to be useful, the next takes its place. When cloud hides the sky, the navigator reads the ocean instead. Swells generated by distant weather systems hold their direction for days, and an experienced navigator can feel several swell trains at once through the motion of the hull, using them as a rolling reference. Closer to land, other signs accumulate: the greenish underside of clouds above a lagoon, the flight paths of terns and noddies at dawn and dusk, floating vegetation, a change in the pattern of waves refracted around an unseen island."],
      ["F", "Perhaps the most striking feature of the system is conceptual rather than observational. Carolinian navigators, whose methods were described in detail by the anthropologist Thomas Gladwin and the physician-sailor David Lewis, do not picture the canoe as moving across a fixed sea. Instead, in the system known as etak, the canoe is imagined as stationary while islands move past it. A reference island, often out of sight, is tracked in the mind as it passes successive star points, and the navigator's sense of progress comes from how far that imagined island has travelled. To a European trained on charts this inversion seems perverse; in practice it is efficient, because it removes the need to calculate speed and distance and replaces them with a single continuously updated bearing."],
      ["G", "The tradition came close to disappearing. Missionary discouragement, colonial restrictions on inter-island voyaging and the arrival of motor vessels all reduced the number of practitioners, until in the 1970s Satawal held only a handful. Piailug's decision to teach outsiders was itself controversial at home, since the knowledge had customarily been transmitted within families. Its effect, however, has been an unmistakable revival: voyaging societies now operate across the Pacific, deep-sea canoes have been built in a dozen island groups, and a generation of navigators trained in the Hawaiian and Satawalese lines has completed voyages of many thousands of kilometres. Whether the revived practice is identical to the ancient one is, in a sense, beside the point. What it has established is that the ocean can be read."]
    ],
    headings: ["i. A near-extinction and an unexpected recovery", "ii. A theory of arrival without intention", "iii. Why the trade winds made settlement easy", "iv. Reading a moving world from a still canoe", "v. The dangers faced by early Pacific canoes", "vi. Modelling that undermined an accepted view", "vii. A voyage that settled the question of possibility", "viii. Layers of evidence from sky, sea and wildlife", "ix. The role of written records in Pacific history"],
    groups: [
      { title: "Questions 1–6 · Matching headings", help: "Choose the correct heading for paragraphs B–G from the list. Three headings are not used.", type: "heading",
        items: [
          { q: "Paragraph B", a: 1, why: "Sharp's theory of accidental settlement. 'Without intention' paraphrases 'by accident' — the heading never uses the word." },
          { q: "Paragraph C", a: 5, why: "'Modelling' = computer simulation; 'undermined an accepted view' = weakened Sharp's theory. Trap: heading iii mentions trade winds, but the winds worked against the canoes." },
          { q: "Paragraph D", a: 6, why: "The last sentence: 'it destroyed the claim that such navigation was impossible' = settled the question of possibility." },
          { q: "Paragraph E", a: 7, why: "Stars, swells, birds and clouds = layers of evidence from sky, sea and wildlife." },
          { q: "Paragraph F", a: 3, why: "Etak: the canoe is imagined as still while the islands move." },
          { q: "Paragraph G", a: 0, why: "'came close to disappearing' + 'an unmistakable revival'. Unused headings (iii, v, ix) all borrow words from the passage — that is how traps are built." }
        ] },
      { title: "Questions 7–11 · TRUE / FALSE / NOT GIVEN", help: "Do the statements agree with the information in the passage?", type: "tfng",
        items: [
          { q: "Andrew Sharp believed that Pacific islanders were poor sailors.", a: "FALSE", why: "'Sharp did not doubt that Pacific peoples were capable sailors.' You can point to the sentence that contradicts it, so it is FALSE, not NOT GIVEN." },
          { q: "Levison's simulations showed that drifting canoes rarely travelled eastward.", a: "TRUE", why: "'virtually none travelled eastward' = rarely travelled eastward." },
          { q: "No Hawaiian navigator with traditional knowledge could be found in 1976.", a: "TRUE", why: "'The society had been unable to find a Hawaiian navigator who still held the traditional knowledge.'" },
          { q: "The Hōkūle'a voyage proved that ancient Polynesians had used the star compass.", a: "FALSE", why: "'The voyage did not prove that ancient Polynesians had navigated in exactly this way.' Success is not the same as proof." },
          { q: "Mau Piailug was criticised on Satawal for teaching people from outside his community.", a: "TRUE", why: "'Piailug's decision to teach outsiders was itself controversial at home.' At home = on Satawal." }
        ] },
      { title: "Questions 12–13 · Summary completion", help: "Complete the summary. Write NO MORE THAN TWO WORDS from the passage.", type: "gap",
        items: [
          { q: "If the sky is obscured, the navigator relies instead on ______, which keep their direction over long periods and can be felt through the hull.", a: ["swells"], why: "Paragraph E. Keep the plural: 'which keep their direction' needs a plural noun." },
          { q: "In the etak system, the navigator holds the canoe still and tracks a ______ as it seems to move past fixed star points.", a: ["reference island"], why: "Paragraph F. Writing only 'island' is incomplete." }
        ] }
    ]
  },
  {
    id: "rp5", title: "The Language of Bees", art: "bees", minutes: 19,
    sub: "How honeybees tell each other where to find food",
    paras: [
      ["A", "For centuries, beekeepers noticed that when one honeybee discovered a rich source of nectar, many others from the same hive soon arrived there. How the information was passed on remained a mystery until the work of the Austrian scientist Karl von Frisch, who spent decades observing bees in glass-walled hives and was awarded a share of the Nobel Prize in 1973."],
      ["B", "Von Frisch discovered that a returning forager performs a 'dance' on the vertical surface of the honeycomb. When food is close to the hive, usually within about 50 metres, the bee performs a simple 'round dance', running in small circles. This tells her sisters that food is nearby but gives no information about direction; they simply search the area around the hive, guided by the scent of the flowers clinging to the dancer's body."],
      ["C", "For more distant food, the bee performs the far more complex 'waggle dance'. She runs in a straight line while vibrating her abdomen from side to side, then loops back to the start and repeats the run, often dozens of times. The angle of the straight run relative to vertical shows the direction of the food relative to the sun: a run straight upwards means 'fly towards the sun', while a run 60 degrees to the right of vertical means 'fly 60 degrees to the right of the sun'. The duration of the waggle run indicates distance: the longer the run, the further away the food."],
      ["D", "Remarkably, bees continue to give accurate directions even as the sun moves across the sky during the day. Experiments show that dancers adjust the angle of their runs to account for the sun's changing position, which means they must have some internal sense of time. Bees can even locate the sun on cloudy days by detecting patterns of polarised light in patches of blue sky, something the human eye cannot see."],
      ["E", "Von Frisch's conclusions were not universally accepted. In the 1960s, the American researcher Adrian Wenner argued that recruits found food mainly by smell, and that the dance was a side-effect rather than a language. The debate was largely resolved in 2005, when scientists attached tiny radar transponders to bees and tracked their flights. Recruits flew directly towards the area indicated by the dance and only then began searching locally by scent, suggesting that both sources of information play a role."],
      ["F", "Today, the waggle dance is regarded as one of the most sophisticated forms of communication in the animal kingdom. It is also proving useful to humans: by filming and decoding dances, researchers can map which landscapes bees prefer and how far they must travel for food — information that may help to protect pollinators, whose numbers have declined in many countries."]
    ],
    groups: [
      { title: "Questions 1–4 · Matching information", help: "Which paragraph, A–F, contains the following information?", type: "para",
        items: [
          { q: "evidence from a tracking technology", a: "E", why: "'attached tiny radar transponders to bees and tracked their flights'." },
          { q: "how bees cope with the movement of the sun", a: "D", why: "'dancers adjust the angle of their runs to account for the sun's changing position'." },
          { q: "a practical use of the research today", a: "F", why: "'researchers can map which landscapes bees prefer … may help to protect pollinators'." },
          { q: "a signal that gives no information about direction", a: "B", why: "The round dance 'gives no information about direction'." }
        ] },
      { title: "Questions 5–9 · TRUE / FALSE / NOT GIVEN", help: "Do the statements agree with the information in the passage?", type: "tfng",
        items: [
          { q: "Von Frisch won the Nobel Prize on his own.", a: "FALSE", why: "He 'was awarded a share of the Nobel Prize' — he shared it." },
          { q: "The round dance is used when food is more than 50 metres away.", a: "FALSE", why: "It is used when food is close, 'usually within about 50 metres'." },
          { q: "A bee performs the waggle run only once before flying out again.", a: "FALSE", why: "She 'repeats the run, often dozens of times'." },
          { q: "Bees can detect a type of light that humans cannot see.", a: "TRUE", why: "Polarised light patterns — 'something the human eye cannot see'." },
          { q: "Adrian Wenner later changed his opinion about the dance.", a: "NOT GIVEN", why: "The passage says the debate was resolved in 2005 but never says what Wenner thought afterwards." }
        ] },
      { title: "Questions 10–12 · Sentence completion", help: "Write NO MORE THAN TWO WORDS from the passage.", type: "gap",
        items: [
          { q: "The angle of the waggle run shows the direction of the food relative to the ______.", a: ["sun", "the sun"], why: "Paragraph C." },
          { q: "The ______ of the waggle run tells other bees how far away the food is.", a: ["duration"], why: "Paragraph C: 'The duration of the waggle run indicates distance'." },
          { q: "In 2005, scientists tracked bees using tiny ______.", a: ["radar transponders", "transponders"], why: "Paragraph E." }
        ] }
    ]
  }
);

/* ---------- Reading lessons (Band 9 Bangladesh, chapter 3) ---------- */
window.READ_TIME = [
  ["Passage 1", 16, "Easiest · general interest"],
  ["Passage 2", 19, "Medium · often research-based"],
  ["Passage 3", 22, "Hardest · abstract argument"],
  ["Check", 3, "Answers on the sheet"]
];

window.READ_SPEEDS = [
  ["Skim", "Read the title, the first and last sentence of each paragraph, and the main idea. Two minutes for the whole passage.", "Once, at the start — to learn the passage's structure.", "~2 min", "উপর দিয়ে চোখ বুলিয়ে মূল ভাব ধরা।"],
  ["Scan", "Hunt with your eyes for something specific: a name, a year, a number, a capital letter. You are not reading — you are searching.", "For every question, to find where the answer is.", "10–30 s", "নির্দিষ্ট নাম, সাল বা সংখ্যা খুঁজে বের করা।"],
  ["Close read", "Read two or three sentences word by word, paying attention to grammar and small words like only, most, not.", "Only around the place where you think the answer is.", "~30 s", "উত্তরের জায়গায় শব্দে শব্দে নিবিড় পাঠ।"]
];

/* 11 official Academic Reading question types. [name, in passage order?, steps, trap, Bangla tip] */
window.READ_TYPES = [
  ["Matching headings", false, ["Read the headings first and pair similar ones. Find the small difference between them.", "Read a paragraph, then say its main idea in one line in your own words.", "Choose the heading closest to the main idea, not to one detail.", "Cross off headings you have used.", "Leave the hardest paragraph until last."], "A heading that matches only one sentence or borrows words from the paragraph is usually a trap.", "শিরোনাম মূল ভাবের সঙ্গে মেলান, একটি বাক্যের সঙ্গে নয়।"],
  ["TRUE / FALSE / NOT GIVEN", true, ["Use names, numbers and key words to find the right place.", "Read that sentence closely.", "Ask: does the text say something that proves the statement wrong? Yes = FALSE.", "If you can't point to a sentence, the answer is NOT GIVEN."], "Extreme words — all, always, never, only, the first, the most — often change the answer.", "যে বাক্য থেকে উত্তর আসছে তাতে আঙুল রাখতে না পারলে উত্তর NOT GIVEN।"],
  ["YES / NO / NOT GIVEN", true, ["Same rules as TRUE/FALSE/NOT GIVEN.", "But these test the writer's opinion or claims, not facts.", "Look near words like argues, claims, suggests, it seems likely."], "Don't confuse a view the writer reports with the writer's own view.", "এখানে তথ্য নয়, লেখকের মতামত যাচাই হয়।"],
  ["Matching information", false, ["Do these last — by then you know where most things are.", "Notice what kind of information is asked: an example, a reason, a comparison, a date.", "A paragraph can be used more than once."], "These take the most time. Don't start with them.", "এগুলো সবার শেষে করুন — সবচেয়ে বেশি সময় খায়।"],
  ["Matching features", false, ["Underline every name (person, study, place) in the passage.", "Write two words next to each one: what they said or found.", "Then match the statements."], "The same person may appear in several paragraphs. Check all of them.", "প্রথমে passage-এ সব নাম দাগিয়ে নিন।"],
  ["Matching sentence endings", false, ["Use the sentence beginning to find the place in the passage.", "Cross out endings that don't fit grammatically.", "Then choose by meaning."], "Several endings are true statements from the passage, but only one completes this sentence correctly.", "ব্যাকরণ দিয়ে অসম্ভব শেষাংশ আগে বাদ দিন।"],
  ["Sentence completion", true, ["Check the word limit before you write.", "Look at the words after the gap: do you need a noun, verb or adjective?", "Copy the words exactly from the passage."], "Writing three words when the limit is two = wrong, even if the meaning is right.", "শব্দসীমা কঠোরভাবে মানুন।"],
  ["Summary, note, table & flow-chart completion", true, ["Find which part of the passage the summary covers — usually one section, not the whole text.", "Predict the word class for each gap.", "With a word box, expect synonyms, not the passage's exact words.", "Without a box, copy spelling exactly and don't change word forms."], "Check singular or plural from the grammar around the gap.", "Summary সাধারণত passage-এর একটি অংশ নিয়ে হয়।"],
  ["Diagram label completion", true, ["The answers usually come from one technical paragraph.", "Follow the order in which the parts are described.", "Copy the labels exactly."], "Don't describe the part — name it with words from the passage.", "অনুচ্ছেদে অংশগুলো যে ক্রমে বর্ণিত, সেটাই সূত্র।"],
  ["Short-answer questions", true, ["The question word tells you the answer type: who, when, how many, what.", "Don't write full sentences.", "Respect the word limit; numbers can be written as digits."], "Extra words that change nothing can still break the word limit.", "পূর্ণ বাক্য লিখবেন না — শুধু উত্তরটুকু।"],
  ["Multiple choice", true, ["Read the question stem first and find the place in the text.", "Eliminate wrong options rather than hunting for the right one.", "Wrong options are usually: in the passage but not the answer; the opposite; too extreme; or not mentioned at all."], "An option that repeats the passage's exact words is often a trap. The right one usually paraphrases.", "সঠিকটি খোঁজার চেয়ে ভুল তিনটি বাতিল করা সহজ।"]
];

/* FALSE vs NOT GIVEN practice (Band 9 Bangladesh, exercise 3.1). */
window.ROSETTA = {
  text: "The Rosetta Stone was discovered in 1799 by French soldiers rebuilding a fort near the town of Rashid in the Nile delta. Its inscription repeats a single decree in three scripts, and it was this repetition that eventually allowed hieroglyphs to be read. Jean-François Champollion announced his decipherment in 1822, though the English physician Thomas Young had already established the phonetic value of several signs some years earlier. The stone has been held by the British Museum since 1802, and requests for its return have been made periodically by Egyptian officials.",
  items: [
    { q: "The Rosetta Stone was found by soldiers.", a: "TRUE", why: "'discovered … by French soldiers'." },
    { q: "The stone's inscription contains three different texts.", a: "FALSE", why: "It 'repeats a single decree in three scripts' — one text in three writing systems. Script is not the same as text." },
    { q: "Champollion was the first person to make any progress on the script.", a: "FALSE", why: "'Thomas Young had already established … some years earlier', so Champollion was not first." },
    { q: "Thomas Young was a professional linguist.", a: "NOT GIVEN", why: "He is called an 'English physician'. Nothing says whether he was a linguist." },
    { q: "The stone has been in the British Museum for over two centuries.", a: "TRUE", why: "Since 1802 until today is more than 200 years. Simple maths from facts in the text is allowed." },
    { q: "Egypt has formally requested the return of the stone.", a: "TRUE", why: "'requests for its return have been made … by Egyptian officials'." },
    { q: "The British Museum has refused all such requests.", a: "NOT GIVEN", why: "We can guess it, because the stone is still there, but the text never says the museum refused." },
    { q: "The fort was located on the Nile delta.", a: "TRUE", why: "'a fort near the town of Rashid in the Nile delta'." }
  ]
};

window.READ_HABITS = [
  ["Read one long article every day", "No questions, just reading. The Guardian Long Read, BBC Future, Aeon, National Geographic. The first week is hard; by week three it isn't.", "প্রতিদিন একটি দীর্ঘ প্রবন্ধ পড়ুন, প্রশ্ন ছাড়াই।"],
  ["Stop using the dictionary while reading", "Guess meaning from the sentence and keep going. After you finish, look up just five words.", "পড়ার সময় অভিধান নয় — প্রসঙ্গ থেকে অর্থ আন্দাজ করুন।"],
  ["Analyse mistakes, not scores", "Label each mistake: (a) couldn't find the place, (b) found it but misunderstood, (c) ran out of time. Fix with scanning practice, vocabulary, or timed practice.", "প্রতিটি ভুলের কারণ লিখুন — জায়গা পাইনি, ভুল বুঝেছি, না সময় ফুরিয়েছে।"],
  ["Keep a paraphrase notebook", "Write the question's words next to the passage's words. After 200 pairs you'll recognise half the language of the test.", "প্রশ্নের শব্দ আর passage-এর শব্দ পাশাপাশি লিখে রাখুন।"]
];

window.PARAPHRASES = [
  ["by accident", "without intention", "Reading the Ocean"],
  ["virtually none", "rarely", "Reading the Ocean"],
  ["controversial at home", "criticised on Satawal", "Reading the Ocean"],
  ["get rid of", "remove", "Sundarbans lecture"],
  ["doubled", "twice as many", "TFNG trainer"],
  ["complement, rather than replace", "work alongside", "Farming Upwards"],
  ["a share of the Nobel Prize", "not on his own", "The Language of Bees"],
  ["created a large domestic market", "increased demand within the country", "The Golden Fibre"]
];

window.READ_SOURCES = [
  ["The Guardian · The Long Read", "Deep stories on society, science and culture", "https://www.theguardian.com/news/series/the-long-read"],
  ["BBC Future", "Science, health and technology explained clearly", "https://www.bbc.com/future"],
  ["Aeon", "Essays on ideas, psychology and history — very Passage 3", "https://aeon.co"],
  ["National Geographic", "Nature, environment and exploration", "https://www.nationalgeographic.com"]
];

/* Scan race: find the word fast. [passage id, paragraph letter, what to find, answer word] */
window.SCAN_ITEMS = [
  ["rp1", "A", "a percentage", "80"],
  ["rp1", "C", "a Scottish city", "Dundee"],
  ["rp2", "E", "a year", "2019"],
  ["rp2", "F", "the length of a short nap", "twenty"],
  ["rp3", "E", "a country with cheap electricity", "Iceland"],
  ["rp3", "F", "a percentage target", "30"],
  ["rp4", "B", "the historian's surname", "Sharp"],
  ["rp4", "D", "the island Piailug came from", "Satawal"],
  ["rp5", "A", "the scientist's nationality", "Austrian"],
  ["rp5", "C", "an angle in degrees", "60"],
  ["rp5", "E", "a year", "2005"],
  ["rp4", "C", "the first name of the computer team's leader", "Michael"]
];
