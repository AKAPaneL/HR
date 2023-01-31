import { login, getUserInfo, getUserDetailById } from '../../api/user'
import { setToken, getToken, removeToken, setTime } from '../../utils/auth'
import { resetRouter } from '../../router/index'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      // 存到本地存储
      setToken(token)
      // 存储一个token获取时间
      setTime()
    },
    // 提供删除token的mutation
    removeToken(state) {
      state.token = null
      removeToken()
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async login(context, data) {
      const result = await login(data)
      context.commit('setToken', result)
    },
    async getUserInfo(context) {
      // 调用获取用户信息接口
      const baseInfo = await getUserInfo()
      // 获取头像信息
      const resultInfo = await getUserDetailById(baseInfo.userId)
      // 提交给mutation
      context.commit('setUserInfo', { ...baseInfo, ...resultInfo })
    },
    // 退出登录action
    logout({ commit }) {
      // 删除token
      commit('removeToken')
      // 删除用户信息
      commit('removeUserInfo')
      // 清楚用户路由信息
      commit('permission/saveRoutes', [], { root: true })
      // 重置路由配置
      resetRouter()
    }
  }
}

