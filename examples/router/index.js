import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Test from '../views/test'
import Test1 from '../views/test1'
import AutoTableView from '../views/auto-table-view'
import AutoFormView from '../views/auto-form-view'
import AutoBGManagement from '../views/auto-bg-management-view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'testTestView',
      component: Test
    },
    {
      path: '/test1',
      name: 'testTestView1',
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
