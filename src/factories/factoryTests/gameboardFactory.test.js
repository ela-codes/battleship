import Gameboard from '../gameboardFactory' 
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


describe('gameboard creation', () => {
    const battleshipGame = new Gameboard;
    test('correctly creates a gameboard obj with ships positioned', () => {
        expect(battleshipGame).toEqual(correctGameboard)
    })
    
})

describe('gameboard activities', () => {
    const battleshipGame = new Gameboard;
    const attack = battleshipGame.receiveAttack(0,1)

    test('attack causes damage to ship', () => {
        expect(battleshipGame.destroyer.damage).toBe(1)
    })

    test('successful attack outputs correct notification', () => {
        expect(attack).toBe("It's a hit!")
    })


    const correctMissedAttacks = [[9,9], [8,7]]
    const attack1 = battleshipGame.receiveAttack(9, 9)
    const attack2 = battleshipGame.receiveAttack(8, 7)

    test('stores missed attacks', () => {
        expect(battleshipGame.missedAttacks).toEqual(correctMissedAttacks)
    })

    test('missed attack outputs correct notifications', () => {
        expect(attack2).toBe("It's a miss!")
    })

    const attack3 = battleshipGame.receiveAttack(0, 10)
    test('recognizes invalid attack coordinates', () => {
        expect(attack3).toBe('Invalid attack')
    })

    const attack4 = battleshipGame.receiveAttack(0, 10)
    test('recognizes attack coordinates that were used previously', () => {
        expect(attack4).toBe('Invalid attack')
    })

    test('not all ships have sunk', () => {
        expect(battleshipGame.areAllShipsSunk()).toBe(false)
    })
})


describe('sink all ships on board', () => {
    const battleshipGame = new Gameboard;

    function getAllValidAttacks() {
        const allAttacks = []
        for (let i = 0; i <= 9; i++) {
            for (let j = 0; j <= 9; j++) {
                if (correctGameboard.board[i][j] !== null) {
                    allAttacks.push([i,j])
                }
            }
        } return allAttacks
    }

    const allAttacks = getAllValidAttacks()

    for (let i of allAttacks) {
        battleshipGame.receiveAttack(i[0], i[1])
    }

    test('all ships have sunk', () => {
        expect(battleshipGame.areAllShipsSunk()).toBe(true)
    })
})

