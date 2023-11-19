<template>
    <div>
        <button class="btn btn-primary" @click="click">
            Load
        </button>
        <div>
            <vue-good-table
            :columns="columns"
            :rows="rows"/>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
const savingProducts = ref(null)
const savingOptions = ref(null)
const depositProducts = ref(null)
const depositOptions = ref(null)
const click = function() {
    axios({
        method:'get',
        url: `http://127.0.0.1:8000/products/load/`,
    })
    .then((res) => {
        savingProducts.value = res.data.savingProducts
        savingOptions.value = res.data.savingOptions
        depositProducts.value = res.data.depositProducts
        depositOptions.value = res.data.depositOptions
        madeRow(depositProducts.value, depositOptions.value)
    })
}
const columns = [
        { label: '공시제출월', field: 'dcls_month', },
        { label: '금융회사명', field: 'kor_co_nm', },
        { label: '금융상품명', field: 'fin_prdt_nm', },
        { label: '이자방식', field: 'intr_rate_type_nm', },
        { label: '6개월', field: 'm6intr_rate',},
        { label: '12개월', field: 'm12intr_rate',},
        { label: '24개월', field: 'm24intr_rate',},
        { label: '36개월', field: 'm36intr_rate',},
      ]

const rows = []
const madeRow = function(products, options) {
    for(const product of products) {
        let row = {
        dcls_month:'',
        kor_co_nm:'',
        fin_prdt_nm:'',
        intr_rate_type_nm:'',
        m6intr_rate:'',
        m12intr_rate:'',
        m24intr_rate:'',
        m36intr_rate:'',
        }
        const prodOpt = options.filter(option => {
            if (product.fin_prdt_cd == option.fin_prdt_cd && product.fin_co_no == option.fin_co_no) {
                
            }
            return 
        })
        console.log(prodOpt)
    }
}
</script>

<style lang="scss" scoped>

</style>