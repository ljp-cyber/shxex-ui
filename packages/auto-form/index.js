import AutoForm from './src/auto-form.vue'

AutoForm.install = function (Vue) {
  Vue.component(AutoForm.name, AutoForm)
}

export default AutoForm