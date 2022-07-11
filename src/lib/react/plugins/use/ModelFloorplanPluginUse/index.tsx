import React from 'react'
import { useFiveEventCallback, useFiveState } from '@realsee/five/react'
import { Five } from '@realsee/five'
import { ModelFloorplanPlugin, FloorplanServerData } from '@realsee/dnalogel'
import { useFivePlugin } from '@/lib/react/hooks/useFivePlugin'

export interface ModelFloorplanProps {
  floorplanServerData: FloorplanServerData
}

/**
 * 模型户型图插件。
 * @category Modules
 * @see [@realsee/dnalogel/libs/floorplan/ModelFloorplanPlugin](https://open-platform.realsee.com/developer/docs/front/3d-space/advanced/dnalogel/floorplan/ModelFloorplanPlugin)。
 */
export function ModelFloorplanPluginUse(props: ModelFloorplanProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [fiveState] = useFiveState()
  const modelFloorplan = useFivePlugin<typeof ModelFloorplanPlugin>('modelFloorplanPlugin')

  React.useEffect(() => {
    if (ref.current) {
      modelFloorplan.appendTo(ref.current)
      modelFloorplan.load(props.floorplanServerData)
      return () => {
        modelFloorplan.dispose()
      }
    }
  }, [props.floorplanServerData, modelFloorplan])

  useFiveEventCallback(
    'initAnimationEnded',
    () => {
      if (fiveState.mode === Five.Mode.Floorplan) {
        modelFloorplan.show()
      }
    },
    [fiveState.mode],
  )

  return (
    <div
      className="five-ModelFloorplanPlugin"
      ref={ref}
      style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, .9)' }}
    ></div>
  )
}
