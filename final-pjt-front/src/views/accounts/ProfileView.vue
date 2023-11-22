<template>
    <div class="row">   
        <div class="col-3 m-5">
            <h1>회원 정보</h1>
            <p>실 명 : {{ username }}</p>
            <p>생년월일 : {{ birth }}</p>
            <p>휴대폰 : {{ phone }}</p>
            <p>주 소 :{{ address }}</p>
            <p>자산 : {{ money }}</p>
            <p>연봉 : {{ salary }}</p>
            <p>결혼 :{{ married ? '기혼' : '미혼' }}</p>
            <p>주거래은행 : {{ main_bank }}</p>
            <p>저축 성향 : {{ save_type }}</p>
            <RouterLink :to="{ name: 'profileUpdate', props:data}">수정</RouterLink>
        </div>
        <div class="col-7 m-5">
            <template v-for="prod in prodstore.userProd">
                <div>
                    {{ prod[0].kor_co_nm }} - {{ prod[0].fin_prdt_nm }}
                </div>
            </template>
            <div>
                <chart/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user'
import { useProductStore } from '@/stores/product'
import chart from '@/components/products/chart.vue'
import axios from 'axios';


const userstore = useUserStore()
const prodstore = useProductStore()

const data = ref(null)
const username = ref(null)
const birth = ref(null)
const phone = ref(null)
const address = ref(null)
const money = ref(null)
const salary = ref(null)
const married = ref(null)
const main_bank = ref(null)
const save_type = ref(null)

onBeforeMount(() => {
    axios({
      method: 'get',
      url: `http://127.0.0.1:8000/accounts/user/`,
      headers: {
          Authorization: `Token ${userstore.token}`
      }
    }).then((res) => {
        // 프로필 수정 화면 표시용
        data.value = res.data

        username.value  = res.data.username
        birth.value     = res.data.birth
        phone.value     = res.data.phone
        address.value   = res.data.address
        money.value     = res.data.money
        salary.value    = res.data.salary
        married.value   = res.data.married
        main_bank.value = res.data.main_bank
        save_type.value = res.data.save_type
        prodstore.signedProductsInfo(res.data.products.split(',').map(d=> d.split('/$')))
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
    .btn-box {
        text-decoration: none;
        color: black;
    }
</style>