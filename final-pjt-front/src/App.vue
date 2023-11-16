<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink> | 
        <RouterLink :to="{ name: 'exchangerate' }">환율 계산기</RouterLink> | 
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
