<template>
  <div>
    <table-components>
      <template #operation="row">
        <el-button @click="handleClick(row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </table-components>
  </div>
</template>

<script>
import TableComponents from '@/components/Table/table'

export default {
  name: 'TableShow',
  data() {
    return {}
  },
  methods: {
    handleClick(row) {
      console.log(row)
    }
  },
  components: {
    TableComponents
  }
}
</script>

<style scoped lang="less">

</style>
