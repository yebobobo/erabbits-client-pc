<template>
  <div class="home-banner">
    <xtx-carousel auto-play :sliders="sliders"></xtx-carousel>
  </div>
</template>

<script>
import { ref } from 'vue'
import { findBanner } from '@/api/home.js'
export default {
  name: 'HomeBanner',
  setup () {
    // 获取轮播图数据
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })
    return { sliders }
  }
}
</script>

<style lang="less" scoped>
  .home-banner {
    position: absolute;
    left: 0;
    top: 0;
    width: 1240px;
    height: 500px;
    z-index: 98;
  }
  // 覆盖样式
  .xtx-carousel {
    :deep(.carousel-btn.prev) {
      left: 270px;
    }
    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
</style>
