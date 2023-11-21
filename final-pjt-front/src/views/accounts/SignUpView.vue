<template>
    <div>   
        <h1>회원가입</h1>
        <form @submit.prevent="signUp">
            <div>
                <label for="email">이메일 : </label>
                <input type="email" id="email" v-model="email">
            </div>
            <div>
                <label for="password1">비밀번호 : </label>
                <input type="password" id="password1" v-model="password1">
            </div>
            <div>
                <label for="password2">비밀번호 재확인 : </label>
                <input type="password" id="password2" v-model="password2">
            </div>
            <div>
                <label for="username">이름 : </label>
                <input type="text" id="username" v-model="username">
            </div>
            <div>
                <label for="birth">생년월일 : </label>
                <input type="date" id="birth" v-model="birth">
            </div>
            <div>
                <label for="phone">휴대폰 : </label>
                <input type="text" id="phone" v-model="phone">
            </div>
            <div>
                <label for="address">주소 : </label>
                <input type="text" id="address" v-model="address">
            </div>
            <div>
                <label for="money">자산 : </label>
                <input type="number" id="money" v-model="money">
            </div>
            <div>
                <label for="salary">연봉 : </label>
                <input type="number" id="salary" v-model="salary">
            </div>
            <div>
                <label for="">결혼여부 : </label>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="false" v-model="married">
                    <label class="form-check-label" for="inlineRadio1">미혼</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="true" v-model="married">
                    <label class="form-check-label" for="inlineRadio2">기혼</label>
                </div>
            </div>
            <div>
                <label for="main_bank">주거래은행 : </label>
                <input type="text" id="main_bank" v-model="main_bank">
            </div>
            <div>
                <label for="save_type">저축성향 : </label>
                <input type="number" id="save_type" v-model="save_type">
            </div>
            <input type="submit" value="SignUp">
        </form>
    </div>  
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user'
const store = useUserStore()

const email = ref(null)
const password1 = ref(null)
const password2 = ref(null)
const username = ref(null)
const birth = ref(null)
const phone = ref(null)
const address = ref(null)
const products = ref([])
const money = ref(null)
const salary = ref(null)
const married = ref(null)
const main_bank = ref(null)
const save_type = ref(null)
const signUp = function () {
    const userData = {
        "email"     : email.value,
        "password1" : password1.value,
        "password2" : password2.value,
        "username"  : username.value,
        "birth"     : birth.value,
        "phone"     : phone.value,
        "address"   : address.value,
        "products"  : products.value,
        "money"     : money.value,
        "salary"    : salary.value,
        "married"   : married.value,
        "main_bank" : main_bank.value,
        "save_type" : save_type.value,
    }
    store.signUp(userData)
}
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