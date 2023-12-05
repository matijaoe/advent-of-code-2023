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
    .map((group) => {
      return group.map(([destRangeStart, srcRangeStart, rangeLen]) => ({
        destRangeStart,
        srcRangeStart,
        rangeLen,
      }))
    })
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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------- Part 2 ---------------------------
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export const part2 = () => {
  const [seedsLine, ...maps] = parseGroups(input)
  const seeds = parseSeeds(seedsLine.at(0)!)

  const almanac = parseAlmanac(maps)

  const pairs = seeds.reduce((acc, seed, index) => {
    if (index % 2 === 0) {
      acc.push([seed, seeds.at(index + 1)!])
    }
    return acc
  }, [] as [number, number][])

  const allSeeds = pairs.reduce((acc, [start, len]) => {
    const numbers = Array.from({ length: len }, (_, i) => start + i)
    return [...acc, ...numbers]
  }, [] as number[])

  console.log('pairs :', pairs)

  // get interesected values, by providing first start and end, and last start and end
  const getIntersected = (start1: number, end1: number, start2: number, end2: number) => {
    const start = Math.max(start1, start2)
    const end = Math.min(end1, end2)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const locationNumbers = allSeeds.map((seed) => {
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
