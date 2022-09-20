<template>
  <div class="sticky" :class="{ show: y >= 78 }">
    <div class="wrapper" v-show=" y >= 78">
      <router-link to="/" class="logo"></router-link>
      <header-nav></header-nav>
      <div class="right">
        <router-link to="/">品牌</router-link>
        <router-link to="/">专题</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useWindowScroll } from '@vueuse/core'
import HeaderNav from '@/components/CommonHeader/HeaderNav.vue'
export default {
  name: 'CommonSticky',
  components: {
    HeaderNav
  },
  setup () {
    const { y } = useWindowScroll()
    return { y }
  }
}
</script>

<style lang="less" scoped>
  .sticky {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;
    transform: translateY(-100%);
    opacity: 0;
    z-index: 999;
    &.show {
      transition: all .3s linear;
      transform: none;
      opacity: 1;
    }
    .wrapper {
      display: flex;
      align-items: center;
    }
    .logo {
      width: 200px;
      height: 80px;
      background: url('@/assets/images/logo.png') no-repeat right 2px;
      background-size: 160px auto;
    }
    .right {
      display: flex;
      width: 220px;
      padding-left: 40px;
      border-left: 2px solid @xtxColor;
      text-align: center;
      a {
        width: 38px;
        margin-right: 40px;
        font-size: 16px;
        line-height: 1;
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
</style>
