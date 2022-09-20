<template>
  <ul class="header-nav" ref="target">
    <li class="home">
      <router-link to="/">首页</router-link>
    </li>
    <li v-for="item in list" :key="item.id" @mouseover="show(item)" @mouseleave="hide(item)">
      <router-link :to="`/category/${ item.id }`" @click="hide(item)">{{ item.name }}</router-link>
      <!-- 二级分类 -->
      <div class="layer" :class="{ open: item.open }">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <router-link :to="`/category/sub/${sub.id}`" @click="hide(item)">
              <img :src="sub.picture" alt="">
              <p>{{ sub.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'HeaderNav',
  setup () {
    const store = useStore()
    // 拿到vuex中的分类列表
    // computed：计算属性
    const list = computed(() => {
      return store.state.category.list
    })
    // onMounted()初始化数据
    onMounted(() => {
      store.dispatch('getList')
    })
    const show = (item) => {
      store.commit('show', item.id)
    }
    const hide = (item) => {
      store.commit('hide', item.id)
    }
    return { list, show, hide }
  }
}
</script>

<style lang="less" scoped>
  .header-nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 820px;
    padding-left: 40px;
    z-index: 999;
    > li {
      width: 38px;
      margin-right: 40px;
      text-align: center;
      > a {
        display: inline-block;
        height: 32px;
        font-size: 16px;
        line-height: 32px;
      }
      &:hover {
        > a {
          color: @xtxColor;
          border-bottom: 2px solid @xtxColor;
        }
      }
    }
  }
  // 二级类名弹层
  .layer {
    &.open {
      height: 132px;
      opacity: 1;
    }
    position: absolute;
    left: -200px;
    top: 56px;
    width: 1240px;
    height: 0;
    background-color: #fff;
    overflow: hidden;
    opacity: 0;
    box-shadow: 0 0 5px #ccc;
    transition: all .2s, .1s;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 70px;
      align-items: center;
      height: 132px;
      li {
        width: 110px;
        text-align: center;
        img {
          width: 60px;
          height: 60px;
        }
        p {
          padding-top: 10px;
        }
        &:hover {
          p {
            color: @xtxColor;
          }
        }
      }
    }
  }
</style>
