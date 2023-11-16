import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
export const useUserStore = defineStore('user', () => {
    const signUp = function (userData) {
    const {email
          ,password1
          ,password2
          ,username
          ,age
          ,phone
          ,address
          ,products
          ,money
          ,salary
          ,married
          ,main_bank
          ,save_type } = userData
    axios({
      method: 'post',
      url: `http://127.0.0.1:8000/accounts/registration/`,
      data: userData
    }).then(res => {
      console.log('성공!')
    }).catch(err => {
      console.log(err)
    })
        }

  return { signUp }
})
