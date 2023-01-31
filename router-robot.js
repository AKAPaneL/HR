// 写一个脚本，自动帮我创建目录

const fs = require('fs')

const pages = [
  {
    'name': 'departments',
    'title': '组织架构'
  },
  {
    'name': 'employees',
    'title': '员工管理'
  },
  {
    'name': 'setting',
    'title': '公司设置'
  },
  {
    'name': 'salarys',
    'title': '工资管理'
  },
  {
    'name': 'social',
    'title': '社保管理'
  },
  {
    'name': 'attendances',
    'title': '考勤管理'
  },
  {
    'name': 'approvals',
    'title': '审批管理'
  },
  {
    'name': 'permission',
    'title': '权限管理'
  }
]

if (!fs.existsSync('./src/router/modules')) {
  fs.mkdirSync('./src/router/modules')
}

// 给每个文件夹创建页面文件
for (const item of pages) {
  const content = `import Layout from '@/layout'
  //  {  path: '', component: '' }
  // 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
  export default {
    path: '/${item.name}', // 路径
    name: '${item.name}', // 给路由规则加一个name
    component: Layout, // 组件
    // 配置二级路的路由表
    children: [{
      path: '', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      component: () => import('@/views/${item.name}'),
      // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
      meta: {
        title: '${item.title}' // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      }
    }]
  }
  
  // 当你的访问地址 是 /${item.name}的时候 layout组件会显示 此时 你的二级路由的默认组件  也会显示
  `
  fs.writeFileSync(`./src/router/modules/${item.name}.js`, content)
}
