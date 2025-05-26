<template>
  <nav class="d-flex gap-2">
    <!-- Other nav links -->
    <template v-if="auth.user">
      <RouterLink v-if="!auth.isAdmin" to="/">Home</RouterLink>
      <RouterLink v-if="auth.isLoggedIn && !auth.isAdmin" to="/order-history">My Orders</RouterLink>
      <RouterLink v-if="auth.isLoggedIn && !auth.isAdmin" to="/cart">My Cart</RouterLink>
      <RouterLink v-if="auth.isAdmin" to="/admin">Admin Dashboard</RouterLink>
      <RouterLink v-if="!auth.isLoggedIn" to="/login">Login</RouterLink>
      <button v-if="auth.isLoggedIn" @click="logout">Logout</button>
    </template>
    <template v-else>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/signup">Sign Up</RouterLink>
    </template>
  </nav>
  <router-view />
  <!-- This line is required! -->
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  router.push('/')
}
</script>
