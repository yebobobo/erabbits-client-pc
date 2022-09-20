<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="wrapper">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <xtx-bread-item :to="`/category/${goods.categories[1].id}`">{{ goods.categories[1].name }}</xtx-bread-item>
        <xtx-bread-item :to="`/category/${goods.categories[0].id}`">{{ goods.categories[0].name }}</xtx-bread-item>
        <xtx-bread-item>{{ goods.name }}</xtx-bread-item>
      </xtx-bread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <goods-image :images="goods.mainPictures"></goods-image>
          <goods-sales></goods-sales>
        </div>
        <div class="spec">
          <goods-name :goods="goods"></goods-name>
          <goods-sku :goods="goods" @change="changeSku"></goods-sku>
          <!-- 数量选择组件 -->
          <xtx-numbox label="数量" v-model="num" :max="goods.inventory"></xtx-numbox>
          <!-- 按钮组件 -->
          <xtx-button @click="insertCart()" type="primary" size="large" style="margin-top: 20px">加入购物车</xtx-button>
        </div>
      </div>
      <!-- 商品推荐 -->
      <goods-relevant :goodsId="goods.id"></goods-relevant>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <goods-tabs></goods-tabs>
          <!-- 注意事项 -->
          <goods-warn></goods-warn>
        </div>
        <!-- 24热榜+周热销榜 -->
        <div class="goods-aside">
          <goods-hot></goods-hot>
          <goods-hot :type="2"></goods-hot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsImage from '@/views/Goods/components/GoodsImage.vue'
import GoodsSales from '@/views/Goods/components/GoodsSales.vue'
import GoodsName from '@/views/Goods/components/GoodsName.vue'
import GoodsSku from '@/views/Goods/components/GoodsSku.vue'
import GoodsRelevant from '@/views/Goods/components/GoodsRelevant.vue'
import GoodsTabs from '@/views/Goods/components/GoodsTabs.vue'
import GoodsWarn from '@/views/Goods/components/GoodsWarn.vue'
import GoodsHot from '@/views/Goods/components/GoodsHot.vue'
import { ElMessage } from 'element-plus'
import { nextTick, provide, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { findGoods } from '@/api/product.js'
export default {
  name: 'GoodsInfo',
  components: {
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsRelevant,
    GoodsTabs,
    GoodsWarn,
    GoodsHot
  },
  setup () {
    const goods = useGoods()
    const changeSku = (sku) => {
      // 修改商品的现价原价库存消息
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
      // 记录选择后的 sku， 可能有数据，可能没有数据 {}
      currSku.value = sku
    }

    // 提供 goods 数据给后台组件使用
    provide('goods', goods)

    // 选择的数量
    const num = ref(1)

    // 加入购物车
    const store = useStore()
    const currSku = ref(null)
    const insertCart = () => {
      if (currSku.value && currSku.value.skuId) {
        const { skuId, specsText: attrsText, inventory: stock } = currSku.value
        const { id, name, price, mainPictures } = goods.value
        store.dispatch('cart/insertCart', {
          skuId,
          attrsText,
          stock,
          id,
          name,
          price,
          nowPrice: price,
          picture: mainPictures[0],
          selected: true,
          isEffective: true,
          count: num.value
        }).then(() => {
          ElMessage({
            type: 'success',
            message: '加入购物车成功'
          })
        })
      } else {
        ElMessage({
          type: 'warning',
          message: '请选择完整规格'
        })
      }
    }
    return { goods, changeSku, num, insertCart }
  }
}
// 获取商品详情
const useGoods = () => {
  // 出现路由地址商品ID发生变化，但是不会重新初始化组件
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        // 让商品数据为null 然后使用v-if的组件可以重新销毁和创建
        goods.value = null
        nextTick(() => {
          goods.value = data.result
        })
      })
    }
  }, { immediate: true })
  return goods
}
</script>

<style lang="less" scoped>
  .xtx-goods-page {
    background-color: #f5f5f5;
    padding-bottom: 40px;
    .goods-info {
      display: flex;
      min-height: 600px;
      background-color: #fff;
      .media {
        width: 580px;
        height: 600px;
        padding: 30px 50px;
      }
      .spec {
        flex: 1;
        padding: 30px 30px 30px 0;
      }
    }
    .goods-footer {
      display: flex;
      margin-top: 20px;
      .goods-article {
        width: 940px;
        margin-right: 20px;
      }
      .goods-aside {
        width: 280px;
        min-height: 1000px;
      }
    }
  }
</style>
