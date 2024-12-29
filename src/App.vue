<script setup>
import { watch, computed, ref } from "vue";
import moment from "moment";

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

// reverse post using computed property

const reversePosts = computed(() => {
  //console.log("just computed testing");
  return [...posts.value].reverse();
});

// function reversePosts() {
//   console.log("just method testing");
//   return [...posts.value].reverse();
// }

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

  <div class="posts mt-4">
    <div class="container">
      <div class="nav nav-tabs mb-4">
        <h3>
          Posts
          <span :class="{'text-danger' : posts.length <= 0}">{{ posts.length }}</span>
        </h3>
      </div>

      <div class="row">
        <div
          class="col-md-4"
          v-for="(post, index) in reversePosts"
          :key="post.id"
        >
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <h6 :style="{fontWeight: 'bold', color: 'red !important', 'color-access' : post.colorAccess}" class="card-subtitle mb-2 text-body-secondary">
                {{ moment(post.date).fromNow() }}
              </h6>
              <p class="card-text">{{ post.content }}</p>
              <p :style="{color: post.likes >= 10 ? 'red' : 'black'}" class="card-text">
                <small :class="{'color-access' : post.colorAccess}">
                  <span v-if="post.likes == 1">{{ post.likes }} like, </span>
                  <span  v-else-if="post.likes > 1"
                    >{{ post.likes }} likes,
                  </span>
                  <span v-else>No like </span>

                  <span
                    @click="
                      toggleCommentSection(reversePosts.length - (index + 1))
                    "
                  >
                    {{ post.comments.length }} comments
                  </span>
                </small>
              </p>

              <div class="comments mb-3">
                <form
                  :key="post.id"
                  v-on:submit.prevent="
                    commentCreate(reversePosts.length - (index + 1))
                  "
                >
                  <div class="comments-input d-flex mb-3">
                    <input
                      type="text"
                      class="form-control form-control-sm me-2"
                      placeholder="Write Comment"
                      v-model="post.newComment"
                    />
                    <button type="submit" class="btn btn-sm btn-success">
                      <i class="bi bi-send"></i>
                    </button>
                  </div>
                </form>

                <template v-if="post.commentSection">
                  <div
                    class="comment mb-3 ms-3"
                    v-for="(comment, commentIndex) in post.comments"
                    :key="comment.id"
                  >
                    <h6 class="card-title small">
                      {{ comment.user ? comment.user : "" }}
                      <span
                        class="text-danger float-end cursor-pointer"
                        @click="
                          deleteComment(
                            reversePosts.length - (index + 1),
                            commentIndex
                          )
                        "
                        >X</span
                      >
                    </h6>
                    <p class="card-subtitle mb-1 text-body-secondary small">
                      {{ moment(comment.date).fromNow() }}
                    </p>
                    <p class="card-text small">{{ comment.content }}</p>
                  </div>
                </template>
                <hr class="my-2 very-low-opacity" />
              </div>

              <button
                class="btn btn-sm btn-primary"
                v-on:click="
                  increaseLikeCount(reversePosts.length - (index + 1))
                "
              >
                Like
              </button>
              <button
                class="btn btn-sm btn-danger float-end"
                @click="deletePost(reversePosts.length - (index + 1))"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.very-low-opacity {
  opacity: 0.1;
}
.color-access{
  color: aqua;
}
</style>
