/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/gameboardUI.js":
/*!***************************************!*\
  !*** ./src/components/gameboardUI.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function createBoardComponent(parentContainer) {

    function createYHeader() {
        const yHeader = document.createElement('div')
        yHeader.classList.add('boardYHeader')
        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        for (let y = 0; y <= 9; y++) {
            const box = document.createElement('div')
            box.classList.add('boxHeader')
            box.innerText = letters[y] 
            yHeader.append(box)
        }
        return yHeader
    }

    function createXHeader() {
        const xHeader = document.createElement('div')
        xHeader.classList.add('boardXHeader')

        for (let x = 0; x <= 9; x++) {
            const box = document.createElement('div')
            box.classList.add('boxHeader')
            box.innerText = x + 1 // offset for zero indexing
            xHeader.append(box)
        }
        return xHeader
    }

    // create top-level containers
    const childContainer = document.createElement('div')
    childContainer.classList.add('boardContainer')

    const board = document.createElement('div')
    board.classList.add('boardGrid')

    // create board grids
    for (let x = 0; x <= 9; x++) {
        const row = document.createElement('div')
        row.classList.add('row')
        for (let y = 0; y <= 9; y++) {
            const box = document.createElement('div')
            box.classList.add('box')
            box.dataset.x = x
            box.dataset.y = y
            row.append(box)
        }
        board.append(row)
    }


    // append to containers
    childContainer.append(createXHeader(), createYHeader(), board)
    parentContainer.append(childContainer)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createBoardComponent);

/***/ }),

/***/ "./src/eventListeners.js":
/*!*******************************!*\
  !*** ./src/eventListeners.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   allowRotate: () => (/* binding */ allowRotate),
/* harmony export */   applyDragDrop: () => (/* binding */ applyDragDrop)
/* harmony export */ });
// DRAG N DROP
function applyDragDrop(board) {

    function dragStartHandler(event) {
        console.log("dragging", event.target.id, "...")
        event.dataTransfer.setData("text", `${event.target.id},${event.target.dataset.length}`)
    }

    function dragOverHandler(event) {
        event.preventDefault()
    }

    function dropHandler(event) {
        function populateNextBox(boxElement, repeat) {
            if (repeat === 0) return;
            
            boxElement.classList.add(shipName, "dropped")
            board.positionShips(boxElement.dataset.x, boxElement.dataset.y, shipName)
            repeat --
            populateNextBox(boxElement.nextSibling, repeat)
        }

        function removeFromShipyard(shipName) {
            const ship = document.querySelector(`#${shipName}`)
            ship.classList.remove("rotatable")
            ship.style.display = 'none'
        }

        // controller
        event.preventDefault()
        let [shipName, shipLength] = event.dataTransfer.getData("text").split(',')

        // allow the drop if empty box & ship is within board boundaries
        if (!isOccupiedBox(event)) {
            const yIndex = Number(event.target.dataset.y)
            shipLength = Number(shipLength)

            if (yIndex + (shipLength - 1) <= 9) {
                event.target.classList.add(shipName, "dropped")

                populateNextBox(event.target, shipLength)
                event.target.classList.remove("hovered")
                removeFromShipyard(shipName)
            }
        }
        console.log(board.getBoard())
    }

    function isOccupiedBox(event) {
        return event.target.classList.contains("dropped")
    }

    function dragLeaveHandler(event) {
        event.target.classList.remove("hovered")
    }

    function dragEnterHandler(event) {
        if (!isOccupiedBox(event)) {
            event.target.classList.add("hovered")
        }
    }

    // Identify draggable ships
    const ships = document.querySelectorAll('.ship') 
    const boxes = document.querySelectorAll('.box')


    ships.forEach(ship => {
        ship.addEventListener("dragstart", event => dragStartHandler(event))
        // ship.addEventListener("drag", event => draggingHandler(event))
        // ship.addEventListener("dragend", event => dragEndHandler(event))
    })

    boxes.forEach(box => {
        box.addEventListener("dragenter", event => dragEnterHandler(event))
        box.addEventListener("dragover", event => dragOverHandler(event))
        box.addEventListener("dragleave", event => dragLeaveHandler(event))
        box.addEventListener("drop", event => dropHandler(event))
    })

}

function allowRotate() {
    const rotatableShips = document.querySelectorAll('.rotatable')

    rotatableShips.forEach(ship => {
        ship.addEventListener("mouseover", () => {
            ship.addEventListener("wheel", event => rotateShip(event))
        })
    })


    function rotateShip(event) {

        function getShipSize() {
            // should replace this with player gameboard ship object!!!!!!!!
            switch (event.target.id) {
                case "carrier":
                    return 5
                case "battleship":
                    return 4
                case "cruiser": 
                    return 3
                case "submarine":
                    return 3
                case "destroyer":
                    return 2
            }
        }

        const size = getShipSize()

        if (event.target.classList.contains("rotated")) {
            event.target.style.width = `calc(var(--shipBoxSize) * ${size})`
            event.target.style.height = "var(--shipBoxSize)"

        } else {
            event.target.style.width = "var(--shipBoxSize)"
            event.target.style.height = `calc(var(--shipBoxSize) * ${size})`
            event.target.classList.remove("rotated")
        }
    }
}




