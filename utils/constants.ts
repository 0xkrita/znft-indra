import { Networks, Strategies } from '@zoralabs/nft-hooks';
import { ZDK, ZDKChain, ZDKNetwork } from '@zoralabs/zdk';
import { createClient } from 'urql';

export const zdk = new ZDK({
  endpoint: 'https://api.zora.co/graphql',
  networks: [
    {
      chain: ZDKChain.Mainnet,
      network: ZDKNetwork.Ethereum,
    },
  ],
});

export const zdkStrategy = new Strategies.ZDKFetchStrategy(Networks.MAINNET, {
  endpoint: 'https://api.zora.co/graphql',
});

export const client = createClient({ url: 'https://api.zora.co/graphql' });
