import { MediaConfiguration, Networks } from '@zoralabs/nft-components';
import Error from 'next/error';
import { useRouter } from 'next/router';
import HistoryGraph from '../../../components/HistoryGraph';
import Root from '../../../components/Root';
import { zdkStrategy } from '../../../utils/constants';

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
            <div className="border-blue-400 border-2 p-5">
              <HistoryGraph id={tokenId} contract={address}></HistoryGraph>
            </div>

            {/* <NFTFullPage id={tokenId} contract={address} /> */}
          </MediaConfiguration>
        )}
      </div>
    </Root>
  );
};

export default Token;
