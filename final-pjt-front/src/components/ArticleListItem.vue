<template>
  <div>
    <p>{{ article.id }}번 게시글</p>
    <p>작성자 : {{ article.user.username }}</p>
    <p>제목 : {{ article.title }}</p>
    <p>내용 : {{ article.content }}</p>
    <RouterLink :to="{ name: 'detail', params: { id: article.id } }">
      상세
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