<template>
    <div>
        <div class="first-country">
            <select v-model="cost1">
                <!-- <option v-for="country1 in store.countries" :key="country1.cur_unit" :value="country1.deal_bas_r.replace(',', '')"> -->
                <option v-for="country1 in store.countries" :key="country1.cur_unit" :value="country1">
                    <div>
                        {{ country1.cur_nm.split(' ')[0] }} - {{ country1.cur_unit }}
                    </div>
                </option>
            </select>
            <!-- <p>{{ cost1.cur_unit }}</p> -->
            <!-- <input @change="changeCost1(inputcost1/(cost1.deal_bas_r.replace(',', '')/cost2.deal_bas_r.replace(',', ''))*(cost1.cur_unit.includes('(')!==-1?100:1))"  -->
            <input @change="changeCost1(inputcost1*cost1.deal_bas_r.replace(',', '')/cost2.deal_bas_r.replace(',', '')/(cost1.cur_unit.includes('(')!==-1?100:1))" 
            type="text" v-model.number="inputcost1">
            <div v-if="cost1">
                <!-- <P>{{ cost1 }}</P> -->
                <div v-if="cost1 === cost2">
                    <p>1</p>
                </div>
                <div v-else>
                    <p>{{ Math.round(inputcost1 * 100) / 100 }}{{ cost1.cur_nm.split(' ')[0]?cost1.cur_nm.split(' ')[0]:cost1.cur_nm }}</p>
                </div>
                    <!-- <p>{{cost1.cur_unit}}</p> -->
                <!-- <p>{{cost1.cur_unit.includes('(')}}</p> -->
            </div>
            <div v-else>
                <p>0</p>
            </div>
            <!-- <p>{{ inputcost1 }}</p> -->
            <!-- <P>{{ cost1.cur_unit }}</P> -->
            <!-- <p>환율 : {{ result1 }}</p> -->
            <!-- <P>{{ typeof cost1 }}</P> -->
        </div>
        
        <div class="second-country">
            <select v-model="cost2">
                <!-- <option v-for="country2 in store.countries" :key="country2.cur_unit" :value="country2.deal_bas_r.replace(',', '')"> -->
                <option v-for="country2 in store.countries" :key="country2.cur_unit" :value="country2">
                    <div>
                        {{ country2.cur_nm.split(' ')[0] }} - {{ country2.cur_unit }}
                    </div>
                </option>
            </select>
            <!-- <input @change="changeCost2(inputcost2/(cost2.deal_bas_r.replace(',', '')/cost1.deal_bas_r.replace(',', ''))*(cost2.cur_unit.includes('(')!==-1?100:1))"  -->
            <input @change="changeCost2(inputcost2*cost2.deal_bas_r.replace(',', '')/cost1.deal_bas_r.replace(',', '')/(cost2.cur_unit.includes('(')!==-1?100:1))" 
            type="text" v-model.number="inputcost2">
            <!-- <p>{{ inputcost2 }}</p> -->
            <div v-if="cost2">
                <!-- <P>{{ cost1 }}</P> -->
                <div v-if="cost1 === cost2">
                    <p>1</p>
                </div>
                <div v-else>
                    <p>{{ Math.round(inputcost2 * 100) / 100 }}{{ cost2.cur_nm.split(' ')[0]?cost2.cur_nm.split(' ')[0]:cost2.cur_nm }}</p>
                </div>
            </div>
            <div v-else>
                <p>0</p>
            </div>
            <!-- <p>환율 : {{ result2 }}</p> -->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useExchangeRateStore } from '@/stores/exchangerate'

const store = useExchangeRateStore()
// const cost1 = ref(1)
const cost1 = ref(null)
const cost2 = ref(null)
const inputcost1 = ref(0)
const inputcost2 = ref(0)

const changeCost1 = function(value) {
    inputcost2.value = value
}

const changeCost2 = function(value) {
    inputcost1.value = value
}

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