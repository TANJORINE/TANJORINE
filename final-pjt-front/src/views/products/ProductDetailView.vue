<template>
    <div>
        <button class="btn" :disabled="!user.isLogin">가입하기</button>
        <ProductDetail :data-prod="product"/>
        <ProductOption :data-option="options"/>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductDetail from '@/components/products/ProductDetail.vue'
import ProductOption from '@/components/products/ProductOption.vue'
import { useUserStore } from '@/stores/user'
const user = useUserStore()
const route = useRoute()
const product = ref({})
const options = ref({})

onMounted(() => {
    axios({
        method:'get',
        url: `http://127.0.0.1:8000/products/detail/${route.params.type}/${route.params.id}/`,
    })
    .then((res) => {
        product.value = res.data.product
        options.value = res.data.options
    })
})

</script>

<style scoped>

</style>