import { ZDK } from '@zoralabs/zdk';
import { Chain, Network } from '@zoralabs/zdk/dist/queries/queries-sdk';

export const zdk = new ZDK({
  endpoint: 'https://api.zora.co/graphql',
  networks: [
    {
      chain: Chain.Mainnet,
      network: Network.Ethereum,
    },
  ],
});
