// 提供商品相关的API函数
import request from '@/utils/request.js'

/**
 * 获取相关推荐商品|猜你喜欢商品
 * @param {String} id - 商品ID，传入相关推荐，不传猜你喜欢
 * @param {Integer} limit - 商品数量
*/
export const findRelevantGoods = ({ id, limit = 16 }) => {
  return request('/goods/relevant', 'get', { id, limit })
}

/**
 * 获取商品详情
 * @param {String} id - 商品ID
*/
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

/**
 * 查询商品评价信息
 * @param {String} id - 商品ID
 * @return
*/
export const findGoodsCommentInfo = (id) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}

/**
 * 查询商品评价列表
 * @param {String} id - 商品ID
 * @param {Object} params - 商品ID
 * @return
*/
export const findGoodsCommentList = (id, params) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}

/**
 * 获取热销榜数据
 * @param {String} id - 商品ID
 * @param {Integer} limit - 商品数量
 * @param {Integer} type - 热销类型， 1为24小时， 2为周榜，3为总榜，默认为1
*/
export const findGoodsHot = ({
  id,
  limit = 3,
  type = 1
}) => {
  return request('/goods/hot', 'get', {
    id,
    limit,
    type
  })
}
