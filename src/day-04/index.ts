import { parseLines, readInput } from 'io'
import { unique } from 'utils'

const input = await readInput('day-04', 'input')

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
