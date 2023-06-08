import Ship from './shipFactory.js'

class Gameboard {
    constructor() {
        this.carrier = this.#createShip('carrier', 5)
        this.battleship = this.#createShip('battleship', 4)
        this.cruiser = this.#createShip('cruiser', 3)
        this.submarine = this.#createShip('submarine', 3)
        this.destroyer = this.#createShip('destroyer', 2)
        this.board = this.#positionShips(this.#createBoard())
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

        const ships = [
            this.carrier, 
            this.battleship, 
            this.cruiser, 
            this.submarine, 
            this.destroyer
        ]

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
}

export default Gameboard