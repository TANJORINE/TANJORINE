<template>
    <div>
      <h3>카테고리 목록</h3>
      <CategoryListItem 
        v-for="category in store.categories"
        :key="category.id"
        :category="category"
      />
    </div>
  </template>
  
  <script setup>
  import { useCommunityStore } from '@/stores/community';
  import CategoryListItem from './CategoryListItem.vue';
  import { onMounted } from 'vue';
  
  const store = useCommunityStore()

  onMounted(() => {
  store.getCategories()
})
  </script>
  