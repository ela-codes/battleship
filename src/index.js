import { applyDragDrop } from "./eventListeners"
import { createPlayerBoardUI } from "./components/gameboardUI"
import { simulateDragDrop, simulateBeginBattle } from "./components/utilities"
import Bot from "./factories/botFactory"
import Player from "./factories/playerFactory"

// create player object
function createPlayer() {
    const p1 = new Player
    console.log(p1.viewBoard())
    return p1
}

// create bot object
function createBot() {
    const bot = new Bot
    bot.positionAllShips()
    console.log(bot.viewBoard())
    return bot
}

// create player object & gameboard
createPlayerBoardUI()
const p1 = createPlayer()


// activate event listeners
applyDragDrop(p1.board)


// // intro simulation for testing
// simulateDragDrop()
// simulateBeginBattle()

export { createBot, p1 }