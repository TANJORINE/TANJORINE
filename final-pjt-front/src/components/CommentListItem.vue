<template>
  <!-- <div v-if="comment.article.pk === "> -->
  <div v-if="Number(route.params.id) === comment.article.pk">
    <!-- <p>글 pk : {{ route.params.id }}</p>
    <p>댓글 글 pk : {{ comment.article.pk }}</p> -->
    <!-- <p>{{ comment }}</p> -->
    <p>작성자 : {{ comment.user.username }}</p>
    <!-- <p>{{ comment.id }}</p> -->



    <div v-if="showContent">
      <p>내용 : {{ comment.content }}</p>
      <button @click="clickUpdate">수정</button>
      <button @click="deleteComment(comment.id)">삭제</button>
    </div>
    <div v-else>
      <form @submit.prevent="updateComment(comment.id)">
        <div>
          <label for="content">내용:</label>
          <textarea v-model.trim="content" id="content"></textarea>
        </div>
        <input type="submit" value="수정">
      </form>
      <!-- <UpdateComment/> -->
    </div>

    <hr>
  </div>
</template>

<script setup>
// import UpdateComment from './UpdateComment.vue';
import { useRouter, useRoute } from 'vue-router';
import { useCommunityStore } from '@/stores/community';
import { useUserStore } from '@/stores/user'
import axios from 'axios';
import { ref } from 'vue'


const API_URL = import.meta.env.VITE_API_URL


const route = useRoute()
const router = useRouter()
const store = useCommunityStore()
const content = ref(null)
const userStore = useUserStore()
const showContent = ref(true)


const updateComment = function(commentId) {
    axios({
      method: 'PUT',
      url: `${API_URL}/community/comments/${commentId}/`,
      headers: {
        Authorization: `Token ${userStore.token}`
      },
      data: {
        content: content.value,
      },
    })
    .then((res) => {
        // router
        console.log(res)
        showContent.value != showContent.value
        router.go()
    })
    .catch((err) => {
      console.log(err)
    })
}

const deleteComment = function(commentId) {
  axios({
    method: 'DELETE',
    url: `${store.API_URL}/community/comments/${commentId}/`
  })
  .then(() => {
    router.go()
    // alert('댓글이 삭제되었습니다.')
  })
  .catch(() => {
    console.log(err)
  })
}

const clickUpdate = function() {
  showContent.value = !showContent.value
}

// const updateComment = function(commentId)


defineProps({
  comment: Object,
})
</script>
