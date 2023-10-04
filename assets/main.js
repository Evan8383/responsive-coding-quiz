const startButton = document.querySelector('#startButton');

startButton.addEventListener('click', () => {
  const welcomeContainer = document.querySelector('#welcomeContainer')
  welcomeContainer.classList.remove('active')
  runQuiz()
})

function runQuiz() {
  const questionContainer = document.querySelector('#questionContainer')
  questionContainer.classList.add('active')
}