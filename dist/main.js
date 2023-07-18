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
        mainScreen.style.display = 'grid'
        mainScreen.style["grid-template-columns"] = "1fr 1fr"
        mainScreen.style["grid-template-rows"] = "min-content 1fr"
        
        const pBoard = document.querySelector('.intro .pBoard')
    
        const playerSide = document.querySelector('.playerSide')
        playerSide.insertBefore(pBoard, playerSide.childNodes[5])

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
/* harmony export */   capitalize: () => (/* binding */ capitalize),
/* harmony export */   getRandomNum: () => (/* binding */ getRandomNum),
/* harmony export */   simulateBeginBattle: () => (/* binding */ simulateBeginBattle),
/* harmony export */   simulateDragDrop: () => (/* binding */ simulateDragDrop)
/* harmony export */ });
function getRandomNum(min, max) {
    const num = Math.random() * (max - min + 1) + min;
    return Math.floor(num)
}

function capitalize(string) {
    let firstLetter = string.charAt(0)
    firstLetter = firstLetter.toUpperCase()
    return firstLetter + string.slice(1)
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
/* harmony import */ var _components_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/utilities */ "./src/components/utilities.js");



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
        updateGameNotification("It's your turn!")
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
    const timeDelay = 2000
    if (previousTurn === "p1") {
        setTimeout(() => {
            updateGameNotification("It's bot's turn!")
            disableBotBoardEvents()
            setTimeout(() => allowTakingTurns(p1, bot, "bot"), timeDelay)
        }, timeDelay)
        
    } else if (previousTurn === "bot") {
        setTimeout(() => {
            updateGameNotification("It's your turn!")
            allowTakingTurns(p1, bot, "p1")
        }, timeDelay)
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
            const missMsg = "It's a miss!"
            const hitMsg = "It's a hit!"
            const coords = [Number(e.target.dataset.x), Number(e.target.dataset.y)]

            const [attackFeedback, isSunk, shipName] = p1.attackEnemy(coords, bot.board)
            updateGameNotification(attackFeedback)

            if (attackFeedback === missMsg) {
                e.target.classList.add('miss')
            } else if (attackFeedback === hitMsg) {
                e.target.classList.add('hit')
                console.log(isSunk)
                if (isSunk) {
                    updateGameNotification(`${(0,_components_utilities__WEBPACK_IMPORTED_MODULE_2__.capitalize)(shipName)} has sunk!`)
                }
            }
            e.target.classList.add('permanentlyDisabled')
            switchTurns(p1, bot, 'p1')
        })
    })
}


function allowBotAttack(p1, bot) {
    const coordsArr = bot.getCoordinates()
    const [attackFeedback, isSunk, shipName] = bot.attackEnemy(coordsArr, p1.board)
    updateGameNotification(attackFeedback)
    const boxElem = document.querySelector(`[data-x="${coordsArr[0]}"][data-y="${coordsArr[1]}"]`)

    if (attackFeedback === "It's a miss!") {
        boxElem.classList.add('miss')
    } else if (attackFeedback === "It's a hit!") {
        boxElem.classList.add('hit')
        if (isSunk) {
            updateGameNotification(`${shipName} has sunk!`)
        }
    }

    switchTurns(p1, bot, 'bot')
}


function disableBotBoardEvents() {
    const boxes = document.querySelectorAll('.bBoard .boardGrid .box')
    boxes.forEach(box => {
        if (!box.classList.contains('permanentlyDisabled')) box.classList.add('disabled')
    })
}

function enableBotBoardEvents() {
    const boxes = document.querySelectorAll('.bBoard .boardGrid .box')
    boxes.forEach(box => box.classList.remove('disabled'))
}


