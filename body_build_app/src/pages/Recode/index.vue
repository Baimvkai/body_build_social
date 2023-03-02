<template>
  <div class="recode">
    <!-- 顶部导航栏 -->
    <NavBar title="我的记录"/>
    <!-- 时间排序 -->
    <div class="time-sort">
      <van-collapse v-model="activeNames">
        <van-collapse-item title="今天" name="1">
          <!-- 内容 -->
          <div class="content">
            <!-- 每一次记录 -->
            <div class="recode-item">
              <!-- 顶部标签 -->
              <h1 class="recode-title">
                背部训练
              </h1>
              <hr/>
              <!-- 中间动作 -->
              <div class="recode-actions">
                <!-- 遍历动作项 -->
                <div class="action-item" v-for="obj in today" :key="obj.action_id">
                  {{obj.action_name}} {{obj.weight+'kg'}} {{obj.group_number+'x'+obj.number}} 
                </div>
              </div>
              <hr/>
              <!-- 底部时间 -->
              <div class="recode-time">
                <span>2023-03-01</span>
              </div>
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="昨天" name="2">内容</van-collapse-item>
        <van-collapse-item title="更早" name="3">内容</van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name:'Recode',
  components: {NavBar},
  data() {
    return {
      activeNames: ['1'],
      // 测试数据
      today: [
        {action_id:1,action_name:'杠铃划船',weight:60,group_number:4,number:8,date: '2023-03-01'},
        {action_id:2,action_name:'坐姿划船',weight:80,group_number:4,number:8,date: '2023-03-01'},
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.recode {
  /deep/ .van-cell {
    background-color: #0d0d0d;
    color: #f5f5f5
  }

  /deep/ .van-collapse-item__content {
    background-color: #252525;
  }

  .content {

    color: #f5f5f5;

    .recode-item {
      background-color: #c8c9cc;
      border-radius: 10px;
      padding: 0 5px;

      /* 记录的标签 */
      .recode-title {
        line-height: 40px;
      }

      /* 记录的动作项 */
      .recode-actions {
        .action-item {
          line-height: 30px;
        }
      }

      /* 记录的时间 */
      .recode-time {
        line-height: 40px;
      }
    }
  }
}
</style>