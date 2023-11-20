<template>
  <div>
    <h1>게시글 생성</h1>
    <form @submit.prevent="createArticle">
      <div>
        <label for="title">제목:</label>
        <input type="text" v-model.trim="title" id="title">
      </div>
      <div>
        <label for="content">내용:</label>
        <textarea v-model.trim="content" id="content"></textarea>
      </div>
      <input type="submit">
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useCommunityStore } from '@/stores/community';
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';

const title = ref(null)
const content = ref(null)
const store = useCommunityStore()
const userStore = useUserStore()
const router = useRouter()

console.log(userStore.token)

const createArticle = function() {
  axios({
    method: 'POST',
    url: `${store.API_URL}/community/articles/`,
    headers: {
        Authorization: `Token ${userStore.token}`
    },
    data: {
      title: title.value,
      content: content.value,
    },
  })
  .then((res) => {
    console.log(res)
    router.push({ name: 'articles' })
  })
  .catch((err) => {
    console.log(err)
  })
}

</script>

<style>

</style>
