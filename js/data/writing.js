/* Writing data. Charts are drawn by app.js from these numbers (illustrative figures for practice). */
window.TASK1 = [
  {
    id: "t1-line", kind: "line", title: "Line graph · Internet users",
    prompt: "The graph below shows the percentage of the population using the internet in Bangladesh, Malaysia and Thailand between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart: { x: ["2000", "2005", "2010", "2015", "2020"], unit: "%", max: 100,
      series: [ { name: "Malaysia", v: [21, 49, 56, 71, 90] }, { name: "Thailand", v: [4, 15, 22, 39, 78] }, { name: "Bangladesh", v: [0, 1, 4, 14, 25] } ] },
    features: ["All three rose", "Malaysia highest throughout", "Thailand's sharp jump after 2015", "Bangladesh slowest, still under a third of Malaysia"],
    model: [
      "The line graph compares the percentage of the population using the internet in Bangladesh, Malaysia and Thailand between 2000 and 2020.",
      "<span class='link'>Overall</span>, internet use rose in all three countries. Malaysia had the highest proportion of users throughout the period, while Bangladesh lagged far behind, <span class='link'>although</span> Thailand <span class='lex'>narrowed the gap</span> with Malaysia considerably in the final five years.",
      "In 2000, around a fifth of Malaysians (21%) used the internet, compared with just 4% in Thailand and almost none in Bangladesh. Malaysia's figure more than doubled to 49% by 2005 and continued to <span class='lex'>climb steadily</span>, reaching 90% by 2020.",
      "Thailand's growth was slower at first, rising to 22% in 2010. <span class='link'>After that, however</span>, the figure <span class='lex'>accelerated sharply</span>, almost doubling to 39% in 2015 and then doubling again to 78% by the end of the period.",
      "Bangladesh showed the most <span class='lex'>gradual increase</span>. Internet use remained below 5% until 2010, before rising to 14% in 2015 and 25% in 2020, still less than a third of the Malaysian figure."
    ]
  },
  {
    id: "t1-bar", kind: "bar", title: "Bar chart · Teenagers' free time",
    prompt: "The chart below shows the average number of hours per week that teenagers in one country spent on four leisure activities in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart: { x: ["Social media", "Television", "Sport", "Reading"], unit: "hours", max: 20,
      series: [ { name: "2010", v: [6, 14, 7, 5] }, { name: "2020", v: [18, 8, 5, 3] } ] },
    features: ["Social media overtook TV", "Social media tripled", "Everything else fell", "Reading lowest both years"],
    model: [
      "The bar chart illustrates how many hours per week teenagers spent on four leisure activities in 2010 and 2020.",
      "<span class='link'>Overall</span>, social media replaced television as the most time-consuming activity, <span class='link'>while</span> the time spent on all the other activities fell.",
      "In 2010, teenagers spent the most time watching television, at 14 hours a week. This was double the time they <span class='lex'>devoted to</span> sport (7 hours) and more than twice the figure for social media (6 hours). Reading <span class='lex'>accounted for</span> the least time, at only 5 hours.",
      "By 2020, the picture had changed dramatically. Time on social media <span class='lex'>tripled</span> to 18 hours, making it <span class='lex'>by far</span> the most popular pastime. Television viewing, <span class='link'>by contrast</span>, dropped to 8 hours, a fall of more than 40%. Sport and reading also declined, falling by 2 hours each to 5 and 3 hours <span class='lex'>respectively</span>, so reading remained the least common activity."
    ]
  },
  {
    id: "t1-pie", kind: "pie", title: "Pie charts · Electricity sources",
    prompt: "The pie charts below show the sources of electricity generation in one country in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart: { parts: ["Coal", "Gas", "Oil", "Renewables"], years: [ { name: "2000", v: [45, 30, 15, 10] }, { name: "2020", v: [25, 35, 5, 35] } ] },
    features: ["Shift away from coal and oil", "Renewables more than tripled", "Gas and renewables joint largest by 2020"],
    model: [
      "The pie charts compare the sources of electricity generation in one country in 2000 and 2020.",
      "<span class='link'>Overall</span>, the country moved away from coal and oil towards renewable energy, which had become the joint largest source, alongside gas, by 2020.",
      "In 2000, coal was the <span class='lex'>dominant</span> source, producing 45% of electricity, followed by gas at 30%. Oil and renewables played a much smaller role, <span class='lex'>accounting for</span> 15% and 10% <span class='lex'>respectively</span>.",
      "Twenty years later, the share of coal had fallen by 20 <span class='lex'>percentage points</span> to a quarter, and oil had dropped to just 5%. <span class='link'>In contrast</span>, renewables more than tripled their share, rising from 10% to 35%. Gas also grew slightly, from 30% to 35%, <span class='link'>meaning that</span> gas and renewables together generated 70% of the country's electricity in 2020."
    ]
  },
  {
    id: "t1-process", kind: "process", title: "Process · Recycling glass bottles",
    prompt: "The diagram below shows how glass bottles are recycled. Summarise the information by selecting and reporting the main features.",
    chart: { steps: [ ["Collected", "bottle banks"], ["Sorted", "by colour"], ["Crushed", "into cullet"], ["Melted", "1,500°C + sand"], ["Moulded", "new bottles"], ["Filled & sold", "to shops"] ] },
    features: ["Cyclical: six stages", "Passive voice for every stage", "Sequence words: first, next, subsequently, finally"],
    model: [
      "The diagram illustrates how used glass bottles are recycled to make new ones.",
      "<span class='link'>Overall</span>, the process is <span class='lex'>cyclical</span> and consists of six main stages, beginning with collection and ending with new bottles returning to shops and homes.",
      "<span class='link'>First</span>, used bottles <span class='lex'>are collected</span> from bottle banks and taken to a recycling plant. There, they <span class='lex'>are sorted</span> by colour into clear, green and brown glass, and any lids or labels are removed. The sorted glass <span class='link'>is then</span> crushed into small pieces called cullet.",
      "<span class='link'>Next</span>, the cullet is mixed with raw materials such as sand and limestone and <span class='lex'>melted</span> in a furnace at around 1,500°C. The molten glass is <span class='link'>subsequently</span> moulded into new bottles, which are cooled and checked for faults.",
      "<span class='link'>Finally</span>, the new bottles are filled with drinks and delivered to shops, where they are bought by consumers. Once empty, they can be returned to a bottle bank, and the cycle begins again."
    ]
  },
  {
    id: "t1-map", kind: "map", title: "Maps · Riverside village",
    prompt: "The maps below show the village of Riverside in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart: {},
    features: ["Pier → marina", "Shops → car park", "Farmland → housing", "New bridge", "School unchanged"],
    model: [
      "The maps show how the village of Riverside changed between 2000 and 2020.",
      "<span class='link'>Overall</span>, the village became more developed, with facilities for tourism and new housing replacing older buildings and open land. Only the school <span class='lex'>remained unchanged</span>.",
      "In 2000, a small wooden pier stood on the river to the north of the village. By 2020, this <span class='lex'>had been replaced by</span> a large marina with moorings for boats. In the centre of the village, the row of shops <span class='lex'>was demolished to make way for</span> a car park, presumably to serve visitors to the marina.",
      "The most significant change occurred in the east, where the farmland <span class='lex'>was converted into</span> a housing estate. <span class='link'>In addition</span>, a new bridge was built across the river, linking the village to the north bank for the first time. The school in the west of the village, <span class='link'>however</span>, was not affected."
    ]
  }
];

