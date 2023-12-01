import { isOk } from 'utils/script'

const headers = {
  Cookie: `session=${Bun.env.SESSION}`
}

export const fetchInput = ({ day, year }: { day: number; year?: number }) => {
  if (!year) {
    // eslint-disable-next-line no-param-reassign
    year = new Date().getFullYear()
  }
  return fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers
  })
    .then(isOk)
    .then((response) => response.text())
}
