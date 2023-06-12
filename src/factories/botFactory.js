import Gameboard from './gameboardFactory'

class Bot {
    constructor() {
        this.board = this.#getBoard()
        
    }

    #getBoard() {
        const newBoard = new Gameboard
        return newBoard
    }

    attack() {
        // pick a random spot within the board
        // should be a unique coordinate every time
        // if previous coordinate was a hit, choose a coordinate +- x , +- y
        return [0, 1]
    }

    placeShip() {
        
    }
}

export default Bot