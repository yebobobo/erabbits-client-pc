// 用户相关的接口
import request from '@/utils/request.js'

/**
 * 账号密码登录
 * @param {String} account - 账户
 * @param {String} password - 密码
 * @return Promise
*/
export const userAccountLogin = ({ account, password }) => {
  return request('/login', 'post', { account, password })
}
/**
 * 获取手机号的短信验证码
 * @param {String} mobile - 手机号
 * @return Promise
*/
export const userMobileLoginMsg = (mobile) => {
  return request('/login/code', 'get', { mobile })
}

/**
 * 手机号登录
 * @param {String} mobile -手机号
 * @param {String} code -短信验证码 默认123456
 * @return Promise
*/
export const userMobileLogin = ({ mobile, code }) => {
  return request('/login/code', 'get', { mobile, code })
}

/**
 * QQ登录
 * @param {String} unionId - QQ唯一表示 openId
 * @param {String} source - 客户端类型 1 PC
 * @return
*/
export const userQQLogin = (unionId, source = 1) => {
  return request('/login/social', 'post', { unionId, source })
}

/**
 * 获取QQ绑定时候的短信验证码
 * @param {String} mobile - 手机号
 * @return Promise
*/
export const userQQBindCode = (mobile) => {
  return request('/login/social/code', 'get', { mobile })
}

/**
 * QQ登录-绑定账户
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @return Promise
*/
export const userQQBindLogin = ({ unionId, mobile, code }) => {
  return request('/login/social/bind', 'post', { unionId, mobile, code })
}

/**
 * 校验用户是否存在
 * @param {String} account - 账户
 * @return Promise
*/
export const userAccountCheck = (account) => {
  return request('/register/check', 'get', { account })
}

/**
 * 获取QQ完善信息的时候短信验证码
 * @param {String} mobile - 手机号
 * @return Promise
*/
export const userQQPatchCode = (mobile) => {
  return request('/register/code', 'get', { mobile })
}

/**
 * QQ登录-完善信息
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} mobile - 手机号
 * @param {String} code - 验证码
 * @param {String} account - 账号
 * @param {String} password - 密码
 * @return Promise
*/
export const userQQPatchLogin = ({ unionId, mobile, code, account, password }) => {
  return request(`/login/social/${unionId}/complement`, 'post', { unionId, mobile, code, account, password })
}
