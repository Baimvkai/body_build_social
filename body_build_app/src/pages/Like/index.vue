<template>
  <div class="like">
    <!-- 顶部 -->
    <NavBar title="我的点赞"/>
    <!-- 点赞列表为空 置为空状态-->
    <van-empty v-if="!likeList" image="search" description="暂时没有点赞记录，快去看看吧" />
    <!-- 笔记项 -->
    <NoteItem v-for="item in likeList" :key="item.note_id" :item="item"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import NoteItem from '@/components/NoteItem.vue'
import { mapState } from 'vuex'
export default {
  name:'Like',
  components: {NavBar,NoteItem},
  mounted() {
    // 派发请求获取点赞过的笔记
    this.$store.dispatch('getLikes')
  },
  computed: {
    ...mapState({
      likeList: state => state.note.likeList
    })
  }
}
</script>

<style lang="less" scoped>
.like {
  height: 100%;
}
</style>