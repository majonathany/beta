import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'NotePlayer',
    component: () => import(/* webpackChunkName: "about" */ '../views/NotePlayer.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
