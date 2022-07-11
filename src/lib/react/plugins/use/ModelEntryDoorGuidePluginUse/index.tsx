import { unsafe__useFiveInstance, useFiveEventCallback } from '@realsee/five/react'

const ModelEntryDoorGuidePluginUse = (props: { data: any }) => {
  const five = unsafe__useFiveInstance()

  useFiveEventCallback(
    'modelLoaded',
    async () => {
      if (!props.data || JSON.stringify(props.data) === '{}') return

      const pluginData = {
        fbx_url: '//vrlab-image4.ljcdn.com/release/web/entryDoorMini/Anim_Door1.fbx',
        position: props.data?.position,
        rad: props.data?.rad,
      }
      await five.plugins.modelEntryDoorGuidePlugin.load(pluginData)

      // 显示入户门
      five.plugins.modelEntryDoorGuidePlugin.enable({ animationEnable: false })
    },
    [props.data],
  )

  return null
}

export default ModelEntryDoorGuidePluginUse
