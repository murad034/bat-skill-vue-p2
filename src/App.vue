<script setup>
import { watch, computed, ref, provide } from "vue";
import moment from "moment";
import Posts from "./components/Posts.vue";
import CreatePost from "./components/CreatePost.vue";
import LayoutContent from "./components/LayoutContent.vue";

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

// const userName = ref("");
const firstname = "Rafiqul Isalm";
const lastname = "Murad";

//userName.value = "Md Murad Hossain";

const userName = computed(() => {
  return firstname + lastname;
});

function increaseLikeCount(index) {
  posts.value[index].likes++;
}

function deletePost(index) {
  posts.value.splice(index, 1);
}

function postCreate(post) {
  posts.value.push(post);
  currentComp.value = "posts";
}

function deleteComment(postIndex, commentIndex) {
  // console.log(index, commentIndex);
  posts.value[postIndex].comments.splice(commentIndex, 1);
}

function commentCreate(index) {
  posts.value[index].comments.push({
    id: posts.value[index].comments.length + 1,
    user: "Rafik Islam",
    content: posts.value[index].newComment,
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
  });
  posts.value[index].newComment = "";
  posts.value[index].commentSection = true;
}

function toggleCommentSection(postIndex) {
  if (posts.value[postIndex].commentSection) {
    posts.value[postIndex].commentSection = false;
  } else {
    posts.value[postIndex].commentSection = true;
  }
}

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
  () => {
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
    // immediate: true,
    deep: true,
  }
);

// use provide and inject instead props for removing extra managing hassle
provide("posts", posts);

const currentComp = ref("posts");
</script>

<template>
  <LayoutContent :currentComp="currentComp" @changeComp="(comp) => (currentComp = comp)">
    <!-- design and style fall through property -->
    <CreatePost
      v-if="currentComp == 'create-post'"
      :postCount="posts.length"
      @postCreate="postCreate"
      class="bg-light p-4"
      style="border-radius: 15px"
    />

    <Posts
      v-else-if="currentComp == 'posts'"
      @increaseLikeCount="increaseLikeCount"
      @deletePost="deletePost"
      @deleteComment="deleteComment"
      @commentCreate="commentCreate"
      @toggleCommentSection="toggleCommentSection"
    />
  </LayoutContent>
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
