<template>
  <div class="container mt-4">
    <h2>My Best Shoe Store</h2>
    <div class="row">
      <div v-for="shoe in shoes" :key="shoe.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <img :src="shoe.image" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ shoe.name }}</h5>
            <p class="card-text">${{ shoe.price }}</p>
            <button class="btn btn-success" @click="addToCart(shoe)">Add to Cart</button>
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
import { useCartStore } from '../../store/cart' // if you're nested deeper
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth' // if you're nested deeper
interface Product {
  id: string
  name: string
  price: number
  image: string
}

const router = useRouter()
const auth = useAuthStore()
const shoes = ref<Product[]>([])

const cart = useCartStore()

function addToCart(shoe: Product) {
  cart.addItem(shoe)
  alert('Added to cart!')

  if (auth.isAdmin) {
    router.push('/admin') // Navigate to cart page after adding
  } else {
    router.push('/shop') // Navigate to cart page after adding
  }
}

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

// function addToCart(shoe: Product) {
//   console.log('Add to cart:', shoe); // Cart logic coming next
// }
</script>
