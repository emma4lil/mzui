export const state = () => ({
  categories: [],
  catalogue: [],
})

export const mutations = {
  SET_CATEGORIES(state, payload) {
    state.categories = payload
  },
  SET_CATALOGUE(state, payload) {
    state.catalogue = payload
  },
}

export const actions = {
  async getCatalogue({ commit }) {
    const catalogue = await this.$axios.$get('/catalogues')
    commit('SET_CATALOGUE', catalogue)
  },
  async getCategories({ commit }) {
    const categories = await this.$axios.$get('/categories')
    commit('SET_CATEGORIES', categories)
  },
}
