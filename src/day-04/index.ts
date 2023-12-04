import { parseLines, readInput } from 'io'

const input = await readInput('day-04', 'example')

export const part1 = () => {
  const lines = parseLines(input)
  // your code goes here
  const mapped = lines.reduce((acc, line) => {
    const [gameHead, lottery] = line.split(': ')
    const gameNum = gameHead.split(' ').at(1)
    const games = lottery.split(' | ')
    console.log('Games', games)
    const res = games.map((game) => {
      console.log('game', game)
      return game
    })
    acc[gameNum] = games
    return acc
  }, {})
  // console.log(mapped)
  return mapped.toString()
}
