export default (context, inject) => {
  inject('API_URL', process.env.baseUrl)
}
