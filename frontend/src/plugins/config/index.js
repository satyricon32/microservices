const c = {
  authApiBaseUrl: "http://localhost:1337/api",
  registryApiBaseUrl: "http://registry.stom.local/api",
  accountingApiBaseUrl: "http://localhost:1339/api",
  auth: {
    client_id: 'web',
    client_secret: '2567a5ec9705eb7ac2c984033e06189d',
  }
}
export const config = c
export default function install(Vue) {
  Object.defineProperty(Vue.prototype, '$conf', {
    get() {
      return c
    },
  })
}
