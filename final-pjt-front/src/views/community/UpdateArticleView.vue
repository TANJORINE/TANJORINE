<template>
    <div>
        <h3>게시글 수정</h3>
        <!-- 기존에 작성된 글 보여주기 .. 해야됨.. -->
        <form @submit.prevent="updateArticle">
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
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'

const API_URL = import.meta.env.VITE_API_URL

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()


const updateArticle = function() {
  axios({
    method: 'PUT',
    // url: `${store.API_URL}/community/articles/${route.params.id}/`,
    url: `${API_URL}/community/articles/${route.params.id}/`,
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

<style scoped>

</style>