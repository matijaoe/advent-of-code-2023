import { parseLines, readInput } from 'io'
import { isNumber, multiply, sum } from 'utils'

const input = await readInput('day-03', 'example')

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 1 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const processAdjacentLine = (adjLine: string, match: RegExpMatchArray, foundMatch: string) => {
  if (match?.index == null) {
    return null
  }

  const symbolsRegex = /[^a-zA-Z0-9.]/g

  const startIdx = Math.max(match.index - 1, 0)
  const endIdx = Math.min(match.index + foundMatch.length + 1, adjLine.length - 1)

  const lineSubstr = adjLine.slice(startIdx, endIdx)
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

// TODO: not solved
const processGearAdjacentLineBefore = (adjLine: string, match: RegExpMatchArray) => {
  if (match?.index == null) {
    return null
  }

  const numbersRegex = /(\d+)$/g

  const startIdx = 0
  const endIdx = Math.min(match.index + 1, adjLine.length - 1)

  const lineSubstr = adjLine.slice(startIdx, endIdx)
  const numberMatch = lineSubstr.match(numbersRegex)
  console.log(lineSubstr, numberMatch)
  if (numberMatch) {
    const match = numberMatch.at(0)!
    return Number(match)
  }
  return null
}
const processGearAdjacentLineAfter = (adjLine: string, match: RegExpMatchArray) => {
  if (match?.index == null) {
    return null
  }

  // stars with number, or stars with number form 2nd char
  // ideally it would be done with lookahead, instead of replacing
  // this also matches *number, but i just cant anymore
  const numbersRegex = /(?:\*?\d+\*?)|(?<=\*)\d+|(?=\*)\d+/g

  const startIdx = match.index
  const endIdx = adjLine.length - 1

  const lineSubstr = adjLine.slice(startIdx, endIdx)
  const numberMatch = lineSubstr.match(numbersRegex)
  console.log(lineSubstr, numberMatch)
  if (numberMatch) {
    const match = numberMatch.at(0)!.replace(/\*/g, '')
    // replace all non numbers with empty
    return Number(match)
  }
  return null
}

export const part2 = () => {
  const lines = parseLines(input)

  const asteriskRegex = /\*/g
  const asteriskAfterNumberRegex = /(?:^\*?\d+\*?$|\d+(?=\*)|\d+(?<=\*))/g
  const asteriskBeforeNumberRegex = /(?:^\*?\d+\*?$|(?<=\*)\d+|(?=\*)\d+$)/g

  const singleGearNumbers: Array<number[]> = []

  lines.forEach((line, lineIdx) => {
    let match = null

    while ((match = asteriskRegex.exec(line)) !== null) {
      const foundMatch = match[0]
      console.log(line, match.index)

      const currentGearRatio: number[] = []

      // current line
      if (match.index > 0) {
        console.log(`\n${lineIdx}.`, line)
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

      // previous line
      if (lineIdx > 0) {
        const prevLine = lines.at(lineIdx - 1)!
        const gearNumberBefore = processGearAdjacentLineBefore(prevLine, match)
        if (gearNumberBefore) {
          console.log('[prev line] gearNumberBefore :', gearNumberBefore)
          currentGearRatio.push(gearNumberBefore)
          asteriskRegex.lastIndex += gearNumberBefore.toString().length
        }
        const gearNumberAfter = processGearAdjacentLineAfter(prevLine, match)
        if (gearNumberAfter) {
          console.log('[prev line] gearNumberAfter :', gearNumberAfter)
          currentGearRatio.push(gearNumberAfter)
          asteriskRegex.lastIndex += gearNumberAfter.toString().length
        }

        if (/\d/g.test(prevLine[match.index])) {
          currentGearRatio.filter((n) => n !== Number(prevLine[match!.index]))
        }
      }

      // next line
      if (lineIdx < lines.length - 1) {
        const nextLine = lines.at(lineIdx + 1)!
        const gearNumberBefore = processGearAdjacentLineBefore(nextLine, match)
        if (gearNumberBefore) {
          console.log('[next line] gearNumberBefore :', gearNumberBefore)
          currentGearRatio.push(gearNumberBefore)
          asteriskRegex.lastIndex += gearNumberBefore.toString().length
        }
        const gearNumberAfter = processGearAdjacentLineAfter(nextLine, match)
        if (gearNumberAfter) {
          console.log('[next line] gearNumberAfter :', gearNumberAfter)
          currentGearRatio.push(gearNumberAfter)
          asteriskRegex.lastIndex += gearNumberAfter.toString().length
        }

        if (/\d/g.test(nextLine[match.index])) {
          currentGearRatio.filter((n) => n !== Number(nextLine[match!.index]))
        }
      }

      console.log(currentGearRatio, currentGearRatio.length)
      if (currentGearRatio.every((n) => !Number.isNaN(n)) && currentGearRatio.length === 2) {
        // singleGearNumbers.push(multiply(currentGearRatio))
        singleGearNumbers.push(currentGearRatio)
      }
    }
  })

  console.log('singleGearNumbers :', singleGearNumbers)
  return sum(singleGearNumbers.map(multiply))
}
