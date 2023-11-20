<template>
  <div>
    <h1>게시글 상세</h1>
    <div v-if="article">
      <p>제목 : {{ article.title }}</p>
      <p>내용 : {{ article.content }}</p>
      <p>작성자 : {{ article.user.username }}</p>
      <p>작성일 : {{ article.created_at.slice(0, 10) + " " + article.created_at.slice(11,19)}}</p>
      <p>수정일 : {{ article.updated_at.slice(0, 10) + " " + article.updated_at.slice(11,19)}}</p>

      <RouterLink :to="{ name: 'update', params: {id: article.id} }">
        <button @click="updateArticle">수정</button>
      </RouterLink>
      <button @click="deleteArticle">삭제</button>

      <hr>

      <h2>댓글 [{{ article.comments.length }}]</h2>
      
      <br>

      <h3>작성하기</h3>
      <form @submit.prevent="createComment">
        <div>
          <label for="content">내용:</label>
          <textarea v-model.trim="content" id="content"></textarea>
        </div>
        <input type="submit">
      </form>
      <CommentList/>

    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useCommunityStore } from '@/stores/community';
import { useUserStore } from '@/stores/user'
import { useRouter, useRoute } from 'vue-router';
import CommentList from '@/components/CommentList.vue';

const userStore = useUserStore()
const store = useCommunityStore()
const route = useRoute()
const router = useRouter()
const article = ref(null)
const content = ref(null)

// console.log(route.params.id)

const deleteArticle = function() {
  axios({
    method: 'DELETE',
    url: `${store.API_URL}/community/articles/${route.params.id}/`
  })
  .then(() => {
    router.push({ name: 'articles'})
  })
  .catch((err) => {
    console.log(err)
  })
}

const createComment = function() {
  axios({
    method: 'POST',
    url: `${store.API_URL}/community/articles/${route.params.id}/comments/`,
    headers: {
        Authorization: `Token ${userStore.token}`
    },
    data: {
      content: content.value,
    },
  })
  .then(() => {
    router.go()
    console.log(comment)
  })
  .catch((err) => {
    console.log(err)
  })
}


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
