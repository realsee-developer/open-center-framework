/**
 * 这是一个示例 APP
 */
import { Five } from '@realsee/five'
import { RealseeSpaceProps } from '@/lib/core/typings/RealseeSpaceProps'
import PanoFloorplanRadarPluginUse from './plugin/use/PanoFloorplanRadarPluginUse'
import style from './style.module.scss'
import ModelViewPanel from './module/panel/ModelViewPanel'
import { useFivePluginData } from '@/lib/react/hooks/useFivePluginData'

interface ExampleProps {
  realseeSpaceProps: RealseeSpaceProps
}

const Example = ({ realseeSpaceProps }: ExampleProps) => {
  const floorplanServerData = useFivePluginData('ModelFloorplanPlugin')

  return (
    <div className={style.exampleApp}>
      <>
        {/* 插件使用层 */}
        {/** 右上角的雷达户型图 */}
        {realseeSpaceProps.config.ModelFloorplanPlugin && floorplanServerData && (
          <PanoFloorplanRadarPluginUse mode={Five.Mode.Floorplan} floorplanServerData={floorplanServerData} />
        )}
      </>
      <>
        {/** 面板 */}
        {/** 模型视图 */}
        <ModelViewPanel></ModelViewPanel>
      </>
    </div>
  )
}

export default Example
