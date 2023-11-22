<template>
  <div>
    <h3>게시글 목록</h3>
    <select v-model="selectCate">
      <option selected>전체</option>
      <option v-for="category in store.categories" :value="category">
        <p>{{ category.name }}</p>
      </option>
    </select>

    <div>
      <ArticleListItem 
        v-for="article in store.articles"
        :key="article.id"
        :article="article"
        :cate="selectCate"
      />
    </div>
  </div>
</template>

<script setup>
import { useCommunityStore } from '@/stores/community';
import ArticleListItem from '@/components/ArticleListItem.vue'
import { ref, onMounted } from 'vue';

const store = useCommunityStore()

const selectCate = ref("전체")

onMounted(() => {
  store.getCategories()
})
</script>
