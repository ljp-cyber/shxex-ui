import AutoBGManagement from './src/auto-bg-management.vue'

AutoBGManagement.install = function (Vue) {
  Vue.component(AutoBGManagement.name, AutoBGManagement)
}

export default AutoBGManagement