import type { NextPage } from 'next';
import Head from 'next/head';
import { createClient, Provider } from 'urql';
import { Search } from '../components/Search';

const client = createClient({ url: 'https://api.zora.co/graphql' });

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
        <Search></Search>
      </div>
    </Provider>
  );
};

export default Home;
