<template>
  <div>
    <!-- <h3>댓글 목록</h3> -->
    <hr>
    <!-- {{ article }} -->
    <!-- <p>{{ articleId }}</p> -->
    <!-- {{ store.comments }} -->
    <CommentListItem 
      v-for="comment in store.comments"
      :key="comment.id"
      :value="comment.article.pk"
      :comment="comment"
      />
    <!-- <p>{{ commentArticleId }}</p>
    <p>{{ articleId }}번</p> -->
      <!-- v-if="comment.article.id === articleId" -->
      <!-- v-if="comment.article === article.id" -->
  </div>
</template>

<script setup>
import { useCommunityStore } from '@/stores/community';
import CommentListItem from '@/components/CommentListItem.vue'
import { onMounted } from 'vue';

const store = useCommunityStore()

onMounted(() => {
  store.getComments()
})
</script>
