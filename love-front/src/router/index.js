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
    path: '/invite',
    name: 'invite',
    component: function () {
      return import('../views/Invite.vue')
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
  },
  {
    path: '/calender',
    name: 'calender',
    component: function () {
      return import('../views/Calender.vue')
    }
  },
  {
    path: '/board',
    name: 'board',
    component: function () {
      return import('../components/Board.vue')
    }
  },
  {
    path: '/board/register',
    name: 'register',
    component: function () {
      return import('../components/Register.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
