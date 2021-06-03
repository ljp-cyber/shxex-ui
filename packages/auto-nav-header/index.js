import autoNavHeader from './src/auto-nav-header'

function init(Vue) {
    console.log("autoNavHeader");
    if (Vue) {
        Vue.component(autoNavHeader.name, autoNavHeader)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    init(window.Vue);
}

autoNavHeader.install = function (vue) {//vue-cli中使用该组件
    init(vue);
}

export default autoNavHeader;