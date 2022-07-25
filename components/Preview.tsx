import { MediaConfiguration, NFTPreview } from '@zoralabs/nft-components';
import { Networks } from '@zoralabs/nft-hooks';
import { zdkStrategy } from '../utils/constants';
import { NFT } from './Search';

const Preview = ({ tokenId, collectionAddress }: NFT) => (
  <MediaConfiguration strategy={zdkStrategy} networkId={Networks.MAINNET}>
    <NFTPreview
      id={tokenId}
      contract={collectionAddress}
      href={`/collections/${collectionAddress}/${tokenId}`}
    />
  </MediaConfiguration>
);

export default Preview;
