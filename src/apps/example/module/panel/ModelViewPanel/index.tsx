import { useFivePlugin } from '@/lib/react/hooks/useFivePlugin'
import { ModelRoomLabelPlugin, ModelFloorplanPlugin } from '@realsee/dnalogel'
import { useFiveEventCallback } from '@realsee/five/react'
import classNames from 'classnames'
import { useState, useCallback, useEffect } from 'react'
import styles from './index.module.scss'

const ModelViewPanel = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [floorplanShow, setFloorplanShow] = useState(false)

  // 控制面板展示
  useFiveEventCallback(
    'modeChange',
    (mode) => {
      setVisible(mode === 'Floorplan')
    },
    [setVisible],
  )

  // 模型标签插件
  const modelRoomLabelPlugin = useFivePlugin<typeof ModelRoomLabelPlugin>('modelRoomLabelPlugin')

  // 户型图与模型直接的展示
  const modelFloorplan = useFivePlugin<typeof ModelFloorplanPlugin>('modelFloorplanPlugin')

  const handleModelFloorplanShow = useCallback(() => {
    // 户型图展示
    setFloorplanShow(true)
    modelRoomLabelPlugin?.disable()
  }, [modelRoomLabelPlugin])

  useEffect(() => {
    modelFloorplan.hooks.on('showAnimationEnded', handleModelFloorplanShow)
    return () => {
      modelFloorplan.hooks.off('showAnimationEnded', handleModelFloorplanShow)
    }
  }, [handleModelFloorplanShow, modelFloorplan.hooks])

  const handleModelFloorplanHide = useCallback(() => {
    // 户型图消失
    setFloorplanShow(false)
    modelRoomLabelPlugin?.enable()
  }, [modelRoomLabelPlugin])

  useEffect(() => {
    modelFloorplan.hooks.on('hide', handleModelFloorplanHide)
    return () => {
      modelFloorplan.hooks.off('hide', handleModelFloorplanHide)
    }
  }, [handleModelFloorplanHide, modelFloorplan.hooks])

  // 点击事件处理
  const handleFloorplanClick = useCallback(() => {
    // modelFloorplan 下展示户型图
    modelFloorplan?.show()
  }, [modelFloorplan])

  const handleModelClick = useCallback(() => {
    // modelFloorplan 下隐藏户型图
    modelFloorplan?.hide()
  }, [modelFloorplan])

  return (
    <>
      <div
        className={classNames(styles['model-panel-wrapper'], {
          [styles['model-panel-wrapper--visible']]: visible,
        })}
      >
        <div className={styles['model-panel-content']}>
          <div className={styles['model-panel__header']}>
            <div className={styles['model-panel-btn']} onClick={handleFloorplanClick}>
              <div
                className={classNames(styles['btn-desc'], styles['btn-desc--topview'], {
                  [styles['active']]: floorplanShow,
                })}
              >
                参考户型
              </div>
            </div>
            <div className={styles['model-panel-btn']} onClick={handleModelClick}>
              <div
                className={classNames(styles['btn-desc'], styles['btn-desc--floorplan'], {
                  [styles['active']]: !floorplanShow,
                })}
              >
                三维模型
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModelViewPanel
