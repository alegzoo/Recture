// Composables
import Home from '@/views/Home.vue'
import Signin from '@/views/Signin.vue'
import VideoBrowser from '@/views/VideoBrowser.vue'
import Video from '@/views/Video.vue'
import NotFound from '@/views/NotFound.vue'
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
  },
  {
    path: '/videos/:id',
    component: Home,
    children: [
      {
        path: '',
        component: Video
      }
    ]
  },
  {
    path: "/signin",
    component: Signin
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router