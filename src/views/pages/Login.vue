<template>
  <div class="container mt-5" style="max-width: 400px">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>

        <input v-model="password" type="password" class="form-control" required />
      </div>
      <button class="btn btn-primary w-100">Login</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineOptions } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth' // if you're nested deeper

defineOptions({
  name: 'LoginPage',
})

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

async function handleLogin() {
  await auth.login(email.value, password.value) // await the login
  console.log('auth.isAdmin:', auth.isAdmin) // unwrap the ref

  // Redirect after value is available
  router.push(auth.isAdmin ? '/admin' : '/shop')
}
</script>
