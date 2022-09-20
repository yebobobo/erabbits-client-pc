<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-yixuanze"></i>
    <i v-else class="iconfont icon-weixuanze"></i>
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </div>
</template>

<script>
// @vueuse/core是一个包 封装常见的一些交互逻辑
// userVModel() 方法：工具函数实现双向绑定
import { useVModel } from '@vueuse/core'
export default {
  name: 'xtx-checkbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    // 使用useVModel实现双向数据绑定v-model指令
    // 1.使用props接收modelValue
    // 2.使用useVModel来包装props中的modelValue属性数据
    // 3.在使用checked.value就是使用父组件数据
    // 4.在使用checked.value='数据'赋值 触发emit('update:modelValue', '数据')
    // modelValue就是需要改变的量
    const checked = useVModel(props, 'modelValue', emit)
    // checked.value 默认为true  双向绑定form.isAgree,默认值为true
    const changeChecked = () => {
      // 点击取反为 false
      const newValue = !checked.value
      // 通知父组件
      checked.value = newValue // emit('update:modelValue', 'newValue')
      // 让组件支持change事件
      emit('change', newValue)
    }
    return { checked, changeChecked }
  }
}
</script>

<style lang="less" scoped>
  .xtx-checkbox {
    display: inline-block;
    margin-right: 2px;
    .icon-yixuanze {
      color: @xtxColor;
    }
  }
</style>
