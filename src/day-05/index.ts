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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 1 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const part1 = () => {
  const [seedsLine, ...mapsGroups] = parseGroups(input)
  const seeds = parseSeeds(seedsLine.at(0)!)

  const maps = mapsGroups
    .map((map) => map.slice(1))
    .map((values) => values.map((str) => str.split(' ').map(Number)))

  const almanac = maps.map((group) => {
    return group.map((item) => {
      return {
        destRangeStart: item.at(0)!,
        srcRangeStart: item.at(1)!,
        rangeLen: item.at(2)!,
      }
    })
  })

  const locationNumbers = seeds.map((seed) => {
    let number = seed
    almanac.forEach((group) => {
      for (const item of group) {
        const start = item.srcRangeStart
        const end = item.srcRangeStart + item.rangeLen
        if (isBetween(number, [start, end])) {
          number = item.destRangeStart + (number - item.srcRangeStart)
          break
        }
      }
    })
    return number
  })

  return Math.min(...locationNumbers)
}
