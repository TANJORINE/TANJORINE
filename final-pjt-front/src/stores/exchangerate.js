import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useExchangeRateStore = defineStore('exchangerate', () => {
  const countries = ref([])
  const API_URL = import.meta.env.VITE_API_URL

  const getCountries = function() {
    axios({
        method: 'GET',
        url: `${API_URL}/exchangerate/`
    })
    .then((res) => {
        // console.log(countries)
        countries.value = res.data
    })
    .catch((err) => {
        console.log(err)
    })
  }

  return { countries, getCountries }
}, { persist: true })
