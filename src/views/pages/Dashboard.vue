<template>
  <div class="container mt-4">
    <h2>Admin Dashboard</h2>

    <form @submit.prevent="addProduct" class="mb-4">
      <input v-model="newProduct.name" placeholder="Product Name" class="form-control mb-2" />
      <input
        v-model.number="newProduct.price"
        type="number"
        placeholder="Price"
        class="form-control mb-2"
      />
      <input v-model="newProduct.image" placeholder="Image URL" class="form-control mb-2" />
      <button class="btn btn-success">Add Product</button>
    </form>

    <div class="row">
      <div v-for="p in products" :key="p.id" class="col-md-4 mb-3">
        <div class="card h-100">
          <img :src="p.image" class="card-img-top" />
          <div class="card-body d-grid grid-rows-2 gap-2">
            <div>
              <h5 class="card-title">{{ p.name }}</h5>
              <p>${{ p.price }}</p>
            </div>
            <div class="align-content-end text-center">
              <button class="btn btn-danger me-1" @click="deleteProduct(p.id ?? '')">Delete</button>
              <RouterLink :to="`/admin/edit-product/${p.id}`" class="btn btn-warning">
                Edit
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'AdminDashboard' })
import { ref, onMounted } from 'vue'
import { db } from '@/firebase'
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import type { Product } from '@/types/interface'

// interface Product {
//   id?: string
//   name: string
//   price: number
//   image: string
// }

const products = ref<Product[]>([])
const newProduct = ref<Product>({
  id: '',
  name: '',
  price: 0,
  image: '',
})

const fetchProducts = async () => {
  const snapshot = await getDocs(collection(db, 'products'))
  products.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product)
}

const addProduct = async () => {
  if (!newProduct.value.name || !newProduct.value.image) return
  await addDoc(collection(db, 'products'), {
    name: newProduct.value.name,
    price: newProduct.value.price,
    image: newProduct.value.image,
  })
  newProduct.value = { id: '', name: '', price: 0, image: '' }
  await fetchProducts()
}

const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, 'products', id))
  await fetchProducts()
}

onMounted(() => {
  fetchProducts()
})
</script>
