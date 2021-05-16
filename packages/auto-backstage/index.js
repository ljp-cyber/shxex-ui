// import Vue from 'vue'
import Axios from 'axios'
import AutoTable from '../auto-table/index'
import AutoForm from '../auto-form/index'
import AutoBackstage from './src/auto-backstage.vue'

// init(Vue);

function init(Vue){
  if(Vue){
    Vue.prototype.$axios = Axios
    Vue.use(AutoTable)
    Vue.use(AutoForm)
    Vue.component(AutoBackstage.name, AutoBackstage)
  }
}


if (typeof window !== 'undefined' && window.Vue) {
  init(window.Vue);
}

AutoBackstage.install = function (vue) {
  init(vue);
}

export default AutoBackstage