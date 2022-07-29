import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef, useState } from 'react';
import Suggestions from './Suggestions';

export interface NFT {
  tokenId: string;
  collectionAddress: string;
}

const Search = () => {
  const [searchField, setSearchField] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [show, setShow] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setSearchQuery(searchField);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchField]);

  const reveal = () => setShow(true);
  const hide = () => setShow(false);

  return (
    <div className="w-full border border-gray-500 border-dashed" ref={parent}>
      {/* <div className="my-5 mx-5 flex justify-center">
        <SearchButton />
      </div> */}
      <form className="mx-5 my-5" onSubmit={(e) => e.preventDefault()}>
        <input
          autoComplete="hidden"
          className="placeholder-teal-700 border-b-4 border-blue-600 bg-stone-200 w-full px-3 py-3"
          type="text"
          name="name"
          placeholder="search (z)nft"
          value={searchField}
          onChange={(e) => {
            setSearchField(e.target.value);
            e.target.value.length > 0 ? reveal() : hide();
          }}
        />
      </form>
      {show && (
        <p className="mx-5">
          Yes. This is supposed to be autocomplete. <br />
          <br /> Sea of Tranquility a mote of dust suspended in a sunbeam
          hundreds of thousands concept of the number one realm of the galaxies
          radio telescope. As a patch of light descended from astronomers two
          ghostly white figures in coveralls and helmets are softly dancing
          emerged into consciousness Orion&apos;s sword encyclopaedia galactica.
          Another world bits of moving fluff network of wormholes muse about
          network of wormholes with pretty stories for which there&apos;s little
          good evidence and billions upon billions upon billions upon billions
          upon billions upon billions upon billions.
          <br />
          <br />
        </p>
      )}
      {show && (
        <div className="mx-5">
          <Suggestions text={searchQuery} />
        </div>
      )}

      <div className="px-1 py-1 flex justify-center">
        <div className="box-content">{/* <AutoComplete /> */}</div>
      </div>
    </div>
  );
};

export default Search;
