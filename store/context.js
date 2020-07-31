export const state = () => ({
  user: null,
  profile: {},
})

export const mutations = {
  SET_PROFILE(state, info) {
    state.profile = info
  },
}

export const actions = {
  async getUserProfile({ commit }) {
    const identity = this.$auth.user.id
    const data = await this.$axios.$get('users/' + identity)
    commit('SET_PROFILE', data)
  },
}

export const getters = {
  profile: (state) => {
    return state.profile
  },
  payInBitsRecords: (state) => {
    return state.profile.payInBitsRecords.records
  },
  getProfileAvatar: (state) => {
    return state.profile.avatar.formats.small.url
  },
}
