<template>
  <div class="xtx-cart-page">
    <div class="wrapper">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item>购物车</xtx-bread-item>
      </xtx-bread>
      <div class="cart">
        <cart-none v-if="$store.getters['cart/validList'].length===0"></cart-none>
        <table v-if="$store.getters['cart/validList'].length">
          <thead>
            <tr>
              <th width="120">
                <xtx-checkbox @change="checkAll" :modelValue="$store.getters['cart/isCheckAll']"> 全选</xtx-checkbox>
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-for="goods in $store.getters['cart/validList']" :key="goods.skuId">
              <td>
                <xtx-checkbox @change="($event)=>checkOne(goods.skuId, $event)" :modelValue="goods.selected"></xtx-checkbox>
              </td>
              <td>
                <div class="goods">
                  <router-link :to="`/product/${ goods.id }`">
                    <img :src="goods.picture" alt="">
                  </router-link>
                  <div>
                    <p class="name ellipsis">{{ goods.name }}</p>
                    <!-- 选择规格组件 -->
                    <cart-sku @change="$event=>updateCartSku(goods.skuId, $event)" :skuId="goods.skuId" :attrsText="goods.attrsText"></cart-sku>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>￥{{ goods.nowPrice }}</p>
                <p v-if="goods.price-goods.nowPrice > 0">
                  比加入时降价 <span class="red">￥{{goods.price-goods.nowPrice}}</span>
                </p>
              </td>
              <td class="tc">
                <!-- 数量加减 -->
                <xtx-numbox @change="$event=>updateCount(goods.skuId, $event)" :max="goods.stock" :modelValue="goods.count"></xtx-numbox>
              </td>
              <td class="tc">
                <!-- 小计 -->
                <p class="f16 red">￥{{ Math.round(goods.nowPrice * 100) * goods.count / 100 }}</p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a href="javascript:;" @click="deleteCart(goods.skuId)" class="green">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/invalidList'].length">
            <tr>
              <td colspan="6">
                <h3 class="tit">失效商品</h3>
              </td>
            </tr>
            <tr v-for="goods in $store.getters['cart/invalidList']" :key="goods.skuId">
              <td>
                <xtx-checkbox style="color:#eee"></xtx-checkbox>
              </td>
              <td>
                <div class="goods">
                  <router-link :to="`/product/${goods.id}`">
                    <img :src="goods.picture" alt="">
                  </router-link>
                </div>
                <div>
                  <p class="name ellipsis">{{ goods.name }}</p>
                  <p class="attr">{{ goods.attrsText }}</p>
                </div>
              </td>
              <td class="tc">
                <p>￥{{ goods.nowPrice }}</p>
              </td>
              <td class="tc">{{ goods.count }}</td>
              <td class="tc">
                <p>￥{{ Math.round(goods.nowPrice * 100) * goods.count / 100 }}</p>
              </td>
              <td class="tc">
                <p><a href="javascript:;" @click="deleteCart(goods.skuId)" class="green">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action" v-if="$store.getters['cart/validList'].length">
        <div class="batch">
          <xtx-checkbox @change="checkAll" :modelValue="$store.getters['cart/isCheckAll']"> 全选</xtx-checkbox>
          <a href="javascript:;" @click="batchDeleteCart()" :class="{ gray:  $store.getters['cart/validList'].length <= 0 }">删除商品</a>
          <a href="javascript:;" :class="{ gray:  $store.getters['cart/validList'].length <= 0 }">移入收藏夹</a>
          <a href="javascript:;" @click="batchDeleteCart(true)" :class="{ gray:  $store.getters['cart/invalidList'].length <= 0 }">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ $store.getters['cart/validTotal'] }} 件商品，已选择 {{ $store.getters['cart/selectedTotal'] }} 件，商品合计：
          <span class="red">￥{{ $store.getters['cart/selectedAmount'] }}</span>
          <xtx-button @click="checkout()" type="primary">下单结算</xtx-button>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <goods-relevant></goods-relevant>
    </div>
  </div>
</template>

