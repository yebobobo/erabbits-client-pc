<template>
  <div class="home-category" @mouseleave="categoryId=null">
    <ul class="menu">
      <li
        v-for="item in menuList"
        :key="item.id"
        @mouseenter="categoryId=item.id"
        :class="{active:categoryId&&categoryId===item.id}"
      >
        <router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
        <template v-if="item.children">
          <router-link
            v-for="sub in item.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
          >{{ sub.name }}</router-link>
        </template>
        <template v-else></template>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { findBrand } from '@/api/home.js'
export default {
  name: 'HomeCategory',
  setup () {
    const store = useStore()
    // 最终使用的数据 = 9个分类 + 1个品牌
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [
        {
          id: 'brand-children',
          name: '品牌推荐'
        }
      ],
      // 品牌列表
      brands: []
    })
    const menuList = computed(() => {
      // 得到9个分类的每个一级分类下的子分类只有两个
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          goods: item.goods
        }
      })
      list.push(brand)
      return list
    })

    // 得到弹出层的推荐商品数据
    const categoryId = ref(null)
    const currCategory = computed(() => {
      return menuList.value.find(item => item.id === categoryId.value)
    })

    // 获取品牌数据，尽量不在setup上使用async
    findBrand().then(data => {
      brand.brands = data.result
    })
    return { menuList, categoryId, currCategory }
  }
}
</script>

<style lang="less" scoped>
  .home-category {
    position: relative;
    width: 250px;
    height: 500px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 99;
    .menu {
      li {
        position: relative;
        padding-left: 40px;
        height: 50px;
        line-height: 50px;
        &:hover,
        &.active {
          background-color: @xtxColor;
        }
        &::after {
          position: absolute;
          top: 20px;
          right: 19px;
          content: "";
          width: 6px;
          height: 11px;
          background: url('@/assets/images/sprites.png') -80px -110px;
        }
        a {
          margin-right: 4px;
          color: #fff;
          &:first-child {
            margin-right: 15px;
            font-size: 16px;
          }
          &:hover {
            color: #333;
          }
        }
      }
    }
  }
</style>
