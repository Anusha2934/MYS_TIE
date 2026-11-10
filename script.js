/* =====================================================
   TIE ROUND - QUESTION DATABASE
   7 QUESTIONS | HINDI + ENGLISH
   ===================================================== */

const questions = [
    {
        q: "1. अटाकामा रेगिस्तान कहाँ स्थित है?\nWhere is the Atacama Desert located?",
        options: [
            "A. दक्षिण अफ्रीका / South Africa",
            "B. चिली / Chile",
            "C. ऑस्ट्रेलिया / Australia",
            "D. भारत / India"
        ],
        answer: 1
    },
    {
        q: "2. केइको फुजीमोरी (Keiko Fujimori) को किस देश का राष्ट्रपति चुना गया है?\nKeiko Fujimori has been elected President of which country?",
        options: [
            "A. जापान / Japan",
            "B. फिलीपींस / Philippines",
            "C. दक्षिण कोरिया / South Korea",
            "D. पेरू / Peru"
        ],
        answer: 3
    },
    {
        q: "3. गणना और तुलना के लिए कंप्यूटर के किस भाग का प्रयोग किया जाता है?\nWhich part of a computer is used for calculations and comparisons?",
        options: [
            "A. CLU",
            "B. ALU",
            "C. MU",
            "D. Register"
        ],
        answer: 1
    },
    {
        q: "4. संविधान की अष्टम अनुसूची में कितनी भाषाएँ शामिल हैं?\nHow many languages are included in the Eighth Schedule of the Constitution of India?",
        options: [
            "A. 18",
            "B. 20",
            "C. 24",
            "D. 22"
        ],
        answer: 3
    },
    {
        q: "5. फीफा वर्ल्ड कप 2026 का फाइनल किस स्टेडियम में खेला गया?\nAt which stadium was the FIFA World Cup 2026 final played?",
        options: [
            "A. मेटलाइफ स्टेडियम / MetLife Stadium",
            "B. एस्टाडियो एज़्टेका / Estadio Azteca",
            "C. एटी एंड टी स्टेडियम / AT&T Stadium",
            "D. मर्सिडीज-बेंज़ स्टेडियम / Mercedes-Benz Stadium"
        ],
        answer: 0
    },
    {
        q: "6. ओलंपिक में आखिरी बार शुद्ध सोने के पदक कब दिए गए थे?\nWhen were pure gold medals last awarded at the Olympic Games?",
        options: [
            "A. 1904 सेंट लुईस ओलंपिक / 1904 St. Louis Olympics",
            "B. 1912 स्टॉकहोम ओलंपिक / 1912 Stockholm Olympics",
            "C. 1908 लंदन ओलंपिक / 1908 London Olympics",
            "D. 1920 एंटवर्प ओलंपिक / 1920 Antwerp Olympics"
        ],
        answer: 1
    },
    {
        q: "7. स्वतंत्र भारत के रूप में भारत ने अपना पहला ओलंपिक स्वर्ण पदक (हॉकी में) किस वर्ष जीता?\nIn which year did India win its first Olympic gold medal as an independent nation, in hockey?",
        options: [
            "A. 1960",
            "B. 1952",
            "C. 1956",
            "D. 1948"
        ],
        answer: 3
    }
];


/* =====================================================
   GAME VARIABLES
   ===================================================== */

let currentQuestion = 0;
let answered = false;

const completedLevels = new Set();

const screens = {
    home: document.getElementById("screen-home"),
    levels: document.getElementById("screen-levels"),
    quiz: document.getElementById("screen-quiz")
};


/* =====================================================
   SCREEN NAVIGATION
   ===================================================== */

function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
        screen.classList.remove("active");
    });

    screens[screenName].classList.add("active");
}


/* =====================================================
   QUESTION SELECTION
   ===================================================== */

const levelGrid = document.getElementById("level-grid");

function renderLevels() {
    levelGrid.innerHTML = "";

    questions.forEach((question, index) => {
        const button = document.createElement("button");
        button.className = "level-btn";
        button.textContent = index + 1;

        if (completedLevels.has(index)) {
            button.classList.add("completed");
        }

        button.addEventListener("click", () => {
            currentQuestion = index;
            showQuestion();
            showScreen("quiz");
        });

        levelGrid.appendChild(button);
    });
}


/* =====================================================
   DISPLAY QUESTION
   ===================================================== */

function showQuestion() {
    answered = false;

    const question = questions[currentQuestion];
    const questionText = document.getElementById("question-text");
    const optionsGrid = document.getElementById("options-grid");
    const quizScreen = document.getElementById("screen-quiz");

    questionText.textContent = question.q;
    optionsGrid.innerHTML = "";

    const isLongQuestion = (question.q.length > 100);
    quizScreen.classList.toggle("question-long", isLongQuestion);

    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.textContent = option;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        optionsGrid.appendChild(button);
    });
}


/* =====================================================
   INSTANT ANSWER CHECKING
   ===================================================== */

function checkAnswer(selectedIndex) {
    if (answered) return;
    answered = true;

    const question = questions[currentQuestion];
    const correctIndex = question.answer;
    const optionButtons = document.querySelectorAll(".option-btn");

    optionButtons.forEach(button => {
        button.disabled = true;
    });

    optionButtons[correctIndex].classList.add("correct");

    if (selectedIndex !== correctIndex) {
        optionButtons[selectedIndex].classList.add("wrong");
    }

    completedLevels.add(currentQuestion);
    renderLevels();
}


/* =====================================================
   BUTTON EVENT LISTENERS
   ===================================================== */

document.getElementById("btn-start").addEventListener("click", () => {
    renderLevels();
    showScreen("levels");
});

document.getElementById("btn-back-to-home").addEventListener("click", () => {
    showScreen("home");
});

document.getElementById("btn-back-to-levels").addEventListener("click", () => {
    renderLevels();
    showScreen("levels");
});

document.getElementById("btn-home-from-quiz").addEventListener("click", () => {
    renderLevels();
    showScreen("levels");
});


/* =====================================================
   INITIALIZE APPLICATION
   ===================================================== */

renderLevels();
showScreen("home");