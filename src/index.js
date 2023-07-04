import { applyDragDrop, allowPlayerToAttack } from "./eventListeners"
import { createPlayerBoardUI } from "./components/gameboardUI"
import { simulateDragDrop } from "./components/utilities"
import Bot from "./factories/botFactory"
import Player from "./factories/playerFactory"

// create player gameboard
createPlayerBoardUI()

// create player object
const p1 = new Player

// activate event listeners
applyDragDrop(p1.board)
simulateDragDrop()

// start game
function createBot() {
    const bot = new Bot
    bot.positionAllShips()
    console.log(bot.viewBoard())

    allowPlayerToAttack()
}


export default createBot