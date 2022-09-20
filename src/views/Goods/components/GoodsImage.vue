<template>
  <div class="goods-image">
    <!-- 大图 -->
    <div v-show="show" class="large" :style="[{ backgroundImage: `url(${ images[currIndex]})` }, largePosition]"></div>
    <!-- 中图 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="">
      <!-- 遮罩色块 -->
      <div v-show="show" class="layer" :style="layerPosition"></div>
    </div>
    <!-- 小图 -->
    <ul class="small">
      <li v-for="(img, i) in images" :key="img" :class="{ active: i === currIndex }">
        <img :src="img" @mouseenter="currIndex=i" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    // 当前预览图的索引
    const currIndex = ref(0)
    // 1.是否显示遮罩和大图
    const show = ref(false)
    // 2.遮罩的坐标（样式）
    const layerPosition = reactive({
      left: 0,
      top: 0
    })
    // 3.大图背景定位（样式）
    const largePosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0
    })
    // 4.使用useMouseInElement得到基于元素左上角的坐标和是否离开元素数据
    // useMouseInElement: 鼠标在元素内位置以及鼠标是否在元素内
    const target = ref(null)
    // elementX: 鼠标在元素 x 轴位置
    // elementY: 鼠标在元素 y 轴位置
    // isOutside: 鼠标是否在元素中
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    watch([elementX, elementY, isOutside], () => {
      // 5.根据得到的数据设置样式数据和是否显示数据
      show.value = !isOutside.value
      // 计算坐标
      const position = { x: 0, y: 0 }
      if (elementX.value < 100) position.x = 0
      else if (elementX.value > 300) position.x = 200
      else position.x = elementX.value - 100

      if (elementY.value < 100) position.y = 0
      else if (elementY.value > 300) position.y = 200
      else position.y = elementY.value - 100
      // 给样式赋值
      layerPosition.left = position.x + 'px'
      layerPosition.top = position.y + 'px'
      largePosition.backgroundPositionX = -2 * position.x + 'px'
      largePosition.backgroundPositionY = -2 * position.y + 'px'
    })
    return { currIndex, show, layerPosition, largePosition, target }
  }
}
</script>

<style lang="less" scoped>
  .goods-image {
    position: relative;
    display: flex;
    width: 480px;
    height: 400px;
    z-index: 500;
    // 大图
    .large {
      position: absolute;
      top: 0;
      left: 412px;
      width: 400px;
      height: 400px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      background-repeat: no-repeat;
      background-size: 800px 800px;
      background-color: #f8f8f8;
    }
    // 中图
    .middle {
      position: relative;
      width: 400px;
      height: 400px;
      background-color: #f5f5f5;
      cursor: move;
      img {
        width: 100%;
        height: 100%;
      }
      // 遮罩色块
      .layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 200px;
        background-color: rgba(0, 0, 0, .2);
      }
    }
    // 小图
    .small {
      width: 80px;
      li {
        width: 68px;
        height: 68px;
        margin-left: 12px;
        margin-bottom: 15px;
        cursor: pointer;
        &:hover,
        &.active {
          border: 2px solid @xtxColor;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