window.TASK2 = [
  {
    id: "t2-opinion", type: "Opinion (agree / disagree)",
    prompt: "Some people believe that university education should be free for everyone. To what extent do you agree or disagree?",
    plan: ["Intro: paraphrase + clear position (partly disagree)", "Body 1: the benefits of free education (concede)", "Body 2: cost to taxpayers + quality problems (main argument)", "Body 3: a better alternative — targeted support", "Conclusion: restate position"],
    model: [
      "In many countries, students graduate with large debts, and this has led to calls for university education to be provided free of charge. While I accept that free tuition would widen access, I believe that a fully free system is neither affordable nor fair, and that targeted support is a better solution.",
      "<span class='link'>Admittedly</span>, removing fees would bring clear benefits. Talented young people from low-income families are often discouraged from applying because of the cost, and society loses the doctors, engineers and teachers they might have become. Free education would also reduce the stress of debt, allowing graduates to choose careers based on interest rather than salary. Countries such as Germany have shown that tuition-free systems can function successfully.",
      "<span class='link'>However</span>, universities are expensive to run, and if students do not pay, the <span class='lex'>burden</span> falls on all taxpayers, including the many who never attend university. It seems unjust that a factory worker should pay for the degree of someone who will later earn far more. <span class='link'>Moreover</span>, when governments fund every place, they often limit student numbers or cut spending per student, which can lower the quality of teaching. In Bangladesh, for example, public universities are <span class='lex'>heavily subsidised</span> but face severe overcrowding and limited resources.",
      "A more balanced approach would be to provide free tuition and living grants to students from poorer backgrounds, while others pay fees through loans that are repaid only once their income reaches a certain level. This would protect access without placing an unreasonable cost on the public.",
      "<span class='link'>In conclusion</span>, although free university education is an attractive idea, I believe that <span class='lex'>means-tested</span> support is a fairer and more sustainable way of ensuring that no capable student is excluded."
    ]
  },
  {
    id: "t2-discuss", type: "Discussion (both views + opinion)",
    prompt: "Some people think children should start learning a foreign language at primary school, while others believe they should begin in secondary school. Discuss both views and give your own opinion.",
    plan: ["Intro: both views + your opinion (primary)", "Body 1: arguments for starting later", "Body 2: arguments for starting early (your side)", "Body 3: your view + condition", "Conclusion"],
    model: [
      "Learning a foreign language is now considered essential, but there is disagreement about the best age to start. While some argue that children should begin at secondary school, I agree with those who believe that primary school is the ideal time.",
      "Those who favour a later start make several reasonable points. Young children are still developing literacy in their first language, and adding a second language too early could confuse them. <span class='link'>In addition</span>, primary schools in many countries lack teachers who speak a foreign language well, and poor teaching may do more harm than good. Older students, <span class='link'>by contrast</span>, can understand grammar rules and study more independently, so they may learn faster in a shorter time.",
      "<span class='link'>On the other hand</span>, there is strong evidence that early learners develop better pronunciation and greater confidence. Young children are less afraid of making mistakes, and they <span class='lex'>absorb</span> new sounds through songs, games and stories in a way that teenagers often cannot. Starting early also gives students more years of <span class='lex'>exposure</span>, which is perhaps the single most important factor in reaching a high level.",
      "In my view, the advantages of an early start <span class='lex'>outweigh</span> the drawbacks, <span class='link'>provided that</span> lessons are taught by qualified teachers and focus on speaking and listening rather than formal grammar. The concern about teacher shortages is real, but it is an argument for investing in training, not for delaying learning.",
      "<span class='link'>In conclusion</span>, although older learners may progress quickly, I believe that introducing foreign languages in primary school gives children the best foundation for long-term success."
    ]
  },
  {
    id: "t2-problem", type: "Problem & solution",
    prompt: "In many cities, traffic congestion is becoming a serious problem. What are the causes of this problem, and what measures could be taken to solve it?",
    plan: ["Intro: paraphrase + outline", "Body 1: three causes (cars, roads, public transport)", "Body 2: three solutions matched to the causes", "Conclusion: summary"],
    model: [
      "Traffic congestion has become a daily reality in many of the world's cities, from Dhaka to Los Angeles. This essay will examine the main causes of this problem and suggest some practical measures that could reduce it.",
      "The most obvious cause is the rapid increase in the number of private vehicles. As incomes rise, more families can afford cars, and car ownership is often seen as a sign of status. <span class='link'>At the same time</span>, many cities have grown faster than their road networks, so roads designed for thousands of vehicles now carry hundreds of thousands. A further cause is poor public transport: when buses are crowded, slow and unreliable, people who can afford alternatives naturally choose to drive.",
      "Several measures could address these causes. <span class='link'>Firstly</span>, governments should invest in fast, affordable <span class='lex'>mass transit</span>. The Dhaka Metro Rail, for example, has shown that a reliable train service can attract commuters who previously travelled by car or rickshaw. <span class='link'>Secondly</span>, authorities could introduce <span class='lex'>congestion charges</span>, as London and Singapore have done, requiring drivers to pay to enter the city centre at peak times. This discourages unnecessary journeys and raises money for public transport. <span class='link'>Finally</span>, better urban planning, such as locating offices, schools and housing closer together, would reduce the distance people need to travel in the first place.",
      "<span class='link'>In conclusion</span>, traffic congestion is mainly caused by growing car ownership, inadequate roads and weak public transport. A combination of investment in mass transit, financial <span class='lex'>disincentives</span> for drivers and smarter planning offers the best chance of keeping cities moving."
    ]
  },
  {
    id: "t2-advdis", type: "Advantages & disadvantages",
    prompt: "More and more people are working from home. Do the advantages of this trend outweigh the disadvantages?",
    plan: ["Intro: paraphrase + answer the question directly (yes, for most workers)", "Body 1: disadvantages — isolation, blurred work/home boundaries, weaker teamwork", "Body 2: advantages — no commute, flexibility, wider talent pool, lower costs (stronger)", "Conclusion: advantages outweigh, if companies plan regular in-person days"],
    model: null
  },
  {
    id: "t2-twopart", type: "Two-part question",
    prompt: "Many young people now spend more time on social media than with their families. Why is this happening? Is it a positive or negative development?",
    plan: ["Intro: paraphrase + short answer to both questions", "Body 1: reasons — smartphones everywhere, peer pressure, apps designed to be addictive, parents also busy", "Body 2: mainly negative — weaker family bonds, sleep, mental health; one positive (staying in touch with relatives abroad)", "Conclusion: answer both questions again"],
    model: null
  }
];

