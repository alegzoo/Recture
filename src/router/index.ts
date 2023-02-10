// Composables
import Home from '@/views/Home.vue'
import VideoBrowser from '@/views/VideoBrowser.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        component: VideoBrowser
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router