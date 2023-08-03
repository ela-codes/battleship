import Gameboard from './gameboardFactory'
import { getRandomNum } from '../components/utilities'

class Bot {
    #successfulAttack;
    #previousAttack;
    #possibleSmartMoves;

    constructor() {
        this.board = this.#createBoard()
        this.#previousAttack = null
        this.#successfulAttack = false
        this.#possibleSmartMoves = [[0, 1], [0, -1], [-1, 0], [1, 0]]
    }

    #createBoard() {
        const newBoard = new Gameboard
        return newBoard
    }
    
   isEmptyPosition(x, y, enemyBoard) {
        console.log(enemyBoard.getMissedAttacks())
        const notAMissedAttack = !enemyBoard.getMissedAttacks().some(attack => attack[0] == x && attack[1] == y)
        const notASucessfulAttack = !enemyBoard.getSuccessfulAttacks().some(attack => attack[0] == x && attack[1] == y)
        
        if (notAMissedAttack && notASucessfulAttack) return true
        return false
    }

    getCoordinates(enemyBoard) {
        // pick a random spot within the board
        // should be a unique coordinate every time
        // if previous coordinate was a hit, choose an adjacent coordinate
        // improvement -- generate next coordinate based on available empty slots instead of random x/y coords

        if (this.#successfulAttack) {
            if (this.#possibleSmartMoves.length > 0) {
                const positionOffset = this.#possibleSmartMoves.pop()
                let xCoord = this.#previousAttack[0] + positionOffset[0]
                let yCoord = this.#previousAttack[1] + positionOffset[1]

                return [xCoord, yCoord]
            }
        }

        let xCoord = getRandomNum(0, 9)
        let yCoord = getRandomNum(0, 9)
        let emptyPosition = this.isEmptyPosition(xCoord, yCoord, enemyBoard)
        console.log(xCoord,yCoord,emptyPosition)

        if (emptyPosition) return [xCoord, yCoord] 
        return this.getCoordinates(enemyBoard)
    }


    attackEnemy(coordinatesArr, enemyBoard) {
        const [x, y] = [...coordinatesArr] 
        const attackFeedback = enemyBoard.receiveAttack(x, y)
        if (attackFeedback === "It's a hit!") {
            this.#storePreviousAttack(coordinatesArr, true)
        } else {
            this.#storePreviousAttack(coordinatesArr, false)
        }
        return attackFeedback
    }

    viewBoard() {
        return this.board.getBoard()
    }

    #storePreviousAttack(coordinatesArr, enemyWasHit) {
        this.#previousAttack = coordinatesArr
        this.#successfulAttack = enemyWasHit
    }

    positionAllShips() {
        const allShips = this.board.getAllShips()
        allShips.forEach(ship => {
            const newCoordinatesArr = this.#generateCoordinates(ship)
            newCoordinatesArr.forEach(coord => this.board.positionShip(coord[0], coord[1], ship.name))
        })
    }

    #generateCoordinates(ship) {
        const coordinatesArr = []
        const isRotated = getRandomNum(0, 1) // 0 == false, 1 == true
            
        // initiate variables
        let xCoord = 0;
        let yCoord = 0;
            
        // generate starting coordinates
        if (isRotated == 1) {
            xCoord = getRandomNum(0, 9 - ship.length) // example, if shipLength=5, then choose 0-5 x-coordinates
            yCoord = getRandomNum(0, 9)

            coordinatesArr.push([xCoord, yCoord])

            for (let i = 1 ; i < ship.length ; i++ ) {
                coordinatesArr.push([xCoord + i, yCoord])
            }

        } else { // otherwise, horizontal
            xCoord = getRandomNum(0, 9)
            yCoord = getRandomNum(0, 9 - ship.length)

            coordinatesArr.push([xCoord, yCoord])

            for (let i = 1 ; i < ship.length ; i++ ) {
                coordinatesArr.push([xCoord, yCoord + i])
            }
        }

        // check if coordinates are occupied
        const isValid = coordinatesArr.every(coord => this.viewBoard()[coord[0]][coord[1]] === null)

        // return if valid coordinates, otherwise find new ones
        if (isValid) return coordinatesArr
        else { return this.#generateCoordinates(ship) }

        
    }
}

export default Bot
