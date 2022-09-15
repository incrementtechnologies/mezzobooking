import config from 'src/config.js'
let APP_EMAIL = 'support@siml.ph'
export default {
  sidebarMenu: [
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Dashboard', icon: 'fas fa-home', path: 'dashboard', flag: false, subMenu: null},
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Bookings', icon: 'fas fa-book-open', path: 'bookings', flag: false, subMenu: null},
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Room Type', icon: 'fas fa-building', path: 'room-types', flag: false, subMenu: null},
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Calendar', icon: 'fas fa-calendar', path: 'calendar', flag: false, subMenu: null},
    // {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Rooms', icon: 'fas fa-building', path: 'rooms', flag: false, subMenu: null},
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Coupons', icon: 'fas fa-gift', path: 'coupons', flag: false, subMenu: null},
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Customers', icon: 'fas fa-address-book', path: 'customers', flag: false, subMenu: null},
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Accounts', icon: 'fas fa-users', path: 'accounts', flag: false, subMenu: null},
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Settings', icon: 'fas fa-cog', path: 'settings', flag: false, subMenu: null},
    {accountType: 'ADMIN', showOnAdmin: true, accountStatus: 'ADMIN', description: 'Logout', icon: 'fas fa-sign-out-alt', path: 'logout', flag: false, subMenu: null}

  ],
  menuOff: [
    {id: 1, users: 'ALL', parent_id: 0, description: 'Dashboard', icon: 'fa fa-tachometer', path: 'dashboard', flag: false, subMenu: null}
  ],
  APP_NAME: 'Mezzo Booking',
  APP_NAME_HTML: 'Mezzo Booking',
  APP_EMAIL: APP_EMAIL,
  APP_SITE: 'https://wearesiml.com',
  COMPANY: 'Mezzo',
  COMPANY_URL: 'http://wearesiml.ltd',
  COPYRIGHT: 'Mezzo ' + new Date().getFullYear(),
  USER_TYPE: [{
    title: 'USER'
  }],
  profileMenu: [
    {
      title: 'My Profile',
      icon: 'fa fa-cog',
      route: '/profile'
    }],
  USER_TYPE_SETTING: false,
  plan: false,
  broadcastingFlag: true,
  header: ['status', 'notification'], // 'messenger', '',
  settingsMenu: [
    {title: 'Profile', type: 'profile', allowed: ['cellular_number', 'address']},
    {title: 'Account', type: 'account', allowed: []},
    {title: 'Business Setting', type: 'merchant', allowed: ['prefix', 'website', 'address', 'schedule', 'information']}
  ],
  settingsTabMenu: [
    // {
    //   title: 'Account Settings',
    //   description: 'Receives email address every time there’s a login of the account.',
    //   route: '/profile'
    // },
    // {
    //   title: 'General Rooms Limits Settings',
    //   description: 'Add room limits per category',
    //   route: '/general-limit'
    // },
    {
      title: 'General Sale Settings',
      description: 'Shows general sale per coupon',
      route: '/general-sales'
    },
    // {
    //   title: 'Room Types',
    //   description: 'Add or edit room types',
    //   route: '/room-types'
    // },
    {
      title: 'Room Type Features',
      description: 'Add or edit room features',
      route: 'features'
    },
    // {
    //   title: 'Add-on Settings',
    //   description: 'Add or edit checkout and room add-ons',
    //   route: 'add-ons'
    // },
    {
      title: 'Rates',
      description: 'Add or edit your rates in room-types',
      route: 'rates'
    }
  ]
}
