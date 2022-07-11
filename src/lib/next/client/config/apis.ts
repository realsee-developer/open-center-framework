// api相关接口
const realseeApiBaseUrl = '/api/realsee'

// VR实体相关接口

// 实体列表
const realseeVrEntityList = `${realseeApiBaseUrl}/vr/entityList`

// 实体数据
const realseeVrEntityData = `${realseeApiBaseUrl}/vr/entityData`

// 实体原属性
const realseeVrEntityMeta = `${realseeApiBaseUrl}/vr/entityMeta`

// 实体配置
const realseeVrSpaceConfig = `${realseeApiBaseUrl}/vr/spaceConfig`

// 插件数据
const realseeVrPluginData = `${realseeApiBaseUrl}/vr/pluginData`

// node层的接口
export const apis = {
  realseeVrEntityList,
  realseeVrEntityData,
  realseeVrEntityMeta,
  realseeVrSpaceConfig,
  realseeVrPluginData,
}
