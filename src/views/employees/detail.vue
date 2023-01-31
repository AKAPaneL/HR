<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="登录账户设置" name="first">
        <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="80px" class="login-setting">
          <el-form-item label="姓名：" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="form.password" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">更新</el-button>
            <el-button @click="$router.back()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="个人详情" name="second">
        <user-info />
      </el-tab-pane>
      <el-tab-pane label="岗位信息" name="third">
        <job-info />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      activeName: 'first',
      form: {},
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadUserDetail()
  },
  methods: {
    async loadUserDetail() {
      const res = await getUserDetailById(this.$route.params.id)
      console.log('用户信息', res)
      // 清掉密码
      res.password = ''
      this.form = res
    },
    async save() {
      // 验证表单
      await this.$refs.form.validate()
      await saveUserDetailById(this.form)
      // 保存成功
      this.$message.success('保存成功')
      // 刷新数据
      this.loadUserDetail()
    }
  }
}
</script>
<style scoped>
.login-setting {
    width: 40%;
    margin-left: 20%;
}
</style>
