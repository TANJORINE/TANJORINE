import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'


export const useBankMapStore = defineStore('bankMap', () => {
    const API_URL = import.meta.env.VITE_API_URL

    const siDo = ref([])
    const siGunGu = ref([])
    const bank = ref([])

    const getSiDo = function() {
        axios({
            method: 'GET',
            url: `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000`
        })
        .then((res) => {
            siDo.value = res.data.regcodes
            // console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getSiGunGu = function(code) {
        axios({
            method: 'GET',
            url: `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${code}*00000`
        })
        .then((res) => {
            siGunGu.value = res.data.regcodes
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getBank = function() {
        axios({
            method: 'GET',
            url: ``
        })
    }

    return { siDo, getSiDo, siGunGu, getSiGunGu }

}, { persist: true })