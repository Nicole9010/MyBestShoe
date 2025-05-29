<template>
  <div class="container mt-4">
    <h2>My Orders</h2>

    <div v-if="loading" class="text-center mt-4">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="orders.length === 0" class="alert alert-info">
      You haven't placed any orders yet.
    </div>

    <div v-else>
      <div v-for="order in orders" :key="order.id" class="card mb-3">
        <div class="card-header">🧾 Order placed on: {{ formatDate(order.createdAt) }}</div>
        <div class="card-body">
          <p><strong>Total:</strong> ${{ order.total.toFixed(2) }}</p>
          <p><strong>Address:</strong> {{ order.address }}</p>
          <p><strong>Items:</strong></p>
          <ul>
            <li v-for="item in order.items" :key="item.id || item.name">
              {{ item.name }} — {{ item.quantity }} × ${{ item.price }}
            </li>
          </ul>
          <p>
            <strong>Status:</strong>
            <span
              :class="{
                'badge bg-warning': order.status === 'pending',
                'badge bg-info': order.status === 'shipped',
                'badge bg-success': order.status === 'delivered',
                'badge bg-secondary': !['pending', 'shipped', 'delivered'].includes(order.status),
              }"
            >
              {{ order.status }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore'
import { db } from '@/firebase'
import { useAuthStore } from '@/store/auth'
import { onSnapshot } from 'firebase/firestore'
import type { Order } from '@/types/interface'

const auth = useAuthStore()
// interface OrderItem {
//   id?: string
//   name: string
//   quantity: number
//   price: number
// }

// type OrderStatus = 'pending' | 'shipped' | 'delivered'

// interface Order {
//   id: string
//   total: number
//   address: string
//   createdAt: Timestamp
//   items: OrderItem[]
//   status: OrderStatus
// }

const orders = ref<Order[]>([])
const loading = ref(true)

onMounted(() => {
  fetchOrders()
})

function formatDate(timestamp: Timestamp) {
  if (!timestamp) return ''
  return timestamp.toDate().toLocaleString()
}

const fetchOrders = async () => {
  if (!auth.user) {
    console.warn('User not logged in')
    loading.value = false
    return
  }

  try {
    console.log('Current User UID:', auth.user.uid)

    const q = query(
      collection(db, 'orders'),
      where('userId', '==', auth.user.uid),
      orderBy('createdAt', 'desc'),
    )

    const querySnapshot = await getDocs(q)
    console.log('Orders query size:', querySnapshot.size)
    querySnapshot.docs.forEach((doc) => {
      console.log(doc.id, doc.data())
    })

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        orders.value = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            total: data.total,
            address: data.address,
            createdAt: data.createdAt,
            items: data.items,
            status: data.status || 'pending', // fallback if missing
          } as Order
        })
        loading.value = false
      },
      (error) => {
        console.error('Error listening for orders:', error)
        loading.value = false
      },
    )

    // Optionally clean up the listener on component unmount
    return unsubscribe
  } catch (error) {
    console.error('Error fetching orders:', error)
    loading.value = false
  }
}
</script>
