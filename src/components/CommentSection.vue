<script setup>
import { defineProps, ref, defineEmits, computed, watch } from "vue";
import moment from "moment";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  index: {
    required: true,
  },
});

const post = ref(props.post);
const index = ref(props.index);

watch(
  () => props.index,
  (newValue) => {
    index.value = newValue;
  }
);

watch(
  () => post.value.comments.length,
  (val) => {
    if (val > 3) {
      alert("Congratulations!! you have reached more than 3 comments");
    }
  }
);

const emits = defineEmits(["deleteComment", "commentCreate"]);

const reversedComments = computed(() => {
  return [...post.value.comments].reverse();
});
</script>

<template>
  <div class="comments mb-3">
    <form :key="post.id" v-on:submit.prevent="emits('commentCreate', index)">
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
