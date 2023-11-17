<template>
    <div>   
        <h1>회원 정보</h1>
        <p>실 명 : {{ username }}</p>
        <p>생년월일 : {{ birth }}</p>
        <p>휴대폰 : {{ phone }}</p>
        <p>주 소 :{{ address }}</p>
        <p>가입 상품 : {{ products }}</p>
        <p>자산 : {{ money }}</p>
        <p>연봉 : {{ salary }}</p>
        <p>결혼 :{{ married }}</p>
        <p>주거래은행 : {{ main_bank }}</p>
        <p>저축 성향 : {{ save_type }}</p>
    </div>  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user'
import axios from 'axios';
const store = useUserStore()

const username = ref(null)
const birth = ref(null)
const phone = ref(null)
const address = ref(null)
const products = ref(null)
const money = ref(null)
const salary = ref(null)
const married = ref(false)
const main_bank = ref(null)
const save_type = ref(null)
onMounted(() => {
    axios({
        method: 'get',
        url: `http://127.0.0.1:8000/accounts/user/`,
        headers: {
            Authorization: `Token ${store.token}`
        }
    }).then((data) => {
        console.log(data)
        username.value = data.data.username
        birth.value = data.data.birth
        phone.value = data.data.phone
        address.value = data.data.address
        products.value = data.data.products
        money.value = data.data.money
        salary.value = data.data.salary
        married.value = data.data.married
        main_bank.value = data.data.main_bank
        save_type.value = data.data.save_type
    })
})

</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
        width: 350px;
    }
    .line {
        display: flex;
    }
</style>