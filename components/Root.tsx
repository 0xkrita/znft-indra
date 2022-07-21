import { Provider } from 'urql';
import { client } from '../utils/constants';
import Head from 'next/head';
import { Search } from './Search';
import Footer from './Footer';

export const Root = ({ children }: { children: JSX.Element }) => (
  <Provider value={client}>
    <div className="font-mono">
      <Head>
        <title>Indra&apos;s net</title>
        <meta name="description" content="znft trace visualization in graph" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div
        className="text-sm p-3 text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
        role="alert"
      >
        <span className="font-medium">warning&#58;</span> search will be slow as
        this is still in beta
      </div>
      <Search />
      {children}
      <Footer />
    </div>
  </Provider>
);
