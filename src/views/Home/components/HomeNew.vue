<template>
  <div class="home-new">
    <home-panel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right>
        <xtx-more path="/"></xtx-more>
      </template>
      <div ref="target" class="box">
        <!-- 面板内容 -->
        <!-- transition：过渡动画组件 v- 替换为fade -->
        <Transition name="fade">
          <ul v-if="goods.length" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <router-link :to="`/product/${item.id}`">
                <img :src="item.picture" alt="">
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price"><span>￥</span>{{item.price}}</p>
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
import { findNew } from '@/api/home.js'
import { useLazyData } from '@/hooks/index.js'
export default {
  name: 'HomeNew',
  components: {
    HomePanel
  },
  setup () {
    const { result, target } = useLazyData(findNew)
    return { goods: result, target }
  }
}
</script>

<style lang="less" scoped>
  .box {
    position: relative;
    height: 426px;
    .goods-list {
      display: flex;
      justify-content: space-between;
      height: 406px;
      li {
        width: 306px;
        height: 100%;
        background-color: #f0f9f4;
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
        .price {
          color: @priceColor;
          span {
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
