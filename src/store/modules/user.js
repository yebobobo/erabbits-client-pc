// 用户模块
export default {
  // 开启 namespace:true,该模块为命名空间模块
  namespaced: true,
  state () {
    return {
      // 用户信息
      profile: {
        // 用户ID
        id: '',
        // 用户头像
        avatar: '',
        // 用户昵称
        nickname: '',
        // 用户账户
        account: '',
        // 用户手机号
        mobile: '',
        token: ''
      },
      // 登录后回跳路径
      redirectUrl: '/'
    }
  },
  mutations: {
    // 修改用户信息，payload就是用户信息对象
    setUser (state, payload) {
      state.profile = payload
    },
    // 修改回跳地址
    setRedirectUrl (state, url) {
      state.redirectUrl = url
    }
  }
}
