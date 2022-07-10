import { useEffect, useState, FormEvent } from 'react';
import { Preview } from './Preview';
import { ZDK } from '@zoralabs/zdk';
import { Chain, Network } from '@zoralabs/zdk/dist/queries/queries-sdk';
import { Suggestions } from './Suggestions';

export const zdk = new ZDK({
  endpoint: 'https://api.zora.co/graphql',
  networks: [
    {
      chain: Chain.Mainnet,
      network: Network.Ethereum,
    },
  ],
});

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
  // const []

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setSearchQuery(searchField);
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [searchField]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowPreview(true);
    zdk
      .search({
        query: searchField,
        pagination: { limit: 5 },
      })
      .then((res) => {
        console.log(res.search.nodes[0]);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            placeholder="search znft"
            value={searchField}
            onChange={(e) => {
              setSearchField(e.target.value);
              // setShowPreview(false);
            }}
          />
        </label>
      </form>
      <Suggestions text={searchQuery}></Suggestions>
      {showPreview ? <Preview></Preview> : ''}
    </>
  );
};
