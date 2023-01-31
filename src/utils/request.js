// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getTime } from './auth'
import router from '../router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 超时时间
}) // 创建一个axios的实例

service.interceptors.request.use((config) => {
  // 非常重要，要记得return config;
  // 给所有请求增加token
  // 读取token，导入vuex
  const { token } = store.state.user
  // 有token才添加
  if (token) {
    // 检查token是否过期
    // 当前时间 - token获取时间，判断它是否大于有效期
    // 设置默认有效期：1个小时
    const validTime = 3600 * 1000
    if (Date.now() - getTime() > validTime) {
      // token失效
      // 调用退出登录action: 删除token，删除用户信息
      store.dispatch('user/logout')
      // 跳转登录页面
      router.push('/login')
      return Promise.reject(new Error('token失效'))
    }
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}) // 请求拦截器
service.interceptors.response.use((response) => {
  // 2xx状态码
  // success：成功/失败
  // message：服务器返回的消息
  // data服务器返回的数据
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    // 提示用户错误消息
    Message.error(message)
    // 返回一个错误
    return Promise.reject(new Error(message))
  }
}, (error) => {
  // 非2xx状态码
  // 处理token失效
  const { code, message } = error.response.data

  // 如果有报错信息，提示给用户
  if (message) {
    Message.error(message)
  }

  // 判断token失效
  if (code === 10002) {
    store.dispatch('user/logout')
    // 跳转登录页面
    router.push('/login')
  }
  return Promise.reject(error)
}) // 响应拦截器

export default service // 导出axios实例
