import request from '@/utils/request'

// 登录
export function login(data) {
  return request.post('/sys/login', data)
}

// 获取用户信息
export function getUserInfo(token) {
  return request.post('/sys/profile')
}

// 获取用户头像资料
export function getUserDetailById(id) {
  return request.get(`/sys/user/${id}`)
}

// 退出登录
export function logout() {

}
