import Bot from '../botFactory'
import Player from '../playerFactory'
import { correctGameboard } from './testData'

const jarvis = new Bot
const player = new Player

const correctPlayer = {
    "board": correctGameboard
}

test('creates a bot object', () => {
    expect(jarvis).toEqual(correctPlayer)
})

test('bot generates random valid attack coordinate', () => {
    const attack = jarvis.getCoordinates(player.board) 
    expect(attack[0] && attack[1]).toBeLessThanOrEqual(9)
    expect(attack[0] && attack[1]).toBeGreaterThanOrEqual(0)
})

test('bot makes a successful attack', () => {
    const coords = jarvis.getCoordinates(player.board) 
    const attack1 = jarvis.attackEnemy(coords, player.board)
    expect(attack1).toEqual(expect.stringContaining("It's a"))
})

test('bot attacks adjacent coordinate after a successful previous hit', () => {
    //hit an enemy ship
    const prevAttack = [2, 4]
    player.board.receiveAttack(2, 4)

    jarvis.attackEnemy(prevAttack, player.board)

    //get next coordinates
    const nextAttack = jarvis.getCoordinates(player.board)

    const adjacentCoordinates = [
        [prevAttack[0], prevAttack[1] + 1], // Right
        [prevAttack[0], prevAttack[1] - 1], // Left
        [prevAttack[0] + 1, prevAttack[1]], // Down
        [prevAttack[0] - 1, prevAttack[1]], // Up
    ]

    expect(adjacentCoordinates).toContainEqual(nextAttack)
})