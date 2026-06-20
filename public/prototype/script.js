const appState = {
  subject: "math",
  age: "elementary",
  path: null,
  mode: "practice",
  worksheetSize: 20,
  index: 0,
  correct: 0,
  answered: 0,
  practiceRound: 0,
  startedAt: Date.now(),
  parentQuestionId: null,
  parentTestGroupId: null,
  parentQuestionJustCompleted: false
};

const dashboardState = {
  historyDateByChild: {},
  academyStudentSearch: ""
};

const parentQuestionDraft = {
  key: "",
  questions: []
};

const content = {
  math: {
    early: {
      focus: "Counting, shapes, and number sense",
      description: "Trace numbers, match shapes, and practice tiny sums with bright visual support.",
      level: "Level 1",
      mastery: "Math Readiness",
      value: 54,
      questions: [
        { title: "Count the set", prompt: "How many stars would be in this group?", text: "* * * * *", answer: "5", hint: "Point to each star and count out loud." },
        { title: "Find the missing number", prompt: "What number comes next?", text: "1, 2, 3, ?", answer: "4", hint: "Keep counting one more." },
        { title: "Tiny addition", prompt: "Add the numbers.", text: "2 + 1 = ?", answer: "3", hint: "Start at 2, then count one more." }
      ]
    },
    elementary: {
      focus: "Number patterns and mental math",
      description: "Warm up with quick facts, then solve one colorful worksheet path at a calm, steady pace.",
      level: "Level 2",
      mastery: "Math Foundations",
      value: 68,
      questions: [
        { title: "Solve the pattern", prompt: "What number comes next?", text: "6, 12, 18, 24, ?", answer: "30", hint: "Each number grows by 6." },
        { title: "Build fluency", prompt: "Solve mentally.", text: "48 + 27 = ?", answer: "75", hint: "Try 48 + 20, then add 7." },
        { title: "Compare fractions", prompt: "Which is larger?", text: "1/2 or 1/4", answer: "1/2", hint: "Picture a pizza cut into 2 pieces versus 4 pieces." }
      ]
    },
    middle: {
      focus: "Fractions, ratios, and pre-algebra",
      description: "Use examples, visual bars, and short mastery checks to strengthen flexible problem solving.",
      level: "Level 3",
      mastery: "Pre-Algebra",
      value: 72,
      questions: [
        { title: "Solve for x", prompt: "Find the value of x.", text: "3x + 5 = 20", answer: "5", hint: "Subtract 5 first, then divide by 3." },
        { title: "Ratio reasoning", prompt: "Simplify the ratio.", text: "12:18", answer: "2:3", hint: "Divide both sides by 6." },
        { title: "Fraction product", prompt: "Multiply.", text: "2/3 x 9 = ?", answer: "6", hint: "9 divided by 3 is 3, then multiply by 2." }
      ]
    },
    teen: {
      focus: "Algebra, functions, and applied math",
      description: "Practice concise reasoning, multi-step equations, and real-world math fluency.",
      level: "Level 4",
      mastery: "Algebra Growth",
      value: 76,
      questions: [
        { title: "Linear slope", prompt: "Find the slope.", text: "(2, 5) and (6, 13)", answer: "2", hint: "Change in y is 8, change in x is 4." },
        { title: "Quadratic roots", prompt: "Solve for x.", text: "x^2 - 9 = 0", answer: "3,-3", hint: "Which numbers square to 9?" },
        { title: "Percent change", prompt: "A price rises from 40 to 50. What is the percent increase?", text: "40 to 50", answer: "25%", hint: "The increase is 10, and 10 is one fourth of 40." }
      ]
    }
  },
  english: {
    early: {
      focus: "Letters, sounds, and first words",
      description: "Practice phonics, rhymes, and picture-word matching through short daily rounds.",
      level: "Level 1",
      mastery: "Reading Readiness",
      value: 58,
      questions: [
        { title: "Beginning sound", prompt: "What letter starts this word?", text: "sun", answer: "s", hint: "Say the first sound slowly." },
        { title: "Rhyme match", prompt: "Which word rhymes with cat?", text: "hat or dog", answer: "hat", hint: "Listen for the same ending sound." },
        { title: "Sight word", prompt: "Type the word shown.", text: "the", answer: "the", hint: "This tiny word appears in many books." }
      ]
    },
    elementary: {
      focus: "Vocabulary, grammar, and reading fluency",
      description: "Build sentence confidence with short reading tasks, word work, and guided writing.",
      level: "Level 2",
      mastery: "Language Foundations",
      value: 64,
      questions: [
        { title: "Choose the synonym", prompt: "Which word means almost the same as happy?", text: "joyful, sleepy, tiny", answer: "joyful", hint: "Think of a word that means full of joy." },
        { title: "Grammar check", prompt: "Pick the verb.", text: "Maya jumps high.", answer: "jumps", hint: "The verb is the action." },
        { title: "Complete the sentence", prompt: "Type the best word.", text: "The kite flew ___ the trees.", answer: "above", hint: "The kite is higher than the trees." }
      ]
    },
    middle: {
      focus: "Comprehension, grammar, and paragraph craft",
      description: "Strengthen reading evidence, sentence variety, and clear academic writing habits.",
      level: "Level 3",
      mastery: "Reading Power",
      value: 70,
      questions: [
        { title: "Find the theme", prompt: "What is the theme of this sentence?", text: "Lena practiced daily until the song felt easy.", answer: "perseverance", hint: "What life lesson does Lena show?" },
        { title: "Identify the phrase", prompt: "What type of phrase is underlined?", text: "The book on the shelf is mine.", answer: "prepositional", hint: "It starts with a location word." },
        { title: "Transition choice", prompt: "Choose a contrast transition.", text: "however, also, because", answer: "however", hint: "A contrast shows a turn in the idea." }
      ]
    },
    teen: {
      focus: "Analysis, rhetoric, and polished writing",
      description: "Practice precise language, evidence-based responses, and confident editing.",
      level: "Level 4",
      mastery: "Advanced English",
      value: 74,
      questions: [
        { title: "Rhetorical appeal", prompt: "Which appeal uses emotion?", text: "ethos, pathos, logos", answer: "pathos", hint: "Emotion connects to feeling." },
        { title: "Concise revision", prompt: "Replace the phrase with one word.", text: "in spite of the fact that", answer: "although", hint: "A single contrast word works here." },
        { title: "Tone word", prompt: "Name the tone.", text: "The plan was ambitious but possible.", answer: "optimistic", hint: "The sentence sounds hopeful." }
      ]
    }
  }
};

const skills = {
  math: [
    { key: "facts", icon: "?", title: "Mixed Math Practice", text: "Randomized math from operations, geometry, fractions, and algebra.", color: "#ff6b6b" },
    { key: "numberSense", icon: "123", title: "Number Sense", text: "Place value, comparing, rounding, and number patterns.", color: "#4cc9f0" },
    { key: "decimals", icon: ".5", title: "Decimals", text: "Decimal place value, operations, and comparisons.", color: "#f77f00" },
    { key: "percents", icon: "%", title: "Percents", text: "Percent of a number, discounts, and percent change.", color: "#06d6a0" },
    { key: "ratios", icon: "2:3", title: "Ratios", text: "Ratios, rates, proportions, and scaling.", color: "#ef476f" },
    { key: "measurement", icon: "in", title: "Measurement", text: "Time, money, units, conversions, and real-world measures.", color: "#118ab2" },
    { key: "wordProblems", icon: "?", title: "Word Problems", text: "Real-world mixed problem solving with careful reading.", color: "#ffd166" },
    { key: "dataGraphs", icon: "bar", title: "Data & Graphs", text: "Graphs, tables, averages, range, and probability.", color: "#8338ec" },
    { key: "shapes", icon: "D", title: "Shapes + Space", text: "Visual geometry puzzles for early and advanced learners.", color: "#50d890" },
    { key: "fractions", icon: "1/2", title: "Fractions", text: "Bars, number lines, and step-by-step fraction practice.", color: "#8e62dc" },
    { key: "algebra", icon: "x", title: "Algebra Path", text: "Equation practice that gradually increases independence.", color: "#2f327d" }
  ],
  english: [
    { key: "phonics", icon: "Aa", title: "Phonics", text: "Letter sounds, blends, and early decoding practice.", color: "#ff6b6b" },
    { key: "vocabulary", icon: "V", title: "Vocabulary", text: "Word meanings, synonyms, antonyms, roots, and context clues.", color: "#4cc9f0" },
    { key: "spelling", icon: "abc", title: "Spelling", text: "Patterns, word parts, tricky words, and editing for spelling.", color: "#f77f00" },
    { key: "reading", icon: "Q", title: "Reading", text: "Short passages with comprehension checks.", color: "#50d890" },
    { key: "comprehension", icon: "?", title: "Comprehension", text: "Main idea, details, inference, theme, and evidence.", color: "#06d6a0" },
    { key: "grammar", icon: "P", title: "Grammar", text: "Parts of speech, sentence structure, and editing.", color: "#8e62dc" },
    { key: "partsOfSpeech", icon: "N", title: "Parts of Speech", text: "Nouns, verbs, adjectives, adverbs, pronouns, and more.", color: "#ef476f" },
    { key: "punctuation", icon: "?!", title: "Punctuation", text: "End marks, commas, apostrophes, quotation marks, and semicolons.", color: "#118ab2" },
    { key: "sentenceStructure", icon: "S", title: "Sentence Structure", text: "Complete sentences, clauses, fragments, run-ons, and clarity.", color: "#ffd166" },
    { key: "writing", icon: "W", title: "Writing", text: "Paragraph planning, revision, and vocabulary growth.", color: "#2f327d" }
  ],
  fun: [
    { key: "generalKnowledge", icon: "GK", title: "General Knowledge", text: "Everyday facts, culture, inventions, and world knowledge.", color: "#ff6b6b" },
    { key: "flags", icon: "flag", title: "Country Flags", text: "Identify flags, countries, capitals, and landmarks.", color: "#4cc9f0" },
    { key: "geography", icon: "map", title: "Geography", text: "Continents, oceans, maps, capitals, and landforms.", color: "#06d6a0" },
    { key: "animalsScience", icon: "sci", title: "Animals & Science", text: "Animals, habitats, planets, weather, and basic science.", color: "#f77f00" },
    { key: "logicPuzzles", icon: "!", title: "Logic Puzzles", text: "Patterns, riddles, sequences, and reasoning games.", color: "#8338ec" }
  ]
};

const pathContent = {
  math: {
    facts: {
      focus: "Mixed math practice",
      description: "Randomized questions across operations, number sense, decimals, percents, ratios, measurement, word problems, data, geometry, fractions, and algebra.",
      level: "Mixed Math",
      mastery: "Math Concepts",
      value: 61,
      questions: [
        { title: "Addition burst", prompt: "Solve quickly.", text: "9 + 8 = ?", answer: "17", hint: "Make 10 with 9 + 1, then add 7." },
        { title: "Multiplication burst", prompt: "Solve quickly.", text: "7 x 6 = ?", answer: "42", hint: "Six groups of seven is 42." },
        { title: "Division burst", prompt: "Solve quickly.", text: "56 / 8 = ?", answer: "7", hint: "Think 8 times what number makes 56?" }
      ]
    },
    numberSense: {
      focus: "Number sense path",
      description: "Practice place value, ordering, rounding, and how numbers are built.",
      level: "Number Sense",
      mastery: "Number Reasoning",
      value: 63,
      questions: [
        { title: "Place value", prompt: "What digit is in the tens place?", text: "347", answer: "4", hint: "The tens place is the second digit from the right." },
        { title: "Compare numbers", prompt: "Which number is larger?", text: "608 or 680", answer: "680", hint: "Compare hundreds, then tens." },
        { title: "Round number", prompt: "Round to the nearest ten.", text: "73", answer: "70", hint: "Look at the ones digit." }
      ]
    },
    decimals: {
      focus: "Decimals path",
      description: "Work with tenths, hundredths, decimal operations, and comparisons.",
      level: "Decimals",
      mastery: "Decimal Sense",
      value: 64,
      questions: [
        { title: "Compare decimals", prompt: "Which is larger?", text: "0.7 or 0.4", answer: "0.7", hint: "Compare tenths." },
        { title: "Add decimals", prompt: "Add.", text: "1.2 + 0.5 = ?", answer: "1.7", hint: "Line up the decimal points." },
        { title: "Write decimal", prompt: "Write five tenths as a decimal.", text: "five tenths", answer: "0.5", hint: "Tenths are one place after the decimal." }
      ]
    },
    percents: {
      focus: "Percents path",
      description: "Practice percent of a number, discounts, tips, and percent change.",
      level: "Percents",
      mastery: "Percent Reasoning",
      value: 65,
      questions: [
        { title: "Percent of number", prompt: "Find 10% of 50.", text: "10% of 50", answer: "5", hint: "10% means divide by 10." },
        { title: "Half percent", prompt: "What is 50% of 18?", text: "50% of 18", answer: "9", hint: "50% means half." },
        { title: "Discount", prompt: "A $20 item is 25% off. How much is the discount?", text: "25% of 20", answer: "5", hint: "25% is one fourth." }
      ]
    },
    ratios: {
      focus: "Ratios path",
      description: "Use ratios, rates, unit rates, proportions, and scale relationships.",
      level: "Ratios",
      mastery: "Ratio Reasoning",
      value: 66,
      questions: [
        { title: "Simplify ratio", prompt: "Simplify.", text: "6:9", answer: "2:3", hint: "Divide both parts by 3." },
        { title: "Unit rate", prompt: "Find miles per hour.", text: "120 miles in 3 hours", answer: "40", hint: "Divide miles by hours." },
        { title: "Scale", prompt: "If 2 cups make 6 servings, how many servings do 4 cups make?", text: "2 cups -> 6 servings, 4 cups -> ?", answer: "12", hint: "4 cups is double 2 cups." }
      ]
    },
    measurement: {
      focus: "Measurement path",
      description: "Practice time, money, length, weight, volume, and unit conversions.",
      level: "Measurement",
      mastery: "Measurement Skills",
      value: 62,
      questions: [
        { title: "Time", prompt: "How many minutes are in 1 hour?", text: "1 hour", answer: "60", hint: "One hour is 60 minutes." },
        { title: "Money", prompt: "How many cents are in 3 quarters?", text: "3 quarters", answer: "75", hint: "Each quarter is 25 cents." },
        { title: "Length", prompt: "How many inches are in 2 feet?", text: "2 feet", answer: "24", hint: "Each foot has 12 inches." }
      ]
    },
    wordProblems: {
      focus: "Word problems path",
      description: "Solve real-world problems by choosing the right operation and checking the question.",
      level: "Word Problems",
      mastery: "Problem Solving",
      value: 67,
      questions: [
        { title: "Combine groups", prompt: "A kid has 8 stickers and gets 6 more. How many now?", text: "8 stickers + 6 stickers", answer: "14", hint: "Getting more means add." },
        { title: "Equal groups", prompt: "Four bags have 5 apples each. How many apples?", text: "4 bags, 5 apples each", answer: "20", hint: "Equal groups often mean multiply." },
        { title: "Left over", prompt: "A class has 24 pencils and uses 9. How many are left?", text: "24 pencils, 9 used", answer: "15", hint: "Left means subtract." }
      ]
    },
    dataGraphs: {
      focus: "Data and graphs path",
      description: "Read graphs, compare data, and practice mean, median, mode, range, and probability.",
      level: "Data & Graphs",
      mastery: "Data Reasoning",
      value: 64,
      questions: [
        { title: "Mean", prompt: "Find the mean.", text: "4, 6, 8", answer: "6", hint: "Add the numbers and divide by 3." },
        { title: "Range", prompt: "Find the range.", text: "3, 7, 10, 12", answer: "9", hint: "Subtract smallest from largest." },
        { title: "Mode", prompt: "Find the mode.", text: "2, 5, 5, 7", answer: "5", hint: "The mode appears most often." }
      ]
    },
    shapes: {
      focus: "Shapes and space lab",
      description: "Explore geometry through sides, angles, area, perimeter, and visual reasoning.",
      level: "Geometry",
      mastery: "Spatial Reasoning",
      value: 59,
      questions: [
        { title: "Count the sides", prompt: "How many sides does a hexagon have?", text: "hexagon", answer: "6", hint: "Hex means six." },
        { title: "Find perimeter", prompt: "Add all sides.", text: "4 + 4 + 6 + 6 = ?", answer: "20", hint: "Perimeter is the distance around." },
        { title: "Area check", prompt: "Find the rectangle area.", text: "5 x 3 = ?", answer: "15", hint: "Area is length times width." }
      ]
    },
    fractions: {
      focus: "Fractions path",
      description: "Use bars, parts, and number lines to compare, add, and multiply fractions.",
      level: "Fractions",
      mastery: "Fraction Sense",
      value: 66,
      questions: [
        { title: "Compare fractions", prompt: "Which is larger?", text: "3/4 or 2/4", answer: "3/4", hint: "The denominators match, so compare the top numbers." },
        { title: "Add fractions", prompt: "Add.", text: "1/5 + 2/5 = ?", answer: "3/5", hint: "Keep the denominator and add the numerators." },
        { title: "Simplify", prompt: "Simplify the fraction.", text: "4/8", answer: "1/2", hint: "Divide the top and bottom by 4." }
      ]
    },
    algebra: {
      focus: "Algebra path",
      description: "Practice solving equations, spotting patterns, and using variables with confidence.",
      level: "Algebra",
      mastery: "Equation Skills",
      value: 73,
      questions: [
        { title: "Solve for x", prompt: "Find x.", text: "x + 9 = 17", answer: "8", hint: "Subtract 9 from both sides." },
        { title: "Two-step equation", prompt: "Find x.", text: "2x + 4 = 18", answer: "7", hint: "Subtract 4, then divide by 2." },
        { title: "Pattern rule", prompt: "What is the rule?", text: "3, 6, 9, 12", answer: "add3", hint: "Each term increases by the same amount. Type add3." }
      ]
    }
  },
  english: {
    phonics: {
      focus: "Phonics path",
      description: "Practice sounds, blends, rhymes, and decoding in tiny confidence-building steps.",
      level: "Phonics",
      mastery: "Sound Skills",
      value: 60,
      questions: [
        { title: "Blend sounds", prompt: "What word do these sounds make?", text: "c - a - t", answer: "cat", hint: "Say the sounds faster together." },
        { title: "Ending sound", prompt: "What sound ends this word?", text: "map", answer: "p", hint: "Stretch the word and listen to the last sound." },
        { title: "Rhyme check", prompt: "Which word rhymes with run?", text: "sun or sit", answer: "sun", hint: "Listen for the same ending sound." }
      ]
    },
    vocabulary: {
      focus: "Vocabulary path",
      description: "Build word meaning, context clues, synonyms, antonyms, roots, and academic language.",
      level: "Vocabulary",
      mastery: "Word Meaning",
      value: 66,
      questions: [
        { title: "Synonym", prompt: "Which word means almost the same as happy?", text: "joyful, cold, late", answer: "joyful", hint: "A synonym has a similar meaning." },
        { title: "Antonym", prompt: "Which word means the opposite of tiny?", text: "huge, small, little", answer: "huge", hint: "An antonym means the opposite." },
        { title: "Context clue", prompt: "What does chilly mean?", text: "The chilly wind made Ana zip her coat.", answer: "cold", hint: "The coat clue helps." }
      ]
    },
    spelling: {
      focus: "Spelling path",
      description: "Practice spelling patterns, word parts, tricky words, and proofreading.",
      level: "Spelling",
      mastery: "Word Accuracy",
      value: 63,
      questions: [
        { title: "Silent e", prompt: "Choose the correctly spelled word.", text: "cake or cak", answer: "cake", hint: "Silent e often makes the vowel long." },
        { title: "Double letter", prompt: "Choose the correctly spelled word.", text: "running or runing", answer: "running", hint: "Double the final consonant before ing in this word." },
        { title: "Common word", prompt: "Spell the word.", text: "because", answer: "because", hint: "Break it into parts: be-cause." }
      ]
    },
    reading: {
      focus: "Reading path",
      description: "Read short passages, find key details, and answer comprehension questions.",
      level: "Reading",
      mastery: "Comprehension",
      value: 67,
      questions: [
        { title: "Main idea", prompt: "What is the sentence mostly about?", text: "Plants need sunlight and water to grow.", answer: "plants", hint: "Look for who or what the sentence is about." },
        { title: "Detail finder", prompt: "What do plants need?", text: "sunlight and water", answer: "sunlightandwater", hint: "Type both things without spaces." },
        { title: "Inference", prompt: "Mia packed an umbrella. What might the weather be?", text: "cloudy sky", answer: "rainy", hint: "Why would someone bring an umbrella?" }
      ]
    },
    comprehension: {
      focus: "Comprehension path",
      description: "Work on main idea, details, inference, theme, author's purpose, and text evidence.",
      level: "Comprehension",
      mastery: "Reading Thinking",
      value: 68,
      questions: [
        { title: "Main idea", prompt: "What is the sentence mostly about?", text: "Bees help flowers grow by moving pollen.", answer: "bees", hint: "Find who or what the sentence is about." },
        { title: "Inference", prompt: "What can you infer?", text: "The lights were off and nobody answered the door.", answer: "empty", hint: "Use clues from the sentence." },
        { title: "Theme", prompt: "Name the theme.", text: "Nia practiced every day until the song felt easy.", answer: "perseverance", hint: "Think about the lesson." }
      ]
    },
    grammar: {
      focus: "Grammar path",
      description: "Work on nouns, verbs, punctuation, and sentence structure with quick feedback.",
      level: "Grammar",
      mastery: "Sentence Skills",
      value: 65,
      questions: [
        { title: "Find the noun", prompt: "Which word is the noun?", text: "The puppy runs.", answer: "puppy", hint: "A noun names a person, place, thing, or idea." },
        { title: "Pick the verb", prompt: "Which word is the action?", text: "Sam reads nightly.", answer: "reads", hint: "The verb tells what Sam does." },
        { title: "Punctuation", prompt: "Which mark ends a question?", text: ". ? !", answer: "?", hint: "A question asks something." }
      ]
    },
    partsOfSpeech: {
      focus: "Parts of speech path",
      description: "Identify nouns, verbs, adjectives, adverbs, pronouns, conjunctions, and prepositions.",
      level: "Parts of Speech",
      mastery: "Grammar Basics",
      value: 64,
      questions: [
        { title: "Noun", prompt: "Which word is the noun?", text: "The puppy runs.", answer: "puppy", hint: "A noun names a person, place, thing, or idea." },
        { title: "Verb", prompt: "Which word is the verb?", text: "Sam reads nightly.", answer: "reads", hint: "A verb shows action or being." },
        { title: "Adjective", prompt: "Which word describes the noun?", text: "The bright star shines.", answer: "bright", hint: "An adjective describes a noun." }
      ]
    },
    punctuation: {
      focus: "Punctuation path",
      description: "Practice end marks, commas, apostrophes, quotation marks, colons, and semicolons.",
      level: "Punctuation",
      mastery: "Editing Marks",
      value: 63,
      questions: [
        { title: "Question mark", prompt: "Which mark ends a question?", text: ". ? !", answer: "?", hint: "Questions use question marks." },
        { title: "Comma", prompt: "Which needs a comma after it?", text: "After dinner we walked.", answer: "afterdinner", hint: "Introductory phrases often need commas." },
        { title: "Apostrophe", prompt: "Choose the possessive form.", text: "the dog bone", answer: "dog'sbone", hint: "Use an apostrophe to show ownership." }
      ]
    },
    sentenceStructure: {
      focus: "Sentence structure path",
      description: "Practice complete sentences, subjects, predicates, clauses, fragments, and run-ons.",
      level: "Sentence Structure",
      mastery: "Clear Sentences",
      value: 65,
      questions: [
        { title: "Complete sentence", prompt: "Choose the complete sentence.", text: "The dog ran. / Because the dog", answer: "thedogran", hint: "A complete sentence has a full thought." },
        { title: "Subject", prompt: "Find the subject.", text: "The bright stars shimmered.", answer: "stars", hint: "Ask who or what shimmered." },
        { title: "Run-on", prompt: "What error is this?", text: "I ran home I was late.", answer: "runon", hint: "Two complete thoughts need punctuation or a joining word." }
      ]
    },
    writing: {
      focus: "Writing path",
      description: "Plan, revise, and polish sentences so ideas become clearer and stronger.",
      level: "Writing",
      mastery: "Clear Expression",
      value: 62,
      questions: [
        { title: "Stronger word", prompt: "Choose a stronger verb for went.", text: "raced, thing, blue", answer: "raced", hint: "Pick the action word." },
        { title: "Topic sentence", prompt: "What should a paragraph begin with?", text: "main idea or tiny detail", answer: "mainidea", hint: "Start by telling what the paragraph is about." },
        { title: "Add detail", prompt: "Which detail is more specific?", text: "a dog or a spotted dog", answer: "aspotteddog", hint: "Specific details help readers picture the idea." }
      ]
    }
  }
};

const pathQuestionBank = {
  math: {
    facts: [
      { skill: "Operations", title: "Addition burst", prompt: "Solve quickly.", text: "9 + 8 = ?", answer: "17", hint: "Make 10, then add the rest." },
      { skill: "Operations", title: "Subtraction burst", prompt: "Solve quickly.", text: "15 - 7 = ?", answer: "8", hint: "7 plus what makes 15?" },
      { skill: "Operations", title: "Multiplication burst", prompt: "Solve quickly.", text: "7 x 6 = ?", answer: "42", hint: "Six groups of seven is 42." },
      { skill: "Operations", title: "Division burst", prompt: "Solve quickly.", text: "56 / 8 = ?", answer: "7", hint: "8 times what number makes 56?" },
      { skill: "Operations", title: "Missing addend", prompt: "Find the missing number.", text: "34 + ? = 50", answer: "16", hint: "Count from 34 to 50." }
    ],
    shapes: [
      { skill: "Geometry", title: "Count the sides", prompt: "How many sides does a hexagon have?", text: "hexagon", answer: "6", hint: "Hex means six." },
      { skill: "Geometry", title: "Find perimeter", prompt: "Add all sides.", text: "4 + 4 + 6 + 6 = ?", answer: "20", hint: "Perimeter is the distance around." },
      { skill: "Geometry", title: "Area check", prompt: "Find the rectangle area.", text: "5 x 3 = ?", answer: "15", hint: "Area is length times width." },
      { skill: "Geometry", title: "Angle type", prompt: "Name an angle less than 90 degrees.", text: "less than 90", answer: "acute", hint: "Small angles are acute." },
      { skill: "Geometry", title: "Parallel lines", prompt: "Do parallel lines meet?", text: "yes or no", answer: "no", hint: "Parallel lines stay the same distance apart." }
    ],
    fractions: [
      { skill: "Fractions", title: "Compare fractions", prompt: "Which is larger?", text: "3/4 or 2/4", answer: "3/4", hint: "The denominators match, so compare the top numbers." },
      { skill: "Fractions", title: "Add fractions", prompt: "Add.", text: "1/5 + 2/5 = ?", answer: "3/5", hint: "Keep the denominator and add the numerators." },
      { skill: "Fractions", title: "Simplify", prompt: "Simplify the fraction.", text: "4/8", answer: "1/2", hint: "Divide the top and bottom by 4." },
      { skill: "Fractions", title: "Equivalent fraction", prompt: "Complete the equivalent fraction.", text: "1/2 = ?/8", answer: "4", hint: "Multiply 2 by 4 to get 8." },
      { skill: "Fractions", title: "Fraction of a number", prompt: "Find one third of 18.", text: "1/3 of 18", answer: "6", hint: "Divide 18 into 3 equal parts." }
    ],
    algebra: [
      { skill: "Algebra", title: "Solve for x", prompt: "Find x.", text: "x + 9 = 17", answer: "8", hint: "Subtract 9 from both sides." },
      { skill: "Algebra", title: "Two-step equation", prompt: "Find x.", text: "2x + 4 = 18", answer: "7", hint: "Subtract 4, then divide by 2." },
      { skill: "Algebra", title: "Pattern rule", prompt: "What is the rule?", text: "3, 6, 9, 12", answer: "add3", hint: "Each term increases by 3. Type add3." },
      { skill: "Algebra", title: "Evaluate expression", prompt: "Evaluate when x = 5.", text: "3x - 2", answer: "13", hint: "3 times 5 is 15, then subtract 2." },
      { skill: "Algebra", title: "Inequality", prompt: "Solve.", text: "x + 2 > 7", answer: "x>5", hint: "Subtract 2 from both sides. Type x>5." }
    ]
  },
  english: {
    phonics: [
      { skill: "Phonics", title: "Blend sounds", prompt: "What word do these sounds make?", text: "c - a - t", answer: "cat", hint: "Say the sounds faster together." },
      { skill: "Phonics", title: "Ending sound", prompt: "What sound ends this word?", text: "map", answer: "p", hint: "Stretch the word and listen to the last sound." },
      { skill: "Phonics", title: "Rhyme check", prompt: "Which word rhymes with run?", text: "sun or sit", answer: "sun", hint: "Listen for the same ending sound." },
      { skill: "Phonics", title: "Long vowel", prompt: "Which word has a long a sound?", text: "cake or cat", answer: "cake", hint: "The silent e helps the vowel say its name." },
      { skill: "Phonics", title: "Beginning blend", prompt: "Type the beginning blend.", text: "frog", answer: "fr", hint: "Listen to the first two sounds." }
    ],
    reading: [
      { skill: "Reading", title: "Main idea", prompt: "What is the sentence mostly about?", text: "Plants need sunlight and water to grow.", answer: "plants", hint: "Look for who or what the sentence is about." },
      { skill: "Reading", title: "Detail finder", prompt: "What do plants need?", text: "sunlight and water", answer: "sunlightandwater", hint: "Type both things without spaces." },
      { skill: "Reading", title: "Inference", prompt: "Mia packed an umbrella. What might the weather be?", text: "cloudy sky", answer: "rainy", hint: "Why would someone bring an umbrella?" },
      { skill: "Reading", title: "Sequence", prompt: "What comes first?", text: "plant seed, water seed, see sprout", answer: "plantseed", hint: "Type the first step without spaces." },
      { skill: "Reading", title: "Cause and effect", prompt: "Why did the ground get wet?", text: "Rain fell all afternoon.", answer: "rain", hint: "The cause is what happened first." }
    ],
    grammar: [
      { skill: "Grammar", title: "Find the noun", prompt: "Which word is the noun?", text: "The puppy runs.", answer: "puppy", hint: "A noun names a person, place, thing, or idea." },
      { skill: "Grammar", title: "Pick the verb", prompt: "Which word is the action?", text: "Sam reads nightly.", answer: "reads", hint: "The verb tells what Sam does." },
      { skill: "Grammar", title: "Punctuation", prompt: "Which mark ends a question?", text: ". ? !", answer: "?", hint: "A question asks something." },
      { skill: "Grammar", title: "Adjective", prompt: "Which word describes the noun?", text: "The bright star shines.", answer: "bright", hint: "An adjective describes." },
      { skill: "Grammar", title: "Pronoun", prompt: "Replace Maya with a pronoun.", text: "Maya is reading.", answer: "she", hint: "Use a word that can stand for Maya." }
    ],
    writing: [
      { skill: "Writing", title: "Stronger word", prompt: "Choose a stronger verb for went.", text: "raced, thing, blue", answer: "raced", hint: "Pick the action word." },
      { skill: "Writing", title: "Topic sentence", prompt: "What should a paragraph begin with?", text: "main idea or tiny detail", answer: "mainidea", hint: "Start by telling what the paragraph is about." },
      { skill: "Writing", title: "Add detail", prompt: "Which detail is more specific?", text: "a dog or a spotted dog", answer: "aspotteddog", hint: "Specific details help readers picture the idea." },
      { skill: "Writing", title: "Transition", prompt: "Choose a sequence transition.", text: "first, because, but", answer: "first", hint: "A sequence word shows order." },
      { skill: "Writing", title: "Revise sentence", prompt: "Choose the clearer sentence.", text: "The dog barked loudly. / Dog loud.", answer: "thedogbarkedloudly", hint: "Choose the complete sentence without spaces." }
    ]
  }
};

