<template>
  <div class="category">
    <div class="wrapper">
      <!-- 面包屑 -->
      <xtx-bread>
        <xtx-bread-item to="/">首页</xtx-bread-item>
        <Transition name="fade-right" mode="out-in">
          <xtx-bread-item :key="topCategory.id">{{ topCategory.name }}</xtx-bread-item>
        </Transition>
      </xtx-bread>
      <!-- 轮播图 -->
      <xtx-carousel :sliders="sliders" style="height: 500px"></xtx-carousel>
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" alt="">
              <p>{{ sub.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各个分类推荐商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <xtx-more :path="`/category/sub/${sub.id}`"></xtx-more>
        </div>
        <div class="body">
          <goods-item v-for="goods in sub.goods" :key="goods.id" :goods="goods"></goods-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { findBanner } from '@/api/home.js'
import { findTopCategory } from '@/api/category'
import GoodsItem from '@/views/Category/components/GoodsItem.vue'
export default {
  name: 'XtxCategory',
  components: {
    GoodsItem
  },
  setup () {
    // 轮播图
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })

    // 面包屑+所有子分类 ====> vuex
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      let cate = {}
      // 当前顶级分类 === 根据路由上的ID去vuex中的category模块的list中查找
      const item = store.state.category.list.find(item => {
        return item.id === route.params.id
      })
      // 找到数据赋值
      if (item) cate = item
      return cate
    })

    // 获取各个子类目下推荐商品
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children
      })
    }
    watch(() => route.params.id, (newValue) => {
      if (newValue && `/category/${newValue}` === route.path) getSubList()
    }, { immediate: true })

    return { sliders, topCategory, subList }
  }
}
</script>

<style lang="less" scoped>
.category {
  background-color: #f5f5f5;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: 400;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 32px;
      min-height: 160px;
      li {
        width: 168px;
        height: 160px;
        a {
          display: block;
          text-align: center;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    position: relative;
    margin-top: 20px;
    background-color: #fff;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        position: relative;
        top: -20px;
        color: #999;
        text-align: center;
        font-size: 20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
