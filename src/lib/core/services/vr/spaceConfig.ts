import { realseeConfig } from '../../apis/gateway'
import { RealseeSpaceCommonParams } from '../../typings/RealseeSpaceCommonParams'
import { RealseeSpaceConfig } from '../../typings/RealseeSpaceConfig'
import { get } from '../openAPI'

/**
 * 获取服务端功能模块配置
 * @param params
 * @returns
 */
export const spaceConfigService = async (params: RealseeSpaceCommonParams) => {
  const res = await get<Partial<RealseeSpaceConfig>>(realseeConfig, params)
  if (res.code === 0) {
    return res.data
  } else {
    return new Error(res.status || 'get space config failed')
  }
}
