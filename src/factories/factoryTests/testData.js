import Ship from '../shipFactory'

export const correctGameboard = {
    carrier: new Ship('carrier', 5),
    battleship: new Ship('battleship', 4),
    cruiser: new Ship('cruiser', 3),
    submarine: new Ship('submarine', 3),
    destroyer: new Ship('destroyer', 2),
    board: [
        ["destroyer", "destroyer", null, null, "cruiser", null, null, null, null, null],
        [null, null, null, null, "cruiser", null, "submarine", "submarine", "submarine", null],
        [null, null, null, null, "cruiser", null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, "carrier", null, null, null, null, null, null],
        [null, null, null, "carrier", null, null, null, null, null, null],
        [null, null, null, "carrier", null, null, null, null, null, null],
        [null, null, null, "carrier", null, null, null, null, null, null],
        [null, null, null, "carrier", null, null, null, null, null, null],
        [null, null, "battleship", "battleship", "battleship", "battleship", null, null, null, null]
    ],
    missedAttacks: [],
    successfulAttacks: []
}