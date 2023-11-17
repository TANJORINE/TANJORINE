<template>
  <header>
      <nav>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink> | 
        <RouterLink :to="{ name: 'exchangeRate' }">환율 계산기</RouterLink> | 
        <RouterLink :to="{ name: 'SignUpView' }">회원 가입</RouterLink> | 
        <RouterLink :to="{ name: 'bankMap' }">은행 찾기</RouterLink> | 
      </nav>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
</style>
