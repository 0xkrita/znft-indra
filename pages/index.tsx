import type { NextPage } from 'next';
import { Provider } from 'urql';
import Head from 'next/head';
import { client } from '../utils/constants';
import Header from '../components/Header';
import Search from '../components/Search';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  return (
    <Provider value={client}>
      <div className="font-mono">
        <Head>
          <title>Indra&apos;s net</title>
          <meta
            name="description"
            content="znft trace visualization in graph"
          />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <Header />
        <div
          className="text-sm p-3 text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
          role="alert"
        >
          <span className="font-medium">warning&#58;</span> search will be slow
          as this is still in beta
        </div>
        <div
          className="text-sm p-3 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-medium">error&#58;</span> there are known issues
          with zora nft component libraries for out of maintenance,
          troubleshooting now
        </div>
        <Search />
        <Footer />
      </div>
    </Provider>
  );
};

export default Home;
