<template>
  <div class="goods-comment-image">
    <div class="list">
      <a
        href="javascript:;"
        v-for="(url, i) in pictures"
        :key="url"
        :class="{ active: currImg===url, active: index===i}"
        @click="currImg=url, index=i"
      >
        <img :src="url" alt="">
      </a>
    </div>
    <div class="preview" v-if="currImg">
      <img :src="currImg" alt="">
      <!-- 上一张 -->
      <a href="javascript:;" @click="toggle(-1)">
        <i class="iconfont icon-xiangzuojiantou prev"></i>
      </a>
      <!-- 下一张 -->
      <a href="javascript:;" @click="toggle(1)">
        <i class="iconfont icon-xiangyoujiantou next"></i>
      </a>
      <i @click="currImg=null" class="iconfont icon-close close"></i>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'GoodsCommentImage',
  props: {
    pictures: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const currImg = ref(null)
    const index = ref(0)
    // 点击左右箭头切换 上一张 下一张
    const toggle = (step) => {
      index.value = index.value + step
      // 上一张
      if (step === -1) {
        index.value = (props.pictures.length + index.value) % props.pictures.length
        currImg.value = props.pictures[index.value]
      }
      // 下一张
      if (step === 1) {
        index.value = index.value % props.pictures.length
        currImg.value = props.pictures[index.value]
      }
    }
    return { currImg, index, toggle }
  }
}
</script>

<style lang="less" scoped>
  .goods-comment-image {
    .list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      a {
        width: 120px;
        height: 120px;
        margin-right: 20px;
        margin-bottom: 10px;
        border: 1px solid #e4e4e4;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        &.active {
          border-color: @xtxColor;
        }
      }
    }
    .preview {
      position: relative;
      width: 480px;
      height: 480px;
      margin-bottom: 20px;
      border: 1px solid #e4e4e4;
      background-color: #f8f8f8;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .prev,
        .next {
          position: absolute;
          top: 50%;
          width: 44px;
          height: 44px;
          margin-top: -22px;
          background-color: rgba(0, 0, 0, .3);
          opacity: 0;
          transition: opacity 0.5s;
          border-radius: 50%;
          text-align: center;
          line-height: 44px;
          color: #f5f5f5;
          font-size: 20px;
        }
        .prev {
          left: 10px;
        }
        .next {
          right: 10px;
        }
      i {
        &.close {
          position: absolute;
          right: 0;
          top: 0;
          width: 30px;
          height: 30px;
          background: rgba(0,0,0,0.2);
          color: #fff;
          text-align: center;
          line-height: 30px;
        }
      }
      &:hover {
        .prev,
        .next {
          opacity: 1;
        }
      }
    }
  }
</style>
