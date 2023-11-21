import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'

import ExchangeRateView from '@/views/exchange_rate/ExchangeRateView.vue'
import BankMapView from '@/views/maps/BankMapView.vue'

// 계정 정보관련 View
import SignUpView from '@/views/accounts/SignUpView.vue';
import LoginView from '@/views/accounts/LoginView.vue';
import ProfileView from '@/views/accounts/ProfileView.vue';
import ProfileUpdateView from '@/views/accounts/ProfileUpdateView.vue';

// 금융 상품관련
import ShowView from '@/views/products/ShowView.vue';

// 게시판
import ArticleView from '@/views/community/ArticleView.vue'
import DetailView from '@/views/community/DetailView.vue'
import CreateView from '@/views/community/CreateView.vue'
import UpdateArticleView from '@/views/community/UpdateArticleView.vue'
import CreateCategoryView from '@/views/community/CreateCategoryView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/exchange_rate',
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
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: ProfileView
    },
    {
      path: '/profileUpdate',
      name: 'ProfileUpdate',
      component: ProfileUpdateView,
    },
    {
      path: '/show',
      name: 'show',
      component: ShowView
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticleView
    },
    {
      path: '/articles/:id',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView
    },
    {
      path: '/update/:id',
      name: 'update',
      component: UpdateArticleView
    },
    {
      path: '/articleCate',
      name: 'createCategory',
      component: CreateCategoryView
    },
  ]
})

export default router
