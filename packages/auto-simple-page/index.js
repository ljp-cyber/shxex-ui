import autoSimplePage from './src/auto-simple-page'

function init(Vue) {
    if (Vue) {
        Vue.component(autoSimplePage.name, autoSimplePage)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    init(window.Vue);
}

autoSimplePage.install = function (vue) {//vue-cli中使用该组件
    init(vue);
}

export default autoSimplePage;