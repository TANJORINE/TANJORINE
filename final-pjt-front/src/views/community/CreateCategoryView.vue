<template>
    <div class="container">
        <div class="category-box">
            <form @submit.prevent="createCategory">
                <label for="create-category">Category 종류:</label><p></p>
                <input type="text" name="create-category" id="create-category" v-model.trim="name"><p></p>
                <input type="submit" value="카테고리 생성">
            </form>
        </div>
    </div>
    <div>
        <br>
        <CategoryList/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useCommunityStore } from '@/stores/community';
import { useRouter } from 'vue-router';
import CategoryList from '../../components/community/CategoryList.vue';

const name = ref(null)
const store = useCommunityStore()
const router = useRouter()

const createCategory = function() {
    axios({
        method: 'POST',
        url: `${store.API_URL}/community/category/`,
        data: {
            name: name.value,
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
}
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