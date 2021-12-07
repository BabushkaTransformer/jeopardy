import {getDataNow} from "../../helper";

export default {

  //actions::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  actions: {
    clearHistory(ctx) {
      ctx.commit('clearHistory')
    },
    updateScore(ctx, value) {
      ctx.commit('updateScore', value)
    },
    updateRightAnswer(ctx) {
      ctx.commit('updateRightAnswer')
    },
    updateWrongAnswer(ctx) {
      ctx.commit('updateWrongAnswer')
    },
    createNewGame(ctx) {
      ctx.commit('createNewGame')
    },
    completeTheGame(ctx) {
      ctx.commit('completeTheGame')
    }
  },

  //mutations::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  mutations: {
    clearHistory(state) {
      state.history = [];
    },
    updateScore(state, value) {
      state.currentGame.score += value;
    },
    updateRightAnswer(state) {
      state.currentGame.rightAnswer++;
    },
    updateWrongAnswer(state) {
      state.currentGame.wrongAnswer++;
    },
    createNewGame(state) {
      state.currentGame = {
        score: 0,
        rightAnswer: 0,
        wrongAnswer: 0,
        questionCount: 25,
        startDate: null,
        endDate: null
      }
      state.currentGame.startDate = getDataNow();
      state.gameStarted = true;
    },
    completeTheGame(state) {
      state.currentGame.endDate = getDataNow();
      state.history.push(state.currentGame);
      state.gameStarted = false;
      state.currentGame = {
        score: 0,
        rightAnswer: 0,
        wrongAnswer: 0,
        questionCount: 25,
        startDate: null,
        endDate: null
      }
    }
  },

  //state::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  state: {
    gameStarted: false,
    history: [],
    currentGame: {
      score: 0,
      rightAnswer: 0,
      wrongAnswer: 0,
      questionCount: 25,
      startDate: null,
      endDate: null
    }
  },

  //getters::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  getters: {
    score(state) {
      return state.currentGame.score
    },
    history(state) {
      return state.history
    },
    currentGame(state) {
      return state.currentGame
    },
    gameStarted(state) {
      return state.gameStarted
    }
  }
}