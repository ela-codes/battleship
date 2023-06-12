import Bot from '../botFactory'
import { correctGameboard } from './testData'

const jarvis = new Bot

const correctPlayer = {
    "board": correctGameboard
}

test('creates a bot object', () => {
    expect(jarvis).toEqual(correctPlayer)
})

test('bot generates random valid attack coordinates', () => {
    const attack = jarvis.attack()
    expect(attack[0] && attack[1]).toBeLessThanOrEqual(9)
    expect(attack[0] && attack[1]).toBeGreaterThanOrEqual(0)
})
