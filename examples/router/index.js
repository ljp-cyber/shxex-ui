import Vue from 'vue'
import Router from 'vue-router'

const routes = [];
importPages(require.context('../views', true, /\.vue$/,'lazy'))
function importPages (r) {
  r.keys().forEach(key => {
    routes.push({ path: (key.split('.'))[1], name: (key.split('.'))[1],component: ()=>r(key)})
  });
}

Vue.use(Router)
var route = new Router({
  routes
})
console.log(route);
export default route
