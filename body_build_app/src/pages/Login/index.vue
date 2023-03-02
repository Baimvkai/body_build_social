<template>
  <div class="login">
    <div class="form">
      <!-- 登录表单 -->
      <van-form validate-trigger="onSubmit" class="form_login">
        <van-cell-group inset>
          <van-field
            v-model="userInfo.user_phone"
            name="手机号"
            label="手机号"
            placeholder="请输入十一位手机号"
            autocomplete="off"
          />
          <van-field
            v-model="userInfo.user_password"
            :type="isLoginIptType ? 'password' : 'text'"
            name="密码"
            label="密码"
            placeholder="请输入密码"
            :right-icon="isLoginIptType ? 'closed-eye' : 'eye-o'"
            @click-right-icon="isLoginIptType = !isLoginIptType"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="info" @click="login">登录</van-button>
        </div>
        <div style="margin: 16px">
          <van-button round block type="default" @click="toggleisShow">
            注册
          </van-button>
        </div>
      </van-form>

      <!-- 注册弹出层 -->
      <van-popup v-model="isShow" position="bottom" :style="{ height: '45%' }">
        <!-- 标题 -->
        <div class="reg_title">
          <h1>注册</h1>
        </div>
        <!-- 注册表单 -->
        <van-form class="form_register">
          <van-cell-group inset :border="false">
            <van-field
            v-model="userResigterInfo.user_phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            autocomplete="off"
          />
          <van-field
            v-model="userResigterInfo.user_password"
            :type="isRegisterIptType ? 'password' : 'text'"
            name="密码"
            label="密码"
            placeholder="密码"
            :right-icon="isRegisterIptType ? 'closed-eye' : 'eye-o'"
            @click-right-icon="isRegisterIptType = !isRegisterIptType"
          />
          <van-field
            v-model="userResigterInfo.user_nickname"
            name="昵称"
            label="昵称"
            placeholder="昵称"
            autocomplete="off"
          />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="info" @click="register">
              提交
            </van-button>
          </div>
        </van-form>
      </van-popup>
    </div>
  </div>
</template>

<script>
//导入表单验证脚本
import { validForm } from "@/utils/validForm";
export default {
  name: "Login",
  data() {
    return {
      // 切换登陆以及注册界面密码框的类型 true隐藏密码 false显示密码
      isLoginIptType: true,
      isRegisterIptType: true,
      // 控制是否弹出注册
      isShow: false,
      // 登录的数据
      userInfo: {
        user_phone: "",
        user_password: "",
      },
      // 注册的数据
      userResigterInfo: {
        user_phone: "",
        user_password: "",
        user_nickname: "",
      },
    };
  },
  methods: {
    // 登录方法
    async login() {
      // 开启提示框
      this.$toast.loading({
        message: "登录中",
        forbidClick: true,
        duration: 0,
      });

      // 1.表单校验
      let obj = {
        // 手机号码格式
        user_phone: {
          // 要校验的数据：用户输入的手机号
          value: this.userInfo.user_phone,
          // 要验证的格式：符合正则表达式
          regExp:
            /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
          // 如果验证不通过，提示信息
          errmsg: "手机号码格式不正确",
        },
        // 密码强度验证
        user_password: {
          // 要验证的数据：用户输入的密码
          value: this.userInfo.user_password,
          // 验证的格式：符合正则表达式
          regExp: /^[\S]{6,12}$/,
          // 如果验证不通过，提示信息
          errmsg: "密码格式不正确",
        },
      };

      // 2.调用验证表单的方法
      let isPass = validForm.valid(obj);

      // 3.如果校验通过，登录账号
      if (isPass) {
        try {
          // 派发登录请求
          await this.$store.dispatch("userLogin", this.userInfo);
          // 关闭吐司
          this.$toast.clear();
          // 跳转页面
          this.$router.push('/main/home')
        } catch (error) {
          this.$toast.fail(error.message);
        }
      }
    },
    // 注册方法
    async register() {
      // 开启提示框
      this.$toast.loading({
        message: "注册中",
        forbidClick: true,
        duration: 0,
      });

      // 1.表单验证
      let obj = {
        user_phone: {
          // 要校验的数据：用户输入的手机号
          value: this.userResigterInfo.user_phone,
          // 要验证的格式：符合正则表达式
          regExp:
            /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
          // 如果验证不通过，提示信息
          errmsg: "手机号码格式不正确",
        },
        // 密码强度验证
        user_password: {
          // 要验证的数据：用户输入的密码
          value: this.userResigterInfo.user_password,
          // 验证的格式：符合正则表达式
          regExp: /^[\S]{6,12}$/,
          // 如果验证不通过，提示信息
          errmsg: "密码格式不正确",
        },
        // 昵称验证
        user_nickname: {
          // 要验证的数据：用户昵称
          value: this.userResigterInfo.user_nickname,
          // 要验证的格式：符合正则表达式
          regExp: /^[a-zA-Z0-9_-]{4,8}$/,
          // 如果验证不通过，提示信息
          errmsg: "昵称不正确",
        },
      };

      // 2.调用验证表单的方法
      let isPass = validForm.valid(obj);

      // 3.如果验证通过，注册账号
      if (isPass) {
        try {
          // 派发注册请求
          await this.$store.dispatch("userRegister", this.userResigterInfo);
          // 关闭吐司
          this.$toast.clear();
        } catch (error) {
          this.$toast.fail(error.message);
        }
      }
    },
    // 弹出注册框方法
    toggleisShow() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  /* 单元格组以及弹出层的背景色 */
  /deep/ .van-cell,.van-cell-group,.van-popup {
    background-color: rgba(37, 37, 37);
  }

  /* 单元格标题字体颜色 */
  /deep/ .van-field__label {
    color: rgba(245, 245, 245);
  }

  /* 输入框颜色 */
  /deep/ .van-field__control {
    color: rgba(242, 242, 242);
  }

  /* placeholder颜色 */  
  /deep/ .van-field__control::-webkit-input-placeholder {
    color: rgba(108, 108, 108);
  }

  /* 按钮字体样式 */
  /deep/ .van-button {
    font-size: 15px;
    font-weight: bold;
  }

  /* 登录按钮的颜色 */
  /deep/ .van-button--info {
    color: rgba(13, 13, 13);
    background-color: rgba(242, 201, 76);
    border-color: rgba(242, 201, 76);
  }

  /* 登录 */
  .form_login {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /* 注册 */
  .reg_title h1 {
    font-size: 25px;
    padding-left: 10px;
    padding-top: 10px;
  }
  .form_register {
    margin-top: 15px;
  }
  .van-cell-group {
    border: none;
  }
}
</style>