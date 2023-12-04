import { parseLines, readInput } from 'io'
import { sum, unique } from 'utils'

const input = await readInput('day-04', 'example')

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
  const lines = parseLines(input).slice(0, 30)

  const cardMatches = countCardMatches(lines)
  /* {
    "1": 4,
    "2": 2,
    "3": 2,
    "4": 1,
    "5": 0,
    "6": 0
  } */

  const matchCountEntries = (Object.entries(cardMatches) as Array<[string, number]>).map(([cardNumberStr, count]) => [Number(cardNumberStr), count])

  const calcStuff = (acc: Record<string, number>, cardNumber: number, count: number) => {
    acc[cardNumber] ??= 0
    acc[cardNumber] += 1

    if (acc[cardNumber] === 0 || !(cardNumber in acc)) { return acc }

    const arr = unique(Array.from({ length: count }, (_, i) => i + 1 + cardNumber).filter((num) => num < lines.length))

    arr.forEach((num) => {
      acc[num] ??= 0
      acc[num] += 1

      return calcStuff(acc, num, count - 1)
    })

    return acc
  }

  const reduced = matchCountEntries.reduce((acc, [cardNumber, count]) => {
    calcStuff(acc, cardNumber, count - 1)
    // const arr = unique(Array.from({ length: count }, (_, i) => i + 1 + cardNumber).filter((num) => num < lines.length))

    // acc[cardNumber] ??= 0
    // acc[cardNumber] += 1

    // arr.forEach((card) => {
    //   acc[card] ??= 0
    //   acc[card] += 1

    //   calcStuff(acc, card, count - 1)
    //   // console.log(acc)
    // })

    return acc
  }, {} as Record<string, number>)

  // console.log(reduced)

  return sum(Object.values(reduced))
}

// console.log(part2()) // 102592 too low

/*
expected:
{
  "1": 1,
  "2": 2,
  "3": 4,
  "4": 8,
  "5": 14,
  "6": 1
}
*/
