<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: ""
    }
  },
  watch: {
    $route(to,from) {
      // console.log('to',to.meta.index);
      // console.log('from',from.meta.index);
      if(to.meta.index > from.meta.index) {
        this.transitionName = "slide-left"
      } else if(to.meta.index < from.meta.index) {
        this.transitionName = "slide-right"
      }
    }
  }
}
</script>

<style lang="less">
#app {
  height: 100%;
  width: 100%;
}
.auto_img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter_active,
.slide-left-leave_active {
  transition: all 600ms;
  position: absolute;
}
/* 从右边框外向左滑出止边框内 */
.slide-left-enter,.slide-left-leave-to {
  transform: translate3d(100%,0,0);
}
.slide-left-enter-to,.slide-left-leave {
  opacity: 0;
  transform: translate3d(0,0,0);
}
/* 从左侧边框外向右滑入边框内 */
.slide-right-enter,.slide-right-leave-to {
  opacity: 0;
  transform: translate3d(-100%,0,0);
}
.slide-right-enter-to,.slide-right-leave {
  transform: translate3d(0,0,0);
}
</style>