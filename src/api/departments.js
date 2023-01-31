// 封装组织架构的接口

import request from '../utils/request'

// 获取组织架构列表
export function getDepartments() {
  return request.get('/company/department')
}

// 新增子部门
export function addDepartment(department) {
  return request.post('/company/department', department)
}

// 获取单个部门信息
export function getSingleDepart(id) {
  return request.get(`/company/department/${id}`)
}

// 编辑部门
export function updateDepartment(depart) {
  return request.put(`/company/department/${depart.id}`, depart)
}

// 删除部门
export function delDepartment(id) {
  return request.delete(`/company/department/${id}`)
}
