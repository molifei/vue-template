<template>
  <div>
    123
    <table-components>
      <template v-slot:operation>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </template>
    </table-components>
  </div>
</template>

<script>
import TableComponents from '@/components/table/table'
export default {
  name: 'TableShow',
  data() {
    return {

    }
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