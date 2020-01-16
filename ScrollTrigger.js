(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ScrollTrigger", [], factory);
	else if(typeof exports === 'object')
		exports["ScrollTrigger"] = factory();
	else
		root["ScrollTrigger"] = factory();
})(window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/canvas.js":
/*!************************!*\
  !*** ./demo/canvas.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Canvas; });
/* harmony import */ var _scene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scene */ "./demo/scene.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var FRAME_RATE = 60;
var FRAME_RATE_SECONDS = 1000 / FRAME_RATE;

var Canvas =
/*#__PURE__*/
function () {
  function Canvas(ctx, w, h) {
    _classCallCheck(this, Canvas);

    this.ctx = ctx;
    this.width = w;
    this.height = h;
    this.scene = new _scene__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, w, h);
    this.lastDraw = null;
  }

  _createClass(Canvas, [{
    key: "update",
    value: function update() {
      this.scene.update(this.width, this.height);
    }
  }, {
    key: "draw",
    value: function draw() {
      var now = Date.now();

      if (this.lastDraw !== null) {
        var diff = now - this.lastDraw;

        if (diff < FRAME_RATE_SECONDS) {
          return;
        }
      }

      this.ctx.clearRect(0, 0, this.width, this.height);
      this.scene.draw();
      this.lastDraw = now;
    }
  }, {
    key: "didResize",
    value: function didResize() {
      this.scene.reset();
    }
  }, {
    key: "scrollDelta",
    set: function set(val) {
      this.scene.scrollDelta = val;
    }
  }]);

  return Canvas;
}();



/***/ }),

/***/ "./demo/main.js":
/*!**********************!*\
  !*** ./demo/main.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_ScrollTrigger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/ScrollTrigger */ "./src/ScrollTrigger.js");
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas */ "./demo/canvas.js");



(function (document, window) {
  // This is where the magic happens, start by initializing a ScrollTrigger
  // instance. We can set default options for all triggers in the constructor.
  //
  // We set some default 'trigger' options, and add a custom callback for
  // the didScroll method. Also we set the scroll sustain to 800ms.
  var trigger = new _src_ScrollTrigger__WEBPACK_IMPORTED_MODULE_0__["default"]({
    // Set custom (default) options for the triggers, these can be overwritten
    // when adding new triggers to the ScrollTrigger instance. If you pass
    // options when adding new triggers, you'll only need to pass the object
    // `trigger`, e.g. { once: false }
    trigger: {
      // If the trigger should just work one time
      once: false,
      offset: {
        // Set an offset based on the elements position, returning an
        // integer = offset in px, float = offset in percentage of either
        // width (when setting the x offset) or height (when setting y)
        //
        // So setting an yOffset of 0.2 means 20% of the elements height,
        // the callback / class will be toggled when the element is 20%
        // in the viewport.
        element: {
          x: 0,
          y: function y(trigger, rect, direction) {
            // You can add custom offsets according to callbacks, you
            // get passed the trigger, rect (DOMRect) and the scroll
            // direction, a string of either top, left, right or
            // bottom.
            return 0.2;
          }
        },
        // Setting an offset of 0.2 on the viewport means the trigger
        // will be called when the element is 20% in the viewport. So if
        // your screen is 1200x600px, the trigger will be called when the
        // user has scrolled for 120px.
        viewport: {
          x: 0,
          y: function y(trigger, frame, direction) {
            // We check if the trigger is visible, if so, the offset
            // on the viewport is 0, otherwise it's 20% of the height
            // of the viewport. This causes the triggers to animate
            // 'on screen' when the element is in the viewport, but
            // don't trigger the 'out' class until the element is out
            // of the viewport.
            // This is the same as returning Math.ceil(0.2 * frame.h)
            return trigger.visible ? 0 : 0.2;
          }
        }
      },
      toggle: {
        // The class(es) that should be toggled
        "class": {
          "in": 'visible',
          // Either a string, or an array of strings
          out: ['invisible', 'extraClassToToggleWhenHidden']
        },
        callback: {
          // A callback when the element is going in the viewport, you can
          // return a Promise here, the trigger will not be called until
          // the promise resolves.
          "in": null,
          // A callback when the element is visible on screen, keeps
          // on triggering for as long as 'sustain' is set
          visible: null,
          // A callback when the element is going out of the viewport.
          // You can also return a promise here, like in the 'in' callback.
          //
          // Here an example where all triggers take 10ms to trigger
          // the 'out' class.
          out: function out(trigger) {
            // `trigger` contains the Trigger object that goes out
            // of the viewport
            return new Promise(function (resolve, reject) {
              setTimeout(resolve, 10);
            });
          }
        }
      }
    },
    // Set custom options and callbacks for the ScrollAnimationLoop
    scroll: {
      // The amount of ms the scroll loop should keep triggering after the
      // scrolling has stopped. This is sometimes nice for canvas
      // animations.
      sustain: 200,
      // Window|HTMLDocument|HTMLElement to check for scroll events
      element: window,
      // Add a callback when the user has scrolled, keeps on triggering for
      // as long as the sustain is set to do
      callback: didScroll,
      // Callback when the user started scrolling
      start: function start() {},
      // Callback when the user stopped scrolling
      stop: function stop() {},
      // Callback when the user changes direction in scrolling
      directionChange: function directionChange() {}
    }
  });
  var canvasElement = document.querySelector('canvas'),
      ctx = canvasElement.getContext('2d');
  var w = canvasElement.width = window.innerWidth,
      h = canvasElement.height = window.innerHeight,
      density = 1,
      isDrawing = true;
  var canvas = new _canvas__WEBPACK_IMPORTED_MODULE_1__["default"](ctx, w, h);

  function setup() {
    // Add the triggers
    addTriggers(); // Basic canvas setup

    window.addEventListener('resize', resize);
    density = window.devicePixelRatio != undefined ? window.devicePixelRatio : 1.0;
    canvasElement.width = w * density;
    canvasElement.height = h * density;
    canvas.width = w;
    canvas.height = h;
    ctx.scale(density, density);
    draw();
  }

  function addTriggers() {
    // Adding triggers can be done in multiple ways, the easiest is to pass
    // a querySelector.
    trigger.add('[data-slideInLeft]').add('[data-slideInRight]').add('[data-slideInBottom]'); // Add the trigger for the callback example, also add a custom callback
    // when the trigger becomes visible. As an example we pass an HTMLElement
    // instead of a querySelector.

    var element = document.querySelector('[data-callback]');
    trigger.add(element, {
      toggle: {
        callback: {
          "in": counterCallback
        }
      }
    });
  }

  function counterCallback(trigger) {
    // In the callback we get passed the Trigger object, from here we have
    // access to the responding HTMLElement among other things. You could,
    // for instance, change the class it toggles, or attach another callback.
    // Check the console for more info.
    console.info(trigger); // For now, we just append the counter

    var counterElement = trigger.element.querySelector('span');
    var counter = parseInt(counterElement.innerText);
    counterElement.innerText = counter + 1;
  }

  function didScroll(position) {
    // calculate the delta, from 0 to 1 (when having 1 screen height) to
    // animate with
    var delta = position.y / window.innerHeight;
    canvas.scrollDelta = delta; // change the backgroundColor accordingly
    // const lightness = map(delta, 0, 1, 5, 76)
    // const saturation = map(delta, 0, 1, 84, 0)
    // document.body.style.backgroundColor = `hsl(186, ${saturation}%, ${lightness}%)`
    // check if the canvas is on-screen, otherwise stop the animationLoop.

    if (position.y > window.innerHeight) {
      isDrawing = false;
    } else if (!isDrawing) {
      isDrawing = true;
      draw();
    }
  }

  function map(value, start1, stop1, start2, stop2) {
    return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  }

  function draw() {
    canvas.update();
    canvas.draw();

    if (isDrawing) {
      window.requestAnimationFrame(draw);
    }
  }

  function resize() {
    w = canvasElement.width = window.innerWidth;
    h = canvasElement.height = window.innerHeight;
    canvasElement.width = w * density;
    canvasElement.height = h * density;
    canvas.width = w;
    canvas.height = h;
    ctx.scale(density, density);
    canvas.didResize();
  }

  setup();
})(document, window);

