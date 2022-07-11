import Head from 'next/head'
import dynamic from 'next/dynamic'

const VrEntityListApp = dynamic(() => import('@/apps/vrList'), { ssr: false })

const App = () => (
  <>
    <Head>
      <title> 如视 - 真实如你所视 </title>
      <meta charSet="UTF-8" />
      <link href="/favicon.ico" type="image/x-icon" rel="icon" />
      {/* viewport 必须设置好  */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <VrEntityListApp />
  </>
)

export default App
