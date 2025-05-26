<template>
  <div class="container mt-4">
    <h2>Add New Product</h2>

    <form @submit.prevent="submitProduct">
      <div class="mb-3">
        <label class="form-label">Product Name</label>
        <input v-model="name" type="text" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Price (USD)</label>
        <input v-model.number="price" type="number" min="0" class="form-control" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Image URL</label>
        <input v-model="image" type="url" class="form-control" required />
      </div>

      <button class="btn btn-primary" type="submit">Add Product</button>

      <div v-if="success" class="alert alert-success mt-3">Product added successfully!</div>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { db } from '@/firebase'
import { collection, addDoc } from 'firebase/firestore'

const name = ref('')
const price = ref(0)
const image = ref('')
const success = ref(false)
const error = ref('')

const submitProduct = async () => {
  error.value = ''
  success.value = false

  try {
    await addDoc(collection(db, 'products'), {
      name: name.value,
      price: price.value,
      image: image.value,
    })
    success.value = true

    // Reset form
    name.value = ''
    price.value = 0
    image.value = ''
  } catch (err) {
    error.value = 'Failed to add product: ' + (err as Error).message
  }
}
</script>
