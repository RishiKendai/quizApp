// localStorage.clear();
// --< GLOBAL VARIABLES >--
let score = 0;
var savedscore,
  totalmark,
  attend = 0,
  answered = 0; // VARIABLES TO DISPLAY 3 DIFFERENT TASKS
var shuffledquestions, currentquestionindex, CorrectButton;
var incprogress = 0,
  incProgress = 0; // FOR ANSWER AND QUESTION INDICATOR

// --< SELECTORS >--
var finishBtn = document.querySelector('.finished'); // FINISH BUTTON
var questionElement = document.querySelector('.question'); // QUESTION
var ansdiv = document.querySelector('.answer'); // ANSWER OPTIONS
let showTime = document.querySelector('.times'); // COUNTDOWN NUMBER
const NextBtn = document.querySelector('.nxt'); // NEXT BUTTON
let headertab = document.querySelector('.headertab'); // -- HEADER TAB < TIME, INDICATOR, SCORE >
const quizTab = document.querySelector('.quiz-tab'); // -- QUIZ TAB < QUESTION, ANSWER, BUTTONS >
const showscoreTab = document.querySelector('.showscore'); // -- SCORE TAB < NAME, SCORE DETAILS, BUTTONS >
const displayScore = document.querySelector('.display-score'); // DISPLAY SCORE
const displayTot = document.querySelector('.display-total'); // DISPLAY TOTAL QUESTION
const displayCrct = document.querySelector('.display-crct'); // DISPLAY CORRECT
const displayWrng = document.querySelector('.display-wrng'); // DISPLAY WRONG
const usrName = document.querySelector('.name'); // NAME TEXTBOX
const Savebtn = document.querySelector('.save'); // SAVE BUTTON < SAVE TO LOCAL STORAGE >
const Cancelbtn = document.querySelector('.cancel'); // CANCEL BUTTON < CANCEL SAVING >
let scoreClass = document.querySelector('.score'); // DISPLAY DYNAMIC SCORE

// --< EVENT-LISTENER >--
NextBtn.addEventListener('click', NextButton);
finishBtn.addEventListener('click', DisplayScore);
document.addEventListener('DOMContentLoaded', checkusrvalue);
Savebtn.addEventListener('click', saveScore);
Cancelbtn.addEventListener('click', cancelScore);
document.addEventListener('DOMContentLoaded', startg); // START QUIZ

// --< FUNCTIONS >--
// -- START QUIZ --
function startg() {
  totalmark = questionset.length;
  shuffledquestions = questionset.sort(() => Math.random() - 0.5);
  currentquestionindex = 0;
  setnextquestion();
  timer();
}

// -- TIMER --
var timeleft;
var downloadTimer;
function timer() {
  timeleft = 20;
  downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      if (shuffledquestions.length > currentquestionindex + 1) {
        NextButton();
      } else {
        DisplayScore();
      }
    }
    if (timeleft <= 10) {
      showTime.style.color = 'red';
    }
    showTime.textContent = timeleft;
    timeleft -= 1;
  }, 1000);
}

// -- NEXT BUTTON --
function NextButton() {
  if (shuffledquestions.length > currentquestionindex) {
    clearInterval(downloadTimer);
    timer();
    showTime.style.color = 'hsl(0 0% 0% / .88';
    timeleft = 20;
  }
  currentquestionindex++;
  setnextquestion();
  incPbar();
}

// -- SET NEXT QUESTION ON CLICK OF < NEXT BUTTON > --
function setnextquestion() {
  resetstate();
  showquestions(shuffledquestions[currentquestionindex]);
}

// -- TO RESET THE QUESTION ANSWER AND HIDE NEXT BUTTON --
function resetstate() {
  ansdiv.innerHTML = '';
  ansdiv.style.pointerEvents = 'auto';
  NextBtn.classList.add('hide');
}

// -- DISPLAY NEXT QUESTION --
function showquestions(question) {
  questionElement.innerText = question.Ques;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    ansdiv.appendChild(button);
    if (answer.correct) {
      // IF ANSWER CORRECT
      button.dataset.correct = answer.correct; // CREATE DATASET FOR THAT BUTTON
      CorrectButton = button;
    }
    button.addEventListener('click', checkanswer);
  });
}

// -- CHECK ANSWER --
function checkanswer(e) {
  var ans = e.target;
  const correct = ans.dataset.correct;
  setstatusclass(ans, correct);
  ansdiv.style.pointerEvents = 'none';

  if (shuffledquestions.length > currentquestionindex + 1) {
    // timer() --
    NextBtn.classList.remove('hide');
  } else {
    incPbar();
    finishBtn.classList.remove('hide');
  }
}

