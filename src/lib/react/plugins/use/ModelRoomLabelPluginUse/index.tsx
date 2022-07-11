import React from 'react'
import { unsafe__useFiveInstance, useFiveEventCallback, useFiveModelReadyState } from '@realsee/five/react'
import { ModelRoomLabelPluginData } from '@realsee/dnalogel'
import classNames from 'classnames'
import styles from './index.module.scss'

export interface ModelRoomLabelPluginShowPropTypes {
  data?: ModelRoomLabelPluginData
}

const ModelRoomLabelPluginUse = (props: ModelRoomLabelPluginShowPropTypes) => {
  const five = unsafe__useFiveInstance()
  const fiveModeReadyState = useFiveModelReadyState()
  const modelRoomLabelPluginRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (modelRoomLabelPluginRef.current && five.plugins.modelRoomLabelPlugin) {
      five.plugins.modelRoomLabelPlugin.appendTo(modelRoomLabelPluginRef.current)
    }
  }, [five.plugins.modelRoomLabelPlugin])

  useFiveEventCallback(
    'modelLoaded',
    () => {
      if (!props.data) return
      five.plugins.modelRoomLabelPlugin.load(props.data)
    },
    [props.data],
  )

  return (
    <div
      ref={modelRoomLabelPluginRef}
      className={classNames(styles['five-ModelRoomLabelPlugin'], {
        [styles['five-ModelRoomLabelPlugin--visible']]: fiveModeReadyState === 'Loaded',
      })}
    />
  )
}

export default ModelRoomLabelPluginUse
