import { parseLines, readInput } from 'io'
import { sum } from 'utils'

const input = await readInput('day-04', 'example')

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 1 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const part1 = () => {
  const lines = parseLines(input)

  const total = lines.reduce((acc, line) => {
    const [_, lottery] = line.split(': ')
    const [winningNumbers, chosenNumbers] = lottery
      .trim()
      .split(' | ')
      .map((str) => str.split(/\s+/).map(Number))

    const myMatches = chosenNumbers.filter((num) => winningNumbers.includes(num))
    const matchCount = myMatches.length

    if (matchCount > 0) {
      const points = 2 ** (matchCount - 1)
      return acc + points
    }

    return acc
  }, 0)

  return total
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 2 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const part2 = () => {
  const lines = parseLines(input)

  const totalScratchcards = lines.reduce((acc, line) => {
    const [cardMeta, lottery] = line.split(': ')
    const [_, cardNumberStr] = cardMeta.split(/\s+/)
    const cardNumber = Number(cardNumberStr)
    const [winningNumbers, chosenNumbers] = lottery
      .trim()
      .split(' | ')
      .map((str) => str.split(/\s+/).map(Number))

    const myMatches = chosenNumbers.filter((num) => winningNumbers.includes(num))
    const matchCount = myMatches.length ?? 0

    acc[cardNumber] ??= 0

    console.log('\ncard :', cardNumber, '| matched:', matchCount, '| total:', acc[cardNumber])

    console.log('adding 1 to :', cardNumber)
    acc[cardNumber] += 1

    // create an arary of lenght of matchCount, and add 1 + gameNumber to each index
    const wonCards: number[] = Array.from({ length: matchCount }, (_, i) => i + 1 + cardNumber)

    wonCards.forEach((card) => {
      acc[card] ??= 0
      console.log('adding 1 to :', card)
      acc[card] += 1

      const cardCountCopy = Math.max(0, acc[card] - 1)
      while (cardCountCopy > 0) {
        // todo: extract all this into separate reusable function
        // or, first store all counts of every card, and then loop over them
      }
    })
    console.log(acc)
    console.log('-------------------')

    return acc
  }, {} as Record<string, number>)

  console.log(totalScratchcards)

  return sum(Object.values(totalScratchcards))
}

console.log(part2()) // 102592 too low

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
