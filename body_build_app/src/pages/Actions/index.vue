<template>
  <div class="actions">
    <!-- 顶部导航栏 -->
    <NavBar title="训练动作"/>
    <!-- 具体动作列表 -->
    <div class="actions_list">
      <!-- 如果动作库为空，显示空状态 -->
      <van-empty v-if="!actions.length" description="当前动作库为空，请期待后续更新" >
        <van-button round type="danger" class="bottom-button" @click="backHome">返回主页</van-button>
      </van-empty>
      <!-- 遍历动作项 -->
      <div v-for="action in actions" :key="action.action_id" class="actions_item" @click="goTutorial(action.action_id)">
        <!-- 图片做背景 -->
        <img :src="action.action_img" alt="背景图" class="action_bgImg">
        <div class="action_profile">
          <!-- 动作名称 -->
          <div class="action_name">
            {{action.action_name}}
          </div>
          <!-- 动作难度 -->
          <div class="action_difficulty">
            难度系数：
            <van-rate v-model="action.action_difficulty" readonly size="15" color="#ffd21e"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { mapState } from 'vuex'
export default {
  name: 'Actions',
  components: {NavBar},
  data() {
    return {
      
    }
  },
  methods: {
    // 跳转到具体教程
    goTutorial(actionId) {
      this.$toast(`跳转到Id为${actionId}的教程`)
    },
    // 返回训练主页
    backHome() {
      this.$router.push('/main/home')
    }
  },
  mounted() {
    // 派发请求获取当前动作库
    this.$store.dispatch('getActions', this.$route.query)
  },
  computed: {
    ...mapState({
      actions: state => state.train.actions
    })
  }
}
</script>

<style lang="less" scoped>
.actions {
  .actions_list {
    width: 342px;
    margin: 0 auto;
    margin-top: 10px;

    .bottom-button {
      width: 160px;
      height: 40px;
    }

    .actions_item {
      position: relative;
      height: 100px;
      background-color: white;
      border-radius: 10px;
      margin-bottom: 10px;
      overflow: hidden;

      .action_bgImg {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .action_profile {
        position: absolute;
        color: white;
        top: 25px;
        left: 20px;
      }

      .action_name {
        font-size: 16px;
      }

      .action_difficulty {
        margin-top: 5px;
      }
    }
  }
}
</style>