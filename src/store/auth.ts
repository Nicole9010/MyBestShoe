import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { ref, computed, onMounted } from 'vue'
import { auth } from '@/firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAdmin = ref(false)
  const isLoggedIn = computed(() => user.value !== null)
  onMounted(() => {
    init()
  })

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    user.value = userCredential.user
    isAdmin.value = user.value?.email === 'admin@mybestshoe.com'
  }

  const logout = async () => {
    await signOut(auth)
    user.value = null
    isAdmin.value = false
  }

  const init = () => {
    onAuthStateChanged(auth, (u) => {
      user.value = u
      isAdmin.value = u?.email === 'admin@mybestshoe.com' // Admin account
      console.log('Auth state changed:', u?.email)
    })
  }

  return { user, isAdmin, isLoggedIn, login, logout, init }
})
