<template>
  <div>
    <ul class="list">
      <li lockAxis="y" v-for="item in lists" :key="item.a" v-dragging="{ item: item, list: lists, group: 'item' }">
        {{item.a}}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Move',
  data() {
    return {
      lists: [{ a: 1 }, { a: 2 }, { a: 3 }]
    }
  },
  mounted() {
    this.$dragging.$on('dragged', ({ value }) => {
      console.log(value.item)
      console.log(value.list)
      console.log(value.otherData)
    })
    this.$dragging.$on('dragend', () => {
    })
  }
}
</script>

<style scoped lang="less">
  ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-flow: row wrap;

    li {
      width: 100px;
      height: 100px;
      border: 1px solid #000;
      margin: 10px;
      text-align: center;
      line-height: 100px;
    }
  }
</style>
