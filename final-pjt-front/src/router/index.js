import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ExchangeRateView from '@/views/ExchangeRateView.vue'
import SignUpView from '@/views/SignUpView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/exchangerate',
      name: 'exchangerate',
      component: ExchangeRateView
    },
    {
      path: '/singup',
      name: 'SignUpView',
      component: SignUpView
    }
    
  ]
})

export default router
