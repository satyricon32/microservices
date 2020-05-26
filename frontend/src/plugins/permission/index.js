import axios from 'axios'
var checkPremission = function (user,permission) {

  return user.permissions.indexOf(permission) != -1
}
export default function install(Vue) {
  Object.defineProperty(Vue.prototype, '$can', {
    get() {
      return checkPremission
    },
  })
}
