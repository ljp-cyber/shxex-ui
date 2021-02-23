// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 这里是程序的入口，开发组件流程：
//1、在packages里开发好组件
//2、把‘组件’和‘依赖的组件’在这里导入并use（在组件里导入应该也可以），例如elementui
//3、在views里写好测试的页面
//4、在路由里导入views里的测试页面，并添加路由路径
//5、入口运行的是路由页面，在主机域名后‘#’后加上你路由的路径就可以测试访问了，例：http://localhost:8079/#/test1
import Vue from 'vue'
import App from './App'
import router from './router'

//测试页面
import Test from '../packages/test/index'
Vue.use(Test)

import Axios from 'axios'
Vue.prototype.$axios = Axios
//Vue.use(Axios)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//自动表格开发
import AutoTable from '../packages/auto-table/index'
Vue.use(AutoTable)

import AutoForm from '../packages/auto-form/index'
Vue.use(AutoForm)

import AutoBGManagement from '../packages/auto-bg-management/index'
Vue.use(AutoBGManagement)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  //el: '#app',
  router,
  //components: { App },
  //template: '<App/>'
  render: h => h(App)
}).$mount('#app')
