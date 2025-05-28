<template>
  <div class="container mt-4 text-center">
    <h1>Welcome to <span class="text-primary">MyBestShoe</span></h1>
    <p class="lead">Discover the best shoes at the best prices.</p>

    <button @click="goToShop" class="btn btn-primary m-2">Shop Now</button>
    <button @click="goToCart" class="btn btn-outline-secondary m-2">View Cart</button>

    <hr />

    <h3>Featured Products</h3>
    <div class="row">
      <div v-for="shoe in shoes" :key="shoe.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <img :src="shoe.image" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ shoe.name }}</h5>
            <p class="card-text">${{ shoe.price }}</p>
            <!-- <RouterLink to="/shop" class="btn btn-success">Shop NOW</RouterLink> -->
            <button @click="goToShop" class="btn btn-success">Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'HomePage' })
import { ref, onMounted } from 'vue'
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

interface Product {
  id: string
  name: string
  price: number
  image: string
}

const shoes = ref<Product[]>([])
const router = useRouter()
const auth = useAuthStore()

const fetchShoes = async () => {
  const snapshot = await getDocs(collection(db, 'products'))
  shoes.value = snapshot.docs.map((doc) => {
    const data = doc.data() as Product
    return {
      ...data,
      id: doc.id,
    }
  })
}

const goToShop = () => {
  if (auth.user) {
    router.push('/shop')
  } else {
    router.push('/login')
  }
}

const goToCart = () => {
  if (auth.user) {
    router.push('/cart')
  } else {
    router.push('/login')
  }
}

onMounted(() => {
  fetchShoes()
})
</script>
