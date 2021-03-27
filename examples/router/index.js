import Vue from 'vue'
import Router from 'vue-router'
import Test from '../views/testVue'
import Test1 from '../views/testAxios'
import AutoTableView from '../views/auto-table-view'
import AutoFormView from '../views/auto-form-view'
import AutoBGManagement from '../views/auto-bg-view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'testVue-route',
      component: Test
    },
    {
      path: '/testAxios',
      name: 'testAxios-route',
      component: Test1
    },
    {
      path: '/auto-table',
      name: 'auto-table-route',
      component: AutoTableView
    },
    {
      path: '/auto-form',
      name: 'auto-form-route',
      component: AutoFormView
    },
    {
      path: '/auto-bg',
      name: 'auto-bg-route',
      component: AutoBGManagement
    }
  ]
})
