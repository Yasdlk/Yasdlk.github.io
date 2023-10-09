<template>
  <view>
    <view class="search-box">
      <uni-search-bar  :radius="90" cancel-button="none"  @input="input"></uni-search-bar>
    </view>
    <!-- 热门搜索 -->
    <view class="hot-search" v-if="historylist.length===0">
      <view class="hot-title">
        <text>热门搜索</text>
        <uni-icons type="fire-filled" size="23" color="#FF0000"></uni-icons>
      </view>
      <view class="hot-list">
        <uni-tag :text="item" v-for="(item,i) in hotlist" :key="i" :circle="true"
          custom-style="background-color: #efefef; border-color: #efefef; color: #000;">
        </uni-tag>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="23" @click="deleteHistory"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item" v-for="(item,i) in historylist" :key="i" :circle="true"
          custom-style="background-color: #efefef; border-color: #efefef; color: #000;">
        </uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 延时器，就是接受用户输入时，等用户不再短时间内输入文本时才显示输入的值
        timer:null,
        kw:'',
        // 搜索历史记录
        historylist:[],
        // 热门搜索
        hotlist:["餐饮","物流","外卖"],
        // 获取用户输入的关键字
        searchResult:[]
      };
    },
    onload(){
      
    },
    methods:{
      // input输入事件的处理函数
      input(e){
        clearTimeout(this.timer)
        this.timer=setTimeout(()=>{
          console.log(e)
        },500)
        
      },
      // 获取用户输入的关键字
      getSearchList(){
        if(this.historylist ===0 ){
          this.searchResult=[]
          return
        }
      },
      // 清空搜索历史
      deleteHistory(){
        this.historylist=[]
        uni.setStorageSync('kw','[]')
      }
    }
  }
  
</script>

<style lang="scss">
.search-result {
		padding-top: 10px;
		padding-bottom: 20px;
		text-align: center;
	}

	.search-result-text {
		text-align: center;
		font-size: 14px;
		color:#666;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 0px;
    
	}

	.uni-mt-10 {
		margin-top: 10px;
	}
  
  .search-box{
    position: sticky;
    top: 0;
    z-index: 999;
  }
  // 渲染搜索历史框
  .history-box{
    padding: 10rpx;
    .history-title{
      display: flex;
      justify-content: space-between;
      height: 50rpx;
      align-items: center;
      font-size: 25rpx;
      border-bottom: 1rpx solid #efefef;
    }
    
    .history-list{
      margin-top: 10rpx;
      display: flex;
      flex-wrap: wrap;
    }
    
    .uni-tag{
      margin-top: 10rpx;
      margin-right: 10rpx;
    }
  }
  .hot-search{
    padding: 10rpx;
    .hot-title{
      display: flex;
      height: 50rpx;
      align-items: center;
      font-size: 25rpx;
      border-bottom: 1rpx solid #efefef;
    }
    
    .hot-list{
      margin-top: 10rpx;
      display: flex;
      flex-wrap: wrap;
    }
    
    .uni-tag{
      margin-top: 10rpx;
      margin-right: 10rpx;
    }
  }
</style>
