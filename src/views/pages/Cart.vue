<template>
  <div class="container mt-4">
    <h2>Your Cart</h2>

    <div v-if="cart.items.length === 0" class="alert alert-info">Your cart is empty.</div>

    <table v-else class="table table-bordered">
      <thead>
        <tr>
          <th class="fw-bold">Product</th>
          <th class="fw-bold">Price</th>
          <th class="fw-bold">Qty</th>
          <th class="fw-bold">Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart.items" :key="item.id">
          <td class="align-content-center">{{ item.name }}</td>
          <td class="align-content-center">${{ item.price }}</td>
          <td class="align-content-center" style="width: 100px">
            <input
              type="number"
              class="form-control"
              min="1"
              v-model.number="item.quantity"
              @change="updateQuantity(item.id, item.quantity)"
            />
          </td>
          <td class="align-content-center">${{ (item.price * item.quantity).toFixed(2) }}</td>
          <td class="align-content-center text-center">
            <button class="btn btn-danger btn-sm" @click="cart.removeItem(item.id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="text-end">
      <h4>Total: ${{ cart.total.toFixed(2) }}</h4>
      <RouterLink
        to="/checkout"
        :class="['btn btn-success mt-2', cart.items.length === 0 ? 'disabled' : '']"
        >Proceed to Checkout</RouterLink
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/store/cart'

defineOptions({
  name: 'CartPage',
})

const cart = useCartStore()

function updateQuantity(productId: string, newQty: number) {
  if (newQty < 1) {
    // Reset to 1 if invalid
    newQty = 1
  }
  cart.updateItemQuantity(productId, newQty)
}
</script>
