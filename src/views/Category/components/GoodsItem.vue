<template>
  <router-link :to="`/product/${goods.id}`" class="goods-item">
    <img :src="goods.picture" alt="">
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">￥{{ goods.price }}</p>
  </router-link>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less" scoped>
  .goods-item {
    display: block;
    width: 220px;
    padding: 20px 30px;
    text-align: center;
    // .hoverShadow();
    img {
      width: 160px;
      height: 160px;
    }
    p {
      padding-top: 10px;
    }
    .name {
      font-size: 16px;
    }
    .desc {
      height: 29px;
      color: #999;
    }
    .price {
      color: @priceColor;
      font-size: 20px;
    }
  }
</style>
