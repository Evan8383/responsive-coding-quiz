const startButton = document.querySelector('#startButton');
const timeRemaining = document.querySelector('#timeRemaining')
const answerOptions = document.querySelectorAll('.option')
const displayedQuestion = document.querySelector('#question')
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
  const welcomeContainer = document.querySelector('#welcomeContainer')
  welcomeContainer.classList.remove('active')
  // Make the question card visible
  const questionContainer = document.querySelector('#questionContainer')
  questionContainer.classList.add('active')
  // run function line 22
  startTimer()
  showQuestion()
})

// Countdown timer for the game. Runs endGame() function when time gets to 0
function startTimer() {
  timeRemaining.textContent = secondsLeft
  const quizTimer = setInterval(() => {
    timeRemaining.textContent = secondsLeft
    secondsLeft--
    if (secondsLeft == 0) {
      clearInterval(quizTimer);
      endGame()
    }
  }, 1000)
}

// Displays current question on the screen. Handles correct and incorrect answers

function showQuestion() {
  // references the answerBank array and selects the index based on questionIndex value
  const currentQuestion = answerBank[questionIndex]
  if (!currentQuestion) return endGame()

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
      if (event.target.textContent === option1) {
        option.classList.remove('wrong')
        option.classList.add('correct')

        event.stopImmediatePropagation()
        
        setTimeout(() => {
          score++
          questionIndex++
          console.log(score)
          showQuestion()
        }, 300);
      } else {
        secondsLeft -= 2
        option.classList.add('wrong')
      }
    });
  });
}

function endGame() {
  console.log(score)
  console.log('Game Over');
}