import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '../store/index'

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
      hideFromAuth: true,
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      hideFromAuth: false,
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true,
      hideFromAuth: false,
    }
  },
  {
    path: '/new-message',
    name: 'New Message',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NewMessage.vue'),
    meta: {
      requiresAuth: true,
      hideFromAuth: false,
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next({ name: 'Login' })
    } else {
      next() // go to wherever I'm going
    }
    // hide login screen from logged in users
  } else if (to.matched.some(record => record.meta.hideFromAuth)) {
    if (store.getters.isLoggedIn) {
      next({ name: 'Home' })
    } else {
      next() // go to wherever I'm going
    }
  } else {

    next() // does not require auth, make sure to always call next()!
  }
})

export default router
