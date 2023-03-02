<template>
  <div class="train">
    <!-- 顶部 -->
    <NavBar title="训练简介"/>
    <!-- 内容介绍 -->
    <div class="introduction">
      <!-- 图片 -->
      <img :src="curTrain.second_sort_img" class="bg_img">
      <!-- 文字介绍 -->
      <div class="text">
        {{curTrain.second_sort_desc}}
      </div>
    </div>
    <!-- 相关操作 -->
    <div class="action">
      <!-- 添加到计划列表的操作按钮 -->
      <div class="plan">
        <van-button 
          type="primary" 
          size="normal" 
          round 
          class="plan_btn" 
          color="#f2c94c" 
          plain
          >
            添加计划
          </van-button>
      </div>
      <!-- 开始训练的操作按钮 -->
      <div class="exercise">
        <van-button 
          type="primary" 
          size="normal" 
          round 
          class="exercise_btn" 
          color="#f2c94c"
          @click="goExercise"
        >
          开始训练
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { mapState } from 'vuex'
export default {
  name: 'Train',
  components: { NavBar },
  methods: {
    // 跳转到动作库展示页面
    goExercise() {
      this.$router.push({
        name: 'actions',
        query: this.$route.params
      })
    }
  },
  created() {
    // 派发请求获取当前二级分类数据
    this.$store.dispatch('getSecondSortDesc', this.$route.params)
  },
  computed: {
    ...mapState({
      curTrain: state => state.train.curTrain
    })
  },
  beforeDestroy() {
    this.$store.dispatch('clearCurTrain')
  }
}
</script>

<style lang="less" scoped>
.train {
  
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  .introduction {
    
    flex: 1;
    overflow: auto;

    .bg_img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    .text {
      margin-top: 10px;
      padding: 0 10px;
      font-size: 15px;
      color: #f5f5f5;
      font-weight: bold;
    }
  }

  .action {
    display: flex;
    padding: 5px 10px;
    text-align: center;

    .plan {
      width: 50%;
     
      .plan_btn {
        width: 80%;
      }
    }

    .exercise {
      width: 50%;

      .exercise_btn {
        width: 80%;
      }
    }
  }
}
</style>