/***/ }),

/***/ "./demo/point.js":
/*!***********************!*\
  !*** ./demo/point.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Point; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var POINT_RADIUS = 3.5;
var MIN_SPEED = 0.05;
var MAX_SPEED = 0.1;

function getRandomNegative(from, to) {
  var rand = from + Math.random() * (to - from);
  return Math.random() > 0.5 ? rand : -rand;
}

var Point =
/*#__PURE__*/
function () {
  function Point(id, w, h) {
    _classCallCheck(this, Point);

    this.id = id;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.xExtra = 0;
    this.yExtra = 0;
    this.xSpeed = getRandomNegative(MIN_SPEED, MAX_SPEED);
    this.ySpeed = getRandomNegative(MIN_SPEED, MAX_SPEED);
  }

  _createClass(Point, [{
    key: "update",
    value: function update(w, h, delta) {
      var xExtra = 0;
      var yExtra = 0;

      if (this.x > w / 2) {
        this.xExtra = delta * (w / 2);
      } else {
        this.xExtra = -(delta * (w / 2));
      }

      if (this.y > h / 2) {
        this.yExtra = delta * (h / 2);
      } else {
        this.yExtra = -(delta * (h / 2));
      }

      this.x += this.xSpeed;
      this.y += this.ySpeed;

      if (this.x < POINT_RADIUS || this.x + POINT_RADIUS > w) {
        this.x = this.x < POINT_RADIUS ? POINT_RADIUS : w - POINT_RADIUS;
        this.xSpeed = -this.xSpeed;
      }

      if (this.y < POINT_RADIUS || this.y + POINT_RADIUS > h) {
        this.y = this.y < POINT_RADIUS ? POINT_RADIUS : h - POINT_RADIUS;
        this.ySpeed = -this.ySpeed;
      }
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.calcX, this.calcY, POINT_RADIUS, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, {
    key: "calcX",
    get: function get() {
      return this.x - this.xExtra;
    }
  }, {
    key: "calcY",
    get: function get() {
      return this.y - this.yExtra;
    }
  }]);

  return Point;
}();



/***/ }),

