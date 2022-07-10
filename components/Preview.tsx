import { NFTPreview } from '@zoralabs/nft-components';
import { NFTPreviewParam } from './Search';

export const Preview = ({ contract, id }: NFTPreviewParam) => (
  <NFTPreview contract={contract} id={id} onClick={function noRefCheck() {}} />
);
