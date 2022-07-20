import { useEffect, useState } from 'react';
import { Suggestions } from './Suggestions';

export interface NFT {
  tokenId: string;
  collectionAddress: string;
}

export const Search = () => {
  const [searchField, setSearchField] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setSearchQuery(searchField);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchField]);

  return (
    <div className="w-full border border-gray-500 border-dashed">
      {/* <div className="my-5 mx-5 flex justify-center">
        <SearchButton />
      </div> */}
      <form className="mx-5 my-5" onSubmit={(e) => e.preventDefault()}>
        <input
          className="placeholder-teal-700 border-b-4 border-blue-600 bg-stone-200 w-full px-3 py-3"
          type="text"
          name="name"
          placeholder="search (z)nft"
          value={searchField}
          onChange={(e) => {
            setSearchField(e.target.value);
          }}
        />
      </form>
      <div className="mx-5">
        <Suggestions text={searchQuery} />
      </div>
      <div className="px-1 py-1 flex justify-center">
        <div className="box-content">{/* <AutoComplete /> */}</div>
      </div>
    </div>
  );
};
