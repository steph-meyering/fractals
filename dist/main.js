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

/***/ "./src/asteroid.js":
/*!*************************!*\
  !*** ./src/asteroid.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\n\nclass Asteroid extends _moving_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(props){\n        super(props);\n        this.color = \"red\";\n        this.radius = 30;\n        this.pos = props.pos;\n        this.vel = this.randomVec(10)\n    }\n    // Return a randomly oriented vector with the given length.\n    \n    randomVec(length) {\n        const deg = 2 * Math.PI * Math.random();\n        return this.scale([Math.sin(deg), Math.cos(deg)], length);\n    }\n\n    // Scale the length of a vector by the given amount.\n    scale(vec, m) {\n        return [vec[0] * m, vec[1] * m];\n    };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Asteroid);\n\n//# sourceURL=webpack:///./src/asteroid.js?");

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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/index.js\");\n/* harmony import */ var _asteroid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\n\n\n\nclass Game {\n    constructor(n){\n        this.asteroids = [];\n        this.addAsteroids(n)   \n    }\n    \n    addAsteroids(n){\n        for (let i = 0; i < n; i++) {\n            const pos = this.randomPosition();\n            const asteroid = new _asteroid__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({pos});\n            this.asteroids.push(asteroid);\n        }\n    }\n    \n    draw(ctx){\n        ctx.clearRect(0, 0, _index__WEBPACK_IMPORTED_MODULE_0__[\"WIDTH\"], _index__WEBPACK_IMPORTED_MODULE_0__[\"HEIGHT\"])\n        this.asteroids.forEach(a => a.draw(ctx))\n    }\n\n    moveObjects(){\n        this.asteroids.forEach(a => a.move())\n    }\n    // add(object){\n    //     if (object instanceof Asteroid){\n    //         this.asteroids.push(object)\n    //     } else {\n    //         throw new Error(\"unknow object type\")\n    //     }\n    // }\n\n    \n    \n    randomPosition() {\n        return [\n            Math.floor(_index__WEBPACK_IMPORTED_MODULE_0__[\"HEIGHT\"] * Math.random()),\n            Math.floor(_index__WEBPACK_IMPORTED_MODULE_0__[\"WIDTH\"] * Math.random())\n        ];\n    };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass GameView {\n    constructor(game, ctx){\n        this.game = game;\n        this.ctx = ctx;\n    }\n\n    start(){\n        setInterval(() => {\n            this.game.moveObjects();\n            this.game.draw(this.ctx)\n        },20)\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: HEIGHT, WIDTH */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HEIGHT\", function() { return HEIGHT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WIDTH\", function() { return WIDTH; });\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n/* harmony import */ var _asteroid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./asteroid */ \"./src/asteroid.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n/* harmony import */ var _rec_tree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rec_tree */ \"./src/rec_tree.js\");\n/* harmony import */ var _bfs_tree__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bfs_tree */ \"./src/bfs_tree.js\");\n\n\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    const canvasEl = document.getElementById(\"main-canvas\")\n    canvasEl.height = window.innerHeight;\n    canvasEl.width = window.innerWidth;\n\n    const c = canvasEl.getContext(\"2d\")\n    \n    let xstart = 0\n    let xmid = WIDTH / 2;\n    let xend = WIDTH;\n\n    let ystart = HEIGHT;\n    let ymid = HEIGHT / 2;\n    let yend = 0;\n    \n    const bt = new _bfs_tree__WEBPACK_IMPORTED_MODULE_5__[\"default\"](c, [xmid,ystart], 13, 20)\n    console.log(bt)\n\n    // const t = new RecTree(c)\n    // t.drawTree(xmid, ystart, -90, 5, 20)\n    \n    // const g = new Game(23)\n    // const gv = new GameView(g,c)\n    // gv.start()\n\n    // c.moveTo(xmid, ystart);\n    // c.lineTo(xmid, ymid);\n    // c.stroke()\n})\n\nconst HEIGHT = window.innerHeight;\nconst WIDTH = window.innerWidth ;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass MovingObject{\n    constructor(options){\n        this.pos = options.pos;\n        this.vel = options.vel;\n        this.radius = options.radius;\n        this.color = options.color;\n    }\n\n    draw(ctx) {\n        ctx.fillStyle = this.color;\n        ctx.beginPath();\n        ctx.arc(\n            this.pos[0],\n            this.pos[1],\n            this.radius,\n            0,\n            2 * Math.PI,\n            false\n        );\n        ctx.fill();\n    }\n\n    move(){\n        this.pos[0] += this.vel[0];\n        this.pos[1] += this.vel[1]\n    }\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MovingObject);\n\n\n//# sourceURL=webpack:///./src/moving_object.js?");

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