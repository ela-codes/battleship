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
        mainScreen.style["grid-template-rows"] = "100px 1fr"
        
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

        if (p1Ships) updateGameNotification("Bot wins!")
        else if (botShips) updateGameNotification("Player wins!")

        return p1Ships || botShips
    }

    if (checkIfAllShipsSunk() === false) { 
        if (turn === "p1") {
            enableBotBoardEvents()
        } else if (turn === "bot") {
            allowBotAttack(p1, bot)
        }
    } else { // if game over
        const restartBtn = createRestartGameButton()
        restartBtn.addEventListener('click', () => refreshPage())
    }
}

function switchTurns(p1, bot, previousTurn) {
    const timeDelay = 1500
    if (previousTurn === "p1") {
        disableBotBoardEvents()
        setTimeout(() => {
            updateGameNotification("It's bot's turn!")
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
                    console.log(`Bot ${(0,_components_utilities__WEBPACK_IMPORTED_MODULE_2__.capitalize)(shipName)} has sunk!`)
                    showInGraveyard(shipName, 'bot')
                }
            }
            e.target.classList.add('permanentlyDisabled')
            switchTurns(p1, bot, 'p1')
        })
    })
}


function allowBotAttack(p1, bot) {
    const coordsArr = bot.getCoordinates(p1.board)
    const [attackFeedback, isSunk, shipName] = bot.attackEnemy(coordsArr, p1.board)

    updateGameNotification(attackFeedback)
    const boxElem = document.querySelector(`[data-x="${coordsArr[0]}"][data-y="${coordsArr[1]}"]`)
    console.log(p1.board.getSuccessfulAttacks())
    console.log(p1.board.getMissedAttacks())

    console.log(coordsArr, attackFeedback)
    if (attackFeedback === "It's a miss!") {
        boxElem.classList.add('miss')
    } else if (attackFeedback === "It's a hit!") {
        boxElem.classList.add('hit')
        if (isSunk) {
            updateGameNotification(`${shipName} has sunk!`)
            console.log(`Player ${(0,_components_utilities__WEBPACK_IMPORTED_MODULE_2__.capitalize)(shipName)} has sunk!`)
            showInGraveyard(shipName, 'p1')
        }
    }
    switchTurns(p1, bot, 'bot')
}

