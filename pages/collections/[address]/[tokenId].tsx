import { MediaConfiguration, Networks } from '@zoralabs/nft-components';
import Error from 'next/error';
import { useRouter } from 'next/router';
import HistoryGraph from '../../../components/HistoryGraph';
import { client, zdk, zdkStrategy } from '../../../utils/constants';
import { Provider } from 'urql';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Search from '../../../components/Search';
import { useEffect } from 'react';
import Link from 'next/link';

const Token = () => {
  const router = useRouter();
  const { address, tokenId } = router.query;

  // console.log(String(address), tokenId);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await zdk.token({
  //       token: {
  //         tokenId: tokenId as string,
  //         address: String(address),
  //       },
  //       includeFullDetails: true,
  //     });
  //     console.log(JSON.stringify(res, null, 2));
  //   };
  //   fetchData();
  // });

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
          troubleshooting now, check:
          <Link href="https://x.com/0xkrita/status/1763740148305658119?s=20">
            here
          </Link>
        </div>
        <Search />
        <div className="mx-5 border-emerald-200 border-2 p-5 my-5">
          {typeof address !== 'string' || typeof tokenId !== 'string' ? (
            <Error statusCode={404} />
          ) : (
            <MediaConfiguration
              strategy={zdkStrategy}
              networkId={Networks.MAINNET}
            >
              <div className="border-blue-400 border-2 p-5">
                <HistoryGraph id={tokenId} contract={address}></HistoryGraph>
              </div>
            </MediaConfiguration>
          )}
        </div>
        <Footer />
      </div>
    </Provider>
  );
};

export default Token;
