<template>
    <div>   
        <h1>회원 정보</h1>
        <p>실 명 : {{ username }}</p>
        <p>생년월일 : {{ birth }}</p>
        <p>휴대폰 : {{ phone }}</p>
        <p>주 소 :{{ address }}</p>
        <p>자산 : {{ money }}</p>
        <p>연봉 : {{ salary }}</p>
        <p>결혼 :{{ married }}</p>
        <p>주거래은행 : {{ main_bank }}</p>
        <p>저축 성향 : {{ save_type }}</p>
        <button class="btn btn-warning">개인 정보 수정</button>
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
const money = ref(null)
const salary = ref(null)
const married = ref(false)
const main_bank = ref(null)
const save_type = ref(null)


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