/***/ "./demo/scene.js":
/*!***********************!*\
  !*** ./demo/scene.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Scene; });
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./point */ "./demo/point.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var AMOUNT_DELTA = 2.4;
var CONNECT_DISTANCE = 260;
var LINE_WIDTH = 2;

var Scene =
/*#__PURE__*/
function () {
  function Scene(ctx, w, h) {
    _classCallCheck(this, Scene);

    this.ctx = ctx;
    this.width = w;
    this.height = h;
    this.scrollDelta = 0;
    this.ctx.globalCompositeOperation = 'lighter';
    this.reset();
  }

  _createClass(Scene, [{
    key: "reset",
    value: function reset() {
      this.points = [];
      this.populate();
    }
  }, {
    key: "populate",
    value: function populate() {
      var amount = Math.ceil((this.width + this.height) / 100 * AMOUNT_DELTA);

      for (var i = 0; i < amount; i++) {
        var point = new _point__WEBPACK_IMPORTED_MODULE_0__["default"](i, this.width, this.height);
        this.points.push(point);
      }
    }
  }, {
    key: "update",
    value: function update(w, h) {
      this.width = w;
      this.height = h;

      for (var i = 0; i < this.points.length; i++) {
        var point = this.points[i];
        point.update(w, h, this.scrollDelta);
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      this.ctx.fillStyle = '#2B7174';
      var linesById = {};

      for (var x = 0; x < this.points.length; x++) {
        var point = this.points[x];
        point.draw(this.ctx);

        for (var y = 0; y < this.points.length; y++) {
          var reference = this.points[y];

          if (reference.id === point.id) {
            continue;
          }

          var distanceX = Math.abs(point.calcX - reference.calcX);
          var distanceY = Math.abs(point.calcY - reference.calcY);
          var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

          if (distance <= CONNECT_DISTANCE) {
            var tag = point.id > reference.id ? "".concat(reference.id, "_").concat(point.id) : "".concat(point.id, "_").concat(reference.id);

            if (linesById.hasOwnProperty(tag)) {
              continue;
            }

            linesById[tag] = {
              x1: point.calcX,
              y1: point.calcY,
              x2: reference.calcX,
              y2: reference.calcY,
              distance: distance
            };
          }
        }
      }

      var lines = Object.values(linesById);

      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var alpha = 1.0 - line.distance / CONNECT_DISTANCE;
        this.ctx.strokeStyle = "rgba(98, 130, 94, ".concat(alpha, ")");
        this.ctx.lineWidth = LINE_WIDTH;
        this.ctx.beginPath();
        this.ctx.moveTo(line.x1, line.y1);
        this.ctx.lineTo(line.x2, line.y2);
        this.ctx.stroke();
      }
    }
  }]);

  return Scene;
}();



/***/ }),

/***/ "./node_modules/object-extend/lib/extend.js":
/*!**************************************************!*\
  !*** ./node_modules/object-extend/lib/extend.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * object-extend
 * A well-tested function to deep extend (or merge) JavaScript objects without further dependencies.
 *
 * http://github.com/bernhardw
 *
 * Copyright 2013, Bernhard Wanger <mail@bernhardwanger.com>
 * Released under the MIT license.
 *
 * Date: 2013-04-10
 */


/**
 * Extend object a with object b.
 *
 * @param {Object} a Source object.
 * @param {Object} b Object to extend with.
 * @returns {Object} a Extended object.
 */
module.exports = function extend(a, b) {

    // Don't touch 'null' or 'undefined' objects.
    if (a == null || b == null) {
        return a;
    }

    // TODO: Refactor to use for-loop for performance reasons.
    Object.keys(b).forEach(function (key) {

        // Detect object without array, date or null.
        // TODO: Performance test:
        // a) b.constructor === Object.prototype.constructor
        // b) Object.prototype.toString.call(b) == '[object Object]'
        if (Object.prototype.toString.call(b[key]) == '[object Object]') {
            if (Object.prototype.toString.call(a[key]) != '[object Object]') {
                a[key] = b[key];
            } else {
                a[key] = extend(a[key], b[key]);
            }
        } else {
            a[key] = b[key];
        }

    });

    return a;

};

/***/ }),

/***/ "./src/ScrollTrigger.js":
/*!******************************!*\
  !*** ./src/ScrollTrigger.js ***!
  \******************************/
/*! exports provided: Trigger, TriggerCollection, ScrollAnimationLoop, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Trigger", function() { return Trigger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TriggerCollection", function() { return TriggerCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollAnimationLoop", function() { return ScrollAnimationLoop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScrollTrigger; });
/* harmony import */ var _config_DefaultOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/DefaultOptions */ "./src/config/DefaultOptions.js");
/* harmony import */ var _scripts_Trigger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/Trigger */ "./src/scripts/Trigger.js");
/* harmony import */ var _scripts_TriggerCollection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/TriggerCollection */ "./src/scripts/TriggerCollection.js");
/* harmony import */ var _scripts_ScrollAnimationLoop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/ScrollAnimationLoop */ "./src/scripts/ScrollAnimationLoop.js");
/* harmony import */ var object_extend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! object-extend */ "./node_modules/object-extend/lib/extend.js");
/* harmony import */ var object_extend__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(object_extend__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _extensions_Array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./extensions/Array */ "./src/extensions/Array.js");
/* harmony import */ var _extensions_Array__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_extensions_Array__WEBPACK_IMPORTED_MODULE_5__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*!
 * ScrollTrigger
 *
 *
 * http://github.com/terwanerik
 *
 * Copyright 2017, Erik Terwan <erik@erikterwan.com>
 * Released under the MIT license.
 *
 * Date: 2017-07-09
 */

