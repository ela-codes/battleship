import Player from '../playerFactory'
import { correctGameboard } from './testData'

const ela = new Player

const correctPlayer = {
    "board": correctGameboard
}

test('creates a player object', () => {
    expect(ela).toEqual(correctPlayer)
})