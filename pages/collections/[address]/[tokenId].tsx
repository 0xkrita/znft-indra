import {
  MediaConfiguration,
  Networks,
  NFTFullPage,
} from '@zoralabs/nft-components';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { zdkStrategy } from '../../../utils/constants';
import HistoryGraph from '../../../components/HistoryGraph';
import Root from '../../../components/Root';
import HistoryFlow from '../../../components/HistoryFlow';

const Token = () => {
  const router = useRouter();
  const { address, tokenId } = router.query;

  return (
    <Root>
      <div className="mx-5 border-emerald-200 border-2 p-5 my-5">
        {/* <div className="border-2 border-red-200 p5 my-5">
          <HistoryFlow></HistoryFlow>
        </div> */}

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

            <NFTFullPage id={tokenId} contract={address} />
          </MediaConfiguration>
        )}
      </div>
    </Root>
  );
};

export default Token;
