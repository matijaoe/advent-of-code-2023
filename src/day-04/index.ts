import { parseLines, readInput } from 'io'
import { sum } from 'utils'

const input = await readInput('day-04')

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Shared ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const countCardMatches = (lines: string[]) => {
  return lines.reduce((acc, line) => {
    const [cardMeta, lottery] = line.split(': ')
    const [_, cardNumberStr] = cardMeta.split(/\s+/)
    const cardNumber = Number(cardNumberStr)
    const [winningNumbers, chosenNumbers] = lottery
      .trim()
      .split(' | ')
      .map((str) => str.split(/\s+/).map(Number))

    const myMatches = chosenNumbers.filter((num) => winningNumbers.includes(num))
    const matchCount = myMatches.length ?? 0

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
  }, 0)
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

    const nextCard = cardNumber + 1

    let cardTotal = acc[cardNumber]
    while (cardTotal > 0) {
      const end = Math.min(count + cardNumber, lines.length)
      for (let n = nextCard; n <= end; n++) {
        acc[n] ??= 0
        acc[n] += 1
      }
      cardTotal -= 1
    }

    return acc
  }

  const matchCountEntries = (Object.entries(cardMatches) as Array<[string, number]>)
    .map(([cardNumberStr, count]) => [Number(cardNumberStr), count])

  const reduced = matchCountEntries.reduce((acc, [cardNumber, matchCount]) => {
    addUpCards(acc, cardNumber, matchCount)
    return acc
  }, {} as Record<string, number>)

  return sum(Object.values(reduced))
}
