import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const timeKey = 'token-valid-time'

// 存储token时间
export function setTime() {
  // 存储当前时间
  // Date.now()返回当前的时间毫秒数
  return Cookies.set(timeKey, Date.now())
}
// 读取token时间
export function getTime() {
  return Cookies.get(timeKey)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
