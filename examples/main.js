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
import packages from '../packages/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import Axios from 'axios'
// Vue.prototype.$axios = Axios
Vue.use(ElementUI)

Vue.use(router)
for (let key in packages) {
  console.log(key)
  Vue.use(packages[key]);
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
