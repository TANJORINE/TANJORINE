<template>
  <div>
    <!-- <ArticleListItem 
      v-for="article in store.articles"
      :key="article.id"
      :articles="store.articles"
      :article="article"
      :cate="selectCate"
    /> -->

    <!-- <div v-for="article in store.articles" :value="article.category.pk">

      {{ article }}
    </div>

    <div v-for="category in store.categories">
      {{category}}
    </div> -->

    <!-- {{ store.article }} -->

    <div v-for="article in store.articles">
      <div v-if="cate === '전체'">
      <div v-if="article">
        <p class="article-num">No. {{ article.id }}</p>
        <RouterLink class="title" :to="{ name: 'detail', params: { id: article.id } }">
          {{ article.title }}
        </RouterLink>
        <p class="content">{{ article.content.length>20?article.content.slice(0, 20) + '...':article.content }}</p>
        <p class="date-and-author">작성일 : {{ article.created_at.slice(0, 10) }} | 작성자 : {{ article.user.username }}</p>
        <hr>
      </div>
      <div v-else>
        작성된 게시글이 없습니다.
      </div>
    </div>

    <div v-else-if="cate.name === article.category.name">
      <p class="article-num">No. {{ article.id }}</p>
      <RouterLink class="title" :to="{ name: 'detail', params: { id: article.id } }">
        {{ article.title }}
      </RouterLink>
      <p class="content">{{ article.content.length>20?article.content.slice(0, 20) + '...':article.content }}</p>
      <p class="date-and-author">작성일 : {{ article.created_at.slice(0, 10) }} | 작성자 : {{ article.user.username }}</p>
      <hr>
    </div>
    <div v-else>
      <div v-if="!Object.values(store.articles).filter((item) => item.category.name === cate.name).length">
        작성된 게시글이 없습니다.
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { useCommunityStore } from '@/stores/community';
// import ArticleListItem from '@/components/ArticleListItem.vue'
import { onMounted } from 'vue';

const store = useCommunityStore()

defineProps({
  cate: Object,
})

onMounted(() => {
  store.getCategories()
})
</script>

<style scoped>
.article-num{
  font-size: 12px;
  color: gray;
  margin: 10px 0px;
}
.title{
  font-size: 20px;
  /* margin: 0px; */
  font-weight: 1000;
  text-decoration: none;
  color: black;
}
.content{
  font-size: 15px;
  margin: 0px;
}
.date-and-author{
  text-align: end;
  font-size: 12px;
  color: gray;
  margin: 0px;
}

</style>