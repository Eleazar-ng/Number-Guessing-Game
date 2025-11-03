#!/usr/bin/env node

import { welcomeMessage } from "./helper.js";

class NumberGuessingGame {
  constructor(){

  } 

  async startgame(){
    try {
      console.clear();
      welcomeMessage();
    } catch (error) {
      console.log(error)
    }
  }
}

const newGame = new NumberGuessingGame();
newGame.startgame()
