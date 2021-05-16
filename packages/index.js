// import autoTest from './auo-test'
// import autoTable from './auto-table'
// import autoForm from './auto-form'
// import autoBM from './auto-backstage'
// import autoCarousel from './auto-carousel'
// import autoCardList from './auto-card-list'
// import autoCardHome from './auto-card-home'
// import autoSimplePage from './auto-simple-page'
// const res = { autoTest, autoTable, autoForm, autoBM, autoCarousel, autoCardList, autoCardHome, autoSimplePage};
// console.log(res);
// export default res


var packages = {}
importPages(require.context('../packages/', true, /\.js$/))
function importPages(requireComponent) {
    requireComponent.keys().forEach(key => {
        console.log(key)
        if (key != './index.js') {
            packages[(key.split('/'))[1]]=requireComponent(key).default;
        }
    });
}

console.log(packages)

export default packages