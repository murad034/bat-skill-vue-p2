<script setup>
import {
  defineProps,
  ref,
  defineEmits,
  onMounted,
  onBeforeMount,
  onUnmounted,
  onUpdated,
  computed,
} from "vue";
import moment from "moment";
import { useStore } from "vuex";

const store = useStore();

const prop = defineProps({
  postCount: Number,
  currentComp: String,
});

const emit = defineEmits({
  postCreate: null,
});

const formData = ref({
  title: "",
  content: "",
});

// const postTitle = computed(() => {
//   store.getters["posts/getPostTitle"];
// });
// const postContent = computed(() => {
//   store.getters["getPostContent"];
// });

const postCount = ref(prop.postCount);
const currentComp = ref(prop.currentComp);

function postCreate(event) {
  //event.preventDefault();
  //console.log(formData);
  // const post = {
  //   id: postCount.value + 1,
  //   title: formData.value.title,
  //   content: formData.value.content,
  //   likes: 0,
  //   comments: [],
  //   newComment: "",
  //   commentSection: true,
  //   //date: new Date(),
  //   date: moment().format("YYYY-MM-DD HH:mm:ss"),
  // };

  // emit("postCreate", post);

  store.commit("posts/createPost", {
    title: formData.value.title,
    content: formData.value.content,
  });

  formData.value.title = "";
  formData.value.content = "";

  currentComp.value = "posts";
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
});

// function updatePostTitle(event) {
//   store.commit("posts/updatePostTitle", event.target.value);
// }

// function updatePostContent(event) {
//   store.commit("posts/updatePostContent", event.target.value);
// }

const postTitle = computed({
  get() {
    return store.getters["posts/getPostTitle"];
  },
  set() {
    return store.commit("posts/updatePostTitle", event.target.value);
  },
});

const postContent = computed({
  get() {
    return store.getters["posts/getPostContent"];
  },
  set() {
    return store.commit("posts/updatePostContent", event.target.value);
  },
});
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
                <!-- <input
                  type="text"
                  class="form-control"
                  id="title"
                  :value="postTitle"
                  @input="updatePostTitle"
                  placeholder="Enter the title"
                /> -->
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="postTitle"
                  placeholder="Enter the title"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <!-- <textarea
                  class="form-control"
                  id="content"
                  rows="3"
                  :value="postContent"
                  @input="updatePostContent"
                  placeholder="Enter the content"
                ></textarea> -->
                <textarea
                  class="form-control"
                  id="content"
                  rows="3"
                  v-model="postContent"
                  placeholder="Enter the content"
                  required
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
