import {
  PanoFloorplanRadarPlugin,
  ModelViewPlugin,
  PanoMeasurePlugin,
  ModelFloorplanPlugin,
  FLOOR_PLAN_ATTACHED_TO,
  TopviewFloorplanPlugin,
  PanoRulerPlugin,
  PanoCompassPlugin,
  ModelEntryDoorGuidePlugin,
  ModelRoomLabelPlugin,
  ModelChassisCompassPlugin,
} from '@realsee/dnalogel'
import { FiveInitArgs } from '@realsee/five'

/**
 * five 默认初始化配置
 */
const defaultFiveInitArgs: FiveInitArgs = {
  imageOptions: { size: 2048, quality: 70 },
  textureOptions: { quality: 70 },
  floorplan: {
    minLatitude: 0,
    maxLatitude: Math.PI / 2,
    defaultFov: 80,
  },
  panorama: {
    minLatitude: -Math.PI / 4,
    maxLatitude: Math.PI / 4,
  },
  onlyRenderIfNeeds: true,
  initialBasisLoader: false,
  plugins: [
    [
      PanoFloorplanRadarPlugin,
      'panoFloorplanRadarPlugin',
      {
        hoverEnable: true,
      },
    ],
    [ModelViewPlugin, 'modelViewPlugin', {}],
    [
      PanoMeasurePlugin,
      'panoMeasurePlugin',
      {
        useGuideController: false,
        useUIController: true,
        openParams: { isMobile: false },
        magnifierParams: {
          height: 120,
          scale: 2,
          width: 120,
          dragEnabled: true,
          autoFixPCPosition: false,
          initialPosition: { left: '35%', top: '20%' },
        },
      },
    ],
    [
      ModelFloorplanPlugin,
      'modelFloorplanPlugin',
      {
        attachedTo: FLOOR_PLAN_ATTACHED_TO.CEILING,
        // modelOpacity: 0.1,
      },
    ],
    [TopviewFloorplanPlugin, 'topviewFloorplanPlugin', {}],
    [PanoRulerPlugin, 'panoRulerPlugin', {}],
    [PanoCompassPlugin, 'panoCompassPlugin', {}],
    [ModelEntryDoorGuidePlugin, 'modelEntryDoorGuidePlugin', {}],
    [ModelRoomLabelPlugin, 'modelRoomLabelPlugin', {}],
    [ModelChassisCompassPlugin, 'modelChassisCompassPlugin', {}],
  ]
}

export default defaultFiveInitArgs
