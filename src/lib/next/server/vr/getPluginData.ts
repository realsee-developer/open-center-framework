import { pluginDataService, PluginDataServiceParams } from '@/lib/core/services/vr/plugin/dataSource'

/**
 * 获取功能模块配置
 * @param params
 * @returns
 */
export const getRealseePluginData = async (params: PluginDataServiceParams) => await pluginDataService(params)
