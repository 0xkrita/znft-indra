import {
  MediaConfiguration,
  Networks,
  NFTFullPage,
} from '@zoralabs/nft-components';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { zdkStrategy } from '../../../utils/constants';

const Token = () => {
  const router = useRouter();
  const { address, tokenId } = router.query;

  if (typeof address !== 'string' || typeof tokenId !== 'string') {
    return <Error statusCode={404} />;
  }
  return (
    <div className="mx-10 border-emerald-200 border-2 p-5 my-5">
      <MediaConfiguration strategy={zdkStrategy} networkId={Networks.MAINNET}>
        <NFTFullPage id={tokenId} contract={address} />
      </MediaConfiguration>
    </div>
  );
};

export default Token;
