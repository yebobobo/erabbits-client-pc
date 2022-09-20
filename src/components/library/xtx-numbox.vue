<template>
  <div class="xtx-numbox">
    <div class="label" v-if="label">{{ label }}</div>
    <div class="numbox">
      <a href="javascript:;" @click="changeNum(-1)">-</a>
      <input type="text" readonly :value="modelValue">
      <a href="javascript:;" @click="changeNum(1)">+</a>
    </div>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxNumbox',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Number,
      default: 1
    },
    // 最小值
    min: {
      type: Number,
      default: 1
    },
    // 最大值
    max: {
      type: Number,
      default: 10
    }
  },
  setup (props, { emit }) {
    // 1.绑定按钮点击事件 -按钮 +按钮 触发同一个事件 同一个函数
    // 2.使用vueuse的useVModel做数据绑定，修改 count 通知父组件更新
    const count = useVModel(props, 'modelValue', emit)
    const changeNum = (step) => {
      // 3. 得到将要改变的值，如果值不合法终止程序
      const newValue = count.value + step
      if (newValue < props.min || newValue > props.max) return
      // 正常改值
      count.value = newValue
      // change事件
      emit('change', newValue)
    }
    return { changeNum }
  }
}
</script>

<style lang="less" scoped>
  .xtx-numbox {
    display: flex;
    align-items: center;
    padding-top: 20px;
    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
    .numbox {
      // 添加flex可使a变为行内块元素
      display: flex;
      width: 120px;
      height: 30px;
      border: 1px solid #e4e4e4;
      > a {
        width: 29px;
        background-color: #f8f8f8;
        text-align: center;
        line-height: 28px;
        font-size: 16px;
        color: #666;
        &:first-of-type {
          border-right: 1px solid #e4e4e4;
        }
        &:last-of-type {
          border-left: 1px solid #e4e4e4;
        }
      }
      > input {
        width: 60px;
        padding: 0 5px;
        text-align: center;
        color: #666;
      }
    }
  }
</style>
