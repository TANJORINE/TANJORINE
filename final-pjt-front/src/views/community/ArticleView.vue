<template>
  <div>
    <h1>게시글 조회</h1>
    <div v-if="loginUser">
      <RouterLink :to="{ name: 'create' }">[CREATE]</RouterLink>
    </div>
    <ArticleList/>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useCommunityStore } from '@/stores/community';
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router';
import ArticleList from '@/components/ArticleList.vue';

const store = useCommunityStore()
const userStore = useUserStore()

const loginUser = ref(null)


onMounted(() => {
  store.getArticles()

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

<style>

</style>
