<script>
// h函数创建DOM节点
import { h } from 'vue'
export default {
  name: 'XtxBread',
  // render()函数为渲染函数，创建html模板
  // 参数是createElement()函数
  render () {
    // 用法
    // 1.template 标签去除 单文件组件
    // 2.返回值是组件内容
    // vue3的h函数导入
    // 4.h第一个参数 标签名字 第二个参数 标签属性对象 第三个参数 子节点
    // 需求
    // 1.创建xtx-bread父容器
    // 2.获取默认插槽内容
    // 3.去除xtx-bread-item组件的i标签，应该由render函数来组织
    // 4.遍历插槽中的item 得到一个动态创建的节点 最后一个item不加i标签
    // 5.把动态创建的节点渲染在xtx-bread标签中
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      // 对插槽节点进行判断 （是XtxBreadItem和Transition才进行组装）
      if (item.type.name === 'XtxBreadItem' || item.type.displayName === 'Transition') {
        dymanicItems.push(item)
        if (i < (items.length - 1)) {
          dymanicItems.push(h('i', { class: 'iconfont icon-angleright' }))
        }
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>

<style lang="less">
  .xtx-bread {
    display: flex;
    padding: 25px 10px;
    &-item {
      a {
        color: #666;
        transition: all .4s;
        &:hover {
          color: @xtxColor;
        }
      }
    }
    i {
      margin-left: 5px;
      margin-right: 5px;
      font-size: 12px;
      line-height: 22px;
    }
  }
</style>
