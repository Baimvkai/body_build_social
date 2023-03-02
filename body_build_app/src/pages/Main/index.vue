<template>
  <div class="main">
    <!-- 路由视图 -->
    <div class="main_view">
      <router-view></router-view>
    </div>
    <!-- 底部标签栏 -->
    <div class="tabBar">
      <van-tabbar v-model="active" :placeholder="true" active-color="#f2c94c" :border="false">
        <van-tabbar-item icon="home-o" to="/main/home">训练</van-tabbar-item>
        <van-tabbar-item icon="gem-o" to="/main/discover">发现</van-tabbar-item>
        <van-tabbar-item icon="user-circle-o" to="/main/my">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      // 底部导航焦点
      active: 0,
    };
  },
  watch: {
    // 监听active，一旦active变化存储到storage中
    active(newValue,oldValue) {
      sessionStorage.setItem('activeNum', newValue)
    }
  },
  created() {
    // 刷新后重新挂载时取到sessionStorage中的activeNum
    // 在sessionStorage中保存的是字符串，取出需要转换为Number类型
    this.active = Number(sessionStorage.getItem('activeNum')) 
  },
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .main_view {
    flex: 1;
    overflow: auto;
  }

  .tabBar {
    /deep/ .van-tabbar, .van-tabbar-item--active{
      background-color: #0d0d0d;
    }
    /deep/ .van-tabbar::before {
      border-color: #0d0d0d;
    }
  }
}
</style>