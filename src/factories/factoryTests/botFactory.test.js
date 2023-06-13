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

test('bot generates random valid attack coordinates', () => {
    const attack = jarvis.getCoordinates(player.board) 
    expect(attack[0] && attack[1]).toBeLessThanOrEqual(9)
    expect(attack[0] && attack[1]).toBeGreaterThanOrEqual(0)
})

test('bot makes a successful attack', () => {
    const coords = jarvis.getCoordinates(player.board) 
    const attack1 = jarvis.attackEnemy(coords, player.board)
    expect(attack1).toEqual(expect.stringContaining("It's a"))
})