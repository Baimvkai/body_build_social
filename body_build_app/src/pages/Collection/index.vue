<template>
  <div class="collection">
    <!-- 顶部 -->
    <NavBar title="我的收藏"/>
    <!-- 收藏列表为空 置为空状态-->
    <van-empty v-if="!collectionList" image="search" description="暂时没有收藏记录，快去看看吧" /> 
    <!-- 笔记项 -->
    <NoteItem v-for="collection in collectionList" :key="collection.note_id" :item="collection"/>
  </div>
</template>

<script>
// 引入组件
import NavBar from '@/components/NavBar.vue'
import NoteItem from '@/components/NoteItem.vue'
import { mapState } from 'vuex'
export default {
  name:'Collection',
  // 注册组件
  components: {NavBar,NoteItem},
  mounted() {
    // 派发请求
    this.$store.dispatch('getCollections')
  },
  computed: {
    ...mapState({
      collectionList: state => state.note.collectionList
    })
  }
}
</script>