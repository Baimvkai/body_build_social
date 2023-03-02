<template>
  <div class="account">
    <!-- 顶部标题 -->
    <div class="navbar">
      <van-nav-bar
        title="编辑资料"
        left-text="返回"
        left-arrow
        :border="false"
        @click-left="back"
        fixed
      />
    </div>

    <!-- 头像编辑 -->
    <div class="user-avatar">
      <img :src="userInfo.user_avatar" alt="" class="img-box">
      <van-uploader class="upload-box" name="avatar_img" :after-read="uploadNewAvatar"/>
    </div>

    <!-- 信息编辑单元格 -->
    <div class="user-info">
      <van-cell-group>
        <!-- 手机号码不可更改 -->
        <van-cell title="手机号码" :value="userInfo.user_phone" />
        <!-- 昵称编辑 -->
        <van-field
          v-model="accountInfo.user_nickname"
          label="昵称"
          :placeholder="userInfo.user_nickname"
          input-align="right"
        />
        <!-- 简介编辑 -->
        <div class="desc-box">
          <div class="desc-content">
            <van-field
              v-model="accountInfo.user_desc"
              rows="2"
              autosize
              label="简介"
              type="textarea"
              maxlength="30"
              :placeholder="userInfo.user_desc"
              input-align="right"
            />
          </div>
        </div>
      </van-cell-group>
    </div>

    <!-- 提交按钮 -->
    <div class="submit-info">
      <van-button round type="info" class="sub-btn" color="#f2c94c" @click="updateUserInfo">确认提交</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Account",
  data() {
    return {
      // 用户修改信息
      accountInfo: {
        user_nickname: "",
        user_desc: "",
      },
    };
  },
  methods: {
    // 返回的方法
    back() {
      this.$router.go(-1);
    },
    // 上传头像的方法
    async uploadNewAvatar(file) {
      // 创建表单对象
      let formData = new FormData()
      // 为表单对象添加属性
      formData.append('avatar_img', file.file)
      // 派发更新头像的请求
      await this.$store.dispatch('updateAvatar', formData)
      // 吐司提示更换头像成功
      this.$toast.success('更换头像成功！')
      // 重新获取用户数据
      this.$store.dispatch('getUserInfo')
    },
    // 更新信息
    async updateUserInfo() {
      // 整理数据(判断是否为空)
      if(!this.accountInfo.user_nickname) {
        // 如果为空保持原来的昵称
        this.accountInfo.user_nickname = this.userInfo.user_nickname
      }
      if(!this.accountInfo.user_desc) {
        this.accountInfo.user_desc = this.userInfo.user_desc
      }
      // 开启提示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      // 派发更新用户账户信息的请求
      await this.$store.dispatch('updateAccount', this.accountInfo)
      // 清除加载中吐司
      this.$toast.clear()
      // 成功提示吐司
      this.$toast.success({
        message: '更改信息成功！',
        forbidClick: true,
        duration: 1000,
        // 关闭后回调
        onClose: () => {
          // 跳转回个人页面
          this.$router.push('/main/my')
        }
      })
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
};
</script>

<style lang="less" scoped>
.account {
  padding-top: 46px;

  /* 导航栏 */
  .navbar {
    /deep/ .van-nav-bar {
      background-color: #0d0d0d;
    }

    /deep/ .van-nav-bar__title {
      color: #f5f5f5;
    }

    /deep/ .van-nav-bar .van-icon,
    /deep/.van-nav-bar__text {
      color: #f2c94c
    }
  }

  /* 头像 */
  .user-avatar {
    display: inline-block;
    background-image: url('@/assets/OIP-C.jpg');
    background-size: cover;
    border: 0px solid;
    border-radius: 50%;
    overflow: hidden;
    margin: 15px 0;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 80px;

    .img-box {
      width: 100%;
    }

    .upload-box {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    /deep/.van-uploader__wrapper {
      height: 100%;
      width: 100%;
    }
    /deep/.van-uploader__upload {
      margin: 0;
    }
  }

  /* 用户信息 */
  .user-info {
    /deep/ .van-cell {
      background-color: #181818;
      color: #f5f5f5;
    }

    /deep/ .van-field__label,
    /deep/ .van-field__control {
      color: #f5f5f5;
    }

  }

  /* 提交 */
  .submit-info {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    font-weight: bold;
    
    .sub-btn {
      width: 90%;
    }
  }
}
</style>