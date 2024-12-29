<script setup>
import { watch, computed, ref } from "vue";
import moment from "moment";
import Posts from "./components/Posts.vue";

const posts = ref([
  {
    id: 1,
    title: "Post 1",
    content:
      "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    likes: 0,
    comments: [
      {
        id: 1,
        content: "This is a comment.",
        user: "John Doe",
        date: "2024-05-24 11:00:00",
      },
    ],
    newComment: "",
    commentSection: true,
    date: "2024-05-24 11:00:00",
  },
  {
    id: 2,
    title: "Post 2",
    content:
      "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    likes: 0,
    comments: [],
    commentSection: false,
    newComment: "",
    date: "2023-05-24 11:00:00",
  },
  {
    id: 3,
    title: "Post 3",
    content:
      "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    likes: 3,
    comments: [],
    commentSection: true,
    newComment: "",
    date: "2022-05-24 11:00:00",
  },
]);

watch(
  () => posts.value.length,
  (newValue, oldValue) => {
    // console.log(newValue, oldValue);
    //console.log("wathcer method");
    if (newValue > oldValue) {
      alert("New post has been created successfully");
    }
  },
  { immediate: true }
);

watch(
  () => posts.value,
  (newValue, oldValue) => {
    //console.log("hell", newValue, oldValue);
    posts.value.forEach((post) => {
      if (post.likes > 10 && !post.likeConfirmation) {
        post.likeConfirmation = true;
        post.colorAccess = true;
        alert("Congratulations!! successfully crossed 10 likes");
      }
    });
  },
  {
    immediate: true,
    deep: true
  }
);

// const userName = ref("");
const firstname = "Rafiqul Isalm";
const lastname = "Murad";

//userName.value = "Md Murad Hossain";

const userName = computed(() => {
  return firstname + lastname;
});
const likeCount = ref(0);

const formData = ref({
  title: "",
  content: "",
});

function increaseLikeCount(index) {
  posts.value[index].likes++;
}

function deletePost(index) {
  posts.value.splice(index, 1);
}

function postCreate(event) {
  //event.preventDefault();
  //console.log(formData);
  posts.value.push({
    id: posts.value.length + 1,
    title: formData.value.title,
    content: formData.value.content,
    likes: 0,
    comments: [],
    newComment: "",
    commentSection: true,
    //date: new Date(),
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
  });
  formData.value.title = "";
  formData.value.content = "";
}

function deleteComment(index, commentIndex) {
  // console.log(index, commentIndex);
  const post = posts.value[index].comments.splice(commentIndex, 1);
}

function commentCreate(index) {
  const post = posts.value[index];
  const len = post.comments.length;
  post.comments.push({
    id: len + 1,
    user: "Rafik Islam",
    content: post.newComment,
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
  });
  //console.log(post.comments);
  post.newComment = "";
  post.commentSection = true;
}

function toggleCommentSection(postIndex) {
  if (posts.value[postIndex].commentSection) {
    posts.value[postIndex].commentSection = false;
  } else {
    posts.value[postIndex].commentSection = true;
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
      <a class="navbar-brand" href="#">BAT Blog</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ userName }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li><a class="dropdown-item" href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

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

  <Posts
    :posts="posts"
    @increaseLikeCount="increaseLikeCount"
    @deletePost="deletePost"
    @deleteComment="deleteComment"
    @commentCreate="commentCreate"
    @toggleCommentSection="toggleCommentSection"
  />
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.very-low-opacity {
  opacity: 0.1;
}
.color-access {
  color: aqua;
}
</style>
