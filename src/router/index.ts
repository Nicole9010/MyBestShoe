import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

import Checkout from '../views/pages/Checkout.vue'
import Dashboard from '../views/pages/Dashboard.vue'
import Home from '../views/pages/Home.vue'
import Shop from '../views/pages/Shop.vue'
import Cart from '../views/pages/Cart.vue'
import Login from '../views/pages/Login.vue' // <-- Import login page component
import Signup from '../views/pages/Signup.vue' // <-- Import signup page component
import OrderHistory from '../views/pages/OrderHistory.vue'

import AddProduct from '../views/pages/admin/AddProduct.vue'
import EditProduct from '../views/pages/admin/EditProduct.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/cart', component: Cart },
  { path: '/checkout', component: Checkout },
  { path: '/admin', component: Dashboard },
  { path: '/login', component: Login }, // <-- Define route for login
  { path: '/signup', component: Signup }, // <-- Define route for signup
  { path: '/order-history', component: OrderHistory },

  { path: '/admin/add-product', component: AddProduct },
  { path: '/admin/edit-product/:id', component: EditProduct },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next('/login')
  } else if (to.meta.requiresAdmin && !auth.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router
