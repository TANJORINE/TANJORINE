import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
export const useUserStore = defineStore('user', () => {

  const router = useRouter()
  const token = ref(null)
  const userEmail = ref(null)
  const isLogin = computed(() => {
    if(token.value === null) return false
    else return true
  })

  // 회원가입 정상 가입 후 자동 로그인
  const signUp = function (userData) {
  axios({
    method: 'post',
    url: `http://127.0.0.1:8000/accounts/registration/`,
    data: userData
  }).then(res => {
    console.log(1)
    const email = userData.email
    const password = userData.password1
    logIn({ email, password })
  }).catch(err => {
    console.log(err)
  })
  }

  // 로그인
  const logIn = function (loginData) {
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/accounts/login/`,
      data: loginData
    }).then((res) => {
      console.log('성공!')
      token.value = res.data.key
      userEmail.value = loginData.email
      router.push({ name: 'home' })
      console.log(userEmail.value)
    }).catch(err => {
      console.log(err)
    })
  }
  // 로그아웃
  const logOut = function () {
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/accounts/logout/`,
    }).then(() => {
      token.value = null
      router.push({ name: 'home' })
    }).catch(err => {
      console.log(err)
    })
  }

  return { signUp, logIn, logOut, token, isLogin, userEmail }
}, { persist: true })
