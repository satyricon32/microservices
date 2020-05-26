import Vue from 'vue'
import Router from 'vue-router'
import {$http} from '../plugins/http'
import axios from 'axios'
import {urls} from '../plugins/api'
import Cookie from 'js-cookie'
import { iconsSet } from '../assets/icons/icons'
// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/charts/Charts')
const Widgets = () => import('@/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')
const Brands = () => import('@/views/icons/Brands')
const Flags = () => import('@/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Page503 = () => import('@/views/pages/Page503')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')


//Tests
const TestIndex = () => import('@/views/test/Index')
const TestRequests = () => import('@/views/test/Requests')
const TestDashboard = () => import('@/views/test/Dashboard')
const TestAccounting = () => import('@/views/test/Accounting')
const TestRegistry = () => import('@/views/test/Registry')
Vue.use(Router)

 let router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.auth)) {
      if (Cookie.get('token') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {

          if(to.matched.some(record => record.meta.permissions)) {
              if(to.meta.permissions.some(r => user.permissions.includes(r))){
                  next()
              }
              else{
                  next({ path: '/login'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(Cookie.get('token') == null){
          next()
      }
      else{
          next({ path: '/dashboard'})
      }
  }else {
      next() 
  }
})

export default router
function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Главная',
      component: TheContainer,
      meta: {auth: true, tab: 'admin'},
      children: [
        {
          path: 'dashboard',
          name: 'Админпанель',
          meta: {tab: 'admin'},
          component: Dashboard
        },

      ]
    },
    {
      path: '/tests',
      name: 'Тестирование',

      redirect: '/tests/main',
      meta: {tab: 'tester'},
      component: TheContainer,
      children: [
        {
          path: 'main',
          component: TestIndex,
          name: 'Главная',
          meta: {tab: 'tester'}
        },
        {
          path: 'requests',
          component: TestRequests,
          name: 'Запросы',
          meta: {tab: 'tester'}
        },
        {
          path: 'dashboard',
          component: TestDashboard,
          name: 'Сервис администрирования',
          meta: {tab: 'tester'}
        },
        {
          path: 'accounting',
          component: TestAccounting,
          name: 'Сервис бухгалтерии',
          meta: {tab: 'tester'}
        },
        {
          path: 'registry',
          component: TestRegistry,
          name: 'Сервис регистратуры',
          meta: {tab: 'tester'}
        },
        {
          path: 'icons',
          component: CoreUIIcons,
          name: 'Иконки',
          meta: {tab: 'tester'}
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {auth: false}
    },
    {
      path: '/503',
      name: '503',
      component: Page503,
      meta: {auth: false}
    },

  ]
}

