#!/usr/bin/env node

import { difficulties, DIFFICULTY_LEVELS, welcomeMessage } from "./helper.js";
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

  async getPlayerGuess(attempt, chances){
    return new Promise((resolve) => {
      this.readline.question(`Enter your guess (${attempt}/${chances}): `, (input) => {
        const guess = parseInt(input);
        if (isNaN(guess) || guess < MIN_NUMBER || guess > MAX_NUMBER) {
          console.log(`❌ Please enter a valid number between ${MIN_NUMBER} and ${MAX_NUMBER}.`);
          this.getPlayerGuess(attempt, totalChances).then(resolve);
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

  formatTime(seconds) {
    if (seconds < 60) {
      return `${seconds.toFixed(1)}s`;
    } else {
      const mins = Math.floor(seconds / 60);
      const secs = (seconds % 60).toFixed(1);
      return `${mins}m ${secs}s`;
    }
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
        console.log('\n🎉 Congratulations! You guessed the correct number!');
        console.log(`📊 Number of attempts: ${attempts}`);
        console.log(`⏱️  Time taken: ${this.formatTime(timeTaken)}`);
      }
    }
  }

  async startgame(){
    try {
      console.clear();
      welcomeMessage();

      let play = true;
      while(play){
      //  const won = await 
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const newGame = new NumberGuessingGame();
newGame.startgame()
