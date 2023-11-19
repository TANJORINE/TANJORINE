<template>
  <div>
    <h1>게시글 조회</h1>
    <RouterLink :to="{ name: 'CreateView' }">[CREATE]</RouterLink>
    <ArticleList/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCommunityStore } from '@/stores/community';
import { RouterLink } from 'vue-router';
import ArticleList from '@/components/ArticleList.vue';

const store = useCommunityStore()

onMounted(() => {
  store.getArticles()
})
</script>

<style>

</style>
