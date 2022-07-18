import { TokenQuery } from '@zoralabs/zdk/dist/queries/queries-sdk';
import { gql, useQuery } from 'urql';

// no pagination for now
export const SalesHistoryQuery = gql`
  query ($address: String!, $tokenId: String!) {
    token(token: { address: $address, tokenId: $tokenId }) {
      sales(sort: { sortKey: TIME, sortDirection: ASC }) {
        sellerAddress
        buyerAddress
        saleType
        transactionInfo {
          blockNumber
          blockTimestamp
        }
      }
      token {
        mintInfo {
          originatorAddress
        }
        owner
      }
    }
  }
`;

export const useSalesHistory = (address: string, tokenId: string) => {
  const [{ data, fetching, error }] = useQuery<TokenQuery>({
    query: SalesHistoryQuery,
    variables: { address, tokenId },
    pause: !tokenId || !address,
  });

  return {
    error,
    fetching,
    result: data?.token?.sales,
  };
};
