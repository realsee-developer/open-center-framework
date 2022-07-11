import { generateRealseePluginDataUrl } from '@/lib/core/apis/gateway'
import { RealseePluginDataSourceMap } from '@/lib/core/configs/pluginDataSourceMap'
import { RealseeSpaceCommonParams } from '@/lib/core/typings/RealseeSpaceCommonParams'
import { get } from '../../openAPI'

// 数据源的状态
enum FetchState {
  loading = 'loading', // 请求中
  loaded = 'loaded', // 已加载
}

// 维护一个数据缓存
const dataCache = new Map<string, any>()

// 数据请求状态
const dataFetchState: Record<string, FetchState> = {}

export interface PluginDataServiceParams extends RealseeSpaceCommonParams {
  pluginName: string // 插件名
  force?: boolean // 是否强制使用新数据
  extraData?: any // 业务数据
}

/**
 * 获取插件数据
 * @param params
 * @returns
 */
export async function pluginDataService<T = any>(params: PluginDataServiceParams): Promise<T> {
  const { pluginName, vrCode, force } = params
  if (!pluginName) throw new Error('pluginName is empty !')
  const dataSource = RealseePluginDataSourceMap[pluginName]
  const dataCacheKey = `${vrCode}:${typeof dataSource === 'string' ? dataSource : pluginName}`
  let cache = dataCache.get(dataCacheKey)

  switch (true) {
    case dataFetchState[dataCacheKey] === FetchState.loading: {
      // 相应数据在加载中，等待加载完成
      return new Promise((resolve) => {
        let timer: null | NodeJS.Timeout = null
        const polling = () => {
          if (dataFetchState[dataCacheKey] === FetchState.loaded) {
            if (timer) clearTimeout(timer)
            return resolve(dataCache.get(dataCacheKey))
          } else {
            timer = setTimeout(() => polling(), 200)
          }
        }
        polling()
      })
    }
    case force || (!cache && dataFetchState[dataCacheKey] === FetchState.loaded): {
      // 强制更新数据时 & 数据不存在 请求数据
      dataFetchState[dataCacheKey] = FetchState.loading
      cache = await (async () => {
        // 无数据依赖时直接返null
        if (false === dataSource) return null
        // 执行函数请求
        try {
          return typeof dataSource === 'function'
            ? await dataSource(params)
            : await get(generateRealseePluginDataUrl(pluginName), params)
                .then((res) => (res.code === 0 ? res.data : null))
                .then((data) => {
                  const key = typeof dataSource === 'string' ? dataSource : pluginName
                  if (data !== null && typeof data === 'object' && !(data as Object).hasOwnProperty(key)) {
                    return { [key]: data }
                  } else {
                    return data
                  }
                })
        } catch (e) {
          console.error(`request ${pluginName} data failed!`, e)
        }
        // 兜底给null
        return null
      })()
      dataCache.set(dataCacheKey, cache)
      dataFetchState[dataCacheKey] = FetchState.loaded
    }
    default: {
      return dataCache.get(dataCacheKey)
    }
  }
}
