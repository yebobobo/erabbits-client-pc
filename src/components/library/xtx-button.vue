<template>
  <button class="xtx-button ellipsis" :class="[size, type]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'XtxButton',
  props: {
    size: {
      type: String,
      default: 'middle'
    },
    type: {
      type: String,
      default: 'default'
    }
  }
}
</script>

<style lang="less" scoped>
  .xtx-button {
    appearance: none;
    border: none;
    outline: none;
    background-color: #fff;
    text-align: center;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;
  }
  .large {
    width: 240px;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
  }
  .middle {
    width: 180px;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
  }
  .small {
    width: 100px;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
  }
  .mini {
    width: 60px;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
  }
  .default {
    border-color: #e4e4e4;
    color: #666;
  }
  .primary {
    border-color: @xtxColor;
    background-color: @xtxColor;
    color: #fff;
  }
  .plain {
    border-color: @xtxColor;
    color: @xtxColor;
    background: lighten(@xtxColor, 50%);
  }
  .gray {
    border-color: #ccc;
    background-color: #ccc;
    color: #fff;
  }
</style>