/***/ }),

/***/ "./src/factories/botFactory.js":
/*!*************************************!*\
  !*** ./src/factories/botFactory.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardFactory */ "./src/factories/gameboardFactory.js");


class Bot {
    #successfulAttack;
    #previousAttack;
    #possibleSmartMoves;

    constructor() {
        this.board = this.#createBoard()
        this.#previousAttack = null
        this.#successfulAttack = false
        this.#possibleSmartMoves = [[0, 1], [0, -1], [-1, 0], [1, 0]]
    }

    #createBoard() {
        const newBoard = new _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__["default"]
        return newBoard
    }
    
    getCoordinates(enemyGameboard) {
        // pick a random spot within the board
        // should be a unique coordinate every time
        // if previous coordinate was a hit, choose an adjacent coordinate
        // improvement -- generate next coordinate based on available empty slots instead of random x/y coords
        
        function getRandomNum(min, max) {
            const num = Math.random() * (max - min) + min;
            return Math.floor(num)
        }

        function isEmptyPosition(x, y, enemyBoard) {
            return enemyBoard[x][y] === null
        }


        if (this.#successfulAttack) {
            if (this.#possibleSmartMoves.length > 0) {
                const positionOffset = this.#possibleSmartMoves.pop()
                let xCoord = this.#previousAttack[0] + positionOffset[0]
                let yCoord = this.#previousAttack[1] + positionOffset[1]

                return [xCoord, yCoord]
            }
        }

        let xCoord = getRandomNum(0, 9)
        let yCoord = getRandomNum(0, 9)

        while (!isEmptyPosition(xCoord, yCoord, enemyGameboard.getBoard())) {
            xCoord = getRandomNum(0, 9)
            yCoord = getRandomNum(0, 9)
        }
        
        return [xCoord, yCoord]
    }


    attackEnemy(coordinatesArr, enemyBoard) {
        const [x, y] = [...coordinatesArr] 
        const attackFeedback = enemyBoard.receiveAttack(x, y)
        if (attackFeedback === "It's a hit!") {
            this.#storePreviousAttack(coordinatesArr, true)
        } else {
            this.#storePreviousAttack(coordinatesArr, false)
        }
        return attackFeedback
    }

    viewBoard() {
        return this.board.getBoard()
    }

    #storePreviousAttack(coordinatesArr, enemyWasHit) {
        this.#previousAttack = coordinatesArr
        this.#successfulAttack = enemyWasHit
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bot);

/***/ }),

/***/ "./src/factories/gameboardFactory.js":
/*!*******************************************!*\
  !*** ./src/factories/gameboardFactory.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ "./src/factories/shipFactory.js");


class Gameboard {
    constructor() {
        this.carrier = this.#createShip('carrier', 5)
        this.battleship = this.#createShip('battleship', 4)
        this.cruiser = this.#createShip('cruiser', 3)
        this.submarine = this.#createShip('submarine', 3)
        this.destroyer = this.#createShip('destroyer', 2)
        // this.board = this.#positionShips(this.#createBoard())
        this.board = this.#createBoard()
        this.missedAttacks = []
        this.successfulAttacks = []
    }

    #createBoard() {
        let board = []
        for (let i = 0 ; i <= 9 ; i++) {
            let row = []
            for (let i = 0 ; i <= 9 ; i++) {
                row.push(null)
            }
            board.push(row)
        }
        return board
    }
    

    #createShip(name, length) {
        const ship = new _shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"](name, length)
        return ship
    }

    #getAllShips() {
        const ships = [
            this.carrier, 
            this.battleship, 
            this.cruiser, 
            this.submarine, 
            this.destroyer
        ]
        return ships
    }

    positionShips(x, y, shipName) { // receive position coordinates for a ship
        this.updateBoardArray(Number(x), Number(y), shipName)
    }


    updateBoardArray(x, y, shipName) {
        this.board[x][y] = shipName
    }  

    getBoard() {
        const boardCopy = [...this.board]
        return boardCopy
    }

    getMissedAttacks() {
        const missedAttackArrCopy = [...this.missedAttacks]
        return missedAttackArrCopy
    }

    getSuccessfulAttacks() {
        const successfulAttackArrCopy = [...this.successfulAttacks]
        return successfulAttackArrCopy
    }

    #storeMissedAttack(x, y) {
        this.missedAttacks.push([x,y])
    }

    #storeSuccessfulAttack(x, y) {
        this.successfulAttacks.push([x, y])
    }

    #isValidAttack(x, y) {
        // all should be true
        const uniqueMissedAttack = !this.getMissedAttacks().includes([x, y])
        const uniqueSuccessfulAttack = !this.getSuccessfulAttacks().includes([x, y]) 
        const validCoordinates = (x >= 0 && x <= 9) && (y >= 0 && y <= 9)

        return uniqueMissedAttack && uniqueSuccessfulAttack && validCoordinates
    }

    receiveAttack(x, y) {
        // check if there is a ship at [x, y] coordinates
        // if yes, apply damage to this.ship & record successful attack
        // if not, record the coordinates of the missed attack

        if (this.#isValidAttack(x, y)) {
            const board = this.getBoard()
            const ships = {
                'carrier': this.carrier, 
                'battleship': this.battleship, 
                'cruiser': this.cruiser, 
                'submarine': this.submarine, 
                'destroyer': this.destroyer
            }

            if (board[x][y] !== null) {
                ships[board[x][y]].hit()
                this.#storeSuccessfulAttack(x, y)
                return "It's a hit!"
            } else {
                this.#storeMissedAttack(x, y)
                return "It's a miss!"
            }

        } else return 'Invalid attack'
    }

    areAllShipsSunk() {
        if (this.getSuccessfulAttacks().length >= 17) {
            const ships = this.#getAllShips()
            const status = ships.every(ship => ship.sunk === true)

            if (status) console.log('All ships have sunk!!!')

            return status
            
        } return false

    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/factories/playerFactory.js":
/*!****************************************!*\
  !*** ./src/factories/playerFactory.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboardFactory */ "./src/factories/gameboardFactory.js");


