const defaultNav = [
  {
    _name: 'CSidebarNavTitle',
    _children: ['Прочее'],
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Выход',
    to: '/logout',
    icon: 'cil-signout'
  },
]
const adminNav = [
  {
    _name: 'CSidebarNavTitle',
    _children: ['Показатели'],
    perm: ['admin'],
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Главная',
    to: '/dashboard',
    icon: 'cil-speedometer',
    perm: ['admin', 'register', 'accounter'],
  },
  {
    _name: 'CSidebarNavTitle',
    _children: ['Пользователи'],
    perm: ['users'],
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Список пользователей',
    to: '/users',
    icon: 'cil-people',
    perm: ['users', 'create-users', 'roles']
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Добавить пользователя',
    to: '/users/add',
    icon: 'cil-user-follow',
    perm: ['create-users']
  },
  // {
  //   _name: 'CSidebarNavItem',
  //   name: 'Управление ролями пользователей',
  //   to: '/users/roles',
  //   icon: 'cil-list',
  //   perm: ['roles']
  // },
]
const testNav = [
  {
    _name: 'CSidebarNavTitle',
    _children: ['Тестирование'],
    perm: ['tester'],
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Главная',
    to: '/tests/main',
    icon: 'cil-speedometer',
    perm: ['tester'],
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Запросы',
    to: '/tests/requests',
    icon: 'cil-moon',
    perm: ['tester'],
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Сервис администрирования',
    to: '/tests/dashboard',
    icon: 'cil-people',
    perm: ['tester'],
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Сервис бухгалтерии',
    to: '/tests/accounting',
    icon: 'cib-cc-visa',
    perm: ['tester'],
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Сервис регистратуры',
    to: '/tests/registry',
    icon: 'cil-list',
    perm: ['tester'],
  },
  {
    _name: 'CSidebarNavTitle',
    _children: ['Прочее'],
  },
  {
    _name: 'CSidebarNavItem',
    name: 'Иконки',
    to: '/tests/icons',
    icon: 'cil-star',
    perm: ['tester'],
  },
]
export default {
  tester: [
    {
      _name: 'CSidebarNav',
      _children: testNav
    },
  ],
  admin: [
    {
      _name: 'CSidebarNav',
      _children: adminNav
    }

  ]
}

/*
export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
          color: 'primary',
          text: 'NEW'
        }
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Theme']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Colors',
        to: '/theme/colors',
        icon: 'cil-drop'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Typography',
        to: '/theme/typography',
        icon: 'cil-pencil'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Components']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Base',
        route: '/base',
        icon: 'cil-puzzle',
        items: [
          {
            name: 'Breadcrumbs',
            to: '/base/breadcrumbs'
          },
          {
            name: 'Cards',
            to: '/base/cards'
          },
          {
            name: 'Carousels',
            to: '/base/carousels'
          },
          {
            name: 'Collapses',
            to: '/base/collapses'
          },
          {
            name: 'Forms',
            to: '/base/forms'
          },
          {
            name: 'Jumbotrons',
            to: '/base/jumbotrons'
          },
          {
            name: 'List Groups',
            to: '/base/list-groups'
          },
          {
            name: 'Navs',
            to: '/base/navs'
          },
          {
            name: 'Navbars',
            to: '/base/navbars'
          },
          {
            name: 'Paginations',
            to: '/base/paginations'
          },
          {
            name: 'Popovers',
            to: '/base/popovers'
          },
          {
            name: 'Progress Bars',
            to: '/base/progress-bars'
          },
          {
            name: 'Switches',
            to: '/base/switches'
          },
          {
            name: 'Tables',
            to: '/base/tables'
          },
          {
            name: 'Tabs',
            to: '/base/tabs'
          },
          {
            name: 'Tooltips',
            to: '/base/tooltips'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Buttons',
        route: '/buttons',
        icon: 'cil-cursor',
        items: [
          {
            name: 'Buttons',
            to: '/buttons/standard-buttons'
          },
          {
            name: 'Button Dropdowns',
            to: '/buttons/dropdowns'
          },
          {
            name: 'Button Groups',
            to: '/buttons/button-groups'
          },
          {
            name: 'Brand Buttons',
            to: '/buttons/brand-buttons'
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Charts',
        to: '/charts',
        icon: 'cil-chart-pie'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Icons',
        route: '/icons',
        icon: 'cil-star',
        items: [
          {
            name: 'CoreUI Icons',
            to: '/icons/coreui-icons',
            badge: {
              color: 'info',
              text: 'NEW'
            }
          },
          {
            name: 'Brands',
            to: '/icons/brands'
          },
          {
            name: 'Flags',
            to: '/icons/flags'
          }
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Notifications',
        route: '/notifications',
        icon: 'cil-bell',
        items: [
          {
            name: 'Alerts',
            to: '/notifications/alerts'
          },
          {
            name: 'Badges',
            to: '/notifications/badges'
          },
          {
            name: 'Modals',
            to: '/notifications/modals'
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Widgets',
        to: '/widgets',
        icon: 'cil-calculator',
        badge: {
          color: 'primary',
          text: 'NEW',
          shape: 'pill'
        }
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-2'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Extras']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Pages',
        route: '/pages',
        icon: 'cil-star',
        items: [
          {
            name: 'Login',
            to: '/pages/login'
          },
          {
            name: 'Register',
            to: '/pages/register'
          },
          {
            name: 'Error 404',
            to: '/pages/404'
          },
          {
            name: 'Error 500',
            to: '/pages/500'
          }
        ]
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Download CoreUI',
        href: 'http://coreui.io/vue/',
        icon: { name: 'cil-cloud-download', class: 'text-white' },
        _class: 'bg-success text-white',
        target: '_blank'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Try CoreUI PRO',
        href: 'http://coreui.io/pro/vue/',
        icon: { name: 'cil-layers', class: 'text-white' },
        _class: 'bg-danger text-white',
        target: '_blank'
      }
    ]
  }
]*/