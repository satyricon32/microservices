import {config as c} from '../config'

const apiUrls = {
  login: c.authApiBaseUrl + '/oauth/token',
  uInfo: c.authApiBaseUrl + '/uInfo',
  users: c.authApiBaseUrl + '/users/',
  patients: c.registryApiBaseUrl + '/patients/',
  appointments: c.registryApiBaseUrl + '/appointments/',
  bills: c.accountingApiBaseUrl + '/bills/',
  registryTest: c.registryApiBaseUrl + '/test',
  registryTestCreate: c.registryApiBaseUrl + '/testCreate',
  registryTestToken: c.registryApiBaseUrl + '/testToken',
  accountingTest: c.accountingApiBaseUrl + '/bills',
  accountingTestCreate: c.accountingApiBaseUrl + '/bills',
  
}
export const urls = apiUrls
export default function install(Vue) {
  Object.defineProperty(Vue.prototype, '$api', {
    get() {
      return apiUrls
    },
  })
}
