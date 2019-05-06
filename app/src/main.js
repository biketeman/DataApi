import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

Vue.mixin({
	data: function () {
		return {
			get api_base_url () {
				return 'http://localhost:4000'
			}
		}
	}
})
