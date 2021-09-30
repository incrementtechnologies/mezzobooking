
export default{
  routes: [{
    path: '/dashboard',
    name: 'dashboard',
    component: resolve => require(['modules/dashboard/index.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/signup',
    name: 'signup',
    component: resolve => require(['modules/account/register.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/signup/:email/:code',
    name: 'signup',
    component: resolve => require(['components/increment/basic/Signup.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/signup_partner',
    name: 'signupPartner',
    component: resolve => require(['components/increment/basic/SignupPartner.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/verification/:email',
    name: 'verification',
    component: resolve => require(['components/increment/basic/Verification.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/login_verification/:username/:code',
    name: 'loginVerification',
    component: resolve => require(['components/increment/basic/LoginByVerification.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/login',
    name: 'loginAccount',
    component: resolve => require(['modules/account/login.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/request_reset_password',
    name: 'requestResetPassword',
    component: resolve => require(['modules/account/reset_password.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/reset_password/:username/:code',
    name: 'resetPassword',
    component: resolve => require(['components/increment/basic/ResetPassword.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/profile/:parameter?',
    name: 'profile',
    component: resolve => require(['components/increment/settings/UpdateBasic.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/accounts',
    name: 'accounts',
    component: resolve => require(['modules/account/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/bookings',
    name: 'produbookingscts',
    component: resolve => require(['modules/booking/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/rooms',
    name: 'rooms',
    component: resolve => require(['modules/room/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/coupons',
    name: 'coupons',
    component: resolve => require(['modules/coupon/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/customers',
    name: 'customers',
    component: resolve => require(['modules/customer/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/booking-details',
    name: 'booking-details',
    component: resolve => require(['modules/booking/Details.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/add-coupons/:code?',
    name: 'add-coupons',
    component: resolve => require(['modules/coupon/AddCoupon.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/add-rooms/:code?/:name?',
    name: 'add-rooms',
    component: resolve => require(['modules/room/AddRoom.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/settings',
    name: 'settings',
    component: resolve => require(['modules/settings/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/profile/:parameter?',
    name: 'profile',
    component: resolve => require(['components/increment/settings/UpdateBasic.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/general-limit',
    name: 'general_limit',
    component: resolve => require(['modules/settings/settingPages/GeneralLimit.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/general-sales',
    name: 'general_sales',
    component: resolve => require(['modules/settings/settingPages/GeneralSale.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/room-types',
    name: 'room_types',
    component: resolve => require(['modules/settings/settingPages/RoomType.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/add-room-types/:id?',
    name: 'add_room_types',
    component: resolve => require(['modules/settings/settingPages/AddRoomType.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/features',
    name: 'features',
    component: resolve => require(['modules/settings/settingPages/Features.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/add-ons',
    name: 'add_ons',
    component: resolve => require(['modules/settings/settingPages/AddOn.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/add-limits/:id?',
    name: 'add_limits',
    component: resolve => require(['modules/settings/settingPages/AddGeneralLimit.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/set-availability/:id?',
    name: 'set_availability',
    component: resolve => require(['modules/room/SetAvailability.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/own-bookings/:id?',
    name: 'own_bookings',
    component: resolve => require(['modules/booking/ownSummary/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }
  ]
}
