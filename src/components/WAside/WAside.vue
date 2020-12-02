<template>
  <div class="w-aside" :style="{ width:width+'px' }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WAside',

  props: {
    width: {
      type: [Number, String],
      required: false,
      default: () => 200
    }
  }
}
</script>

<style scoped lang="less">
  .w-aside {
    transition: all .5s ease-in-out!important;
  }
</style>
