<template>
  <div class="login-footer">
    <p>
      <a href="javascript:;">关于我们</a>
      <a href="javascript:;">帮助中心</a>
      <a href="javascript:;">售后服务</a>
      <a href="javascript:;">配送与验收</a>
      <a href="javascript:;">商务合作</a>
      <a href="javascript:;">搜索推荐</a>
      <a href="javascript:;">友情链接</a>
    </p>
    <p>CopyRight © 小兔鲜儿</p>
  </div>
</template>

<script>
export default {
  name: 'LoginFooter'
}
</script>

<style lang="less" scoped>
  .login-footer {
    height: 115px;
    padding-top: 40px;
    font-size: 15px;
    color: #999;
    text-align: center;
    p {
      margin-bottom: 20px;
      a {
        display: inline-block;
        padding: 0 10px;
        border-right: 1px solid #999;
        color: #999;
        line-height: 1;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
</style>
