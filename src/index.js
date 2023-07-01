import { applyDragDrop, createPlayerBoardUI } from "./eventListeners"
import Bot from "./factories/botFactory"
import Player from "./factories/playerFactory"

// create player gameboard
createPlayerBoardUI()

// create player and bot objects
const p1 = new Player
const bot = new Bot
console.log(p1.viewBoard())
console.log(bot.viewBoard())


// activate event listeners
applyDragDrop(p1.board)



export default p1

