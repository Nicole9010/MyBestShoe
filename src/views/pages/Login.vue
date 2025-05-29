<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow p-4" style="min-width: 450px; max-width: 500px; width: 100%">
      <h2 class="text-center mb-3">Login</h2>
      <p class="text-center text-muted mb-4">Welcome back! Please login to your account.</p>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            required
            autocomplete="username"
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            required
            autocomplete="current-password"
          />
        </div>
        <button class="btn btn-primary w-100 mb-2" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
        <div v-if="error" class="alert alert-danger mt-2">
          {{ error }}
        </div>
      </form>
      <div class="text-center mt-3">
        <span>Don't have an account?</span>
        <router-link to="/signup" class="ms-1">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineOptions } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'

defineOptions({
  name: 'LoginPage',
})

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    router.push(auth.isAdmin ? '/admin' : '/shop')
  } catch (e: unknown) {
    if (e instanceof Error) {
      error.value = e.message
    } else {
      error.value = 'Login failed.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.page-container {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
