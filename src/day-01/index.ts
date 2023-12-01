import { parseLines, readInput } from 'io'
import { sum } from 'utils'

const input = await readInput('day-01')

export const part1 = () => {
  const lines = parseLines(input)

  const values = lines.map((line) => {
    const matched = line.match(/\d/g)
    if (!matched) {
      return null
    }

    const first = matched.at(0)
    const last = matched.at(-1)!
    return first + last
  }).filter(Boolean).map(Number)

  return sum(values)
}
