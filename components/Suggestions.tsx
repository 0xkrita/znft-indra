import { SearchQuery, Token } from '@zoralabs/zdk/dist/queries/queries-sdk';
import { useQuery, gql } from 'urql';
import { hashN } from '../utils/hash';
import { Preview } from './Preview';

const SearchQuery = gql`
  query ($text: String!) {
    search(
      query: { text: $text }
      pagination: { limit: 4 }
      filter: { entityType: TOKEN }
    ) {
      nodes {
        entity {
          ... on Token {
            collectionAddress
            tokenId
          }
        }
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
        {data?.search.nodes.map(({ entity }) => {
          // TODO: note that this type cast is definitely not checked at
          // runtime, so might worth adding zod or io-ts even this is
          // the expected flow
          const { tokenId, collectionAddress } = entity as Token;
          return (
            <div
              key={hashN(tokenId, collectionAddress)}
              className="selection:bg-fuchsia-300 selection:text-fuchsia-900"
            >
              <Preview
                collectionAddress={collectionAddress}
                tokenId={tokenId}
              ></Preview>
            </div>
          );
        })}
      </div>
    </div>
  );
};
