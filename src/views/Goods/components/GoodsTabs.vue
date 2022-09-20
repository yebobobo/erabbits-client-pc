<template>
  <div class="goods-tabs">
    <nav>
      <a
        href="javascript:;"
        @click=" activeName = 'GoodsDetail' "
        :class="{ active: activeName === 'GoodsDetail' }"
      >商品详情</a>
      <a
        href="javascript:;"
        @click=" activeName = 'GoodsComment'"
        :class="{ active: activeName === 'GoodsComment' }"
      >商品评价</a>
    </nav>
    <component :is="activeName"></component>
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import GoodsDetail from './GoodsDetial.vue'
import GoodsComment from './GoodsComment.vue'
export default {
  name: 'GoodsTabs',
  components: {
    GoodsDetail,
    GoodsComment
  },
  setup () {
    const activeName = ref('GoodsDetail')
    // goods详情数据
    const goods = inject('goods')
    return { activeName, goods }
  }
}
</script>

<style lang="less" scoped>
  .goods-tabs {
    min-height: 600px;
    background-color: #fff;
    nav {
      display: flex;
      border-bottom: 1px solid #f5f5f5;
      height: 70px;
      line-height: 70px;
      a {
        position: relative;
        padding: 0 40px;
        font-size: 18px;
        > span {
          margin-left: 10px;
          font-size: 16px;
          color: @priceColor;
        }
        &:first-child {
          border-right: 1px solid #f5f5f5;
        }
        &.active {
          &::before {
            content: "";
            position: absolute;
            left: 40px;
            bottom: -1px;
            width: 72px;
            height: 2px;
            background-color: @xtxColor;
          }
        }
      }
    }
  }
</style>