/* Same idea, two bands. */
window.BAND_COMPARE = {
  topic: "Children and technology",
  low: "Nowadays, technology plays a very important role in children's lives. Many children spend a lot of time on phones and computers, and this can be bad for them. For example, they do not play outside as much as before, so they may become overweight. Also, they talk less with their family members because they are always on the internet. Therefore, parents should control how much time their children use technology.",
  high: "Excessive screen time can have a detrimental impact on children's physical and social development. When hours that were once spent playing outdoors are replaced by gaming or scrolling, children become more sedentary, which is a major factor in the rise of childhood obesity. Equally concerning is the effect on family relationships: a child who is absorbed in a device during meals misses the everyday conversations through which social skills are formed. For this reason, it is reasonable for parents to set clear limits, such as keeping phones out of bedrooms at night.",
  notes: [
    ["Topic sentence", "Band 6 opens with a general statement ('Nowadays…'). Band 8 states the paragraph's argument in the first sentence."],
    ["Vocabulary", "'very important', 'a lot of', 'bad' become 'detrimental impact', 'sedentary', 'absorbed in'. Precise, not fancy."],
    ["Explanation", "Band 6 lists effects. Band 8 explains HOW one thing leads to another (screen time → sedentary → obesity)."],
    ["Grammar", "Band 8 uses relative clauses ('which is…', 'through which…') and a passive naturally."],
    ["Linking", "Fewer mechanical linkers ('Also', 'Therefore'). Ideas connect through meaning ('Equally concerning is…')."],
    ["Example", "A specific, realistic suggestion ('keeping phones out of bedrooms') instead of a vague 'control the time'."]
  ]
};