/**
 * Created by Erik on 09/07/2017.
 */






var Trigger = _scripts_Trigger__WEBPACK_IMPORTED_MODULE_1__["default"];
var TriggerCollection = _scripts_TriggerCollection__WEBPACK_IMPORTED_MODULE_2__["default"];
var ScrollAnimationLoop = _scripts_ScrollAnimationLoop__WEBPACK_IMPORTED_MODULE_3__["default"];

var ScrollTrigger =
/*#__PURE__*/
function () {
  /**
   * Constructor for the scroll trigger
   * @param {DefaultOptions} [options=DefaultOptions] options
   */
  function ScrollTrigger(options) {
    _classCallCheck(this, ScrollTrigger);

    this._parseOptions(options);

    this._initCollection();

    this._initLoop();
  }
  /**
   * Parses the options
   * @param {DefaultOptions} [options=DefaultOptions] options
   * @private
   */


  _createClass(ScrollTrigger, [{
    key: "_parseOptions",
    value: function _parseOptions(options) {
      options = object_extend__WEBPACK_IMPORTED_MODULE_4___default()(new _config_DefaultOptions__WEBPACK_IMPORTED_MODULE_0__["default"](), options);
      this.defaultTrigger = options.trigger;
      this.scrollOptions = options.scroll;
    }
    /**
     * Initializes the collection, picks all [data-scroll] elements as initial elements
     * @private
     */

  }, {
    key: "_initCollection",
    value: function _initCollection() {
      var scrollAttributes = document.querySelectorAll('[data-scroll]');
      var elements = [];

      if (scrollAttributes.length > 0) {
        elements = this.createTriggers(scrollAttributes);
      }

      this.collection = new TriggerCollection(elements);
    }
    /**
     * Initializes the scroll loop
     * @private
     */

  }, {
    key: "_initLoop",
    value: function _initLoop() {
      var _this = this;

      this.loop = new ScrollAnimationLoop({
        sustain: this.scrollOptions.sustain,
        element: this.scrollOptions.element,
        callback: function callback(position, direction) {
          _this._scrollCallback(position, direction);
        },
        start: function start() {
          _this._scrollStart();
        },
        stop: function stop() {
          _this._scrollStop();
        },
        directionChange: function directionChange(direction) {
          _this._scrollDirectionChange(direction);
        }
      });
    }
    /**
     * Callback for checking triggers
     * @param {{x: number, y: number}} position
     * @param {string} direction
     * @private
     */

  }, {
    key: "_scrollCallback",
    value: function _scrollCallback(position, direction) {
      var _this2 = this;

      this.collection.call(function (trigger) {
        trigger.checkVisibility(_this2.scrollOptions.element, direction);
      });
      this.scrollOptions.callback(position, direction);
    }
    /**
     * When the scrolling started
     * @private
     */

  }, {
    key: "_scrollStart",
    value: function _scrollStart() {
      this.scrollOptions.start();
    }
    /**
     * When the scrolling stopped
     * @private
     */

  }, {
    key: "_scrollStop",
    value: function _scrollStop() {
      this.scrollOptions.stop();
    }
    /**
     * When the direction changes
     * @param {string} direction
     * @private
     */

  }, {
    key: "_scrollDirectionChange",
    value: function _scrollDirectionChange(direction) {
      this.scrollOptions.directionChange(direction);
    }
    /**
     * Creates a Trigger object from a given element and optional option set
     * @param {HTMLElement} element
     * @param {DefaultOptions.trigger} [options=DefaultOptions.trigger] options
     * @returns Trigger
     */

  }, {
    key: "createTrigger",
    value: function createTrigger(element, options) {
      return new Trigger(element, object_extend__WEBPACK_IMPORTED_MODULE_4___default()(this.defaultTrigger, options));
    }
    /**
     * Creates an array of triggers
     * @param {HTMLElement[]|NodeList} elements
     * @param {Object} [options=null] options
     * @returns {Trigger[]} Array of triggers
     */

  }, {
    key: "createTriggers",
    value: function createTriggers(elements, options) {
      var _this3 = this;

      var triggers = [];
      elements.each(function (element) {
        triggers.push(_this3.createTrigger(element, options));
      });
      return triggers;
    }
    /**
     * Adds triggers
     * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
     * @param {Object} [options=null] options
     * @returns {ScrollTrigger}
     */

  }, {
    key: "add",
    value: function add(objects, options) {
      if (objects instanceof HTMLElement) {
        this.collection.add(this.createTrigger(objects, options));
        return this;
      }

      if (objects instanceof Trigger) {
        this.collection.add(objects);
        return this;
      }

      if (objects instanceof NodeList) {
        this.collection.add(this.createTriggers(objects, options));
        return this;
      }

      if (Array.isArray(objects) && objects.length && objects[0] instanceof Trigger) {
        this.collection.add(objects);
        return this;
      }

      if (Array.isArray(objects) && objects.length && objects[0] instanceof HTMLElement) {
        this.collection.add(this.createTriggers(objects, options));
        return this;
      } // assume it's a query string


      this.collection.add(this.createTriggers(document.querySelectorAll(objects), options));
      return this;
    }
    /**
     * Removes triggers
     * @param {string|HTMLElement|NodeList|Trigger|Trigger[]} objects A list of objects or a query
     * @returns {ScrollTrigger}
     */

  }, {
    key: "remove",
    value: function remove(objects) {
      if (objects instanceof Trigger) {
        this.collection.remove(objects);
        return this;
      }

      if (Array.isArray(objects) && objects.length && objects[0] instanceof Trigger) {
        this.collection.remove(objects);
        return this;
      }

      if (objects instanceof HTMLElement) {
        this.collection.remove(this.search(objects));
        return this;
      }

      if (Array.isArray(objects) && objects.length && objects[0] instanceof HTMLElement) {
        this.collection.remove(this.search(objects));
        return this;
      }

      if (objects instanceof NodeList) {
        this.collection.remove(this.search(objects));
        return this;
      }

      if (Array.isArray(objects) && objects.length && objects[0] instanceof Trigger) {
        this.collection.remove(objects);
        return this;
      } // assume it's a query string


      this.collection.remove(this.query(objects.toString()));
      return this;
    }
    /**
     * Lookup one or multiple triggers by a query string
     * @param {string} selector
     * @returns {Trigger[]}
     */

  }, {
    key: "query",
    value: function query(selector) {
      return this.collection.query(selector);
    }
    /**
     * Lookup one or multiple triggers by a certain HTMLElement or NodeList
     * @param {HTMLElement|HTMLElement[]|NodeList} element
     * @returns {Trigger|Trigger[]|null}
     */

  }, {
    key: "search",
    value: function search(element) {
      return this.collection.search(element);
    }
    /**
     * Reattaches the scroll listener
     */

  }, {
    key: "listen",
    value: function listen() {
      if (this.loop) {
        return;
      }

      this._initLoop();
    }
    /**
     * Kills the scroll listener
     */

  }, {
    key: "kill",
    value: function kill() {
      this.loop.kill();
      this.loop = null;
    }
  }]);

  return ScrollTrigger;
}();



