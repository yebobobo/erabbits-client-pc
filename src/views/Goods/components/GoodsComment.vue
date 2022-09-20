<template>
  <div class="goods-comment">
    <!-- 评价头部 -->
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p><span>{{ commentInfo.salesCount }}</span><span>人购买</span></p>
        <p><span>{{ commentInfo.evaluateCount }}</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说</div>
        <div class="dd">
          <a
            href="javascript:;"
            v-for="(item, i) in commentInfo.tags"
            :key="item.title"
            :class="{ active:currentTagIndex === i }"
            @click="changeTag(i)"
          >{{ item.title }}（{{ item.tagCount }}）</a>
        </div>
      </div>
    </div>
    <!-- 排序 -->
    <div class="sort" v-if="commentInfo">
      <span>排序：</span>
      <a
        href="javascript:;"
        @click="changeSort(null)"
        :class="{ active: reqParams.sortField === null }"
      >默认</a>
      <a
        href="javascript:;"
        @click="changeSort('createTime')"
        :class="{ active: reqParams.sortField === 'createTime' }"
      >最新</a>
      <a
        href="javascript:;"
        @click="changeSort('praiseCount')"
        :class="{ active: reqParams.sortField === 'praiseCount' }"
      >最热</a>
    </div>
    <!-- 评价列表 -->
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{ formatNickname(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i+'s'" class="iconfont icon-shixinwujiaoxing"></i>
            <i v-for="i in 5-item.score" :key="i+'k'" class="iconfont icon-kongxinwujiaoxing"></i>
            <span class="attr">{{ formatSpecs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">{{ item.content }}</div>
          <!-- 评论图片组件 -->
          <goods-comment-image v-if="item.pictures.length" :pictures="item.pictures"></goods-comment-image>
          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="praise"><i class="iconfont icon-praise"></i>{{ item.praiseCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页组件 -->
    <el-pagination v-if="total" background layout="prev, pager, next" prev-text="上一页" next-text="下一页" :total="total" :page-size="reqParams.pageSize" @current-change="changePagerFn"/>
  </div>
</template>

<script>
import { ref, inject, reactive, watch } from 'vue'
import { findGoodsCommentInfo, findGoodsCommentList } from '@/api/product.js'
import GoodsCommentImage from './GoodsCommentImage.vue'
import { ElPagination } from 'element-plus'
export default {
  name: 'GoodsComment',
  components: {
    GoodsCommentImage,
    ElPagination
  },
  setup () {
    // 获取评价信息
    const commentInfo = ref(null)
    const goods = inject('goods')
    findGoodsCommentInfo(goods.value.id).then((data) => {
      data.result.tags.unshift({
        title: '有图',
        tagCount: data.result.hasPictureCount,
        type: 'img'
      })
      data.result.tags.unshift({
        title: '全部评价',
        tagCount: data.result.evaluateCount,
        type: 'all'
      })
      // 设置数据之前，tags数组前追加 有图 tag 全部评价 tag
      commentInfo.value = data.result
      // console.log(commentInfo)
    })

    // 激活tag
    const currentTagIndex = ref(0)
    const changeTag = (i) => {
      currentTagIndex.value = i
      // 点击tag的时候修改筛选条件
      const tag = commentInfo.value.tags[i]
      // 情况1：全部评价
      // 情况2：有图
      // 情况3：正常tag
      if (tag.type === 'all') {
        reqParams.hasPicture = null
        reqParams.tag = null
      } else if (tag.type === 'img') {
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        reqParams.hasPicture = null
        reqParams.tag = tag.title
      }
      // 重置页码1
      reqParams.page = 1
    }

    // 准备筛选条件数据
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      // 排序方式 praiseCount 最热 createTime 最新
      sortField: null
    })

    // 初始化需要发请求，筛选条件发生改变发请求
    const commentList = ref([])
    const total = ref(0)

    watch(reqParams, () => {
      findGoodsCommentList(goods.value.id, reqParams).then(data => {
        commentList.value = data.result.items
        total.value = data.result.counts
        // console.log(commentList)
        // console.log(total)
      })
    }, { immediate: true })

    // 点击排序
    const changeSort = (sortField) => {
      reqParams.sortField = sortField
      // 重置页码1
      reqParams.page = 1
    }
    // 用户昵称
    const formatNickname = (nickname) => {
      return nickname.substr(0, 1) + '****' + nickname.substr(-1)
    }
    // 评价订单信息
    const formatSpecs = (specs) => {
      return specs.reduce((p, c) => `${p} ${c.name}：${c.nameValue}`, '').trim()
    }

    // 实现分页切换
    const changePagerFn = (newPage) => {
      reqParams.page = newPage
    }

    return { commentInfo, currentTagIndex, changeTag, changeSort, reqParams, commentList, total, formatNickname, formatSpecs, changePagerFn }
  }
}
</script>

<style lang="less" scoped>
  .goods-comment {
    .head {
      display: flex;
      padding: 30px 0;
      .data {
        display: flex;
        width: 340px;
        padding: 20px;
        p {
          flex: 1;
          text-align: center;
          span {
            display: block;
            &:first-child {
              font-size: 32px;
              color: @priceColor;
            }
            &:last-child {
              color: #999;
            }
          }
        }
      }
      .tags {
        display: flex;
        flex: 1;
        border-left: 1px solid #f5f5f5;
        .dt {
          width: 100px;
          font-weight: 700;
          text-align: center;
          line-height: 42px;
        }
        .dd {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
          > a {
            width: 132px;
            height: 42px;
            margin-left: 20px;
            margin-bottom: 20px;
            border-radius: 4px;
            border: 1px solid #e4e4e4;
            background-color: #f5f5f5;
            color: #999;
            text-align: center;
            line-height: 40px;
            &:hover {
              border-color: @xtxColor;
              color: @xtxColor;
              background: lighten(@xtxColor, 50%);
            }
            &.active {
              border-color: @xtxColor;
              background-color: @xtxColor;
              color: #fff;
            }
          }
        }
      }
    }
    .sort {
      height: 60px;
      margin: 0 20px;
      border-top: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
      color: #666;
      line-height: 60px;
      > span {
        margin-left: 20px;
      }
      > a {
        margin-left: 30px;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
    .list {
      padding: 0 20px;
      .item {
        display: flex;
        padding: 25px 10px;
        border-bottom: 1px solid #f5f5f5;
        .user {
          width: 160px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
          }
          span {
            padding-left: 10px;
            color: #666;
          }
        }
        .body {
          flex: 1;
          .score {
            line-height: 40px;
            .iconfont {
              padding-right: 3px;
              color: #ff9240;
            }
            .attr {
              padding-left: 10px;
              color: #666;
            }
          }
          .text {
            color: #666;
            line-height: 24px;
          }
          .time {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
            color: #999;
          }
        }
      }
    }
    .el-pagination {
      display: flex;
      justify-content: center;
      padding: 40px 0;
    }
    :deep(.el-pagination.is-background .el-pager li) {
      background-color: #fff;
      color: #666;
      border: 1px solid #e4e4e4;
    }
    :deep(.el-pagination.is-background .el-pager li:not(.is-disabled):hover) {
      color: @xtxColor;
    }
    :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
      color: #fff;
      border-color: @xtxColor;
      background-color: @xtxColor;
    }
    :deep(.el-pagination.is-background .btn-prev),
    :deep(.el-pagination.is-background .btn-next) {
      padding: 0 10px;
      border: 1px solid #e4e4e4;
      color: #666;
      background-color: #fff;
    }
    :deep(.el-pagination.is-background .btn-prev:hover),
    :deep(.el-pagination.is-background .btn-next:hover) {
      color: @xtxColor;
    }
    :deep(.el-pagination.is-background .btn-prev:disabled),
    :deep(.el-pagination.is-background .btn-next:disabled) {
      border-color: #f5f5f5;
      color: #ccc;
    }
  }
</style>
