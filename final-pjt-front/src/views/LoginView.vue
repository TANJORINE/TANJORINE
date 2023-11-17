<template>
    <div>
        <h1>로그인</h1>
        <form @submit.prevent="logIn">
            <div>
                <label for="email">Email : </label>
                <input type="text" id="email" v-model="email">
            </div>
            <div>
                <label for="password">PassWord : </label>
                <input type="password" id="password" v-model="password">
            </div>
            <input type="submit">
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user'
const email = ref(null)
const password = ref(null)
const store = useUserStore()
const logIn = function() {
    const loginData = {
        email: email.value,
        password: password.value
    }
    store.logIn(loginData)
}
</script>

<style scoped>

</style>