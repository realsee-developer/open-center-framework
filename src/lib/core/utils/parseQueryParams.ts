import type { GetServerSidePropsContext } from 'next'
import getQueryValueByName from './getQueryValueByName'

const parseQueryParams = (context?: GetServerSidePropsContext) => {
  const queryParams = (
    (context?.params?.param || (globalThis?.location?.pathname || '').split('/').slice(2) || []) as string[]
  ).filter(Boolean)
  const access_token = context?.query?.access_token || getQueryValueByName('access_token') || ''

  const [accessToken, vrCode] = (() => {
    // "/space/:vr_code?access_token=xxx"
    if (queryParams.length === 1) return [access_token ? String(access_token) : '', queryParams[0]]
    // "/space/:access_token/:vr_code?access_token=xxx"
    return queryParams
  })()

  return { accessToken, vrCode }
}

export default parseQueryParams
