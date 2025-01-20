<script setup>
import { computed, defineProps, inject, ref } from "vue";

const prop = defineProps({
  //   userName: String,
  currentComp: String,
});

// const userName = ref(prop.userName);

// const userName = inject("userName");

const currentComponent = computed(() => prop.currentComp);
// console.log(currentComponent.value);
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
            <a
              class="nav-link"
              :class="{ active: currentComponent === 'posts' }"
              aria-current="page"
              href="#"
              @click="$emit('changeComp', 'posts')"
              >Post
            </a>
          </li>
          <li class="nav-item">
            <a
              :class="{
                'nav-link': true,
                active: currentComponent === 'create-post',
              }"
              href="#"
              @click="$emit('changeComp', 'create-post')"
              >Create Post</a
            >
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
              {{ $store.state.userName }}
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

  <slot />
</template>

<style scoped></style>
