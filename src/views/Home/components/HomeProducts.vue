<template>
  <div class="home-products" ref="target">
    <!-- 标题 -->
    <home-panel v-for="cate in list" :key="cate.id" :title="cate.name">
      <!--  -->
      <template #right>
        <!-- 子标题 -->
        <div class="sub">
          <router-link v-for="sub in cate.children" :key="sub.id" :to="`/category/sub/${sub.id}`">{{ sub.name }}</router-link>
        </div>
        <!-- 查看全部 -->
        <xtx-more :path="`/category/${cate.id}`"></xtx-more>
      </template>
      <div class="box">
        <!-- 左边的大图片 -->
        <router-link class="cover" :to="`/category/${cate.id}`">
          <img :src="cate.picture" alt="">
          <!-- 定位的文字 -->
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </router-link>
        <!-- 右边的商品列表 -->
        <ul class="goods-list">
          <li v-for="item in cate.goods" :key="item.id">
            <home-goods :goods="item"></home-goods>
          </li>
        </ul>
      </div>
    </home-panel>
  </div>
</template>

<script>
import HomePanel from '@/views/Home/components/HomePanel.vue'
import HomeGoods from '@/views/Home/components/HomeGoods.vue'
import { useLazyData } from '@/hooks/index.js'
import { findGoods } from '@/api/home.js'
export default {
  name: 'HomeProducts',
  components: {
    HomePanel,
    HomeGoods
  },
  setup () {
    const { result, target } = useLazyData(findGoods)

    return { list: result, target }
  }
}
</script>

<style lang="less" scoped>
  .home-products {
    height: 2900px;
    background-color: #fff;
    .sub {
      a {
        padding: 2px 12px;
        border-radius: 4px;
        font-size: 16px;
        &:hover {
          background-color: @xtxColor;
          color: #fff;
        }
        &:last-child {
          margin-right: 80px;
        }
      }
    }
    .xtx-more {
      margin-bottom: 3px;
    }
    .box {
      display: flex;
      .cover {
        position: relative;
        width: 240px;
        height: 610px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          // 指定可替换元素的内容应该如何适应到其使用的高度和宽度确定的框
          // cover:被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。
          object-fit: cover;
        }
        .label {
          position: absolute;
          left: 0;
          top: 50%;
          display: flex;
          width: 188px;
          height: 66px;
          font-size: 18px;
          font-weight: 400;
          color: #fff;
          line-height: 66px;
          transform: translate3d(0, -50%, 0);
          span {
            text-align: center;
            &:first-child {
              width: 76px;
              background-color: rgba(0, 0, 0, .9);
            }
            &:last-child {
              flex: 1;
              background-color: rgba(0, 0, 0, .7);
            }
          }
        }
      }
      .goods-list {
        display: flex;
        flex-wrap: wrap;
        width: 990px;
        li {
          width: 240px;
          height: 300px;
          margin-right: 10px;
          margin-bottom: 10px;
          &:nth-last-child(-n+4) {
            margin-bottom: 0;
          }
          &:nth-child(4n) {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
