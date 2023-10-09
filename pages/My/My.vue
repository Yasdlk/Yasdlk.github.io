<template>
  <view>
    <button>登录账户</button>
    <button>我的求职</button>
    <button>我的招聘</button>
    <button class="goAdd" @click="goAdd">我要招聘</button>
    <button>用户条款</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    onLoad(){
      // this.onsubmit();
    },
    
    methods:{
      
      // 点击我要招聘，然后跳转到发布界面
      goAdd(){
        uni.navigateTo({
          url:"/pages/MyRecruit-add/MyRecruit-add"
        })
      }
    },
  }
</script>

<style lang="scss">

</style>
