<template>
  <div class="page-container container mt-5">
    <h2 class="d-flex justify-content-center">Sign Up</h2>
    <form @submit.prevent="handleSignup">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input v-model="email" type="email" class="form-control" id="email" required />
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
        />
      </div>

      <button type="submit" class="btn btn-primary w-100" :disabled="loading">
        {{ loading ? 'Signing Up...' : 'Sign Up' }}
      </button>

      <div v-if="error" class="alert alert-danger mt-3">
        {{ error }}
      </div>
    </form>
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
