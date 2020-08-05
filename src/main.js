import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'


Vue.config.productionTip = false

import VueSweetalert2 from 'vue-sweetalert2';
import toastr from 'vue-toastr';

import animatecss from 'animate.css';
Vue.use(VueSweetalert2);
Vue.use(toastr);
Vue.use(animatecss);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
