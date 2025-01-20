<script setup>
import { watch, computed, ref, provide } from "vue";
import moment from "moment";
import Posts from "./components/Posts.vue";
import CreatePost from "./components/CreatePost.vue";
import LayoutContent from "./components/LayoutContent.vue";

import { useStore } from "vuex";

const store = useStore();

// const posts = ref(store.state.posts);
const posts = ref(store.getters["posts/getPosts"]);
// console.log(posts);

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

// function postCreate(post) {
//   posts.value.push(post);
//   currentComp.value = "posts";
// }

function deleteComment(postIndex, commentIndex) {
  // console.log(index, commentIndex);
  posts.value[postIndex].comments.splice(commentIndex, 1);
}

// function commentCreate(index) {
//   posts.value[index].comments.push({
//     id: posts.value[index].comments.length + 1,
//     user: "Rafik Islam",
//     content: posts.value[index].newComment,
//     date: moment().format("YYYY-MM-DD HH:mm:ss"),
//   });

//   posts.value[index].newComment = "";
//   posts.value[index].commentSection = true;
// }

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
  <LayoutContent
    :currentComp="currentComp"
    @changeComp="(comp) => (currentComp = comp)"
  >
    <!-- design and style fall through property -->
    <CreatePost
      v-if="currentComp == 'create-post'"
      :currentComp="currentComp"
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
