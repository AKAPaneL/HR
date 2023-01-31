<template>
  <el-dialog :visible.sync="visible" :title="form.id ? '编辑权限': '新增权限'" @close="closeFn">
    <el-form ref="form" :rules="permissionRules" :model="form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="标识" prop="code">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item label="开启状态">
        <el-switch
          v-model="form.enVisible"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addPermission, getPermissionDetail, updatePermission } from '@/api/permission'

function emptyForm() {
  return {
    name: '',
    code: '',
    description: '',
    type: '',
    pid: '',
    enVisible: 0 // 后面逻辑暂时不检查它的开启
  }
}
export default {
  data() {
    return {
      visible: false,
      form: emptyForm(),
      permissionRules: {
        name: [
          { required: true, message: '请输入校验名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入校验标识', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show(type, pid) {
      this.visible = true
      this.form.type = type
      this.form.pid = pid
    },
    async  edit(id) {
      // 调用接口回填数据
      this.form = await getPermissionDetail(id)
      this.form.enVisible = +this.form.enVisible
      // 显示弹窗
      this.visible = true
    },
    async save() {
      // 表单校验
      await this.$refs.form.validate()
      if (this.form.id) {
        await updatePermission(this.form)
      } else {
        // 调用接口
        await addPermission(this.form)
      }
      // 提示用户
      this.$message.success('保存成功')
      // 关闭弹窗
      this.visible = false
      // 通知页面刷新数据
      this.$emit('update')
    },
    closeFn() {
      // 重置数据
      this.form = emptyForm()
      // 重置表单校验
      this.$refs.form.resetFields()
    }
  }
}
</script>
<style>

</style>
