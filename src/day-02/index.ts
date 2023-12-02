import { parseLines, readInput } from 'io'
import { sum } from 'utils'

const input = await readInput('day-02', 'input')

type Color = 'red' | 'green' | 'blue'

export const part1 = () => {
  const lines = parseLines(input)
  const requirement: Record<Color, number> = {
    red: 12,
    green: 13,
    blue: 14,
  }

  type GameRoundRecord = Record<Color, number>
  type GameStr = `Game ${number}`
  type RoundStr = `${number} ${Color}`

  const games = lines.reduce((acc, line) => {
    const [game, roundsRaw] = line.split(': ') as [GameStr, string]

    const gameNum = (game.split(' ').at(1)!)

    const roundsMap = roundsRaw.split('; ').map((round) => {
      const roundColors = round.split(', ') as RoundStr[]
      const gameRoundRecord = roundColors.reduce((acc, curr) => {
        const [count, color] = curr.split(' ') as [string, Color]
        acc[color] = Number.parseInt(count)
        return acc
      }, {} as Record<Color, number>)
      return gameRoundRecord
    })

    acc[gameNum] = roundsMap

    return acc
  }, {} as Record<string, GameRoundRecord[]>)

  const possibleGames = Object.keys(games).filter((gameNum) => {
    const gameNotPossible = games[gameNum].some((round) => {
      const isImpossible = (Object.entries(round) as [Color, number][])
        .some(([color, count]) => {
          return count > requirement[color]
        })
      return isImpossible
    })
    return !gameNotPossible
  }).map(Number)

  return sum(possibleGames)
}
