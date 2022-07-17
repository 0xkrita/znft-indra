import { SearchQuery, Token } from '@zoralabs/zdk/dist/queries/queries-sdk';
import { useQuery, gql } from 'urql';

export const TokenSearchQuery = gql`
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

export const useSuggestions = (text: string) => {
  const [{ data, fetching, error }] = useQuery<SearchQuery>({
    query: TokenSearchQuery,
    variables: { text },
    pause: !text,
  });

  return {
    error,
    fetching,
    // TODO: note that this type cast is definitely not checked at
    // runtime, so might worth adding zod or io-ts even this is
    // the expected flow
    result: data?.search.nodes.map(({ entity }) => {
      const { tokenId, collectionAddress } = entity as Token;
      return { tokenId, collectionAddress };
    }),
  };
};
