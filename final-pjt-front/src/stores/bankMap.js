import { defineStore } from 'pinia'


export const useBankMapStore = defineStore('bankMap', () => {
    const API_KEY = import.meta.env.VITE_MAP_API_KEY

    const getBankMap = function() {
        axios({
            method: 'GET',
            url: ``
        })
    }
})