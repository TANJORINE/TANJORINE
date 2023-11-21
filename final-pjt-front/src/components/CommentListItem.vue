<template>
  <div v-if="Number(route.params.id) === comment.article.pk">
    <p>작성자 : {{ comment.user.username }}</p>
    <div v-if="comment.user.email === loginUser && loginUser !== null">
      <div v-if="showContent">
        <p>내용 : {{ comment.content }}</p>
        <p v-if="comment.created_at !== comment.updated_at">
        (수정됨)
        </p>
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
      </div>
    </div>
    <div v-else>
      <p>내용 : {{ comment.content }}</p>
      <p v-if="comment.created_at !== comment.updated_at">
      (수정됨)
      </p>
    </div>
    <hr>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useCommunityStore } from '@/stores/community';
import { useUserStore } from '@/stores/user'
import axios from 'axios';
import { ref, onMounted } from 'vue'


const API_URL = import.meta.env.VITE_API_URL


const route = useRoute()
const router = useRouter()
const store = useCommunityStore()
const userStore = useUserStore()
const showContent = ref(true)
const loginUser = ref(null)

const props = defineProps({
  comment: Object,
})

const comment = ref(props.comment)
const content = ref(comment.value.content)

const updateComment = function(commentId) {
  if (comment.value.user.email === loginUser.value && loginUser.value !== null) {
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
        console.log(res)
        showContent.value != showContent.value
        router.go()
    })
    .catch((err) => {
      console.log(err)
    })
  } else {
    alert('수정할 수 없습니다.')
  }
}

const deleteComment = function(commentId) {
  if (comment.value.user.email === loginUser.value && loginUser.value !== null) {
    console.log(1)
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
  } else {
    alert('삭제할 수 없습니다.')
  }
}

const clickUpdate = function() {
  showContent.value = !showContent.value
}

onMounted(() => {
  axios({
    method: 'GET',
    url: `${store.API_URL}/accounts/user/`,
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
  .then((res) => {
    loginUser.value = res.data.email

  })
  .catch((err) => {
    console.log(err)
  })
})


</script>
