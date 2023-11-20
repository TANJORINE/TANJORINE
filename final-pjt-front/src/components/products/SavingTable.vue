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
        console.log(res.data.savingData)
        datasetMakeRow(res.data.savingData)
    })
})


const columns = [
        { label: '공시제출월', field: 'dcls_month',},
        { label: '금융회사명', field: 'kor_co_nm',},
        { label: '금융상품명', field: 'fin_prdt_nm',},
        { label: '적립방식', field: 'rsrv_type_nm',},
        { label: '이자방식', field: 'intr_rate_type_nm',},
        { label: '6개월 기본 금리', field: 'm6intr_rate',},
        { label: '6개월 최대 금리', field: 'm6intr_rate_max',},
        { label: '12개월 기본 금리', field: 'm12intr_rate',},
        { label: '12개월 최대 금리', field: 'm12intr_rate_max',},
        { label: '24개월 기본 금리', field: 'm24intr_rate',},
        { label: '24개월 최대 금리', field: 'm24intr_rate_max',},
        { label: '36개월 기본 금리', field: 'm36intr_rate',},
        { label: '36개월 최대 금리', field: 'm36intr_rate_max',},
      ]

      const rows = ref([])

const datasetMakeRow = function(data) {
    let data_set = []

    for (let i = 0; i < data.productsdata.length; i++ ) {
        const prodid = data.productsdata[i].id
        let row_data = {
            dcls_month: null,
            kor_co_nm: null,
            fin_prdt_nm: null,
            intr_rate_type_nm: null,
            rsrv_type_nm: null,
            m6intr_rate: null,
            m6intr_rate_max: null,
            m12intr_rate: null,
            m12intr_rate_max: null,
            m24intr_rate: null,
            m24intr_rate_max: null,
            m36intr_rate: null,
            m36intr_rate_max: null,
        }
        row_data.dcls_month = data.productsdata[i].dcls_month
        row_data.kor_co_nm = data.productsdata[i].kor_co_nm
        row_data.fin_prdt_nm = data.productsdata[i].fin_prdt_nm
        for(const k in data.optionsdata[prodid]) {
            if (data.optionsdata[prodid][k].length != 0){
                row_data = datasetAppendSingleRow(row_data, data.optionsdata[prodid][k])
                data_set.push(row_data)
            }
        }
    }
    rows.value = data_set
}
const datasetAppendSingleRow = function(row, datas){
    row.intr_rate_type_nm = datas[0].intr_rate_type_nm
    row.rsrv_type_nm = datas[0].rsrv_type_nm
    for (const data of datas) {
        if (data.save_trm === '6') {
            console.log(1)
            row.m6intr_rate = data.intr_rate
            row.m6intr_rate_max = data.intr_rate2
        } else if (data.save_trm === '12') {
            row.m12intr_rate = data.intr_rate
            row.m12intr_rate_max = data.intr_rate2
        } else if (data.save_trm === '24') {
            row.m24intr_rate = data.intr_rate
            row.m24intr_rate_max = data.intr_rate2
        } else if (data.save_trm === '36') {
            row.m36intr_rate = data.intr_rate
            row.m36intr_rate_max = data.intr_rate2
        }
    }
    return row
}
</script>

<style scoped>
.main {
    width: 1200px;
    height: 800px;
}
</style>