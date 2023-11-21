<template>
    <div class="d-flex">
        <template v-for="data in datas">
            <div class="container">
                <p>{{ data.kor_co_nm }}</p> 
                <p>{{ data.fin_prdt_nm }}</p>
            </div>
        </template>
    </div>
    <div>
        <chart/>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import chart from '@/components/products/chart.vue';
const store = useUserStore()
const datas = ref(null)
onMounted(() => {
    axios({
        method:'get',
        url: `http://127.0.0.1:8000/products/signedProd/${store.userEmail}/`,
    })
    .then((res) => {
        console.log(res.data)
        datas.value = res.data
    })
})
</script>

<style scoped>

</style>