import autoSimpleFooter from './src/auto-simple-footer'

function init(Vue) {
    console.log('autoSimpleFooter');
    if (Vue) {
        Vue.component(autoSimpleFooter.name, autoSimpleFooter)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    init(window.Vue);
}

autoSimpleFooter.install = function (vue) {//vue-cli中使用该组件
    init(vue);
}

export default autoSimpleFooter;