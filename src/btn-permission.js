// 需要用到vuex
import store from './store/index'

export default function btnPermission(code) {
  const { points } = store.state.user.userInfo.roles
  return points.includes(code)
}
