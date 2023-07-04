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
/* harmony export */   buildMainScreen: () => (/* binding */ buildMainScreen),
/* harmony export */   createBoardComponent: () => (/* binding */ createBoardComponent),
/* harmony export */   createPlayerBoardUI: () => (/* binding */ createPlayerBoardUI)
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

function buildMainScreen() {
    function showMainScreen() {
        const introScreen = document.querySelector('.intro')
        introScreen.style.display = 'none'
    
        const mainScreen = document.querySelector('.main')
        mainScreen.style.display = 'flex'
        
        const pBoard = document.querySelector('.intro .pBoard')
    
        const playerSide = document.querySelector('.playerSide')
        playerSide.append(pBoard)
    
    }

    function createBotBoardUI() {
        const botBoard = document.querySelector('.bBoard')
        createBoardComponent(botBoard)
    }
    
    function updateBoardSizes() {
        const boxSize = document.querySelector(':root')
        boxSize.style.setProperty('--boxSize', '50px')
    }

    createBotBoardUI()
    showMainScreen()
    updateBoardSizes()
}

function createPlayerBoardUI() {
    const pBoard = document.querySelector('.pBoard')
    createBoardComponent(pBoard)
}




/***/ }),

/***/ "./src/components/utilities.js":
/*!*************************************!*\
  !*** ./src/components/utilities.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function getRandomNum(min, max) {
    const num = Math.random() * (max - min + 1) + min;
    return Math.floor(num)
}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getRandomNum);

/***/ }),

/***/ "./src/eventListeners.js":
/*!*******************************!*\
  !*** ./src/eventListeners.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/gameboardUI */ "./src/components/gameboardUI.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.js");


// rotated = vertical
// not rotated = horizontal

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
        (0,_components_gameboardUI__WEBPACK_IMPORTED_MODULE_0__.buildMainScreen)()
        ;(0,_index__WEBPACK_IMPORTED_MODULE_1__["default"])()
    })
}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (applyDragDrop);

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
/* harmony import */ var _components_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/utilities */ "./src/components/utilities.js");



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
    
   isEmptyPosition(x, y, gameBoard) {
        return gameBoard[x][y] === null
    }

    getCoordinates(enemyGameboard) {
        // pick a random spot within the board
        // should be a unique coordinate every time
        // if previous coordinate was a hit, choose an adjacent coordinate
        // improvement -- generate next coordinate based on available empty slots instead of random x/y coords

        if (this.#successfulAttack) {
            if (this.#possibleSmartMoves.length > 0) {
                const positionOffset = this.#possibleSmartMoves.pop()
                let xCoord = this.#previousAttack[0] + positionOffset[0]
                let yCoord = this.#previousAttack[1] + positionOffset[1]

                return [xCoord, yCoord]
            }
        }

        let xCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__["default"])(0, 9)
        let yCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__["default"])(0, 9)

        while (!this.isEmptyPosition(xCoord, yCoord, enemyGameboard.getBoard())) {
            xCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__["default"])(0, 9)
            yCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__["default"])(0, 9)
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

    positionAllShips() {
        const allShips = this.board.getAllShips()
        allShips.forEach(ship => {
            const newCoordinatesArr = this.#generateCoordinates(ship)
            newCoordinatesArr.forEach(coord => this.board.positionShip(coord[0], coord[1], ship.name))
        })

        
    }

    #generateCoordinates(ship) {
        const coordinatesArr = []
        const isRotated = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__["default"])(0, 1) // 0 == false, 1 == true
            
        // initiate variables
        let xCoord = 0;
        let yCoord = 0;
            
        // generate starting coordinates
        if (isRotated == 1) {
            xCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__["default"])(0, 9 - ship.length) // example, if shipLength=5, then choose 0-5 x-coordinates
            yCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__["default"])(0, 9)

            coordinatesArr.push([xCoord, yCoord])

            for (let i = 1 ; i < ship.length ; i++ ) {
                coordinatesArr.push([xCoord + i, yCoord])
            }

        } else { // otherwise, horizontal
            xCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__["default"])(0, 9)
            yCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__["default"])(0, 9 - ship.length)

            coordinatesArr.push([xCoord, yCoord])

            for (let i = 1 ; i < ship.length ; i++ ) {
                coordinatesArr.push([xCoord, yCoord + i])
            }
        }

        // check if coordinates are occupied
        const isValid = coordinatesArr.every(coord => this.isEmptyPosition(coord[0], coord[1], this.viewBoard()))

        // return if valid coordinates, otherwise find new ones
        if (isValid) return coordinatesArr
        else { generateCoordinates(ship) }
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

    getAllShips() {
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
            const ships = this.getAllShips()
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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _eventListeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventListeners */ "./src/eventListeners.js");
/* harmony import */ var _components_gameboardUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/gameboardUI */ "./src/components/gameboardUI.js");
/* harmony import */ var _factories_botFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/botFactory */ "./src/factories/botFactory.js");
/* harmony import */ var _factories_playerFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factories/playerFactory */ "./src/factories/playerFactory.js");





// create player gameboard
(0,_components_gameboardUI__WEBPACK_IMPORTED_MODULE_1__.createPlayerBoardUI)()

// create player object
const p1 = new _factories_playerFactory__WEBPACK_IMPORTED_MODULE_3__["default"]

// activate event listeners
;(0,_eventListeners__WEBPACK_IMPORTED_MODULE_0__["default"])(p1.board)



