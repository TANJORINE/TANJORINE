import { defineStore } from 'pinia'


export const useBankMapStore = defineStore('bankMap', () => {
    const getBankMap = function() {
        axios({
            method: 'GET',
            url: ``
        })
    }
})