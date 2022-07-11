import React from 'react'
import { Five } from '@realsee/five'
import classNames from 'classnames'
import {
  unsafe__useFiveInstance,
  useFiveEventCallback,
  useFiveModelReadyState,
  useFiveState,
} from '@realsee/five/react'
import type { Mode } from '@realsee/five'

import { PanoFloorplanRadarPlugin, FloorplanServerData } from '@realsee/dnalogel'

import styles from './index.module.scss'
import { useFivePlugin } from '@/lib/react/hooks/useFivePlugin'

export interface PanoFloorplanRadarPropTypes {
  floorplanServerData?: FloorplanServerData
  mode: Mode
}

/**
 * 全景户型雷达图（右上角）。
 * @category Modules
 * @see [@realsee/dnalogel/libs/floorplan/PanoFloorplanRadarPlugin](https://open-platform.realsee.com/developer/docs/front/3d-space/advanced/dnalogel/floorplan/PanoFloorplanRadarPlugin)。
 */
export const PanoFloorplanRadarPluginUse = (props: PanoFloorplanRadarPropTypes) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(true)
  const five = unsafe__useFiveInstance()
  const [, setFiveState] = useFiveState()
  const fiveModelReadyState = useFiveModelReadyState()

  const panoFloorplanRadar = useFivePlugin<typeof PanoFloorplanRadarPlugin>('panoFloorplanRadarPlugin')

  React.useEffect(() => {
    if (!ref.current) return
    if (!props.floorplanServerData) return
    panoFloorplanRadar.appendTo(ref.current)
    panoFloorplanRadar.load(props.floorplanServerData)
  }, [panoFloorplanRadar, props.floorplanServerData])

  useFiveEventCallback('modeChange', (mode) => {
    if (mode !== Five.Mode.Panorama) {
      return setVisible(false)
    }
    five.once('initAnimationEnded', () => {
      setVisible(true)
    })
  })

  return (
    <div
      ref={ref}
      onClick={() => {
        setFiveState({ mode: props.mode })
      }}
      className={classNames(styles['five-PanoFloorplanRadarPlugin'], {
        [styles['five-PanoFloorplanRadarPlugin--visible']]:
          visible && fiveModelReadyState === 'Loaded' && props.floorplanServerData,
      })}
    />
  )
}

export default PanoFloorplanRadarPluginUse
