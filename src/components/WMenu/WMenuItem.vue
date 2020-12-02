<template>
  <li v-if="!Array.isArray(item)&&!isRoute" :style="{ height:height+'px' }">
    {{ item.name }}
  </li>
  <router-link
      :class="{
          'is-active': active,
      }"
      v-else-if="!Array.isArray(item)&&isRoute"
      :to="item.path"
      tag="li"
      :style="{ height:height+'px' }">
    {{ item.name }}
  </router-link>
</template>

<script>
export default {
  name: 'WMenuItem',

  props: {
    isRoute: {
      type: Boolean,
      required: false,
      default: () => false
    },

    index: {
      type: String,
      required: true,
      default: () => ''
    },

    item: {
      type: Object,
      required: true,
      default: () => {
      }
    },

    height: {
      type: [Number, String],
      required: false,
      default: () => 60
    }
  },

  computed: {
    active() {
      return this.index === this.$route.path
    }
  }
}
</script>

<style scoped lang="less">
  li {
    position: relative;
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    padding: 0 16px;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 3px;
      height: 100%;
      transform: scale(.00001);
      opacity: 0;
      background-color: #1890ff;
      transition: transform .15s cubic-bezier(.215, .61, .355, 1), opacity .15s cubic-bezier(.215, .61, .355, 1);
    }

    &.is-active {
      color: #1890ff;
      background-color: #e6f7ff;

      &:after {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
</style>
