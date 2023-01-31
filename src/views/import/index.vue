<template>
  <div class="app-container">
    <upload-excel :on-success="success" />
  </div>
</template>
<script>
import { batchImport } from '@/api/employees'
export default {
  methods: {
    formatDate(days) {
      // 1899/12/31到日期之间的天数
      const oldTime = new Date('1899-12-31 0:0:0')
      const result = new Date(oldTime.getTime() + days * 24 * 60 * 60 * 1000)
      // Date.toLocaleDateString，转为为日期字符串
      return result.toLocaleDateString()
    },
    async success({ header, results }) {
      if (this.$route.query.type === 'user') {
        // 拷贝数组里的每个对象
        const list = results.map(item => {
        // 怎么复制对象
        // 读取对象所有属性名
          const keys = Object.keys(item)
          // 新建空对象
          const newItem = {}
          // 循环把旧对象的每个属性拷贝给新对象
          keys.forEach(key => {
            const dict = {
              '姓名': 'username',
              '手机号': 'mobile',
              '入职日期': 'timeOfEntry',
              '转正日期': 'correctionTime',
              '工号': 'workNumber'
            }

            // 增加属性之前，中英文转换
            newItem[dict[key]] = item[key]

            if (key.includes('日期')) {
              newItem[dict[key]] = this.formatDate(item[key])
            }
          })
          // 返回新对象，会放到map返回的数组中
          return newItem
        })
        await batchImport(list)
        // 导入成功
        this.$message.success('导入成功')
        // 返回上一页
        this.$router.back()
      }
    }
  }
}
</script>
<style>

</style>
