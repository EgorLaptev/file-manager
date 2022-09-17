import { createRouter, createWebHistory } from 'vue-router'
import ExplorerView from "@/views/ExplorerView";

const routes = [
  {
    path: '/',
    name: 'explorer',
    component: ExplorerView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
