<template>
  <div class="article">
    <!-- 顶部 -->
    <NavBar title="我的笔记"/>
    <!-- 收藏列表为空 置为空状态-->
    <van-empty v-if="!personalList" image="search" description="还没发布过笔记，快去发布吧" /> 
    <!-- 笔记项 -->
    <NoteItem v-for="personal in personalList" :key="personal.note_id" :item="personal"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import NoteItem from '@/components/NoteItem.vue'
import { mapState } from 'vuex'
export default {
  name: 'Article',
  components: {NavBar,NoteItem},
  mounted() {
    // 派发请求
    this.$store.dispatch('getPersonalNotes')
  },
  computed: {
    ...mapState({
      personalList: state => state.note.personalList
    })
  }
}
</script>
