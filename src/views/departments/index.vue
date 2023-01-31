<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <!-- 布尔树形，增加就是true，不写这个属性就是false -->
          <tree-tools :tree-node="company" is-root @add="openAddDepts" />
        </div>
        <el-tree v-loading="loading" :data="departs" :props="defaultProps">
          <template #default="{ data }">
            <tree-tools
              :tree-node="data"
              @add="openAddDepts"
              @edit="editDepart"
              @del="getDepartments"
            />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 新建子部门组件 -->
    <add-dept
      :visible.sync="showAddDept"
      :parent="currentDept"
      @update="getDepartments"
    />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments, getSingleDepart } from '../../api/departments'
import AddDept from './components/add-dept.vue'
import { listToTreeData } from '@/utils'

export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { },
      showAddDept: false,
      currentDept: {},
      loading: true
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const { companyName, depts } = await getDepartments()
      this.company = { name: companyName, manager: '负责人', id: '' }
      this.departs = listToTreeData(depts, '')
      // 关闭加载
      this.loading = false
    },
    openAddDepts(node) {
      // node就是点击的部门的数据
      this.currentDept = node
      // 显示新增弹窗
      this.showAddDept = true
    },
    async editDepart(node) {
      const res = await getSingleDepart(node.id)
      // 加一个属性，告诉子组件这是编辑
      // 这个标记的名字，你可以自己起，只要不跟现有的数据冲突即可
      res.isEditFlag = true
      this.currentDept = res
      this.showAddDept = true
    }
  }
}
</script>

<style>

</style>
