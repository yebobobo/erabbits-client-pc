<template>
  <div class="sub-sort">
    <div class="sort">
      <a href="javascript:;" :class="{ active: sortParams.sortField === null }" @click="changeSort(null)">默认排序</a>
      <a href="javascript:;" :class="{ active: sortParams.sortField === 'publishTime' }" @click="changeSort('publishTime')">最新商品</a>
      <a href="javascript:;" :class="{ active: sortParams.sortField === 'orderNum' }" @click="changeSort('orderNum')">最高人气</a>
      <a href="javascript:;" :class="{ active: sortParams.sortField === 'evaluateNum' }" @click="changeSort('evaluateNum')">评论最多</a>
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i class="arrow up" :class="{ active: sortParams.sortField === 'price' && sortParams.sortMethod === 'asc' }"></i>
        <i class="arrow down" :class="{ active: sortParams.sortField === 'price' && sortParams.sortMethod === 'desc' }"></i>
      </a>
    </div>
    <div class="check">
      <xtx-checkbox v-model="sortParams.inventory" @click="changeCheck" :class="{ active: sortParams.inventory }"> 仅显示有货商品</xtx-checkbox>
      <xtx-checkbox v-model="sortParams.onlyDiscount" @click="changeCheck" :class="{ active: sortParams.onlyDiscount }"> 仅显示特惠商品</xtx-checkbox>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'SubSort',
  setup (props, { emit }) {
    // 实现交互（实现交换的数据和后台保持一致）
    // 1.明确交互数据
    const sortParams = reactive({
      // 库存
      inventory: false,
      // 特惠折扣
      onlyDiscount: false,
      // 分类 null：默认排序 publishTime：最新商品 orderNum：最高人气 evaluateNum：评论最多 price：价格排序
      sortField: null,
      // 升序 asc 降序 desc 默认为 desc
      sortMethod: null
    })
    // 2.提供模板使用
    // 3.需要绑定按钮的点击事件修改排序字段和排序方式
    const changeSort = (sortField) => {
      if (sortField === 'price') {
        sortParams.sortField = sortField
        // 处理排序
        if (sortParams.sortMethod === null) {
          sortParams.sortMethod = 'desc'
        } else {
          sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 如果已经选项阻止运行
        if (sortParams.sortField === sortField) return
        sortParams.sortField = sortField
        sortParams.sortMethod = null
      }
      // 触发 sort-change 事件
      emit('sort-change', sortParams)
    }
    const changeCheck = () => {
      // 触发 sort-change 事件
      emit('sort-change', sortParams)
    }
    return { sortParams, changeSort, changeCheck }
  }
}
</script>

<style lang="less" scoped>
  .sub-sort {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sort {
      display: flex;
      a {
        position: relative;
        height: 30px;
        padding: 0 20px;
        margin-right: 20px;
        line-height: 28px;
        border: 1px solid #e4e4e4;
        color: #999;
        border-radius: 2px;
        transition: all .3s;
        &.active {
          background-color: @xtxColor;
          border-color: @xtxColor;
          color: #fff;
        }
        .arrow {
          position: absolute;
          border: 5px solid transparent;
          right: 8px;
          &.up {
            top: 3px;
            border-bottom-color: #bbb;
            &.active {
              border-bottom-color: @xtxColor;
            }
          }
          &.down {
            top: 15px;
            border-top-color: #bbb;
            &.active {
              border-top-color: @xtxColor;
            }
          }
        }
      }
    }
    .check {
      .xtx-checkbox {
        margin-left: 20px;
        color: #999;
        &.active {
          color: @xtxColor;
        }
      }
    }
  }
</style>
