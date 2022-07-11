/**
 * 检测当前用户使用的设备：ios端？Android端？微信小程序？web？
 * */

const userAgent = globalThis.navigator?.userAgent || ''

const isMiniprogram = /micromessenger/i.test(userAgent) && /miniprogram/i.test(userAgent)

const isIOS = /iphone|ipad/i.test(userAgent)

const isAndroid = /android/i.test(userAgent)

const isApp = isIOS || isAndroid

const isRealseeSDK = isApp && /realsee\s*([0-9a-z\.\-]+)/i.test(userAgent)

const isRealseeMiniprogram = isMiniprogram && /realsee\s*([0-9a-z\.\-]+)/i.test(userAgent)
const isBrowser = !isApp && !isMiniprogram

export { isMiniprogram, isIOS, isAndroid, isApp, isBrowser, isRealseeSDK, isRealseeMiniprogram }
