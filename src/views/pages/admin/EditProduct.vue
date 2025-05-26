<template>
  <div class="container mt-4">
    <h2>Edit Product</h2>

    <div v-if="loading">Loading...</div>
    <div v-else>
      <form @submit.prevent="updateProduct">
        <div class="mb-3">
          <label class="form-label">Product Name</label>
          <input v-model="name" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Price</label>
          <input v-model.number="price" type="number" min="0" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Image URL</label>
          <input v-model="image" type="url" class="form-control" required />
        </div>

        <button class="btn btn-primary" type="submit">Update Product</button>

        <div v-if="success" class="alert alert-success mt-3">Product updated!</div>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '@/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const productId = route.params.id as string

const name = ref('')
const price = ref(0)
const image = ref('')
const loading = ref(true)
const success = ref(false)
const error = ref('')

onMounted(async () => {
  try {
    const docRef = doc(db, 'products', productId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      name.value = data.name
      price.value = data.price
      image.value = data.image
    } else {
      error.value = 'Product not found'
    }
  } catch (err) {
    error.value = 'Failed to load product: ' + (err as Error).message
  } finally {
    loading.value = false
  }
})

const updateProduct = async () => {
  error.value = ''
  success.value = false
  try {
    const docRef = doc(db, 'products', productId)
    await updateDoc(docRef, {
      name: name.value,
      price: price.value,
      image: image.value,
    })
    success.value = true
    router.push('/admin') // Redirect to admin page after update
  } catch (err) {
    error.value = 'Failed to update: ' + (err as Error).message
  }
}
</script>
