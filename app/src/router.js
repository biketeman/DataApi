import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/analyse/:profilename',
			name: 'analyse',
			component: () => import('./views/Analyse.vue')
		},
		{
			path: '/cards/:cardname',
			name: 'cards',
			component: () => import('./views/Cards.vue'),
			props: {
				CardpercentageInTotal: 0,
				CardpercentageInTotalcardOwner: 0
			}
		}
	]
})
