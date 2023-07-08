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
/* harmony export */   simulateBeginBattle: () => (/* binding */ simulateBeginBattle),
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

function simulateBeginBattle() {
    const btn = document.querySelector('button.beginBattle')
    btn.click()
}



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
        const bot = (0,_index__WEBPACK_IMPORTED_MODULE_1__.createBot)()
        // start with player's turn
        allowPlayerAttack(_index__WEBPACK_IMPORTED_MODULE_1__.p1, bot)
    })
}

function allowTakingTurns(p1, bot, turn) {
    console.log('current turn:', turn)

    function checkIfAllShipsSunk() {
        const p1Ships = p1.board.areAllShipsSunk()
        const botShips = bot.board.areAllShipsSunk()
        return p1Ships || botShips
    }

    if (checkIfAllShipsSunk() === false) {
        if (turn === "p1") {
            enableBotBoardEvents()
        } else if (turn === "bot") {
            allowBotAttack(p1, bot)
        }
    }
}

function switchTurns(p1, bot, previousTurn) {
    if (previousTurn === "p1") {
        disableBotBoardEvents()
        allowTakingTurns(p1, bot, "bot")
    } else if (previousTurn === "bot") {
        allowTakingTurns(p1, bot, "p1")
    }
}

function allowPlayerAttack(p1, bot) {
    const boxes = document.querySelectorAll('.bBoard .boardGrid .box')
    boxes.forEach(box => {
        // hover
        box.addEventListener('mouseover', e => {
            e.target.style.backgroundColor = 'red'
        })

        // mouse hover leaves
        box.addEventListener('mouseleave', e => {
            e.target.style.backgroundColor = ''
        })

        // attack is made
        box.addEventListener('click', e => {
            console.log(e)
            const coords = [Number(e.target.dataset.x), Number(e.target.dataset.y)]

            const attackFeedback = p1.attackEnemy(coords, bot.board)
            console.log(attackFeedback)
            if (attackFeedback === "It's a miss!") {
                e.target.classList.add('miss')
            } else if (attackFeedback === "It's a hit!") {
                e.target.classList.add('hit')
            }
            switchTurns(p1, bot, 'p1')
        })
    })
}


function allowBotAttack(p1, bot) {
    const coordsArr = bot.getCoordinates(p1.board)
    const attackFeedback = bot.attackEnemy(coordsArr, p1.board)
    console.log(attackFeedback)
    const boxElem = document.querySelector(`[data-x="${coordsArr[0]}"][data-y="${coordsArr[1]}"]`)

    if (attackFeedback === "It's a miss!") {
        boxElem.classList.add('miss')
    } else if (attackFeedback === "It's a hit!") {
        boxElem.classList.add('hit')
    }
    switchTurns(p1, bot, 'bot')
}


function disableBotBoardEvents() {
    const boxes = document.querySelectorAll('.bBoard .boardGrid .box')
    boxes.forEach(box => box.classList.add('disabled'))
}

function enableBotBoardEvents() {
    const boxes = document.querySelectorAll('.bBoard .boardGrid .box')
    boxes.forEach(box => box.classList.remove('disabled'))
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
        let enemyBoard = enemyGameboard.getBoard()

        while (!this.isEmptyPosition(xCoord, yCoord, enemyBoard)) {
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

        // return if valid coordinates, otherwise find new ones
        if (isValid) return coordinatesArr
        else { return this.#generateCoordinates(ship) }
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
/* harmony export */   createBot: () => (/* binding */ createBot),
/* harmony export */   p1: () => (/* binding */ p1)
/* harmony export */ });
/* harmony import */ var _eventListeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventListeners */ "./src/eventListeners.js");
/* harmony import */ var _components_gameboardUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/gameboardUI */ "./src/components/gameboardUI.js");
/* harmony import */ var _components_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/utilities */ "./src/components/utilities.js");
/* harmony import */ var _factories_botFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factories/botFactory */ "./src/factories/botFactory.js");
/* harmony import */ var _factories_playerFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./factories/playerFactory */ "./src/factories/playerFactory.js");






// create player object
function createPlayer() {
    const p1 = new _factories_playerFactory__WEBPACK_IMPORTED_MODULE_4__["default"]
    return p1
}

// create bot object
function createBot() {
    const bot = new _factories_botFactory__WEBPACK_IMPORTED_MODULE_3__["default"]
    bot.positionAllShips()
    console.log(bot.viewBoard())
    return bot
}

// create player object & gameboard
(0,_components_gameboardUI__WEBPACK_IMPORTED_MODULE_1__.createPlayerBoardUI)()
const p1 = createPlayer()


