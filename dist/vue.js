(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vue"] = factory();
	else
		root["Vue"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _zxr = __webpack_require__(1);
	
	var _initComponent = __webpack_require__(2);
	
	(0, _initComponent.initComponent)(_zxr.Zxr);
	// 全局出口
	module.exports = _zxr.Zxr;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Zxr实例构造函数
	 * @param options
	 * @constructor
	 */
	function Zxr(options) {
	    if (options == null) throw new Error('an object param named must be pass in!');
	    var el = options.el;
	    el = document.querySelector(el);
	    this.$data = options.data;
	    this._watchers = [];
	    // 编译模板
	    this.__walker(el);
	    // 添加响应
	    this.__defineReactive();
	}
	exports.Zxr = Zxr;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.initComponent = initComponent;
	
	var _watcher = __webpack_require__(3);
	
	function initComponent(Zxr) {
	    /**
	     * 插值处理函数
	     * 将字符串中的{{xx}}替换为实际的值
	     */
	    Zxr.prototype.__insertVal = function (txt, elem) {
	        var rule = /\{\{\s*(\w+)\s*}}/g,
	            matchResult = rule.exec(txt),
	            data = this.$data,
	            watchers = this._watchers;
	        if (!matchResult) return txt;
	        var keys = matchResult.slice(1);
	        for (var i = 0, len = keys.length; i < len; i++) {
	            var key = keys[i];
	            var result = key in data ? data[key] : '';
	            txt = txt.replace(rule, result);
	            // 对所有插值语句创建watcher
	            var watcher = new _watcher.Watcher(this.$data[key], elem, keys[i]);
	            watchers.push(watcher);
	        }
	        return txt;
	    };
	    /**
	     * 节点遍历处理函数
	     */
	    Zxr.prototype.__walker = function (el) {
	        var _this = this;
	
	        var attrs = el.attributes,
	            childNodes = el.childNodes;
	        var parseFn = function parseFn(arrayLike) {
	            for (var i = 0, len = arrayLike.length; i < len; i++) {
	                var item = arrayLike[i];
	                // 属性节点
	                if (item.nodeType === 2) {
	                    var name = item.name === 'class' ? 'className' : item.name;
	                    item.ownerElement[name] = _this.__insertVal(item.value, item);
	                }
	                // 文本节点
	                if (item.nodeType === 3) {
	                    var textNode = document.createTextNode(_this.__insertVal(item.textContent, item));
	                    item.parentNode.replaceChild(textNode, item);
	                }
	                // 递归处理element节点和document节点
	                if (item.nodeType === 1 || item.nodeType === 9) _this.__walker(item);
	            }
	        };
	        // 遍历属性处理属性插值
	        if (attrs.length > 0) parseFn(attrs);
	        // 遍历子节点，处理节点插值
	        if (childNodes.length > 0) parseFn(childNodes);
	    };
	    /**
	     * 为data对象添加响应
	     */
	    Zxr.prototype.__defineReactive = function () {
	        var data = this.$data,
	            watchers = this._watchers;
	        // 发布一个更新视图通知
	        var notify = function notify(key, newVal) {
	            for (var i = 0, len = watchers.length; i < len; i++) {
	                var watcher = watchers[i];
	                if (key === watcher.key) watcher.update(newVal);
	            }
	        };
	
	        var _loop = function _loop(i) {
	            Object.defineProperty(data, i, {
	                set: function set(newVal) {
	                    notify(i, newVal);
	                    return newVal;
	                }
	            });
	        };
	
	        for (var i in data) {
	            _loop(i);
	        }
	    };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Watcher = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dom = __webpack_require__(4);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Watcher = exports.Watcher = function () {
	    function Watcher(val, elem, key) {
	        _classCallCheck(this, Watcher);
	
	        this.elem = elem;
	        this.lastVal = val;
	        this.key = key;
	    }
	
	    _createClass(Watcher, [{
	        key: 'update',
	        value: function update(newVal) {
	            var lastVal = this.lastVal;
	            if (newVal === lastVal) return;
	            this.lastVal = newVal;
	            _dom.Dom.updateElemContent(this.elem, newVal);
	        }
	    }]);

	    return Watcher;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Dom = exports.Dom = {
	    updateElemContent: function updateElemContent(elem, newVal) {
	        // 属性节点
	        if (elem.nodeType === 2) {
	            var name = elem.name === 'class' ? 'className' : elem.name;
	            elem.ownerElement[name] = newVal;
	        }
	        // 文本节点
	        if (elem.nodeType === 3) {
	            var textNode = document.createTextNode(newVal);
	            console.dir(elem);
	            // elem.parentNode.replaceChild(textNode, elem);
	        }
	    }
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vue.js.map