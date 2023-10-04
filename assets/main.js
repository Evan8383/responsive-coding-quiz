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
    if (!secondsLeft) {
      clearInterval(quizTimer);
      endGame()
    }
  }, 1000)
}

// Displays current question on the screen. Handles correct and incorrect answers
function showQuestion() {
  // references the answerBank array and selects the index based on questionIndex value
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

      // handles click event for line items displayed 
      option.addEventListener('click', (event) => {
        if (event.target.textContent == option1) {
          // TODO: handle correct selections.
          // ! correct selections should add to the players score
          // ! correct selections should advance the player to the next question

          setTimeout(() => {
            questionIndex++
            showQuestion()
          },1000);
        } else {
          // TODO: handle incorrect selections
          // ! wrong selections should subtract time from the clock and show that the answer was wrong
          // ! wrong answers should not advance the player to the next question
        }
      });
    });
  } else {
    endGame()
  }
}

function endGame() {
  console.log('Game Over');
}