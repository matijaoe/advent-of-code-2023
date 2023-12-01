import type { Day } from 'models'

type Transform<Res, Input = string> = (s: Input) => Res

export const readFile = async (filepath: string) => {
  const file = Bun.file(filepath)
  const text = await file.text()
  return text.trim()
}

export const readInput = async (dir: Day, fileName: string = 'input') => {
  const filepath = `./src/${dir}/${fileName}.txt`
  return readFile(filepath)
}

export const parseLines = <T = string>(
  input: string,
  as?: Transform<T>,
  { includeEmpty }: { includeEmpty?: boolean } = {}
) => {
  let lines = input.split('\n')
  if (!includeEmpty) {
    lines = lines.filter(Boolean)
  }
  return as ? lines.map(as) : lines as T[]
}

export const parseGroups = <T = string>(
  input: string,
  as?: Transform<T>
) => {
  const groups = input.split('\n\n')

  return groups.map((group) => {
    return parseLines(group, as)
  }) as T[][]
}
