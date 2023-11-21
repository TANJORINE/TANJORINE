<template>
  <div>
    <h1>게시글 상세</h1>
    <!-- <p>{{ user }}</p> -->

    <div v-if="article">
      <p>제목 : {{ article.title }}</p>
      <p>내용 : {{ article.content }}</p>
      <p>작성자 : {{ article.user.username }}</p>
      <p>작성일 : {{ article.created_at.slice(0, 10) + " " + article.created_at.slice(11,19)}}</p>
      <p>수정일 : {{ article.updated_at.slice(0, 10) + " " + article.updated_at.slice(11,19)}}</p>
    

    <!-- article.value.user.email => 변수 만들어 쓰니까 새로고침 해야 뜸 -->
    <div v-if="article.user.email === loginUser && loginUser !== null">
      <RouterLink :to="{ name: 'update', params: {id: article.id} }">
        <button>수정</button>
      </RouterLink>
      <button @click="deleteArticle">삭제</button>
    </div>
      <hr>
      <h2>댓글 [{{ article.comment_count }}]</h2>
      <br>
      <div v-if="loginUser">

        <h3>작성하기</h3>
        <form @submit.prevent="createComment">
          <div>
            <label for="content">내용:</label>
            <textarea v-model.trim="content" id="content"></textarea>
          </div>
          <input type="submit">
        </form>
      </div>
      <div v-else>
        <p>로그인 후 이용해주세요.</p>

      </div>
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

const loginUser = ref(null)

const deleteArticle = function() {
  // console.log(article.value.user.email)
  if (article.value.user.email === loginUser.value && loginUser.value !== null) {
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
  } else {
    alert('삭제할 수 없습니다.')
  }
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
    article.value = res.data
    console.log(article.value)
  })
  .catch((err) => {
    console.log(err)
  })

  axios({
    method: 'GET',
    url: `${store.API_URL}/accounts/user/`,
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
  .then((res) => {
    loginUser.value = res.data.email
    console.log(loginUser)
  })
  .catch((err) => {
    console.log(err)
  })
})
</script>

<style>

</style>
