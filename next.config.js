const env = Object.keys(process.env).filter((key) => /APP_/.test(key)).map(key => ({ [key]: process.env[key] })).reduce((a, b) => ({ ...a, ...b }), {})

module.exports = {
  serverRuntimeConfig: env,
  assetPrefix: '/',
  reactStrictMode: true,
  images: {
    domains: [
      'vrlab-static.ljcdn.com',
      'vrlab-image4.ljcdn.com',
      'vrlab-public.ljcdn.com',
    ],
  },
  generateEtags: false,
  poweredByHeader: false,
}
