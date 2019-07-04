import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Postagens from './components/Postagens.vue'
import Error404 from './components/Error404.vue'

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
      path: '/postagens',
      name: 'Postagens',
      component: Postagens
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/*',
      component: Error404
    },
    
  ]
})
