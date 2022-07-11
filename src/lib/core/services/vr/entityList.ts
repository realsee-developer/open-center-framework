import { realseeEntityList } from '@/lib/core/apis/gateway'
import { RealseeSpaceCommonParams } from '../../typings/RealseeSpaceCommonParams'
import { get } from '../openAPI'

export interface EntityListServiceParams extends RealseeSpaceCommonParams {
  page: number
  page_size?: number
}

export const entityListService = async (params: { page: number; page_size?: number } & RealseeSpaceCommonParams) => {
  const res = await get(realseeEntityList, params)
  if (res.code === 0) {
    return res.data
  } else {
    return new Error(res.status || 'get entity data failed')
  }
}
