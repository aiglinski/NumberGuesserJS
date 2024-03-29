let min = 1,
  max = 10,
  winningNum = getWinningNum(min, max),
  guessesLeft = 3;

//   ui elements
const game = document.getElementById('game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBTN = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

//   assigning min and max values
minNum.textContent = min;
maxNum.textContent = max;
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

guessBTN.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);
  console.log(guess);

  //   validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      gameOver(false, `game over!. The correct number was ${winningNum}`);
    } else {
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  guessBTN.value = 'play again?';
  guessBTN.className += 'play-again';
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
function getWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
