<template>
  <div id="app">
    <p>小明</p>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style scoped lang="less">
  p{
    font-size: .18rem;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .5s ease-in-out;
  }

  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translateX(1%);
  }
</style>
