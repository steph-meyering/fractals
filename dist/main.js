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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bfs_controls.js":
/*!*****************************!*\
  !*** ./src/bfs_controls.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bfs_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bfs_tree */ \"./src/bfs_tree.js\");\n\n\nclass BFSInput{\n    constructor(ctx, configDiv){\n        // save context and get input slider elements + output div\n        this.ctx = ctx;\n        this.startPos = [innerWidth/2, innerHeight - 100]\n        this.branchAngleSlider = configDiv.querySelector(\"#branch-angle-input\");\n        this.depthSlider = configDiv.querySelector(\"#depth-input\");\n        this.output = configDiv.querySelector('#tree-params');\n        \n        // set event listeners on sliders so the params display in real-time\n        this.branchAngleSlider.addEventListener('input', () => this.update());\n        this.depthSlider.addEventListener('input', () => this.update());\n    }\n\n    displayUserInput(depth, angle) {\n        this.output.innerHTML = `depth: ${depth} angle: ${angle} start position coordinates: ${this.startPos}`\n    }\n\n    update(){\n        // get user input values\n        let angle = this.branchAngleSlider.valueAsNumber;\n        let depth = this.depthSlider.valueAsNumber;\n        this.displayUserInput(depth, angle);\n        this.calculate(depth, angle)\n        \n    }\n\n    calculate (depth, angle) {\n        this.ctx.clearRect(0 ,0 , innerWidth, innerHeight)\n        new _bfs_tree__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx, this.startPos, depth, angle)\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (BFSInput);\n\n//# sourceURL=webpack:///./src/bfs_controls.js?");

/***/ }),

