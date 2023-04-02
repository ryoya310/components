import { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie';

import './App.min.css'

function App ({ Component, pageProps }: AppProps) {
  return  <>
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  </>
}
export default App