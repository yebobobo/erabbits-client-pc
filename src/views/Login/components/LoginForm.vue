<template>
  <div class="login-form">
    <div class="toggle">
      <a href="javascript:;" @click="isMsgLogin=false" v-if="isMsgLogin">密码登录</a>
      <a href="javascript:;" @click="isMsgLogin=true" v-else>手机验证码登录</a>
    </div>
    <!--
      Form替代原生form
      必要属性：validation-schema属性值为包含校验规则函数的对象名
      autocomplete:自动提示off关
      ref绑定DOM元素
      v-slot作用域插槽
    -->
    <Form :validation-schema="schema" ref="formCom" v-slot="{ errors }" autocomplete="off" class="form">
      <!--
        template使用情况：
          1.根据某个状态渲染多个模板的 v-if v-else
          2.插槽
       -->
       <!-- 密码登录form表单界面 -->
      <template v-if="!isMsgLogin">
        <!-- 用户名 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-jurassic_user"></i>
            <!--
              Field替代原生input
              必要属性：v-model为双向绑定的表单数据，name属性值schema对象中对应的校验函数名
             -->
            <Field v-model="form.account" name="account" type="text" placeholder="请输入用户名" :class="{ error : errors.account }"></Field>
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning"></i>
            {{ errors.account }}
          </div>
        </div>
        <!-- 密码 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-jiesuo"></i>
            <Field v-model="form.password" name="password" type="password" placeholder="请输入密码" :class="{ error: errors.password }"></Field>
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning"></i>
            {{ errors.password }}
          </div>
        </div>
      </template>
      <!-- 手机验证码登录form表单界面 -->
      <template v-else>
        <!-- 手机号 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-phone"></i>
            <Field v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号" :class="{ error: errors.mobile }"></Field>
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning"></i>
            {{ errors.mobile }}
          </div>
        </div>
        <!-- 验证码 -->
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-xiaoxi"></i>
            <Field v-model="form.code" name="code" type="text" placeholder="请输入验证码" :class="{ error: errors.code }"></Field>
            <span class="code" @click="send()">
              {{ time === 0 ? '发送验证码' : `${time}秒后发送` }}
            </span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning"></i>
            {{ errors.code }}
          </div>
        </div>
      </template>
      <!-- 我同意 -->
      <div class="form-item">
        <div class="agree">
          <xtx-checkbox v-model="form.isAgree"></xtx-checkbox>
          <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" :class="{ error: errors.isAgree }">
            <span>我已同意</span>
            <a href="javascript:;">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:;">《服务条款》</a>
          </Field>
        </div>
        <div class="error" v-if="errors.isAgree">
          <i class="iconfont icon-warning"></i>
          {{ errors.isAgree }}
        </div>
      </div>
      <!-- 登录按钮 -->
      <a href="javascript:;" class="btn" @click="login()">登录</a>
    </Form>
    <div class="action">
      <a href="javascript:;">忘记密码？</a>
      <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      </a>
      <router-link to="/register">免费注册</router-link>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch, onUnmounted } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema.js'
