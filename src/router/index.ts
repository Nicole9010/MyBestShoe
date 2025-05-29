import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../store/auth'

import Checkout from '../views/pages/Checkout.vue'
import Dashboard from '../views/pages/Dashboard.vue'
import Shop from '../views/pages/Shop.vue'
import Cart from '../views/pages/Cart.vue'
import Login from '../views/pages/Login.vue'
import Signup from '../views/pages/Signup.vue'
import OrderHistory from '../views/pages/OrderHistory.vue'

import AddProduct from '../views/pages/admin/AddProduct.vue'
import EditProduct from '../views/pages/admin/EditProduct.vue'
import AdminOrders from '../views/pages/admin/AdminOrders.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/pages/Home.vue'),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore()
      if (auth.isAdmin) {
        next('/dashboard')
      } else {
        next()
      }
    },
  },
  { path: '/shop', component: Shop },
  { path: '/cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/checkout', component: Checkout, meta: { requiresAuth: true } },
  { path: '/admin', component: Dashboard, meta: { requiresAdmin: true } },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/order-history', component: OrderHistory, meta: { requiresAuth: true } },

  { path: '/admin/add-product', component: AddProduct, meta: { requiresAdmin: true } },
  { path: '/admin/edit-product/:id', component: EditProduct, meta: { requiresAdmin: true } },
  { path: '/admin/orders', component: AdminOrders, meta: { requiresAdmin: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta?.requiresAuth && !auth.isLoggedIn) {
    next('/login')
  } else if (to.meta?.requiresAdmin && !auth.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router
