import { defineStore } from 'pinia'
import type { CartItem } from '@/types/interface'

// interface CartItem {
//   id: string
//   name: string
//   price: number
//   image: string
//   quantity: number
// }

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  getters: {
    total: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  actions: {
    addItem(product: Omit<CartItem, 'quantity'>) {
      const existing = this.items.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    removeItem(id: string) {
      const index = this.items.findIndex((item) => item.id === id)
      if (index !== -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity -= 1
        } else {
          this.items.splice(index, 1) // remove item completely if quantity is 1
        }
      }
    },
    clearCart() {
      this.items = []
    },
    updateItemQuantity(id: string, quantity: number) {
      const item = this.items.find((item) => item.id === id)
      if (item) {
        if (quantity < 1) {
          // Remove item if quantity less than 1
          this.items = this.items.filter((i) => i.id !== id)
        } else {
          item.quantity = quantity
        }
      }
    },
  },
})
