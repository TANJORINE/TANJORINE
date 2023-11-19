<template>
  <div>
    <p>{{ comment.id }}</p>
    <p>{{ comment.content }}</p>
    <hr>
  </div>
</template>

<script setup>

defineProps({
  comment: Object,
})
</script>
