<template>
  <el-dialog :title="form.id ? '编辑部门' : '新增部门'" :visible="visible" @close="closeDialog">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="部门名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" class="control-width" autocomplete="off" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" :label-width="formLabelWidth" prop="code">
        <el-input v-model="form.code" class="control-width" autocomplete="off" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" :label-width="formLabelWidth" prop="manager">
        <el-select v-model="form.manager" class="control-width" placeholder="请选择" @focus="getManagerList">
          <el-option v-for="item in employeeList" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" :label-width="formLabelWidth" prop="introduce">
        <el-input
          v-model="form.introduce"
          class="control-width"
          type="textarea"
          autocomplete="off"
          placeholder="1-300个字符"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="closeDialog">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getDepartments, addDepartment, updateDepartment } from '../../../api/departments'
import { getEmployeeSimple } from '../../../api/employees'
export default {
  props: {
    visible: Boolean,
    // 要新增哪个部门的子部门，parent就是父级部门
    // 关于类型校验，代码风格要求: 只有Boolean可以不提供默认值
    parent: {
      type: Object,
      default: () => ({})
    }
    // parent: {
    //   type: Object,
    //   // 默认值
    //   default: () => ({})
    // }
  },
  data() {
    // rule校验规则
    // value要校验的值
    // callback在校验完成的时候调用
    const checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      // 我们要检查，每个部门的名字都不重复
      // 用every可以做到
      // 用some也行
      // some只要有一个满足条件，返回true

      // 如果是编辑，检查名称重复要排除自己，根据id判断是不是自己的部门
      const result = depts.some(item => {
        // 编辑
        if (this.parent.isEditFlag) {
          return item.id !== this.parent.id && item.name === value
        }
        // 新增
        return item.name === value
      })
      if (result) {
        // 提示用户，部门名字重复了
        // 需要告诉element，这一次校验不通过
        callback(new Error('部门名称重复，请检查后输入'))
        return
      }
      // 校验通过，直接调用callback
      callback()
    }

    const checkCodeRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments()
      // 我们要检查，每个部门的名字都不重复
      // 用every可以做到
      // 用some也行
      // some只要有一个满足条件，返回true

      const result = depts.some(item => {
        // 编辑
        if (this.parent.isEditFlag) {
          return item.id !== this.parent.id && item.code === value
        }
        // 新增
        return item.code === value
      })
      if (result) {
        // 提示用户，部门名字重复了
        // 需要告诉element，这一次校验不通过
        callback(new Error('部门编码重复，请检查后输入'))
        return
      }
      // 校验通过，直接调用callback
      callback()
    }
    return {
      form: {
        code: '',
        introduce: '',
        manager: '',
        name: '',
        pid: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在1-50个字符', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在1-50个字符', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请选择部门负责人', trigger: 'change' }
        ],
        introduce: [
          { min: 1, max: 300, message: '长度在1-300个字符', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      employeeList: []
    }
  },
  watch: {
    visible(newValue) {
      // 打开弹窗，并且部门对象有编辑的标识
      if (newValue && this.parent.isEditFlag) {
        // 数据回填
        this.form = this.parent
      }
    }
  },
  methods: {
    async save() {
      // 触发表单校验
      // 获取表单组件，调用validate方法
      await this.$refs.form.validate()
      console.log('校验通过')

      // 判断是新增还是编辑
      if (this.form.id) {
        // 有id证明是编辑
        await updateDepartment(this.form)
      } else {
        // 新增
        this.form.pid = this.parent.id
        await addDepartment(this.form)
      }
      // 告诉父组件刷新数据
      this.$emit('update')
      // 提示用户，新增成功
      this.$message(this.form.id ? '更新成功' : '创建成功')
      this.closeDialog()
    },
    async getManagerList() {
      const result = await getEmployeeSimple()
      this.employeeList = result
    },
    closeDialog() {
      // 重置表单
      this.form = {
        code: '',
        introduce: '',
        manager: '',
        name: '',
        pid: ''
      }
      // resetFields方法，不仅重置校验，还会清空表单内容
      this.$refs.form.resetFields()
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped>
.control-width {
  width: 80%;
}
</style>
