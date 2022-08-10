// localStorage.clear();
// --< SELECOTRS >--
let hs = document.querySelector(".hs");
let usrscore = document.querySelector(".hsscore");
const hsbtn = document.querySelector(".hsbtn");
const btnhs = document.querySelector(".btnhs");

// --< EVENT LISTENERS >--
document.addEventListener("DOMContentLoaded", DisplayScore);

// --< CHECK LOCALSTORAGE CONNECTION >--
function checklocalStorage() {
  //  -- SAVEDSCORE --
  if (localStorage.getItem("savedscore") === null) {
    savedscore = [];
  } else {
    savedscore = JSON.parse(localStorage.getItem("savedscore"));
  }
}

// --< FUNCTIONS >--

function DisplayScore() {
  checklocalStorage();
  savedscore.sort(function (a, b) {
    return b.score - a.score;
  });
  savedscore.forEach(function (scr, ind) {
    // -- CREATE hsin UL --
    var hsinul = document.createElement("ul");
    hsinul.classList.add("hsin");
    // -- CREATE NAME LI --
    const hsname = document.createElement("li");
    hsname.classList.add("hsname");
    hsname.innerText = scr.name;
    // -- CREATE SCORE DIV --
    const scoreDIV = document.createElement("div");
    scoreDIV.classList.add("hsdiv");

    // -- CREATE SCORE LI --
    const hsscore = document.createElement("li");
    hsscore.innerHTML = '<i class="fa fa-trophy"></i>' + scr.score;
    hsscore.classList.add("hsscore");
    // -- CREATE TOTAL LI --
    const hstotal = document.createElement("li");
    hstotal.classList.add("hstotal");
    hstotal.innerHTML = '<i class="far fa-dot-circle"></i>' + scr.total;
    // -- CREATE ANSWERED LI --
    const hsanswered = document.createElement("li");
    hsanswered.innerHTML = '<i class="far fa-check-circle"></i>' + scr.correct;
    hsanswered.classList.add("hsanswered");
    // -- CREATE WRONG LI --
    const hswrong = document.createElement("li");
    hswrong.innerHTML = '<i class="far fa-times-circle"></i>' + scr.wrong;
    hswrong.classList.add("hswrong");
    // -- APPEND hsin UL > NAME LI > SCORE LI --
    hsinul.appendChild(hsname);
    hsinul.appendChild(scoreDIV);
    scoreDIV.appendChild(hsscore);
    scoreDIV.appendChild(hstotal);
    scoreDIV.appendChild(hsanswered);
    scoreDIV.appendChild(hswrong);
    hs.appendChild(hsinul);
    // -- TO DISPLAY TROPHY FOR FIRST 3 HIGH SCORE --
    if (ind == 0) {
      const first = document.createElement("label");
      first.innerHTML = '<i class="fas fa-crown"></i>';
      first.classList.add("First");
      hsinul.append(first);
    }
    if (ind == 1) {
      const second = document.createElement("label");
      second.innerHTML = '<i class="fas fa-medal"></i>';
      second.classList.add("second");
      hsinul.append(second);
    }
    if (ind == 2) {
      const third = document.createElement("label");
      third.innerHTML = '<i class="fas fa-award"></i>';
      third.classList.add("third");
      hsinul.append(third);
    }
  });
}
