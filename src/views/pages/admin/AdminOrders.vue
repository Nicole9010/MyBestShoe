<template>
  <div class="container mt-4">
    <h2>All Orders</h2>

    <div v-if="loading" class="text-center mt-4">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="orders.length === 0" class="alert alert-info">No orders found.</div>

    <div v-else>
      <div v-for="order in orders" :key="order.id" class="card mb-3">
        <div class="card-header">
          🧾 Order from: <strong>{{ order.userId }}</strong
          ><br />
          🕒 {{ formatDate(order.createdAt) }}
        </div>
        <div class="card-body">
          <p><strong>Total:</strong> ${{ order.total.toFixed(2) }}</p>
          <p><strong>Address:</strong> {{ order.address }}</p>
          <p><strong>Items:</strong></p>
          <ul>
            <li v-for="item in order.items" :key="item.id">
              {{ item.name }} — {{ item.quantity }} × ${{ item.price }}
            </li>
          </ul>

          <!-- Move status selector inside here -->
          <div class="mb-3">
            <label for="statusSelect">Order Status:</label>
            <select
              :id="'statusSelect-' + order.id"
              class="form-select"
              v-model="order.status"
              @change="updateStatus(order.id, order.status)"
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import { doc, updateDoc } from 'firebase/firestore'

const orders = ref<any[]>([])
const loading = ref(true)
const auth = useAuthStore()
const router = useRouter()

const ADMIN_EMAIL = 'admin@mybestshoe.com'

const fetchAllOrders = async () => {
  if (!auth.user || auth.user.email !== ADMIN_EMAIL) {
    alert('Access denied. You must be an admin.')
    router.push('/')
    return
  }

  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    orders.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error('Error fetching orders:', error)
    alert('Failed to load orders.')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAllOrders()
})

function formatDate(timestamp: any) {
  return timestamp?.toDate().toLocaleString()
}

const updateStatus = async (orderId: string, status: string) => {
  try {
    await updateDoc(doc(db, 'orders', orderId), { status })
    alert('Order status updated')
  } catch (error) {
    console.error('Failed to update status:', error)
    alert('Failed to update status. Try again.')
  }
}
</script>
