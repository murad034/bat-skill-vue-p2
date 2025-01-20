<script setup>
import {
  defineProps,
  ref,
  defineEmits,
  computed,
  watch,
  defineModel,
  inject,
} from "vue";
import moment from "moment";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  // post: {
  //   type: Object,
  //   required: true,
  // },
  index: {
    type: Number,
    required: true,
  },
});

// const post = ref(props.post);
const posts = inject("posts");

const post = ref(posts.value[props.index]);

//console.log("comment post len: " + props.index);

// const index = ref(props.index);

// watch(
//   () => props.index,
//   (newValue) => {
//     index.value = newValue;
//   }
// );

const emits = defineEmits(["deleteComment", "commentCreate"]);

const reversedComments = computed(() => {
  return [...post.value.comments].reverse();
});

watch(
  () => post.value.comments.length,
  (val) => {
    if (val > 3) {
      alert("Congratulations!! you have reached more than 3 comments");
    }
  }
);

// v-model property
// two way binding between parent and child component
const newComment = defineModel("comment");

async function commentCreate(index) {
  const comment = {
    id: post.value.comments.length + 1,
    // user: store.state.userName,
    content: newComment.value,
    date: moment().format("YYYY-MM-DD HH:mm:ss"),
  };

  // await store.commit("addComment", {
  await store.dispatch("posts/addComment", {
    postId: post.value.id,
    comment: comment,
  });
  newComment.value = "";
  // post.value.commentSection = true;

  //console.log(post.value.comments[post.value.comments.length - 1]);
}
</script>

<template>
  <div class="comments mb-3">
    <!-- <form v-on:submit.prevent="emits('commentCreate', index)"> -->
    <form v-on:submit.prevent="commentCreate(index)">
      <div class="comments-input d-flex mb-3">
        <input
          type="text"
          class="form-control form-control-sm me-2"
          placeholder="Write Comment"
          v-model="newComment"
        />
        <button type="submit" class="btn btn-sm btn-success">
          <i class="bi bi-send"></i>
        </button>
      </div>
    </form>

    <template v-if="post.commentSection">
      <div
        class="comment mb-3 ms-3"
        v-for="(comment, commentIndex) in reversedComments"
        :key="comment.id"
      >
        <h6 class="card-title small">
          {{ comment.user ? comment.user : "" }}
          <span
            class="text-danger float-end cursor-pointer"
            @click="
              emits(
                'deleteComment',
                index,
                reversedComments.length - (commentIndex + 1)
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
</template>

<style scoped></style>
