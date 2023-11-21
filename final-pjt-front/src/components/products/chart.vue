<template>
    <div>
        <Bar
            id="my-chart-id"
            :data="chartData"
            :options="chartOptions"
        />
    </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const chartData= {
        labels: [1,2,3,4,5,6,7],
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
                    label: 'this is test',
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
    responsive: true
    }
</script>

<style scoped>

</style>