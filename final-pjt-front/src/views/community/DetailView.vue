<template>
  <div>
    <h1>게시글 상세</h1>
    <div v-if="article">
      <p>제목 : {{ article.title }}</p>
      <p>내용 : {{ article.content }}</p>
      <p>작성자 : {{ article.user }}</p>
      <p>작성일 : {{ article.created_at }}</p>
      <p>수정일 : {{ article.updated_at }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useCommunityStore } from '@/stores/community';
import { useRoute } from 'vue-router';

const store = useCommunityStore()
const route = useRoute()
const article = ref(null)

onMounted(() => {
  axios({
    method: 'GET',
    url: `${store.API_URL}/community/articles/${route.params.id}/`
  })
  .then((res) => {
    // console.log(res.data)
    article.value = res.data
  })
  .catch((err) => {
    console.log(err)
  })
})
</script>

<style>

</style>
