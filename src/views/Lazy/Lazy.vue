<template>
  <ul>
    <li>
      <router-view></router-view>
    </li>
    <li v-for="item in 100" :key="item">
      <img v-lazy="require('@/assets/img/xb.jpg')" :key="item" src="" alt="">
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Lazy'
}
</script>

<style lang="less">
  ul {
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      img {
        display: block;
        width: 100px;
        height: 100px;
      }
    }
  }

</style>
