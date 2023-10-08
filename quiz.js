//   question: "What is the Full Form Of HTML",
//   options: [
//     "HyperText Makeup Language",
//     "HyperText Markup Language",
//     "HyperText Markup Lame",
//     "HyperTate Markup Language",
//   ],
//   answer: "HyperText Markup Language",
// },
// {
//   question: "What does CSS stands for?",
//   answer: "Cascading Style Sheet",
//   options: [
//     "Common Style Sheet",
//     "Colorful Style Sheet",
//     "Computer Style Sheet",
//     "Cascading Style Sheet",
//   ],
// },
// {
//   question: "What does PHP stands for?",
//   answer: "Hypertext Preprocessor",
//   options: [
//     "Hypertext Preprocessor",
//     "Hypertext Programming",
//     "Hypertext Preprogramming",
//     "Hometext Preprocessor",
//   ],
// },
// {
//   question: "What does SQL stands for?",
//   answer: "Structured Query Language",
//   options: [
//     "Stylish Question Language",
//     "Stylesheet Query Language",
//     "Statement Question Language",
//     "Structured Query Language",
//   ],

//QUESTIONS ARRAY
var questions = [];

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

var firebaseConfig = {
  apiKey: "AIzaSyAOOS6wanXBZiTswnsksDmIk-MNuwdJvJ4",
  authDomain: "quiz-appp-25847.firebaseapp.com",
  projectId: "quiz-appp-25847",
  storageBucket: "quiz-appp-25847.appspot.com",
  messagingSenderId: "533921719281",
  appId: "1:533921719281:web:d8786e0014c2bf67bb9a50",
  measurementId: "G-BDR6TMFDV4",
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var db = getDatabase(app);

var loader = document.getElementById("load");
var showQuestion = document.getElementById("showQuestion");

function getDataFromDatabase() {
  // loader.style.display = "block";
  // showQuestion.style.display = "none";

  var refrence = ref(db, "question/");
  onChildAdded(refrence, function (data) {
    console.log(data.val());
    questions.push(data.val());
    // loader.style.display = "none";
    // showQuestion.style.display = "block";
    renderQuestion();
  });
}

getDataFromDatabase();
var currentQuestion = document.getElementById("currentQuestion");
var totalQuestion = document.getElementById("totalQuestion");
var question = document.getElementById("question");
var answerParent = document.getElementById("answerParent");

var indexNum = 0;
var score = 0;

window.checkQuestion = function (a, b) {
  if (a == b) {
    score++;
    console.log(score);
  }
  nextQuestion();
};

window.nextQuestion = function () {
  if (indexNum + 1 == questions.length) {
    alert("your score is " + score);
  } else {
    indexNum++;
    renderQuestion();
  }
};

function renderQuestion() {
  currentQuestion.innerHTML = indexNum + 1;
  totalQuestion.innerHTML = questions.length;
  var obj = questions[indexNum];
  question.innerHTML = obj.question;
  answerParent.innerHTML = "";
  for (var i = 0; i < obj.options.length; i++) {
    answerParent.innerHTML += `<div class="col-md-4">
    <div class="py-2">
      <button onclick="checkQuestion('${obj.options[i]}','${obj.correctAnswer}')" class="btn btn-dark fs-4 rounded-pill w-100">
        ${obj.options[i]}
      </button>
    </div>
  </div>`;
  }
}
renderQuestion();

window.nextQuestion = function () {
  indexNum++;
  renderQuestion();
};
// nextQuestion();
