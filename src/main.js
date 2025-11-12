import Vue from 'vue'
import App from './App.vue'

import "@/assets/styles/main.scss"
import './plugins/element.js'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
