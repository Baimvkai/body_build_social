<template>
  <div class="search">
    <!-- 搜索栏 -->
    <van-nav-bar left-text="返回" left-arrow fixed @click-left="back" :border="false">
      <template #right>
        <div class="home-search">
          <van-search
            v-model="keyword"
            ref="search"
            show-action
            background="#252525"
            @search="search"
            placeholder="请输入商品名称"
          />
        </div>
      </template>
    </van-nav-bar>
    <!-- 内容区 -->
    <NoteItem v-for="note in searchList" :key="note.note_id" :item="note"/>
  </div>
</template>

<script>
import NoteItem from '@/components/NoteItem.vue'
export default {
  name: 'Search',
  components: {NoteItem},
  data() {
    return {
      // 搜索关键字
      keyword: '',
      // 搜索笔记数据
      searchList: []
    }
  },
  methods: {
    // 返回函数
    back() {
      this.$router.go(-1);
    },

    // 搜索函数
    async search() {
      // 加载提示
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      })

      // 派发请求
      await this.$store.dispatch('searchNotesByKeyword',{keyword:this.keyword})
      .then((result) => {
        // 清空吐司
        this.$toast.clear()
        // 如果搜索成功且结果不为空
        if(result.status == 0 && result.data) {
          this.searchList = result.data
        } else {
          // 搜索成功但是结果为空
          this.$toast(result.message);
        }
      })
      .catch((err) => {
        this.$toast.clear();
        console.log(err);
      })
    }
  },
  created() {
    this.$nextTick(() => {
      //获取搜索框
      let searchIpt = this.$refs.search.querySelector('[type="search"]');
      //获取焦点
      searchIpt.focus();
    });
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;

  /deep/ .van-nav-bar {
    background-color: #0d0d0d;
  }

  /deep/ .van-nav-bar .van-icon {
    color: #f2c94c;
  }

  /deep/ .van-nav-bar__text {
    color: #f2c94c;
  }

  /deep/ .van-nav-bar__right {
    width: calc(~"100% - 110px");
  }

  /deep/ .home-search {
    width: 100%;
  }
  /deep/ .home-search .van-search {
    padding: 0;
    border-radius: 17px;
    overflow: hidden;
  }

  /deep/ .home-search .van-icon {
    color: #c8c9cc;
  }

  /deep/ .van-field__control,
  /deep/ .van-search__action {
    color: #c8c9cc;
  }
}
</style>