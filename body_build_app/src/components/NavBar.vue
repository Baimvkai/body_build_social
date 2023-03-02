<template>
  <div class="navbar">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      :border="false"
      @click-left="onClickLeft"
    >
    <template #right v-if="$route.path==='/recode'">
      <span @click="createNewRecode">添加训练记录</span>
    </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: ['title'],
  methods: {
    // 返回上一级
    onClickLeft() {
      this.$router.go(-1)
    },
    // 创建新记录的回调
    createNewRecode() {
      console.log('创建新记录');
      // 跳转到创建新记录的页面
      this.$router.push({name:'Create'})
    }
  },
}
</script>

<style lang="less" scoped>
.navbar {
  /deep/ .van-nav-bar {
    background-color: #0d0d0d;
  }

  /deep/ .van-nav-bar__title {
    color: #f5f5f5;
  }

  /deep/ .van-nav-bar .van-icon,
  /deep/ .van-nav-bar__text,
  /deep/ .van-nav-bar__right{
    color: #f2c94c;
  }

}
</style>