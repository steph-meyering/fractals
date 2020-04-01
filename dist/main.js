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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bfs_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bfs_tree */ \"./src/bfs_tree.js\");\n\n\nclass TreeControls{\n    constructor(ctx, configDiv){\n        // save context and get input slider elements + output div\n        this.ctx = ctx;\n        this.startPos = [innerWidth/2, innerHeight - 100]\n        this.branchAngleSlider = configDiv.querySelector(\"#branch-angle-input\");\n        this.depthSlider = configDiv.querySelector(\"#depth-input\");\n        this.output = configDiv.querySelector('#tree-params');\n        \n        // set event listeners on sliders so the params display in real-time\n        this.branchAngleSlider.addEventListener('input', () => this.update());\n        this.depthSlider.addEventListener('input', () => this.update());\n        \n    }\n\n    displayUserInput(depth, angle) {\n        this.output.innerHTML = `depth: ${depth} angle: ${angle}`\n    }\n\n    update(){\n        // get user input values\n        let angle = this.branchAngleSlider.valueAsNumber;\n        let depth = this.depthSlider.valueAsNumber;\n        this.displayUserInput(depth, angle);\n        this.calculate(depth, angle)\n        \n    }\n\n    calculate (depth = 9, angle = 20) {\n        this.ctx.clearRect(0 ,0 , innerWidth, innerHeight)\n        new _bfs_tree__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx, this.startPos, depth, angle)\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TreeControls);\n\n//# sourceURL=webpack:///./src/bfs_controls.js?");

/***/ }),

