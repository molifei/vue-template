<template>
  <div id="app">
    <div class="dv">

    </div>
    <p>小明</p>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style scoped lang="less">
  .dv {
    width: 100rem;
    height: 100rem;
    border: 10rem solid red;
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
