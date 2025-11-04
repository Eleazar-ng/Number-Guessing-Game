#!/usr/bin/env node

import { welcomeMessage } from "./helper.js";
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

  async startgame(){
    try {
      console.clear();
      welcomeMessage();

      let play = true;
      while(play){
        
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const newGame = new NumberGuessingGame();
newGame.startgame()
