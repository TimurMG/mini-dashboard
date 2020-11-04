import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    { 
      path: '*', 
      name: 'not-found',
      component: () => import('@/pages/NotFound.vue') 
    },

    {
      path: '/',
      name: 'main',
      component: () => import('@/pages/Index.vue')
    },
  ]
})
