import autoCarousel from './src/auto-carousel'

function init(Vue) {
    if (Vue) {
        Vue.component(autoCarousel.name, autoCarousel)
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    init(window.Vue);
}

autoCarousel.install = function (vue) {//vue-cli中使用该组件
    init(vue);
}

export default autoCarousel;