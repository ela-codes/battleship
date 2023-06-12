import Gameboard from './gameboardFactory'

class Bot {
    constructor() {
        this.board = this.#createBoard()
    }

    #createBoard() {
        const newBoard = new Gameboard
        return newBoard
    }

    getBotBoard() {
        return this.board.getBoard()
    }

    attackEnemy(enemyBoard) {
        // pick a random spot within the board
        // should be a unique coordinate every time
        // if previous coordinate was a hit, choose a coordinate +-1 x , +-1 y (TO DO)

        function getRandomNum(min, max) {
            const num = Math.random() * (max - min) + min;
            return Math.floor(num)
        }

        function generateCoordinates() {
            const xCoord = getRandomNum(0, 9)
            const yCoord = getRandomNum(0, 9)
            return [xCoord, yCoord]
        }

        function isEmptyPosition(position, enemyBoard) {
            let [x, y] = [...position]
            return enemyBoard[x][y] === null
        }

        let attackCoord = generateCoordinates()

        while (!isEmptyPosition(attackCoord, enemyBoard)) {
            attackCoord = generateCoordinates()
        }

        return attackCoord
    }

}

export default Bot