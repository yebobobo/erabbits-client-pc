<template>
  <!-- 快捷导航 -->
  <common-shortcuts></common-shortcuts>
  <!-- 头部组件 -->
  <common-header></common-header>
  <!-- 吸顶头部 -->
  <common-sticky></common-sticky>
  <!-- 内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <router-view></router-view>
  </div>
  <!-- 底部组件 -->
  <common-footer></common-footer>
</template>

<script>
import CommonShortcuts from '@/components/CommonShortcuts.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import CommonSticky from '@/components/CommonSticky.vue'
import CommonFooter from '@/components/CommonFooter.vue'
export default {
  name: 'XtxLayout',
  components: {
    CommonShortcuts,
    CommonHeader,
    CommonSticky,
    CommonFooter
  }
}
</script>

<style lang="less" scoped>

</style>
