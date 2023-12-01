import { parseLines, readInput } from 'io'
import { sum } from 'utils'

const input = await readInput('day-01')
// const input = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen
// `

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
    const matched = line.match(regex)
    if (!matched) {
      return null
    }

    const first = matched.at(0)!
    const last = matched.at(-1)!

    const converted = [first, last]
      .map((match) => {
        console.log(match)
        if (/\d/.test(match)) {
          return match
        }
        return numbersMap[match as keyof typeof numbersMap].toString()
      })

    return converted.join('')
  }).map(Number)

  return sum(values)
}
