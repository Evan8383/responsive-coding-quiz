const startButton = document.querySelector('#startButton');
const timeRemaining = document.querySelector('#timeRemaining')
const answerOptions = document.querySelectorAll('.option')
let secondsLeft = 60
let questionIndex = 0
// timer seconds and textContent

const answerBank = [
  {
    option1: 'correct',
    option2: 'wrong',
    option3: 'wrong',
    option4: 'wrong',
  },
  {
    option1: 'correct',
    option2: 'asdf',
    option3: 'wrong',
    option4: 'wrong',
  }
]

function startTimer() {
  timeRemaining.textContent = secondsLeft
  const quizTimer = setInterval(() => {
    timeRemaining.textContent = secondsLeft
    secondsLeft--
    if (!secondsLeft) {
      clearInterval(quizTimer);
      endGame()
    }
  }, 1000)
}

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

function showQuestion() {
  const currentQuestion = answerBank[questionIndex]
  if (currentQuestion) {
    const { option1, option2, option3, option4 } = currentQuestion
    const options = [option1, option2, option3, option4]

    // Shuffle the options array to randomize the order
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    // Assign shuffled options to answer options
    answerOptions.forEach((option, index) => {
      option.textContent = options[index];

      option.addEventListener('click', (event) => {
        if (event.target.textContent == option1) {
          // let selection = event.target
          // selection.classList.add('correct')
          console.log('correct')
        } else {
          console.log('wrong')
        }
        setTimeout(() => {
          questionIndex++
          showQuestion()
        },1000);
      });
    });
  } else {
    endGame()
  }
}

function endGame() {
  console.log('Game Over');
}