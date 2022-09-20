import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from '@/store/modules/user.js'
import category from '@/store/modules/category.js'
import cart from '@/store/modules/cart.js'

export default createStore({
  modules: {
    user,
    category,
    cart
  },
  // 让vuex刷新页面数据不丢失
  // 配置插件
  plugins: [
    // 默认存储在localStorage
    createPersistedState({
      // // 本地存储名字
      // key: 'erabbit-client-pc',
      // 指定要存储的模块
      paths: ['user', 'cart']
    })
  ]
})
