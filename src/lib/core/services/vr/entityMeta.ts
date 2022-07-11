import { realseeEntityMeta } from '../../apis/gateway'
import { RealseeSpaceCommonParams } from '../../typings/RealseeSpaceCommonParams'
import { get } from '../openAPI'

/**
 * 获取vr实体数据
 * @param params 统一参数
 */
export const entityMetaService = async (params: RealseeSpaceCommonParams) => {
  const res = await get(realseeEntityMeta, params)
  if (res.code === 0) {
    return res.data
  } else {
    return new Error(res.status || 'get entity meta failed')
  }
}
