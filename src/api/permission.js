import request from '../utils/request'

// 获取权限列表
export function getPermissionList() {
  return request.get('sys/permission')
}

// 新增权限
export function addPermission(permission) {
  return request.post('/sys/permission', permission)
}

// 获取权限详情
export function getPermissionDetail(id) {
  return request.get(`/sys/permission/${id}`)
}

// 保存权限
export function updatePermission(permission) {
  return request.put(`/sys/permission/${permission.id}`, permission)
}

// 删除权限
export function deletePermission(id) {
  return request.delete(`/sys/permission/${id}`)
}