/***/ }),

/***/ "./src/config/DefaultOptions.js":
/*!**************************************!*\
  !*** ./src/config/DefaultOptions.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Default options for ScrollTrigger
 */
/* harmony default export */ __webpack_exports__["default"] = (function () {
  /**
   * The default options for a trigger
   *
   * @type {
   * {
   *  once: boolean,
   *  offset: {
   *    viewport: {
   *      x: number|(function(frame, direction)),
   *      y: number|(function(frame, direction))
   *    },
   *    element: {
   *      x: number|(function(rect, direction)),
   *      y: number|(function(rect, direction))
   *    }
   *  },
   *  toggle: {
   *    class: {
   *      in: string|string[],
   *      out: string|string[]
   *    },
   *  callback: {
   *    in: {TriggerInCallback},
      *    visible: (function()),
   *    out: (function())
   *  }
   * }
   * }}
   */
  this.trigger = {
    once: false,
    offset: {
      viewport: {
        x: 0,
        y: 0
      },
      element: {
        x: 0,
        y: 0
      }
    },
    toggle: {
      "class": {
        "in": 'visible',
        out: 'invisible'
      },
      callback: {
        "in": null,
        visible: null,
        out: null
      }
    }
  };
  /**
   * The `in` callback is called when the element enters the viewport
   * @callback TriggerInCallback
   * @param {{x: Number, y: Number}} position
   * @param {string} direction
   */

  /**
   * The default options for the scroll behaviour
   * @type {
   * {
   *  sustain: number,
   *  element: Window|HTMLDocument|HTMLElement,
   *  callback: {ScrollCallback},
   *  start: (function()),
   *  stop: (function()),
   *  directionChange: (function(direction: {string}))
   * }
   * }
   */

  this.scroll = {
    sustain: 300,
    element: window,
    callback: function callback() {},
    start: function start() {},
    stop: function stop() {},
    directionChange: function directionChange() {}
  };
  /**
   * The scroll callback is called when the user scrolls
   * @callback ScrollCallback
   * @param {{x: Number, y: Number}} position
   * @param {string} direction
   */
});

/***/ }),

/***/ "./src/extensions/Array.js":
/*!*********************************!*\
  !*** ./src/extensions/Array.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Faster than .forEach
 * @param {(function())} fn The function to call
 */
Array.prototype.each = function (fn) {
  var l = this.length;

  for (var i = 0; i < l; i++) {
    var e = this[i];

    if (e) {
      fn(e, i);
    }
  }
};
/**
 * Give NodeList some Array functions
 */


NodeList.prototype.each = Array.prototype.each;
NodeList.prototype.filter = Array.prototype.filter;

/***/ }),

