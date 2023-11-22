<template>
    <div v-if="isStaff">
        <div class="container">
            <div class="category-box">
                <form @submit.prevent="createCategory">
                    <label for="create-category">Category 종류:</label>
                    <br>
                    <input type="text" name="create-category" id="create-category" v-model.trim="name">
                    <br>
                    <label for="mainCate">메인 카테고리</label>
                    <input type="checkbox" name="mainCate" id="mainCate" v-model="mainCate">
                    <br>
                    <input type="submit" value="카테고리 생성">
                </form>
            </div>
        </div>
        <div>
            <br>
            <CategoryList/>
        </div>
    </div>
    <div v-else>
        <h2>관리자 전용 페이지 입니다.</h2>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useCommunityStore } from '@/stores/community';
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';
import CategoryList from '../../components/community/CategoryList.vue';

const name = ref(null)
const store = useCommunityStore()
const userStore = useUserStore()
const router = useRouter()
const isStaff = ref(false)
const mainCate = ref(false)

// console.log(isStaff.value)
const createCategory = function() {
    if (isStaff.value) {
        axios({
            method: 'POST',
            url: `${store.API_URL}/community/category/`,
            data: {
                name: name.value,
                main_category: mainCate.value
            }
        })
        .then((res) => {
            router.go()
        // router.push({ name: 'articles' })
        console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    } else {
        alert('카테고리를 생성할 수 없습니다.')
    }
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
    isStaff.value = res.data.is_staff
  })
  .catch((err) => {
    console.log(err)
  })
})
</script>

<style scoped>
.container{
    display: flex;
    align-items: center;
}
.category-box{
    display: flex;
    flex-direction: column;
}
</style>