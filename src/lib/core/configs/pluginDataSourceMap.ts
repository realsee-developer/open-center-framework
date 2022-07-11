import { RealseeSpaceCommonParams } from '../typings/RealseeSpaceCommonParams'

/**
 * 数据源类型
 * string 开放平台的plugin 接口名
 * (param: any & RealseeSpaceCommonParams) => Promise<any> 自定义函数
 * false 无数据依赖
 */
export type RealseePluginDataSourceType = string | ((param: { pluginName: string } & RealseeSpaceCommonParams) => Promise<any>) | false
/**
 * VR 插件数据源映射
 * @description 这里维护插件数据的特殊映射关系，默认数据规则是开放平台插件名作为数据接口名，但有特殊的多个插件使用同一份数据，或业务方自己封装好的数据源
 */
export const RealseePluginDataSourceMap: Record<string, RealseePluginDataSourceType> = {
  /**
   * 以下同时依赖户型图
   */
  PanoFloorplanRadarPlugin: 'FloorplanPlugin',
  ModelFloorplanPlugin: 'FloorplanPlugin',
  TopviewFloorplanPlugin: 'FloorplanPlugin',

  /**
   * 以下不依赖数据
   */
  ModelViewPlugin: false,
  ModelChassisCompassPlugin: false,

  /**
   * 其余的走默认接口请求
   */
}
