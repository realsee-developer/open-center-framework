import { RoomInfo, RoomRules, PanoRulerPlugin } from '@realsee/dnalogel'
import { unsafe__useFiveInstance, useFiveEventCallback } from '@realsee/five/react'

export interface PanoRulerPluginData {
  pano_ruler_data: {
    roomInfo: RoomInfo
    roomRules: RoomRules
  }
}

export interface PanoRulerPropTypes {
  data: PanoRulerPluginData
}

const PanoRulerPluginUse = ({ data }: PanoRulerPropTypes) => {
  const five = unsafe__useFiveInstance()
  const panoRulerPlugin = five.plugins.panoRulerPlugin as ReturnType<typeof PanoRulerPlugin>

  useFiveEventCallback(
    'modelLoaded',
    async () => {
      if (!data.pano_ruler_data.roomInfo || !data.pano_ruler_data.roomRules) return

      await panoRulerPlugin.load(data.pano_ruler_data.roomInfo, data.pano_ruler_data.roomRules, {
        distanceText: (distance) => `约 ${distance.toFixed(1)}米`,
      })
    },
    [data],
  )

  return null
}

export default PanoRulerPluginUse