class Player {
    constructor() {
        this.board = this.#createBoard()
    }

    #createBoard() {
        const newBoard = new _gameboardFactory__WEBPACK_IMPORTED_MODULE_0__["default"]
        return newBoard
    }

    attackEnemy(coordinatesArr, enemyBoard) {
        const [x, y] = [...coordinatesArr] 
        const attackFeedback = enemyBoard.receiveAttack(x, y)
        return attackFeedback
    }

    viewBoard() {
        return this.board.getBoard()
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/factories/shipFactory.js":
/*!**************************************!*\
  !*** ./src/factories/shipFactory.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Ship {
    constructor(name, length) {
        this.name = name,
        this.length = length;
        this.damage = 0;
        this.sunk = false;
    }

    hit() {
        this.damage = this.damage + 1
        this.#isSunk()
    }

    #setShipAsSunk() {
        this.sunk = true
    }

    #isSunk() {
        if (this.damage === this.length) this.#setShipAsSunk()
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/gameboardUI */ "./src/components/gameboardUI.js");
/* harmony import */ var _eventListeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventListeners */ "./src/eventListeners.js");
/* harmony import */ var _factories_botFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/botFactory */ "./src/factories/botFactory.js");
/* harmony import */ var _factories_playerFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factories/playerFactory */ "./src/factories/playerFactory.js");





// gameboard UI
const pBoard = document.querySelector('.pBoard')
;(0,_components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__["default"])(pBoard)

// create player and bot gameboard
const p1 = new _factories_playerFactory__WEBPACK_IMPORTED_MODULE_3__["default"]
const bot = new _factories_botFactory__WEBPACK_IMPORTED_MODULE_2__["default"]
console.log(p1.viewBoard())


