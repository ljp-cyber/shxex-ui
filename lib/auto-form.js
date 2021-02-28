(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("auto-form", [], factory);
	else if(typeof exports === 'object')
		exports["auto-form"] = factory();
	else
		root["auto-form"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'auto-form',
	data: function data() {
		return {
			size: 'mini',
			curForm: []
		};
	},
	props: {
		disabled: {
			type: Boolean,
			default: function _default() {
				return false;
			}
		},
		edit: {
			type: Boolean,
			default: function _default() {
				return true;
			}
		},
		inline: {
			type: Boolean,
			default: function _default() {
				return true;
			}
		},
		pickerOptions: {
			default: function _default() {
				return {
					shortcuts: [{
						text: '最近一周',
						onClick: function onClick(picker) {
							var end = new Date();
							var start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick: function onClick(picker) {
							var end = new Date();
							var start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick: function onClick(picker) {
							var end = new Date();
							var start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				};
			}
		},
		model: {
			type: Object,
			default: function _default() {
				return {};
			}
		},
		form: {
			type: Array,
			default: function _default() {
				return [];
			}
		}
	},
	methods: {
		submit: function submit() {
			console.log('submit:' + this.model);
			this.$emit('submit', this.model);
		},
		defForm: function defForm() {
			var res = [];
			for (var curKey in this.model) {
				var curtype = 'input';
				var curoptions = null;
				if (curKey.indexOf('sex') >= 0) {
					curtype = 'options';
					curoptions = [{ value: '男' }, { value: '女' }];
				} else if (curKey.indexOf('date') >= 0 || curKey.indexOf('day') >= 0) {
					curtype = 'date2';
				}
				res.push({ type: curtype, key: curKey, options: curoptions });
			}
			return res;
		}
	},
	mounted: function mounted() {
		console.log('mounted');
		if (this.inline == false) {
			this.size = 'medium';
		} else {
			this.size = 'mini';
		}
		if (this.form == null || this.form.length == 0) {
			console.log('form is null, use default form');
			this.curForm = this.defForm();
		} else {
			this.curForm = this.form;
		}
	},
	beforeUpdate: function beforeUpdate() {
		if (this.form == null || this.form.length == 0) {
			console.log('form is null, use default form');
			this.curForm = this.defForm();
		} else {
			this.curForm = this.form;
		}
	}
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_auto_form_vue__ = __webpack_require__(2);


__WEBPACK_IMPORTED_MODULE_0__src_auto_form_vue__["a" /* default */].install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__src_auto_form_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__src_auto_form_vue__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__src_auto_form_vue__["a" /* default */]);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_auto_form_vue__ = __webpack_require__(0);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f19e484_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_auto_form_vue__ = __webpack_require__(4);
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_auto_form_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f19e484_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_auto_form_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-form',{staticClass:"form-inline",attrs:{"inline":_vm.inline,"model":_vm.model,"size":_vm.size,"disabled":_vm.disabled}},[_vm._l((_vm.curForm),function(item){return [_c('el-form-item',{attrs:{"label":item.label?item.label:item.key}},[(item.type == 'input')?_c('el-input',{attrs:{"readonly":!_vm.edit,"name":item.key,"placeholder":item.placeholder?item.placeholder:item.key},model:{value:(_vm.model[item.key]),callback:function ($$v) {_vm.$set(_vm.model, item.key, $$v)},expression:"model[item.key]"}}):(item.type == 'options' && item.options.length)?_c('el-select',{attrs:{"disabled":!_vm.edit,"placeholder":item.placeholder?item.placeholder:item.key},model:{value:(_vm.model[item.key]),callback:function ($$v) {_vm.$set(_vm.model, item.key, $$v)},expression:"model[item.key]"}},[_vm._l((item.options),function(optItem){return [_c('el-option',{attrs:{"label":optItem.label?optItem.label:optItem.value,"value":optItem.value}})]})],2):(item.type == 'date2')?_c('el-date-picker',{attrs:{"readonly":!_vm.edit,"type":"daterange","align":"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":_vm.pickerOptions},model:{value:(_vm.model[item.key]),callback:function ($$v) {_vm.$set(_vm.model, item.key, $$v)},expression:"model[item.key]"}}):_vm._e()],1)]}),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"disabled":!_vm.edit,"type":"primary"},on:{"click":_vm.submit}},[_vm._v("提交")]),_vm._v(" "),_vm._t("default")],2)],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
/******/ ]);
});