<template>
    <div>
        <div class="first-country">
            <select id="country1" v-model="cost1">
                <option v-for="country1 in store.countries" :key="country1.cur_unit" :value="country1.deal_bas_r.replace(',', '')">
                    <div>
                        {{ country1.cur_nm.split(' ')[0] }} - {{ country1.cur_unit }}
                    </div>
                </option>
            </select>
            <input @input="changeCost1" type="text" v-model.number="inputcost1">
            <p>환율 : {{ result1 }}</p>
        </div>
        
        <div class="second-country">
            <select id="country2" v-model="cost2">
                <option v-for="country2 in store.countries" :key="country2.cur_unit" :value="country2.deal_bas_r.replace(',', '')">
                    <div>
                        {{ country2.cur_nm.split(' ')[0] }} - {{ country2.cur_unit }}
                    </div>
                </option>
            </select>
            <input @input="changeCost2" type="text" v-model.number="inputcost2">
            <p>환율 : {{ result2 }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useExchangeRateStore } from '@/stores/exchangerate'

const store = useExchangeRateStore()
const cost1 = ref(1)
const cost2 = ref(0)
const inputcost1 = ref(1)
const inputcost2 = ref(1)

const result1 = ref(cost1)
const result2 = ref(cost2)

console.log(cost1.value)
console.log(cost2.value)

// const changeCost1 = function() {
//     inputcost1.value = 
// }

// const changeCost2 = function() {
//     inputcost2.value = 
// }

onMounted(() => {
    store.getCountries()
})
</script>

<style scoped>
.first-country{
    border: 1px solid gray;
    margin: 10px;
    padding: 10px;
    width: 200px;
    height: 200px;
}
.second-country {
    border: 1px solid gray;
    margin: 10px;
    padding: 10px;
    width: 200px;
    height: 200px;
}
</style>