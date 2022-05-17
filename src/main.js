// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import config from './config.js'
import Format from './services/numberFormat'
/* eslint-disable no-new */
Vue.prototype.$format = Format
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
