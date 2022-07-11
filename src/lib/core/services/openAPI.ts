import axios, { AxiosResponse } from 'axios'
import { realseeAccessToken, realseeGateway } from '../apis/gateway'
import { APP_KEY, APP_SECRET } from '../configs/gateway'
import { RealseeSpaceCommonParams } from '../typings/RealseeSpaceCommonParams'
import logger from '../utils/logger'

type IFetchData = RealseeSpaceCommonParams & {
  accessToken?: string
} & Record<string, any>

type OpenAPIResponse<D = any> = {
  request_id: string
  trace_id: string
  business_code: string
  osi_request_id: string
  code: number
  status: string
  data: D
  cost: number
}

enum IRequestMethod {
  POST = 'post',
  GET = 'get',
  OPTIONS = 'options',
  PUT = 'put',
  DELETE = 'delete',
}

interface IRequestParams {
  url: string
  method: IRequestMethod
  data: IFetchData
}

const appKey = APP_KEY
const appSecret = APP_SECRET

const tokenCache = {
  timestamp: 0,
  token: '',
  expired: 5 * 60 * 1000 - 300, // accessToken 有效时间是 5min，5min 内可不重复请求
}

const getAccessToken = async () => {
  const now = Date.now()
  if (!(tokenCache.token && now - tokenCache.timestamp < tokenCache.expired)) {
    // 不在有效期内
    const res = await axios
      .post<OpenAPIResponse<{ access_token: string }>>(realseeAccessToken, {
        app_key: appKey,
        app_secret: appSecret,
      })
      .then((res) => res.data)

    if (res.code === 0 && res.data.access_token) {
      tokenCache.timestamp = Date.now()
      tokenCache.token = res.data.access_token
    } else {
      throw new Error(res.status || 'get access token failed !')
    }
  }
  return tokenCache.token
}

const request = async <R = any>({ url, data, method }: IRequestParams): Promise<OpenAPIResponse<R>> => {
  if (!/^http(s)?:\/\//.test(url)) {
    url = `${realseeGateway}${/^\//.test(url) ? url : '/' + url}`
  }
  const { vrCode, accessToken, ...restData } = data
  const Authorization = accessToken || (await getAccessToken())
  const requestData = {
    vr_code: vrCode,
    ...restData,
  }

  const config = {
    url,
    method,
    data: method === IRequestMethod.POST ? requestData : null,
    params: method === IRequestMethod.GET ? requestData : null,
    headers: {
      Authorization,
      'Content-type': 'application/json; charset=utf-8',
    },
  }

  return await axios.request<any, AxiosResponse<OpenAPIResponse<R>>>(config).then((res) => {
    logger.info('request open api', {
      request: config,
      response: JSON.stringify(res.data),
    })
    return res.data
  })
}

/**
 * GET 请求
 * @param path
 * @param query
 */
export const get = async <R = any>(url: string, data: IFetchData) =>
  await request<R>({ url, method: IRequestMethod.GET, data })

/**
 * POST 请求
 * @param path
 * @param param
 */
export const post = async <R = any>(url: string, data: IFetchData) =>
  await request<R>({ url, method: IRequestMethod.POST, data })
