<template>
  <div>
    <h3>댓글 목록</h3>
    <CommentListItem 
      v-for="comment in store.comments"
      :key="comment.id"
      :comment="comment"
      v-if="comment.article === article.id"
    />
  </div>
</template>

<script setup>
import { useCommunityStore } from '@/stores/community';
import CommentListItem from '@/components/CommentListItem.vue'

const store = useCommunityStore()
</script>
