<template>
  <div class="register-form">
    <div class="wrapper">
      <div class="card">
        <h3>新用户注册</h3>
        <Form :validation-schema="schema" ref="formCom" v-slot="{errors }" autocomplete="off" class="form">
          <!-- 用户名称 -->
          <div class="form-item">
            <i class="iconfont icon-jurassic_user icon"></i>
            <Field name="account" type="text" placeholder="设置用户名称" v-model="form.account" :class="{ err : errors.account }"></Field>
            <span class="error" v-if="errors.account">
              <i class="iconfont icon-warning"></i>
              {{ errors.account }}
            </span>
          </div>
          <!-- 手机号码 -->
          <div class="form-item">
            <i class="iconfont icon-phone icon"></i>
            <Field name="mobile" type="text" placeholder="输入手机号码" v-model="form.mobile" :class="{ err : errors.mobile }"></Field>
            <span class="error" v-if="errors.mobile">
              <i class="iconfont icon-warning"></i>
              {{ errors.mobile }}
            </span>
          </div>
          <!-- 短信验证码 -->
          <div class="form-item">
            <i class="iconfont icon-xiaoxi icon"></i>
            <Field name="code" type="text" placeholder="短信验证码" v-model="form.code" :class="{ err : errors.code }"></Field>
            <span class="code">发送验证码</span>
            <span class="error" v-if="errors.code">
              <i class="iconfont icon-warning"></i>
              {{ errors.code }}
            </span>
          </div>
          <!-- 密码-->
          <div class="form-item">
            <i class="iconfont icon-jiesuo icon"></i>
            <Field name="password" type="password" placeholder="设置6至20位字母、数字和符号组合" v-model="form.password" :class="{ err : errors.password }"></Field>
            <span class="error" v-if="errors.password">
              <i class="iconfont icon-warning"></i>
              {{ errors.password }}
            </span>
          </div>
          <!-- 确认上述密码 -->
          <div class="form-item">
            <i class="iconfont icon-jiesuo icon"></i>
            <Field name="rePassword" type="password" placeholder="请再次输入上面密码" v-model="form.rePassword" :class="{ err : errors.rePassword }"></Field>
            <span class="error" v-if="errors.rePassword">
              <i class="iconfont icon-warning"></i>
              {{ errors.rePassword }}
            </span>
          </div>
          <div class="form-item">
            <div class="agree">
              <xtx-checkbox v-model="form.isAgree"></xtx-checkbox>
              <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree" :class="{ err : errors.isAgree }">
                <span>已阅读并同意</span>
                <a href="javascript:;">《用户服务协议》</a>
              </Field>
              <span class="error" v-if="errors.isAgree">
                <i class="iconfont icon-warning"></i>
                {{ errors.isAgree }}
              </span>
            </div>
          </div>
          <button class="submit" disabled>立即注册</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { Form, Field } from 'vee-validate'
import schema from '@/utils/vee-validate-schema.js'
export default {
  name: 'XtxRegister',
  components: {
    Form,
    Field
  },
  setup () {
    // 表单数据对象
    const form = reactive({
      account: null,
      mobile: null,
      code: null,
      password: null,
      rePassword: null,
      isAgree: true
    })

    // 定义校验规则
    const mySchema = {
      // 用户名
      account: schema.account,
      // 手机号
      mobile: schema.mobile,
      // 验证码
      code: schema.code,
      // 密码
      password: schema.password,
      // 确认密码
      rePassword: schema.rePassword,
      // 同意协议
      isAgree: schema.isAgree
    }

    return { form, schema: mySchema }
  }
}
</script>

<style lang="less" scoped>
  .register-form {
    padding: 50px 0;
    background-color: #f5f5f5;
    .card {
      width: 100%;
      min-height: 700px;
      background-color: #fff;
      h3 {
        height: 140px;
        padding-left: 50px;
        font-size: 26px;
        font-weight: 400;
        color: #999;
        line-height: 140px;
      }
      .form {
        padding-left: 460px;
        .form-item {
          position: relative;
          padding-bottom: 24px;
          .icon {
            &.iconfont {
              position: absolute;
              left: 15px;
              top: 13px;
              font-size: 18px;
              color: #999;
            }
          }
          &:nth-child(-n+5) {
            input {
              width: 300px;
              height: 50px;
              border: 1px solid #e4e4e4;
              padding-left: 40px;
              &.active,
              &:focus {
                border-color: @xtxColor;
              }
              &.err {
                border-color: @priceColor;
              }
            }
          }
          .code {
            position: absolute;
            left: 210px;
            top: 16px;
            color: @xtxColor;
          }
          .agree {
            a {
              color: @xtxColor;
            }
          }
          .error {
            margin-left: 8px;
            font-size: 12px;
            color: @priceColor;
            i {
              font-size: 14px;
              margin-right: 2px;
            }
          }
        }
        .submit {
          display: block;
          width: 300px;
          height: 50px;
          background-color: @xtxColor;
          border-radius: 4px;
          font-size: 16px;
          color: #fff;
          text-align: center;
          line-height: 50px;
          border: none;
          &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }
        }
      }
    }
  }
</style>
