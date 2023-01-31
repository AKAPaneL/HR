// 导入axios
import request from '../utils/request'

// 获取角色列表
export function getRoles(params) {
  return request.get('/sys/role', {
    params
  })
}

// id: 公司id
export function getCompanyInfo(id) {
  return request.get(`/company/${id}`)
}

// 创建角色
export function createRole(role) {
  return request.post('/sys/role', role)
}

// 获取单个角色
export function getSingleRole(id) {
  return request.get(`/sys/role/${id}`)
}

// 更新角色
export function updateRole(role) {
  return request.put(`/sys/role/${role.id}`, role)
}

// 删除角色
export function deleteRole(id) {
  return request.delete(`/sys/role/${id}`)
}

// 给角色分配权限
export function assignPermissions(data) {
  return request.put('/sys/role/assignPrem', data)
}