window.T2_PROMPTS = [
  "Some people think that the best way to reduce crime is to give longer prison sentences. Others believe there are better ways. Discuss both views and give your opinion.",
  "Many people believe that social media has had a negative impact on society. To what extent do you agree or disagree?",
  "In some countries, young people are encouraged to work or travel for a year between finishing school and starting university. Discuss the advantages and disadvantages.",
  "Governments should spend more money on public transport than on building new roads. To what extent do you agree or disagree?",
  "The number of people living alone is increasing. What are the reasons for this, and is it a positive or negative development?",
  "Some people say that museums and art galleries should be free. Others think visitors should pay. Discuss both views and give your opinion.",
  "Climate change is the biggest problem facing the world today. What can individuals and governments do to tackle it?",
  "Children today spend too much time indoors. What are the causes, and what can be done about it?",
  "It is more important for schools to teach practical skills than academic subjects. To what extent do you agree or disagree?",
  "Many skilled workers move from developing countries to developed countries. What problems does this cause, and what solutions can you suggest?",
  "Online shopping is replacing shopping in stores. Do the advantages of this trend outweigh the disadvantages?",
  "Some people believe that unpaid community service should be a compulsory part of high school. To what extent do you agree or disagree?",
  "Tourism brings many benefits to a country, but it also causes problems. Discuss both views and give your opinion.",
  "Fast food is becoming more popular, and many people are worried about its effects on health. Why is this, and what can be done?",
  "Artificial intelligence will soon replace many jobs. Is this a positive or negative development?",
  "Rich countries should give financial aid to poorer countries. To what extent do you agree or disagree?"
];

