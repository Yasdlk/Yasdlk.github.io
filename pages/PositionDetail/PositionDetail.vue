<template>
  <!-- "tel": "18888888888",
      "address": "长江大学东校区",
      "concent": "无",
      "request": "无",
      "salary": 100 -->
  <view class="detailPositon">
    <view class="PositionSort">
      <view class="item-1">
        <text class="sort">{{detail.sort}}</text>
        <text class="PartimeOrAlltime">全职兼职都可</text>
        <text class="salary">{{detail.salary}}</text>
      </view>
    </view>
    <view class="PositionDescribe">
      <view class="item-2">
        <text class="title">职位描述</text>
        <text class="describe-content">{{detail.concent}}</text>
      </view>
    </view>
    <view class="PositionRequest">
      <view class="item-3">
        <text class="title">工作要求</text>
        <text class="describe-request">{{detail.request}}</text>
      </view>
    </view>
    <!-- 工作地点单独一个框加上定位信息 -->
    <view class="PositionAddress">
      <view class="item-4">
        <text class="title">工作地点</text>
        <text class="describe-address">{{detail.address}}</text>
        <text>定位</text>
      </view>
    </view>
    <view class="bottom-tabbar">
      <view class="share-item">
        <uni-icons custom-prefix="custom-icon" type="" size="30" @click="clickChangeshare"></uni-icons>
        <view class="collect">分享</view>
      </view>
      <view class="collet-item">
        <uni-icons custom-prefix="custom-icon" type="star" size="30" @click="clickChangecollect"></uni-icons>
        <text class="share">收藏</text>
      </view>
      <view class="apply-item">申请职位</view>
    </view>
    
  </view>
</template>

<script>
  let id;
  export default {
    data() {
      return {
        detail:{},
        checkList: [false, false, false, false, false, false],
      };
    },
    onLoad(e){
      // console.log(e)
      id=e.id
      // console.log(id)
      this.getDetail();
    },
    
    methods:{
      getDetail(){
        uniCloud.callFunction({
          name:"getPositionDetail",
          data:{
            id
          }
        }).then(res=>{
          // console.log(res);
          this.detail=res.result.data[0];
        })
      },
    }
  }
</script>

<style lang="scss">
  .PositionSort{
    display: flex;
    height: 150rpx;
    width: 700rpx;
    border: 2rpx;
    border-radius: 45rpx;
    box-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);
    // padding: 20rpx;
    margin: 20rpx;
    background-color: #FFFFFF;
    .item-1{
      display: flex;
      /* 纵向布局 */
      flex-direction: column;
      /* 分散对齐 */
      justify-content: space-around;
      padding: 30rpx;
    }
    .sort{
      font-weight: bold;
    }
    .salary{
      color: red;
    }
  }
  .PositionDescribe{
      background-color: #FFFFFF;
      display: flex;
      height: 300rpx;
      width: 700rpx;
      border: 2rpx;
      border-radius: 45rpx;
      box-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);
      // padding: 20rpx;
      margin: 20rpx;
      .item-2{
        display: flex;
        /* 纵向布局 */
        flex-direction: column;
        // /* 分散对齐 */
        // justify-content: space-around;
        margin: 20rpx;
      }
      .title{
        font-weight: bold;
      }
      .describe-content{
        
      }
  }
  .PositionRequest{
    background-color: #FFFFFF;
    display: flex;
    height: 300rpx;
    width: 700rpx;
    border: 2rpx;
    border-radius: 45rpx;
    box-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);
    margin: 20rpx;
    .item-3{
      display: flex;
      flex-direction: column;
      margin: 20rpx;
    }
    .title{
      font-weight: bold;
    }
    .describe-request{
      
    }
  }
  .PositionAddress{
    background-color: #FFFFFF;
    display: flex;
    height: 150rpx;
    width: 700rpx;
    border: 2rpx;
    border-radius: 45rpx;
    box-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);
    // padding: 20rpx;
    margin: 20rpx;
    .item-4{
      display: flex;
      /* 纵向布局 */
      flex-direction: column;
      /* 分散对齐 */
      justify-content: space-around;
      padding: 30rpx;
    }
    .title{
      font-weight: bold;
    }
    .describe-address{
    }
  }
  // 收藏按钮
  .collet-item{
    display: flex;
    flex-direction: column;
    .share{
      font-size: 25rpx;
      margin-left: 7rpx;
    }
  }
</style>
