<template>
  <div id="main" class="">
    雷达图
  </div>
</template>
<script>
import * as echarts from 'echarts/core'
import { TitleComponent, LegendComponent } from 'echarts/components'
import { RadarChart } from 'echarts/charts'

// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer, LabelLayout, UniversalTransition])

export default {
  mounted() {
    // 接下来的使用就跟之前一样，初始化图表，设置配置项
    var myChart = echarts.init(document.getElementById('main'))
    var option

    option = {
      title: {
        text: '绩效'
      },
      legend: {
        data: ['Allocated Budget', 'Actual Spending']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Sales', max: 6500 },
          { name: 'Administration', max: 16000 },
          { name: 'Information Technology', max: 30000 },
          { name: 'Customer Support', max: 38000 },
          { name: 'Development', max: 52000 },
          { name: 'Marketing', max: 25000 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending'
            }
          ]
        }
      ]
    }
    window.onresize = function() {
      myChart.resize()
    }
    option && myChart.setOption(option)
  }
}
</script >
<style scoped>
    #main{
        width: 100%;
        height: 500px;
    }
</style>
