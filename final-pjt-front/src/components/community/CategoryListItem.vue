<template>
  <div>
    <!-- <button>{{ category.name }}</button> -->
    <p v-if="category.main_category"><strong>메인 카테고리</strong></p>
    <p>카테고리 이름 : {{ category.name }} </p>
    <div v-if="showEdit">
      <div>
        <label for="newName">이름 변경 : </label>
        <input v-model.trim="name" type="text" name="newName" id="newName">
        <label for="mainCategory">메인 카테고리</label>
        <input v-model="mainCategory" type="checkbox" name="mainCategory" id="mainCategory">
        <br>
      </div>
      <!-- <button @click="editCate">저장</button> -->
    </div>
    <!-- <div v-if="!showEdit"> -->
      <button @click="editCate(category.pk)">{{ showEdit?'저장':'수정' }}</button>
      <!-- <button @click="editCate">수정</button> -->
    <!-- </div> -->
    <button @click="deleteCate(category.pk)">삭제</button>
    <hr>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useCommunityStore } from '@/stores/community';
import { useUserStore } from '@/stores/user'
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL

const store = useCommunityStore()
const userStore = useUserStore()
const router = useRouter()

const showEdit = ref(false)
const isStaff = ref(false)

// defineProps({
  //   category: Object,
  // })
  
  const props = defineProps({
    category: Object,
  })
  
  const category = ref(props.category)
  console.log(category.value)
  const name = ref(category.value.name)
  const mainCategory = ref(category.value.main_category)
  
  
const editCate = function(catePk) {
  
  if (showEdit.value) {
    if (isStaff) {
      axios({
        method: 'PUT',
        url: `${API_URL}/community/category_mng/${catePk}/`,
        headers: {
          Authorization: `Token ${userStore.token}`
        },
        data: {
          name: name.value,
          main_category: mainCategory.value
        },
      })
      .then((res) => {
          // console.log(res)
          showEdit.value = !showEdit.value
          router.go()
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      alert('관리자만 수정 가능합니다.')
    }
  } else {
    showEdit.value = !showEdit.value
  }
  console.log(showEdit.value)
}


const deleteCate = function(catePk) {
  if (isStaff) {
    if (confirm("카테고리에 포함된 게시글도 함께 삭제됩니다. 삭제하시겠습니까?")){ 
      axios({
        method: 'DELETE',
        url: `${store.API_URL}/community/category_mng/${catePk}/`
      })
      .then(() => {
        alert("삭제 되었습니다.")
        router.go()
      })
      .catch(() => {
        console.log(err)
      })
  
    //  alert("완료되었습니다.");
    }else{
  
  
      alert("취소 되었습니다.");
    }
  } else {
    alert('관리자만 삭제 가능합니다.')
  }
}


onMounted(() => {
  axios({
    method: 'GET',
    url: `${store.API_URL}/accounts/user/`,
    headers: {
      Authorization: `Token ${userStore.token}`
    }
  })
  .then((res) => {
    isStaff.value = res.data.is_staff
  })
  .catch((err) => {
    console.log(err)
  })
})
</script>
