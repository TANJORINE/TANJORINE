import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// import Vue from 'vue'
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
// import vuetify from './plugins/vuetify'

// table
import VueGoodTablePlugin from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'



const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(VueGoodTablePlugin);
app.use(pinia);
app.use(router);
// app.use(Vuetify);
// Vue.use(Vuetify)
app.mount('#app');
// new Vue({
//     vuetify,
// }).$mount('#app')