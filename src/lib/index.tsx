import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { RealseeSpaceConfig } from './core/typings/RealseeSpaceConfig'
import { RealseeSpaceProps } from './core/typings/RealseeSpaceProps'
import { getSpaceProps } from './next/client/app'

/**
 * 动态引入space模块
 */
const DynamicRealseeSpace = dynamic(() => import('./react/apps/Space'), { ssr: false })

/**
 * 判断vr的状态
 * @param props
 * @returns
 */

/**
 * 三维空间渲染。
 * @category Next.js
 */
export const RealseeSpace: NextPage<RealseeSpaceProps> = DynamicRealseeSpace

export interface getRealseeSpacePropsOptions {
  // 注入用户自己的配置
  getConfig?: (defaultConfig: RealseeSpaceConfig, originConfig: RealseeSpaceConfig) => RealseeSpaceConfig
}

export const getRealseeSpaceProps = getSpaceProps
