import { entityListService } from '@/lib/core/services/vr/entityList'
import { RealseeSpaceCommonParams } from '@/lib/core/typings/RealseeSpaceCommonParams'

export interface getRealseeEntityListParams extends RealseeSpaceCommonParams {
  page: number
  page_size?: number
}

/**
 * 获取实体列表
 * @param params
 * @returns
 */
export const getRealseeEntityList = async (params: getRealseeEntityListParams) => await entityListService(params)
