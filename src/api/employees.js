// 员工接口模块
import request from '../utils/request'

// 获取员工简单列表
export function getEmployeeSimple() {
  return request.get('/sys/user/simple')
}

// 获取员工完整列表
export function getEmployeeList(params) {
  return request.get('/sys/user', {
    params
  })
}

// 删除员工
export function delEmployee(id) {
  return request.delete(`/sys/user/${id}`)
}

// 新增员工
export function addEmployee(employee) {
  return request.post('/sys/user', employee)
}

// 批量导入员工
export function batchImport(array) {
  return request.post('/sys/user/batch', array)
}

// 更新用户基本信息
export function saveUserDetailById(user) {
  return request.put(`/sys/user/${user.id}`, user)
}

// 获取员工个人信息
export function getPersonalInfo(id) {
  return request.get(`/employees/${id}/personalInfo`)
}

// 保存员工个人信息
export function savePersonalInfo(info) {
  return request.put(`/employees/${info.userId}/personalInfo`, info)
}

// 获取员工岗位信息
export function getJobInfo(id) {
  return request.get(`/employees/${id}/jobs`)
}

// 更新员工岗位信息
export function saveJobInfo(job) {
  return request.put(`/employees/${job.userId}/jobs`, job)
}

// 给员工分配角色
export function assignRoles(object) {
  return request.put('/sys/user/assignRoles', object)
}
