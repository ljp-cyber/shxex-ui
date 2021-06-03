import AutoForm from './src/auto-form.vue'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component(AutoForm.name, AutoForm)
}

AutoForm.install = function (Vue) {
  console.log("autoForm")
  Vue.component(AutoForm.name, AutoForm)
}

export default AutoForm