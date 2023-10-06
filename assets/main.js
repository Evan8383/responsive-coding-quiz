const welcomeContainer = document.querySelector('#welcomeContainer');
const questionContainer = document.querySelector('#questionContainer');
const endGameContainer = document.querySelector('#endGameContainer');

const scoreboard = document.querySelector('#scoreboard')
const displayScore = document.querySelector('#displayScore')
const playerInitials = document.querySelector('#playerInitials')

const timeRemaining = document.querySelector('#timeRemaining');
const answerOptions = document.querySelectorAll('.option');
const displayedQuestion = document.querySelector('#question');

const playAgainButton = document.querySelector('#playAgainButton');
const startButton = document.querySelector('#startButton');
const saveScoreButton = document.querySelector('#saveScoreButton')


const scoreList = document.querySelector('#scoreList')

let secondsLeft = 60;
let questionIndex = 0;
let score = 0;
let quizTimer;
let scoreSaved = false
let gameOver = false

const answerBank = [
  {
    question: "Javascript is an _______ language?",
    option1: 'Objected-Oriented',
    option2: 'Random',
    option3: 'thats not right',
    option4: 'the correct answer',
  },
  {
    question: "asdfasdfasdfasdfasdf",
    option1: 'correct',
    option2: 'asdf',
    option3: 'wqwerqwer',
    option4: 'wqwerqwerqwerg',
  },
  {
    question: "Javascript is an _______ language?",
    option1: 'Objected-Oriented',
    option2: 'Random',
    option3: 'thats not right',
    option4: 'the correct answer',
  },
]

function startTimer() {
  timeRemaining.textContent = secondsLeft
  quizTimer = setInterval(() => {
    secondsLeft--
    timeRemaining.textContent = secondsLeft
    if (secondsLeft <= 0) {
      clearInterval(quizTimer);
      endGame()
    }
  }, 998)
}
function stopTimer() {
  clearInterval(quizTimer);
}
function restartQuiz() {
  endGameContainer.classList.remove('active')
  gameOver = false
  score = 0
  questionIndex = 0
  secondsLeft = 60
  showQuestion()
  startTimer()
}
function endGame() {
  gameOver = true
  questionContainer.classList.remove('active')
  endGameContainer.classList.add('active')
  displayScore.textContent = score
  scoreSaved = false
}
function goToScoreboard() {
  welcomeContainer.classList.remove('active')
  endGameContainer.classList.remove('active')
  scoreboard.classList.add('active')

}
function goToMenu() {
  endGameContainer.classList.remove('active')
  scoreboard.classList.remove('active')
  welcomeContainer.classList.add('active')
}
function showQuestion() {
  // references the answerBank array and selects the index based on questionIndex value
  questionContainer.classList.add('active')
  const currentQuestion = answerBank[questionIndex]
  if (!currentQuestion) {
    stopTimer()
    return endGame()
  }

  const { option1, option2, option3, option4, question } = currentQuestion
  const options = [option1, option2, option3, option4]

  // Shuffle the options array to randomize the order
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  // Assign shuffled options to answer options
  answerOptions.forEach((option, index) => {
    // displays question and the possible options dynamically based on the answerBank object
    option.textContent = options[index];
    displayedQuestion.textContent = question

    option.classList.remove('wrong')
    option.classList.remove('correct')

    // handles click event for line items displayed 
    option.addEventListener('click', (event) => {
      if (event.target.textContent == answerBank[questionIndex].option1) {
        option.classList.remove('wrong')
        option.classList.add('correct')

        event.stopImmediatePropagation()

        setTimeout(() => {
          score++
          questionIndex++
          showQuestion()
        }, 300);
      }
      if (event.target.textContent != answerBank[questionIndex].option1) {
        event.stopImmediatePropagation()

        secondsLeft = secondsLeft - 2
        option.classList.add('wrong')
      }
    });
  });
}
// TODO: create a way to save scoreboard contents to memory
// TODO: create a renderScoreboard function that gets and displays the scoreboard when ever goToScoreboard is invoked.
function saveScore() {
  if (scoreSaved === true) {
    playerInitials.value = ''
    alert('Score already saved')
  } else {
    // event.stopImmediatePropagation()
    const newScoreElement = document.createElement('li')
    scoreList.appendChild(newScoreElement)
    newScoreElement.textContent = `Player: ${playerInitials.value} - Score: ${score}`
    // let savedScoreValue = newScoreElement.textContent
    // console.log(savedScoreValue)
    playerInitials.value = ''
    scoreSaved = true;
    document.querySelector('#scoreSavedAlert').textContent = "Score saved"
    // localStorage.setItem('playerScore', savedScoreValue)
  }
  setTimeout(() => {
    document.querySelector('#scoreSavedAlert').textContent = ""
  }, 2500)
}

startButton.addEventListener('click', () => {
  welcomeContainer.classList.remove('active')
  if (gameOver) {
    restartQuiz()
  }
  // Make the question card visible
  startTimer()
  showQuestion()
})
const goToScoreboardBtn = document.querySelectorAll('.goToScoreboardBtn')
goToScoreboardBtn.forEach(button => {
  button.addEventListener('click', goToScoreboard)
})

// Navigate to menu 
const goToMenuBtn = document.querySelectorAll('.goToMenuBtn')
goToMenuBtn.forEach(button => {
  button.addEventListener('click', goToMenu)
})

saveScoreButton.addEventListener('click', saveScore)

playAgainButton.addEventListener('click', restartQuiz)