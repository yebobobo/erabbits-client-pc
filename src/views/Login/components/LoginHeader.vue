<template>
  <div class="login-header wrapper">
    <h1 class="logo">小兔鲜儿</h1>
    <router-link to="/">
      进入网站首页
      <i class="iconfont icon-angleright"></i>
      <i class="iconfont icon-angleright"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'LoginHeader'
}
</script>

<style lang="less" scoped>
  .login-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 130px;
    .logo {
      width: 200px;
      height: 100%;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
      text-indent: -9999px;
    }
    a {
      display: inline-block;
      margin-top: 50px;
      font-size: 16px;
      i {
        color: @xtxColor;
        font-size: 12px;
        letter-spacing: -.5em;
        &:last-child {
          opacity: .5;
        }
      }
    }
  }
</style>