/***/ "./src/scripts/ScrollAnimationLoop.js":
/*!********************************************!*\
  !*** ./src/scripts/ScrollAnimationLoop.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScrollAnimationLoop; });
/* harmony import */ var _config_DefaultOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/DefaultOptions */ "./src/config/DefaultOptions.js");
/* harmony import */ var object_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! object-extend */ "./node_modules/object-extend/lib/extend.js");
/* harmony import */ var object_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(object_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _extensions_Array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../extensions/Array */ "./src/extensions/Array.js");
/* harmony import */ var _extensions_Array__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_extensions_Array__WEBPACK_IMPORTED_MODULE_2__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var ScrollAnimationLoop =
/*#__PURE__*/
function () {
  /**
   * ScrollAnimationLoop constructor.
   * Starts a requestAnimationFrame loop as long as the user has scrolled the scrollElement. Stops after a certain time.
   *
   * @param {DefaultOptions.scroll} [options=DefaultOptions.scroll] options The options for the loop
   * @param {ScrollCallback} callback [loop=null] The loop callback
   */
  function ScrollAnimationLoop(options, callback) {
    _classCallCheck(this, ScrollAnimationLoop);

    this._parseOptions(options);

    if (typeof callback === 'function') {
      this.callback = callback;
    }

    this.direction = 'none';
    this.position = this.getPosition();
    this.lastAction = this._getTimestamp();

    this._startRun();

    this._boundListener = this._didScroll.bind(this);
    this.element.addEventListener('scroll', this._boundListener);
  }
  /**
   * Parses the options
   *
   * @param {DefaultOptions.scroll} [options=DefaultOptions.scroll] options The options for the loop
   * @private
   */


  _createClass(ScrollAnimationLoop, [{
    key: "_parseOptions",
    value: function _parseOptions(options) {
      var defaults = new _config_DefaultOptions__WEBPACK_IMPORTED_MODULE_0__["default"]().scroll;

      if (typeof options != 'function') {
        defaults.callback = function () {};

        defaults = object_extend__WEBPACK_IMPORTED_MODULE_1___default()(defaults, options);
      } else {
        defaults.callback = options;
      }

      this.element = defaults.element;
      this.sustain = defaults.sustain;
      this.callback = defaults.callback;
      this.startCallback = defaults.start;
      this.stopCallback = defaults.stop;
      this.directionChange = defaults.directionChange;
    }
    /**
     * Callback when the user scrolled the element
     * @private
     */

  }, {
    key: "_didScroll",
    value: function _didScroll() {
      var newPosition = this.getPosition();

      if (this.position !== newPosition) {
        var newDirection = this.direction;

        if (newPosition.x !== this.position.x) {
          newDirection = newPosition.x > this.position.x ? 'right' : 'left';
        } else if (newPosition.y !== this.position.y) {
          newDirection = newPosition.y > this.position.y ? 'bottom' : 'top';
        } else {
          newDirection = 'none';
        }

        if (newDirection !== this.direction) {
          this.direction = newDirection;

          if (typeof this.directionChange === 'function') {
            this.directionChange(this.direction);
          }
        }

        this.position = newPosition;
        this.lastAction = this._getTimestamp();
      } else {
        this.direction = 'none';
      }

      if (!this.running) {
        this._startRun();
      }
    }
    /**
     * Starts the loop, calls the start callback
     * @private
     */

  }, {
    key: "_startRun",
    value: function _startRun() {
      this.running = true;

      if (typeof this.startCallback === 'function') {
        this.startCallback();
      }

      this._loop();
    }
    /**
     * Stops the loop, calls the stop callback
     * @private
     */

  }, {
    key: "_stopRun",
    value: function _stopRun() {
      this.running = false;

      if (typeof this.stopCallback === 'function') {
        this.stopCallback();
      }
    }
    /**
     * The current position of the element
     * @returns {{x: number, y: number}}
     */

  }, {
    key: "getPosition",
    value: function getPosition() {
      var left = this.element.pageXOffset || this.element.scrollLeft || document.documentElement.scrollLeft || 0;
      var top = this.element.pageYOffset || this.element.scrollTop || document.documentElement.scrollTop || 0;
      return {
        x: left,
        y: top
      };
    }
    /**
     * The current timestamp in ms
     * @returns {number}
     * @private
     */

  }, {
    key: "_getTimestamp",
    value: function _getTimestamp() {
      return Number(Date.now());
    }
    /**
     * One single tick of the animation
     * @private
     */

  }, {
    key: "_tick",
    value: function _tick() {
      this.callback(this.position, this.direction);

      var now = this._getTimestamp();

      if (now - this.lastAction > this.sustain) {
        this._stopRun();
      }

      if (this.running) {
        this._loop();
      }
    }
    /**
     * Requests an animation frame
     * @private
     */

  }, {
    key: "_loop",
    value: function _loop() {
      var frame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (callback) {
        setTimeout(callback, 1000 / 60);
      };

      frame(this._tick.bind(this));
    }
    /**
     * Kills the loop forever
     */

  }, {
    key: "kill",
    value: function kill() {
      this.running = false;
      this.element.removeEventListener('scroll', this._boundListener);
    }
  }]);

  return ScrollAnimationLoop;
}();



/***/ }),

/***/ "./src/scripts/Trigger.js":
/*!********************************!*\
  !*** ./src/scripts/Trigger.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Trigger; });
/* harmony import */ var _config_DefaultOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/DefaultOptions */ "./src/config/DefaultOptions.js");
/* harmony import */ var object_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! object-extend */ "./node_modules/object-extend/lib/extend.js");
/* harmony import */ var object_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(object_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _extensions_Array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../extensions/Array */ "./src/extensions/Array.js");
/* harmony import */ var _extensions_Array__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_extensions_Array__WEBPACK_IMPORTED_MODULE_2__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

