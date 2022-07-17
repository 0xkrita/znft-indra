import { useSuggestions } from '../hooks/useSuggestions';
import { hashN } from '../utils/hash';
import { Preview } from './Preview';

export const Suggestions = ({ text }: { text: string }) => {
  const { error, fetching, result } = useSuggestions(text);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="bg-slate-200 px-5">
      <div className="flex flex-wrap">
        {result?.map(({ tokenId, collectionAddress }) => (
          <div
            key={hashN(tokenId, collectionAddress)}
            className="selection:bg-fuchsia-300 selection:text-fuchsia-900"
          >
            <Preview
              collectionAddress={collectionAddress}
              tokenId={tokenId}
            ></Preview>
          </div>
        ))}
      </div>
    </div>
  );
};