const curriculumQuestionBank = {
  math: {
    early: {
      facts: [
        { skill: "Counting", title: "Count objects", prompt: "How many dots are here?", text: "o o o o o o", answer: "6", hint: "Touch each dot once as you count." },
        { skill: "Addition within 10", title: "Tiny sum", prompt: "Add.", text: "4 + 2 = ?", answer: "6", hint: "Start at 4 and count 2 more." },
        { skill: "Subtraction within 10", title: "Take away", prompt: "Subtract.", text: "7 - 3 = ?", answer: "4", hint: "Count back 3 from 7." }
      ],
      shapes: [
        { skill: "Geometry", title: "Shape sides", prompt: "How many sides does a square have?", text: "square", answer: "4", hint: "Count each straight side." },
        { skill: "Geometry", title: "Shape name", prompt: "What shape has 3 sides?", text: "3 sides", answer: "triangle", hint: "Tri means three." },
        { skill: "Position words", title: "Position", prompt: "Which word means higher?", text: "above or below", answer: "above", hint: "Above means over something." }
      ],
      fractions: [
        { skill: "Equal parts", title: "Half", prompt: "Which shows one half?", text: "1/2 or 1/4", answer: "1/2", hint: "A half is one of two equal parts." },
        { skill: "Equal parts", title: "Whole", prompt: "How many halves make one whole?", text: "halves in a whole", answer: "2", hint: "Two equal halves fit together." },
        { skill: "Equal parts", title: "Fair shares", prompt: "Share 6 apples between 2 kids. Each gets?", text: "6 shared by 2", answer: "3", hint: "Split 6 into two equal groups." }
      ],
      algebra: [
        { skill: "Patterns", title: "Growing pattern", prompt: "What comes next?", text: "2, 4, 6, ?", answer: "8", hint: "Count by twos." },
        { skill: "Missing number", title: "Missing addend", prompt: "Find the missing number.", text: "3 + ? = 5", answer: "2", hint: "What do you add to 3 to make 5?" },
        { skill: "Patterns", title: "Repeat pattern", prompt: "What letter comes next?", text: "A B A B A ?", answer: "b", hint: "The pattern repeats A, then B." }
      ]
    },
    elementary: {
      facts: [
        { skill: "Operations", title: "Multi-digit addition", prompt: "Add.", text: "248 + 137 = ?", answer: "385", hint: "Add hundreds, tens, and ones." },
        { skill: "Operations", title: "Multiplication fact", prompt: "Multiply.", text: "9 x 7 = ?", answer: "63", hint: "9 groups of 7." },
        { skill: "Operations", title: "Division fact", prompt: "Divide.", text: "72 / 9 = ?", answer: "8", hint: "9 times 8 is 72." }
      ],
      shapes: [
        { skill: "Geometry", title: "Area model", prompt: "Find the area of a rectangle with length 8 and width 4.", text: "8 by 4 rectangle", answer: "32", hint: "Area is length times width." },
        { skill: "Geometry", title: "Perimeter", prompt: "Find the perimeter.", text: "sides: 5, 5, 3, 3", answer: "16", hint: "Add all side lengths." },
        { skill: "Geometry", title: "Angle type", prompt: "Name an angle less than 90 degrees.", text: "less than 90 degrees", answer: "acute", hint: "Small angles are acute." }
      ],
      fractions: [
        { skill: "Fractions", title: "Equivalent fraction", prompt: "Complete the equivalent fraction.", text: "1/2 = ?/8", answer: "4", hint: "Multiply the denominator by 4." },
        { skill: "Fractions", title: "Add like fractions", prompt: "Add.", text: "2/6 + 3/6 = ?", answer: "5/6", hint: "Keep sixths and add the top numbers." },
        { skill: "Fractions", title: "Compare", prompt: "Which is larger?", text: "3/5 or 4/5", answer: "4/5", hint: "Same denominator, compare numerators." }
      ],
      algebra: [
        { skill: "Patterns", title: "Pattern rule", prompt: "What is the rule?", text: "5, 10, 15, 20", answer: "add5", hint: "Type add5." },
        { skill: "Expressions", title: "Evaluate", prompt: "Evaluate when n = 6.", text: "n + 14", answer: "20", hint: "Replace n with 6." },
        { skill: "Missing number", title: "Missing factor", prompt: "Find the missing number.", text: "? x 8 = 64", answer: "8", hint: "8 times 8 is 64." }
      ]
    },
    middle: {
      facts: [
        { skill: "Rational numbers", title: "Integer sum", prompt: "Add.", text: "-7 + 12 = ?", answer: "5", hint: "Move 12 steps right from -7." },
        { skill: "Ratios", title: "Unit rate", prompt: "Find the unit rate.", text: "$18 for 3 notebooks", answer: "6", hint: "18 divided by 3." },
        { skill: "Percents", title: "Percent", prompt: "Find 20% of 45.", text: "20% of 45", answer: "9", hint: "One fifth of 45." }
      ],
      shapes: [
        { skill: "Geometry", title: "Triangle area", prompt: "Find the area.", text: "base 10, height 6", answer: "30", hint: "Use base times height divided by 2." },
        { skill: "Geometry", title: "Circle measure", prompt: "Find circumference when radius is 5. Use 3.14 for pi.", text: "r = 5", answer: "31.4", hint: "Use 2 x pi x r." },
        { skill: "Geometry", title: "Volume", prompt: "Find volume.", text: "4 x 3 x 5 box", answer: "60", hint: "Multiply length, width, and height." }
      ],
      fractions: [
        { skill: "Rational numbers", title: "Fraction sum", prompt: "Add.", text: "2/3 + 1/6 = ?", answer: "5/6", hint: "Change 2/3 to 4/6." },
        { skill: "Rational numbers", title: "Multiply fractions", prompt: "Multiply.", text: "3/4 x 8 = ?", answer: "6", hint: "8 divided by 4 is 2, then times 3." },
        { skill: "Ratios", title: "Simplify ratio", prompt: "Simplify.", text: "18:24", answer: "3:4", hint: "Divide both parts by 6." }
      ],
      algebra: [
        { skill: "Equations", title: "One-step equation", prompt: "Solve.", text: "x / 4 = 9", answer: "36", hint: "Multiply both sides by 4." },
        { skill: "Equations", title: "Two-step equation", prompt: "Solve.", text: "3x - 5 = 16", answer: "7", hint: "Add 5, then divide by 3." },
        { skill: "Expressions", title: "Distribute", prompt: "Simplify.", text: "4(x + 3)", answer: "4x+12", hint: "Multiply 4 by each term." }
      ]
    },
    teen: {
      facts: [
        { skill: "Algebra fluency", title: "Exponent", prompt: "Evaluate.", text: "3^4", answer: "81", hint: "3 x 3 x 3 x 3." },
        { skill: "Functions", title: "Function value", prompt: "Find f(5).", text: "f(x)=2x^2-3", answer: "47", hint: "2 times 25 minus 3." },
        { skill: "Statistics", title: "Mean", prompt: "Find the mean.", text: "8, 10, 12, 14", answer: "11", hint: "Add and divide by 4." }
      ],
      shapes: [
        { skill: "Geometry", title: "Distance", prompt: "Find the distance between points.", text: "(0,0) and (3,4)", answer: "5", hint: "Use the 3-4-5 triangle." },
        { skill: "Geometry", title: "Similarity", prompt: "Find x in similar triangles.", text: "6/9 = x/12", answer: "8", hint: "Scale 9 to 12 by 4/3." },
        { skill: "Geometry", title: "Circle equation", prompt: "What is the radius?", text: "(x-2)^2 + (y+1)^2 = 16", answer: "4", hint: "The radius squared is 16." }
      ],
      fractions: [
        { skill: "Algebraic fractions", title: "Rational expression", prompt: "Simplify.", text: "(x^2 - 9)/(x - 3)", answer: "x+3", hint: "Factor the numerator." },
        { skill: "Proportions", title: "Solve proportion", prompt: "Solve.", text: "5/8 = x/40", answer: "25", hint: "8 to 40 is times 5." },
        { skill: "Percents", title: "Percent change", prompt: "Find percent increase.", text: "80 to 100", answer: "25%", hint: "Increase is 20 out of 80." }
      ],
      algebra: [
        { skill: "Algebra", title: "Quadratic roots", prompt: "Solve.", text: "x^2 - 5x + 6 = 0", answer: "2,3", hint: "Factor into (x - 2)(x - 3)." },
        { skill: "Functions", title: "Slope", prompt: "Find the slope.", text: "(2, 3) and (6, 11)", answer: "2", hint: "Rise 8, run 4." },
        { skill: "Systems", title: "System", prompt: "Solve for x.", text: "x + y = 9, y = 4", answer: "5", hint: "Replace y with 4." }
      ]
    }
  },
  english: {
    early: {
      phonics: [
        { skill: "Phonics", title: "Beginning sound", prompt: "What letter starts the word?", text: "fish", answer: "f", hint: "Say the first sound." },
        { skill: "Phonics", title: "Rhyme", prompt: "Which word rhymes with hop?", text: "top or run", answer: "top", hint: "Listen for the same ending sound." },
        { skill: "Phonics", title: "Blend", prompt: "What word do these sounds make?", text: "m - a - p", answer: "map", hint: "Say the sounds faster together." }
      ],
      reading: [
        { skill: "Reading", title: "Who", prompt: "Who is the sentence about?", text: "Ben runs.", answer: "ben", hint: "Find the person." },
        { skill: "Reading", title: "What", prompt: "What does the cat do?", text: "The cat naps.", answer: "naps", hint: "Find the action." },
        { skill: "Sight words", title: "Sight word", prompt: "Type the word.", text: "the", answer: "the", hint: "Copy each letter." }
      ],
      grammar: [
        { skill: "Sentences", title: "Sentence start", prompt: "What should a sentence start with?", text: "capital or lowercase", answer: "capital", hint: "The first letter is big." },
        { skill: "Nouns", title: "Naming word", prompt: "Which is a thing?", text: "ball or jump", answer: "ball", hint: "A noun names a thing." },
        { skill: "Verbs", title: "Action word", prompt: "Which is an action?", text: "run or red", answer: "run", hint: "An action is something you do." }
      ],
      writing: [
        { skill: "Writing", title: "Complete sentence", prompt: "Choose the complete sentence.", text: "I see a dog. / See dog.", answer: "iseeadog", hint: "Choose the one with a person doing something." },
        { skill: "Writing", title: "Detail word", prompt: "Choose the describing word.", text: "big, jump, cat", answer: "big", hint: "A describing word tells what kind." },
        { skill: "Writing", title: "Word order", prompt: "Which sounds right?", text: "The dog runs. / Runs dog the.", answer: "thedogruns", hint: "Choose the clear sentence." }
      ]
    },
    elementary: {
      phonics: [
        { skill: "Phonics", title: "Long vowel", prompt: "Which word has a long a sound?", text: "cake or cap", answer: "cake", hint: "Silent e helps the vowel say its name." },
        { skill: "Phonics", title: "Vowel team", prompt: "Type the vowel team.", text: "boat", answer: "oa", hint: "Two vowels work together." },
        { skill: "Phonics", title: "Blend", prompt: "Type the beginning blend.", text: "frog", answer: "fr", hint: "Listen to the first two sounds." }
      ],
      reading: [
        { skill: "Comprehension", title: "Main idea", prompt: "What is this mostly about?", text: "Trees give shade and homes to birds.", answer: "trees", hint: "Find the topic." },
        { skill: "Comprehension", title: "Detail", prompt: "What do trees give?", text: "shade and homes", answer: "shadeandhomes", hint: "Type both details without spaces." },
        { skill: "Comprehension", title: "Inference", prompt: "Mia wore boots and a coat. What might the weather be?", text: "boots and coat", answer: "cold", hint: "What weather needs warm clothes?" }
      ],
      grammar: [
        { skill: "Grammar", title: "Verb", prompt: "Pick the verb.", text: "The bird sings.", answer: "sings", hint: "The verb is the action." },
        { skill: "Grammar", title: "Adjective", prompt: "Pick the adjective.", text: "The tiny seed grew.", answer: "tiny", hint: "It describes the seed." },
        { skill: "Grammar", title: "Punctuation", prompt: "Which mark ends a question?", text: ". ? !", answer: "?", hint: "Questions use a question mark." }
      ],
      writing: [
        { skill: "Writing", title: "Topic sentence", prompt: "What should a paragraph begin with?", text: "main idea or tiny detail", answer: "mainidea", hint: "Start with the main idea." },
        { skill: "Writing", title: "Transition", prompt: "Choose an order word.", text: "first, because, but", answer: "first", hint: "Order words show sequence." },
        { skill: "Writing", title: "Stronger verb", prompt: "Choose a stronger verb for went.", text: "raced, blue, table", answer: "raced", hint: "Pick the action word." }
      ]
    },
    middle: {
      phonics: [
        { skill: "Word study", title: "Prefix", prompt: "What does re- mean?", text: "reread", answer: "again", hint: "Reread means read again." },
        { skill: "Word study", title: "Suffix", prompt: "What does -less mean?", text: "fearless", answer: "without", hint: "Fearless means without fear." },
        { skill: "Word study", title: "Root", prompt: "What does bio mean?", text: "biology", answer: "life", hint: "Bio connects to living things." }
      ],
      reading: [
        { skill: "Comprehension", title: "Theme", prompt: "Name the theme.", text: "Ari practiced daily until he improved.", answer: "perseverance", hint: "Think about the lesson." },
        { skill: "Comprehension", title: "Evidence", prompt: "Which word shows effort?", text: "practiced daily", answer: "practiced", hint: "Find the action that shows work." },
        { skill: "Comprehension", title: "Inference", prompt: "What trait does this show?", text: "Lena returned the lost wallet.", answer: "honest", hint: "Returning lost items shows honesty." }
      ],
      grammar: [
        { skill: "Grammar", title: "Phrase", prompt: "Name the phrase type.", text: "under the bridge", answer: "prepositional", hint: "It begins with a preposition." },
        { skill: "Grammar", title: "Pronoun case", prompt: "Choose the correct pronoun.", text: "Maya and ___ went home. I/me", answer: "i", hint: "Use the subject pronoun." },
        { skill: "Grammar", title: "Verb agreement", prompt: "Choose the verb.", text: "The team ___ ready. is/are", answer: "is", hint: "Team is singular here." }
      ],
      writing: [
        { skill: "Writing", title: "Transition", prompt: "Choose a contrast transition.", text: "however, also, because", answer: "however", hint: "Contrast shows a turn." },
        { skill: "Writing", title: "Claim", prompt: "What should an argument include?", text: "claim or random fact", answer: "claim", hint: "A claim states your position." },
        { skill: "Writing", title: "Revision", prompt: "Choose the clearer sentence.", text: "The storm delayed the game. / Storm game delayed.", answer: "thestormdelayedthegame", hint: "Choose the complete clear sentence." }
      ]
    },
    teen: {
      phonics: [
        { skill: "Vocabulary", title: "Greek root", prompt: "What does chron mean?", text: "chronology", answer: "time", hint: "Chronology is time order." },
        { skill: "Vocabulary", title: "Latin root", prompt: "What does dict mean?", text: "predict", answer: "say", hint: "Predict means say beforehand." },
        { skill: "Vocabulary", title: "Word meaning", prompt: "Choose the closest meaning of ambiguous.", text: "unclear, tiny, loud", answer: "unclear", hint: "Ambiguous means not clear." }
      ],
      reading: [
        { skill: "Analysis", title: "Rhetoric", prompt: "Which appeal uses emotion?", text: "ethos, pathos, logos", answer: "pathos", hint: "Emotion connects to feeling." },
        { skill: "Analysis", title: "Tone", prompt: "Name the tone.", text: "The plan was difficult but possible.", answer: "optimistic", hint: "It sounds hopeful." },
        { skill: "Analysis", title: "Central idea", prompt: "What is the central idea?", text: "Practice builds skill over time.", answer: "practice", hint: "Find the main concept." }
      ],
      grammar: [
        { skill: "Grammar", title: "Parallel structure", prompt: "Choose the parallel phrase.", text: "reading, writing, and thinking / reading, to write, thought", answer: "readingwritingandthinking", hint: "All items should match form." },
        { skill: "Grammar", title: "Modifier", prompt: "What is wrong?", text: "Running fast, the finish line appeared.", answer: "danglingmodifier", hint: "The finish line is not running." },
        { skill: "Grammar", title: "Concise language", prompt: "Replace with one word.", text: "due to the fact that", answer: "because", hint: "Use a shorter cause word." }
      ],
      writing: [
        { skill: "Writing", title: "Thesis", prompt: "What should an essay thesis do?", text: "state claim or list random facts", answer: "stateclaim", hint: "A thesis states the main argument." },
        { skill: "Writing", title: "Evidence", prompt: "What supports a claim?", text: "evidence or unrelated opinion", answer: "evidence", hint: "Evidence proves the point." },
        { skill: "Writing", title: "Revision", prompt: "Choose the concise phrase.", text: "although / in spite of the fact that", answer: "although", hint: "One word can do the work." }
      ]
    }
  }
};

const adaptivePathQuestionBank = {
  math: {
    facts: {
      easy: [
        { skill: "Operations", title: "Confidence fact", prompt: "Solve.", text: "6 + 7 = ?", answer: "13", hint: "Make 10, then add 3." },
        { skill: "Operations", title: "Confidence fact", prompt: "Solve.", text: "18 - 9 = ?", answer: "9", hint: "Think 9 plus what makes 18?" }
      ],
      hard: [
        { skill: "Operations", title: "Challenge fact", prompt: "Solve mentally.", text: "125 + 76 = ?", answer: "201", hint: "Add 100 + 70, then 25 + 6." },
        { skill: "Operations", title: "Challenge fact", prompt: "Solve mentally.", text: "12 x 15 = ?", answer: "180", hint: "12 x 10 plus 12 x 5." }
      ]
    },
    shapes: {
      easy: [
        { skill: "Geometry", title: "Shape review", prompt: "How many sides does a triangle have?", text: "triangle", answer: "3", hint: "Tri means three." },
        { skill: "Geometry", title: "Shape review", prompt: "How many corners does a square have?", text: "square", answer: "4", hint: "A square has four equal sides and four corners." }
      ],
      hard: [
        { skill: "Geometry", title: "Challenge geometry", prompt: "Name the quadrilateral.", text: "Two pairs of parallel sides", answer: "parallelogram", hint: "A parallelogram has opposite sides that stay parallel." },
        { skill: "Geometry", title: "Challenge geometry", prompt: "Find the missing side if perimeter is 30.", text: "7 + 8 + 7 + ? = 30", answer: "8", hint: "The known sides add to 22." }
      ]
    },
    fractions: {
      easy: [
        { skill: "Fractions", title: "Fraction review", prompt: "Which is larger?", text: "1/3 or 1/4", answer: "1/3", hint: "For unit fractions, the smaller bottom number is larger." },
        { skill: "Fractions", title: "Fraction review", prompt: "Simplify.", text: "2/4", answer: "1/2", hint: "Divide the top and bottom by 2." }
      ],
      hard: [
        { skill: "Fractions", title: "Challenge fraction", prompt: "Add.", text: "3/4 + 1/8 = ?", answer: "7/8", hint: "Change 3/4 into 6/8." },
        { skill: "Fractions", title: "Challenge fraction", prompt: "Find the product.", text: "3/5 x 20 = ?", answer: "12", hint: "20 divided by 5 is 4, then multiply by 3." }
      ]
    },
    algebra: {
      easy: [
        { skill: "Algebra", title: "Equation review", prompt: "Find x.", text: "x + 4 = 10", answer: "6", hint: "Subtract 4 from both sides." },
        { skill: "Algebra", title: "Equation review", prompt: "Find x.", text: "2x = 14", answer: "7", hint: "Divide by 2." }
      ],
      hard: [
        { skill: "Algebra", title: "Challenge equation", prompt: "Find x.", text: "5x - 7 = 28", answer: "7", hint: "Add 7, then divide by 5." },
        { skill: "Algebra", title: "Challenge equation", prompt: "Find x.", text: "3(x + 2) = 24", answer: "6", hint: "Divide by 3 first, then subtract 2." }
      ]
    }
  },
  english: {
    phonics: {
      easy: [
        { skill: "Phonics", title: "Sound review", prompt: "What letter starts the word?", text: "moon", answer: "m", hint: "Say the first sound slowly." },
        { skill: "Phonics", title: "Sound review", prompt: "Which word rhymes with fish?", text: "dish or sun", answer: "dish", hint: "Listen for the same ending sound." }
      ],
      hard: [
        { skill: "Phonics", title: "Challenge sound", prompt: "Type the vowel team.", text: "boat", answer: "oa", hint: "Two vowels work together in the middle." },
        { skill: "Phonics", title: "Challenge sound", prompt: "Type the beginning blend.", text: "three", answer: "th", hint: "The first two letters make one sound." }
      ]
    },
    reading: {
      easy: [
        { skill: "Reading", title: "Detail review", prompt: "Who is the sentence about?", text: "Mia feeds the cat.", answer: "mia", hint: "Look for the person doing the action." },
        { skill: "Reading", title: "Detail review", prompt: "What does the dog chase?", text: "The dog chases a ball.", answer: "ball", hint: "Find the thing after chases." }
      ],
      hard: [
        { skill: "Reading", title: "Challenge reading", prompt: "Name the likely trait.", text: "Ari shared his lunch with a new student.", answer: "kind", hint: "What trait does sharing show?" },
        { skill: "Reading", title: "Challenge reading", prompt: "What is the cause?", text: "The sidewalk was wet because rain fell.", answer: "rain", hint: "The cause explains why it happened." }
      ]
    },
    grammar: {
      easy: [
        { skill: "Grammar", title: "Grammar review", prompt: "Pick the noun.", text: "The cat sleeps.", answer: "cat", hint: "A noun names a thing." },
        { skill: "Grammar", title: "Grammar review", prompt: "Pick the verb.", text: "Birds fly.", answer: "fly", hint: "The verb is the action." }
      ],
      hard: [
        { skill: "Grammar", title: "Challenge grammar", prompt: "Name the adjective.", text: "The curious child asked questions.", answer: "curious", hint: "Which word describes the child?" },
        { skill: "Grammar", title: "Challenge grammar", prompt: "Choose the correct verb.", text: "The group ___ ready. is/are", answer: "is", hint: "Group is singular here." }
      ]
    },
    writing: {
      easy: [
        { skill: "Writing", title: "Writing review", prompt: "Choose the complete sentence.", text: "The sun is bright. / Sun bright.", answer: "thesunisbright", hint: "Choose the sentence with a subject and verb." },
        { skill: "Writing", title: "Writing review", prompt: "Choose the detail word.", text: "red, run, jump", answer: "red", hint: "A detail word can describe a thing." }
      ],
      hard: [
        { skill: "Writing", title: "Challenge writing", prompt: "Choose the stronger topic sentence.", text: "My garden has three helpful insects. / Bugs.", answer: "mygardenhasthreehelpfulinsects", hint: "Choose the sentence that previews the paragraph." },
        { skill: "Writing", title: "Challenge writing", prompt: "Choose the best transition.", text: "First, Next, However", answer: "however", hint: "Use this when the idea changes direction." }
      ]
    }
  }
};

const placementQuestions = {
  math: {
    early: [
      { skill: "Counting", title: "Placement check", prompt: "Count the items.", text: "* * * *", answer: "4", hint: "Touch each item once." },
      { skill: "Number Order", title: "Placement check", prompt: "What comes next?", text: "2, 3, 4, ?", answer: "5", hint: "Count one more." },
      { skill: "Addition", title: "Placement check", prompt: "Add.", text: "1 + 2 = ?", answer: "3", hint: "Count 1, then 2 more." }
    ],
    elementary: [
      { skill: "Addition", title: "Placement check", prompt: "Add.", text: "36 + 29 = ?", answer: "65", hint: "Add tens, then ones." },
      { skill: "Multiplication", title: "Placement check", prompt: "Multiply.", text: "8 x 7 = ?", answer: "56", hint: "Seven groups of eight." },
      { skill: "Fractions", title: "Placement check", prompt: "Simplify.", text: "6/12", answer: "1/2", hint: "Divide top and bottom by 6." }
    ],
    middle: [
      { skill: "Ratios", title: "Placement check", prompt: "Simplify.", text: "15:20", answer: "3:4", hint: "Divide both sides by 5." },
      { skill: "Pre-Algebra", title: "Placement check", prompt: "Solve.", text: "4x = 28", answer: "7", hint: "Divide by 4." },
      { skill: "Fractions", title: "Placement check", prompt: "Add.", text: "2/3 + 1/6", answer: "5/6", hint: "Use sixths." }
    ],
    teen: [
      { skill: "Algebra", title: "Placement check", prompt: "Solve.", text: "3x - 6 = 21", answer: "9", hint: "Add 6, then divide by 3." },
      { skill: "Functions", title: "Placement check", prompt: "Find f(4).", text: "f(x)=2x+1", answer: "9", hint: "Substitute 4 for x." },
      { skill: "Geometry", title: "Placement check", prompt: "Find slope.", text: "(1, 2) to (3, 8)", answer: "3", hint: "Rise 6, run 2." }
    ]
  },
  english: {
    early: [
      { skill: "Letter Sounds", title: "Placement check", prompt: "What letter starts this word?", text: "ball", answer: "b", hint: "Listen to the first sound." },
      { skill: "Rhyming", title: "Placement check", prompt: "Pick the rhyme.", text: "dog: log or sun", answer: "log", hint: "The ending sound matches." },
      { skill: "Sight Words", title: "Placement check", prompt: "Type the word.", text: "and", answer: "and", hint: "Look carefully at each letter." }
    ],
    elementary: [
      { skill: "Vocabulary", title: "Placement check", prompt: "Choose the synonym for small.", text: "tiny, loud, quick", answer: "tiny", hint: "A synonym means almost the same." },
      { skill: "Grammar", title: "Placement check", prompt: "Choose the verb.", text: "The bird sings.", answer: "sings", hint: "The verb is the action." },
      { skill: "Comprehension", title: "Placement check", prompt: "What is the main idea?", text: "Bees help flowers grow.", answer: "bees", hint: "Who or what is the sentence about?" }
    ],
    middle: [
      { skill: "Theme", title: "Placement check", prompt: "Name the theme.", text: "Ari failed twice but kept practicing.", answer: "perseverance", hint: "Think about the lesson." },
      { skill: "Grammar", title: "Placement check", prompt: "Name the phrase type.", text: "under the bridge", answer: "prepositional", hint: "It begins with a preposition." },
      { skill: "Transitions", title: "Placement check", prompt: "Choose contrast.", text: "however, because, also", answer: "however", hint: "Contrast shows a turn." }
    ],
    teen: [
      { skill: "Rhetoric", title: "Placement check", prompt: "Which appeal uses logic?", text: "ethos, pathos, logos", answer: "logos", hint: "Logic and logos sound related." },
      { skill: "Revision", title: "Placement check", prompt: "Make concise.", text: "due to the fact that", answer: "because", hint: "Use one cause word." },
      { skill: "Tone", title: "Placement check", prompt: "Name the tone.", text: "The result was disappointing but fixable.", answer: "hopeful", hint: "It still suggests improvement." }
    ]
  }
};

function getTodayKey() {
  return getAttemptDateKey(Date.now());
}

function hashString(value) {
  return String(value).split("").reduce((hash, character) => {
    return ((hash << 5) - hash + character.charCodeAt(0)) | 0;
  }, 0);
}

