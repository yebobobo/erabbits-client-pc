<template>
  <div class="header-cart">
    <!-- 购物车图标 -->
    <router-link to="/cart" class="current">
      <i class="iconfont icon-cart"></i>
      <em>{{ $store.getters['cart/validTotal'] }}</em>
    </router-link>
    <!-- 购物车弹出层 -->
    <div class="layer" v-if="$store.getters['cart/validTotal'] > 0 && $route.path !== '/cart'">
      <div class="list">
        <div class="item" v-for="goods in $store.getters['cart/validList']" :key="goods.skuId">
          <router-link :to="`/product/${ goods.id }`">
            <img :src="goods.picture" alt="">
            <div class="center">
              <p class="name ellipsis-2">{{ goods.name }}</p>
              <p class="attr ellipsis">{{ goods.attrsText }}</p>
            </div>
            <div class="right">
              <div class="price">￥{{ goods.nowPrice }}</div>
              <p class="count">x{{ goods.count }}</p>
            </div>
          </router-link>
          <i @click="deleteCart(goods.skuId)" class="iconfont icon-close"></i>
        </div>
      </div>
      <div class="foot">
        <div class="total">
          <p>共 {{ $store.getters['cart/validTotal'] }} 件商品</p>
          <p>￥{{ $store.getters['cart/validAmount'] }}</p>
        </div>
        <xtx-button @click="$router.push('/cart')" type="primary">去购物车结算</xtx-button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'HeaderCart',
  setup () {
    const store = useStore()
    store.dispatch('cart/findCart').then(() => {})
    // 删除函数
    const deleteCart = (skuId) => {
      store.dispatch('cart/deleteCart', skuId)
    }

    return { deleteCart }
  }
}
</script>

<style lang="less" scoped>
  .header-cart {
    width: 50px;
    position: relative;
    z-index: 600;
    .current {
      position: relative;
      &:hover {
        i {
          color: @xtxColor;
        }
      }
      i {
        position: absolute;
        bottom: -25px;
        left: 5px;
        font-size: 28px;
      }
      em {
        position: absolute;
        left: 25px;
        bottom: -4px;
        width: 20px;
        height: 15px;
        border-radius: 8px;
        background-color: #e26237;
        color: #fff;
        font-size: 12px;
        text-align: center;
        line-height: 15px;
      }
    }
    &:hover {
      .layer {
        opacity: 1;
        transform: none;
      }
    }
    // 弹层样式
    .layer {
      position: absolute;
      top: 50px;
      right: 0;
      width: 400px;
      height: 400px;
      padding-top: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      background-color: #fff;
      border-radius: 4px;
      opacity: 0;
      transition: all .4s, .2s;
      transform: translateY(-200px) scale(1, 0);
      &::before {
        content: "";
        position: absolute;
        top: -10px;
        right: 14px;
        width: 20px;
        height: 20px;
        background-color: #fff;
        transform: scale(0.6, 1) rotate(45deg);
        box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
      }
      .list {
        height: 310px;
        padding: 0 10px;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        &::-webkit-scrollbar-track {
          background-color: #f8f8f8;
          border-radius: 2px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background-color: #ccc;
        }
        .item {
          position: relative;
          padding: 10px 0;
          border-bottom: 1px solid #f5f5f5;
          i {
            position: absolute;
            bottom: 38px;
            right: 0;
            opacity: 0;
            color: #666;
            transition: all .5s;
          }
          &:hover {
            i {
              opacity: 1;
              cursor: pointer;
            }
          }
          a {
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
            }
            .center {
              width: 200px;
              padding: 0 10px;
              .name {
                font-size: 16px;
              }
              .attr {
                padding-top: 5px;
                color: #999;
              }
            }
            .right {
              width: 100px;
              padding-right: 20px;
              text-align: center;
              .price {
                font-size: 16px;
                color: @priceColor;
              }
              .count {
                margin-top: 5px;
                font-style: 16px;
                color: #999;
              }
            }
          }
        }
      }
      .foot {
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 70px;
        padding: 10px;
        background-color: #e3f9f4;
        .total {
          padding-left: 10px;
          color: #999;
          p {
            &:last-child {
              font-size: 18px;
              color: @priceColor;
            }
          }
        }
      }
    }
  }
</style>