function showInGraveyard(shipName, shipOwner) {
    let graveyard;

    if (shipOwner === "bot") {
        graveyard = document.querySelector('.bSunkShips')
    } else {
        graveyard = document.querySelector('.pSunkShips')
    }

    const ship = document.createElement('div')
    ship.id = shipName
    ship.innerText = shipName.toUpperCase()
    ship.classList.add('ship')
    graveyard.append(ship)

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

function createRestartGameButton() {
    const restartBtn = document.createElement('button')
    restartBtn.classList.add('restart')
    restartBtn.innerHTML= 'Restart Game?'

    const mainheader = document.querySelector('.mainHeader')
    mainheader.append(restartBtn)

    return restartBtn
}

function refreshPage() {
    location.reload()
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
    
   isEmptyPosition(x, y, enemyBoard) {
        console.log(enemyBoard.getMissedAttacks())
        const notAMissedAttack = !enemyBoard.getMissedAttacks().some(attack => attack[0] == x && attack[1] == y)
        const notASucessfulAttack = !enemyBoard.getSuccessfulAttacks().some(attack => attack[0] == x && attack[1] == y)
        
        if (notAMissedAttack && notASucessfulAttack) return true
        return false
    }

    getCoordinates(enemyBoard) {
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
        let emptyPosition = this.isEmptyPosition(xCoord, yCoord, enemyBoard)
        console.log(xCoord,yCoord,emptyPosition)

        if (emptyPosition) return [xCoord, yCoord] 
        return this.getCoordinates(enemyBoard)
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
        const isValid = coordinatesArr.every(coord => this.viewBoard()[coord[0]][coord[1]] === null)

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
    console.log(p1.viewBoard())
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


// // intro simulation for testing
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsNkRBQUc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0RUFBbUI7QUFDbkI7OztBQUdBO0FBQ0EsK0RBQWE7OztBQUdiO0FBQ0E7QUFDQTs7Ozs7Ozs7VUNoQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvZ2FtZWJvYXJkVUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2V2ZW50TGlzdGVuZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL2JvdEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvZ2FtZWJvYXJkRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2ZhY3Rvcmllcy9wbGF5ZXJGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL3NoaXBGYWN0b3J5LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVCb2FyZENvbXBvbmVudChwYXJlbnRDb250YWluZXIpIHtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVlIZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IHlIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB5SGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkWUhlYWRlcicpXG4gICAgICAgIGNvbnN0IGxldHRlcnMgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCcsICdJJywgJ0onXVxuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8PSA5OyB5KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnYm94SGVhZGVyJylcbiAgICAgICAgICAgIGJveC5pbm5lclRleHQgPSBsZXR0ZXJzW3ldIFxuICAgICAgICAgICAgeUhlYWRlci5hcHBlbmQoYm94KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB5SGVhZGVyXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlWEhlYWRlcigpIHtcbiAgICAgICAgY29uc3QgeEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHhIZWFkZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmRYSGVhZGVyJylcblxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8PSA5OyB4KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBib3guY2xhc3NMaXN0LmFkZCgnYm94SGVhZGVyJylcbiAgICAgICAgICAgIGJveC5pbm5lclRleHQgPSB4ICsgMSAvLyBvZmZzZXQgZm9yIHplcm8gaW5kZXhpbmdcbiAgICAgICAgICAgIHhIZWFkZXIuYXBwZW5kKGJveClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geEhlYWRlclxuICAgIH1cblxuICAgIC8vIGNyZWF0ZSB0b3AtbGV2ZWwgY29udGFpbmVyc1xuICAgIGNvbnN0IGNoaWxkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBjaGlsZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdib2FyZENvbnRhaW5lcicpXG5cbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgYm9hcmQuY2xhc3NMaXN0LmFkZCgnYm9hcmRHcmlkJylcblxuICAgIC8vIGNyZWF0ZSBib2FyZCBncmlkc1xuICAgIGZvciAobGV0IHggPSAwOyB4IDw9IDk7IHgrKykge1xuICAgICAgICBjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICByb3cuY2xhc3NMaXN0LmFkZCgncm93JylcbiAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gOTsgeSsrKSB7XG4gICAgICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgYm94LmNsYXNzTGlzdC5hZGQoJ2JveCcpXG4gICAgICAgICAgICBib3guZGF0YXNldC54ID0geFxuICAgICAgICAgICAgYm94LmRhdGFzZXQueSA9IHlcbiAgICAgICAgICAgIHJvdy5hcHBlbmQoYm94KVxuICAgICAgICB9XG4gICAgICAgIGJvYXJkLmFwcGVuZChyb3cpXG4gICAgfVxuXG5cbiAgICAvLyBhcHBlbmQgdG8gY29udGFpbmVyc1xuICAgIGNoaWxkQ29udGFpbmVyLmFwcGVuZChjcmVhdGVYSGVhZGVyKCksIGNyZWF0ZVlIZWFkZXIoKSwgYm9hcmQpXG4gICAgcGFyZW50Q29udGFpbmVyLmFwcGVuZChjaGlsZENvbnRhaW5lcilcbn1cblxuZnVuY3Rpb24gYnVpbGRNYWluU2NyZWVuKCkge1xuICAgIGZ1bmN0aW9uIHNob3dNYWluU2NyZWVuKCkge1xuICAgICAgICBjb25zdCBpbnRyb1NjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnRybycpXG4gICAgICAgIGludHJvU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICBcbiAgICAgICAgY29uc3QgbWFpblNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJylcbiAgICAgICAgbWFpblNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ2dyaWQnXG4gICAgICAgIG1haW5TY3JlZW4uc3R5bGVbXCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0gPSBcIjFmciAxZnJcIlxuICAgICAgICBtYWluU2NyZWVuLnN0eWxlW1wiZ3JpZC10ZW1wbGF0ZS1yb3dzXCJdID0gXCIxMDBweCAxZnJcIlxuICAgICAgICBcbiAgICAgICAgY29uc3QgcEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmludHJvIC5wQm9hcmQnKVxuICAgIFxuICAgICAgICBjb25zdCBwbGF5ZXJTaWRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllclNpZGUnKVxuICAgICAgICBwbGF5ZXJTaWRlLmluc2VydEJlZm9yZShwQm9hcmQsIHBsYXllclNpZGUuY2hpbGROb2Rlc1s1XSlcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUJvdEJvYXJkVUkoKSB7XG4gICAgICAgIGNvbnN0IGJvdEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJCb2FyZCcpXG4gICAgICAgIGNyZWF0ZUJvYXJkQ29tcG9uZW50KGJvdEJvYXJkKVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiB1cGRhdGVCb2FyZFNpemVzKCkge1xuICAgICAgICBjb25zdCBib3hTaXplID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignOnJvb3QnKVxuICAgICAgICBib3hTaXplLnN0eWxlLnNldFByb3BlcnR5KCctLWJveFNpemUnLCAnNTBweCcpXG4gICAgfVxuXG4gICAgY3JlYXRlQm90Qm9hcmRVSSgpXG4gICAgc2hvd01haW5TY3JlZW4oKVxuICAgIHVwZGF0ZUJvYXJkU2l6ZXMoKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJCb2FyZFVJKCkge1xuICAgIGNvbnN0IHBCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wQm9hcmQnKVxuICAgIGNyZWF0ZUJvYXJkQ29tcG9uZW50KHBCb2FyZClcbn1cblxuXG5leHBvcnQgeyBjcmVhdGVCb2FyZENvbXBvbmVudCwgYnVpbGRNYWluU2NyZWVuLCBjcmVhdGVQbGF5ZXJCb2FyZFVJIH0iLCJmdW5jdGlvbiBnZXRSYW5kb21OdW0obWluLCBtYXgpIHtcbiAgICBjb25zdCBudW0gPSBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluO1xuICAgIHJldHVybiBNYXRoLmZsb29yKG51bSlcbn1cblxuZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHJpbmcpIHtcbiAgICBsZXQgZmlyc3RMZXR0ZXIgPSBzdHJpbmcuY2hhckF0KDApXG4gICAgZmlyc3RMZXR0ZXIgPSBmaXJzdExldHRlci50b1VwcGVyQ2FzZSgpXG4gICAgcmV0dXJuIGZpcnN0TGV0dGVyICsgc3RyaW5nLnNsaWNlKDEpXG59XG5cbmZ1bmN0aW9uIHNpbXVsYXRlRHJhZ0Ryb3AoKSB7XG4gICAgY29uc3QgY2FycmllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYXJyaWVyJyk7XG4gICAgY29uc3QgY2FycmllckVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS14PVwiM1wiXVtkYXRhLXk9XCI1XCJdJyk7XG5cbiAgICBjb25zdCBzdWJtYXJpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWFyaW5lJyk7XG4gICAgY29uc3Qgc3VibWFyaW5lRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXg9XCI2XCJdW2RhdGEteT1cIjRcIl0nKTtcblxuICAgIGNvbnN0IGJhdHRsZXNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmF0dGxlc2hpcCcpO1xuICAgIGNvbnN0IGJhdHRsZXNoaXBFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEteD1cIjJcIl1bZGF0YS15PVwiMVwiXScpO1xuXG4gICAgY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc3Ryb3llcicpO1xuICAgIGNvbnN0IGRlc3Ryb3llckVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS14PVwiMFwiXVtkYXRhLXk9XCIwXCJdJyk7XG5cbiAgICBjb25zdCBjcnVpc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NydWlzZXInKTtcbiAgICBjb25zdCBjcnVpc2VyRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXg9XCI2XCJdW2RhdGEteT1cIjlcIl0nKTtcblxuICAgIHNpbXVsYXRpb25zKGNhcnJpZXIsIGNhcnJpZXJFbGVtKVxuICAgIHNpbXVsYXRpb25zKGJhdHRsZXNoaXAsIGJhdHRsZXNoaXBFbGVtKVxuICAgIHNpbXVsYXRpb25zKGRlc3Ryb3llciwgZGVzdHJveWVyRWxlbSlcbiAgICBzaW11bGF0aW9ucyhzdWJtYXJpbmUsIHN1Ym1hcmluZUVsZW0pXG4gICAgc2ltdWxhdGlvbnMoY3J1aXNlciwgY3J1aXNlckVsZW0pXG5cblxuICAgIGZ1bmN0aW9uIHNpbXVsYXRpb25zKHNoaXBFbGVtZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgIC8vIFNpbXVsYXRlIGRyYWcgc3RhcnQgZXZlbnRcbiAgICAgICAgY29uc3QgZHJhZ1N0YXJ0RXZlbnQgPSBuZXcgRXZlbnQoJ2RyYWdzdGFydCcsIHsgYnViYmxlczogdHJ1ZSB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGRyYWdTdGFydEV2ZW50LCAnZGF0YVRyYW5zZmVyJywge1xuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgc2V0RGF0YTogZnVuY3Rpb24oKSB7fVxuICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzaGlwRWxlbWVudC5kaXNwYXRjaEV2ZW50KGRyYWdTdGFydEV2ZW50KTtcbiAgICBcbiAgICAgICAgLy8gU2ltdWxhdGUgZHJhZyBlbnRlciBldmVudFxuICAgICAgICBjb25zdCBkcmFnRW50ZXJFdmVudCA9IG5ldyBFdmVudCgnZHJhZ2VudGVyJywgeyBidWJibGVzOiB0cnVlIH0pO1xuICAgICAgICB0YXJnZXRFbGVtZW50LmRpc3BhdGNoRXZlbnQoZHJhZ0VudGVyRXZlbnQpO1xuICAgIFxuICAgICAgICAvLyBTaW11bGF0ZSBkcmFnIG92ZXIgZXZlbnRcbiAgICAgICAgY29uc3QgZHJhZ092ZXJFdmVudCA9IG5ldyBFdmVudCgnZHJhZ292ZXInLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG4gICAgICAgIHRhcmdldEVsZW1lbnQuZGlzcGF0Y2hFdmVudChkcmFnT3ZlckV2ZW50KTtcbiAgICBcbiAgICAgICAgLy8gU2ltdWxhdGUgZHJvcCBldmVudFxuICAgICAgICBjb25zdCBkcm9wRXZlbnQgPSBuZXcgRXZlbnQoJ2Ryb3AnLCB7IGJ1YmJsZXM6IHRydWUgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkcm9wRXZlbnQsICdkYXRhVHJhbnNmZXInLCB7XG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICBnZXREYXRhOiBmdW5jdGlvbigpIHsgcmV0dXJuIHNoaXBFbGVtZW50LmlkICsgJywnICsgc2hpcEVsZW1lbnQuZGF0YXNldC5sZW5ndGggKyAnLCcgKyBzaGlwRWxlbWVudC5kYXRhc2V0LnJvdGF0ZWQ7IH1cbiAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGFyZ2V0RWxlbWVudC5kaXNwYXRjaEV2ZW50KGRyb3BFdmVudCk7XG4gICAgXG4gICAgICAgIC8vIFNpbXVsYXRlIGRyYWcgZW5kIGV2ZW50XG4gICAgICAgIGNvbnN0IGRyYWdFbmRFdmVudCA9IG5ldyBFdmVudCgnZHJhZ2VuZCcsIHsgYnViYmxlczogdHJ1ZSB9KTtcbiAgICAgICAgc2hpcEVsZW1lbnQuZGlzcGF0Y2hFdmVudChkcmFnRW5kRXZlbnQpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2ltdWxhdGVCZWdpbkJhdHRsZSgpIHtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24uYmVnaW5CYXR0bGUnKVxuICAgIGJ0bi5jbGljaygpXG59XG5cbmV4cG9ydCB7IGdldFJhbmRvbU51bSwgc2ltdWxhdGVEcmFnRHJvcCwgc2ltdWxhdGVCZWdpbkJhdHRsZSwgY2FwaXRhbGl6ZSB9IiwiaW1wb3J0IHsgYnVpbGRNYWluU2NyZWVuIH0gZnJvbSBcIi4vY29tcG9uZW50cy9nYW1lYm9hcmRVSVwiXG5pbXBvcnQgeyBjcmVhdGVCb3QsIHAxIH0gZnJvbSAnLi9pbmRleCdcbmltcG9ydCB7IGNhcGl0YWxpemUgfSBmcm9tICcuL2NvbXBvbmVudHMvdXRpbGl0aWVzJ1xuLy8gcm90YXRlZCA9IHZlcnRpY2FsXG4vLyBub3Qgcm90YXRlZCA9IGhvcml6b250YWxcblxuLy8gRFJBRyBOIERST1BcbmZ1bmN0aW9uIGFwcGx5RHJhZ0Ryb3AoYm9hcmQpIHtcbiAgICBhbGxvd1JvdGF0ZSgpXG5cbiAgICBmdW5jdGlvbiBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZHJhZ2dpbmdcIiwgZXZlbnQudGFyZ2V0LmlkLCBcIi4uLlwiKVxuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgYCR7ZXZlbnQudGFyZ2V0LmlkfSwke2V2ZW50LnRhcmdldC5kYXRhc2V0Lmxlbmd0aH0sICR7ZXZlbnQudGFyZ2V0LmRhdGFzZXQucm90YXRlZH1gKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdPdmVySGFuZGxlcihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJvcEhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgZnVuY3Rpb24gcG9wdWxhdGVOZXh0Qm94KGJveEVsZW1lbnQsIHJlcGVhdCwgaXNSb3RhdGVkKSB7XG4gICAgICAgICAgICBpZiAocmVwZWF0ID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGJveEVsZW1lbnQuY2xhc3NMaXN0LmFkZChzaGlwTmFtZSwgXCJkcm9wcGVkXCIpXG4gICAgICAgICAgICBib2FyZC5wb3NpdGlvblNoaXAoYm94RWxlbWVudC5kYXRhc2V0LngsIGJveEVsZW1lbnQuZGF0YXNldC55LCBzaGlwTmFtZSlcbiAgICAgICAgICAgIHJlcGVhdCAtLVxuXG4gICAgICAgICAgICBpZiAoaXNSb3RhdGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IE51bWJlcihib3hFbGVtZW50LmRhdGFzZXQueClcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD1cIiR7eCsxfVwiXVtkYXRhLXk9XCIke2JveEVsZW1lbnQuZGF0YXNldC55fVwiXWApXG4gICAgICAgICAgICAgICAgcG9wdWxhdGVOZXh0Qm94KG5leHREaXYsIHJlcGVhdCwgaXNSb3RhdGVkKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwb3B1bGF0ZU5leHRCb3goYm94RWxlbWVudC5uZXh0U2libGluZywgcmVwZWF0LCBpc1JvdGF0ZWQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZW1vdmVGcm9tU2hpcHlhcmQoc2hpcE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtzaGlwTmFtZX1gKVxuICAgICAgICAgICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwicm90YXRhYmxlXCIpXG4gICAgICAgICAgICBzaGlwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgIHNoaXAuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAnZmFsc2UnKVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNWYWxpZERyb3Bab25lKGV2ZW50LCBzaGlwTGVuZ3RoLCBpc1JvdGF0ZWQpIHtcblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0SW5kZXhCYXNlZE9uU2hpcFJvdGF0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUm90YXRlZCkgcmV0dXJuIE51bWJlcihldmVudC50YXJnZXQuZGF0YXNldC54KVxuICAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIoZXZlbnQudGFyZ2V0LmRhdGFzZXQueSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZnVuY3Rpb24gYXJlRW1wdHlTbG90cyhib3hFbGVtZW50LCBzaGlwTGVuZ3RoLCBpbmRleCwgaXNSb3RhdGVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJveEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJvcHBlZFwiKSkgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgaWYgKGJveEVsZW1lbnQgPT09IG51bGwpIHJldHVybiBmYWxzZVxuXG4gICAgICAgICAgICAgICAgaWYgKHNoaXBMZW5ndGggPT09IDEpIHJldHVybiB0cnVlXG5cbiAgICAgICAgICAgICAgICBsZXQgbmV4dEJveEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNSb3RhdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHggPSBOdW1iZXIoYm94RWxlbWVudC5kYXRhc2V0LngpXG4gICAgICAgICAgICAgICAgICAgIG5leHRCb3hFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD1cIiR7eCsxfVwiXVtkYXRhLXk9XCIke2JveEVsZW1lbnQuZGF0YXNldC55fVwiXWApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeSA9IE51bWJlcihib3hFbGVtZW50LmRhdGFzZXQueSlcbiAgICAgICAgICAgICAgICAgICAgbmV4dEJveEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS14PVwiJHtib3hFbGVtZW50LmRhdGFzZXQueH1cIl1bZGF0YS15PVwiJHt5KzF9XCJdYClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2hpcExlbmd0aC0tXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZUVtcHR5U2xvdHMobmV4dEJveEVsZW1lbnQsIHNoaXBMZW5ndGgsIGluZGV4LCBpc1JvdGF0ZWQpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZ2V0SW5kZXhCYXNlZE9uU2hpcFJvdGF0aW9uKGV2ZW50KVxuXG4gICAgICAgICAgICBjb25zdCB2YWxpZEluZGljZXMgPSAoaW5kZXggKyAoc2hpcExlbmd0aCAtIDEpKSA8PSA5XG4gICAgICAgICAgICBpZiAoIXZhbGlkSW5kaWNlcykgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgICAgIGNvbnN0IGVtcHR5U2xvdHMgPSBhcmVFbXB0eVNsb3RzKGV2ZW50LnRhcmdldCwgc2hpcExlbmd0aCwgaW5kZXgsIGlzUm90YXRlZClcbiAgICAgICAgICAgIHJldHVybiBlbXB0eVNsb3RzXG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGxldCBbc2hpcE5hbWUsIHNoaXBMZW5ndGgsIGlzUm90YXRlZF0gPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIikuc3BsaXQoJywnKVxuXG4gICAgICAgIGlzUm90YXRlZCA9ICBpc1JvdGF0ZWQgPT09IFwiIGZhbHNlXCIgPyBmYWxzZSA6IHRydWVcblxuICAgICAgICBpZiAoaXNWYWxpZERyb3Bab25lKGV2ZW50LCBzaGlwTGVuZ3RoLCBpc1JvdGF0ZWQpKSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChzaGlwTmFtZSwgXCJkcm9wcGVkXCIpXG4gICAgICAgICAgICBwb3B1bGF0ZU5leHRCb3goZXZlbnQudGFyZ2V0LCBzaGlwTGVuZ3RoLCBpc1JvdGF0ZWQpXG4gICAgICAgICAgICByZW1vdmVGcm9tU2hpcHlhcmQoc2hpcE5hbWUpXG4gICAgICAgICAgICBib2FyZC5udW1PZlNoaXBzUmVhZHkrK1xuXG4gICAgICAgICAgICAvLyBpZiBhbGwgc2hpcHMgYXJlIHBvc2l0aW9uZWQgb24gdGhlIGJvYXJkLCB0aGVuIGFsbG93IHVzZXIgdG8gc3RhcnQgdGhlIGdhbWVcbiAgICAgICAgICAgIGlmIChib2FyZC5udW1PZlNoaXBzUmVhZHkgPT09IDUpIHRvZ2dsZUJlZ2luQmF0dGxlQnRuKClcbiAgICAgICAgfVxuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc09jY3VwaWVkQm94KGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJvcHBlZFwiKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYWdMZWF2ZUhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhZ0VudGVySGFuZGxlcihldmVudCkge1xuICAgICAgICBpZiAoIWlzT2NjdXBpZWRCb3goZXZlbnQpKSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIElkZW50aWZ5IGRyYWdnYWJsZSBzaGlwc1xuICAgIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKSBcbiAgICBjb25zdCBib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ib3gnKVxuXG5cbiAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZXZlbnQgPT4gZHJhZ1N0YXJ0SGFuZGxlcihldmVudCkpXG4gICAgICAgIC8vIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdcIiwgZXZlbnQgPT4gZHJhZ2dpbmdIYW5kbGVyKGV2ZW50KSlcbiAgICAgICAgLy8gc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCBldmVudCA9PiBkcmFnRW5kSGFuZGxlcihldmVudCkpXG4gICAgfSlcblxuICAgIGJveGVzLmZvckVhY2goYm94ID0+IHtcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgZXZlbnQgPT4gZHJhZ0VudGVySGFuZGxlcihldmVudCkpXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZXZlbnQgPT4gZHJhZ092ZXJIYW5kbGVyKGV2ZW50KSlcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgZXZlbnQgPT4gZHJhZ0xlYXZlSGFuZGxlcihldmVudCkpXG4gICAgICAgIGJveC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBldmVudCA9PiBkcm9wSGFuZGxlcihldmVudCkpXG4gICAgfSlcblxufVxuXG5mdW5jdGlvbiBhbGxvd1JvdGF0ZSgpIHtcbiAgICBjb25zdCByb3RhdGFibGVTaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb3RhdGFibGUnKVxuXG4gICAgcm90YXRhYmxlU2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4gcm90YXRlU2hpcChlLCBlLnRhcmdldC5kYXRhc2V0Lmxlbmd0aCkpXG4gICAgfSlcblxuXG4gICAgZnVuY3Rpb24gcm90YXRlU2hpcChlLCBzaGlwTGVuZ3RoKSB7XG4gICAgICAgIFxuICAgICAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5yb3RhdGVkID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUud2lkdGggPSBgY2FsYyh2YXIoLS1zaGlwQm94U2l6ZSkgKiAke3NoaXBMZW5ndGh9KWBcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmhlaWdodCA9IFwidmFyKC0tc2hpcEJveFNpemUpXCJcbiAgICAgICAgICAgIGUudGFyZ2V0LmRhdGFzZXQucm90YXRlZCA9IFwiZmFsc2VcIlxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlLnRhcmdldC5zdHlsZS53aWR0aCA9IFwidmFyKC0tc2hpcEJveFNpemUpXCJcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmhlaWdodCA9IGBjYWxjKHZhcigtLXNoaXBCb3hTaXplKSAqICR7c2hpcExlbmd0aH0pYFxuICAgICAgICAgICAgZS50YXJnZXQuZGF0YXNldC5yb3RhdGVkID0gXCJ0cnVlXCJcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9nZ2xlQmVnaW5CYXR0bGVCdG4oKSB7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLmJlZ2luQmF0dGxlJylcbiAgICBpZiAoIWJ0bi5zdHlsZS5kaXNwbGF5KSB7XG4gICAgICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgICAgIGFsbG93R2FtZVN0YXJ0KGJ0bilcbiAgICB9XG4gICAgZWxzZSB7IGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnfVxufVxuXG5mdW5jdGlvbiByZXNldFNoaXBzKCkge1xuICAgIC8vIGRpc3BsYXkgc2hpcHMgYWdhaW5cbiAgICAvLyBhbGxvdyBkcmFnZ2FibGUgXG4gICAgLy8gZW1wdHkgdGhlIGJvYXJkIGFycmF5XG4gICAgLy8gZW1wdHkgdGhlIGJvYXJkIGdyaWRcbiAgICAvLyBoaWRlIGJlZ2luIGJhdHRsZSBidXR0b25cbn1cblxuZnVuY3Rpb24gYWxsb3dHYW1lU3RhcnQoYnRuKSB7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGJ1aWxkTWFpblNjcmVlbigpXG4gICAgICAgIGNvbnN0IGJvdCA9IGNyZWF0ZUJvdCgpXG4gICAgICAgIC8vIHN0YXJ0IHdpdGggcGxheWVyJ3MgdHVyblxuICAgICAgICB1cGRhdGVHYW1lTm90aWZpY2F0aW9uKFwiSXQncyB5b3VyIHR1cm4hXCIpXG4gICAgICAgIGFsbG93UGxheWVyQXR0YWNrKHAxLCBib3QpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gYWxsb3dUYWtpbmdUdXJucyhwMSwgYm90LCB0dXJuKSB7XG4gICAgY29uc29sZS5sb2coJ2N1cnJlbnQgdHVybjonLCB0dXJuKVxuXG4gICAgZnVuY3Rpb24gY2hlY2tJZkFsbFNoaXBzU3VuaygpIHtcbiAgICAgICAgY29uc3QgcDFTaGlwcyA9IHAxLmJvYXJkLmFyZUFsbFNoaXBzU3VuaygpXG4gICAgICAgIGNvbnN0IGJvdFNoaXBzID0gYm90LmJvYXJkLmFyZUFsbFNoaXBzU3VuaygpXG5cbiAgICAgICAgaWYgKHAxU2hpcHMpIHVwZGF0ZUdhbWVOb3RpZmljYXRpb24oXCJCb3Qgd2lucyFcIilcbiAgICAgICAgZWxzZSBpZiAoYm90U2hpcHMpIHVwZGF0ZUdhbWVOb3RpZmljYXRpb24oXCJQbGF5ZXIgd2lucyFcIilcblxuICAgICAgICByZXR1cm4gcDFTaGlwcyB8fCBib3RTaGlwc1xuICAgIH1cblxuICAgIGlmIChjaGVja0lmQWxsU2hpcHNTdW5rKCkgPT09IGZhbHNlKSB7IFxuICAgICAgICBpZiAodHVybiA9PT0gXCJwMVwiKSB7XG4gICAgICAgICAgICBlbmFibGVCb3RCb2FyZEV2ZW50cygpXG4gICAgICAgIH0gZWxzZSBpZiAodHVybiA9PT0gXCJib3RcIikge1xuICAgICAgICAgICAgYWxsb3dCb3RBdHRhY2socDEsIGJvdClcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7IC8vIGlmIGdhbWUgb3ZlclxuICAgICAgICBjb25zdCByZXN0YXJ0QnRuID0gY3JlYXRlUmVzdGFydEdhbWVCdXR0b24oKVxuICAgICAgICByZXN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcmVmcmVzaFBhZ2UoKSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHN3aXRjaFR1cm5zKHAxLCBib3QsIHByZXZpb3VzVHVybikge1xuICAgIGNvbnN0IHRpbWVEZWxheSA9IDE1MDBcbiAgICBpZiAocHJldmlvdXNUdXJuID09PSBcInAxXCIpIHtcbiAgICAgICAgZGlzYWJsZUJvdEJvYXJkRXZlbnRzKClcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVHYW1lTm90aWZpY2F0aW9uKFwiSXQncyBib3QncyB0dXJuIVwiKVxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBhbGxvd1Rha2luZ1R1cm5zKHAxLCBib3QsIFwiYm90XCIpLCB0aW1lRGVsYXkpXG4gICAgICAgIH0sIHRpbWVEZWxheSlcbiAgICAgICAgXG4gICAgfSBlbHNlIGlmIChwcmV2aW91c1R1cm4gPT09IFwiYm90XCIpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB1cGRhdGVHYW1lTm90aWZpY2F0aW9uKFwiSXQncyB5b3VyIHR1cm4hXCIpXG4gICAgICAgICAgICBhbGxvd1Rha2luZ1R1cm5zKHAxLCBib3QsIFwicDFcIilcbiAgICAgICAgfSwgdGltZURlbGF5KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYWxsb3dQbGF5ZXJBdHRhY2socDEsIGJvdCkge1xuICAgIGNvbnN0IGJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJCb2FyZCAuYm9hcmRHcmlkIC5ib3gnKVxuICAgIGJveGVzLmZvckVhY2goYm94ID0+IHtcbiAgICAgICAgLy8gaG92ZXJcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGUgPT4ge1xuICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBtb3VzZSBob3ZlciBsZWF2ZXNcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBlID0+IHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcnXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gYXR0YWNrIGlzIG1hZGVcbiAgICAgICAgYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtaXNzTXNnID0gXCJJdCdzIGEgbWlzcyFcIlxuICAgICAgICAgICAgY29uc3QgaGl0TXNnID0gXCJJdCdzIGEgaGl0IVwiXG4gICAgICAgICAgICBjb25zdCBjb29yZHMgPSBbTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQueCksIE51bWJlcihlLnRhcmdldC5kYXRhc2V0LnkpXVxuXG4gICAgICAgICAgICBjb25zdCBbYXR0YWNrRmVlZGJhY2ssIGlzU3Vuaywgc2hpcE5hbWVdID0gcDEuYXR0YWNrRW5lbXkoY29vcmRzLCBib3QuYm9hcmQpXG4gICAgICAgICAgICB1cGRhdGVHYW1lTm90aWZpY2F0aW9uKGF0dGFja0ZlZWRiYWNrKVxuXG4gICAgICAgICAgICBpZiAoYXR0YWNrRmVlZGJhY2sgPT09IG1pc3NNc2cpIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdtaXNzJylcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXR0YWNrRmVlZGJhY2sgPT09IGhpdE1zZykge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaXNTdW5rKVxuICAgICAgICAgICAgICAgIGlmIChpc1N1bmspIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlR2FtZU5vdGlmaWNhdGlvbihgJHtjYXBpdGFsaXplKHNoaXBOYW1lKX0gaGFzIHN1bmshYClcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEJvdCAke2NhcGl0YWxpemUoc2hpcE5hbWUpfSBoYXMgc3VuayFgKVxuICAgICAgICAgICAgICAgICAgICBzaG93SW5HcmF2ZXlhcmQoc2hpcE5hbWUsICdib3QnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3Blcm1hbmVudGx5RGlzYWJsZWQnKVxuICAgICAgICAgICAgc3dpdGNoVHVybnMocDEsIGJvdCwgJ3AxJylcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5cbmZ1bmN0aW9uIGFsbG93Qm90QXR0YWNrKHAxLCBib3QpIHtcbiAgICBjb25zdCBjb29yZHNBcnIgPSBib3QuZ2V0Q29vcmRpbmF0ZXMocDEuYm9hcmQpXG4gICAgY29uc3QgW2F0dGFja0ZlZWRiYWNrLCBpc1N1bmssIHNoaXBOYW1lXSA9IGJvdC5hdHRhY2tFbmVteShjb29yZHNBcnIsIHAxLmJvYXJkKVxuXG4gICAgdXBkYXRlR2FtZU5vdGlmaWNhdGlvbihhdHRhY2tGZWVkYmFjaylcbiAgICBjb25zdCBib3hFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEteD1cIiR7Y29vcmRzQXJyWzBdfVwiXVtkYXRhLXk9XCIke2Nvb3Jkc0FyclsxXX1cIl1gKVxuICAgIGNvbnNvbGUubG9nKHAxLmJvYXJkLmdldFN1Y2Nlc3NmdWxBdHRhY2tzKCkpXG4gICAgY29uc29sZS5sb2cocDEuYm9hcmQuZ2V0TWlzc2VkQXR0YWNrcygpKVxuXG4gICAgY29uc29sZS5sb2coY29vcmRzQXJyLCBhdHRhY2tGZWVkYmFjaylcbiAgICBpZiAoYXR0YWNrRmVlZGJhY2sgPT09IFwiSXQncyBhIG1pc3MhXCIpIHtcbiAgICAgICAgYm94RWxlbS5jbGFzc0xpc3QuYWRkKCdtaXNzJylcbiAgICB9IGVsc2UgaWYgKGF0dGFja0ZlZWRiYWNrID09PSBcIkl0J3MgYSBoaXQhXCIpIHtcbiAgICAgICAgYm94RWxlbS5jbGFzc0xpc3QuYWRkKCdoaXQnKVxuICAgICAgICBpZiAoaXNTdW5rKSB7XG4gICAgICAgICAgICB1cGRhdGVHYW1lTm90aWZpY2F0aW9uKGAke3NoaXBOYW1lfSBoYXMgc3VuayFgKVxuICAgICAgICAgICAgY29uc29sZS5sb2coYFBsYXllciAke2NhcGl0YWxpemUoc2hpcE5hbWUpfSBoYXMgc3VuayFgKVxuICAgICAgICAgICAgc2hvd0luR3JhdmV5YXJkKHNoaXBOYW1lLCAncDEnKVxuICAgICAgICB9XG4gICAgfVxuICAgIHN3aXRjaFR1cm5zKHAxLCBib3QsICdib3QnKVxufVxuXG5mdW5jdGlvbiBzaG93SW5HcmF2ZXlhcmQoc2hpcE5hbWUsIHNoaXBPd25lcikge1xuICAgIGxldCBncmF2ZXlhcmQ7XG5cbiAgICBpZiAoc2hpcE93bmVyID09PSBcImJvdFwiKSB7XG4gICAgICAgIGdyYXZleWFyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iU3Vua1NoaXBzJylcbiAgICB9IGVsc2Uge1xuICAgICAgICBncmF2ZXlhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucFN1bmtTaGlwcycpXG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc2hpcC5pZCA9IHNoaXBOYW1lXG4gICAgc2hpcC5pbm5lclRleHQgPSBzaGlwTmFtZS50b1VwcGVyQ2FzZSgpXG4gICAgc2hpcC5jbGFzc0xpc3QuYWRkKCdzaGlwJylcbiAgICBncmF2ZXlhcmQuYXBwZW5kKHNoaXApXG5cbn1cblxuZnVuY3Rpb24gZGlzYWJsZUJvdEJvYXJkRXZlbnRzKCkge1xuICAgIGNvbnN0IGJveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJCb2FyZCAuYm9hcmRHcmlkIC5ib3gnKVxuICAgIGJveGVzLmZvckVhY2goYm94ID0+IHtcbiAgICAgICAgaWYgKCFib3guY2xhc3NMaXN0LmNvbnRhaW5zKCdwZXJtYW5lbnRseURpc2FibGVkJykpIGJveC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZW5hYmxlQm90Qm9hcmRFdmVudHMoKSB7XG4gICAgY29uc3QgYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYkJvYXJkIC5ib2FyZEdyaWQgLmJveCcpXG4gICAgYm94ZXMuZm9yRWFjaChib3ggPT4gYm94LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJykpXG59XG5cblxuZnVuY3Rpb24gdXBkYXRlR2FtZU5vdGlmaWNhdGlvbihtZXNzYWdlKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5IZWFkZXInKVxuICAgIGNvbnRhaW5lci5pbm5lclRleHQgPSBtZXNzYWdlXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlc3RhcnRHYW1lQnV0dG9uKCkge1xuICAgIGNvbnN0IHJlc3RhcnRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKVxuICAgIHJlc3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgncmVzdGFydCcpXG4gICAgcmVzdGFydEJ0bi5pbm5lckhUTUw9ICdSZXN0YXJ0IEdhbWU/J1xuXG4gICAgY29uc3QgbWFpbmhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluSGVhZGVyJylcbiAgICBtYWluaGVhZGVyLmFwcGVuZChyZXN0YXJ0QnRuKVxuXG4gICAgcmV0dXJuIHJlc3RhcnRCdG5cbn1cblxuZnVuY3Rpb24gcmVmcmVzaFBhZ2UoKSB7XG4gICAgbG9jYXRpb24ucmVsb2FkKClcbn1cbmV4cG9ydCB7IGFwcGx5RHJhZ0Ryb3AgfSIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmRGYWN0b3J5J1xuaW1wb3J0IHsgZ2V0UmFuZG9tTnVtIH0gZnJvbSAnLi4vY29tcG9uZW50cy91dGlsaXRpZXMnXG5cbmNsYXNzIEJvdCB7XG4gICAgI3N1Y2Nlc3NmdWxBdHRhY2s7XG4gICAgI3ByZXZpb3VzQXR0YWNrO1xuICAgICNwb3NzaWJsZVNtYXJ0TW92ZXM7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IHRoaXMuI2NyZWF0ZUJvYXJkKClcbiAgICAgICAgdGhpcy4jcHJldmlvdXNBdHRhY2sgPSBudWxsXG4gICAgICAgIHRoaXMuI3N1Y2Nlc3NmdWxBdHRhY2sgPSBmYWxzZVxuICAgICAgICB0aGlzLiNwb3NzaWJsZVNtYXJ0TW92ZXMgPSBbWzAsIDFdLCBbMCwgLTFdLCBbLTEsIDBdLCBbMSwgMF1dXG4gICAgfVxuXG4gICAgI2NyZWF0ZUJvYXJkKCkge1xuICAgICAgICBjb25zdCBuZXdCb2FyZCA9IG5ldyBHYW1lYm9hcmRcbiAgICAgICAgcmV0dXJuIG5ld0JvYXJkXG4gICAgfVxuICAgIFxuICAgaXNFbXB0eVBvc2l0aW9uKHgsIHksIGVuZW15Qm9hcmQpIHtcbiAgICAgICAgY29uc29sZS5sb2coZW5lbXlCb2FyZC5nZXRNaXNzZWRBdHRhY2tzKCkpXG4gICAgICAgIGNvbnN0IG5vdEFNaXNzZWRBdHRhY2sgPSAhZW5lbXlCb2FyZC5nZXRNaXNzZWRBdHRhY2tzKCkuc29tZShhdHRhY2sgPT4gYXR0YWNrWzBdID09IHggJiYgYXR0YWNrWzFdID09IHkpXG4gICAgICAgIGNvbnN0IG5vdEFTdWNlc3NmdWxBdHRhY2sgPSAhZW5lbXlCb2FyZC5nZXRTdWNjZXNzZnVsQXR0YWNrcygpLnNvbWUoYXR0YWNrID0+IGF0dGFja1swXSA9PSB4ICYmIGF0dGFja1sxXSA9PSB5KVxuICAgICAgICBcbiAgICAgICAgaWYgKG5vdEFNaXNzZWRBdHRhY2sgJiYgbm90QVN1Y2Vzc2Z1bEF0dGFjaykgcmV0dXJuIHRydWVcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZ2V0Q29vcmRpbmF0ZXMoZW5lbXlCb2FyZCkge1xuICAgICAgICAvLyBwaWNrIGEgcmFuZG9tIHNwb3Qgd2l0aGluIHRoZSBib2FyZFxuICAgICAgICAvLyBzaG91bGQgYmUgYSB1bmlxdWUgY29vcmRpbmF0ZSBldmVyeSB0aW1lXG4gICAgICAgIC8vIGlmIHByZXZpb3VzIGNvb3JkaW5hdGUgd2FzIGEgaGl0LCBjaG9vc2UgYW4gYWRqYWNlbnQgY29vcmRpbmF0ZVxuICAgICAgICAvLyBpbXByb3ZlbWVudCAtLSBnZW5lcmF0ZSBuZXh0IGNvb3JkaW5hdGUgYmFzZWQgb24gYXZhaWxhYmxlIGVtcHR5IHNsb3RzIGluc3RlYWQgb2YgcmFuZG9tIHgveSBjb29yZHNcblxuICAgICAgICBpZiAodGhpcy4jc3VjY2Vzc2Z1bEF0dGFjaykge1xuICAgICAgICAgICAgaWYgKHRoaXMuI3Bvc3NpYmxlU21hcnRNb3Zlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zaXRpb25PZmZzZXQgPSB0aGlzLiNwb3NzaWJsZVNtYXJ0TW92ZXMucG9wKClcbiAgICAgICAgICAgICAgICBsZXQgeENvb3JkID0gdGhpcy4jcHJldmlvdXNBdHRhY2tbMF0gKyBwb3NpdGlvbk9mZnNldFswXVxuICAgICAgICAgICAgICAgIGxldCB5Q29vcmQgPSB0aGlzLiNwcmV2aW91c0F0dGFja1sxXSArIHBvc2l0aW9uT2Zmc2V0WzFdXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gW3hDb29yZCwgeUNvb3JkXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHhDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5KVxuICAgICAgICBsZXQgeUNvb3JkID0gZ2V0UmFuZG9tTnVtKDAsIDkpXG4gICAgICAgIGxldCBlbXB0eVBvc2l0aW9uID0gdGhpcy5pc0VtcHR5UG9zaXRpb24oeENvb3JkLCB5Q29vcmQsIGVuZW15Qm9hcmQpXG4gICAgICAgIGNvbnNvbGUubG9nKHhDb29yZCx5Q29vcmQsZW1wdHlQb3NpdGlvbilcblxuICAgICAgICBpZiAoZW1wdHlQb3NpdGlvbikgcmV0dXJuIFt4Q29vcmQsIHlDb29yZF0gXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvb3JkaW5hdGVzKGVuZW15Qm9hcmQpXG4gICAgfVxuXG5cbiAgICBhdHRhY2tFbmVteShjb29yZGluYXRlc0FyciwgZW5lbXlCb2FyZCkge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBbLi4uY29vcmRpbmF0ZXNBcnJdIFxuICAgICAgICBjb25zdCBhdHRhY2tGZWVkYmFjayA9IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayh4LCB5KVxuICAgICAgICBpZiAoYXR0YWNrRmVlZGJhY2sgPT09IFwiSXQncyBhIGhpdCFcIikge1xuICAgICAgICAgICAgdGhpcy4jc3RvcmVQcmV2aW91c0F0dGFjayhjb29yZGluYXRlc0FyciwgdHJ1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuI3N0b3JlUHJldmlvdXNBdHRhY2soY29vcmRpbmF0ZXNBcnIsIGZhbHNlKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdHRhY2tGZWVkYmFja1xuICAgIH1cblxuICAgIHZpZXdCb2FyZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmQuZ2V0Qm9hcmQoKVxuICAgIH1cblxuICAgICNzdG9yZVByZXZpb3VzQXR0YWNrKGNvb3JkaW5hdGVzQXJyLCBlbmVteVdhc0hpdCkge1xuICAgICAgICB0aGlzLiNwcmV2aW91c0F0dGFjayA9IGNvb3JkaW5hdGVzQXJyXG4gICAgICAgIHRoaXMuI3N1Y2Nlc3NmdWxBdHRhY2sgPSBlbmVteVdhc0hpdFxuICAgIH1cblxuICAgIHBvc2l0aW9uQWxsU2hpcHMoKSB7XG4gICAgICAgIGNvbnN0IGFsbFNoaXBzID0gdGhpcy5ib2FyZC5nZXRBbGxTaGlwcygpXG4gICAgICAgIGFsbFNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdDb29yZGluYXRlc0FyciA9IHRoaXMuI2dlbmVyYXRlQ29vcmRpbmF0ZXMoc2hpcClcbiAgICAgICAgICAgIG5ld0Nvb3JkaW5hdGVzQXJyLmZvckVhY2goY29vcmQgPT4gdGhpcy5ib2FyZC5wb3NpdGlvblNoaXAoY29vcmRbMF0sIGNvb3JkWzFdLCBzaGlwLm5hbWUpKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgICNnZW5lcmF0ZUNvb3JkaW5hdGVzKHNoaXApIHtcbiAgICAgICAgY29uc3QgY29vcmRpbmF0ZXNBcnIgPSBbXVxuICAgICAgICBjb25zdCBpc1JvdGF0ZWQgPSBnZXRSYW5kb21OdW0oMCwgMSkgLy8gMCA9PSBmYWxzZSwgMSA9PSB0cnVlXG4gICAgICAgICAgICBcbiAgICAgICAgLy8gaW5pdGlhdGUgdmFyaWFibGVzXG4gICAgICAgIGxldCB4Q29vcmQgPSAwO1xuICAgICAgICBsZXQgeUNvb3JkID0gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBnZW5lcmF0ZSBzdGFydGluZyBjb29yZGluYXRlc1xuICAgICAgICBpZiAoaXNSb3RhdGVkID09IDEpIHtcbiAgICAgICAgICAgIHhDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5IC0gc2hpcC5sZW5ndGgpIC8vIGV4YW1wbGUsIGlmIHNoaXBMZW5ndGg9NSwgdGhlbiBjaG9vc2UgMC01IHgtY29vcmRpbmF0ZXNcbiAgICAgICAgICAgIHlDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5KVxuXG4gICAgICAgICAgICBjb29yZGluYXRlc0Fyci5wdXNoKFt4Q29vcmQsIHlDb29yZF0pXG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxIDsgaSA8IHNoaXAubGVuZ3RoIDsgaSsrICkge1xuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzQXJyLnB1c2goW3hDb29yZCArIGksIHlDb29yZF0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHsgLy8gb3RoZXJ3aXNlLCBob3Jpem9udGFsXG4gICAgICAgICAgICB4Q29vcmQgPSBnZXRSYW5kb21OdW0oMCwgOSlcbiAgICAgICAgICAgIHlDb29yZCA9IGdldFJhbmRvbU51bSgwLCA5IC0gc2hpcC5sZW5ndGgpXG5cbiAgICAgICAgICAgIGNvb3JkaW5hdGVzQXJyLnB1c2goW3hDb29yZCwgeUNvb3JkXSlcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDEgOyBpIDwgc2hpcC5sZW5ndGggOyBpKysgKSB7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXNBcnIucHVzaChbeENvb3JkLCB5Q29vcmQgKyBpXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIGNvb3JkaW5hdGVzIGFyZSBvY2N1cGllZFxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gY29vcmRpbmF0ZXNBcnIuZXZlcnkoY29vcmQgPT4gdGhpcy52aWV3Qm9hcmQoKVtjb29yZFswXV1bY29vcmRbMV1dID09PSBudWxsKVxuXG4gICAgICAgIC8vIHJldHVybiBpZiB2YWxpZCBjb29yZGluYXRlcywgb3RoZXJ3aXNlIGZpbmQgbmV3IG9uZXNcbiAgICAgICAgaWYgKGlzVmFsaWQpIHJldHVybiBjb29yZGluYXRlc0FyclxuICAgICAgICBlbHNlIHsgcmV0dXJuIHRoaXMuI2dlbmVyYXRlQ29vcmRpbmF0ZXMoc2hpcCkgfVxuXG4gICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQm90XG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXBGYWN0b3J5J1xuXG5jbGFzcyBHYW1lYm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhcnJpZXIgPSB0aGlzLiNjcmVhdGVTaGlwKCdjYXJyaWVyJywgNSlcbiAgICAgICAgdGhpcy5iYXR0bGVzaGlwID0gdGhpcy4jY3JlYXRlU2hpcCgnYmF0dGxlc2hpcCcsIDQpXG4gICAgICAgIHRoaXMuY3J1aXNlciA9IHRoaXMuI2NyZWF0ZVNoaXAoJ2NydWlzZXInLCAzKVxuICAgICAgICB0aGlzLnN1Ym1hcmluZSA9IHRoaXMuI2NyZWF0ZVNoaXAoJ3N1Ym1hcmluZScsIDMpXG4gICAgICAgIHRoaXMuZGVzdHJveWVyID0gdGhpcy4jY3JlYXRlU2hpcCgnZGVzdHJveWVyJywgMilcbiAgICAgICAgdGhpcy5ib2FyZCA9IHRoaXMuI2NyZWF0ZUJvYXJkKClcbiAgICAgICAgdGhpcy5taXNzZWRBdHRhY2tzID0gW11cbiAgICAgICAgdGhpcy5zdWNjZXNzZnVsQXR0YWNrcyA9IFtdXG4gICAgICAgIHRoaXMubnVtT2ZTaGlwc1JlYWR5ID0gMDtcbiAgICB9XG5cbiAgICAjY3JlYXRlQm9hcmQoKSB7XG4gICAgICAgIGxldCBib2FyZCA9IFtdXG4gICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8PSA5IDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcm93ID0gW11cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8PSA5IDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcm93LnB1c2gobnVsbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvYXJkLnB1c2gocm93KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib2FyZFxuICAgIH1cbiAgICBcblxuICAgICNjcmVhdGVTaGlwKG5hbWUsIGxlbmd0aCkge1xuICAgICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAobmFtZSwgbGVuZ3RoKVxuICAgICAgICByZXR1cm4gc2hpcFxuICAgIH1cblxuICAgIGdldEFsbFNoaXBzKCkge1xuICAgICAgICBjb25zdCBzaGlwcyA9IFtcbiAgICAgICAgICAgIHRoaXMuY2FycmllciwgXG4gICAgICAgICAgICB0aGlzLmJhdHRsZXNoaXAsIFxuICAgICAgICAgICAgdGhpcy5jcnVpc2VyLCBcbiAgICAgICAgICAgIHRoaXMuc3VibWFyaW5lLCBcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveWVyXG4gICAgICAgIF1cbiAgICAgICAgcmV0dXJuIHNoaXBzXG4gICAgfVxuXG4gICAgcG9zaXRpb25TaGlwKHgsIHksIHNoaXBOYW1lKSB7IC8vIHBvc2l0aW9uIHNoaXAgYXQgeCx5IGNvb3JkaW5hdGVzXG4gICAgICAgIHRoaXMudXBkYXRlQm9hcmRBcnJheShOdW1iZXIoeCksIE51bWJlcih5KSwgc2hpcE5hbWUpXG4gICAgfVxuXG5cbiAgICB1cGRhdGVCb2FyZEFycmF5KHgsIHksIHNoaXBOYW1lKSB7XG4gICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwTmFtZVxuICAgIH0gIFxuXG4gICAgZ2V0Qm9hcmQoKSB7XG4gICAgICAgIGNvbnN0IGJvYXJkQ29weSA9IFsuLi50aGlzLmJvYXJkXVxuICAgICAgICByZXR1cm4gYm9hcmRDb3B5XG4gICAgfVxuXG4gICAgZ2V0TWlzc2VkQXR0YWNrcygpIHtcbiAgICAgICAgY29uc3QgbWlzc2VkQXR0YWNrQXJyQ29weSA9IFsuLi50aGlzLm1pc3NlZEF0dGFja3NdXG4gICAgICAgIHJldHVybiBtaXNzZWRBdHRhY2tBcnJDb3B5XG4gICAgfVxuXG4gICAgZ2V0U3VjY2Vzc2Z1bEF0dGFja3MoKSB7XG4gICAgICAgIGNvbnN0IHN1Y2Nlc3NmdWxBdHRhY2tBcnJDb3B5ID0gWy4uLnRoaXMuc3VjY2Vzc2Z1bEF0dGFja3NdXG4gICAgICAgIHJldHVybiBzdWNjZXNzZnVsQXR0YWNrQXJyQ29weVxuICAgIH1cblxuICAgICNzdG9yZU1pc3NlZEF0dGFjayh4LCB5KSB7XG4gICAgICAgIHRoaXMubWlzc2VkQXR0YWNrcy5wdXNoKFt4LHldKVxuICAgIH1cblxuICAgICNzdG9yZVN1Y2Nlc3NmdWxBdHRhY2soeCwgeSkge1xuICAgICAgICB0aGlzLnN1Y2Nlc3NmdWxBdHRhY2tzLnB1c2goW3gsIHldKVxuICAgIH1cblxuICAgICNpc1ZhbGlkQXR0YWNrKHgsIHkpIHtcbiAgICAgICAgLy8gYWxsIHNob3VsZCBiZSB0cnVlXG4gICAgICAgIGNvbnN0IHVuaXF1ZU1pc3NlZEF0dGFjayA9ICF0aGlzLmdldE1pc3NlZEF0dGFja3MoKS5pbmNsdWRlcyhbeCwgeV0pXG4gICAgICAgIGNvbnN0IHVuaXF1ZVN1Y2Nlc3NmdWxBdHRhY2sgPSAhdGhpcy5nZXRTdWNjZXNzZnVsQXR0YWNrcygpLmluY2x1ZGVzKFt4LCB5XSkgXG4gICAgICAgIGNvbnN0IHZhbGlkQ29vcmRpbmF0ZXMgPSAoeCA+PSAwICYmIHggPD0gOSkgJiYgKHkgPj0gMCAmJiB5IDw9IDkpXG5cbiAgICAgICAgcmV0dXJuIHVuaXF1ZU1pc3NlZEF0dGFjayAmJiB1bmlxdWVTdWNjZXNzZnVsQXR0YWNrICYmIHZhbGlkQ29vcmRpbmF0ZXNcbiAgICB9XG5cbiAgICByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYSBzaGlwIGF0IFt4LCB5XSBjb29yZGluYXRlc1xuICAgICAgICAvLyBpZiB5ZXMsIGFwcGx5IGRhbWFnZSB0byB0aGlzLnNoaXAgJiByZWNvcmQgc3VjY2Vzc2Z1bCBhdHRhY2tcbiAgICAgICAgLy8gaWYgbm90LCByZWNvcmQgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBtaXNzZWQgYXR0YWNrXG5cbiAgICAgICAgaWYgKHRoaXMuI2lzVmFsaWRBdHRhY2soeCwgeSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGJvYXJkID0gdGhpcy5nZXRCb2FyZCgpXG4gICAgICAgICAgICBjb25zdCBzaGlwcyA9IHtcbiAgICAgICAgICAgICAgICAnY2Fycmllcic6IHRoaXMuY2FycmllciwgXG4gICAgICAgICAgICAgICAgJ2JhdHRsZXNoaXAnOiB0aGlzLmJhdHRsZXNoaXAsIFxuICAgICAgICAgICAgICAgICdjcnVpc2VyJzogdGhpcy5jcnVpc2VyLCBcbiAgICAgICAgICAgICAgICAnc3VibWFyaW5lJzogdGhpcy5zdWJtYXJpbmUsIFxuICAgICAgICAgICAgICAgICdkZXN0cm95ZXInOiB0aGlzLmRlc3Ryb3llclxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYm9hcmRbeF1beV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzaGlwc1tib2FyZFt4XVt5XV0uaGl0KClcbiAgICAgICAgICAgICAgICB0aGlzLiNzdG9yZVN1Y2Nlc3NmdWxBdHRhY2soeCwgeSlcbiAgICAgICAgICAgICAgICBjb25zdCBpc1N1bmsgPSBzaGlwc1tib2FyZFt4XVt5XV0uY2hlY2tJZlN1bmsoKVxuICAgICAgICAgICAgICAgIHJldHVybiBbXCJJdCdzIGEgaGl0IVwiLCBpc1N1bmssIHNoaXBzW2JvYXJkW3hdW3ldXS5uYW1lXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiNzdG9yZU1pc3NlZEF0dGFjayh4LCB5KVxuICAgICAgICAgICAgICAgIHJldHVybiBbXCJJdCdzIGEgbWlzcyFcIiwgZmFsc2UsIHVuZGVmaW5lZF1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgcmV0dXJuICdJbnZhbGlkIGF0dGFjaydcbiAgICB9XG5cbiAgICBhcmVBbGxTaGlwc1N1bmsoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldFN1Y2Nlc3NmdWxBdHRhY2tzKCkubGVuZ3RoID49IDE3KSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwcyA9IHRoaXMuZ2V0QWxsU2hpcHMoKVxuICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLnN1bmsgPT09IHRydWUpXG5cbiAgICAgICAgICAgIGlmIChzdGF0dXMpIGNvbnNvbGUubG9nKCdBbGwgc2hpcHMgaGF2ZSBzdW5rISEhJylcblxuICAgICAgICAgICAgcmV0dXJuIHN0YXR1c1xuICAgICAgICAgICAgXG4gICAgICAgIH0gcmV0dXJuIGZhbHNlXG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZCIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmRGYWN0b3J5J1xuXG5jbGFzcyBQbGF5ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gdGhpcy4jY3JlYXRlQm9hcmQoKVxuICAgIH1cblxuICAgICNjcmVhdGVCb2FyZCgpIHtcbiAgICAgICAgY29uc3QgbmV3Qm9hcmQgPSBuZXcgR2FtZWJvYXJkXG4gICAgICAgIHJldHVybiBuZXdCb2FyZFxuICAgIH1cblxuICAgIGF0dGFja0VuZW15KGNvb3JkaW5hdGVzQXJyLCBlbmVteUJvYXJkKSB7XG4gICAgICAgIGNvbnN0IFt4LCB5XSA9IFsuLi5jb29yZGluYXRlc0Fycl0gXG4gICAgICAgIGNvbnN0IGF0dGFja0ZlZWRiYWNrID0gZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHgsIHkpXG4gICAgICAgIHJldHVybiBhdHRhY2tGZWVkYmFja1xuICAgIH1cblxuICAgIHZpZXdCb2FyZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmQuZ2V0Qm9hcmQoKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyIiwiY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgbGVuZ3RoKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWUsXG4gICAgICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICB0aGlzLmRhbWFnZSA9IDA7XG4gICAgICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgIH1cblxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5kYW1hZ2UgPSB0aGlzLmRhbWFnZSArIDFcbiAgICAgICAgdGhpcy4jaXNTdW5rKClcbiAgICB9XG5cbiAgICBjaGVja0lmU3VuaygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vua1xuICAgIH1cblxuICAgICNzZXRTaGlwQXNTdW5rKCkge1xuICAgICAgICB0aGlzLnN1bmsgPSB0cnVlXG4gICAgfVxuXG4gICAgI2lzU3VuaygpIHtcbiAgICAgICAgaWYgKHRoaXMuZGFtYWdlID09PSB0aGlzLmxlbmd0aCkgdGhpcy4jc2V0U2hpcEFzU3VuaygpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwIiwiaW1wb3J0IHsgYXBwbHlEcmFnRHJvcCB9IGZyb20gXCIuL2V2ZW50TGlzdGVuZXJzXCJcbmltcG9ydCB7IGNyZWF0ZVBsYXllckJvYXJkVUkgfSBmcm9tIFwiLi9jb21wb25lbnRzL2dhbWVib2FyZFVJXCJcbmltcG9ydCB7IHNpbXVsYXRlRHJhZ0Ryb3AsIHNpbXVsYXRlQmVnaW5CYXR0bGUgfSBmcm9tIFwiLi9jb21wb25lbnRzL3V0aWxpdGllc1wiXG5pbXBvcnQgQm90IGZyb20gXCIuL2ZhY3Rvcmllcy9ib3RGYWN0b3J5XCJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vZmFjdG9yaWVzL3BsYXllckZhY3RvcnlcIlxuXG4vLyBjcmVhdGUgcGxheWVyIG9iamVjdFxuZnVuY3Rpb24gY3JlYXRlUGxheWVyKCkge1xuICAgIGNvbnN0IHAxID0gbmV3IFBsYXllclxuICAgIGNvbnNvbGUubG9nKHAxLnZpZXdCb2FyZCgpKVxuICAgIHJldHVybiBwMVxufVxuXG4vLyBjcmVhdGUgYm90IG9iamVjdFxuZnVuY3Rpb24gY3JlYXRlQm90KCkge1xuICAgIGNvbnN0IGJvdCA9IG5ldyBCb3RcbiAgICBib3QucG9zaXRpb25BbGxTaGlwcygpXG4gICAgY29uc29sZS5sb2coYm90LnZpZXdCb2FyZCgpKVxuICAgIHJldHVybiBib3Rcbn1cblxuLy8gY3JlYXRlIHBsYXllciBvYmplY3QgJiBnYW1lYm9hcmRcbmNyZWF0ZVBsYXllckJvYXJkVUkoKVxuY29uc3QgcDEgPSBjcmVhdGVQbGF5ZXIoKVxuXG5cbi8vIGFjdGl2YXRlIGV2ZW50IGxpc3RlbmVyc1xuYXBwbHlEcmFnRHJvcChwMS5ib2FyZClcblxuXG4vLyAvLyBpbnRybyBzaW11bGF0aW9uIGZvciB0ZXN0aW5nXG4vLyBzaW11bGF0ZURyYWdEcm9wKClcbi8vIHNpbXVsYXRlQmVnaW5CYXR0bGUoKVxuXG5leHBvcnQgeyBjcmVhdGVCb3QsIHAxIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9