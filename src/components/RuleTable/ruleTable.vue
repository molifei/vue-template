<template>
  <!-- 表格 -->
  <el-table
      ref="multipleTable"
      tooltip-effect="dark"
      v-loading="tableLoading"
      :key="tableKey"
      :data="tableData"
      :row-key="getRowKey"
      :cell-class-name="getCellName"
      @select="selectHandle"
      @select-all="selectAllHandle"
      @selection-change="changeStatus($event)"
      @row-click="clickRow"
  >

    <!-- 选择框 -->
    <el-table-column

        type="selection"
        width="55"
        :reserve-selection="true"
        :selectable='selectInit'></el-table-column>

    <el-table-column
        v-if="isIndex"
        type="index"
        label="序号"
        width="50">
    </el-table-column>

    <el-table-column
        v-for="(item) in filterHead"
        :key="item.label"
        :label="item.label"
        :width="item.width || ''"
        :show-overflow-tooltip="true"
        v-show="item.isShow"
    >

      <template slot-scope="scope">
        <!-- 常规 -->
        <template v-if="!item.isTime">
          {{ scope.row[item.prop] }}
        </template>
        <!-- 时间 -->
        <template v-else-if="item.isTime">
          {{ scope.row[item.prop] | getDate }}
        </template>
      </template>


    </el-table-column>

    <el-table-column label="操作" width="150">
      <template slot-scope="scope" v-if="scope.row.length!==0">
        <slot name="operation" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'ruleTable',

  props: {
    tableLoading: {
      required: false,
      type: Boolean,
      default: () => false,
    },

    tableHead: {
      required: false,
      type: Array,
      default: () => []
    },

    tableData: {
      required: false,
      type: Array,
      default: () => []
    },

    isIndex: {
      required: false,
      type: Boolean,
      default: () => false
    },

    isSelect: {
      required: false,
      type: Boolean,
      default: () => false
    },

  },

  computed: {
    // 筛选显示的数据
    filterHead() {
      return this.tableHead.filter(function(item) {
        return item.isShow;
      });
    },

    // 填充数据
    newTableData() {
      let t = this.$tools.deepClone(this.tableData);
      if (t.length === 0) {
        return t;
      }
      while (t.length < 30) {
        t.push([]);
      }
      return t;
    },
    index() { // 序号计算
      return 30 * (this.currentPage - 1) + 1;
    },
    ids() {
      let t = _.cloneDeep(this.isCheckedList);
      let ids = [];
      t.forEach(item => {
        ids.push(item.id);
      });
      // console.log(ids)
      return ids;
    },
  },

  watch: {
    tableHead(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.tableKey++;
      }
    }
  },

  data() {
    return {
      tableKey: 0,

      tableLoading: false,

      // 选中的行
      isCheckedList: [],

      // 分页
      // 默认显示第几页
      currentPage: 1,
      // 总条数
      total: 0,
      // 个数选择
      pageSizes: [30, 20, 30, 40],
      // 默认显示每页显示条数
      pageSize: 30,
    };
  },

  methods: {
    // 表格类名
    getCellName(opt) {
      let { row } = opt;
      // console.log(row.length);
      if (row.length === 0) {
        return 'not-show';
      }
    },

    // 表格行点击事件，点击某一行也可以切换选择状态
    clickRow(row) {
      // console.log(row);
      // 如果当前行是空白，则不作反应
      if (row.length === 0) {
        return;
      }
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    // 指定一个key标识这一行的数据，保持勾选状态
    getRowKey(row) {
      return row.id;
    },

    // val表示选中的表格行数据
    handleSelectionChange(val) {
      console.log(val);
    },

    // 判断当前行是不是空行，是否可点击
    selectInit(row) {
      // console.log(row);
      if (row.length === 0) {
        return false;
      } else {
        return true;
      }
    },

    // 表格勾选状态改变
    changeStatus(e) {
      this.isCheckedList = e;
    },

    // 每页显示条数改变事件
    handleSizeChange(val) {
      // 改变每页默认显示条数
      this.pageSize = val;
      // 并且将页码显示到第一页
      this.currentPage = 1;
    },

    // 当前页改变时触发
    handleCurrentChange(val) {
      console.log(val);
      // 改变当前页数
      this.currentPage = val;
      this.getTable(val);
      this.$refs.multipleTable.bodyWrapper.scrollTop = 0;
    },

    // 清空表格，已经选中项
    clearTable(tableRef = 'multipleTable') {
      this.$refs[tableRef].clearSelection();
    }
  }

};
</script>

<style scoped lang="less">

</style>
