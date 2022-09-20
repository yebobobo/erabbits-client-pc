<template>
  <div class="xtx-skeleton" :style="{width, height}" :class="{move: animated}">
    <!-- 1.盒子 -->
    <div class="block" :style="{backgroundColor:bg}"></div>
  </div>
</template>

<script>
export default {
  name: 'XTxSkeleton',
  // 使用的时候需要动态设置 高度，宽度，背景颜色
  props: {
    bg: {
      type: String,
      default: '#efefef'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    },
    animated: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
  .xtx-skeleton {
    position: relative;
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
    .block {
      width: 100%;
      height: 100%;
      border-radius: 2px;
    }
  }
  .move {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      width: 50%;
      height: 100%;
      // 渐变色
      background: linear-gradient(
        to left,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      // 使用动画
      animation: move 1.5s ease 0s infinite;
      // 转换
      // skewX()函数定义了一个转换 该转换为元素倾斜到二维平面上的水平方向
      transform: skewX(-45deg);
    }
  }
  // 定义动画
  @keyframes move {
    0% {
      left: -100%;
    }
    100% {
      left: 120%;
    }
  }
</style>
