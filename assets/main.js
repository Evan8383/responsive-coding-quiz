const startButton = document.querySelector('#startButton');
const timeRemaining = document.querySelector('#timeRemaining')
// timer seconds and textContent
let secondsLeft = 60
timeRemaining.textContent = secondsLeft

const answersBank = [
  {
    option1: 'asdf',
    option2: 'asdfasdf',
    option3: 'asdfasdfasdf',
    option4: 'asdfasdfasdfasdf',
  },
]


startButton.addEventListener('click', () => {
  const welcomeContainer = document.querySelector('#welcomeContainer')
  welcomeContainer.classList.remove('active')
  // Make the question card visible
  const questionContainer = document.querySelector('#questionContainer')
  questionContainer.classList.add('active')
  // run function line 22
  startTimer()
  runQuiz(answersBank[0])
})


// Countdown timer for the game. Runs endGame() function when time gets to 0
function startTimer() {
  const quizTimer = setInterval(() => {
    secondsLeft--
    timeRemaining.textContent = secondsLeft

    if (!secondsLeft) {
      clearInterval(quizTimer);
      endGame()
    }

  }, 1000)
}

function runQuiz(answersBank) {
  const answerOptions = document.querySelectorAll('.option')

  const { option1, option2, option3, option4 } = answersBank
  const options = [option1, option2, option3, option4]

  answerOptions.forEach((option, index) => {
    option.textContent = options[index];
    option.addEventListener('click', () => {

      // console.log('option clicked')
    })
  })

}
function endGame() {
  return console.log('game over')
}

// right answer run nextQuestion() and plus one to score
// wrong answer run nextQuestion() and subtract from timer
