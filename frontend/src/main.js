import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import http from './plugins/http'
import config from './plugins/config'
import api from './plugins/api'
import permission from './plugins/permission'
import VueNotifications from 'vue-notifications'
import miniToastr from 'mini-toastr'
 
const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
} 
miniToastr.init({types: toastTypes}) 
function toast ({title, message, type, timeout, cb}) {
  return miniToastr[type](message, title, timeout, cb)
} 
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}
 
Vue.use(VueNotifications, options)

Vue.use(http);
Vue.use(config);
Vue.use(api);
Vue.use(permission);

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
