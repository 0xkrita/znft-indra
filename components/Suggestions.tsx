import { SearchQuery } from '@zoralabs/zdk/dist/queries/queries-sdk';
import { useQuery, gql } from 'urql';
import { Preview } from './Preview';

const SearchQuery = gql`
  query ($text: String!) {
    search(query: { text: $text }, pagination: { limit: 4 }) {
      nodes {
        tokenId
        collectionAddress
      }
    }
  }
`;

export const Suggestions = ({ text }: { text: string }) => {
  const [{ data, fetching, error }] = useQuery<SearchQuery>({
    query: SearchQuery,
    variables: { text },
    pause: !text,
  });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="bg-slate-200 px-5">
      <div className="flex flex-wrap">
        {data?.search.nodes.map(({ collectionAddress, tokenId }) => (
          <div
            key={collectionAddress}
            className="selection:bg-fuchsia-300 selection:text-fuchsia-900"
          >
            <Preview
              collectionAddress={collectionAddress}
              tokenId={tokenId || ''} // TODO: this will not work with collection names, need to have separate handling
            ></Preview>
          </div>
        ))}
      </div>
    </div>
  );
};
