import { parseLines, readInput } from 'io'
import { multiply, sum } from 'utils'

const input = await readInput('day-02')

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Shared ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

type Color = 'red' | 'green' | 'blue'
type GameStr = `Game ${number}`
type RoundStr = `${number} ${Color}`
type GameRoundRecord = Record<Color, number>
type ColorEntry = [Color, number]

const parseRounds = (roundsRaw: string): GameRoundRecord[] => {
  return roundsRaw.split('; ').map((round) => {
    const roundColors = round.split(', ') as RoundStr[]
    const gameRoundRecord = roundColors.reduce((acc, curr) => {
      const [count, color] = curr.split(' ') as [string, Color]
      acc[color] = Number.parseInt(count)
      return acc
    }, {} as GameRoundRecord)
    return gameRoundRecord
  })
}

const parseGames = (lines: string[]) => {
  return lines.reduce((acc, line) => {
    const [game, roundsRaw] = line.split(': ') as [GameStr, string]
    const [_, gameNum] = game.split(' ')

    acc[gameNum] = parseRounds(roundsRaw)

    return acc
  }, {} as Record<string, Partial<GameRoundRecord>[]>)
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 1 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const isRoundImpossible = (round: Partial<GameRoundRecord>, requirement: GameRoundRecord) => {
  const entries = (Object.entries(round) as ColorEntry[])
  return entries.some(([color, count]) => {
    return count > requirement[color]
  })
}

export const part1 = () => {
  const lines = parseLines(input)
  const games = parseGames(lines)

  const requirement: GameRoundRecord = {
    red: 12,
    green: 13,
    blue: 14
  }

  const possibleGames = Object.keys(games).filter((gameNum) => {
    const gameImpossible = games[gameNum].some((round) => {
      return isRoundImpossible(round, requirement)
    })
    return !gameImpossible
  }).map(Number)

  return sum(possibleGames)
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 2 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const calcRoundMinRequirements = (acc: GameRoundRecord, round: Partial<GameRoundRecord>) => {
  const roundEntries = Object.entries(round) as ColorEntry[]
  roundEntries.forEach(([color, count]) => {
    acc[color] ??= 0
    acc[color] = Math.max(acc[color], count)
  })
  return acc
}

export const part2 = () => {
  const lines = parseLines(input)
  const games = parseGames(lines)

  const gamesMinRequirements = Object.values(games).map((rounds) => {
    return rounds.reduce(calcRoundMinRequirements, {} as GameRoundRecord)
  })

  const gamesPowers = gamesMinRequirements.map(Object.values).map(multiply)
  return sum(gamesPowers)
}
