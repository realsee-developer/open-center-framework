import { unsafe__useFiveInstance, useFiveEventCallback } from '@realsee/five/react'

function PanoCompassPluginUse(props: { data: any }) {
  const five = unsafe__useFiveInstance()

  useFiveEventCallback(
    'modelLoaded',
    async () => {
      if (!props.data || JSON.stringify(props.data) === '{}') return

      // 载入朝北数据
      await five.plugins.panoCompassPlugin.load(props.data)
    },
    [props.data],
  )

  return null
}

export default PanoCompassPluginUse
