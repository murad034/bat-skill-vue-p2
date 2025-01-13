<script setup>
import {
  defineProps,
  ref,
  defineEmits,
  onMounted,
  onBeforeMount,
  onUnmounted,
  onUpdated,
} from "vue";
import moment from "moment";

const prop = defineProps({
  postCount: Number,
});

const emit = defineEmits({
  postCreate: null,
});

const formData = ref({
  title: "",
  content: "",
});

const postCount = ref(prop.postCount);

function postCreate(event) {
  //event.preventDefault();
  //console.log(formData);
  const post = {
    id: postCount.value + 1,
    title: formData.value.title,
    content: formData.value.content,
    likes: 0,
    comments: [],
    newComment: "",
    commentSection: true,
    //date: new Date(),
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
  };

  formData.value.title = "";
  formData.value.content = "";

  emit("postCreate", post);
}

onMounted(() => {
  console.log("onMounted");
});
onBeforeMount(() => {
  console.log("onBeforeMount");
});
onUnmounted(() => {
  console.log("onUnmounted");
});
onUpdated(() => {
  console.log("create post onUpdated");
})
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Create a New Post</h5>
            <form @submit.prevent="postCreate($event)">
              <div class="mb-3">
                {{ formData.title }}
              </div>
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="formData.title"
                  placeholder="Enter the title"
                />
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea
                  class="form-control"
                  id="content"
                  rows="3"
                  v-model="formData.content"
                  placeholder="Enter the content"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
