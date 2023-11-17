<template>
    <div>
        <div class="first-country">
            <select v-model="cost1">
                <option v-for="country1 in store.countries" :key="country1.cur_unit" :value="country1">
                    <div>
                        {{ country1.cur_nm.split(' ')[0] }} - {{ country1.cur_unit }}
                    </div>
                </option>
            </select>
            <!-- <input @change="changeCost1(inputcost1*cost1.deal_bas_r.replace(',', '')/cost2.deal_bas_r.replace(',', '')/(cost1.cur_unit.includes('(')!==-1?100:1))" 
            type="text" v-model.number="inputcost1"> -->
            <!-- <input @change="changeCost1(inputcost1*cost1.deal_bas_r.replace(',', '')/cost2.deal_bas_r.replace(',', '')*(cost1.cur_unit.includes('(')!==-1?1:100))"  -->
            <input @change="changeCost1" 
            type="text" v-model.number="inputcost1">
            <div v-if="cost1">
                <div v-if="cost1 === cost2">
                    <p>1 {{ currencyUnit1(cost1.cur_nm) }}</p>
                </div>
                <div v-else>
                    <p>{{ Math.round(inputcost1 * 100) / 100 }} {{ currencyUnit1(cost1.cur_nm) }}</p>
                </div>
            </div>
            <div v-else>
                <p>0</p>
            </div>
        </div>
        
        <div class="second-country">
            <select v-model="cost2">
                <option v-for="country2 in store.countries" :key="country2.cur_unit" :value="country2">
                    <div>
                        {{ country2.cur_nm.split(' ')[0] }} - {{ country2.cur_unit }}
                    </div>
                </option>
            </select>
            <!-- <input @change="changeCost2(inputcost2*cost2.deal_bas_r.replace(',', '')/cost1.deal_bas_r.replace(',', '')*(cost2.cur_unit.includes('(')!==-1?1:100))" -->
            <input @change="changeCost2" 
            type="text" v-model.number="inputcost2">
            <div v-if="cost2">
                <div v-if="cost1 === cost2">
                    <p>1 {{ currencyUnit2(cost2.cur_nm) }}</p>
                </div>
                <div v-else>
                    <p>{{ Math.round(inputcost2 * 100) / 100 }} {{ currencyUnit2(cost2.cur_nm) }}</p>
                </div>
            </div>
            <div v-else>
                <p>0</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useExchangeRateStore } from '@/stores/exchangerate'

const store = useExchangeRateStore()
const cost1 = ref(null)
const cost2 = ref(null)
const inputcost1 = ref(0)
const inputcost2 = ref(0)

const changeCost1 = function() {
    // console.log(cost1.value.deal_bas_r)
    // inputcost2.value = inputcost1*cost1.deal_bas_r.replace(',', '')/cost2.deal_bas_r.replace(',', '')*(cost1.cur_unit.includes('(')!==-1?1:100)
    inputcost2.value = inputcost1.value*cost1.value.deal_bas_r.replace(',', '')/cost2.value.deal_bas_r.replace(',', '')*(cost1.value.cur_unit.includes('(')?1:100)

    // if ((cost1.value.cur_unit.includes('(') === false) && cost2.value.cur_unit.includes('(') === true ) {  // 일본, 인도네시아 x
    //     inputcost2.value = inputcost1.value*cost1.value.deal_bas_r.replace(',', '')/cost2.value.deal_bas_r.replace(',', '')*100
    //     console.log(100)
    // } else {
    //     inputcost2.value = inputcost1.value*cost1.value.deal_bas_r.replace(',', '')/cost2.value.deal_bas_r.replace(',', '')
    //     console.log(cost2.value.cur_unit.includes('('))
    //     console.log(cost1.value.cur_unit.includes('('))
    //     console.log(cost2.value.cur_unit)
    //     console.log(200)
    // }

    // inputcost2.value = value
}

const changeCost2 = function(value) {
    inputcost1.value = inputcost2.value*cost2.value.deal_bas_r.replace(',', '')/cost1.value.deal_bas_r.replace(',', '')*(cost2.value.cur_unit.includes('(')?1:100)
    // inputcost1.value = value
    console.log(2)
}

const currencyUnit1 = computed(() => (cur_nm) => {
    return cur_nm.split(' ')[1]?cur_nm.split(' ')[1]:cur_nm
})

const currencyUnit2 = computed(() => (cur_nm) => {
    return cur_nm.split(' ')[1]?cur_nm.split(' ')[1]:cur_nm
})

watch([cost1, cost2], ([newCost1, newCost2]) => {
    // console.log(cost1.value === null)
    // console.log(cost2)
    if (cost1.value !== null && cost2.value !== null && inputcost1.value === 0 && inputcost2.value === 0) {

        // inputcost1.value = 1
        // inputcost2.value = changeCost2(inputcost2*cost2.deal_bas_r.replace(',', '')/cost1.deal_bas_r.replace(',', '')/(cost2.cur_unit.includes('(')!==-1?100:1))
        // console.log(cost2)
        // console.log(cost2.deal_bas_r)
        // console.log(cost2.value.deal_bas_r)
    }
})


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