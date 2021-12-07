export default {

  //actions::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  actions: {
    getQuestion(ctx, data) {
      ctx.commit('addQuestion', data)
      ctx.commit('openModal')
    },
    closeModalPls(ctx) {
      ctx.commit('closeModal')
    }
  },

  //mutations::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  mutations: {
    addQuestion(state, question) {
      state.data = question
    },
    openModal(state) {
      state.isActive = true;
    },
    closeModal(state) {
      state.isActive = false;
    },
  },

  //state::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  state: {
    isActive: false,
    data: {}
  },

  //getters::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  getters: {
    question(state) {
      return state.data
    },
    active(state) {
      return state.isActive
    }
  }
}