import axios from 'axios'
import Cookie from 'js-cookie'
/**
 * Create Axios
 */
export const http = axios.create()

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
http.defaults.headers.common = {
  'Authorization': 'Bearer ' + Cookie.get("token")
};

/**
 * Handle all error messages.
 */
http.interceptors.response.use(
  response => response,
  error => {
    var message = error
    if(error.response)
      message = error.response;
    if(message.status) {
      if (message.status === 401) {
        // Cookie.remove('token')
        window.location = '/login';
      }

    }
    return Promise.reject(error);
 }
);
export const $http = http
export default function install(Vue) {
  Object.defineProperty(Vue.prototype, '$http', {
    get() {
      return http
    },
  })
}
