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
	    // 添加响应
	    this.__defineReactive();
	    // 编译模板
	    this.$compile(el);
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
	
	var _dep = __webpack_require__(4);
	
	var _dom = __webpack_require__(5);
	
	function initComponent(Zxr) {
	    function trimToken(str) {
	        return str.replace(/\s*\{\s*\{\s*/g, '').replace(/\s*}\s*}\s*/g, '');
	    };
	    /**
	     * 编译具体节点
	     * 将文本节点和属性节点中的{{xx}}替换为实际的值
	     */
	    Zxr.prototype._compileSingleNode = function (elem) {
	        var nodeValue = elem.textContent,
	            rule = /\{\{\s*(\w+)\s*}}/g,
	            matchResult = nodeValue.match(rule),
	            data = this.$data,
	            watchers = [];
	
	        if (!matchResult) return;
	        var keys = [];
	
	        matchResult.forEach(function (item) {
	            keys.push(trimToken(item));
	        });
	
	        for (var i = 0, len = keys.length; i < len; i++) {
	            var key = keys[i],
	                _rule = new RegExp('\\{\\{\\s*(' + key + '+)\\s*}}');
	            var result = key in data ? data[key] : '';
	            // 对所有插值语句创建watcher
	            watchers.push(new _watcher.Watcher(this, elem, key));
	            nodeValue = nodeValue.replace(_rule, result);
	        }
	        // 更新节点
	        _dom.Dom.updateNode(elem, nodeValue);
	    };
	    /**
	     * 节点遍历处理函数
	     */
	    Zxr.prototype.$compile = function (el) {
	        var _this = this;
	
	        var attrs = el.attributes,
	            childNodes = el.childNodes;
	        var parseFn = function parseFn(arrayLike) {
	            for (var i = 0, len = arrayLike.length; i < len; i++) {
	                var item = arrayLike[i];
	                // 递归处理element节点和document节点
	                if (item.nodeType === 1 || item.nodeType === 9) {
	                    _this.$compile(item);
	                } else {
	                    _this._compileSingleNode(item);
	                }
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
	        var data = this.$data;
	        var keys = Object.keys(data);
	
	        var _loop = function _loop(i, len) {
	            var key = keys[i],
	                dep = new _dep.Dep(),
	                val = data[key];
	            Object.defineProperty(data, key, {
	                get: function get() {
	                    if (_dep.Dep.target) {
	                        dep.depend();
	                    }
	                    return val;
	                },
	                set: function set(newVal) {
	                    if (newVal === val) {
	                        return;
	                    }
	                    dep.notify(newVal);
	                }
	            });
	        };
	
	        for (var i = 0, len = keys.length; i < len; i++) {
	            _loop(i, len);
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
	
	var _dep = __webpack_require__(4);
	
	var _dom = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var uid = 0;
	
	var Watcher = exports.Watcher = function () {
	    function Watcher(vm, elem, key) {
	        _classCallCheck(this, Watcher);
	
	        this.id = uid++;
	        this.key = key;
	        this.vm = vm;
	        this.elem = elem;
	        vm._watchers.push(this);
	        _dep.Dep.target = this;
	        this.value = vm.$data[key];
	        _dep.Dep.target = null;
	    }
	
	    _createClass(Watcher, [{
	        key: 'update',
	        value: function update(newVal) {
	            var lastValue = this.value;
	            if (newVal === lastValue) {
	                return;
	            }
	            var rule = new RegExp(lastValue);
	            // 处理文本节点
	            var elem = this.elem,
	                nodeValue = elem.textContent;
	            // if (node.nodeType !== 3) {
	            //     return;
	            // }
	            this.value = newVal;
	            nodeValue = nodeValue.replace(rule, newVal);
	            _dom.Dom.updateNode(elem, nodeValue);
	        }
	    }, {
	        key: 'addDep',
	        value: function addDep(dep) {
	            dep.addSub(this);
	        }
	    }]);

	    return Watcher;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var uid = 0;
	
	var Dep = exports.Dep = function Dep() {
	    _classCallCheck(this, Dep);
	
	    this.id = uid++;
	    this.subs = [];
	};
	
	Dep.target = null;
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.addSub = function (sub) {
	    this.subs.push(sub);
	};
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.removeSub = function (sub) {
	    this.subs.$remove(sub);
	};
	
	/**
	 * Add self as a dependency to the target watcher.
	 */
	
	Dep.prototype.depend = function () {
	    Dep.target.addDep(this);
	};
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	Dep.prototype.notify = function (newVal) {
	    // stablize the subscriber list first
	    var subs = this.subs;
	    for (var i = 0, l = subs.length; i < l; i++) {
	        subs[i].update(newVal);
	    }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Dom = exports.Dom = {
	    updateNode: function updateNode(elem, newVal) {
	        var nodeValue = elem.textContent;
	        if (nodeValue === newVal) {
	            return elem;
	        }
	        // 属性节点
	        if (elem.nodeType === 2) {
	            var name = elem.name === 'class' ? 'className' : elem.name;
	            elem.ownerElement[name] = newVal;
	        }
	        // 文本节点
	        if (elem.nodeType === 3) {
	            elem.textContent = newVal;
	        }
	    }
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vue.js.map