// start game
function startGame() {
    const bot = new _factories_botFactory__WEBPACK_IMPORTED_MODULE_2__["default"]
    bot.positionAllShips()
    console.log(bot.viewBoard())
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startGame);

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9nYW1lYm9hcmRVSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvYm90RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZUJvYXJkQ29tcG9uZW50KHBhcmVudENvbnRhaW5lcikge1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlWUhlYWRlcigpIHtcbiAgICAgICAgY29uc3QgeUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHlIZWFkZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmRZSGVhZGVyJylcbiAgICAgICAgY29uc3QgbGV0dGVycyA9IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0YnLCAnRycsICdIJywgJ0knLCAnSiddXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IDk7IHkrKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCdib3hIZWFkZXInKVxuICAgICAgICAgICAgYm94LmlubmVyVGV4dCA9IGxldHRlcnNbeV0gXG4gICAgICAgICAgICB5SGVhZGVyLmFwcGVuZChib3gpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHlIZWFkZXJcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVYSGVhZGVyKCkge1xuICAgICAgICBjb25zdCB4SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgeEhlYWRlci5jbGFzc0xpc3QuYWRkKCdib2FyZFhIZWFkZXInKVxuXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDw9IDk7IHgrKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCdib3hIZWFkZXInKVxuICAgICAgICAgICAgYm94LmlubmVyVGV4dCA9IHggKyAxIC8vIG9mZnNldCBmb3IgemVybyBpbmRleGluZ1xuICAgICAgICAgICAgeEhlYWRlci5hcHBlbmQoYm94KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4SGVhZGVyXG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIHRvcC1sZXZlbCBjb250YWluZXJzXG4gICAgY29uc3QgY2hpbGRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNoaWxkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkQ29udGFpbmVyJylcblxuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKCdib2FyZEdyaWQnKVxuXG4gICAgLy8gY3JlYXRlIGJvYXJkIGdyaWRzXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPD0gOTsgeCsrKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdyb3cnKVxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSA5OyB5KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnYm94JylcbiAgICAgICAgICAgIGJveC5kYXRhc2V0LnggPSB4XG4gICAgICAgICAgICBib3guZGF0YXNldC55ID0geVxuICAgICAgICAgICAgcm93LmFwcGVuZChib3gpXG4gICAgICAgIH1cbiAgICAgICAgYm9hcmQuYXBwZW5kKHJvdylcbiAgICB9XG5cblxuICAgIC8vIGFwcGVuZCB0byBjb250YWluZXJzXG4gICAgY2hpbGRDb250YWluZXIuYXBwZW5kKGNyZWF0ZVhIZWFkZXIoKSwgY3JlYXRlWUhlYWRlcigpLCBib2FyZClcbiAgICBwYXJlbnRDb250YWluZXIuYXBwZW5kKGNoaWxkQ29udGFpbmVyKVxufVxuXG5mdW5jdGlvbiBidWlsZE1haW5TY3JlZW4oKSB7XG4gICAgZnVuY3Rpb24gc2hvd01haW5TY3JlZW4oKSB7XG4gICAgICAgIGNvbnN0IGludHJvU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmludHJvJylcbiAgICAgICAgaW50cm9TY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIFxuICAgICAgICBjb25zdCBtYWluU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKVxuICAgICAgICBtYWluU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHBCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnRybyAucEJvYXJkJylcbiAgICBcbiAgICAgICAgY29uc3QgcGxheWVyU2lkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJTaWRlJylcbiAgICAgICAgcGxheWVyU2lkZS5hcHBlbmQocEJvYXJkKVxuICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUJvdEJvYXJkVUkoKSB7XG4gICAgICAgIGNvbnN0IGJvdEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJCb2FyZCcpXG4gICAgICAgIGNyZWF0ZUJvYXJkQ29tcG9uZW50KGJvdEJvYXJkKVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiB1cGRhdGVCb2FyZFNpemVzKCkge1xuICAgICAgICBjb25zdCBib3hTaXplID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignOnJvb3QnKVxuICAgICAgICBib3hTaXplLnN0eWxlLnNldFByb3BlcnR5KCctLWJveFNpemUnLCAnNTBweCcpXG4gICAgfVxuXG4gICAgY3JlYXRlQm90Qm9hcmRVSSgpXG4gICAgc2hvd01haW5TY3JlZW4oKVxuICAgIHVwZGF0ZUJvYXJkU2l6ZXMoKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJCb2FyZFVJKCkge1xuICAgIGNvbnN0IHBCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wQm9hcmQnKVxuICAgIGNyZWF0ZUJvYXJkQ29tcG9uZW50KHBCb2FyZClcbn1cblxuXG5leHBvcnQgeyBjcmVhdGVCb2FyZENvbXBvbmVudCwgYnVpbGRNYWluU2NyZWVuLCBjcmVhdGVQbGF5ZXJCb2FyZFVJIH0iLCJmdW5jdGlvbiBnZXRSYW5kb21OdW0obWluLCBtYXgpIHtcbiAgICBjb25zdCBudW0gPSBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluO1xuICAgIHJldHVybiBNYXRoLmZsb29yKG51bSlcbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhbmRvbU51bSIsImltcG9ydCB7IGNyZWF0ZUJvYXJkQ29tcG9uZW50LCBidWlsZE1haW5TY3JlZW4sIGNyZWF0ZVBsYXllckJvYXJkVUkgfSBmcm9tIFwiLi9jb21wb25lbnRzL2dhbWVib2FyZFVJXCJcbmltcG9ydCBzdGFydEdhbWUgZnJvbSAnLi9pbmRleCdcbi8vIHJvdGF0ZWQgPSB2ZXJ0aWNhbFxuLy8gbm90IHJvdGF0ZWQgPSBob3Jpem9udGFsXG5cbi8vIERSQUcgTiBEUk9QXG5mdW5jdGlvbiBhcHBseURyYWdEcm9wKGJvYXJkKSB7XG4gICAgYWxsb3dSb3RhdGUoKVxuXG4gICAgZnVuY3Rpb24gZHJhZ1N0YXJ0SGFuZGxlcihldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImRyYWdnaW5nXCIsIGV2ZW50LnRhcmdldC5pZCwgXCIuLi5cIilcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIGAke2V2ZW50LnRhcmdldC5pZH0sJHtldmVudC50YXJnZXQuZGF0YXNldC5sZW5ndGh9LCAke2V2ZW50LnRhcmdldC5kYXRhc2V0LnJvdGF0ZWR9YClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnT3ZlckhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyb3BIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGZ1bmN0aW9uIHBvcHVsYXRlTmV4dEJveChib3hFbGVtZW50LCByZXBlYXQsIGlzUm90YXRlZCkge1xuICAgICAgICAgICAgaWYgKHJlcGVhdCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBib3hFbGVtZW50LmNsYXNzTGlzdC5hZGQoc2hpcE5hbWUsIFwiZHJvcHBlZFwiKVxuICAgICAgICAgICAgYm9hcmQucG9zaXRpb25TaGlwKGJveEVsZW1lbnQuZGF0YXNldC54LCBib3hFbGVtZW50LmRhdGFzZXQueSwgc2hpcE5hbWUpXG4gICAgICAgICAgICByZXBlYXQgLS1cblxuICAgICAgICAgICAgaWYgKGlzUm90YXRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBOdW1iZXIoYm94RWxlbWVudC5kYXRhc2V0LngpXG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9XCIke3grMX1cIl1bZGF0YS15PVwiJHtib3hFbGVtZW50LmRhdGFzZXQueX1cIl1gKVxuICAgICAgICAgICAgICAgIHBvcHVsYXRlTmV4dEJveChuZXh0RGl2LCByZXBlYXQsIGlzUm90YXRlZClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9wdWxhdGVOZXh0Qm94KGJveEVsZW1lbnQubmV4dFNpYmxpbmcsIHJlcGVhdCwgaXNSb3RhdGVkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRnJvbVNoaXB5YXJkKHNoaXBOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7c2hpcE5hbWV9YClcbiAgICAgICAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInJvdGF0YWJsZVwiKVxuICAgICAgICAgICAgc2hpcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICBzaGlwLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ2ZhbHNlJylcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGlzVmFsaWREcm9wWm9uZShldmVudCwgc2hpcExlbmd0aCwgaXNSb3RhdGVkKSB7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEluZGV4QmFzZWRPblNoaXBSb3RhdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChpc1JvdGF0ZWQpIHJldHVybiBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueClcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LnkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFyZUVtcHR5U2xvdHMoYm94RWxlbWVudCwgc2hpcExlbmd0aCwgaW5kZXgsIGlzUm90YXRlZCkge1xuICAgICAgICAgICAgICAgIGlmIChib3hFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImRyb3BwZWRcIikpIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIGlmIChib3hFbGVtZW50ID09PSBudWxsKSByZXR1cm4gZmFsc2VcblxuICAgICAgICAgICAgICAgIGlmIChzaGlwTGVuZ3RoID09PSAxKSByZXR1cm4gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgbGV0IG5leHRCb3hFbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzUm90YXRlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB4ID0gTnVtYmVyKGJveEVsZW1lbnQuZGF0YXNldC54KVxuICAgICAgICAgICAgICAgICAgICBuZXh0Qm94RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9XCIke3grMX1cIl1bZGF0YS15PVwiJHtib3hFbGVtZW50LmRhdGFzZXQueX1cIl1gKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBOdW1iZXIoYm94RWxlbWVudC5kYXRhc2V0LnkpXG4gICAgICAgICAgICAgICAgICAgIG5leHRCb3hFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD1cIiR7Ym94RWxlbWVudC5kYXRhc2V0Lnh9XCJdW2RhdGEteT1cIiR7eSsxfVwiXWApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNoaXBMZW5ndGgtLVxuICAgICAgICAgICAgICAgIHJldHVybiBhcmVFbXB0eVNsb3RzKG5leHRCb3hFbGVtZW50LCBzaGlwTGVuZ3RoLCBpbmRleCwgaXNSb3RhdGVkKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGdldEluZGV4QmFzZWRPblNoaXBSb3RhdGlvbihldmVudClcblxuICAgICAgICAgICAgY29uc3QgdmFsaWRJbmRpY2VzID0gKGluZGV4ICsgKHNoaXBMZW5ndGggLSAxKSkgPD0gOVxuICAgICAgICAgICAgaWYgKCF2YWxpZEluZGljZXMpIHJldHVybiBmYWxzZVxuXG4gICAgICAgICAgICBjb25zdCBlbXB0eVNsb3RzID0gYXJlRW1wdHlTbG90cyhldmVudC50YXJnZXQsIHNoaXBMZW5ndGgsIGluZGV4LCBpc1JvdGF0ZWQpXG4gICAgICAgICAgICByZXR1cm4gZW1wdHlTbG90c1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBsZXQgW3NoaXBOYW1lLCBzaGlwTGVuZ3RoLCBpc1JvdGF0ZWRdID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpLnNwbGl0KCcsJylcblxuICAgICAgICBpc1JvdGF0ZWQgPSAgaXNSb3RhdGVkID09PSBcIiBmYWxzZVwiID8gZmFsc2UgOiB0cnVlXG5cbiAgICAgICAgaWYgKGlzVmFsaWREcm9wWm9uZShldmVudCwgc2hpcExlbmd0aCwgaXNSb3RhdGVkKSkge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoc2hpcE5hbWUsIFwiZHJvcHBlZFwiKVxuICAgICAgICAgICAgcG9wdWxhdGVOZXh0Qm94KGV2ZW50LnRhcmdldCwgc2hpcExlbmd0aCwgaXNSb3RhdGVkKVxuICAgICAgICAgICAgcmVtb3ZlRnJvbVNoaXB5YXJkKHNoaXBOYW1lKVxuICAgICAgICAgICAgYm9hcmQubnVtT2ZTaGlwc1JlYWR5KytcblxuICAgICAgICAgICAgLy8gaWYgYWxsIHNoaXBzIGFyZSBwb3NpdGlvbmVkIG9uIHRoZSBib2FyZCwgdGhlbiBhbGxvdyB1c2VyIHRvIHN0YXJ0IHRoZSBnYW1lXG4gICAgICAgICAgICBpZiAoYm9hcmQubnVtT2ZTaGlwc1JlYWR5ID09PSA1KSB0b2dnbGVCZWdpbkJhdHRsZUJ0bigpXG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPY2N1cGllZEJveChldmVudCkge1xuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRyb3BwZWRcIilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnTGVhdmVIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdFbnRlckhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFpc09jY3VwaWVkQm94KGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZGVudGlmeSBkcmFnZ2FibGUgc2hpcHNcbiAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwJykgXG4gICAgY29uc3QgYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm94JylcblxuXG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGV2ZW50ID0+IGRyYWdTdGFydEhhbmRsZXIoZXZlbnQpKVxuICAgICAgICAvLyBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnXCIsIGV2ZW50ID0+IGRyYWdnaW5nSGFuZGxlcihldmVudCkpXG4gICAgICAgIC8vIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZXZlbnQgPT4gZHJhZ0VuZEhhbmRsZXIoZXZlbnQpKVxuICAgIH0pXG5cbiAgICBib3hlcy5mb3JFYWNoKGJveCA9PiB7XG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIGV2ZW50ID0+IGRyYWdFbnRlckhhbmRsZXIoZXZlbnQpKVxuICAgICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGV2ZW50ID0+IGRyYWdPdmVySGFuZGxlcihldmVudCkpXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIGV2ZW50ID0+IGRyYWdMZWF2ZUhhbmRsZXIoZXZlbnQpKVxuICAgICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZXZlbnQgPT4gZHJvcEhhbmRsZXIoZXZlbnQpKVxuICAgIH0pXG5cbn1cblxuZnVuY3Rpb24gYWxsb3dSb3RhdGUoKSB7XG4gICAgY29uc3Qgcm90YXRhYmxlU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm90YXRhYmxlJylcblxuICAgIHJvdGF0YWJsZVNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHJvdGF0ZVNoaXAoZSwgZS50YXJnZXQuZGF0YXNldC5sZW5ndGgpKVxuICAgIH0pXG5cblxuICAgIGZ1bmN0aW9uIHJvdGF0ZVNoaXAoZSwgc2hpcExlbmd0aCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQucm90YXRlZCA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLndpZHRoID0gYGNhbGModmFyKC0tc2hpcEJveFNpemUpICogJHtzaGlwTGVuZ3RofSlgXG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5oZWlnaHQgPSBcInZhcigtLXNoaXBCb3hTaXplKVwiXG4gICAgICAgICAgICBlLnRhcmdldC5kYXRhc2V0LnJvdGF0ZWQgPSBcImZhbHNlXCJcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUud2lkdGggPSBcInZhcigtLXNoaXBCb3hTaXplKVwiXG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5oZWlnaHQgPSBgY2FsYyh2YXIoLS1zaGlwQm94U2l6ZSkgKiAke3NoaXBMZW5ndGh9KWBcbiAgICAgICAgICAgIGUudGFyZ2V0LmRhdGFzZXQucm90YXRlZCA9IFwidHJ1ZVwiXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUJlZ2luQmF0dGxlQnRuKCkge1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5iZWdpbkJhdHRsZScpXG4gICAgaWYgKCFidG4uc3R5bGUuZGlzcGxheSkge1xuICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuICAgICAgICBhbGxvd0dhbWVTdGFydChidG4pXG4gICAgfVxuICAgIGVsc2UgeyBidG4uc3R5bGUuZGlzcGxheSA9ICdub25lJ31cbn1cblxuZnVuY3Rpb24gcmVzZXRTaGlwcygpIHtcbiAgICAvLyBkaXNwbGF5IHNoaXBzIGFnYWluXG4gICAgLy8gYWxsb3cgZHJhZ2dhYmxlIFxuICAgIC8vIGVtcHR5IHRoZSBib2FyZCBhcnJheVxuICAgIC8vIGVtcHR5IHRoZSBib2FyZCBncmlkXG4gICAgLy8gaGlkZSBiZWdpbiBiYXR0bGUgYnV0dG9uXG59XG5cbmZ1bmN0aW9uIGFsbG93R2FtZVN0YXJ0KGJ0bikge1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBidWlsZE1haW5TY3JlZW4oKVxuICAgICAgICBzdGFydEdhbWUoKVxuICAgIH0pXG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBhcHBseURyYWdEcm9wIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZEZhY3RvcnknXG5pbXBvcnQgZ2V0UmFuZG9tTnVtIGZyb20gJy4uL2NvbXBvbmVudHMvdXRpbGl0aWVzJ1xuXG5jbGFzcyBCb3Qge1xuICAgICNzdWNjZXNzZnVsQXR0YWNrO1xuICAgICNwcmV2aW91c0F0dGFjaztcbiAgICAjcG9zc2libGVTbWFydE1vdmVzO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLiNjcmVhdGVCb2FyZCgpXG4gICAgICAgIHRoaXMuI3ByZXZpb3VzQXR0YWNrID0gbnVsbFxuICAgICAgICB0aGlzLiNzdWNjZXNzZnVsQXR0YWNrID0gZmFsc2VcbiAgICAgICAgdGhpcy4jcG9zc2libGVTbWFydE1vdmVzID0gW1swLCAxXSwgWzAsIC0xXSwgWy0xLCAwXSwgWzEsIDBdXVxuICAgIH1cblxuICAgICNjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgY29uc3QgbmV3Qm9hcmQgPSBuZXcgR2FtZWJvYXJkXG4gICAgICAgIHJldHVybiBuZXdCb2FyZFxuICAgIH1cbiAgICBcbiAgIGlzRW1wdHlQb3NpdGlvbih4LCB5LCBnYW1lQm9hcmQpIHtcbiAgICAgICAgcmV0dXJuIGdhbWVCb2FyZFt4XVt5XSA9PT0gbnVsbFxuICAgIH1cblxuICAgIGdldENvb3JkaW5hdGVzKGVuZW15R2FtZWJvYXJkKSB7XG4gICAgICAgIC8vIHBpY2sgYSByYW5kb20gc3BvdCB3aXRoaW4gdGhlIGJvYXJkXG4gICAgICAgIC8vIHNob3VsZCBiZSBhIHVuaXF1ZSBjb29yZGluYXRlIGV2ZXJ5IHRpbWVcbiAgICAgICAgLy8gaWYgcHJldmlvdXMgY29vcmRpbmF0ZSB3YXMgYSBoaXQsIGNob29zZSBhbiBhZGphY2VudCBjb29yZGluYXRlXG4gICAgICAgIC8vIGltcHJvdmVtZW50IC0tIGdlbmVyYXRlIG5leHQgY29vcmRpbmF0ZSBiYXNlZCBvbiBhdmFpbGFibGUgZW1wdHkgc2xvdHMgaW5zdGVhZCBvZiByYW5kb20geC95IGNvb3Jkc1xuXG4gICAgICAgIGlmICh0aGlzLiNzdWNjZXNzZnVsQXR0YWNrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4jcG9zc2libGVTbWFydE1vdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbk9mZnNldCA9IHRoaXMuI3Bvc3NpYmxlU21hcnRNb3Zlcy5wb3AoKVxuICAgICAgICAgICAgICAgIGxldCB4Q29vcmQgPSB0aGlzLiNwcmV2aW91c0F0dGFja1swXSArIHBvc2l0aW9uT2Zmc2V0WzBdXG4gICAgICAgICAgICAgICAgbGV0IHlDb29yZCA9IHRoaXMuI3ByZXZpb3VzQXR0YWNrWzFdICsgcG9zaXRpb25PZmZzZXRbMV1cblxuICAgICAgICAgICAgICAgIHJldHVybiBbeENvb3JkLCB5Q29vcmRdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeENvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG4gICAgICAgIGxldCB5Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcblxuICAgICAgICB3aGlsZSAoIXRoaXMuaXNFbXB0eVBvc2l0aW9uKHhDb29yZCwgeUNvb3JkLCBlbmVteUdhbWVib2FyZC5nZXRCb2FyZCgpKSkge1xuICAgICAgICAgICAgeENvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG4gICAgICAgICAgICB5Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFt4Q29vcmQsIHlDb29yZF1cbiAgICB9XG5cblxuICAgIGF0dGFja0VuZW15KGNvb3JkaW5hdGVzQXJyLCBlbmVteUJvYXJkKSB7XG4gICAgICAgIGNvbnN0IFt4LCB5XSA9IFsuLi5jb29yZGluYXRlc0Fycl0gXG4gICAgICAgIGNvbnN0IGF0dGFja0ZlZWRiYWNrID0gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpXG4gICAgICAgIGlmIChhdHRhY2tGZWVkYmFjayA9PT0gXCJJdCdzIGEgaGl0IVwiKSB7XG4gICAgICAgICAgICB0aGlzLiNzdG9yZVByZXZpb3VzQXR0YWNrKGNvb3JkaW5hdGVzQXJyLCB0cnVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4jc3RvcmVQcmV2aW91c0F0dGFjayhjb29yZGluYXRlc0FyciwgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dGFja0ZlZWRiYWNrXG4gICAgfVxuXG4gICAgdmlld0JvYXJkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib2FyZC5nZXRCb2FyZCgpXG4gICAgfVxuXG4gICAgI3N0b3JlUHJldmlvdXNBdHRhY2soY29vcmRpbmF0ZXNBcnIsIGVuZW15V2FzSGl0KSB7XG4gICAgICAgIHRoaXMuI3ByZXZpb3VzQXR0YWNrID0gY29vcmRpbmF0ZXNBcnJcbiAgICAgICAgdGhpcy4jc3VjY2Vzc2Z1bEF0dGFjayA9IGVuZW15V2FzSGl0XG4gICAgfVxuXG4gICAgcG9zaXRpb25BbGxTaGlwcygpIHtcbiAgICAgICAgY29uc3QgYWxsU2hpcHMgPSB0aGlzLmJvYXJkLmdldEFsbFNoaXBzKClcbiAgICAgICAgYWxsU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Nvb3JkaW5hdGVzQXJyID0gdGhpcy4jZ2VuZXJhdGVDb29yZGluYXRlcyhzaGlwKVxuICAgICAgICAgICAgbmV3Q29vcmRpbmF0ZXNBcnIuZm9yRWFjaChjb29yZCA9PiB0aGlzLmJvYXJkLnBvc2l0aW9uU2hpcChjb29yZFswXSwgY29vcmRbMV0sIHNoaXAubmFtZSkpXG4gICAgICAgIH0pXG5cbiAgICAgICAgXG4gICAgfVxuXG4gICAgI2dlbmVyYXRlQ29vcmRpbmF0ZXMoc2hpcCkge1xuICAgICAgICBjb25zdCBjb29yZGluYXRlc0FyciA9IFtdXG4gICAgICAgIGNvbnN0IGlzUm90YXRlZCA9IGdldFJhbmRvbU51bSgwLCAxKSAvLyAwID09IGZhbHNlLCAxID09IHRydWVcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBpbml0aWF0ZSB2YXJpYWJsZXNcbiAgICAgICAgbGV0IHhDb29yZCA9IDA7XG4gICAgICAgIGxldCB5Q29vcmQgPSAwO1xuICAgICAgICAgICAgXG4gICAgICAgIC8vIGdlbmVyYXRlIHN0YXJ0aW5nIGNvb3JkaW5hdGVzXG4gICAgICAgIGlmIChpc1JvdGF0ZWQgPT0gMSkge1xuICAgICAgICAgICAgeENvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkgLSBzaGlwLmxlbmd0aCkgLy8gZXhhbXBsZSwgaWYgc2hpcExlbmd0aD01LCB0aGVuIGNob29zZSAwLTUgeC1jb29yZGluYXRlc1xuICAgICAgICAgICAgeUNvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG5cbiAgICAgICAgICAgIGNvb3JkaW5hdGVzQXJyLnB1c2goW3hDb29yZCwgeUNvb3JkXSlcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDEgOyBpIDwgc2hpcC5sZW5ndGggOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXNBcnIucHVzaChbeENvb3JkICsgaSwgeUNvb3JkXSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgeyAvLyBvdGhlcndpc2UsIGhvcml6b250YWxcbiAgICAgICAgICAgIHhDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5KVxuICAgICAgICAgICAgeUNvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkgLSBzaGlwLmxlbmd0aClcblxuICAgICAgICAgICAgY29vcmRpbmF0ZXNBcnIucHVzaChbeENvb3JkLCB5Q29vcmRdKVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMSA7IGkgPCBzaGlwLmxlbmd0aCA7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlc0Fyci5wdXNoKFt4Q29vcmQsIHlDb29yZCArIGldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgY29vcmRpbmF0ZXMgYXJlIG9jY3VwaWVkXG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSBjb29yZGluYXRlc0Fyci5ldmVyeShjb29yZCA9PiB0aGlzLmlzRW1wdHlQb3NpdGlvbihjb29yZFswXSwgY29vcmRbMV0sIHRoaXMudmlld0JvYXJkKCkpKVxuXG4gICAgICAgIC8vIHJldHVybiBpZiB2YWxpZCBjb29yZGluYXRlcywgb3RoZXJ3aXNlIGZpbmQgbmV3IG9uZXNcbiAgICAgICAgaWYgKGlzVmFsaWQpIHJldHVybiBjb29yZGluYXRlc0FyclxuICAgICAgICBlbHNlIHsgZ2VuZXJhdGVDb29yZGluYXRlcyhzaGlwKSB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCb3RcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcEZhY3RvcnknXG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FycmllciA9IHRoaXMuI2NyZWF0ZVNoaXAoJ2NhcnJpZXInLCA1KVxuICAgICAgICB0aGlzLmJhdHRsZXNoaXAgPSB0aGlzLiNjcmVhdGVTaGlwKCdiYXR0bGVzaGlwJywgNClcbiAgICAgICAgdGhpcy5jcnVpc2VyID0gdGhpcy4jY3JlYXRlU2hpcCgnY3J1aXNlcicsIDMpXG4gICAgICAgIHRoaXMuc3VibWFyaW5lID0gdGhpcy4jY3JlYXRlU2hpcCgnc3VibWFyaW5lJywgMylcbiAgICAgICAgdGhpcy5kZXN0cm95ZXIgPSB0aGlzLiNjcmVhdGVTaGlwKCdkZXN0cm95ZXInLCAyKVxuICAgICAgICB0aGlzLmJvYXJkID0gdGhpcy4jY3JlYXRlQm9hcmQoKVxuICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MgPSBbXVxuICAgICAgICB0aGlzLnN1Y2Nlc3NmdWxBdHRhY2tzID0gW11cbiAgICAgICAgdGhpcy5udW1PZlNoaXBzUmVhZHkgPSAwO1xuICAgIH1cblxuICAgICNjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgbGV0IGJvYXJkID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDw9IDkgOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByb3cgPSBbXVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDw9IDkgOyBpKyspIHtcbiAgICAgICAgICAgICAgICByb3cucHVzaChudWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9hcmQucHVzaChyb3cpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJvYXJkXG4gICAgfVxuICAgIFxuXG4gICAgI2NyZWF0ZVNoaXAobmFtZSwgbGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChuYW1lLCBsZW5ndGgpXG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuXG4gICAgZ2V0QWxsU2hpcHMoKSB7XG4gICAgICAgIGNvbnN0IHNoaXBzID0gW1xuICAgICAgICAgICAgdGhpcy5jYXJyaWVyLCBcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlc2hpcCwgXG4gICAgICAgICAgICB0aGlzLmNydWlzZXIsIFxuICAgICAgICAgICAgdGhpcy5zdWJtYXJpbmUsIFxuICAgICAgICAgICAgdGhpcy5kZXN0cm95ZXJcbiAgICAgICAgXVxuICAgICAgICByZXR1cm4gc2hpcHNcbiAgICB9XG5cbiAgICBwb3NpdGlvblNoaXAoeCwgeSwgc2hpcE5hbWUpIHsgLy8gcG9zaXRpb24gc2hpcCBhdCB4LHkgY29vcmRpbmF0ZXNcbiAgICAgICAgdGhpcy51cGRhdGVCb2FyZEFycmF5KE51bWJlcih4KSwgTnVtYmVyKHkpLCBzaGlwTmFtZSlcbiAgICB9XG5cblxuICAgIHVwZGF0ZUJvYXJkQXJyYXkoeCwgeSwgc2hpcE5hbWUpIHtcbiAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHNoaXBOYW1lXG4gICAgfSAgXG5cbiAgICBnZXRCb2FyZCgpIHtcbiAgICAgICAgY29uc3QgYm9hcmRDb3B5ID0gWy4uLnRoaXMuYm9hcmRdXG4gICAgICAgIHJldHVybiBib2FyZENvcHlcbiAgICB9XG5cbiAgICBnZXRNaXNzZWRBdHRhY2tzKCkge1xuICAgICAgICBjb25zdCBtaXNzZWRBdHRhY2tBcnJDb3B5ID0gWy4uLnRoaXMubWlzc2VkQXR0YWNrc11cbiAgICAgICAgcmV0dXJuIG1pc3NlZEF0dGFja0FyckNvcHlcbiAgICB9XG5cbiAgICBnZXRTdWNjZXNzZnVsQXR0YWNrcygpIHtcbiAgICAgICAgY29uc3Qgc3VjY2Vzc2Z1bEF0dGFja0FyckNvcHkgPSBbLi4udGhpcy5zdWNjZXNzZnVsQXR0YWNrc11cbiAgICAgICAgcmV0dXJuIHN1Y2Nlc3NmdWxBdHRhY2tBcnJDb3B5XG4gICAgfVxuXG4gICAgI3N0b3JlTWlzc2VkQXR0YWNrKHgsIHkpIHtcbiAgICAgICAgdGhpcy5taXNzZWRBdHRhY2tzLnB1c2goW3gseV0pXG4gICAgfVxuXG4gICAgI3N0b3JlU3VjY2Vzc2Z1bEF0dGFjayh4LCB5KSB7XG4gICAgICAgIHRoaXMuc3VjY2Vzc2Z1bEF0dGFja3MucHVzaChbeCwgeV0pXG4gICAgfVxuXG4gICAgI2lzVmFsaWRBdHRhY2soeCwgeSkge1xuICAgICAgICAvLyBhbGwgc2hvdWxkIGJlIHRydWVcbiAgICAgICAgY29uc3QgdW5pcXVlTWlzc2VkQXR0YWNrID0gIXRoaXMuZ2V0TWlzc2VkQXR0YWNrcygpLmluY2x1ZGVzKFt4LCB5XSlcbiAgICAgICAgY29uc3QgdW5pcXVlU3VjY2Vzc2Z1bEF0dGFjayA9ICF0aGlzLmdldFN1Y2Nlc3NmdWxBdHRhY2tzKCkuaW5jbHVkZXMoW3gsIHldKSBcbiAgICAgICAgY29uc3QgdmFsaWRDb29yZGluYXRlcyA9ICh4ID49IDAgJiYgeCA8PSA5KSAmJiAoeSA+PSAwICYmIHkgPD0gOSlcblxuICAgICAgICByZXR1cm4gdW5pcXVlTWlzc2VkQXR0YWNrICYmIHVuaXF1ZVN1Y2Nlc3NmdWxBdHRhY2sgJiYgdmFsaWRDb29yZGluYXRlc1xuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIHNoaXAgYXQgW3gsIHldIGNvb3JkaW5hdGVzXG4gICAgICAgIC8vIGlmIHllcywgYXBwbHkgZGFtYWdlIHRvIHRoaXMuc2hpcCAmIHJlY29yZCBzdWNjZXNzZnVsIGF0dGFja1xuICAgICAgICAvLyBpZiBub3QsIHJlY29yZCB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIG1pc3NlZCBhdHRhY2tcblxuICAgICAgICBpZiAodGhpcy4jaXNWYWxpZEF0dGFjayh4LCB5KSkge1xuICAgICAgICAgICAgY29uc3QgYm9hcmQgPSB0aGlzLmdldEJvYXJkKClcbiAgICAgICAgICAgIGNvbnN0IHNoaXBzID0ge1xuICAgICAgICAgICAgICAgICdjYXJyaWVyJzogdGhpcy5jYXJyaWVyLCBcbiAgICAgICAgICAgICAgICAnYmF0dGxlc2hpcCc6IHRoaXMuYmF0dGxlc2hpcCwgXG4gICAgICAgICAgICAgICAgJ2NydWlzZXInOiB0aGlzLmNydWlzZXIsIFxuICAgICAgICAgICAgICAgICdzdWJtYXJpbmUnOiB0aGlzLnN1Ym1hcmluZSwgXG4gICAgICAgICAgICAgICAgJ2Rlc3Ryb3llcic6IHRoaXMuZGVzdHJveWVyXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChib2FyZFt4XVt5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNoaXBzW2JvYXJkW3hdW3ldXS5oaXQoKVxuICAgICAgICAgICAgICAgIHRoaXMuI3N0b3JlU3VjY2Vzc2Z1bEF0dGFjayh4LCB5KVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkl0J3MgYSBoaXQhXCJcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4jc3RvcmVNaXNzZWRBdHRhY2soeCwgeSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJJdCdzIGEgbWlzcyFcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSByZXR1cm4gJ0ludmFsaWQgYXR0YWNrJ1xuICAgIH1cblxuICAgIGFyZUFsbFNoaXBzU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0U3VjY2Vzc2Z1bEF0dGFja3MoKS5sZW5ndGggPj0gMTcpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBzID0gdGhpcy5nZXRBbGxTaGlwcygpXG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuc3VuayA9PT0gdHJ1ZSlcblxuICAgICAgICAgICAgaWYgKHN0YXR1cykgY29uc29sZS5sb2coJ0FsbCBzaGlwcyBoYXZlIHN1bmshISEnKVxuXG4gICAgICAgICAgICByZXR1cm4gc3RhdHVzXG4gICAgICAgICAgICBcbiAgICAgICAgfSByZXR1cm4gZmFsc2VcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZEZhY3RvcnknXG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLiNjcmVhdGVCb2FyZCgpXG4gICAgfVxuXG4gICAgI2NyZWF0ZUJvYXJkKCkge1xuICAgICAgICBjb25zdCBuZXdCb2FyZCA9IG5ldyBHYW1lYm9hcmRcbiAgICAgICAgcmV0dXJuIG5ld0JvYXJkXG4gICAgfVxuXG4gICAgYXR0YWNrRW5lbXkoY29vcmRpbmF0ZXNBcnIsIGVuZW15Qm9hcmQpIHtcbiAgICAgICAgY29uc3QgW3gsIHldID0gWy4uLmNvb3JkaW5hdGVzQXJyXSBcbiAgICAgICAgY29uc3QgYXR0YWNrRmVlZGJhY2sgPSBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSlcbiAgICAgICAgcmV0dXJuIGF0dGFja0ZlZWRiYWNrXG4gICAgfVxuXG4gICAgdmlld0JvYXJkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib2FyZC5nZXRCb2FyZCgpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXIiLCJjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZSxcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMDtcbiAgICAgICAgdGhpcy5zdW5rID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaGl0KCkge1xuICAgICAgICB0aGlzLmRhbWFnZSA9IHRoaXMuZGFtYWdlICsgMVxuICAgICAgICB0aGlzLiNpc1N1bmsoKVxuICAgIH1cblxuICAgICNzZXRTaGlwQXNTdW5rKCkge1xuICAgICAgICB0aGlzLnN1bmsgPSB0cnVlXG4gICAgfVxuXG4gICAgI2lzU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGFtYWdlID09PSB0aGlzLmxlbmd0aCkgdGhpcy4jc2V0U2hpcEFzU3VuaygpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwIiwiaW1wb3J0IGFwcGx5RHJhZ0Ryb3AgZnJvbSBcIi4vZXZlbnRMaXN0ZW5lcnNcIlxuaW1wb3J0IHsgY3JlYXRlQm9hcmRDb21wb25lbnQsIGJ1aWxkTWFpblNjcmVlbiwgY3JlYXRlUGxheWVyQm9hcmRVSSB9IGZyb20gXCIuL2NvbXBvbmVudHMvZ2FtZWJvYXJkVUlcIlxuaW1wb3J0IEJvdCBmcm9tIFwiLi9mYWN0b3JpZXMvYm90RmFjdG9yeVwiXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL2ZhY3Rvcmllcy9wbGF5ZXJGYWN0b3J5XCJcblxuLy8gY3JlYXRlIHBsYXllciBnYW1lYm9hcmRcbmNyZWF0ZVBsYXllckJvYXJkVUkoKVxuXG4vLyBjcmVhdGUgcGxheWVyIG9iamVjdFxuY29uc3QgcDEgPSBuZXcgUGxheWVyXG5cbi8vIGFjdGl2YXRlIGV2ZW50IGxpc3RlbmVyc1xuYXBwbHlEcmFnRHJvcChwMS5ib2FyZClcblxuXG5cbi8vIHN0YXJ0IGdhbWVcbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgICBjb25zdCBib3QgPSBuZXcgQm90XG4gICAgYm90LnBvc2l0aW9uQWxsU2hpcHMoKVxuICAgIGNvbnNvbGUubG9nKGJvdC52aWV3Qm9hcmQoKSlcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBzdGFydEdhbWUiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9