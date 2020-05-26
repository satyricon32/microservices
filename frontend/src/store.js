import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  user: {},
  dark: (JSON.parse(localStorage.getItem('settings'))) ? JSON.parse(localStorage.getItem('settings')).dark : false
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  toggleDark(state) {
    let settings = JSON.parse(localStorage.getItem('settings'))
    if(!settings)
      settings = {}
    settings.dark = !state.dark
    state.dark = !state.dark
    localStorage.setItem('settings', JSON.stringify(settings))
  },
  setUser(state, payload) {
    sessionStorage.setItem("user", JSON.stringify(payload));
    state.user = payload
  }
}

export default new Vuex.Store({
  state,
  mutations
})