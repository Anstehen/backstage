import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局公共样式
import "./assets/css/comain.scss"
import "./assets/css/common.css"
import "./assets/css/layout.css"
import "./plugins/element.js"
import axios from 'axios'

Vue.config.productionTip = false

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
Vue.use(Element,axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
