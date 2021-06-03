import autoSimplePage from './src/auto-simple-page'

function init(Vue) {
    console.log("install autoSimplePage")
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