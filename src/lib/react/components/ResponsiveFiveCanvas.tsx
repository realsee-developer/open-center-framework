import { debounce } from '@/lib/core/utils/debounce'
import { FiveCanvas } from '@realsee/five/react'
import React from 'react'

/**
 * 响应式 **FiveCanvas** 。
 *
 * @description 会根据父 DOM 宽高变化自适应 `Five` 画布面板。
 */
export function ResponsiveFiveCanvas() {
  const [size, setSize] = React.useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!ref.current) return

    setSize({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    })

    const updateState = debounce(({ width, height }) => {
      setSize({ width, height })
    })
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      const width = entry.contentRect.width
      const height = entry.contentRect.height

      updateState({ width, height })
    })

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current)
      }
      observer.disconnect()
    }
  }, [])

  return (
    <div
      className="ResponsiveFiveCanvas"
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 0,
        opacity: size.width === 0 || size.height === 0 ? 0 : 1,
        pointerEvents: 'auto',
      }}
    >
      <FiveCanvas width={size.width} height={size.height} />
    </div>
  )
}
