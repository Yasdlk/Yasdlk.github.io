<template>
  <!-- 职业分类，还有全职还是兼职或者二者兼容提供可选项 -->
  <!-- 再添加一行，招聘人员可以提供图片 -->
  <view class="add">
    <!-- 发布信息添加部分 -->
    <form @submit="onsubmit">
      <view class="example-body">
      		<uni-combox :candidates="candidates" placeholder="请选择职业分类"  v-model="formValue.sort"></uni-combox>
      </view>
      <view class="item">
        <input type="text" v-model="formValue.tel" :placeholderStyle="placeholderStyle" placeholder="请输入电话" name="tel"></input>
      </view>
      <view class="item">
        <input type="text" v-model="formValue.address" :placeholderStyle="placeholderStyle" name="address" placeholder="请输入地址"></input>
      </view>
      <view class="item">
        <input type="text" v-model="formValue.salary" :placeholderStyle="placeholderStyle" name="salary" placeholder="请输入薪资"></input>
      </view>
      <view class="item">
        <textarea type="text" v-model="formValue.concent" :placeholderStyle="placeholderStyle" name="concent" placeholder="请输入工作内容"></textarea>
      </view>
      <view class="item">
        <textarea type="text" v-model="formValue.request" :placeholderStyle="placeholderStyle" name="request" placeholder="请输入工作要求"></textarea>
      </view>
      <!-- 补充说明里面可以放置图片,可以选择拍照或者上传本地照片-->
      <view class="item">
        <view class="title-relenish">补充:</view>
        <view class="example-body-file">
        		<uni-file-picker limit="9" title="最多选择9张图片" @success="unLoadSuccess"></uni-file-picker>
        </view>
      </view>
      <view class="item">
        <!-- <button form-type="reset">重置</button> -->
        <button form-type="submit" type="primary" :disabled="inDisabled(formValue)">提交</button>
      </view>
    </form>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        formValue:{
          tel:"",
          address:"",
          salary:"",
          concent:"",
          request:""
        },
        candidates:["餐饮","酒店","外卖","家教","其他"],
        placeholderStyle: "color:#999;font-size:14px",
        // 用户上传图片然后将图片地址存入数据库
        picurls:[],
        sort:""
      };
    },
    onLoad(){
      
    },
    methods:{
      // 判断按键是否禁用
      inDisabled(obj){
        for(let key in obj){
          if(!obj[key]){
            return true;
          }
        }
      },
      // 点击提交招聘信息
      onsubmit(e){
        let detail=e.detail.value;
        uniCloud.callFunction({
          name:"addPosition",
          data:{
            sort:this.sort,
            detail,
            picurls:this.picurls
          }
        }).then(res=>{
          // console.log(res)
          uni.showToast({
            title:"发布成功"
          })
          // 直接回到首页
          // 延迟一点时间方便显示已经发布成功
          setTimeout(()=>{
            uni.reLaunch({
              url:"/pages/Home/Home"
            })
          },800)
          
        })
      },
      unLoadSuccess(e){
        console.log(e);
        this.picurls=e.tempFilePaths;
        this.sort=formValue.sort
      }
    }
  }
</script>

<style lang="scss">
  .add{
    padding: 30rpx;
    border-radius: 15rpx;
    .item{
      background-color: #FFFFFF;
      padding: 20rpx;
      input{
        border-radius: 15rpx;
        border: 2rpx solid #DCDFE6;
        height: 80rpx;
        padding: 0 20rpx;
      }
      textarea{
        border-radius: 15rpx;
        border: 2rpx solid #DCDFE6;
      }
      .title-relenish{
        font-size: 35rpx;
        color: #999;
      }
    }
  }
  .example-body-file {
  		padding: 10px;
  		padding-top: 0;
  	}
  // 组合框
  .example-body {
  		padding: 12px;
  		background-color: #FFFFFF;
  }
  
</style>
