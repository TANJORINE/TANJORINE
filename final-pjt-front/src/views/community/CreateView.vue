<template>
  <div>
    <h1>게시글 생성</h1>
    <form @submit.prevent="createArticle">
      <div>
        <label for="category">카테고리:
          <select v-model="category" name="category" id="category">
          <!-- <select v-model="siDo" @change="changeSido" name="sido" id="sido"> -->
            <option v-for="category in store.categories" :value="category">
              <p>{{ category.name }}</p>
            </option>
          </select>
        </label>
      </div>
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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useCommunityStore } from '@/stores/community';
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';

const title = ref(null)
const content = ref(null)
const store = useCommunityStore()
const userStore = useUserStore()
const router = useRouter()
const category = ref(null)

console.log(userStore.token)

const createArticle = function() {
  const data= {
      // category: {'pk': category.value.pk, 'name': category.value.name},
      category: category.value.pk,
      title: title.value,
      content: content.value,
    }
  console.log(data)
  axios({
    method: 'POST',
    url: `${store.API_URL}/community/articles/`,
    headers: {
        Authorization: `Token ${userStore.token}`
    },
    data: {
      // category: {'pk': category.value.pk, 'name': category.value.name},
      category: category.value.pk,
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

onMounted(() => {
  store.getCategories()
})

</script>

<style>

</style>
