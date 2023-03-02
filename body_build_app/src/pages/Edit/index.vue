<template>
  <div class="edit">
    <!-- 顶部导航栏 -->
    <div class="navbar">
      <van-nav-bar
        title="文本编辑"
        right-text="发布"
        :border="false"
        @click-left="goBack"
        @click-right="publish"
      >
        <template #left>
          <van-icon name="cross" size="18" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 文本编辑区 -->
    <div class="edit_area">
      <!-- 标题输入 -->
      <van-field 
        id="text_title"
        v-model="title" 
        placeholder="请输入6-30字标题" 
        maxlength="30"
        required
      />
      <!-- 内容输入 -->
      <van-field 
        v-model="content"  
        placeholder="请输入具体内容" 
        type="textarea" 
        autosize
        required
      />
      <!-- 图片上传 -->
      <div class="img_upload">
        <van-uploader v-model="imgList" multiple :max-count="6" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Edit',
  data() {
    return {
      // 笔记标题
      title:'',
      // 笔记内容
      content:'',
      // 图片数组
      imgList:[]
    }
  },
  methods: {
    // 返回 / 取消编辑
    goBack() {
      this.$router.go(-1)
    },

    // 发布笔记
    publish() {
      // 判断笔记是否合规，只有合规后才能进行操作
      // 笔记不合规(标题为空/内容为空/图片为空)
      if(this.title.length == '' || this.content == '' || this.imgList.length == 0){
        // 提示吐司
        this.$toast.fail('请先填入必填项！')
        return 
      } 
      // 笔记合规
      else {
        
        // 开启提示吐司
        this.$toast.loading({
          message: '发表中',
          forbidClick: true
        })
        // 创建一个空表单对象
        let formData = new FormData()

        // 将数据追加到表单对象中
        // 标题
        formData.append('title', this.title)
        // 内容
        formData.append('content', this.content)
        // 时间
        // formData.append('data', formatDate())
        // 遍历图片数组，并追加到表单对象中
        for (let index = 0; index < this.imgList.length; index++) {
          // this.imgList[index].file 为每一张图片的file对象
          formData.append('imgList', this.imgList[index].file)
        }

        // 派发发布笔记请求
        this.$store.dispatch('pubNote', formData)
        // 关闭加载中吐司
        this.$toast.clear()
        // 成功提示吐司
        this.$toast.success({
          message: '发表笔记成功！',
          forbidClick: true,
          duration: 1000,
          // 吐司关闭后的回调
          onClose: () => {  
            // 跳转到发现页面
            this.$router.push('/main/discover')
          }
        })
      }
    }
  },
}
</script>

<style lang="less" scoped>
.edit {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #252525;

  /* 顶部导航栏 */
  .navbar {

    /deep/ .van-nav-bar {
      background-color: #0d0d0d;
    }

    /deep/.van-nav-bar__text,
    /deep/ .van-nav-bar .van-icon {
      color: #f2c94c;
    }

    /deep/ .van-nav-bar__title {
      color: #f5f5f5;
    }
  }

  /* 文本编辑区 */
  .edit_area {
    flex: 1;

    /deep/ .van-cell {
      background-color: #252525;
    }

    /deep/ .van-field__control {
      color: #f5f5f5;
    }

    /* 图片上传区 */
    .img_upload {
      padding: 10px 16px;
    }
  }
}
</style>