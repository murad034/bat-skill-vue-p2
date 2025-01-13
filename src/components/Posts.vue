<script setup>
import { defineProps, computed, ref, defineEmits, inject, onUpdated } from "vue";
import moment from "moment";
import CommentSection from "./CommentSection.vue";

// const props = defineProps({
//   posts: {
//     type: Array,
//     required: true,
//   },
// });

// console.log("props post len: " + props.posts.length);
// const posts = ref(props.posts);

// use provide and inject instead props for removing extra managing hassle
const posts = inject("posts");

// console.log("post len: " + posts.value.length);

//reversePosts.length - (index + 1)

// reverse post using computed property

const reversePosts = computed(() => {
  // console.log("just computed testing");
  return [...posts.value].reverse();
});

// function reversePosts() {
//   console.log("just method testing");
//   return [...posts.value].reverse();
// }

// const emits = defineEmits(["deletePost", "deleteComment"]);
const emit = defineEmits({
  deletePost: null,
  commentCreate: null,
  increaseLikeCount: null,
  deleteComment: (index, commentIndex) => {
    if (typeof index === "number" && typeof commentIndex === "number") {
      return true;
    }
    return false;
  },
});

function deletePost(index) {
  emit("deletePost", index);
}

onUpdated(() => {
  console.log("posts onUpdated");
});
</script>

<template>
  <div class="posts mt-4">
    <div class="container">
      <div class="nav nav-tabs mb-4">
        <h3>
          Posts
          <span :class="{ 'text-danger': posts.length <= 0 }">{{
            posts.length
          }}</span>
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
              <h6
                :style="{
                  fontWeight: 'bold',
                  color: 'red !important',
                  'color-access': post.colorAccess,
                }"
                class="card-subtitle mb-2 text-body-secondary"
              >
                {{ moment(post.date).fromNow() }}
              </h6>
              <p class="card-text">{{ post.content }}</p>
              <p
                :style="{ color: post.likes >= 10 ? 'red' : 'black' }"
                class="card-text"
              >
                <small :class="{ 'color-access': post.colorAccess }">
                  <span v-if="post.likes == 1">{{ post.likes }} like, </span>
                  <span v-else-if="post.likes > 1"
                    >{{ post.likes }} likes,
                  </span>
                  <span v-else>No like </span>

                  <span
                    @click="
                      $emit(
                        'toggleCommentSection',
                        reversePosts.length - (index + 1)
                      )
                    "
                  >
                    {{ post.comments.length }} comments
                  </span>
                </small>
              </p>

              <CommentSection
                :post="post"
                :index="reversePosts.length - (index + 1)"
                @deleteComment="
                  (index, commentIndex) =>
                    emit('deleteComment', index, commentIndex)
                "
                @commentCreate="(index) => emit('commentCreate', index)"
                v-model:comment="post.newComment"
              />

              <button
                class="btn btn-sm btn-primary"
                v-on:click="
                  //   increaseLikeCount(reversePosts.length - (index + 1))
                  // $emit('increaseLikeCount', reversePosts.length - (index + 1))
                  emit('increaseLikeCount', reversePosts.length - (index + 1))
                "
              >
                Like
              </button>
              <button
                class="btn btn-sm btn-danger float-end"
                @click="
                  deletePost(reversePosts.length - (index + 1))
                  //   $emit('deletePost', reversePosts.length - (index + 1))
                "
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

<style scoped></style>
