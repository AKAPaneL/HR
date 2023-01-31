<template>
  <div>
    <el-dialog :visible="visible" title="新增员工" @close="closeDialog">
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择日期" />
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select
            v-model="formData.formOfEmployment"
            style="width:50%"
            placeholder="请选择"
          >
            <el-option
              v-for="item in EmployeeEnum.hireType"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input
            v-model="formData.departmentName"
            style="width:50%"
            placeholder="请选择部门"
            @focus="getDepartments"
          />
          <el-tree
            v-if="showDeptTree"
            :data="treeData"
            :props="{ label: 'name' }"
            @node-click="selectDepartment"
          />
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择日期" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="closeDialog">取消</el-button>
            <el-button type="primary" size="small" @click="save">确定</el-button>
          </el-col>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getDepartments } from '@/api/departments'
import { listToTreeData } from '@/utils'
import EmployeeEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'

function newForm() {
  return {
    username: '',
    mobile: '',
    formOfEmployment: '',
    workNumber: '',
    departmentName: '',
    timeOfEntry: '',
    correctionTime: ''
  }
}

export default {
  props: {
    visible: Boolean
  },
  data() {
    return {
      formData: newForm(),
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      showDeptTree: false,
      treeData: [],
      EmployeeEnum
    }
  },
  methods: {
    async getDepartments() {
      // 获取部门数据
      const { depts } = await getDepartments()
      const res = listToTreeData(depts, '')
      // 把数据传给树形组件
      this.treeData = res
      // 显示树形组件
      this.showDeptTree = true
    },
    selectDepartment(data) {
      // 回填表单
      this.formData.departmentName = data.name
      // 隐藏树形组件
      this.showDeptTree = false
    },
    async save() {
      // 表单校验
      await this.$refs.form.validate()
      // 验证通过，调用接口
      await addEmployee(this.formData)
      // 提示成功
      this.$message.success('保存成功')
      // 关闭弹窗
      this.$emit('update:visible', false)
      // 页面刷新
      this.$emit('reload')
    },
    closeDialog() {
      // 告诉父组件关闭
      this.$emit('update:visible', false)
      // 重置表单
      this.$refs.form.resetFields()
      // 重置数据
      this.formData = newForm()
    }
  }
}
</script>
<style scoped>
.date-control {
    width: 100%;
}
</style>
