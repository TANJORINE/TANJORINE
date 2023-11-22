<template>
    <div>
        <Bar 
        :data="makeChart"
        />
    </div>
</template>

<script setup>
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'
import { useProductStore } from '@/stores/product'
import { computed } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const prodStore = useProductStore()
const makeChart = computed(() => {
        let labels = []
        let datasets = [
            {
                label: '기본 금리',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    ],
                borderColor: [
                    'rgb(75, 192, 192)',
                    ],
            },
            {
                label: '최대 금리',
                data: [],
                backgroundColor: [
                    'rgba(100, 199, 132, 0.7)',
                    ],
                borderColor: [
                    'rgb(75, 192, 192)',
                    ],
            }
        ]
        if (1) {
            return {
                labels: labels,
                datasets: datasets
            }
        } else {
            for (const prod in prods) {
                labels.push(prods[prod][0].fin_prdt_nm)
                datasets[0].data.push(opts[prod].intr_rate)
                datasets[1].data.push(opts[prod].intr_rate2)
            }
            console.log(labels)
            console.log(datasets)
        }


})
const chartOptions= {
    responsive: true,
    maintainAspectRatio: false,
    }
</script>

<style scoped>

</style>