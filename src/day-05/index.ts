import { parseGroups, readInput } from 'io'
import { isBetween } from 'utils'

const input = await readInput('day-05', 'input')

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Shared ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const parseSeeds = (line: string) => {
  const [,seedsStr] = line.split(': ')
  return seedsStr.split(' ').map(Number)
}

const parseAlmanac = (maps: string[][]) => {
  return maps
    .map((map) => map.slice(1))
    .map((values) => values.map((str) => str.split(' ').map(Number)))
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 1 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const part1 = () => {
  const [seedsLine, ...maps] = parseGroups(input)
  const seeds = parseSeeds(seedsLine.at(0)!)

  const almanac = parseAlmanac(maps)

  const locationNumbers = seeds.map((seed) => {
    let number = seed
    almanac.forEach((group) => {
      for (const [destRangeStart, srcRangeStart, rangeLen] of group) {
        const start = srcRangeStart
        const end = srcRangeStart + rangeLen

        if (isBetween(number, [start, end])) {
          number = destRangeStart + (number - srcRangeStart)
          break
        }
      }
    })
    return number
  })

  return Math.min(...locationNumbers)
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 2 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const part2 = () => {
  const [seedsLine, ...maps] = parseGroups(input)
  const seeds = parseSeeds(seedsLine.at(0)!)

  const almanac = parseAlmanac(maps)

  // [start, end], inclusive
  const pairs: [number, number][] = seeds.reduce((acc, seed, index) => {
    if (index % 2 === 0) {
      acc.push([seed, seeds.at(index + 1)!])
    }
    return acc
  }, [] as [number, number][])
    .map(([start, len]) => [start, start + len])

  let lowest = Number.POSITIVE_INFINITY
  for (const [idx, [min, max]] of pairs.entries()) {
    console.log('group:', idx + 1, new Intl.NumberFormat('en-US').format(max - min))
    for (let n = min; n <= max; n++) {
      let number = n
      for (const group of almanac) {
        for (const [destRangeStart, srcRangeStart, rangeLen] of group) {
          if (isBetween(number, [srcRangeStart, srcRangeStart + rangeLen])) {
            number = destRangeStart + (number - srcRangeStart)
            break
          }
        }
      }

      if (number < lowest) {
        lowest = number
      }
    }
  }

  return lowest
}

/*
🌲 Part One: 551761867 (1.04 ms)
🎄 Part Two: 57451710 (3528383.59 ms) - too high 🥺
*/
