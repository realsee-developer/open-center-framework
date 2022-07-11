import { RealseeSpaceConfig } from '@/lib/core/typings/RealseeSpaceConfig'
import { RealseePluginData, RealseeSpaceProps } from '@/lib/core/typings/RealseeSpaceProps'
import logger from '@/lib/core/utils/logger'
import parseQueryParams from '@/lib/core/utils/parseQueryParams'
import { apis } from '@/lib/next/client/config/apis'
import { requestRealseeApi } from '@/lib/next/client/utils/request'
import { Five } from '@realsee/five'
import { unsafe__useFiveInstance } from '@realsee/five/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ModelChassisCompassPluginUse from './use/ModelChassisCompassPluginUse'
import ModelEntryDoorGuidePluginUse from './use/ModelEntryDoorGuidePluginUse'
import { ModelFloorplanPluginUse } from './use/ModelFloorplanPluginUse'
import ModelRoomLabelPluginUse from './use/ModelRoomLabelPluginUse'
import { ModelViewPluginUse } from './use/ModelViewPluginUse'
import PanoCompassPluginUse from './use/PanoCompassPluginUse'
import PanoFloorplanRadarPluginUse from './use/PanoFloorplanRadarPluginUse'
import PanoRulerPluginUse from './use/PanoRulerPluginUse'
import { TopviewFloorplanPluginUse } from './use/TopviewFloorplanPluginUse'

export const FivePluginUse = ({ props }: { props: RealseeSpaceProps }) => {
  const five = unsafe__useFiveInstance()
  const [pluginData, setPluginData] = useState<RealseePluginData>()

  const initPluginData = useCallback(async () => {
    // 插件数据请求
    const params = parseQueryParams()
    const pluginData = await Promise.allSettled(
      Object.keys(props.config)
        .filter((key) => /Plugin$/.test(key))
        .filter((key) => props.config[key as keyof RealseeSpaceConfig])
        .map((pluginName) => requestRealseeApi(apis.realseeVrPluginData, { pluginName, ...params, force: true })),
    )
      .then((resultArray: any[]) =>
        resultArray
          .filter((res) => res.status === 'fulfilled' && res.value !== undefined)
          .map((re: any) => re.value)
          .reduce((a, b) => ({ ...a, ...b }), {}),
      )
      .catch((e) => logger.error('request pluginData failed', e.message || e))
    setPluginData(pluginData)
  }, [props.config])

  useEffect(() => {
    initPluginData()
  }, [initPluginData])

  const floorplanServerData = useMemo(() => pluginData?.FloorplanPlugin, [pluginData])

  const FloorplanPlugin = useMemo(
    () => Boolean(floorplanServerData) && (props.config.TopviewFloorplanPlugin || props.config.ModelFloorplanPlugin),
    [floorplanServerData, props.config.ModelFloorplanPlugin, props.config.TopviewFloorplanPlugin],
  )

  const FloorplanPluginMode = useMemo(() => {
    if (five.model.tiledModel) return  Five.Mode.Mapview
    if (FloorplanPlugin && props.config.ModelFloorplanPlugin) return Five.Mode.Floorplan
    if (FloorplanPlugin && props.config.TopviewFloorplanPlugin) return Five.Mode.Topview
    return Five.Mode.Floorplan
  }, [FloorplanPlugin, five.model.tiledModel, props.config.ModelFloorplanPlugin, props.config.TopviewFloorplanPlugin])

  const showModelPanel = useMemo(
    () => FloorplanPlugin && null !== FloorplanPluginMode,
    [FloorplanPlugin, FloorplanPluginMode],
  )

  return (
    <>
      {props.config.PanoFloorplanRadarPlugin && floorplanServerData && (
        <PanoFloorplanRadarPluginUse floorplanServerData={floorplanServerData} mode={FloorplanPluginMode} />
      )}
      {props.config.ModelViewPlugin &&
        !((props.config.PanoFloorplanRadarPlugin || props.config.TopviewFloorplanPlugin) && floorplanServerData) && (
          <ModelViewPluginUse mode={FloorplanPluginMode} />
        )}
      {props.config.ModelFloorplanPlugin && FloorplanPluginMode === Five.Mode.Floorplan && floorplanServerData && (
        <ModelFloorplanPluginUse floorplanServerData={floorplanServerData} />
      )}
      {props.config.TopviewFloorplanPlugin && FloorplanPluginMode === Five.Mode.Topview && floorplanServerData && (
        <TopviewFloorplanPluginUse floorplanServerData={floorplanServerData} />
      )}
      {props.config.PanoRulerPlugin && pluginData?.PanoRulerPlugin && (
        <PanoRulerPluginUse data={pluginData?.PanoRulerPlugin} />
      )}
      {props.config.PanoCompassPlugin && pluginData?.PanoCompassPlugin && (
        <PanoCompassPluginUse data={pluginData?.PanoCompassPlugin} />
      )}
      {props.config.ModelRoomLabelPlugin && pluginData?.ModelRoomLabelPlugin && (
        <ModelRoomLabelPluginUse data={pluginData?.ModelRoomLabelPlugin} />
      )}
      {props.config.ModelChassisCompassPlugin && pluginData?.ModelChassisCompassPlugin && (
        <ModelChassisCompassPluginUse data={pluginData?.ModelChassisCompassPlugin} />
      )}
      {props.config.ModelEntryDoorGuidePlugin && pluginData?.ModelEntryDoorGuidePlugin && (
        <ModelEntryDoorGuidePluginUse data={pluginData?.ModelEntryDoorGuidePlugin} />
      )}
    </>
  )
}
