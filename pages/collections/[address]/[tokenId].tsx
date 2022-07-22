import {
  MediaConfiguration,
  Networks,
  NFTFullPage,
} from '@zoralabs/nft-components';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { client, zdkStrategy } from '../../../utils/constants';
import { HistoryGraph } from '../../../components/HistoryGraph';
import { Provider } from 'urql';
import { Root } from '../../../components/Root';

const Token = () => {
  const router = useRouter();
  const { address, tokenId } = router.query;

  return (
    <Root>
      <div className="mx-5 border-emerald-200 border-2 p-5 my-5">
        {typeof address !== 'string' || typeof tokenId !== 'string' ? (
          <Error statusCode={404} />
        ) : (
          <MediaConfiguration
            strategy={zdkStrategy}
            networkId={Networks.MAINNET}
          >
            <HistoryGraph id={tokenId} contract={address}></HistoryGraph>
            <NFTFullPage id={tokenId} contract={address} />
          </MediaConfiguration>
        )}
      </div>
    </Root>
  );
};

export default Token;
