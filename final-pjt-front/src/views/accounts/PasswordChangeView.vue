<template>
    <div>
        <h1>비밀번호 변경</h1>
        <form @submit.prevent="password_change">
            <div>
                <label for="password1">비밀번호 : </label>
                <input type="password" id="password1" v-model="pw1">
            </div>
            <div>
                <label for="password2">비밀번호 재확인 : </label>
                <input type="password" id="password2" v-model="pw2">
            </div>
            <input type="submit" value="변경">
        </form>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';
const router = useRouter()
const userstore = useUserStore()
const pw1 = ref(null)
const pw2 = ref(null)
const password_change = function() {
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/accounts/password/change/`,
      headers: {
          Authorization: `Token ${userstore.token}`
      },
      data: {
        new_password1: pw1.value,
        new_password2: pw2.value,
      }
    })
    .then((res) => {
        console.log(res)
        alert(res.data.detail)
        router.push({name: 'home'})
    })
}
</script>

<style scoped>

</style>