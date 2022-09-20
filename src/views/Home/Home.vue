<template>
  <!-- 轮播图 -->
  <div class="home">
    <div class="wrapper">
      <!-- 左侧分类 -->
      <home-category></home-category>
      <!-- 轮播图 -->
      <home-banner></home-banner>
    </div>
  </div>
  <!-- 新鲜好物 -->
  <home-new></home-new>
  <!-- 人气推荐 -->
  <home-hot></home-hot>
  <!-- 热门品牌 -->
  <home-brand></home-brand>
  <!-- 产品区块 -->
  <home-products></home-products>
  <!-- 最新专题 -->
  <home-special></home-special>
</template>

<script>
import HomeCategory from '@/views/Home/components/HomeCategory.vue'
import HomeBanner from '@/views/Home/components/HomeBanner.vue'
import HomeNew from '@/views/Home/components/HomeNew.vue'
import HomeHot from '@/views/Home/components/HomeHot.vue'
import HomeBrand from '@/views/Home/components/HomeBrand.vue'
import HomeProducts from '@/views/Home/components/HomeProducts.vue'
import HomeSpecial from '@/views/Home/components/HomeSpecial.vue'
export default {
  name: 'XtxHome',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProducts,
    HomeSpecial
  }
}
</script>

<style lang="less" scoped>
  .home {
    background-color: #f5f5f5;
  }
</style>
