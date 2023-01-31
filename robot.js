// 写一个脚本，自动帮我创建目录

const fs = require('fs')

const pages = [
  {
    'name': 'departments',
    'title': '组织架构'
  },
  {
    'name': 'employees',
    'title': '员工'
  },
  {
    'name': 'setting',
    'title': '公司设置'
  },
  {
    'name': 'salarys',
    'title': '工资'
  },
  {
    'name': 'social',
    'title': '社保'
  },
  {
    'name': 'attendances',
    'title': '考勤'
  },
  {
    'name': 'approvals',
    'title': '审批'
  },
  {
    'name': 'permission',
    'title': '权限管理'
  }
]

// src/views创建每个页面文件夹
for (const item of pages) {
  fs.mkdirSync(`./src/views/${item.name}`)
}

// 给每个文件夹创建页面文件
for (const item of pages) {
  const content = `<template>
    <div class="dashboard-container">
      <div class="app-container">
        <h2>
          ${item.title}
        </h2>
      </div>
    </div>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style>
  
  </style>`
  fs.writeFileSync(`./src/views/${item.name}/index.vue`, content)
}
