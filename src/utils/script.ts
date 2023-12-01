import { isBetween } from 'utils'

export const formatDay = (day: number | string) => {
  const parsedDay = Number(day)
  return String(parsedDay).padStart(2, '0')
}

export const formatDayName = (day: number | string) => {
  return `day-${formatDay(day)}`
}

export const validateDay = (day: number | string) => {
  const parsedDay = Number(day)
  return day && !Number.isNaN(parsedDay) && isBetween(parsedDay, [1, 25])
}

export const generateTemplate = (day: number) => `import { parseLines, readInput } from 'io'

const input = await readInput('${formatDayName(day)}')

export const part1 = () => {
  const lines = parseLines(input)
  // your code goes here
  return lines.length
}
`

export const withPerformance = <T>(handler: () => T) => {
  const start = performance.now()
  const result = handler()
  const end = performance.now()

  return [result, end - start] as const
}

export const formatPerformance = (time: number) => {
  const round = (x: number) => Math.round((x + Number.EPSILON) * 100) / 100
  if (time < 1) {
    return `${round(time * 1000)} µs`
  }
  return `${round(time)} ms`
}

export const isOk = (response: Response): Promise<Response> => {
  return new Promise((resolve, reject) =>
    response.ok ? resolve(response) : reject(response)
  )
}
