<template>
    <div>
        <button class="btn btn-primary" @click="click">
            Load
        </button>
    </div>
</template>

<script setup>
import axios from 'axios';

const click = function() {
    axios({
        method:'get',
        url: `http://127.0.0.1:8000/products/load/`,
    })
}
</script>

<style lang="scss" scoped>

</style>