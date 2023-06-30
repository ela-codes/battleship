import createBoardComponent from "./components/gameboardUI"
import { applyDragDrop } from "./eventListeners"
import Bot from "./factories/botFactory"
import Player from "./factories/playerFactory"

// gameboard UI
const pBoard = document.querySelector('.pBoard')
createBoardComponent(pBoard)

// create player and bot gameboard
const p1 = new Player
const bot = new Bot
console.log(p1.viewBoard())
console.log(bot.viewBoard())


// activate event listeners
applyDragDrop(p1.board)



export default p1

