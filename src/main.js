import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false
Vue.use(Vuex)

const storeInicial = store()

new Vue({
  store: storeInicial,
  render: (h) => h(App),
}).$mount('#app')
