<template>
  <div class="dashboard-container">
    <div v-loading="loading" class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{ total }}条记录</span>
        <template slot="after">
          <el-button
            size="small"
            type="warning"
            @click="$router.push({ path: '/import', query: { type: 'user' } })"
          >导入</el-button>
          <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
          <el-button size="small" type="primary" @click="showEmployeeDialog = true">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="头像">
            <template #default="{ row }">
              <img v-imagerror class="avatar" :src="row.staffPhoto" alt="">
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column label="聘用形式" :formatter="hireTypeFormatter" prop="formOfEmployment" sortable="" />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="" />
          <el-table-column label="账户状态" sortable="">
            <template #default="{ row }">
              <el-switch :value="+row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/detail/${row.id}`)"
              >查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="$refs.roleDialog.show(row.id)">角色</el-button>
              <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <!-- 总数量 -->
          <!-- 每页多少条数据 -->
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="size"
            :current-page.sync="page"
            @current-change="loadEmployeeList"
          />
        </el-row>
      </el-card>
    </div>
    <add-employee :visible.sync="showEmployeeDialog" @reload="loadEmployeeList" />

    <assign-roles ref="roleDialog" />
  </div>
</template>
<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee.vue'
import AssignRoles from './components/assign-roles.vue'

export default {
  components: {
    AddEmployee,
    AssignRoles
  },
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      list: [],
      loading: true,
      showEmployeeDialog: false
    }
  },
  created() {
    this.loadEmployeeList()
  },
  methods: {
    async loadEmployeeList() {
      this.loading = true // 加载中
      const { rows, total } = await getEmployeeList({
        page: this.page,
        size: this.size
      })
      this.list = rows
      this.total = total

      // 关闭加载
      this.loading = false
    },
    hireTypeFormatter(row, column, cellValue, index) {
      // 查找员工的雇佣类型
      const item = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return item ? item.value : '未知'
    },
    async deleteEmployee(id) {
      // 用户确认删除
      await this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      // 确认删除
      await delEmployee(id)
      // 提示用户
      this.$message.success('删除成功')
      // 刷新列表
      this.loadEmployeeList()
    },
    exportExcel() {
      import('@/vendor/Export2Excel').then(async excel => {
        // 获取最新的数据
        const { rows } = await getEmployeeList({
          page: this.page,
          size: this.size
        })
        const header = ['手机号', '姓名', '入职日期', '聘用形式', '转正日期', '工号', '部门']
        const result = rows.map(item => {
          // 每个对象转成数组
          const arr = []
          const dict = {
            '手机号': 'mobile',
            '姓名': 'username',
            '入职日期': 'timeOfEntry',
            '聘用形式': 'formOfEmployment',
            '转正日期': 'correctionTime',
            '工号': 'workNumber',
            '部门': 'departmentName'
          }
          header.forEach((key, index) => {
            // key：'手机号'
            if (key === '聘用形式') {
              arr.push(this.hireTypeFormatter(null, null, item[dict[key]]))
              return
            }
            arr.push(item[dict[key]])
          })
          return arr
        })
        console.log('result', result)
        excel.export_json_to_excel({
          header, // 表头 必填
          data: result, // 具体数据 必填
          filename: '员工信息表', // 导出的文件名
          autoWidth: true, // 宽度自适应
          bookType: 'xlsx' // 非必填
        })
      })
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 100%;
}
</style>
