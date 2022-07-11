import defaultFiveInitArgs from '@/lib/core/configs/defaultFiveInitArgs'
import { RealseeSpaceProps } from '@/lib/core/typings/RealseeSpaceProps'
import { mergeFiveInitArgs } from '@/lib/core/utils/five/mergeFiveInitArgs'
import logger from '@/lib/core/utils/logger'
import { createFiveProvider } from '@realsee/five/react'
import { useEffect, useMemo, useState } from 'react'
import { IncrementRenderer } from '../../components/IncrementRenderer'
import { ResponsiveFiveCanvas } from '../../components/ResponsiveFiveCanvas'
import { FivePluginUse } from '../../plugins'

/**
 * 三维空间展示：纯客户端渲染。
 * @category NoSSRApp
 */
export const Space: React.FC<RealseeSpaceProps> = (props) => {
  const [renderDone, setRenderDone] = useState<boolean>(Boolean(props.meta.status === 'RENDER_DONE'))

  useEffect(() => {
    logger.info('初始化配置：', props.config)
  }, [props.config])

  const FiveProvider = useMemo(() => {
    const initArgs = mergeFiveInitArgs(defaultFiveInitArgs, props.fiveInitArgs || {})
    logger.info('five 默认初始化参数', defaultFiveInitArgs)
    logger.info('five 自定义初始化参数', props.fiveInitArgs)
    logger.info('five 初始化参数', initArgs)
    return createFiveProvider(initArgs)
  }, [props.fiveInitArgs])

  return (
      <FiveProvider initialWork={props.work} ref={(ref) => Object.assign(window, { $five: ref?.five })}>
            {/* five 使用的区域 */}
            <ResponsiveFiveCanvas />
            <>
              {/* 用户应用的区域 */}
              {props.children}
            </>
            <>
              {/* 以下为 attachments 内容 */}
              {renderDone && <FivePluginUse props={props}></FivePluginUse>}
              <IncrementRenderer props={props} onFinished={() => setRenderDone(true)} />
            </>
            <>
              {/* live 逻辑相关 */}
            </>
      </FiveProvider>
  )
}

export default Space
