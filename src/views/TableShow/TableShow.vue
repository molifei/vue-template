<template>
  <div>
    <el-checkbox-group v-model="tableCheck" @change="tableChange">
      <el-checkbox-button v-for="item in originTableHead" :label="item" :key="item" :checked="item.isShow">
        {{item.label}}
      </el-checkbox-button>
    </el-checkbox-group>

    <rule-table
        :tableLoading.sync="tableLoading"
        :tableHead="tableHead"
        :tableData="tableData"
        :isIndex="true"
        :isSelect="true"
    >
      <template slot="operation" slot-scope="data">
        <el-button class="p0" type="link" @click.stop="edit(data.scope.row)">
          编辑
        </el-button>
      </template>
    </rule-table>
  </div>
</template>

<script>
import RuleTable from '@/components/RuleTable/ruleTable'

export default {
  name: 'TableShow',

  components: {
    RuleTable
  },

  data() {
    return {
      tableLoading: false,

      tableCheck: [],

      originTableHead: [
        {
          id: 1,
          label: '账号',
          prop: 'account',
          width: '',
          isShow: true,
        },
        {
          id: 2,
          label: '角色',
          prop: 'role',
          width: '',
          isShow: true,
        },
        {
          id: 3,
          label: '病区',
          prop: 'area',
          isShow: true,
        },
        {
          id: 4,
          label: '负责人',
          prop: 'person',
          isShow: true,
        },
        {
          id: 5,
          label: '时间',
          prop: 'date',
          isShow: true,
          isTime: true,
        },
      ],

      tableHead: [
        {
          id: 1,
          label: '账号',
          prop: 'account',
          width: '',
          isShow: true,
        },
        {
          id: 2,
          label: '角色',
          prop: 'role',
          width: '',
          isShow: true,
        },
        {
          id: 3,
          label: '病区',
          prop: 'area',
          isShow: true,
        },
        {
          id: 4,
          label: '负责人',
          prop: 'person',
          isShow: true,
        },
        {
          id: 5,
          label: '时间',
          prop: 'date',
          isShow: true,
          isTime: true,
        },
      ],

      tableData: [
        {
          id: 1,
          account: '演示的账号',
          role: '角色',
          area: '病区',
          person: '负责人',
          date: 1614589357387,
        },
        {
          id: 2,
          account: '演示的账号2',
          role: '角色2',
          area: '病区2',
          person: '负责人2',
          date: 1614589357387,
        }
      ],

    }
  },
  methods: {
    tableChange(value) {

      let changeTable = [];

      // 筛选出对于多选框项 对应的表单头数据
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < this.originTableHead.length; j++) {
          if (value[i].label === this.originTableHead[j].label) {
            changeTable.push(this.originTableHead[j]);
            break;
          }
        }
      }

      // 根据id排序
      changeTable.sort(function(a, b) {
        return a.id - b.id;
      });

      this.tableHead = changeTable;
    },

    edit(value) {


    },

  },

}
</script>

<style scoped lang="less">

</style>
