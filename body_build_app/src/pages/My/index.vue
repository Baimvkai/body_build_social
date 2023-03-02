<template>
  <div class="my">
    <!-- 基础信息(上部分) -->
    <div class="base_info">
      <!-- 简要信息展示 -->
      <div class="main_line">
        <!-- 上传头像 -->
        <div class="my_avatar">
          <img :src="userInfo.user_avatar" alt="" class="user_avatar">
        </div>
        <!-- 基本信息展示 -->
        <div class="info_show">
          <span class="user_nickname">{{ userInfo.user_nickname }}</span>
          <span class="user_phone">
            <van-icon name="phone-o" />
            {{ userInfo.user_phone }}
          </span>
        </div>
        <!-- 右侧编辑按钮 -->
        <div class="right_edit">
          <van-icon name="edit" size="20px" class="edit_icon" @click="editInfo"/>
        </div>
      </div>
      <!-- 简介展示 -->
      <div class="self_introduction">{{userInfo.user_desc}}</div>
    </div>
    <!-- 其他记录(下部分) -->
    <div class="content">
      <van-cell-group class="content_list">
        <van-cell title="我的笔记" is-link to="/article" />
        <van-cell title="我的点赞" is-link to="/like" />
        <van-cell title="我的收藏" is-link to="/collection" />
        <van-cell title="训练记录" is-link to="/recode" />
        <van-cell title="修改密码" is-link to="/reset" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "My",
  data() {
    return {};
  },
  methods: {
    // 上传头像
    uploadAva(file) {

      // file不是原生的File,是经过封装的,file.file才是原生的File对象！

      // 允许文件类型
      let type = ["gif", "png", "jpg", "jpeg"];

      // 允许最大文件大小 1MB
      let size = 1;

      // 判断文件类型
      let fileType = file.file.type.split("/")[1];
      if (type.indexOf(fileType) === -1) {
        this.$toast(`文件类型只支持${type.join(",")}`);
        return;
      }

      //判断文件大小 B, 1024B = 1KB, 1024KB = 1MB
      let fileSize = file.file.size / 1024 / 1024;

      if (fileSize > size) {
        this.$toast(`文件允许最大不能超过${size}MB`);
        return;
      }

      //处理base64的标记data:image/jpeg;base64,
      let base64 = file.content.replace(/^data:image\/[A-Za-z]+;base64,/, "");

      //发起请求
      let tokenString = localStorage.getItem("token");

      let formData = new FormData();
      formData.append("avatar_img", file.file);

      if (tokenString) {
        // 派发更新头像请求
        this.$store.dispatch('updateAvatar', formData)
      }
    },
    
    // 编辑资料回调
    editInfo(){
      // 跳转到编辑资料页面
      this.$router.push({
        name: 'account'
      })
    }
  },
  mounted() {
    // 派发请求获取用户信息
    this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
};
</script>

<style lang="less" scoped>
.my {
  height: 100%;

  /* 基本信息 */
  .base_info {
    height: 200px;
    background: url("@/assets/background.jpg") no-repeat;
    background-size: cover;
    color: white;
    .main_line {
      padding-top: 25px;
      display: flex;
    }

    /* 头像 */
    .my_avatar {
      background-image: url('@/assets/OIP-C.jpg');
      background-size: cover;
      border: 0px solid;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 25px;
      width: 80px;
      height: 80px;
      
      .user_avatar {
        width: 100%;
      }
    }

    .info_show {
      display: flex;
      flex-direction: column;
      margin: auto 0;
      margin-left: 15px;

      .user_nickname {
        font-size: 20px;
        font-weight: bold;
      }

      .user_phone {
        font-size: 8px;
      }
    }

    /* 右侧编辑按钮 */
    .right_edit {
      flex-grow: 1;
      position: relative;
      .edit_icon {
        position: absolute;
        top: 50%;
        left: 70%;
        transform: translateY(-50%);
      }
    }

    .self_introduction {
      padding: 20px 25px;
    }
  }

  /* 选项栏 */
  .content {
    position: relative;
    height: 400px;
    top: -15px;
    padding-bottom: 30px;
    background-color: #181818;
    border: 0 solid white;
    border-radius: 25px 25px 0 0;

    .content_list {
      position: absolute;
      top: 50px;
      width: 100%;
    }

    /deep/ .van-cell {
      color: #f5f5f5;
      background-color: #181818;
    }

    /deep/ .van-cell::after,[class*='van-hairline']::after {
      border: 1px solid #252525;
    }
  }
}
</style>