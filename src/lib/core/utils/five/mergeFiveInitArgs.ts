import { FiveInitArgs } from '@realsee/five'

export const mergeFiveInitArgs = (object: Partial<FiveInitArgs>, source: Partial<FiveInitArgs>): FiveInitArgs => {
  const target = Object.assign({}, object)
  for (const key in source) {
    const _key = key as keyof FiveInitArgs
    if (target[_key] !== undefined && typeof target[_key] === typeof source[_key]) {
      // 原值存在，且类型需要相同
      switch (true) {
        case Array.isArray(target[_key]): {
          // 数组类型
          Object.assign(target, { [_key]: (target[_key] as Array<any>).concat(source[_key]) })
          break
        }
        case typeof target[_key] === 'object': {
          Object.assign(target, { [_key]: mergeFiveInitArgs(target[_key] as object, source[_key] as object) })
          break
        }
        default: {
          Object.assign(target, { [_key]: source[_key] })
        }
      }
    } else {
      // 原值不存在，直接赋值
      Object.assign(target, { [_key]: source[_key] })
    }
  }
  return target
}
