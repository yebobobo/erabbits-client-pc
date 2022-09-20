// 提供首页相关API函数
import request from '@/utils/request.js'

/**
 * 获取品牌
 * @param {Integer} limit - 品牌个数
 * @return Promise
*/
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}

/**
 * 获取广告区轮播图
 * @return Promise
*/
export const findBanner = () => {
  return request('/home/banner', 'get')
}

/**
 * 获取新鲜好物
 * @return Promise
*/
export const findNew = () => {
  return request('/home/new', 'get')
}

/**
 * 获取人气推荐
 * @return Promise
*/
export const findHot = () => {
  return request('/home/hot', 'get')
}

/**
 * 获取商品板块
 * @return Promise
*/
export const findGoods = () => {
  return request('/home/goods', 'get')
}

/**
 * 获取最新专题
 * @return Promise
*/
export const findSpecial = () => {
  return request('/home/special', 'get')
}
