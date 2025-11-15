#!/usr/bin/env node

import { difficulties, DIFFICULTY_LEVELS, welcomeMessage, formatTime, provideHint, MAX_NUMBER, MIN_NUMBER, validChoices } from "./helper.js";
import readline from "readline";

class NumberGuessingGame {
  constructor(){
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.highScores = new Map()
    this.stats = {
      gamesPlayed: 0,
      gamesWon: 0,
      totalAttempts: 0,
      bestTime: null
    };
  }
  
  displayHighScores() {
    console.log('\n HIGH SCORES');
    console.log('==============');
    if (this.highScores.size === 0) {
      console.log('No high scores yet. Play more games!');
    } else {
      for (const [difficulty, score] of this.highScores) {
        console.log(`${DIFFICULTY_LEVELS[difficulty].name}: ${score.attempts} attempts (${score.time}s)`);
      }
    }
  }

  displayStats() {
    console.log('\n GAME STATISTICS');
    console.log('==================');
    console.log(`Games Played: ${this.stats.gamesPlayed}`);
    console.log(`Games Won: ${this.stats.gamesWon}`);
    console.log(`Win Rate: ${((this.stats.gamesWon / this.stats.gamesPlayed) * 100 || 0).toFixed(1)}%`);
    console.log(`Average Attempts: ${(this.stats.totalAttempts / this.stats.gamesWon || 0).toFixed(1)}`);
    if (this.stats.bestTime) {
      console.log(`Best Time: ${this.stats.bestTime}s`);
    }
  }

  async getPlayerGuess(attempt, chances){
    return new Promise((resolve) => {
      this.readline.question(`Enter your guess (${attempt}/${chances}): `, (input) => {
        const guess = parseInt(input);
        if (isNaN(guess) || guess < MIN_NUMBER || guess > MAX_NUMBER) {
          console.log(`!! Please enter a valid number between ${MIN_NUMBER} and ${MAX_NUMBER}.`);
          this.getPlayerGuess(attempt, chances).then(resolve);
        } else {
          resolve(guess);
        }
      });
    })
  }

  async selectDifficulty() {
    return new Promise((resolve,reject) => {
      this.readline.question('Enter your choice:', (choice) => {
        const selected = difficulties[parseInt(choice) - 1];
        if(selected && DIFFICULTY_LEVELS[selected]){
          resolve(selected)
        } else {
          console.error(' Invalid choice. Please select 1, 2, or 3.');
          this.selectDifficulty().then(resolve);
        }
      })
    })
  }

  async askToPlayAgain() {
    return new Promise((resolve) => {
      this.readline.question('\n Would you like to play again? (y/n): ', (answer) => {
          if(validChoices.includes(answer)){
            if(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes'){
              resolve(true);
            }else{
              resolve(false);
            }
          }else {
            console.error(' Invalid choice. Kindly select any the following: y, yes, n, no');
            this.askToPlayAgain().then(resolve);
          }
      });
    });
  }

  async playGame(){
    const difficulty = await this.selectDifficulty();
    const chances = DIFFICULTY_LEVELS[difficulty].chances;
    console.log(`\n🎮 Great! You selected ${DIFFICULTY_LEVELS[difficulty].name} difficulty.`);
    console.log(`You have ${chances} chances to guess the correct number.`);
    console.log('Let\'s start the game!\n');

    const secretNumber = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
    let attempts = 0;
    const previousGuesses = [];
    const startTime = Date.now();
    while (attempts < chances) {
      attempts++;
      const guess = await this.getPlayerGuess(attempts, chances)
      previousGuesses.push(guess);

      if(guess === secretNumber){
        const endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000;
        console.log('\n🎉👏👏 Congratulations! You guessed the correct number! 😃😃');
        console.log(`📊 Number of attempts: ${attempts}`);
        console.log(`⏱️  Time taken: ${formatTime(timeTaken)}`);

        // Update high score
        const currentHighScore = this.highScores.get(difficulty);
        if (!currentHighScore || attempts < currentHighScore.attempts || (attempts === currentHighScore.attempts && timeTaken < currentHighScore.time)) {
          this.highScores.set(difficulty, { attempts, time: timeTaken });
            console.log('!!! New high score !!!');
        }

        // Update stats
        this.stats.gamesPlayed++;
        this.stats.gamesWon++;
        this.stats.totalAttempts += attempts;
        if (!this.stats.bestTime || timeTaken < this.stats.bestTime) {
            this.stats.bestTime = timeTaken;
        }

        return true;
      } else{
        console.log(` Incorrect! The number is ${guess < secretNumber ? 'greater' : 'less'} than ${guess}.`);
        provideHint(secretNumber, attempts, chances);

        const remains = chances - attempts;
        if(remains > 0){
          let emoji
          switch(remains){
            case 1:
              emoji = `😰`;
              break;
            case 2:
              emoji = `😨`;
              break
            case 3:
              emoji = `😥`;
              break;
            case 4:
              emoji = `😬`;
              break;
            case 5:
              emoji = `😧`;
            case 6:
              emoji = `😦`;
              break;
            case 7:
              emoji = `😯`;
              break;
            case 8:
              emoji = `😕`;
              break;
            case 9:
              emoji = `😒`;
              break;
            default:
              emoji = `😃`;
          }
          console.log(`Remaining chances: ${remains} - ${emoji}`);
        } else {
          console.log(`Game Over!💩💩💩 The number was ${secretNumber}.😞😞😞`);
          this.stats.gamesPlayed++;
          return false;
        }
      }
    }
  }

  async startgame(){
    try {
      console.clear();
      welcomeMessage();

      let play = true;

      while(play){
       const won = await this.playGame();
       if(won){
        this.displayHighScores();
       }

       this.displayStats();
       play = await this.askToPlayAgain();

       if(!play){
        console.log("\n👋👋 Byeeee! Enjoy the rest of your day, Cheers🍷")
        process.exit(1)
       }
      }

    } catch (error) {
      console.log(error)
    }
  }
}

const newGame = new NumberGuessingGame();
newGame.startgame()
