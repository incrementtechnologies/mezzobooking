
import Vue from 'vue'
import Router from 'vue-router'
import CONFIG from '../config'
import AUTH from 'services/auth/index'
import ModuleRoutes from './module_routes'
import Helpers from './helpers'
import Services from './services'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
global.Tether = require('tether')
global.jQuery = require('jquery')
global.$ = global.jQuery
// require('bootstrap/dist/css/bootstrap.min.css')
// require('bootstrap')
// require('font-awesome/css/font-awesome.css')
require('assets/style/bootstrap.min.css')
require('assets/style/bootstrap-grid.min.css')
require('assets/style/bootstrap-reboot.min.css')
global.Popper = require('assets/js/min/popper.min.js').default
require('assets/js/min/bootstrap.min.js')
require('assets/style/theme.css')
require('assets/style/select2.min.css')
require('assets/js/min/select2.full.min.js')
import 'font-awesome/css/font-awesome.css'
import VCalendar from 'v-calendar'
AUTH.checkAuthentication()
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
Vue.use(Router)
Vue.use(VCalendar, {
  componentPrefix: 'vc'
})
export default new Router({
  routes: ModuleRoutes.routes
})
