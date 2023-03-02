<template>
  <div class="detail">
    <!-- 顶部 -->
    <div class="top">
      <!-- 导航栏 -->
      <van-nav-bar :border="false">
        <!-- 使用插槽自定义导航栏内容 -->
        <template #left>
          <!-- 返回按钮 -->
          <div id="backButton" @click="goBack">
            <van-icon name="arrow-left" size="18"/>
            <span id="backText">返回</span>
          </div>
          <!-- 标识发布者 -->
          <div id="publisher">
            <img :src="curNote.user_avatar" id="publisherImg">
            <div id="publisherName">{{curNote.user_nickname}}</div>
          </div>
        </template>
        <!-- 如果发布用户是自己则显示 -->
        <template #right>
          <!-- 气泡弹出框 -->
          <van-popover
            v-model="showPopover"
            trigger="click"
            placement="bottom-end"
            :offset=[8,8]
            :actions="actions"
            @select="onSelect"
          >
            <!-- 插槽内容 -->
            <template #reference>
              <van-icon name="ellipsis" color="#f5f5f5" size="20"/>
            </template>
          </van-popover>
        </template>
      </van-nav-bar>
      <!-- 分享面板 -->
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelectShare"
        get-container=".detail"
      />
    </div>
    <!-- 内容区 -->
    <div class="content">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" indicator-color="#1989fa">
        <van-swipe-item v-for="(image, index) in curNote.photo_album" :key="index">
          <img v-lazy="image"/>
        </van-swipe-item>
      </van-swipe>
      <!-- 详细介绍 -->
      <div class="detail_message">
        <h1>{{curNote.note_title}}</h1>
        <p>
          {{curNote.note_content}}
          这些是具体描述。
          这些是具体描述。
          这些是具体描述。
          这些是具体描述。
          这些是具体描述。
          这些是具体描述。
          这些是具体描述。
          这些是具体描述。
        </p>
        <div class="public_date">发布于{{convertDate(curNote.note_date)}}</div>
      </div>
      <!-- 分割线 -->
      <van-divider :style="{borderColor:'#999',padding:'0 16px'}"/>
      <!-- 评论区 -->
      <div class="comment_list">
        <h1>共 {{commentList.length}} 条评论</h1>
        <!-- 遍历数据渲染评论项 -->
        <div id="v-for_list" v-for="commentObj in commentList" :key="commentObj.comment_id">
          <div class="list_content">
            <!-- 左侧 -->
            <div class="left_content">
              <!-- 头像 -->
              <div id="ava_img">
                <img :src="commentObj.user_avatar">
              </div>
            </div>
            <!-- 右侧 -->
            <div class="right_content">
              <h2>{{commentObj.user_nickname}}</h2>
              <p>{{commentObj.comment_content}}</p>
            </div>
          </div>
          <!-- 分割线 -->
          <van-divider :style="{borderColor:'#999',padding:'0 16px'}"/>
        </div>
        
      </div>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <!-- 评论 -->
      <div class="remark">
        <van-field
          v-model="comment"
          left-icon="comment-o"
          placeholder="开始评论吧"
          @keyup.enter="pubComment"
        />
      </div>
      <!-- 点赞 -->
      <div class="like_count">
        <van-icon :name="like ? 'like':'like-o'" size="18" color="#dc143c" @click="handleLike"/>
        <span>{{curNote.note_like_count}}</span>
      </div>
      <!-- 收藏 -->
      <div class="collection_count">
        <van-icon :name="collect ? 'star':'star-o'" size="18" color="#f2c94c" @click="handleCollect"/>
        <span>{{curNote.note_collection_count}}</span>
      </div>
      <!-- 评论 -->
      <div class="comment_count">
        <van-icon name="chat-o" size="18"/>
        <span>{{commentList.length}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Detail",
  data() {
    return {
      // 评论
      comment:'',
      // 点赞
      like: undefined,
      // 收藏
      collect: undefined,
      // 控制弹出框是否展示
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [],
      // 控制分享面板显示与否
      showShare: false,
      // 定义分享面板内容
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
    };
  },
  methods: {
    // 返回发现页面
    goBack() {
      this.$router.go(-1)
    },
    // 定义格式化时间函数
    convertDate(datetime) {
      let d = new Date(datetime)
      let yaer = d.getFullYear()
      let month = (d.getMonth() + 1) < 10 ? '0'+(d.getMonth() + 1) : (d.getMonth() + 1)
      let day = d.getDate()
      let hours = d.getHours()<10 ? '0'+d.getHours() : d.getHours();
      let minutes = d.getMinutes()<10 ? '0'+d.getMinutes() : d.getMinutes();
      let times = yaer + '-' + month + '-' + day + ' ' + hours + ':' + minutes
      return times
    },
    // 发布评论的函数
    pubComment() {
      // 判断输入框是否为空 
      if(!this.comment) {
        // 如果为空则提示
        this.$toast({
          message: '评论不能为空',
          forbidClick: true,
        })
      } else {
        // 派发发表评论的请求
        this.$store.dispatch('pubComment', { comment_content: this.comment, note_id: this.note_id })
        // 清空输入框
        this.comment = ''
        // 成功提示
        this.$toast.success({
          message: '发表信息成功',
          forbidClick: true,
          duration: 1000,
          onClose: () => {
            // 重新获取评论列表
            this.$store.dispatch('getComments', this.$route.params)
          }
        })
      }
      
    },
    // 点赞
    async handleLike() {
      // 点赞标识取反
      this.like = !this.like
      // 整理数据
      let data = {
        // 笔记id
        note_id: this.note_id,
        // 标识是否点赞
        isLike: this.like
      }
      // 派发请求
      await this.$store.dispatch('handleLike', data)
      // 重新获取数据
      await this.$store.dispatch('getCurNote', this.$route.params)
    },
    // 收藏
    async handleCollect() {
      // 收藏标识取反
      this.collect = !this.collect
      // 整理数据
      let data = {
        // 笔记ID
        note_id: this.note_id,
        // 标识符
        isCollect: this.collect
      }
      // 派发请求
      await this.$store.dispatch('handleCollect', data)
      // 重新获取数据
      await this.$store.dispatch('getCurNote', this.$route.params)
    },
    // 弹出框选项回调函数
    onSelect(action) {
      // 如果为删除派发请求
      if(action.text == '删除') {
        // 弹出警示框
        this.$dialog.confirm({
          message: '删除操作不可逆，是否确认删除!',
          // 挂载到detail页面
          getContainer: '.detail'
        })
        .then(() => {
          // 派发请求
          this.$store.dispatch('deleteNoteById',{note_id: this.note_id})
          // 跳转回到发现页面
          this.$router.push('/discover')
        })
        .catch(() => {
          // 取消删除
          console.log('删除已取消');
        })   
      } else {
        // 如果是分享, 显示分享面板
        this.showShare = true
      }
    },
    // 控制面板选择回调
    onSelectShare(option) {
      this.$toast(option.name)
      this.showShare = false
    }
  },
  created() {
    // 获取params参数
    this.note_id = this.$route.params.note_id;
    // 派发获取当前笔记数据的请求
    this.$store.dispatch('getCurNote', this.$route.params)
    // 派发获取当前笔记的评论的请求
    this.$store.dispatch('getComments', this.$route.params)
    // 派发获取当前是否点赞的请求
    this.$store.dispatch('comfirmLikeOrNot', this.$route.params)
    // 派发获取当前是否收藏的请求
    this.$store.dispatch('comfirmCollectOrNot', this.$route.params)
  },
  computed: {
    ...mapState({
      // 映射当前的笔记的数据
      curNote: state => state.note.curNote,
      // 映射当前笔记的评论列表
      commentList: state => state.note.commentList,
      // 映射当前笔记是否点赞
      isLike: state => state.note.isLike,
      // 映射当前笔记是否点赞
      isCollect: state => state.note.isCollect,
      // 映射当前操作用户
      curUserId: state => state.user.curUserId
    })
  },
  // 在所有请求完成且仓库中数据完成更新后进行
  updated() {
    // 判断该笔记是否是当前操作用户发布的
    if(this.curNote.user_id == this.curUserId) {
      this.actions = [{text: '删除'}, {text: '分享'}]
    } else {
      this.actions = [{text: '分享'}]
    }
  },
  watch: {
    // 当仓库中的isLike变化时，赋值给like
    isLike: {
      handler(newValue,oldValue) {
        this.like = this.isLike
      },
      // 立即执行
      immediate: true
    },
    // 当仓库中的isCollect变化时，赋值给collect
    isCollect: {
      handler() {
        this.collect = this.isCollect
      },
      // 立即监听
      immediate: true
    }
  },
  // 销毁前
  beforeDestroy() {
    // 调用mutation处理函数清空仓库，避免闪回
    this.$store.commit('CLEARCURNOTE')
    this.$store.commit('CLEARISLIKE')
    this.$store.commit('CLEARISCOLLECT')
  }
};
</script>

