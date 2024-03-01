import { MediaConfiguration, NFTPreview } from '@zoralabs/nft-components';
import { zdkStrategy } from '../utils/constants';
import { NFT } from './Search';

const Preview = ({ tokenId, collectionAddress }: NFT) => {
  return (
    <MediaConfiguration strategy={zdkStrategy}>
      <NFTPreview
        id={tokenId}
        contract={collectionAddress}
        href={`/collections/${collectionAddress}/${tokenId}`}
      />
    </MediaConfiguration>
  );
};

export default Preview;
