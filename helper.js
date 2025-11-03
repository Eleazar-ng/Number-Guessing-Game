
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

function welcomeMessage(){
  console.log('\n🎯 Welcome to the Number Guessing Game!');
  console.log(`I'm thinking of a number between ${MIN_NUMBER} and ${MAX_NUMBER}.`);
  console.log("You have between 3 - 10 chances to guess the correct number.");
  console.log('\nPlease select the difficulty level:');
  console.log('1. Easy (10 chances)');
  console.log('2. Medium (5 chances)');
  console.log('3. Hard (3 chances)');
}

async function selectDifficulty() {
  return new Promise((resolve,reject) => {
    
  })
}

async function playRound(){
  const difficulty = await sele
}

export {
  welcomeMessage
}