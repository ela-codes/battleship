import Gameboard from './gameboardFactory'

class Bot {
    constructor() {
        this.board = this.#createBoard()
    }

    #createBoard() {
        const newBoard = new Gameboard
        return newBoard
    }
    
    getCoordinates(enemyGameboard) {
        // pick a random spot within the board
        // should be a unique coordinate every time
        // if previous coordinate was a hit, choose a coordinate +-1 x , +-1 y (TO DO)
        function getRandomNum(min, max) {
            const num = Math.random() * (max - min) + min;
            return Math.floor(num)
        }

        function isEmptyPosition(x, y, enemyBoard) {
            return enemyBoard[x][y] === null
        }

        let xCoord = getRandomNum(0, 9)
        let yCoord = getRandomNum(0, 9)

        while (!isEmptyPosition(xCoord, yCoord, enemyGameboard.getBoard())) {
            xCoord = getRandomNum(0, 9)
            yCoord = getRandomNum(0, 9)
        }
        
        return [xCoord, yCoord]
    }


    attackEnemy(coordinatesArr, enemyBoard) {
        const [x, y] = [...coordinatesArr] 
        const attackFeedback = enemyBoard.receiveAttack(x, y)
        return attackFeedback
    }

}

export default Bot