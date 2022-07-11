import {
  PanoCompassPluginData,
  ModelEntryDoorGuidePluginData,
  ModelRoomLabelPluginData,
  ModelChassisCompassPluginData,
} from '@realsee/dnalogel'
import { FloorplanServerData } from '@realsee/dnalogel/dist/floorplan/typings/floorplanServerData'
import { FiveInitArgs, Work } from '@realsee/five'
import { PanoRulerPluginData } from '../../react/plugins/use/PanoRulerPluginUse'
import { RealseeSpaceConfig } from './RealseeSpaceConfig'

export interface RealseeSpaceMeta {
  code: number
  vrCode: string
  detail: {
    create_time: string
    name: string
    picture_url: string
  }
  five?: Record<any, any>
  original: {
    bg_image: string
    name: string
    principle: string
  }
  status: string
}

export interface RealseeSpaceProps {
  meta: RealseeSpaceMeta
  work: Work
  config: RealseeSpaceConfig & { ImageOptionSize?: number }
  fiveInitArgs?: Omit<FiveInitArgs, 'renderer' | 'scissor'> | undefined
}

export interface RealseePluginData {
  FloorplanPlugin?: FloorplanServerData
  PanoRulerPlugin?: PanoRulerPluginData
  PanoCompassPlugin?: PanoCompassPluginData
  ModelEntryDoorGuidePlugin?: ModelEntryDoorGuidePluginData
  ModelRoomLabelPlugin?: ModelRoomLabelPluginData
  ModelChassisCompassPlugin?: ModelChassisCompassPluginData
}
