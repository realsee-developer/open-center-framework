import { RealseePluginDataSourceMap } from '../configs/pluginDataSourceMap'
import { APP_SERVER_URL } from '../configs/gateway'

// 开放平台网关地址
export const realseeGateway = APP_SERVER_URL

// 网关access_token
export const realseeAccessToken = `${realseeGateway}/auth/access_token`

// VR配置uri
export const realseeConfig = `${realseeGateway}/open/v2/facade/config`

// VR实体类uri
export const realseeEntity = `${realseeGateway}/open/v1/entity/vr`

// VR实体列表
export const realseeEntityList = `${realseeGateway}/open/v1/entity/vr/list`

// VR实体详细信息uri
export const realseeEntityMeta = `${realseeGateway}/open/v1/entity/meta`

// 插件数据uri前缀
export const realseePluginDataUriPrefix = `${realseeGateway}/open/v1/plugin/`

// 生成插件数据的请求url，跟据开放平台约定，插件数据接口与插件名一致
export const generateRealseePluginDataUrl = (pluginName: string) =>
  `${realseeGateway}/open/v1/plugin/${RealseePluginDataSourceMap[pluginName] || pluginName}`
