import { ref, computed, onMounted, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
export const useProductStore = defineStore('product', () => {
    const userProd = ref({})
    const userOpt = ref({})
    const chartInfo = ref(null)
    const signedProductsInfo = function(data) {
        axios({
                method:'post',
                url: `http://127.0.0.1:8000/products/signedProd/`,
                data: data
            })
            .then((res) => {
                userProd.value=res.data.products
                userOpt.value=res.data.options
                chartInfo.value = makeChart(userProd.value, userOpt.value)
                return 1
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return { signedProductsInfo, userProd, userOpt, }
})
