import { useFivePlugin } from '@/lib/react/hooks/useFivePlugin'
import { FloorplanServerData, TopviewFloorplanPlugin } from '@realsee/dnalogel'

import React from 'react'

export interface ModelFloorplanProps {
  floorplanServerData: FloorplanServerData
}

/**
 * 模型户型图插件。
 * @category Modules
 * @see [@realsee/dnalogel/libs/floorplan/ModelFloorplanPlugin](https://open-platform.realsee.com/developer/docs/front/3d-space/advanced/dnalogel/floorplan/ModelFloorplanPlugin)。
 */
export function TopviewFloorplanPluginUse(props: ModelFloorplanProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const topviewFloorplan = useFivePlugin<typeof TopviewFloorplanPlugin>('topviewFloorplanPlugin')

  React.useEffect(() => {
    if (ref.current) {
      topviewFloorplan.appendTo(ref.current)
      topviewFloorplan.load(props.floorplanServerData)

      return () => {
        topviewFloorplan.dispose()
      }
    }
  }, [props.floorplanServerData, topviewFloorplan])

  return (
    <div
      className="five-TopviewFloorplanPlugin"
      ref={ref}
      style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
    />
  )
}