import { userMobileLogin, userAccountLogin, userMobileLoginMsg } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
// import { useRoute, useRouter } from 'vue-router'
// useIntervalFn：实现验证码倒计时
import { useIntervalFn } from '@vueuse/core'
export default {
  name: 'LoginForm',
  components: {
    Form,
    Field
  },
  setup () {
    // 切换短信登录
    // ref将数据变成响应式数据
    // 当数据发生变化时UI自动更新
    // ref用于基本数据类型
    const isMsgLogin = ref(false)

    // 表单数据对象
    // reactive将数据变成响应式数据
    // 当数据发生变化时UI自动更新
    // reactive用于复杂数据类型，对象
    const form = reactive({
      account: null,
      password: null,
      mobile: null,
      code: null,
      isAgree: true
    })

    // 定义校验规则
    const mySchema = {
      // 校验函数规则：返回true是校验成功，返回一个字符串就是失败，字符串就是错误提示
      // 用户名
      account: schema.account,
      // 密码
      password: schema.password,
      // 手机号
      mobile: schema.mobile,
      // 验证码
      code: schema.code,
      // 是否同意
      isAgree: schema.isAgree
    }

    // 监听isMsgLogin重置表单 （数据+清除校验结果）
    const formCom = ref(null)
    watch(isMsgLogin, () => {
      // 重置数据
      form.account = null
      form.password = null
      form.mobile = null
      form.code = null
      form.isAgree = true
      // 如果没有销毁Field组件，之前的校验结果不会清除
      // Form组件提供了一个resetForm函数清除校验规则
      formCom.value.resetForm()
    })

    // 需要在点击登录的时候对整体表单进行校验
    const store = useStore()
    // const router = useRouter()
    // const route = useRoute()
    const login = async () => {
      // Form组件提供了一个validate函数作为整体表单校验 返回一个Promise
      const valid = await formCom.value.validate()
      if (valid) {
        try {
          let data = null
          if (isMsgLogin.value) {
            // 手机号登录
            // 1.准备一个API做手机号登录
            // 2.调用API函数
            // 3.成功：储存用户信息+跳转至来源页或首页+消息提示
            // 4.失败：消息提示
            const { mobile, code } = form
            data = await userMobileLogin({ mobile, code })
          } else {
            // 账号登录
            // 1.准备一个API做账户登录
            // 2.调用API函数
            // 3.成功：储存用户信息+跳转至来源页或首页+消息提示
            // 4.失败：消息提示
            const { account, password } = form
            data = await userAccountLogin({ account, password })
          }
          // 存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
        } catch (e) {
          if (e.response.data) {
            ElMessage({
              message: e.response.data.message || '登录失败',
              type: 'error'
            })
          }
        }
      }
    }

    // 发送验证码
    // pause 暂停 resume 开始
    // useIntervalFn(回调函数, 执行间隔,是否立即开启)
    const time = ref(0)
    const { pause, resume } = useIntervalFn(() => {
      time.value--
      if (time.value <= 0) {
        // 时间小于0，暂停
        pause()
      }
    }, 1000, { immediate: false }
    )
    onUnmounted(() => {
      pause()
    })

    // 发送验证码
    // 1. 绑定发送验证码按钮点击事件
    // 2.校验手机号，如果成功才去发送短信（定义API） 请求成功开启60S的倒计时，不能再次点击，倒计时结束恢复
    // 3.如果失败 失败的校验样式显示出来
    const send = async () => {
      const valid = mySchema.mobile(form.mobile)
      if (valid === true) {
        // valid为true通过
        if (time.value === 0) {
          // 没有倒计时才可以发送
          await userMobileLoginMsg(form.mobile)
          ElMessage({
            message: '发送成功',
            type: 'success'
          })
          time.value = 60
          // 开始
          resume()
        }
      } else {
        // 失败，使用vee的错误函数显示错误信息 setFieldError(字段,错误信息)
        formCom.value.setFieldError('mobile', valid)
      }
    }
    return { isMsgLogin, form, schema: mySchema, formCom, login, time, send }
  }
}
</script>

<style lang="less" scoped>
  .login-form {
    .toggle {
      padding-top: 15px;
      text-align: right;
      a {
        color: @xtxColor;
      }
    }
    .form {
      // .form-item
      &-item {
        margin-bottom: 24px;
        .input {
          position: relative;
          height: 36px;
          margin-top: 17px;
          > i {
            position: absolute;
            left: 1px;
            top: 1px;
            width: 34px;
            height: 34px;
            background-color: #cfcdcd;
            color: #fff;
            font-size: 18px;
            line-height: 34px;
            text-align: center;
          }
          input {
            width: 100%;
            height: 36px;
            padding-left: 44px;
            border: 1px solid #cfcdcd;
            line-height: 36px;
            &.active,
            &:focus {
              border-color: @xtxColor;
            }
            &.error {
              border-color: @priceColor;
            }
          }
          .code {
            position: absolute;
            right: 1px;
            top: 1px;
            width: 90px;
            height: 34px;
            background-color: #f5f5f5;
            color: #666;
            text-align: center;
            line-height: 34px;
            cursor: pointer;
          }
        }
        >.error {
          position: absolute;
          font-size: 12px;
          line-height: 24px;
          color: @priceColor;
          i {
            font-size: 14px;
            margin-right: 2px;
          }
        }
        .agree {
          // padding: 17px 0;
          color: #b3b3b3;
          a {
            color: #069;
          }
        }
      }
      .btn {
        display: block;
        width: 100%;
        height: 40px;
        background-color: @xtxColor;
        color: #fff;
        text-align: center;
        line-height: 40px;
        &.disabled {
          background-color: #cfcdcd;
        }
      }
    }
    .action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
    }
  }
</style>
