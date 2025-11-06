
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

const difficulties = ['easy', 'medium', 'hard'];

const DIFFICULTY_LEVELS = {
    easy: { chances: 10, name: 'Easy' },
    medium: { chances: 5, name: 'Medium' },
    hard: { chances: 3, name: 'Hard' }
};

function welcomeMessage(){
  console.log('\n🎯 Welcome to the Number Guessing Game!');
  console.log(`I'm thinking of a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`);
  console.log("You have between 3 - 10 chances to guess the correct number.");
  console.log('\nPlease select the difficulty level:');
  console.log('1. Easy (10 chances)');
  console.log('2. Medium (5 chances)');
  console.log('3. Hard (3 chances)');
}

async function playRound(){
  const difficulty = await sele
}

export {
  welcomeMessage,
  difficulties,
  DIFFICULTY_LEVELS
}