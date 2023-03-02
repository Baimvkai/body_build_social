<template>
  <div class="discover">
    <!-- 顶部栏 -->
    <div class="top">
      <!-- 左侧排序下拉菜单 -->
      <div class="sort">
        <van-dropdown-menu active-color="#f2c94c">
          <van-dropdown-item v-model="value" :options="option" @change="changeSort"/>
        </van-dropdown-menu>
      </div>
      <!-- 右侧搜索栏 -->
      <div class="search">
        <van-search
          v-model="keyword"
          placeholder="请输入搜索关键词"
          shape="round"
          background="#0d0d0d"
          @focus="searchFocus"
        />
      </div>
    </div>
    <!-- 内容区域 -->
    <div class="content">
      <!-- 内容项，v-for遍历数据渲染 -->
      <NoteItem v-for="note in noteList" :key="note.note_id" :item="note"/>
    </div>
    <!-- 添加按钮 -->
    <div class="add_btn"><van-icon name="add" size="40" color="#f2c94c" @click="goEdit"/></div>
  </div>
</template>

<script>
import NoteItem from '@/components/NoteItem.vue';
import { mapState } from 'vuex';
export default {
  name: "Discover",
  components: { NoteItem },
  data() {
    return {
      // 关键字
      keyword: "",
      // 筛选下拉菜单内容
      value: 0,
      option: [
        { text: "默认排序", value: 0 },
        { text: "点赞排序", value: 1 },
        { text: "收藏排序", value: 2 },
      ],
    };
  },
  methods: {
    // 跳转到详情页面
    goDetail(note_id) {
      // 路由跳转
      this.$router.push({path:`/detail/${note_id}`})  
    },
    // 跳转到编辑文章界面
    goEdit() {
      this.$router.push({path:'/edit'})
    },
    // 切换排序方式
    changeSort() {
      console.log(this.value);
      // 根据当前value派发请求
      this.$store.dispatch('getHotNotes', {sort:this.value})
    },
    // 跳转到搜索页面
    searchFocus() {
      this.$router.push({name:'Search'})
    }
  },
  computed: {
    ...mapState({
      noteList: state => state.note.noteList 
    })
  },
  mounted() {
    // 派发请求获取热门笔记
    this.$store.dispatch('getHotNotes', {sort:0})
  },
};
</script>

<style lang="less" scoped>
.discover {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  /* 顶部区域 */
  .top {
    display: flex;
    width: 100%;
    height: 50px;
    .sort {
      display: inline-block;
      width: 30%;

      /deep/.van-dropdown-menu__bar {
        box-shadow: unset !important;
        height: 50px;
        background-color: #0d0d0d;
      }

      /deep/ .van-dropdown-menu__title {
        color: #f5f5f5;
      }

      /deep/ .van-cell {
        background-color: #0d0d0d;
        color: #f5f5f5;
      }
    }
    .search {
      display: inline-block;
      flex-grow: 1;

      /deep/ .van-search {
        box-sizing: border-box;
        height: 100%;
      }

      /deep/ .van-search__content {
        background-color: #252525;
      }

      /deep/ .van-cell {
        color: #c8c9cc;
      }
    }
  }

  /* 内容区域 */
  .content {
    overflow: auto;
    flex: 1;
    position: relative;

    .content-item {
      float: left;
      display: flex;
      flex-direction: column;
      background-color: #f5f5f5;
      width: 47vw;
      height: 240px;
      margin:1vh 0 0 2vw;
      border-radius: 10px;
    }

    .item_pic {
      height: 180px;
      text-align: center;
      overflow: hidden;
    }

    .item_msg {
      line-height: 30px;

      span {
        margin-left: 5px;
        color: #0d0d0d;
      }
    }

    .item_author {
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
        }
      }

    }
  }

  /* 添加按钮 */
  .add_btn {
    position: absolute;
    right: 40px;
    bottom: 40px;
  }
}
</style>