var Trigger =
/*#__PURE__*/
function () {
  /**
   * Creates a new Trigger from the given element and options
   *
   * @param {Element|HTMLElement} element
   * @param {DefaultOptions.trigger} [options=DefaultOptions.trigger] options
   */
  function Trigger(element, options) {
    _classCallCheck(this, Trigger);

    this.element = element;
    options = object_extend__WEBPACK_IMPORTED_MODULE_1___default()(new _config_DefaultOptions__WEBPACK_IMPORTED_MODULE_0__["default"]().trigger, options);
    this.offset = options.offset;
    this.toggle = options.toggle;
    this.once = options.once;
    this.visible = null;
    this.active = true;
  }
  /**
   * Checks if the Trigger is in the viewport, calls the callbacks and toggles the classes
   * @param {HTMLElement|HTMLDocument|Window} parent
   * @param {string} direction top, bottom, left, right
   * @returns {boolean} If the element is visible
   */


  _createClass(Trigger, [{
    key: "checkVisibility",
    value: function checkVisibility(parent, direction) {
      if (!this.active) {
        return this.visible;
      }

      var parentWidth = parent.offsetWidth || parent.innerWidth || 0;
      var parentHeight = parent.offsetHeight || parent.innerHeight || 0;
      var parentFrame = {
        w: parentWidth,
        h: parentHeight
      };
      var rect = this.getBounds();

      var visible = this._checkVisibility(rect, parentFrame, direction);

      if (visible !== this.visible) {
        this.visible = visible;

        var response = this._toggleCallback();

        if (response instanceof Promise) {
          response.then(this._toggleClass.bind(this))["catch"](function (e) {
            console.error('Trigger promise failed');
            console.error(e);
          });
        } else {
          this._toggleClass();
        }

        if (this.visible && this.once) {
          this.active = false;
        }
      } else if (visible) {
        if (typeof this.toggle.callback.visible == 'function') {
          return this.toggle.callback.visible.call(this.element, this);
        }
      }

      return visible;
    }
    /**
     * Get the bounds of this element
     * @return {ClientRect | DOMRect}
     */

  }, {
    key: "getBounds",
    value: function getBounds() {
      return this.element.getBoundingClientRect();
    }
    /**
     * Get the calculated offset to place on the element
     * @param {ClientRect} rect
     * @param {string} direction top, bottom, left, right
     * @returns {{x: number, y: number}}
     * @private
     */

  }, {
    key: "_getElementOffset",
    value: function _getElementOffset(rect, direction) {
      var offset = {
        x: 0,
        y: 0
      };

      if (typeof this.offset.element.x === 'function') {
        offset.x = rect.width * this.offset.element.x(this, rect, direction);
      } else if (isFloat(this.offset.element.x)) {
        offset.x = rect.width * this.offset.element.x;
      } else if (isInt(this.offset.element.x)) {
        offset.x = this.offset.element.x;
      }

      if (typeof this.offset.element.y === 'function') {
        offset.y = rect.height * this.offset.element.y(this, rect, direction);
      } else if (isFloat(this.offset.element.y)) {
        offset.y = rect.height * this.offset.element.y;
      } else if (isInt(this.offset.element.y)) {
        offset.y = this.offset.element.y;
      }

      return offset;
    }
    /**
     * Get the calculated offset to place on the viewport
     * @param {{w: number, h: number}} parent
     * @param {string} direction top, bottom, left, right
     * @returns {{x: number, y: number}}
     * @private
     */

  }, {
    key: "_getViewportOffset",
    value: function _getViewportOffset(parent, direction) {
      var offset = {
        x: 0,
        y: 0
      };

      if (typeof this.offset.viewport.x === 'function') {
        offset.x = parent.w * this.offset.viewport.x(this, parent, direction);
      } else if (isFloat(this.offset.viewport.x)) {
        offset.x = parent.w * this.offset.viewport.x;
      } else if (isInt(this.offset.viewport.x)) {
        offset.x = this.offset.viewport.x;
      }

      if (typeof this.offset.viewport.y === 'function') {
        offset.y = parent.h * this.offset.viewport.y(this, parent, direction);
      } else if (isFloat(this.offset.viewport.y)) {
        offset.y = parent.h * this.offset.viewport.y;
      } else if (isInt(this.offset.viewport.y)) {
        offset.y = this.offset.viewport.y;
      }

      return offset;
    }
    /**
     * Check the visibility of the trigger in the viewport, with offsets applied
     * @param {ClientRect} rect
     * @param {{w: number, h: number}} parent
     * @param {string} direction top, bottom, left, right
     * @returns {boolean}
     * @private
     */

  }, {
    key: "_checkVisibility",
    value: function _checkVisibility(rect, parent, direction) {
      var elementOffset = this._getElementOffset(rect, direction);

      var viewportOffset = this._getViewportOffset(parent, direction);

      var visible = true;

      if (rect.left - viewportOffset.x < -(rect.width - elementOffset.x)) {
        visible = false;
      }

      if (rect.left + viewportOffset.x > parent.w - elementOffset.x) {
        visible = false;
      }

      if (rect.top - viewportOffset.y < -(rect.height - elementOffset.y)) {
        visible = false;
      }

      if (rect.top + viewportOffset.y > parent.h - elementOffset.y) {
        visible = false;
      }

      return visible;
    }
    /**
     * Toggles the classes
     * @private
     */

  }, {
    key: "_toggleClass",
    value: function _toggleClass() {
      var _this = this;

      if (this.visible) {
        if (Array.isArray(this.toggle["class"]["in"])) {
          this.toggle["class"]["in"].each(function (className) {
            _this.element.classList.add(className);
          });
        } else {
          this.element.classList.add(this.toggle["class"]["in"]);
        }

        if (Array.isArray(this.toggle["class"].out)) {
          this.toggle["class"].out.each(function (className) {
            _this.element.classList.remove(className);
          });
        } else {
          this.element.classList.remove(this.toggle["class"].out);
        }

        return;
      }

      if (Array.isArray(this.toggle["class"]["in"])) {
        this.toggle["class"]["in"].each(function (className) {
          _this.element.classList.remove(className);
        });
      } else {
        this.element.classList.remove(this.toggle["class"]["in"]);
      }

      if (Array.isArray(this.toggle["class"].out)) {
        this.toggle["class"].out.each(function (className) {
          _this.element.classList.add(className);
        });
      } else {
        this.element.classList.add(this.toggle["class"].out);
      }
    }
    /**
     * Toggles the callback
     * @private
     * @return null|Promise
     */

  }, {
    key: "_toggleCallback",
    value: function _toggleCallback() {
      if (this.visible) {
        if (typeof this.toggle.callback["in"] == 'function') {
          return this.toggle.callback["in"].call(this.element, this);
        }
      } else {
        if (typeof this.toggle.callback.out == 'function') {
          return this.toggle.callback.out.call(this.element, this);
        }
      }
    }
  }]);

  return Trigger;
}();



