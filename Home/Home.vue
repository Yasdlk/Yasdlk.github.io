<template>
  <view>
    <!-- *********************渲染轮播图 ********************8-->
    <swiper style="height: 300rpx; width:100%; " :indicator-dots="true" :autoplay="true" :circular="true">
      <!-- 渲染轮播图的item项 -->
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <!-- 图片 -->
        <view class="swiper-item">
          <image :src="item.image"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- *****************页面分割处其一********************** -->
    <view class="sort-postion">-导航栏-</view>
    <!-- *********************渲染分类导航的几个图标 ************************-->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,i) in sortList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image" class="nav-img"></image>
        <text class="nav-text">{{item.name}}</text>
      </view>
    </view>
    
    <!-- *****************页面分割处其二********************** -->
    <view class="total-postion">-全部职业-</view>
    <!-- *************************渲染列表组件 *************************-->
    <!-- 职位类别(图片)，职位介绍，地点，电话，工资，时长，要求 点进去之后详情页-->
    
    <!-- 主页所看到的简单的职业介绍 工作名称 工资 -->
    <view @click="goDetail(item._id)" class="potion-item" v-for="(item,i) in totallist" :key="item._id">
      <!-- <view class="piece-image">
        <image :src="item.image"></image>
      </view> -->
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
    <view class="warn" v-if="totallist.length===34">到底了哦~</view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //**************轮播图的数据列表**************//
        swiperList:[{i:1,image:"/static/swiper/OIP-C.jpg"},
        {i:2,image:"/static/swiper/下载 (1).jpg"},
        {i:3,image:"/static/swiper/下载.jpg"}],
        //***************分类导航框里面的信息**********//
        sortList:[
          {
            key:1,
            name:"全部",
            image:"/static/sort_image/全部.png",
            url:"/pages/Home/Home"
          },
          {
            Key:2,
            name:"家教",
            image:"/static/sort_image/家教.png",
            url:"/pages/tutor/tutor"
          },
          {
            key:3,
            name:"外卖",
            image:"/static/sort_image/外卖.png",
            url:"/pages/takeout/takeout"
          },
          {
            key:4,
            name:"酒店",
            image:"/static/sort_image/物流.png",
            url:"/pages/logistics/logistics"
          },
          {
            key:5,
            name:"餐饮",
            image:"/static/sort_image/餐饮.png",
            url:"/pages/meal/meal"
          },
          {
            key:6,
            name:"其他",
            image:"/static/sort_image/其他.png",
            url:"/pages/others/others"
          }
        ],
        
        //*******************获取全部职位信息*****************//
        // 所有职位信息
        totallist:[]
      };
    },
    // ***************生命周期函数，定义的函数全部在这里调用***************//
    onLoad(){
      this.getPotionList();
    },
    // 触底方法
    onReachBottom(){
      this.getPotionList()
    },
    methods:{
      // 跳转到详情页
      goDetail(e){
        // console.log(e)
        uni.navigateTo({
          url:"/pages/PositionDetail/PositionDetail?id="+e
        })
      },
      //获取职位数据，云数据库里获取
      getPotionList(){
        uniCloud.callFunction({
          name:"getTotalPosition",
          data:{
            skip:this.totallist.length
          }
        }).then(res=>{
          console.log(res);
          let oldList=this.totallist;
          let nsList=[...oldList,...res.result.data];
          this.totallist=nsList
        })
      },
        // *********************分类导航跳转**********************
      navClickHandler(item){
        // 判断点击是哪个item
        if(item.name==="全部"){
          // console.log(item)
          uni.switchTab({
            url:"/pages/Home/Home"
          })
        }
        else if(item.name==="餐饮"){
          console.log(item)
          uni.navigateTo({
            url:"/pages/meal/meal"
          })
        }
        else if(item.name==="外卖"){
          uni.navigateTo({
            url:"/pages/takeout/takeout"
          })
        }
        else if(item.name==="家教"){
          uni.navigateTo({
            url:"/pages/tutor/tutor"
          })
        }
        else if(item.name==="酒店"){
          uni.navigateTo({
            url:"/pages/hotel/hotel"
          })
        }
        else if(item.name==="其他"){
          uni.switchTab({
            url:"/pages/Search/Search"
          })
        }
      },
    }
    
  }
</script>

<style lang="scss">
  // *********************轮播图**************************//
  swiper{
    height: 330rpx;
    .swiper-item,
    image{
      width: 100%;
      height: 100%;
    }
  }
  // *****************分割处样式*****************8
  .sort-postion{
    font-size: 30rpx;
    text-align: center;
    margin: 30rpx;
    color: #808080;
    text-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.2);
  }
  // ***************分类导航******************//
  // 渲染盒子
  .nav-list{
    background-color: #FFFFFF;
    display: flex;
    // justify-content: space-around;
    // margin: 5rpx 0;
    justify-content: center;
    height: 130rpx;
    width: 705rpx;
    margin: 20rpx;
    border-radius: 90rpx;
    border:2rpx solid #00FFFF;
    box-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);
    }
    
    // *****************分割处样式*****************8
    .total-postion{
      font-size: 30rpx;
      text-align: center;
      margin: 30rpx;
      color: #808080;
      text-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.2);
    }
    // 渲染盒子具体的内容
    .nav-item{
      margin-top: 20rpx;
      margin-left: 25rpx;
      margin-right: 25rpx;
      
    }
    // 渲染图片
    .nav-img{
      // width:100%;
      // height:50%;
      width: 60rpx;
      height: 50rpx;
    }
    // 渲染字体
    .nav-text{
    /* 字体大小 */
    font-size: 28rpx;
    /* 文本和图片有了一定的间距 */
    // margin-top: 5rpx;
    }
    
    // **************渲染列表********************
    // 每个职位盒子样式居中
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
    //图片渲染
    // .piece-image image{
    //   width: 100rpx;
    //   height: 100rpx;
    // }
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
