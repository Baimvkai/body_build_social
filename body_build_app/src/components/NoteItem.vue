<template>
  <div class="note-item" @click="goDetail(item.note_id)">
    <!-- 封面图片 -->
    <div class="item-pic">
      <img :src="item.photo_album[0]" class="auto_img" />
    </div>
    <!-- 封面简介 -->
    <div class="item-msg">
      <span>{{ item.note_title }}</span>
    </div>
    <!-- 作者及点赞 -->
    <div class="item-author">
      <!-- 左侧头像 -->
      <div class="left">
        <img :src="item.user_avatar" class="auto_img" />
        <span>{{ item.user_nickname }}</span>
      </div>
      <!-- 右侧点赞数 -->
      <div class="right">
        <van-icon :name="item.isLike ? 'like':'like-o'" color="#dc143c"/>
        <span>{{ item.note_like_count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteItem",
  props: ['item'],
  methods: {
    // 跳转到详情页面
    goDetail(note_id) {
      this.$router.push({path:`/detail/${note_id}`})  
    },
  },
};
</script>

<style lang="less" scoped>
.note-item {
  float: left;
  display: flex;
  flex-direction: column;
  background-color: #252525;
  width: 47vw;
  margin: 1vh 0 0 2vw;
  border-radius: 10px;
}

.item-pic {
  height: 180px;
  text-align: center;
  overflow: hidden;
}

.item-msg {
  line-height: 30px;

  span {
    margin-left: 5px;
    color: #f5f5f5;
  }
}

.item-author {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  line-height: 30px;
  font-size: 8px;

  .left {
    margin-left: 5px;

    img {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 5px;
      margin-top: 4px;
    }
  }

  .right {
    padding-right: 5px;

    span {
      margin-left: 5px;
      color: #f5f5f5;
    }
  }
}
</style>