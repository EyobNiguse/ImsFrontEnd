import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueWindowModal from 'vue-window-modal';
import VueHtmlToPaper from "vue-html-to-paper";
import VueSimpleAlert from "vue-simple-alert";

Vue.config.productionTip = false
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    './assets/printCss/style.css'
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: false, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
}
Vue.use(VueWindowModal);
Vue.use(VueHtmlToPaper,options);
Vue.use(VueSimpleAlert);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
