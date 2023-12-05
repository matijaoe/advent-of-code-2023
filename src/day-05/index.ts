import { parseGroups, parseLines, readInput } from 'io'

const input = await readInput('day-05', 'example')

const parseSeeds = (line: string) => {
  const [,seedsStr] = line.split(': ')
  return seedsStr.split(' ').map(Number)
}

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

  // const finalSeeds = seeds.map((seed) => {
  //   const newSeed = almanac.forEach((group) => {
  //     group.forEach((item) => {
  //       if (seed >= item.srcRangeStart && seed <= item.srcRangeStart + item.rangeLen) {
  //         return item.destRangeStart + (seed - item.srcRangeStart)
  //       }
  //       return seed
  //     })
  //   })
  //   return newSeed
  // })

  return almanac
}

console.log(part1())