/***/ "./src/bfs_tree.js":
/*!*************************!*\
  !*** ./src/bfs_tree.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass BFSTree {\n    constructor(ctx, startPos, maxDepth, branchAngle){\n        this.branchAngle = branchAngle\n        this.rootAngle = -90;\n        this.ctx = ctx;\n        this.ctx.strokeStyle = \"red\"\n        this.maxDepth = maxDepth;\n        this.startPos = startPos;\n        this.root = new Node(this.calcNodePos(startPos, this.rootAngle, 0), this.rootAngle);\n        this.buildTree()\n        this.drawTree(20)\n    }\n\n    drawTree(lw){\n        // draw the first line\n        let x1 = this.startPos[0];\n        let y1 = this.startPos[1];\n        let x2 = this.root.pos[0];\n        let y2 = this.root.pos[1];\n\n        this.drawLine(x1,y1,x2,y2,lw);\n        let queue = [this.root];\n        while (queue.length > 0){\n            let l = queue.length;\n\n            // decrease lineWidth at each level\n            let nxtLw = lw/l;\n            for (let i = 0; i < l; i++) {\n                let parentNode =  queue.shift();\n                let [parentX, parentY] = parentNode.pos;\n                parentNode.children.forEach(child => {\n                    let [childX, childY] = child.pos;\n                    this.drawLine(parentX, parentY, childX, childY, nxtLw)\n                    if (child.children.length > 0) queue.push(child)\n                })\n            }\n        }\n    }\n\n    drawLine(x1, y1, x2, y2, lw) {\n        this.ctx.lineWidth = lw;\n        this.ctx.beginPath();\n        this.ctx.moveTo(x1, y1);\n        this.ctx.lineTo(x2, y2);\n        this.ctx.closePath();\n        this.ctx.stroke();\n    }\n    \n    buildTree(){\n        let depth = 1;\n        let queue = [this.root];\n        while (depth < this.maxDepth){\n            let l = queue.length;\n            for (let i = 0; i < l; i++) {\n                let node = queue.shift();\n                node.children = this.buildChildren(node.pos, node.angle, depth)\n                queue = queue.concat(node.children);\n            }\n            depth++\n        }\n    }\n\n    buildChildren(parentPos, parentAngle, depth){\n        let child1Angle = parentAngle - this.branchAngle;\n        let child1 = new Node(this.calcNodePos(parentPos, child1Angle, depth), child1Angle);\n        let child2Angle = parentAngle + this.branchAngle;\n        let child2 = new Node(this.calcNodePos(parentPos, child2Angle, depth), child2Angle);\n        return [child1, child2]\n    }\n\n    degreesToRadians(angle) {\n        return (angle * (Math.PI / 180));\n    }\n\n    calcNodePos(pos, angle, depth) {\n        // let newAngle = angle * depth -90;\n        let scale = ((this.maxDepth - depth) / this.maxDepth) * 100;\n        const x2 = pos[0] + (Math.cos(this.degreesToRadians(angle))) * scale;\n        const y2 = pos[1] + (Math.sin(this.degreesToRadians(angle))) * scale;\n        return [x2, y2];\n    }\n}\n\nclass Node {\n    constructor(pos, angle){\n        this.pos = pos;\n        this.angle = angle;\n        this.children = [];\n    }\n}\n\n// class Node {\n//     constructor(pos, angle) {\n//         this.pos = pos;\n//         this.angle = angle;\n//         this.children = [];\n//     }\n// }\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (BFSTree);\n\n//# sourceURL=webpack:///./src/bfs_tree.js?");

/***/ }),

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mandelbrot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mandelbrot */ \"./src/mandelbrot.js\");\n/* harmony import */ var _mandelbrot_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mandelbrot_controls */ \"./src/mandelbrot_controls.js\");\n/* harmony import */ var _bfs_controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bfs_controls */ \"./src/bfs_controls.js\");\n\n\n\n\nclass AppControls {\n    constructor(){\n        this.show = \"mandelbrot\";\n        this.displayingInfo = false;\n        const canvasEl = document.getElementById(\"main-canvas\");\n        canvasEl.height = window.innerHeight;\n        canvasEl.width = window.innerWidth;\n        this.ctx = canvasEl.getContext(\"2d\"); \n        this.configDiv = document.getElementById('tree-config');\n        this.mandel = new _mandelbrot__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.ctx);\n        this.mandelcontrols = new _mandelbrot_controls__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.mandel);\n        const toggle = document.getElementById('toggle');\n        const infoButton = document.getElementById(\"info-button\");\n        infoButton.addEventListener('click', () => this.toggleInstructions())\n        const closeInstructionsButton = document.getElementById(\"hide-instructions\");\n        closeInstructionsButton.addEventListener('click', () => this.toggleInstructions())\n\n        \n        toggle.addEventListener('click', () => {\n            switch (this.show) {\n                case \"mandelbrot\":\n                    toggle.innerHTML = `Switch to mandelbrot`;\n                    this.show = \"tree\";\n                    break;\n                case \"tree\":\n                    toggle.innerHTML = `Switch to tree`\n                    this.show = \"mandelbrot\";\n                    break;\n                default:\n                    break;\n            }\n            this.display();\n        })\n        this.display()\n    }\n\n    toggleInstructions(){\n        const instructions = document.getElementById(\"instructions\")\n        const selectRect = document.getElementById(\"selection-rectangle\");\n        if (this.displayingInfo){\n            this.displayingInfo = false;\n            instructions.className = 'hidden';\n            if (this.show === \"mandelbrot\"){\n                selectRect.className = 'revealed';\n            }\n        } else {\n            this.displayingInfo = true;\n            instructions.className = 'instructions';\n            selectRect.className = 'hidden';\n        }\n    }\n    \n    display(){\n        const selectRect = document.getElementById(\"selection-rectangle\");\n        const resetButton = document.getElementById(\"reset\");\n        const treeConfig = document.getElementById('tree-config');\n        this.ctx.clearRect(0, 0, innerWidth, innerHeight);\n\n        switch (this.show) {\n            case \"mandelbrot\":\n                treeConfig.className = 'hidden';\n                selectRect.className = 'revealed';\n                resetButton.className = 'revealed';\n                this.mandel.iterateOverAll();\n                break;\n            case \"tree\":\n                treeConfig.className = 'revealed';\n                selectRect.className = 'hidden';\n                resetButton.className = 'hidden';\n                let input = new _bfs_controls__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.ctx, this.configDiv)\n                input.calculate();\n                break;\n            default:\n                break;\n        }\n    }\n\n    info(){\n\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (AppControls);\n\n\n//# sourceURL=webpack:///./src/display.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rec_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rec_tree */ \"./src/rec_tree.js\");\n/* harmony import */ var _bfs_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bfs_tree */ \"./src/bfs_tree.js\");\n/* harmony import */ var _bfs_controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bfs_controls */ \"./src/bfs_controls.js\");\n/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./display */ \"./src/display.js\");\n/* harmony import */ var _mandelbrot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mandelbrot */ \"./src/mandelbrot.js\");\n/* harmony import */ var _mandelbrot_controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mandelbrot_controls */ \"./src/mandelbrot_controls.js\");\n\n\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    // const canvasEl = document.getElementById(\"main-canvas\")\n    // const ctx = canvasEl.getContext(\"2d\");\n    // canvasEl.height = window.innerHeight;\n    // canvasEl.width = window.innerWidth;\n    // let display = 'tree';\n\n    // // Mandelbrot Test\n    // let configDiv = document.getElementById('tree-config');\n    // let mandel = new Mandelbrot(ctx);\n    // let mandelcontrols = new MandelbrotControls(mandel);\n\n\n    let appControls = new _display__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n    // let input = new TreeControls(ctx, configDiv)\n\n\n})\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/mandelbrot.js":
/*!***************************!*\
  !*** ./src/mandelbrot.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mandelbrot_progress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mandelbrot_progress */ \"./src/mandelbrot_progress.js\");\n\n\nclass Mandelbrot {\n    constructor(ctx){\n        this.ctx = ctx;\n        this.progressBar = new _mandelbrot_progress__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n        this.init();\n    }\n\n    init(){\n        this.depth = 350;\n        this.imin = -2;\n        this.imax = 0.5;\n        this.jmin = -1;\n        this.jmax = 1;\n    }\n\n    reset() {\n        this.init();\n        this.iterateOverAll();\n    }\n\n    update(x0, y0, x1, y1){\n        let xmin = Math.min(x0, x1);\n        let ymin = Math.max(y0, y1);\n        let xmax = Math.max(x0, x1);\n        let ymax = Math.min(y0, y1);\n        let di = this.imax - this.imin;\n        let dj = this.jmax - this.jmin;\n        let min_dim = Math.min(innerWidth, innerHeight);\n        let step = Math.min(di, dj) / min_dim;\n        this.imax = this.imin + xmax * step;\n        this.jmax = this.jmin + (innerHeight - ymax) * step;\n        this.imin = this.imin + xmin * step;\n        this.jmin = this.jmin + (innerHeight - ymin) * step;\n        this.iterateOverAll()\n    }\n    \n    iterateOverAll(){\n        console.time('iterate')\n        let nextCanvas = document.createElement(\"canvas\");\n        nextCanvas.width = innerWidth;\n        nextCanvas.height = innerHeight;\n        let nextContext = nextCanvas.getContext('2d');\n        let di = this.imax - this.imin;\n        let dj = this.jmax - this.jmin;\n        let min_dim = Math.min(innerWidth, innerHeight);\n        let step = Math.min(di, dj) / min_dim;\n\n        // run more iterations to get better resolution at deeper levels\n        switch (true) {\n            case (Math.min(di, dj) > 10**-2):\n                this.depth = 500\n                break;\n            case (Math.min(di, dj) > 10 ** -3):\n                this.depth = 1000;\n                break;\n            case (Math.min(di, dj) > 10 ** -4):\n                this.depth = 2000;\n                break;\n            case (Math.min(di, dj) > 10 ** -6):\n                this.depth = 3500;\n                break;\n            case (Math.min(di, dj) > 10 ** -7):\n                this.depth = 5000;\n                break;\n            default:\n                break;\n            }\n\n        // timeout allows to dynamically render the canvas progress bar while\n        // computing next frame;\n        setTimeout(() => {\n            this.progressBar.show();\n        }, 0)\n        for (let x = 0; x < innerWidth; x++) {\n            setTimeout(() => {\n                this.progressBar.draw(x/innerWidth);\n                for (let y = 0; y < innerHeight; y++) {\n                    let cx = this.imin + x * step;\n                    let cy = this.jmin + (innerHeight - y) * step \n                    const color = this.calcDepth(cx, cy);\n                    this.colorPixel(nextContext, x, y, color);\n                }\n            }, 0)\n        }\n\n        // Display the set and hide progress bar when done computing\n        setTimeout(() => {\n            this.ctx.drawImage(nextCanvas, 0, 0)\n            this.progressBar.hide();\n            console.timeEnd('iterate')\n        }, 0)\n    }\n\n    // Convert the number of iterations it took to find a single pixel's color\n    // into a percentage of total iterations.\n    calcDepth(x0, y0){\n        let x = x0;\n        let y = y0;\n        for (let i = 0; i < this.depth; i++) {\n            const x1 = x**2 - y**2 + x0;\n            const y1 = 2.0 * x * y + y0;\n            x = x1;\n            y = y1;\n            if (x * y > 4) {\n                return (i / this.depth * 100);\n            }\n        }\n        return 0;\n    }\n\n    // Draw pixel on canvas `ctx` at [`x`, `y`] coordinates\n    // `color` represents lightness percentage \n    colorPixel(ctx, x, y, color){\n        ctx.fillStyle = `hsl(0, 100%, ${color}%)`;\n        ctx.fillRect(x, y, 1, 1);\n    }\n\n\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Mandelbrot);\n\n//# sourceURL=webpack:///./src/mandelbrot.js?");

