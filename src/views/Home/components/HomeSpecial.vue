<template>
  <div class="home-special">
    <home-panel title="最新专题">
      <!-- 查看全部 -->
      <template #right>
        <xtx-more></xtx-more>
      </template>
      <div ref="target" class="special-list">
        <div class="special-item" v-for="item in specialList" :key="item.id">
          <router-link to="/">
            <img :src="item.cover" alt="">
            <div class="meta">
              <p class="title">
                <span class="top ellipsis">{{ item.title }}</span>
                <span class="sub ellipsis">{{ item.summary }}</span>
              </p>
              <span class="price">￥{{ item.lowestPrice }}起</span>
            </div>
          </router-link>
          <div class="foot">
            <span class="like">
              <i class="iconfont icon-tubiaozhizuomoban-"></i>
              {{ item.collectNum }}
            </span>
            <div class="view">
              <i class="iconfont icon-see"></i>
              {{ item.viewNum }}
            </div>
            <div class="reply">
              <i class="iconfont icon-xiaoxi"></i>
              {{ item.replyNum }}
            </div>
          </div>
        </div>
      </div>
    </home-panel>
  </div>
</template>

<script>
import HomePanel from '@/views/Home/components/HomePanel.vue'
import { useLazyData } from '@/hooks/index.js'
import { findSpecial } from '@/api/home.js'
export default {
  name: 'HomeSpecial',
  components: {
    HomePanel
  },
  setup () {
    const { result, target } = useLazyData(findSpecial)
    return { specialList: result, target }
  }
}
</script>

<style lang="less" scoped>
  .home-special {
    background-color: #f5f5f5;
    padding-bottom: 50px;
    .special-list {
      display: flex;
      justify-content: space-between;
      height: 380px;
      padding-bottom: 20px;
      .special-item {
        width: 404px;
        background-color: #fff;
        .hoverShadow();
        a {
          position: relative;
          display: block;
          width: 100%;
          height: 288px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .meta {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 288px;
            // 渐变色
            background-image: linear-gradient(to top, rgba(0, 0, 0, .8), transparent 50%);
            .title {
              position: absolute;
              left: 16px;
              bottom: 0;
              width: 70%;
              height: 70px;
              .top {
                display: block;
                color: #fff;
                font-size: 22px;
              }
              .sub {
                display: block;
                color: #999;
                font-size: 16px;
              }
            }
            .price {
              position: absolute;
              right: 16px;
              bottom: 25px;
              padding: 2px 7px;
              color: @priceColor;
              font-size: 16px;
              background-color: #fff;
              border-radius: 2px;
            }
          }
        }
        .foot {
          height: 72px;
          padding: 0 20px;
          line-height: 72px;
          font-style: 16px;
          i {
            display: inline-block;
            width: 15px;
            height: 14px;
            margin-right: 5px;
            color: #999;
          }
          .like,
          .view {
            float: left;
            margin-right: 25px;
            vertical-align: middle;
          }
          .reply {
            float: right;
            vertical-align: middle;
          }
        }
      }
    }
  }
</style>
