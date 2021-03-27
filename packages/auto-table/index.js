import AutoTable from './src/auto-table.vue'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(AutoTable.name, AutoTable)
}

// 为组件提供 install 安装方法，供按需引入
AutoTable.install = function (Vue) {
  Vue.component(AutoTable.name, AutoTable)
}

// 默认导出组件
export default AutoTable