import getConfig from 'next/config'

interface GatewayConfig {
  APP_SERVER_URL: string
  APP_KEY: string
  APP_SECRET: string
}

const config: GatewayConfig = getConfig().serverRuntimeConfig || {}

// gateway的域名
export const APP_SERVER_URL = config.APP_SERVER_URL

// 请求的ak
export const APP_KEY = config.APP_KEY

// 请求的sk
export const APP_SECRET = config.APP_SECRET
