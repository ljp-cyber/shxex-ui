import autoCardList from '../auto-card-list/index'
import autoCardHome from './src/auto-card-home'
import Axios from 'axios'

function init(Vue) {
    if (Vue) {
        Vue.use(autoCardList)
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