import { ref } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import data from '@/assets/data.json'


export const useBankMapStore = defineStore('bankMap', () => {
    const siDo = ref([])
    const siGunGu = ref([])
    const banks = ref([])

    const resetSiGunGu = function() {
        siGunGu.value = []
    }

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
            siGunGu.value = []
            const siGunGuData = res.data.regcodes
            // console.log(siGunGuData)
            for (let data of siGunGuData) {
                // console.log(data.name)
                const sgg = data.name.split(' ')[1]
                // console.log(sgg!==undefined)
                if (!siGunGu.value.includes(sgg) && sgg!==undefined) {
                    siGunGu.value.push(sgg);
                }
            }
            // console.log(siGunGu.value)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getBank = function() {
        const bankList = data
        for (let bk of bankList) {
            const bank_nm = bk.fields.kor_co_nm
            if (!banks.value.includes(bank_nm) && bank_nm !== undefined) {
                banks.value.push(bank_nm);
            }
        }
    }

    


    return { siDo, getSiDo, siGunGu, getSiGunGu, resetSiGunGu, banks, getBank }

}, { persist: true })