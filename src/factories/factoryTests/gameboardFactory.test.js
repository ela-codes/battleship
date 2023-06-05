import Gameboard from '../gameboardFactory' 
import Ship from '../shipFactory'

const correctGameboard = {
    carrier: new Ship(5),
    battleship: new Ship(4),
    cruiser: new Ship(3),
    submarine: new Ship(3),
    destroyer: new Ship(2)
}

test('correctly creates a gameboard obj', () => {
    expect(new Gameboard).toEqual(correctGameboard)
})