import { apis } from '@/lib/next/client/config/apis'
import { requestRealseeApi } from '@/lib/next/client/utils/request'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

import style from './style.module.scss'

interface VrEntity {
  create_time: string
  name: string
  vr_code: string
}

const useVrEntityList = () => {
  const [vrEntityList, setVrEntityList] = useState<VrEntity[]>([])

  const initEntityList = useCallback(async () => {
    try {
      const { list = [] } = await requestRealseeApi(apis.realseeVrEntityList)
      setVrEntityList(list)
    } catch (e) {
      console.warn(e)
    }
  }, [setVrEntityList])

  useEffect(() => {
    initEntityList()
  }, [initEntityList])

  return vrEntityList
}

export const EntityList = () => {
  const vrEntityList = useVrEntityList()

  return (
    <div className={style.wrapper}>
      <>
        {vrEntityList.length === 0 && 'Hello Realsee'}
        {vrEntityList.length > 0 && (
          <>
            <h2 className={style.title}>示例VR</h2>
            <ul>
              {vrEntityList.map((entity: VrEntity) => (
                <li key={entity.vr_code} className={style.link}>
                  <Link href={`${globalThis.location.origin}/vr/${entity.vr_code}`}>{entity.name}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    </div>
  )
}

export default EntityList
