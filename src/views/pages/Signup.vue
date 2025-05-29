<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow p-4" style="min-width: 450px; max-width: 500px; width: 100%">
      <h2 class="text-center mb-3">Sign Up</h2>
      <p class="text-center text-muted mb-4">Create your account to start shopping!</p>
      <form @submit.prevent="handleSignup">
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
            minlength="6"
            autocomplete="new-password"
          />
        </div>
        <button type="submit" class="btn btn-primary w-100 mb-2" :disabled="loading">
          {{ loading ? 'Signing Up...' : 'Sign Up' }}
        </button>
        <div v-if="error" class="alert alert-danger mt-2">
          {{ error }}
        </div>
      </form>
      <div class="text-center mt-3">
        <span>Already have an account?</span>
        <router-link to="/login" class="ms-1">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

defineOptions({
  name: 'SignUpPage',
})

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const router = useRouter()
const auth = getAuth()

async function handleSignup() {
  error.value = ''
  loading.value = true

  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    router.push('/') // redirect to home after signup
  } catch (e: unknown) {
    if (e instanceof Error) {
      error.value = e.message
    } else {
      error.value = 'Failed to sign up.'
    }
  } finally {
    loading.value = false
  }
}
</script>
