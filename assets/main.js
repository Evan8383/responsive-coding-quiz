const startButton = document.querySelector('#startButton');
const timeRemaining = document.querySelector('#timeRemaining')
const answerOptions = document.querySelectorAll('.option')
const displayedQuestion = document.querySelector('#question')
const welcomeContainer = document.querySelector('#welcomeContainer')
const questionContainer = document.querySelector('#questionContainer')
const endGameContainer = document.querySelector('#endGameContainer')
const playAgainButton = document.querySelector('#playAgainButton')

let secondsLeft = 60
let questionIndex = 0
let score = 0
// timer seconds and textContent

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

startButton.addEventListener('click', () => {
  welcomeContainer.classList.remove('active')
  // Make the question card visible
  startTimer()
  showQuestion()
})

let quizTimer
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

// Displays current question on the screen. Handles correct and incorrect answers

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
          console.log(score)
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

function restartQuiz() {
  endGameContainer.classList.remove('active')
  score = 0
  questionIndex = 0
  secondsLeft = 60
  showQuestion()
  startTimer()
  
}

const displayScore = document.querySelector('#displayScore')
const saveScoreButton = document.querySelector('#saveScoreButton')
const playerInitials = document.querySelector('#playerInitials')
const scoreboard = document.querySelector('#scoreboard')
const scoreList = document.querySelector('#scoreList')
let scoreSaved = false

function endGame() {
  questionContainer.classList.remove('active')
  endGameContainer.classList.add('active')
  
  displayScore.textContent = score
  
  scoreSaved = false

  saveScoreButton.addEventListener('click', (event) => {
    if (scoreSaved === true) {
      alert('Score already saved')
    } else {
      event.stopImmediatePropagation()
      console.log(playerInitials.value)
      const newScore = document.createElement('li')
      scoreList.appendChild(newScore)
      newScore.textContent = `Player: ${playerInitials.value} - Score: ${score}`
      playerInitials.value = ''
      scoreSaved = true;
    }
  })

  playAgainButton.addEventListener('click', restartQuiz)
}
