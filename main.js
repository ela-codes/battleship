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
/* harmony export */   applyDragDrop: () => (/* binding */ applyDragDrop),
/* harmony export */   createPlayerBoardUI: () => (/* binding */ createPlayerBoardUI)
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

}

function createPlayerBoardUI() {
    const pBoard = document.querySelector('.pBoard')
    ;(0,_components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__["default"])(pBoard)
}

function createBotBoardUI() {
    const botBoard = document.querySelector('.bBoard')
    ;(0,_components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__["default"])(botBoard)
}

function updateBoardSizes() {
    const boxSize = document.querySelector(':root')
    boxSize.style.setProperty('--boxSize', '50px')
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
/* harmony import */ var _eventListeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventListeners */ "./src/eventListeners.js");
/* harmony import */ var _factories_botFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/botFactory */ "./src/factories/botFactory.js");
/* harmony import */ var _factories_playerFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/playerFactory */ "./src/factories/playerFactory.js");




// create player gameboard
(0,_eventListeners__WEBPACK_IMPORTED_MODULE_0__.createPlayerBoardUI)()

// create player and bot objects
const p1 = new _factories_playerFactory__WEBPACK_IMPORTED_MODULE_2__["default"]
const bot = new _factories_botFactory__WEBPACK_IMPORTED_MODULE_1__["default"]
console.log(p1.viewBoard())
console.log(bot.viewBoard())


