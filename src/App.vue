<template>
  <div id="app">
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style scoped lang="less">
  .dv {
    width: .1rem;
    height: .1rem;
    border: 1px solid red;
  }

  p {
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
