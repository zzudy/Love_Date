import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth/login',
    name: 'login',
    component: function () {
      return import('../views/Login.vue')
    }
  },{
    path: '/main',
    name: 'main',
    component: function () {
      return import('../views/Main.vue')
    }
  },
  {
    path: '/auth/sign-up',
    name: 'SignUp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import('../views/SignUp.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
