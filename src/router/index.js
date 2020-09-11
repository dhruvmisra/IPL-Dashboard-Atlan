import Vue from 'vue'
import VueRouter from 'vue-router'
import Trivia from '../views/Trivia.vue'
import Matches from '../views/Matches.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Trivia',
    component: Trivia
  },
  {
    path: '/matches',
    name: 'Matches',
    component: Matches
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
