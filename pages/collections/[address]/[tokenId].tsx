import {
  MediaConfiguration,
  Networks,
  NFTFullPage,
} from '@zoralabs/nft-components';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { client, zdkStrategy } from '../../../utils/constants';
import { SalesGraph } from '../../../components/SalesGraph';
import { Provider } from 'urql';

const Token = () => {
  const router = useRouter();
  const { address, tokenId } = router.query;

  return (
    <Provider value={client}>
      <div className="mx-10 border-emerald-200 border-2 p-5 my-5">
        {typeof address !== 'string' || typeof tokenId !== 'string' ? (
          <Error statusCode={404} />
        ) : (
          <MediaConfiguration
            strategy={zdkStrategy}
            networkId={Networks.MAINNET}
          >
            <SalesGraph id={tokenId} contract={address}></SalesGraph>
            <NFTFullPage id={tokenId} contract={address} />
          </MediaConfiguration>
        )}
      </div>
    </Provider>
  );
};

export default Token;