// activate event listeners
;(0,_eventListeners__WEBPACK_IMPORTED_MODULE_0__.applyDragDrop)(p1.board)



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (p1);


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlOzs7Ozs7Ozs7Ozs7Ozs7O0FDdkQ2Qzs7QUFFNUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4Q0FBOEMsZ0JBQWdCLEdBQUcsNEJBQTRCLElBQUksNkJBQTZCO0FBQzlIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUVBQW1FLElBQUksYUFBYSxxQkFBcUI7QUFDekc7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0RBQW9ELFNBQVM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esd0VBQXdFLElBQUksYUFBYSxxQkFBcUI7QUFDOUcsa0JBQWtCO0FBQ2xCO0FBQ0Esd0VBQXdFLHFCQUFxQixhQUFhLElBQUk7QUFDOUc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0EsZ0VBQWdFLFdBQVc7QUFDM0U7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7QUFDQSxpRUFBaUUsV0FBVztBQUM1RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLElBQUksb0VBQW9CO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQSxJQUFJLG9FQUFvQjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFNkM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVNSDs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLHlEQUFTO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlFQUFlOzs7Ozs7Ozs7Ozs7Ozs7QUNuRmlCOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlCQUF5QixTQUFTO0FBQ2xDO0FBQ0EsNkJBQTZCLFNBQVM7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsb0RBQUk7QUFDN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBbUM7QUFDbkM7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUEsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQzlIMkI7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCLHlEQUFTO0FBQ3RDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7QUN2QmY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlOzs7Ozs7VUN0QmY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnFFO0FBQzdCO0FBQ007O0FBRTlDO0FBQ0Esb0VBQW1COztBQUVuQjtBQUNBLGVBQWUsZ0VBQU07QUFDckIsZ0JBQWdCLDZEQUFHO0FBQ25CO0FBQ0E7OztBQUdBO0FBQ0EsK0RBQWE7Ozs7QUFJYixpRUFBZSxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2dhbWVib2FyZFVJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvYm90RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlQm9hcmRDb21wb25lbnQocGFyZW50Q29udGFpbmVyKSB7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVZSGVhZGVyKCkge1xuICAgICAgICBjb25zdCB5SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgeUhlYWRlci5jbGFzc0xpc3QuYWRkKCdib2FyZFlIZWFkZXInKVxuICAgICAgICBjb25zdCBsZXR0ZXJzID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRicsICdHJywgJ0gnLCAnSScsICdKJ11cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gOTsgeSsrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ2JveEhlYWRlcicpXG4gICAgICAgICAgICBib3guaW5uZXJUZXh0ID0gbGV0dGVyc1t5XSBcbiAgICAgICAgICAgIHlIZWFkZXIuYXBwZW5kKGJveClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geUhlYWRlclxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVhIZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IHhIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB4SGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkWEhlYWRlcicpXG5cbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPD0gOTsgeCsrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ2JveEhlYWRlcicpXG4gICAgICAgICAgICBib3guaW5uZXJUZXh0ID0geCArIDEgLy8gb2Zmc2V0IGZvciB6ZXJvIGluZGV4aW5nXG4gICAgICAgICAgICB4SGVhZGVyLmFwcGVuZChib3gpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHhIZWFkZXJcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgdG9wLWxldmVsIGNvbnRhaW5lcnNcbiAgICBjb25zdCBjaGlsZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY2hpbGRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmRDb250YWluZXInKVxuXG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkR3JpZCcpXG5cbiAgICAvLyBjcmVhdGUgYm9hcmQgZ3JpZHNcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSA5OyB4KyspIHtcbiAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ3JvdycpXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IDk7IHkrKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCdib3gnKVxuICAgICAgICAgICAgYm94LmRhdGFzZXQueCA9IHhcbiAgICAgICAgICAgIGJveC5kYXRhc2V0LnkgPSB5XG4gICAgICAgICAgICByb3cuYXBwZW5kKGJveClcbiAgICAgICAgfVxuICAgICAgICBib2FyZC5hcHBlbmQocm93KVxuICAgIH1cblxuXG4gICAgLy8gYXBwZW5kIHRvIGNvbnRhaW5lcnNcbiAgICBjaGlsZENvbnRhaW5lci5hcHBlbmQoY3JlYXRlWEhlYWRlcigpLCBjcmVhdGVZSGVhZGVyKCksIGJvYXJkKVxuICAgIHBhcmVudENvbnRhaW5lci5hcHBlbmQoY2hpbGRDb250YWluZXIpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUJvYXJkQ29tcG9uZW50IiwiaW1wb3J0IGNyZWF0ZUJvYXJkQ29tcG9uZW50IGZyb20gXCIuL2NvbXBvbmVudHMvZ2FtZWJvYXJkVUlcIjtcblxuLy8gRFJBRyBOIERST1BcbmZ1bmN0aW9uIGFwcGx5RHJhZ0Ryb3AoYm9hcmQpIHtcbiAgICBhbGxvd1JvdGF0ZSgpXG5cbiAgICBmdW5jdGlvbiBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZHJhZ2dpbmdcIiwgZXZlbnQudGFyZ2V0LmlkLCBcIi4uLlwiKVxuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgYCR7ZXZlbnQudGFyZ2V0LmlkfSwke2V2ZW50LnRhcmdldC5kYXRhc2V0Lmxlbmd0aH0sICR7ZXZlbnQudGFyZ2V0LmRhdGFzZXQucm90YXRlZH1gKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdPdmVySGFuZGxlcihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJvcEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgZnVuY3Rpb24gcG9wdWxhdGVOZXh0Qm94KGJveEVsZW1lbnQsIHJlcGVhdCwgaXNSb3RhdGVkKSB7XG4gICAgICAgICAgICBpZiAocmVwZWF0ID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJveEVsZW1lbnQuY2xhc3NMaXN0LmFkZChzaGlwTmFtZSwgXCJkcm9wcGVkXCIpXG4gICAgICAgICAgICBib2FyZC5wb3NpdGlvblNoaXAoYm94RWxlbWVudC5kYXRhc2V0LngsIGJveEVsZW1lbnQuZGF0YXNldC55LCBzaGlwTmFtZSlcbiAgICAgICAgICAgIHJlcGVhdCAtLVxuXG4gICAgICAgICAgICBpZiAoaXNSb3RhdGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IE51bWJlcihib3hFbGVtZW50LmRhdGFzZXQueClcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD1cIiR7eCsxfVwiXVtkYXRhLXk9XCIke2JveEVsZW1lbnQuZGF0YXNldC55fVwiXWApXG4gICAgICAgICAgICAgICAgcG9wdWxhdGVOZXh0Qm94KG5leHREaXYsIHJlcGVhdCwgaXNSb3RhdGVkKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZU5leHRCb3goYm94RWxlbWVudC5uZXh0U2libGluZywgcmVwZWF0LCBpc1JvdGF0ZWQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZW1vdmVGcm9tU2hpcHlhcmQoc2hpcE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtzaGlwTmFtZX1gKVxuICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwicm90YXRhYmxlXCIpXG4gICAgICAgICAgICBzaGlwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgIHNoaXAuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAnZmFsc2UnKVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNWYWxpZERyb3Bab25lKGV2ZW50LCBzaGlwTGVuZ3RoLCBpc1JvdGF0ZWQpIHtcblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0SW5kZXhCYXNlZE9uU2hpcFJvdGF0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUm90YXRlZCkgcmV0dXJuIE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC54KVxuICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZnVuY3Rpb24gYXJlRW1wdHlTbG90cyhib3hFbGVtZW50LCBzaGlwTGVuZ3RoLCBpbmRleCwgaXNSb3RhdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJveEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJvcHBlZFwiKSkgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgaWYgKGJveEVsZW1lbnQgPT09IG51bGwpIHJldHVybiBmYWxzZVxuXG4gICAgICAgICAgICAgICAgaWYgKHNoaXBMZW5ndGggPT09IDEpIHJldHVybiB0cnVlXG5cbiAgICAgICAgICAgICAgICBsZXQgbmV4dEJveEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNSb3RhdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHggPSBOdW1iZXIoYm94RWxlbWVudC5kYXRhc2V0LngpXG4gICAgICAgICAgICAgICAgICAgIG5leHRCb3hFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD1cIiR7eCsxfVwiXVtkYXRhLXk9XCIke2JveEVsZW1lbnQuZGF0YXNldC55fVwiXWApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeSA9IE51bWJlcihib3hFbGVtZW50LmRhdGFzZXQueSlcbiAgICAgICAgICAgICAgICAgICAgbmV4dEJveEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PVwiJHtib3hFbGVtZW50LmRhdGFzZXQueH1cIl1bZGF0YS15PVwiJHt5KzF9XCJdYClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2hpcExlbmd0aC0tXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZUVtcHR5U2xvdHMobmV4dEJveEVsZW1lbnQsIHNoaXBMZW5ndGgsIGluZGV4LCBpc1JvdGF0ZWQpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZ2V0SW5kZXhCYXNlZE9uU2hpcFJvdGF0aW9uKGV2ZW50KVxuXG4gICAgICAgICAgICBjb25zdCB2YWxpZEluZGljZXMgPSAoaW5kZXggKyAoc2hpcExlbmd0aCAtIDEpKSA8PSA5XG4gICAgICAgICAgICBpZiAoIXZhbGlkSW5kaWNlcykgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgICAgIGNvbnN0IGVtcHR5U2xvdHMgPSBhcmVFbXB0eVNsb3RzKGV2ZW50LnRhcmdldCwgc2hpcExlbmd0aCwgaW5kZXgsIGlzUm90YXRlZClcbiAgICAgICAgICAgIHJldHVybiBlbXB0eVNsb3RzXG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGxldCBbc2hpcE5hbWUsIHNoaXBMZW5ndGgsIGlzUm90YXRlZF0gPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIikuc3BsaXQoJywnKVxuXG4gICAgICAgIGlzUm90YXRlZCA9ICBpc1JvdGF0ZWQgPT09IFwiIGZhbHNlXCIgPyBmYWxzZSA6IHRydWVcblxuICAgICAgICBpZiAoaXNWYWxpZERyb3Bab25lKGV2ZW50LCBzaGlwTGVuZ3RoLCBpc1JvdGF0ZWQpKSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChzaGlwTmFtZSwgXCJkcm9wcGVkXCIpXG4gICAgICAgICAgICBwb3B1bGF0ZU5leHRCb3goZXZlbnQudGFyZ2V0LCBzaGlwTGVuZ3RoLCBpc1JvdGF0ZWQpXG4gICAgICAgICAgICByZW1vdmVGcm9tU2hpcHlhcmQoc2hpcE5hbWUpXG4gICAgICAgICAgICBib2FyZC5udW1PZlNoaXBzUmVhZHkrK1xuXG4gICAgICAgICAgICAvLyBpZiBhbGwgc2hpcHMgYXJlIHBvc2l0aW9uZWQgb24gdGhlIGJvYXJkLCB0aGVuIGFsbG93IHVzZXIgdG8gc3RhcnQgdGhlIGdhbWVcbiAgICAgICAgICAgIGlmIChib2FyZC5udW1PZlNoaXBzUmVhZHkgPT09IDUpIHRvZ2dsZUJlZ2luQmF0dGxlQnRuKClcbiAgICAgICAgfVxuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIilcbiAgICAgICAgY29uc29sZS5sb2coYm9hcmQuZ2V0Qm9hcmQoKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc09jY3VwaWVkQm94KGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJvcHBlZFwiKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdMZWF2ZUhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZ0VudGVySGFuZGxlcihldmVudCkge1xuICAgICAgICBpZiAoIWlzT2NjdXBpZWRCb3goZXZlbnQpKSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIElkZW50aWZ5IGRyYWdnYWJsZSBzaGlwc1xuICAgIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKSBcbiAgICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib3gnKVxuXG5cbiAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZXZlbnQgPT4gZHJhZ1N0YXJ0SGFuZGxlcihldmVudCkpXG4gICAgICAgIC8vIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdcIiwgZXZlbnQgPT4gZHJhZ2dpbmdIYW5kbGVyKGV2ZW50KSlcbiAgICAgICAgLy8gc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBldmVudCA9PiBkcmFnRW5kSGFuZGxlcihldmVudCkpXG4gICAgfSlcblxuICAgIGJveGVzLmZvckVhY2goYm94ID0+IHtcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgZXZlbnQgPT4gZHJhZ0VudGVySGFuZGxlcihldmVudCkpXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZXZlbnQgPT4gZHJhZ092ZXJIYW5kbGVyKGV2ZW50KSlcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgZXZlbnQgPT4gZHJhZ0xlYXZlSGFuZGxlcihldmVudCkpXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBldmVudCA9PiBkcm9wSGFuZGxlcihldmVudCkpXG4gICAgfSlcblxufVxuXG5mdW5jdGlvbiBhbGxvd1JvdGF0ZSgpIHtcbiAgICBjb25zdCByb3RhdGFibGVTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3RhdGFibGUnKVxuXG4gICAgcm90YXRhYmxlU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4gcm90YXRlU2hpcChlLCBlLnRhcmdldC5kYXRhc2V0Lmxlbmd0aCkpXG4gICAgfSlcblxuXG4gICAgZnVuY3Rpb24gcm90YXRlU2hpcChlLCBzaGlwTGVuZ3RoKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5yb3RhdGVkID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUud2lkdGggPSBgY2FsYyh2YXIoLS1zaGlwQm94U2l6ZSkgKiAke3NoaXBMZW5ndGh9KWBcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmhlaWdodCA9IFwidmFyKC0tc2hpcEJveFNpemUpXCJcbiAgICAgICAgICAgIGUudGFyZ2V0LmRhdGFzZXQucm90YXRlZCA9IFwiZmFsc2VcIlxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS53aWR0aCA9IFwidmFyKC0tc2hpcEJveFNpemUpXCJcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmhlaWdodCA9IGBjYWxjKHZhcigtLXNoaXBCb3hTaXplKSAqICR7c2hpcExlbmd0aH0pYFxuICAgICAgICAgICAgZS50YXJnZXQuZGF0YXNldC5yb3RhdGVkID0gXCJ0cnVlXCJcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9nZ2xlQmVnaW5CYXR0bGVCdG4oKSB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLmJlZ2luQmF0dGxlJylcbiAgICBpZiAoIWJ0bi5zdHlsZS5kaXNwbGF5KSB7XG4gICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgICAgIGFsbG93R2FtZVN0YXJ0KGJ0bilcbiAgICB9XG4gICAgZWxzZSB7IGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnfVxufVxuXG5mdW5jdGlvbiByZXNldFNoaXBzKCkge1xuICAgIC8vIGRpc3BsYXkgc2hpcHMgYWdhaW5cbiAgICAvLyBhbGxvdyBkcmFnZ2FibGUgXG4gICAgLy8gZW1wdHkgdGhlIGJvYXJkIGFycmF5XG4gICAgLy8gZW1wdHkgdGhlIGJvYXJkIGdyaWRcbiAgICAvLyBoaWRlIGJlZ2luIGJhdHRsZSBidXR0b25cbn1cblxuZnVuY3Rpb24gYWxsb3dHYW1lU3RhcnQoYnRuKSB7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGNyZWF0ZUJvdEJvYXJkVUkoKVxuICAgICAgICBzaG93TWFpblNjcmVlbigpXG4gICAgICAgIHVwZGF0ZUJvYXJkU2l6ZXMoKVxuICAgIH0pXG5cbn1cblxuZnVuY3Rpb24gc2hvd01haW5TY3JlZW4oKSB7XG4gICAgY29uc3QgaW50cm9TY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW50cm8nKVxuICAgIGludHJvU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblxuICAgIGNvbnN0IG1haW5TY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpXG4gICAgbWFpblNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgXG4gICAgY29uc3QgcEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmludHJvIC5wQm9hcmQnKVxuXG4gICAgY29uc3QgcGxheWVyU2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJTaWRlJylcbiAgICBwbGF5ZXJTaWRlLmFwcGVuZChwQm9hcmQpXG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyQm9hcmRVSSgpIHtcbiAgICBjb25zdCBwQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucEJvYXJkJylcbiAgICBjcmVhdGVCb2FyZENvbXBvbmVudChwQm9hcmQpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvdEJvYXJkVUkoKSB7XG4gICAgY29uc3QgYm90Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYkJvYXJkJylcbiAgICBjcmVhdGVCb2FyZENvbXBvbmVudChib3RCb2FyZClcbn1cblxuZnVuY3Rpb24gdXBkYXRlQm9hcmRTaXplcygpIHtcbiAgICBjb25zdCBib3hTaXplID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignOnJvb3QnKVxuICAgIGJveFNpemUuc3R5bGUuc2V0UHJvcGVydHkoJy0tYm94U2l6ZScsICc1MHB4Jylcbn1cblxuZXhwb3J0IHsgYXBwbHlEcmFnRHJvcCwgY3JlYXRlUGxheWVyQm9hcmRVSSB9XG5cblxuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZEZhY3RvcnknXG5cbmNsYXNzIEJvdCB7XG4gICAgI3N1Y2Nlc3NmdWxBdHRhY2s7XG4gICAgI3ByZXZpb3VzQXR0YWNrO1xuICAgICNwb3NzaWJsZVNtYXJ0TW92ZXM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IHRoaXMuI2NyZWF0ZUJvYXJkKClcbiAgICAgICAgdGhpcy4jcHJldmlvdXNBdHRhY2sgPSBudWxsXG4gICAgICAgIHRoaXMuI3N1Y2Nlc3NmdWxBdHRhY2sgPSBmYWxzZVxuICAgICAgICB0aGlzLiNwb3NzaWJsZVNtYXJ0TW92ZXMgPSBbWzAsIDFdLCBbMCwgLTFdLCBbLTEsIDBdLCBbMSwgMF1dXG4gICAgfVxuXG4gICAgI2NyZWF0ZUJvYXJkKCkge1xuICAgICAgICBjb25zdCBuZXdCb2FyZCA9IG5ldyBHYW1lYm9hcmRcbiAgICAgICAgcmV0dXJuIG5ld0JvYXJkXG4gICAgfVxuICAgIFxuICAgIGdldENvb3JkaW5hdGVzKGVuZW15R2FtZWJvYXJkKSB7XG4gICAgICAgIC8vIHBpY2sgYSByYW5kb20gc3BvdCB3aXRoaW4gdGhlIGJvYXJkXG4gICAgICAgIC8vIHNob3VsZCBiZSBhIHVuaXF1ZSBjb29yZGluYXRlIGV2ZXJ5IHRpbWVcbiAgICAgICAgLy8gaWYgcHJldmlvdXMgY29vcmRpbmF0ZSB3YXMgYSBoaXQsIGNob29zZSBhbiBhZGphY2VudCBjb29yZGluYXRlXG4gICAgICAgIC8vIGltcHJvdmVtZW50IC0tIGdlbmVyYXRlIG5leHQgY29vcmRpbmF0ZSBiYXNlZCBvbiBhdmFpbGFibGUgZW1wdHkgc2xvdHMgaW5zdGVhZCBvZiByYW5kb20geC95IGNvb3Jkc1xuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gZ2V0UmFuZG9tTnVtKG1pbiwgbWF4KSB7XG4gICAgICAgICAgICBjb25zdCBudW0gPSBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW0pXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpc0VtcHR5UG9zaXRpb24oeCwgeSwgZW5lbXlCb2FyZCkge1xuICAgICAgICAgICAgcmV0dXJuIGVuZW15Qm9hcmRbeF1beV0gPT09IG51bGxcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMuI3N1Y2Nlc3NmdWxBdHRhY2spIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiNwb3NzaWJsZVNtYXJ0TW92ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uT2Zmc2V0ID0gdGhpcy4jcG9zc2libGVTbWFydE1vdmVzLnBvcCgpXG4gICAgICAgICAgICAgICAgbGV0IHhDb29yZCA9IHRoaXMuI3ByZXZpb3VzQXR0YWNrWzBdICsgcG9zaXRpb25PZmZzZXRbMF1cbiAgICAgICAgICAgICAgICBsZXQgeUNvb3JkID0gdGhpcy4jcHJldmlvdXNBdHRhY2tbMV0gKyBwb3NpdGlvbk9mZnNldFsxXVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFt4Q29vcmQsIHlDb29yZF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB4Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcbiAgICAgICAgbGV0IHlDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5KVxuXG4gICAgICAgIHdoaWxlICghaXNFbXB0eVBvc2l0aW9uKHhDb29yZCwgeUNvb3JkLCBlbmVteUdhbWVib2FyZC5nZXRCb2FyZCgpKSkge1xuICAgICAgICAgICAgeENvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG4gICAgICAgICAgICB5Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFt4Q29vcmQsIHlDb29yZF1cbiAgICB9XG5cblxuICAgIGF0dGFja0VuZW15KGNvb3JkaW5hdGVzQXJyLCBlbmVteUJvYXJkKSB7XG4gICAgICAgIGNvbnN0IFt4LCB5XSA9IFsuLi5jb29yZGluYXRlc0Fycl0gXG4gICAgICAgIGNvbnN0IGF0dGFja0ZlZWRiYWNrID0gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpXG4gICAgICAgIGlmIChhdHRhY2tGZWVkYmFjayA9PT0gXCJJdCdzIGEgaGl0IVwiKSB7XG4gICAgICAgICAgICB0aGlzLiNzdG9yZVByZXZpb3VzQXR0YWNrKGNvb3JkaW5hdGVzQXJyLCB0cnVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4jc3RvcmVQcmV2aW91c0F0dGFjayhjb29yZGluYXRlc0FyciwgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dGFja0ZlZWRiYWNrXG4gICAgfVxuXG4gICAgdmlld0JvYXJkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib2FyZC5nZXRCb2FyZCgpXG4gICAgfVxuXG4gICAgI3N0b3JlUHJldmlvdXNBdHRhY2soY29vcmRpbmF0ZXNBcnIsIGVuZW15V2FzSGl0KSB7XG4gICAgICAgIHRoaXMuI3ByZXZpb3VzQXR0YWNrID0gY29vcmRpbmF0ZXNBcnJcbiAgICAgICAgdGhpcy4jc3VjY2Vzc2Z1bEF0dGFjayA9IGVuZW15V2FzSGl0XG4gICAgfVxuXG4gICAgY2hvb3NlU2hpcFBvc2l0aW9uaW5nKCkge1xuICAgICAgICBcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQm90IiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwRmFjdG9yeSdcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYXJyaWVyID0gdGhpcy4jY3JlYXRlU2hpcCgnY2FycmllcicsIDUpXG4gICAgICAgIHRoaXMuYmF0dGxlc2hpcCA9IHRoaXMuI2NyZWF0ZVNoaXAoJ2JhdHRsZXNoaXAnLCA0KVxuICAgICAgICB0aGlzLmNydWlzZXIgPSB0aGlzLiNjcmVhdGVTaGlwKCdjcnVpc2VyJywgMylcbiAgICAgICAgdGhpcy5zdWJtYXJpbmUgPSB0aGlzLiNjcmVhdGVTaGlwKCdzdWJtYXJpbmUnLCAzKVxuICAgICAgICB0aGlzLmRlc3Ryb3llciA9IHRoaXMuI2NyZWF0ZVNoaXAoJ2Rlc3Ryb3llcicsIDIpXG4gICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLiNjcmVhdGVCb2FyZCgpXG4gICAgICAgIHRoaXMubWlzc2VkQXR0YWNrcyA9IFtdXG4gICAgICAgIHRoaXMuc3VjY2Vzc2Z1bEF0dGFja3MgPSBbXVxuICAgICAgICB0aGlzLm51bU9mU2hpcHNSZWFkeSA9IDA7XG4gICAgfVxuXG4gICAgI2NyZWF0ZUJvYXJkKCkge1xuICAgICAgICBsZXQgYm9hcmQgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPD0gOSA7IGkrKykge1xuICAgICAgICAgICAgbGV0IHJvdyA9IFtdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPD0gOSA7IGkrKykge1xuICAgICAgICAgICAgICAgIHJvdy5wdXNoKG51bGwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib2FyZC5wdXNoKHJvdylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm9hcmRcbiAgICB9XG4gICAgXG5cbiAgICAjY3JlYXRlU2hpcChuYW1lLCBsZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKG5hbWUsIGxlbmd0aClcbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG5cbiAgICAjZ2V0QWxsU2hpcHMoKSB7XG4gICAgICAgIGNvbnN0IHNoaXBzID0gW1xuICAgICAgICAgICAgdGhpcy5jYXJyaWVyLCBcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlc2hpcCwgXG4gICAgICAgICAgICB0aGlzLmNydWlzZXIsIFxuICAgICAgICAgICAgdGhpcy5zdWJtYXJpbmUsIFxuICAgICAgICAgICAgdGhpcy5kZXN0cm95ZXJcbiAgICAgICAgXVxuICAgICAgICByZXR1cm4gc2hpcHNcbiAgICB9XG5cbiAgICBwb3NpdGlvblNoaXAoeCwgeSwgc2hpcE5hbWUpIHsgLy8gcG9zaXRpb24gc2hpcCBhdCB4LHkgY29vcmRpbmF0ZXNcbiAgICAgICAgdGhpcy51cGRhdGVCb2FyZEFycmF5KE51bWJlcih4KSwgTnVtYmVyKHkpLCBzaGlwTmFtZSlcbiAgICB9XG5cblxuICAgIHVwZGF0ZUJvYXJkQXJyYXkoeCwgeSwgc2hpcE5hbWUpIHtcbiAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHNoaXBOYW1lXG4gICAgfSAgXG5cbiAgICBnZXRCb2FyZCgpIHtcbiAgICAgICAgY29uc3QgYm9hcmRDb3B5ID0gWy4uLnRoaXMuYm9hcmRdXG4gICAgICAgIHJldHVybiBib2FyZENvcHlcbiAgICB9XG5cbiAgICBnZXRNaXNzZWRBdHRhY2tzKCkge1xuICAgICAgICBjb25zdCBtaXNzZWRBdHRhY2tBcnJDb3B5ID0gWy4uLnRoaXMubWlzc2VkQXR0YWNrc11cbiAgICAgICAgcmV0dXJuIG1pc3NlZEF0dGFja0FyckNvcHlcbiAgICB9XG5cbiAgICBnZXRTdWNjZXNzZnVsQXR0YWNrcygpIHtcbiAgICAgICAgY29uc3Qgc3VjY2Vzc2Z1bEF0dGFja0FyckNvcHkgPSBbLi4udGhpcy5zdWNjZXNzZnVsQXR0YWNrc11cbiAgICAgICAgcmV0dXJuIHN1Y2Nlc3NmdWxBdHRhY2tBcnJDb3B5XG4gICAgfVxuXG4gICAgI3N0b3JlTWlzc2VkQXR0YWNrKHgsIHkpIHtcbiAgICAgICAgdGhpcy5taXNzZWRBdHRhY2tzLnB1c2goW3gseV0pXG4gICAgfVxuXG4gICAgI3N0b3JlU3VjY2Vzc2Z1bEF0dGFjayh4LCB5KSB7XG4gICAgICAgIHRoaXMuc3VjY2Vzc2Z1bEF0dGFja3MucHVzaChbeCwgeV0pXG4gICAgfVxuXG4gICAgI2lzVmFsaWRBdHRhY2soeCwgeSkge1xuICAgICAgICAvLyBhbGwgc2hvdWxkIGJlIHRydWVcbiAgICAgICAgY29uc3QgdW5pcXVlTWlzc2VkQXR0YWNrID0gIXRoaXMuZ2V0TWlzc2VkQXR0YWNrcygpLmluY2x1ZGVzKFt4LCB5XSlcbiAgICAgICAgY29uc3QgdW5pcXVlU3VjY2Vzc2Z1bEF0dGFjayA9ICF0aGlzLmdldFN1Y2Nlc3NmdWxBdHRhY2tzKCkuaW5jbHVkZXMoW3gsIHldKSBcbiAgICAgICAgY29uc3QgdmFsaWRDb29yZGluYXRlcyA9ICh4ID49IDAgJiYgeCA8PSA5KSAmJiAoeSA+PSAwICYmIHkgPD0gOSlcblxuICAgICAgICByZXR1cm4gdW5pcXVlTWlzc2VkQXR0YWNrICYmIHVuaXF1ZVN1Y2Nlc3NmdWxBdHRhY2sgJiYgdmFsaWRDb29yZGluYXRlc1xuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIHNoaXAgYXQgW3gsIHldIGNvb3JkaW5hdGVzXG4gICAgICAgIC8vIGlmIHllcywgYXBwbHkgZGFtYWdlIHRvIHRoaXMuc2hpcCAmIHJlY29yZCBzdWNjZXNzZnVsIGF0dGFja1xuICAgICAgICAvLyBpZiBub3QsIHJlY29yZCB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIG1pc3NlZCBhdHRhY2tcblxuICAgICAgICBpZiAodGhpcy4jaXNWYWxpZEF0dGFjayh4LCB5KSkge1xuICAgICAgICAgICAgY29uc3QgYm9hcmQgPSB0aGlzLmdldEJvYXJkKClcbiAgICAgICAgICAgIGNvbnN0IHNoaXBzID0ge1xuICAgICAgICAgICAgICAgICdjYXJyaWVyJzogdGhpcy5jYXJyaWVyLCBcbiAgICAgICAgICAgICAgICAnYmF0dGxlc2hpcCc6IHRoaXMuYmF0dGxlc2hpcCwgXG4gICAgICAgICAgICAgICAgJ2NydWlzZXInOiB0aGlzLmNydWlzZXIsIFxuICAgICAgICAgICAgICAgICdzdWJtYXJpbmUnOiB0aGlzLnN1Ym1hcmluZSwgXG4gICAgICAgICAgICAgICAgJ2Rlc3Ryb3llcic6IHRoaXMuZGVzdHJveWVyXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChib2FyZFt4XVt5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNoaXBzW2JvYXJkW3hdW3ldXS5oaXQoKVxuICAgICAgICAgICAgICAgIHRoaXMuI3N0b3JlU3VjY2Vzc2Z1bEF0dGFjayh4LCB5KVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkl0J3MgYSBoaXQhXCJcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4jc3RvcmVNaXNzZWRBdHRhY2soeCwgeSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJJdCdzIGEgbWlzcyFcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSByZXR1cm4gJ0ludmFsaWQgYXR0YWNrJ1xuICAgIH1cblxuICAgIGFyZUFsbFNoaXBzU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0U3VjY2Vzc2Z1bEF0dGFja3MoKS5sZW5ndGggPj0gMTcpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBzID0gdGhpcy4jZ2V0QWxsU2hpcHMoKVxuICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLnN1bmsgPT09IHRydWUpXG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMpIGNvbnNvbGUubG9nKCdBbGwgc2hpcHMgaGF2ZSBzdW5rISEhJylcblxuICAgICAgICAgICAgcmV0dXJuIHN0YXR1c1xuICAgICAgICAgICAgXG4gICAgICAgIH0gcmV0dXJuIGZhbHNlXG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZCIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmRGYWN0b3J5J1xuXG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gdGhpcy4jY3JlYXRlQm9hcmQoKVxuICAgIH1cblxuICAgICNjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgY29uc3QgbmV3Qm9hcmQgPSBuZXcgR2FtZWJvYXJkXG4gICAgICAgIHJldHVybiBuZXdCb2FyZFxuICAgIH1cblxuICAgIGF0dGFja0VuZW15KGNvb3JkaW5hdGVzQXJyLCBlbmVteUJvYXJkKSB7XG4gICAgICAgIGNvbnN0IFt4LCB5XSA9IFsuLi5jb29yZGluYXRlc0Fycl0gXG4gICAgICAgIGNvbnN0IGF0dGFja0ZlZWRiYWNrID0gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpXG4gICAgICAgIHJldHVybiBhdHRhY2tGZWVkYmFja1xuICAgIH1cblxuICAgIHZpZXdCb2FyZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmQuZ2V0Qm9hcmQoKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyIiwiY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgbGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWUsXG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDA7XG4gICAgICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSB0aGlzLmRhbWFnZSArIDFcbiAgICAgICAgdGhpcy4jaXNTdW5rKClcbiAgICB9XG5cbiAgICAjc2V0U2hpcEFzU3VuaygpIHtcbiAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZVxuICAgIH1cblxuICAgICNpc1N1bmsoKSB7XG4gICAgICAgIGlmICh0aGlzLmRhbWFnZSA9PT0gdGhpcy5sZW5ndGgpIHRoaXMuI3NldFNoaXBBc1N1bmsoKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcCIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgYXBwbHlEcmFnRHJvcCwgY3JlYXRlUGxheWVyQm9hcmRVSSB9IGZyb20gXCIuL2V2ZW50TGlzdGVuZXJzXCJcbmltcG9ydCBCb3QgZnJvbSBcIi4vZmFjdG9yaWVzL2JvdEZhY3RvcnlcIlxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9mYWN0b3JpZXMvcGxheWVyRmFjdG9yeVwiXG5cbi8vIGNyZWF0ZSBwbGF5ZXIgZ2FtZWJvYXJkXG5jcmVhdGVQbGF5ZXJCb2FyZFVJKClcblxuLy8gY3JlYXRlIHBsYXllciBhbmQgYm90IG9iamVjdHNcbmNvbnN0IHAxID0gbmV3IFBsYXllclxuY29uc3QgYm90ID0gbmV3IEJvdFxuY29uc29sZS5sb2cocDEudmlld0JvYXJkKCkpXG5jb25zb2xlLmxvZyhib3Qudmlld0JvYXJkKCkpXG5cblxuLy8gYWN0aXZhdGUgZXZlbnQgbGlzdGVuZXJzXG5hcHBseURyYWdEcm9wKHAxLmJvYXJkKVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgcDFcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9