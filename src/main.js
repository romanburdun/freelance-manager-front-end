import Vue from 'vue'
import App from './App.vue'
import {router} from './Routes'
import {store} from "@/store/store";
import './utils/date-filter'
import './utils/condition-filter'

Vue.config.productionTip = false

new Vue({

  render: h => h(App),
  router,
  store
}).$mount('#app')
