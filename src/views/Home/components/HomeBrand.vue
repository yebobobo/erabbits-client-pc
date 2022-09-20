<template>
  <div class="home-brand">
    <home-panel title="热门品牌" sub-title="国际经典 品质保证">
      <template #right>
        <!-- 向左箭头 -->
        <a href="javascript:;" @click="toggle(-1)" :class="{disabled:index===0}" class="iconfont icon-xiangzuojiantou prev"></a>
        <!-- 向右箭头 -->
        <a href="javascript:;" @click="toggle(1)" :class="{disabled:index===1}" class="iconfont icon-xiangyoujiantou next"></a>
      </template>
      <!-- 面板 -->
      <div ref="target" class="box">
        <Transition name="fade">
          <ul v-if="brands.length" class="brands-list" :style="{transform:`translateX(${-index*1240}px)`}">
            <li v-for="item in brands" :key="item.id">
              <router-link to="/">
                <img :src="item.picture" alt="">
              </router-link>
            </li>
          </ul>
          <div v-else class="skeleton">
            <xtx-skeleton class="item" v-for="i in 5" :key="i" animated="true" bg="#e4e4e4" width="240px" height="305px"></xtx-skeleton>
          </div>
        </Transition>
      </div>
    </home-panel>
  </div>
</template>

<script>
import HomePanel from '@/views/Home/components/HomePanel.vue'
import { ref } from 'vue'
import { findBrand } from '@/api/home.js'
import { useLazyData } from '@/hooks/index.js'
export default {
  name: 'HomeBrand',
  components: {
    HomePanel
  },
  setup () {
    const { result, target } = useLazyData(() => findBrand(10))
    // 切换效果
    const index = ref(0)
    // 切换
    const toggle = (step) => {
      const newIndex = index.value + step
      if (newIndex < 0 || newIndex > 1) return
      index.value = newIndex
    }
    return { brands: result, target, index, toggle }
  }
}
</script>

<style lang="less" scoped>
  .home-brand {
    background-color: #f5f5f5;
    .iconfont {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-left: 5px;
      background-color: @xtxColor;
      text-align: center;
      color: #fff;
      &::before {
        position: relative;
        top: -2px;
        font-size: 12px;
      }
      &.disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
    .box {
      display: flex;
      width: 100%;
      height: 345px;
      padding-bottom: 40px;
      overflow: hidden;
      .brands-list {
        display: flex;
        width: 200%;
        transition: all 1s;
        li {
          width: 240px;
          margin-right: 10px;
          &:nth-child(5n) {
            margin-right: 0;
          }
          img {
            width: 240px;
            height: 305px;
          }
        }
      }
    }
    .skeleton {
      width: 100%;
      display: flex;
      .item {
        margin-right: 10px;
        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }
</style>
