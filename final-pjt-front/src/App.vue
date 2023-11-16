<<<<<<< HEAD
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
=======
<template>

  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink :to="{ name: 'SignUpview'}">About</RouterLink>
  </nav>
>>>>>>> ff71531451f33ab80d80359ab43507eded7d6430

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
</style>