// activate event listeners
;(0,_eventListeners__WEBPACK_IMPORTED_MODULE_0__.applyDragDrop)(p1.board)
// simulateDragDrop()
// simulateBeginBattle()



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTs7QUFFQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFVBQVU7O0FBRVY7QUFDQTs7QUFFQSxpRUFBZTs7Ozs7Ozs7Ozs7Ozs7O0FDOUgyQjs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2QkFBNkIseURBQVM7QUFDdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlOzs7Ozs7Ozs7Ozs7OztBQ3ZCZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEJpQztBQUNjO0FBQ2dCO0FBQ3RDO0FBQ007O0FBRTlDO0FBQ0E7QUFDQSxtQkFBbUIsZ0VBQU07QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLDZEQUFHO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEVBQW1CO0FBQ25COzs7QUFHQTtBQUNBLCtEQUFhO0FBQ2I7QUFDQTs7Ozs7Ozs7VUM1QkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZ2FtZWJvYXJkVUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2V2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2JvdEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvZ2FtZWJvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXJGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVCb2FyZENvbXBvbmVudChwYXJlbnRDb250YWluZXIpIHtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVlIZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IHlIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB5SGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkWUhlYWRlcicpXG4gICAgICAgIGNvbnN0IGxldHRlcnMgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCcsICdJJywgJ0onXVxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSA5OyB5KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnYm94SGVhZGVyJylcbiAgICAgICAgICAgIGJveC5pbm5lclRleHQgPSBsZXR0ZXJzW3ldIFxuICAgICAgICAgICAgeUhlYWRlci5hcHBlbmQoYm94KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB5SGVhZGVyXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlWEhlYWRlcigpIHtcbiAgICAgICAgY29uc3QgeEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHhIZWFkZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmRYSGVhZGVyJylcblxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSA5OyB4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnYm94SGVhZGVyJylcbiAgICAgICAgICAgIGJveC5pbm5lclRleHQgPSB4ICsgMSAvLyBvZmZzZXQgZm9yIHplcm8gaW5kZXhpbmdcbiAgICAgICAgICAgIHhIZWFkZXIuYXBwZW5kKGJveClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geEhlYWRlclxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSB0b3AtbGV2ZWwgY29udGFpbmVyc1xuICAgIGNvbnN0IGNoaWxkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjaGlsZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdib2FyZENvbnRhaW5lcicpXG5cbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgYm9hcmQuY2xhc3NMaXN0LmFkZCgnYm9hcmRHcmlkJylcblxuICAgIC8vIGNyZWF0ZSBib2FyZCBncmlkc1xuICAgIGZvciAobGV0IHggPSAwOyB4IDw9IDk7IHgrKykge1xuICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgncm93JylcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gOTsgeSsrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcpXG4gICAgICAgICAgICBib3guZGF0YXNldC54ID0geFxuICAgICAgICAgICAgYm94LmRhdGFzZXQueSA9IHlcbiAgICAgICAgICAgIHJvdy5hcHBlbmQoYm94KVxuICAgICAgICB9XG4gICAgICAgIGJvYXJkLmFwcGVuZChyb3cpXG4gICAgfVxuXG5cbiAgICAvLyBhcHBlbmQgdG8gY29udGFpbmVyc1xuICAgIGNoaWxkQ29udGFpbmVyLmFwcGVuZChjcmVhdGVYSGVhZGVyKCksIGNyZWF0ZVlIZWFkZXIoKSwgYm9hcmQpXG4gICAgcGFyZW50Q29udGFpbmVyLmFwcGVuZChjaGlsZENvbnRhaW5lcilcbn1cblxuZnVuY3Rpb24gYnVpbGRNYWluU2NyZWVuKCkge1xuICAgIGZ1bmN0aW9uIHNob3dNYWluU2NyZWVuKCkge1xuICAgICAgICBjb25zdCBpbnRyb1NjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnRybycpXG4gICAgICAgIGludHJvU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICBcbiAgICAgICAgY29uc3QgbWFpblNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJylcbiAgICAgICAgbWFpblNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgICAgIFxuICAgICAgICBjb25zdCBwQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW50cm8gLnBCb2FyZCcpXG4gICAgXG4gICAgICAgIGNvbnN0IHBsYXllclNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyU2lkZScpXG4gICAgICAgIHBsYXllclNpZGUuYXBwZW5kKHBCb2FyZClcbiAgICBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVCb3RCb2FyZFVJKCkge1xuICAgICAgICBjb25zdCBib3RCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iQm9hcmQnKVxuICAgICAgICBjcmVhdGVCb2FyZENvbXBvbmVudChib3RCb2FyZClcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gdXBkYXRlQm9hcmRTaXplcygpIHtcbiAgICAgICAgY29uc3QgYm94U2l6ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJzpyb290JylcbiAgICAgICAgYm94U2l6ZS5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1ib3hTaXplJywgJzUwcHgnKVxuICAgIH1cblxuICAgIGNyZWF0ZUJvdEJvYXJkVUkoKVxuICAgIHNob3dNYWluU2NyZWVuKClcbiAgICB1cGRhdGVCb2FyZFNpemVzKClcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyQm9hcmRVSSgpIHtcbiAgICBjb25zdCBwQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucEJvYXJkJylcbiAgICBjcmVhdGVCb2FyZENvbXBvbmVudChwQm9hcmQpXG59XG5cblxuZXhwb3J0IHsgY3JlYXRlQm9hcmRDb21wb25lbnQsIGJ1aWxkTWFpblNjcmVlbiwgY3JlYXRlUGxheWVyQm9hcmRVSSB9IiwiZnVuY3Rpb24gZ2V0UmFuZG9tTnVtKG1pbiwgbWF4KSB7XG4gICAgY29uc3QgbnVtID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbjtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihudW0pXG59XG5cbmZ1bmN0aW9uIHNpbXVsYXRlRHJhZ0Ryb3AoKSB7XG4gICAgY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJyaWVyJyk7XG4gICAgY29uc3QgY2FycmllckVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS14PVwiM1wiXVtkYXRhLXk9XCI1XCJdJyk7XG5cbiAgICBjb25zdCBzdWJtYXJpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWFyaW5lJyk7XG4gICAgY29uc3Qgc3VibWFyaW5lRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXg9XCI2XCJdW2RhdGEteT1cIjRcIl0nKTtcblxuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmF0dGxlc2hpcCcpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXBFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEteD1cIjJcIl1bZGF0YS15PVwiMVwiXScpO1xuXG4gICAgY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc3Ryb3llcicpO1xuICAgIGNvbnN0IGRlc3Ryb3llckVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS14PVwiMFwiXVtkYXRhLXk9XCIwXCJdJyk7XG5cbiAgICBjb25zdCBjcnVpc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NydWlzZXInKTtcbiAgICBjb25zdCBjcnVpc2VyRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXg9XCI2XCJdW2RhdGEteT1cIjlcIl0nKTtcblxuICAgIHNpbXVsYXRpb25zKGNhcnJpZXIsIGNhcnJpZXJFbGVtKVxuICAgIHNpbXVsYXRpb25zKGJhdHRsZXNoaXAsIGJhdHRsZXNoaXBFbGVtKVxuICAgIHNpbXVsYXRpb25zKGRlc3Ryb3llciwgZGVzdHJveWVyRWxlbSlcbiAgICBzaW11bGF0aW9ucyhzdWJtYXJpbmUsIHN1Ym1hcmluZUVsZW0pXG4gICAgc2ltdWxhdGlvbnMoY3J1aXNlciwgY3J1aXNlckVsZW0pXG5cblxuICAgIGZ1bmN0aW9uIHNpbXVsYXRpb25zKHNoaXBFbGVtZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgIC8vIFNpbXVsYXRlIGRyYWcgc3RhcnQgZXZlbnRcbiAgICAgICAgY29uc3QgZHJhZ1N0YXJ0RXZlbnQgPSBuZXcgRXZlbnQoJ2RyYWdzdGFydCcsIHsgYnViYmxlczogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRyYWdTdGFydEV2ZW50LCAnZGF0YVRyYW5zZmVyJywge1xuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgc2V0RGF0YTogZnVuY3Rpb24oKSB7fVxuICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzaGlwRWxlbWVudC5kaXNwYXRjaEV2ZW50KGRyYWdTdGFydEV2ZW50KTtcbiAgICBcbiAgICAgICAgLy8gU2ltdWxhdGUgZHJhZyBlbnRlciBldmVudFxuICAgICAgICBjb25zdCBkcmFnRW50ZXJFdmVudCA9IG5ldyBFdmVudCgnZHJhZ2VudGVyJywgeyBidWJibGVzOiB0cnVlIH0pO1xuICAgICAgICB0YXJnZXRFbGVtZW50LmRpc3BhdGNoRXZlbnQoZHJhZ0VudGVyRXZlbnQpO1xuICAgIFxuICAgICAgICAvLyBTaW11bGF0ZSBkcmFnIG92ZXIgZXZlbnRcbiAgICAgICAgY29uc3QgZHJhZ092ZXJFdmVudCA9IG5ldyBFdmVudCgnZHJhZ292ZXInLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG4gICAgICAgIHRhcmdldEVsZW1lbnQuZGlzcGF0Y2hFdmVudChkcmFnT3ZlckV2ZW50KTtcbiAgICBcbiAgICAgICAgLy8gU2ltdWxhdGUgZHJvcCBldmVudFxuICAgICAgICBjb25zdCBkcm9wRXZlbnQgPSBuZXcgRXZlbnQoJ2Ryb3AnLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkcm9wRXZlbnQsICdkYXRhVHJhbnNmZXInLCB7XG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBnZXREYXRhOiBmdW5jdGlvbigpIHsgcmV0dXJuIHNoaXBFbGVtZW50LmlkICsgJywnICsgc2hpcEVsZW1lbnQuZGF0YXNldC5sZW5ndGggKyAnLCcgKyBzaGlwRWxlbWVudC5kYXRhc2V0LnJvdGF0ZWQ7IH1cbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGFyZ2V0RWxlbWVudC5kaXNwYXRjaEV2ZW50KGRyb3BFdmVudCk7XG4gICAgXG4gICAgICAgIC8vIFNpbXVsYXRlIGRyYWcgZW5kIGV2ZW50XG4gICAgICAgIGNvbnN0IGRyYWdFbmRFdmVudCA9IG5ldyBFdmVudCgnZHJhZ2VuZCcsIHsgYnViYmxlczogdHJ1ZSB9KTtcbiAgICAgICAgc2hpcEVsZW1lbnQuZGlzcGF0Y2hFdmVudChkcmFnRW5kRXZlbnQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2ltdWxhdGVCZWdpbkJhdHRsZSgpIHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24uYmVnaW5CYXR0bGUnKVxuICAgIGJ0bi5jbGljaygpXG59XG5cbmV4cG9ydCB7IGdldFJhbmRvbU51bSwgc2ltdWxhdGVEcmFnRHJvcCwgc2ltdWxhdGVCZWdpbkJhdHRsZSB9IiwiaW1wb3J0IHsgYnVpbGRNYWluU2NyZWVuIH0gZnJvbSBcIi4vY29tcG9uZW50cy9nYW1lYm9hcmRVSVwiXG5pbXBvcnQgeyBjcmVhdGVCb3QsIHAxIH0gZnJvbSAnLi9pbmRleCdcbi8vIHJvdGF0ZWQgPSB2ZXJ0aWNhbFxuLy8gbm90IHJvdGF0ZWQgPSBob3Jpem9udGFsXG5cbi8vIERSQUcgTiBEUk9QXG5mdW5jdGlvbiBhcHBseURyYWdEcm9wKGJvYXJkKSB7XG4gICAgYWxsb3dSb3RhdGUoKVxuXG4gICAgZnVuY3Rpb24gZHJhZ1N0YXJ0SGFuZGxlcihldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImRyYWdnaW5nXCIsIGV2ZW50LnRhcmdldC5pZCwgXCIuLi5cIilcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIGAke2V2ZW50LnRhcmdldC5pZH0sJHtldmVudC50YXJnZXQuZGF0YXNldC5sZW5ndGh9LCAke2V2ZW50LnRhcmdldC5kYXRhc2V0LnJvdGF0ZWR9YClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnT3ZlckhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyb3BIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGZ1bmN0aW9uIHBvcHVsYXRlTmV4dEJveChib3hFbGVtZW50LCByZXBlYXQsIGlzUm90YXRlZCkge1xuICAgICAgICAgICAgaWYgKHJlcGVhdCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBib3hFbGVtZW50LmNsYXNzTGlzdC5hZGQoc2hpcE5hbWUsIFwiZHJvcHBlZFwiKVxuICAgICAgICAgICAgYm9hcmQucG9zaXRpb25TaGlwKGJveEVsZW1lbnQuZGF0YXNldC54LCBib3hFbGVtZW50LmRhdGFzZXQueSwgc2hpcE5hbWUpXG4gICAgICAgICAgICByZXBlYXQgLS1cblxuICAgICAgICAgICAgaWYgKGlzUm90YXRlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBOdW1iZXIoYm94RWxlbWVudC5kYXRhc2V0LngpXG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9XCIke3grMX1cIl1bZGF0YS15PVwiJHtib3hFbGVtZW50LmRhdGFzZXQueX1cIl1gKVxuICAgICAgICAgICAgICAgIHBvcHVsYXRlTmV4dEJveChuZXh0RGl2LCByZXBlYXQsIGlzUm90YXRlZClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9wdWxhdGVOZXh0Qm94KGJveEVsZW1lbnQubmV4dFNpYmxpbmcsIHJlcGVhdCwgaXNSb3RhdGVkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlRnJvbVNoaXB5YXJkKHNoaXBOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7c2hpcE5hbWV9YClcbiAgICAgICAgICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShcInJvdGF0YWJsZVwiKVxuICAgICAgICAgICAgc2hpcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICBzaGlwLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ2ZhbHNlJylcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGlzVmFsaWREcm9wWm9uZShldmVudCwgc2hpcExlbmd0aCwgaXNSb3RhdGVkKSB7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEluZGV4QmFzZWRPblNoaXBSb3RhdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChpc1JvdGF0ZWQpIHJldHVybiBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueClcbiAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LnkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZ1bmN0aW9uIGFyZUVtcHR5U2xvdHMoYm94RWxlbWVudCwgc2hpcExlbmd0aCwgaW5kZXgsIGlzUm90YXRlZCkge1xuICAgICAgICAgICAgICAgIGlmIChib3hFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImRyb3BwZWRcIikpIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIGlmIChib3hFbGVtZW50ID09PSBudWxsKSByZXR1cm4gZmFsc2VcblxuICAgICAgICAgICAgICAgIGlmIChzaGlwTGVuZ3RoID09PSAxKSByZXR1cm4gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgbGV0IG5leHRCb3hFbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzUm90YXRlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB4ID0gTnVtYmVyKGJveEVsZW1lbnQuZGF0YXNldC54KVxuICAgICAgICAgICAgICAgICAgICBuZXh0Qm94RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9XCIke3grMX1cIl1bZGF0YS15PVwiJHtib3hFbGVtZW50LmRhdGFzZXQueX1cIl1gKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBOdW1iZXIoYm94RWxlbWVudC5kYXRhc2V0LnkpXG4gICAgICAgICAgICAgICAgICAgIG5leHRCb3hFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD1cIiR7Ym94RWxlbWVudC5kYXRhc2V0Lnh9XCJdW2RhdGEteT1cIiR7eSsxfVwiXWApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNoaXBMZW5ndGgtLVxuICAgICAgICAgICAgICAgIHJldHVybiBhcmVFbXB0eVNsb3RzKG5leHRCb3hFbGVtZW50LCBzaGlwTGVuZ3RoLCBpbmRleCwgaXNSb3RhdGVkKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGdldEluZGV4QmFzZWRPblNoaXBSb3RhdGlvbihldmVudClcblxuICAgICAgICAgICAgY29uc3QgdmFsaWRJbmRpY2VzID0gKGluZGV4ICsgKHNoaXBMZW5ndGggLSAxKSkgPD0gOVxuICAgICAgICAgICAgaWYgKCF2YWxpZEluZGljZXMpIHJldHVybiBmYWxzZVxuXG4gICAgICAgICAgICBjb25zdCBlbXB0eVNsb3RzID0gYXJlRW1wdHlTbG90cyhldmVudC50YXJnZXQsIHNoaXBMZW5ndGgsIGluZGV4LCBpc1JvdGF0ZWQpXG4gICAgICAgICAgICByZXR1cm4gZW1wdHlTbG90c1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBsZXQgW3NoaXBOYW1lLCBzaGlwTGVuZ3RoLCBpc1JvdGF0ZWRdID0gZXZlbnQuZGF0YVRyYW5zZmVyLmdldERhdGEoXCJ0ZXh0XCIpLnNwbGl0KCcsJylcblxuICAgICAgICBpc1JvdGF0ZWQgPSAgaXNSb3RhdGVkID09PSBcIiBmYWxzZVwiID8gZmFsc2UgOiB0cnVlXG5cbiAgICAgICAgaWYgKGlzVmFsaWREcm9wWm9uZShldmVudCwgc2hpcExlbmd0aCwgaXNSb3RhdGVkKSkge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoc2hpcE5hbWUsIFwiZHJvcHBlZFwiKVxuICAgICAgICAgICAgcG9wdWxhdGVOZXh0Qm94KGV2ZW50LnRhcmdldCwgc2hpcExlbmd0aCwgaXNSb3RhdGVkKVxuICAgICAgICAgICAgcmVtb3ZlRnJvbVNoaXB5YXJkKHNoaXBOYW1lKVxuICAgICAgICAgICAgYm9hcmQubnVtT2ZTaGlwc1JlYWR5KytcblxuICAgICAgICAgICAgLy8gaWYgYWxsIHNoaXBzIGFyZSBwb3NpdGlvbmVkIG9uIHRoZSBib2FyZCwgdGhlbiBhbGxvdyB1c2VyIHRvIHN0YXJ0IHRoZSBnYW1lXG4gICAgICAgICAgICBpZiAoYm9hcmQubnVtT2ZTaGlwc1JlYWR5ID09PSA1KSB0b2dnbGVCZWdpbkJhdHRsZUJ0bigpXG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNPY2N1cGllZEJveChldmVudCkge1xuICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRyb3BwZWRcIilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnTGVhdmVIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdFbnRlckhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKCFpc09jY3VwaWVkQm94KGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZGVudGlmeSBkcmFnZ2FibGUgc2hpcHNcbiAgICBjb25zdCBzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGlwJykgXG4gICAgY29uc3QgYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYm94JylcblxuXG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGV2ZW50ID0+IGRyYWdTdGFydEhhbmRsZXIoZXZlbnQpKVxuICAgICAgICAvLyBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnXCIsIGV2ZW50ID0+IGRyYWdnaW5nSGFuZGxlcihldmVudCkpXG4gICAgICAgIC8vIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgZXZlbnQgPT4gZHJhZ0VuZEhhbmRsZXIoZXZlbnQpKVxuICAgIH0pXG5cbiAgICBib3hlcy5mb3JFYWNoKGJveCA9PiB7XG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIGV2ZW50ID0+IGRyYWdFbnRlckhhbmRsZXIoZXZlbnQpKVxuICAgICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGV2ZW50ID0+IGRyYWdPdmVySGFuZGxlcihldmVudCkpXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIGV2ZW50ID0+IGRyYWdMZWF2ZUhhbmRsZXIoZXZlbnQpKVxuICAgICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZXZlbnQgPT4gZHJvcEhhbmRsZXIoZXZlbnQpKVxuICAgIH0pXG5cbn1cblxuZnVuY3Rpb24gYWxsb3dSb3RhdGUoKSB7XG4gICAgY29uc3Qgcm90YXRhYmxlU2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucm90YXRhYmxlJylcblxuICAgIHJvdGF0YWJsZVNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHJvdGF0ZVNoaXAoZSwgZS50YXJnZXQuZGF0YXNldC5sZW5ndGgpKVxuICAgIH0pXG5cblxuICAgIGZ1bmN0aW9uIHJvdGF0ZVNoaXAoZSwgc2hpcExlbmd0aCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKGUudGFyZ2V0LmRhdGFzZXQucm90YXRlZCA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLndpZHRoID0gYGNhbGModmFyKC0tc2hpcEJveFNpemUpICogJHtzaGlwTGVuZ3RofSlgXG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5oZWlnaHQgPSBcInZhcigtLXNoaXBCb3hTaXplKVwiXG4gICAgICAgICAgICBlLnRhcmdldC5kYXRhc2V0LnJvdGF0ZWQgPSBcImZhbHNlXCJcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUud2lkdGggPSBcInZhcigtLXNoaXBCb3hTaXplKVwiXG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5oZWlnaHQgPSBgY2FsYyh2YXIoLS1zaGlwQm94U2l6ZSkgKiAke3NoaXBMZW5ndGh9KWBcbiAgICAgICAgICAgIGUudGFyZ2V0LmRhdGFzZXQucm90YXRlZCA9IFwidHJ1ZVwiXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUJlZ2luQmF0dGxlQnRuKCkge1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5iZWdpbkJhdHRsZScpXG4gICAgaWYgKCFidG4uc3R5bGUuZGlzcGxheSkge1xuICAgICAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuICAgICAgICBhbGxvd0dhbWVTdGFydChidG4pXG4gICAgfVxuICAgIGVsc2UgeyBidG4uc3R5bGUuZGlzcGxheSA9ICdub25lJ31cbn1cblxuZnVuY3Rpb24gcmVzZXRTaGlwcygpIHtcbiAgICAvLyBkaXNwbGF5IHNoaXBzIGFnYWluXG4gICAgLy8gYWxsb3cgZHJhZ2dhYmxlIFxuICAgIC8vIGVtcHR5IHRoZSBib2FyZCBhcnJheVxuICAgIC8vIGVtcHR5IHRoZSBib2FyZCBncmlkXG4gICAgLy8gaGlkZSBiZWdpbiBiYXR0bGUgYnV0dG9uXG59XG5cbmZ1bmN0aW9uIGFsbG93R2FtZVN0YXJ0KGJ0bikge1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBidWlsZE1haW5TY3JlZW4oKVxuICAgICAgICBjb25zdCBib3QgPSBjcmVhdGVCb3QoKVxuICAgICAgICAvLyBzdGFydCB3aXRoIHBsYXllcidzIHR1cm5cbiAgICAgICAgYWxsb3dQbGF5ZXJBdHRhY2socDEsIGJvdClcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBhbGxvd1Rha2luZ1R1cm5zKHAxLCBib3QsIHR1cm4pIHtcbiAgICBjb25zb2xlLmxvZygnY3VycmVudCB0dXJuOicsIHR1cm4pXG5cbiAgICBmdW5jdGlvbiBjaGVja0lmQWxsU2hpcHNTdW5rKCkge1xuICAgICAgICBjb25zdCBwMVNoaXBzID0gcDEuYm9hcmQuYXJlQWxsU2hpcHNTdW5rKClcbiAgICAgICAgY29uc3QgYm90U2hpcHMgPSBib3QuYm9hcmQuYXJlQWxsU2hpcHNTdW5rKClcbiAgICAgICAgcmV0dXJuIHAxU2hpcHMgfHwgYm90U2hpcHNcbiAgICB9XG5cbiAgICBpZiAoY2hlY2tJZkFsbFNoaXBzU3VuaygpID09PSBmYWxzZSkge1xuICAgICAgICBpZiAodHVybiA9PT0gXCJwMVwiKSB7XG4gICAgICAgICAgICBlbmFibGVCb3RCb2FyZEV2ZW50cygpXG4gICAgICAgIH0gZWxzZSBpZiAodHVybiA9PT0gXCJib3RcIikge1xuICAgICAgICAgICAgYWxsb3dCb3RBdHRhY2socDEsIGJvdClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc3dpdGNoVHVybnMocDEsIGJvdCwgcHJldmlvdXNUdXJuKSB7XG4gICAgaWYgKHByZXZpb3VzVHVybiA9PT0gXCJwMVwiKSB7XG4gICAgICAgIGRpc2FibGVCb3RCb2FyZEV2ZW50cygpXG4gICAgICAgIGFsbG93VGFraW5nVHVybnMocDEsIGJvdCwgXCJib3RcIilcbiAgICB9IGVsc2UgaWYgKHByZXZpb3VzVHVybiA9PT0gXCJib3RcIikge1xuICAgICAgICBhbGxvd1Rha2luZ1R1cm5zKHAxLCBib3QsIFwicDFcIilcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGFsbG93UGxheWVyQXR0YWNrKHAxLCBib3QpIHtcbiAgICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iQm9hcmQgLmJvYXJkR3JpZCAuYm94JylcbiAgICBib3hlcy5mb3JFYWNoKGJveCA9PiB7XG4gICAgICAgIC8vIGhvdmVyXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBlID0+IHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gbW91c2UgaG92ZXIgbGVhdmVzXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZSA9PiB7XG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnJ1xuICAgICAgICB9KVxuXG4gICAgICAgIC8vIGF0dGFjayBpcyBtYWRlXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkcyA9IFtOdW1iZXIoZS50YXJnZXQuZGF0YXNldC54KSwgTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQueSldXG5cbiAgICAgICAgICAgIGNvbnN0IGF0dGFja0ZlZWRiYWNrID0gcDEuYXR0YWNrRW5lbXkoY29vcmRzLCBib3QuYm9hcmQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhdHRhY2tGZWVkYmFjaylcbiAgICAgICAgICAgIGlmIChhdHRhY2tGZWVkYmFjayA9PT0gXCJJdCdzIGEgbWlzcyFcIikge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChhdHRhY2tGZWVkYmFjayA9PT0gXCJJdCdzIGEgaGl0IVwiKSB7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGl0JylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaFR1cm5zKHAxLCBib3QsICdwMScpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuXG5mdW5jdGlvbiBhbGxvd0JvdEF0dGFjayhwMSwgYm90KSB7XG4gICAgY29uc3QgY29vcmRzQXJyID0gYm90LmdldENvb3JkaW5hdGVzKHAxLmJvYXJkKVxuICAgIGNvbnN0IGF0dGFja0ZlZWRiYWNrID0gYm90LmF0dGFja0VuZW15KGNvb3Jkc0FyciwgcDEuYm9hcmQpXG4gICAgY29uc29sZS5sb2coYXR0YWNrRmVlZGJhY2spXG4gICAgY29uc3QgYm94RWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9XCIke2Nvb3Jkc0FyclswXX1cIl1bZGF0YS15PVwiJHtjb29yZHNBcnJbMV19XCJdYClcblxuICAgIGlmIChhdHRhY2tGZWVkYmFjayA9PT0gXCJJdCdzIGEgbWlzcyFcIikge1xuICAgICAgICBib3hFbGVtLmNsYXNzTGlzdC5hZGQoJ21pc3MnKVxuICAgIH0gZWxzZSBpZiAoYXR0YWNrRmVlZGJhY2sgPT09IFwiSXQncyBhIGhpdCFcIikge1xuICAgICAgICBib3hFbGVtLmNsYXNzTGlzdC5hZGQoJ2hpdCcpXG4gICAgfVxuICAgIHN3aXRjaFR1cm5zKHAxLCBib3QsICdib3QnKVxufVxuXG5cbmZ1bmN0aW9uIGRpc2FibGVCb3RCb2FyZEV2ZW50cygpIHtcbiAgICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iQm9hcmQgLmJvYXJkR3JpZCAuYm94JylcbiAgICBib3hlcy5mb3JFYWNoKGJveCA9PiBib3guY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKSlcbn1cblxuZnVuY3Rpb24gZW5hYmxlQm90Qm9hcmRFdmVudHMoKSB7XG4gICAgY29uc3QgYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYkJvYXJkIC5ib2FyZEdyaWQgLmJveCcpXG4gICAgYm94ZXMuZm9yRWFjaChib3ggPT4gYm94LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJykpXG59XG5cblxuZXhwb3J0IHsgYXBwbHlEcmFnRHJvcCB9IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZEZhY3RvcnknXG5pbXBvcnQgeyBnZXRSYW5kb21OdW0gfSBmcm9tICcuLi9jb21wb25lbnRzL3V0aWxpdGllcydcblxuY2xhc3MgQm90IHtcbiAgICAjc3VjY2Vzc2Z1bEF0dGFjaztcbiAgICAjcHJldmlvdXNBdHRhY2s7XG4gICAgI3Bvc3NpYmxlU21hcnRNb3ZlcztcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gdGhpcy4jY3JlYXRlQm9hcmQoKVxuICAgICAgICB0aGlzLiNwcmV2aW91c0F0dGFjayA9IG51bGxcbiAgICAgICAgdGhpcy4jc3VjY2Vzc2Z1bEF0dGFjayA9IGZhbHNlXG4gICAgICAgIHRoaXMuI3Bvc3NpYmxlU21hcnRNb3ZlcyA9IFtbMCwgMV0sIFswLCAtMV0sIFstMSwgMF0sIFsxLCAwXV1cbiAgICB9XG5cbiAgICAjY3JlYXRlQm9hcmQoKSB7XG4gICAgICAgIGNvbnN0IG5ld0JvYXJkID0gbmV3IEdhbWVib2FyZFxuICAgICAgICByZXR1cm4gbmV3Qm9hcmRcbiAgICB9XG4gICAgXG4gICBpc0VtcHR5UG9zaXRpb24oeCwgeSwgZ2FtZUJvYXJkKSB7XG4gICAgICAgIHJldHVybiBnYW1lQm9hcmRbeF1beV0gPT09IG51bGxcbiAgICB9XG5cbiAgICBnZXRDb29yZGluYXRlcyhlbmVteUdhbWVib2FyZCkge1xuICAgICAgICAvLyBwaWNrIGEgcmFuZG9tIHNwb3Qgd2l0aGluIHRoZSBib2FyZFxuICAgICAgICAvLyBzaG91bGQgYmUgYSB1bmlxdWUgY29vcmRpbmF0ZSBldmVyeSB0aW1lXG4gICAgICAgIC8vIGlmIHByZXZpb3VzIGNvb3JkaW5hdGUgd2FzIGEgaGl0LCBjaG9vc2UgYW4gYWRqYWNlbnQgY29vcmRpbmF0ZVxuICAgICAgICAvLyBpbXByb3ZlbWVudCAtLSBnZW5lcmF0ZSBuZXh0IGNvb3JkaW5hdGUgYmFzZWQgb24gYXZhaWxhYmxlIGVtcHR5IHNsb3RzIGluc3RlYWQgb2YgcmFuZG9tIHgveSBjb29yZHNcblxuICAgICAgICBpZiAodGhpcy4jc3VjY2Vzc2Z1bEF0dGFjaykge1xuICAgICAgICAgICAgaWYgKHRoaXMuI3Bvc3NpYmxlU21hcnRNb3Zlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb25PZmZzZXQgPSB0aGlzLiNwb3NzaWJsZVNtYXJ0TW92ZXMucG9wKClcbiAgICAgICAgICAgICAgICBsZXQgeENvb3JkID0gdGhpcy4jcHJldmlvdXNBdHRhY2tbMF0gKyBwb3NpdGlvbk9mZnNldFswXVxuICAgICAgICAgICAgICAgIGxldCB5Q29vcmQgPSB0aGlzLiNwcmV2aW91c0F0dGFja1sxXSArIHBvc2l0aW9uT2Zmc2V0WzFdXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gW3hDb29yZCwgeUNvb3JkXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHhDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5KVxuICAgICAgICBsZXQgeUNvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG4gICAgICAgIGxldCBlbmVteUJvYXJkID0gZW5lbXlHYW1lYm9hcmQuZ2V0Qm9hcmQoKVxuXG4gICAgICAgIHdoaWxlICghdGhpcy5pc0VtcHR5UG9zaXRpb24oeENvb3JkLCB5Q29vcmQsIGVuZW15Qm9hcmQpKSB7XG4gICAgICAgICAgICB4Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcbiAgICAgICAgICAgIHlDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gW3hDb29yZCwgeUNvb3JkXVxuICAgIH1cblxuXG4gICAgYXR0YWNrRW5lbXkoY29vcmRpbmF0ZXNBcnIsIGVuZW15Qm9hcmQpIHtcbiAgICAgICAgY29uc3QgW3gsIHldID0gWy4uLmNvb3JkaW5hdGVzQXJyXSBcbiAgICAgICAgY29uc3QgYXR0YWNrRmVlZGJhY2sgPSBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSlcbiAgICAgICAgaWYgKGF0dGFja0ZlZWRiYWNrID09PSBcIkl0J3MgYSBoaXQhXCIpIHtcbiAgICAgICAgICAgIHRoaXMuI3N0b3JlUHJldmlvdXNBdHRhY2soY29vcmRpbmF0ZXNBcnIsIHRydWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiNzdG9yZVByZXZpb3VzQXR0YWNrKGNvb3JkaW5hdGVzQXJyLCBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXR0YWNrRmVlZGJhY2tcbiAgICB9XG5cbiAgICB2aWV3Qm9hcmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkLmdldEJvYXJkKClcbiAgICB9XG5cbiAgICAjc3RvcmVQcmV2aW91c0F0dGFjayhjb29yZGluYXRlc0FyciwgZW5lbXlXYXNIaXQpIHtcbiAgICAgICAgdGhpcy4jcHJldmlvdXNBdHRhY2sgPSBjb29yZGluYXRlc0FyclxuICAgICAgICB0aGlzLiNzdWNjZXNzZnVsQXR0YWNrID0gZW5lbXlXYXNIaXRcbiAgICB9XG5cbiAgICBwb3NpdGlvbkFsbFNoaXBzKCkge1xuICAgICAgICBjb25zdCBhbGxTaGlwcyA9IHRoaXMuYm9hcmQuZ2V0QWxsU2hpcHMoKVxuICAgICAgICBhbGxTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3Q29vcmRpbmF0ZXNBcnIgPSB0aGlzLiNnZW5lcmF0ZUNvb3JkaW5hdGVzKHNoaXApXG4gICAgICAgICAgICBuZXdDb29yZGluYXRlc0Fyci5mb3JFYWNoKGNvb3JkID0+IHRoaXMuYm9hcmQucG9zaXRpb25TaGlwKGNvb3JkWzBdLCBjb29yZFsxXSwgc2hpcC5uYW1lKSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAjZ2VuZXJhdGVDb29yZGluYXRlcyhzaGlwKSB7XG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzQXJyID0gW11cbiAgICAgICAgY29uc3QgaXNSb3RhdGVkID0gZ2V0UmFuZG9tTnVtKDAsIDEpIC8vIDAgPT0gZmFsc2UsIDEgPT0gdHJ1ZVxuICAgICAgICAgICAgXG4gICAgICAgIC8vIGluaXRpYXRlIHZhcmlhYmxlc1xuICAgICAgICBsZXQgeENvb3JkID0gMDtcbiAgICAgICAgbGV0IHlDb29yZCA9IDA7XG4gICAgICAgICAgICBcbiAgICAgICAgLy8gZ2VuZXJhdGUgc3RhcnRpbmcgY29vcmRpbmF0ZXNcbiAgICAgICAgaWYgKGlzUm90YXRlZCA9PSAxKSB7XG4gICAgICAgICAgICB4Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSAtIHNoaXAubGVuZ3RoKSAvLyBleGFtcGxlLCBpZiBzaGlwTGVuZ3RoPTUsIHRoZW4gY2hvb3NlIDAtNSB4LWNvb3JkaW5hdGVzXG4gICAgICAgICAgICB5Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcblxuICAgICAgICAgICAgY29vcmRpbmF0ZXNBcnIucHVzaChbeENvb3JkLCB5Q29vcmRdKVxuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMSA7IGkgPCBzaGlwLmxlbmd0aCA7IGkrKyApIHtcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlc0Fyci5wdXNoKFt4Q29vcmQgKyBpLCB5Q29vcmRdKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7IC8vIG90aGVyd2lzZSwgaG9yaXpvbnRhbFxuICAgICAgICAgICAgeENvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG4gICAgICAgICAgICB5Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSAtIHNoaXAubGVuZ3RoKVxuXG4gICAgICAgICAgICBjb29yZGluYXRlc0Fyci5wdXNoKFt4Q29vcmQsIHlDb29yZF0pXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxIDsgaSA8IHNoaXAubGVuZ3RoIDsgaSsrICkge1xuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzQXJyLnB1c2goW3hDb29yZCwgeUNvb3JkICsgaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiBjb29yZGluYXRlcyBhcmUgb2NjdXBpZWRcbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGNvb3JkaW5hdGVzQXJyLmV2ZXJ5KGNvb3JkID0+IHRoaXMuaXNFbXB0eVBvc2l0aW9uKGNvb3JkWzBdLCBjb29yZFsxXSwgdGhpcy52aWV3Qm9hcmQoKSkpXG5cbiAgICAgICAgLy8gcmV0dXJuIGlmIHZhbGlkIGNvb3JkaW5hdGVzLCBvdGhlcndpc2UgZmluZCBuZXcgb25lc1xuICAgICAgICBpZiAoaXNWYWxpZCkgcmV0dXJuIGNvb3JkaW5hdGVzQXJyXG4gICAgICAgIGVsc2UgeyByZXR1cm4gdGhpcy4jZ2VuZXJhdGVDb29yZGluYXRlcyhzaGlwKSB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCb3RcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcEZhY3RvcnknXG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FycmllciA9IHRoaXMuI2NyZWF0ZVNoaXAoJ2NhcnJpZXInLCA1KVxuICAgICAgICB0aGlzLmJhdHRsZXNoaXAgPSB0aGlzLiNjcmVhdGVTaGlwKCdiYXR0bGVzaGlwJywgNClcbiAgICAgICAgdGhpcy5jcnVpc2VyID0gdGhpcy4jY3JlYXRlU2hpcCgnY3J1aXNlcicsIDMpXG4gICAgICAgIHRoaXMuc3VibWFyaW5lID0gdGhpcy4jY3JlYXRlU2hpcCgnc3VibWFyaW5lJywgMylcbiAgICAgICAgdGhpcy5kZXN0cm95ZXIgPSB0aGlzLiNjcmVhdGVTaGlwKCdkZXN0cm95ZXInLCAyKVxuICAgICAgICB0aGlzLmJvYXJkID0gdGhpcy4jY3JlYXRlQm9hcmQoKVxuICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MgPSBbXVxuICAgICAgICB0aGlzLnN1Y2Nlc3NmdWxBdHRhY2tzID0gW11cbiAgICAgICAgdGhpcy5udW1PZlNoaXBzUmVhZHkgPSAwO1xuICAgIH1cblxuICAgICNjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgbGV0IGJvYXJkID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDw9IDkgOyBpKyspIHtcbiAgICAgICAgICAgIGxldCByb3cgPSBbXVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDw9IDkgOyBpKyspIHtcbiAgICAgICAgICAgICAgICByb3cucHVzaChudWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9hcmQucHVzaChyb3cpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJvYXJkXG4gICAgfVxuICAgIFxuXG4gICAgI2NyZWF0ZVNoaXAobmFtZSwgbGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChuYW1lLCBsZW5ndGgpXG4gICAgICAgIHJldHVybiBzaGlwXG4gICAgfVxuXG4gICAgZ2V0QWxsU2hpcHMoKSB7XG4gICAgICAgIGNvbnN0IHNoaXBzID0gW1xuICAgICAgICAgICAgdGhpcy5jYXJyaWVyLCBcbiAgICAgICAgICAgIHRoaXMuYmF0dGxlc2hpcCwgXG4gICAgICAgICAgICB0aGlzLmNydWlzZXIsIFxuICAgICAgICAgICAgdGhpcy5zdWJtYXJpbmUsIFxuICAgICAgICAgICAgdGhpcy5kZXN0cm95ZXJcbiAgICAgICAgXVxuICAgICAgICByZXR1cm4gc2hpcHNcbiAgICB9XG5cbiAgICBwb3NpdGlvblNoaXAoeCwgeSwgc2hpcE5hbWUpIHsgLy8gcG9zaXRpb24gc2hpcCBhdCB4LHkgY29vcmRpbmF0ZXNcbiAgICAgICAgdGhpcy51cGRhdGVCb2FyZEFycmF5KE51bWJlcih4KSwgTnVtYmVyKHkpLCBzaGlwTmFtZSlcbiAgICB9XG5cblxuICAgIHVwZGF0ZUJvYXJkQXJyYXkoeCwgeSwgc2hpcE5hbWUpIHtcbiAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHNoaXBOYW1lXG4gICAgfSAgXG5cbiAgICBnZXRCb2FyZCgpIHtcbiAgICAgICAgY29uc3QgYm9hcmRDb3B5ID0gWy4uLnRoaXMuYm9hcmRdXG4gICAgICAgIHJldHVybiBib2FyZENvcHlcbiAgICB9XG5cbiAgICBnZXRNaXNzZWRBdHRhY2tzKCkge1xuICAgICAgICBjb25zdCBtaXNzZWRBdHRhY2tBcnJDb3B5ID0gWy4uLnRoaXMubWlzc2VkQXR0YWNrc11cbiAgICAgICAgcmV0dXJuIG1pc3NlZEF0dGFja0FyckNvcHlcbiAgICB9XG5cbiAgICBnZXRTdWNjZXNzZnVsQXR0YWNrcygpIHtcbiAgICAgICAgY29uc3Qgc3VjY2Vzc2Z1bEF0dGFja0FyckNvcHkgPSBbLi4udGhpcy5zdWNjZXNzZnVsQXR0YWNrc11cbiAgICAgICAgcmV0dXJuIHN1Y2Nlc3NmdWxBdHRhY2tBcnJDb3B5XG4gICAgfVxuXG4gICAgI3N0b3JlTWlzc2VkQXR0YWNrKHgsIHkpIHtcbiAgICAgICAgdGhpcy5taXNzZWRBdHRhY2tzLnB1c2goW3gseV0pXG4gICAgfVxuXG4gICAgI3N0b3JlU3VjY2Vzc2Z1bEF0dGFjayh4LCB5KSB7XG4gICAgICAgIHRoaXMuc3VjY2Vzc2Z1bEF0dGFja3MucHVzaChbeCwgeV0pXG4gICAgfVxuXG4gICAgI2lzVmFsaWRBdHRhY2soeCwgeSkge1xuICAgICAgICAvLyBhbGwgc2hvdWxkIGJlIHRydWVcbiAgICAgICAgY29uc3QgdW5pcXVlTWlzc2VkQXR0YWNrID0gIXRoaXMuZ2V0TWlzc2VkQXR0YWNrcygpLmluY2x1ZGVzKFt4LCB5XSlcbiAgICAgICAgY29uc3QgdW5pcXVlU3VjY2Vzc2Z1bEF0dGFjayA9ICF0aGlzLmdldFN1Y2Nlc3NmdWxBdHRhY2tzKCkuaW5jbHVkZXMoW3gsIHldKSBcbiAgICAgICAgY29uc3QgdmFsaWRDb29yZGluYXRlcyA9ICh4ID49IDAgJiYgeCA8PSA5KSAmJiAoeSA+PSAwICYmIHkgPD0gOSlcblxuICAgICAgICByZXR1cm4gdW5pcXVlTWlzc2VkQXR0YWNrICYmIHVuaXF1ZVN1Y2Nlc3NmdWxBdHRhY2sgJiYgdmFsaWRDb29yZGluYXRlc1xuICAgIH1cblxuICAgIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhIHNoaXAgYXQgW3gsIHldIGNvb3JkaW5hdGVzXG4gICAgICAgIC8vIGlmIHllcywgYXBwbHkgZGFtYWdlIHRvIHRoaXMuc2hpcCAmIHJlY29yZCBzdWNjZXNzZnVsIGF0dGFja1xuICAgICAgICAvLyBpZiBub3QsIHJlY29yZCB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIG1pc3NlZCBhdHRhY2tcblxuICAgICAgICBpZiAodGhpcy4jaXNWYWxpZEF0dGFjayh4LCB5KSkge1xuICAgICAgICAgICAgY29uc3QgYm9hcmQgPSB0aGlzLmdldEJvYXJkKClcbiAgICAgICAgICAgIGNvbnN0IHNoaXBzID0ge1xuICAgICAgICAgICAgICAgICdjYXJyaWVyJzogdGhpcy5jYXJyaWVyLCBcbiAgICAgICAgICAgICAgICAnYmF0dGxlc2hpcCc6IHRoaXMuYmF0dGxlc2hpcCwgXG4gICAgICAgICAgICAgICAgJ2NydWlzZXInOiB0aGlzLmNydWlzZXIsIFxuICAgICAgICAgICAgICAgICdzdWJtYXJpbmUnOiB0aGlzLnN1Ym1hcmluZSwgXG4gICAgICAgICAgICAgICAgJ2Rlc3Ryb3llcic6IHRoaXMuZGVzdHJveWVyXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChib2FyZFt4XVt5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNoaXBzW2JvYXJkW3hdW3ldXS5oaXQoKVxuICAgICAgICAgICAgICAgIHRoaXMuI3N0b3JlU3VjY2Vzc2Z1bEF0dGFjayh4LCB5KVxuICAgICAgICAgICAgICAgIHJldHVybiBcIkl0J3MgYSBoaXQhXCJcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4jc3RvcmVNaXNzZWRBdHRhY2soeCwgeSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJJdCdzIGEgbWlzcyFcIlxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSByZXR1cm4gJ0ludmFsaWQgYXR0YWNrJ1xuICAgIH1cblxuICAgIGFyZUFsbFNoaXBzU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0U3VjY2Vzc2Z1bEF0dGFja3MoKS5sZW5ndGggPj0gMTcpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBzID0gdGhpcy5nZXRBbGxTaGlwcygpXG4gICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBzaGlwcy5ldmVyeShzaGlwID0+IHNoaXAuc3VuayA9PT0gdHJ1ZSlcblxuICAgICAgICAgICAgaWYgKHN0YXR1cykgY29uc29sZS5sb2coJ0FsbCBzaGlwcyBoYXZlIHN1bmshISEnKVxuXG4gICAgICAgICAgICByZXR1cm4gc3RhdHVzXG4gICAgICAgICAgICBcbiAgICAgICAgfSByZXR1cm4gZmFsc2VcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZEZhY3RvcnknXG5cbmNsYXNzIFBsYXllciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLiNjcmVhdGVCb2FyZCgpXG4gICAgfVxuXG4gICAgI2NyZWF0ZUJvYXJkKCkge1xuICAgICAgICBjb25zdCBuZXdCb2FyZCA9IG5ldyBHYW1lYm9hcmRcbiAgICAgICAgcmV0dXJuIG5ld0JvYXJkXG4gICAgfVxuXG4gICAgYXR0YWNrRW5lbXkoY29vcmRpbmF0ZXNBcnIsIGVuZW15Qm9hcmQpIHtcbiAgICAgICAgY29uc3QgW3gsIHldID0gWy4uLmNvb3JkaW5hdGVzQXJyXSBcbiAgICAgICAgY29uc3QgYXR0YWNrRmVlZGJhY2sgPSBlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soeCwgeSlcbiAgICAgICAgcmV0dXJuIGF0dGFja0ZlZWRiYWNrXG4gICAgfVxuXG4gICAgdmlld0JvYXJkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ib2FyZC5nZXRCb2FyZCgpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXIiLCJjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZSxcbiAgICAgICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gMDtcbiAgICAgICAgdGhpcy5zdW5rID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaGl0KCkge1xuICAgICAgICB0aGlzLmRhbWFnZSA9IHRoaXMuZGFtYWdlICsgMVxuICAgICAgICB0aGlzLiNpc1N1bmsoKVxuICAgIH1cblxuICAgICNzZXRTaGlwQXNTdW5rKCkge1xuICAgICAgICB0aGlzLnN1bmsgPSB0cnVlXG4gICAgfVxuXG4gICAgI2lzU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGFtYWdlID09PSB0aGlzLmxlbmd0aCkgdGhpcy4jc2V0U2hpcEFzU3VuaygpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwIiwiaW1wb3J0IHsgYXBwbHlEcmFnRHJvcCB9IGZyb20gXCIuL2V2ZW50TGlzdGVuZXJzXCJcbmltcG9ydCB7IGNyZWF0ZVBsYXllckJvYXJkVUkgfSBmcm9tIFwiLi9jb21wb25lbnRzL2dhbWVib2FyZFVJXCJcbmltcG9ydCB7IHNpbXVsYXRlRHJhZ0Ryb3AsIHNpbXVsYXRlQmVnaW5CYXR0bGUgfSBmcm9tIFwiLi9jb21wb25lbnRzL3V0aWxpdGllc1wiXG5pbXBvcnQgQm90IGZyb20gXCIuL2ZhY3Rvcmllcy9ib3RGYWN0b3J5XCJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vZmFjdG9yaWVzL3BsYXllckZhY3RvcnlcIlxuXG4vLyBjcmVhdGUgcGxheWVyIG9iamVjdFxuZnVuY3Rpb24gY3JlYXRlUGxheWVyKCkge1xuICAgIGNvbnN0IHAxID0gbmV3IFBsYXllclxuICAgIHJldHVybiBwMVxufVxuXG4vLyBjcmVhdGUgYm90IG9iamVjdFxuZnVuY3Rpb24gY3JlYXRlQm90KCkge1xuICAgIGNvbnN0IGJvdCA9IG5ldyBCb3RcbiAgICBib3QucG9zaXRpb25BbGxTaGlwcygpXG4gICAgY29uc29sZS5sb2coYm90LnZpZXdCb2FyZCgpKVxuICAgIHJldHVybiBib3Rcbn1cblxuLy8gY3JlYXRlIHBsYXllciBvYmplY3QgJiBnYW1lYm9hcmRcbmNyZWF0ZVBsYXllckJvYXJkVUkoKVxuY29uc3QgcDEgPSBjcmVhdGVQbGF5ZXIoKVxuXG5cbi8vIGFjdGl2YXRlIGV2ZW50IGxpc3RlbmVyc1xuYXBwbHlEcmFnRHJvcChwMS5ib2FyZClcbi8vIHNpbXVsYXRlRHJhZ0Ryb3AoKVxuLy8gc2ltdWxhdGVCZWdpbkJhdHRsZSgpXG5cbmV4cG9ydCB7IGNyZWF0ZUJvdCwgcDEgfSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=