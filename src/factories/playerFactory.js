import Gameboard from './gameboardFactory'

class Player {
    constructor() {
        this.board = this.#getBoard()
    }

    #getBoard() {
        const newBoard = new Gameboard
        return newBoard
    }
}

export default Player