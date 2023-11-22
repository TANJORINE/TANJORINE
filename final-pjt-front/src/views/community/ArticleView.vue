<template>
  <div>
    <h1>게시글 조회</h1>
    <!-- 관리자만 카테고리 생성 -->
    <!-- {{ isStaff }} -->
    <div v-if="isStaff">
      <div>
        <RouterLink :to="{ name: 'createCategory' }">[카테고리 생성]</RouterLink>
      </div>
    </div>
    <div v-if="loginUser">
      <RouterLink :to="{ name: 'create' }">[글 작성]</RouterLink>
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
const isStaff = ref(false)

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
    isStaff.value = res.data.is_staff
  })
  .catch((err) => {
    console.log(err)
  })
})
</script>

<style>

</style>
