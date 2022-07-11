import { spaceConfigService } from '@/lib/core/services/vr/spaceConfig'
import { RealseeSpaceCommonParams } from '@/lib/core/typings/RealseeSpaceCommonParams'

/**
 * 获取功能模块配置
 * @param params
 * @returns
 */
export const getRealseeSpaceConfig = async (params: RealseeSpaceCommonParams) => await spaceConfigService(params)
