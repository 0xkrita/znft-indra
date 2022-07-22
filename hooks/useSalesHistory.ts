import { SalesQuery } from '@zoralabs/zdk/dist/queries/queries-sdk';
import { gql, useQuery } from 'urql';

// no pagination for now
export const SalesHistoryQuery = gql`
  query ($address: String!, $tokenId: String!) {
    sales(where: { tokens: { address: $address, tokenId: $tokenId } }) {
      nodes {
        sale {
          buyerAddress
          sellerAddress
          transactionInfo {
            transactionHash
          }
        }
      }
    }
  }
`;

export const useSalesHistory = (address: string, tokenId: string) => {
  const [{ data, fetching, error }] = useQuery<SalesQuery>({
    query: SalesHistoryQuery,
    variables: { address, tokenId },
    pause: !tokenId || !address,
  });

  return {
    error,
    fetching,
    result: data?.sales.nodes,
  };
};
