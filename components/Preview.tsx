import { NFTPreview } from '@zoralabs/nft-components';
import { NFTPreviewParam } from './Search';

export const Preview = ({ contract, id }: NFTPreviewParam) => {
  console.log(`token id is: ${id}, contract is: ${contract}`);

  return (
    <NFTPreview
      id={id}
      contract={contract}
      onClick={function noRefCheck() {}}
    />
  );
};
