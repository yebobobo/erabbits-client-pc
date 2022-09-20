<template>
  <router-link :to="path" class="xtx-more">
    查看全部
    <i class="iconfont icon-angleright"></i>
  </router-link>
</template>

<script>
export default {
  name: 'XtxMore',
  props: {
    path: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style lang="less" scoped>
  .xtx-more {
    float: right;
    margin-top: 14px;
    font-size: 16px;
    color: #999;
    line-height: 1;
    i {
      font-size: 14px;
      color: #ccc;
    }
    &:hover {
      color: @xtxColor;
      i {
        color: @xtxColor;
      }
    }
  }
</style>
