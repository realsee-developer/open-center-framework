import React from 'react'
import classNames from 'classnames'
import { Five } from '@realsee/five'
import type { Mode } from '@realsee/five'

import {
  useFiveState,
  useFiveEventCallback,
  useFiveModelReadyState,
  unsafe__useFiveInstance,
} from '@realsee/five/react'

import styles from './index.module.scss'
import { ModelViewPlugin } from '@realsee/dnalogel'
import { useFivePlugin } from '@/lib/react/hooks/useFivePlugin'

type ModelViewPluginUseProps = { mode: Mode }

/**
 * "小窗"模型（右上角）。
 * @category Modules
 * @see [@realsee/dnalogel/libs/ModelViewPlugin](https://open-platform.realsee.com/developer/docs/front/3d-space/advanced/dnalogel/ModelViewPlugin/)。
 */
export const ModelViewPluginUse = ({ mode }: ModelViewPluginUseProps) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(true)
  const five = unsafe__useFiveInstance()
  const [, setFiveState] = useFiveState()
  const fiveModelReadyState = useFiveModelReadyState()

  const modelView = useFivePlugin<typeof ModelViewPlugin>('modelViewPlugin')

  React.useEffect(() => {
    if (ref.current) {
      modelView.appendTo(ref.current)
    }
  }, [modelView, ref.current])

  useFiveEventCallback('modeChange', (mode) => {
    if (mode !== Five.Mode.Panorama) {
      return setVisible(false)
    }
    five.once('initAnimationEnded', () => {
      setVisible(true)
    })
  })

  const handleClick = () => {
    setFiveState({  mode })
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={classNames(styles['five-ModelViewPlugin'], {
        [styles['five-ModelViewPlugin--visible']]: visible && fiveModelReadyState === 'Loaded',
      })}
    />
  )
}
