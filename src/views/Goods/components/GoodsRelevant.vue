<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title">{{ goodsId ? '同类商品推荐' : '猜你喜欢' }}</span>
    </div>
    <!-- 此处使用改造后的 xtx-carousel.vue -->
    <xtx-carousel :sliders="sliders" auto-play></xtx-carousel>
  </div>
</template>

<script>
import { ref } from 'vue'
import { findRelevantGoods } from '@/api/product.js'
export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant',
  props: {
    goodsId: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    // 最终需要的数据是 sliders 提供给轮播图使用
    // 数据结构：sliders = [[4个], [4个], [4个], [4个]]
    const sliders = ref([])
    findRelevantGoods({ id: props.goodsId }).then(data => {
      console.log(data.result)
      // data.result 商品列表，数据结构 [16个]
      // 将data.result数据赋值给sliders数据，保证数据结构正确
      const pageSize = 4
      const pageCount = Math.ceil(data.result.length / pageSize)
      for (let i = 0; i < pageCount; i++) {
        sliders.value.push(data.result.slice(pageSize * i, pageSize * (i + 1)))
      }
    })
    return { sliders }
  }
}
</script>

<style lang="less" scoped>
  .goods-relevant {
    min-height: 460px;
    margin-top: 20px;
    background-color: #fff;
    .header {
      height: 80px;
      padding: 0 20px;
      line-height: 80px;
      .title {
        padding-left: 10px;
        font-size: 20px;
      }
      .icon {
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        border-top: 4px solid @xtxColor;
        border-right: 4px solid @xtxColor;
        box-sizing: border-box;
        transform: rotate(45deg);
        &::before {
          position: absolute;
          left: 0;
          top: 2px;
          content: "";
          width: 10px;
          height: 10px;
          // lighten() 函数会让颜色变得更亮，亮度值在0~1之间
          background: lighten(@xtxColor, 40%);
        }
      }
    }
  }
  :deep(.xtx-carousel) {
    height: 380px;
    .carousel {
      &-indicator {
        bottom: 30px;
        span {
          &.active {
            background-color: @xtxColor;
          }
        }
      }
      &-btn {
        top: 110px;
        opacity: 1;
        background-color: rgba(0, 0, 0, 0);
        color: #ddd;
        i {
          font-size: 30px;
        }
      }
    }
  }
</style>
