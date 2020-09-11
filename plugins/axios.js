export default function ({ $axios, redirect, error }) {
  let nuxtErr = error;
  $axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      if (error.response && error.response.status === 404) {
        return nuxtErr({ message: 'Not found!', statusCode: 404 })
      }
      if (error.response && error.response.status === 500) {
        return nuxtErr({
          message: 'Server Error!',
          statusCode: 500,
        })
      } else {
        return Promise.reject(error)
      }
    }
  )
}
