import Ljp from './src/test'

if (typeof window != 'undefined' && window.Vue) {
    window.Vue.component(Ljp.name, Ljp)
}

Ljp.install = function (Vue) {
    Vue.component(Ljp.name, Ljp)
}
export default Ljp