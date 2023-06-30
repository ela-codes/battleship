import createBoardComponent from "./components/gameboardUI"
import { applyDragDrop, allowRotate } from "./eventListeners"
import Bot from "./factories/botFactory"
import Player from "./factories/playerFactory"

// gameboard UI
const pBoard = document.querySelector('.pBoard')
createBoardComponent(pBoard)

// create player and bot gameboard
const p1 = new Player
const bot = new Bot
console.log(p1.viewBoard())


// activate event listeners
applyDragDrop(p1.board)
allowRotate()


export default p1

