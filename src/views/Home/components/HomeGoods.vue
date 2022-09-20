<template>
  <div class="home-goods">
    <router-link :to="`/product/${goods.id}`" class="image">
      <img :src="goods.picture"/>
    </router-link>
    <p class="name ellipsis-2">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">￥{{ goods.price }}</p>
    <div class="extra">
      <router-link to="/">
        <span>找相似</span>
        <span>发现更多宝贝<i class="iconfont icon-angleright"></i></span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeGoods',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less" scoped>
  .home-goods {
    position: relative;
    width: 240px;
    height: 300px;
    padding: 10px 30px;
    overflow: hidden;
    border: 1px solid transparent;
    transition: all 0.5s;
    .image {
      display: block;
      width: 160px;
      height: 160px;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      margin-top: 6px;
      font-size: 16px;
      &.name {
        height: 44px;
      }
      &.desc {
        height: 22px;
        color: #666;
      }
      &.price {
        margin-top: 10px;
        font-size: 20px;
        color: @xtxColor;
      }
    }
    .extra {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 86px;
      width: 100%;
      background-color: @xtxColor;
      text-align: center;
      transform: translate3d(0, 100%, 0);
      transition: all .5s;
      span {
        display: block;
        width: 120px;
        margin: 0 auto;
        color: #fff;
        line-height: 30px;
        &:first-child {
          margin-top: 5px;
          border-bottom: 1px solid #fff;
          font-size: 18px;
          line-height: 40px;
        }
        i {
          font-size: 14px;
        }
      }
    }
    &:hover {
      border-color: @xtxColor;
      .extra {
        transform: none;
      }
    }
  }
</style>
