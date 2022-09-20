// 1.创建一个新的axios实例
// 2.请求拦截器，如果有token进行头部携带
// 3.响应拦截器：（1）剥离无效数据 （2）处理token无效
// 4.导出一个函数，调用当前的aixos实例发请求，返回值Promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址
// 原因：其他地方不是通过axios发请求的地方用上基准地址
// 按需导出
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net'
// 创建axios实例
const instance = axios.create({
  // axios的一些配置
  baseURL,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 拦截业务逻辑
  // 1.获取用户信息对象
  const { profile } = store.state.user
  // 2.判断是否有token
  if (profile.token) {
    // 3.设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截器
// res => res.data 取出 data数据  将来调用接口的时候直接拿到的是后台的数据
instance.interceptors.response.use(res => res.data, err => {
  // 401 状态码 进入该函数
  if (err.response && err.response.status === 401) {
    // 1.清空无效用户信息
    // 2.跳转到登录页
    // 3.跳转需要传参（当前路由地址）给登录页面
    store.commit('user/serUser', {})
    // router.currentRoute.value.fullPath当前路由地址，router.currentRoute是ref响应式数据
    // encodeURIComponent转换uri编码 防止解析地址出问题
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    // 跳转路由
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})
// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求：请求地址，请求方式，提交的数据
  return instance({
    url,
    method,
    // 1.如果是get请求 需要使用params来传递submitData
    // 2.如果不是get请求 需要使用data来传递submitData
    // [] 设置一个动态的key 写js表达式，js表达式的执行结果为key
    // method参数：get,Get,GET 转换成小写再判断
    // 对象中，['params]:submitData ==> params:submitData
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
