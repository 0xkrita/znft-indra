import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components';
import { NFT } from './Search';
import { Networks, Strategies } from '@zoralabs/nft-hooks';

const zdkStrategy = new Strategies.ZDKFetchStrategy(Networks.MAINNET);

export const Preview = ({ tokenId, collectionAddress }: NFT) => (
  <>
    <MediaConfiguration strategy={zdkStrategy} networkId={Networks.MAINNET}>
      <NFTPreview
        id={tokenId}
        contract={collectionAddress}
        onClick={function noRefCheck() {}}
      />
    </MediaConfiguration>
  </>
);
