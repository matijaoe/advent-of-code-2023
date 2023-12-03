import { parseLines, readInput } from 'io'
import { sum } from 'utils'

const input = await readInput('day-03', 'input')

const processAdjacentLine = (adjLine: string, match: RegExpMatchArray, foundMatch: string): number | null => {
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
  // regex that matches all symbols, except dot
  // do not match letters, only match symbols, for example $%&*+ etc
  const symbolsRegex = /[^a-zA-Z0-9.\w]/g

  // const numSymbRegex = /(?<=[^.\d])([^.\d]*\d+[^.\d]*)|([^.\d]*\d+[^.\d]*)(?=[^.\d])/gm

  const numbers = input.match(numbersRegex)?.filter(Boolean).map(Number) ?? []
  const _totalSum = sum(numbers)

  const validNumbers: number[] = []

  lines.forEach((line, lineIdx) => {
    let match = null

    // eslint-disable-next-line no-cond-assign
    while ((match = numbersRegex.exec(line)) !== null) {
      const foundMatch = match[0]
      console.log(`\n${line}`, foundMatch, '| idx=', match.index)

      // const matches = line.match(numSymbRegex)
      // console.log('\nprocessing current line:', line)
      // if (matches) {
      //   console.log('matches', matches)
      //   matches.forEach((m) => {
      //     console.log('✅', m)
      //   })
      //   validNumbers.push(...matches.map(Number))
      //   return
      // }

      // TODO: regex that matches strings surrounded by symbols
      // test current line
      if (match.index > 0) {
        const prevIndex = match.index - 1
        const startsWithSymbol = line[prevIndex].match(symbolsRegex)
        if (startsWithSymbol) {
          validNumbers.push(Number(foundMatch))
          console.log('✅', foundMatch)
          continue
        }
      }

      const nextIndex = match.index + foundMatch.length
      if (nextIndex < line.length) {
        const endsWithSymbol = line[nextIndex].match(symbolsRegex)
        if (endsWithSymbol) {
          validNumbers.push(Number(foundMatch))
          console.log('✅', foundMatch)
          continue
        }
      }

      // test previous line
      if (lineIdx > 0) {
        const prevLine = lines.at(lineIdx - 1)!
        console.log('processing PREV line:', prevLine)
        const validNumber = processAdjacentLine(prevLine, match, foundMatch)
        if (validNumber) {
          validNumbers.push(validNumber)
          console.log('✅', foundMatch)
          continue
        }
      }

      // test next line
      if (lineIdx < lines.length - 1) {
        const nextLine = lines.at(lineIdx + 1)!
        console.log('processing NEXT line:', nextLine)
        const validNumber = processAdjacentLine(nextLine, match, foundMatch)
        if (validNumber) {
          validNumbers.push(validNumber)
          console.log('✅', foundMatch)
          continue
        }
      }

      console.log('❌', foundMatch)
    }
  })

  return sum(validNumbers)
}
