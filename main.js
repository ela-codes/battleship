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
/* harmony import */ var _components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/gameboardUI */ "./src/components/gameboardUI.js");


// DRAG N DROP
function applyDragDrop(board) {

    function dragStartHandler(event) {
        console.log("dragging", event.target.id, "...")
        event.dataTransfer.setData("text", `${event.target.id},${event.target.dataset.length}, ${event.target.dataset.rotated}`)
    }

    function dragOverHandler(event) {
        event.preventDefault()
    }

    function dropHandler(event) {
        function populateNextBox(boxElement, repeat, isRotated) {
            if (repeat === 0) return;
            
            boxElement.classList.add(shipName, "dropped")
            board.positionShip(boxElement.dataset.x, boxElement.dataset.y, shipName)
            repeat --

            if (isRotated) {
                const x = Number(boxElement.dataset.x)
                const nextDiv = document.querySelector(`[data-x="${x+1}"][data-y="${boxElement.dataset.y}"]`)
                populateNextBox(nextDiv, repeat, isRotated)
            } else {
                populateNextBox(boxElement.nextSibling, repeat, isRotated)
            }
        }

        function removeFromShipyard(shipName) {
            const ship = document.querySelector(`#${shipName}`)
            ship.classList.remove("rotatable")
            ship.style.display = 'none'
            ship.setAttribute('draggable', 'false')
        }

        function isValidDropZone(event, isRotated) {
            function getIndexBasedOnShipRotation(event) {
                if (isRotated) return Number(event.target.dataset.x)
                return Number(event.target.dataset.y)
            }
            const isEmptySlot = !event.target.classList.contains("dropped")
            const index = getIndexBasedOnShipRotation(event)

            return isEmptySlot && ((index + (shipLength - 1)) <= 9)
        }

        event.preventDefault()
        let [shipName, shipLength, isRotated] = event.dataTransfer.getData("text").split(',')

        isRotated =  isRotated === " false" ? false : true

        if (isValidDropZone(event, isRotated)) {
            event.target.classList.add(shipName, "dropped")
            populateNextBox(event.target, shipLength, isRotated)
            removeFromShipyard(shipName)
        }
        
        event.target.classList.remove("hovered")
        board.numOfShipsReady++

        if (board.numOfShipsReady === 5) toggleBeginBattleBtn() // if all ships are positioned on the board, then allow user to start the game

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
        ship.addEventListener('click', e => rotateShip(e, e.target.dataset.length))
    })


    function rotateShip(e, shipLength) {
        
        if (e.target.dataset.rotated === "true") {
            e.target.style.width = `calc(var(--shipBoxSize) * ${shipLength})`
            e.target.style.height = "var(--shipBoxSize)"
            e.target.dataset.rotated = "false"

        } else {
            e.target.style.width = "var(--shipBoxSize)"
            e.target.style.height = `calc(var(--shipBoxSize) * ${shipLength})`
            e.target.dataset.rotated = "true"
        }
    }
}

function toggleBeginBattleBtn() {
    const btn = document.querySelector('button.beginBattle')
    if (!btn.style.display) {
        btn.style.display = 'flex'
        allowGameStart(btn)
    }
    else { btn.style.display = 'none'}
}

function resetShips() {
    // display ships again
    // allow draggable 
    // empty the board array
    // empty the board grid
    // hide begin battle button
}

function allowGameStart(btn) {
    btn.addEventListener('click', e => {
        buildMainScreen()
        showMainScreen()
    })

}

function showMainScreen() {
    const introScreen = document.querySelector('.intro')
    introScreen.style.display = 'none'

    const mainScreen = document.querySelector('.main')
    mainScreen.style.display = 'flex'
    
    const pBoard = document.querySelector('.intro .pBoard')

    const playerSide = document.querySelector('.playerSide')
    playerSide.append(pBoard)

    introScreen.removeChild(pBoard)
}

