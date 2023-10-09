<template>
  <view>
    <view @click="goDetail(item._id)" class="potion-item" v-for="(item,i) in meallist" :key="item._id">
      <view class="piece-text-sort">
        <text>{{item.sort}}</text>
      </view>
      <view class="piece-text-address">
        <text>{{item.address}}</text>
      </view>
      <view class="piece-text-salary">
        <text>{{item.salary}}</text>
      </view>
    </view>
    <!-- 有待改进代码，需要根据动态数组里面的数据来判读是否到底 -->
    <!-- <view class="warn" v-if="hotellist.length===34">到底了哦~</view> -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        meallist:[]
      };
    },
    
    onLoad() {
      this.getPotion_mealList();
    },
    
    methods:{
      getPotion_mealList(){
        uniCloud.callFunction({
          name:"getPosition_sort",
          data:{
            sort:"餐饮",
            skip:this.meallist.length
          }
        }).then(res=>{
          console.log(res);
          let oldList=this.meallist;
          let nsList=[...oldList,...res.result.data];
          this.meallist=nsList
        })
      },
      goDetail(e){
        console.log(e)
        uni.navigateTo({
          url:"/pages/PositionDetail/PositionDetail?id="+e
        })
      }
    }
  }
</script>

<style lang="scss">
  .potion-item{
    background-color: #FFFFFF;
    display: flex;
    justify-content:center;
    align-items: center;
    height: 130rpx;
    width: 94%;
    margin: 20rpx;
    border-radius: 40rpx;
    border:2rpx solid #00FFFF;
    box-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);
  }
  //工作名称渲染
  .piece-text-sort text{
    font-size: 25rpx;
    text-align: center;
    padding-left: 45rpx;
    padding-right: 45rpx;
  }
  // 工作地点
  .piece-text-address text{
    font-size: 25rpx;
    text-align: center;
    padding-left: 45rpx;
    padding-right: 45rpx;
  }
  // 薪水渲染一定要明显
  .piece-text-salary{
    font-size: 40rpx;
    color: #FF0000	;
  }
  // 上拉触底到没有数据更新提示
  .warn{
    font-size: 25rpx;
    text-align: center;
    color: #A9A9A9 ;
  }
</style>