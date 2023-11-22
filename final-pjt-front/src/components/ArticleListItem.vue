<template>
    <div v-if="cate === '전체'">
      <p>{{ article.id }}번 게시글</p>
      <RouterLink :to="{ name: 'detail', params: { id: article.id } }">
        <h3>{{ article.title }}</h3>
      </RouterLink>
      <p>{{ article.content.length>20?article.content.slice(0, 20) + '...':article.content }}</p>
      <p>작성일 : {{ article.created_at.slice(0, 10) }} | 작성자 : {{ article.user.username }}</p>
      <hr>
    </div>

    <div v-else-if="cate.name === article.category.name">
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
  cate: Object,
  article: Object,
})
</script>