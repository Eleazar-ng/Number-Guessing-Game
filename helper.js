
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

const difficulties = ['easy', 'medium', 'hard'];

const DIFFICULTY_LEVELS = {
    easy: { chances: 10, name: 'Easy' },
    medium: { chances: 5, name: 'Medium' },
    hard: { chances: 3, name: 'Hard' }
};

const validChoices = [
  'y','yes','n','no'
]

function welcomeMessage(){
  console.log('\n🎯 Welcome to the Number Guessing Game!');
  console.log(`I'm thinking of a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`);
  console.log("You have between 3 - 10 chances to guess the correct number.");
  console.log('\nPlease select the difficulty level:');
  console.log('1. Easy (10 chances)');
  console.log('2. Medium (5 chances)');
  console.log('3. Hard (3 chances)');
}

function  formatTime(seconds) {
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  } else {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);
    return `${mins}m ${secs}s`;
  }
}

function provideHint(secretNumber, attempt, chances){
  if (attempt === Math.floor(chances / 2)) {
      console.log('💡 Hint: The number is ' + (secretNumber % 2 === 0 ? 'even' : 'odd'));
  } else if (attempt === chances - 1) {
    const range = Math.floor((MAX_NUMBER - MIN_NUMBER) / 4);
    const lowerBound = Math.max(MIN_NUMBER, secretNumber - range);
    const upperBound = Math.min(MAX_NUMBER, secretNumber + range);
    console.log(`💡 Hint: The number is between ${lowerBound} and ${upperBound}`);
  }
}

export {
  welcomeMessage,
  formatTime,
  provideHint,
  difficulties,
  DIFFICULTY_LEVELS,
  MAX_NUMBER,
  MIN_NUMBER,
  validChoices
}