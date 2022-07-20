import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components';
import { NFT } from './Search';
import { Networks } from '@zoralabs/nft-hooks';
import { zdkStrategy } from '../utils/constants';

export const Preview = ({ tokenId, collectionAddress }: NFT) => (
  <MediaConfiguration strategy={zdkStrategy} networkId={Networks.MAINNET}>
    <NFTPreview
      id={tokenId}
      contract={collectionAddress}
      href={`/collections/${collectionAddress}/${tokenId}`}
    />
  </MediaConfiguration>
);
