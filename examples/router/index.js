import Vue from 'vue'
import Router from 'vue-router'

const routes = [];
importPages(require.context('../views', true, /\.vue$/,'lazy'))
function importPages (r) {
  r.keys().forEach(key => {
    routes.push({ path: (key.split('.'))[1], component: ()=>r(key)})
  });
}

Vue.use(Router)

export default new Router({
  routes
})
