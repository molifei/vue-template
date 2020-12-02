<template>
  <ul v-if="!isRoute">
    <li v-for="(item,index) in list" :key="index">
      {{ item.name }}
    </li>
  </ul>
  <ul v-else>
    <w-menu-item
        v-for="(item,index) in list"
        :key="index"
        :item="item"
        :index="item.path"
        :isRoute="isRoute"
        :height="height"
    >
    </w-menu-item>
  </ul>
</template>

<script>
import WMenuItem from './WMenuItem';

export default {
  name: 'WMenu',

  props: {
    isRoute: {
      type: Boolean,
      required: false,
      default: () => false
    },

    list: {
      type: Array,
      required: false,
      default: () => []
    },

    height: {
      type: [Number, String],
      required: false,
      default: () => 60
    }

  },

  components: {
    WMenuItem
  },

}
</script>

<style scoped lang="less">
  ul {
    li {
      cursor: pointer;
    }
  }
</style>