<style lang="less" scoped>
.detail {
  display: flex;
  flex-direction: column;
  height: 100%;

  /* 顶部 */
  .top {

    /* 导航栏背景色 */
    /deep/ .van-nav-bar {
      background-color: #0d0d0d;
    }

    #backText {
      font-size: 15px;
      color: #f2c94c;
    }

    /deep/ .van-nav-bar .van-icon {
      color: #f2c94c;
    }

    #publisher {
      display: flex;
      text-align: center;
      align-items: center;
      padding-left: 20px;
      
      #publisherImg {
        height: 30px;
        width: 30px;  
        border-radius: 50%;
        overflow: hidden;
      }

      #publisherName {
        color: #f5f5f5;
        margin-left: 10px;
        font-size: 15px;
      }
    }
  }

  /* 内容 */
  .content {
    flex:1;
    overflow: auto;

    /* 轮播图样式 */
    .my-swipe .van-swipe-item {
      height: 400px;
      line-height: 400px;
      text-align: center;

      img {
        width: 100%;
        height: auto;
        vertical-align: middle;
      }
    }

    .detail_message {
      padding: 10px 10px 0 10px;
      color: #f5f5f5;

      h1 {
        font-size: 15px;
      }
      
      .public_date {
        margin-top: 10px;
        font-size: 8px;
        color: #999;
      }
    }
    
    /* 评论区 */
    .comment_list {
      padding: 0 10px 10px 10px;
      
      /* 评论总数 */
      h1 {
        font-size: 10px;
        font-weight: normal;
      }

      /* 评论项 */
      .list_content {
        display: flex;
        margin-top: 10px;

        .left_content {
          width: 30px;
          margin-right: 8px;

          #ava_img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            text-align: center;
          }

          img {
            width: 100%;
            height: auto;
          }
        }

        .right_content {
          flex: 1;
          color: #f5f5f5;

          h2 {
            font-size: 12px;
          }

          p {
            font-size: 8px;
          }
        }
      }
    }

  }

  /* 底部 */
  .bottom {
    display: flex;
    align-items: center;
    background-color: #0d0d0d;

    span {
      margin-left: 5px;
    }

    .remark {
      width: 50%;
    }
    
    .like_count,.collection_count,.comment_count {
      flex-grow: 1;
      font-size: 15px;
      color: #f5f5f5;
    }

    /deep/ .van-cell {
    background-color: #0d0d0d;
    color: #f5f5f5;
  }

    /deep/.van-field__control {
      background-color: #252525;
      padding-left: 10px;
      border-radius: 10px;
    }
  }
  
  /* 对话框背景色 */
  /deep/ .van-dialog__message {
    color: #0d0d0d;
    font-weight: bold;
    font-size: 15px;
  }

  /* 分享面板取消按钮 */
  /deep/ .van-share-sheet__cancel {
    color: #0d0d0d;
  }
}
</style>