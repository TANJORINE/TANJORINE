<template>
        <vue-good-table
            :columns="columns"
            :rows="rows"/>
</template>

<script setup>
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next';
import { ref, onMounted } from 'vue';
import axios from 'axios';
const data = ref([])
onMounted(() => {
    axios({
        method:'get',
        url: `http://127.0.0.1:8000/products/saving/`,
    })
    .then((res) => {
        data.value = res.data
        console.log(res.data)
    })
})


const columns = [
        { label: '공시제출월', field: 'dcls_month',},
        { label: '금융회사명', field: 'kor_co_nm',},
        { label: '금융상품명', field: 'fin_prdt_nm',},
        { label: '적립방식', field: 'rsrv_type_nm',},
        { label: '이자방식', field: 'intr_rate_type_nm',},
        { label: '6개월', field: 'm6intr_rate',},
        { label: '12개월', field: 'm12intr_rate',},
        { label: '24개월', field: 'm24intr_rate',},
        { label: '36개월', field: 'm36intr_rate',},
      ]

const rows = ref([])
const datasetOntable = function(data){
    
}
</script>

<style scoped>
.main {
    width: 1200px;
    height: 800px;
}
</style>