import {
  updateCart,
  findCart,
  getNewCartGoods,
  insertCart,
  deleteCart,
  checkAllCart
} from '@/api/cart.js'

// 购物车模块
export default {
  namespaced: true,
  state () {
    return {
      // 购物车商品列表
      list: []
    }
  },
  // store的计算属性 对state里面的状态进行过滤处理
  getters: {
    // 有效商品列表
    validList (state) {
      // 有效商品：库存大于0 stock 商品有效标识为 true isEffective
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter(goods => goods.stock <= 0 || !goods.isEffective)
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.validList.length !== 0 && getters.selectedList.length === getters.validList.length
    },
    // 有效商品总件数
    validTotal (state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount (state, getters) {
      return getters.validList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 已选商品列表
    selectedList (state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 已选商品总件数
    selectedTotal (state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已选商品总金额
    selectedAmount (state, getters) {
      return getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    }
  },
  mutations: {
    // 设置购物车
    setCart (state, payload) {
      // payload为空数组，清空
      state.list = payload
    },
    // 修改购物车商品
    updateCart (state, goods) {
      // goods: 商品信息——nowPrice stock isEffective
      // goods: 商品对象的字段不固定，对象中有哪些字段就改哪些字段，字段的值合理才改
      // goods: 商品对象 必须有SKUID
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    // 加入购物车
    insertCart (state, payload) {
      // 约定加入购物车字段必须和后端保持一致 payload对象的字段
      // id skuId name attrsText picture price nowPrice selected stock count isEffective
      // 插入数据规则
      // 1.先找下是否有相同商品
      // 2.如果有相同商品，查询它的数量，累加到payload上，再保存最新位置，原来商品要删除
      // 3.如果没有相同商品,保存在最新位置即可
      const sameIndex = state.list.findIndex(goods => goods.skuId === payload.skuId)
      if (sameIndex > -1) {
        const count = state.list[sameIndex].count
        payload.count += count
        // 删除原来
        state.list.splice(sameIndex, 1)
      }
      // 追加新的
      state.list.unshift(payload)
    },
    // 删除购物车商品
    deleteCart (state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    }
  },
  actions: {
    // 修改购物车 （选中状态，数量）
    updateCart (ctx, payload) {
      // payload需要：必须有skuId 可能 selected count
      // 实例化Promise
      // 异步任务顺利完成且返回结果值时，调用resolve函数
      // 异步任务失败且返回失败原因（通常是一个错误对象）时，调用reject函数
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          updateCart(payload).then(() => {
            // findCart：获取购物车列表
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
    // 修改规格
    updateCartSku (ctx, {
      oldSkuId,
      newSku
    }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          // 1.找出旧的商品信息
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          // 2.删除旧商品数据
          deleteCart([oldGoods.skuId]).then(() => {
            // 4.添加新的商品
            return insertCart({
              // 3.原先商品的数量+新skuId
              skuId: newSku.skuId,
              count: oldGoods.count
            })
          }).then(() => {
            // 获取购物车列表
            return findCart()
          }).then(data => {
            // 设置购物车
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          // 1.找出旧的商品信息
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          // 2.删除旧商品数据
          ctx.commit('deleteCart', oldSkuId)
          // 新的sku信息 newSku
          const {
            skuId,
            price: nowPrice,
            specsText: attrsText,
            inventory: stock
          } = newSku
          // 3.根据新的sku信息和旧的商品信息，合并成一条心的购物车商品数据
          const newGoods = {
            ...oldGoods,
            skuId,
            nowPrice,
            attrsText,
            stock
          }
          // 4.添加新的商品
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
    // 加入购物车
    insertCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          // 导入的api中的insertCart
          insertCart({
            skuId: payload.skuId,
            count: payload.count
          }).then(() => {
            // 获取购物车列表
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    },
    // 获取商品列表
    findCart (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          findCart().then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          // 同时发送请求（有几个商品发几个请求）等所有请求成功，一并修改本地数据
          // Promise.all(promise数组).then((dataList)=>{}) 同时发请求，所有请求成功，得到所有成功结果
          // Promise.resolve() Promise.reject() new Promise()
          // Promise.race(Promise数组).then((data)=>{}) 同时发请求，最快的请求成功，得到成功结果
          const promiseArr = ctx.state.list.map(goods => {
            // 导入的api中的getNewCartGoods
            return getNewCartGoods(goods.skuId)
          })
          // dataList成功结果的集合，数据顺序和promiseArr顺序一致，根据state.list来的
          Promise.all(promiseArr).then(dataList => {
            // 更新本地购物车
            dataList.forEach((data, i) => {
              ctx.commit('updateCart', {
                skuId: ctx.state.list[i].skuId,
                ...data.result
              })
            })
            // 调用resolve代表操作成功
            resolve()
          })
        }
      })
    },
    // 删除购物车
    deleteCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          deleteCart([payload]).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    },
    // 批量删除
    batchDeleteCart (ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          const ids = ctx.getters[isClear ? 'invalidList' : 'selectedList'].map(item => item.skuId)
          deleteCart(ids).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          // 找出选中的商品列表，遍历调用删除的mutations
          // isClear 为 true 删除失效商品列表，否则是选中的商品列表
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(item => {
            ctx.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    },
    // 全选和取消全选
    checkAllCart (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          const ids = ctx.getters.validList.map(item => item.skuId)
          checkAllCart({
            selected,
            ids
          }).then(() => {
            return findCart()
          }).then(data => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          ctx.getters.validList.forEach(goods => {
            ctx.commit('updateCart', {
              skuId: goods.skuId,
              selected
            })
          })
          resolve()
        }
      })
    }
  }
}
