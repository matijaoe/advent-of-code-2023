/* eslint-disable no-cond-assign */
import { parseLines, readInput } from 'io'
import { sum } from 'utils'

const input = await readInput('day-01')

export const part1 = () => {
  const lines = parseLines(input)

  const values = lines.map((line) => {
    const matched = line.match(/\d/g)
    if (!matched?.length) {
      return null
    }

    const first = matched.at(0)!
    const last = matched.at(-1)!
    return first + last
  }).filter(Boolean).map(Number)

  return sum(values)
}

export const part2 = () => {
  const numbersMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }

  const lines = parseLines(input)

  const numStrings = Object.keys(numbersMap)
  const regex = new RegExp(`\\d|${numStrings.join('|')}`, 'g')

  const values = lines.map((line) => {
    const matches: string[] = []
    let match = null
    while ((match = regex.exec(line)) !== null) {
      matches.push(match.at(0)!)
      regex.lastIndex = match?.index + 1
    }

    if (!matches.length) {
      return null
    }

    const first = matches.at(0)!
    const last = matches.at(-1)!

    const converted = [first, last]
      .map((match) => {
        if (/\d/.test(match)) {
          return match
        }
        return numbersMap[match as keyof typeof numbersMap].toString()
      })

    return converted.join('')
  }).filter(Boolean).map(Number)

  return sum(values)
}