/***/ "./src/bfs_tree.js":
/*!*************************!*\
  !*** ./src/bfs_tree.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass BFSTree {\n    constructor(ctx, startPos, maxDepth, branchAngle){\n        this.branchAngle = branchAngle\n        this.rootAngle = -90;\n        this.ctx = ctx;\n        this.maxDepth = maxDepth;\n        this.startPos = startPos;\n        this.root = new Node(this.calcNodePos(startPos, this.rootAngle, 0), this.rootAngle);\n        this.buildTree()\n        this.drawTree(20)\n    }\n\n    drawTree(lw){\n        // draw the first line\n        let x1 = this.startPos[0];\n        let y1 = this.startPos[1];\n        let x2 = this.root.pos[0];\n        let y2 = this.root.pos[1];\n\n        this.drawLine(x1,y1,x2,y2,lw);\n        let queue = [this.root];\n        while (queue.length > 0){\n            let l = queue.length;\n\n            // decrease lineWidth at each level\n            let nxtLw = lw/l;\n            for (let i = 0; i < l; i++) {\n                let parentNode =  queue.shift();\n                let [parentX, parentY] = parentNode.pos;\n                parentNode.children.forEach(child => {\n                    let [childX, childY] = child.pos;\n                    this.drawLine(parentX, parentY, childX, childY, nxtLw)\n                    if (child.children.length > 0) queue.push(child)\n                })\n            }\n        }\n    }\n\n    drawLine(x1, y1, x2, y2, lw) {\n        this.ctx.lineWidth = lw;\n        this.ctx.beginPath();\n        this.ctx.moveTo(x1, y1);\n        this.ctx.lineTo(x2, y2);\n        this.ctx.closePath();\n        this.ctx.stroke();\n    }\n    \n    buildTree(){\n        let depth = 1;\n        let queue = [this.root];\n        while (depth < this.maxDepth){\n            let l = queue.length;\n            for (let i = 0; i < l; i++) {\n                let node = queue.shift();\n                node.children = this.buildChildren(node.pos, node.angle, depth)\n                queue = queue.concat(node.children);\n            }\n            depth++\n        }\n    }\n\n    buildChildren(parentPos, parentAngle, depth){\n        let child1Angle = parentAngle - this.branchAngle;\n        let child1 = new Node(this.calcNodePos(parentPos, child1Angle, depth), child1Angle);\n        let child2Angle = parentAngle + this.branchAngle;\n        let child2 = new Node(this.calcNodePos(parentPos, child2Angle, depth), child2Angle);\n        return [child1, child2]\n    }\n\n    degreesToRadians(angle) {\n        return (angle * (Math.PI / 180));\n    }\n\n    calcNodePos(pos, angle, depth) {\n        // let newAngle = angle * depth -90;\n        let scale = ((this.maxDepth - depth) / this.maxDepth) * 100;\n        const x2 = pos[0] + (Math.cos(this.degreesToRadians(angle))) * scale;\n        const y2 = pos[1] + (Math.sin(this.degreesToRadians(angle))) * scale;\n        return [x2, y2];\n    }\n}\n\nclass Node {\n    constructor(pos, angle){\n        this.pos = pos;\n        this.angle = angle;\n        this.children = [];\n    }\n}\n\n// class Node {\n//     constructor(pos, angle) {\n//         this.pos = pos;\n//         this.angle = angle;\n//         this.children = [];\n//     }\n// }\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (BFSTree);\n\n//# sourceURL=webpack:///./src/bfs_tree.js?");

/***/ }),

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/*! exports provided: displayTreeParams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"displayTreeParams\", function() { return displayTreeParams; });\nconst displayTreeParams = () => {\n    const treeConfig = document.getElementById('tree-config');\n    const canvasEl = document.getElementById(\"main-canvas\");\n    const ctx = canvasEl.getContext(\"2d\");\n    const toggle = document.getElementById(\"toggle\");\n    switch (treeConfig.className) {\n        case \"revealed\":\n            ctx.clearRect(0, 0, innerWidth, innerHeight)\n            treeConfig.className = 'hidden';\n            toggle.innerHTML = \"Switch to Tree\"\n            break\n        case \"hidden\":\n            treeConfig.className = 'revealed';\n            toggle.innerHTML = \"Switch to Mandelbrot\";\n            break;\n        default:\n            console.log(treeConfig.className);\n    }\n}\n\n\n//# sourceURL=webpack:///./src/display.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rec_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rec_tree */ \"./src/rec_tree.js\");\n/* harmony import */ var _bfs_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bfs_tree */ \"./src/bfs_tree.js\");\n/* harmony import */ var _bfs_controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bfs_controls */ \"./src/bfs_controls.js\");\n/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./display */ \"./src/display.js\");\n/* harmony import */ var _mandelbrot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mandelbrot */ \"./src/mandelbrot.js\");\n/* harmony import */ var _mandelbrot_controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mandelbrot_controls */ \"./src/mandelbrot_controls.js\");\n\n\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const canvasEl = document.getElementById(\"main-canvas\")\n    const ctx = canvasEl.getContext(\"2d\");\n    canvasEl.height = window.innerHeight;\n    canvasEl.width = window.innerWidth;\n    let display = 'tree';\n\n    // Mandelbrot Test\n    let configDiv = document.getElementById('tree-config');\n    let mandel = new _mandelbrot__WEBPACK_IMPORTED_MODULE_4__[\"default\"](ctx);\n    mandel.iterateOverAll(-2, -0.8, 350);\n    let mandelcontrols = new _mandelbrot_controls__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\n\n\n    // canvasEl.addEventListener('click', (e) => console.log(e))\n\n    let input = new _bfs_controls__WEBPACK_IMPORTED_MODULE_2__[\"default\"](ctx, configDiv)\n\n    let toggle = document.getElementById('toggle')\n    toggle.addEventListener('click', () => Object(_display__WEBPACK_IMPORTED_MODULE_3__[\"displayTreeParams\"])())\n    \n})\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/mandelbrot.js":
/*!***************************!*\
  !*** ./src/mandelbrot.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Mandelbrot {\n    constructor(ctx){\n        this.ctx = ctx;\n        this.depth = 100;\n    }\n\n    iterateOverAll(cx, cy, zoom){\n        let count100 = 0;\n        let count50 = 0;\n        let count200 = 0;\n        for (let x = innerWidth - 1; x >= 0; x--) {\n            for (let y = 0; y < innerHeight; y++) {\n                const color = this.calcDepth(x/zoom + cx , y/zoom + cy);\n                switch (true) {\n                    case (color<50):\n                        count50++;\n                        break;\n                    case (50 <= color < 100):\n                        count100++;\n                        break;\n                    case (color >= 100):\n                        count200++;\n                        break;\n                    default:\n                        break;\n                }\n                this.colorPixel(x, y, color)\n            }\n        }\n        console.log(\"count50: \" + count50, \"count50-100: \" + count100, \"count200+: \" + count200 )\n    }\n\n    calcDepth(x0, y0){\n        let x = x0;\n        let y = y0;\n        for (let i = 0; i < this.depth; i++) {\n            const x1 = x**2 - y**2 + x0;\n            const y1 = 2.0 * x * y + y0;\n            x = x1;\n            y = y1;\n            if (x * y > 4) {\n                return (i / this.depth * 100);\n            }\n        }\n        return 0;\n    }\n\n    colorPixel(x, y, color){\n        if (color === 0) {\n            this.ctx.fillStyle = '#000'\n            this.ctx.fillRect(x, y, 1, 1)\n        } else {\n            this.ctx.fillStyle = `hsl(250, 100%, ${color}%)`\n            this.ctx.fillRect(x, y, 1 ,1)\n        }\n    }\n\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Mandelbrot);\n\n//# sourceURL=webpack:///./src/mandelbrot.js?");

/***/ }),

