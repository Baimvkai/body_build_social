<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <div class="navbar">
      <van-nav-bar title="运动" :border="false"/>
    </div>
    <!-- 标签页 -->
    <div class="tabs">
      <van-tabs v-model="active" @change="changeTab" color="#f2c94c" background="#0d0d0d" title-active-color="#f2c94c">
        <!-- 遍历标签页分类 -->
        <van-tab  v-for="tab in tabs" :key="tab.first_sort_id" :title="tab.first_sort_name" >
          <!-- 标签内容 -->
          <div class="tab_content">
            <!-- 内容项 -->
            <div v-for="item in trainList" :key="item.second_sort_id" class="tab_item" @click="goTrain(item.second_sort_id)">
              <img :src="item.second_sort_img" class="tab_img">
              <span>{{item.second_sort_name}}</span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      // 标签页所在索引号
      active: 0,
    };
  },
  methods: {
    // 跳转到专项训练
    goTrain(id) {
      this.$router.push({
        name:'train',
        params: { second_sort_id:id }
      })
    },
    // 切换标签页时的函数
    changeTab(name) {
      // 获取当前一级分类Id
      let id = name + 1
      // 派发请求当前标签页的训练数据
      this.$store.dispatch('getSecondSort', {first_sort_id: id})
    }
  },
  created() {
    // 派发请求获取一级分类
    this.$store.dispatch('getFirstSort')
    // 派发请求获取当前分类的二级分类
    this.$store.dispatch('getSecondSort', {first_sort_id: 1})
  },
  computed: {
    ...mapState({
      // 映射Vuex中的tabs
      tabs: state => state.train.tabs,
      // 二级分类列表
      trainList: state => state.train.trainList
    })
  },
};
</script>

<style lang="less" scoped>
.home {
  .navbar {
    /* 顶部标题 */
    /deep/ .van-nav-bar {
      background-color: #0d0d0d;
    }
    /* 顶部标题字体颜色 */
    /deep/ .van-nav-bar__title {
      color: white;
    }
  }

  .tabs {

    .tab_content {
      margin-top: 10px;
      text-align: center;
    }

    .tab_item {
      position: relative;
      width: 342px;
      height: 100px;
      border-radius: 10px;
      background-color: rgba(37, 37, 37);
      margin: 0 auto;
      margin-bottom: 10px;
      overflow: hidden;

      span{
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translateY(-50%);
        color: white;
        font-size: 16px;
      }
    }

    .tab_img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>