window.LINKERS = [
  { fn: "Adding", w: ["In addition", "Moreover", "Furthermore", "Not only… but also", "Equally important"] },
  { fn: "Contrasting", w: ["However", "In contrast", "On the other hand", "Whereas", "Nevertheless", "Admittedly"] },
  { fn: "Cause & effect", w: ["As a result", "Consequently", "This leads to", "Owing to", "This means that"] },
  { fn: "Examples", w: ["For example", "For instance", "such as", "A case in point is", "This is illustrated by"] },
  { fn: "Conditions", w: ["provided that", "as long as", "unless", "If this happens,"] },
  { fn: "Concluding", w: ["In conclusion", "To sum up", "Overall (Task 1)", "On balance"] }
];

/* Words the essay checker flags as weak or informal. */
window.WEAK_WORDS = {
  "very": "Pick a stronger adjective (very big → enormous).",
  "a lot of": "Use 'a great deal of' / 'a substantial number of'.",
  "lots of": "Too informal for Writing.",
  "good": "Try beneficial, positive, effective.",
  "bad": "Try harmful, detrimental, damaging.",
  "thing": "Name the exact noun.",
  "things": "Name the exact nouns.",
  "big": "Try substantial, considerable, significant.",
  "get": "Try obtain, gain, receive, achieve.",
  "nowadays": "Try 'in recent years' or 'currently'.",
  "kids": "Informal: use 'children'.",
  "don't": "Avoid contractions in Writing.",
  "can't": "Avoid contractions in Writing.",
  "won't": "Avoid contractions in Writing.",
  "isn't": "Avoid contractions in Writing.",
  "doesn't": "Avoid contractions in Writing.",
  "etc": "Give a full example instead of 'etc.'",
  "in my opinion i think": "Redundant — choose one."
};

window.WRITE_TIPS = [
  ["Task 2 is worth double", "Task 2 counts for twice as much as Task 1. Spend 40 minutes on it and start with it if you like.", "Task 2-এর নম্বর Task 1-এর দ্বিগুণ — ৪০ মিনিট দিন।"],
  ["Answer every part of the question", "Underline each part of the prompt. Missing one caps Task Response at around Band 5.", "প্রশ্নের প্রতিটি অংশের উত্তর দিন, নইলে ব্যান্ড আটকে যাবে।"],
  ["Plan for 5 minutes", "A clear plan makes your paragraphs logical. Write your position before you start.", "লেখার আগে ৫ মিনিট পরিকল্পনা করুন।"],
  ["One idea per paragraph", "Topic sentence → explanation → example → link back.", "প্রতি অনুচ্ছেদে একটি মূল ভাবনা।"],
  ["Task 1 needs an overview", "No overview = Task Achievement around Band 5. Start it with 'Overall,'.", "Task 1-এ 'Overall' দিয়ে সারসংক্ষেপ না থাকলে ৫-এর বেশি পাওয়া কঠিন।"],
  ["No opinions in Task 1", "Describe the data only. Do not explain causes or give your view.", "Task 1-এ নিজের মত বা কারণ লিখবেন না।"],
  ["Word count matters", "Under 150 / 250 words loses marks. Aim for 170–190 and 260–290.", "শব্দসংখ্যা কম হলে নম্বর কাটা যায়।"],
  ["Precision beats rare words", "A natural collocation ('pose a risk') scores higher than a rare word used wrongly.", "কঠিন শব্দ নয়, সঠিক শব্দই বেশি নম্বর আনে।"],
  ["Check for your own errors", "Save 3 minutes for articles (a/the), plural -s and subject–verb agreement.", "শেষ ৩ মিনিটে a/the, -s, verb মিলিয়ে নিন।"]
];
