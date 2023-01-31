<template>
  <el-row type="flex" style="width: 100%">
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="4">
      <el-row type="flex">
        <el-col>
          <span class="el-dropdown">{{ treeNode.manager }}</span>
        </el-col>
        <el-col>
          <el-dropdown @command="operate">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">新增子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>

    </el-col>
  </el-row>
</template>
<script>
import { delDepartment } from '../../../api/departments'

export default {
  props: {
    treeNode: {
      type: Object,
      // 必传参数
      required: true
    },
    // 是否是公司节点，公司不允许编辑和删除
    isRoot: Boolean
  },
  methods: {
    async operate(command) {
      // js语法，尽可能跳转合适的语法
      switch (command) {
        case 'add':
          this.$emit('add', this.treeNode)
          break
        case 'edit':
          this.$emit('edit', this.treeNode)
          break
        case 'del':
          // 用户确认删除
          await this.$confirm('该操作不可恢复，确认删除吗？', null, {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
          await delDepartment(this.treeNode.id)
          // 提示用户
          this.$message('删除成功')
          // 刷新数据
          this.$emit('del')
          break

        default:
          break
      }
    }
  }
}
</script>
<style>

</style>
