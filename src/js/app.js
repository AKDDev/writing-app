import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

Vue.use(BootstrapVue);
Vue.use(VueRouter);

import Menu from './components/Menu.vue';

import router from './routes';
import store from './store';


Vue.component('wa-menu', Menu);

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const app = new Vue({
  el: '#app',
  router,
  store,
})