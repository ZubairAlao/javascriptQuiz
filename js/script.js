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

function displayQuestion() {

    // Get the necessary DOM elements
    const quizQuestion = document.getElementById('quiz__question');
    const optionA = document.getElementById('optionA');
    const optionB = document.getElementById('optionB');
    const optionC = document.getElementById('optionC');
    const optionD = document.getElementById('optionD');
    const quizNumber = document.getElementById('quiz__number');

    // Hide the "Begin" and "Score" sections
    document.getElementById('quiz__begin').classList.add('hide');
    document.getElementById('quiz__score').classList.add('hide');

    // Retrieve the current question from the quiz array based on the current question index
    const current = quiz[currentQuestion];

    // Update the HTML content with the current question and options
    quizQuestion.textContent = current.question;
    optionA.textContent = current.options.a;
    optionB.textContent = current.options.b;
    optionC.textContent = current.options.c;
    optionD.textContent = current.options.d;
    quizNumber.textContent = ` ${currentQuestion + 1} `;

    // Add event listeners to question number buttons
    const questionNumButtons = document.querySelectorAll('input[name="question__num"]');
    questionNumButtons.forEach((button, index) => {
        button.addEventListener('click', () => goToQuestion(index));
        if (quiz[index].userAnswer !== null) {
            button.classList.add('answered');
          } else {
            button.classList.remove('answered');
          }
    });

    // Reset radio buttons if no selected answer
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach((radio) => {
        radio.checked = false;
        radio.addEventListener('click', () => {
            quiz[currentQuestion].userAnswer = radio.value;
            });
    });

    // Set user answer if it exists
    const userAnswer = current.userAnswer;
    if (userAnswer) {
        const selectedOption = document.querySelector(`input[name="answer"][value="${userAnswer}"]`);
        if (selectedOption) {
            selectedOption.checked = true;
        }
    }

}

function goToQuestion(questionIndex) {
    // Update the current question index and call displayQuestion() to show the selected question
    currentQuestion = questionIndex;
    displayQuestion();
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

    // calculate the score
    score = 0;
    for (let i = 0; i < quiz.length; i++) {
        if (quiz[i].userAnswer === quiz[i].answer) {
            score++;
        }
        
    }
    timeLeft = 0;
    document.getElementById('quiz__score').classList.remove('hide');
    document.getElementById('user__score').textContent = score;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 120;
    quiz.forEach(question => {
        question.userAnswer = null;
    });
    displayQuestion();
    clearInterval(timer); // Clear the interval timer
    startTimer(); // Restart the timer
}

prev.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
});

next.addEventListener('click', () => {
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