<template>
  <div>
    <h1>게시글 생성</h1>
    <form @submit.prevent="createArticle">
      <input type="text" v-model.trim="title">
      <textarea v-model.trim="content"></textarea>
      <input type="submit">
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useCommunityStore } from '@/stores/community';
import { useRouter } from 'vue-router';

const title = ref(null)
const content = ref(null)
const store = useCommunityStore()
const router = useRouter()

const createArticle = function() {
  axios({
    method: 'POST',
    url: `${store.API_URL}/community/articles/`,
    data: {
      title: title.value,
      content: content.value
    }
  })
  .then((res) => {
    console.log(res)
    router.push({ name: 'ArticleView' })
  })
  .catch((err) => {
    console.log(err)
  })
}

</script>

<style>

</style>
