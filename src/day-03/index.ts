import { parseLines, readInput } from 'io'
import { sum } from 'utils'

const input = await readInput('day-03', 'example-my')

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 1 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const processAdjacentLine = (adjLine: string, match: RegExpMatchArray, foundMatch: string) => {
  if (match?.index == null) {
    return null
  }

  const symbolsRegex = /[^a-zA-Z0-9.]/g

  const firstIndex = Math.max(match.index - 1, 0)
  const lastIndex = Math.min(match.index + foundMatch.length + 1, adjLine.length - 1)

  const lineSubstr = adjLine.slice(firstIndex, lastIndex)
  const substrIncludesSymbol = symbolsRegex.test(lineSubstr)
  if (substrIncludesSymbol) {
    return Number(foundMatch)
  }
  return null
}

export const part1 = () => {
  const lines = parseLines(input)

  const numbersRegex = /(\d+)/g
  const symbolsRegex = /[^a-zA-Z0-9.\w]/g

  const validNumbers: number[] = []

  lines.forEach((line, lineIdx) => {
    let match = null

    while ((match = numbersRegex.exec(line)) !== null) {
      const foundMatch = match[0]

      // current line
      if (match.index > 0) {
        const prevIndex = match.index - 1
        const startsWithSymbol = line[prevIndex].match(symbolsRegex)
        if (startsWithSymbol) {
          validNumbers.push(Number(foundMatch))
          continue
        }
      }

      const nextIndex = match.index + foundMatch.length
      if (nextIndex < line.length) {
        const endsWithSymbol = line[nextIndex].match(symbolsRegex)
        if (endsWithSymbol) {
          validNumbers.push(Number(foundMatch))
          continue
        }
      }

      // previous line
      if (lineIdx > 0) {
        const prevLine = lines.at(lineIdx - 1)!
        const validNumber = processAdjacentLine(prevLine, match, foundMatch)
        if (validNumber) {
          validNumbers.push(validNumber)
          continue
        }
      }

      // next line
      if (lineIdx < lines.length - 1) {
        const nextLine = lines.at(lineIdx + 1)!
        const validNumber = processAdjacentLine(nextLine, match, foundMatch)
        if (validNumber) {
          validNumbers.push(validNumber)
          continue
        }
      }
    }
  })

  return sum(validNumbers)
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 2 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const part2 = () => {
  const lines = parseLines(input)

  const asteriskRegex = /\*/g
  const asteriskAfterNumberRegex = /(?:^\*?\d+\*?$|\d+(?=\*)|\d+(?<=\*))/g
  const asteriskBeforeNumberRegex = /(?:^\*?\d+\*?$|(?<=\*)\d+|(?=\*)\d+$)/g

  const gearRatios: Array<number[]> = []

  lines.forEach((line, _lineIdx) => {
    let match = null

    while ((match = asteriskRegex.exec(line)) !== null) {
      const foundMatch = match[0]
      console.log(line, match.index)

      const currentGearRatio: number[] = []

      // current line
      if (match.index > 0) {
        const lineSubstr = line.slice(0, Math.min(match.index + 1, line.length - 1))
        const numberMatch = lineSubstr.match(asteriskAfterNumberRegex)
        if (numberMatch) {
          const number = numberMatch.at(-1)
          console.log('matched before', number)
          currentGearRatio.push(Number(number))
        }
      }

      const nextIndex = match.index + foundMatch.length
      if (nextIndex < line.length) {
        const lineSubstr = line.slice(match.index, line.length - 1)
        const numberMatch = lineSubstr.match(asteriskBeforeNumberRegex)
        if (numberMatch) {
          const [number] = numberMatch
          console.log('matched after', number)
          currentGearRatio.push(Number(number))
        }
      }

      if (currentGearRatio.length === 2) {
        gearRatios.push(currentGearRatio)
      }
    }
  })

  return gearRatios
}
