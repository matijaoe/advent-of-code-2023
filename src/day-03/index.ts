import { parseLines, readInput } from 'io'
import { sum } from 'utils'

const input = await readInput('day-03', 'input')

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
