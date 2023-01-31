<template>
  <div>
    <el-calendar v-model="value">
      <template #dateCell="{date}">
        {{ date.getDate() }}
        <div v-if="isWeekend(date)" class="day-off" />
      </template>
    </el-calendar>
  </div>
</template>
<script>

export default {
  data() {
    return {
      value: new Date()
    }
  },

  methods: {
    isWeekend(date) {
      const day = date.getDay()
      return day === 0 || day === 6
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep {
    .el-calendar-table tr:first-child td{
        border:0px
    }
    .el-calendar-table td{
        border:0px
    }
    .el-calendar-table .el-calendar-day{
        // display: flex;
        // justify-content: center;
        // align-items: center;
        position: relative;
        padding: 0px;
        line-height: 30px;
        text-align: center;
        height: 30px;
        width: 30px;
        margin: 0 auto;
        border-radius: 50%;

    }
    .el-calendar-table td.is-selected{
        background-color: transparent;
    }
    .el-calendar-table td.is-selected .el-calendar-day{
        background-color: rgb(43, 19, 193);
        color: #fff;
    }
}
.day-off{
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: red;
    transform: translateX(-50%);
    left: 50%;
    bottom: 2px;
    border-radius: 50%;
}
</style>
