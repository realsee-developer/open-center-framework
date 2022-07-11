import { parseQuery } from './qs'

/**
 * 从 url 中获取指定参数的值
 * */
export const getQueryValueByName = (param: string, url?: string) => {
  const query = parseQuery(url ? new URL(url).search : globalThis?.location?.search)
  return query[param]
}

export default getQueryValueByName
