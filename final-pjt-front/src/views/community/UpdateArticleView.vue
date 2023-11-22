<template>
    <div>
        <h3>게시글 수정</h3>
        <form @submit.prevent="updateArticle">
          <select v-model="newCate">
            <option v-for="category in store.categories" :value="category">
              <p>{{ category.name }}</p>
            </option>
          </select>
            <div>
                <label for="title">제목:</label>
                <!-- <input type="text" v-model.trim="title" id="title" v-model="articleTitle"> -->
                <!-- <input type="text" id="title" v-model.trim="article.title"> -->
                <input type="text" id="title" v-model.trim="articleTitle">
            </div>
            <div>
                <label for="content">내용:</label>
                <!-- <textarea v-model.trim="content" id="content" v-model="articleContent"></textarea> -->
                <!-- <textarea id="content" v-model="article.content"></textarea> -->
                <textarea id="content" v-model="articleContent"></textarea>
            </div>
            <input type="submit">
        </form>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useCommunityStore } from '@/stores/community';
import { useUserStore } from '@/stores/user'
import { ref, onMounted } from 'vue';

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const store = useCommunityStore()

const article = ref(null)
const articleTitle = ref(null)
const articleContent = ref(null)
const loginUser = ref(null)
const newCate = ref(null)

const updateArticle = function() {
  if (article.value.user.email === loginUser.value && loginUser.value !== null) {
    axios({
      method: 'PUT',
      url: `${store.API_URL}/community/articles/${route.params.id}/`,
      headers: {
          Authorization: `Token ${userStore.token}`
      },
      data: {
        category: newCate.value.pk,
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
  } else {
    alert('수정할 수 없습니다.')
  }
}

onMounted(() => {
  store.getCategories()

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

  axios({
    method: 'GET',
    url: `${store.API_URL}/community/articles/${route.params.id}/`
  })
  .then((res) => {
    article.value = res.data
  
    articleTitle.value = res.data.title
    articleContent.value = res.data.content
    // console.log(article.value)
  })
  .catch((err) => {
    console.log(err)
  })


  // console.log(loginUser.value)
})

// console.log(loginUser)
</script>

<style scoped>

</style>

