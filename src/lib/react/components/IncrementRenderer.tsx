import { RealseeSpaceProps } from '@/lib/core/typings/RealseeSpaceProps'
import { apis } from '@/lib/next/client/config/apis'
import { requestRealseeApi } from '@/lib/next/client/utils/request'
import { PanoCircleMesh, Work } from '@realsee/five'
import { unsafe__useFiveInstance, useFiveEventCallback, useFiveWork } from '@realsee/five/react'
import { useState, useRef, useEffect, useCallback } from 'react'

const useWork = (props?: RealseeSpaceProps): [Work | undefined, boolean, number[]] => {
  const [work, setWork] = useState<Work | undefined>()
  const [done, setDone] = useState<boolean>(Boolean(props?.meta.status === 'RENDER_DONE'))
  const [needRenderObservers, setNeedRenderObservers] = useState<number[]>([])

  const animationFrameId = useRef<number | undefined>()

  const cancelAnimationFrameIfNeed = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current)
      animationFrameId.current = undefined
    }
  }, [])

  const startPolling = useCallback(
    (vrCode: string) => {
      cancelAnimationFrameIfNeed()
      // 轮询
      const polling = async () => {
        const meta = await requestRealseeApi(apis.realseeVrEntityMeta, { vrCode })
        await new Promise((resolve) => setTimeout(resolve, 2000))

        if (meta.status === 'RENDER_PART_DONE' || meta.status === 'RENDER_DONE') {
          const originWork = await requestRealseeApi(apis.realseeVrEntityData, { vrCode })
          // 强行劫持 panoMesh
          const observers = originWork.observers
          const panorama = originWork.panorama
          if (panorama.count !== observers.length) {
            // 未完全渲染
            const needRenderObservers: number[] = []
            observers.forEach((observer: any, index: number) => {
              if (!originWork.panorama.list[index]) {
                originWork.panorama.list[index] = {
                  ...originWork.panorama.list[0],
                  loadable: true,
                  active: true,
                  disable: false,
                }
                needRenderObservers.push(index)
              }
            })
            setNeedRenderObservers(needRenderObservers)
          }
          setWork(originWork)
        }

        // 只要不是 RENDER_DONE 就轮询
        if (meta.status === 'RENDER_DONE') {
          cancelAnimationFrameIfNeed()
        } else {
          animationFrameId.current = requestAnimationFrame(polling)
        }
        setDone(meta.status === 'RENDER_DONE')
      }
      animationFrameId.current = requestAnimationFrame(polling)
    },
    [cancelAnimationFrameIfNeed],
  )

  useEffect(() => {
    // 渲染未完成
    if (props?.meta?.status !== 'RENDER_DONE' && props?.meta?.vrCode) {
      console.log(props?.meta)
      startPolling(props?.meta?.vrCode)
    }
  }, [props?.meta, startPolling])

  return [work, done, needRenderObservers]
}

export const IncrementRenderer = ({ props, onFinished }: { props: RealseeSpaceProps; onFinished: () => void }) => {
  const [work, done, needRenderObservers] = useWork(props)
  const [, loadFiveWork] = useFiveWork()
  const five = unsafe__useFiveInstance()

  useEffect(() => {
    if (work) {
      loadFiveWork(work)
    }
  }, [work, loadFiveWork])

  useEffect(() => {
    if (done) {
      onFinished?.()
    }
  }, [done, onFinished])

  useFiveEventCallback(
    'wantsMoveToPano',
    (panoIndex: number) => {
      if (needRenderObservers.includes(panoIndex)) {
        return false
      }
    },
    [needRenderObservers],
  )

  useFiveEventCallback(
    'panoWillArrive',
    () => {
      const panoMeshes = (five as unknown as any)?.helperGroup.children
      panoMeshes.forEach((mesh: PanoCircleMesh) => {
        if (needRenderObservers.find((index) => mesh.name.endsWith(`_${index}`))) {
          // 需要被loading
          mesh?.setLoading?.(true)
        } else {
          // mesh.setLoading(false)
          mesh?.setLoading?.(false)
        }
      })
    },
    [needRenderObservers],
  )

  return <></>
}
