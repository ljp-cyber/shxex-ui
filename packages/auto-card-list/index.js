import autoCarousel from '../auto-carousel/index'
import autoCardList from './src/auto-card-list'

function init(Vue) {
    console.log("autoCardList");
    if (Vue) {
        Vue.use(autoCarousel)
        Vue.component(autoCardList.name, autoCardList)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    init(window.Vue);
}

autoCardList.install = function (vue) {//vue-cli中使用该组件
    init(vue);
}

export default autoCardList;