function createSeededRandom(seedText) {
  let seed = Math.abs(hashString(seedText)) || 1;

  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

function shuffleWithSeed(items, seedText) {
  const random = createSeededRandom(seedText);
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function buildWorksheet(questions, size, seedText = "daily") {
  if (!questions.length) return [];

  return shuffleWithSeed(questions, seedText).slice(0, Math.min(size, questions.length));
}

function getDailyQuestionSeed(parts) {
  const child = getCurrentChild();
  const childKey = child ? child.id : "guest";
  return [childKey, getTodayKey(), `round:${appState.practiceRound}`, ...parts].join("|");
}

const DATA_KEY = "brightpath-demo-data";
const SESSION_KEY = "brightpath-demo-session";
const STATES = [
  ["AL", "Alabama"],
  ["AK", "Alaska"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["HI", "Hawaii"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"]
];

function createDemoData() {
  return {
    parents: [],
    children: [],
    attempts: [],
    parentQuestions: []
  };
}

function ensureDemoAccounts() {
  removeDefaultProfiles();
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

let demoData = readJson(DATA_KEY, createDemoData());
let session = readJson(SESSION_KEY, null);
let kidRefreshInFlight = false;

const SUPABASE_PLACEHOLDER_KEY = "PASTE_SUPABASE_ANON_PUBLIC_KEY_HERE";
const supabaseSettings = window.BRIGHTPATH_SUPABASE || {};
const supabaseClient = window.supabase
  && supabaseSettings.url
  && supabaseSettings.anonKey
  && supabaseSettings.anonKey !== SUPABASE_PLACEHOLDER_KEY
  ? window.supabase.createClient(supabaseSettings.url, supabaseSettings.anonKey)
  : null;

function hasDatabaseConnection() {
  return Boolean(supabaseClient);
}

function mapParentFromRow(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    password: "",
    childLimit: normalizeChildLimit(row.child_limit)
  };
}

function mapChildFromRow(row) {
  const firstName = row.first_name || "Student";
  const lastName = row.last_name || "Learner";

  return {
    id: row.id,
    parentId: row.parent_id,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`.trim(),
    age: row.age,
    state: (row.state || "NA").toUpperCase(),
    code: row.code,
    placement: row.placement || {}
  };
}

function mapAttemptFromRow(row) {
  return {
    id: row.id,
    childId: row.child_id,
    subject: row.subject,
    path: row.path,
    mode: row.mode,
    skill: row.skill,
    difficulty: row.difficulty,
    question: row.question,
    answer: row.answer,
    correctAnswer: row.correct_answer,
    explanation: row.explanation || "",
    correct: row.correct,
    createdAt: new Date(row.created_at).getTime()
  };
}

function mapParentQuestionFromRow(row) {
  return {
    id: row.id,
    parentId: row.parent_id,
    childId: row.child_id,
    subject: row.subject,
    prompt: row.prompt,
    question: row.question,
    answer: row.correct_answer,
    explanation: row.explanation || "",
    status: row.status || "pending",
    childAnswer: row.child_answer || "",
    correct: row.correct,
    createdAt: new Date(row.created_at).getTime(),
    answeredAt: row.answered_at ? new Date(row.answered_at).getTime() : null,
    testGroupId: row.test_group_id || "",
    timedChallenge: Boolean(row.timed_challenge),
    challengeStartedAt: row.challenge_started_at ? new Date(row.challenge_started_at).getTime() : null,
    challengeFinishedAt: row.challenge_finished_at ? new Date(row.challenge_finished_at).getTime() : null
  };
}

function getDatabaseErrorMessage(error) {
  return error && error.message ? error.message : "The database did not accept that change yet.";
}

function normalizeChildCode(value) {
  return String(value || "").trim().toUpperCase();
}

function isDatabaseUuid(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || ""));
}

function normalizeChildLimit(value) {
  return Math.min(20, Math.max(1, Number(value || 2)));
}

function getParentChildLimit(parentOrId) {
  const parent = typeof parentOrId === "object" && parentOrId
    ? parentOrId
    : demoData.parents.find((item) => item.id === parentOrId);

  return normalizeChildLimit(parent && parent.childLimit);
}

async function loadDatabaseData() {
  if (!hasDatabaseConnection()) return;

  const [
    { data: parents, error: parentError },
    { data: children, error: childError },
    { data: attempts, error: attemptError },
    { data: parentQuestions, error: parentQuestionError }
  ] = await Promise.all([
    supabaseClient.from("parents").select("*").order("created_at", { ascending: true }),
    supabaseClient.from("students").select("*").order("created_at", { ascending: true }),
    supabaseClient.from("attempts").select("*").order("created_at", { ascending: false }),
    supabaseClient.from("parent_questions").select("*").order("created_at", { ascending: false })
  ]);

  const error = parentError || childError || attemptError;
  if (error) {
    throw error;
  }

  demoData = {
    parents: (parents || []).map(mapParentFromRow),
    children: (children || []).map(mapChildFromRow),
    attempts: (attempts || []).map(mapAttemptFromRow),
    parentQuestions: parentQuestionError ? [] : (parentQuestions || []).map(mapParentQuestionFromRow)
  };
  ensureDemoAccounts();
  saveDemoData();
}

async function loadAcademyData() {
  if (!hasDatabaseConnection()) return;

  const { data, error } = await supabaseClient.rpc("academy_roster", {
    request_token: "dashboard"
  });

  if (error) {
    throw error;
  }

  demoData = {
    parents: (data.parents || []).map(mapParentFromRow),
    children: (data.students || []).map(mapChildFromRow),
    attempts: (data.attempts || []).map(mapAttemptFromRow),
    parentQuestions: (data.parent_questions || []).map(mapParentQuestionFromRow)
  };
  ensureDemoAccounts();
  saveDemoData();
}

async function signInAcademyAdmin({ email, password }) {
  if (!hasDatabaseConnection()) {
    if (email === "admin@brightpath.test" && password === "admin123") {
      return { email };
    }

    throw new Error("Admin login needs the database connection.");
  }

  const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (authError) {
    throw authError;
  }

  const user = authData && authData.user;
  if (!user) {
    throw new Error("Admin account was not confirmed yet.");
  }

  const { data: adminRow, error: adminError } = await supabaseClient
    .from("academy_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError) {
    throw adminError;
  }

  if (!adminRow) {
    await supabaseClient.auth.signOut();
    throw new Error("This account is not an academy admin yet.");
  }

  await loadAcademyData();
  return { email, userId: user.id };
}

async function signInOrCreateParent({ name, email, password }) {
  let localParent = demoData.parents.find((item) => item.email === email);

  if (localParent && localParent.password && localParent.password !== password) {
    throw new Error("That password does not match this parent account.");
  }

  if (localParent && localParent.password === password) {
    return localParent;
  }

  if (!hasDatabaseConnection()) {
    if (localParent && !localParent.password) {
      localParent.name = name || localParent.name;
      localParent.password = password;
      saveDemoData();
      return localParent;
    }

    localParent = { id: `parent-${Date.now()}`, name, email, password, childLimit: 2 };
    demoData.parents.push(localParent);
    saveDemoData();
    return localParent;
  }

  let authResult = await supabaseClient.auth.signInWithPassword({ email, password });

  if (authResult.error) {
    authResult = await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { name } }
    });
  }

  if (authResult.error) {
    throw authResult.error;
  }

  const user = authResult.data.user;
  const activeSession = authResult.data.session;

  if (!user || !activeSession) {
    localParent = { id: `parent-${Date.now()}`, name, email, password, needsEmailConfirmation: true };
    demoData.parents.push(localParent);
    saveDemoData();
    return localParent;
  }

  const { data: parentRow, error } = await supabaseClient
    .rpc("claim_parent_profile", {
      parent_name: name,
      parent_email: email
    });

  if (error) {
    throw error;
  }

  await loadDatabaseData();
  return mapParentFromRow(parentRow);
}

async function signInChildWithCode({ firstName, lastName, code }) {
  const childCode = normalizeChildCode(code);
  const localChild = findChildByLogin(firstName, lastName, childCode);

  if (!hasDatabaseConnection()) {
    if (localChild) {
      return { child: localChild, code: childCode };
    }

    throw new Error("No child profile matches that name and code yet.");
  }

  const { data, error } = await supabaseClient.rpc("student_portal_by_code", {
    student_first_name: firstName,
    student_last_name: lastName,
    student_code: childCode
  });

  if (error) {
    if (localChild) {
      return { child: localChild, code: childCode };
    }

    throw error;
  }

  const child = mapChildFromRow(data.student);
  const attempts = (data.attempts || []).map(mapAttemptFromRow);
  const parentQuestions = (data.parent_questions || []).map(mapParentQuestionFromRow);

  demoData.children = [
    ...demoData.children.filter((item) => item.id !== child.id),
    child
  ];
  demoData.attempts = [
    ...demoData.attempts.filter((attempt) => attempt.childId !== child.id),
    ...attempts
  ];
  demoData.parentQuestions = [
    ...(demoData.parentQuestions || []).filter((question) => question.childId !== child.id),
    ...parentQuestions
  ];

  if (!demoData.parents.some((parent) => parent.id === child.parentId)) {
    demoData.parents.push({
      id: child.parentId,
      name: "Parent",
      email: "",
      password: "",
      childLimit: 2
    });
  }

  saveDemoData();
  return { child, code: childCode };
}

async function refreshCurrentKidPortal({ rerender = false } = {}) {
  if (!hasDatabaseConnection() || !session || session.role !== "kid" || !session.childCode || kidRefreshInFlight) return;

  const child = getCurrentChild();
  if (!child) return;

  kidRefreshInFlight = true;
  try {
    await signInChildWithCode({
      firstName: child.firstName,
      lastName: child.lastName,
      code: session.childCode
    });

    if (rerender && appState.answered === 0) {
      syncLearnerMode();
      render();
    }
  } catch (error) {
    authMessage.textContent = getDatabaseErrorMessage(error);
  } finally {
    kidRefreshInFlight = false;
  }
}

async function createChildProfile({ parentId, firstName, lastName, age, state }) {
  const name = `${firstName} ${lastName}`.trim();

  if (!hasDatabaseConnection() || !isDatabaseUuid(parentId)) {
    const child = {
      id: `child-${Date.now()}`,
      parentId,
      firstName,
      lastName,
      name,
      age: Math.min(18, Math.max(4, age || 8)),
      state,
      code: makeUniqueChildCode(name)
    };
    demoData.children.push(child);
    saveDemoData();
    return child;
  }

  const isAcademy = session && session.role === "academy";
  const code = makeUniqueChildCode(name);
  const { data, error } = isAcademy
    ? await supabaseClient.rpc("academy_create_student", {
      target_parent_id: parentId,
      student_first_name: firstName,
      student_last_name: lastName,
      student_age: Math.min(18, Math.max(4, age || 8)),
      student_state: state,
      requested_code: code
    })
    : await supabaseClient
      .from("students")
      .insert({
        parent_id: parentId,
        first_name: firstName,
        last_name: lastName,
        age: Math.min(18, Math.max(4, age || 8)),
        state,
        code
      })
      .select()
      .single();

  if (error) {
    throw error;
  }

  const child = mapChildFromRow(data);
  demoData.children.push(child);
  saveDemoData();
  return child;
}

async function createAcademyParentProfile({ name, email }) {
  if (!hasDatabaseConnection()) {
    const existingParent = demoData.parents.find((parent) => parent.email.toLowerCase() === email.toLowerCase());
    if (existingParent) {
      existingParent.name = name;
      saveDemoData();
      return existingParent;
    }

    const parent = {
      id: `parent-${Date.now()}`,
      name,
      email,
      password: "",
      childLimit: 2
    };
    demoData.parents.push(parent);
    saveDemoData();
    return parent;
  }

  const { data, error } = await supabaseClient.rpc("academy_create_parent", {
    parent_name: name,
    parent_email: email
  });

  if (error) {
    throw error;
  }

  const parent = mapParentFromRow(data);
  demoData.parents = [
    ...demoData.parents.filter((item) => item.id !== parent.id && item.email.toLowerCase() !== parent.email.toLowerCase()),
    parent
  ];
  saveDemoData();
  return parent;
}

async function updateParentChildLimit(parentId, childLimit) {
  const normalizedLimit = normalizeChildLimit(childLimit);
  const localParent = demoData.parents.find((parent) => parent.id === parentId);

  if (!localParent) {
    throw new Error("Choose an existing parent.");
  }

  if (getParentChildCount(parentId) > normalizedLimit) {
    throw new Error("The limit cannot be lower than the number of kids already assigned.");
  }

  if (hasDatabaseConnection() && isDatabaseUuid(parentId)) {
    const { data, error } = await supabaseClient.rpc("academy_update_parent_child_limit", {
      target_parent_id: parentId,
      new_child_limit: normalizedLimit
    });

    if (error) {
      throw error;
    }

    const updatedParent = mapParentFromRow(data);
    demoData.parents = demoData.parents.map((parent) => (
      parent.id === updatedParent.id ? { ...parent, ...updatedParent } : parent
    ));
    saveDemoData();
    return updatedParent;
  }

  localParent.childLimit = normalizedLimit;
  saveDemoData();
  return localParent;
}

function makeParentQuestionId() {
  return `parent-question-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

async function createParentQuestion({ parentId, childId, subject, prompt, question, answer, explanation, testGroupId = "", timedChallenge = false }) {
  const parentQuestion = {
    id: makeParentQuestionId(),
    parentId,
    childId,
    subject,
    prompt,
    question,
    answer,
    explanation,
    status: "pending",
    childAnswer: "",
    correct: null,
    createdAt: Date.now(),
    answeredAt: null,
    testGroupId,
    timedChallenge,
    challengeStartedAt: null,
    challengeFinishedAt: null
  };

  if (hasDatabaseConnection() && isDatabaseUuid(parentId) && isDatabaseUuid(childId)) {
    const { data, error } = await supabaseClient
      .from("parent_questions")
      .insert({
        parent_id: parentId,
        child_id: childId,
        subject,
        prompt,
        question,
        correct_answer: answer,
        explanation,
        test_group_id: testGroupId || null,
        timed_challenge: timedChallenge
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    const savedQuestion = mapParentQuestionFromRow(data);
    demoData.parentQuestions = [
      savedQuestion,
      ...(demoData.parentQuestions || [])
    ];
    saveDemoData();
    return savedQuestion;
  }

  demoData.parentQuestions = [
    parentQuestion,
    ...(demoData.parentQuestions || [])
  ];
  saveDemoData();
  return parentQuestion;
}

function getChildParentQuestions(childId) {
  return (demoData.parentQuestions || [])
    .filter((question) => question.childId === childId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

function getChildParentQuestionGroups(childId) {
  const grouped = getChildParentQuestions(childId)
    .filter((question) => question.testGroupId)
    .reduce((groups, question) => {
      groups[question.testGroupId] = groups[question.testGroupId] || [];
      groups[question.testGroupId].push(question);
      return groups;
    }, {});

  return Object.entries(grouped)
    .map(([groupId, questions]) => {
      const sortedQuestions = [...questions].sort((a, b) => a.createdAt - b.createdAt);
      const pending = sortedQuestions.filter((question) => question.status === "pending");
      const answered = sortedQuestions.filter((question) => question.status === "answered");
      const first = sortedQuestions[0];
      return {
        groupId,
        questions: sortedQuestions,
        pending,
        answered,
        subject: first.subject,
        prompt: first.prompt,
        timedChallenge: sortedQuestions.some((question) => question.timedChallenge),
        createdAt: first.createdAt,
        startedAt: first.challengeStartedAt,
        finishedAt: first.challengeFinishedAt
      };
    })
    .sort((a, b) => b.createdAt - a.createdAt);
}

function getPendingParentQuestionGroups(child) {
  if (!child) return [];

  return getChildParentQuestionGroups(child.id)
    .filter((group) => group.pending.length);
}

function getPendingParentQuestionInGroup(child, groupId) {
  if (!child || !groupId) return null;

  const group = getChildParentQuestionGroups(child.id)
    .find((item) => item.groupId === groupId);

  return group ? group.pending[0] || null : null;
}

function getPendingParentQuestion(child) {
  if (!child) return null;

  return getChildParentQuestions(child.id)
    .filter((question) => question.status === "pending" && !question.testGroupId)
    .sort((a, b) => a.createdAt - b.createdAt)[0] || null;
}

function getNextPendingParentAssignment(child) {
  if (!child) return null;

  const group = getPendingParentQuestionGroups(child)[0];
  if (group && group.pending.length) {
    return group.pending[0];
  }

  return getPendingParentQuestion(child);
}

function getParentQuestionById(questionId) {
  return (demoData.parentQuestions || []).find((question) => question.id === questionId) || null;
}

async function markParentQuestionGroupStarted(groupId, child) {
  if (!groupId || !child) return;

  const groupQuestions = (demoData.parentQuestions || []).filter((question) => {
    return question.childId === child.id && question.testGroupId === groupId;
  });

  if (!groupQuestions.length || groupQuestions.every((question) => question.challengeStartedAt)) {
    return;
  }

  const startedAt = Date.now();
  groupQuestions.forEach((question) => {
    question.challengeStartedAt = question.challengeStartedAt || startedAt;
  });
  saveDemoData();

  if (hasDatabaseConnection() && session && session.childCode) {
    const { error } = await supabaseClient.rpc("start_parent_question_group", {
      group_id: groupId,
      student_code: session.childCode,
      started_time: new Date(startedAt).toISOString()
    });

    if (error) {
      throw error;
    }
  }
}

async function markParentQuestionAnswered(questionId, childAnswer, isCorrect) {
  const parentQuestion = getParentQuestionById(questionId);
  if (!parentQuestion) return;

  parentQuestion.status = "answered";
  parentQuestion.childAnswer = childAnswer;
  parentQuestion.correct = isCorrect;
  parentQuestion.answeredAt = Date.now();

  if (parentQuestion.testGroupId) {
    const groupQuestions = (demoData.parentQuestions || []).filter((question) => {
      return question.childId === parentQuestion.childId && question.testGroupId === parentQuestion.testGroupId;
    });
    const isGroupFinished = groupQuestions.every((question) => {
      return question.id === parentQuestion.id || question.status === "answered";
    });

    if (isGroupFinished) {
      const finishedAt = parentQuestion.answeredAt;
      groupQuestions.forEach((question) => {
        question.challengeFinishedAt = question.challengeFinishedAt || finishedAt;
      });
    }
  }

  if (hasDatabaseConnection() && isDatabaseUuid(questionId)) {
    const { error } = await supabaseClient.rpc("complete_parent_question", {
      question_id: questionId,
      student_code: session && session.childCode ? session.childCode : "",
      child_answer: childAnswer,
      was_correct: isCorrect,
      answered_time: new Date(parentQuestion.answeredAt).toISOString()
    });

    if (error) {
      throw error;
    }
  }

  saveDemoData();
}

async function deleteChildProfile(childId) {
  if (hasDatabaseConnection() && isDatabaseUuid(childId) && session && session.role === "academy") {
    const { error } = await supabaseClient.rpc("academy_delete_student", {
      target_student_id: childId
    });
    if (error) throw error;
  } else if (hasDatabaseConnection() && isDatabaseUuid(childId)) {
    const { error } = await supabaseClient.from("students").delete().eq("id", childId);
    if (error && (!session || session.role !== "academy")) throw error;
  }

  deleteChild(childId);
  saveDemoData();
}

async function deleteParentProfile(parentId) {
  if (hasDatabaseConnection() && isDatabaseUuid(parentId) && session && session.role === "academy") {
    const { error } = await supabaseClient.rpc("academy_delete_parent", {
      target_parent_id: parentId
    });
    if (error) throw error;
  } else if (hasDatabaseConnection() && isDatabaseUuid(parentId)) {
    const { error } = await supabaseClient.from("parents").delete().eq("id", parentId);
    if (error && (!session || session.role !== "academy")) throw error;
  }

  deleteParent(parentId);
  saveDemoData();
}

async function saveAttemptToDatabase(attempt, child) {
  if (!hasDatabaseConnection()) return;
  if (!isDatabaseUuid(attempt.childId)) return;

  if (session && session.role === "kid" && session.childCode) {
    const { error } = await supabaseClient.rpc("submit_student_attempt", {
      student_id: attempt.childId,
      student_code: session.childCode,
      attempt_subject: attempt.subject,
      attempt_path: attempt.path,
      attempt_mode: attempt.mode,
      attempt_skill: attempt.skill,
      attempt_difficulty: attempt.difficulty,
      attempt_question: attempt.question,
      attempt_answer: attempt.answer,
      attempt_correct_answer: attempt.correctAnswer,
      attempt_explanation: attempt.explanation,
      attempt_correct: attempt.correct,
      attempt_created_at: new Date(attempt.createdAt).toISOString(),
      student_placement: child && child.placement ? child.placement : null
    });

    if (error) {
      throw error;
    }

    return;
  }

  const { error: attemptError } = await supabaseClient.from("attempts").insert({
    child_id: attempt.childId,
    subject: attempt.subject,
    path: attempt.path,
    mode: attempt.mode,
    skill: attempt.skill,
    difficulty: attempt.difficulty,
    question: attempt.question,
    answer: attempt.answer,
    correct_answer: attempt.correctAnswer,
    explanation: attempt.explanation,
    correct: attempt.correct,
    created_at: new Date(attempt.createdAt).toISOString()
  });

  if (attemptError) {
    throw attemptError;
  }

  if (child && child.placement) {
    const { error: placementError } = await supabaseClient
      .from("students")
      .update({ placement: child.placement })
      .eq("id", child.id);

    if (placementError) {
      throw placementError;
    }
  }
}

function removeSeedAttempts() {
  const seedAttempts = [
    ["child-avery", "3/4 or 2/4", "3/4"],
    ["child-avery", "The puppy runs.", "puppy"],
    ["child-maya", "2x + 4 = 18", "6"]
  ];

  const originalLength = demoData.attempts.length;
  demoData.attempts = demoData.attempts.filter((attempt) => {
    return !seedAttempts.some(([childId, question, answer]) => {
      return attempt.childId === childId && attempt.question === question && attempt.answer === answer && !attempt.mode && !attempt.skill;
    });
  });

  if (demoData.attempts.length !== originalLength) {
    saveDemoData();
  }
}

function removeDefaultProfiles() {
  const defaultParentIds = new Set(["parent-demo"]);
  const defaultChildIds = new Set(["child-avery", "child-maya"]);
  const defaultChildCodes = new Set(["AVERY123", "MAYA456"]);

  const originalData = JSON.stringify(demoData);
  demoData.parents = (demoData.parents || []).filter((parent) => !defaultParentIds.has(parent.id));
  demoData.children = (demoData.children || []).filter((child) => {
    const childName = String(child.name || `${child.firstName || ""} ${child.lastName || ""}`).trim().toLowerCase();
    return !defaultChildIds.has(child.id)
      && !defaultParentIds.has(child.parentId)
      && !defaultChildCodes.has(String(child.code || "").toUpperCase())
      && childName !== "avery stone"
      && childName !== "maya patel";
  });
  demoData.attempts = (demoData.attempts || []).filter((attempt) => !defaultChildIds.has(attempt.childId));
  demoData.parentQuestions = (demoData.parentQuestions || []).filter((question) => !defaultChildIds.has(question.childId));

  if (session && (defaultParentIds.has(session.parentId) || defaultChildIds.has(session.childId))) {
    session = null;
    localStorage.removeItem(SESSION_KEY);
  }

  if (JSON.stringify(demoData) !== originalData) {
    saveDemoData();
  }
}

function normalizeDemoData() {
  demoData.parentQuestions = demoData.parentQuestions || [];
  demoData.parents = (demoData.parents || []).map((parent) => ({
    ...parent,
    childLimit: normalizeChildLimit(parent.childLimit)
  }));
  demoData.children = demoData.children.map((child) => {
    const nameParts = String(child.name || "").trim().split(/\s+/).filter(Boolean);
    const firstName = child.firstName || nameParts[0] || "Student";
    const lastName = child.lastName || nameParts.slice(1).join(" ") || "Student";

    return {
      ...child,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`.trim(),
      state: (child.state || "NA").toUpperCase()
    };
  });
  saveDemoData();
}

function saveDemoData() {
  localStorage.setItem(DATA_KEY, JSON.stringify(demoData));
}

ensureDemoAccounts();
removeSeedAttempts();
normalizeDemoData();

function saveSession() {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

function getAgeGroup(age) {
  if (age <= 6) return "early";
  if (age <= 10) return "elementary";
  if (age <= 13) return "middle";
  return "teen";
}

function getAgeGroupLabel(ageGroup) {
  const labels = {
    early: "Level 1 (ages 4-6)",
    elementary: "Level 2 (ages 7-10)",
    middle: "Level 3 (ages 11-13)",
    teen: "Level 4 (ages 14+)"
  };

  return labels[ageGroup] || labels.elementary;
}

function getChildLevelLabel(child) {
  return getAgeGroupLabel(getAgeGroup(child.age));
}

function getCurrentParent() {
  if (!session) return null;
  return demoData.parents.find((parent) => parent.id === session.parentId) || null;
}

function getCurrentChild() {
  if (!session) return null;
  return demoData.children.find((child) => child.id === session.childId) || null;
}

function normalizeNamePart(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function findChildByFullName(firstName, lastName, parentId = "") {
  const targetFirst = normalizeNamePart(firstName);
  const targetLast = normalizeNamePart(lastName);

  return demoData.children.find((child) => {
    return normalizeNamePart(child.firstName) === targetFirst
      && normalizeNamePart(child.lastName) === targetLast
      && (!parentId || child.parentId === parentId);
  });
}

function findChildByLogin(firstName, lastName, code) {
  const targetCode = normalizeChildCode(code);

  return demoData.children.find((child) => {
    return normalizeNamePart(child.firstName) === normalizeNamePart(firstName)
      && normalizeNamePart(child.lastName) === normalizeNamePart(lastName)
      && normalizeChildCode(child.code) === targetCode;
  });
}

function getChildAttempts(childId) {
  return demoData.attempts
    .filter((attempt) => attempt.childId === childId)
    .sort((a, b) => b.createdAt - a.createdAt);
}

function getChildStats(child, subject = "all") {
  const attempts = getChildAttempts(child.id).filter((attempt) => {
    return subject === "all" || attempt.subject === subject;
  });
  return getAttemptStats(attempts);
}

function getAttemptStats(attempts) {
  const correct = attempts.filter((attempt) => attempt.correct).length;
  const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;
  const wrong = attempts.length - correct;
  return { attempts, correct, wrong, accuracy };
}

function getStateRank(child, subject = "all") {
  const state = (child.state || "NA").toUpperCase();
  const ranked = demoData.children
    .filter((item) => (item.state || "NA").toUpperCase() === state)
    .map((item) => ({ child: item, ...getChildStats(item, subject) }))
    .sort((a, b) => b.accuracy - a.accuracy || b.correct - a.correct || b.attempts.length - a.attempts.length || a.child.name.localeCompare(b.child.name));
  const rank = ranked.findIndex((item) => item.child.id === child.id) + 1;
  return { rank, total: ranked.length, state };
}

function makeChildCode(name) {
  const base = name.replace(/[^a-z0-9]/gi, "").slice(0, 6).toUpperCase() || "KID";
  return `${base}${Math.floor(100 + Math.random() * 900)}`;
}

function makeUniqueChildCode(name) {
  let code = makeChildCode(name);
  while (demoData.children.some((child) => child.code === code)) {
    code = makeChildCode(name);
  }
  return code;
}

function getParentName(parentId) {
  const parent = demoData.parents.find((item) => item.id === parentId);
  return parent ? parent.name : "Unassigned";
}

function getParentChildCount(parentId) {
  return demoData.children.filter((child) => child.parentId === parentId).length;
}

function deleteChild(childId) {
  demoData.children = demoData.children.filter((child) => child.id !== childId);
  demoData.attempts = demoData.attempts.filter((attempt) => attempt.childId !== childId);
  demoData.parentQuestions = (demoData.parentQuestions || []).filter((question) => question.childId !== childId);
}

function deleteParent(parentId) {
  const childIds = demoData.children
    .filter((child) => child.parentId === parentId)
    .map((child) => child.id);

  demoData.parents = demoData.parents.filter((parent) => parent.id !== parentId);
  demoData.children = demoData.children.filter((child) => child.parentId !== parentId);
  demoData.attempts = demoData.attempts.filter((attempt) => !childIds.includes(attempt.childId));
  demoData.parentQuestions = (demoData.parentQuestions || []).filter((question) => !childIds.includes(question.childId));
}

function getPlacementJudgment(accuracy) {
  if (accuracy >= 90) return "Advanced";
  if (accuracy >= 75) return "On level";
  if (accuracy >= 60) return "Building";
  return "Foundation review";
}

function getPlacementResultText(child, subject) {
  const result = child.placement && child.placement[subject];
  if (!result) return "Not checked";
  return `${result.judgment} (${result.accuracy}%)`;
}

function hasPlacementResult(child, subject) {
  return Boolean(child && child.placement && child.placement[subject]);
}

function getAdaptiveProfile(child, subject, path) {
  const fallback = {
    difficulty: "medium",
    label: "On level",
    value: 68,
    message: "AI practice starts on level and adjusts after a few answers."
  };

  if (!child) return fallback;

  const recentAttempts = getChildAttempts(child.id)
    .filter((attempt) => {
      const matchesSubject = attempt.subject === subject;
      const matchesPath = !path || attempt.path === path;
      return matchesSubject && matchesPath && attempt.mode !== "placement";
    })
    .slice(0, 8);
  const placement = child.placement && child.placement[subject];
  const recentCorrect = recentAttempts.filter((attempt) => attempt.correct).length;
  const recentAccuracy = recentAttempts.length ? Math.round((recentCorrect / recentAttempts.length) * 100) : null;
  const lastThreeCorrect = recentAttempts.slice(0, 3).length === 3 && recentAttempts.slice(0, 3).every((attempt) => attempt.correct);
  const lastTwoWrong = recentAttempts.slice(0, 2).length === 2 && recentAttempts.slice(0, 2).every((attempt) => !attempt.correct);

  if (recentAttempts.length >= 4 && (recentAccuracy >= 85 || lastThreeCorrect)) {
    return {
      difficulty: "hard",
      label: "Challenge",
      value: Math.min(96, recentAccuracy + 8),
      message: "AI raised the difficulty because recent answers were strong."
    };
  }

  if (recentAttempts.length >= 4 && (recentAccuracy < 60 || lastTwoWrong)) {
    return {
      difficulty: "easy",
      label: "Support",
      value: Math.max(38, recentAccuracy || 45),
      message: "AI softened the next set to rebuild confidence before moving up."
    };
  }

  if (placement && recentAttempts.length < 4) {
    if (placement.accuracy >= 85) {
      return {
        difficulty: "hard",
        label: "Challenge",
        value: placement.accuracy,
        message: "AI is starting above level from the placement result."
      };
    }

    if (placement.accuracy < 60) {
      return {
        difficulty: "easy",
        label: "Support",
        value: placement.accuracy,
        message: "AI is starting with review from the placement result."
      };
    }
  }

  return {
    ...fallback,
    value: recentAccuracy || fallback.value,
    message: recentAttempts.length ? "AI is keeping this learner on level while it gathers more answers." : fallback.message
  };
}

function renderAcademySummary(children) {
  const allAttempts = children.flatMap((child) => getChildAttempts(child.id));
  const correct = allAttempts.filter((attempt) => attempt.correct).length;
  const accuracy = allAttempts.length ? Math.round((correct / allAttempts.length) * 100) : 0;
  const placedMath = children.filter((child) => child.placement && child.placement.math).length;
  const placedEnglish = children.filter((child) => child.placement && child.placement.english).length;
  const activeStudents = children.filter((child) => getChildAttempts(child.id).length > 0).length;

  academySummary.innerHTML = `
    <article class="summary-card">
      <strong>${children.length}</strong>
      <span>Total students</span>
    </article>
    <article class="summary-card">
      <strong>${activeStudents}</strong>
      <span>Active students</span>
    </article>
    <article class="summary-card">
      <strong>${allAttempts.length}</strong>
      <span>Total answers</span>
    </article>
    <article class="summary-card">
      <strong>${accuracy}%</strong>
      <span>Academy accuracy</span>
    </article>
    <article class="summary-card">
      <strong>${placedMath}/${children.length}</strong>
      <span>Math placements</span>
    </article>
    <article class="summary-card">
      <strong>${placedEnglish}/${children.length}</strong>
      <span>English placements</span>
    </article>
  `;
}

function renderAcademyManagement() {
  renderStateOptions(academyStudentState, "CA");

  if (academyStudentParent) {
    academyStudentParent.innerHTML = demoData.parents.map((parent) => `
      <option value="${escapeHtml(parent.id)}">${escapeHtml(parent.name)} - ${escapeHtml(parent.email)}</option>
    `).join("") || "<option value=\"\" disabled selected>Add a parent first</option>";
  }

  parentRoster.innerHTML = demoData.parents.map((parent) => {
    const childCount = getParentChildCount(parent.id);
    const childLimit = getParentChildLimit(parent);

    return `
      <article class="roster-row">
        <span>
          <strong>${escapeHtml(parent.name)}</strong>
          <small>${escapeHtml(parent.email)} - ${childCount}/${childLimit} kids assigned</small>
        </span>
        <label class="limit-control">
          <small>Kid limit</small>
          <input type="number" min="${childCount || 1}" max="20" value="${childLimit}" data-parent-limit="${escapeHtml(parent.id)}" />
        </label>
        <button type="button" data-update-parent-limit="${escapeHtml(parent.id)}">Save limit</button>
        <button type="button" data-delete-parent="${escapeHtml(parent.id)}">Delete</button>
      </article>
    `;
  }).join("") || "<p class=\"helper-text\">No parents yet.</p>";

  childRoster.innerHTML = demoData.children.map((child) => `
    <article class="roster-row">
      <span>
        <strong>${escapeHtml(child.name)}</strong>
        <small>${escapeHtml(getChildLevelLabel(child))} - ${escapeHtml(child.state || "NA")} - ${escapeHtml(child.code)} - ${escapeHtml(getParentName(child.parentId))}</small>
      </span>
      <button type="button" data-delete-child="${escapeHtml(child.id)}">Delete</button>
    </article>
  `).join("") || "<p class=\"helper-text\">No students yet.</p>";
}

function renderStateOptions(selectElement, selectedState = "CA") {
  if (!selectElement) return;

  selectElement.innerHTML = STATES.map(([value, label]) => `
    <option value="${escapeHtml(value)}" ${value === selectedState ? "selected" : ""}>${escapeHtml(label)}</option>
  `).join("");
}

function renderParentChildManager(parent) {
  if (!parent || !parentChildManager) return;

  renderStateOptions(parentChildState, "CA");

  const childCount = getParentChildCount(parent.id);
  const childLimit = getParentChildLimit(parent);
  const isFull = childCount >= childLimit;
  const submitButton = parentChildForm.querySelector("button[type='submit']");
  parentChildLimitNote.textContent = isFull
    ? `${childLimit} of ${childLimit} profiles used`
    : `${childCount} of ${childLimit} profiles used`;
  parentChildForm.classList.toggle("hidden", isFull);

  if (submitButton) {
    submitButton.disabled = isFull;
  }
}

function renderParentQuestionManager(parent, isAcademy = false) {
  if ((!parent && !isAcademy) || !parentQuestionManager || !parentQuestionChild) return;

  const selectedLevel = parentQuestionLevel ? parentQuestionLevel.value || "all" : "all";
  const children = isAcademy
    ? demoData.children
    : demoData.children.filter((child) => child.parentId === parent.id);
  const filteredChildren = selectedLevel === "all"
    ? children
    : children.filter((child) => getAgeGroup(child.age) === selectedLevel);

  parentQuestionManager.classList.toggle("hidden", !children.length);
  parentQuestionChild.innerHTML = filteredChildren.map((child) => `
    <option value="${escapeHtml(child.id)}">${escapeHtml(child.name)}${isAcademy ? ` - ${escapeHtml(getParentName(child.parentId))}` : ""}</option>
  `).join("") || "<option value=\"\" disabled>No students match this level</option>";
  renderParentQuestionTopicOptions();
  renderParentQuestionMode();
  renderTimedChallengeBoard(children);
}

function renderParentQuestionTopicOptions() {
  if (!parentQuestionSubject || !parentQuestionPath) return;

  const subject = parentQuestionSubject.value || "math";
  parentQuestionPath.innerHTML = skills[subject].map((skill) => `
    <option value="${escapeHtml(skill.key)}">${escapeHtml(skill.title)}</option>
  `).join("");
}

function formatDuration(milliseconds) {
  if (!milliseconds || milliseconds < 0) return "In progress";

  const totalSeconds = Math.round(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return minutes ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

function renderTimedChallengeBoard(children) {
  if (!timedChallengeBoard) return;

  const childIds = new Set(children.map((child) => child.id));
  const timedGroups = (demoData.parentQuestions || [])
    .filter((question) => question.timedChallenge && question.testGroupId && childIds.has(question.childId))
    .reduce((groups, question) => {
      groups[question.testGroupId] = groups[question.testGroupId] || [];
      groups[question.testGroupId].push(question);
      return groups;
    }, {});
  const cards = Object.entries(timedGroups).map(([groupId, questions]) => {
    const byChild = questions.reduce((groups, question) => {
      groups[question.childId] = groups[question.childId] || [];
      groups[question.childId].push(question);
      return groups;
    }, {});
    const rows = Object.entries(byChild).map(([childId, childQuestions]) => {
      const child = demoData.children.find((item) => item.id === childId);
      const first = childQuestions[0];
      const total = childQuestions.length;
      const answered = childQuestions.filter((question) => question.status === "answered").length;
      const startedAt = first.challengeStartedAt;
      const finishedAt = first.challengeFinishedAt;
      const duration = startedAt && finishedAt ? finishedAt - startedAt : null;
      return {
        childName: child ? child.name : "Student",
        answered,
        total,
        duration,
        finishedAt,
        label: duration ? formatDuration(duration) : `${answered}/${total} done`
      };
    }).sort((a, b) => {
      if (a.duration && b.duration) return a.duration - b.duration;
      if (a.duration) return -1;
      if (b.duration) return 1;
      return b.answered - a.answered || a.childName.localeCompare(b.childName);
    });
    const firstQuestion = questions[0];

    return `
      <article class="challenge-card">
        <h3>${escapeHtml(getSubjectLabel(firstQuestion.subject))} timer challenge</h3>
        <ol>
          ${rows.map((row) => `
            <li><b>${escapeHtml(row.childName)}</b> - ${escapeHtml(row.label)}</li>
          `).join("")}
        </ol>
      </article>
    `;
  }).join("");

  timedChallengeBoard.innerHTML = cards;
}

function getParentQuestionPreviewLevel() {
  const selectedLevel = parentQuestionLevel ? parentQuestionLevel.value || "all" : "all";

  if (selectedLevel !== "all") {
    return selectedLevel;
  }

  const firstSelectedChildId = parentQuestionChild
    ? Array.from(parentQuestionChild.selectedOptions || []).map((option) => option.value).find(Boolean)
    : "";
  const child = firstSelectedChildId
    ? demoData.children.find((item) => item.id === firstSelectedChildId)
    : null;

  return child ? getAgeGroup(child.age) : "elementary";
}

function getParentQuestionFormConfig() {
  const subject = parentQuestionSubject ? parentQuestionSubject.value || "math" : "math";
  const selectedLevel = parentQuestionLevel ? parentQuestionLevel.value || "all" : "all";
  const path = parentQuestionPath ? parentQuestionPath.value || skills[subject][0].key : skills[subject][0].key;
  const count = parentQuestionCount
    ? Math.min(20, Math.max(1, Number(parentQuestionCount.value || 5)))
    : 5;
  const testMode = parentQuestionMode ? parentQuestionMode.value || "auto" : "auto";
  const childIds = parentQuestionChild
    ? Array.from(parentQuestionChild.selectedOptions || []).map((option) => option.value).filter(Boolean)
    : [];
  const prompt = parentQuestionPrompt && parentQuestionPrompt.value.trim()
    ? parentQuestionPrompt.value.trim()
    : `Complete this ${formatTopicName(path)} check.`;
  const timedChallenge = !!(parentQuestionTimed && parentQuestionTimed.checked && count > 1);

  return { subject, selectedLevel, path, count, testMode, childIds, prompt, timedChallenge };
}

function getParentQuestionDraftKey(config = getParentQuestionFormConfig()) {
  return JSON.stringify({
    childIds: [...config.childIds].sort(),
    subject: config.subject,
    selectedLevel: config.selectedLevel,
    path: config.path,
    count: config.count,
    timedChallenge: config.timedChallenge
  });
}

function resetParentQuestionDraft() {
  parentQuestionDraft.key = "";
  parentQuestionDraft.questions = [];
  renderParentQuestionDraft();
}

function syncParentQuestionDraft(config = getParentQuestionFormConfig()) {
  const nextKey = getParentQuestionDraftKey(config);

  if (parentQuestionDraft.key && parentQuestionDraft.key !== nextKey) {
    parentQuestionDraft.questions = [];
  }

  parentQuestionDraft.key = nextKey;
}

function renderParentQuestionDraft(config = getParentQuestionFormConfig()) {
  if (!parentQuestionDraftPanel || !parentQuestionSubmit) return;

  const isCustom = config.testMode === "custom";
  parentQuestionDraftPanel.classList.toggle("hidden", !isCustom);
  parentQuestionSubmit.textContent = isCustom
    ? `${parentQuestionDraft.questions.length + 1 >= config.count ? "Add final question and send" : `Add question ${parentQuestionDraft.questions.length + 1} of ${config.count}`}`
    : "Send selected test";

  if (!isCustom) return;

  const ready = parentQuestionDraft.questions.length;
  const remaining = Math.max(0, config.count - ready);

  if (parentQuestionDraftTitle) {
    parentQuestionDraftTitle.textContent = ready
      ? `${ready} of ${config.count} questions ready`
      : "No questions added yet";
  }

  if (parentQuestionDraftStatus) {
    parentQuestionDraftStatus.textContent = remaining
      ? `Add ${remaining} more question${remaining === 1 ? "" : "s"}. Nothing is sent to the student until the full set is ready.`
      : "The full set is ready. The next click sends it to the selected student(s).";
  }
}

function preloadEditableParentQuestion(force = false) {
  if (!parentQuestionMode || parentQuestionMode.value !== "custom") return;
  if (!parentQuestionSubject || !parentQuestionPath || !parentQuestionText || !parentQuestionAnswer) return;

  const config = getParentQuestionFormConfig();
  syncParentQuestionDraft(config);
  renderParentQuestionDraft(config);

  if (!force && (parentQuestionText.value.trim() || parentQuestionAnswer.value.trim())) return;

  const ageGroup = getParentQuestionPreviewLevel();
  const previewQuestions = buildParentTestQuestions({
    subject: config.subject,
    path: config.path,
    ageGroup,
    count: Math.max(config.count, parentQuestionDraft.questions.length + 1),
    prompt: config.prompt
  });
  const question = previewQuestions[parentQuestionDraft.questions.length] || previewQuestions[0];

  if (!question) return;

  if (parentQuestionPrompt && !parentQuestionPrompt.value.trim()) {
    parentQuestionPrompt.value = question.prompt;
  }
  parentQuestionText.value = question.question || "";
  parentQuestionAnswer.value = question.answer || "";
  if (parentQuestionExplanation) {
    parentQuestionExplanation.value = question.explanation || "";
  }
}

function renderParentQuestionMode() {
  if (!parentQuestionMode) return;

  const isCustom = parentQuestionMode.value === "custom";
  const config = getParentQuestionFormConfig();
  parentQuestionCustomFields.forEach((field) => field.classList.toggle("hidden", !isCustom));

  if (parentQuestionCount) {
    parentQuestionCount.disabled = false;
  }

  if (parentQuestionTimed) {
    parentQuestionTimed.disabled = config.count <= 1;
    if (config.count <= 1) {
      parentQuestionTimed.checked = false;
    }
  }

  renderParentQuestionDraft(config);

  if (isCustom) {
    preloadEditableParentQuestion();
  }
}

function renderParentQuestionStatus(child) {
  const questions = getChildParentQuestions(child.id);
  const pending = questions.filter((question) => question.status === "pending");
  const latestAnswered = questions.find((question) => question.status === "answered");

  if (pending.length) {
    return `
      <div class="parent-question-note">
        <strong>${pending.length} parent question${pending.length === 1 ? "" : "s"} waiting</strong>
        <span>${escapeHtml(getSubjectLabel(pending[0].subject))}: ${escapeHtml(pending[0].question)}</span>
      </div>
    `;
  }

  if (latestAnswered) {
    return `
      <div class="parent-question-note answered">
        <strong>Latest parent question answered</strong>
        <span>${latestAnswered.correct ? "Correct" : "Needs review"} - Kid answer: ${escapeHtml(latestAnswered.childAnswer || "blank")} - Right answer: ${escapeHtml(latestAnswered.answer)}</span>
      </div>
    `;
  }

  return "";
}

function getSubjectLabel(subject) {
  const labels = {
    all: "All subjects",
    math: "Math",
    english: "English",
    fun: "Fun Activities"
  };

  return labels[subject] || labels.all;
}

function renderSubjectPie(child, label, subject, stats, dateKey = "") {
  const childId = escapeHtml(child.id);
  const subjectValue = escapeHtml(subject);
  const reviewLabel = escapeHtml(`${label} score review`);
  const dateValue = escapeHtml(dateKey);

  return `
    <article class="subject-pie-card">
      <button class="score-pie subject-score-pie" style="--score: ${stats.accuracy}" type="button" data-review-child="${childId}" data-review-filter="score" data-review-subject="${subjectValue}" data-review-date="${dateValue}" aria-label="${reviewLabel}">
        <span>${stats.accuracy}%</span>
      </button>
      <div class="subject-pie-meta">
        <strong>${escapeHtml(label)}</strong>
        <small>${stats.attempts.length} answers</small>
      </div>
      <div class="subject-breakdown">
        <button type="button" data-review-child="${childId}" data-review-filter="mastered" data-review-subject="${subjectValue}" data-review-date="${dateValue}">
          <b>${stats.correct}</b>
          <span>Correct</span>
        </button>
        <button type="button" data-review-child="${childId}" data-review-filter="wrong" data-review-subject="${subjectValue}" data-review-date="${dateValue}">
          <b>${stats.wrong}</b>
          <span>Wrong</span>
        </button>
      </div>
    </article>
  `;
}

function renderAcademyStudentSearch(childrenWithStats) {
  const searchValue = dashboardState.academyStudentSearch.trim().toLowerCase();
  const filteredChildren = childrenWithStats
    .filter(({ child }) => child.name.toLowerCase().includes(searchValue))
    .sort((a, b) => a.child.name.localeCompare(b.child.name));
  const rows = filteredChildren.map(({ child, attempts }) => {
    const practiceAttempts = attempts.filter((attempt) => attempt.mode !== "placement");
    const stats = getAttemptStats(practiceAttempts);

    return `
      <article class="master-student-row">
        <strong>${escapeHtml(child.name)}</strong>
        <button class="score-pie master-score-pie" style="--score: ${stats.accuracy}" type="button" data-review-child="${escapeHtml(child.id)}" data-review-filter="score" data-review-subject="all" aria-label="${escapeHtml(child.name)} score review">
          <span>${stats.accuracy}%</span>
        </button>
      </article>
    `;
  }).join("") || `
    <article class="master-student-row empty-row">
      <strong>No matching student</strong>
    </article>
  `;

  return `
    <section class="master-student-search" aria-label="Search student work">
      <label for="academyStudentSearch">Search student</label>
      <input id="academyStudentSearch" type="search" autocomplete="off" placeholder="Type a student name" value="${escapeHtml(dashboardState.academyStudentSearch)}" />
      <div class="master-student-list">${rows}</div>
    </section>
  `;
}

function formatTopicName(value) {
  const labels = {
    facts: "Mixed math practice",
    numberSense: "Number sense",
    decimals: "Decimals",
    percents: "Percents",
    ratios: "Ratios",
    measurement: "Measurement",
    wordProblems: "Word problems",
    dataGraphs: "Data and graphs",
    shapes: "Shapes and space",
    fractions: "Fractions",
    algebra: "Algebra",
    phonics: "Phonics",
    vocabulary: "Vocabulary",
    spelling: "Spelling",
    reading: "Reading",
    comprehension: "Comprehension",
    grammar: "Grammar",
    partsOfSpeech: "Parts of speech",
    punctuation: "Punctuation",
    sentenceStructure: "Sentence structure",
    writing: "Writing",
    generalKnowledge: "General knowledge",
    flags: "Country flags",
    geography: "Geography",
    animalsScience: "Animals and science",
    logicPuzzles: "Logic puzzles",
    timed: "Timed fluency",
    daily: "Daily practice"
  };

  if (!value) return labels.daily;
  const key = String(value).toLowerCase();
  if (labels[key]) return labels[key];

  return String(value)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function summarizeAttemptTopics(attempts, isCorrect) {
  const topicCounts = attempts
    .filter((attempt) => attempt.correct === isCorrect)
    .reduce((counts, attempt) => {
      const topic = formatTopicName(attempt.skill || attempt.path || attempt.mode || attempt.subject);
      counts[topic] = (counts[topic] || 0) + 1;
      return counts;
    }, {});

  return Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 4)
    .map(([topic, count]) => `${topic} (${count})`);
}

function renderTopicNote(attempts) {
  const rightTopics = summarizeAttemptTopics(attempts, true);
  const wrongTopics = summarizeAttemptTopics(attempts, false);

  return `
    <div class="topic-note">
      <strong>Topic note</strong>
      <p><b>Got right:</b> ${rightTopics.length ? escapeHtml(rightTopics.join(", ")) : "No correct practice yet."}</p>
      <p><b>Needs review:</b> ${wrongTopics.length ? escapeHtml(wrongTopics.join(", ")) : "No wrong answers yet."}</p>
    </div>
  `;
}

function getAttemptDateKey(timestamp) {
  const date = new Date(timestamp || Date.now());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatHistoryDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function getSelectedHistoryDate(child, attempts) {
  const dateKeys = [...new Set(attempts.map((attempt) => getAttemptDateKey(attempt.createdAt)))]
    .sort((a, b) => b.localeCompare(a));

  if (!dateKeys.length) return "";
  return dateKeys.includes(dashboardState.historyDateByChild[child.id])
    ? dashboardState.historyDateByChild[child.id]
    : dateKeys[0];
}

function renderPerformanceHistory(child, attempts) {
  const grouped = attempts.reduce((days, attempt) => {
    const dateKey = getAttemptDateKey(attempt.createdAt);
    days[dateKey] = days[dateKey] || [];
    days[dateKey].push(attempt);
    return days;
  }, {});

  const dateKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a)).slice(0, 12);

  if (!dateKeys.length) {
    return `
      <div class="performance-history">
        <strong>Performance history</strong>
        <div class="history-empty">
          <strong>No performance history yet</strong>
          <span>Completed practice will appear here by date.</span>
        </div>
      </div>
    `;
  }

  const selectedDate = getSelectedHistoryDate(child, attempts);
  const options = dateKeys.map((dateKey) => `
    <option value="${escapeHtml(dateKey)}" ${dateKey === selectedDate ? "selected" : ""}>${escapeHtml(formatHistoryDate(dateKey))}</option>
  `).join("");

  return `
    <div class="performance-history">
      <strong>Performance history</strong>
      <label for="history-${escapeHtml(child.id)}">Choose date</label>
      <select id="history-${escapeHtml(child.id)}" data-history-child="${escapeHtml(child.id)}">
        ${options}
      </select>
    </div>
  `;
}

function renderWorkReview(childId, filter = "all", subject = "all", dateKey = "") {
  const child = demoData.children.find((item) => item.id === childId);

  if (!child) {
    workReview.classList.add("hidden");
    return;
  }

  const attempts = getChildAttempts(child.id).filter((attempt) => {
    const matchesSubject = subject === "all" || attempt.subject === subject;
    const matchesDate = !dateKey || getAttemptDateKey(attempt.createdAt) === dateKey;
    return matchesSubject && matchesDate;
  });
  const visibleAttempts = filter === "mastered"
    ? attempts.filter((attempt) => attempt.correct)
    : filter === "wrong"
      ? attempts.filter((attempt) => !attempt.correct)
      : attempts;
  const correct = attempts.filter((attempt) => attempt.correct).length;
  const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;
  const subjectLabel = getSubjectLabel(subject);
  const dateLabel = dateKey ? ` on ${formatHistoryDate(dateKey)}` : "";
  const reviewTitle = {
    all: `${subjectLabel} answers${dateLabel}`,
    score: `${subjectLabel} score: ${accuracy}%${dateLabel}`,
    mastered: `${subjectLabel} correct answers${dateLabel}`,
    wrong: `${subjectLabel} wrong answers${dateLabel}`
  }[filter] || "All answers";

  const rows = visibleAttempts.map((attempt) => `
    <article class="work-row ${attempt.correct ? "is-correct" : "needs-review"}">
      <div>
        <strong>${escapeHtml(attempt.question)}</strong>
        <span>${escapeHtml(formatHistoryDate(getAttemptDateKey(attempt.createdAt)))} - ${escapeHtml(attempt.subject)} - ${escapeHtml(attempt.skill || attempt.path || attempt.mode || "daily")} - ${escapeHtml(getDifficultyLabel(attempt.difficulty))}</span>
      </div>
      <div>
        <small>Kid answer</small>
        <b>${escapeHtml(attempt.answer || "blank")}</b>
      </div>
      <div>
        <small>Right answer</small>
        <b>${escapeHtml(attempt.correctAnswer || "Not saved yet")}</b>
      </div>
      <em>${attempt.correct ? "Correct" : "Review"}</em>
    </article>
  `).join("") || `
    <article class="work-row">
      <div>
        <strong>No matching work yet</strong>
        <span>This view has no answers to show.</span>
      </div>
    </article>
  `;

  workReview.classList.remove("hidden");
  workReview.innerHTML = `
    <div class="section-heading">
      <div>
        <p class="eyebrow">Work review</p>
        <h2>${escapeHtml(child.name)} - ${escapeHtml(reviewTitle)}</h2>
      </div>
      <button class="ghost-button" type="button" data-close-review>Close</button>
    </div>
    <div class="work-list">${rows}</div>
  `;
  workReview.scrollIntoView({ behavior: "smooth", block: "start" });
}

const ageGroupLabel = document.querySelector("#ageGroupLabel");
const placementResultLabel = document.querySelector("#placementResultLabel");
const subjectButtons = document.querySelectorAll(".subject-button");
const authScreen = document.querySelector("#authScreen");
const appShell = document.querySelector("#appShell");
const parentLoginForm = document.querySelector("#parentLoginForm");
const kidLoginForm = document.querySelector("#kidLoginForm");
const academyLoginForm = document.querySelector("#academyLoginForm");
const authMessage = document.querySelector("#authMessage");
const logoutButton = document.querySelector("#logoutButton");
const profileAvatar = document.querySelector("#profileAvatar");
const profileName = document.querySelector("#profileName");
const profileMeta = document.querySelector("#profileMeta");
const appEyebrow = document.querySelector("#appEyebrow");
const appTitle = document.querySelector("#appTitle");
const topicSelect = document.querySelector("#topicSelect");
const parentDashboard = document.querySelector("#parentDashboard");
const parentReport = document.querySelector("#parentReport");
const rankingGrid = document.querySelector("#rankingGrid");
const stateRankingGrid = document.querySelector("#stateRankingGrid");
const academySummary = document.querySelector("#academySummary");
const academyManagement = document.querySelector("#academyManagement");
const workReview = document.querySelector("#workReview");
const parentChildManager = document.querySelector("#parentChildManager");
const parentChildForm = document.querySelector("#parentChildForm");
const parentQuestionManager = document.querySelector("#parentQuestionManager");
const parentQuestionForm = document.querySelector("#parentQuestionForm");
const parentQuestionChild = document.querySelector("#parentQuestionChild");
const parentQuestionSubject = document.querySelector("#parentQuestionSubject");
const parentQuestionPath = document.querySelector("#parentQuestionPath");
const parentQuestionLevel = document.querySelector("#parentQuestionLevel");
const parentQuestionCount = document.querySelector("#parentQuestionCount");
const parentQuestionTimed = document.querySelector("#parentQuestionTimed");
const parentQuestionMode = document.querySelector("#parentQuestionMode");
const parentQuestionCustomFields = document.querySelectorAll(".custom-question-field");
const parentQuestionText = document.querySelector("#parentQuestionText");
const parentQuestionAnswer = document.querySelector("#parentQuestionAnswer");
const parentQuestionExplanation = document.querySelector("#parentQuestionExplanation");
const parentQuestionPrompt = document.querySelector("#parentQuestionPrompt");
const parentQuestionDraftPanel = document.querySelector("#parentQuestionDraftPanel");
const parentQuestionDraftTitle = document.querySelector("#parentQuestionDraftTitle");
const parentQuestionDraftStatus = document.querySelector("#parentQuestionDraftStatus");
const parentQuestionDraftClear = document.querySelector("#parentQuestionDraftClear");
const parentQuestionSubmit = document.querySelector("#parentQuestionSubmit");
const timedChallengeBoard = document.querySelector("#timedChallengeBoard");
const parentChildState = document.querySelector("#parentChildState");
const parentChildLimitNote = document.querySelector("#parentChildLimitNote");
const academyParentForm = document.querySelector("#academyParentForm");
const academyStudentForm = document.querySelector("#academyStudentForm");
const academyStudentParent = document.querySelector("#academyStudentParent");
const academyStudentState = document.querySelector("#academyStudentState");
const parentRoster = document.querySelector("#parentRoster");
const childRoster = document.querySelector("#childRoster");
const learnerSections = document.querySelectorAll(".learner-only");
const parentOnlyItems = document.querySelectorAll(".parent-only");
const questionTitle = document.querySelector("#questionTitle");
const questionPrompt = document.querySelector("#questionPrompt");
const questionText = document.querySelector("#questionText");
const levelChip = document.querySelector("#levelChip");
const answerForm = document.querySelector("#answerForm");
const answerInput = document.querySelector("#answerInput");
const feedback = document.querySelector("#feedback");
const hintButton = document.querySelector("#hintButton");
const nextButton = document.querySelector("#nextButton");
const shareButtons = document.querySelectorAll("[data-share-app]");

async function shareAppLink() {
  const appUrl = `${window.location.origin}/`;
  const shareData = {
    title: "BrightPath Kids",
    text: "Join BrightPath Kids for English and math practice.",
    url: appUrl
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(appUrl);
    authMessage.textContent = "App link copied. Paste it into text, WhatsApp, or email.";
  } catch {
    authMessage.textContent = appUrl;
  }
}

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, "").replace(/,$/, "");
}

function getAdaptiveAgeGroup(ageGroup, difficulty) {
  const groups = ["early", "elementary", "middle", "teen"];
  const index = Math.max(0, groups.indexOf(ageGroup));

  if (difficulty === "easy") return groups[Math.max(0, index - 1)];
  if (difficulty === "hard") return groups[Math.min(groups.length - 1, index + 1)];
  return ageGroup;
}

function applyQuestionDifficulty(questions, difficulty) {
  return questions.map((question) => ({ ...question, difficulty }));
}

const supplementalCurriculumQuestionBank = {
  math: {
    early: {
      facts: [
        { skill: "Counting", title: "Count forward", prompt: "What number comes next?", text: "5, 6, 7, ?", answer: "8", hint: "Keep counting one more." },
        { skill: "Counting", title: "Count backward", prompt: "What number comes before 6?", text: "?, 6", answer: "5", hint: "Count back one step." },
        { skill: "Addition within 10", title: "Tiny sum", prompt: "Add.", text: "3 + 3 = ?", answer: "6", hint: "Three and three more make six." },
        { skill: "Addition within 10", title: "Add one", prompt: "Add.", text: "8 + 1 = ?", answer: "9", hint: "One more than 8 is 9." },
        { skill: "Subtraction within 10", title: "Take away", prompt: "Subtract.", text: "9 - 4 = ?", answer: "5", hint: "Count back four from 9." },
        { skill: "Number sense", title: "Compare numbers", prompt: "Which number is bigger?", text: "7 or 4", answer: "7", hint: "The bigger number comes later when you count." },
        { skill: "Number sense", title: "Missing number", prompt: "Fill the blank.", text: "1, 2, ?, 4", answer: "3", hint: "Count in order." }
      ],
      shapes: [
        { skill: "Geometry", title: "Circle check", prompt: "How many corners does a circle have?", text: "circle", answer: "0", hint: "A circle is round with no corners." },
        { skill: "Geometry", title: "Corner count", prompt: "How many corners does a rectangle have?", text: "rectangle", answer: "4", hint: "A rectangle has four corners." },
        { skill: "Geometry", title: "Side count", prompt: "How many sides does a triangle have?", text: "triangle", answer: "3", hint: "Tri means three." },
        { skill: "Geometry", title: "Shape match", prompt: "Which shape is round?", text: "circle or square", answer: "circle", hint: "A circle is round." },
        { skill: "Geometry", title: "Equal sides", prompt: "Which shape has 4 equal sides?", text: "square or rectangle", answer: "square", hint: "A square has four equal sides." },
        { skill: "Position words", title: "Position", prompt: "Which word means under?", text: "below or above", answer: "below", hint: "Below means under." },
        { skill: "Position words", title: "Position", prompt: "Which word means beside?", text: "next to or over", answer: "nextto", hint: "Beside means next to." },
        { skill: "Geometry", title: "Oval check", prompt: "Which shape looks like a stretched circle?", text: "oval or cube", answer: "oval", hint: "An oval is round and stretched." },
        { skill: "Geometry", title: "Solid shape", prompt: "Which shape is like a ball?", text: "sphere or square", answer: "sphere", hint: "A sphere is round in every direction." },
        { skill: "Geometry", title: "Flat shape", prompt: "Which is flat?", text: "triangle or cube", answer: "triangle", hint: "A triangle is a flat shape." },
        { skill: "Position words", title: "Position", prompt: "Which word means in front?", text: "front or behind", answer: "front", hint: "In front means before something." }
      ],
      fractions: [
        { skill: "Equal parts", title: "Whole", prompt: "How many fourths make one whole?", text: "fourths in a whole", answer: "4", hint: "Four equal fourths make a whole." },
        { skill: "Equal parts", title: "Half", prompt: "Which is bigger?", text: "1/2 or 1/4", answer: "1/2", hint: "A half is larger than a fourth." },
        { skill: "Equal parts", title: "Fair shares", prompt: "Share 8 crackers between 2 kids. Each gets?", text: "8 shared by 2", answer: "4", hint: "Split 8 into two equal groups." },
        { skill: "Equal parts", title: "Equal shares", prompt: "Are 2 and 2 equal shares?", text: "yes or no", answer: "yes", hint: "Both groups have the same amount." },
        { skill: "Equal parts", title: "Not equal", prompt: "Are 1 and 3 equal shares?", text: "yes or no", answer: "no", hint: "Equal shares match." },
        { skill: "Equal parts", title: "Thirds", prompt: "How many thirds make a whole?", text: "thirds in a whole", answer: "3", hint: "Three equal thirds make a whole." },
        { skill: "Equal parts", title: "Quarter", prompt: "Which shows one of four equal parts?", text: "1/4 or 1/2", answer: "1/4", hint: "A quarter is one of four parts." },
        { skill: "Equal parts", title: "Half match", prompt: "Which word means two equal parts?", text: "halves or thirds", answer: "halves", hint: "Halves are two equal parts." },
        { skill: "Equal parts", title: "Share equally", prompt: "Share 10 berries between 2 kids. Each gets?", text: "10 shared by 2", answer: "5", hint: "Split 10 into two equal groups." },
        { skill: "Equal parts", title: "Two equal groups", prompt: "Are 4 and 4 equal shares?", text: "yes or no", answer: "yes", hint: "Both groups have the same amount." },
        { skill: "Equal parts", title: "Unequal groups", prompt: "Are 2 and 5 equal shares?", text: "yes or no", answer: "no", hint: "Equal shares must match." },
        { skill: "Equal parts", title: "Half of a set", prompt: "What is half of 6?", text: "half of 6", answer: "3", hint: "Split 6 into two equal groups." },
        { skill: "Equal parts", title: "Fourth of a set", prompt: "What is one fourth of 8?", text: "1/4 of 8", answer: "2", hint: "Split 8 into four equal groups." },
        { skill: "Equal parts", title: "Whole set", prompt: "If two halves are 3 and 3, what is the whole?", text: "3 + 3", answer: "6", hint: "Put the two equal halves together." }
      ],
      algebra: [
        { skill: "Patterns", title: "Count by twos", prompt: "What comes next?", text: "4, 6, 8, ?", answer: "10", hint: "Add 2 each time." },
        { skill: "Patterns", title: "Count by fives", prompt: "What comes next?", text: "5, 10, 15, ?", answer: "20", hint: "Add 5 each time." },
        { skill: "Missing number", title: "Missing addend", prompt: "Find the missing number.", text: "4 + ? = 7", answer: "3", hint: "What makes 7 with 4?" },
        { skill: "Missing number", title: "Missing number", prompt: "Find the missing number.", text: "? + 2 = 6", answer: "4", hint: "Four and two make six." },
        { skill: "Patterns", title: "Repeat pattern", prompt: "What comes next?", text: "red blue red blue ?", answer: "red", hint: "The pattern repeats red, blue." },
        { skill: "Patterns", title: "Shape pattern", prompt: "What comes next?", text: "circle square circle square ?", answer: "circle", hint: "The pattern repeats circle, square." },
        { skill: "Balance", title: "Same value", prompt: "What number makes both sides equal?", text: "3 + 2 = ?", answer: "5", hint: "Both sides need the same value." }
      ]
    },
    elementary: {
      facts: [
        { skill: "Operations", title: "Multi-digit addition", prompt: "Add.", text: "326 + 148 = ?", answer: "474", hint: "Add ones, tens, then hundreds." },
        { skill: "Operations", title: "Subtraction", prompt: "Subtract.", text: "512 - 276 = ?", answer: "236", hint: "Regroup where needed." },
        { skill: "Operations", title: "Multiplication fact", prompt: "Multiply.", text: "8 x 6 = ?", answer: "48", hint: "Eight groups of six." },
        { skill: "Operations", title: "Division fact", prompt: "Divide.", text: "63 / 7 = ?", answer: "9", hint: "Seven times nine is 63." },
        { skill: "Operations", title: "Place value", prompt: "What is the value of 7?", text: "4,732", answer: "700", hint: "The 7 is in the hundreds place." },
        { skill: "Operations", title: "Round number", prompt: "Round to the nearest ten.", text: "67", answer: "70", hint: "67 is closer to 70 than 60." },
        { skill: "Operations", title: "Word fact", prompt: "There are 6 bags with 4 apples each. Total apples?", text: "6 x 4", answer: "24", hint: "Multiply groups by items in each group." }
      ],
      shapes: [
        { skill: "Geometry", title: "Area model", prompt: "Find the area.", text: "6 by 5 rectangle", answer: "30", hint: "Area is length times width." },
        { skill: "Geometry", title: "Perimeter", prompt: "Find the perimeter.", text: "sides: 8, 8, 4, 4", answer: "24", hint: "Add all side lengths." },
        { skill: "Geometry", title: "Right angle", prompt: "How many degrees are in a right angle?", text: "right angle", answer: "90", hint: "A square corner is 90 degrees." },
        { skill: "Geometry", title: "Parallel lines", prompt: "Do parallel lines meet?", text: "yes or no", answer: "no", hint: "Parallel lines stay the same distance apart." },
        { skill: "Geometry", title: "Quadrilateral", prompt: "How many sides does a quadrilateral have?", text: "quadrilateral", answer: "4", hint: "Quad means four." },
        { skill: "Geometry", title: "Symmetry", prompt: "Does a square have lines of symmetry?", text: "yes or no", answer: "yes", hint: "A square can fold evenly more than one way." },
        { skill: "Geometry", title: "Angle type", prompt: "Name an angle greater than 90 degrees.", text: "greater than 90", answer: "obtuse", hint: "Wide angles are obtuse." }
      ],
      fractions: [
        { skill: "Fractions", title: "Equivalent fraction", prompt: "Complete the equivalent fraction.", text: "3/4 = ?/8", answer: "6", hint: "Multiply top and bottom by 2." },
        { skill: "Fractions", title: "Add like fractions", prompt: "Add.", text: "1/7 + 4/7 = ?", answer: "5/7", hint: "Keep sevenths and add the numerators." },
        { skill: "Fractions", title: "Subtract like fractions", prompt: "Subtract.", text: "5/6 - 2/6 = ?", answer: "3/6", hint: "Keep sixths and subtract the numerators." },
        { skill: "Fractions", title: "Compare", prompt: "Which is larger?", text: "2/3 or 1/3", answer: "2/3", hint: "Same denominator, compare numerators." },
        { skill: "Fractions", title: "Simplify", prompt: "Simplify.", text: "6/8", answer: "3/4", hint: "Divide top and bottom by 2." },
        { skill: "Fractions", title: "Fraction of number", prompt: "Find one fourth of 20.", text: "1/4 of 20", answer: "5", hint: "Divide 20 by 4." },
        { skill: "Fractions", title: "Mixed number", prompt: "How many wholes are in 7/3?", text: "7/3", answer: "2", hint: "Three fits into seven two whole times." },
        { skill: "Fractions", title: "Equivalent fraction", prompt: "Complete the equivalent fraction.", text: "2/5 = ?/10", answer: "4", hint: "Multiply top and bottom by 2." },
        { skill: "Fractions", title: "Subtract like fractions", prompt: "Subtract.", text: "7/9 - 4/9 = ?", answer: "3/9", hint: "Keep ninths and subtract the top numbers." },
        { skill: "Fractions", title: "Fraction of number", prompt: "Find one third of 21.", text: "1/3 of 21", answer: "7", hint: "Divide 21 by 3." }
      ],
      algebra: [
        { skill: "Patterns", title: "Pattern rule", prompt: "What is the rule?", text: "8, 16, 24, 32", answer: "add8", hint: "Type add8." },
        { skill: "Expressions", title: "Evaluate", prompt: "Evaluate when n = 9.", text: "n + 18", answer: "27", hint: "Replace n with 9." },
        { skill: "Expressions", title: "Evaluate", prompt: "Evaluate when x = 4.", text: "3x + 2", answer: "14", hint: "3 times 4, plus 2." },
        { skill: "Missing number", title: "Missing factor", prompt: "Find the missing number.", text: "? x 7 = 42", answer: "6", hint: "Six times seven is 42." },
        { skill: "Equations", title: "One-step equation", prompt: "Find x.", text: "x + 12 = 31", answer: "19", hint: "Subtract 12 from 31." },
        { skill: "Equations", title: "One-step equation", prompt: "Find x.", text: "5x = 45", answer: "9", hint: "Divide 45 by 5." },
        { skill: "Patterns", title: "Input output", prompt: "Use the rule add 6.", text: "input 13 -> output ?", answer: "19", hint: "Add 6 to 13." }
      ]
    },
    middle: {
      facts: [
        { skill: "Rational numbers", title: "Integer difference", prompt: "Subtract.", text: "-3 - 8 = ?", answer: "-11", hint: "Move 8 steps left from -3." },
        { skill: "Rational numbers", title: "Integer product", prompt: "Multiply.", text: "-6 x 4 = ?", answer: "-24", hint: "Negative times positive is negative." },
        { skill: "Ratios", title: "Unit rate", prompt: "Find the unit rate.", text: "45 miles in 3 hours", answer: "15", hint: "45 divided by 3." },
        { skill: "Percents", title: "Percent", prompt: "Find 15% of 60.", text: "15% of 60", answer: "9", hint: "10% is 6 and 5% is 3." },
        { skill: "Rational numbers", title: "Decimal sum", prompt: "Add.", text: "3.75 + 1.6 = ?", answer: "5.35", hint: "Line up decimal points." },
        { skill: "Exponents", title: "Evaluate exponent", prompt: "Evaluate.", text: "2^5", answer: "32", hint: "Multiply five 2s." },
        { skill: "Order of operations", title: "Evaluate", prompt: "Use order of operations.", text: "6 + 3 x 4", answer: "18", hint: "Multiply before adding." }
      ],
      shapes: [
        { skill: "Geometry", title: "Triangle area", prompt: "Find the area.", text: "base 12, height 5", answer: "30", hint: "Use base times height divided by 2." },
        { skill: "Geometry", title: "Circle measure", prompt: "Find circumference. Use 3.14 for pi.", text: "diameter = 10", answer: "31.4", hint: "Circumference is pi times diameter." },
        { skill: "Geometry", title: "Volume", prompt: "Find volume.", text: "2 x 6 x 7 box", answer: "84", hint: "Multiply length, width, and height." },
        { skill: "Geometry", title: "Surface area", prompt: "Find surface area of a cube.", text: "side length 3", answer: "54", hint: "A cube has 6 faces, each 3 x 3." },
        { skill: "Geometry", title: "Missing angle", prompt: "Find the missing triangle angle.", text: "60, 70, ?", answer: "50", hint: "Triangle angles add to 180." },
        { skill: "Geometry", title: "Scale drawing", prompt: "Scale 4 inches by factor 3.", text: "4 x 3", answer: "12", hint: "Multiply by the scale factor." },
        { skill: "Geometry", title: "Coordinate plane", prompt: "Which quadrant has x negative and y positive?", text: "(-, +)", answer: "2", hint: "Quadrant II has negative x and positive y." }
      ],
      fractions: [
        { skill: "Rational numbers", title: "Fraction difference", prompt: "Subtract.", text: "5/6 - 1/3 = ?", answer: "1/2", hint: "Change 1/3 to 2/6." },
        { skill: "Rational numbers", title: "Divide fractions", prompt: "Divide.", text: "3/4 / 1/2 = ?", answer: "3/2", hint: "Multiply by the reciprocal 2/1." },
        { skill: "Ratios", title: "Simplify ratio", prompt: "Simplify.", text: "21:35", answer: "3:5", hint: "Divide both parts by 7." },
        { skill: "Proportions", title: "Solve proportion", prompt: "Solve.", text: "2/5 = x/20", answer: "8", hint: "5 to 20 is times 4." },
        { skill: "Percents", title: "Percent to fraction", prompt: "Write 25% as a fraction.", text: "25%", answer: "1/4", hint: "25 out of 100 simplifies to 1/4." },
        { skill: "Rational numbers", title: "Mixed number", prompt: "Convert to an improper fraction.", text: "2 1/3", answer: "7/3", hint: "2 wholes are 6 thirds, plus 1 third." },
        { skill: "Rational numbers", title: "Decimal to fraction", prompt: "Write as a fraction.", text: "0.5", answer: "1/2", hint: "Five tenths simplifies to one half." }
      ],
      algebra: [
        { skill: "Equations", title: "Two-step equation", prompt: "Solve.", text: "2x + 9 = 25", answer: "8", hint: "Subtract 9, then divide by 2." },
        { skill: "Equations", title: "One-step equation", prompt: "Solve.", text: "x - 14 = 6", answer: "20", hint: "Add 14 to both sides." },
        { skill: "Expressions", title: "Combine terms", prompt: "Simplify.", text: "3x + 5x", answer: "8x", hint: "Add the coefficients." },
        { skill: "Expressions", title: "Distribute", prompt: "Simplify.", text: "2(x + 7)", answer: "2x+14", hint: "Multiply 2 by each term." },
        { skill: "Inequalities", title: "Solve inequality", prompt: "Solve.", text: "x + 5 > 12", answer: "x>7", hint: "Subtract 5 from both sides." },
        { skill: "Functions", title: "Function value", prompt: "Find f(3).", text: "f(x)=4x-1", answer: "11", hint: "Replace x with 3." },
        { skill: "Slope", title: "Find slope", prompt: "Find the slope.", text: "(1, 2) and (4, 8)", answer: "2", hint: "Rise 6, run 3." }
      ]
    },
    teen: {
      facts: [
        { skill: "Algebra fluency", title: "Exponent", prompt: "Evaluate.", text: "5^3", answer: "125", hint: "5 x 5 x 5." },
        { skill: "Functions", title: "Function value", prompt: "Find f(-2).", text: "f(x)=x^2+3x", answer: "-2", hint: "4 plus -6." },
        { skill: "Statistics", title: "Median", prompt: "Find the median.", text: "4, 9, 10, 18, 20", answer: "10", hint: "The median is the middle value." },
        { skill: "Algebra fluency", title: "Radical", prompt: "Evaluate.", text: "sqrt(144)", answer: "12", hint: "12 times 12 is 144." },
        { skill: "Functions", title: "Domain", prompt: "Which value is not allowed?", text: "1/(x-3)", answer: "3", hint: "The denominator cannot be zero." },
        { skill: "Statistics", title: "Range", prompt: "Find the range.", text: "6, 8, 15, 21", answer: "15", hint: "Subtract smallest from largest." },
        { skill: "Algebra fluency", title: "Scientific notation", prompt: "Write as a number.", text: "3.2 x 10^3", answer: "3200", hint: "Move the decimal 3 places right." }
      ],
      shapes: [
        { skill: "Geometry", title: "Distance", prompt: "Find the distance.", text: "(1,2) and (4,6)", answer: "5", hint: "Use the 3-4-5 triangle." },
        { skill: "Geometry", title: "Similarity", prompt: "Solve for x.", text: "4/6 = x/15", answer: "10", hint: "6 to 15 is times 2.5." },
        { skill: "Geometry", title: "Circle equation", prompt: "What is the radius?", text: "(x+1)^2 + (y-4)^2 = 25", answer: "5", hint: "The radius squared is 25." },
        { skill: "Geometry", title: "Pythagorean theorem", prompt: "Find the hypotenuse.", text: "legs 5 and 12", answer: "13", hint: "5-12-13 is a Pythagorean triple." },
        { skill: "Geometry", title: "Arc length", prompt: "Find 1/4 of circumference if circumference is 40.", text: "40 / 4", answer: "10", hint: "A quarter arc is one fourth." },
        { skill: "Geometry", title: "Triangle sum", prompt: "Find the missing angle.", text: "35, 65, ?", answer: "80", hint: "Triangle angles total 180." },
        { skill: "Geometry", title: "Midpoint", prompt: "Find the midpoint.", text: "(2,4) and (8,10)", answer: "(5,7)", hint: "Average the x-values and y-values." }
      ],
      fractions: [
        { skill: "Algebraic fractions", title: "Simplify", prompt: "Simplify.", text: "(x^2 - 16)/(x - 4)", answer: "x+4", hint: "Factor the numerator." },
        { skill: "Proportions", title: "Solve proportion", prompt: "Solve.", text: "7/9 = x/45", answer: "35", hint: "9 to 45 is times 5." },
        { skill: "Percents", title: "Percent decrease", prompt: "Find percent decrease.", text: "100 to 80", answer: "20%", hint: "Decrease is 20 out of 100." },
        { skill: "Rational expressions", title: "Domain", prompt: "Which value is excluded?", text: "1/(x+2)", answer: "-2", hint: "The denominator cannot be zero." },
        { skill: "Rational equations", title: "Solve", prompt: "Solve.", text: "x/3 = 8", answer: "24", hint: "Multiply both sides by 3." },
        { skill: "Complex fractions", title: "Simplify", prompt: "Simplify.", text: "(1/2)/(1/4)", answer: "2", hint: "One half contains two fourths." },
        { skill: "Percents", title: "Markup", prompt: "A $50 item increases by 10%. New price?", text: "$50 + 10%", answer: "55", hint: "10% of 50 is 5." }
      ],
      algebra: [
        { skill: "Algebra", title: "Quadratic roots", prompt: "Solve.", text: "x^2 - 9x + 20 = 0", answer: "4,5", hint: "Factor into (x - 4)(x - 5)." },
        { skill: "Functions", title: "Slope", prompt: "Find the slope.", text: "(-1, 4) and (3, 12)", answer: "2", hint: "Rise 8, run 4." },
        { skill: "Systems", title: "System", prompt: "Solve for y.", text: "x + y = 11, x = 6", answer: "5", hint: "Replace x with 6." },
        { skill: "Functions", title: "Y-intercept", prompt: "Find the y-intercept.", text: "y = 3x - 7", answer: "-7", hint: "The y-intercept is b." },
        { skill: "Algebra", title: "Factor", prompt: "Factor.", text: "x^2 + 7x + 12", answer: "(x+3)(x+4)", hint: "Find two numbers that multiply to 12 and add to 7." },
        { skill: "Algebra", title: "Inequality", prompt: "Solve.", text: "2x - 4 >= 10", answer: "x>=7", hint: "Add 4, then divide by 2." },
        { skill: "Functions", title: "Composition", prompt: "Find f(g(2)).", text: "f(x)=x+3, g(x)=2x", answer: "7", hint: "g(2)=4, then f(4)=7." }
      ]
    }
  },
  english: {
    early: {
      phonics: [
        { skill: "Phonics", title: "Beginning sound", prompt: "What letter starts the word?", text: "moon", answer: "m", hint: "Say the first sound." },
        { skill: "Phonics", title: "Ending sound", prompt: "What letter ends the word?", text: "dog", answer: "g", hint: "Stretch the word and listen to the last sound." },
        { skill: "Phonics", title: "Short vowel", prompt: "What vowel sound is in cat?", text: "cat", answer: "a", hint: "Listen to the middle sound." },
        { skill: "Phonics", title: "Rhyme", prompt: "Which word rhymes with bed?", text: "red or sun", answer: "red", hint: "Listen for the same ending sound." },
        { skill: "Phonics", title: "Blend", prompt: "What word do these sounds make?", text: "s - u - n", answer: "sun", hint: "Say the sounds together." },
        { skill: "Phonics", title: "Beginning sound", prompt: "What letter starts the word?", text: "turtle", answer: "t", hint: "Say the first sound." },
        { skill: "Phonics", title: "Ending sound", prompt: "What sound ends the word?", text: "cup", answer: "p", hint: "Listen to the last sound." }
      ],
      reading: [
        { skill: "Reading", title: "Who", prompt: "Who is the sentence about?", text: "Sam jumps.", answer: "sam", hint: "Find the person." },
        { skill: "Reading", title: "What", prompt: "What does the dog do?", text: "The dog runs.", answer: "runs", hint: "Find the action." },
        { skill: "Reading", title: "Where", prompt: "Where is the cat?", text: "The cat is on the mat.", answer: "mat", hint: "Look after on the." },
        { skill: "Sight words", title: "Sight word", prompt: "Type the word.", text: "and", answer: "and", hint: "Copy each letter." },
        { skill: "Reading", title: "Detail", prompt: "What color is the ball?", text: "The ball is red.", answer: "red", hint: "Find the color word." },
        { skill: "Reading", title: "Action", prompt: "What does Mia do?", text: "Mia reads.", answer: "reads", hint: "Find the action word." },
        { skill: "Reading", title: "Object", prompt: "What does Ben see?", text: "Ben sees a fish.", answer: "fish", hint: "Find what Ben sees." }
      ],
      grammar: [
        { skill: "Nouns", title: "Naming word", prompt: "Which is a person?", text: "mom or run", answer: "mom", hint: "A noun names a person." },
        { skill: "Nouns", title: "Naming word", prompt: "Which is a place?", text: "park or jump", answer: "park", hint: "A place can be a noun." },
        { skill: "Verbs", title: "Action word", prompt: "Which is an action?", text: "hop or blue", answer: "hop", hint: "An action is something you do." },
        { skill: "Adjectives", title: "Describing word", prompt: "Which word describes?", text: "soft, run, dog", answer: "soft", hint: "Soft tells what kind." },
        { skill: "Sentences", title: "End mark", prompt: "Which mark ends a telling sentence?", text: ". or ?", answer: ".", hint: "A telling sentence usually ends with a period." },
        { skill: "Sentences", title: "Capital letter", prompt: "Should a name start with a capital?", text: "yes or no", answer: "yes", hint: "Names begin with capital letters." },
        { skill: "Nouns", title: "Thing word", prompt: "Which is a thing?", text: "cup or sing", answer: "cup", hint: "A cup is a thing." }
      ],
      writing: [
        { skill: "Writing", title: "Complete sentence", prompt: "Choose the complete sentence.", text: "I like cats. / Like cats.", answer: "ilikecats", hint: "Choose the one with I doing something." },
        { skill: "Writing", title: "Detail word", prompt: "Choose the describing word.", text: "green, jump, run", answer: "green", hint: "Green describes a thing." },
        { skill: "Writing", title: "Word order", prompt: "Which sounds right?", text: "The bird flies. / Flies bird the.", answer: "thebirdflies", hint: "Choose the clear sentence." },
        { skill: "Writing", title: "Capital letter", prompt: "Which starts correctly?", text: "Mia runs. / mia runs.", answer: "miaruns", hint: "A name starts with a capital." },
        { skill: "Writing", title: "Add detail", prompt: "Which has more detail?", text: "dog / brown dog", answer: "browndog", hint: "Brown tells more about the dog." },
        { skill: "Writing", title: "Sentence ending", prompt: "Choose the sentence with an end mark.", text: "I can run. / I can run", answer: "icanrun", hint: "A sentence needs an end mark." },
        { skill: "Writing", title: "Idea", prompt: "Which tells a complete idea?", text: "The sun is hot. / Hot sun", answer: "thesunishot", hint: "Choose the complete thought." }
      ]
    },
    elementary: {
      phonics: [
        { skill: "Phonics", title: "Long vowel", prompt: "Which word has a long i sound?", text: "bike or bit", answer: "bike", hint: "Silent e helps the vowel say its name." },
        { skill: "Phonics", title: "Vowel team", prompt: "Type the vowel team.", text: "rain", answer: "ai", hint: "Two vowels work together." },
        { skill: "Phonics", title: "Blend", prompt: "Type the beginning blend.", text: "tree", answer: "tr", hint: "Listen to the first two sounds." },
        { skill: "Phonics", title: "Digraph", prompt: "Type the beginning digraph.", text: "ship", answer: "sh", hint: "The first two letters make one sound." },
        { skill: "Phonics", title: "Silent letter", prompt: "Which letter is silent?", text: "knee", answer: "k", hint: "You hear nee." },
        { skill: "Phonics", title: "Syllables", prompt: "How many syllables?", text: "basket", answer: "2", hint: "Say bas-ket." },
        { skill: "Phonics", title: "Suffix", prompt: "What suffix is added?", text: "jumping", answer: "ing", hint: "Look at the ending." }
      ],
      reading: [
        { skill: "Comprehension", title: "Main idea", prompt: "What is this mostly about?", text: "Owls hunt at night and sleep during the day.", answer: "owls", hint: "Find the topic." },
        { skill: "Comprehension", title: "Detail", prompt: "When do owls hunt?", text: "Owls hunt at night.", answer: "night", hint: "Look for when." },
        { skill: "Comprehension", title: "Inference", prompt: "Jaya grabbed a towel after swimming. Why?", text: "after swimming", answer: "dryoff", hint: "What do towels do?" },
        { skill: "Comprehension", title: "Sequence", prompt: "What comes first?", text: "plant seed, water seed, see sprout", answer: "plantseed", hint: "You plant before watering." },
        { skill: "Comprehension", title: "Cause", prompt: "Why did the road get wet?", text: "Rain fell all morning.", answer: "rain", hint: "The cause is what happened." },
        { skill: "Comprehension", title: "Character", prompt: "What trait does sharing show?", text: "Ana shared her snack.", answer: "kind", hint: "Sharing is kind." },
        { skill: "Comprehension", title: "Vocabulary", prompt: "What does tiny mean?", text: "tiny", answer: "small", hint: "Tiny means very small." }
      ],
      grammar: [
        { skill: "Grammar", title: "Noun", prompt: "Pick the noun.", text: "The river flows.", answer: "river", hint: "A noun names a thing or place." },
        { skill: "Grammar", title: "Verb", prompt: "Pick the verb.", text: "Lena paints carefully.", answer: "paints", hint: "The verb is the action." },
        { skill: "Grammar", title: "Adjective", prompt: "Pick the adjective.", text: "The golden leaf fell.", answer: "golden", hint: "It describes the leaf." },
        { skill: "Grammar", title: "Adverb", prompt: "Pick the adverb.", text: "He ran quickly.", answer: "quickly", hint: "It tells how he ran." },
        { skill: "Grammar", title: "Pronoun", prompt: "Replace Ben with a pronoun.", text: "Ben is reading.", answer: "he", hint: "Use a word that can stand for Ben." },
        { skill: "Grammar", title: "Plural", prompt: "Choose the plural.", text: "box: boxs or boxes", answer: "boxes", hint: "Box adds es." },
        { skill: "Grammar", title: "Conjunction", prompt: "Choose a joining word.", text: "and, jump, blue", answer: "and", hint: "And joins ideas." }
      ],
      writing: [
        { skill: "Writing", title: "Topic sentence", prompt: "Choose a topic sentence.", text: "Dogs need daily care. / Brown fur.", answer: "dogsneeddailycare", hint: "A topic sentence gives the main idea." },
        { skill: "Writing", title: "Transition", prompt: "Choose a cause transition.", text: "because, first, red", answer: "because", hint: "Because explains why." },
        { skill: "Writing", title: "Stronger verb", prompt: "Choose a stronger verb for said.", text: "whispered, table, green", answer: "whispered", hint: "Whispered is a specific way to say something." },
        { skill: "Writing", title: "Detail", prompt: "Which detail is specific?", text: "a bird / a tiny blue bird", answer: "atinybluebird", hint: "Specific details help readers picture it." },
        { skill: "Writing", title: "Closing sentence", prompt: "What should a paragraph end with?", text: "closing idea or random word", answer: "closingidea", hint: "End by wrapping up the idea." },
        { skill: "Writing", title: "Revise", prompt: "Choose the clearer sentence.", text: "The puppy slept on the rug. / Puppy rug slept.", answer: "thepuppysleptontherug", hint: "Choose the complete clear sentence." },
        { skill: "Writing", title: "Opinion", prompt: "Which phrase shows opinion?", text: "I think / It is 5", answer: "ithink", hint: "Opinions tell what someone thinks." }
      ]
    },
    middle: {
      phonics: [
        { skill: "Word study", title: "Prefix", prompt: "What does pre- mean?", text: "preview", answer: "before", hint: "Preview means view before." },
        { skill: "Word study", title: "Prefix", prompt: "What does un- mean?", text: "unknown", answer: "not", hint: "Unknown means not known." },
        { skill: "Word study", title: "Suffix", prompt: "What does -ful mean?", text: "hopeful", answer: "full", hint: "Hopeful means full of hope." },
        { skill: "Word study", title: "Root", prompt: "What does graph mean?", text: "autograph", answer: "write", hint: "Graph relates to writing." },
        { skill: "Word study", title: "Root", prompt: "What does port mean?", text: "transport", answer: "carry", hint: "Transport means carry across." },
        { skill: "Word study", title: "Context", prompt: "What does scarce mean?", text: "Water was scarce, so we saved every drop.", answer: "limited", hint: "They saved it because there was not much." },
        { skill: "Word study", title: "Suffix", prompt: "What does -able mean?", text: "readable", answer: "able", hint: "Readable means able to be read." }
      ],
      reading: [
        { skill: "Comprehension", title: "Theme", prompt: "Name the theme.", text: "Nia kept trying after each mistake.", answer: "perseverance", hint: "Think about the lesson." },
        { skill: "Comprehension", title: "Evidence", prompt: "Which word shows kindness?", text: "Marco offered help to a new student.", answer: "help", hint: "Find the action that supports kindness." },
        { skill: "Comprehension", title: "Inference", prompt: "What trait does this show?", text: "Sam checked every answer twice.", answer: "careful", hint: "Checking work shows care." },
        { skill: "Comprehension", title: "Central idea", prompt: "What is the central idea?", text: "Sleep helps the brain learn and remember.", answer: "sleep", hint: "Find the main topic." },
        { skill: "Comprehension", title: "Cause", prompt: "What caused the game delay?", text: "Lightning appeared, so the game stopped.", answer: "lightning", hint: "The cause comes before so." },
        { skill: "Comprehension", title: "Point of view", prompt: "Who tells the story?", text: "I packed my bag and left.", answer: "firstperson", hint: "I signals first person." },
        { skill: "Comprehension", title: "Compare", prompt: "Which word signals contrast?", text: "however, also, and", answer: "however", hint: "However shows a turn." }
      ],
      grammar: [
        { skill: "Grammar", title: "Phrase", prompt: "Name the phrase type.", text: "beside the window", answer: "prepositional", hint: "It begins with a preposition." },
        { skill: "Grammar", title: "Pronoun case", prompt: "Choose the correct pronoun.", text: "This is for Maya and ___. I/me", answer: "me", hint: "Use the object pronoun after for." },
        { skill: "Grammar", title: "Verb agreement", prompt: "Choose the verb.", text: "The players ___ ready. is/are", answer: "are", hint: "Players is plural." },
        { skill: "Grammar", title: "Subject", prompt: "Find the subject.", text: "The bright stars shimmered.", answer: "stars", hint: "Who or what shimmered?" },
        { skill: "Grammar", title: "Predicate", prompt: "Find the predicate.", text: "The dog barked loudly.", answer: "barkedloudly", hint: "The predicate tells what the subject did." },
        { skill: "Grammar", title: "Comma", prompt: "Which needs a comma?", text: "After dinner we walked.", answer: "afterdinner", hint: "Introductory phrases often need commas." },
        { skill: "Grammar", title: "Clause", prompt: "Is this dependent or independent?", text: "because it rained", answer: "dependent", hint: "It does not stand alone." }
      ],
      writing: [
        { skill: "Writing", title: "Claim", prompt: "Choose the claim.", text: "Schools should start later. / 7:30 a.m.", answer: "schoolsshouldstartlater", hint: "A claim states a position." },
        { skill: "Writing", title: "Evidence", prompt: "What supports a claim?", text: "evidence or unrelated detail", answer: "evidence", hint: "Evidence proves the point." },
        { skill: "Writing", title: "Transition", prompt: "Choose an addition transition.", text: "also, however, although", answer: "also", hint: "Also adds another idea." },
        { skill: "Writing", title: "Revision", prompt: "Choose the concise phrase.", text: "now / at this point in time", answer: "now", hint: "Shorter can be clearer." },
        { skill: "Writing", title: "Conclusion", prompt: "What does a conclusion do?", text: "wraps up or starts a new topic", answer: "wrapsup", hint: "A conclusion ends the idea." },
        { skill: "Writing", title: "Audience", prompt: "Formal writing should avoid what?", text: "slang or evidence", answer: "slang", hint: "Formal writing uses polished language." },
        { skill: "Writing", title: "Organization", prompt: "What comes after a topic sentence?", text: "supporting details or title", answer: "supportingdetails", hint: "Details support the main idea." }
      ]
    },
    teen: {
      phonics: [
        { skill: "Vocabulary", title: "Greek root", prompt: "What does tele mean?", text: "telescope", answer: "far", hint: "A telescope helps you see far." },
        { skill: "Vocabulary", title: "Latin root", prompt: "What does scrib mean?", text: "describe", answer: "write", hint: "Scrib relates to writing." },
        { skill: "Vocabulary", title: "Word meaning", prompt: "Choose the closest meaning of concise.", text: "brief, messy, loud", answer: "brief", hint: "Concise means short and clear." },
        { skill: "Vocabulary", title: "Root", prompt: "What does cred mean?", text: "credible", answer: "believe", hint: "Cred relates to belief." },
        { skill: "Vocabulary", title: "Root", prompt: "What does aud mean?", text: "audience", answer: "hear", hint: "Aud relates to hearing." },
        { skill: "Vocabulary", title: "Context", prompt: "What does inevitable mean?", text: "The outcome was inevitable; nothing could stop it.", answer: "unavoidable", hint: "Nothing could stop it." },
        { skill: "Vocabulary", title: "Word parts", prompt: "What does anti- mean?", text: "antifreeze", answer: "against", hint: "Anti means against." }
      ],
      reading: [
        { skill: "Analysis", title: "Rhetoric", prompt: "Which appeal uses credibility?", text: "ethos, pathos, logos", answer: "ethos", hint: "Ethos connects to trust." },
        { skill: "Analysis", title: "Tone", prompt: "Name the tone.", text: "The proposal is risky and likely to fail.", answer: "skeptical", hint: "The speaker doubts it." },
        { skill: "Analysis", title: "Central idea", prompt: "What is the central idea?", text: "Reliable evidence strengthens an argument.", answer: "evidence", hint: "Find the main concept." },
        { skill: "Analysis", title: "Inference", prompt: "What can you infer?", text: "The lights were off and the room was silent.", answer: "empty", hint: "No lights or sound suggests no one is there." },
        { skill: "Analysis", title: "Structure", prompt: "Which structure compares two ideas?", text: "comparecontrast or sequence", answer: "comparecontrast", hint: "Compare and contrast shows similarities and differences." },
        { skill: "Analysis", title: "Evidence", prompt: "What type of evidence uses numbers?", text: "statistics or anecdote", answer: "statistics", hint: "Statistics are numerical evidence." },
        { skill: "Analysis", title: "Purpose", prompt: "What is the author's purpose?", text: "A speech urges people to recycle.", answer: "persuade", hint: "Urging action is persuasion." }
      ],
      grammar: [
        { skill: "Grammar", title: "Parallel structure", prompt: "Choose the parallel phrase.", text: "to read, to write, to revise / reading, to write, revise", answer: "toreadtowritetorevise", hint: "All items should match form." },
        { skill: "Grammar", title: "Modifier", prompt: "What is wrong?", text: "Walking to school, the rain began.", answer: "danglingmodifier", hint: "The rain is not walking." },
        { skill: "Grammar", title: "Concise language", prompt: "Replace with one word.", text: "in order to", answer: "to", hint: "Use the shorter form." },
        { skill: "Grammar", title: "Agreement", prompt: "Choose the verb.", text: "Neither answer ___ correct. is/are", answer: "is", hint: "Neither is singular." },
        { skill: "Grammar", title: "Semicolon", prompt: "Which joins two related independent clauses?", text: "semicolon or apostrophe", answer: "semicolon", hint: "A semicolon can join two complete thoughts." },
        { skill: "Grammar", title: "Active voice", prompt: "Choose active voice.", text: "The team won. / The game was won by the team.", answer: "theteamwon", hint: "The subject does the action." },
        { skill: "Grammar", title: "Pronoun clarity", prompt: "What should pronouns have?", text: "clear antecedent or vague reference", answer: "clearantecedent", hint: "Readers need to know who or what the pronoun means." }
      ],
      writing: [
        { skill: "Writing", title: "Thesis", prompt: "Choose the stronger thesis.", text: "Public transit should expand because it reduces traffic. / Buses exist.", answer: "publictransitshouldexpandbecauseitreducestraffic", hint: "A thesis makes a clear claim with a reason." },
        { skill: "Writing", title: "Evidence", prompt: "Which is stronger evidence?", text: "a study result or a random guess", answer: "astudyresult", hint: "Research is stronger than guessing." },
        { skill: "Writing", title: "Revision", prompt: "Choose the concise phrase.", text: "because / due to the fact that", answer: "because", hint: "One word is clearer." },
        { skill: "Writing", title: "Counterclaim", prompt: "What does a counterclaim show?", text: "opposing view or topic title", answer: "opposingview", hint: "Counter means against." },
        { skill: "Writing", title: "Analysis", prompt: "What should analysis explain?", text: "why evidence matters or page number", answer: "whyevidencematters", hint: "Analysis connects evidence to the claim." },
        { skill: "Writing", title: "Style", prompt: "Formal style should be what?", text: "clear and precise or slang-heavy", answer: "clearandprecise", hint: "Formal writing is polished." },
        { skill: "Writing", title: "Conclusion", prompt: "A conclusion should do what?", text: "synthesize ideas or add unrelated facts", answer: "synthesizeideas", hint: "Synthesize means bring ideas together." }
      ]
    }
  }
};

function mergeUniqueQuestions(questions) {
  const seen = new Set();

  return questions.filter((question) => {
    const key = `${question.skill}|${question.title}|${question.text}|${question.answer}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function createMathGeneratedQuestion(ageGroup, path, index) {
  const levelOffset = { early: 1, elementary: 4, middle: 7, teen: 10 }[ageGroup] || 4;
  const n = index + levelOffset;

  if (path === "facts") {
    if (ageGroup === "early") {
      const a = (index % 5) + 1;
      const b = ((index + 2) % 4) + 1;
      const isSubtract = index % 3 === 0;
      return isSubtract
        ? { skill: "Number facts", title: "Take away", prompt: "Subtract.", text: `${a + b} - ${b} = ?`, answer: String(a), hint: "Count back the second number." }
        : { skill: "Number facts", title: "Add facts", prompt: "Add.", text: `${a} + ${b} = ?`, answer: String(a + b), hint: "Count both groups together." };
    }

    if (ageGroup === "elementary") {
      const a = 24 + index * 7;
      const b = 13 + index * 3;
      const tables = [6, 7, 8, 9, 11, 12];
      const factor = tables[index % tables.length];
      return index % 2
        ? { skill: "Operations", title: "Multiplication fact", prompt: "Multiply.", text: `${factor} x ${(index % 9) + 3} = ?`, answer: String(factor * ((index % 9) + 3)), hint: "Break the multiplication into smaller facts." }
        : { skill: "Operations", title: "Multi-digit addition", prompt: "Add.", text: `${a} + ${b} = ?`, answer: String(a + b), hint: "Add ones, tens, then hundreds." };
    }

    if (ageGroup === "middle") {
      const values = [
        { text: `-${n} + ${n + 8} = ?`, answer: String(8), hint: "Move right from the negative number.", skill: "Integers", title: "Integer sum" },
        { text: `${n * 6} / ${n} = ?`, answer: "6", hint: "Use the inverse of multiplication.", skill: "Rational numbers", title: "Division fluency" },
        { text: `Find ${10 + index}% of ${40 + index * 5}.`, answer: String(((10 + index) / 100) * (40 + index * 5)), hint: "Change percent to a decimal, then multiply.", skill: "Percents", title: "Percent fluency" }
      ];
      const item = values[index % values.length];
      return { ...item, prompt: item.title.includes("Percent") ? "Find the percent." : "Solve." };
    }

    const a = index + 2;
    const values = [
      { skill: "Algebra fluency", title: "Exponent", prompt: "Evaluate.", text: `${a}^2`, answer: String(a * a), hint: "Square means multiply the number by itself." },
      { skill: "Functions", title: "Function value", prompt: `Find f(${a}).`, text: "f(x)=3x+2", answer: String(3 * a + 2), hint: "Substitute the input for x." },
      { skill: "Statistics", title: "Mean", prompt: "Find the mean.", text: `${a}, ${a + 2}, ${a + 4}`, answer: String(a + 2), hint: "Add the values and divide by 3." }
    ];
    return values[index % values.length];
  }

  if (path === "numberSense") {
    if (ageGroup === "early") {
      const options = [
        { skill: "Number Sense", title: "Counting", prompt: "What number comes next?", text: `${n}, ${n + 1}, ${n + 2}, ?`, answer: String(n + 3), hint: "Keep counting by 1." },
        { skill: "Number Sense", title: "Compare", prompt: "Which number is larger?", text: `${n + 2} or ${n + 5}`, answer: String(n + 5), hint: "The larger number comes later when counting." },
        { skill: "Number Sense", title: "Before", prompt: "What number comes before?", text: `${n + 4}`, answer: String(n + 3), hint: "Count back one." }
      ];
      return options[index % options.length];
    }

    if (ageGroup === "elementary") {
      const value = 230 + index * 17;
      const options = [
        { skill: "Place Value", title: "Tens place", prompt: "What digit is in the tens place?", text: String(value), answer: String(Math.floor(value / 10) % 10), hint: "The tens place is the second digit from the right." },
        { skill: "Rounding", title: "Nearest ten", prompt: "Round to the nearest ten.", text: String(value), answer: String(Math.round(value / 10) * 10), hint: "Use the ones digit to decide." },
        { skill: "Number Sense", title: "Expanded form", prompt: "What is the value of the hundreds digit?", text: String(value), answer: String(Math.floor(value / 100) * 100), hint: "The hundreds digit tells how many hundreds." }
      ];
      return options[index % options.length];
    }

    if (ageGroup === "middle") {
      const options = [
        { skill: "Integers", title: "Absolute value", prompt: "Find the absolute value.", text: `|-${n + 4}|`, answer: String(n + 4), hint: "Absolute value is distance from zero." },
        { skill: "Integers", title: "Order integers", prompt: "Which is greatest?", text: `-${n}, ${n - 3}, 0`, answer: String(n - 3), hint: "Positive numbers are greater than zero and negatives." },
        { skill: "Number Sense", title: "Prime check", prompt: "Is this number prime? yes/no", text: "17", answer: "yes", hint: "17 has only 1 and itself as factors." }
      ];
      return options[index % options.length];
    }

    const options = [
      { skill: "Scientific Notation", title: "Scientific notation", prompt: "Write as a regular number.", text: `${n} x 10^3`, answer: String(n * 1000), hint: "Move the decimal 3 places right." },
      { skill: "Number Sense", title: "Square root", prompt: "Find the square root.", text: String((n + 2) * (n + 2)), answer: String(n + 2), hint: "Find the number multiplied by itself." },
      { skill: "Number Sense", title: "Estimate", prompt: "Estimate to the nearest hundred.", text: String(1040 + index * 83), answer: String(Math.round((1040 + index * 83) / 100) * 100), hint: "Round to the closest hundred." }
    ];
    return options[index % options.length];
  }

  if (path === "decimals") {
    const a = ((index % 9) + 1) / 10;
    const b = (((index + 3) % 8) + 1) / 10;

    if (ageGroup === "early") {
      const larger = Math.max(a, b).toFixed(1);
      return { skill: "Decimals", title: "Compare tenths", prompt: "Which decimal is larger?", text: `${a.toFixed(1)} or ${b.toFixed(1)}`, answer: larger, hint: "Compare the tenths digits." };
    }

    if (ageGroup === "elementary") {
      const options = [
        { skill: "Decimals", title: "Add decimals", prompt: "Add.", text: `${a.toFixed(1)} + ${b.toFixed(1)} = ?`, answer: (a + b).toFixed(1), hint: "Line up the decimal points." },
        { skill: "Decimals", title: "Subtract decimals", prompt: "Subtract.", text: `${(a + 1).toFixed(1)} - ${b.toFixed(1)} = ?`, answer: (a + 1 - b).toFixed(1), hint: "Line up the decimal points." },
        { skill: "Decimals", title: "Fraction to decimal", prompt: "Write as a decimal.", text: "1/2", answer: "0.5", hint: "One half is five tenths." }
      ];
      return options[index % options.length];
    }

    if (ageGroup === "middle") {
      const whole = index + 2;
      const options = [
        { skill: "Decimals", title: "Multiply decimal", prompt: "Multiply.", text: `${whole} x 0.5`, answer: (whole * 0.5).toFixed(1), hint: "Multiplying by 0.5 means taking half." },
        { skill: "Decimals", title: "Divide decimal", prompt: "Divide.", text: `${whole}.0 / 0.5`, answer: String(whole * 2), hint: "Dividing by one half doubles the number." },
        { skill: "Decimals", title: "Percent to decimal", prompt: "Write as a decimal.", text: `${20 + index}%`, answer: ((20 + index) / 100).toFixed(2), hint: "Divide the percent by 100." }
      ];
      return options[index % options.length];
    }

    const options = [
      { skill: "Decimals", title: "Evaluate decimal expression", prompt: "Evaluate.", text: `${n}.5 + ${n}.25`, answer: (n + 0.5 + n + 0.25).toFixed(2), hint: "Add whole numbers, then decimals." },
      { skill: "Decimals", title: "Scientific decimal", prompt: "Write as a decimal.", text: `${n} x 10^-2`, answer: (n / 100).toFixed(2), hint: "Move the decimal 2 places left." },
      { skill: "Decimals", title: "Solve decimal equation", prompt: "Solve for x.", text: `x + 0.75 = ${(n + 0.75).toFixed(2)}`, answer: String(n), hint: "Subtract 0.75 from both sides." }
    ];
    return options[index % options.length];
  }

  if (path === "percents") {
    const base = 40 + index * 10;
    const percent = [10, 20, 25, 50][index % 4];
    const amount = base * percent / 100;

    if (ageGroup === "early") {
      return { skill: "Percents", title: "Half", prompt: "50% means what?", text: "50%", answer: "half", hint: "50% is one half." };
    }

    if (ageGroup === "elementary") {
      return { skill: "Percents", title: "Percent of number", prompt: `Find ${percent}% of ${base}.`, text: `${percent}% of ${base}`, answer: String(amount), hint: "Change the percent to a fraction or decimal." };
    }

    if (ageGroup === "middle") {
      const options = [
        { skill: "Percents", title: "Discount", prompt: "Find the sale price.", text: `${base} with ${percent}% off`, answer: String(base - amount), hint: "Subtract the discount from the original price." },
        { skill: "Percents", title: "Tip", prompt: "Find a 20% tip.", text: `$${base}`, answer: String(base * 0.2), hint: "20% is one fifth." },
        { skill: "Percents", title: "Percent change", prompt: "Find percent increase.", text: `${base} to ${base + amount}`, answer: `${percent}%`, hint: "Increase divided by original equals percent change." }
      ];
      return options[index % options.length];
    }

    const options = [
      { skill: "Percents", title: "Compound growth", prompt: "After 10% growth, what is the new value?", text: String(base), answer: String(base * 1.1), hint: "Multiply by 1.10." },
      { skill: "Percents", title: "Reverse percent", prompt: "What original number has 25% equal to this?", text: String(amount), answer: String(amount / 0.25), hint: "Divide by 0.25." },
      { skill: "Percents", title: "Percent equation", prompt: "Solve for x.", text: `20% of x = ${base / 5}`, answer: String(base), hint: "20% is 0.2, so divide by 0.2." }
    ];
    return options[index % options.length];
  }

  if (path === "ratios") {
    const scale = index + 2;

    if (ageGroup === "early") {
      return { skill: "Ratios", title: "Equal groups", prompt: "How many total?", text: `${scale} groups of 2`, answer: String(scale * 2), hint: "Add 2 for each group." };
    }

    if (ageGroup === "elementary") {
      const options = [
        { skill: "Ratios", title: "Simplify ratio", prompt: "Simplify.", text: `${scale * 2}:${scale * 3}`, answer: "2:3", hint: "Divide both parts by the same number." },
        { skill: "Rates", title: "Unit rate", prompt: "Find miles per hour.", text: `${scale * 30} miles in ${scale} hours`, answer: "30", hint: "Divide miles by hours." },
        { skill: "Ratios", title: "Scale up", prompt: "Scale 2:5 by 3.", text: "2:5", answer: "6:15", hint: "Multiply both parts by 3." }
      ];
      return options[index % options.length];
    }

    if (ageGroup === "middle") {
      const options = [
        { skill: "Proportions", title: "Solve proportion", prompt: "Solve for x.", text: `3/4 = x/${(scale + 1) * 4}`, answer: String((scale + 1) * 3), hint: "Scale 4 to the denominator, then scale 3 the same way." },
        { skill: "Unit Rates", title: "Price per item", prompt: "Find price per item.", text: `$${scale * 6} for ${scale} items`, answer: "6", hint: "Divide total price by number of items." },
        { skill: "Ratios", title: "Part to whole", prompt: "What fraction is blue?", text: `${scale} blue, ${scale * 2} red`, answer: "1/3", hint: "Blue is one part out of three equal parts." }
      ];
      return options[index % options.length];
    }

    const options = [
      { skill: "Proportions", title: "Direct variation", prompt: "Find k if y = kx.", text: `x=${scale}, y=${scale * 7}`, answer: "7", hint: "Divide y by x." },
      { skill: "Rates", title: "Speed", prompt: "Find average speed.", text: `${scale * 45} miles in ${scale} hours`, answer: "45", hint: "Distance divided by time." },
      { skill: "Ratios", title: "Golden ratio estimate", prompt: "Round 13/8 to two decimals.", text: "13/8", answer: "1.63", hint: "Divide 13 by 8." }
    ];
    return options[index % options.length];
  }

  if (path === "measurement") {
    if (ageGroup === "early") {
      const options = [
        { skill: "Measurement", title: "Time", prompt: "How many minutes are in 1 hour?", text: "1 hour", answer: "60", hint: "One hour has 60 minutes." },
        { skill: "Measurement", title: "Money", prompt: "How many cents is one quarter?", text: "quarter", answer: "25", hint: "A quarter is 25 cents." },
        { skill: "Measurement", title: "Length", prompt: "Which is longer?", text: "foot or inch", answer: "foot", hint: "A foot has 12 inches." }
      ];
      return options[index % options.length];
    }

    if (ageGroup === "elementary") {
      const options = [
        { skill: "Measurement", title: "Feet to inches", prompt: "Convert to inches.", text: `${n} feet`, answer: String(n * 12), hint: "Each foot has 12 inches." },
        { skill: "Measurement", title: "Hours to minutes", prompt: "Convert to minutes.", text: `${n} hours`, answer: String(n * 60), hint: "Each hour has 60 minutes." },
        { skill: "Measurement", title: "Money", prompt: "How many cents?", text: `${n} quarters`, answer: String(n * 25), hint: "Each quarter is 25 cents." }
      ];
      return options[index % options.length];
    }

    if (ageGroup === "middle") {
      const options = [
        { skill: "Measurement", title: "Unit conversion", prompt: "Convert pounds to ounces.", text: `${n} lb`, answer: String(n * 16), hint: "Each pound has 16 ounces." },
        { skill: "Measurement", title: "Capacity", prompt: "Convert cups to ounces.", text: `${n} cups`, answer: String(n * 8), hint: "Each cup has 8 fluid ounces." },
        { skill: "Measurement", title: "Elapsed time", prompt: "How many minutes from 2:15 to 3:00?", text: "2:15 to 3:00", answer: "45", hint: "Count from 2:15 to 3:00." }
      ];
      return options[index % options.length];
    }

    const options = [
      { skill: "Measurement", title: "Rate conversion", prompt: "Convert hours to seconds.", text: `${n} hours`, answer: String(n * 3600), hint: "One hour is 3600 seconds." },
      { skill: "Measurement", title: "Density", prompt: "Find density.", text: `${n * 10} grams / ${n} mL`, answer: "10", hint: "Density is mass divided by volume." },
      { skill: "Measurement", title: "Dimensional analysis", prompt: "Convert meters to centimeters.", text: `${n} meters`, answer: String(n * 100), hint: "One meter is 100 centimeters." }
    ];
    return options[index % options.length];
  }

  if (path === "wordProblems") {
    if (ageGroup === "early") {
      return { skill: "Word Problems", title: "Add story", prompt: "How many in all?", text: `${n} birds and 2 more birds`, answer: String(n + 2), hint: "In all means add." };
    }

    if (ageGroup === "elementary") {
      const options = [
        { skill: "Word Problems", title: "Equal groups", prompt: "How many total apples?", text: `${n} bags with 4 apples each`, answer: String(n * 4), hint: "Equal groups mean multiply." },
        { skill: "Word Problems", title: "Left over", prompt: "How many remain?", text: `${n * 5} pencils, ${n + 3} used`, answer: String(n * 5 - n - 3), hint: "Remaining means subtract." },
        { skill: "Word Problems", title: "Share equally", prompt: "How many per group?", text: `${n * 6} stickers shared by ${n} kids`, answer: "6", hint: "Sharing equally means divide." }
      ];
      return options[index % options.length];
    }

    if (ageGroup === "middle") {
      const options = [
        { skill: "Word Problems", title: "Percent story", prompt: "How many points did the score increase?", text: `${n * 10} points increased by 20%`, answer: String(n * 2), hint: "20% is one fifth." },
        { skill: "Word Problems", title: "Ratio story", prompt: "How many red beads?", text: `red:blue is 3:2, blue is ${n * 2}`, answer: String(n * 3), hint: "Scale both ratio parts by the same factor." },
        { skill: "Word Problems", title: "Equation story", prompt: "Find the number.", text: `Twice a number plus 4 is ${2 * n + 4}`, answer: String(n), hint: "Undo plus 4, then divide by 2." }
      ];
      return options[index % options.length];
    }

    const options = [
      { skill: "Word Problems", title: "Linear model", prompt: "Find total cost.", text: `$${n} fee plus $3 per ticket for 4 tickets`, answer: String(n + 12), hint: "Fixed fee plus rate times number." },
      { skill: "Word Problems", title: "Mixture", prompt: "Find total amount.", text: `${n} liters plus ${n + 2} liters`, answer: String(2 * n + 2), hint: "Add the amounts." },
      { skill: "Word Problems", title: "Break-even", prompt: "Solve for x.", text: `5x = ${n * 5}`, answer: String(n), hint: "Divide both sides by 5." }
    ];
    return options[index % options.length];
  }

  if (path === "dataGraphs") {
    const values = [n, n + 2, n + 4, n + 6];

    if (ageGroup === "early") {
      return { skill: "Data", title: "Count votes", prompt: "How many total votes?", text: `${n} yes and 2 no`, answer: String(n + 2), hint: "Add both groups." };
    }

    if (ageGroup === "elementary") {
      const options = [
        { skill: "Data", title: "Mean", prompt: "Find the mean.", text: values.slice(0, 3).join(", "), answer: String(n + 2), hint: "Add the values and divide by 3." },
        { skill: "Data", title: "Range", prompt: "Find the range.", text: values.join(", "), answer: "6", hint: "Largest minus smallest." },
        { skill: "Data", title: "Mode", prompt: "Find the mode.", text: `${n}, ${n + 1}, ${n + 1}, ${n + 3}`, answer: String(n + 1), hint: "Mode appears most often." }
      ];
      return options[index % options.length];
    }

    if (ageGroup === "middle") {
      const options = [
        { skill: "Data", title: "Median", prompt: "Find the median.", text: values.join(", "), answer: String(n + 3), hint: "Average the two middle values." },
        { skill: "Probability", title: "Simple probability", prompt: "Probability of red?", text: `${n} red, ${n} blue`, answer: "1/2", hint: "Red outcomes over total outcomes." },
        { skill: "Data", title: "Mean with outlier", prompt: "Find the mean.", text: `${n}, ${n}, ${n + 9}`, answer: String(n + 3), hint: "Add and divide by 3." }
      ];
      return options[index % options.length];
    }

    const options = [
      { skill: "Data", title: "Weighted average", prompt: "Find the weighted average.", text: `two ${n}s and one ${n + 9}`, answer: String(n + 3), hint: "Add all weighted values and divide by total count." },
      { skill: "Probability", title: "Complement", prompt: "If P(rain)=0.3, find P(no rain).", text: "P(rain)=0.3", answer: "0.7", hint: "Complement is 1 minus the probability." },
      { skill: "Data", title: "Slope from table", prompt: "Find the rate of change.", text: `(1, ${n}) and (3, ${n + 8})`, answer: "4", hint: "Change in y divided by change in x." }
    ];
    return options[index % options.length];
  }

  if (path === "shapes") {
    if (ageGroup === "early") {
      const shapes = [
        ["pentagon", "5", "sides"], ["hexagon", "6", "sides"], ["square", "4", "corners"],
        ["triangle", "3", "corners"], ["circle", "0", "corners"], ["rectangle", "4", "sides"]
      ];
      const [shape, answer, measure] = shapes[index % shapes.length];
      return { skill: "Geometry", title: "Shape check", prompt: `How many ${measure} does a ${shape} have?`, text: shape, answer, hint: "Picture the shape and count each part." };
    }

    if (ageGroup === "elementary") {
      const length = 4 + index;
      const width = 3 + (index % 5);
      const options = [
        { skill: "Geometry", title: "Area", prompt: "Find the rectangle area.", text: `${length} by ${width}`, answer: String(length * width), hint: "Area is length times width." },
        { skill: "Geometry", title: "Perimeter", prompt: "Find the rectangle perimeter.", text: `${length}, ${width}, ${length}, ${width}`, answer: String(2 * (length + width)), hint: "Add all four sides." },
        { skill: "Geometry", title: "Angle", prompt: "Name an angle exactly 90 degrees.", text: "90 degrees", answer: "right", hint: "A square corner is a right angle." }
      ];
      return options[index % options.length];
    }

    if (ageGroup === "middle") {
      const base = 8 + index;
      const height = 4 + (index % 6);
      const options = [
        { skill: "Geometry", title: "Triangle area", prompt: "Find the area.", text: `base ${base}, height ${height}`, answer: String((base * height) / 2), hint: "Triangle area is base times height divided by 2." },
        { skill: "Geometry", title: "Missing angle", prompt: "Find the third triangle angle.", text: `${50 + index}, ${60 - (index % 10)}, ?`, answer: String(180 - (50 + index) - (60 - (index % 10))), hint: "Triangle angles add to 180." },
        { skill: "Geometry", title: "Volume", prompt: "Find volume.", text: `${index + 2} x ${index + 3} x 4`, answer: String((index + 2) * (index + 3) * 4), hint: "Multiply length, width, and height." }
      ];
      return options[index % options.length];
    }

    const x1 = index;
    const y1 = index + 2;
    const x2 = index + 3;
    const y2 = index + 6;
    const options = [
      { skill: "Geometry", title: "Distance", prompt: "Find the distance.", text: `(${x1},${y1}) and (${x1 + 3},${y1 + 4})`, answer: "5", hint: "This makes a 3-4-5 triangle." },
      { skill: "Geometry", title: "Midpoint", prompt: "Find the midpoint.", text: `(${x1},${y1}) and (${x2},${y2})`, answer: `(${(x1 + x2) / 2},${(y1 + y2) / 2})`, hint: "Average the x-values and y-values." },
      { skill: "Geometry", title: "Circle radius", prompt: "Find the radius.", text: `(x-${index + 1})^2 + (y+2)^2 = ${Math.pow(index + 4, 2)}`, answer: String(index + 4), hint: "The radius squared is the number on the right." }
    ];
    return options[index % options.length];
  }

  if (path === "fractions") {
    if (ageGroup === "early") {
      const shares = [2, 3, 4, 5];
      const parts = shares[index % shares.length];
      return { skill: "Equal parts", title: "Equal shares", prompt: `How many ${parts === 2 ? "halves" : parts === 3 ? "thirds" : parts === 4 ? "fourths" : "fifths"} make one whole?`, text: `${parts} equal parts`, answer: String(parts), hint: "A whole is made from all equal parts." };
    }

    if (ageGroup === "elementary") {
      const d = 5 + (index % 5);
      const n1 = 1 + (index % 3);
      const n2 = 1 + ((index + 1) % 3);
      const options = [
        { skill: "Fractions", title: "Add like fractions", prompt: "Add.", text: `${n1}/${d} + ${n2}/${d} = ?`, answer: `${n1 + n2}/${d}`, hint: "Keep the denominator and add numerators." },
        { skill: "Fractions", title: "Equivalent fraction", prompt: "Complete the equivalent fraction.", text: `1/${n1 + 2} = ?/${(n1 + 2) * 3}`, answer: "3", hint: "Multiply top and bottom by 3." },
        { skill: "Fractions", title: "Fraction of number", prompt: `Find 1/${n1 + 2} of ${(n1 + 2) * 6}.`, text: `1/${n1 + 2}`, answer: "6", hint: "Divide by the denominator." }
      ];
      return options[index % options.length];
    }

    if (ageGroup === "middle") {
      const options = [
        { skill: "Rational numbers", title: "Add fractions", prompt: "Add.", text: "1/4 + 1/8 = ?", answer: "3/8", hint: "Change 1/4 to 2/8." },
        { skill: "Rational numbers", title: "Multiply fractions", prompt: "Multiply.", text: `${index + 2}/5 x 10 = ?`, answer: String((index + 2) * 2), hint: "10 divided by 5 is 2." },
        { skill: "Ratios", title: "Simplify ratio", prompt: "Simplify.", text: `${(index + 2) * 3}:${(index + 2) * 4}`, answer: "3:4", hint: "Divide both parts by the same factor." }
      ];
      return options[index % options.length];
    }

    const k = index + 2;
    const options = [
      { skill: "Rational expressions", title: "Simplify", prompt: "Simplify.", text: `(x^2 - ${k * k})/(x - ${k})`, answer: `x+${k}`, hint: "Factor the numerator as a difference of squares." },
      { skill: "Proportions", title: "Solve proportion", prompt: "Solve.", text: `${k}/${k + 3} = x/${(k + 3) * 5}`, answer: String(k * 5), hint: "Scale both numerator and denominator by 5." },
      { skill: "Percents", title: "Percent change", prompt: "Find percent increase.", text: `${k * 10} to ${k * 12}`, answer: "20%", hint: "The increase is one fifth of the original." }
    ];
    return options[index % options.length];
  }

  const algebraNumber = index + 3;
  if (ageGroup === "early") {
    const options = [
      { skill: "Patterns", title: "Number pattern", prompt: "What comes next?", text: `${algebraNumber}, ${algebraNumber + 2}, ${algebraNumber + 4}, ?`, answer: String(algebraNumber + 6), hint: "Add 2 each time." },
      { skill: "Missing number", title: "Missing addend", prompt: "Find the missing number.", text: `${algebraNumber} + ? = ${algebraNumber + 4}`, answer: "4", hint: "What do you add to make the total?" },
      { skill: "Patterns", title: "Repeat pattern", prompt: "What comes next?", text: "A A B A A B A A ?", answer: "b", hint: "The pattern repeats A, A, B." }
    ];
    return options[index % options.length];
  }

  if (ageGroup === "elementary") {
    const options = [
      { skill: "Equations", title: "One-step equation", prompt: "Find x.", text: `x + ${algebraNumber} = ${algebraNumber + 12}`, answer: "12", hint: "Subtract the added number." },
      { skill: "Expressions", title: "Evaluate", prompt: "Evaluate when x = 5.", text: `${algebraNumber}x + 1`, answer: String(algebraNumber * 5 + 1), hint: "Replace x with 5." },
      { skill: "Patterns", title: "Pattern rule", prompt: "What is the rule?", text: `${algebraNumber}, ${algebraNumber * 2}, ${algebraNumber * 3}, ${algebraNumber * 4}`, answer: `add${algebraNumber}`, hint: `Each term increases by ${algebraNumber}.` }
    ];
    return options[index % options.length];
  }

  if (ageGroup === "middle") {
    const options = [
      { skill: "Equations", title: "Two-step equation", prompt: "Solve.", text: `2x + ${algebraNumber} = ${algebraNumber + 18}`, answer: "9", hint: "Subtract first, then divide by 2." },
      { skill: "Expressions", title: "Distribute", prompt: "Simplify.", text: `${algebraNumber}(x + 2)`, answer: `${algebraNumber}x+${algebraNumber * 2}`, hint: "Multiply each term inside parentheses." },
      { skill: "Functions", title: "Function value", prompt: `Find f(${algebraNumber}).`, text: "f(x)=2x-3", answer: String(2 * algebraNumber - 3), hint: "Substitute the input for x." }
    ];
    return options[index % options.length];
  }

  const options = [
    { skill: "Algebra", title: "Quadratic roots", prompt: "Solve.", text: `x^2 - ${2 * algebraNumber + 1}x + ${algebraNumber * (algebraNumber + 1)} = 0`, answer: `${algebraNumber},${algebraNumber + 1}`, hint: "Factor using the two roots." },
    { skill: "Functions", title: "Slope", prompt: "Find the slope.", text: `(1, ${algebraNumber}) and (4, ${algebraNumber + 6})`, answer: "2", hint: "Rise 6, run 3." },
    { skill: "Systems", title: "System", prompt: "Solve for x.", text: `x + y = ${algebraNumber + 8}, y = 8`, answer: String(algebraNumber), hint: "Replace y with 8." }
  ];
  return options[index % options.length];
}

function createEnglishGeneratedQuestion(ageGroup, path, index) {
  const words = {
    early: ["map", "sun", "dog", "hat", "cup", "fish", "bed", "top", "red", "bug"],
    elementary: ["cake", "rain", "tree", "ship", "knee", "basket", "jumping", "bright", "plane", "cloud"],
    middle: ["preview", "unknown", "hopeful", "transport", "readable", "biology", "autograph", "fearless", "rewrite", "portable"],
    teen: ["concise", "credible", "audience", "inevitable", "antifreeze", "chronology", "ambiguous", "predict", "telescope", "describe"]
  }[ageGroup] || [];
  const word = words[index % words.length];

  if (path === "phonics") {
    if (ageGroup === "early") {
      const asksBeginning = index % 2 === 0;
      return { skill: "Phonics", title: asksBeginning ? "Beginning sound" : "Ending sound", prompt: asksBeginning ? "What letter starts the word?" : "What letter ends the word?", text: word, answer: asksBeginning ? word[0] : word[word.length - 1], hint: "Say the word slowly and listen to the sound." };
    }
    if (ageGroup === "elementary") {
      const teams = [
        ["cake", "a"], ["rain", "ai"], ["tree", "tr"], ["ship", "sh"], ["knee", "k"],
        ["basket", "2"], ["jumping", "ing"], ["plane", "a"], ["cloud", "ou"], ["bright", "br"]
      ];
      const [text, answer] = teams[index % teams.length];
      return { skill: "Phonics", title: "Word study", prompt: "Type the target sound or part.", text, answer, hint: "Look closely at the word parts." };
    }
    if (ageGroup === "middle") {
      const parts = [["preview", "before"], ["unknown", "not"], ["hopeful", "full"], ["transport", "carry"], ["readable", "able"], ["biology", "life"], ["autograph", "write"], ["fearless", "without"], ["rewrite", "again"], ["portable", "carry"]];
      const [text, answer] = parts[index % parts.length];
      return { skill: "Word study", title: "Word part meaning", prompt: "What does the word part mean?", text, answer, hint: "Use the prefix, suffix, or root meaning." };
    }
    const roots = [["concise", "brief"], ["credible", "believe"], ["audience", "hear"], ["inevitable", "unavoidable"], ["antifreeze", "against"], ["chronology", "time"], ["ambiguous", "unclear"], ["predict", "say"], ["telescope", "far"], ["describe", "write"]];
    const [text, answer] = roots[index % roots.length];
    return { skill: "Vocabulary", title: "Academic vocabulary", prompt: "Choose the closest meaning.", text, answer, hint: "Use the root or context clue." };
  }

  if (path === "vocabulary") {
    const vocabularySets = {
      early: [["big", "large"], ["small", "tiny"], ["happy", "glad"], ["sad", "unhappy"], ["fast", "quick"], ["cold", "chilly"], ["hot", "warm"], ["start", "begin"], ["end", "finish"], ["look", "see"]],
      elementary: [["ancient", "veryold"], ["brave", "courageous"], ["silent", "quiet"], ["rapid", "fast"], ["assist", "help"], ["select", "choose"], ["difficult", "hard"], ["simple", "easy"], ["observe", "watch"], ["repair", "fix"]],
      middle: [["contrast", "difference"], ["analyze", "examine"], ["evidence", "proof"], ["summarize", "shorten"], ["predict", "guess"], ["significant", "important"], ["infer", "conclude"], ["frequent", "often"], ["scarce", "rare"], ["expand", "grow"]],
      teen: [["ambiguous", "unclear"], ["concise", "brief"], ["credible", "believable"], ["inevitable", "unavoidable"], ["mitigate", "reduce"], ["advocate", "support"], ["scrutinize", "examine"], ["subtle", "slight"], ["robust", "strong"], ["coherent", "logical"]]
    };
    const [text, answer] = vocabularySets[ageGroup][index % 10];
    return { skill: "Vocabulary", title: "Word meaning", prompt: "Choose the closest meaning.", text, answer, hint: "Use context, roots, or related words." };
  }

  if (path === "spelling") {
    const spellingSets = {
      early: [["cat", "cat"], ["sun", "sun"], ["fish", "fish"], ["ship", "ship"], ["cake", "cake"], ["rain", "rain"], ["tree", "tree"], ["book", "book"], ["ball", "ball"], ["home", "home"]],
      elementary: [["running or runing", "running"], ["happier or happyer", "happier"], ["babies or babys", "babies"], ["planned or planed", "planned"], ["careful or carful", "careful"], ["because or becuz", "because"], ["friend or freind", "friend"], ["receive or recieve", "receive"], ["piece or peice", "piece"], ["citys or cities", "cities"]],
      middle: [["necessary or neccessary", "necessary"], ["separate or seperate", "separate"], ["definitely or definately", "definitely"], ["occurred or occured", "occurred"], ["beginning or begining", "beginning"], ["successful or succesful", "successful"], ["argument or arguement", "argument"], ["grammar or grammer", "grammar"], ["parallel or paralel", "parallel"], ["calendar or calender", "calendar"]],
      teen: [["accommodate or accomodate", "accommodate"], ["conscience or consience", "conscience"], ["privilege or priviledge", "privilege"], ["maintenance or maintainance", "maintenance"], ["pronunciation or pronounciation", "pronunciation"], ["supersede or supercede", "supersede"], ["questionnaire or questionaire", "questionnaire"], ["entrepreneur or entreprenuer", "entrepreneur"], ["rhythm or rythm", "rhythm"], ["liaison or liason", "liaison"]]
    };
    const [text, answer] = spellingSets[ageGroup][index % 10];
    return { skill: "Spelling", title: "Correct spelling", prompt: "Choose the correctly spelled word.", text, answer, hint: "Look for the standard spelling pattern." };
  }

  if (path === "reading") {
    const readingSets = {
      early: [
        ["The dog runs.", "Who runs?", "dog"], ["Mia reads.", "Who reads?", "mia"], ["The ball is red.", "What color is the ball?", "red"], ["Ben sees a fish.", "What does Ben see?", "fish"], ["The cat naps.", "What does the cat do?", "naps"],
        ["Sam jumps.", "Who jumps?", "sam"], ["The bird flies.", "What flies?", "bird"], ["The cup is blue.", "What color is the cup?", "blue"], ["The frog hops.", "What does the frog do?", "hops"], ["The sun is hot.", "What is hot?", "sun"]
      ],
      elementary: [
        ["Owls hunt at night.", "When do owls hunt?", "night"], ["Trees give shade.", "What do trees give?", "shade"], ["Rain made the road wet.", "What made the road wet?", "rain"], ["Ana shared her snack.", "What trait does sharing show?", "kind"], ["Tiny means very small.", "What does tiny mean?", "small"],
        ["Bees help flowers grow.", "What helps flowers grow?", "bees"], ["Mia packed an umbrella.", "What weather might come?", "rain"], ["Plants need sunlight.", "What do plants need?", "sunlight"], ["The seed sprouted after water.", "What came after water?", "sprout"], ["Leo studied and improved.", "Why did Leo improve?", "studied"]
      ],
      middle: [
        ["Nia kept trying after mistakes.", "Name the theme.", "perseverance"], ["Marco offered help.", "What trait is shown?", "kind"], ["Sam checked every answer twice.", "What trait is shown?", "careful"], ["Sleep helps memory.", "What is the central idea?", "sleep"], ["Lightning appeared, so the game stopped.", "What caused the stop?", "lightning"],
        ["I packed my bag and left.", "What point of view?", "firstperson"], ["However shows contrast.", "Which word signals contrast?", "however"], ["Evidence supports a claim.", "What supports a claim?", "evidence"], ["Ari returned the wallet.", "What trait is shown?", "honest"], ["The river overflowed after rain.", "What caused overflow?", "rain"]
      ],
      teen: [
        ["Ethos builds trust.", "Which appeal uses credibility?", "ethos"], ["The proposal is risky.", "Name the tone.", "skeptical"], ["Evidence strengthens arguments.", "What is the central idea?", "evidence"], ["The room was silent and dark.", "What can you infer?", "empty"], ["Statistics use numbers.", "What evidence uses numbers?", "statistics"],
        ["A speech urges recycling.", "Author purpose?", "persuade"], ["Pathos uses emotion.", "Which appeal uses emotion?", "pathos"], ["Logos uses logic.", "Which appeal uses logic?", "logos"], ["A timeline shows order.", "What structure is this?", "sequence"], ["Comparing two policies shows differences.", "What structure?", "comparecontrast"]
      ]
    };
    const [text, prompt, answer] = readingSets[ageGroup][index % 10];
    return { skill: "Reading", title: "Comprehension", prompt, text, answer, hint: "Use the sentence details." };
  }

  if (path === "comprehension") {
    const comprehensionSets = {
      early: [["The dog ran to the ball.", "What did the dog run to?", "ball"], ["Mia put on boots because it rained.", "Why did Mia wear boots?", "rain"], ["The bird built a nest.", "What did the bird build?", "nest"], ["Sam ate lunch after math.", "What happened first?", "math"], ["The red kite flew high.", "What color was the kite?", "red"], ["Ana smiled after winning.", "How did Ana feel?", "happy"], ["The fish swam in a pond.", "Where was the fish?", "pond"], ["The bell rang, so class began.", "What caused class to begin?", "bell"], ["The baby slept quietly.", "What did the baby do?", "slept"], ["The sun set and it got dark.", "What happened after sunset?", "dark"]],
      elementary: [["Plants need water and sunlight.", "What is the main idea?", "plants"], ["Leo studied, so his score improved.", "Why did Leo improve?", "studied"], ["A jacket was needed because the air was chilly.", "What does chilly mean?", "cold"], ["Nora returned the lost wallet.", "What trait is shown?", "honest"], ["The team practiced daily and won.", "What caused the win?", "practice"], ["Owls hunt at night.", "When do owls hunt?", "night"], ["The author explains how bees help plants.", "Author's purpose?", "inform"], ["Rain fell, and the field closed.", "What caused the field to close?", "rain"], ["The small seed became a plant.", "What changed?", "seed"], ["Lina kept trying after mistakes.", "Theme?", "perseverance"]],
      middle: [["The narrator says I packed my bag.", "Point of view?", "firstperson"], ["However, the plan failed.", "What does however signal?", "contrast"], ["Evidence supports a claim.", "What supports a claim?", "evidence"], ["Ari gave away his lunch to help.", "What trait is shown?", "generous"], ["The text compares two inventions.", "Text structure?", "comparecontrast"], ["Because the roads froze, school closed.", "What caused school to close?", "frozenroads"], ["The repeated storm image creates a worried mood.", "What mood?", "worried"], ["A paragraph begins with a broad claim, then proof.", "What comes after claim?", "proof"], ["The character learns to ask for help.", "Theme?", "humility"], ["Numbers in the article support the claim.", "What type of evidence?", "statistics"]],
      teen: [["Ethos relies on credibility.", "Which appeal is credibility?", "ethos"], ["The author's skeptical tone shows doubt.", "What does skeptical mean?", "doubtful"], ["A counterclaim presents the opposing view.", "What does counterclaim show?", "opposingview"], ["The passage moves from problem to solution.", "Text structure?", "problemsolution"], ["The speaker uses statistics to prove the point.", "Which appeal uses logic?", "logos"], ["The phrase creates a hopeful tone.", "What is the tone?", "hopeful"], ["An unreliable narrator may mislead readers.", "What may the narrator do?", "mislead"], ["The conclusion synthesizes ideas.", "What does synthesize mean?", "combine"], ["Pathos appeals to feelings.", "Which appeal uses emotion?", "pathos"], ["A central idea controls the whole text.", "What controls the text?", "centralidea"]]
    };
    const [text, prompt, answer] = comprehensionSets[ageGroup][index % 10];
    return { skill: "Comprehension", title: "Reading thinking", prompt, text, answer, hint: "Use evidence from the text." };
  }

  if (path === "grammar") {
    const grammarSets = {
      early: [["mom or run", "Which is a person?", "mom"], ["park or jump", "Which is a place?", "park"], ["hop or blue", "Which is an action?", "hop"], ["soft, run, dog", "Which word describes?", "soft"], [". or ?", "Which mark ends a telling sentence?", "."], ["yes or no", "Should a name start with a capital?", "yes"], ["cup or sing", "Which is a thing?", "cup"], ["run or red", "Which is an action?", "run"], ["ball or jump", "Which is a noun?", "ball"], ["big, cat, run", "Which describes?", "big"]],
      elementary: [["The river flows.", "Pick the noun.", "river"], ["Lena paints carefully.", "Pick the verb.", "paints"], ["The golden leaf fell.", "Pick the adjective.", "golden"], ["He ran quickly.", "Pick the adverb.", "quickly"], ["Ben is reading.", "Replace Ben with a pronoun.", "he"], ["box: boxs or boxes", "Choose the plural.", "boxes"], ["and, jump, blue", "Choose a joining word.", "and"], ["The puppy sleeps.", "Pick the noun.", "puppy"], ["Sara sings loudly.", "Pick the adverb.", "loudly"], ["The tall tree swayed.", "Pick the adjective.", "tall"]],
      middle: [["beside the window", "Name the phrase type.", "prepositional"], ["This is for Maya and ___. I/me", "Choose the pronoun.", "me"], ["The players ___ ready. is/are", "Choose the verb.", "are"], ["The bright stars shimmered.", "Find the subject.", "stars"], ["The dog barked loudly.", "Find the predicate.", "barkedloudly"], ["After dinner we walked.", "Which phrase needs a comma after it?", "afterdinner"], ["because it rained", "Dependent or independent?", "dependent"], ["The team ___ ready. is/are", "Choose the verb.", "is"], ["under the bridge", "Name the phrase type.", "prepositional"], ["Maya and ___ went home. I/me", "Choose the pronoun.", "i"]],
      teen: [["to read, to write, to revise", "Is this parallel?", "yes"], ["Walking to school, the rain began.", "What error?", "danglingmodifier"], ["in order to", "Replace concisely.", "to"], ["Neither answer ___ correct. is/are", "Choose the verb.", "is"], ["semicolon or apostrophe", "What joins related clauses?", "semicolon"], ["The team won.", "Active or passive?", "active"], ["clear antecedent or vague reference", "What should pronouns have?", "clearantecedent"], ["The game was won by the team.", "Active or passive?", "passive"], ["due to the fact that", "Replace concisely.", "because"], ["reading, writing, and thinking", "Is this parallel?", "yes"]]
    };
    const [text, prompt, answer] = grammarSets[ageGroup][index % 10];
    return { skill: "Grammar", title: "Grammar check", prompt, text, answer, hint: "Look at how the word or sentence is working." };
  }

  if (path === "partsOfSpeech") {
    const partSets = {
      early: [["The puppy runs.", "Find the noun.", "puppy"], ["Sam jumps.", "Find the verb.", "jumps"], ["The red ball rolls.", "Find the describing word.", "red"], ["Mia sings softly.", "Find the action word.", "sings"], ["The big dog barks.", "Find the adjective.", "big"], ["The cat sleeps.", "Find the noun.", "cat"], ["Ben reads.", "Find the verb.", "reads"], ["The blue kite flies.", "Find the adjective.", "blue"], ["She runs.", "Find the pronoun.", "she"], ["The bird is small.", "Find the adjective.", "small"]],
      elementary: [["The river flows quickly.", "Find the adverb.", "quickly"], ["Lena and Max played.", "Find the conjunction.", "and"], ["The book is under the desk.", "Find the preposition.", "under"], ["He carried the box.", "Find the pronoun.", "he"], ["The golden leaf fell.", "Find the adjective.", "golden"], ["Sara paints carefully.", "Find the verb.", "paints"], ["The quiet room echoed.", "Find the noun.", "room"], ["We ran after lunch.", "Find the pronoun.", "we"], ["The dog barked loudly.", "Find the adverb.", "loudly"], ["A cat slept beside me.", "Find the preposition.", "beside"]],
      middle: [["Although it rained, we played.", "Find the subordinating conjunction.", "although"], ["The team celebrated loudly.", "Find the adverb.", "loudly"], ["Several students volunteered.", "Find the adjective.", "several"], ["The book on the shelf is mine.", "Find the preposition.", "on"], ["They finished the project.", "Find the pronoun.", "they"], ["Running daily builds strength.", "Running is what part of speech?", "gerund"], ["The plan was successful.", "Find the adjective.", "successful"], ["Beside the river, birds sang.", "Find the preposition.", "beside"], ["Neither answer worked.", "Find the determiner.", "neither"], ["The class discussed history.", "Find the noun.", "history"]],
      teen: [["The proposal seemed feasible.", "Find the predicate adjective.", "feasible"], ["Analyzing evidence takes practice.", "Analyzing is what part of speech?", "gerund"], ["The policy that passed was controversial.", "Find the relative pronoun.", "that"], ["The speaker argued persuasively.", "Find the adverb.", "persuasively"], ["The carefully revised essay improved.", "Find the participle.", "revised"], ["Despite delays, work continued.", "Find the preposition.", "despite"], ["The result was unexpectedly strong.", "Find the adverb.", "unexpectedly"], ["Those are reliable sources.", "Find the demonstrative pronoun.", "those"], ["The committee approved the final draft.", "Find the direct object.", "draft"], ["The author writes with clarity.", "Find the noun.", "clarity"]]
    };
    const [text, prompt, answer] = partSets[ageGroup][index % 10];
    return { skill: "Parts of Speech", title: "Identify the part", prompt, text, answer, hint: "Ask what job the word is doing." };
  }

  if (path === "punctuation") {
    const punctuationSets = {
      early: [["Can we play", "Which end mark?", "?"], ["I like dogs", "Which end mark?", "."], ["Stop", "Which end mark shows strong feeling?", "!"], ["Where is my hat", "Which end mark?", "?"], ["The sun is hot", "Which end mark?", "."], ["Wow", "Which end mark shows excitement?", "!"], ["Do you see it", "Which end mark?", "?"], ["I can run", "Which end mark?", "."], ["Look out", "Which end mark?", "!"], ["Is it raining", "Which end mark?", "?"]],
      elementary: [["After lunch we read.", "Which phrase needs a comma after it?", "afterlunch"], ["I packed pencils paper and glue.", "What punctuation separates list items?", "comma"], ["The dog bone", "Write possessive phrase.", "dog'sbone"], ["Mom said hello.", "What marks spoken words?", "quotationmarks"], ["Yes I finished.", "Which word needs a comma after it?", "yes"], ["The cats toy", "Write possessive phrase.", "cat'stoy"], ["First we washed hands.", "Which word needs a comma after it?", "first"], ["red blue and green", "What separates list items?", "commas"], ["Where are you", "Which end mark?", "?"], ["I won the game", "Which end mark can show excitement?", "!"]],
      middle: [["Before school we practiced.", "Which phrase needs a comma?", "beforeschool"], ["I studied; I passed.", "What punctuation joins the clauses?", "semicolon"], ["The book, which was long, was useful.", "What marks extra information?", "commas"], ["She asked, Are you ready?", "What marks direct speech?", "quotationmarks"], ["its or it's", "Choose the contraction for it is.", "it's"], ["The teams scores improved.", "Write possessive.", "team'sscores"], ["However the answer changed.", "What word needs a comma after it?", "however"], ["Bring pencils, paper, and folders.", "What comma before and is often used?", "oxfordcomma"], ["The title was The River.", "What can mark a short story title?", "quotationmarks"], ["I need one thing: focus.", "What punctuation introduces the explanation?", "colon"]],
      teen: [["The evidence is strong; however, more research is needed.", "What joins related clauses?", "semicolon"], ["The claim was clear: practice matters.", "What introduces the explanation?", "colon"], ["The author writes, We must act now.", "What marks exact words?", "quotationmarks"], ["The policy--though costly--worked.", "What punctuation can set off an interruption?", "dash"], ["Students, teachers, and parents agreed.", "What comma appears before and?", "oxfordcomma"], ["The study's results changed minds.", "What punctuation shows possession?", "apostrophe"], ["If the plan fails, revise it.", "What separates the introductory clause?", "comma"], ["The answer is simple: read carefully.", "What punctuation comes before explanation?", "colon"], ["She was tired; nevertheless, she finished.", "What punctuation before nevertheless?", "semicolon"], ["in other words", "This phrase needs what after it?", "comma"]]
    };
    const [text, prompt, answer] = punctuationSets[ageGroup][index % 10];
    return { skill: "Punctuation", title: "Punctuation check", prompt, text, answer, hint: "Look at how the sentence is organized." };
  }

  if (path === "sentenceStructure") {
    const sentenceSets = {
      early: [["The cat sleeps. / Because the cat", "Choose the complete sentence.", "thecatsleeps"], ["Runs fast. / The dog runs fast.", "Choose the complete sentence.", "thedogrunsfast"], ["I see a bird. / See bird I.", "Choose the clear sentence.", "iseeabird"], ["The sun is bright. / Bright sun", "Choose the complete sentence.", "thesunisbright"], ["We play. / Play we.", "Choose the clear sentence.", "weplay"], ["The fish swims. / Fish the swims.", "Choose the sentence.", "thefishswims"], ["Mia reads. / Reads Mia book.", "Choose the complete sentence.", "miareads"], ["The bell rang. / Rang bell the.", "Choose the sentence.", "thebellrang"], ["I like math. / Like math.", "Choose the complete sentence.", "ilikemath"], ["The dog barked. / Barked dog.", "Choose the complete sentence.", "thedogbarked"]],
      elementary: [["The puppy sleeps.", "Find the subject.", "puppy"], ["The tall tree swayed.", "Find the predicate.", "swayed"], ["Because it rained.", "Fragment or sentence?", "fragment"], ["I ran home I was late.", "What error?", "runon"], ["The bird sang loudly.", "Find the predicate.", "sangloudly"], ["After school, we played.", "What kind of phrase begins the sentence?", "introductory"], ["The class cheered.", "Complete or fragment?", "complete"], ["When the bell rang.", "Fragment or sentence?", "fragment"], ["Lena painted a picture.", "Find the subject.", "lena"], ["The test was easy.", "Find the predicate.", "waseasy"]],
      middle: [["Although it was late, we finished.", "Dependent clause?", "althoughitwaslate"], ["The answer changed because new evidence appeared.", "Independent clause?", "theanswerchanged"], ["I wanted to go, but I stayed.", "What joins the clauses?", "but"], ["Running through the park.", "Fragment or sentence?", "fragment"], ["The team practiced, and the score improved.", "Compound or simple?", "compound"], ["Because the road closed, we turned back.", "What clause starts the sentence?", "dependent"], ["The book that I borrowed was helpful.", "What clause describes book?", "thatiborrowed"], ["She studied hard; she passed.", "What joins the sentences?", "semicolon"], ["The storm ended, so we left.", "What conjunction shows result?", "so"], ["To improve the essay, revise the evidence.", "What phrase starts the sentence?", "infinitive"]],
      teen: [["Although the data was limited, the claim was persuasive.", "Name the dependent clause.", "althoughthedatawaslimited"], ["The argument is clear, but the evidence is weak.", "Sentence type?", "compound"], ["Because the source was credible, the evidence mattered.", "What does the first clause show?", "cause"], ["The proposal, which was expensive, passed.", "What clause is nonessential?", "whichwasexpensive"], ["Analyzing the graph, she noticed a trend.", "What phrase begins the sentence?", "participial"], ["The thesis is strong; the support is limited.", "What punctuation joins the clauses?", "semicolon"], ["If costs rise, demand may fall.", "What kind of clause starts it?", "dependent"], ["The article explains how policy changed.", "What clause follows explains?", "nounclause"], ["Clear evidence strengthens claims.", "Simple or compound?", "simple"], ["The speaker paused, then answered.", "What does then show?", "sequence"]]
    };
    const [text, prompt, answer] = sentenceSets[ageGroup][index % 10];
    return { skill: "Sentence Structure", title: "Sentence check", prompt, text, answer, hint: "Look for complete thoughts and how clauses connect." };
  }

  const writingSets = {
    early: [["I like cats. / Like cats.", "Choose the complete sentence.", "ilikecats"], ["green, jump, run", "Choose the describing word.", "green"], ["The bird flies. / Flies bird the.", "Which sounds right?", "thebirdflies"], ["Mia runs. / mia runs.", "Which starts correctly?", "miaruns"], ["dog / brown dog", "Which has more detail?", "browndog"], ["I can run. / I can run", "Choose the sentence with an end mark.", "icanrun"], ["The sun is hot. / Hot sun", "Which tells a complete idea?", "thesunishot"], ["The cat sleeps. / Cat sleeps the.", "Which is a sentence?", "thecatsleeps"], ["big red ball / ball", "Which has more detail?", "bigredball"], ["We play. / Play we", "Which sounds right?", "weplay"]],
    elementary: [["Dogs need daily care. / Brown fur.", "Choose a topic sentence.", "dogsneeddailycare"], ["because, first, red", "Choose a cause transition.", "because"], ["whispered, table, green", "Choose a stronger verb.", "whispered"], ["a bird / a tiny blue bird", "Which detail is specific?", "atinybluebird"], ["closing idea or random word", "What should a paragraph end with?", "closingidea"], ["The puppy slept on the rug. / Puppy rug slept.", "Choose the clearer sentence.", "thepuppysleptontherug"], ["I think / It is 5", "Which phrase shows opinion?", "ithink"], ["First, Next, Finally", "What do these show?", "sequence"], ["A claim or a color", "What starts an opinion paragraph?", "claim"], ["The storm was loud. / Storm loud was.", "Choose the clearer sentence.", "thestormwasloud"]],
    middle: [["Schools should start later. / 7:30 a.m.", "Choose the claim.", "schoolsshouldstartlater"], ["evidence or unrelated detail", "What supports a claim?", "evidence"], ["also, however, although", "Choose an addition transition.", "also"], ["now / at this point in time", "Choose the concise phrase.", "now"], ["wraps up or starts a new topic", "What does a conclusion do?", "wrapsup"], ["slang or evidence", "Formal writing should avoid what?", "slang"], ["supporting details or title", "What comes after a topic sentence?", "supportingdetails"], ["however, because, also", "Choose a contrast transition.", "however"], ["claim or random fact", "What should an argument include?", "claim"], ["clear evidence / unrelated joke", "What belongs in body paragraph?", "clearevidence"]],
    teen: [["Public transit should expand because it reduces traffic. / Buses exist.", "Choose the stronger thesis.", "publictransitshouldexpandbecauseitreducestraffic"], ["a study result or a random guess", "Which is stronger evidence?", "astudyresult"], ["because / due to the fact that", "Choose the concise phrase.", "because"], ["opposing view or topic title", "What does a counterclaim show?", "opposingview"], ["why evidence matters or page number", "What should analysis explain?", "whyevidencematters"], ["clear and precise or slang-heavy", "Formal style should be what?", "clearandprecise"], ["synthesize ideas or add unrelated facts", "A conclusion should do what?", "synthesizeideas"], ["statistics / personal guess", "Which is stronger support?", "statistics"], ["thesis or typo", "What states the main argument?", "thesis"], ["address it / ignore it", "What should writers do with a counterclaim?", "addressit"]]
  };
  const [text, prompt, answer] = writingSets[ageGroup][index % 10];
  return { skill: "Writing", title: "Writing practice", prompt, text, answer, hint: "Choose the option that makes the writing clearer." };
}

function createFunGeneratedQuestion(ageGroup, path, index) {
  if (path === "generalKnowledge") {
    const sets = {
      early: [["What do we use to tell time?", "clock"], ["What color do you get by mixing red and blue?", "purple"], ["How many days are in a week?", "7"], ["What do plants need to grow?", "water"], ["What season comes after winter?", "spring"]],
      elementary: [["How many months are in a year?", "12"], ["What is the largest ocean?", "pacific"], ["Who invented the light bulb in many school lessons?", "edison"], ["What gas do humans breathe in?", "oxygen"], ["How many sides does a stop sign have?", "8"]],
      middle: [["What is the capital of the United States?", "washingtondc"], ["What organ pumps blood?", "heart"], ["What is the process plants use to make food?", "photosynthesis"], ["What is the freezing point of water in Celsius?", "0"], ["What is the closest star to Earth?", "sun"]],
      teen: [["What document begins with We the People?", "constitution"], ["What force keeps planets in orbit?", "gravity"], ["What is the study of life called?", "biology"], ["What is the largest planet?", "jupiter"], ["What is the chemical symbol for water?", "h2o"]]
    };
    const [text, answer] = sets[ageGroup][index % sets[ageGroup].length];
    return { skill: "General Knowledge", title: "Knowledge check", prompt: "Answer the question.", text, answer, hint: "Think about everyday knowledge and school facts." };
  }

  if (path === "flags") {
    const sets = {
      early: [["Which country flag has red and white stripes with white stars on blue?", "usa"], ["Which country uses a red maple leaf?", "canada"], ["Which country flag has a red circle on white?", "japan"], ["Which country flag is green, white, and orange vertical stripes?", "ireland"], ["Which country has a union jack flag?", "unitedkingdom"]],
      elementary: [["Which country has a green, white, and red vertical tricolor?", "italy"], ["Which country has black, red, and yellow horizontal stripes?", "germany"], ["Which country has blue and white stripes with a sun?", "argentina"], ["Which country has a red flag with yellow stars?", "china"], ["Which country has a blue cross on white?", "finland"]],
      middle: [["Which country has a red flag with a white crescent and star?", "turkey"], ["Which country has a green flag with a yellow diamond?", "brazil"], ["Which country has a red and white flag with a maple leaf?", "canada"], ["Which country has a blue flag with yellow stars in a circle?", "europeanunion"], ["Which country has saffron, white, and green with a blue wheel?", "india"]],
      teen: [["Which country flag has a cedar tree?", "lebanon"], ["Which country has a red flag with a white cross?", "switzerland"], ["Which country flag has a dragon?", "wales"], ["Which country flag has a red sun with rays?", "northmacedonia"], ["Which country flag has a blue Star of David?", "israel"]]
    };
    const [text, answer] = sets[ageGroup][index % sets[ageGroup].length];
    return { skill: "Country Flags", title: "Flag check", prompt: "Identify the country or region.", text, answer, hint: "Use the colors and symbols as clues." };
  }

  if (path === "geography") {
    const sets = {
      early: [["What planet do we live on?", "earth"], ["What is a very large body of salt water called?", "ocean"], ["What do we call land with water all around it?", "island"], ["What is frozen water called?", "ice"], ["What shines in the daytime sky?", "sun"]],
      elementary: [["How many continents are there?", "7"], ["What is the largest continent?", "asia"], ["What ocean is west of California?", "pacific"], ["What country is directly north of the United States?", "canada"], ["What is the capital of France?", "paris"]],
      middle: [["What line divides Earth into north and south halves?", "equator"], ["What is the longest river often taught in school?", "nile"], ["What desert is the largest hot desert?", "sahara"], ["What mountain range includes Mount Everest?", "himalayas"], ["What is the capital of Mexico?", "mexicocity"]],
      teen: [["What imaginary line is at 0 degrees longitude?", "primemeridian"], ["What is the capital of Japan?", "tokyo"], ["What sea lies between Europe and Africa?", "mediterranean"], ["What country has the city of Cairo?", "egypt"], ["What continent is Chile in?", "southamerica"]]
    };
    const [text, answer] = sets[ageGroup][index % sets[ageGroup].length];
    return { skill: "Geography", title: "Map check", prompt: "Answer the geography question.", text, answer, hint: "Think about maps, places, and landforms." };
  }

  if (path === "animalsScience") {
    const sets = {
      early: [["What animal says moo?", "cow"], ["What animal has a long trunk?", "elephant"], ["What do bees make?", "honey"], ["What do fish use to breathe underwater?", "gills"], ["What planet is known as the red planet?", "mars"]],
      elementary: [["What animal is the fastest land animal?", "cheetah"], ["What do caterpillars become?", "butterflies"], ["What force pulls things down?", "gravity"], ["What part of a plant takes in water?", "roots"], ["What weather tool measures temperature?", "thermometer"]],
      middle: [["What gas do plants take in?", "carbondioxide"], ["What is the center of an atom called?", "nucleus"], ["What animal group has feathers?", "birds"], ["What is water changing to vapor called?", "evaporation"], ["What body system controls movement and thought?", "nervous"]],
      teen: [["What molecule carries genetic instructions?", "dna"], ["What is the basic unit of life?", "cell"], ["What process releases energy from food in cells?", "respiration"], ["What type of energy comes from motion?", "kinetic"], ["What organelle makes energy for the cell?", "mitochondria"]]
    };
    const [text, answer] = sets[ageGroup][index % sets[ageGroup].length];
    return { skill: "Animals & Science", title: "Science check", prompt: "Answer the question.", text, answer, hint: "Use what you know about animals, nature, and science." };
  }

  const sets = {
    early: [["What comes next?", "red, blue, red, blue, ?", "red"], ["Which one is different?", "cat, dog, car", "car"], ["What comes next?", "1, 2, 3, ?", "4"], ["Which is the odd one out?", "apple, banana, chair", "chair"], ["What comes next?", "A, B, A, B, ?", "a"]],
    elementary: [["What comes next?", "2, 4, 6, 8, ?", "10"], ["Which word does not belong?", "circle, square, sandwich", "sandwich"], ["What comes next?", "Monday, Tuesday, Wednesday, ?", "thursday"], ["If all bloops are blue and this is a bloop, what color is it?", "bloop", "blue"], ["What comes next?", "5, 10, 15, ?", "20"]],
    middle: [["What comes next?", "3, 6, 12, 24, ?", "48"], ["Which number is the outlier?", "4, 8, 12, 17, 16", "17"], ["If A>B and B>C, which is greatest?", "A, B, C", "a"], ["What comes next?", "1, 4, 9, 16, ?", "25"], ["Decode: A=1, B=2. What is C?", "C", "3"]],
    teen: [["What comes next?", "2, 3, 5, 8, 13, ?", "21"], ["If no squares are circles, can a square be a circle? yes/no", "logic", "no"], ["What comes next?", "1, 1, 2, 3, 5, ?", "8"], ["If x implies y and x is true, what is true?", "x -> y", "y"], ["What comes next?", "64, 32, 16, 8, ?", "4"]]
  };
  const [prompt, text, answer] = sets[ageGroup][index % sets[ageGroup].length];
  return { skill: "Logic Puzzles", title: "Brain teaser", prompt, text, answer, hint: "Look for the pattern or rule." };
}

function getGeneratedQuestions(subject, ageGroup, path, count = 24) {
  return Array.from({ length: count }, (_item, index) => {
    if (subject === "math") {
      return createMathGeneratedQuestion(ageGroup, path, index);
    }

    if (subject === "fun") {
      return createFunGeneratedQuestion(ageGroup, path, index);
    }

    return createEnglishGeneratedQuestion(ageGroup, path, index);
  });
}

function getSubjectLevelQuestions(subject, ageGroup) {
  const topics = Object.keys(curriculumQuestionBank[subject]?.[ageGroup] || {});
  return mergeUniqueQuestions(topics.flatMap((path) => getLevelPathQuestions(subject, path, ageGroup)));
}

function getMixedMathQuestions(ageGroup) {
  const mathPaths = ["facts", "numberSense", "decimals", "percents", "ratios", "measurement", "wordProblems", "dataGraphs", "shapes", "fractions", "algebra"];
  const questions = mathPaths.flatMap((path) => {
    const starterQuestions = curriculumQuestionBank.math?.[ageGroup]?.[path]
      || pathQuestionBank.math?.[path]
      || [];
    const extraQuestions = supplementalCurriculumQuestionBank.math?.[ageGroup]?.[path] || [];
    const generatedQuestions = getGeneratedQuestions("math", ageGroup, path);

    return [...starterQuestions, ...extraQuestions, ...generatedQuestions];
  });

  return mergeUniqueQuestions(questions).slice(0, 80);
}

function getPlacementQuestionSet(subject, ageGroup) {
  const starterQuestions = placementQuestions[subject]?.[ageGroup] || [];
  const levelQuestions = getSubjectLevelQuestions(subject, ageGroup).map((question) => ({
    ...question,
    title: "Placement check"
  }));

  return mergeUniqueQuestions([...starterQuestions, ...levelQuestions]).slice(0, 20);
}

function getLevelPathQuestions(subject, path, ageGroup) {
  if (subject === "math" && path === "facts") {
    return getMixedMathQuestions(ageGroup);
  }

  const starterQuestions = curriculumQuestionBank[subject]?.[ageGroup]?.[path]
    || pathQuestionBank[subject]?.[path]
    || [];
  const extraQuestions = supplementalCurriculumQuestionBank[subject]?.[ageGroup]?.[path] || [];
  const generatedQuestions = getGeneratedQuestions(subject, ageGroup, path);

  return mergeUniqueQuestions([...starterQuestions, ...extraQuestions, ...generatedQuestions]).slice(0, 20);
}

function buildParentTestQuestions({ subject, path, ageGroup, count, prompt }) {
  const sourceQuestions = getLevelPathQuestions(subject, path, ageGroup);
  const seed = [getTodayKey(), subject, path, ageGroup, "parent-test"].join("|");

  return buildWorksheet(sourceQuestions, count, seed).map((question, index) => ({
    subject,
    prompt: prompt || `${getSubjectLabel(subject)} ${getAgeGroupLabel(ageGroup)} skill check`,
    question: question.text,
    answer: question.answer,
    explanation: question.explanation || question.hint || "",
    order: index + 1
  }));
}

function getAdaptiveQuestions(subject, path, ageGroup, difficulty, size) {
  if (path) {
    const baseQuestions = getLevelPathQuestions(subject, path, ageGroup);
    const adaptiveQuestions = ageGroup === "early"
      ? []
      : adaptivePathQuestionBank[subject]?.[path]?.[difficulty] || [];
    const questions = difficulty === "medium" || !adaptiveQuestions.length
      ? baseQuestions
      : [...adaptiveQuestions, ...baseQuestions];

    return buildWorksheet(
      applyQuestionDifficulty(questions, difficulty),
      size,
      getDailyQuestionSeed([subject, path, difficulty])
    );
  }

  const adaptiveAge = getAdaptiveAgeGroup(ageGroup, difficulty);
  const track = content[subject][adaptiveAge] || content[subject][ageGroup];
  return buildWorksheet(
    applyQuestionDifficulty(track.questions, difficulty),
    size,
    getDailyQuestionSeed([subject, adaptiveAge, difficulty])
  );
}

function getDifficultyLabel(difficulty) {
  const labels = {
    easy: "Support",
    medium: "On level",
    hard: "Challenge"
  };

  return labels[difficulty] || labels.medium;
}

function getCurrentTrack() {
  const size = appState.worksheetSize;

  if (appState.mode === "parent-check") {
    const child = getCurrentChild();
    const selectedParentQuestion = getParentQuestionById(appState.parentQuestionId);
    const parentQuestion = selectedParentQuestion && selectedParentQuestion.status === "pending"
      ? selectedParentQuestion
      : getNextPendingParentAssignment(child);
    const subjectLabel = getSubjectLabel(parentQuestion ? parentQuestion.subject : appState.subject);
    const activeGroup = parentQuestion && parentQuestion.testGroupId
      ? getChildParentQuestionGroups(parentQuestion.childId).find((group) => group.groupId === parentQuestion.testGroupId)
      : null;
    const groupPosition = activeGroup
      ? activeGroup.answered.length + 1
      : 1;
    const groupPrompt = activeGroup
      ? `${activeGroup.timedChallenge ? "Timed challenge" : "Challenge"} question ${groupPosition} of ${activeGroup.questions.length}`
      : "";
    const question = parentQuestion
      ? {
        title: activeGroup && activeGroup.timedChallenge ? "Timed challenge" : "Parent check",
        prompt: groupPrompt || parentQuestion.prompt || `${subjectLabel} question from your parent`,
        text: parentQuestion.question,
        answer: parentQuestion.answer,
        hint: parentQuestion.explanation || "Think through the question carefully, then compare with the correct answer.",
        explanation: parentQuestion.explanation || "",
        skill: "Parent check",
        difficulty: "medium",
        parentQuestionId: parentQuestion.id,
        parentTestGroupId: parentQuestion.testGroupId || ""
      }
      : {
        title: "Parent check",
        prompt: "Your parent question was completed.",
        text: "Choose a topic to continue practice.",
        answer: "",
        hint: "",
        explanation: "",
        skill: "Parent check",
        difficulty: "medium"
      };

    return {
      focus: `${subjectLabel} parent check`,
      description: "A short question sent from the parent dashboard.",
      level: "Parent check",
      mastery: "Parent assignment",
      value: 50,
      questions: [question]
    };
  }

  if (appState.mode === "placement") {
    const questions = getPlacementQuestionSet(appState.subject, appState.age);
    const seed = getDailyQuestionSeed([appState.subject, appState.age, "placement"]);
    return {
      focus: `${appState.subject === "math" ? "Math" : "English"} placement check`,
      description: "A mixed set estimates the best starting level before regular practice.",
      level: "Placement",
      mastery: "Starting Level",
      value: 50,
      questions: buildWorksheet(questions, size, seed)
    };
  }

  if (appState.mode === "timed") {
    const questions = appState.subject === "math"
      ? pathQuestionBank.math.facts
      : appState.subject === "english"
        ? pathQuestionBank.english.grammar
        : getLevelPathQuestions("fun", appState.path || "logicPuzzles", appState.age);
    const seed = getDailyQuestionSeed([appState.subject, "timed"]);
    return {
      focus: `${getSubjectLabel(appState.subject)} timed fluency`,
      description: "A short fluency round builds accuracy and speed without changing the level.",
      level: "Timed",
      mastery: "Fluency",
      value: 60,
      questions: buildWorksheet(questions, size, seed)
    };
  }

  if (appState.path) {
    const skill = (skills[appState.subject] || []).find((item) => item.key === appState.path);
    const track = pathContent[appState.subject]?.[appState.path] || {
      focus: skill ? skill.title : getSubjectLabel(appState.subject),
      description: skill ? skill.text : "Practice questions for this topic.",
      level: skill ? skill.title : "Practice",
      mastery: "Skill Practice",
      value: 60
    };
    const child = getCurrentChild();
    const adaptive = getAdaptiveProfile(child, appState.subject, appState.path);
    const questions = getAdaptiveQuestions(appState.subject, appState.path, appState.age, adaptive.difficulty, size);

    return {
      ...track,
      description: `${track.description} ${adaptive.message}`,
      level: `${track.level} - ${adaptive.label}`,
      mastery: "Adaptive Level",
      value: adaptive.value,
      questions
    };
  }

  const track = (content[appState.subject] && content[appState.subject][appState.age]) || content.math[appState.age];
  const child = getCurrentChild();
  const adaptive = getAdaptiveProfile(child, appState.subject, appState.path);
  const questions = getAdaptiveQuestions(appState.subject, null, appState.age, adaptive.difficulty, size);

  return {
    ...track,
    description: `${track.description} ${adaptive.message}`,
    level: `${track.level} - ${adaptive.label}`,
    mastery: "Adaptive Level",
    value: adaptive.value,
    questions
  };
}

function getCurrentQuestion() {
  const track = getCurrentTrack();
  return track.questions[appState.index % track.questions.length];
}

function getCurrentRoundSize() {
  return getCurrentTrack().questions.length || 1;
}

function getAnswerExplanation(question, submittedAnswer) {
  const kidAnswer = submittedAnswer.trim() || "blank";
  const why = question.explanation || question.hint || "Review the rule for this topic, then compare each step with the correct answer.";

  return `Your answer was ${kidAnswer}. The correct answer is ${question.answer}. Why: ${why}`;
}

function renderTopicSelect() {
  const child = getCurrentChild();
  const pendingGroups = getPendingParentQuestionGroups(child);
  const groupedQuestionIds = new Set(pendingGroups.flatMap((group) => group.questions.map((question) => question.id)));
  const pendingTests = getChildParentQuestions(child && child.id)
    .filter((question) => question.status === "pending" && !groupedQuestionIds.has(question.id));
  const subjectSkills = skills[appState.subject];
  const hasSelectedPath = subjectSkills.some((skill) => skill.key === appState.path);

  if (appState.mode !== "parent-check" && !hasSelectedPath) {
    appState.path = null;
  }

  const groupOptions = pendingGroups.map((group) => `
    <option value="testgroup:${escapeHtml(group.groupId)}" ${appState.parentTestGroupId === group.groupId ? "selected" : ""}>
      ${escapeHtml(`${group.timedChallenge ? "Timed " : ""}${getSubjectLabel(group.subject)} challenge: ${group.answered.length}/${group.questions.length} done`)}
    </option>
  `).join("");
  const singleOptions = pendingTests.map((question, index) => `
    <option value="test:${escapeHtml(question.id)}" ${appState.parentQuestionId === question.id ? "selected" : ""}>
      ${escapeHtml(`${getSubjectLabel(question.subject)} test ${index + 1}: ${question.question}`)}
    </option>
  `).join("");
  const testOptions = pendingGroups.length || pendingTests.length
    ? `
      <optgroup label="Tests">
        ${groupOptions}
        ${singleOptions}
      </optgroup>
    `
    : "";

  topicSelect.innerHTML = [
    testOptions,
    `<optgroup label="Practice">
      <option value="" ${!appState.path && appState.mode !== "parent-check" ? "selected" : ""}>Recommended practice</option>
      ${subjectSkills.map((skill) => `
        <option value="${escapeHtml(skill.key)}" ${appState.path === skill.key && appState.mode !== "parent-check" ? "selected" : ""}>${escapeHtml(skill.title)}</option>
      `).join("")}
    </optgroup>`
  ].join("");
}

function syncLearnerMode() {
  const child = getCurrentChild();
  const parentGroupQuestion = appState.parentTestGroupId
    ? getPendingParentQuestionInGroup(child, appState.parentTestGroupId)
    : null;
  const selectedParentQuestion = appState.parentQuestionId
    ? getParentQuestionById(appState.parentQuestionId)
    : null;
  const parentQuestion = selectedParentQuestion && selectedParentQuestion.status === "pending"
    ? selectedParentQuestion
    : parentGroupQuestion || getNextPendingParentAssignment(child);

  if (parentQuestion && parentQuestion.status === "pending" && appState.answered === 0) {
    appState.mode = "parent-check";
    appState.parentQuestionId = parentQuestion.id;
    appState.parentTestGroupId = parentQuestion.testGroupId || appState.parentTestGroupId || null;
    appState.subject = parentQuestion.subject;
    return;
  }

  if (appState.mode === "parent-check" && (!parentQuestion || parentQuestion.status !== "pending")) {
    appState.mode = "practice";
    appState.parentQuestionId = null;
    appState.parentTestGroupId = null;
  }

  const subjectUsesPlacement = appState.subject === "math" || appState.subject === "english";
  const needsPlacement = subjectUsesPlacement && child && !hasPlacementResult(child, appState.subject);

  if (needsPlacement && !appState.path && appState.answered === 0) {
    appState.mode = "placement";
    return;
  }

  if (appState.mode === "placement" && (!needsPlacement || appState.path)) {
    appState.mode = "practice";
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderProfile() {
  const parent = getCurrentParent();
  const child = getCurrentChild();

  if (session.role === "academy") {
    appEyebrow.textContent = "Academy dashboard";
    appTitle.textContent = "Master view for all students";
    profileAvatar.textContent = "A";
    profileName.textContent = "Academy";
    profileMeta.textContent = `${demoData.children.length} students`;
    return;
  }

  if (session.role === "parent" && parent) {
    appEyebrow.textContent = "Parent dashboard";
    appTitle.textContent = "Your children's progress";
    profileAvatar.textContent = parent.name.charAt(0).toUpperCase();
    profileName.textContent = parent.name;
    profileMeta.textContent = "Parent dashboard";
    return;
  }

  if (child) {
    const attempts = getChildAttempts(child.id);
    const correct = attempts.filter((attempt) => attempt.correct).length;
    const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;

    appState.age = getAgeGroup(child.age);
    ageGroupLabel.textContent = getAgeGroupLabel(appState.age);
    placementResultLabel.textContent = getPlacementResultText(child, appState.subject);
    appEyebrow.textContent = "Daily learning path";
    appTitle.textContent = "Practice that grows with every learner";
    profileAvatar.textContent = child.name.charAt(0).toUpperCase();
    profileName.textContent = child.name;
    profileMeta.textContent = attempts.length ? `${attempts.length} answers, ${accuracy}% correct` : getChildLevelLabel(child);
  }
}

function renderParentDashboard() {
  const parent = getCurrentParent();
  const isAcademy = session.role === "academy";
  const allChildren = isAcademy
    ? demoData.children
    : demoData.children.filter((child) => child.parentId === parent.id);
  const children = allChildren;

  workReview.classList.add("hidden");

  academySummary.classList.toggle("hidden", !isAcademy);
  academyManagement.classList.toggle("hidden", !isAcademy);
  parentChildManager.classList.toggle("hidden", isAcademy);
  document.querySelector(".ranking-section").classList.toggle("hidden", !isAcademy);

  if (isAcademy) {
    renderAcademySummary(allChildren);
    renderAcademyManagement();
    renderParentQuestionManager(null, true);
  } else {
    renderParentChildManager(parent);
    renderParentQuestionManager(parent);
  }

  if (!allChildren.length) {
    rankingGrid.innerHTML = "";
    stateRankingGrid.innerHTML = "";
    parentReport.innerHTML = `
      <article class="report-card">
        <h3>No child profiles yet</h3>
        <p class="helper-text">${isAcademy ? "Parent-created child profiles will appear here." : "Create a child profile above to get started."}</p>
      </article>
    `;
    return;
  }

  const childrenWithStats = children.map((child) => {
    const attempts = getChildAttempts(child.id);
    const correct = attempts.filter((attempt) => attempt.correct).length;
    const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : 0;
    return { child, attempts, correct, accuracy, ageGroup: getAgeGroup(child.age) };
  });

  const ageGroups = ["early", "elementary", "middle", "teen"];

  rankingGrid.innerHTML = ageGroups.map((ageGroup) => {
    const rankedChildren = childrenWithStats
      .filter((item) => item.ageGroup === ageGroup)
      .sort((a, b) => b.accuracy - a.accuracy || b.correct - a.correct || b.attempts.length - a.attempts.length || a.child.name.localeCompare(b.child.name));

    const rows = rankedChildren.map((item, index) => `
      <li>
        <span class="rank-number">${index + 1}</span>
        <span>
          <strong>${escapeHtml(item.child.name)}</strong>
          <small>${item.attempts.length} answers</small>
        </span>
        <b>${item.accuracy}%</b>
      </li>
    `).join("") || "<li class=\"empty-rank\">No kids in this group yet.</li>";

    return `
      <article class="ranking-card">
        <h3>${getAgeGroupLabel(ageGroup)}</h3>
        <ol class="ranking-list">${rows}</ol>
      </article>
    `;
  }).join("");

  const states = [...new Set(childrenWithStats.map((item) => (item.child.state || "NA").toUpperCase()))].sort();
  stateRankingGrid.innerHTML = states.map((state) => {
    const rankedChildren = childrenWithStats
      .filter((item) => (item.child.state || "NA").toUpperCase() === state)
      .sort((a, b) => b.accuracy - a.accuracy || b.correct - a.correct || b.attempts.length - a.attempts.length || a.child.name.localeCompare(b.child.name));

    const rows = rankedChildren.map((item, index) => `
      <li>
        <span class="rank-number">${index + 1}</span>
        <span>
          <strong>${escapeHtml(item.child.name)}</strong>
          <small>${item.attempts.length} answers</small>
        </span>
        <b>${item.accuracy}%</b>
      </li>
    `).join("");

    return `
      <article class="ranking-card">
        <h3>${escapeHtml(state)}</h3>
        <ol class="ranking-list">${rows}</ol>
      </article>
    `;
  }).join("");

  if (isAcademy) {
    parentReport.innerHTML = renderAcademyStudentSearch(childrenWithStats);
    return;
  }

  parentReport.innerHTML = childrenWithStats.map(({ child, attempts }) => {
    const practiceAttempts = attempts.filter((attempt) => attempt.mode !== "placement");
    const selectedDate = getSelectedHistoryDate(child, practiceAttempts);
    const visiblePracticeAttempts = selectedDate
      ? practiceAttempts.filter((attempt) => getAttemptDateKey(attempt.createdAt) === selectedDate)
      : practiceAttempts;
    const mathStats = getAttemptStats(visiblePracticeAttempts.filter((attempt) => attempt.subject === "math"));
    const englishStats = getAttemptStats(visiblePracticeAttempts.filter((attempt) => attempt.subject === "english"));
    const topicNote = renderTopicNote(visiblePracticeAttempts);
    const performanceHistory = renderPerformanceHistory(child, practiceAttempts);

    return `
      <article class="report-card">
        <header>
          <div>
            <h3>${escapeHtml(child.name)}</h3>
            <p class="helper-text">${escapeHtml(getChildLevelLabel(child))} - ${escapeHtml(child.state || "NA")}</p>
          </div>
          <span class="code-pill">${escapeHtml(child.code)}</span>
        </header>
        ${renderParentQuestionStatus(child)}
        ${performanceHistory}
        <div class="subject-pies">
          ${renderSubjectPie(child, "Math", "math", mathStats, selectedDate)}
          ${renderSubjectPie(child, "English", "english", englishStats, selectedDate)}
        </div>
        ${topicNote}
      </article>
    `;
  }).join("");
}

function showSessionView() {
  const isDashboardRole = session && (session.role === "parent" || session.role === "academy");

  authScreen.classList.toggle("hidden", Boolean(session));
  appShell.classList.toggle("hidden", !session);
  appShell.classList.toggle("parent-mode", Boolean(isDashboardRole));
  parentDashboard.classList.toggle("hidden", !isDashboardRole);
  learnerSections.forEach((section) => section.classList.toggle("hidden", isDashboardRole));
  parentOnlyItems.forEach((item) => item.classList.toggle("hidden", !isDashboardRole));
}

function hasValidSession() {
  if (!session) return false;
  if (session.role === "parent") return Boolean(getCurrentParent());
  if (session.role === "academy") return true;
  if (session.role === "kid") return Boolean(getCurrentChild()) && (!hasDatabaseConnection() || Boolean(session.childCode));
  return false;
}

function render() {
  if (session && !hasValidSession()) {
    session = null;
    saveSession();
  }

  if (!session) {
    showSessionView();
    return;
  }

  showSessionView();
  renderProfile();

  if (session.role === "parent" || session.role === "academy") {
    renderParentDashboard();
    return;
  }

  syncLearnerMode();
  const track = getCurrentTrack();
  const question = getCurrentQuestion();
  const roundSize = track.questions.length || 1;

  levelChip.textContent = track.level;
  subjectButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.subject === appState.subject);
  });

  questionTitle.textContent = question.title;
  questionPrompt.textContent = question.prompt;
  questionText.textContent = question.text;
  answerInput.value = "";
  const elapsed = Math.max(0, Math.round((Date.now() - appState.startedAt) / 1000));
  const timerText = appState.mode === "timed" ? `, ${elapsed}s` : "";
  const difficultyText = appState.mode === "practice" ? `, ${getDifficultyLabel(question.difficulty)}` : "";
  feedback.textContent = `Today set: question ${(appState.index % roundSize) + 1} of ${roundSize}. Score ${appState.correct}/${appState.answered}${timerText}${difficultyText}.`;
  feedback.className = "feedback";

  renderTopicSelect();
}

parentLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(parentLoginForm);
  const name = String(formData.get("parentName") || "Parent").trim();
  const email = String(formData.get("parentEmail") || "").trim().toLowerCase();
  const password = String(formData.get("parentPassword") || "");

  if (!email || !password) {
    authMessage.textContent = "Enter a parent email and password.";
    return;
  }

  authMessage.textContent = hasDatabaseConnection() ? "Connecting to your parent account..." : "";

  try {
    const parent = await signInOrCreateParent({ name, email, password });

    session = { role: "parent", parentId: parent.id };
    saveSession();
    authMessage.textContent = "";
    render();
  } catch (error) {
    authMessage.textContent = getDatabaseErrorMessage(error);
  }
});

kidLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(kidLoginForm);
  const firstName = String(formData.get("kidFirstName") || "").trim();
  const lastName = String(formData.get("kidLastName") || "").trim();
  const code = String(formData.get("kidCode") || "").trim();

  if (!firstName || !lastName || !code) {
    authMessage.textContent = "Enter first name, last name, and child code.";
    return;
  }

  authMessage.textContent = hasDatabaseConnection() ? "Checking child code..." : "";

  try {
    const { child, code: childCode } = await signInChildWithCode({ firstName, lastName, code });

    session = { role: "kid", parentId: child.parentId, childId: child.id, childCode };
    appState.age = getAgeGroup(child.age);
    appState.path = null;
    appState.index = 0;
    appState.correct = 0;
    appState.answered = 0;
    appState.practiceRound = 0;
    appState.startedAt = Date.now();
    appState.parentQuestionId = null;
    appState.parentQuestionJustCompleted = false;
    saveSession();
    authMessage.textContent = "";
    render();
  } catch (error) {
    authMessage.textContent = getDatabaseErrorMessage(error);
  }
});

academyLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(academyLoginForm);
  const email = String(formData.get("academyEmail") || "").trim().toLowerCase();
  const password = String(formData.get("academyPassword") || "");

  if (!email || !password) {
    authMessage.textContent = "Enter the admin email and password.";
    return;
  }

  authMessage.textContent = "Checking admin login...";

  try {
    const admin = await signInAcademyAdmin({ email, password });
    session = { role: "academy", adminEmail: admin.email, adminId: admin.userId || "local-admin" };
    saveSession();
    authMessage.textContent = "";
    render();
  } catch (error) {
    authMessage.textContent = getDatabaseErrorMessage(error);
  }
});

logoutButton.addEventListener("click", async () => {
  if (hasDatabaseConnection()) {
    await supabaseClient.auth.signOut();
  }

  session = null;
  saveSession();
  render();
});

parentChildForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const parent = getCurrentParent();
  const formData = new FormData(parentChildForm);
  const firstName = String(formData.get("parentChildFirstName") || "").trim();
  const lastName = String(formData.get("parentChildLastName") || "").trim();
  const name = `${firstName} ${lastName}`.trim();
  const age = Number(formData.get("parentChildAge") || 8);
  const state = String(formData.get("parentChildState") || "NA").trim().toUpperCase().slice(0, 2) || "NA";
  const parentId = parent ? parent.id : "";

  if (!firstName || !lastName || !parentId) {
    authMessage.textContent = "Enter the child's first and last name.";
    return;
  }

  const childLimit = getParentChildLimit(parentId);
  if (getParentChildCount(parentId) >= childLimit) {
    authMessage.textContent = `This parent profile can have up to ${childLimit} kid${childLimit === 1 ? "" : "s"}.`;
    return;
  }

  if (findChildByFullName(firstName, lastName, parentId)) {
    authMessage.textContent = "A child profile with that first and last name already exists.";
    return;
  }

  try {
    await createChildProfile({ parentId, firstName, lastName, age, state });
    parentChildForm.reset();
    renderStateOptions(parentChildState, "CA");
    authMessage.textContent = "";
    renderParentDashboard();
  } catch (error) {
    authMessage.textContent = getDatabaseErrorMessage(error);
  }
});

academyParentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(academyParentForm);
  const name = String(formData.get("academyParentName") || "").trim();
  const email = String(formData.get("academyParentEmail") || "").trim().toLowerCase();

  if (!name || !email) {
    authMessage.textContent = "Enter the parent's name and email.";
    return;
  }

  try {
    await createAcademyParentProfile({ name, email });
    academyParentForm.reset();
    authMessage.textContent = "Parent added. They can create their password from the parent login screen.";
    renderParentDashboard();
  } catch (error) {
    authMessage.textContent = getDatabaseErrorMessage(error);
  }
});

academyStudentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(academyStudentForm);
  const parentId = String(formData.get("academyStudentParent") || "");
  const firstName = String(formData.get("academyStudentFirstName") || "").trim();
  const lastName = String(formData.get("academyStudentLastName") || "").trim();
  const age = Number(formData.get("academyStudentAge") || 8);
  const state = String(formData.get("academyStudentState") || "NA").trim().toUpperCase().slice(0, 2) || "NA";

  if (!parentId || !firstName || !lastName) {
    authMessage.textContent = "Choose a parent and enter the student's first and last name.";
    return;
  }

  const childLimit = getParentChildLimit(parentId);
  if (getParentChildCount(parentId) >= childLimit) {
    authMessage.textContent = `This parent already has ${childLimit} kid${childLimit === 1 ? "" : "s"} assigned. Increase the kid limit first.`;
    return;
  }

  if (findChildByFullName(firstName, lastName, parentId)) {
    authMessage.textContent = "This parent already has a student profile with that first and last name.";
    return;
  }

  try {
    await createChildProfile({ parentId, firstName, lastName, age, state });
    academyStudentForm.reset();
    renderStateOptions(academyStudentState, "CA");
    authMessage.textContent = "Student added.";
    renderParentDashboard();
  } catch (error) {
    authMessage.textContent = getDatabaseErrorMessage(error);
  }
});

parentQuestionForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const parent = getCurrentParent();
  const isAcademy = session && session.role === "academy";
  const formData = new FormData(parentQuestionForm);
  const config = getParentQuestionFormConfig();
  const childIds = formData.getAll("parentQuestionChild").map(String).filter(Boolean);
  const { subject, selectedLevel, path, count, testMode, prompt } = config;
  const timedChallenge = formData.get("parentQuestionTimed") === "on" && count > 1;
  const customQuestion = String(formData.get("parentQuestionText") || "").trim();
  const customAnswer = String(formData.get("parentQuestionAnswer") || "").trim();
  const customExplanation = String(formData.get("parentQuestionExplanation") || "").trim();
  const selectedChildren = demoData.children.filter((child) => {
    const canTarget = isAcademy || (parent && child.parentId === parent.id);
    const matchesSelection = childIds.includes(child.id);
    const matchesLevel = selectedLevel === "all" || getAgeGroup(child.age) === selectedLevel;
    return canTarget && matchesSelection && matchesLevel;
  });

  if ((!parent && !isAcademy) || !selectedChildren.length) {
    authMessage.textContent = "Choose at least one student.";
    return;
  }

  let customQuestionSet = [];

  try {
    if (testMode === "custom") {
      syncParentQuestionDraft(config);

      if (!customQuestion || !customAnswer) {
        authMessage.textContent = "Add the question and correct answer before moving to the next one.";
        return;
      }

      parentQuestionDraft.questions = [
        ...parentQuestionDraft.questions,
        {
          subject,
          prompt,
          question: customQuestion,
          answer: customAnswer,
          explanation: customExplanation,
          order: parentQuestionDraft.questions.length + 1
        }
      ].slice(0, count);

      if (parentQuestionDraft.questions.length < count) {
        const nextNumber = parentQuestionDraft.questions.length + 1;
        parentQuestionText.value = "";
        parentQuestionAnswer.value = "";
        if (parentQuestionExplanation) {
          parentQuestionExplanation.value = "";
        }
        renderParentQuestionDraft(config);
        preloadEditableParentQuestion(true);
        authMessage.textContent = `Question ${nextNumber - 1} saved. Add question ${nextNumber} of ${count}. Nothing has been sent yet.`;
        return;
      }

      customQuestionSet = [...parentQuestionDraft.questions];
    }

    let sentCount = 0;
    const sharedTestGroupId = count > 1
      ? `${timedChallenge ? "challenge" : "test"}-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      : "";

    for (const child of selectedChildren) {
      const ageGroup = selectedLevel === "all" ? getAgeGroup(child.age) : selectedLevel;
      const questions = testMode === "custom"
        ? customQuestionSet
        : buildParentTestQuestions({ subject, path, ageGroup, count, prompt });

      for (const item of questions) {
        await createParentQuestion({
          parentId: isAcademy ? child.parentId : parent.id,
          childId: child.id,
          subject: item.subject,
          prompt: questions.length > 1 ? `${item.prompt} (${item.order || 1}/${questions.length})` : item.prompt,
          question: item.question,
          answer: item.answer,
          explanation: item.explanation,
          testGroupId: questions.length > 1 ? sharedTestGroupId : "",
          timedChallenge
        });
        sentCount += 1;
      }
    }

    parentQuestionForm.reset();
    resetParentQuestionDraft();
    renderParentQuestionTopicOptions();
    renderParentQuestionMode();
    authMessage.textContent = `${sentCount} question${sentCount === 1 ? "" : "s"} sent.`;
    renderParentDashboard();
  } catch (error) {
    authMessage.textContent = getDatabaseErrorMessage(error);
  }
});

parentQuestionSubject.addEventListener("change", () => {
  resetParentQuestionDraft();
  renderParentQuestionTopicOptions();
  preloadEditableParentQuestion();
});

parentQuestionMode.addEventListener("change", () => {
  resetParentQuestionDraft();
  renderParentQuestionMode();
});

parentQuestionLevel.addEventListener("change", () => {
  resetParentQuestionDraft();
  const parent = getCurrentParent();
  renderParentQuestionManager(parent, session && session.role === "academy");
  preloadEditableParentQuestion();
});

parentQuestionPath.addEventListener("change", () => {
  resetParentQuestionDraft();
  preloadEditableParentQuestion();
});

parentQuestionChild.addEventListener("change", () => {
  resetParentQuestionDraft();
  preloadEditableParentQuestion();
});

parentQuestionCount.addEventListener("change", () => {
  resetParentQuestionDraft();
  renderParentQuestionMode();
});

parentQuestionTimed.addEventListener("change", () => {
  resetParentQuestionDraft();
  renderParentQuestionMode();
});

parentQuestionDraftClear.addEventListener("click", () => {
  resetParentQuestionDraft();
  parentQuestionText.value = "";
  parentQuestionAnswer.value = "";
  if (parentQuestionExplanation) {
    parentQuestionExplanation.value = "";
  }
  preloadEditableParentQuestion(true);
  authMessage.textContent = "Question draft cleared.";
});

academyManagement.addEventListener("click", async (event) => {
  const limitButton = event.target.closest("[data-update-parent-limit]");
  const parentButton = event.target.closest("[data-delete-parent]");
  const childButton = event.target.closest("[data-delete-child]");

  if (limitButton) {
    const parentId = limitButton.dataset.updateParentLimit;
    const limitInput = Array.from(academyManagement.querySelectorAll("[data-parent-limit]"))
      .find((input) => input.dataset.parentLimit === parentId);
    const nextLimit = normalizeChildLimit(limitInput ? limitInput.value : 2);

    try {
      await updateParentChildLimit(parentId, nextLimit);
      authMessage.textContent = `Kid limit updated to ${nextLimit}.`;
      renderParentDashboard();
    } catch (error) {
      authMessage.textContent = getDatabaseErrorMessage(error);
    }
    return;
  }

  if (parentButton) {
    const parentId = parentButton.dataset.deleteParent;
    const parentName = getParentName(parentId);
    if (window.confirm(`Delete ${parentName} and all assigned students?`)) {
      try {
        await deleteParentProfile(parentId);
        renderParentDashboard();
      } catch (error) {
        authMessage.textContent = getDatabaseErrorMessage(error);
      }
    }
    return;
  }

  if (childButton) {
    const childId = childButton.dataset.deleteChild;
    const child = demoData.children.find((item) => item.id === childId);
    if (child && window.confirm(`Delete ${child.name} and their work history?`)) {
      try {
        await deleteChildProfile(childId);
        renderParentDashboard();
      } catch (error) {
        authMessage.textContent = getDatabaseErrorMessage(error);
      }
    }
  }
});

parentDashboard.addEventListener("click", (event) => {
  const reviewButton = event.target.closest("[data-review-child]");
  const closeButton = event.target.closest("[data-close-review]");

  if (reviewButton) {
    renderWorkReview(
      reviewButton.dataset.reviewChild,
      reviewButton.dataset.reviewFilter,
      reviewButton.dataset.reviewSubject || "all",
      reviewButton.dataset.reviewDate || ""
    );
    return;
  }

  if (closeButton) {
    workReview.classList.add("hidden");
  }
});

parentDashboard.addEventListener("change", (event) => {
  const historySelect = event.target.closest("[data-history-child]");

  if (!historySelect) {
    return;
  }

  dashboardState.historyDateByChild[historySelect.dataset.historyChild] = historySelect.value;
  renderParentDashboard();
});

parentDashboard.addEventListener("input", (event) => {
  const searchInput = event.target.closest("#academyStudentSearch");

  if (!searchInput) {
    return;
  }

  dashboardState.academyStudentSearch = searchInput.value;
  renderParentDashboard();
  const refreshedSearch = document.querySelector("#academyStudentSearch");
  if (refreshedSearch) {
    refreshedSearch.focus();
    refreshedSearch.setSelectionRange(refreshedSearch.value.length, refreshedSearch.value.length);
  }
});

topicSelect.addEventListener("change", async () => {
  const selectedValue = topicSelect.value || "";
  const selectedGroupId = selectedValue.startsWith("testgroup:")
    ? selectedValue.slice(10)
    : "";
  const selectedTestId = selectedValue.startsWith("test:")
    ? selectedValue.slice(5)
    : "";
  const child = getCurrentChild();
  const selectedGroupQuestion = selectedGroupId
    ? getPendingParentQuestionInGroup(child, selectedGroupId)
    : null;
  const selectedTest = selectedTestId ? getParentQuestionById(selectedTestId) : null;

  if (selectedGroupQuestion) {
    try {
      await markParentQuestionGroupStarted(selectedGroupId, child);
    } catch (error) {
      feedback.className = "feedback needs-work";
      feedback.textContent = `Timer started here, but the database did not save the start time yet: ${getDatabaseErrorMessage(error)}`;
    }
    appState.path = null;
    appState.mode = "parent-check";
    appState.parentQuestionId = selectedGroupQuestion.id;
    appState.parentTestGroupId = selectedGroupId;
    appState.subject = selectedGroupQuestion.subject;
  } else if (selectedTest && selectedTest.status === "pending") {
    appState.path = null;
    appState.mode = "parent-check";
    appState.parentQuestionId = selectedTest.id;
    appState.parentTestGroupId = null;
    appState.subject = selectedTest.subject;
  } else {
    appState.path = selectedValue || null;
    appState.mode = "practice";
    appState.parentQuestionId = null;
    appState.parentTestGroupId = null;
  }

  appState.index = 0;
  appState.correct = 0;
  appState.answered = 0;
  appState.practiceRound = 0;
  appState.startedAt = Date.now();
  appState.parentQuestionJustCompleted = false;
  render();
  document.querySelector("#practice").scrollIntoView({ behavior: "smooth", block: "start" });
  answerInput.focus();
});

subjectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    subjectButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    appState.subject = button.dataset.subject;
    appState.path = appState.subject === "fun" ? skills.fun[0].key : null;
    appState.index = 0;
    appState.correct = 0;
    appState.answered = 0;
    appState.practiceRound = 0;
    appState.startedAt = Date.now();
    appState.parentQuestionId = null;
    appState.parentTestGroupId = null;
    appState.parentQuestionJustCompleted = false;
    render();
  });
});

shareButtons.forEach((button) => {
  button.addEventListener("click", shareAppLink);
});

answerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = getCurrentQuestion();
  const isCorrect = normalize(answerInput.value) === normalize(question.answer);
  const child = getCurrentChild();

  feedback.classList.toggle("correct", isCorrect);
  feedback.classList.toggle("needs-work", !isCorrect);
  feedback.textContent = isCorrect
    ? "Correct. Nice steady work."
    : getAnswerExplanation(question, answerInput.value);

  if (isCorrect) {
    appState.correct += 1;
  }

  appState.answered += 1;

  if (child) {
    const nextAnswered = appState.answered;
    const roundSize = getCurrentRoundSize();
    const isPlacementComplete = appState.mode === "placement" && nextAnswered >= roundSize;

    const attempt = {
      childId: child.id,
      subject: appState.subject,
      path: appState.path,
      mode: appState.mode,
      skill: question.skill || appState.path || appState.mode,
      difficulty: question.difficulty || "medium",
      question: question.text,
      answer: answerInput.value,
      correctAnswer: question.answer,
      explanation: question.explanation || question.hint || "",
      correct: isCorrect,
      createdAt: Date.now()
    };

    demoData.attempts.push(attempt);

    if (question.parentQuestionId) {
      const activeParentQuestion = getParentQuestionById(question.parentQuestionId);
      const activeGroupId = appState.parentTestGroupId || (activeParentQuestion ? activeParentQuestion.testGroupId : "");
      try {
        await markParentQuestionAnswered(question.parentQuestionId, answerInput.value, isCorrect);
      } catch (error) {
        feedback.className = "feedback needs-work";
        feedback.textContent = `Answer checked, but the parent question status did not save yet: ${getDatabaseErrorMessage(error)}`;
      }
      const nextGroupQuestion = activeGroupId
        ? getPendingParentQuestionInGroup(child, activeGroupId)
        : null;
      if (nextGroupQuestion) {
        appState.mode = "parent-check";
        appState.parentQuestionId = nextGroupQuestion.id;
        appState.parentTestGroupId = activeGroupId;
        appState.subject = nextGroupQuestion.subject;
      } else {
        const completedSubject = appState.subject;
        appState.mode = "practice";
        appState.parentQuestionId = null;
        appState.parentTestGroupId = null;
        if (completedSubject === "fun") {
          appState.subject = "fun";
          appState.path = skills.fun[0].key;
        } else if (!content[completedSubject]) {
          appState.subject = "math";
          appState.path = null;
        }
        appState.index = 0;
        appState.correct = 0;
        appState.answered = 0;
        appState.practiceRound = 0;
        appState.startedAt = Date.now();
      }
      appState.parentQuestionJustCompleted = true;
    }

    if (isPlacementComplete) {
      const accuracy = Math.round((appState.correct / appState.answered) * 100);
      child.placement = child.placement || {};
      child.placement[appState.subject] = {
        accuracy,
        judgment: getPlacementJudgment(accuracy),
        ageGroup: appState.age,
        checkedAt: Date.now()
      };
      appState.mode = "practice";
      feedback.className = accuracy >= 75 ? "feedback correct" : "feedback needs-work";
      feedback.textContent = `Placement result: ${child.placement[appState.subject].judgment} (${accuracy}%). Leveled practice is ready.`;
    }

    saveDemoData();

    try {
      await saveAttemptToDatabase(attempt, child);
    } catch (error) {
      feedback.className = "feedback needs-work";
      feedback.textContent = `Saved on this device, but the database did not save yet: ${getDatabaseErrorMessage(error)}`;
    }

    renderProfile();
  }
});

hintButton.addEventListener("click", () => {
  feedback.className = "feedback";
  feedback.textContent = getCurrentQuestion().hint;
  answerInput.focus();
});

nextButton.addEventListener("click", () => {
  if (appState.parentQuestionJustCompleted) {
    appState.parentQuestionJustCompleted = false;
    render();
    answerInput.focus();
    return;
  }

  const roundSize = getCurrentRoundSize();

  if (appState.answered >= roundSize) {
    const accuracy = appState.answered ? Math.round((appState.correct / appState.answered) * 100) : 0;
    feedback.className = accuracy >= 80 ? "feedback correct" : "feedback needs-work";
    feedback.textContent = `Round complete: ${accuracy}% correct. Loading the next skill-level set.`;
    appState.index = 0;
    appState.correct = 0;
    appState.answered = 0;
    appState.practiceRound += 1;
    appState.startedAt = Date.now();
    render();
    feedback.className = accuracy >= 80 ? "feedback correct" : "feedback needs-work";
    feedback.textContent = `New round ready. This set adjusts from the latest work.`;
    answerInput.focus();
    return;
  }

  appState.index = (appState.index + 1) % roundSize;
  render();
  answerInput.focus();
});

async function startApp() {
  if (hasDatabaseConnection()) {
    try {
      if (session && session.role === "academy") {
        await loadAcademyData();
      } else if (session && session.role === "kid") {
        await refreshCurrentKidPortal();
      } else {
        const { data } = await supabaseClient.auth.getSession();
        const databaseSession = data && data.session;

        if (databaseSession && databaseSession.user) {
        await loadDatabaseData();
        const parent = demoData.parents.find((item) => item.id === databaseSession.user.id);

          if (parent && (!session || session.role === "parent")) {
            session = { role: "parent", parentId: parent.id };
            saveSession();
          }
        }
      }
    } catch (error) {
      authMessage.textContent = getDatabaseErrorMessage(error);
    }
  }

  render();
}

startApp();

setInterval(() => {
  refreshCurrentKidPortal({ rerender: true });
}, 15000);
