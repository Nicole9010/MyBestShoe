// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/store/auth'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

const auth = useAuthStore()
auth.init()  // ✅ Initialize Firebase Auth listener BEFORE using router

app.use(router)
app.mount('#app')
