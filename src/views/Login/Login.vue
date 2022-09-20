<template>
  <!-- 头部组件 -->
  <login-header></login-header>
  <!-- 表单部分 -->
  <div class="login-main">
    <div class="box">
      <nav>
        <!-- :class = { active: 布尔值 } 动态切换 class 类名 布尔值为true 则处于激活状态-->
        <a href="javascript:;" @click="activeName='account'" :class="{ active : activeName === 'account' }">账户登录</a>
        <a href="javascript:;" @click="activeName='qrcode'" :class="{ active : activeName === 'qrcode' }">扫码登录</a>
      </nav>
      <!-- 账户登录 -->
      <login-form v-if="activeName==='account'">表单</login-form>
      <!-- 扫码登录 -->
      <div class="qrcode-box" v-if="activeName === 'qrcode'">
        <img src="@/assets/images/qrcode.jpg" />
        <p>打开 <a href="javascript:;">小兔鲜儿App</a> 扫码登录</p>
      </div>
    </div>
  </div>
  <!-- 底部组件 -->
  <login-footer></login-footer>
</template>

<script>
import LoginHeader from '@/views/Login/components/LoginHeader.vue'
import LoginForm from '@/views/Login/components/LoginForm.vue'
import LoginFooter from '@/views/Login/components/LoginFooter.vue'

import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
  name: 'XtxLogin',
  components: {
    LoginHeader,
    LoginForm,
    LoginFooter
  },
  // 为使用组合式api
  // 位于 created 和 beforeCreated之前，用于替代 created 和 beforeCreated
  // 在setup函数中不能访问到this
  setup () {
    // 在setup中使用ref函数，创建响应式数据
    const activeName = ref('account')
    // 存储回跳地址
    // useStore: 在组件的setup(中监听vuex里某个state的变化
    const store = useStore()
    // useRouter: 相当于vue2的this.$route表示当前激活的路由的状态信息
    const route = useRoute()
    // store.commit() 进行状态变更
    // commit()方法传值给vuex的 mutation 改变 state
    // commit()：用来提交当前模块的mutations
    store.commit('user/setRedirectUrl', route.query.redirectUrl || '/')
    return { activeName }
  }
}
</script>

<style lang="less" scoped>
  .login-main {
    position: relative;
    height: 488px;
    background-image: url('@/assets/images/login-bg.png');
    .box {
      position: absolute;
      right: 24%;
      top: 54px;
      width: 380px;
      min-height: 360px;
      padding: 20px 40px;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, .15);
      nav {
        display: flex;
        justify-content: space-between;
        position: relative;
        // height: 35px;
        &::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 8px;
          width: 1px;
          height: 20px;
          background-color: #ededed;
        }
        a {
          height: 35px;
          line-height: 35px;
          font-size: 18px;
          &.active {
            border-bottom: 2px solid @xtxColor;
          }
        }
      }
      // 二维码容器
      .qrcode-box {
        text-align: center;
        padding-top: 40px;
        p {
          margin-top: 10px;
          font-size: 16px;
          a {
            color: @xtxColor;
          }
        }
      }
    }
  }
</style>
