import { RealseePluginDataSourceMap } from '@/lib/core/configs/pluginDataSourceMap'
import { RealseeSpaceCommonParams } from '@/lib/core/typings/RealseeSpaceCommonParams'
import parseQueryParams from '@/lib/core/utils/parseQueryParams'
import { apis } from '@/lib/next/client/config/apis'
import { requestRealseeApi } from '@/lib/next/client/utils/request'
import { useState, useCallback, useEffect } from 'react'

export const useFivePluginData = <R = any>(
  pluginName: string,
  params?: Record<string, any> & RealseeSpaceCommonParams,
): R | undefined => {
  const [data, setData] = useState<R>()

  const getData = useCallback(async () => {
    const param = params ? params : parseQueryParams()
    const res = await requestRealseeApi(apis.realseeVrPluginData, {
      pluginName,
      ...param,
    })
    const key =
      typeof RealseePluginDataSourceMap[pluginName] === 'string' ? RealseePluginDataSourceMap[pluginName] : pluginName
    setData(res?.[key as any] || res)
  }, [pluginName, params])

  useEffect(() => {
    getData()
  }, [getData])

  return data
}
