"use strict";
////////////////////////////
//////Variables//////
let ul = document.getElementById("phrase").firstElementChild;
let lis = document.getElementById("phrase").firstElementChild.getElementsByTagName("li");
let phrases = ["Allgreektome", "Jigisup", "Onthesamepage", "Teamtreehouse", "Thisisudemy"];
let overlay = document.getElementById('overlay');
let btnReset = document.querySelector('.btn__reset');
let buttonA = document.getElementsByTagName('button');
let lifes = 5;
let triesList = document.querySelectorAll('.tries');
let Gametitle = document.querySelector('.title');


////////////////////////////
//////Functions

// This will returns the random phrase from the array.
function randomPhrase() {
  return phrases[Math.floor(Math.random() * phrases.length)];
}
let randPhrase = randomPhrase();


// Gets random split phrase and adds letters as <li> to HTML with class 'letter'
function displayPhrase() {
  for (let i = 0; i < randPhrase.length; i++) {
    let li = document.createElement('li');
    li.textContent = randPhrase[i];
    li.classList.add('letter');
    ul.append(li);
  }
}

// Game Lost function
function gameLost() {
  overlay.style.display = 'flex';
  overlay.classList.add('lose');
  btnReset.textContent = 'Play Again?';
  Gametitle.textContent = 'SORRY! YOU LOST';
  resetGame();
}

// Game Won function
function gameWon() {
  overlay.style.display = 'flex';
  overlay.classList.add('win');
  btnReset.textContent = 'Play Again?';
  Gametitle.textContent = 'Congratulations! You Won!';
  resetGame();
}


// Checks the guess letter with the phrase
let flag = 0;
let flag1 = 1;
function checkGuess(guess) {
  for (let i = 0; i < lis.length; i++) {
    if (guess.textContent.toUpperCase() === lis[i].textContent.toUpperCase()) {
      if (flag1 === lis.length) {
        gameWon();
        return;
      }
      guess.style.backgroundColor = '#445069';
      guess.style.color = '#ffffff';
      guess.disabled = true;
      lis[i].style.backgroundColor = '#78cf82';
      lis[i].style.color = '#ffffff';
      flag++;
      flag1++;
    }
  }

  // If correct guess return
  if (flag > 0) {
    flag = 0;
    return;
  }

  // Not Correct Guess
  guess.style.backgroundColor = '#445069';
  guess.style.color = '#ffffff';
  guess.disabled = true;
  lifes--;
  triesList[lifes].firstChild.src = 'images/lostHeart.png';
  if (lifes === 0) {
    gameLost();
  }
}

// Reset The Game
function resetGame() {
  btnReset.addEventListener('click', function () {
    window.location.reload();
    return false;
  })
}


///////////////////////////////
// Event Listners

// Game Start button Listners.
btnReset.addEventListener('click', function () {
  overlay.style.display = 'none';
  displayPhrase();
})

// Event Listners for all the buttons.
for (let i = 0; i < buttonA.length; i++) {
  buttonA[i].addEventListener('click', function () {
    checkGuess(buttonA[i]);
  })
}
