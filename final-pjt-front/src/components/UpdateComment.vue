<!-- <template>
    <div>
        <form @submit.prevent="updateComment">
            <div>
                <label for="content">내용:</label>
                <textarea v-model.trim="content" id="content"></textarea>
                <input type="submit">
            </div>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios';
import { routerKey } from 'vue-router';

const updateComment = function() {
    axios({
        method: 'PUT',
        url: `comments/<int:comment_pk>/`
    })
    .then((res) => {
        router
    })
}

</script>

<style scoped>

</style> -->