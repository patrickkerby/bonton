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
/******/ 	__webpack_require__.p = "/app/themes/bonton/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 75);
/******/ })
/************************************************************************/
/******/ ({

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(76);


/***/ }),

/***/ 76:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: ValidationError: Invalid options object. Sass Loader has been initialized using an options object that does not match the API schema.\n - options has an unknown property 'sourceComments'. These properties are valid:\n   object { implementation?, sassOptions?, additionalData?, sourceMap?, webpackImporter? }\n    at validate (/Users/patrickkerby/Documents/sites/bonton/web/app/themes/bonton/node_modules/sass-loader/node_modules/schema-utils/dist/validate.js:191:11)\n    at Object.loader (/Users/patrickkerby/Documents/sites/bonton/web/app/themes/bonton/node_modules/sass-loader/dist/index.js:22:29)\n    at /Users/patrickkerby/Documents/sites/bonton/web/app/themes/bonton/node_modules/webpack/lib/NormalModule.js:195:19\n    at /Users/patrickkerby/Documents/sites/bonton/web/app/themes/bonton/node_modules/webpack/node_modules/loader-runner/lib/LoaderRunner.js:367:11\n    at /Users/patrickkerby/Documents/sites/bonton/web/app/themes/bonton/node_modules/webpack/node_modules/loader-runner/lib/LoaderRunner.js:233:18\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)");

/***/ })

/******/ });
//# sourceMappingURL=woo.js.map