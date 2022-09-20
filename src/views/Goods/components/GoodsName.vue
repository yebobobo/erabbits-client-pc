<template>
  <div class="goods-name">
    <p class="g-name">{{ goods.name }}</p>
    <p class="g-desc">{{ goods.desc }}</p>
    <p class="g-price">
      <span>{{ goods.price }}</span>
      <span>{{ goods.oldPrice }}</span>
    </p>
    <div class="g-service">
      <dl>
        <dt>促销</dt>
        <dd>12月好物放送, App领券购买直降120元</dd>
      </dl>
      <dl>
        <dt>配送</dt>
        <dd>至 <xtx-city @change="changeCity" :fullLocation="fullLocation"></xtx-city></dd>
      </dl>
      <dl>
        <dt>服务</dt>
        <dd>
          <span>无忧退货</span>
          <span>快速退款</span>
          <span>免费包邮</span>
          <a href="javascript:;">了解详情</a>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'GoodsName',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    // 提供给后台的四项数据（没登录）
    const provinceCode = ref('110000')
    const cityCode = ref('119900')
    const countryCode = ref('110101')
    const fullLocation = ref('北京市 市辖区 东城区')
    // 取出用户收货地址中默认的地址给四个数据赋值（已登录）
    if (props.goods.userAddresses) {
      const defaultAddresses = props.goods.userAddresses.find(item => item.isDefault === 1)
      if (defaultAddresses) {
        provinceCode.value = defaultAddresses.provinceCode
        cityCode.value = defaultAddresses.cityCode
        countryCode.value = defaultAddresses.countryCode
        fullLocation.value = defaultAddresses.fullLocation
      }
    }
    // 城市选中事件处理函数
    const changeCity = (result) => {
      provinceCode.value = result.provinceCode
      cityCode.value = result.cityCode
      countryCode.value = result.countryCode
      fullLocation.value = result.fullLocation
    }
    return { fullLocation, changeCity }
  }
}
</script>

<style lang="less" scoped>
  .goods-name {
    width: 660px;
    padding-top: 30px;
    .g-name {
      font-size: 22px;
    }
    .g-desc {
      margin-top: 10px;
      color: #999;
    }
    .g-price {
      margin-top: 10px;
      span {
        &::before {
          content: "￥";
          font-size: 14px;
        }
        &:first-child {
          margin-right: 10px;
          color: @priceColor;
          font-size: 22px;
        }
        &:last-child {
          color: #999;
          font-size: 16px;
          text-decoration: line-through;
        }
      }
    }
    .g-service {
      width: 500px;
      margin-top: 10px;
      padding: 20px 10px 0 10px;
      background-color: #f5f5f5;
      dl {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        dt {
          width: 50px;
          color: #999;
        }
        dd {
          color: #666;
          &:last-child {
            span {
              margin-right: 10px;
              &::before {
                content: "•";
                color: @xtxColor;
                margin-right: 2px;
              }
            }
            a {
              color: @xtxColor;
            }
          }
        }
      }
    }
  }
</style>
