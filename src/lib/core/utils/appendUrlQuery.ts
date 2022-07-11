import { parseQuery, stringifyQuery } from './qs'

export const appendUrlQuery = (url: string, data: Record<string, any> = {}) => {
  const rawURL = new URL(url)
  const originQuery = parseQuery(rawURL.search)
  const newQuery = stringifyQuery({ ...originQuery, ...data })
  return `${rawURL.origin}${rawURL.pathname}${newQuery.length ? '?' + newQuery : ''}`
}
