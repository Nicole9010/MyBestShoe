<template>
  <div class="container mt-4">
    <h2>My Best Shoe Store</h2>
    <div class="row">
      <div v-for="shoe in shoes" :key="shoe.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <img :src="shoe.image" class="card-img-top" />
          <div class="card-body d-grid grid-rows-2 gap-2">
            <div>
              <h5 class="card-title">{{ shoe.name }}</h5>
              <p class="card-text">${{ shoe.price.toFixed(2) }}</p>
            </div>

            <div class="align-content-end text-center">
              <div class="d-flex justify-content-center align-items-center gap-2">
                <button
                  class="btn btn-outline-danger btn-sm"
                  @click="decreaseQuantity(shoe)"
                  :disabled="getQuantity(shoe.id) === 0"
                >
                  <i class="bi bi-dash"></i>
                </button>

                <span>{{ getQuantity(shoe.id) }}</span>

                <button class="btn btn-outline-success btn-sm" @click="increaseQuantity(shoe)">
                  <i class="bi bi-plus"></i>
                </button>
              </div>
              <div class="mt-2">
                <button class="btn btn-success" @click="addToCart(shoe)">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'ShopPage' })
import { ref, onMounted } from 'vue'
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useCartStore } from '../../store/cart'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'
import type { Product } from '@/types/interface'

// export interface Product {
//   id: string
//   name: string
//   price: number
//   image: string
//   // Add other fields as needed
// }

const router = useRouter()
const auth = useAuthStore()
const shoes = ref<Product[]>([])
const cart = useCartStore()

const fetchShoes = async () => {
  const snapshot = await getDocs(collection(db, 'products'))
  shoes.value = snapshot.docs.map((doc) => {
    const data = doc.data() as Product
    return { ...data, id: doc.id }
  })
}

onMounted(() => {
  fetchShoes()
})

// Quantity logic
const getQuantity = (productId: string) => {
  const item = cart.items.find((item) => item.id === productId)
  return item ? item.quantity : 0
}

function addToCart(shoe: Product) {
  if (getQuantity(shoe.id) === 0) {
    cart.addItem(shoe)
    alert('Added to cart!')
    if (auth.isAdmin) {
      router.push('/admin')
    } else {
      router.push('/shop')
    }
  } else {
    alert('This item is already in your cart!')
  }
}

const increaseQuantity = (shoe: Product) => {
  cart.addItem(shoe)
}

const decreaseQuantity = (shoe: Product) => {
  cart.removeItem(shoe.id)
}

</script>
