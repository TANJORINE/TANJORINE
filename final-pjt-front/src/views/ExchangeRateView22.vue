<template>
    <div>
      <h1>환율 계산기</h1>
      <p v-if="rate">현재 환율은 {{ rate }}입니다.</p>
      <div>
        <select v-model="cost1">
          <option
            v-for="payment in payments"
            :key="payment"
            :value="payment"
          >
            {{ payment }}
          </option>
        </select>
        :
        <input
          type="text"
          v-model.number="inputcost1"
          @change="changeCost2((inputcost1 / rate) * currencyUnit)"
        />
      </div>
      <div>
        <select v-model="cost2">
          <option
            v-for="payment in payments"
            :key="payment"
            :value="payment"
          >
            {{ payment }}
          </option>
        </select>
        :
        <input
          type="text"
          v-model.number="inputcost2"
          @change="changeCost1((inputcost2 * rate) / currencyUnit)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from "vue";
  import axios from "axios";
  // prettier-ignore
  const payments = ref(["EUR","JPY","GBP","CHF","CAD","AUD","CNY","HKD","SEK","NZD","KRW","SGD","NOK","MXN","INR","RUB","ZAR","TRY","BRL","AED","BHD","BND","CNH","CZK","DKK","IDR","ILS","MYR","QAR","SAR","THB","TWD","CLP","COP","EGP","HKD","HUF","KWD","OMR","PHP","PLN","PKR","RON","BRL","BDT","DZD","ETB","FJD","JOD","KES","KHR","KZT","LKR","LYD","MMK","MNT","MOP","NPR","TZS","UZS","VND",
  ]);
  
  const cost1 = ref(null);
  const cost2 = ref(null);
  
  // 두 환율 옵션이 선택되었을 때에 환율 금액 정보 가져오기
  watch([cost1, cost2], ([newOption1, newOption2]) => {
    if (newOption1 !== null && newOption2 !== null) {
      axios({
        method: 'GET',
        url: `https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.${newOption1}${newOption2}`,
      })
        .then(({data}) => {
        //   console.log(res)
          rate.value = data[0]?.basePrice || -1;
          currencyUnit.value = data[0]?.currencyUnit || 1;
          console.log(data)
          console.log(data[0])
          console.log(data[0].basePrice)
        })
        .catch((err) => console.log(err));
    }
  });
  
  const inputcost1 = ref(0);
  const inputcost2 = ref(0);
  
  const changeCost1 = function (value) {
    inputcost1.value = value;
  };
  
  const changeCost2 = function (value) {
    inputcost2.value = value;
  };
  
  const rate = ref(null);
  const currencyUnit = ref(null);
  </script>
  
  <style scoped></style>
  