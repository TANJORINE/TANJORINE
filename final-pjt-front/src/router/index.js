import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ExchangeRateView from '@/views/ExchangeRateView.vue'
import SignUpView from '@/views/SignUpView.vue'
import BankMapView from '@/views/BankMapView.vue'
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
      name: 'exchangeRate',
      component: ExchangeRateView
    },
    {
      path: '/singup',
      name: 'SignUpView',
      component: SignUpView
    },
    {
      path: '/bank',
      name: 'bankMap',
      component: BankMapView
    },
    
  ]
})

export default router