// -- SET STATUS FOR CORRECT AND WRONG ANSWER
function setstatusclass(element, correct) {
  clearstatusclass(element);
  attend += 1;
  if (correct) {
    element.classList.add('crctans');
    move();
    answered += 1;
  } else {
    element.classList.add('wrng');
    CorrectButton.classList.add('crctans');
  }
}

// -- CLEAR THE CURRENT STATUS --
function clearstatusclass(element) {
  element.classList.remove('crct');
  element.classList.remove('crctans');
  element.classList.remove('wrng');
}

// -- QUESTION INDICATOR --
function incPbar() {
  incProgress++;
  var inbar = document.querySelector('.inBar');
  inbar.style.width = (incProgress / totalmark) * 100 + '%';
}

// -- ANSWER INDICATOR --
function move() {
  incprogress++;
  var bar = document.getElementById('myBar');
  var width = parseInt(scoreClass.innerText);
  bar.style.background =
    'linear-gradient(160deg,hsl(106 85% 73% / 0.835) 20%, hsl(146 85% 73% / 0.835) 100%)';
  if (width >= 100) {
    alert('exceeded');
    // btn.style.pointerEvents = "none";
  } else {
    width = (incprogress / totalmark) * 100;
    bar.style.width = width + '%';
    scoreClass.innerText = width.toFixed();
    score = parseInt(scoreClass.innerText);
  }
}

// -- DISPLAY SCORE DETAILS --
function DisplayScore() {
  headertab.style.display = 'none';
  quizTab.style.display = 'none';
  showscoreTab.style.display = 'flex';
  displayScore.textContent = score;
  displayTot.textContent = totalmark;
  displayCrct.textContent = answered;
  displayWrng.textContent = totalmark - answered;
  checkusrvalue();
}

// -- CHECK USER VALUE IS ENTERED OR NOT --
function checkusrvalue() {
  if (usrName.value == '') {
    Savebtn.style.pointerEvents = 'none';
  } else if (usrName.value != '') {
    Savebtn.style.pointerEvents = 'fill';
  }
  const loop = setTimeout(checkusrvalue, 100);
}

// -- CHECK LOCALSTORAGE CONNECTION --
function checklocalStorage() {
  //  -- SAVEDSCORE --
  if (localStorage.getItem('savedscore') === null) {
    savedscore = [];
  } else {
    savedscore = JSON.parse(localStorage.getItem('savedscore'));
  }
}

// -- SAVE SCORE TO LOCAL STORAGE --
function saveScore() {
  checklocalStorage(); // -- CHECK LOCAL STORAGE CONNECTION --
  let scores = {
    name: usrName.value,
    score: score,
    total: totalmark,
    correct: answered,
    wrong: totalmark - answered,
  };
  savedscore.push(scores);
  localStorage.setItem('savedscore', JSON.stringify(savedscore));
  usrName.value = '';
  location.href = 'quiz.html';
}

// -- CANCEL SCORE GO TO HOME --
function cancelScore() {
  location.href = 'quiz.html';
}

// -- GET QUESTION ARRAY --
const questionset = [
  {
    Ques: 'What is software?',
    answers: [
      { text: 'Instructions that tell the hardware what to do', correct: true },
      {
        text: 'Any part of the computer that has a physical structure',
        correct: false,
      },
      { text: 'Flexible parts of a computer case', correct: false },
      {
        text: 'Clothing designed to be worn by computer users',
        correct: false,
      },
    ],
  },
  {
    Ques: 'What is the correct command to create a new React project?',
    answers: [
      { text: 'npx create-react-app', correct: false },
      { text: 'npx create-react-app myReactApp', correct: true },
      { text: 'npm create-react-app myReactApp', correct: false },
      { text: 'npm create-react-app', correct: false },
    ],
  },
  {
    Ques: 'President of India ?',
    answers: [
      { text: 'Ram Nath kovind', correct: true },
      { text: 'Pranab Kumar Mukherjee', correct: false },
    ],
  },
  {
    Ques: 'Dangerous Plastic in Planet ?',
    answers: [
      { text: 'Polycarbonate', correct: false },
      { text: 'Polyethylene', correct: false },
      { text: 'Chlorinated plastic', correct: true },
      { text: 'Polyvinyl Chloride', correct: false },
    ],
  },
  {
    Ques: 'Governor of TamilNadu ?',
    answers: [
      { text: 'Konijeti Rosaiah', correct: false },
      { text: 'Vidyasagar Rao', correct: false },
      { text: 'Banwarilal Purohit', correct: true },
      { text: 'Surjit Singh Barnala', correct: false },
    ],
  },
  {
    Ques: 'Richest Man in India ?',
    answers: [
      { text: 'Gautam Adani', correct: false },
      { text: ' Mukesh Ambani', correct: true },
      { text: 'Shiv Nadar', correct: false },
      { text: 'Lakshmi Mittal', correct: false },
    ],
  },
];
