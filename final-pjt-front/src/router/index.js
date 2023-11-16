import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ExchangeRateView from '@/views/ExchangeRateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
<<<<<<< HEAD
      path: '/exchangerate',
      name: 'exchangerate',
      component: ExchangeRateView
=======
      path: '/signup',
      name: 'SignUpview',

>>>>>>> ff71531451f33ab80d80359ab43507eded7d6430
    }
    
  ]
})

export default router
