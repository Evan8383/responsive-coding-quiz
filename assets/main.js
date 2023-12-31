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
const clearScoreboardBtn = document.querySelector('#clearScoreboardBtn')
const goToScoreboardBtn = document.querySelectorAll('.goToScoreboardBtn')
const goToMenuBtn = document.querySelectorAll('.goToMenuBtn')
const quitButton = document.querySelector('#quitButton')

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
    question: "Which of the following is NOT a JavaScript primitive data type?",
    option1: 'Object',
    option2: 'Boolean',
    option3: 'Number',
    option4: 'String',
  },
  {
    question: "Which of the following methods is used to access HTML elements using Javascript?",
    option1: 'getElementbyId()',
    option2: 'elementGetter()',
    option3: 'myElement()',
    option4: 'elementQuery()',
  },
  {
    question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
    option1: 'Ignores the statement',
    option2: 'Throws an error',
    option3: 'Gives a warning',
    option4: 'None of the above',
  },
  {
    question: "What is Anthony's favorite color?",
    option1: 'Lemon Chiffon',
    option2: 'Not Lemon Chiffon',
    option3: 'Gin',
    option4: 'Heliotrope'
  },
]

function startTimer() {
  timeRemaining.textContent = secondsLeft
  clearInterval(quizTimer)
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
}
function endGame() {
  stopTimer()
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
  renderScore()
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
    return endGame()
  }
  startTimer()
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
        score
        secondsLeft = secondsLeft - 10
        option.classList.add('wrong')
      }
    });
  });
}
function renderScore() {
  const playerScore = localStorage.getItem('playerScore')
  console.log(playerScore)
  scoreList.innerHTML = playerScore
}
function saveScore() {
  if (scoreSaved === true) {
    playerInitials.value = ''
    alert('Score already saved')
  } else {
    // event.stopImmediatePropagation()
    const newScoreElement = document.createElement('li')
    scoreList.appendChild(newScoreElement)
    newScoreElement.textContent = `Player: ${playerInitials.value} - Score: ${score}`
    playerInitials.value = ''

    document.querySelector('#scoreSavedAlert').textContent = "Score saved (▀̿Ĺ̯▀̿ ̿)"

    localStorage.setItem('playerScore', scoreList.innerHTML)

    scoreSaved = true;
  }
  setTimeout(() => {
    document.querySelector('#scoreSavedAlert').textContent = ""
  }, 2500)

}
function clearScoreboard() {
  scoreList.innerHTML = ''
  localStorage.clear('playerScore')
}
startButton.addEventListener('click', () => {
  welcomeContainer.classList.remove('active')
  if (gameOver) {
    restartQuiz()
  }
  showQuestion()
})
clearScoreboardBtn.addEventListener('click', () => {
  return confirm('Are you sure you want to clear the scoreboard?') ? clearScoreboard() : console.log('did not clear score')
})
goToScoreboardBtn.forEach(button => {
  button.addEventListener('click', goToScoreboard)
})
goToMenuBtn.forEach(button => {
  button.addEventListener('click', goToMenu)
})
saveScoreButton.addEventListener('click', ()=>{
  if (playerInitials.value == '' && scoreSaved == false){
    alert('Field cannot be empty')
  } else {
    saveScore()
  } 
})

playAgainButton.addEventListener('click', restartQuiz)
quitButton.addEventListener('click', endGame)