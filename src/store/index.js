import {createStore} from 'vuex'
import categories from "./modules/categories";
import modal from "./modules/modal";
import gamer from "./modules/gamer";
import statistic from "./modules/game";

const store = createStore({
  modules: {
    categories,
    modal,
    gamer,
    statistic
  },
  mutations: {
    initialiseStore(state) {
      if (window.localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        )
      }
    }
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state))
})

export default store