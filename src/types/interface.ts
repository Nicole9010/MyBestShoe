import { Timestamp } from 'firebase/firestore'
//Product
export interface Product {
  id: string
  name: string
  price: number
  image: string
  // Add other fields as needed
}

//Cart
export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

// Order History
export interface OrderItem {
  id?: string
  name: string
  quantity: number
  price: number
}

type OrderStatus = 'pending' | 'shipped' | 'delivered'

export interface Order {
  id: string
  total: number
  address: string
  createdAt: Timestamp
  items: OrderItem[]
  status: OrderStatus
}
