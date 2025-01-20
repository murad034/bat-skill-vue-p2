import "bootstrap/dist/css/bootstrap.css";
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import store from "./store";

const app = createApp(App);
app.use(router);

app.use(store);

// used provide inject

// const userName = "Md Murad Hossain";
// app.provide("userName", userName);

app.mount("#app");
