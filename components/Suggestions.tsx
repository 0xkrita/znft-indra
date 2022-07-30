import autoAnimate from '@formkit/auto-animate';
import { useEffect, useRef } from 'react';
import { useSuggestions } from '../hooks/useSuggestions';
import { hashN } from '../utils/hash';
import Loading from './Loading';
import Preview from './Preview';
import WrappedError from './WrappedError';

const Suggestions = ({ text, show }: { text: string; show: boolean }) => {
  const { error, fetching, result } = useSuggestions(text);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <>
      {show && (
        <div ref={parent}>
          {fetching ? (
            <Loading />
          ) : error ? (
            <WrappedError error={error}></WrappedError>
          ) : (
            <div className="bg-slate-200 px-5 flex flex-wrap">
              {result?.map(({ tokenId, collectionAddress }) => (
                <div
                  key={hashN(tokenId, collectionAddress, Date.now().toString())}
                  className="selection:bg-fuchsia-300 selection:text-fuchsia-900"
                >
                  <Preview
                    collectionAddress={collectionAddress}
                    tokenId={tokenId}
                  ></Preview>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Suggestions;
