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
/* harmony export */   getRandomNum: () => (/* binding */ getRandomNum),
/* harmony export */   simulateDragDrop: () => (/* binding */ simulateDragDrop)
/* harmony export */ });
function getRandomNum(min, max) {
    const num = Math.random() * (max - min + 1) + min;
    return Math.floor(num)
}

function simulateDragDrop() {
    const carrier = document.querySelector('#carrier');
    const carrierElem = document.querySelector('[data-x="3"][data-y="5"]');

    const submarine = document.querySelector('#submarine');
    const submarineElem = document.querySelector('[data-x="6"][data-y="4"]');

    const battleship = document.querySelector('#battleship');
    const battleshipElem = document.querySelector('[data-x="2"][data-y="1"]');

    const destroyer = document.querySelector('#destroyer');
    const destroyerElem = document.querySelector('[data-x="0"][data-y="0"]');

    const cruiser = document.querySelector('#cruiser');
    const cruiserElem = document.querySelector('[data-x="6"][data-y="9"]');

    simulations(carrier, carrierElem)
    simulations(battleship, battleshipElem)
    simulations(destroyer, destroyerElem)
    simulations(submarine, submarineElem)
    simulations(cruiser, cruiserElem)


    function simulations(shipElement, targetElement) {
        // Simulate drag start event
        const dragStartEvent = new Event('dragstart', { bubbles: true });
        Object.defineProperty(dragStartEvent, 'dataTransfer', {
        value: {
            setData: function() {}
        }
        });
        shipElement.dispatchEvent(dragStartEvent);
    
        // Simulate drag enter event
        const dragEnterEvent = new Event('dragenter', { bubbles: true });
        targetElement.dispatchEvent(dragEnterEvent);
    
        // Simulate drag over event
        const dragOverEvent = new Event('dragover', { bubbles: true });
        targetElement.dispatchEvent(dragOverEvent);
    
        // Simulate drop event
        const dropEvent = new Event('drop', { bubbles: true });
        Object.defineProperty(dropEvent, 'dataTransfer', {
        value: {
            getData: function() { return shipElement.id + ',' + shipElement.dataset.length + ',' + shipElement.dataset.rotated; }
        }
        });
        targetElement.dispatchEvent(dropEvent);
    
        // Simulate drag end event
        const dragEndEvent = new Event('dragend', { bubbles: true });
        shipElement.dispatchEvent(dragEndEvent);
    }
  }



/***/ }),

/***/ "./src/eventListeners.js":
/*!*******************************!*\
  !*** ./src/eventListeners.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   allowPlayerToAttack: () => (/* binding */ allowPlayerToAttack),
/* harmony export */   applyDragDrop: () => (/* binding */ applyDragDrop)
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

function allowPlayerToAttack() {
    const botBoard = document.querySelector('.bBoard .boardGrid')
    console.log(botBoard)
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

        let xCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9)
        let yCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9)

        while (!this.isEmptyPosition(xCoord, yCoord, enemyGameboard.getBoard())) {
            xCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9)
            yCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9)
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
        const isRotated = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 1) // 0 == false, 1 == true
            
        // initiate variables
        let xCoord = 0;
        let yCoord = 0;
            
        // generate starting coordinates
        if (isRotated == 1) {
            xCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9 - ship.length) // example, if shipLength=5, then choose 0-5 x-coordinates
            yCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9)

            coordinatesArr.push([xCoord, yCoord])

            for (let i = 1 ; i < ship.length ; i++ ) {
                coordinatesArr.push([xCoord + i, yCoord])
            }

        } else { // otherwise, horizontal
            xCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9)
            yCoord = (0,_components_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomNum)(0, 9 - ship.length)

            coordinatesArr.push([xCoord, yCoord])

            for (let i = 1 ; i < ship.length ; i++ ) {
                coordinatesArr.push([xCoord, yCoord + i])
            }
        }

        // check if coordinates are occupied
        const isValid = coordinatesArr.every(coord => this.isEmptyPosition(coord[0], coord[1], this.viewBoard()))
        console.log(coordinatesArr)

        // return if valid coordinates, otherwise find new ones
        if (isValid) return coordinatesArr
        else { this.#generateCoordinates(ship) }
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
/* harmony import */ var _components_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/utilities */ "./src/components/utilities.js");
/* harmony import */ var _factories_botFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factories/botFactory */ "./src/factories/botFactory.js");
/* harmony import */ var _factories_playerFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./factories/playerFactory */ "./src/factories/playerFactory.js");






// create player gameboard
(0,_components_gameboardUI__WEBPACK_IMPORTED_MODULE_1__.createPlayerBoardUI)()

// create player object
const p1 = new _factories_playerFactory__WEBPACK_IMPORTED_MODULE_4__["default"]

// activate event listeners
;(0,_eventListeners__WEBPACK_IMPORTED_MODULE_0__.applyDragDrop)(p1.board)
;(0,_components_utilities__WEBPACK_IMPORTED_MODULE_2__.simulateDragDrop)()

