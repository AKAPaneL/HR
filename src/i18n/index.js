import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en'
import zh from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    message: {
      hello: 'hello world'
    },
    ...en
  },
  zh: {
    message: {
      hello: '你好，世界'
    },
    ...zh
  },
  ja: {
    message: {
      hello: 'こんにちは、世界'
    }
  }
}

const i18n = new VueI18n({
  locale: 'zh', // 设置地区
  messages // 设置地区信息
})

// 导出
export default i18n
