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
/* harmony export */   applyDragDrop: () => (/* binding */ applyDragDrop)
/* harmony export */ });
/* harmony import */ var _components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/gameboardUI */ "./src/components/gameboardUI.js");


// DRAG N DROP
function applyDragDrop(board) {
    allowRotate()

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

        function isValidDropZone(event, shipLength, isRotated) {

            function getIndexBasedOnShipRotation(event) {
                if (isRotated) return Number(event.target.dataset.x)
                return Number(event.target.dataset.y)
            }
            
            function areEmptySlots(boxElement, shipLength, index, isRotated) {
                if (boxElement.classList.contains("dropped")) return false
                if (boxElement === null) return false

                if (shipLength === 1) return true

                let nextBoxElement;

                if (isRotated) {
                    const x = Number(boxElement.dataset.x)
                    nextBoxElement = document.querySelector(`[data-x="${x+1}"][data-y="${boxElement.dataset.y}"]`)
                } else {
                    const y = Number(boxElement.dataset.y)
                    nextBoxElement = document.querySelector(`[data-x="${boxElement.dataset.x}"][data-y="${y+1}"]`)
                }
                shipLength--
                return areEmptySlots(nextBoxElement, shipLength, index, isRotated)
            }
            
            const index = getIndexBasedOnShipRotation(event)

            const validIndices = (index + (shipLength - 1)) <= 9
            if (!validIndices) return false

            const emptySlots = areEmptySlots(event.target, shipLength, index, isRotated)
            return emptySlots
        }

        event.preventDefault()
        let [shipName, shipLength, isRotated] = event.dataTransfer.getData("text").split(',')

        isRotated =  isRotated === " false" ? false : true

        if (isValidDropZone(event, shipLength, isRotated)) {
            event.target.classList.add(shipName, "dropped")
            populateNextBox(event.target, shipLength, isRotated)
            removeFromShipyard(shipName)
            board.numOfShipsReady++

            // if all ships are positioned on the board, then allow user to start the game
            if (board.numOfShipsReady === 5) toggleBeginBattleBtn()
        }
        event.target.classList.remove("hovered")
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
        createBotBoardUI()
        showMainScreen()
        updateBoardSizes()
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

function createBotBoardUI() {
    const botBoard = document.querySelector('.bBoard')
    ;(0,_components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__["default"])(botBoard)



}

function updateBoardSizes() {
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

    chooseShipPositioning() {
        
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
console.log(bot.viewBoard())


// activate event listeners
;(0,_eventListeners__WEBPACK_IMPORTED_MODULE_1__.applyDragDrop)(p1.board)



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (p1);


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O0FBRUEsaUVBQWU7Ozs7OztVQ3RCZjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjJEO0FBQ1g7QUFDUjtBQUNNOztBQUU5QztBQUNBO0FBQ0Esb0VBQW9COztBQUVwQjtBQUNBLGVBQWUsZ0VBQU07QUFDckIsZ0JBQWdCLDZEQUFHO0FBQ25CO0FBQ0E7OztBQUdBO0FBQ0EsK0RBQWE7Ozs7QUFJYixpRUFBZSxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2dhbWVib2FyZFVJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvYm90RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlQm9hcmRDb21wb25lbnQocGFyZW50Q29udGFpbmVyKSB7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVZSGVhZGVyKCkge1xuICAgICAgICBjb25zdCB5SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgeUhlYWRlci5jbGFzc0xpc3QuYWRkKCdib2FyZFlIZWFkZXInKVxuICAgICAgICBjb25zdCBsZXR0ZXJzID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRicsICdHJywgJ0gnLCAnSScsICdKJ11cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gOTsgeSsrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ2JveEhlYWRlcicpXG4gICAgICAgICAgICBib3guaW5uZXJUZXh0ID0gbGV0dGVyc1t5XSBcbiAgICAgICAgICAgIHlIZWFkZXIuYXBwZW5kKGJveClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geUhlYWRlclxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVhIZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IHhIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB4SGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkWEhlYWRlcicpXG5cbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPD0gOTsgeCsrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ2JveEhlYWRlcicpXG4gICAgICAgICAgICBib3guaW5uZXJUZXh0ID0geCArIDEgLy8gb2Zmc2V0IGZvciB6ZXJvIGluZGV4aW5nXG4gICAgICAgICAgICB4SGVhZGVyLmFwcGVuZChib3gpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHhIZWFkZXJcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgdG9wLWxldmVsIGNvbnRhaW5lcnNcbiAgICBjb25zdCBjaGlsZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY2hpbGRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmRDb250YWluZXInKVxuXG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkR3JpZCcpXG5cbiAgICAvLyBjcmVhdGUgYm9hcmQgZ3JpZHNcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSA5OyB4KyspIHtcbiAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ3JvdycpXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IDk7IHkrKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCdib3gnKVxuICAgICAgICAgICAgYm94LmRhdGFzZXQueCA9IHhcbiAgICAgICAgICAgIGJveC5kYXRhc2V0LnkgPSB5XG4gICAgICAgICAgICByb3cuYXBwZW5kKGJveClcbiAgICAgICAgfVxuICAgICAgICBib2FyZC5hcHBlbmQocm93KVxuICAgIH1cblxuXG4gICAgLy8gYXBwZW5kIHRvIGNvbnRhaW5lcnNcbiAgICBjaGlsZENvbnRhaW5lci5hcHBlbmQoY3JlYXRlWEhlYWRlcigpLCBjcmVhdGVZSGVhZGVyKCksIGJvYXJkKVxuICAgIHBhcmVudENvbnRhaW5lci5hcHBlbmQoY2hpbGRDb250YWluZXIpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUJvYXJkQ29tcG9uZW50IiwiaW1wb3J0IGNyZWF0ZUJvYXJkQ29tcG9uZW50IGZyb20gXCIuL2NvbXBvbmVudHMvZ2FtZWJvYXJkVUlcIjtcblxuLy8gRFJBRyBOIERST1BcbmZ1bmN0aW9uIGFwcGx5RHJhZ0Ryb3AoYm9hcmQpIHtcbiAgICBhbGxvd1JvdGF0ZSgpXG5cbiAgICBmdW5jdGlvbiBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZHJhZ2dpbmdcIiwgZXZlbnQudGFyZ2V0LmlkLCBcIi4uLlwiKVxuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgYCR7ZXZlbnQudGFyZ2V0LmlkfSwke2V2ZW50LnRhcmdldC5kYXRhc2V0Lmxlbmd0aH0sICR7ZXZlbnQudGFyZ2V0LmRhdGFzZXQucm90YXRlZH1gKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdPdmVySGFuZGxlcihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJvcEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgZnVuY3Rpb24gcG9wdWxhdGVOZXh0Qm94KGJveEVsZW1lbnQsIHJlcGVhdCwgaXNSb3RhdGVkKSB7XG4gICAgICAgICAgICBpZiAocmVwZWF0ID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJveEVsZW1lbnQuY2xhc3NMaXN0LmFkZChzaGlwTmFtZSwgXCJkcm9wcGVkXCIpXG4gICAgICAgICAgICBib2FyZC5wb3NpdGlvblNoaXAoYm94RWxlbWVudC5kYXRhc2V0LngsIGJveEVsZW1lbnQuZGF0YXNldC55LCBzaGlwTmFtZSlcbiAgICAgICAgICAgIHJlcGVhdCAtLVxuXG4gICAgICAgICAgICBpZiAoaXNSb3RhdGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IE51bWJlcihib3hFbGVtZW50LmRhdGFzZXQueClcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD1cIiR7eCsxfVwiXVtkYXRhLXk9XCIke2JveEVsZW1lbnQuZGF0YXNldC55fVwiXWApXG4gICAgICAgICAgICAgICAgcG9wdWxhdGVOZXh0Qm94KG5leHREaXYsIHJlcGVhdCwgaXNSb3RhdGVkKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZU5leHRCb3goYm94RWxlbWVudC5uZXh0U2libGluZywgcmVwZWF0LCBpc1JvdGF0ZWQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZW1vdmVGcm9tU2hpcHlhcmQoc2hpcE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtzaGlwTmFtZX1gKVxuICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwicm90YXRhYmxlXCIpXG4gICAgICAgICAgICBzaGlwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgIHNoaXAuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAnZmFsc2UnKVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNWYWxpZERyb3Bab25lKGV2ZW50LCBzaGlwTGVuZ3RoLCBpc1JvdGF0ZWQpIHtcblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0SW5kZXhCYXNlZE9uU2hpcFJvdGF0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUm90YXRlZCkgcmV0dXJuIE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC54KVxuICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZnVuY3Rpb24gYXJlRW1wdHlTbG90cyhib3hFbGVtZW50LCBzaGlwTGVuZ3RoLCBpbmRleCwgaXNSb3RhdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJveEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJvcHBlZFwiKSkgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgaWYgKGJveEVsZW1lbnQgPT09IG51bGwpIHJldHVybiBmYWxzZVxuXG4gICAgICAgICAgICAgICAgaWYgKHNoaXBMZW5ndGggPT09IDEpIHJldHVybiB0cnVlXG5cbiAgICAgICAgICAgICAgICBsZXQgbmV4dEJveEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNSb3RhdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHggPSBOdW1iZXIoYm94RWxlbWVudC5kYXRhc2V0LngpXG4gICAgICAgICAgICAgICAgICAgIG5leHRCb3hFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD1cIiR7eCsxfVwiXVtkYXRhLXk9XCIke2JveEVsZW1lbnQuZGF0YXNldC55fVwiXWApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeSA9IE51bWJlcihib3hFbGVtZW50LmRhdGFzZXQueSlcbiAgICAgICAgICAgICAgICAgICAgbmV4dEJveEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PVwiJHtib3hFbGVtZW50LmRhdGFzZXQueH1cIl1bZGF0YS15PVwiJHt5KzF9XCJdYClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2hpcExlbmd0aC0tXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZUVtcHR5U2xvdHMobmV4dEJveEVsZW1lbnQsIHNoaXBMZW5ndGgsIGluZGV4LCBpc1JvdGF0ZWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZ2V0SW5kZXhCYXNlZE9uU2hpcFJvdGF0aW9uKGV2ZW50KVxuXG4gICAgICAgICAgICBjb25zdCB2YWxpZEluZGljZXMgPSAoaW5kZXggKyAoc2hpcExlbmd0aCAtIDEpKSA8PSA5XG4gICAgICAgICAgICBpZiAoIXZhbGlkSW5kaWNlcykgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgICAgIGNvbnN0IGVtcHR5U2xvdHMgPSBhcmVFbXB0eVNsb3RzKGV2ZW50LnRhcmdldCwgc2hpcExlbmd0aCwgaW5kZXgsIGlzUm90YXRlZClcbiAgICAgICAgICAgIHJldHVybiBlbXB0eVNsb3RzXG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGxldCBbc2hpcE5hbWUsIHNoaXBMZW5ndGgsIGlzUm90YXRlZF0gPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIikuc3BsaXQoJywnKVxuXG4gICAgICAgIGlzUm90YXRlZCA9ICBpc1JvdGF0ZWQgPT09IFwiIGZhbHNlXCIgPyBmYWxzZSA6IHRydWVcblxuICAgICAgICBpZiAoaXNWYWxpZERyb3Bab25lKGV2ZW50LCBzaGlwTGVuZ3RoLCBpc1JvdGF0ZWQpKSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChzaGlwTmFtZSwgXCJkcm9wcGVkXCIpXG4gICAgICAgICAgICBwb3B1bGF0ZU5leHRCb3goZXZlbnQudGFyZ2V0LCBzaGlwTGVuZ3RoLCBpc1JvdGF0ZWQpXG4gICAgICAgICAgICByZW1vdmVGcm9tU2hpcHlhcmQoc2hpcE5hbWUpXG4gICAgICAgICAgICBib2FyZC5udW1PZlNoaXBzUmVhZHkrK1xuXG4gICAgICAgICAgICAvLyBpZiBhbGwgc2hpcHMgYXJlIHBvc2l0aW9uZWQgb24gdGhlIGJvYXJkLCB0aGVuIGFsbG93IHVzZXIgdG8gc3RhcnQgdGhlIGdhbWVcbiAgICAgICAgICAgIGlmIChib2FyZC5udW1PZlNoaXBzUmVhZHkgPT09IDUpIHRvZ2dsZUJlZ2luQmF0dGxlQnRuKClcbiAgICAgICAgfVxuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIilcbiAgICAgICAgY29uc29sZS5sb2coYm9hcmQuZ2V0Qm9hcmQoKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc09jY3VwaWVkQm94KGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJvcHBlZFwiKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdMZWF2ZUhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZ0VudGVySGFuZGxlcihldmVudCkge1xuICAgICAgICBpZiAoIWlzT2NjdXBpZWRCb3goZXZlbnQpKSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIElkZW50aWZ5IGRyYWdnYWJsZSBzaGlwc1xuICAgIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKSBcbiAgICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib3gnKVxuXG5cbiAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZXZlbnQgPT4gZHJhZ1N0YXJ0SGFuZGxlcihldmVudCkpXG4gICAgICAgIC8vIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdcIiwgZXZlbnQgPT4gZHJhZ2dpbmdIYW5kbGVyKGV2ZW50KSlcbiAgICAgICAgLy8gc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBldmVudCA9PiBkcmFnRW5kSGFuZGxlcihldmVudCkpXG4gICAgfSlcblxuICAgIGJveGVzLmZvckVhY2goYm94ID0+IHtcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgZXZlbnQgPT4gZHJhZ0VudGVySGFuZGxlcihldmVudCkpXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZXZlbnQgPT4gZHJhZ092ZXJIYW5kbGVyKGV2ZW50KSlcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgZXZlbnQgPT4gZHJhZ0xlYXZlSGFuZGxlcihldmVudCkpXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBldmVudCA9PiBkcm9wSGFuZGxlcihldmVudCkpXG4gICAgfSlcblxufVxuXG5mdW5jdGlvbiBhbGxvd1JvdGF0ZSgpIHtcbiAgICBjb25zdCByb3RhdGFibGVTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3RhdGFibGUnKVxuXG4gICAgcm90YXRhYmxlU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4gcm90YXRlU2hpcChlLCBlLnRhcmdldC5kYXRhc2V0Lmxlbmd0aCkpXG4gICAgfSlcblxuXG4gICAgZnVuY3Rpb24gcm90YXRlU2hpcChlLCBzaGlwTGVuZ3RoKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5yb3RhdGVkID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUud2lkdGggPSBgY2FsYyh2YXIoLS1zaGlwQm94U2l6ZSkgKiAke3NoaXBMZW5ndGh9KWBcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmhlaWdodCA9IFwidmFyKC0tc2hpcEJveFNpemUpXCJcbiAgICAgICAgICAgIGUudGFyZ2V0LmRhdGFzZXQucm90YXRlZCA9IFwiZmFsc2VcIlxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS53aWR0aCA9IFwidmFyKC0tc2hpcEJveFNpemUpXCJcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmhlaWdodCA9IGBjYWxjKHZhcigtLXNoaXBCb3hTaXplKSAqICR7c2hpcExlbmd0aH0pYFxuICAgICAgICAgICAgZS50YXJnZXQuZGF0YXNldC5yb3RhdGVkID0gXCJ0cnVlXCJcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9nZ2xlQmVnaW5CYXR0bGVCdG4oKSB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLmJlZ2luQmF0dGxlJylcbiAgICBpZiAoIWJ0bi5zdHlsZS5kaXNwbGF5KSB7XG4gICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgICAgIGFsbG93R2FtZVN0YXJ0KGJ0bilcbiAgICB9XG4gICAgZWxzZSB7IGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnfVxufVxuXG5mdW5jdGlvbiByZXNldFNoaXBzKCkge1xuICAgIC8vIGRpc3BsYXkgc2hpcHMgYWdhaW5cbiAgICAvLyBhbGxvdyBkcmFnZ2FibGUgXG4gICAgLy8gZW1wdHkgdGhlIGJvYXJkIGFycmF5XG4gICAgLy8gZW1wdHkgdGhlIGJvYXJkIGdyaWRcbiAgICAvLyBoaWRlIGJlZ2luIGJhdHRsZSBidXR0b25cbn1cblxuZnVuY3Rpb24gYWxsb3dHYW1lU3RhcnQoYnRuKSB7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGNyZWF0ZUJvdEJvYXJkVUkoKVxuICAgICAgICBzaG93TWFpblNjcmVlbigpXG4gICAgICAgIHVwZGF0ZUJvYXJkU2l6ZXMoKVxuICAgIH0pXG5cbn1cblxuZnVuY3Rpb24gc2hvd01haW5TY3JlZW4oKSB7XG4gICAgY29uc3QgaW50cm9TY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW50cm8nKVxuICAgIGludHJvU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblxuICAgIGNvbnN0IG1haW5TY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpXG4gICAgbWFpblNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgXG4gICAgY29uc3QgcEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmludHJvIC5wQm9hcmQnKVxuXG4gICAgY29uc3QgcGxheWVyU2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJTaWRlJylcbiAgICBwbGF5ZXJTaWRlLmFwcGVuZChwQm9hcmQpXG5cbiAgICBpbnRyb1NjcmVlbi5yZW1vdmVDaGlsZChwQm9hcmQpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvdEJvYXJkVUkoKSB7XG4gICAgY29uc3QgYm90Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYkJvYXJkJylcbiAgICBjcmVhdGVCb2FyZENvbXBvbmVudChib3RCb2FyZClcblxuXG5cbn1cblxuZnVuY3Rpb24gdXBkYXRlQm9hcmRTaXplcygpIHtcbiAgICBjb25zdCBib3hTaXplU3R5bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCc6cm9vdCcpXG4gICAgYm94U2l6ZVN0eWxlLnN0eWxlLnNldFByb3BlcnR5KCctLWJveFNpemUnLCAnNTBweCcpXG59XG5cbmV4cG9ydCB7IGFwcGx5RHJhZ0Ryb3AgfVxuXG5cbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmRGYWN0b3J5J1xuXG5jbGFzcyBCb3Qge1xuICAgICNzdWNjZXNzZnVsQXR0YWNrO1xuICAgICNwcmV2aW91c0F0dGFjaztcbiAgICAjcG9zc2libGVTbWFydE1vdmVzO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLiNjcmVhdGVCb2FyZCgpXG4gICAgICAgIHRoaXMuI3ByZXZpb3VzQXR0YWNrID0gbnVsbFxuICAgICAgICB0aGlzLiNzdWNjZXNzZnVsQXR0YWNrID0gZmFsc2VcbiAgICAgICAgdGhpcy4jcG9zc2libGVTbWFydE1vdmVzID0gW1swLCAxXSwgWzAsIC0xXSwgWy0xLCAwXSwgWzEsIDBdXVxuICAgIH1cblxuICAgICNjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgY29uc3QgbmV3Qm9hcmQgPSBuZXcgR2FtZWJvYXJkXG4gICAgICAgIHJldHVybiBuZXdCb2FyZFxuICAgIH1cbiAgICBcbiAgICBnZXRDb29yZGluYXRlcyhlbmVteUdhbWVib2FyZCkge1xuICAgICAgICAvLyBwaWNrIGEgcmFuZG9tIHNwb3Qgd2l0aGluIHRoZSBib2FyZFxuICAgICAgICAvLyBzaG91bGQgYmUgYSB1bmlxdWUgY29vcmRpbmF0ZSBldmVyeSB0aW1lXG4gICAgICAgIC8vIGlmIHByZXZpb3VzIGNvb3JkaW5hdGUgd2FzIGEgaGl0LCBjaG9vc2UgYW4gYWRqYWNlbnQgY29vcmRpbmF0ZVxuICAgICAgICAvLyBpbXByb3ZlbWVudCAtLSBnZW5lcmF0ZSBuZXh0IGNvb3JkaW5hdGUgYmFzZWQgb24gYXZhaWxhYmxlIGVtcHR5IHNsb3RzIGluc3RlYWQgb2YgcmFuZG9tIHgveSBjb29yZHNcbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbU51bShtaW4sIG1heCkge1xuICAgICAgICAgICAgY29uc3QgbnVtID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IobnVtKVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNFbXB0eVBvc2l0aW9uKHgsIHksIGVuZW15Qm9hcmQpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmVteUJvYXJkW3hdW3ldID09PSBudWxsXG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0aGlzLiNzdWNjZXNzZnVsQXR0YWNrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4jcG9zc2libGVTbWFydE1vdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbk9mZnNldCA9IHRoaXMuI3Bvc3NpYmxlU21hcnRNb3Zlcy5wb3AoKVxuICAgICAgICAgICAgICAgIGxldCB4Q29vcmQgPSB0aGlzLiNwcmV2aW91c0F0dGFja1swXSArIHBvc2l0aW9uT2Zmc2V0WzBdXG4gICAgICAgICAgICAgICAgbGV0IHlDb29yZCA9IHRoaXMuI3ByZXZpb3VzQXR0YWNrWzFdICsgcG9zaXRpb25PZmZzZXRbMV1cblxuICAgICAgICAgICAgICAgIHJldHVybiBbeENvb3JkLCB5Q29vcmRdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeENvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG4gICAgICAgIGxldCB5Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcblxuICAgICAgICB3aGlsZSAoIWlzRW1wdHlQb3NpdGlvbih4Q29vcmQsIHlDb29yZCwgZW5lbXlHYW1lYm9hcmQuZ2V0Qm9hcmQoKSkpIHtcbiAgICAgICAgICAgIHhDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5KVxuICAgICAgICAgICAgeUNvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBbeENvb3JkLCB5Q29vcmRdXG4gICAgfVxuXG5cbiAgICBhdHRhY2tFbmVteShjb29yZGluYXRlc0FyciwgZW5lbXlCb2FyZCkge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBbLi4uY29vcmRpbmF0ZXNBcnJdIFxuICAgICAgICBjb25zdCBhdHRhY2tGZWVkYmFjayA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KVxuICAgICAgICBpZiAoYXR0YWNrRmVlZGJhY2sgPT09IFwiSXQncyBhIGhpdCFcIikge1xuICAgICAgICAgICAgdGhpcy4jc3RvcmVQcmV2aW91c0F0dGFjayhjb29yZGluYXRlc0FyciwgdHJ1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuI3N0b3JlUHJldmlvdXNBdHRhY2soY29vcmRpbmF0ZXNBcnIsIGZhbHNlKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdHRhY2tGZWVkYmFja1xuICAgIH1cblxuICAgIHZpZXdCb2FyZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmQuZ2V0Qm9hcmQoKVxuICAgIH1cblxuICAgICNzdG9yZVByZXZpb3VzQXR0YWNrKGNvb3JkaW5hdGVzQXJyLCBlbmVteVdhc0hpdCkge1xuICAgICAgICB0aGlzLiNwcmV2aW91c0F0dGFjayA9IGNvb3JkaW5hdGVzQXJyXG4gICAgICAgIHRoaXMuI3N1Y2Nlc3NmdWxBdHRhY2sgPSBlbmVteVdhc0hpdFxuICAgIH1cblxuICAgIGNob29zZVNoaXBQb3NpdGlvbmluZygpIHtcbiAgICAgICAgXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJvdCIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcEZhY3RvcnknXG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FycmllciA9IHRoaXMuI2NyZWF0ZVNoaXAoJ2NhcnJpZXInLCA1KVxuICAgICAgICB0aGlzLmJhdHRsZXNoaXAgPSB0aGlzLiNjcmVhdGVTaGlwKCdiYXR0bGVzaGlwJywgNClcbiAgICAgICAgdGhpcy5jcnVpc2VyID0gdGhpcy4jY3JlYXRlU2hpcCgnY3J1aXNlcicsIDMpXG4gICAgICAgIHRoaXMuc3VibWFyaW5lID0gdGhpcy4jY3JlYXRlU2hpcCgnc3VibWFyaW5lJywgMylcbiAgICAgICAgdGhpcy5kZXN0cm95ZXIgPSB0aGlzLiNjcmVhdGVTaGlwKCdkZXN0cm95ZXInLCAyKVxuICAgICAgICB0aGlzLmJvYXJkID0gdGhpcy4jY3JlYXRlQm9hcmQoKVxuICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MgPSBbXVxuICAgICAgICB0aGlzLnN1Y2Nlc3NmdWxBdHRhY2tzID0gW11cbiAgICAgICAgdGhpcy5udW1PZlNoaXBzUmVhZHkgPSAwO1xuICAgIH1cblxuICAgICNjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgbGV0IGJvYXJkID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDw9IDkgOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByb3cgPSBbXVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDw9IDkgOyBpKyspIHtcbiAgICAgICAgICAgICAgICByb3cucHVzaChudWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9hcmQucHVzaChyb3cpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJvYXJkXG4gICAgfVxuICAgIFxuXG4gICAgI2NyZWF0ZVNoaXAobmFtZSwgbGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChuYW1lLCBsZW5ndGgpXG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuXG4gICAgI2dldEFsbFNoaXBzKCkge1xuICAgICAgICBjb25zdCBzaGlwcyA9IFtcbiAgICAgICAgICAgIHRoaXMuY2FycmllciwgXG4gICAgICAgICAgICB0aGlzLmJhdHRsZXNoaXAsIFxuICAgICAgICAgICAgdGhpcy5jcnVpc2VyLCBcbiAgICAgICAgICAgIHRoaXMuc3VibWFyaW5lLCBcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveWVyXG4gICAgICAgIF1cbiAgICAgICAgcmV0dXJuIHNoaXBzXG4gICAgfVxuXG4gICAgcG9zaXRpb25TaGlwKHgsIHksIHNoaXBOYW1lKSB7IC8vIHBvc2l0aW9uIHNoaXAgYXQgeCx5IGNvb3JkaW5hdGVzXG4gICAgICAgIHRoaXMudXBkYXRlQm9hcmRBcnJheShOdW1iZXIoeCksIE51bWJlcih5KSwgc2hpcE5hbWUpXG4gICAgfVxuXG5cbiAgICB1cGRhdGVCb2FyZEFycmF5KHgsIHksIHNoaXBOYW1lKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwTmFtZVxuICAgIH0gIFxuXG4gICAgZ2V0Qm9hcmQoKSB7XG4gICAgICAgIGNvbnN0IGJvYXJkQ29weSA9IFsuLi50aGlzLmJvYXJkXVxuICAgICAgICByZXR1cm4gYm9hcmRDb3B5XG4gICAgfVxuXG4gICAgZ2V0TWlzc2VkQXR0YWNrcygpIHtcbiAgICAgICAgY29uc3QgbWlzc2VkQXR0YWNrQXJyQ29weSA9IFsuLi50aGlzLm1pc3NlZEF0dGFja3NdXG4gICAgICAgIHJldHVybiBtaXNzZWRBdHRhY2tBcnJDb3B5XG4gICAgfVxuXG4gICAgZ2V0U3VjY2Vzc2Z1bEF0dGFja3MoKSB7XG4gICAgICAgIGNvbnN0IHN1Y2Nlc3NmdWxBdHRhY2tBcnJDb3B5ID0gWy4uLnRoaXMuc3VjY2Vzc2Z1bEF0dGFja3NdXG4gICAgICAgIHJldHVybiBzdWNjZXNzZnVsQXR0YWNrQXJyQ29weVxuICAgIH1cblxuICAgICNzdG9yZU1pc3NlZEF0dGFjayh4LCB5KSB7XG4gICAgICAgIHRoaXMubWlzc2VkQXR0YWNrcy5wdXNoKFt4LHldKVxuICAgIH1cblxuICAgICNzdG9yZVN1Y2Nlc3NmdWxBdHRhY2soeCwgeSkge1xuICAgICAgICB0aGlzLnN1Y2Nlc3NmdWxBdHRhY2tzLnB1c2goW3gsIHldKVxuICAgIH1cblxuICAgICNpc1ZhbGlkQXR0YWNrKHgsIHkpIHtcbiAgICAgICAgLy8gYWxsIHNob3VsZCBiZSB0cnVlXG4gICAgICAgIGNvbnN0IHVuaXF1ZU1pc3NlZEF0dGFjayA9ICF0aGlzLmdldE1pc3NlZEF0dGFja3MoKS5pbmNsdWRlcyhbeCwgeV0pXG4gICAgICAgIGNvbnN0IHVuaXF1ZVN1Y2Nlc3NmdWxBdHRhY2sgPSAhdGhpcy5nZXRTdWNjZXNzZnVsQXR0YWNrcygpLmluY2x1ZGVzKFt4LCB5XSkgXG4gICAgICAgIGNvbnN0IHZhbGlkQ29vcmRpbmF0ZXMgPSAoeCA+PSAwICYmIHggPD0gOSkgJiYgKHkgPj0gMCAmJiB5IDw9IDkpXG5cbiAgICAgICAgcmV0dXJuIHVuaXF1ZU1pc3NlZEF0dGFjayAmJiB1bmlxdWVTdWNjZXNzZnVsQXR0YWNrICYmIHZhbGlkQ29vcmRpbmF0ZXNcbiAgICB9XG5cbiAgICByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSBzaGlwIGF0IFt4LCB5XSBjb29yZGluYXRlc1xuICAgICAgICAvLyBpZiB5ZXMsIGFwcGx5IGRhbWFnZSB0byB0aGlzLnNoaXAgJiByZWNvcmQgc3VjY2Vzc2Z1bCBhdHRhY2tcbiAgICAgICAgLy8gaWYgbm90LCByZWNvcmQgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBtaXNzZWQgYXR0YWNrXG5cbiAgICAgICAgaWYgKHRoaXMuI2lzVmFsaWRBdHRhY2soeCwgeSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvYXJkID0gdGhpcy5nZXRCb2FyZCgpXG4gICAgICAgICAgICBjb25zdCBzaGlwcyA9IHtcbiAgICAgICAgICAgICAgICAnY2Fycmllcic6IHRoaXMuY2FycmllciwgXG4gICAgICAgICAgICAgICAgJ2JhdHRsZXNoaXAnOiB0aGlzLmJhdHRsZXNoaXAsIFxuICAgICAgICAgICAgICAgICdjcnVpc2VyJzogdGhpcy5jcnVpc2VyLCBcbiAgICAgICAgICAgICAgICAnc3VibWFyaW5lJzogdGhpcy5zdWJtYXJpbmUsIFxuICAgICAgICAgICAgICAgICdkZXN0cm95ZXInOiB0aGlzLmRlc3Ryb3llclxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYm9hcmRbeF1beV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzaGlwc1tib2FyZFt4XVt5XV0uaGl0KClcbiAgICAgICAgICAgICAgICB0aGlzLiNzdG9yZVN1Y2Nlc3NmdWxBdHRhY2soeCwgeSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJJdCdzIGEgaGl0IVwiXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuI3N0b3JlTWlzc2VkQXR0YWNrKHgsIHkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiSXQncyBhIG1pc3MhXCJcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgcmV0dXJuICdJbnZhbGlkIGF0dGFjaydcbiAgICB9XG5cbiAgICBhcmVBbGxTaGlwc1N1bmsoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldFN1Y2Nlc3NmdWxBdHRhY2tzKCkubGVuZ3RoID49IDE3KSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwcyA9IHRoaXMuI2dldEFsbFNoaXBzKClcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5zdW5rID09PSB0cnVlKVxuXG4gICAgICAgICAgICBpZiAoc3RhdHVzKSBjb25zb2xlLmxvZygnQWxsIHNoaXBzIGhhdmUgc3VuayEhIScpXG5cbiAgICAgICAgICAgIHJldHVybiBzdGF0dXNcbiAgICAgICAgICAgIFxuICAgICAgICB9IHJldHVybiBmYWxzZVxuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQiLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkRmFjdG9yeSdcblxuY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IHRoaXMuI2NyZWF0ZUJvYXJkKClcbiAgICB9XG5cbiAgICAjY3JlYXRlQm9hcmQoKSB7XG4gICAgICAgIGNvbnN0IG5ld0JvYXJkID0gbmV3IEdhbWVib2FyZFxuICAgICAgICByZXR1cm4gbmV3Qm9hcmRcbiAgICB9XG5cbiAgICBhdHRhY2tFbmVteShjb29yZGluYXRlc0FyciwgZW5lbXlCb2FyZCkge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBbLi4uY29vcmRpbmF0ZXNBcnJdIFxuICAgICAgICBjb25zdCBhdHRhY2tGZWVkYmFjayA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KVxuICAgICAgICByZXR1cm4gYXR0YWNrRmVlZGJhY2tcbiAgICB9XG5cbiAgICB2aWV3Qm9hcmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkLmdldEJvYXJkKClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllciIsImNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lLFxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAwO1xuICAgICAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBoaXQoKSB7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gdGhpcy5kYW1hZ2UgKyAxXG4gICAgICAgIHRoaXMuI2lzU3VuaygpXG4gICAgfVxuXG4gICAgI3NldFNoaXBBc1N1bmsoKSB7XG4gICAgICAgIHRoaXMuc3VuayA9IHRydWVcbiAgICB9XG5cbiAgICAjaXNTdW5rKCkge1xuICAgICAgICBpZiAodGhpcy5kYW1hZ2UgPT09IHRoaXMubGVuZ3RoKSB0aGlzLiNzZXRTaGlwQXNTdW5rKClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjcmVhdGVCb2FyZENvbXBvbmVudCBmcm9tIFwiLi9jb21wb25lbnRzL2dhbWVib2FyZFVJXCJcbmltcG9ydCB7IGFwcGx5RHJhZ0Ryb3AgfSBmcm9tIFwiLi9ldmVudExpc3RlbmVyc1wiXG5pbXBvcnQgQm90IGZyb20gXCIuL2ZhY3Rvcmllcy9ib3RGYWN0b3J5XCJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vZmFjdG9yaWVzL3BsYXllckZhY3RvcnlcIlxuXG4vLyBnYW1lYm9hcmQgVUlcbmNvbnN0IHBCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wQm9hcmQnKVxuY3JlYXRlQm9hcmRDb21wb25lbnQocEJvYXJkKVxuXG4vLyBjcmVhdGUgcGxheWVyIGFuZCBib3QgZ2FtZWJvYXJkXG5jb25zdCBwMSA9IG5ldyBQbGF5ZXJcbmNvbnN0IGJvdCA9IG5ldyBCb3RcbmNvbnNvbGUubG9nKHAxLnZpZXdCb2FyZCgpKVxuY29uc29sZS5sb2coYm90LnZpZXdCb2FyZCgpKVxuXG5cbi8vIGFjdGl2YXRlIGV2ZW50IGxpc3RlbmVyc1xuYXBwbHlEcmFnRHJvcChwMS5ib2FyZClcblxuXG5cbmV4cG9ydCBkZWZhdWx0IHAxXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==