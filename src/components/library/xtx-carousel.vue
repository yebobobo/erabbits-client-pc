<template>
  <div class="xtx-carousel" @mouseenter="stop()" @mouseleave="start()">
    <!-- 图片容器 -->
    <ul class="carousel-body">
      <!-- fade 显示的图片加上 -->
      <li
        class="carousel-item"
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ fade: index===i }"
      >
        <!-- 图片 -->
        <router-link v-if="item.imgUrl" to="/">
          <img :src="item.imgUrl" alt="">
        </router-link>
        <!-- 商品列表 -->
        <div v-else class="slider">
          <router-link v-for="goods in item" :key="goods.id" :to="`/product/${goods.id}`">
            <img :src="goods.picture" alt="">
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">￥{{ goods.price }}</p>
          </router-link>
        </div>
      </li>
    </ul>
    <!-- 上一张 -->
    <a href="javascript:;" @click="toggle(-1)" class="carousel-btn prev">
      <i class="iconfont icon-xiangzuojiantou"></i>
    </a>
    <!-- 下一张 -->
    <a href="javascript:;" @click="toggle(1)" class="carousel-btn next">
      <i class="iconfont icon-xiangyoujiantou"></i>
    </a>
    <!-- 指示器 -->
    <div class="carousel-indicator">
      <!-- active激活点 -->
      <span @click="index=i" v-for="(item, i) in sliders" :key="i" :class="{active:index===i}"></span>
    </div>
  </div>
</template>

<script>
import { ref, watch, onUnmounted } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    // 轮播图数据
    sliders: {
      type: Array,
      default: () => []
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 间隔时长
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    // 控制显示图片的索引
    const index = ref(0)

    // 1.自动轮播图的逻辑
    let timer = null
    const autoPlayFn = () => {
      // 防止定时器重复添加
      clearInterval(timer)
      // 自动播放
      timer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
      }, props.duration)
    }
    // 需要监听sliders数据变化 判断如果有数据且autoPlay是true
    watch(() => props.sliders, (newValue) => {
      if (newValue.length && props.autoPlay) {
        autoPlayFn()
      }
    }, { immediate: true })

    // 2.鼠标进入暂停 离开开启自动播放（有开启条件）
    const stop = () => {
      // 清除定时器
      if (timer) clearInterval(timer)
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }

    // 3. 点击左右箭头可以切换 上一张下一张
    const toggle = (step) => {
      // 将要改变的索引
      index.value = index.value + step
      // 上一张
      if (step === -1) {
        index.value = (props.sliders.length + index.value) % props.sliders.length
      }
      // 下一张
      if (step === 1) {
        index.value = index.value % props.sliders.length
      }
    }

    // 4.组件卸载，清除定时器
    onUnmounted(() => {
      clearInterval(timer)
    })
    return { index, stop, start, toggle }
  }
}
</script>

<style lang="less" scoped>
  .xtx-carousel {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 150px;
    .carousel-body {
      width: 100%;
      height: 100%;
      .carousel-item {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.5s linear;
        &.fade {
          opacity: 1;
          z-index: 1;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .carousel-btn {
      position: absolute;
      top: 228px;
      width: 44px;
      height: 44px;
      background-color: rgba(0, 0, 0, .2);
      border-radius: 50%;
      color: #fff;
      text-align: center;
      line-height: 44px;
      z-index: 2;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
    .carousel-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      width: 100%;
      text-align: center;
      z-index: 2;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-color: rgba(0, 0, 0, .2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background-color: #fff;
        }
      }
    }
    &:hover {
      .carousel-btn {
        opacity: 1;
      }
    }
  }
  // 轮播商品
  .slider {
    display: flex;
    justify-content: space-around;
    padding: 0 40px;
    > a {
      width: 240px;
      text-align: center;
      img {
        padding: 20px;
        width: 230px!important;
        height: 230px!important;
      }
      .name {
        padding: 0 40px;
        font-size: 16px;
        color: #666;
      }
      .price {
        margin-top: 15px;
        font-size: 16px;
        color: @priceColor;
      }
    }
  }
</style>
