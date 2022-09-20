<template>
  <div class="shortcuts">
    <div class="wrapper">
      <router-link to="/login">请先登录</router-link>
      <router-link to="/register">免费注册</router-link>
      <router-link to="/login">我的订单</router-link>
      <router-link to="/login">会员中心</router-link>
      <a href="javascript:;">帮助我们</a>
      <a href="javascript:;">关于我们</a>
      <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonShortcuts'
}
</script>

<style lang="less" scoped>
  .shortcuts {
    height: 52px;
    background-color: #333;
    .wrapper {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #fff;
      a {
        display: inline-block;
        padding: 0 15px;
        border-right: 1px solid #fff;
        color: #fff;
        line-height: 1;
        &:last-child {
          border-right: none;
        }
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
</style>
