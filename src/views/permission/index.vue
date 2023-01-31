<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template #after>
          <el-button type="primary" @click="$refs.permissionDialog.show(1, 0)">新增权限</el-button>
        </template>
      </page-tools>

      <el-table :data="permissionList" row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="描述" prop="description" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button type="text" @click="$refs.permissionDialog.show(2, row.id)">新增</el-button>
            <el-button type="text" @click="$refs.permissionDialog.edit(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <permission-dialog ref="permissionDialog" @update="loadList" />
  </div>
</template>

<script>
import { getPermissionList, deletePermission } from '../../api/permission'
import { listToTreeData } from '@/utils'
import PermissionDialog from './components/permission-dialog.vue'

export default {
  components: {
    PermissionDialog
  },
  data() {
    return {
      permissionList: []
    }
  },
  created() {
    this.loadList()
  },
  methods: {
    async loadList() {
      this.permissionList = listToTreeData(await getPermissionList(), '0')
    },
    async  delPermission(id) {
      try {
        // 用户确认
        await this.$confirm('该操作不可恢复，确定继续吗？', '提示')
        await deletePermission(id)
        // 给用户一个提示
        this.$message.success('删除成功')
        // 刷新列表
        this.loadList()
      } catch (error) {
        console.log('取消', error)
      }
    }
  }
}
</script>

  <style>

  </style>
