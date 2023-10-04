const startButton = document.querySelector('#startButton');
const timeRemaining = document.querySelector('#timeRemaining')
// timer seconds and textContent
let secondsLeft = 10
timeRemaining.textContent = secondsLeft

startButton.addEventListener('click', () => {
  const welcomeContainer = document.querySelector('#welcomeContainer')
  welcomeContainer.classList.remove('active')
  // Make the question card visible
  const questionContainer = document.querySelector('#questionContainer')
  questionContainer.classList.add('active')
  // run function line 22
  runQuiz()
})

function endGame() {
  return console.log('game over')
}


function runQuiz() {
  // Countdown timer for the game. Runs endGame function to end the game
  const quizTimer = setInterval(() => {
    secondsLeft--
    timeRemaining.textContent = secondsLeft

    if (!secondsLeft) {
      clearInterval(quizTimer);
      endGame()
    }

  }, 1000)

  const answerOptions = document.querySelectorAll('.option-list li')
  console.log(answerOptions)
}

// right answer run nextQuestion() and plus one to score
// wrong answer run nextQuestion() and subtract from timer
