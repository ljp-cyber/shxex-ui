import autoCardList from '../auto-card-list/index'
import autoNavHeader from "../auto-nav-header/index";
import AutoSimpleFooter from "../auto-simple-footer/index";
import autoCardHome from './src/auto-home'
import Axios from 'axios'
// import Router from 'vue-router'

function init(Vue) {
    console.log("autoHome")
    if (Vue) {
        // Vue.use(Router)
        Vue.use(autoCardList)
        Vue.use(autoNavHeader)
        Vue.use(AutoSimpleFooter)
        Vue.prototype.$axios = Axios
        Vue.component(autoCardHome.name, autoCardHome)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    init(window.Vue);
}

autoCardHome.install = function (vue) {//vue-cli中使用该组件
    init(vue);
}

export default autoCardHome;