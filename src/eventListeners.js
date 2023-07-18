import { buildMainScreen } from "./components/gameboardUI"
import { createBot, p1 } from './index'
import { capitalize } from './components/utilities'
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
        buildMainScreen()
        const bot = createBot()
        // start with player's turn
        updateGameNotification("It's your turn!")
        allowPlayerAttack(p1, bot)
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
                    updateGameNotification(`${capitalize(shipName)} has sunk!`)
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

export { applyDragDrop }