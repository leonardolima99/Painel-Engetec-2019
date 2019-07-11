import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Postagens from './components/Postagens.vue'
import Galeria from './components/Galeria.vue'
import Eventos from './components/Eventos.vue'
import Error404 from './components/Error404.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/postagens',
      name: 'Postagens',
      component: Postagens
    },
    {
      path: '/galeria',
      name: 'Galeria',
      component: Galeria
    },
    {
      path: '/eventos',
      name: 'Eventos',
      component: Eventos
    },
    {
      path: '/*',
      component: Error404
    }
  ]
})
