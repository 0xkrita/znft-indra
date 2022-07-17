import { NFTPreview, MediaConfiguration } from '@zoralabs/nft-components';
import { NFT } from './Search';
import { Networks } from '@zoralabs/nft-hooks';
import { zdkStrategy } from '../utils/constants';
import Link from 'next/link';

export const Preview = ({ tokenId, collectionAddress }: NFT) => (
  <MediaConfiguration strategy={zdkStrategy} networkId={Networks.MAINNET}>
    <Link href={`/collections/${collectionAddress}/${tokenId}`} passHref>
      <NFTPreview
        id={tokenId}
        contract={collectionAddress}
        onClick={function noRefCheck() {}}
      />
    </Link>
  </MediaConfiguration>
);
