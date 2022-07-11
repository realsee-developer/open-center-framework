import React from 'react'
import { unsafe__useFiveInstance, useFiveEventCallback, useFiveModelReadyState } from '@realsee/five/react'
import { ModelChassisCompassPluginData } from '@realsee/dnalogel'

export interface ModelChassisCompassPluginUsePropTypes {
  data?: ModelChassisCompassPluginData
}

const ModelChassisCompassPluginUse = (props: ModelChassisCompassPluginUsePropTypes) => {
  const five = unsafe__useFiveInstance()
  const fiveModeReadyState = useFiveModelReadyState()
  const modelChassisCompassPluginRef = React.useRef<HTMLDivElement>(null)

  useFiveEventCallback(
    'modelLoaded',
    () => {
      if (!props.data || JSON.stringify(props.data) === '{}') return
      five.plugins.modelChasissCompassPlugin.load(props.data)
    },
    [props.data],
  )
  
  return (
    <>
      {fiveModeReadyState === 'Loaded' && (
        <div
          ref={modelChassisCompassPluginRef}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          className="five-ModelRoomLabelPlugin"
        />
      )}
    </>
  )
}

export default ModelChassisCompassPluginUse
