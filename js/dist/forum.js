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

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./src/forum/components/AdminLoginPage.js":
/*!************************************************!*\
  !*** ./src/forum/components/AdminLoginPage.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AdminLoginPage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/LogInModal */ "flarum/components/LogInModal");
/* harmony import */ var flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_1__);


/**
 * The `AdminLoginPage` component shows post which user Mentioned at
 */

var AdminLoginPage =
/*#__PURE__*/
function (_LogInModal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(AdminLoginPage, _LogInModal);

  function AdminLoginPage() {
    return _LogInModal.apply(this, arguments) || this;
  }

  var _proto = AdminLoginPage.prototype;

  _proto.init = function init() {
    _LogInModal.prototype.init.call(this);
  };

  _proto.className = function className() {
    return 'AdminLoginPage Modal--large';
  };

  _proto.title = function title() {
    return app.translator.trans('saleksin-auth-google.forum.log_in.admin_form');
  };

  _proto.body = function body() {
    return [m("div", {
      className: "Form Form--centered"
    }, this.fields().toArray())];
  };

  _proto.onsubmit = function onsubmit(e) {
    e.preventDefault();
    this.loading = true;
    var identification = this.identification();
    var password = this.password();
    var remember = this.remember();
    app.session.login({
      identification: identification,
      password: password,
      remember: remember
    }, {
      errorHandler: this.onerror.bind(this)
    }).then(function () {
      return window.location.href = "/";
    }, this.loaded.bind(this));
  };

  return AdminLoginPage;
}(flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_1___default.a);



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
/* harmony import */ var _components_AdminLoginPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/AdminLoginPage */ "./src/forum/components/AdminLoginPage.js");
/* harmony import */ var flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/components/SettingsPage */ "flarum/components/SettingsPage");
/* harmony import */ var flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/models/Group */ "flarum/models/Group");
/* harmony import */ var flarum_models_Group__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_models_Group__WEBPACK_IMPORTED_MODULE_7__);








flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.initializers.add('saleksin-auth-google', function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_LogInButtons__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'items', function (items) {
    items.add('google', m(flarum_components_LogInButton__WEBPACK_IMPORTED_MODULE_3___default.a, {
      className: "Button LogInButton--nnd",
      icon: "nnd-btn fab fa-google",
      path: "/auth/google"
    }, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('saleksin-auth-google.forum.log_in.with_google_button')));
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["override"])(flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_4___default.a.prototype, 'body', function (original) {
    return [m(flarum_components_LogInButtons__WEBPACK_IMPORTED_MODULE_2___default.a, null)];
  });
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["override"])(flarum_components_LogInModal__WEBPACK_IMPORTED_MODULE_4___default.a.prototype, 'footer', function (original) {
    return [m("p", {
      className: "LogInModal-signUp"
    }, flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('saleksin-auth-google.forum.log_in.footer'))];
  }); // this is just for the admin login

  flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.routes['auth.login.admin'] = {
    path: '/auth/login/admin',
    component: _components_AdminLoginPage__WEBPACK_IMPORTED_MODULE_5__["default"].component()
  }; // remove ability to edit email and password 

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_6___default.a.prototype, 'settingsItems', function (items) {
    var user = flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.session.user;
    var is_admin = false;

    if (user.id() == '1') {
      var _arr = Object.entries(user.groups());

      for (var _i = 0; _i < _arr.length; _i++) {
        var _arr$_i = _arr[_i],
            key = _arr$_i[0],
            value = _arr$_i[1];

        if (value.id() === flarum_models_Group__WEBPACK_IMPORTED_MODULE_7___default.a.ADMINISTRATOR_ID) {
          is_admin = true;
        }
      }
    }

    if (!is_admin) {
      items.remove('account');
    }
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

/***/ "flarum/components/SettingsPage":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['components/SettingsPage']" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SettingsPage'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/models/Group":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['models/Group']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['models/Group'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map