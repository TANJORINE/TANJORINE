<template>
  
  <header>
    <nav class="navbar navbar-expand-sm bg-body-tertiary">
      <RouterLink :to="{ name: 'home' }">Home</RouterLink> 
      <RouterLink :to="{ name: 'exchangeRate' }">환율 계산기</RouterLink> 
      <RouterLink :to="{ name: 'bankMap' }">은행 찾기</RouterLink>
      <RouterLink :to="{ name: 'products'}">금융상품정보</RouterLink>
      <RouterLink :to="{ name: 'articles' }">게시판</RouterLink>
      <div :class="{ checkLogin : store.isLogin }">
        <RouterLink :to="{ name: 'signUp' }" >회원 가입</RouterLink>
        <RouterLink :to="{ name: 'login' }">로그인</RouterLink>
      </div>
      <div :class="{ checkLogin : !store.isLogin }">
        <RouterLink :to="{ name: 'profile' }" >프로필</RouterLink>
        <Button class="btn" @click="store.logOut">로그아웃</Button>
      </div>
    </nav>
  </header>
  <div class="viewSpace">
    <RouterView />
  </div>
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
.viewSpace   {
  width: 100%;
  min-height: 100%;
}
</style>

<style>
body, html {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
<style>
.page-title{
  display: flex;
  justify-content: center;
  margin: 10px 0px 0px;
}
</style>