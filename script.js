const questions = [
    {
        question: "Who is known as the Father of the Indian Constitution?",
        answers: [
            { text: "Mahatma Gandhi", correct: false },
            { text: "Dr. B. R. Ambedkar", correct: true },
            { text: "Jawaharlal Nehru", correct: false },
            { text: "Sardar Patel", correct: false }
        ]
    },

    {
        question: "What is the capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "Kolkata", correct: false },
            { text: "New Delhi", correct: true },
            { text: "Chennai", correct: false }
        ]
    },

    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },

    {
        question: "Who was the first Prime Minister of India?",
        answers: [
            { text: "Sardar Patel", correct: false },
            { text: "Dr. Rajendra Prasad", correct: false },
            { text: "Jawaharlal Nehru", correct: true },
            { text: "Lal Bahadur Shastri", correct: false }
        ]
    },

    {
        question: "Which is the largest ocean in the world?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Arctic Ocean", correct: false }
        ]
    },

    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Hydrogen", correct: false }
        ]
    },

    {
        question: "What is the national animal of India?",
        answers: [
            { text: "Lion", correct: false },
            { text: "Tiger", correct: true },
            { text: "Elephant", correct: false },
            { text: "Leopard", correct: false }
        ]
    },

    {
        question: "Which is the longest river in India?",
        answers: [
            { text: "Yamuna", correct: false },
            { text: "Godavari", correct: false },
            { text: "Ganga", correct: true },
            { text: "Narmada", correct: false }
        ]
    },

    {
        question: "How many fundamental rights are currently guaranteed by the Indian Constitution?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: true },
            { text: "7", correct: false },
            { text: "8", correct: false }
        ]
    },

    {
        question: "Which is the smallest state of India by area?",
        answers: [
            { text: "Goa", correct: true },
            { text: "Sikkim", correct: false },
            { text: "Tripura", correct: false },
            { text: "Manipur", correct: false }
        ]
    },

    {
        question: "Which vitamin is mainly obtained from sunlight?",
        answers: [
            { text: "Vitamin A", correct: false },
            { text: "Vitamin B", correct: false },
            { text: "Vitamin C", correct: false },
            { text: "Vitamin D", correct: true }
        ]
    },

    {
        question: "Who discovered the law of gravity?",
        answers: [
            { text: "Albert Einstein", correct: false },
            { text: "Isaac Newton", correct: true },
            { text: "Galileo Galilei", correct: false },
            { text: "Nikola Tesla", correct: false }
        ]
    },

    {
        question: "Which is the largest planet in our Solar System?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Saturn", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Neptune", correct: false }
        ]
    },

    {
        question: "What is the currency of Japan?",
        answers: [
            { text: "Yuan", correct: false },
            { text: "Won", correct: false },
            { text: "Yen", correct: true },
            { text: "Dollar", correct: false }
        ]
    },

    {
        question: "Which organ pumps blood throughout the human body?",
        answers: [
            { text: "Brain", correct: false },
            { text: "Lungs", correct: false },
            { text: "Heart", correct: true },
            { text: "Kidney", correct: false }
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

const questionNumber = document.getElementById("question-number");
const timerElement = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");

const finalScore = document.getElementById("final-score");
const correctCount = document.getElementById("correct-count");
const wrongCount = document.getElementById("wrong-count");
const percentage = document.getElementById("percentage");
const resultMessage = document.getElementById("result-message");

const restartButton = document.getElementById("restart-btn");


let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;


// Start quiz
function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;

    quizBox.classList.remove("hide");
    resultBox.classList.add("hide");

    nextButton.style.display = "none";

    showQuestion();
}


// Show question
function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];

    questionNumber.innerText =
        `Question ${currentQuestionIndex + 1}/${questions.length}`;

    questionElement.innerText = currentQuestion.question;

    let progress =
        ((currentQuestionIndex) / questions.length) * 100;

    progressBar.style.width = progress + "%";

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerText = answer.text;

        button.classList.add("answer-btn");

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);
    });

    startTimer();
}


// Reset question
function resetState() {

    clearInterval(timer);

    timeLeft = 15;

    timerElement.innerText = "Time: 15s";

    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


// Timer
function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        timerElement.innerText =
            `Time: ${timeLeft}s`;

        if (timeLeft <= 0) {

            clearInterval(timer);

            disableAnswers();

            nextButton.style.display = "block";
        }

    }, 1000);
}


// Select answer
function selectAnswer(e) {

    clearInterval(timer);

    const selectedButton = e.target;

    const isCorrect =
        selectedButton.dataset.correct === "true";

    if (isCorrect) {

        selectedButton.classList.add("correct");

        score++;

    } else {

        selectedButton.classList.add("wrong");

        showCorrectAnswer();
    }

    disableAnswers();

    nextButton.style.display = "block";
}


// Show correct answer
function showCorrectAnswer() {

    const buttons =
        answerButtons.children;

    for (let button of buttons) {

        if (button.dataset.correct === "true") {

            button.classList.add("correct");
        }
    }
}


// Disable all buttons
function disableAnswers() {

    const buttons =
        answerButtons.querySelectorAll(".answer-btn");

    buttons.forEach(button => {

        button.disabled = true;

    });
}


// Next question
nextButton.addEventListener("click", () => {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


// Show result
function showResult() {

    clearInterval(timer);

    quizBox.classList.add("hide");

    resultBox.classList.remove("hide");

    finalScore.innerText = score;

    correctCount.innerText = score;

    const wrong = questions.length - score;

    wrongCount.innerText = wrong;

    const percent =
        Math.round((score / questions.length) * 100);

    percentage.innerText = percent + "%";


    if (percent >= 90) {

        resultMessage.innerText =
            "Excellent! You are a GK Champion!";

    } else if (percent >= 70) {

        resultMessage.innerText =
            "Very Good! Keep improving your knowledge.";

    } else if (percent >= 50) {

        resultMessage.innerText =
            "Good Try! You can improve with more practice.";

    } else {

        resultMessage.innerText =
            "Keep Practicing! Don't give up.";

    }

}


// Restart quiz
restartButton.addEventListener("click", startQuiz);


// Start
startQuiz();