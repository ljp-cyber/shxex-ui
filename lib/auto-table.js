(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("auto-table", [], factory);
	else if(typeof exports === 'object')
		exports["auto-table"] = factory();
	else
		root["auto-table"] = factory();
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
  name: 'auto-table',
  methods: {
    details: function details(val, index) {
      console.log('details:' + val + ',' + index);
      this.$emit("details", val);
    },
    delete: function _delete(val, index) {
      console.log('delete:' + val + ',' + index);
      this.$emit("delete", val);
    },
    handleSelectionChange: function handleSelectionChange(val) {
      console.log('handleSelectionChange:' + val);
      this.multipleSelection = val;
    },
    deleteSelections: function deleteSelections() {
      return this.delete(this.multipleSelection, null);
    },
    defHeader: function defHeader(data) {
      var head = [];
      if (data) {
        head.push({ type: 'selection', fixed: "left" });
        for (var key in data[0]) {
          var tooltip = key.length > 10 ? true : false;
          var type = 'text';
          if (key.indexOf('img') >= 0 || key.indexOf('icon') >= 0) {
            type = 'img';
          }
          head.push({ type: type, prop: key, label: key, tooltip: tooltip, sortable: true });
        }
        head.push({ type: 'options', prop: 'operate', label: '操作', fixed: "right" });
      }
      return head;
    }
  },
  data: function data() {
    return {
      multipleSelection: [],
      SelIndex: [],
      options: [],
      curHeader: []
    };
  },
  props: {
    table: {
      type: Object,
      default: function _default() {
        return {
          stripe: true, //是否为斑马纹
          loading: false // 数据加载loading
        };
      }
    },
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    header: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  mounted: function mounted() {
    //不能直接在data里使用函数，因为还没有创建对象
    console.log('created');
    this.options = [{
      type: "success",
      label: "详情",
      event: this.details,
      isShow: function isShow(item) {
        return item.status == 0 ? false : true;
      }
    }, {
      type: "danger",
      label: "删除",
      event: this.delete,
      isShow: function isShow(item) {
        return item.status == 1 ? false : true;
      }
    }];
  },
  beforeUpdate: function beforeUpdate() {
    console.log('beforeUpdate');
    if (this.data == null || this.data.length == 0) return;
    if (this.header == null || this.header.length == 0) {
      console.log('header is null,use defHeader');
      this.curHeader = this.defHeader(this.data);
    } else {
      this.curHeader = this.header;
    }
  }
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_auto_table_vue__ = __webpack_require__(2);


// 为组件提供 install 安装方法，供按需引入
__WEBPACK_IMPORTED_MODULE_0__src_auto_table_vue__["a" /* default */].install = function (Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__src_auto_table_vue__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__src_auto_table_vue__["a" /* default */]);
};

// 默认导出组件
/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__src_auto_table_vue__["a" /* default */]);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_auto_table_vue__ = __webpack_require__(0);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_466cfc93_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_auto_table_vue__ = __webpack_require__(4);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_auto_table_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_466cfc93_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_auto_table_vue__["a" /* default */],
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
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-table',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.table.loading),expression:"table.loading"}],attrs:{"border":true,"data":_vm.data,"stripe":_vm.table.stripe},on:{"selection-change":_vm.handleSelectionChange}},[_vm._l((_vm.curHeader),function(item){return [(item.type == 'selection')?_c('el-table-column',{attrs:{"type":"selection","fixed":item.fixed,"width":item.width}}):(item.type=='options'&&_vm.options.length)?[_c('el-table-column',{attrs:{"label":item.label,"width":item.width,"fixed":item.fixed},scopedSlots:_vm._u([{key:"header",fn:function(scope){return [_c('el-button',{attrs:{"size":"small","type":"danger"},on:{"click":_vm.deleteSelections}},[_vm._v("删除选中的项")])]}},{key:"default",fn:function(scope){return [_vm._l((_vm.options),function(btn){return [(btn.isShow ? btn.isShow(scope.row) : true)?_c('el-button',{attrs:{"size":"mini","type":btn.type},on:{"click":function($event){return btn.event(scope.row,scope.$index)}}},[_vm._v(_vm._s(btn.label))]):_vm._e()]})]}}],null,true)})]:[(item.type == 'img')?[_c('el-table-column',{attrs:{"prop":item.prop,"label":item.label,"width":item.width},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-popover',{attrs:{"placement":"left","trigger":"click"}},[_c('div',[_c('el-image',{staticStyle:{"width":"300px","height":"auto"},attrs:{"slot":"reference","src":scope.row[item.prop],"fit":"contain"},slot:"reference"})],1),_vm._v(" "),_c('el-image',{staticStyle:{"width":"80px","height":"80px"},attrs:{"slot":"reference","src":scope.row[item.prop],"fit":"contain"},slot:"reference"})],1)]}}],null,true)})]:_c('el-table-column',{attrs:{"prop":item.prop,"label":item.label,"width":item.width,"formatter":item.formatter?item.formatter:null,"show-overflow-tooltip":item.tooltip?item.tooltip:false,"sortable":item.sortable?item.sortable:false}})]]})],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
/******/ ]);
});