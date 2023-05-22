// an arrays of question and options
let quiz = [
    {
        question: "Nigeria is in which continent?",
        options: {a: "Asia", b: "Australia", c: "Africa", d: "Europe"},
        answer: "c",
        userAnswer: null // Add a property to store the selected answer
    },
    {
        question: "What is the capital city of Nigeria?",
        options: {a: "Lagos", b: "Abuja", c: "Cairo", d: "Niger"},
        answer: "b",
        userAnswer: null // Add a property to store the selected answer
        
    },
    {
        question: "Which river is the longest in Nigeria?",
        options: {a: "River Niger", b: "River Benue", c: "River Nile", d: "River Volta"},
        answer: "a",
        userAnswer: null // Add a property to store the selected answer
    },
    {
        question: "Who is the current president of Nigeria?",
        options: {a: "Muhammad Buhari", b: "Bola Tinubu", c: "Goodluck Jonathan", d: "Musa Yar'adua"},
        answer: "b",
        userAnswer: null // Add a property to store the selected answer
    },
    {
        question: "Which contry border Nigeria to the West?",
        options: {a: "Cameroon", b: "Niger Republic", c: "Chad", d: "Benin Republic"},
        answer: "d",
        userAnswer: null // Add a property to store the selected answer

    },
    {
        question: "What is the Largest Ethnic Group in Nigeria?",
        options: {a: "Yoruba", b: "Hausa", c: "Igbo", d: "Fulani"},
        answer: "b",
        userAnswer: null // Add a property to store the selected answer
    }
];

// a counter to access the right question by incrementing or decrementing this
// counter based on user interactin with prev and next button
let currentQuestion = 0;
// a counter for the score, for correct score, the score will be incremented
var score = 0;
let timer;
let timeLeft = 120;

// arrays of selected answer for each questions
let selectedAnswers = [];

function displayQuestion() {

    const quizQuestion = document.getElementById('quiz__question');
    const optionA = document.getElementById('optionA');
    const optionB = document.getElementById('optionB');
    const optionC = document.getElementById('optionC');
    const optionD = document.getElementById('optionD');
    const quizNumber = document.getElementById('quiz__number');

    document.getElementById('quiz__begin').classList.add('hide');
    document.getElementById('quiz__score').classList.add('hide');

    const current = quiz[currentQuestion];
    quizQuestion.textContent = current.question;
    optionA.textContent = current.options.a;
    optionB.textContent = current.options.b;
    optionC.textContent = current.options.c;
    optionD.textContent = current.options.d;
    quizNumber.textContent = ` ${currentQuestion + 1} `;

    // reset radio button if no selectedAnswers
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach((radio) => {
        radio.checked = false;
    });
}


window.onload = () => {
    document.getElementById('quiz__score').classList.add('hide');
}

function startTimer () {
    timer = setInterval(() => {
        document.getElementById("timer").textContent = `Time: ${timeLeft}`;
        timeLeft--;
        if(timeLeft < 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, (1000));
}


// creating variables 
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const restart = document.getElementById('restart');
const startAgain = document.getElementById('start__again');
const startQuiz = document.getElementById('start__quiz');
const overlay = document.getElementById('overlay');
const submit = document.getElementById('submit');

function submitQuiz() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        selectedAnswers[currentQuestion] = selectedOption.value;
    }

    // calculate the score
    score = 0;
    for (let i = 0; i < quiz.length; i++) {
        if (selectedAnswers[i] === quiz[i].answer) {
            score++;
        }
        
    }
    timeLeft = 0;
    document.getElementById('quiz__score').classList.remove('hide');
    document.getElementById('user__score').textContent = score;
    // Display the final score or perform any desired actions
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 120;
    selectedAnswers = []; // Reset selected answers array
    displayQuestion();
    clearInterval(timer); // Clear the interval timer
    startTimer(); // Restart the timer
}

prev.addEventListener('click', () => {
    // save selected answer
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        selectedAnswers[currentQuestion] = selectedOption.value;
    }
      if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
});

next.addEventListener('click', () => {
    // save selected answer
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        selectedAnswers[currentQuestion] = selectedOption.value;
    }
    if (currentQuestion < quiz.length - 1) {
    currentQuestion++;
    displayQuestion();
    }
});

submit.addEventListener('click', () => {
    submitQuiz();
});

restart.addEventListener('click', restartQuiz);

// Start the quiz
startAgain.addEventListener('click', restartQuiz);

startQuiz.addEventListener('click', () => {
    displayQuestion();
    restartQuiz();
});