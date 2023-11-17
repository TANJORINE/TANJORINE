<template>
    <div>
        <div class="first-country">
            <select v-model="country1">
                <option v-for="country1 in store.countries" :key="country1.cur_unit" :value="country1">
                    <div>
                        {{ country1.cur_nm.split(' ')[0] }} - {{ country1.cur_unit }}
                    </div>
                </option>
            </select>
            <input @change="changeCost1" @input="changeCost1" 
            type="text" v-model.number="inputCost1">
            <div v-if="country1">
                <div v-if="country1 === country2">
                    <p>1 {{ currencyUnit1(country1.cur_nm) }}</p>
                </div>
                <div v-else>
                    <p>{{ Math.round(inputCost1 * 100) / 100 }} {{ currencyUnit1(country1.cur_nm) }}</p>
                </div>
            </div>
            <div v-else>
                <p>0</p>
            </div>
        </div>
        
        <div class="second-country">
            <select v-model="country2">
                <option v-for="country2 in store.countries" :key="country2.cur_unit" :value="country2">
                    <div>
                        {{ country2.cur_nm.split(' ')[0] }} - {{ country2.cur_unit }}
                    </div>
                </option>
            </select>
            <input @change="changeCost2" @input="changeCost2" 
            type="text" v-model.number="inputCost2">
            <div v-if="country2">
                <div v-if="country1 === country2">
                    <p>1 {{ currencyUnit2(country2.cur_nm) }}</p>
                </div>
                <div v-else>
                    <p>{{ Math.round(inputCost2 * 100) / 100 }} {{ currencyUnit2(country2.cur_nm) }}</p>
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
const country1 = ref(null)
const country2 = ref(null)
const inputCost1 = ref(0)
const inputCost2 = ref(0)


// 국가2 입력금액 변경
const changeCost1 = function() {
    if ((country1.value.cur_unit.includes('(') === false) && country2.value.cur_unit.includes('(') === true ) {  // 국가1 not in [일본, 인도네시아], 국가2 in [일본,인도네시아}
        inputCost2.value = inputCost1.value*country1.value.deal_bas_r.replace(',', '')/country2.value.deal_bas_r.replace(',', '')*100
    } else {
        inputCost2.value = inputCost1.value*country1.value.deal_bas_r.replace(',', '')/country2.value.deal_bas_r.replace(',', '')
    }
    inputCost2.value = Math.round(inputCost2.value * 100) / 100

}

// 국가1 입력금액 변경
const changeCost2 = function() {
    if ((country2.value.cur_unit.includes('(') === false) && country1.value.cur_unit.includes('(') === true ) {  // 국가2 not in [일본, 인도네시아], 국가1 in [일본,인도네시아}
        inputCost1.value = inputCost1.value*country2.value.deal_bas_r.replace(',', '')/country1.value.deal_bas_r.replace(',', '')*100
    } else {
        inputCost1.value = inputCost1.value*country2.value.deal_bas_r.replace(',', '')/country1.value.deal_bas_r.replace(',', '')
    }
    inputCost1.value = Math.round(inputCost1.value * 100) / 100
}


// 통화단위 처리 (유로, 위안화)
const currencyUnit1 = computed(() => (cur_nm) => {
    return cur_nm.split(' ')[1]?cur_nm.split(' ')[1]:cur_nm
})

const currencyUnit2 = computed(() => (cur_nm) => {
    return cur_nm.split(' ')[1]?cur_nm.split(' ')[1]:cur_nm
})


// 초기화면(국가, 금액 설정 x)에서 국가 두개 선택시 [국가1, 금액:1], [국가2, 금액:계산된금액] 뜨도록
watch([country1, country2], ([newCountry1, newCountry2]) => {
    if (country1.value !== null && country2.value !== null && inputCost1.value === 0 && inputCost2.value === 0) {
        inputCost1.value = 1
        changeCost1()
    }
})

// 국가1 변경 -> 국가2 금액 변경
watch(country1, (newCountry1) => {
    if (country1.value !== null && country2.value !== null && inputCost1.value !== 0) {
        changeCost1()
    }
})

// 국가2 변경 -> 국가2 금액 변경
watch(country2, (newCountry1) => {
    if (country1.value !== null && country2.value !== null && inputCost1.value !== 0) {
        changeCost1()
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
    width: 205px;
    height: 205px;
}
.second-country {
    border: 1px solid gray;
    margin: 10px;
    padding: 10px;
    width: 205px;
    height: 205px;
}
</style>