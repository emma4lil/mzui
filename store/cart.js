export const state = () => ({
  orders: [],
})

export const mutations = {
  ADD_ITEM(state, payload) {
    const orders = state.orders
    const template = {}
    //   checks if item already in array
    const item = orders.find((item) => item.sku === payload.sku)
    if (!item) {
      template.sku = payload.sku
      template.qty = payload.qty || 1
      template.price = payload.price?.new || 1000
      template.name = payload.name
      state.orders.push(template)
    } else {
      item.qty++
    }
  },
  REDUCE_ITEM(state, payload) {
    const orders = state.orders
    //   checks if item already in array
    const item = orders.find((item) => item.sku === payload.sku)
    if (!(item.qty <= 1)) {
      item.qty--
    }
  },
  DELETE_ITEM(state, payload) {
    const orders = state.orders
    //   checks if item already in array
    const item = orders.findIndex((item) => item.sku === payload)
    //   to be removed
    orders.splice(item, 1)
  },
  APPLY_COUPON(state, coupon) {
    const data = mockCode.find((code) => code.id === coupon)
    if (data) {
      state.bonus = data.price
      return data.desc
    } else {
      state.bonus = 0
      return 'regular'
    }
  },
}

export const getters = {
  getTotalPrice(state) {
    const orders = state.orders
    return Math.ceil(
      orders.reduce((total, item) => total + item.price * item.qty, 0)
    )
  },
  getBonusPrice(state) {
    const orders = state.orders
    return Math.ceil(
      orders.reduce((total, item) => total + item.price * item.qty, 0) +
        state.bonus
    )
  },
}

export const actions = {}

const mockCode = [
  {
    id: '123456',
    price: -100,
    status: true,
    desc: 'A 100 offset code, Enjoy',
  },
  {
    id: '654321',
    price: -50,
    status: true,
    desc: 'A 50 offset code, Enjoy',
  },
]
