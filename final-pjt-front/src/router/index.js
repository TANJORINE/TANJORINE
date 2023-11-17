import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ExchangeRateView from '@/views/ExchangeRateView.vue'
import SignUpView from '@/views/SignUpView.vue'
import BankMapView from '@/views/BankMapView.vue'
import LoginView from '@/views/LoginView.vue'
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
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    }
    
  ]
})

export default router
