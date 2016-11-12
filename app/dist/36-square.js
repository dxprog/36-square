/******/ (function(modules) { // webpackBootstrap
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

	"use strict";
	var React = __webpack_require__(3);
	var ReactDOM = __webpack_require__(1);
	var canvas_1 = __webpack_require__(2);
	var body = document.getElementById('body');
	var canvas;
	function handleCanvasClicked(coords) {
	    console.log(coords.x, coords.y);
	    canvas.setPixel(coords.x, coords.y, 0xffffff);
	}
	ReactDOM.render(React.createElement(canvas_1.default, {ref: function (obj) { return canvas = obj; }, rows: 6, cols: 6, tileSize: 100, onClick: handleCanvasClicked}), body);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(3);
	function padNum(str, len) {
	    while (str.length < len) {
	        str = '0' + str;
	    }
	    return str;
	}
	var Canvas = (function (_super) {
	    __extends(Canvas, _super);
	    /*******************************
	     *  LIFECYCLE METHODS
	     ******************************/
	    function Canvas(props) {
	        _super.call(this, props);
	        this.pixelData = new Uint32Array(props.cols * props.rows);
	    }
	    Canvas.prototype.render = function () {
	        var width = this.props.cols * this.props.tileSize;
	        var height = this.props.rows * this.props.tileSize;
	        return React.createElement("canvas", {ref: "canvas", width: width, height: height, onClick: this.handleCanvasClick.bind(this)});
	    };
	    Canvas.prototype.componentDidMount = function () {
	        this.canvas = this.refs.canvas;
	        this.widthPerCol = this.canvas.width / this.props.cols;
	        this.heightPerRow = this.canvas.height / this.props.rows;
	        this.renderCanvas();
	    };
	    /*******************************
	     *  EVENT HANDLERS
	     ******************************/
	    Canvas.prototype.handleCanvasClick = function (evt) {
	        var onClick = this.props.onClick;
	        if (onClick) {
	            onClick({
	                x: Math.floor(evt.clientX / this.widthPerCol),
	                y: Math.floor(evt.clientY / this.heightPerRow)
	            });
	        }
	    };
	    /*******************************
	     *  PUBLIC METHODS
	     ******************************/
	    Canvas.prototype.setPixel = function (x, y, color) {
	        if (x >= this.props.cols || x < 0) {
	            throw new Error(x + " is outside of canvas bounds. Width is " + this.props.cols);
	        }
	        if (y >= this.props.rows || y < 0) {
	            throw new Error(y + " is outside of canvas bounds. Height is " + this.props.rows);
	        }
	        var index = y * this.props.cols + x;
	        this.pixelData[index] = color;
	        this.renderCanvas();
	    };
	    /*******************************
	     *  PRIVATE METHODS
	     ******************************/
	    Canvas.prototype.renderCanvas = function () {
	        var _this = this;
	        var ctx = this.canvas.getContext('2d');
	        var _a = this.canvas, width = _a.width, height = _a.height;
	        ctx.clearRect(0, 0, width, height);
	        this.pixelData.forEach(function (color, index) {
	            var x = (index % _this.props.cols) * _this.widthPerCol;
	            var y = Math.floor(index / _this.props.cols) * _this.heightPerRow;
	            ctx.fillStyle = "#" + padNum(color.toString(16), 6);
	            ctx.fillRect(x, y, _this.widthPerCol, _this.heightPerRow);
	        });
	    };
	    return Canvas;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Canvas;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = React;

/***/ }
/******/ ]);
//# sourceMappingURL=36-square.js.map