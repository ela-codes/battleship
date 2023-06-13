import Bot from '../botFactory'
import Player from '../playerFactory'
import { correctGameboard } from './testData'

const ela = new Player
const bot = new Bot

const correctPlayer = {
    "board": correctGameboard
}

test('creates a player object', () => {
    expect(ela).toEqual(correctPlayer)
})

test('player makes an attack', () => {
    const attack = ela.attackEnemy([0,1], bot.board)
    console.log(attack)
    expect(attack).toEqual(expect.stringContaining("It's a"))
})