// start game
function createBot() {
    const bot = new _factories_botFactory__WEBPACK_IMPORTED_MODULE_3__["default"]
    bot.positionAllShips()
    console.log(bot.viewBoard())

    ;(0,_eventListeners__WEBPACK_IMPORTED_MODULE_0__.allowPlayerToAttack)()
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createBot);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ckI7QUFDQSwrREFBYTtBQUNiLHdFQUFnQjs7QUFFaEI7QUFDQTtBQUNBLG9CQUFvQiw2REFBRztBQUN2QjtBQUNBOztBQUVBLElBQUkscUVBQW1CO0FBQ3ZCOzs7QUFHQSxpRUFBZTs7Ozs7O1VDMUJmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztVRU5BO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL2dhbWVib2FyZFVJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9ib3RGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2dhbWVib2FyZEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvcGxheWVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9zaGlwRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlQm9hcmRDb21wb25lbnQocGFyZW50Q29udGFpbmVyKSB7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVZSGVhZGVyKCkge1xuICAgICAgICBjb25zdCB5SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgeUhlYWRlci5jbGFzc0xpc3QuYWRkKCdib2FyZFlIZWFkZXInKVxuICAgICAgICBjb25zdCBsZXR0ZXJzID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRicsICdHJywgJ0gnLCAnSScsICdKJ11cbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gOTsgeSsrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ2JveEhlYWRlcicpXG4gICAgICAgICAgICBib3guaW5uZXJUZXh0ID0gbGV0dGVyc1t5XSBcbiAgICAgICAgICAgIHlIZWFkZXIuYXBwZW5kKGJveClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geUhlYWRlclxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVhIZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IHhIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB4SGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkWEhlYWRlcicpXG5cbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPD0gOTsgeCsrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ2JveEhlYWRlcicpXG4gICAgICAgICAgICBib3guaW5uZXJUZXh0ID0geCArIDEgLy8gb2Zmc2V0IGZvciB6ZXJvIGluZGV4aW5nXG4gICAgICAgICAgICB4SGVhZGVyLmFwcGVuZChib3gpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHhIZWFkZXJcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgdG9wLWxldmVsIGNvbnRhaW5lcnNcbiAgICBjb25zdCBjaGlsZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgY2hpbGRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmRDb250YWluZXInKVxuXG4gICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2JvYXJkR3JpZCcpXG5cbiAgICAvLyBjcmVhdGUgYm9hcmQgZ3JpZHNcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSA5OyB4KyspIHtcbiAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgcm93LmNsYXNzTGlzdC5hZGQoJ3JvdycpXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IDk7IHkrKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCdib3gnKVxuICAgICAgICAgICAgYm94LmRhdGFzZXQueCA9IHhcbiAgICAgICAgICAgIGJveC5kYXRhc2V0LnkgPSB5XG4gICAgICAgICAgICByb3cuYXBwZW5kKGJveClcbiAgICAgICAgfVxuICAgICAgICBib2FyZC5hcHBlbmQocm93KVxuICAgIH1cblxuXG4gICAgLy8gYXBwZW5kIHRvIGNvbnRhaW5lcnNcbiAgICBjaGlsZENvbnRhaW5lci5hcHBlbmQoY3JlYXRlWEhlYWRlcigpLCBjcmVhdGVZSGVhZGVyKCksIGJvYXJkKVxuICAgIHBhcmVudENvbnRhaW5lci5hcHBlbmQoY2hpbGRDb250YWluZXIpXG59XG5cbmZ1bmN0aW9uIGJ1aWxkTWFpblNjcmVlbigpIHtcbiAgICBmdW5jdGlvbiBzaG93TWFpblNjcmVlbigpIHtcbiAgICAgICAgY29uc3QgaW50cm9TY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW50cm8nKVxuICAgICAgICBpbnRyb1NjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgXG4gICAgICAgIGNvbnN0IG1haW5TY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpXG4gICAgICAgIG1haW5TY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmludHJvIC5wQm9hcmQnKVxuICAgIFxuICAgICAgICBjb25zdCBwbGF5ZXJTaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllclNpZGUnKVxuICAgICAgICBwbGF5ZXJTaWRlLmFwcGVuZChwQm9hcmQpXG4gICAgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQm90Qm9hcmRVSSgpIHtcbiAgICAgICAgY29uc3QgYm90Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYkJvYXJkJylcbiAgICAgICAgY3JlYXRlQm9hcmRDb21wb25lbnQoYm90Qm9hcmQpXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHVwZGF0ZUJvYXJkU2l6ZXMoKSB7XG4gICAgICAgIGNvbnN0IGJveFNpemUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCc6cm9vdCcpXG4gICAgICAgIGJveFNpemUuc3R5bGUuc2V0UHJvcGVydHkoJy0tYm94U2l6ZScsICc1MHB4JylcbiAgICB9XG5cbiAgICBjcmVhdGVCb3RCb2FyZFVJKClcbiAgICBzaG93TWFpblNjcmVlbigpXG4gICAgdXBkYXRlQm9hcmRTaXplcygpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckJvYXJkVUkoKSB7XG4gICAgY29uc3QgcEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBCb2FyZCcpXG4gICAgY3JlYXRlQm9hcmRDb21wb25lbnQocEJvYXJkKVxufVxuXG5cbmV4cG9ydCB7IGNyZWF0ZUJvYXJkQ29tcG9uZW50LCBidWlsZE1haW5TY3JlZW4sIGNyZWF0ZVBsYXllckJvYXJkVUkgfSIsImZ1bmN0aW9uIGdldFJhbmRvbU51bShtaW4sIG1heCkge1xuICAgIGNvbnN0IG51bSA9IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW47XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobnVtKVxufVxuXG5mdW5jdGlvbiBzaW11bGF0ZURyYWdEcm9wKCkge1xuICAgIGNvbnN0IGNhcnJpZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FycmllcicpO1xuICAgIGNvbnN0IGNhcnJpZXJFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEteD1cIjNcIl1bZGF0YS15PVwiNVwiXScpO1xuXG4gICAgY29uc3Qgc3VibWFyaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1Ym1hcmluZScpO1xuICAgIGNvbnN0IHN1Ym1hcmluZUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS14PVwiNlwiXVtkYXRhLXk9XCI0XCJdJyk7XG5cbiAgICBjb25zdCBiYXR0bGVzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JhdHRsZXNoaXAnKTtcbiAgICBjb25zdCBiYXR0bGVzaGlwRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXg9XCIyXCJdW2RhdGEteT1cIjFcIl0nKTtcblxuICAgIGNvbnN0IGRlc3Ryb3llciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXN0cm95ZXInKTtcbiAgICBjb25zdCBkZXN0cm95ZXJFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEteD1cIjBcIl1bZGF0YS15PVwiMFwiXScpO1xuXG4gICAgY29uc3QgY3J1aXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjcnVpc2VyJyk7XG4gICAgY29uc3QgY3J1aXNlckVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS14PVwiNlwiXVtkYXRhLXk9XCI5XCJdJyk7XG5cbiAgICBzaW11bGF0aW9ucyhjYXJyaWVyLCBjYXJyaWVyRWxlbSlcbiAgICBzaW11bGF0aW9ucyhiYXR0bGVzaGlwLCBiYXR0bGVzaGlwRWxlbSlcbiAgICBzaW11bGF0aW9ucyhkZXN0cm95ZXIsIGRlc3Ryb3llckVsZW0pXG4gICAgc2ltdWxhdGlvbnMoc3VibWFyaW5lLCBzdWJtYXJpbmVFbGVtKVxuICAgIHNpbXVsYXRpb25zKGNydWlzZXIsIGNydWlzZXJFbGVtKVxuXG5cbiAgICBmdW5jdGlvbiBzaW11bGF0aW9ucyhzaGlwRWxlbWVudCwgdGFyZ2V0RWxlbWVudCkge1xuICAgICAgICAvLyBTaW11bGF0ZSBkcmFnIHN0YXJ0IGV2ZW50XG4gICAgICAgIGNvbnN0IGRyYWdTdGFydEV2ZW50ID0gbmV3IEV2ZW50KCdkcmFnc3RhcnQnLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkcmFnU3RhcnRFdmVudCwgJ2RhdGFUcmFuc2ZlcicsIHtcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIHNldERhdGE6IGZ1bmN0aW9uKCkge31cbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2hpcEVsZW1lbnQuZGlzcGF0Y2hFdmVudChkcmFnU3RhcnRFdmVudCk7XG4gICAgXG4gICAgICAgIC8vIFNpbXVsYXRlIGRyYWcgZW50ZXIgZXZlbnRcbiAgICAgICAgY29uc3QgZHJhZ0VudGVyRXZlbnQgPSBuZXcgRXZlbnQoJ2RyYWdlbnRlcicsIHsgYnViYmxlczogdHJ1ZSB9KTtcbiAgICAgICAgdGFyZ2V0RWxlbWVudC5kaXNwYXRjaEV2ZW50KGRyYWdFbnRlckV2ZW50KTtcbiAgICBcbiAgICAgICAgLy8gU2ltdWxhdGUgZHJhZyBvdmVyIGV2ZW50XG4gICAgICAgIGNvbnN0IGRyYWdPdmVyRXZlbnQgPSBuZXcgRXZlbnQoJ2RyYWdvdmVyJywgeyBidWJibGVzOiB0cnVlIH0pO1xuICAgICAgICB0YXJnZXRFbGVtZW50LmRpc3BhdGNoRXZlbnQoZHJhZ092ZXJFdmVudCk7XG4gICAgXG4gICAgICAgIC8vIFNpbXVsYXRlIGRyb3AgZXZlbnRcbiAgICAgICAgY29uc3QgZHJvcEV2ZW50ID0gbmV3IEV2ZW50KCdkcm9wJywgeyBidWJibGVzOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZHJvcEV2ZW50LCAnZGF0YVRyYW5zZmVyJywge1xuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgZ2V0RGF0YTogZnVuY3Rpb24oKSB7IHJldHVybiBzaGlwRWxlbWVudC5pZCArICcsJyArIHNoaXBFbGVtZW50LmRhdGFzZXQubGVuZ3RoICsgJywnICsgc2hpcEVsZW1lbnQuZGF0YXNldC5yb3RhdGVkOyB9XG4gICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRhcmdldEVsZW1lbnQuZGlzcGF0Y2hFdmVudChkcm9wRXZlbnQpO1xuICAgIFxuICAgICAgICAvLyBTaW11bGF0ZSBkcmFnIGVuZCBldmVudFxuICAgICAgICBjb25zdCBkcmFnRW5kRXZlbnQgPSBuZXcgRXZlbnQoJ2RyYWdlbmQnLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG4gICAgICAgIHNoaXBFbGVtZW50LmRpc3BhdGNoRXZlbnQoZHJhZ0VuZEV2ZW50KTtcbiAgICB9XG4gIH1cblxuZXhwb3J0IHsgZ2V0UmFuZG9tTnVtLCBzaW11bGF0ZURyYWdEcm9wIH0iLCJpbXBvcnQgeyBidWlsZE1haW5TY3JlZW4gfSBmcm9tIFwiLi9jb21wb25lbnRzL2dhbWVib2FyZFVJXCJcbmltcG9ydCBjcmVhdGVCb3QgZnJvbSAnLi9pbmRleCdcbi8vIHJvdGF0ZWQgPSB2ZXJ0aWNhbFxuLy8gbm90IHJvdGF0ZWQgPSBob3Jpem9udGFsXG5cbi8vIERSQUcgTiBEUk9QXG5mdW5jdGlvbiBhcHBseURyYWdEcm9wKGJvYXJkKSB7XG4gICAgYWxsb3dSb3RhdGUoKVxuXG4gICAgZnVuY3Rpb24gZHJhZ1N0YXJ0SGFuZGxlcihldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImRyYWdnaW5nXCIsIGV2ZW50LnRhcmdldC5pZCwgXCIuLi5cIilcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIGAke2V2ZW50LnRhcmdldC5pZH0sJHtldmVudC50YXJnZXQuZGF0YXNldC5sZW5ndGh9LCAke2V2ZW50LnRhcmdldC5kYXRhc2V0LnJvdGF0ZWR9YClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnT3ZlckhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyb3BIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGZ1bmN0aW9uIHBvcHVsYXRlTmV4dEJveChib3hFbGVtZW50LCByZXBlYXQsIGlzUm90YXRlZCkge1xuICAgICAgICAgICAgaWYgKHJlcGVhdCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBib3hFbGVtZW50LmNsYXNzTGlzdC5hZGQoc2hpcE5hbWUsIFwiZHJvcHBlZFwiKVxuICAgICAgICAgICAgYm9hcmQucG9zaXRpb25TaGlwKGJveEVsZW1lbnQuZGF0YXNldC54LCBib3hFbGVtZW50LmRhdGFzZXQueSwgc2hpcE5hbWUpXG4gICAgICAgICAgICByZXBlYXQgLS1cblxuICAgICAgICAgICAgaWYgKGlzUm90YXRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBOdW1iZXIoYm94RWxlbWVudC5kYXRhc2V0LngpXG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9XCIke3grMX1cIl1bZGF0YS15PVwiJHtib3hFbGVtZW50LmRhdGFzZXQueX1cIl1gKVxuICAgICAgICAgICAgICAgIHBvcHVsYXRlTmV4dEJveChuZXh0RGl2LCByZXBlYXQsIGlzUm90YXRlZClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9wdWxhdGVOZXh0Qm94KGJveEVsZW1lbnQubmV4dFNpYmxpbmcsIHJlcGVhdCwgaXNSb3RhdGVkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRnJvbVNoaXB5YXJkKHNoaXBOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7c2hpcE5hbWV9YClcbiAgICAgICAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInJvdGF0YWJsZVwiKVxuICAgICAgICAgICAgc2hpcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICBzaGlwLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ2ZhbHNlJylcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGlzVmFsaWREcm9wWm9uZShldmVudCwgc2hpcExlbmd0aCwgaXNSb3RhdGVkKSB7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEluZGV4QmFzZWRPblNoaXBSb3RhdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChpc1JvdGF0ZWQpIHJldHVybiBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueClcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LnkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFyZUVtcHR5U2xvdHMoYm94RWxlbWVudCwgc2hpcExlbmd0aCwgaW5kZXgsIGlzUm90YXRlZCkge1xuICAgICAgICAgICAgICAgIGlmIChib3hFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImRyb3BwZWRcIikpIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIGlmIChib3hFbGVtZW50ID09PSBudWxsKSByZXR1cm4gZmFsc2VcblxuICAgICAgICAgICAgICAgIGlmIChzaGlwTGVuZ3RoID09PSAxKSByZXR1cm4gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgbGV0IG5leHRCb3hFbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzUm90YXRlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB4ID0gTnVtYmVyKGJveEVsZW1lbnQuZGF0YXNldC54KVxuICAgICAgICAgICAgICAgICAgICBuZXh0Qm94RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9XCIke3grMX1cIl1bZGF0YS15PVwiJHtib3hFbGVtZW50LmRhdGFzZXQueX1cIl1gKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBOdW1iZXIoYm94RWxlbWVudC5kYXRhc2V0LnkpXG4gICAgICAgICAgICAgICAgICAgIG5leHRCb3hFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD1cIiR7Ym94RWxlbWVudC5kYXRhc2V0Lnh9XCJdW2RhdGEteT1cIiR7eSsxfVwiXWApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNoaXBMZW5ndGgtLVxuICAgICAgICAgICAgICAgIHJldHVybiBhcmVFbXB0eVNsb3RzKG5leHRCb3hFbGVtZW50LCBzaGlwTGVuZ3RoLCBpbmRleCwgaXNSb3RhdGVkKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGdldEluZGV4QmFzZWRPblNoaXBSb3RhdGlvbihldmVudClcblxuICAgICAgICAgICAgY29uc3QgdmFsaWRJbmRpY2VzID0gKGluZGV4ICsgKHNoaXBMZW5ndGggLSAxKSkgPD0gOVxuICAgICAgICAgICAgaWYgKCF2YWxpZEluZGljZXMpIHJldHVybiBmYWxzZVxuXG4gICAgICAgICAgICBjb25zdCBlbXB0eVNsb3RzID0gYXJlRW1wdHlTbG90cyhldmVudC50YXJnZXQsIHNoaXBMZW5ndGgsIGluZGV4LCBpc1JvdGF0ZWQpXG4gICAgICAgICAgICByZXR1cm4gZW1wdHlTbG90c1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBsZXQgW3NoaXBOYW1lLCBzaGlwTGVuZ3RoLCBpc1JvdGF0ZWRdID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpLnNwbGl0KCcsJylcblxuICAgICAgICBpc1JvdGF0ZWQgPSAgaXNSb3RhdGVkID09PSBcIiBmYWxzZVwiID8gZmFsc2UgOiB0cnVlXG5cbiAgICAgICAgaWYgKGlzVmFsaWREcm9wWm9uZShldmVudCwgc2hpcExlbmd0aCwgaXNSb3RhdGVkKSkge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoc2hpcE5hbWUsIFwiZHJvcHBlZFwiKVxuICAgICAgICAgICAgcG9wdWxhdGVOZXh0Qm94KGV2ZW50LnRhcmdldCwgc2hpcExlbmd0aCwgaXNSb3RhdGVkKVxuICAgICAgICAgICAgcmVtb3ZlRnJvbVNoaXB5YXJkKHNoaXBOYW1lKVxuICAgICAgICAgICAgYm9hcmQubnVtT2ZTaGlwc1JlYWR5KytcblxuICAgICAgICAgICAgLy8gaWYgYWxsIHNoaXBzIGFyZSBwb3NpdGlvbmVkIG9uIHRoZSBib2FyZCwgdGhlbiBhbGxvdyB1c2VyIHRvIHN0YXJ0IHRoZSBnYW1lXG4gICAgICAgICAgICBpZiAoYm9hcmQubnVtT2ZTaGlwc1JlYWR5ID09PSA1KSB0b2dnbGVCZWdpbkJhdHRsZUJ0bigpXG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPY2N1cGllZEJveChldmVudCkge1xuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRyb3BwZWRcIilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnTGVhdmVIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdFbnRlckhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFpc09jY3VwaWVkQm94KGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZGVudGlmeSBkcmFnZ2FibGUgc2hpcHNcbiAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwJykgXG4gICAgY29uc3QgYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm94JylcblxuXG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGV2ZW50ID0+IGRyYWdTdGFydEhhbmRsZXIoZXZlbnQpKVxuICAgICAgICAvLyBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnXCIsIGV2ZW50ID0+IGRyYWdnaW5nSGFuZGxlcihldmVudCkpXG4gICAgICAgIC8vIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZXZlbnQgPT4gZHJhZ0VuZEhhbmRsZXIoZXZlbnQpKVxuICAgIH0pXG5cbiAgICBib3hlcy5mb3JFYWNoKGJveCA9PiB7XG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIGV2ZW50ID0+IGRyYWdFbnRlckhhbmRsZXIoZXZlbnQpKVxuICAgICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGV2ZW50ID0+IGRyYWdPdmVySGFuZGxlcihldmVudCkpXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIGV2ZW50ID0+IGRyYWdMZWF2ZUhhbmRsZXIoZXZlbnQpKVxuICAgICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZXZlbnQgPT4gZHJvcEhhbmRsZXIoZXZlbnQpKVxuICAgIH0pXG5cbn1cblxuZnVuY3Rpb24gYWxsb3dSb3RhdGUoKSB7XG4gICAgY29uc3Qgcm90YXRhYmxlU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm90YXRhYmxlJylcblxuICAgIHJvdGF0YWJsZVNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHJvdGF0ZVNoaXAoZSwgZS50YXJnZXQuZGF0YXNldC5sZW5ndGgpKVxuICAgIH0pXG5cblxuICAgIGZ1bmN0aW9uIHJvdGF0ZVNoaXAoZSwgc2hpcExlbmd0aCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQucm90YXRlZCA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLndpZHRoID0gYGNhbGModmFyKC0tc2hpcEJveFNpemUpICogJHtzaGlwTGVuZ3RofSlgXG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5oZWlnaHQgPSBcInZhcigtLXNoaXBCb3hTaXplKVwiXG4gICAgICAgICAgICBlLnRhcmdldC5kYXRhc2V0LnJvdGF0ZWQgPSBcImZhbHNlXCJcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUud2lkdGggPSBcInZhcigtLXNoaXBCb3hTaXplKVwiXG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5oZWlnaHQgPSBgY2FsYyh2YXIoLS1zaGlwQm94U2l6ZSkgKiAke3NoaXBMZW5ndGh9KWBcbiAgICAgICAgICAgIGUudGFyZ2V0LmRhdGFzZXQucm90YXRlZCA9IFwidHJ1ZVwiXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUJlZ2luQmF0dGxlQnRuKCkge1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5iZWdpbkJhdHRsZScpXG4gICAgaWYgKCFidG4uc3R5bGUuZGlzcGxheSkge1xuICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuICAgICAgICBhbGxvd0dhbWVTdGFydChidG4pXG4gICAgfVxuICAgIGVsc2UgeyBidG4uc3R5bGUuZGlzcGxheSA9ICdub25lJ31cbn1cblxuZnVuY3Rpb24gcmVzZXRTaGlwcygpIHtcbiAgICAvLyBkaXNwbGF5IHNoaXBzIGFnYWluXG4gICAgLy8gYWxsb3cgZHJhZ2dhYmxlIFxuICAgIC8vIGVtcHR5IHRoZSBib2FyZCBhcnJheVxuICAgIC8vIGVtcHR5IHRoZSBib2FyZCBncmlkXG4gICAgLy8gaGlkZSBiZWdpbiBiYXR0bGUgYnV0dG9uXG59XG5cbmZ1bmN0aW9uIGFsbG93R2FtZVN0YXJ0KGJ0bikge1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBidWlsZE1haW5TY3JlZW4oKVxuICAgICAgICBjcmVhdGVCb3QoKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGFsbG93UGxheWVyVG9BdHRhY2soKSB7XG4gICAgY29uc3QgYm90Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYkJvYXJkIC5ib2FyZEdyaWQnKVxuICAgIGNvbnNvbGUubG9nKGJvdEJvYXJkKVxufVxuXG5cbmV4cG9ydCB7IGFwcGx5RHJhZ0Ryb3AsIGFsbG93UGxheWVyVG9BdHRhY2sgfSIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmRGYWN0b3J5J1xuaW1wb3J0IHsgZ2V0UmFuZG9tTnVtIH0gZnJvbSAnLi4vY29tcG9uZW50cy91dGlsaXRpZXMnXG5cbmNsYXNzIEJvdCB7XG4gICAgI3N1Y2Nlc3NmdWxBdHRhY2s7XG4gICAgI3ByZXZpb3VzQXR0YWNrO1xuICAgICNwb3NzaWJsZVNtYXJ0TW92ZXM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IHRoaXMuI2NyZWF0ZUJvYXJkKClcbiAgICAgICAgdGhpcy4jcHJldmlvdXNBdHRhY2sgPSBudWxsXG4gICAgICAgIHRoaXMuI3N1Y2Nlc3NmdWxBdHRhY2sgPSBmYWxzZVxuICAgICAgICB0aGlzLiNwb3NzaWJsZVNtYXJ0TW92ZXMgPSBbWzAsIDFdLCBbMCwgLTFdLCBbLTEsIDBdLCBbMSwgMF1dXG4gICAgfVxuXG4gICAgI2NyZWF0ZUJvYXJkKCkge1xuICAgICAgICBjb25zdCBuZXdCb2FyZCA9IG5ldyBHYW1lYm9hcmRcbiAgICAgICAgcmV0dXJuIG5ld0JvYXJkXG4gICAgfVxuICAgIFxuICAgaXNFbXB0eVBvc2l0aW9uKHgsIHksIGdhbWVCb2FyZCkge1xuICAgICAgICByZXR1cm4gZ2FtZUJvYXJkW3hdW3ldID09PSBudWxsXG4gICAgfVxuXG4gICAgZ2V0Q29vcmRpbmF0ZXMoZW5lbXlHYW1lYm9hcmQpIHtcbiAgICAgICAgLy8gcGljayBhIHJhbmRvbSBzcG90IHdpdGhpbiB0aGUgYm9hcmRcbiAgICAgICAgLy8gc2hvdWxkIGJlIGEgdW5pcXVlIGNvb3JkaW5hdGUgZXZlcnkgdGltZVxuICAgICAgICAvLyBpZiBwcmV2aW91cyBjb29yZGluYXRlIHdhcyBhIGhpdCwgY2hvb3NlIGFuIGFkamFjZW50IGNvb3JkaW5hdGVcbiAgICAgICAgLy8gaW1wcm92ZW1lbnQgLS0gZ2VuZXJhdGUgbmV4dCBjb29yZGluYXRlIGJhc2VkIG9uIGF2YWlsYWJsZSBlbXB0eSBzbG90cyBpbnN0ZWFkIG9mIHJhbmRvbSB4L3kgY29vcmRzXG5cbiAgICAgICAgaWYgKHRoaXMuI3N1Y2Nlc3NmdWxBdHRhY2spIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiNwb3NzaWJsZVNtYXJ0TW92ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uT2Zmc2V0ID0gdGhpcy4jcG9zc2libGVTbWFydE1vdmVzLnBvcCgpXG4gICAgICAgICAgICAgICAgbGV0IHhDb29yZCA9IHRoaXMuI3ByZXZpb3VzQXR0YWNrWzBdICsgcG9zaXRpb25PZmZzZXRbMF1cbiAgICAgICAgICAgICAgICBsZXQgeUNvb3JkID0gdGhpcy4jcHJldmlvdXNBdHRhY2tbMV0gKyBwb3NpdGlvbk9mZnNldFsxXVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFt4Q29vcmQsIHlDb29yZF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB4Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcbiAgICAgICAgbGV0IHlDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5KVxuXG4gICAgICAgIHdoaWxlICghdGhpcy5pc0VtcHR5UG9zaXRpb24oeENvb3JkLCB5Q29vcmQsIGVuZW15R2FtZWJvYXJkLmdldEJvYXJkKCkpKSB7XG4gICAgICAgICAgICB4Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcbiAgICAgICAgICAgIHlDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gW3hDb29yZCwgeUNvb3JkXVxuICAgIH1cblxuXG4gICAgYXR0YWNrRW5lbXkoY29vcmRpbmF0ZXNBcnIsIGVuZW15Qm9hcmQpIHtcbiAgICAgICAgY29uc3QgW3gsIHldID0gWy4uLmNvb3JkaW5hdGVzQXJyXSBcbiAgICAgICAgY29uc3QgYXR0YWNrRmVlZGJhY2sgPSBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSlcbiAgICAgICAgaWYgKGF0dGFja0ZlZWRiYWNrID09PSBcIkl0J3MgYSBoaXQhXCIpIHtcbiAgICAgICAgICAgIHRoaXMuI3N0b3JlUHJldmlvdXNBdHRhY2soY29vcmRpbmF0ZXNBcnIsIHRydWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiNzdG9yZVByZXZpb3VzQXR0YWNrKGNvb3JkaW5hdGVzQXJyLCBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXR0YWNrRmVlZGJhY2tcbiAgICB9XG5cbiAgICB2aWV3Qm9hcmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkLmdldEJvYXJkKClcbiAgICB9XG5cbiAgICAjc3RvcmVQcmV2aW91c0F0dGFjayhjb29yZGluYXRlc0FyciwgZW5lbXlXYXNIaXQpIHtcbiAgICAgICAgdGhpcy4jcHJldmlvdXNBdHRhY2sgPSBjb29yZGluYXRlc0FyclxuICAgICAgICB0aGlzLiNzdWNjZXNzZnVsQXR0YWNrID0gZW5lbXlXYXNIaXRcbiAgICB9XG5cbiAgICBwb3NpdGlvbkFsbFNoaXBzKCkge1xuICAgICAgICBjb25zdCBhbGxTaGlwcyA9IHRoaXMuYm9hcmQuZ2V0QWxsU2hpcHMoKVxuICAgICAgICBhbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29vcmRpbmF0ZXNBcnIgPSB0aGlzLiNnZW5lcmF0ZUNvb3JkaW5hdGVzKHNoaXApXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG5ld0Nvb3JkaW5hdGVzQXJyLmZvckVhY2goY29vcmQgPT4gdGhpcy5ib2FyZC5wb3NpdGlvblNoaXAoY29vcmRbMF0sIGNvb3JkWzFdLCBzaGlwLm5hbWUpKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgICNnZW5lcmF0ZUNvb3JkaW5hdGVzKHNoaXApIHtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXNBcnIgPSBbXVxuICAgICAgICBjb25zdCBpc1JvdGF0ZWQgPSBnZXRSYW5kb21OdW0oMCwgMSkgLy8gMCA9PSBmYWxzZSwgMSA9PSB0cnVlXG4gICAgICAgICAgICBcbiAgICAgICAgLy8gaW5pdGlhdGUgdmFyaWFibGVzXG4gICAgICAgIGxldCB4Q29vcmQgPSAwO1xuICAgICAgICBsZXQgeUNvb3JkID0gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBnZW5lcmF0ZSBzdGFydGluZyBjb29yZGluYXRlc1xuICAgICAgICBpZiAoaXNSb3RhdGVkID09IDEpIHtcbiAgICAgICAgICAgIHhDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5IC0gc2hpcC5sZW5ndGgpIC8vIGV4YW1wbGUsIGlmIHNoaXBMZW5ndGg9NSwgdGhlbiBjaG9vc2UgMC01IHgtY29vcmRpbmF0ZXNcbiAgICAgICAgICAgIHlDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5KVxuXG4gICAgICAgICAgICBjb29yZGluYXRlc0Fyci5wdXNoKFt4Q29vcmQsIHlDb29yZF0pXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxIDsgaSA8IHNoaXAubGVuZ3RoIDsgaSsrICkge1xuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzQXJyLnB1c2goW3hDb29yZCArIGksIHlDb29yZF0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHsgLy8gb3RoZXJ3aXNlLCBob3Jpem9udGFsXG4gICAgICAgICAgICB4Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcbiAgICAgICAgICAgIHlDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5IC0gc2hpcC5sZW5ndGgpXG5cbiAgICAgICAgICAgIGNvb3JkaW5hdGVzQXJyLnB1c2goW3hDb29yZCwgeUNvb3JkXSlcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDEgOyBpIDwgc2hpcC5sZW5ndGggOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXNBcnIucHVzaChbeENvb3JkLCB5Q29vcmQgKyBpXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIGNvb3JkaW5hdGVzIGFyZSBvY2N1cGllZFxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gY29vcmRpbmF0ZXNBcnIuZXZlcnkoY29vcmQgPT4gdGhpcy5pc0VtcHR5UG9zaXRpb24oY29vcmRbMF0sIGNvb3JkWzFdLCB0aGlzLnZpZXdCb2FyZCgpKSlcbiAgICAgICAgY29uc29sZS5sb2coY29vcmRpbmF0ZXNBcnIpXG5cbiAgICAgICAgLy8gcmV0dXJuIGlmIHZhbGlkIGNvb3JkaW5hdGVzLCBvdGhlcndpc2UgZmluZCBuZXcgb25lc1xuICAgICAgICBpZiAoaXNWYWxpZCkgcmV0dXJuIGNvb3JkaW5hdGVzQXJyXG4gICAgICAgIGVsc2UgeyB0aGlzLiNnZW5lcmF0ZUNvb3JkaW5hdGVzKHNoaXApIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJvdFxuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwRmFjdG9yeSdcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYXJyaWVyID0gdGhpcy4jY3JlYXRlU2hpcCgnY2FycmllcicsIDUpXG4gICAgICAgIHRoaXMuYmF0dGxlc2hpcCA9IHRoaXMuI2NyZWF0ZVNoaXAoJ2JhdHRsZXNoaXAnLCA0KVxuICAgICAgICB0aGlzLmNydWlzZXIgPSB0aGlzLiNjcmVhdGVTaGlwKCdjcnVpc2VyJywgMylcbiAgICAgICAgdGhpcy5zdWJtYXJpbmUgPSB0aGlzLiNjcmVhdGVTaGlwKCdzdWJtYXJpbmUnLCAzKVxuICAgICAgICB0aGlzLmRlc3Ryb3llciA9IHRoaXMuI2NyZWF0ZVNoaXAoJ2Rlc3Ryb3llcicsIDIpXG4gICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLiNjcmVhdGVCb2FyZCgpXG4gICAgICAgIHRoaXMubWlzc2VkQXR0YWNrcyA9IFtdXG4gICAgICAgIHRoaXMuc3VjY2Vzc2Z1bEF0dGFja3MgPSBbXVxuICAgICAgICB0aGlzLm51bU9mU2hpcHNSZWFkeSA9IDA7XG4gICAgfVxuXG4gICAgI2NyZWF0ZUJvYXJkKCkge1xuICAgICAgICBsZXQgYm9hcmQgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPD0gOSA7IGkrKykge1xuICAgICAgICAgICAgbGV0IHJvdyA9IFtdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPD0gOSA7IGkrKykge1xuICAgICAgICAgICAgICAgIHJvdy5wdXNoKG51bGwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib2FyZC5wdXNoKHJvdylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm9hcmRcbiAgICB9XG4gICAgXG5cbiAgICAjY3JlYXRlU2hpcChuYW1lLCBsZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKG5hbWUsIGxlbmd0aClcbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG5cbiAgICBnZXRBbGxTaGlwcygpIHtcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBbXG4gICAgICAgICAgICB0aGlzLmNhcnJpZXIsIFxuICAgICAgICAgICAgdGhpcy5iYXR0bGVzaGlwLCBcbiAgICAgICAgICAgIHRoaXMuY3J1aXNlciwgXG4gICAgICAgICAgICB0aGlzLnN1Ym1hcmluZSwgXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3llclxuICAgICAgICBdXG4gICAgICAgIHJldHVybiBzaGlwc1xuICAgIH1cblxuICAgIHBvc2l0aW9uU2hpcCh4LCB5LCBzaGlwTmFtZSkgeyAvLyBwb3NpdGlvbiBzaGlwIGF0IHgseSBjb29yZGluYXRlc1xuICAgICAgICB0aGlzLnVwZGF0ZUJvYXJkQXJyYXkoTnVtYmVyKHgpLCBOdW1iZXIoeSksIHNoaXBOYW1lKVxuICAgIH1cblxuXG4gICAgdXBkYXRlQm9hcmRBcnJheSh4LCB5LCBzaGlwTmFtZSkge1xuICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gc2hpcE5hbWVcbiAgICB9ICBcblxuICAgIGdldEJvYXJkKCkge1xuICAgICAgICBjb25zdCBib2FyZENvcHkgPSBbLi4udGhpcy5ib2FyZF1cbiAgICAgICAgcmV0dXJuIGJvYXJkQ29weVxuICAgIH1cblxuICAgIGdldE1pc3NlZEF0dGFja3MoKSB7XG4gICAgICAgIGNvbnN0IG1pc3NlZEF0dGFja0FyckNvcHkgPSBbLi4udGhpcy5taXNzZWRBdHRhY2tzXVxuICAgICAgICByZXR1cm4gbWlzc2VkQXR0YWNrQXJyQ29weVxuICAgIH1cblxuICAgIGdldFN1Y2Nlc3NmdWxBdHRhY2tzKCkge1xuICAgICAgICBjb25zdCBzdWNjZXNzZnVsQXR0YWNrQXJyQ29weSA9IFsuLi50aGlzLnN1Y2Nlc3NmdWxBdHRhY2tzXVxuICAgICAgICByZXR1cm4gc3VjY2Vzc2Z1bEF0dGFja0FyckNvcHlcbiAgICB9XG5cbiAgICAjc3RvcmVNaXNzZWRBdHRhY2soeCwgeSkge1xuICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MucHVzaChbeCx5XSlcbiAgICB9XG5cbiAgICAjc3RvcmVTdWNjZXNzZnVsQXR0YWNrKHgsIHkpIHtcbiAgICAgICAgdGhpcy5zdWNjZXNzZnVsQXR0YWNrcy5wdXNoKFt4LCB5XSlcbiAgICB9XG5cbiAgICAjaXNWYWxpZEF0dGFjayh4LCB5KSB7XG4gICAgICAgIC8vIGFsbCBzaG91bGQgYmUgdHJ1ZVxuICAgICAgICBjb25zdCB1bmlxdWVNaXNzZWRBdHRhY2sgPSAhdGhpcy5nZXRNaXNzZWRBdHRhY2tzKCkuaW5jbHVkZXMoW3gsIHldKVxuICAgICAgICBjb25zdCB1bmlxdWVTdWNjZXNzZnVsQXR0YWNrID0gIXRoaXMuZ2V0U3VjY2Vzc2Z1bEF0dGFja3MoKS5pbmNsdWRlcyhbeCwgeV0pIFxuICAgICAgICBjb25zdCB2YWxpZENvb3JkaW5hdGVzID0gKHggPj0gMCAmJiB4IDw9IDkpICYmICh5ID49IDAgJiYgeSA8PSA5KVxuXG4gICAgICAgIHJldHVybiB1bmlxdWVNaXNzZWRBdHRhY2sgJiYgdW5pcXVlU3VjY2Vzc2Z1bEF0dGFjayAmJiB2YWxpZENvb3JkaW5hdGVzXG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgc2hpcCBhdCBbeCwgeV0gY29vcmRpbmF0ZXNcbiAgICAgICAgLy8gaWYgeWVzLCBhcHBseSBkYW1hZ2UgdG8gdGhpcy5zaGlwICYgcmVjb3JkIHN1Y2Nlc3NmdWwgYXR0YWNrXG4gICAgICAgIC8vIGlmIG5vdCwgcmVjb3JkIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgbWlzc2VkIGF0dGFja1xuXG4gICAgICAgIGlmICh0aGlzLiNpc1ZhbGlkQXR0YWNrKHgsIHkpKSB7XG4gICAgICAgICAgICBjb25zdCBib2FyZCA9IHRoaXMuZ2V0Qm9hcmQoKVxuICAgICAgICAgICAgY29uc3Qgc2hpcHMgPSB7XG4gICAgICAgICAgICAgICAgJ2NhcnJpZXInOiB0aGlzLmNhcnJpZXIsIFxuICAgICAgICAgICAgICAgICdiYXR0bGVzaGlwJzogdGhpcy5iYXR0bGVzaGlwLCBcbiAgICAgICAgICAgICAgICAnY3J1aXNlcic6IHRoaXMuY3J1aXNlciwgXG4gICAgICAgICAgICAgICAgJ3N1Ym1hcmluZSc6IHRoaXMuc3VibWFyaW5lLCBcbiAgICAgICAgICAgICAgICAnZGVzdHJveWVyJzogdGhpcy5kZXN0cm95ZXJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJvYXJkW3hdW3ldICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2hpcHNbYm9hcmRbeF1beV1dLmhpdCgpXG4gICAgICAgICAgICAgICAgdGhpcy4jc3RvcmVTdWNjZXNzZnVsQXR0YWNrKHgsIHkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiSXQncyBhIGhpdCFcIlxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiNzdG9yZU1pc3NlZEF0dGFjayh4LCB5KVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkl0J3MgYSBtaXNzIVwiXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHJldHVybiAnSW52YWxpZCBhdHRhY2snXG4gICAgfVxuXG4gICAgYXJlQWxsU2hpcHNTdW5rKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRTdWNjZXNzZnVsQXR0YWNrcygpLmxlbmd0aCA+PSAxNykge1xuICAgICAgICAgICAgY29uc3Qgc2hpcHMgPSB0aGlzLmdldEFsbFNoaXBzKClcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5zdW5rID09PSB0cnVlKVxuXG4gICAgICAgICAgICBpZiAoc3RhdHVzKSBjb25zb2xlLmxvZygnQWxsIHNoaXBzIGhhdmUgc3VuayEhIScpXG5cbiAgICAgICAgICAgIHJldHVybiBzdGF0dXNcbiAgICAgICAgICAgIFxuICAgICAgICB9IHJldHVybiBmYWxzZVxuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQiLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkRmFjdG9yeSdcblxuY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IHRoaXMuI2NyZWF0ZUJvYXJkKClcbiAgICB9XG5cbiAgICAjY3JlYXRlQm9hcmQoKSB7XG4gICAgICAgIGNvbnN0IG5ld0JvYXJkID0gbmV3IEdhbWVib2FyZFxuICAgICAgICByZXR1cm4gbmV3Qm9hcmRcbiAgICB9XG5cbiAgICBhdHRhY2tFbmVteShjb29yZGluYXRlc0FyciwgZW5lbXlCb2FyZCkge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBbLi4uY29vcmRpbmF0ZXNBcnJdIFxuICAgICAgICBjb25zdCBhdHRhY2tGZWVkYmFjayA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KVxuICAgICAgICByZXR1cm4gYXR0YWNrRmVlZGJhY2tcbiAgICB9XG5cbiAgICB2aWV3Qm9hcmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkLmdldEJvYXJkKClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllciIsImNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lLFxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAwO1xuICAgICAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBoaXQoKSB7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gdGhpcy5kYW1hZ2UgKyAxXG4gICAgICAgIHRoaXMuI2lzU3VuaygpXG4gICAgfVxuXG4gICAgI3NldFNoaXBBc1N1bmsoKSB7XG4gICAgICAgIHRoaXMuc3VuayA9IHRydWVcbiAgICB9XG5cbiAgICAjaXNTdW5rKCkge1xuICAgICAgICBpZiAodGhpcy5kYW1hZ2UgPT09IHRoaXMubGVuZ3RoKSB0aGlzLiNzZXRTaGlwQXNTdW5rKClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXAiLCJpbXBvcnQgeyBhcHBseURyYWdEcm9wLCBhbGxvd1BsYXllclRvQXR0YWNrIH0gZnJvbSBcIi4vZXZlbnRMaXN0ZW5lcnNcIlxuaW1wb3J0IHsgY3JlYXRlUGxheWVyQm9hcmRVSSB9IGZyb20gXCIuL2NvbXBvbmVudHMvZ2FtZWJvYXJkVUlcIlxuaW1wb3J0IHsgc2ltdWxhdGVEcmFnRHJvcCB9IGZyb20gXCIuL2NvbXBvbmVudHMvdXRpbGl0aWVzXCJcbmltcG9ydCBCb3QgZnJvbSBcIi4vZmFjdG9yaWVzL2JvdEZhY3RvcnlcIlxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9mYWN0b3JpZXMvcGxheWVyRmFjdG9yeVwiXG5cbi8vIGNyZWF0ZSBwbGF5ZXIgZ2FtZWJvYXJkXG5jcmVhdGVQbGF5ZXJCb2FyZFVJKClcblxuLy8gY3JlYXRlIHBsYXllciBvYmplY3RcbmNvbnN0IHAxID0gbmV3IFBsYXllclxuXG4vLyBhY3RpdmF0ZSBldmVudCBsaXN0ZW5lcnNcbmFwcGx5RHJhZ0Ryb3AocDEuYm9hcmQpXG5zaW11bGF0ZURyYWdEcm9wKClcblxuLy8gc3RhcnQgZ2FtZVxuZnVuY3Rpb24gY3JlYXRlQm90KCkge1xuICAgIGNvbnN0IGJvdCA9IG5ldyBCb3RcbiAgICBib3QucG9zaXRpb25BbGxTaGlwcygpXG4gICAgY29uc29sZS5sb2coYm90LnZpZXdCb2FyZCgpKVxuXG4gICAgYWxsb3dQbGF5ZXJUb0F0dGFjaygpXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQm90IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==