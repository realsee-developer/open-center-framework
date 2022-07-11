import { entityMetaService } from '@/lib/core/services/vr/entityMeta'
import { RealseeSpaceCommonParams } from '@/lib/core/typings/RealseeSpaceCommonParams'

/**
 * 获取vr实体数据
 * @param params 统一参数
 */
export const getRealseeEntityMeta = async (params: RealseeSpaceCommonParams) => await entityMetaService(params)
