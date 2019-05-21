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
			path: '/dashboard',
			name: 'dashboard',
			component: () => import('./views/Dashboard.vue')
		},
		{
			path: '/line',
			name: 'line',
			component: () => import('./views/Dashboard.vue')
		},
		{
			path: '/analyse/:profilename',
			name: 'analyse',
			component: () => import('./views/Analyse.vue')
		},
		{
			path: '/cards/:cardname',
			name: 'cards',
			component: () => import('./views/Analyse.vue')
		}
	]
})
