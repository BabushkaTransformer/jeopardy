export default {

  //actions::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  actions: {
    setGamer(ctx, name) {
      ctx.commit('setGamer', name)
    },
  },

  //mutations::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  mutations: {
    setGamer(state, name) {
      state.gamer = name;
    },
  },

  //state::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  state: {
    gamer: '',
  },

  //getters::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  getters: {
    gamer(state) {
      return state.gamer
    },
  }
}