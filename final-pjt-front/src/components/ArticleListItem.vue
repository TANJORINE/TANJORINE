<template>
  <div>
    <p>{{ article.id }}번 게시글</p>
    <p>작성자 : {{ article.user }}</p>
    <p>제목 : {{ article.title }}</p>
    <p>내용 : {{ article.content }}</p>
    <RouterLink :to="{name: 'DetailView', params:{id: article.id} }">
      [Detail]
    </RouterLink>
    <hr>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  article: Object,
})
</script>
