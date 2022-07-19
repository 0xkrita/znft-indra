import type { NextPage } from 'next';
import Head from 'next/head';
import { Provider } from 'urql';
import Footer from '../components/Footer';
import { Search } from '../components/Search';
import { client } from '../utils/constants';

const Home: NextPage = () => {
  return (
    <Provider value={client}>
      <div className="font-mono">
        <Head>
          <title>Indra&apos;s net: ZNFT edition</title>
          <meta
            name="description"
            content="znft trace visualization in graph"
          />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <Search />
        <br></br>
        <Footer />
      </div>
    </Provider>
  );
};

export default Home;
