/**
 * 做 api 和路由的映射
 * baseUrl = '/api/realsee/[...path]'
 */

import * as Vr from './vr'

/**
 * 路由映射
 */
const routers = {
  '/vr/entityList': Vr.getRealseeEntityList,
  '/vr/entityData': Vr.getRealseeEntityData,
  '/vr/entityMeta': Vr.getRealseeEntityMeta,
  '/vr/pluginData': Vr.getRealseePluginData,
  '/vr/spaceConfig': Vr.getRealseeSpaceConfig,
} as Record<string, (...args: any[]) => any>

export default routers
