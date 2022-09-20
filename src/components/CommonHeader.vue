<template>
  <div class="header wrapper">
    <h1 class="logo">
      <router-link to="/">小兔鲜儿</router-link>
    </h1>
    <!-- 使用头部导航组件 -->
    <header-nav></header-nav>
    <!-- 搜索 -->
    <div class="search">
      <i></i>
      <input type="text" placeholder="搜一搜">
    </div>
    <!-- 购物车 -->
    <header-cart></header-cart>
  </div>
</template>

<script>
import HeaderNav from '@/components/CommonHeader/HeaderNav.vue'
import HeaderCart from '@/components/CommonHeader/HeaderCart.vue'
export default {
  name: 'CommonHeader',
  components: {
    HeaderNav,
    HeaderCart
  }
}
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    height: 130px;
    .logo {
      width: 200px;
      height: 100%;
      a {
        display: block;
        width: 100%;
        height: 100%;
        // 缩进 向左缩进9999像素 隐藏文字
        text-indent: -9999px;
        background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
      }
    }
    .search {
      position: relative;
      width: 172px;
      height: 32px;
      border-bottom: 2px solid #f4f4f4;
      input {
        width: 100%;
        height: 100%;
        padding-left: 30px;
        color: #999;
      }
      i {
        position: absolute;
        left: 2px;
        top: 5px;
        width: 18px;
        height: 18px;
        background: url('@/assets/images/sprites.png') -79px -69px;
      }
    }
  }
</style>
