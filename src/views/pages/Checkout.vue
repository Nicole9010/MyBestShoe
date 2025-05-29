<template>
  <div class="container mt-4">
    <h2>Checkout</h2>

    <form @submit.prevent="submitOrder">
      <div class="mb-3">
        <label class="form-label">Shipping Address</label>
        <textarea v-model="address" class="form-control" required></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Place Order</button>
    </form>

    <div v-if="success" class="alert alert-success mt-3">✅ Order placed successfully!</div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: 'CheckoutPage' })
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useCartStore } from '@/store/cart'
import { db } from '@/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useAuthStore } from '@/store/auth'

const cart = useCartStore()
const auth = useAuthStore()
const address = ref('')
const success = ref(false)
const router = useRouter()

const submitOrder = async () => {
  console.log('submitOrder called')

  if (!auth.user) {
    alert('You must be logged in to place an order.')
    return
  }

  if (cart.items.length === 0) {
    alert('Your cart is empty.')
    return
  }

  try {
    const order = {
      userId: auth.user.uid,
      items: cart.items,
      total: cart.total,
      address: address.value,
      createdAt: Timestamp.now(),
      status: 'Pending', // NEW: default status
    }

    console.log('Submitting order:', order)
    await addDoc(collection(db, 'orders'), order)
    cart.clearCart()
    success.value = true

    setTimeout(() => {
      router.push('/')
    }, 2000)
  } catch (error) {
    console.error('Error placing order:', error)
    alert('Failed to place order. Please try again.')
  }
}
</script>
