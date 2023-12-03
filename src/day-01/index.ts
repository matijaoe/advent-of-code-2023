import { parseLines, readInput } from 'io'
import { reverseString, sum } from 'utils'

const input = await readInput('day-01')

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 1 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 2 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

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

const part2_a = () => {
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
        if (!match) {
          return null
        }
        return numbersMap[match as keyof typeof numbersMap].toString()
      })

    return converted.join('')
  }).filter(Boolean).map(Number)

  return sum(values)
}

// Alternative solution, but much slower
const _part2_b = () => {
  const lines = parseLines(input)

  const values = lines.map((line) => {
    const numStrings = Object.keys(numbersMap)
    const regexStart = new RegExp(`\\d|${numStrings.join('|')}`, 'g')

    const numStringsReversed = Object.keys(numbersMap).map((key) => reverseString(key))
    const regexEnd = new RegExp(`\\d|${numStringsReversed.join('|')}`, 'g')

    const first = line.match(regexStart)?.at(0) ?? null
    const last = reverseString(line).match(regexEnd)?.at(0) ?? null

    if (!first || !last) {
      return null
    }

    const converted = [first, last]
      .map((match) => {
        if (/\d/.test(match)) {
          return match
        }
        if (!match) {
          return null
        }
        if (numStrings.includes(match)) {
          return numbersMap[match as keyof typeof numbersMap].toString()
        }
        return numbersMap[reverseString(match) as keyof typeof numbersMap].toString()
      })

    return converted.join('')
  }).filter(Boolean).map(Number)

  return sum(values)
}

export const part2 = part2_a
