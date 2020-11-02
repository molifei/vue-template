<template>
  <div class="layout-wrap">
    <header class="layout-header">
      <h1>头部</h1>
      <el-button @click="isCollapse=!isCollapse">缩小</el-button>
    </header>

    <main class="layout-container">
      <aside class="layout-left" :class="isCollapse?'collapse':'un-collapse'">
        <div>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
          <p>2</p>
        </div>
      </aside>
      <section class="layout-right">
        <router-view></router-view>
      </section>
    </main>

  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      isCollapse: false
    }
  }
}
</script>

<style scoped lang="less">
  .layout-wrap {
    .layout-header {
      width: 100%;
      height: 60px;
      position: fixed;
      top: 0;
      left: 0;
      background-color: #edf8ef;
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .layout-container {
      padding-top: 60px;
      display: flex;
      height: 100vh;

      .layout-left {
        min-height: 100%;
        background-color: #fff;
        border-right: 1px solid #eee;
        transition: flex .5s ease-in-out;
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
</style>
