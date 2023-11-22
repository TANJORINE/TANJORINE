<template>

</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { useProductStore } from '@/stores/product'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { computed, ref, watch } from 'vue';

const info = defineProps({
    dataInfo: Object
})
const labels = ref([])

watch(info.dataInfo, (newValue) => {
    console.log(newValue.userProd)
    console.log(newValue.userOpt)
    for (const prod in newValue.userProd) {
        labels.value.push(newValue.userProd[prod][0].fin_prdt_nm)
    }
}, {immediate:true})
const realLabels = computed(() => {
    if (labels.value != []) return labels.value
    else return []
})

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const chartData= {
        labels: labels.value,
        datasets: [
                {
                    label: 'this is test',
                    data: [65],
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',

                    ],
                    borderColor: [
                    'rgb(75, 192, 192)',

                    ],
                },
                {
                    label: 'this is2',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(201, 203, 207, 0.7)'
                    ],
                    borderColor: [
                    'rgb(75, 192, 192)',
                    'rgb(75, 192, 192)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                    ],
                },
        ]
      }
const chartOptions= {
    responsive: true,
    maintainAspectRatio: false,
    }
</script>

<style scoped>

</style>