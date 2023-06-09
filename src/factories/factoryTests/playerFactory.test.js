import Player from '../playerFactory'
import { correctGameboard } from './gameboardFactory.test'

const ela = new Player

const correctPlayer = {
    "board": correctGameboard
}

test('creates a player object', () => {
    expect(ela).toEqual(correctPlayer)
})