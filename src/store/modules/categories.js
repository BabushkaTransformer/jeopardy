import axios from "axios";

export default {

  //actions::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  actions: {
    getCategories(ctx) {
      ctx.commit('switchLoading');
      const categoriesId = [261, 255, 244, 216, 105];

      const res = categoriesId.map(id => axios.get(`http://jservice.io/api/category?id=${id}`));

      Promise.all(res).then(result => {
        const category = result.map(el => {

          const clueWithCategory = el.data.clues.slice(0, 5).map((e) => {
            return {...e, category: el.data.title}
          })

          return {
            title: el.data.title,
            id: el.data.id,
            clues: clueWithCategory
          }
        })
        ctx.commit('switchLoading');
        ctx.commit('getCategories', category)
      })
    },

    answeredQuestion(ctx, payload) {
      ctx.commit('answeredQuestion', payload)
    }
  },

  //mutations::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  mutations: {
    getCategories(state, category) {
      state.categories = category;
    },
    answeredQuestion(state, {id, category, correctly}) {
      const index = state.categories.findIndex((el) => el.title === category);

      state.categories[index].clues = state.categories[index].clues.map(el => {
        if (el.id === id) {
          return {...el, answerIsCorrect: correctly}
        } else {
          return {...el}
        }
      })
    },
    switchLoading(state) {
      state.loading = !state.loading
    }
  },

  //state::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  state: {
    categories: [],
    loading: false
  },

  //getters::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  getters: {
    allCategories(state) {
      return state.categories
    },
    loading(state) {
      return state.loading
    }
  }
}