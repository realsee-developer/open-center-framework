export const parseQuery = (queryString: string = '') =>
  queryString
    .replace('?', '')
    .split('&')
    .filter(Boolean)
    .map((kv) => kv.split('='))
    .map((kv) => ({ [kv[0]]: decodeURIComponent(kv[1]) }))
    .reduce((a, b) => ({ ...a, ...b }), {})

export const stringifyQuery = (query: Record<string, any>) =>
  Object.keys(query)
    .map((key) => `${key}=${encodeURIComponent(query[key] !== undefined && query[key] !== null ? query[key] : '')}`)
    .join('&')
