import Ship from './shipFactory'

class Gameboard {
    constructor() {
        this.carrier = this.#createShip('carrier', 5)
        this.battleship = this.#createShip('battleship', 4)
        this.cruiser = this.#createShip('cruiser', 3)
        this.submarine = this.#createShip('submarine', 3)
        this.destroyer = this.#createShip('destroyer', 2)
        this.board = this.#positionShips(this.#createBoard())
        this.missedAttacks = []
        this.successfulAttacks = []
    }

    #createBoard() {
        let board = []
        for (let i = 0 ; i <= 9 ; i++) {
            let row = []
            for (let i = 0 ; i <= 9 ; i++) {
                row.push(null)
            }
            board.push(row)
        }
        return board
    }
    

    #createShip(name, length) {
        const ship = new Ship(name, length)
        return ship
    }

    #getAllShips() {
        const ships = [
            this.carrier, 
            this.battleship, 
            this.cruiser, 
            this.submarine, 
            this.destroyer
        ]
        return ships
    }

    #positionShips(gameboard) {
        const board = gameboard

        function placeOnBoard(position, ship, board) {
            let [x, y, direction] = [...position]
            let shipLength = ship.length

            while (shipLength > 0) {
                updateBoardArray(x, y, ship.name, board)
                shipLength--

                switch (direction) {
                    case ('north'):
                        x--
                        break;
                    case ('south'):
                        x++
                        break;
                    case ('east'):
                        y++
                        break;
                    case ('west'):
                        y--
                        break;
                }
            }
        }

        function updateBoardArray(x, y, shipName, board) {
            board[x][y] = shipName
        }

        
        const ships = this.#getAllShips()

        for (let ship of ships) {
            const position = this.#getPositioning(ship.name)
            placeOnBoard(position, ship, board)
        }
        return board
    }


    #getPositioning(shipName) {
        switch(shipName) {
            case "carrier":
                return [8, 3, 'north']
            case "battleship":
                return [9, 5, 'west']
            case "cruiser":
                return [0, 4, 'south']
            case "submarine":
                return [1, 8, 'west']
            case "destroyer":
                return [0, 0, 'east']
        }
    }

    getBoard() {
        const boardCopy = [...this.board]
        return boardCopy
    }

    getMissedAttacks() {
        const missedAttackArrCopy = [...this.missedAttacks]
        return missedAttackArrCopy
    }

    getSuccessfulAttacks() {
        const successfulAttackArrCopy = [...this.successfulAttacks]
        return successfulAttackArrCopy
    }

    #storeMissedAttack(x, y) {
        this.missedAttacks.push([x,y])
    }

    #storeSuccessfulAttack(x, y) {
        this.successfulAttacks.push([x, y])
    }

    #isValidAttack(x, y) {
        // all should be true
        const uniqueMissedAttack = !this.getMissedAttacks().includes([x, y])
        const uniqueSuccessfulAttack = !this.getSuccessfulAttacks().includes([x, y]) 
        const validCoordinates = (x >= 0 && x <= 9) && (y >= 0 && y <= 9)

        return uniqueMissedAttack && uniqueSuccessfulAttack && validCoordinates
    }

    receiveAttack(x, y) {
        // check if there is a ship at [x, y] coordinates
        // if yes, apply damage to this.ship & record successful attack
        // if not, record the coordinates of the missed attack

        if (this.#isValidAttack(x, y)) {
            const board = this.getBoard()
            const ships = {
                'carrier': this.carrier, 
                'battleship': this.battleship, 
                'cruiser': this.cruiser, 
                'submarine': this.submarine, 
                'destroyer': this.destroyer
            }

            if (board[x][y] !== null) {
                ships[board[x][y]].hit()
                this.#storeSuccessfulAttack(x, y)
                return "It's a hit!"
            } else {
                this.#storeMissedAttack(x, y)
                return "It's a miss!"
            }

        } else return 'Invalid attack'
    }

    areAllShipsSunk() {
        if (this.getSuccessfulAttacks().length >= 17) {
            const ships = this.#getAllShips()
            const status = ships.every(ship => ship.sunk === true)

            if (status) console.log('All ships have sunk!!!')

            return status
            
        } return false

    }
}

export default Gameboard