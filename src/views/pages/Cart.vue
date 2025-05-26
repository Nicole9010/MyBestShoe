<template>
  <div class="container mt-4">
    <h2>Your Cart</h2>

    <div v-if="cart.items.length === 0" class="alert alert-info">Your cart is empty.</div>

    <table v-else class="table table-bordered">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart.items" :key="item.id">
          <td>{{ item.name }}</td>
          <td>${{ item.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>${{ item.price * item.quantity }}</td>
          <td>
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

const cart = useCartStore()
</script>
