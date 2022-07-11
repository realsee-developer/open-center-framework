import { NextApiRequest, NextApiResponse } from 'next'
import routers from './router'

const defaultApiHandler = () => {
  throw new Error('unknown api')
}

const getApiPath = (path: string[] = []) => '/' + path.join('/')

const getApiHandler = (path: string) => (routers[path] ? routers[path] : defaultApiHandler)

const generateApiResult = (result: any) =>
  result instanceof Error
    ? {
        code: -1,
        message: result.message || 'error',
      }
    : {
        code: 0,
        message: 'success',
        data: result,
      }

/**
 * realsee 封装 api 处理
 * @param req
 * @param res
 */
export const RealseeApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  customHandler?: (...args: any[]) => any,
) => {
  try {
    const path = getApiPath(req.query.path as string[])
    const headers = req.headers

    // 通用参数
    const vrCode = headers['X-Realsee-vrCode'.toLowerCase()]
    const accessToken = headers['X-Realsee-AccessToken'.toLowerCase()]

    // hack,cloudbase上的这个req.body是一个Buffer

    let body = req.body
    if (Buffer.isBuffer(body)) {
      console.log('request body is buffer')
      body = JSON.parse(Buffer.from(req.body).toString())
      console.log('parsed body is', body)
    }

    const data = Object.assign({ vrCode, accessToken }, body)
    const handler = customHandler ? customHandler : getApiHandler(path)

    const result = await handler(data)
    res.status(200).json(generateApiResult(result))
  } catch (e) {
    res.status(200).json(generateApiResult(e))
  }
}
