<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}{{ $t("message.hello") }}</div>
    <user-calendar />
    <performance-radar />
    <button class="open" @click="open">全屏
      <div /></button>
    <theme-picker />

    <el-dropdown @command="switchLanguage">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh">中文</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
        <el-dropdown-item command="ja">にほんご</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import UserCalendar from './components/user-calendar.vue'
import performanceRadar from './components/performance-radar.vue'
import screenfull from 'screenfull'
import ThemePicker from '@/components/ThemePicker'

export default {
  name: 'Dashboard',
  components: {
    UserCalendar,
    performanceRadar,
    ThemePicker
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    ...mapState('user', ['userInfo'])
  },
  created() {
    console.log(this.userInfo)
  },
  methods: {
    open() {
      if (screenfull.isEnabled) {
        screenfull.request()
      } else {
        // Ignore or do something else
      }
    },
    switchLanguage(command) {
      this.$i18n.locale = command
    }
  }

}
</script>

<style lang="scss" scoped >
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
 .open{
    width: 100px;
  }
</style>
