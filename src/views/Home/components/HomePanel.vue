<template>
  <div class="home-panel">
    <div class="wrapper">
      <div class="head">
        <h3>{{ title }}<small>{{ subTitle }}</small></h3>
        <!-- 右上角插槽 -->
        <slot name="right"></slot>
      </div>
      <!-- 默认插槽，面板内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePanel',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 副标题
    subTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .home-panel {
    .head {
      display: flex;
      align-items: flex-end;
      padding: 40px 0;
      h3 {
        flex: 1;
        height: 35px;
        margin-left: 6px;
        font-size: 32px;
        font-weight: 400;
        line-height: 35px;
        small {
          margin-left: 20px;
          font-size: 16px;
          color: #999;
        }
      }
    }
  }
</style>