/***/ }),

/***/ "./src/scripts/TriggerCollection.js":
/*!******************************************!*\
  !*** ./src/scripts/TriggerCollection.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TriggerCollection; });
/* harmony import */ var _Trigger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Trigger */ "./src/scripts/Trigger.js");
/* harmony import */ var _extensions_Array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../extensions/Array */ "./src/extensions/Array.js");
/* harmony import */ var _extensions_Array__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_extensions_Array__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var TriggerCollection =
/*#__PURE__*/
function () {
  /**
   * Initializes the collection
   * @param {Trigger[]} [triggers=[]] triggers A set of triggers to init with, optional
   */
  function TriggerCollection(triggers) {
    _classCallCheck(this, TriggerCollection);

    /**
     * @member {Trigger[]}
     */
    this.triggers = triggers instanceof Array ? triggers : [];
  }
  /**
   * Adds one or multiple Trigger objects
   * @param {Trigger|Trigger[]} objects
   */


  _createClass(TriggerCollection, [{
    key: "add",
    value: function add(objects) {
      var _this = this;

      if (objects instanceof _Trigger__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        // single
        return this.triggers.push(objects);
      }

      objects.each(function (trigger) {
        if (trigger instanceof _Trigger__WEBPACK_IMPORTED_MODULE_0__["default"]) {
          _this.triggers.push(trigger);
        } else {
          console.error('Object added to TriggerCollection is not a Trigger. Object: ', trigger);
        }
      });
    }
    /**
     * Removes one or multiple Trigger objects
     * @param {Trigger|Trigger[]} objects
     */

  }, {
    key: "remove",
    value: function remove(objects) {
      if (objects instanceof _Trigger__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        objects = [objects];
      }

      this.triggers = this.triggers.filter(function (trigger) {
        var hit = false;
        objects.each(function (object) {
          if (object == trigger) {
            hit = true;
          }
        });
        return !hit;
      });
    }
    /**
     * Lookup one or multiple triggers by a query string
     * @param {string} selector
     * @returns {Trigger[]}
     */

  }, {
    key: "query",
    value: function query(selector) {
      return this.triggers.filter(function (trigger) {
        var element = trigger.element;
        var parent = element.parentNode;
        var nodes = [].slice.call(parent.querySelectorAll(selector));
        return nodes.indexOf(element) > -1;
      });
    }
    /**
     * Lookup one or multiple triggers by a certain HTMLElement or NodeList
     * @param {HTMLElement|HTMLElement[]|NodeList} element
     * @returns {Trigger|Trigger[]|null}
     */

  }, {
    key: "search",
    value: function search(element) {
      var found = this.triggers.filter(function (trigger) {
        if (element instanceof NodeList || Array.isArray(element)) {
          var hit = false;
          element.each(function (el) {
            if (trigger.element == el) {
              hit = true;
            }
          });
          return hit;
        }

        return trigger.element == element;
      });
      return found.length == 0 ? null : found.length > 1 ? found : found[0];
    }
    /**
     * Calls a function on all triggers
     * @param {(function())} callback
     */

  }, {
    key: "call",
    value: function call(callback) {
      this.triggers.each(callback);
    }
  }]);

  return TriggerCollection;
}();



/***/ })

/******/ });
});
//# sourceMappingURL=ScrollTrigger.js.map?d7c6bf4aa6d0bcb97658