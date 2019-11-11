import Vue from 'vue'
import App from './App'
import router from './router'

import axios from '@/api/axios' //执行下该文件，main.js中会首先执行

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
