<template>
    <div>
        <p>{{ dataProd.kor_co_nm }}</p>
        <p>{{ dataProd.fin_prdt_nm}}</p>
        <p>{{ dataProd.dcls_month }}</p>
        <p>{{ dataProd.etc_not }}</p>
        <p>{{ dataProd.join_member }}</p>
        <p>{{ dataProd.join_way }}</p>
        <p>{{ dataProd.spcl_cnd }}</p>
        <p>{{ dataProd.mtrt_int }}</p>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const prodData = defineProps({
    dataProd: Object
    })
</script>

<style scoped>

</style>