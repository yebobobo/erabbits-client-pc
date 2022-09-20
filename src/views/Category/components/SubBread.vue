<template>
  <xtx-bread>
    <xtx-bread-item to="/">首页</xtx-bread-item>
    <xtx-bread-item :key="category.top.id" v-if="category.top" :to="`/category/${category.top.id}`">{{ category.top.name }}</xtx-bread-item>
    <Transition name="fade-right" mode="out-in">
      <xtx-bread-item :key="category.sub.id" v-if="category.sub">{{ category.sub.name }}</xtx-bread-item>
    </Transition>
  </xtx-bread>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'SubBread',
  setup () {
    // 通过计算属性从vuex获取顶级和二级类目信息
    // 数据对象：{top:{id,name},sub:{id,name}}
    const route = useRoute()
    const store = useStore()
    const category = computed(() => {
      const cate = {}
      // 完成获取数据逻辑
      store.state.category.list.forEach(top => {
        if (top.children) {
          const sub = top.children.find(sub => sub.id === route.params.id)
          if (sub) {
            cate.top = { id: top.id, name: top.name }
            cate.sub = { id: sub.id, name: sub.name }
          }
        }
      })
      return cate
    })
    return { category }
  }
}
</script>

<style lang="less" scoped>

</style>
