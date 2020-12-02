<template>
  <div class="layout-wrap">

    <w-header class="header-bar" height="65">
      <img class="logo" src="@/assets/img/xb.jpg" alt="">
      <i :class="[isCollapse?'el-icon-s-unfold':'el-icon-s-fold']" style="font-size: 20px;cursor:pointer;"
         @click="isCollapse=!isCollapse"></i>
    </w-header>

    <main class="layout-container">
      <w-aside class="layout-left" :width="isCollapse? 60:200">

        <w-menu :list="list" isRoute="true" height="50"></w-menu>

      </w-aside>
      <section class="layout-right scroll-bar-container">
        <router-view></router-view>
      </section>
    </main>

  </div>
</template>

<script>

import WHeader from '@/components/WHeader/WHeader'
import WAside from '@/components/WAside/WAside'
import WMenu from '@/components/WMenu/WMenu'

export default {
  name: 'Layout',

  components: {
    WMenu,
    WHeader,
    WAside
  },

  data() {
    return {
      isCollapse: false,

      list: this.$router.options.routes[7].children || []

    }
  }
}
</script>

<style scoped lang="less">
  .layout-wrap {

    .layout-container {
      padding-top: 65px;
      display: flex;
      height: 100vh;

      .layout-left {
        min-height: 100%;
        background-color: #fff;
        border-right: 1px solid #eee;
        overflow-y: auto;

        &.collapse {
          flex: 0 0 60px;
        }

        &.un-collapse {
          flex: 0 0 245px;
        }
      }

      .layout-right {
        min-height: 100%;
        flex: 1;
        background-color: #fff;
        overflow-y: auto;
      }
    }
  }

  .header-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }

  .scroll-bar-container {
    &:hover {
      &::-webkit-scrollbar {
        width: 6px;
      }
    }
  }

  .scroll-bar-container::-webkit-scrollbar {
    width: 0;
    transition: all 3s ease-in-out;
  }

  // 滚动的滑块
  .scroll-bar-container::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: rgba(144, 147, 153, .3);
  }

  // 外层轨道
  .scroll-bar-container::-webkit-scrollbar-track {
    display: none;
  }

  .logo {
    width: 50px;
    height: 50px;
  }
</style>