<script>
import CartNone from '@/views/Cart/components/CartNone.vue'
import CartSku from '@/views/Cart/components/CartSku.vue'
import GoodsRelevant from '@/views/Goods/components/GoodsRelevant.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'XtxCart',
  components: {
    CartNone,
    CartSku,
    GoodsRelevant
  },
  setup () {
    const store = useStore()
    // 单选
    const checkOne = (skuId, selected) => {
      // dispatch和commit
      // 1.dispatch调用actions里面的方法
      // 2.commit调用mutations里面的方法
      store.dispatch('cart/updateCart', { skuId, selected })
    }
    // 全选
    const checkAll = (selected) => {
      store.dispatch('cart/checkAllCart', selected)
    }
    // 删除
    const deleteCart = (skuId) => {
      ElMessageBox.confirm(
        '您确认从购物车删除该商品吗？',
        '温馨提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('cart/deleteCart', skuId).then(() => {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
        }).catch(() => {
          ElMessage({
            type: 'info',
            message: '删除取消'
          })
        })
      }).catch(() => {
        ElMessage({
          type: 'error',
          message: '删除失败'
        })
      })
    }
    // 批量删除选中商品，也支持清空无效商品
    const batchDeleteCart = (isClear) => {
      ElMessageBox.confirm(
        `您确认删除${isClear ? '失效' : '选中'}商品吗？`,
        '温馨提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('cart/batchDeleteCart', isClear).then(() => {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
        }).catch(() => {
          ElMessage({
            type: 'info',
            message: '删除取消'
          })
        })
      }).catch(() => {
        ElMessage({
          type: 'error',
          message: '删除失败'
        })
      })
    }
    // 修改数量
    const updateCount = (skuId, count) => {
      store.dispatch('cart/updateCart', { skuId, count })
    }
    // 修改规格
    const updateCartSku = (oldSkuId, newSku) => {
      store.dispatch('cart/updateCartSku', { oldSkuId, newSku })
    }
    // 结算
    const router = useRouter()
    const checkout = () => {
      // 1.判断是否选中商品，且提示
      if (store.getters['cart/selectedList'].length === 0) {
        return ElMessage({
          type: 'warning',
          message: '至少选中一件商品'
        })
      }
      // 如果登录直接跳转
      if (store.state.user.profile.token) {
        return router.push('/member/checkout')
      }
      // 2.弹出确认框，提示：下单结算需要登录
      // 未登录弹出确认框
      ElMessageBox.confirm(
        '下单结算需要登录，确认现在去登录吗？',
        '温馨提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        router.push('/member/checkout')
      }).catch(e => {})
    }
    return { checkOne, checkAll, deleteCart, batchDeleteCart, updateCount, updateCartSku, checkout }
  }
}
</script>

<style lang="less">
  .xtx-cart-page {
    background-color: #f5f5f5;
    padding-bottom: 40px;
    .cart {
      background-color: #fff;
      color: #666;
      table {
        border-spacing: 0;
        border-collapse: collapse;
        line-height: 24px;
        th, td {
          padding: 10px;
          border-bottom: 1px solid #f5f5f5;
          &:first-child {
            text-align: left;
            padding-left: 30px;
            color: #999;
          }
        }
        th {
          font-size: 16px;
          font-weight: 400;
          line-height: 50px;
        }
      }
    }
  }
  .tc {
    text-align: center;
    .xtx-numbox {
      width: 120px;
      margin: 0 auto;
      padding-top: 0;
    }
  }
  .red {
    color: @priceColor;
  }
  .gray {
    color: #999;
    cursor: not-allowed;
  }
  .green {
    color: @xtxColor;
  }
  .f16 {
    font-size: 16px;
  }
  .goods {
    display: flex;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
    }
    > div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;
      .attr {
        font-style: 14px;
        color: #999;
      }
    }
  }
  .action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    margin-top: 20px;
    padding: 0 30px;
    background-color: #fff;
    font-size: 16px;
    .xtx-checkbox {
      color: #999;
    }
    .batch {
      a {
        margin-left: 20px;
      }
    }
    .red {
      margin-right: 20px;
      font-size: 18px;
      font-weight: 700;
    }
  }
  // 失效商品
  .tit {
    font-size: 16px;
    font-weight: 400;
    line-height: 50px;
    color: #666;
  }
  :root {
    --el-color-primary: @xtxColor;
    --el-color-primary-light-3: @xtxColor;
    --el-fill-color-blank: #ccc;
  }
</style>
