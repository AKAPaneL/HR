// 这里处理页面访问权限问题

// 导入路由
import router from './router'
// 导入Vuex
import store from './store'
import { asyncRoutes, constantRoutes } from '@/router/index'

router.beforeEach(async(to, from, next) => {
  if (store.state.user.token) {
    if (to.path === '/login') {
      // 已经登陆，跳转首页
      next('/')
    } else {
      // 已经登录，访问的不是登录页
      // 确保已经登录，获取用户信息
      // 如果没有用户信息，才需要获取
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
        const { menus } = store.state.user.userInfo.roles
        const routes = []
        menus.forEach(item => {
          const route = asyncRoutes.find(obj => obj.name === item)
          if (route) {
            routes.push(route)
          }
        })
        // routes就是用户有权限的所有路由,提交保存到 vuex
        store.commit('permission/saveRoutes')
        // 动态添加路由
        router.options.routes = [...constantRoutes, ...routes]
        console.log(menus, routes, router)
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
        next(to.path)
      } else {
        next()
      }
      next()
    }
  } else {
    // 把允许访问的页面放到一个数组，方便将来维护
    const whiteList = ['/login', '/404']
    // Array.includes方法，表示数组包含某个元素
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
