/**
 * **RealseeSpaceConfig**：通过 `/open/v1/facade/config` 接口下发页面的功能配置。
 *
 * **所有配置均支持在路由以 `query` 的形式提供，且 `query` 的优先级更高——会覆盖 `config` 接口下发的配置**。
 *
 * > 注意事项：如果配置了相关参数，但依赖的数据异常，可能会造成页面无法正常使用相应的功能模块，建议在用 `query` 进行配置时保证对应的数据依赖是存在的。
 */
export interface RealseeSpaceConfig {
  /**
   * 右上角：户型雷达图。
   *
   * 会请求 `/open/v1/plugin/FloorplanPlugin` 数据。
   */
  PanoFloorplanRadarPlugin: boolean
  /**
   * 模型户型图。
   * 会请求 `/open/v1/plugin/FloorplanPlugin` 数据。
   */
  ModelFloorplanPlugin: boolean
  /**
   * 模型户型图。
   * 会请求 `/open/v1/plugin/FloorplanPlugin` 数据。
   */
  TopviewFloorplanPlugin: boolean
  /**
   * 右上角：”小窗“ 模型，与 `PanoFloorplanRadar` 配置冲突，`PanoFloorplanRadar` 优先级更**高**。
   */
  ModelViewPlugin: boolean
  /**
   * 全景标尺
   *
   * 会请求 `/open/v1/plugin/PanoRulerPlugin` 数据
   */
  PanoRulerPlugin: boolean
  /**
   * 全景指南针
   *
   * 会请求 `/open/v1/plugin/PanoCompassPlugin` 数据
   */
  PanoCompassPlugin: boolean
  /**
   * 模型入户门
   *
   * 会请求 `/open/v1/plugin/ModelEntryDoorGuidePlugin`
   * */
  ModelEntryDoorGuidePlugin: boolean
  /**
   * 模型分间标签
   *
   * 会请求 `/open/v1/plugin/ModelRoomLabelPlugin`
   * */
  ModelRoomLabelPlugin: boolean
  /**
   * 模型地盘指南针
   *
   * 暂无请求接口，需要核对
   * */
  ModelChassisCompassPlugin: boolean
}
