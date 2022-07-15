import { useEffect, useState, FormEvent } from 'react';
import { Preview } from './Preview';
import { Suggestions } from './Suggestions';
import { NFTDataProviderProps } from '@zoralabs/nft-components/dist/context/NFTDataProvider';
import { SearchButton } from './SearchButton';
import { AutoComplete } from './Autocomplete';
import { zdk } from '../utils/constants';

export interface NFT {
  tokenId: string;
  collectionAddress: string;
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
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchField]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowPreview(true);
    zdk
      .search({
        query: searchField,
        pagination: { limit: 4 },
      })
      .then((res) => {
        console.log(res.search.nodes[0]);
      });
  };

  return (
    <div className="w-full border border-gray-500 border-dashed">
      <div className="my-5 mx-5 flex justify-center">
        <SearchButton></SearchButton>
      </div>
      <form className="mx-10 my-5" onSubmit={(e) => e.preventDefault()}>
        <input
          className="placeholder-teal-700 border-b-4 border-blue-600 bg-stone-200 w-full px-3 py-3"
          type="text"
          name="name"
          placeholder="search (z)nft"
          value={searchField}
          onChange={(e) => {
            setSearchField(e.target.value);
            // setShowPreview(false);
          }}
        />
      </form>
      <div className="mx-10">
        <Suggestions text={searchQuery}></Suggestions>
      </div>
      <div className="px-1 py-1 flex justify-center">
        <div className="box-content">
          {/* {showPreview ? (
            <Preview
              contract={nftPreviewQuery.contract}
              id={nftPreviewQuery.id}
            ></Preview>
          ) : (
            <AutoComplete></AutoComplete>
          )} */}
        </div>
      </div>
    </div>
  );
};
