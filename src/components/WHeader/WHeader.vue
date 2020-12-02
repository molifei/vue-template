<template>
  <Header class="w-header" :style="{ height:height+'px' }">
    <slot></slot>
  </Header>
</template>

<script>
export default {
  name: 'WHeader',

  props: {
    height: {
      type: [Number, String],
      required: false,
      default: () => 60
    }
  }

}
</script>

<style scoped lang="less">
  .w-header {
    width: 100%;
    padding: 0 60px;
    display: flex;
    align-items: center;
    background-color: #eeeeee;
  }
</style>
