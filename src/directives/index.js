// 封装全局指令
import Vue from 'vue'
// 图片加载失败，提供默认图
// 监听imgDOM的加载失败事件
// DOM相关操作都可以封装到指令中

// 默认头像
import defaultAvatar from '../assets/common/head.jpg'

Vue.directive('imagerror', {
  // dom是指令所在标签的dom
  // binding.value就是指令的值
  inserted(dom, binding) {
    // 监听图片加载失败
    dom.onerror = () => {
      // 如果图片加载失败，提供一张默认图片
      // 优先使用指令配置的默认图片
      dom.src = binding.value || defaultAvatar
    }
  }
})
