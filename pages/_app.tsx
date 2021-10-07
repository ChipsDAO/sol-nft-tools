import '../styles/globals.css';
import {Meta} from './meta';

function MyApp({ Component, pageProps }) {
  return <>
    <Meta></Meta>
    <Component {...pageProps} />
  </>
}

export default MyApp
