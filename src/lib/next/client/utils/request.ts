import { RealseeApiResponse } from '@/lib/core/typings/RealseeApi'
import logger from '@/lib/core/utils/logger'
import parseQueryParams from '@/lib/core/utils/parseQueryParams'
import axios, { AxiosResponse } from 'axios'

/**
 * 提供给前端调用api的请求
 */
export async function requestRealseeApi<R = any>(url: string, data: any = {}) {
  const commonParams = parseQueryParams()
  const headers: Record<string, string> = {
    'Content-type': 'application/json; charset=utf-8',
  }

  if (commonParams.accessToken) {
    headers['X-Realsee-AccessToken'] = commonParams.accessToken
  }

  if (commonParams.vrCode) {
    headers['X-Realsee-VrCode'] = commonParams.vrCode
  }

  const res = await axios.post<any, AxiosResponse<RealseeApiResponse<R>>>(url, data, { headers }).then((res) => {
    logger.info('requestRealseeApi', { request: { url, headers, data }, response: res.data })
    return res.data
  })

  const { code, message } = res

  if (code === 0) {
    return res.data
  } else {
    throw new Error(message || 'requestApi failed')
  }
}