/***/ }),

/***/ "./src/mandelbrot_controls.js":
/*!************************************!*\
  !*** ./src/mandelbrot_controls.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass MandelbrotControls {\n    constructor(mandel){\n        this.mandel = mandel;\n        const selectRect = document.getElementById(\"selection-rectangle\");\n        selectRect.height = window.innerHeight;\n        selectRect.width = window.innerWidth;\n        this.canvas = selectRect.getContext(\"2d\");\n        this.canvas.strokeStyle = \"white\";\n        this.canvas.lineWidth = 2;\n        this.selectRect = selectRect\n        this.selectRect.addEventListener('mousedown', (e) => this.selectStart(e));\n        this.selectRect.addEventListener('mousemove', (e) => this.selectMove(e));\n        this.selectRect.addEventListener('mouseup', (e) => this.selectEnd(e));\n        this.selectionReset();\n\n        const resetButton = document.getElementById(\"reset\");\n        resetButton.addEventListener('click',() => this.mandel.reset())\n    }\n\n    selectStart(e) {\n        this.active = true;\n        this.x1 = e.offsetX;\n        this.y1 = e.offsetY;\n    }\n\n    selectRender(){\n        if (this.active){\n            let left = Math.min(this.x1, this.x2);\n            let top = Math.min(this.y1, this.y2);\n            let width = Math.abs(this.x2 - this.x1);\n            let height = Math.abs(this.y2 - this.y1);\n            this.canvas.strokeStyle = this.validSelection() ? \"white\" : \"#adadad\"\n            this.canvas.clearRect(0,0,innerWidth, innerHeight)\n            this.canvas.strokeRect(left, top, width, height)\n\n        }\n    }\n\n    selectMove(e) {\n        if (this.active){\n            this.x2 = e.offsetX;\n            this.y2 = e.offsetY;\n            this.selectRender();\n        }\n    }\n\n    selectEnd(e) {\n        this.x2 = e.offsetX;\n        this.y2 = e.offsetY;\n        if(this.validSelection()){\n            this.mandel.update(this.x1, this.y1, this.x2, this.y2);\n        }\n        this.selectionReset();\n    }\n    // clear the selection rectangle coordinates\n    selectionReset(){\n        this.active = false;\n        this.canvas.clearRect(0, 0, innerWidth, innerHeight);\n        this.x1 = null;\n        this.y1 = null;\n        this.x2 = null;\n        this.y2 = null;\n    }\n\n    // enforce that selection area is at least 20x20px, and rules out accidental clicks\n    validSelection(){\n        let width = Math.abs(this.x2 - this.x1);\n        let height = Math.abs(this.y2 - this.y1);\n        return (width >= 20 && height >= 20) ? true : false;\n    }\n    // animateRect(){\n    //     console.log(\"animating rectangle\")\n    //     let left = Math.min(this.x1, this.x2);\n    //     let top = Math.min(this.y1, this.y2);\n    //     let width = Math.abs(this.x2 - this.x1);\n    //     let height = Math.abs(this.y2 - this.y1);\n    //     const centerx = width/2 + left;\n    //     const centery = height/2 + top;\n    //     const radius = Math.sqrt((centerx - left)**2 + (centery - top) ** 2);\n    //     let angle = 0;\n    //     const drawGradient = () => {\n    //         this.canvas.clearRect(0, 0, innerWidth, innerHeight);\n    //         if (this.active){\n    //             console.log(\"updating gradients\")\n    //             let offsetx = radius * Math.cos(Math.PI * angle / 180);\n    //             let offsety = radius * Math.sin(Math.PI * angle / 180);\n    //             let gradient = this.canvas\n    //                 .createLinearGradient(\n    //                     centerx - offsetx, \n    //                     centery - offsety, \n    //                     centerx + offsetx, \n    //                     centery + offsety\n    //                 );\n    //             gradient.addColorStop(\"0\", \"magenta\");\n    //             gradient.addColorStop(\"0.5\", \"blue\");\n    //             gradient.addColorStop(\"1.0\", \"red\");\n    //             this.canvas.strokeStyle = gradient;\n    //             this.canvas.strokeRect(left, top, width, height)\n    //             angle ++\n    //             drawGradient();\n    //         } else{\n    //             console.log(\"stopping annimation\")\n    //         }\n    //     }\n    //     drawGradient();\n\n    // }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MandelbrotControls);\n\n//# sourceURL=webpack:///./src/mandelbrot_controls.js?");

/***/ }),

/***/ "./src/mandelbrot_progress.js":
/*!************************************!*\
  !*** ./src/mandelbrot_progress.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass ProgressBar{\n    constructor(){\n        let element = document.getElementById(\"progress-bar\");\n        element.width = innerWidth;\n        element.height = 5;\n        this.ctx = element.getContext(\"2d\");\n        this.ctx.globalAlpha = 0\n    }\n\n    draw(percentage){\n        this.ctx.fillStyle = \"red\";\n        this.ctx.fillRect(0,0, percentage * innerWidth, 30);\n    }\n    \n    show() {\n        this.ctx.globalAlpha = 1;\n        //show it\n    }\n    \n    hide() {\n        this.ctx.globalAlpha = 0;\n        this.ctx.clearRect(0,0, innerWidth, 30)\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProgressBar);\n\n//# sourceURL=webpack:///./src/mandelbrot_progress.js?");

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