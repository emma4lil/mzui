/* eslint-disable no-unused-vars */

const API_URL = process.env.baseUrl

export const state = () => ({
  products: [],
})

export const mutations = {
  // Adds products to the store
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  remove(state, { todo }) {},
  localFilter(state, filter) {},
}

export const actions = {
  // get all products
  async fetchAllProducts({ commit }) {
    const products = await this.$axios.$get('/products')
    commit('SET_PRODUCTS', products)
  },
  // get products by filter
  async fetchFilteredProducts({ commit }, filter) {
    const products = await this.$axios.$get('/products' + filter)
    commit('SET_PRODUCTS', products)
  },
  async fetchSlugifiedProducts({ commit }, filter) {
    const products = await this.$axios.$get('/products?slug=' + filter)
    commit('SET_PRODUCTS', products)
  },
}

const shape = {
  name: 'Tesla Model 3',
  sku: 'some-uid',
  priceInfo: {
    new: 20,
    old: 40,
  },
  variant: {
    size: ['xs', 's', 'md'],
    color: ['red', 'green', 'blue'],
  },
  images: [
    {
      url: 'some links',
    },
  ],
  mode: {
    pib: true,
    auction: false,
  },
  storeData: {
    providerID: 'providerId',
    qty: 20,
  },
  oem: {
    brand: 'tesla',
    year: '2020',
  },
  slugfield: {
    shelve: ['latest'],
    categories: ['all', 'cars'],
  },
  pibInfo: {},
  auctionInfo: {},
}