function buildMainScreen() {
    const botBoard = document.querySelector('.bBoard')
    ;(0,_components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__["default"])(botBoard)

    const boxSizeStyle = document.querySelector(':root')
    boxSizeStyle.style.setProperty('--boxSize', '50px')
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
        this.board = this.#createBoard()
        this.missedAttacks = []
        this.successfulAttacks = []
        this.numOfShipsReady = 0;
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

    positionShip(x, y, shipName) { // position ship at x,y coordinates
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
;(0,_eventListeners__WEBPACK_IMPORTED_MODULE_1__.allowRotate)()


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (p1);


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOMkQ7QUFDRTtBQUNyQjtBQUNNOztBQUU5QztBQUNBO0FBQ0Esb0VBQW9COztBQUVwQjtBQUNBLGVBQWUsZ0VBQU07QUFDckIsZ0JBQWdCLDZEQUFHO0FBQ25COzs7QUFHQTtBQUNBLCtEQUFhO0FBQ2IsNkRBQVc7OztBQUdYLGlFQUFlLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZ2FtZWJvYXJkVUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9ib3RGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvcGxheWVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVCb2FyZENvbXBvbmVudChwYXJlbnRDb250YWluZXIpIHtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVlIZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IHlIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB5SGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkWUhlYWRlcicpXG4gICAgICAgIGNvbnN0IGxldHRlcnMgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCcsICdJJywgJ0onXVxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSA5OyB5KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnYm94SGVhZGVyJylcbiAgICAgICAgICAgIGJveC5pbm5lclRleHQgPSBsZXR0ZXJzW3ldIFxuICAgICAgICAgICAgeUhlYWRlci5hcHBlbmQoYm94KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB5SGVhZGVyXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlWEhlYWRlcigpIHtcbiAgICAgICAgY29uc3QgeEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHhIZWFkZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmRYSGVhZGVyJylcblxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSA5OyB4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnYm94SGVhZGVyJylcbiAgICAgICAgICAgIGJveC5pbm5lclRleHQgPSB4ICsgMSAvLyBvZmZzZXQgZm9yIHplcm8gaW5kZXhpbmdcbiAgICAgICAgICAgIHhIZWFkZXIuYXBwZW5kKGJveClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geEhlYWRlclxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSB0b3AtbGV2ZWwgY29udGFpbmVyc1xuICAgIGNvbnN0IGNoaWxkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjaGlsZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdib2FyZENvbnRhaW5lcicpXG5cbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgYm9hcmQuY2xhc3NMaXN0LmFkZCgnYm9hcmRHcmlkJylcblxuICAgIC8vIGNyZWF0ZSBib2FyZCBncmlkc1xuICAgIGZvciAobGV0IHggPSAwOyB4IDw9IDk7IHgrKykge1xuICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgncm93JylcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gOTsgeSsrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcpXG4gICAgICAgICAgICBib3guZGF0YXNldC54ID0geFxuICAgICAgICAgICAgYm94LmRhdGFzZXQueSA9IHlcbiAgICAgICAgICAgIHJvdy5hcHBlbmQoYm94KVxuICAgICAgICB9XG4gICAgICAgIGJvYXJkLmFwcGVuZChyb3cpXG4gICAgfVxuXG5cbiAgICAvLyBhcHBlbmQgdG8gY29udGFpbmVyc1xuICAgIGNoaWxkQ29udGFpbmVyLmFwcGVuZChjcmVhdGVYSGVhZGVyKCksIGNyZWF0ZVlIZWFkZXIoKSwgYm9hcmQpXG4gICAgcGFyZW50Q29udGFpbmVyLmFwcGVuZChjaGlsZENvbnRhaW5lcilcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQm9hcmRDb21wb25lbnQiLCJpbXBvcnQgY3JlYXRlQm9hcmRDb21wb25lbnQgZnJvbSBcIi4vY29tcG9uZW50cy9nYW1lYm9hcmRVSVwiO1xuXG4vLyBEUkFHIE4gRFJPUFxuZnVuY3Rpb24gYXBwbHlEcmFnRHJvcChib2FyZCkge1xuXG4gICAgZnVuY3Rpb24gZHJhZ1N0YXJ0SGFuZGxlcihldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImRyYWdnaW5nXCIsIGV2ZW50LnRhcmdldC5pZCwgXCIuLi5cIilcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIGAke2V2ZW50LnRhcmdldC5pZH0sJHtldmVudC50YXJnZXQuZGF0YXNldC5sZW5ndGh9LCAke2V2ZW50LnRhcmdldC5kYXRhc2V0LnJvdGF0ZWR9YClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnT3ZlckhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyb3BIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGZ1bmN0aW9uIHBvcHVsYXRlTmV4dEJveChib3hFbGVtZW50LCByZXBlYXQsIGlzUm90YXRlZCkge1xuICAgICAgICAgICAgaWYgKHJlcGVhdCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBib3hFbGVtZW50LmNsYXNzTGlzdC5hZGQoc2hpcE5hbWUsIFwiZHJvcHBlZFwiKVxuICAgICAgICAgICAgYm9hcmQucG9zaXRpb25TaGlwKGJveEVsZW1lbnQuZGF0YXNldC54LCBib3hFbGVtZW50LmRhdGFzZXQueSwgc2hpcE5hbWUpXG4gICAgICAgICAgICByZXBlYXQgLS1cblxuICAgICAgICAgICAgaWYgKGlzUm90YXRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBOdW1iZXIoYm94RWxlbWVudC5kYXRhc2V0LngpXG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9XCIke3grMX1cIl1bZGF0YS15PVwiJHtib3hFbGVtZW50LmRhdGFzZXQueX1cIl1gKVxuICAgICAgICAgICAgICAgIHBvcHVsYXRlTmV4dEJveChuZXh0RGl2LCByZXBlYXQsIGlzUm90YXRlZClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9wdWxhdGVOZXh0Qm94KGJveEVsZW1lbnQubmV4dFNpYmxpbmcsIHJlcGVhdCwgaXNSb3RhdGVkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRnJvbVNoaXB5YXJkKHNoaXBOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7c2hpcE5hbWV9YClcbiAgICAgICAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInJvdGF0YWJsZVwiKVxuICAgICAgICAgICAgc2hpcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICBzaGlwLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ2ZhbHNlJylcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGlzVmFsaWREcm9wWm9uZShldmVudCwgaXNSb3RhdGVkKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRJbmRleEJhc2VkT25TaGlwUm90YXRpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNSb3RhdGVkKSByZXR1cm4gTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LngpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC55KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaXNFbXB0eVNsb3QgPSAhZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRyb3BwZWRcIilcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZ2V0SW5kZXhCYXNlZE9uU2hpcFJvdGF0aW9uKGV2ZW50KVxuXG4gICAgICAgICAgICByZXR1cm4gaXNFbXB0eVNsb3QgJiYgKChpbmRleCArIChzaGlwTGVuZ3RoIC0gMSkpIDw9IDkpXG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGxldCBbc2hpcE5hbWUsIHNoaXBMZW5ndGgsIGlzUm90YXRlZF0gPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIikuc3BsaXQoJywnKVxuXG4gICAgICAgIGlzUm90YXRlZCA9ICBpc1JvdGF0ZWQgPT09IFwiIGZhbHNlXCIgPyBmYWxzZSA6IHRydWVcblxuICAgICAgICBpZiAoaXNWYWxpZERyb3Bab25lKGV2ZW50LCBpc1JvdGF0ZWQpKSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChzaGlwTmFtZSwgXCJkcm9wcGVkXCIpXG4gICAgICAgICAgICBwb3B1bGF0ZU5leHRCb3goZXZlbnQudGFyZ2V0LCBzaGlwTGVuZ3RoLCBpc1JvdGF0ZWQpXG4gICAgICAgICAgICByZW1vdmVGcm9tU2hpcHlhcmQoc2hpcE5hbWUpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKVxuICAgICAgICBib2FyZC5udW1PZlNoaXBzUmVhZHkrK1xuXG4gICAgICAgIGlmIChib2FyZC5udW1PZlNoaXBzUmVhZHkgPT09IDUpIHRvZ2dsZUJlZ2luQmF0dGxlQnRuKCkgLy8gaWYgYWxsIHNoaXBzIGFyZSBwb3NpdGlvbmVkIG9uIHRoZSBib2FyZCwgdGhlbiBhbGxvdyB1c2VyIHRvIHN0YXJ0IHRoZSBnYW1lXG5cbiAgICAgICAgY29uc29sZS5sb2coYm9hcmQuZ2V0Qm9hcmQoKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc09jY3VwaWVkQm94KGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJvcHBlZFwiKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdMZWF2ZUhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZ0VudGVySGFuZGxlcihldmVudCkge1xuICAgICAgICBpZiAoIWlzT2NjdXBpZWRCb3goZXZlbnQpKSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIElkZW50aWZ5IGRyYWdnYWJsZSBzaGlwc1xuICAgIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKSBcbiAgICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib3gnKVxuXG5cbiAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZXZlbnQgPT4gZHJhZ1N0YXJ0SGFuZGxlcihldmVudCkpXG4gICAgICAgIC8vIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdcIiwgZXZlbnQgPT4gZHJhZ2dpbmdIYW5kbGVyKGV2ZW50KSlcbiAgICAgICAgLy8gc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBldmVudCA9PiBkcmFnRW5kSGFuZGxlcihldmVudCkpXG4gICAgfSlcblxuICAgIGJveGVzLmZvckVhY2goYm94ID0+IHtcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgZXZlbnQgPT4gZHJhZ0VudGVySGFuZGxlcihldmVudCkpXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZXZlbnQgPT4gZHJhZ092ZXJIYW5kbGVyKGV2ZW50KSlcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgZXZlbnQgPT4gZHJhZ0xlYXZlSGFuZGxlcihldmVudCkpXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBldmVudCA9PiBkcm9wSGFuZGxlcihldmVudCkpXG4gICAgfSlcblxufVxuXG5mdW5jdGlvbiBhbGxvd1JvdGF0ZSgpIHtcbiAgICBjb25zdCByb3RhdGFibGVTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3RhdGFibGUnKVxuXG4gICAgcm90YXRhYmxlU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4gcm90YXRlU2hpcChlLCBlLnRhcmdldC5kYXRhc2V0Lmxlbmd0aCkpXG4gICAgfSlcblxuXG4gICAgZnVuY3Rpb24gcm90YXRlU2hpcChlLCBzaGlwTGVuZ3RoKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5yb3RhdGVkID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUud2lkdGggPSBgY2FsYyh2YXIoLS1zaGlwQm94U2l6ZSkgKiAke3NoaXBMZW5ndGh9KWBcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmhlaWdodCA9IFwidmFyKC0tc2hpcEJveFNpemUpXCJcbiAgICAgICAgICAgIGUudGFyZ2V0LmRhdGFzZXQucm90YXRlZCA9IFwiZmFsc2VcIlxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS53aWR0aCA9IFwidmFyKC0tc2hpcEJveFNpemUpXCJcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmhlaWdodCA9IGBjYWxjKHZhcigtLXNoaXBCb3hTaXplKSAqICR7c2hpcExlbmd0aH0pYFxuICAgICAgICAgICAgZS50YXJnZXQuZGF0YXNldC5yb3RhdGVkID0gXCJ0cnVlXCJcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9nZ2xlQmVnaW5CYXR0bGVCdG4oKSB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLmJlZ2luQmF0dGxlJylcbiAgICBpZiAoIWJ0bi5zdHlsZS5kaXNwbGF5KSB7XG4gICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgICAgIGFsbG93R2FtZVN0YXJ0KGJ0bilcbiAgICB9XG4gICAgZWxzZSB7IGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnfVxufVxuXG5mdW5jdGlvbiByZXNldFNoaXBzKCkge1xuICAgIC8vIGRpc3BsYXkgc2hpcHMgYWdhaW5cbiAgICAvLyBhbGxvdyBkcmFnZ2FibGUgXG4gICAgLy8gZW1wdHkgdGhlIGJvYXJkIGFycmF5XG4gICAgLy8gZW1wdHkgdGhlIGJvYXJkIGdyaWRcbiAgICAvLyBoaWRlIGJlZ2luIGJhdHRsZSBidXR0b25cbn1cblxuZnVuY3Rpb24gYWxsb3dHYW1lU3RhcnQoYnRuKSB7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGJ1aWxkTWFpblNjcmVlbigpXG4gICAgICAgIHNob3dNYWluU2NyZWVuKClcbiAgICB9KVxuXG59XG5cbmZ1bmN0aW9uIHNob3dNYWluU2NyZWVuKCkge1xuICAgIGNvbnN0IGludHJvU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmludHJvJylcbiAgICBpbnRyb1NjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cbiAgICBjb25zdCBtYWluU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKVxuICAgIG1haW5TY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuICAgIFxuICAgIGNvbnN0IHBCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnRybyAucEJvYXJkJylcblxuICAgIGNvbnN0IHBsYXllclNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyU2lkZScpXG4gICAgcGxheWVyU2lkZS5hcHBlbmQocEJvYXJkKVxuXG4gICAgaW50cm9TY3JlZW4ucmVtb3ZlQ2hpbGQocEJvYXJkKVxufVxuXG5mdW5jdGlvbiBidWlsZE1haW5TY3JlZW4oKSB7XG4gICAgY29uc3QgYm90Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYkJvYXJkJylcbiAgICBjcmVhdGVCb2FyZENvbXBvbmVudChib3RCb2FyZClcblxuICAgIGNvbnN0IGJveFNpemVTdHlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJzpyb290JylcbiAgICBib3hTaXplU3R5bGUuc3R5bGUuc2V0UHJvcGVydHkoJy0tYm94U2l6ZScsICc1MHB4Jylcbn1cblxuZXhwb3J0IHsgYXBwbHlEcmFnRHJvcCwgYWxsb3dSb3RhdGUgfVxuXG5cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmRGYWN0b3J5J1xuXG5jbGFzcyBCb3Qge1xuICAgICNzdWNjZXNzZnVsQXR0YWNrO1xuICAgICNwcmV2aW91c0F0dGFjaztcbiAgICAjcG9zc2libGVTbWFydE1vdmVzO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLiNjcmVhdGVCb2FyZCgpXG4gICAgICAgIHRoaXMuI3ByZXZpb3VzQXR0YWNrID0gbnVsbFxuICAgICAgICB0aGlzLiNzdWNjZXNzZnVsQXR0YWNrID0gZmFsc2VcbiAgICAgICAgdGhpcy4jcG9zc2libGVTbWFydE1vdmVzID0gW1swLCAxXSwgWzAsIC0xXSwgWy0xLCAwXSwgWzEsIDBdXVxuICAgIH1cblxuICAgICNjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgY29uc3QgbmV3Qm9hcmQgPSBuZXcgR2FtZWJvYXJkXG4gICAgICAgIHJldHVybiBuZXdCb2FyZFxuICAgIH1cbiAgICBcbiAgICBnZXRDb29yZGluYXRlcyhlbmVteUdhbWVib2FyZCkge1xuICAgICAgICAvLyBwaWNrIGEgcmFuZG9tIHNwb3Qgd2l0aGluIHRoZSBib2FyZFxuICAgICAgICAvLyBzaG91bGQgYmUgYSB1bmlxdWUgY29vcmRpbmF0ZSBldmVyeSB0aW1lXG4gICAgICAgIC8vIGlmIHByZXZpb3VzIGNvb3JkaW5hdGUgd2FzIGEgaGl0LCBjaG9vc2UgYW4gYWRqYWNlbnQgY29vcmRpbmF0ZVxuICAgICAgICAvLyBpbXByb3ZlbWVudCAtLSBnZW5lcmF0ZSBuZXh0IGNvb3JkaW5hdGUgYmFzZWQgb24gYXZhaWxhYmxlIGVtcHR5IHNsb3RzIGluc3RlYWQgb2YgcmFuZG9tIHgveSBjb29yZHNcbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbU51bShtaW4sIG1heCkge1xuICAgICAgICAgICAgY29uc3QgbnVtID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtKVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNFbXB0eVBvc2l0aW9uKHgsIHksIGVuZW15Qm9hcmQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmVteUJvYXJkW3hdW3ldID09PSBudWxsXG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0aGlzLiNzdWNjZXNzZnVsQXR0YWNrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4jcG9zc2libGVTbWFydE1vdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbk9mZnNldCA9IHRoaXMuI3Bvc3NpYmxlU21hcnRNb3Zlcy5wb3AoKVxuICAgICAgICAgICAgICAgIGxldCB4Q29vcmQgPSB0aGlzLiNwcmV2aW91c0F0dGFja1swXSArIHBvc2l0aW9uT2Zmc2V0WzBdXG4gICAgICAgICAgICAgICAgbGV0IHlDb29yZCA9IHRoaXMuI3ByZXZpb3VzQXR0YWNrWzFdICsgcG9zaXRpb25PZmZzZXRbMV1cblxuICAgICAgICAgICAgICAgIHJldHVybiBbeENvb3JkLCB5Q29vcmRdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeENvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG4gICAgICAgIGxldCB5Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcblxuICAgICAgICB3aGlsZSAoIWlzRW1wdHlQb3NpdGlvbih4Q29vcmQsIHlDb29yZCwgZW5lbXlHYW1lYm9hcmQuZ2V0Qm9hcmQoKSkpIHtcbiAgICAgICAgICAgIHhDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5KVxuICAgICAgICAgICAgeUNvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBbeENvb3JkLCB5Q29vcmRdXG4gICAgfVxuXG5cbiAgICBhdHRhY2tFbmVteShjb29yZGluYXRlc0FyciwgZW5lbXlCb2FyZCkge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBbLi4uY29vcmRpbmF0ZXNBcnJdIFxuICAgICAgICBjb25zdCBhdHRhY2tGZWVkYmFjayA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KVxuICAgICAgICBpZiAoYXR0YWNrRmVlZGJhY2sgPT09IFwiSXQncyBhIGhpdCFcIikge1xuICAgICAgICAgICAgdGhpcy4jc3RvcmVQcmV2aW91c0F0dGFjayhjb29yZGluYXRlc0FyciwgdHJ1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuI3N0b3JlUHJldmlvdXNBdHRhY2soY29vcmRpbmF0ZXNBcnIsIGZhbHNlKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdHRhY2tGZWVkYmFja1xuICAgIH1cblxuICAgIHZpZXdCb2FyZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmQuZ2V0Qm9hcmQoKVxuICAgIH1cblxuICAgICNzdG9yZVByZXZpb3VzQXR0YWNrKGNvb3JkaW5hdGVzQXJyLCBlbmVteVdhc0hpdCkge1xuICAgICAgICB0aGlzLiNwcmV2aW91c0F0dGFjayA9IGNvb3JkaW5hdGVzQXJyXG4gICAgICAgIHRoaXMuI3N1Y2Nlc3NmdWxBdHRhY2sgPSBlbmVteVdhc0hpdFxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBCb3QiLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXBGYWN0b3J5J1xuXG5jbGFzcyBHYW1lYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhcnJpZXIgPSB0aGlzLiNjcmVhdGVTaGlwKCdjYXJyaWVyJywgNSlcbiAgICAgICAgdGhpcy5iYXR0bGVzaGlwID0gdGhpcy4jY3JlYXRlU2hpcCgnYmF0dGxlc2hpcCcsIDQpXG4gICAgICAgIHRoaXMuY3J1aXNlciA9IHRoaXMuI2NyZWF0ZVNoaXAoJ2NydWlzZXInLCAzKVxuICAgICAgICB0aGlzLnN1Ym1hcmluZSA9IHRoaXMuI2NyZWF0ZVNoaXAoJ3N1Ym1hcmluZScsIDMpXG4gICAgICAgIHRoaXMuZGVzdHJveWVyID0gdGhpcy4jY3JlYXRlU2hpcCgnZGVzdHJveWVyJywgMilcbiAgICAgICAgdGhpcy5ib2FyZCA9IHRoaXMuI2NyZWF0ZUJvYXJkKClcbiAgICAgICAgdGhpcy5taXNzZWRBdHRhY2tzID0gW11cbiAgICAgICAgdGhpcy5zdWNjZXNzZnVsQXR0YWNrcyA9IFtdXG4gICAgICAgIHRoaXMubnVtT2ZTaGlwc1JlYWR5ID0gMDtcbiAgICB9XG5cbiAgICAjY3JlYXRlQm9hcmQoKSB7XG4gICAgICAgIGxldCBib2FyZCA9IFtdXG4gICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8PSA5IDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcm93ID0gW11cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8PSA5IDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcm93LnB1c2gobnVsbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvYXJkLnB1c2gocm93KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib2FyZFxuICAgIH1cbiAgICBcblxuICAgICNjcmVhdGVTaGlwKG5hbWUsIGxlbmd0aCkge1xuICAgICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobmFtZSwgbGVuZ3RoKVxuICAgICAgICByZXR1cm4gc2hpcFxuICAgIH1cblxuICAgICNnZXRBbGxTaGlwcygpIHtcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBbXG4gICAgICAgICAgICB0aGlzLmNhcnJpZXIsIFxuICAgICAgICAgICAgdGhpcy5iYXR0bGVzaGlwLCBcbiAgICAgICAgICAgIHRoaXMuY3J1aXNlciwgXG4gICAgICAgICAgICB0aGlzLnN1Ym1hcmluZSwgXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3llclxuICAgICAgICBdXG4gICAgICAgIHJldHVybiBzaGlwc1xuICAgIH1cblxuICAgIHBvc2l0aW9uU2hpcCh4LCB5LCBzaGlwTmFtZSkgeyAvLyBwb3NpdGlvbiBzaGlwIGF0IHgseSBjb29yZGluYXRlc1xuICAgICAgICB0aGlzLnVwZGF0ZUJvYXJkQXJyYXkoTnVtYmVyKHgpLCBOdW1iZXIoeSksIHNoaXBOYW1lKVxuICAgIH1cblxuXG4gICAgdXBkYXRlQm9hcmRBcnJheSh4LCB5LCBzaGlwTmFtZSkge1xuICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gc2hpcE5hbWVcbiAgICB9ICBcblxuICAgIGdldEJvYXJkKCkge1xuICAgICAgICBjb25zdCBib2FyZENvcHkgPSBbLi4udGhpcy5ib2FyZF1cbiAgICAgICAgcmV0dXJuIGJvYXJkQ29weVxuICAgIH1cblxuICAgIGdldE1pc3NlZEF0dGFja3MoKSB7XG4gICAgICAgIGNvbnN0IG1pc3NlZEF0dGFja0FyckNvcHkgPSBbLi4udGhpcy5taXNzZWRBdHRhY2tzXVxuICAgICAgICByZXR1cm4gbWlzc2VkQXR0YWNrQXJyQ29weVxuICAgIH1cblxuICAgIGdldFN1Y2Nlc3NmdWxBdHRhY2tzKCkge1xuICAgICAgICBjb25zdCBzdWNjZXNzZnVsQXR0YWNrQXJyQ29weSA9IFsuLi50aGlzLnN1Y2Nlc3NmdWxBdHRhY2tzXVxuICAgICAgICByZXR1cm4gc3VjY2Vzc2Z1bEF0dGFja0FyckNvcHlcbiAgICB9XG5cbiAgICAjc3RvcmVNaXNzZWRBdHRhY2soeCwgeSkge1xuICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MucHVzaChbeCx5XSlcbiAgICB9XG5cbiAgICAjc3RvcmVTdWNjZXNzZnVsQXR0YWNrKHgsIHkpIHtcbiAgICAgICAgdGhpcy5zdWNjZXNzZnVsQXR0YWNrcy5wdXNoKFt4LCB5XSlcbiAgICB9XG5cbiAgICAjaXNWYWxpZEF0dGFjayh4LCB5KSB7XG4gICAgICAgIC8vIGFsbCBzaG91bGQgYmUgdHJ1ZVxuICAgICAgICBjb25zdCB1bmlxdWVNaXNzZWRBdHRhY2sgPSAhdGhpcy5nZXRNaXNzZWRBdHRhY2tzKCkuaW5jbHVkZXMoW3gsIHldKVxuICAgICAgICBjb25zdCB1bmlxdWVTdWNjZXNzZnVsQXR0YWNrID0gIXRoaXMuZ2V0U3VjY2Vzc2Z1bEF0dGFja3MoKS5pbmNsdWRlcyhbeCwgeV0pIFxuICAgICAgICBjb25zdCB2YWxpZENvb3JkaW5hdGVzID0gKHggPj0gMCAmJiB4IDw9IDkpICYmICh5ID49IDAgJiYgeSA8PSA5KVxuXG4gICAgICAgIHJldHVybiB1bmlxdWVNaXNzZWRBdHRhY2sgJiYgdW5pcXVlU3VjY2Vzc2Z1bEF0dGFjayAmJiB2YWxpZENvb3JkaW5hdGVzXG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgc2hpcCBhdCBbeCwgeV0gY29vcmRpbmF0ZXNcbiAgICAgICAgLy8gaWYgeWVzLCBhcHBseSBkYW1hZ2UgdG8gdGhpcy5zaGlwICYgcmVjb3JkIHN1Y2Nlc3NmdWwgYXR0YWNrXG4gICAgICAgIC8vIGlmIG5vdCwgcmVjb3JkIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgbWlzc2VkIGF0dGFja1xuXG4gICAgICAgIGlmICh0aGlzLiNpc1ZhbGlkQXR0YWNrKHgsIHkpKSB7XG4gICAgICAgICAgICBjb25zdCBib2FyZCA9IHRoaXMuZ2V0Qm9hcmQoKVxuICAgICAgICAgICAgY29uc3Qgc2hpcHMgPSB7XG4gICAgICAgICAgICAgICAgJ2NhcnJpZXInOiB0aGlzLmNhcnJpZXIsIFxuICAgICAgICAgICAgICAgICdiYXR0bGVzaGlwJzogdGhpcy5iYXR0bGVzaGlwLCBcbiAgICAgICAgICAgICAgICAnY3J1aXNlcic6IHRoaXMuY3J1aXNlciwgXG4gICAgICAgICAgICAgICAgJ3N1Ym1hcmluZSc6IHRoaXMuc3VibWFyaW5lLCBcbiAgICAgICAgICAgICAgICAnZGVzdHJveWVyJzogdGhpcy5kZXN0cm95ZXJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJvYXJkW3hdW3ldICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2hpcHNbYm9hcmRbeF1beV1dLmhpdCgpXG4gICAgICAgICAgICAgICAgdGhpcy4jc3RvcmVTdWNjZXNzZnVsQXR0YWNrKHgsIHkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiSXQncyBhIGhpdCFcIlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiNzdG9yZU1pc3NlZEF0dGFjayh4LCB5KVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkl0J3MgYSBtaXNzIVwiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHJldHVybiAnSW52YWxpZCBhdHRhY2snXG4gICAgfVxuXG4gICAgYXJlQWxsU2hpcHNTdW5rKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRTdWNjZXNzZnVsQXR0YWNrcygpLmxlbmd0aCA+PSAxNykge1xuICAgICAgICAgICAgY29uc3Qgc2hpcHMgPSB0aGlzLiNnZXRBbGxTaGlwcygpXG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuc3VuayA9PT0gdHJ1ZSlcblxuICAgICAgICAgICAgaWYgKHN0YXR1cykgY29uc29sZS5sb2coJ0FsbCBzaGlwcyBoYXZlIHN1bmshISEnKVxuXG4gICAgICAgICAgICByZXR1cm4gc3RhdHVzXG4gICAgICAgICAgICBcbiAgICAgICAgfSByZXR1cm4gZmFsc2VcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZEZhY3RvcnknXG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLiNjcmVhdGVCb2FyZCgpXG4gICAgfVxuXG4gICAgI2NyZWF0ZUJvYXJkKCkge1xuICAgICAgICBjb25zdCBuZXdCb2FyZCA9IG5ldyBHYW1lYm9hcmRcbiAgICAgICAgcmV0dXJuIG5ld0JvYXJkXG4gICAgfVxuXG4gICAgYXR0YWNrRW5lbXkoY29vcmRpbmF0ZXNBcnIsIGVuZW15Qm9hcmQpIHtcbiAgICAgICAgY29uc3QgW3gsIHldID0gWy4uLmNvb3JkaW5hdGVzQXJyXSBcbiAgICAgICAgY29uc3QgYXR0YWNrRmVlZGJhY2sgPSBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSlcbiAgICAgICAgcmV0dXJuIGF0dGFja0ZlZWRiYWNrXG4gICAgfVxuXG4gICAgdmlld0JvYXJkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib2FyZC5nZXRCb2FyZCgpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXIiLCJjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZSxcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMDtcbiAgICAgICAgdGhpcy5zdW5rID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaGl0KCkge1xuICAgICAgICB0aGlzLmRhbWFnZSA9IHRoaXMuZGFtYWdlICsgMVxuICAgICAgICB0aGlzLiNpc1N1bmsoKVxuICAgIH1cblxuICAgICNzZXRTaGlwQXNTdW5rKCkge1xuICAgICAgICB0aGlzLnN1bmsgPSB0cnVlXG4gICAgfVxuXG4gICAgI2lzU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGFtYWdlID09PSB0aGlzLmxlbmd0aCkgdGhpcy4jc2V0U2hpcEFzU3VuaygpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY3JlYXRlQm9hcmRDb21wb25lbnQgZnJvbSBcIi4vY29tcG9uZW50cy9nYW1lYm9hcmRVSVwiXG5pbXBvcnQgeyBhcHBseURyYWdEcm9wLCBhbGxvd1JvdGF0ZSB9IGZyb20gXCIuL2V2ZW50TGlzdGVuZXJzXCJcbmltcG9ydCBCb3QgZnJvbSBcIi4vZmFjdG9yaWVzL2JvdEZhY3RvcnlcIlxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9mYWN0b3JpZXMvcGxheWVyRmFjdG9yeVwiXG5cbi8vIGdhbWVib2FyZCBVSVxuY29uc3QgcEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBCb2FyZCcpXG5jcmVhdGVCb2FyZENvbXBvbmVudChwQm9hcmQpXG5cbi8vIGNyZWF0ZSBwbGF5ZXIgYW5kIGJvdCBnYW1lYm9hcmRcbmNvbnN0IHAxID0gbmV3IFBsYXllclxuY29uc3QgYm90ID0gbmV3IEJvdFxuY29uc29sZS5sb2cocDEudmlld0JvYXJkKCkpXG5cblxuLy8gYWN0aXZhdGUgZXZlbnQgbGlzdGVuZXJzXG5hcHBseURyYWdEcm9wKHAxLmJvYXJkKVxuYWxsb3dSb3RhdGUoKVxuXG5cbmV4cG9ydCBkZWZhdWx0IHAxXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==