import autoTest from './auo-test'
import autoTable from './auto-table'
import autoForm from './auto-form'
import autoBM from './auto-backstage'
import autoCarousel from './auto-carousel'
import autoCardList from './auto-card-list'
import autoCardHome from './auto-home'
import autoSimplePage from './auto-simple-page'
const packages = { autoTest, autoTable, autoForm, autoBM, autoCarousel, autoCardList, autoCardHome, autoSimplePage};
console.log(packages);
export default packages


// var packages = {}
// importPages(require.context('../packages/', true, /\.js$/))
// function importPages(requireComponent) {
//     requireComponent.keys().forEach(key => {
//         console.log(key)
//         if (key != './index.js') {
//             packages[(key.split('/'))[1]] = requireComponent(key).default;
//         }
//     });
// }

// console.log(packages)

// function init(Vue) {
//     if (Vue) {
//         for (let key in packages) {
//             Vue.use(packages[key])
//         }
//     }
// }

// if (typeof window !== 'undefined' && window.Vue) {
//     init(window.Vue);
// }

// packages.install = function (vue) {//vue-cli中使用该组件
//     init(vue);
// }

// export default packages