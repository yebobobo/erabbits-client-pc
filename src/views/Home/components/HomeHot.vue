<template>
  <div class="home-hot">
    <home-panel title="人气推荐" sub-title="人气爆款 不容错过">
      <template #right>
        <xtx-more path="/"></xtx-more>
      </template>
      <div ref="target" class="box">
        <!-- 面板内容 -->
        <Transition name="fade">
          <ul v-if="goods.length" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <router-link to="/">
                <img :src="item.picture" alt="">
                <p class="name">{{ item.title }}</p>
                <p class="desc">{{ item.alt }}</p>
              </router-link>
            </li>
          </ul>
        </Transition>
      </div>
    </home-panel>
  </div>
</template>

<script>
import HomePanel from '@/views/Home/components/HomePanel.vue'
import { findHot } from '@/api/home.js'
import { useLazyData } from '@/hooks/index.js'
export default {
  name: 'HomeHot',
  components: {
    HomePanel
  },
  setup () {
    const { result, target } = useLazyData(findHot)
    return { goods: result, target }
  }
}
</script>

<style lang="less" scoped>
  .box {
    position: relative;
    height: 440px;
    .goods-list {
      display: flex;
      justify-content: space-between;
      height: 406px;
      li {
        width: 306px;
        height: 100%;
        .hoverShadow();
        img {
          width: 306px;
          height: 306px;
        }
        p {
          padding: 12px 30px 0 30px;
          font-size: 22px;
          text-align: center;
        }
        .desc {
          font-size: 18px;
          color: #999;
        }
      }
    }
  }
</style>
