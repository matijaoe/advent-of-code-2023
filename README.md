# Advent of Code 2023


![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

- **Bun & TypeScript**, with ESLint
- Automatic day setup
- Puzzle input automatically fetched
- Performance metrics

## Setup

Download template (powered by [`unjs/giget`](https://github.com/unjs/giget))
```bash
npx giget gh:matijaoe/advent-of-code advent-of-code-2023
```

Ensure [`bun`](https://bun.sh/) is installed:
```
curl -fsSL https://bun.sh/install | bash
```

Install dependencies:
```bash
bun install
```

Set up a new day:
```bash
bun setup 1
```

Run day solutions:
```bash
bun day 1
```

Run day solutions in dev mode (without clearing console outputs):
```bash
bun day 1 --dev
```

For automatic puzzle input retrieval, define `.env` file with `session` cookie from [adventofcode.com](https://adventofcode.com):
```env
SESSION=
YEAR=2023
```

## Structure

Generated day structure:
```ts
import { parseLines, readInput } from 'io'

const input = await readInput('day-01')

export const part1 = () => {
  const lines = parseLines(input)
  // your code goes here
  return lines.length
}
```

Expected `index.ts` solution structure (day 1 of 2022):
```ts
import { parseGroups, readInput } from 'io'
import { desc, sum } from 'utils'

const input = await readInput('day-01')

export const part1 = () => {
  const lines = parseGroups(input, Number)
  return lines.map(sum).sort(desc).at(0)
}

export const part2 = () => {
  const lines = parseGroups(input, Number)
  const top = lines.map(sum).sort(desc).slice(0, 3)
  return sum(top)
}
```

`bun day <day-num>` output:
```
🌲 Part One: 70698 (1.11 ms)
🎄 Part Two: 140471 (383.5 µs)
```


## Days
✅ / ❌

| Day | Part 1 | Part 2 | Solution                      | Advent of Code link                            |
| --- | ------ | ------ | ----------------------------- | ---------------------------------------------- |
| 01  | ✅      | ✅      | [Link](./src/day-01/index.ts) | [Day 01](https://adventofcode.com/2023/day/1)  |
| 02  |        |        |                               | [Day 02](https://adventofcode.com/2023/day/2)  |
| 03  |        |        |                               | [Day 03](https://adventofcode.com/2023/day/3)  |
| 04  |        |        |                               | [Day 04](https://adventofcode.com/2023/day/4)  |
| 05  |        |        |                               | [Day 05](https://adventofcode.com/2023/day/5)  |
| 06  |        |        |                               | [Day 06](https://adventofcode.com/2023/day/6)  |
| 07  |        |        |                               | [Day 07](https://adventofcode.com/2023/day/7)  |
| 08  |        |        |                               | [Day 08](https://adventofcode.com/2023/day/8)  |
| 09  |        |        |                               | [Day 09](https://adventofcode.com/2023/day/9)  |
| 10  |        |        |                               | [Day 10](https://adventofcode.com/2023/day/10) |
| 11  |        |        |                               | [Day 11](https://adventofcode.com/2023/day/11) |
| 12  |        |        |                               | [Day 12](https://adventofcode.com/2023/day/12) |
| 13  |        |        |                               | [Day 13](https://adventofcode.com/2023/day/13) |
| 14  |        |        |                               | [Day 14](https://adventofcode.com/2023/day/14) |
| 15  |        |        |                               | [Day 15](https://adventofcode.com/2023/day/15) |
| 16  |        |        |                               | [Day 16](https://adventofcode.com/2023/day/16) |
| 17  |        |        |                               | [Day 17](https://adventofcode.com/2023/day/17) |
| 18  |        |        |                               | [Day 18](https://adventofcode.com/2023/day/18) |
| 19  |        |        |                               | [Day 19](https://adventofcode.com/2023/day/19) |
| 20  |        |        |                               | [Day 20](https://adventofcode.com/2023/day/20) |
| 21  |        |        |                               | [Day 21](https://adventofcode.com/2023/day/21) |
| 22  |        |        |                               | [Day 22](https://adventofcode.com/2023/day/22) |
| 23  |        |        |                               | [Day 23](https://adventofcode.com/2023/day/23) |
| 24  |        |        |                               | [Day 24](https://adventofcode.com/2023/day/24) |
| 25  |        |        |                               | [Day 25](https://adventofcode.com/2023/day/25) |
