<template>
  <nav>
    <!-- Other nav links -->
    <template v-if="auth.user">
      <div class="container d-flex justify-content-between align-items-center py-3">
        <div class="d-flex gap-2">
          <RouterLink v-if="!auth.isAdmin" to="/">Home</RouterLink>
          <RouterLink v-if="auth.isLoggedIn && !auth.isAdmin" to="/order-history"
            >My Orders</RouterLink
          >
          <RouterLink v-if="auth.isLoggedIn && !auth.isAdmin" to="/cart">My Cart</RouterLink>
          <RouterLink v-if="auth.isAdmin" to="/admin">Admin Dashboard</RouterLink>
        </div>
        <div class="d-flex gap-2">
          <RouterLink v-if="!auth.isLoggedIn" to="/login">Login</RouterLink>
          <button v-if="auth.isLoggedIn" @click="logout">Logout</button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="container d-flex justify-content-between align-items-center py-3">
        <div>
          <RouterLink to="/">Home</RouterLink>
        </div>
        <div class="d-flex gap-2">
          <RouterLink v-if="route.path !== '/login'" to="/login"
            >Login</RouterLink
          >
          <RouterLink v-if="route.path !== '/signup'" to="/signup">Sign Up</RouterLink>
        </div>
      </div>
    </template>
  </nav>
  <router-view />
  <!-- This line is required! -->
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const logout = async () => {
  await auth.logout()
  router.push('/')
}
</script>
