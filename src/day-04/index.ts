import { parseLines, readInput } from 'io'
import { intersection, mapEntries, mapValues, splitOnWhitespace, sum } from 'utils'

const input = await readInput('day-04')

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Shared ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const countCardMatches = (lines: string[]) => {
  return lines.reduce((acc, line) => {
    const [cardMeta, lottery] = line.split(': ')
    const [_, cardNumber] = splitOnWhitespace(cardMeta)
    const [winningNumbers, chosenNumbers] = lottery
      .trim()
      .split(' | ')
      .map(splitOnWhitespace)

    const matchCount = intersection(winningNumbers, chosenNumbers).length

    acc.set(cardNumber, matchCount)

    return acc
  }, new Map<string, number>())
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 1 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const part1 = () => {
  const lines = parseLines(input)
  const cardMatches = countCardMatches(lines)

  return mapValues(cardMatches).reduce((acc, count) => {
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

  const reduced = mapEntries(cardMatches).reduce((acc, [cardNumber, matchCount]) => {
    return addUpCards(acc, Number(cardNumber), matchCount)
  }, {} as Record<string, number>)

  return sum(Object.values(reduced))
}
