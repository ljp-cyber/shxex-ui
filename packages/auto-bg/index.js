
import Axios from 'axios'
import AutoTable from '../auto-table/index'
import AutoForm from '../auto-form/index'
import AutoBGManagement from './src/auto-bg.vue'

init(window.VUe);

function init(Vue){
  if(Vue){
    Vue.prototype.$axios = Axios
    Vue.use(AutoTable)
    Vue.use(AutoForm)
    Vue.component(AutoBGManagement.name, AutoBGManagement)
  }
}


if (typeof window !== 'undefined' && window.Vue) {
  init(window.Vue);
}

AutoBGManagement.install = function (Vue) {
  init(Vue);
}

export default AutoBGManagement