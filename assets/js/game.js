const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "The HTML <p> element defines:",
        choice1: "page",
        choice2: "points",
        choice3: "paragraph",
        choice4: "picture",
        answer: 3
    },
    {
        question: "When adding comments to your HTML source code, which symbol is used in the start tag?",
        choice1: "!",
        choice2: "{",
        choice3: "&",
        choice4: ".",
        answer: 1
    },
    {
        question: "Which of the following should be used when inserting a link in HTML code?",
        choice1: "<a>",
        choice2: "url",
        choice3: "href",
        choice4: "all of the above",
        answer: 4
    },
    {
        question: "Which of the following is not a block element in HTML?",
        choice1: "<a>",
        choice2: "<nav>",
        choice3: "<div>",
        choice4: "<section>",
        answer: 1
    },
    {
        question: "A favicon can be added to your website in which area of HTML?",
        choice1: "<body>",
        choice2: "<head>",
        choice3: "anywhere",
        choice4: "none of the above",
        answer: 2
    },
    {
        question: "What does CSS stand for?",
        choice1: "Creative Style Sheet",
        choice2: "Cascading System Sheet",
        choice3: "Computer Style Sheet",
        choice4: "Cascading Style Sheet",
        answer: 4
    },
    {
        question: "Where do you reference your stylesheets",
        choice1: "HTML <body>",
        choice2: "At the top of the CSS file",
        choice3: "HTML <head>",
        choice4: "At the end of the HTML document",
        answer: 3
    },
    {
        question: "True or false.  You can include styling in HTML by using <style>.",
        choice1: "True",
        choice2: "False",
        answer: 1
    },
    {
        question: "How do you insert a comment in a CSS file?",
        choice1: "Comment – this is my comment",
        choice2: "-this is my comment-",
        choice3: "/* this is my comment */",
        choice4: "//this is my comment",
        answer: 3
    },
    {
        question: "What CSS property do you use to change text color?",
        choice1: "text-color",
        choice2: "color",
        choice3: "color-text",
        choice4: "text-change color",
        answer: 2
    }
];

fetch("questions.json")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
  })
  .catch(err => {
    console.error(err);
  });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};