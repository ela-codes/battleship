import Ship from './shipFactory'

class Gameboard {
    constructor() {
        this.carrier = this.#createShip(5)
        this.battleship = this.#createShip(4)
        this.cruiser = this.#createShip(3)
        this.submarine = this.#createShip(3)
        this.destroyer = this.#createShip(2)
    }


    #createShip(length) {
        const ship = new Ship(length)
        return ship
    }
}


export default Gameboard