function updateGameNotification(message) {
    const container = document.querySelector('.mainHeader')
    container.innerText = message
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
    
   isEmptyPosition(x, y) {
        const missedPrevAttack = this.board.getMissedAttacks().includes([x,y])
        const successsfulPrevAttack = this.board.getSuccessfulAttacks().includes([x,y])
        return !missedPrevAttack || !successsfulPrevAttack
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

        while (!this.isEmptyPosition(xCoord, yCoord)) {
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
                const isSunk = ships[board[x][y]].checkIfSunk()
                return ["It's a hit!", isSunk, ships[board[x][y]].name]
            } else {
                this.#storeMissedAttack(x, y)
                return ["It's a miss!", false, undefined]
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

    checkIfSunk() {
        return this.sunk
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


// intro simulation for testing
;(0,_components_utilities__WEBPACK_IMPORTED_MODULE_2__.simulateDragDrop)()
;(0,_components_utilities__WEBPACK_IMPORTED_MODULE_2__.simulateBeginBattle)()



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvY29tcG9uZW50cy9nYW1lYm9hcmRVSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvYm90RmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9nYW1lYm9hcmRGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3BsYXllckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvc2hpcEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZUJvYXJkQ29tcG9uZW50KHBhcmVudENvbnRhaW5lcikge1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlWUhlYWRlcigpIHtcbiAgICAgICAgY29uc3QgeUhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHlIZWFkZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmRZSGVhZGVyJylcbiAgICAgICAgY29uc3QgbGV0dGVycyA9IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0YnLCAnRycsICdIJywgJ0knLCAnSiddXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IDk7IHkrKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCdib3hIZWFkZXInKVxuICAgICAgICAgICAgYm94LmlubmVyVGV4dCA9IGxldHRlcnNbeV0gXG4gICAgICAgICAgICB5SGVhZGVyLmFwcGVuZChib3gpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHlIZWFkZXJcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVYSGVhZGVyKCkge1xuICAgICAgICBjb25zdCB4SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgeEhlYWRlci5jbGFzc0xpc3QuYWRkKCdib2FyZFhIZWFkZXInKVxuXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDw9IDk7IHgrKykge1xuICAgICAgICAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGJveC5jbGFzc0xpc3QuYWRkKCdib3hIZWFkZXInKVxuICAgICAgICAgICAgYm94LmlubmVyVGV4dCA9IHggKyAxIC8vIG9mZnNldCBmb3IgemVybyBpbmRleGluZ1xuICAgICAgICAgICAgeEhlYWRlci5hcHBlbmQoYm94KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4SGVhZGVyXG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIHRvcC1sZXZlbCBjb250YWluZXJzXG4gICAgY29uc3QgY2hpbGRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGNoaWxkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkQ29udGFpbmVyJylcblxuICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBib2FyZC5jbGFzc0xpc3QuYWRkKCdib2FyZEdyaWQnKVxuXG4gICAgLy8gY3JlYXRlIGJvYXJkIGdyaWRzXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPD0gOTsgeCsrKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdyb3cnKVxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSA5OyB5KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnYm94JylcbiAgICAgICAgICAgIGJveC5kYXRhc2V0LnggPSB4XG4gICAgICAgICAgICBib3guZGF0YXNldC55ID0geVxuICAgICAgICAgICAgcm93LmFwcGVuZChib3gpXG4gICAgICAgIH1cbiAgICAgICAgYm9hcmQuYXBwZW5kKHJvdylcbiAgICB9XG5cblxuICAgIC8vIGFwcGVuZCB0byBjb250YWluZXJzXG4gICAgY2hpbGRDb250YWluZXIuYXBwZW5kKGNyZWF0ZVhIZWFkZXIoKSwgY3JlYXRlWUhlYWRlcigpLCBib2FyZClcbiAgICBwYXJlbnRDb250YWluZXIuYXBwZW5kKGNoaWxkQ29udGFpbmVyKVxufVxuXG5mdW5jdGlvbiBidWlsZE1haW5TY3JlZW4oKSB7XG4gICAgZnVuY3Rpb24gc2hvd01haW5TY3JlZW4oKSB7XG4gICAgICAgIGNvbnN0IGludHJvU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmludHJvJylcbiAgICAgICAgaW50cm9TY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIFxuICAgICAgICBjb25zdCBtYWluU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKVxuICAgICAgICBtYWluU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnZ3JpZCdcbiAgICAgICAgbWFpblNjcmVlbi5zdHlsZVtcImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA9IFwiMWZyIDFmclwiXG4gICAgICAgIG1haW5TY3JlZW4uc3R5bGVbXCJncmlkLXRlbXBsYXRlLXJvd3NcIl0gPSBcIm1pbi1jb250ZW50IDFmclwiXG4gICAgICAgIFxuICAgICAgICBjb25zdCBwQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW50cm8gLnBCb2FyZCcpXG4gICAgXG4gICAgICAgIGNvbnN0IHBsYXllclNpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyU2lkZScpXG4gICAgICAgIHBsYXllclNpZGUuaW5zZXJ0QmVmb3JlKHBCb2FyZCwgcGxheWVyU2lkZS5jaGlsZE5vZGVzWzVdKVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQm90Qm9hcmRVSSgpIHtcbiAgICAgICAgY29uc3QgYm90Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYkJvYXJkJylcbiAgICAgICAgY3JlYXRlQm9hcmRDb21wb25lbnQoYm90Qm9hcmQpXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHVwZGF0ZUJvYXJkU2l6ZXMoKSB7XG4gICAgICAgIGNvbnN0IGJveFNpemUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCc6cm9vdCcpXG4gICAgICAgIGJveFNpemUuc3R5bGUuc2V0UHJvcGVydHkoJy0tYm94U2l6ZScsICc1MHB4JylcbiAgICB9XG5cbiAgICBjcmVhdGVCb3RCb2FyZFVJKClcbiAgICBzaG93TWFpblNjcmVlbigpXG4gICAgdXBkYXRlQm9hcmRTaXplcygpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckJvYXJkVUkoKSB7XG4gICAgY29uc3QgcEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBCb2FyZCcpXG4gICAgY3JlYXRlQm9hcmRDb21wb25lbnQocEJvYXJkKVxufVxuXG5cbmV4cG9ydCB7IGNyZWF0ZUJvYXJkQ29tcG9uZW50LCBidWlsZE1haW5TY3JlZW4sIGNyZWF0ZVBsYXllckJvYXJkVUkgfSIsImZ1bmN0aW9uIGdldFJhbmRvbU51bShtaW4sIG1heCkge1xuICAgIGNvbnN0IG51bSA9IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW47XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobnVtKVxufVxuXG5mdW5jdGlvbiBjYXBpdGFsaXplKHN0cmluZykge1xuICAgIGxldCBmaXJzdExldHRlciA9IHN0cmluZy5jaGFyQXQoMClcbiAgICBmaXJzdExldHRlciA9IGZpcnN0TGV0dGVyLnRvVXBwZXJDYXNlKClcbiAgICByZXR1cm4gZmlyc3RMZXR0ZXIgKyBzdHJpbmcuc2xpY2UoMSlcbn1cblxuZnVuY3Rpb24gc2ltdWxhdGVEcmFnRHJvcCgpIHtcbiAgICBjb25zdCBjYXJyaWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcnJpZXInKTtcbiAgICBjb25zdCBjYXJyaWVyRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXg9XCIzXCJdW2RhdGEteT1cIjVcIl0nKTtcblxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdWJtYXJpbmUnKTtcbiAgICBjb25zdCBzdWJtYXJpbmVFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEteD1cIjZcIl1bZGF0YS15PVwiNFwiXScpO1xuXG4gICAgY29uc3QgYmF0dGxlc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiYXR0bGVzaGlwJyk7XG4gICAgY29uc3QgYmF0dGxlc2hpcEVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS14PVwiMlwiXVtkYXRhLXk9XCIxXCJdJyk7XG5cbiAgICBjb25zdCBkZXN0cm95ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzdHJveWVyJyk7XG4gICAgY29uc3QgZGVzdHJveWVyRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXg9XCIwXCJdW2RhdGEteT1cIjBcIl0nKTtcblxuICAgIGNvbnN0IGNydWlzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3J1aXNlcicpO1xuICAgIGNvbnN0IGNydWlzZXJFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEteD1cIjZcIl1bZGF0YS15PVwiOVwiXScpO1xuXG4gICAgc2ltdWxhdGlvbnMoY2FycmllciwgY2FycmllckVsZW0pXG4gICAgc2ltdWxhdGlvbnMoYmF0dGxlc2hpcCwgYmF0dGxlc2hpcEVsZW0pXG4gICAgc2ltdWxhdGlvbnMoZGVzdHJveWVyLCBkZXN0cm95ZXJFbGVtKVxuICAgIHNpbXVsYXRpb25zKHN1Ym1hcmluZSwgc3VibWFyaW5lRWxlbSlcbiAgICBzaW11bGF0aW9ucyhjcnVpc2VyLCBjcnVpc2VyRWxlbSlcblxuXG4gICAgZnVuY3Rpb24gc2ltdWxhdGlvbnMoc2hpcEVsZW1lbnQsIHRhcmdldEVsZW1lbnQpIHtcbiAgICAgICAgLy8gU2ltdWxhdGUgZHJhZyBzdGFydCBldmVudFxuICAgICAgICBjb25zdCBkcmFnU3RhcnRFdmVudCA9IG5ldyBFdmVudCgnZHJhZ3N0YXJ0JywgeyBidWJibGVzOiB0cnVlIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZHJhZ1N0YXJ0RXZlbnQsICdkYXRhVHJhbnNmZXInLCB7XG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBzZXREYXRhOiBmdW5jdGlvbigpIHt9XG4gICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNoaXBFbGVtZW50LmRpc3BhdGNoRXZlbnQoZHJhZ1N0YXJ0RXZlbnQpO1xuICAgIFxuICAgICAgICAvLyBTaW11bGF0ZSBkcmFnIGVudGVyIGV2ZW50XG4gICAgICAgIGNvbnN0IGRyYWdFbnRlckV2ZW50ID0gbmV3IEV2ZW50KCdkcmFnZW50ZXInLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG4gICAgICAgIHRhcmdldEVsZW1lbnQuZGlzcGF0Y2hFdmVudChkcmFnRW50ZXJFdmVudCk7XG4gICAgXG4gICAgICAgIC8vIFNpbXVsYXRlIGRyYWcgb3ZlciBldmVudFxuICAgICAgICBjb25zdCBkcmFnT3ZlckV2ZW50ID0gbmV3IEV2ZW50KCdkcmFnb3ZlcicsIHsgYnViYmxlczogdHJ1ZSB9KTtcbiAgICAgICAgdGFyZ2V0RWxlbWVudC5kaXNwYXRjaEV2ZW50KGRyYWdPdmVyRXZlbnQpO1xuICAgIFxuICAgICAgICAvLyBTaW11bGF0ZSBkcm9wIGV2ZW50XG4gICAgICAgIGNvbnN0IGRyb3BFdmVudCA9IG5ldyBFdmVudCgnZHJvcCcsIHsgYnViYmxlczogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRyb3BFdmVudCwgJ2RhdGFUcmFuc2ZlcicsIHtcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIGdldERhdGE6IGZ1bmN0aW9uKCkgeyByZXR1cm4gc2hpcEVsZW1lbnQuaWQgKyAnLCcgKyBzaGlwRWxlbWVudC5kYXRhc2V0Lmxlbmd0aCArICcsJyArIHNoaXBFbGVtZW50LmRhdGFzZXQucm90YXRlZDsgfVxuICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0YXJnZXRFbGVtZW50LmRpc3BhdGNoRXZlbnQoZHJvcEV2ZW50KTtcbiAgICBcbiAgICAgICAgLy8gU2ltdWxhdGUgZHJhZyBlbmQgZXZlbnRcbiAgICAgICAgY29uc3QgZHJhZ0VuZEV2ZW50ID0gbmV3IEV2ZW50KCdkcmFnZW5kJywgeyBidWJibGVzOiB0cnVlIH0pO1xuICAgICAgICBzaGlwRWxlbWVudC5kaXNwYXRjaEV2ZW50KGRyYWdFbmRFdmVudCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzaW11bGF0ZUJlZ2luQmF0dGxlKCkge1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5iZWdpbkJhdHRsZScpXG4gICAgYnRuLmNsaWNrKClcbn1cblxuZXhwb3J0IHsgZ2V0UmFuZG9tTnVtLCBzaW11bGF0ZURyYWdEcm9wLCBzaW11bGF0ZUJlZ2luQmF0dGxlLCBjYXBpdGFsaXplIH0iLCJpbXBvcnQgeyBidWlsZE1haW5TY3JlZW4gfSBmcm9tIFwiLi9jb21wb25lbnRzL2dhbWVib2FyZFVJXCJcbmltcG9ydCB7IGNyZWF0ZUJvdCwgcDEgfSBmcm9tICcuL2luZGV4J1xuaW1wb3J0IHsgY2FwaXRhbGl6ZSB9IGZyb20gJy4vY29tcG9uZW50cy91dGlsaXRpZXMnXG4vLyByb3RhdGVkID0gdmVydGljYWxcbi8vIG5vdCByb3RhdGVkID0gaG9yaXpvbnRhbFxuXG4vLyBEUkFHIE4gRFJPUFxuZnVuY3Rpb24gYXBwbHlEcmFnRHJvcChib2FyZCkge1xuICAgIGFsbG93Um90YXRlKClcblxuICAgIGZ1bmN0aW9uIGRyYWdTdGFydEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJkcmFnZ2luZ1wiLCBldmVudC50YXJnZXQuaWQsIFwiLi4uXCIpXG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCBgJHtldmVudC50YXJnZXQuaWR9LCR7ZXZlbnQudGFyZ2V0LmRhdGFzZXQubGVuZ3RofSwgJHtldmVudC50YXJnZXQuZGF0YXNldC5yb3RhdGVkfWApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZ092ZXJIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcm9wSGFuZGxlcihldmVudCkge1xuICAgICAgICBmdW5jdGlvbiBwb3B1bGF0ZU5leHRCb3goYm94RWxlbWVudCwgcmVwZWF0LCBpc1JvdGF0ZWQpIHtcbiAgICAgICAgICAgIGlmIChyZXBlYXQgPT09IDApIHJldHVybjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgYm94RWxlbWVudC5jbGFzc0xpc3QuYWRkKHNoaXBOYW1lLCBcImRyb3BwZWRcIilcbiAgICAgICAgICAgIGJvYXJkLnBvc2l0aW9uU2hpcChib3hFbGVtZW50LmRhdGFzZXQueCwgYm94RWxlbWVudC5kYXRhc2V0LnksIHNoaXBOYW1lKVxuICAgICAgICAgICAgcmVwZWF0IC0tXG5cbiAgICAgICAgICAgIGlmIChpc1JvdGF0ZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gTnVtYmVyKGJveEVsZW1lbnQuZGF0YXNldC54KVxuICAgICAgICAgICAgICAgIGNvbnN0IG5leHREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PVwiJHt4KzF9XCJdW2RhdGEteT1cIiR7Ym94RWxlbWVudC5kYXRhc2V0Lnl9XCJdYClcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZU5leHRCb3gobmV4dERpdiwgcmVwZWF0LCBpc1JvdGF0ZWQpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvcHVsYXRlTmV4dEJveChib3hFbGVtZW50Lm5leHRTaWJsaW5nLCByZXBlYXQsIGlzUm90YXRlZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZUZyb21TaGlweWFyZChzaGlwTmFtZSkge1xuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3NoaXBOYW1lfWApXG4gICAgICAgICAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJyb3RhdGFibGVcIilcbiAgICAgICAgICAgIHNoaXAuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgc2hpcC5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICdmYWxzZScpXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpc1ZhbGlkRHJvcFpvbmUoZXZlbnQsIHNoaXBMZW5ndGgsIGlzUm90YXRlZCkge1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRJbmRleEJhc2VkT25TaGlwUm90YXRpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNSb3RhdGVkKSByZXR1cm4gTnVtYmVyKGV2ZW50LnRhcmdldC5kYXRhc2V0LngpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC55KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBmdW5jdGlvbiBhcmVFbXB0eVNsb3RzKGJveEVsZW1lbnQsIHNoaXBMZW5ndGgsIGluZGV4LCBpc1JvdGF0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoYm94RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJkcm9wcGVkXCIpKSByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICBpZiAoYm94RWxlbWVudCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgICAgICAgICBpZiAoc2hpcExlbmd0aCA9PT0gMSkgcmV0dXJuIHRydWVcblxuICAgICAgICAgICAgICAgIGxldCBuZXh0Qm94RWxlbWVudDtcblxuICAgICAgICAgICAgICAgIGlmIChpc1JvdGF0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeCA9IE51bWJlcihib3hFbGVtZW50LmRhdGFzZXQueClcbiAgICAgICAgICAgICAgICAgICAgbmV4dEJveEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PVwiJHt4KzF9XCJdW2RhdGEteT1cIiR7Ym94RWxlbWVudC5kYXRhc2V0Lnl9XCJdYClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB5ID0gTnVtYmVyKGJveEVsZW1lbnQuZGF0YXNldC55KVxuICAgICAgICAgICAgICAgICAgICBuZXh0Qm94RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXg9XCIke2JveEVsZW1lbnQuZGF0YXNldC54fVwiXVtkYXRhLXk9XCIke3krMX1cIl1gKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzaGlwTGVuZ3RoLS1cbiAgICAgICAgICAgICAgICByZXR1cm4gYXJlRW1wdHlTbG90cyhuZXh0Qm94RWxlbWVudCwgc2hpcExlbmd0aCwgaW5kZXgsIGlzUm90YXRlZClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBnZXRJbmRleEJhc2VkT25TaGlwUm90YXRpb24oZXZlbnQpXG5cbiAgICAgICAgICAgIGNvbnN0IHZhbGlkSW5kaWNlcyA9IChpbmRleCArIChzaGlwTGVuZ3RoIC0gMSkpIDw9IDlcbiAgICAgICAgICAgIGlmICghdmFsaWRJbmRpY2VzKSByZXR1cm4gZmFsc2VcblxuICAgICAgICAgICAgY29uc3QgZW1wdHlTbG90cyA9IGFyZUVtcHR5U2xvdHMoZXZlbnQudGFyZ2V0LCBzaGlwTGVuZ3RoLCBpbmRleCwgaXNSb3RhdGVkKVxuICAgICAgICAgICAgcmV0dXJuIGVtcHR5U2xvdHNcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgbGV0IFtzaGlwTmFtZSwgc2hpcExlbmd0aCwgaXNSb3RhdGVkXSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKFwidGV4dFwiKS5zcGxpdCgnLCcpXG5cbiAgICAgICAgaXNSb3RhdGVkID0gIGlzUm90YXRlZCA9PT0gXCIgZmFsc2VcIiA/IGZhbHNlIDogdHJ1ZVxuXG4gICAgICAgIGlmIChpc1ZhbGlkRHJvcFpvbmUoZXZlbnQsIHNoaXBMZW5ndGgsIGlzUm90YXRlZCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKHNoaXBOYW1lLCBcImRyb3BwZWRcIilcbiAgICAgICAgICAgIHBvcHVsYXRlTmV4dEJveChldmVudC50YXJnZXQsIHNoaXBMZW5ndGgsIGlzUm90YXRlZClcbiAgICAgICAgICAgIHJlbW92ZUZyb21TaGlweWFyZChzaGlwTmFtZSlcbiAgICAgICAgICAgIGJvYXJkLm51bU9mU2hpcHNSZWFkeSsrXG5cbiAgICAgICAgICAgIC8vIGlmIGFsbCBzaGlwcyBhcmUgcG9zaXRpb25lZCBvbiB0aGUgYm9hcmQsIHRoZW4gYWxsb3cgdXNlciB0byBzdGFydCB0aGUgZ2FtZVxuICAgICAgICAgICAgaWYgKGJvYXJkLm51bU9mU2hpcHNSZWFkeSA9PT0gNSkgdG9nZ2xlQmVnaW5CYXR0bGVCdG4oKVxuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzT2NjdXBpZWRCb3goZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkcm9wcGVkXCIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZ0xlYXZlSGFuZGxlcihldmVudCkge1xuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnRW50ZXJIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGlmICghaXNPY2N1cGllZEJveChldmVudCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaG92ZXJlZFwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWRlbnRpZnkgZHJhZ2dhYmxlIHNoaXBzXG4gICAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcCcpIFxuICAgIGNvbnN0IGJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJveCcpXG5cblxuICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBldmVudCA9PiBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50KSlcbiAgICAgICAgLy8gc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ1wiLCBldmVudCA9PiBkcmFnZ2luZ0hhbmRsZXIoZXZlbnQpKVxuICAgICAgICAvLyBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIGV2ZW50ID0+IGRyYWdFbmRIYW5kbGVyKGV2ZW50KSlcbiAgICB9KVxuXG4gICAgYm94ZXMuZm9yRWFjaChib3ggPT4ge1xuICAgICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCBldmVudCA9PiBkcmFnRW50ZXJIYW5kbGVyKGV2ZW50KSlcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBldmVudCA9PiBkcmFnT3ZlckhhbmRsZXIoZXZlbnQpKVxuICAgICAgICBib3guYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCBldmVudCA9PiBkcmFnTGVhdmVIYW5kbGVyKGV2ZW50KSlcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGV2ZW50ID0+IGRyb3BIYW5kbGVyKGV2ZW50KSlcbiAgICB9KVxuXG59XG5cbmZ1bmN0aW9uIGFsbG93Um90YXRlKCkge1xuICAgIGNvbnN0IHJvdGF0YWJsZVNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJvdGF0YWJsZScpXG5cbiAgICByb3RhdGFibGVTaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiByb3RhdGVTaGlwKGUsIGUudGFyZ2V0LmRhdGFzZXQubGVuZ3RoKSlcbiAgICB9KVxuXG5cbiAgICBmdW5jdGlvbiByb3RhdGVTaGlwKGUsIHNoaXBMZW5ndGgpIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChlLnRhcmdldC5kYXRhc2V0LnJvdGF0ZWQgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS53aWR0aCA9IGBjYWxjKHZhcigtLXNoaXBCb3hTaXplKSAqICR7c2hpcExlbmd0aH0pYFxuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuaGVpZ2h0ID0gXCJ2YXIoLS1zaGlwQm94U2l6ZSlcIlxuICAgICAgICAgICAgZS50YXJnZXQuZGF0YXNldC5yb3RhdGVkID0gXCJmYWxzZVwiXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLndpZHRoID0gXCJ2YXIoLS1zaGlwQm94U2l6ZSlcIlxuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuaGVpZ2h0ID0gYGNhbGModmFyKC0tc2hpcEJveFNpemUpICogJHtzaGlwTGVuZ3RofSlgXG4gICAgICAgICAgICBlLnRhcmdldC5kYXRhc2V0LnJvdGF0ZWQgPSBcInRydWVcIlxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0b2dnbGVCZWdpbkJhdHRsZUJ0bigpIHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24uYmVnaW5CYXR0bGUnKVxuICAgIGlmICghYnRuLnN0eWxlLmRpc3BsYXkpIHtcbiAgICAgICAgYnRuLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcbiAgICAgICAgYWxsb3dHYW1lU3RhcnQoYnRuKVxuICAgIH1cbiAgICBlbHNlIHsgYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSd9XG59XG5cbmZ1bmN0aW9uIHJlc2V0U2hpcHMoKSB7XG4gICAgLy8gZGlzcGxheSBzaGlwcyBhZ2FpblxuICAgIC8vIGFsbG93IGRyYWdnYWJsZSBcbiAgICAvLyBlbXB0eSB0aGUgYm9hcmQgYXJyYXlcbiAgICAvLyBlbXB0eSB0aGUgYm9hcmQgZ3JpZFxuICAgIC8vIGhpZGUgYmVnaW4gYmF0dGxlIGJ1dHRvblxufVxuXG5mdW5jdGlvbiBhbGxvd0dhbWVTdGFydChidG4pIHtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgYnVpbGRNYWluU2NyZWVuKClcbiAgICAgICAgY29uc3QgYm90ID0gY3JlYXRlQm90KClcbiAgICAgICAgLy8gc3RhcnQgd2l0aCBwbGF5ZXIncyB0dXJuXG4gICAgICAgIHVwZGF0ZUdhbWVOb3RpZmljYXRpb24oXCJJdCdzIHlvdXIgdHVybiFcIilcbiAgICAgICAgYWxsb3dQbGF5ZXJBdHRhY2socDEsIGJvdClcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBhbGxvd1Rha2luZ1R1cm5zKHAxLCBib3QsIHR1cm4pIHtcbiAgICBjb25zb2xlLmxvZygnY3VycmVudCB0dXJuOicsIHR1cm4pXG5cbiAgICBmdW5jdGlvbiBjaGVja0lmQWxsU2hpcHNTdW5rKCkge1xuICAgICAgICBjb25zdCBwMVNoaXBzID0gcDEuYm9hcmQuYXJlQWxsU2hpcHNTdW5rKClcbiAgICAgICAgY29uc3QgYm90U2hpcHMgPSBib3QuYm9hcmQuYXJlQWxsU2hpcHNTdW5rKClcbiAgICAgICAgcmV0dXJuIHAxU2hpcHMgfHwgYm90U2hpcHNcbiAgICB9XG5cbiAgICBpZiAoY2hlY2tJZkFsbFNoaXBzU3VuaygpID09PSBmYWxzZSkge1xuICAgICAgICBpZiAodHVybiA9PT0gXCJwMVwiKSB7XG4gICAgICAgICAgICBlbmFibGVCb3RCb2FyZEV2ZW50cygpXG4gICAgICAgIH0gZWxzZSBpZiAodHVybiA9PT0gXCJib3RcIikge1xuICAgICAgICAgICAgYWxsb3dCb3RBdHRhY2socDEsIGJvdClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc3dpdGNoVHVybnMocDEsIGJvdCwgcHJldmlvdXNUdXJuKSB7XG4gICAgY29uc3QgdGltZURlbGF5ID0gMjAwMFxuICAgIGlmIChwcmV2aW91c1R1cm4gPT09IFwicDFcIikge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHVwZGF0ZUdhbWVOb3RpZmljYXRpb24oXCJJdCdzIGJvdCdzIHR1cm4hXCIpXG4gICAgICAgICAgICBkaXNhYmxlQm90Qm9hcmRFdmVudHMoKVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBhbGxvd1Rha2luZ1R1cm5zKHAxLCBib3QsIFwiYm90XCIpLCB0aW1lRGVsYXkpXG4gICAgICAgIH0sIHRpbWVEZWxheSlcbiAgICAgICAgXG4gICAgfSBlbHNlIGlmIChwcmV2aW91c1R1cm4gPT09IFwiYm90XCIpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVHYW1lTm90aWZpY2F0aW9uKFwiSXQncyB5b3VyIHR1cm4hXCIpXG4gICAgICAgICAgICBhbGxvd1Rha2luZ1R1cm5zKHAxLCBib3QsIFwicDFcIilcbiAgICAgICAgfSwgdGltZURlbGF5KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYWxsb3dQbGF5ZXJBdHRhY2socDEsIGJvdCkge1xuICAgIGNvbnN0IGJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJCb2FyZCAuYm9hcmRHcmlkIC5ib3gnKVxuICAgIGJveGVzLmZvckVhY2goYm94ID0+IHtcbiAgICAgICAgLy8gaG92ZXJcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGUgPT4ge1xuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBtb3VzZSBob3ZlciBsZWF2ZXNcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBlID0+IHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gYXR0YWNrIGlzIG1hZGVcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtaXNzTXNnID0gXCJJdCdzIGEgbWlzcyFcIlxuICAgICAgICAgICAgY29uc3QgaGl0TXNnID0gXCJJdCdzIGEgaGl0IVwiXG4gICAgICAgICAgICBjb25zdCBjb29yZHMgPSBbTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQueCksIE51bWJlcihlLnRhcmdldC5kYXRhc2V0LnkpXVxuXG4gICAgICAgICAgICBjb25zdCBbYXR0YWNrRmVlZGJhY2ssIGlzU3Vuaywgc2hpcE5hbWVdID0gcDEuYXR0YWNrRW5lbXkoY29vcmRzLCBib3QuYm9hcmQpXG4gICAgICAgICAgICB1cGRhdGVHYW1lTm90aWZpY2F0aW9uKGF0dGFja0ZlZWRiYWNrKVxuXG4gICAgICAgICAgICBpZiAoYXR0YWNrRmVlZGJhY2sgPT09IG1pc3NNc2cpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdtaXNzJylcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXR0YWNrRmVlZGJhY2sgPT09IGhpdE1zZykge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXNTdW5rKVxuICAgICAgICAgICAgICAgIGlmIChpc1N1bmspIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlR2FtZU5vdGlmaWNhdGlvbihgJHtjYXBpdGFsaXplKHNoaXBOYW1lKX0gaGFzIHN1bmshYClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdwZXJtYW5lbnRseURpc2FibGVkJylcbiAgICAgICAgICAgIHN3aXRjaFR1cm5zKHAxLCBib3QsICdwMScpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuXG5mdW5jdGlvbiBhbGxvd0JvdEF0dGFjayhwMSwgYm90KSB7XG4gICAgY29uc3QgY29vcmRzQXJyID0gYm90LmdldENvb3JkaW5hdGVzKClcbiAgICBjb25zdCBbYXR0YWNrRmVlZGJhY2ssIGlzU3Vuaywgc2hpcE5hbWVdID0gYm90LmF0dGFja0VuZW15KGNvb3Jkc0FyciwgcDEuYm9hcmQpXG4gICAgdXBkYXRlR2FtZU5vdGlmaWNhdGlvbihhdHRhY2tGZWVkYmFjaylcbiAgICBjb25zdCBib3hFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD1cIiR7Y29vcmRzQXJyWzBdfVwiXVtkYXRhLXk9XCIke2Nvb3Jkc0FyclsxXX1cIl1gKVxuXG4gICAgaWYgKGF0dGFja0ZlZWRiYWNrID09PSBcIkl0J3MgYSBtaXNzIVwiKSB7XG4gICAgICAgIGJveEVsZW0uY2xhc3NMaXN0LmFkZCgnbWlzcycpXG4gICAgfSBlbHNlIGlmIChhdHRhY2tGZWVkYmFjayA9PT0gXCJJdCdzIGEgaGl0IVwiKSB7XG4gICAgICAgIGJveEVsZW0uY2xhc3NMaXN0LmFkZCgnaGl0JylcbiAgICAgICAgaWYgKGlzU3Vuaykge1xuICAgICAgICAgICAgdXBkYXRlR2FtZU5vdGlmaWNhdGlvbihgJHtzaGlwTmFtZX0gaGFzIHN1bmshYClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN3aXRjaFR1cm5zKHAxLCBib3QsICdib3QnKVxufVxuXG5cbmZ1bmN0aW9uIGRpc2FibGVCb3RCb2FyZEV2ZW50cygpIHtcbiAgICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5iQm9hcmQgLmJvYXJkR3JpZCAuYm94JylcbiAgICBib3hlcy5mb3JFYWNoKGJveCA9PiB7XG4gICAgICAgIGlmICghYm94LmNsYXNzTGlzdC5jb250YWlucygncGVybWFuZW50bHlEaXNhYmxlZCcpKSBib3guY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGVuYWJsZUJvdEJvYXJkRXZlbnRzKCkge1xuICAgIGNvbnN0IGJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJCb2FyZCAuYm9hcmRHcmlkIC5ib3gnKVxuICAgIGJveGVzLmZvckVhY2goYm94ID0+IGJveC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpKVxufVxuXG5cbmZ1bmN0aW9uIHVwZGF0ZUdhbWVOb3RpZmljYXRpb24obWVzc2FnZSkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluSGVhZGVyJylcbiAgICBjb250YWluZXIuaW5uZXJUZXh0ID0gbWVzc2FnZVxufVxuXG5leHBvcnQgeyBhcHBseURyYWdEcm9wIH0iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkRmFjdG9yeSdcbmltcG9ydCB7IGdldFJhbmRvbU51bSB9IGZyb20gJy4uL2NvbXBvbmVudHMvdXRpbGl0aWVzJ1xuXG5jbGFzcyBCb3Qge1xuICAgICNzdWNjZXNzZnVsQXR0YWNrO1xuICAgICNwcmV2aW91c0F0dGFjaztcbiAgICAjcG9zc2libGVTbWFydE1vdmVzO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLiNjcmVhdGVCb2FyZCgpXG4gICAgICAgIHRoaXMuI3ByZXZpb3VzQXR0YWNrID0gbnVsbFxuICAgICAgICB0aGlzLiNzdWNjZXNzZnVsQXR0YWNrID0gZmFsc2VcbiAgICAgICAgdGhpcy4jcG9zc2libGVTbWFydE1vdmVzID0gW1swLCAxXSwgWzAsIC0xXSwgWy0xLCAwXSwgWzEsIDBdXVxuICAgIH1cblxuICAgICNjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgY29uc3QgbmV3Qm9hcmQgPSBuZXcgR2FtZWJvYXJkXG4gICAgICAgIHJldHVybiBuZXdCb2FyZFxuICAgIH1cbiAgICBcbiAgIGlzRW1wdHlQb3NpdGlvbih4LCB5KSB7XG4gICAgICAgIGNvbnN0IG1pc3NlZFByZXZBdHRhY2sgPSB0aGlzLmJvYXJkLmdldE1pc3NlZEF0dGFja3MoKS5pbmNsdWRlcyhbeCx5XSlcbiAgICAgICAgY29uc3Qgc3VjY2Vzc3NmdWxQcmV2QXR0YWNrID0gdGhpcy5ib2FyZC5nZXRTdWNjZXNzZnVsQXR0YWNrcygpLmluY2x1ZGVzKFt4LHldKVxuICAgICAgICByZXR1cm4gIW1pc3NlZFByZXZBdHRhY2sgfHwgIXN1Y2Nlc3NzZnVsUHJldkF0dGFja1xuICAgIH1cblxuICAgIGdldENvb3JkaW5hdGVzKGVuZW15R2FtZWJvYXJkKSB7XG4gICAgICAgIC8vIHBpY2sgYSByYW5kb20gc3BvdCB3aXRoaW4gdGhlIGJvYXJkXG4gICAgICAgIC8vIHNob3VsZCBiZSBhIHVuaXF1ZSBjb29yZGluYXRlIGV2ZXJ5IHRpbWVcbiAgICAgICAgLy8gaWYgcHJldmlvdXMgY29vcmRpbmF0ZSB3YXMgYSBoaXQsIGNob29zZSBhbiBhZGphY2VudCBjb29yZGluYXRlXG4gICAgICAgIC8vIGltcHJvdmVtZW50IC0tIGdlbmVyYXRlIG5leHQgY29vcmRpbmF0ZSBiYXNlZCBvbiBhdmFpbGFibGUgZW1wdHkgc2xvdHMgaW5zdGVhZCBvZiByYW5kb20geC95IGNvb3Jkc1xuXG4gICAgICAgIGlmICh0aGlzLiNzdWNjZXNzZnVsQXR0YWNrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4jcG9zc2libGVTbWFydE1vdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NpdGlvbk9mZnNldCA9IHRoaXMuI3Bvc3NpYmxlU21hcnRNb3Zlcy5wb3AoKVxuICAgICAgICAgICAgICAgIGxldCB4Q29vcmQgPSB0aGlzLiNwcmV2aW91c0F0dGFja1swXSArIHBvc2l0aW9uT2Zmc2V0WzBdXG4gICAgICAgICAgICAgICAgbGV0IHlDb29yZCA9IHRoaXMuI3ByZXZpb3VzQXR0YWNrWzFdICsgcG9zaXRpb25PZmZzZXRbMV1cblxuICAgICAgICAgICAgICAgIHJldHVybiBbeENvb3JkLCB5Q29vcmRdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeENvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG4gICAgICAgIGxldCB5Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcblxuICAgICAgICB3aGlsZSAoIXRoaXMuaXNFbXB0eVBvc2l0aW9uKHhDb29yZCwgeUNvb3JkKSkge1xuICAgICAgICAgICAgeENvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG4gICAgICAgICAgICB5Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbeENvb3JkLCB5Q29vcmRdXG4gICAgfVxuXG5cbiAgICBhdHRhY2tFbmVteShjb29yZGluYXRlc0FyciwgZW5lbXlCb2FyZCkge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBbLi4uY29vcmRpbmF0ZXNBcnJdIFxuICAgICAgICBjb25zdCBhdHRhY2tGZWVkYmFjayA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KVxuICAgICAgICBpZiAoYXR0YWNrRmVlZGJhY2sgPT09IFwiSXQncyBhIGhpdCFcIikge1xuICAgICAgICAgICAgdGhpcy4jc3RvcmVQcmV2aW91c0F0dGFjayhjb29yZGluYXRlc0FyciwgdHJ1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuI3N0b3JlUHJldmlvdXNBdHRhY2soY29vcmRpbmF0ZXNBcnIsIGZhbHNlKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdHRhY2tGZWVkYmFja1xuICAgIH1cblxuICAgIHZpZXdCb2FyZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmQuZ2V0Qm9hcmQoKVxuICAgIH1cblxuICAgICNzdG9yZVByZXZpb3VzQXR0YWNrKGNvb3JkaW5hdGVzQXJyLCBlbmVteVdhc0hpdCkge1xuICAgICAgICB0aGlzLiNwcmV2aW91c0F0dGFjayA9IGNvb3JkaW5hdGVzQXJyXG4gICAgICAgIHRoaXMuI3N1Y2Nlc3NmdWxBdHRhY2sgPSBlbmVteVdhc0hpdFxuICAgIH1cblxuICAgIHBvc2l0aW9uQWxsU2hpcHMoKSB7XG4gICAgICAgIGNvbnN0IGFsbFNoaXBzID0gdGhpcy5ib2FyZC5nZXRBbGxTaGlwcygpXG4gICAgICAgIGFsbFNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZGluYXRlc0FyciA9IHRoaXMuI2dlbmVyYXRlQ29vcmRpbmF0ZXMoc2hpcClcbiAgICAgICAgICAgIG5ld0Nvb3JkaW5hdGVzQXJyLmZvckVhY2goY29vcmQgPT4gdGhpcy5ib2FyZC5wb3NpdGlvblNoaXAoY29vcmRbMF0sIGNvb3JkWzFdLCBzaGlwLm5hbWUpKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgICNnZW5lcmF0ZUNvb3JkaW5hdGVzKHNoaXApIHtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXNBcnIgPSBbXVxuICAgICAgICBjb25zdCBpc1JvdGF0ZWQgPSBnZXRSYW5kb21OdW0oMCwgMSkgLy8gMCA9PSBmYWxzZSwgMSA9PSB0cnVlXG4gICAgICAgICAgICBcbiAgICAgICAgLy8gaW5pdGlhdGUgdmFyaWFibGVzXG4gICAgICAgIGxldCB4Q29vcmQgPSAwO1xuICAgICAgICBsZXQgeUNvb3JkID0gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBnZW5lcmF0ZSBzdGFydGluZyBjb29yZGluYXRlc1xuICAgICAgICBpZiAoaXNSb3RhdGVkID09IDEpIHtcbiAgICAgICAgICAgIHhDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5IC0gc2hpcC5sZW5ndGgpIC8vIGV4YW1wbGUsIGlmIHNoaXBMZW5ndGg9NSwgdGhlbiBjaG9vc2UgMC01IHgtY29vcmRpbmF0ZXNcbiAgICAgICAgICAgIHlDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5KVxuXG4gICAgICAgICAgICBjb29yZGluYXRlc0Fyci5wdXNoKFt4Q29vcmQsIHlDb29yZF0pXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxIDsgaSA8IHNoaXAubGVuZ3RoIDsgaSsrICkge1xuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzQXJyLnB1c2goW3hDb29yZCArIGksIHlDb29yZF0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHsgLy8gb3RoZXJ3aXNlLCBob3Jpem9udGFsXG4gICAgICAgICAgICB4Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcbiAgICAgICAgICAgIHlDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5IC0gc2hpcC5sZW5ndGgpXG5cbiAgICAgICAgICAgIGNvb3JkaW5hdGVzQXJyLnB1c2goW3hDb29yZCwgeUNvb3JkXSlcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDEgOyBpIDwgc2hpcC5sZW5ndGggOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXNBcnIucHVzaChbeENvb3JkLCB5Q29vcmQgKyBpXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIGNvb3JkaW5hdGVzIGFyZSBvY2N1cGllZFxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gY29vcmRpbmF0ZXNBcnIuZXZlcnkoY29vcmQgPT4gdGhpcy5pc0VtcHR5UG9zaXRpb24oY29vcmRbMF0sIGNvb3JkWzFdLCB0aGlzLnZpZXdCb2FyZCgpKSlcblxuICAgICAgICAvLyByZXR1cm4gaWYgdmFsaWQgY29vcmRpbmF0ZXMsIG90aGVyd2lzZSBmaW5kIG5ldyBvbmVzXG4gICAgICAgIGlmIChpc1ZhbGlkKSByZXR1cm4gY29vcmRpbmF0ZXNBcnJcbiAgICAgICAgZWxzZSB7IHJldHVybiB0aGlzLiNnZW5lcmF0ZUNvb3JkaW5hdGVzKHNoaXApIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJvdFxuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwRmFjdG9yeSdcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYXJyaWVyID0gdGhpcy4jY3JlYXRlU2hpcCgnY2FycmllcicsIDUpXG4gICAgICAgIHRoaXMuYmF0dGxlc2hpcCA9IHRoaXMuI2NyZWF0ZVNoaXAoJ2JhdHRsZXNoaXAnLCA0KVxuICAgICAgICB0aGlzLmNydWlzZXIgPSB0aGlzLiNjcmVhdGVTaGlwKCdjcnVpc2VyJywgMylcbiAgICAgICAgdGhpcy5zdWJtYXJpbmUgPSB0aGlzLiNjcmVhdGVTaGlwKCdzdWJtYXJpbmUnLCAzKVxuICAgICAgICB0aGlzLmRlc3Ryb3llciA9IHRoaXMuI2NyZWF0ZVNoaXAoJ2Rlc3Ryb3llcicsIDIpXG4gICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLiNjcmVhdGVCb2FyZCgpXG4gICAgICAgIHRoaXMubWlzc2VkQXR0YWNrcyA9IFtdXG4gICAgICAgIHRoaXMuc3VjY2Vzc2Z1bEF0dGFja3MgPSBbXVxuICAgICAgICB0aGlzLm51bU9mU2hpcHNSZWFkeSA9IDA7XG4gICAgfVxuXG4gICAgI2NyZWF0ZUJvYXJkKCkge1xuICAgICAgICBsZXQgYm9hcmQgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPD0gOSA7IGkrKykge1xuICAgICAgICAgICAgbGV0IHJvdyA9IFtdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPD0gOSA7IGkrKykge1xuICAgICAgICAgICAgICAgIHJvdy5wdXNoKG51bGwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib2FyZC5wdXNoKHJvdylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYm9hcmRcbiAgICB9XG4gICAgXG5cbiAgICAjY3JlYXRlU2hpcChuYW1lLCBsZW5ndGgpIHtcbiAgICAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKG5hbWUsIGxlbmd0aClcbiAgICAgICAgcmV0dXJuIHNoaXBcbiAgICB9XG5cbiAgICBnZXRBbGxTaGlwcygpIHtcbiAgICAgICAgY29uc3Qgc2hpcHMgPSBbXG4gICAgICAgICAgICB0aGlzLmNhcnJpZXIsIFxuICAgICAgICAgICAgdGhpcy5iYXR0bGVzaGlwLCBcbiAgICAgICAgICAgIHRoaXMuY3J1aXNlciwgXG4gICAgICAgICAgICB0aGlzLnN1Ym1hcmluZSwgXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3llclxuICAgICAgICBdXG4gICAgICAgIHJldHVybiBzaGlwc1xuICAgIH1cblxuICAgIHBvc2l0aW9uU2hpcCh4LCB5LCBzaGlwTmFtZSkgeyAvLyBwb3NpdGlvbiBzaGlwIGF0IHgseSBjb29yZGluYXRlc1xuICAgICAgICB0aGlzLnVwZGF0ZUJvYXJkQXJyYXkoTnVtYmVyKHgpLCBOdW1iZXIoeSksIHNoaXBOYW1lKVxuICAgIH1cblxuXG4gICAgdXBkYXRlQm9hcmRBcnJheSh4LCB5LCBzaGlwTmFtZSkge1xuICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gc2hpcE5hbWVcbiAgICB9ICBcblxuICAgIGdldEJvYXJkKCkge1xuICAgICAgICBjb25zdCBib2FyZENvcHkgPSBbLi4udGhpcy5ib2FyZF1cbiAgICAgICAgcmV0dXJuIGJvYXJkQ29weVxuICAgIH1cblxuICAgIGdldE1pc3NlZEF0dGFja3MoKSB7XG4gICAgICAgIGNvbnN0IG1pc3NlZEF0dGFja0FyckNvcHkgPSBbLi4udGhpcy5taXNzZWRBdHRhY2tzXVxuICAgICAgICByZXR1cm4gbWlzc2VkQXR0YWNrQXJyQ29weVxuICAgIH1cblxuICAgIGdldFN1Y2Nlc3NmdWxBdHRhY2tzKCkge1xuICAgICAgICBjb25zdCBzdWNjZXNzZnVsQXR0YWNrQXJyQ29weSA9IFsuLi50aGlzLnN1Y2Nlc3NmdWxBdHRhY2tzXVxuICAgICAgICByZXR1cm4gc3VjY2Vzc2Z1bEF0dGFja0FyckNvcHlcbiAgICB9XG5cbiAgICAjc3RvcmVNaXNzZWRBdHRhY2soeCwgeSkge1xuICAgICAgICB0aGlzLm1pc3NlZEF0dGFja3MucHVzaChbeCx5XSlcbiAgICB9XG5cbiAgICAjc3RvcmVTdWNjZXNzZnVsQXR0YWNrKHgsIHkpIHtcbiAgICAgICAgdGhpcy5zdWNjZXNzZnVsQXR0YWNrcy5wdXNoKFt4LCB5XSlcbiAgICB9XG5cbiAgICAjaXNWYWxpZEF0dGFjayh4LCB5KSB7XG4gICAgICAgIC8vIGFsbCBzaG91bGQgYmUgdHJ1ZVxuICAgICAgICBjb25zdCB1bmlxdWVNaXNzZWRBdHRhY2sgPSAhdGhpcy5nZXRNaXNzZWRBdHRhY2tzKCkuaW5jbHVkZXMoW3gsIHldKVxuICAgICAgICBjb25zdCB1bmlxdWVTdWNjZXNzZnVsQXR0YWNrID0gIXRoaXMuZ2V0U3VjY2Vzc2Z1bEF0dGFja3MoKS5pbmNsdWRlcyhbeCwgeV0pIFxuICAgICAgICBjb25zdCB2YWxpZENvb3JkaW5hdGVzID0gKHggPj0gMCAmJiB4IDw9IDkpICYmICh5ID49IDAgJiYgeSA8PSA5KVxuXG4gICAgICAgIHJldHVybiB1bmlxdWVNaXNzZWRBdHRhY2sgJiYgdW5pcXVlU3VjY2Vzc2Z1bEF0dGFjayAmJiB2YWxpZENvb3JkaW5hdGVzXG4gICAgfVxuXG4gICAgcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGEgc2hpcCBhdCBbeCwgeV0gY29vcmRpbmF0ZXNcbiAgICAgICAgLy8gaWYgeWVzLCBhcHBseSBkYW1hZ2UgdG8gdGhpcy5zaGlwICYgcmVjb3JkIHN1Y2Nlc3NmdWwgYXR0YWNrXG4gICAgICAgIC8vIGlmIG5vdCwgcmVjb3JkIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgbWlzc2VkIGF0dGFja1xuXG4gICAgICAgIGlmICh0aGlzLiNpc1ZhbGlkQXR0YWNrKHgsIHkpKSB7XG4gICAgICAgICAgICBjb25zdCBib2FyZCA9IHRoaXMuZ2V0Qm9hcmQoKVxuICAgICAgICAgICAgY29uc3Qgc2hpcHMgPSB7XG4gICAgICAgICAgICAgICAgJ2NhcnJpZXInOiB0aGlzLmNhcnJpZXIsIFxuICAgICAgICAgICAgICAgICdiYXR0bGVzaGlwJzogdGhpcy5iYXR0bGVzaGlwLCBcbiAgICAgICAgICAgICAgICAnY3J1aXNlcic6IHRoaXMuY3J1aXNlciwgXG4gICAgICAgICAgICAgICAgJ3N1Ym1hcmluZSc6IHRoaXMuc3VibWFyaW5lLCBcbiAgICAgICAgICAgICAgICAnZGVzdHJveWVyJzogdGhpcy5kZXN0cm95ZXJcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJvYXJkW3hdW3ldICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2hpcHNbYm9hcmRbeF1beV1dLmhpdCgpXG4gICAgICAgICAgICAgICAgdGhpcy4jc3RvcmVTdWNjZXNzZnVsQXR0YWNrKHgsIHkpXG4gICAgICAgICAgICAgICAgY29uc3QgaXNTdW5rID0gc2hpcHNbYm9hcmRbeF1beV1dLmNoZWNrSWZTdW5rKClcbiAgICAgICAgICAgICAgICByZXR1cm4gW1wiSXQncyBhIGhpdCFcIiwgaXNTdW5rLCBzaGlwc1tib2FyZFt4XVt5XV0ubmFtZV1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4jc3RvcmVNaXNzZWRBdHRhY2soeCwgeSlcbiAgICAgICAgICAgICAgICByZXR1cm4gW1wiSXQncyBhIG1pc3MhXCIsIGZhbHNlLCB1bmRlZmluZWRdXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHJldHVybiAnSW52YWxpZCBhdHRhY2snXG4gICAgfVxuXG4gICAgYXJlQWxsU2hpcHNTdW5rKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRTdWNjZXNzZnVsQXR0YWNrcygpLmxlbmd0aCA+PSAxNykge1xuICAgICAgICAgICAgY29uc3Qgc2hpcHMgPSB0aGlzLmdldEFsbFNoaXBzKClcbiAgICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHNoaXBzLmV2ZXJ5KHNoaXAgPT4gc2hpcC5zdW5rID09PSB0cnVlKVxuXG4gICAgICAgICAgICBpZiAoc3RhdHVzKSBjb25zb2xlLmxvZygnQWxsIHNoaXBzIGhhdmUgc3VuayEhIScpXG5cbiAgICAgICAgICAgIHJldHVybiBzdGF0dXNcbiAgICAgICAgICAgIFxuICAgICAgICB9IHJldHVybiBmYWxzZVxuXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQiLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkRmFjdG9yeSdcblxuY2xhc3MgUGxheWVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IHRoaXMuI2NyZWF0ZUJvYXJkKClcbiAgICB9XG5cbiAgICAjY3JlYXRlQm9hcmQoKSB7XG4gICAgICAgIGNvbnN0IG5ld0JvYXJkID0gbmV3IEdhbWVib2FyZFxuICAgICAgICByZXR1cm4gbmV3Qm9hcmRcbiAgICB9XG5cbiAgICBhdHRhY2tFbmVteShjb29yZGluYXRlc0FyciwgZW5lbXlCb2FyZCkge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBbLi4uY29vcmRpbmF0ZXNBcnJdIFxuICAgICAgICBjb25zdCBhdHRhY2tGZWVkYmFjayA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KVxuICAgICAgICByZXR1cm4gYXR0YWNrRmVlZGJhY2tcbiAgICB9XG5cbiAgICB2aWV3Qm9hcmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkLmdldEJvYXJkKClcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllciIsImNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lLFxuICAgICAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSAwO1xuICAgICAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBoaXQoKSB7XG4gICAgICAgIHRoaXMuZGFtYWdlID0gdGhpcy5kYW1hZ2UgKyAxXG4gICAgICAgIHRoaXMuI2lzU3VuaygpXG4gICAgfVxuXG4gICAgY2hlY2tJZlN1bmsoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1bmtcbiAgICB9XG5cbiAgICAjc2V0U2hpcEFzU3VuaygpIHtcbiAgICAgICAgdGhpcy5zdW5rID0gdHJ1ZVxuICAgIH1cblxuICAgICNpc1N1bmsoKSB7XG4gICAgICAgIGlmICh0aGlzLmRhbWFnZSA9PT0gdGhpcy5sZW5ndGgpIHRoaXMuI3NldFNoaXBBc1N1bmsoKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcCIsImltcG9ydCB7IGFwcGx5RHJhZ0Ryb3AgfSBmcm9tIFwiLi9ldmVudExpc3RlbmVyc1wiXG5pbXBvcnQgeyBjcmVhdGVQbGF5ZXJCb2FyZFVJIH0gZnJvbSBcIi4vY29tcG9uZW50cy9nYW1lYm9hcmRVSVwiXG5pbXBvcnQgeyBzaW11bGF0ZURyYWdEcm9wLCBzaW11bGF0ZUJlZ2luQmF0dGxlIH0gZnJvbSBcIi4vY29tcG9uZW50cy91dGlsaXRpZXNcIlxuaW1wb3J0IEJvdCBmcm9tIFwiLi9mYWN0b3JpZXMvYm90RmFjdG9yeVwiXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL2ZhY3Rvcmllcy9wbGF5ZXJGYWN0b3J5XCJcblxuLy8gY3JlYXRlIHBsYXllciBvYmplY3RcbmZ1bmN0aW9uIGNyZWF0ZVBsYXllcigpIHtcbiAgICBjb25zdCBwMSA9IG5ldyBQbGF5ZXJcbiAgICByZXR1cm4gcDFcbn1cblxuLy8gY3JlYXRlIGJvdCBvYmplY3RcbmZ1bmN0aW9uIGNyZWF0ZUJvdCgpIHtcbiAgICBjb25zdCBib3QgPSBuZXcgQm90XG4gICAgYm90LnBvc2l0aW9uQWxsU2hpcHMoKVxuICAgIGNvbnNvbGUubG9nKGJvdC52aWV3Qm9hcmQoKSlcbiAgICByZXR1cm4gYm90XG59XG5cbi8vIGNyZWF0ZSBwbGF5ZXIgb2JqZWN0ICYgZ2FtZWJvYXJkXG5jcmVhdGVQbGF5ZXJCb2FyZFVJKClcbmNvbnN0IHAxID0gY3JlYXRlUGxheWVyKClcblxuXG4vLyBhY3RpdmF0ZSBldmVudCBsaXN0ZW5lcnNcbmFwcGx5RHJhZ0Ryb3AocDEuYm9hcmQpXG5cblxuLy8gaW50cm8gc2ltdWxhdGlvbiBmb3IgdGVzdGluZ1xuc2ltdWxhdGVEcmFnRHJvcCgpXG5zaW11bGF0ZUJlZ2luQmF0dGxlKClcblxuZXhwb3J0IHsgY3JlYXRlQm90LCBwMSB9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==