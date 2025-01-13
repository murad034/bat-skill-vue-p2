import 'bootstrap/dist/css/bootstrap.css'
import '@popperjs/core'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const userName = "Md Murad Hossain";
app.provide('userName', userName)

app.use(router)

app.mount('#app')
