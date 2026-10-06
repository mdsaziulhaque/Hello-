/* Tips, tricks and reference tables (much of it from your Band 9 Bangladesh course). */
window.EXAM_FACTS = [
  ["Listening", "~30 min", "40 questions · 4 parts · heard once"],
  ["Reading", "60 min", "40 questions · 3 passages"],
  ["Writing", "60 min", "Task 1 (150 words) + Task 2 (250 words)"],
  ["Speaking", "11–14 min", "3 parts · face to face"]
];

/* Indicative raw score → band (Listening, Academic Reading, GT Reading). */
window.RAW_BANDS = [
  [9.0, 39, 39, 40], [8.5, 37, 37, 39], [8.0, 35, 35, 37], [7.5, 32, 33, 36], [7.0, 30, 30, 34],
  [6.5, 26, 27, 32], [6.0, 23, 23, 30], [5.5, 18, 19, 27], [5.0, 16, 15, 23], [4.5, 13, 13, 19], [4.0, 11, 10, 15]
];

window.BANGLA_ERRORS = [
  ["My all friends", "All my friends", "বাংলায় 'আমার সব বন্ধু' — ক্রম উল্টো"],
  ["He told me that he will come.", "He told me that he would come.", "বাংলায় কালের সমন্বয় (backshift) হয় না"],
  ["I am living in Dhaka since 5 years.", "I have been living in Dhaka for five years.", "since/for ভুল + কাল ভুল"],
  ["Give me one glass water.", "Give me a glass of water.", "'এক গ্লাস পানি' — ইংরেজিতে of লাগে"],
  ["I am having a headache.", "I have a headache.", "অবস্থাবাচক ক্রিয়া continuous হয় না"],
  ["Do the needful.", "Please take the necessary action.", "আঞ্চলিক প্রশাসনিক ইংরেজি"],
  ["Yesterday night", "Last night", "'গতকাল রাতে' থেকে সরাসরি অনুবাদ"],
  ["Passing out from university", "Graduating from university", "'pass out' মানে জ্ঞান হারানো"],
  ["I did not knew.", "I did not know.", "did-এর পরে base form"],
  ["Cousin brother / cousin sister", "Cousin", "ইংরেজিতে cousin লিঙ্গনিরপেক্ষ"],
  ["Myself Rahim.", "My name is Rahim. / I'm Rahim.", "পরিচয়ের এই ছাঁচ ইংরেজিতে নেই"],
  ["What is your good name?", "What's your name?", "উপমহাদেশীয় রূপ; IELTS-এ অস্বাভাবিক"]
];

window.EXAM_DAY = [
  ["The night before", "Pack your passport (the same one you registered with), a clear water bottle, and pencils if you take the paper test. Sleep at least 7 hours.", "আগের রাতে পাসপোর্ট গুছিয়ে রাখুন, ৭ ঘণ্টা ঘুমান।"],
  ["Arrive early", "Be at the centre at least 30–45 minutes before the start. Late arrivals may not be allowed in.", "অন্তত ৩০–৪৫ মিনিট আগে কেন্দ্রে পৌঁছান।"],
  ["Warm up your English", "Listen to 10 minutes of English (a podcast or BBC news) on the way. Think in English.", "যাওয়ার পথে ১০ মিনিট ইংরেজি শুনুন।"],
  ["Listening → Reading → Writing", "There is no break between them. Use the bathroom before you go in.", "তিনটি অংশের মাঝে বিরতি নেই।"],
  ["Watch the clock", "In Reading, give 20 minutes per passage. In Writing, 20 minutes for Task 1, 40 for Task 2.", "ঘড়ি দেখে সময় ভাগ করুন।"],
  ["Speaking: smile and relax", "The examiner is not trying to trick you. Treat it as a friendly conversation.", "Speaking-এ স্বাভাবিক থাকুন — এটা একটা আলাপ।"]
];

window.MYTHS = [
  ["Big words = high band", "Precise, natural words score higher. A rare word used wrongly lowers your score.", "কঠিন শব্দ মানেই বেশি নম্বর নয়।"],
  ["A British accent is needed", "Pronunciation is about being clear, not about accent. Work on stress and individual sounds.", "ব্রিটিশ উচ্চারণ লাগে না — স্পষ্টতা লাগে।"],
  ["Longer essays score more", "After about 300 words, more words usually mean more mistakes, not a higher band.", "লম্বা লেখা মানেই বেশি নম্বর নয়।"],
  ["Memorised answers work", "Examiners are trained to spot them, and they reduce your score.", "মুখস্থ উত্তর ধরা পড়ে যায়।"],
  ["Using many linkers is good", "Over-using 'Moreover, Furthermore, Additionally' sounds mechanical. Connect ideas through meaning.", "অতিরিক্ত linker যান্ত্রিক শোনায়।"]
];

window.STUDY_PLANS = {
  "30": [["Week 1", "Test format + diagnostic test. Grammar repair: articles, tenses."], ["Week 2", "Listening and Reading by question type, 1 hour each daily."], ["Week 3", "Writing Task 1 + Task 2: one essay a day, checked against the band checklist."], ["Week 4", "Speaking daily recordings + 2 full mock tests + error log review."]],
  "60": [["Weeks 1–2", "Foundations: grammar, 10 new words a day, test format."], ["Weeks 3–4", "Listening & Reading by question type."], ["Weeks 5–6", "Writing: Task 1 types, then Task 2 types."], ["Week 7", "Speaking + pronunciation (shadowing every day)."], ["Week 8", "Mock tests twice a week, fix weakest skill."]],
  "90": [["Weeks 1–2", "Test structure + grammar repair."], ["Weeks 3–4", "Listening & Reading question types."], ["Weeks 5–7", "Writing Task 1 and Task 2 with model answers."], ["Weeks 8–9", "Speaking: 15 minutes of recording daily + pronunciation."], ["Weeks 10–11", "Vocabulary building + 2 full mock tests a week."], ["Week 12", "Repair weakest skill, error log revision, exam-day prep."]]
};

/* Links to the IELTS study files you already made with Claude. */
window.MY_LIBRARY = [
  ["Band 9 Bangladesh", "Complete IELTS course explained in Bangla, 13 chapters", "https://claude.ai/artifact/32RfVZEigdzYQhwXqNg9Vh"],
  ["Listen for the Answer · Audio", "97 listening tracks: chapter drills and 8 practice tests", "https://claude.ai/artifact/G4sTarRBfLu5zCnj5fmG1s"],
  ["Speak to Band 7+", "Speaking book blueprint and project index", "https://claude.ai/artifact/FCsa1CzjUsTXHMeU5V7htD"],
  ["Write to Band 7+ · Batch 1", "Front matter, diagnostic test, Part I", "https://claude.ai/artifact/4NHDmRiyMpGQ5Prmzhbbrd"],
  ["Write to Band 7+ · Task 1 Masterclass", "Chapters 15–30", "https://claude.ai/artifact/WcPxUXrbByuysJZo98bsCz"],
  ["Write to Band 7+ · Task 2 Masterclass", "Chapters 31–44", "https://claude.ai/artifact/B4DD9HrkjigdBmtPY2uVhB"],
  ["Write to Band 7+ · Vocabulary, Cohesion, Ideas", "Chapters 59–73", "https://claude.ai/artifact/MyezxwpYoVZGsbEf7iFXHq"],
  ["Write to Band 7+ · Model Answer Library", "Chapters 82–83", "https://claude.ai/artifact/QjmisohmnmywvdSZjCT3iD"]
];
