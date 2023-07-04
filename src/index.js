import applyDragDrop from "./eventListeners"
import { createBoardComponent, buildMainScreen, createPlayerBoardUI } from "./components/gameboardUI"
import Bot from "./factories/botFactory"
import Player from "./factories/playerFactory"

// create player gameboard
createPlayerBoardUI()

// create player object
const p1 = new Player

// activate event listeners
applyDragDrop(p1.board)



// start game
function startGame() {
    const bot = new Bot
    bot.positionAllShips()
    console.log(bot.viewBoard())
}


export default startGame