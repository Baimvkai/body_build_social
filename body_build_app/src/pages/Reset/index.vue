<template>
  <div class="reset">
    <!-- 顶部 -->
    <NavBar title="修改密码"/>
    <!-- 表单 -->
    <van-form validate-first @failed="onFailed" @submit="onSubmit">
      <van-field
        v-model="oldPassword"
        name="oldPassword"
        label="旧密码"
        placeholder="旧密码"
        :rules="[{ pattern, message: '请填写旧密码' }]"
        autocomplete="off"
      />
      <van-field
        v-model="newPassword"
        :type="showNewPass ? 'text':'password'"
        name="newPassword"
        label="新密码"
        placeholder="新密码"
        :rules="[{ pattern, message: '请填写新密码' }]"
        autocomplete="off"
        :right-icon="showNewPass ? 'eye-o':'closed-eye'"
        @click-right-icon="showNewPass = !showNewPass"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" color="#f2c94c">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'Reset',
  components: {NavBar},
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      // 正则校验规则
      pattern: /^[\S]{6,12}$/,
      // 控制新密码的表单的类型
      showNewPass: false
    }
  },
  methods: {
    // 提交且校验通过后的操作函数
    onSubmit(values) {
      console.log('submit', values);
      // 开启加载吐司
      this.$toast.loading({
        message: '更改中...',
        forbidClick: true,
        duration: 0
      })
      
      try {
        // 派发请求
        this.$store.dispatch('resetPassword', values)
        // 成功吐司
        this.$toast.success({
          message: '更改密码成功，请重新登录',
          forbidClick: true
        })
        // 跳转到登录页重新登录
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000);
      } catch (error) {
        this.$toast.fail({
          message: '更新密码失败，请重试'
        })
        console.log(error);
      }
    },
    // 提交且校验不通过的操作函数
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },
  },
}
</script>

<style lang="less" scoped>
.reset {
  /deep/ .van-cell {
    background-color: #252525;
  }

  /deep/ .van-field__control {
    color: #f5f5f5;
  }

  /deep/ .van-field__label {
    color: #f5f5f5;
  }

  /deep/ .van-button--round {
    font-weight: bold;
  }
}
</style>