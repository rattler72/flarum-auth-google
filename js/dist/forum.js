module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./forum.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./forum.js":
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum/ */ "./src/forum/index.js");
/* empty/unused harmony star reexport *//*
 * This file is part of Flarum.
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_LogInButtons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/LogInButtons */ "flarum/components/LogInButtons");
/* harmony import */ var flarum_components_LogInButtons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LogInButtons__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_LogInButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/LogInButton */ "flarum/components/LogInButton");
/* harmony import */ var flarum_components_LogInButton__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LogInButton__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/LogInModal */ "flarum/components/LogInModal");
/* harmony import */ var flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_4__);
var _this = undefined;






flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.initializers.add('saleksin-auth-google', function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_LogInButtons__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'items', function (items) {
    console.log('Login items...');
    console.log(items);
    items.add('google', m(flarum_components_LogInButton__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: "Button LogInButton--nnd",
      icon: "nnd-btn fab fa-google",
      path: "/auth/google"
    }, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('saleksin-auth-google.forum.log_in.with_google_button')));
  });

  flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_4___default.a.prototype.me = function () {
    return this;
  };

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["override"])(flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_4___default.a.prototype, 'body', function (original) {
    console.log('Body overriding...');
    var og = original();
    console.log(og);
    console.log(_this);
    return [m(flarum_components_LogInButtons__WEBPACK_IMPORTED_MODULE_2___default.a, null)];
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["override"])(flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_4___default.a.prototype, 'footer', function (original) {
    console.log('Body overriding...');
    var og = original();
    console.log(og);
    return [m("p", {
      className: "LogInModal-signUp"
    }, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('saleksin-auth-google.forum.log_in.footer'))];
  });
});

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/LogInButton":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['components/LogInButton']" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LogInButton'];

/***/ }),

/***/ "flarum/components/LogInButtons":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['components/LogInButtons']" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LogInButtons'];

/***/ }),

/***/ "flarum/components/LogInModal":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['components/LogInModal']" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LogInModal'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map