<template>
  
  <header>
    <nav class="navbar navbar-expand-sm bg-body-tertiary">
      <RouterLink :to="{ name: 'home' }">Home</RouterLink> 
      <RouterLink :to="{ name: 'exchangeRate' }">환율 계산기</RouterLink> 
      <RouterLink :to="{ name: 'bankMap' }">은행 찾기</RouterLink>
      <div :class="{ checkLogin : store.isLogin }">
        <RouterLink :to="{ name: 'SignUpView' }" >회원 가입</RouterLink>
        <RouterLink :to="{ name: 'LoginView' }">로그인</RouterLink>
      </div>
      <div :class="{ checkLogin : !store.isLogin }">
        <RouterLink :to="{ name: 'ProfileView' }" >프로필</RouterLink>
        <Button class="btn" @click="store.logOut">로그아웃</Button>
        <RouterLink :to="{ name: 'show'}">금융상품정보</RouterLink>
      </div>
    </nav>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user'
const store = useUserStore()

</script>

<style scoped>
.checkLogin {
  display: none;
}
.navbar  a {
  text-decoration: none;
  margin: 5px;
  color: black;
}
</style>

<style>
body, html {
  width: 100%;
  height: 100%;
}

</style>
