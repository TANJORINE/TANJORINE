<template>
  <div>
    <!-- <button>{{ category.name }}</button> -->
    <p>카테고리 이름 : {{ category.name }}</p>
    <hr>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  category: Object,
})
</script>
