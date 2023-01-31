<template>
  <el-dialog :visible.sync="visible" title="分配角色">
    <el-checkbox-group v-model="checkList">
      <el-checkbox
        v-for="item in roleList"
        :key="item.id"
        :label="item.id"
      >{{ item.name }}</el-checkbox>
    </el-checkbox-group>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 导入角色列表接口
import { getRoles } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  data() {
    return {
      visible: false,
      checkList: [],
      roleList: [],
      user: {}
    }
  },
  async created() {
    const res = await getRoles({
      page: 1,
      pagesize: 9999999
    })
    this.roleList = res.rows
  },
  methods: {
    // 打开弹窗的方法
    async show(id) {
      const res = await getUserDetailById(id)
      this.user = res
      this.checkList = res.roleIds
      // 打开弹窗
      this.visible = true
    },
    async save() {
      await assignRoles({
        id: this.user.id,
        roleIds: this.checkList
      })
      // 提示用户
      this.$message.success('保存成功')
      // 关闭弹窗
      this.visible = false
    }
  }
}
</script>
<style>

</style>
