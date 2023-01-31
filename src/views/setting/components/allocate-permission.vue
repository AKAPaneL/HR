<template>
  <el-dialog :visible.sync="visible" title="分配权限">
    <el-checkbox-group v-model="permissionIds">
      <el-tree :data="permissionList" default-expand-all>
        <template #default="{ data }">
          <el-checkbox :label="data.id">{{ data.name }}</el-checkbox>
        </template>
      </el-tree>
    </el-checkbox-group>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 导入权限列表接口
import { listToTreeData } from '@/utils'
import { getPermissionList } from '@/api/permission'
import { getSingleRole, assignPermissions } from '@/api/setting'

export default {
  data() {
    return {
      visible: false,
      permissionList: [],
      permissionIds: [] // 选中的权限id数组
    }
  },
  methods: {
    async show(roleId) {
      this.permissionList = listToTreeData(await getPermissionList(), '0')
      // 根据角色id获取角色信息，把角色已经分配的权限回填树形组件
      const res = await getSingleRole(roleId)
      this.permissionIds = res.permIds
      // 分配权限保存，需要角色id
      this.roleId = roleId
      this.visible = true
    },
    async save() {
      // 调用分配权限的接口
      await assignPermissions({
        id: this.roleId,
        permIds: this.permissionIds
      })
      // 提示用户，保存成功
      this.$message.success('保存成功')
      // 关闭弹窗
      this.visible = false
    }
  }
}
</script>
<style>

</style>
