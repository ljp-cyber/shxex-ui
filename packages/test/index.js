// 导入组件，组件必须声明 name
import Test from './src/test.vue'

// 为组件提供 install 安装方法，供按需引入
Test.install = function (Vue) {
  Vue.component(Test.name, Test)
}

// 默认导出组件
export default Test