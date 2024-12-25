<script setup>
// import { ref } from 'vue';
// import moment from 'moment';

// const posts = ref([
//   {
//     id: 1,
//     title: 'Post 1',
//     content: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
//     likes: 3,
//     comments: [],
//     date: '2024-05-24 11:00:00'
//   },
//   {
//     id: 2,
//     title: 'Post 2',
//     content: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
//     likes: 3,
//     comments: [],
//     date: '2024-05-24 11:00:00'
//   },
//   {
//     id: 3,
//     title: 'Post 3',
//     content: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
//     likes: 3,
//     comments: [],
//     date: '2024-05-24 11:00:00'
//   }
// ]);
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
      <a class="navbar-brand" href="#">BAT Blog</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              John Doe
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

  <!-- <div class="container mt-4">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Create a New Post</h5>
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" placeholder="Enter the title">
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">Content</label>
                <textarea class="form-control" id="content" rows="3" placeholder="Enter the content"></textarea>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <div class="posts mt-4">
    <div class="container">
      <div class="nav nav-tabs mb-4">
        <h3>Posts</h3>
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Post 1</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">5 minutes ago</h6>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.</p>
              <p class="card-text"><small>3 likes, 2 comments</small></p>

              <!-- <div class="comments mb-3">
                <div class="comments-input d-flex mb-3">
                  <input type="text" class="form-control form-control-sm me-2" placeholder="Write Comment">
                  <button class="btn btn-sm btn-success"><i class="bi bi-send"></i></button>
                </div>

                <div class="comment mb-3 ms-3">
                  <h6 class="card-title small">John Doe <span class="text-danger float-end cursor-pointer">X</span></h6>
                  <p class="card-subtitle mb-1 text-body-secondary small">5 minutes ago</p>
                  <p class="card-text small">This is a comment.</p>
                </div>
                <hr class="my-2 very-low-opacity">
                <div class="comment mt-3 ms-3">
                  <h6 class="card-title small">John Doe <span class="text-danger float-end cursor-pointer">X</span></h6>
                  <p class="card-subtitle mb-1 text-body-secondary small">5 minutes ago</p>
                  <p class="card-text small">This is a comment.</p>
                </div>
              </div> -->

              <button class="btn btn-sm btn-primary">Like</button>
              <button class="btn btn-sm btn-danger float-end"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Post 2</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">5 minutes ago</h6>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.</p>
              <p class="card-text"><small>3 likes, 2 comments</small></p>
              <button class="btn btn-sm btn-primary">Like</button>
              <button class="btn btn-sm btn-danger float-end"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Post 3</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">5 minutes ago</h6>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                content. This content is a little bit longer.</p>
              <p class="card-text"><small>3 likes, 2 comments</small></p>
              <button class="btn btn-sm btn-primary">Like</button>
              <button class="btn btn-sm btn-danger float-end"><i class="bi bi-trash"></i></button>
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
</style>