/***/ "./src/mandelbrot_controls.js":
/*!************************************!*\
  !*** ./src/mandelbrot_controls.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass MandelbrotControls {\n    constructor(){\n        const selectRect = document.getElementById(\"selection-rectangle\");\n        selectRect.height = window.innerHeight;\n        selectRect.width = window.innerWidth;\n        this.canvas = selectRect.getContext(\"2d\");\n        this.canvas.strokeStyle = \"white\"\n        this.selectRect = selectRect\n        this.selectRect.addEventListener('mousedown', (e) => this.selectStart(e));\n        this.selectRect.addEventListener('mousemove', (e) => this.selectMove(e));\n        this.selectRect.addEventListener('mouseup', (e) => this.selectEnd(e));\n        this.selectionReset();\n    }\n\n    selectStart(e) {\n        this.active = true;\n        this.x1 = e.offsetX;\n        this.y1 = e.offsetY;\n    }\n\n    selectRender(){\n        if (this.active){\n            let left = Math.min(this.x1, this.x2);\n            let top = Math.min(this.y1, this.y2);\n            let width = Math.abs(this.x2 - this.x1);\n            let height = Math.abs(this.y2 - this.y1);\n            this.canvas.clearRect(0,0,innerWidth, innerHeight)\n            this.canvas.strokeRect(left, top, width, height)\n\n        }\n    }\n\n    selectMove(e) {\n        if (this.active){\n            this.x2 = e.offsetX;\n            this.y2 = e.offsetY;\n            this.selectRender();\n        }\n    }\n\n    selectEnd(e) {\n        this.x2 = e.offsetX;\n        this.y2 = e.offsetY;\n        console.log(this);\n        this.selectionReset();\n    }\n    \n    selectionReset(){\n        this.x1 = null;\n        this.y1 = null;\n        this.x2 = null;\n        this.y2 = null;\n        this.active = false;\n        this.canvas.clearRect(0, 0, innerWidth, innerHeight);\n    }\n    \n    getCurrentPos(e){\n\n    }\n\n    convertCoordinates(x, y) {\n\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MandelbrotControls);\n\n//# sourceURL=webpack:///./src/mandelbrot_controls.js?");

/***/ }),

/***/ "./src/rec_tree.js":
/*!*************************!*\
  !*** ./src/rec_tree.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass RecTree {\n    constructor(ctx){\n        this.ctx = ctx\n    }\n    \n    \n    drawLine(x1, y1, x2, y2, lw){\n        this.ctx.lineWidth = lw;\n        this.ctx.beginPath();\n        this.ctx.moveTo(x1, y1);\n        this.ctx.lineTo(x2, y2);\n        this.ctx.closePath()\n        this.ctx.stroke();\n        console.log(\"drawing line:\" + x2 + \" \" + y2)\n    }\n\n    degreesToRadians(angle){\n        return (angle * (Math.PI /180))\n    }\n\n    drawTree(x1, y1, angle, depth, lw){\n        if (depth > 0){\n            const x2 = x1 + (Math.cos(this.degreesToRadians(angle))) * depth * 10.0;\n            const y2 = y1 + (Math.sin(this.degreesToRadians(angle))) * depth * 10.0;\n            this.drawLine(x1, y1, x2, y2, lw);\n            this.drawTree(x2, y2, angle - 40, depth - 1, lw/2);\n            this.drawTree(x2, y2, angle + 40, depth - 1, lw/2);\n            console.log('branch drawn depth: ' + depth)\n        } \n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (RecTree);\n\n//# sourceURL=webpack:///./src/rec_tree.js?");

/***/ })

/******/ });