import { useEffect, useState, FormEvent } from 'react';
import { Preview } from './Preview';
import { ZDK } from '@zoralabs/zdk';
import { Chain, Network } from '@zoralabs/zdk/dist/queries/queries-sdk';
import { Suggestions } from './Suggestions';
import { NFTDataProviderProps } from '@zoralabs/nft-components/dist/context/NFTDataProvider';

export const zdk = new ZDK({
  endpoint: 'https://api.zora.co/graphql',
  networks: [
    {
      chain: Chain.Mainnet,
      network: Network.Ethereum,
    },
  ],
});

export type NFTPreviewParam = Omit<NFTDataProviderProps, 'children'>;

export interface ZNFT {
  tokenId: string;
  name: string;
  description: string;
  collectionAddress: string;
  entityType: string;
}

export interface SearchQueryResponse {
  search: {
    nodes: ZNFT[];
  };
}

export const Search = () => {
  const [searchField, setSearchField] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [nftPreviewQuery, setNFTPreviewQuery] = useState({
    contract: '0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7',
    id: '7968',
  }); // a random nouns zorb

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setSearchQuery(searchField);
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [searchField]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowPreview(true);
    // zdk
    //   .search({
    //     query: searchField,
    //     pagination: { limit: 5 },
    //   })
    //   .then((res) => {
    //     console.log(res.search.nodes[0]);
    //   });
  };

  return (
    <div className="container w-full border-2 border-gray-500 border-dashed m-5">
      <div className="mx-5">
        <form onSubmit={handleSubmit} className="mx-0 my-5">
          <input
            className="placeholder-teal-700 w-full border-black px-3 py-3"
            type="text"
            name="name"
            placeholder="search znft"
            value={searchField}
            onChange={(e) => {
              setSearchField(e.target.value);
            }}
          />
        </form>
      </div>
      <div className="px-5">
        <Suggestions
          text={searchQuery}
          updateTopToken={setNFTPreviewQuery}
        ></Suggestions>
      </div>
      <div className="px-1">
        {showPreview ? (
          <Preview
            contract={nftPreviewQuery.contract}
            id={nftPreviewQuery.id}
          ></Preview>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
