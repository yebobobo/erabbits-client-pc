<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div v-if="goodsList">
      <goods-item v-for="item in goodsList" :key="item.id" :goods="item"></goods-item>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { findGoodsHot } from '@/api/product.js'
import GoodsItem from '@/views/Category/components/GoodsItem.vue'
export default {
  name: 'GoodsHot',
  components: {
    GoodsItem
  },
  props: {
    // 热榜类型
    type: {
      type: Number,
      default: 1
    }
  },
  setup (props) {
    // 类型数据字典
    const types = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    const title = computed(() => {
      return types[props.type]
    })
    // 发请求获取数据
    const route = useRoute()
    const goodsList = ref([])
    findGoodsHot({ id: route.params.id, type: props.type }).then(data => {
      goodsList.value = data.result
    })
    return { title, goodsList }
  }
}
</script>

<style lang="less" scoped>
  .goods-hot {
    h3 {
      height: 70px;
      padding-left: 25px;
      margin-bottom: 10px;
      background-color: @helpColor;
      color: #fff;
      font-size: 18px;
      font-weight: 400;
      line-height: 70px;
    }
    :deep(.goods-item) {
      width: 100%;
      margin-bottom: 10px;
      background-color: #fff;
      img {
        width: 200px;
        height: 200px;
      }
      p {
        margin: 0 10px;
      }
    }
  }
</style>
