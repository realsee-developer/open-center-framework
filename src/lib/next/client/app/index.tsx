import { NextPage } from 'next'
import Error from 'next/error'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { RealseeSpaceConfig } from '@/lib/core/typings/RealseeSpaceConfig'
import { RealseeSpaceMeta, RealseeSpaceProps } from '@/lib/core/typings/RealseeSpaceProps'
import { requestRealseeApi } from '../utils/request'
import { apis } from '../config/apis'
import { defaultRealseeSpaceConfig } from '@/lib/core/configs/defaultRealseeSpaceConfig'
import parseQueryParams from '@/lib/core/utils/parseQueryParams'
import { FiveInitArgs, Work } from '@realsee/five'

/**
 * 动态引入space模块
 */
const DynamicRealseeSpaceWithNoSSR = dynamic(() => import('@/lib/react/apps/Space'), { ssr: false })

/**
 * 判断vr的状态
 * @param props
 * @returns
 */
const RealseeSpaceContent: FC<RealseeSpaceProps> = (props) =>
  props.meta?.code === 0 ? (
    <DynamicRealseeSpaceWithNoSSR {...props} />
  ) : (
    <Error statusCode={500} title={props.meta?.status} />
  )

/**
 * 三维空间渲染。
 * @category Next.js
 */
export const RealseeSpace: NextPage<RealseeSpaceProps> = (props) => <RealseeSpaceContent {...props} />

export interface getRealseeSpacePropsOptions {
  // 注入用户自己的配置
  getConfig?: (defaultConfig: RealseeSpaceConfig, originConfig: RealseeSpaceConfig) => RealseeSpaceConfig
}

export const getSpaceProps = async (options?: getRealseeSpacePropsOptions): Promise<{ props: RealseeSpaceProps }> => {
  const params = parseQueryParams()

  const { realseeSpaceConfig, realseeEntityData, realseeEntityMeta } = await Promise.allSettled([
    requestRealseeApi<RealseeSpaceConfig>(apis.realseeVrSpaceConfig, params),
    requestRealseeApi<Work>(apis.realseeVrEntityData, params),
    requestRealseeApi<RealseeSpaceMeta>(apis.realseeVrEntityMeta, params),
  ]).then((resultArray: any[]) => {
    const [config, data, meta] = resultArray
    return {
      realseeSpaceConfig:
        config.status === 'fulfilled' && config.value !== undefined ? config.value?.center || config.value : {},
      realseeEntityData: data.status === 'fulfilled' && data.value !== undefined ? data.value : {},
      realseeEntityMeta: meta.status === 'fulfilled' && meta.value !== undefined ? meta.value : {},
    }
  })

  const props: RealseeSpaceProps = {
    meta: { code: realseeEntityData.code || 0, vrCode: params.vrCode, ...realseeEntityMeta },
    work: realseeEntityData,
    config:
      typeof options?.getConfig === 'function'
        ? options.getConfig(defaultRealseeSpaceConfig, realseeSpaceConfig)
        : Object.assign(defaultRealseeSpaceConfig, realseeSpaceConfig),
  }

  // 处理一下five的优化

  const fiveInitArgs: Partial<FiveInitArgs> = {}

  // 1、imageSize读接口
  if (props?.config?.ImageOptionSize) {
    fiveInitArgs.imageOptions = { size: realseeSpaceConfig.ImageOptionSize }
  }

  // autoResize读接口配置
  if (props?.meta?.five?.notTextureResize) {
    fiveInitArgs.textureOptions = { autoResize: false }
  }

  // 根据模型类型优化贴图
  if (!fiveInitArgs.textureOptions) {
    fiveInitArgs.textureOptions = {
      size: /at3d$/.test((props?.work?.model as any)?.file_url || '') ? 512 : 64,
      quality: 70,
    }
  }

  props.fiveInitArgs = fiveInitArgs

  return {
    props,
  }
}
