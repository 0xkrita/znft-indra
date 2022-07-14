import { NFTPreview } from '@zoralabs/nft-components';
import { NFT } from './Search';

export const Preview = ({ collectionAddress, tokenId }: NFT) => {
  return (
    <NFTPreview
      id={tokenId}
      contract={collectionAddress}
      onClick={function noRefCheck() {}}
    />
  );
};
