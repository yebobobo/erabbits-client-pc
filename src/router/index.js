import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    name: 'layout',
    children: [
      {
        path: '/',
        component: () => import('@/views/Home/Home.vue'),
        name: 'home'
      },
      {
        path: '/register',
        component: () => import('@/views/Register/Register.vue'),
        name: 'register'
      },
      {
        path: '/cart',
        component: () => import('@/views/Cart/Cart.vue'),
        name: 'cart'
      },
      {
        path: '/product/:id',
        component: () => import('@/views/Goods/Goods.vue'),
        name: 'goods'
      },
      {
        path: '/category/:id',
        component: () => import('@/views/Category/Category.vue'),
        name: 'category'
      },
      {
        path: '/category/sub/:id',
        component: () => import('@/views/Category/SubCategory.vue'),
        name: 'subCategory'
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Login.vue'),
    name: 'login'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
