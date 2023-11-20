import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCommunityStore = defineStore('community', () => {
  const API_URL = import.meta.env.VITE_API_URL
  const articles = ref([])
  const comments = ref([])

  const getArticles = function() {
    axios({
      method: 'GET',
      url: `${API_URL}/community/articles/`
    })
    .then((res) => {
      articles.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  const getComments = function() {
    axios({
      method: 'GET',
      url: `${API_URL}/community/comments/`
    })
    .then((res) => {
      comments.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return { articles, getArticles, comments, getComments }
}, { persist: true })