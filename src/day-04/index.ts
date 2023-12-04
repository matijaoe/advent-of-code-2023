import { parseLines, readInput } from 'io'
import { intersection, sum } from 'utils'

const input = await readInput('day-04')

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Shared ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const countCardMatches = (lines: string[]) => {
  return lines.reduce((acc, line) => {
    const [cardMeta, lottery] = line.split(': ')
    const [_, cardNumber] = cardMeta.split(/\s+/)
    const [winningNumbers, chosenNumbers] = lottery
      .trim()
      .split(' | ')
      .map((str) => str.split(/\s+/))

    const matchCount = intersection(winningNumbers, chosenNumbers).length

    acc[cardNumber] = matchCount

    return acc
  }, {} as Record<string, number>)
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 1 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const part1 = () => {
  const lines = parseLines(input)
  const cardMatches = countCardMatches(lines)

  return Object.values(cardMatches).reduce((acc, count) => {
    const points = 2 ** (count - 1)
    return acc + points
  }, 1)
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 2 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const part2 = () => {
  const lines = parseLines(input)
  const cardMatches = countCardMatches(lines)

  const addUpCards = (acc: Record<string, number>, cardNumber: number, count: number) => {
    acc[cardNumber] ??= 0
    acc[cardNumber] += 1

    let cardsLeft = acc[cardNumber]

    while (cardsLeft > 0) {
      const nextCard = cardNumber + 1
      const endCard = Math.min(count + cardNumber, lines.length)
      for (let n = nextCard; n <= endCard; n++) {
        acc[n] ??= 0
        acc[n] += 1
      }
      cardsLeft -= 1
    }

    return acc
  }

  const matchCountEntries = Object.entries(cardMatches) as Array<[string, number]>

  const reduced = matchCountEntries.reduce((acc, [cardNumber, matchCount]) => {
    return addUpCards(acc, Number(cardNumber), matchCount)
  }, {} as Record<string, number>)

  return sum(Object.values(reduced))
}
