import Vue from 'vue';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faSpinner, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, faSpinner, faThumbsUp, faThumbsDown)

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon)
/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app');