// activate event listeners
;(0,_eventListeners__WEBPACK_IMPORTED_MODULE_1__.applyDragDrop)(p1.board)
// allowRotate()


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (p1);


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L2dhbWVib2FyZFVJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvYm90RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlQm9hcmRDb21wb25lbnQocGFyZW50Q29udGFpbmVyKSB7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVZSGVhZGVyKCkge1xuICAgICAgICBjb25zdCB5SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgeUhlYWRlci5jbGFzc0xpc3QuYWRkKCdib2FyZFlIZWFkZXInKVxuICAgICAgICBjb25zdCBsZXR0ZXJzID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRicsICdHJywgJ0gnLCAnSScsICdKJ11cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gOTsgeSsrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ2JveEhlYWRlcicpXG4gICAgICAgICAgICBib3guaW5uZXJUZXh0ID0gbGV0dGVyc1t5XSBcbiAgICAgICAgICAgIHlIZWFkZXIuYXBwZW5kKGJveClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geUhlYWRlclxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVhIZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IHhIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB4SGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkWEhlYWRlcicpXG5cbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPD0gOTsgeCsrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ2JveEhlYWRlcicpXG4gICAgICAgICAgICBib3guaW5uZXJUZXh0ID0geCArIDEgLy8gb2Zmc2V0IGZvciB6ZXJvIGluZGV4aW5nXG4gICAgICAgICAgICB4SGVhZGVyLmFwcGVuZChib3gpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHhIZWFkZXJcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgdG9wLWxldmVsIGNvbnRhaW5lcnNcbiAgICBjb25zdCBjaGlsZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY2hpbGRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmRDb250YWluZXInKVxuXG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkR3JpZCcpXG5cbiAgICAvLyBjcmVhdGUgYm9hcmQgZ3JpZHNcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSA5OyB4KyspIHtcbiAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ3JvdycpXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IDk7IHkrKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCdib3gnKVxuICAgICAgICAgICAgYm94LmRhdGFzZXQueCA9IHhcbiAgICAgICAgICAgIGJveC5kYXRhc2V0LnkgPSB5XG4gICAgICAgICAgICByb3cuYXBwZW5kKGJveClcbiAgICAgICAgfVxuICAgICAgICBib2FyZC5hcHBlbmQocm93KVxuICAgIH1cblxuXG4gICAgLy8gYXBwZW5kIHRvIGNvbnRhaW5lcnNcbiAgICBjaGlsZENvbnRhaW5lci5hcHBlbmQoY3JlYXRlWEhlYWRlcigpLCBjcmVhdGVZSGVhZGVyKCksIGJvYXJkKVxuICAgIHBhcmVudENvbnRhaW5lci5hcHBlbmQoY2hpbGRDb250YWluZXIpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUJvYXJkQ29tcG9uZW50IiwiLy8gRFJBRyBOIERST1BcbmZ1bmN0aW9uIGFwcGx5RHJhZ0Ryb3AoYm9hcmQpIHtcblxuICAgIGZ1bmN0aW9uIGRyYWdTdGFydEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJkcmFnZ2luZ1wiLCBldmVudC50YXJnZXQuaWQsIFwiLi4uXCIpXG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCBgJHtldmVudC50YXJnZXQuaWR9LCR7ZXZlbnQudGFyZ2V0LmRhdGFzZXQubGVuZ3RofWApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZ092ZXJIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcm9wSGFuZGxlcihldmVudCkge1xuICAgICAgICBmdW5jdGlvbiBwb3B1bGF0ZU5leHRCb3goYm94RWxlbWVudCwgcmVwZWF0KSB7XG4gICAgICAgICAgICBpZiAocmVwZWF0ID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJveEVsZW1lbnQuY2xhc3NMaXN0LmFkZChzaGlwTmFtZSwgXCJkcm9wcGVkXCIpXG4gICAgICAgICAgICBib2FyZC5wb3NpdGlvblNoaXBzKGJveEVsZW1lbnQuZGF0YXNldC54LCBib3hFbGVtZW50LmRhdGFzZXQueSwgc2hpcE5hbWUpXG4gICAgICAgICAgICByZXBlYXQgLS1cbiAgICAgICAgICAgIHBvcHVsYXRlTmV4dEJveChib3hFbGVtZW50Lm5leHRTaWJsaW5nLCByZXBlYXQpXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZW1vdmVGcm9tU2hpcHlhcmQoc2hpcE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtzaGlwTmFtZX1gKVxuICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwicm90YXRhYmxlXCIpXG4gICAgICAgICAgICBzaGlwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnRyb2xsZXJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBsZXQgW3NoaXBOYW1lLCBzaGlwTGVuZ3RoXSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKS5zcGxpdCgnLCcpXG5cbiAgICAgICAgLy8gYWxsb3cgdGhlIGRyb3AgaWYgZW1wdHkgYm94ICYgc2hpcCBpcyB3aXRoaW4gYm9hcmQgYm91bmRhcmllc1xuICAgICAgICBpZiAoIWlzT2NjdXBpZWRCb3goZXZlbnQpKSB7XG4gICAgICAgICAgICBjb25zdCB5SW5kZXggPSBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueSlcbiAgICAgICAgICAgIHNoaXBMZW5ndGggPSBOdW1iZXIoc2hpcExlbmd0aClcblxuICAgICAgICAgICAgaWYgKHlJbmRleCArIChzaGlwTGVuZ3RoIC0gMSkgPD0gOSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKHNoaXBOYW1lLCBcImRyb3BwZWRcIilcblxuICAgICAgICAgICAgICAgIHBvcHVsYXRlTmV4dEJveChldmVudC50YXJnZXQsIHNoaXBMZW5ndGgpXG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpXG4gICAgICAgICAgICAgICAgcmVtb3ZlRnJvbVNoaXB5YXJkKHNoaXBOYW1lKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGJvYXJkLmdldEJvYXJkKCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPY2N1cGllZEJveChldmVudCkge1xuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRyb3BwZWRcIilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnTGVhdmVIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdFbnRlckhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFpc09jY3VwaWVkQm94KGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZGVudGlmeSBkcmFnZ2FibGUgc2hpcHNcbiAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwJykgXG4gICAgY29uc3QgYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm94JylcblxuXG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGV2ZW50ID0+IGRyYWdTdGFydEhhbmRsZXIoZXZlbnQpKVxuICAgICAgICAvLyBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnXCIsIGV2ZW50ID0+IGRyYWdnaW5nSGFuZGxlcihldmVudCkpXG4gICAgICAgIC8vIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZXZlbnQgPT4gZHJhZ0VuZEhhbmRsZXIoZXZlbnQpKVxuICAgIH0pXG5cbiAgICBib3hlcy5mb3JFYWNoKGJveCA9PiB7XG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIGV2ZW50ID0+IGRyYWdFbnRlckhhbmRsZXIoZXZlbnQpKVxuICAgICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGV2ZW50ID0+IGRyYWdPdmVySGFuZGxlcihldmVudCkpXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIGV2ZW50ID0+IGRyYWdMZWF2ZUhhbmRsZXIoZXZlbnQpKVxuICAgICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZXZlbnQgPT4gZHJvcEhhbmRsZXIoZXZlbnQpKVxuICAgIH0pXG5cbn1cblxuZnVuY3Rpb24gYWxsb3dSb3RhdGUoKSB7XG4gICAgY29uc3Qgcm90YXRhYmxlU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm90YXRhYmxlJylcblxuICAgIHJvdGF0YWJsZVNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBldmVudCA9PiByb3RhdGVTaGlwKGV2ZW50KSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG5cbiAgICBmdW5jdGlvbiByb3RhdGVTaGlwKGV2ZW50KSB7XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0U2hpcFNpemUoKSB7XG4gICAgICAgICAgICAvLyBzaG91bGQgcmVwbGFjZSB0aGlzIHdpdGggcGxheWVyIGdhbWVib2FyZCBzaGlwIG9iamVjdCEhISEhISEhXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LnRhcmdldC5pZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJjYXJyaWVyXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA1XG4gICAgICAgICAgICAgICAgY2FzZSBcImJhdHRsZXNoaXBcIjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDRcbiAgICAgICAgICAgICAgICBjYXNlIFwiY3J1aXNlclwiOiBcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDNcbiAgICAgICAgICAgICAgICBjYXNlIFwic3VibWFyaW5lXCI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAzXG4gICAgICAgICAgICAgICAgY2FzZSBcImRlc3Ryb3llclwiOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2l6ZSA9IGdldFNoaXBTaXplKClcblxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInJvdGF0ZWRcIikpIHtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5zdHlsZS53aWR0aCA9IGBjYWxjKHZhcigtLXNoaXBCb3hTaXplKSAqICR7c2l6ZX0pYFxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmhlaWdodCA9IFwidmFyKC0tc2hpcEJveFNpemUpXCJcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLndpZHRoID0gXCJ2YXIoLS1zaGlwQm94U2l6ZSlcIlxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmhlaWdodCA9IGBjYWxjKHZhcigtLXNoaXBCb3hTaXplKSAqICR7c2l6ZX0pYFxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJyb3RhdGVkXCIpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IHsgYXBwbHlEcmFnRHJvcCwgYWxsb3dSb3RhdGUgfSIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmRGYWN0b3J5J1xuXG5jbGFzcyBCb3Qge1xuICAgICNzdWNjZXNzZnVsQXR0YWNrO1xuICAgICNwcmV2aW91c0F0dGFjaztcbiAgICAjcG9zc2libGVTbWFydE1vdmVzO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLiNjcmVhdGVCb2FyZCgpXG4gICAgICAgIHRoaXMuI3ByZXZpb3VzQXR0YWNrID0gbnVsbFxuICAgICAgICB0aGlzLiNzdWNjZXNzZnVsQXR0YWNrID0gZmFsc2VcbiAgICAgICAgdGhpcy4jcG9zc2libGVTbWFydE1vdmVzID0gW1swLCAxXSwgWzAsIC0xXSwgWy0xLCAwXSwgWzEsIDBdXVxuICAgIH1cblxuICAgICNjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgY29uc3QgbmV3Qm9hcmQgPSBuZXcgR2FtZWJvYXJkXG4gICAgICAgIHJldHVybiBuZXdCb2FyZFxuICAgIH1cbiAgICBcbiAgICBnZXRDb29yZGluYXRlcyhlbmVteUdhbWVib2FyZCkge1xuICAgICAgICAvLyBwaWNrIGEgcmFuZG9tIHNwb3Qgd2l0aGluIHRoZSBib2FyZFxuICAgICAgICAvLyBzaG91bGQgYmUgYSB1bmlxdWUgY29vcmRpbmF0ZSBldmVyeSB0aW1lXG4gICAgICAgIC8vIGlmIHByZXZpb3VzIGNvb3JkaW5hdGUgd2FzIGEgaGl0LCBjaG9vc2UgYW4gYWRqYWNlbnQgY29vcmRpbmF0ZVxuICAgICAgICAvLyBpbXByb3ZlbWVudCAtLSBnZW5lcmF0ZSBuZXh0IGNvb3JkaW5hdGUgYmFzZWQgb24gYXZhaWxhYmxlIGVtcHR5IHNsb3RzIGluc3RlYWQgb2YgcmFuZG9tIHgveSBjb29yZHNcbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbU51bShtaW4sIG1heCkge1xuICAgICAgICAgICAgY29uc3QgbnVtID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtKVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNFbXB0eVBvc2l0aW9uKHgsIHksIGVuZW15Qm9hcmQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmVteUJvYXJkW3hdW3ldID09PSBudWxsXG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0aGlzLiNzdWNjZXNzZnVsQXR0YWNrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4jcG9zc2libGVTbWFydE1vdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbk9mZnNldCA9IHRoaXMuI3Bvc3NpYmxlU21hcnRNb3Zlcy5wb3AoKVxuICAgICAgICAgICAgICAgIGxldCB4Q29vcmQgPSB0aGlzLiNwcmV2aW91c0F0dGFja1swXSArIHBvc2l0aW9uT2Zmc2V0WzBdXG4gICAgICAgICAgICAgICAgbGV0IHlDb29yZCA9IHRoaXMuI3ByZXZpb3VzQXR0YWNrWzFdICsgcG9zaXRpb25PZmZzZXRbMV1cblxuICAgICAgICAgICAgICAgIHJldHVybiBbeENvb3JkLCB5Q29vcmRdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeENvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG4gICAgICAgIGxldCB5Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcblxuICAgICAgICB3aGlsZSAoIWlzRW1wdHlQb3NpdGlvbih4Q29vcmQsIHlDb29yZCwgZW5lbXlHYW1lYm9hcmQuZ2V0Qm9hcmQoKSkpIHtcbiAgICAgICAgICAgIHhDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5KVxuICAgICAgICAgICAgeUNvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBbeENvb3JkLCB5Q29vcmRdXG4gICAgfVxuXG5cbiAgICBhdHRhY2tFbmVteShjb29yZGluYXRlc0FyciwgZW5lbXlCb2FyZCkge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBbLi4uY29vcmRpbmF0ZXNBcnJdIFxuICAgICAgICBjb25zdCBhdHRhY2tGZWVkYmFjayA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KVxuICAgICAgICBpZiAoYXR0YWNrRmVlZGJhY2sgPT09IFwiSXQncyBhIGhpdCFcIikge1xuICAgICAgICAgICAgdGhpcy4jc3RvcmVQcmV2aW91c0F0dGFjayhjb29yZGluYXRlc0FyciwgdHJ1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuI3N0b3JlUHJldmlvdXNBdHRhY2soY29vcmRpbmF0ZXNBcnIsIGZhbHNlKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdHRhY2tGZWVkYmFja1xuICAgIH1cblxuICAgIHZpZXdCb2FyZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmQuZ2V0Qm9hcmQoKVxuICAgIH1cblxuICAgICNzdG9yZVByZXZpb3VzQXR0YWNrKGNvb3JkaW5hdGVzQXJyLCBlbmVteVdhc0hpdCkge1xuICAgICAgICB0aGlzLiNwcmV2aW91c0F0dGFjayA9IGNvb3JkaW5hdGVzQXJyXG4gICAgICAgIHRoaXMuI3N1Y2Nlc3NmdWxBdHRhY2sgPSBlbmVteVdhc0hpdFxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBCb3QiLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXBGYWN0b3J5J1xuXG5jbGFzcyBHYW1lYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhcnJpZXIgPSB0aGlzLiNjcmVhdGVTaGlwKCdjYXJyaWVyJywgNSlcbiAgICAgICAgdGhpcy5iYXR0bGVzaGlwID0gdGhpcy4jY3JlYXRlU2hpcCgnYmF0dGxlc2hpcCcsIDQpXG4gICAgICAgIHRoaXMuY3J1aXNlciA9IHRoaXMuI2NyZWF0ZVNoaXAoJ2NydWlzZXInLCAzKVxuICAgICAgICB0aGlzLnN1Ym1hcmluZSA9IHRoaXMuI2NyZWF0ZVNoaXAoJ3N1Ym1hcmluZScsIDMpXG4gICAgICAgIHRoaXMuZGVzdHJveWVyID0gdGhpcy4jY3JlYXRlU2hpcCgnZGVzdHJveWVyJywgMilcbiAgICAgICAgLy8gdGhpcy5ib2FyZCA9IHRoaXMuI3Bvc2l0aW9uU2hpcHModGhpcy4jY3JlYXRlQm9hcmQoKSlcbiAgICAgICAgdGhpcy5ib2FyZCA9IHRoaXMuI2NyZWF0ZUJvYXJkKClcbiAgICAgICAgdGhpcy5taXNzZWRBdHRhY2tzID0gW11cbiAgICAgICAgdGhpcy5zdWNjZXNzZnVsQXR0YWNrcyA9IFtdXG4gICAgfVxuXG4gICAgI2NyZWF0ZUJvYXJkKCkge1xuICAgICAgICBsZXQgYm9hcmQgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPD0gOSA7IGkrKykge1xuICAgICAgICAgICAgbGV0IHJvdyA9IFtdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPD0gOSA7IGkrKykge1xuICAgICAgICAgICAgICAgIHJvdy5wdXNoKG51bGwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib2FyZC5wdXNoKHJvdylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm9hcmRcbiAgICB9XG4gICAgXG5cbiAgICAjY3JlYXRlU2hpcChuYW1lLCBsZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKG5hbWUsIGxlbmd0aClcbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG5cbiAgICAjZ2V0QWxsU2hpcHMoKSB7XG4gICAgICAgIGNvbnN0IHNoaXBzID0gW1xuICAgICAgICAgICAgdGhpcy5jYXJyaWVyLCBcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlc2hpcCwgXG4gICAgICAgICAgICB0aGlzLmNydWlzZXIsIFxuICAgICAgICAgICAgdGhpcy5zdWJtYXJpbmUsIFxuICAgICAgICAgICAgdGhpcy5kZXN0cm95ZXJcbiAgICAgICAgXVxuICAgICAgICByZXR1cm4gc2hpcHNcbiAgICB9XG5cbiAgICBwb3NpdGlvblNoaXBzKHgsIHksIHNoaXBOYW1lKSB7IC8vIHJlY2VpdmUgcG9zaXRpb24gY29vcmRpbmF0ZXMgZm9yIGEgc2hpcFxuICAgICAgICB0aGlzLnVwZGF0ZUJvYXJkQXJyYXkoTnVtYmVyKHgpLCBOdW1iZXIoeSksIHNoaXBOYW1lKVxuICAgIH1cblxuXG4gICAgdXBkYXRlQm9hcmRBcnJheSh4LCB5LCBzaGlwTmFtZSkge1xuICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gc2hpcE5hbWVcbiAgICB9ICBcblxuICAgIGdldEJvYXJkKCkge1xuICAgICAgICBjb25zdCBib2FyZENvcHkgPSBbLi4udGhpcy5ib2FyZF1cbiAgICAgICAgcmV0dXJuIGJvYXJkQ29weVxuICAgIH1cblxuICAgIGdldE1pc3NlZEF0dGFja3MoKSB7XG4gICAgICAgIGNvbnN0IG1pc3NlZEF0dGFja0FyckNvcHkgPSBbLi4udGhpcy5taXNzZWRBdHRhY2tzXVxuICAgICAgICByZXR1cm4gbWlzc2VkQXR0YWNrQXJyQ29weVxuICAgIH1cblxuICAgIGdldFN1Y2Nlc3NmdWxBdHRhY2tzKCkge1xuICAgICAgICBjb25zdCBzdWNjZXNzZnVsQXR0YWNrQXJyQ29weSA9IFsuLi50aGlzLnN1Y2Nlc3NmdWxBdHRhY2tzXVxuICAgICAgICByZXR1cm4gc3VjY2Vzc2Z1bEF0dGFja0FyckNvcHlcbiAgICB9XG5cbiAgICAjc3RvcmVNaXNzZWRBdHRhY2soeCwgeSkge1xuICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MucHVzaChbeCx5XSlcbiAgICB9XG5cbiAgICAjc3RvcmVTdWNjZXNzZnVsQXR0YWNrKHgsIHkpIHtcbiAgICAgICAgdGhpcy5zdWNjZXNzZnVsQXR0YWNrcy5wdXNoKFt4LCB5XSlcbiAgICB9XG5cbiAgICAjaXNWYWxpZEF0dGFjayh4LCB5KSB7XG4gICAgICAgIC8vIGFsbCBzaG91bGQgYmUgdHJ1ZVxuICAgICAgICBjb25zdCB1bmlxdWVNaXNzZWRBdHRhY2sgPSAhdGhpcy5nZXRNaXNzZWRBdHRhY2tzKCkuaW5jbHVkZXMoW3gsIHldKVxuICAgICAgICBjb25zdCB1bmlxdWVTdWNjZXNzZnVsQXR0YWNrID0gIXRoaXMuZ2V0U3VjY2Vzc2Z1bEF0dGFja3MoKS5pbmNsdWRlcyhbeCwgeV0pIFxuICAgICAgICBjb25zdCB2YWxpZENvb3JkaW5hdGVzID0gKHggPj0gMCAmJiB4IDw9IDkpICYmICh5ID49IDAgJiYgeSA8PSA5KVxuXG4gICAgICAgIHJldHVybiB1bmlxdWVNaXNzZWRBdHRhY2sgJiYgdW5pcXVlU3VjY2Vzc2Z1bEF0dGFjayAmJiB2YWxpZENvb3JkaW5hdGVzXG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgc2hpcCBhdCBbeCwgeV0gY29vcmRpbmF0ZXNcbiAgICAgICAgLy8gaWYgeWVzLCBhcHBseSBkYW1hZ2UgdG8gdGhpcy5zaGlwICYgcmVjb3JkIHN1Y2Nlc3NmdWwgYXR0YWNrXG4gICAgICAgIC8vIGlmIG5vdCwgcmVjb3JkIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgbWlzc2VkIGF0dGFja1xuXG4gICAgICAgIGlmICh0aGlzLiNpc1ZhbGlkQXR0YWNrKHgsIHkpKSB7XG4gICAgICAgICAgICBjb25zdCBib2FyZCA9IHRoaXMuZ2V0Qm9hcmQoKVxuICAgICAgICAgICAgY29uc3Qgc2hpcHMgPSB7XG4gICAgICAgICAgICAgICAgJ2NhcnJpZXInOiB0aGlzLmNhcnJpZXIsIFxuICAgICAgICAgICAgICAgICdiYXR0bGVzaGlwJzogdGhpcy5iYXR0bGVzaGlwLCBcbiAgICAgICAgICAgICAgICAnY3J1aXNlcic6IHRoaXMuY3J1aXNlciwgXG4gICAgICAgICAgICAgICAgJ3N1Ym1hcmluZSc6IHRoaXMuc3VibWFyaW5lLCBcbiAgICAgICAgICAgICAgICAnZGVzdHJveWVyJzogdGhpcy5kZXN0cm95ZXJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJvYXJkW3hdW3ldICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2hpcHNbYm9hcmRbeF1beV1dLmhpdCgpXG4gICAgICAgICAgICAgICAgdGhpcy4jc3RvcmVTdWNjZXNzZnVsQXR0YWNrKHgsIHkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiSXQncyBhIGhpdCFcIlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiNzdG9yZU1pc3NlZEF0dGFjayh4LCB5KVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkl0J3MgYSBtaXNzIVwiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHJldHVybiAnSW52YWxpZCBhdHRhY2snXG4gICAgfVxuXG4gICAgYXJlQWxsU2hpcHNTdW5rKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRTdWNjZXNzZnVsQXR0YWNrcygpLmxlbmd0aCA+PSAxNykge1xuICAgICAgICAgICAgY29uc3Qgc2hpcHMgPSB0aGlzLiNnZXRBbGxTaGlwcygpXG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuc3VuayA9PT0gdHJ1ZSlcblxuICAgICAgICAgICAgaWYgKHN0YXR1cykgY29uc29sZS5sb2coJ0FsbCBzaGlwcyBoYXZlIHN1bmshISEnKVxuXG4gICAgICAgICAgICByZXR1cm4gc3RhdHVzXG4gICAgICAgICAgICBcbiAgICAgICAgfSByZXR1cm4gZmFsc2VcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZEZhY3RvcnknXG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLiNjcmVhdGVCb2FyZCgpXG4gICAgfVxuXG4gICAgI2NyZWF0ZUJvYXJkKCkge1xuICAgICAgICBjb25zdCBuZXdCb2FyZCA9IG5ldyBHYW1lYm9hcmRcbiAgICAgICAgcmV0dXJuIG5ld0JvYXJkXG4gICAgfVxuXG4gICAgYXR0YWNrRW5lbXkoY29vcmRpbmF0ZXNBcnIsIGVuZW15Qm9hcmQpIHtcbiAgICAgICAgY29uc3QgW3gsIHldID0gWy4uLmNvb3JkaW5hdGVzQXJyXSBcbiAgICAgICAgY29uc3QgYXR0YWNrRmVlZGJhY2sgPSBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSlcbiAgICAgICAgcmV0dXJuIGF0dGFja0ZlZWRiYWNrXG4gICAgfVxuXG4gICAgdmlld0JvYXJkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib2FyZC5nZXRCb2FyZCgpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXIiLCJjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZSxcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMDtcbiAgICAgICAgdGhpcy5zdW5rID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaGl0KCkge1xuICAgICAgICB0aGlzLmRhbWFnZSA9IHRoaXMuZGFtYWdlICsgMVxuICAgICAgICB0aGlzLiNpc1N1bmsoKVxuICAgIH1cblxuICAgICNzZXRTaGlwQXNTdW5rKCkge1xuICAgICAgICB0aGlzLnN1bmsgPSB0cnVlXG4gICAgfVxuXG4gICAgI2lzU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGFtYWdlID09PSB0aGlzLmxlbmd0aCkgdGhpcy4jc2V0U2hpcEFzU3VuaygpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY3JlYXRlQm9hcmRDb21wb25lbnQgZnJvbSBcIi4vY29tcG9uZW50cy9nYW1lYm9hcmRVSVwiXG5pbXBvcnQgeyBhcHBseURyYWdEcm9wLCBhbGxvd1JvdGF0ZSB9IGZyb20gXCIuL2V2ZW50TGlzdGVuZXJzXCJcbmltcG9ydCBCb3QgZnJvbSBcIi4vZmFjdG9yaWVzL2JvdEZhY3RvcnlcIlxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9mYWN0b3JpZXMvcGxheWVyRmFjdG9yeVwiXG5cbi8vIGdhbWVib2FyZCBVSVxuY29uc3QgcEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBCb2FyZCcpXG5jcmVhdGVCb2FyZENvbXBvbmVudChwQm9hcmQpXG5cbi8vIGNyZWF0ZSBwbGF5ZXIgYW5kIGJvdCBnYW1lYm9hcmRcbmNvbnN0IHAxID0gbmV3IFBsYXllclxuY29uc3QgYm90ID0gbmV3IEJvdFxuY29uc29sZS5sb2cocDEudmlld0JvYXJkKCkpXG5cblxuLy8gYWN0aXZhdGUgZXZlbnQgbGlzdGVuZXJzXG5hcHBseURyYWdEcm9wKHAxLmJvYXJkKVxuLy8gYWxsb3dSb3RhdGUoKVxuXG5cbmV4cG9ydCBkZWZhdWx0IHAxXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==