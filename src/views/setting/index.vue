<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <!-- 这是角色管理的内容 -->
          <el-button class="add-role" type="primary" @click="addRole">新增角色</el-button>

          <el-table :data="roleList" border style="width: 100%">
            <el-table-column type="index" width="50" label="序号" />
            <el-table-column prop="name" label="角色名称" />
            <el-table-column prop="description" label="描述" />
            <el-table-column label="操作">
              <template #default="{ row }">
                <el-button
                  type="success"
                  @click="$refs.allocatePermission.show(row.id)"
                >分配权限</el-button>
                <el-button type="primary" @click="editRole(row.id)">编辑</el-button>
                <el-button type="danger" @click="delRole(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            class="role-pagination"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="pagesize"
            :current-page.sync="page"
            @current-change="loadRoles"
          />
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改" type="info" show-icon />

          <el-form ref="form" class="company-form" :model="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="form.name" disabled />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="form.companyAddress" disabled />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.mailbox" disabled />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remarks" type="textarea" disabled />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog :title="roleForm.id ? '编辑角色' : '新增角色'" :visible.sync="showRoleDialog">
      <el-form>
        <el-form-item label="角色名称">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
        <el-form-item class="role-form-operation">
          <el-button type="primary" @click="saveRole">确定</el-button>
          <el-button @click="showRoleDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <allocate-permission ref="allocatePermission" />
  </div>
</template>

<script>
import {
  getRoles, getCompanyInfo, createRole,
  getSingleRole, updateRole, deleteRole
} from '../../api/setting'
import allocatePermission from './components/allocate-permission.vue'

export default {
  components: {
    allocatePermission
  },
  data() {
    return {
      activeName: 'first',
      roleList: [],
      form: {
        name: ''
      },
      roleForm: {
        name: '', // 角色名称
        description: '' // 角色描述
      },
      page: 1, // 大多数项目，分页都是从1开始
      pagesize: 10,
      total: 0,
      showRoleDialog: false
    }
  },
  async created() {
    this.loadRoles()
    // 获取公司数据
    const res = await getCompanyInfo(this.$store.state.user.userInfo.companyId)
    this.form = res
  },
  methods: {
    async loadRoles() {
      const res = await getRoles({
        page: this.page,
        pagesize: this.pagesize
      })
      const { rows, total } = res
      this.roleList = rows
      this.total = total
    },
    async saveRole() {
      if (!this.roleForm.id) {
        await createRole(this.roleForm)
        // 提示用户
        this.$message.success('创建成功')
      } else {
        await updateRole(this.roleForm)
        this.$message.success('更新成功')
      }
      // 关闭弹窗
      this.showRoleDialog = false
      // 列表更新
      this.loadRoles()
    },
    addRole() {
      // 重置角色表单
      this.roleForm = {
        name: '',
        description: ''
      }
      // 显示弹窗
      this.showRoleDialog = true
    },
    async editRole(id) {
      // 根据id获取最新的角色
      const res = await getSingleRole(id)
      this.roleForm = res
      // 打开弹窗
      this.showRoleDialog = true
    },
    async delRole(id) {
      // 需要用户确认
      // 一般再项目中，个人经验，大多数团队更喜欢async await语法，
      // 在很多场景下，语法更简洁
      await this.$confirm('此操作不可撤回，是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 调用接口
      await deleteRole(id)
      // 提示用户
      this.$message.success('删除成功')
      // 处理最后一页只有一条数据的情况
      if (this.page !== 1 && this.roleList.length === 1) {
        // 加载数据之前，页码减一
        this.page--
      }
      // 列表刷新
      this.loadRoles()
    }
  }
}
</script>

<style scoped>
.add-role {
  margin-bottom: 20px;
}

.company-form {
  width: 50%;
  margin-top: 20px;
  margin-left: 16px;
}

.role-pagination {
  margin-top: 16px;
  text-align: center;
}

.role-form-operation {
  text-align: center;
}
</style>
