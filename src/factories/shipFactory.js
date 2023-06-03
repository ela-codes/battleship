class Ship {
    constructor(length) {
        this.length = length;
        this.damage = 0;
        this.sunk = false;
    }

    hit() {
        this.damage = this.damage + 1
        this.isSunk()
    }

    setShipAsSunk() {
        this.sunk = true
    }

    isSunk() {
        if (this.damage === this.length) this.setShipAsSunk()
    }
}

export default Ship